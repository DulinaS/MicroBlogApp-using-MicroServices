const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

//Moderation service listens for CommentCreated events from the event bus
//It checks for orange words in the comment content
//If it finds any, it sends a CommentModerated event to the event bus with the status of the comment (approved or rejected)
//This sents a CommentModerated event to the event bus with the status of the comment
//The event bus will then send this event to the comments service
//app.post logic is used to handle incoming CommentCreated events from the event bus
app.post('/events', async (req, res) => {
    const { type, data } = req.body; // Destructure the event type and data from the request body

    if (type === 'CommentCreated') {
        const { id, content, postId } = data; // Extract the comment ID, content, and post ID from the event data

        // Check if the comment contains any "orange" words
        const status = content.includes('orange') ? 'rejected' : 'approved'; // Set the status based on the content

        // Send a CommentModerated event to the event bus with the status of the comment
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id,
                postId,
                status,
                content,
            },
        }).catch((err) => {
            console.error('Error sending event:', err.message);
        });
    }
    res.send({}); // Send an empty response to acknowledge the event
});

app.listen(4003, () => {
    console.log('Moderation service is running on port 4003');
});