const AWS = require('aws-sdk');
const { BEDROCK_ENDPOINT, MODEL_ID, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

const bedrock = new AWS.Bedrock({
    endpoint: BEDROCK_ENDPOINT,
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const generateStory = async (prompt) => {
    const params = {
        modelId: MODEL_ID,
        prompt,
    };

    try {
        const response = await bedrock.invokeModel(params).promise();
        return response; // Ensure this returns the response text correctly
    } catch (error) {
        console.error('Error with Bedrock API:', error);
        throw new Error('Failed to connect to Amazon Bedrock');
    }
};

module.exports = { generateStory };
