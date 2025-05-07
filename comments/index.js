const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());

//Contains arrays of comments for each post
//In-memory data store for comments
//Each post will have an array of comments
//The key will be the postId and the value will be an array of comments
//2D array of comments
//Example: commentsByPostId = { '1': [ {id: '1', content: 'Comment 1'}, {id: '2', content: 'Comment 2'} ] }
const commentsByPostId = {};

//Route Handlers
app.get('/posts/:id/comments', (req, res) => {
    //if the postId exists in the commentsByPostId object, return the array of comments for that postId
    //If it doesn't, return an empty array
    res.send(commentsByPostId[req.params.id] || []);
});

//Route to create a new comment for a post
app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const {id} = req.params;

    //Check if the postId exists in the commentsByPostId object
    //If it doesn't, create an empty array for that postId
    const comments = commentsByPostId[id] || [];

    //Push the new comment to the array of comments for that postId
    //The comment will have an id and content property
    comments.push({id: commentId, content, status: 'pending'});

    //Send an event to the event bus to notify about the new comment creation
    //This event is sent to the event bus so that other services can listen to it and take action accordingly
    //For example, the query service can listen to this event and update its data store with the new comment
    await axios.post('http:localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: id,
            status: 'pending', // Set the initial status of the comment to pending
        },
    }).catch((err) => {
        console.error('Error sending event:', err.message);
    });

    //Update the commentsByPostId object with the new comment
    //The key will be the postId and the value will be the array of comments
    commentsByPostId[id] = comments;

    res.status(201).send(comments);
});

// Route to handle incoming events from the event bus
// This route is used to receive events from the event bus and take action accordingly
app.post('/events', async (req, res) => {
    console.log('Event received:',req.body.type); // Log the received event type

    const {type, data} = req.body; // Destructure the event type and data from the request body
    if(type == 'CommentModerated'){
        const {id, postId, status, content} = data; // Extract the comment ID, post ID, status, and content from the event data
        const comments = commentsByPostId[postId]; // Find the comments for the post by its ID

        //If the comments array exists, find the comment by its ID and update its status
        if(comments){
            // Find the comment by its ID and update its status
            //Because the comments can have multiple comments, we need to find the comment by its ID
            const comment = comments.find(comment => {
                return comment.id === id;
            });
            if(comment){
                comment.status = status; // Update the status of the comment
            }
        }

        //Send an event to the event bus to notify about the moderated comment
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
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

app.listen(4001,() => {
    console.log('Listening on 4001');
});