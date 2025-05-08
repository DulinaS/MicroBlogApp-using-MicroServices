const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());


//Store all the events that are received from the other services
const events = [];

//This is the event bus that will receive events from other services and send them to the appropriate services
//It will act as a middleman between the services
//It will receive events from the posts and comments services and send them to the query service
//It will also receive events from the query service and send them to the posts and comments services
//This listens for incoming events from the other services and forwards them to the appropriate services
//This is the main entry point for the event bus
app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event); // Store the event in the events array

    //After receiving an event, the event bus will send the event to all the services that are listening for that event
    //This is done by making a POST request to the appropriate service with the event data
    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log('Error sending event to Posts service:', err.message);
    });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log('Error sending event to Comments service:', err.message);
    });
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log('Error sending event to Query service:', err.message);
    });
    axios.post('http://localhost:4003/events', event).catch((err) => {
        console.log('Error sending event to Moderation service:', err.message);
    });

    res.send({ status: 'OK' });
});

//Sends all the events that have been received so far
app.get('/events', (req, res) => {
    //Send all the events that have been received so far
    //This is useful for debugging and testing purposes
    res.send(events);
});

app.listen(4005, () => {
    console.log('Event Bus is running on port 4005');
});