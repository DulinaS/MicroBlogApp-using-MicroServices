const express = require('express');

 // Importing the crypto module for generating random bytes for generating unique IDs
const {randomBytes} = require('crypto');

// Importing body-parser to parse incoming request bodies
const bodyParser = require('body-parser'); 

// Importing cors to enable Cross-Origin Resource Sharing
const cors = require('cors');

// Importing axios for making HTTP requests to the event bus
const axios = require('axios'); 

const app = express();

 // Body parser middleware to parse JSON request bodies
 // This middleware is used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());

app.use(cors()); // Enable CORS for all routes

//Store posts in memory (for simplicity)
//In a real application, you would use a database
const posts = {}

//Route handlers
app.get('/posts', (req, res) => {
    res.send(posts);
});

// Route to create a new post
app.post('/posts',async (req, res) => {
    const id = randomBytes(4).toString('hex'); // Generate a random ID
    const { title } = req.body; // Extract the title from the request body

    posts[id] = { id, title }; // Store the post in memory

    // Send an event to the event bus to notify about the new post creation
    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: { id, title },
    }).catch((err) => {
        console.error('Error sending event:', err.message);
    });	

    res.status(201).send(posts[id]); // Send the created post as a response
});

// Route to handle incoming events from the event bus
// This route is used to receive events from the event bus and take action accordingly
app.post('/events', (req, res) => {
    console.log('Event received:', req.body.type); // Log the received event type
    res.send({}); // Send an empty response to acknowledge the event
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});