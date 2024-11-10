const { BedrockRuntimeClient } = require("@aws-sdk/client-bedrock-runtime");
const { fromEnv } = require("@aws-sdk/credential-provider-env");

// Configure the Bedrock Runtime Client
const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION,
    credentials: fromEnv(),
    endpoint: process.env.BEDROCK_ENDPOINT,
});

// Function to Generate Story
const generateStory = async (prompt) => {
    const params = {
        modelId: process.env.MODEL_ID ,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            anthropic_version: "bedrock-2023-05-31",
            max_tokens: 200,
            top_k: 250,
            stop_sequences: [],
            temperature: 1,
            top_p: 0.999,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: prompt
                        }
                    ]
                }
            ]
        }),
    };

    try {
        console.log("Sending request to Bedrock with params:", params);

        // Use the `client.send` method with the appropriate command
        const response = await client.send({
            operation: "invokeModel",
            modelId: params.modelId,
            contentType: params.contentType,
            accept: params.accept,
            body: params.body,
        });

        console.log("Received response from Bedrock:", response);

        const responseData = JSON.parse(await response.body.text());
        const storyText = responseData.output?.text || "No story generated.";

        console.log("Generated story text:", storyText);
        return storyText;
    } catch (error) {
        console.error("Error with Bedrock API:", error);
        throw new Error("Failed to generate story");
    }
};

module.exports = { generateStory };
