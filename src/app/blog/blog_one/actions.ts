"use server";
export async function addComments(
  newComment: string,
  username?: string,
  image?: string
) {
  const perspectiveAPIKey = process.env.PERSPECTIVE_API_KEY; // Replace with your Perspective API key
  const perspectiveAPIURL = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${perspectiveAPIKey}`;

  const perspectiveRequest = {
    comment: {
      text: newComment,
    },
    requestedAttributes: {
      TOXICITY: {},
    },
  };

  try {
    // Send the comment to the Perspective API
    const perspectiveResponse = await fetch(perspectiveAPIURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(perspectiveRequest),
    });

    const perspectiveData = await perspectiveResponse.json();
    console.log("Perspective Api Data:", perspectiveData);
    const toxicityScore =
      perspectiveData.attributeScores?.TOXICITY?.summaryScore?.value;

    console.log("TOXICITY:", toxicityScore);
    if (toxicityScore > 0.7) {
      return "toxic";
    }

    // Get the full base URL dynamically
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || // From environment variables
      "http://localhost:3000"; // Default fallback for development

    const newCommentObj = {
      id: Date.now().toString(),
      user: username || "Anonymous",
      content: newComment,
      createdAt: new Date().toISOString(),
      profilePicture: image,
    };
    console.log("Adding to database:", newCommentObj);

    // Use the absolute URL for the fetch request
    const response = await fetch(`${baseUrl}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentObj),
    });

    if (response.ok) {
      return "nontoxic";
    } else {
      return "responseError";
    }
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}
