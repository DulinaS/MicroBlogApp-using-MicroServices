const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

//what does cors do is it allows cross-origin requests
app.use(cors());

const posts = {}; // In-memory data store for posts
//posts will look like this:
/* posts === {
     '1': { 
         id: '1', 
         title: 'Post 1',
        comments: [
            { id: '1', content: 'Comment 1' },
            { id: '2', content: 'Comment 2' } 
        ]
     },
}
 */

//This will recieve events from the event bus and store them in memory
//Post creation and comment creation events will be handled here
app.post('/events', (req, res) => {
    const { type, data } = req.body; // Destructure the event type and data from the request body

    if (type === 'PostCreated') {
        const { id, title } = data; // Extract the post ID and title from the event data
        posts[id] = { id, title, comments: [] }; // Store the post in memory with an empty comments array
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status} = data; // Extract the comment ID, content, and post ID from the event data
        const post = posts[postId]; // Find the post by its ID

        if (post) {
            post.comments.push({ id, content,status }); // Add the comment to the post's comments array
        }
    }
    if(type === 'CommentUpdated'){
        const {id, content, postId, status} = data; // Extract the comment ID, content, and post ID from the event data
        const post = posts[postId]; // Find the post by its ID

        // If the post exists, find the comment by its ID and update its status and content
        if(post){
            // Find the comment by its ID
            const comment = post.comments.find(comment => {
                return comment.id === id;
            });
            comment.status = status; // Update the status of the comment
            comment.content = content; // Update the content of the comment
        }
    }
    console.log(posts); // Log the posts object to see the current state of posts and comments
    res.send({}); // Send an empty response to acknowledge the event
});


// Route to get all posts
// This route will return all the posts stored in memory
app.get('/posts', (req, res) => {
    res.send(posts); // Send the posts object as a response
});

app.listen(4002, () => {
    console.log('Query service is running on port 4002');
});