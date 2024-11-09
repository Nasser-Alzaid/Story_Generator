require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { generateStory } = require('./utils/bedrock');  // Ensure this path is correct for your setup

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Endpoint for generating story
app.post('/api/generateStory', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const story = await generateStory(prompt);
        res.json({ story });
    } catch (error) {
        console.error('Error generating story:', error.message);
        res.status(500).json({ error: 'Failed to generate story' });
    }
});

// Set the port and start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
