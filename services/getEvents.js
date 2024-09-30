import axios from 'axios';
//const axios = require('axios');

export async function getRecommendedEvents() {
  try {
    const response = await axios.get("http://192.168.1.40:5000/events/");
    const events = response.data;
    let recommendedEvents = [];
    for (let event of events) {
      if (event.isRecommended) recommendedEvents.push(event);
    }
    return recommendedEvents;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllEvents() {
  try {
    const response = await axios.get("http://192.168.1.40:5000/events/");
    const events = response.data;
    return events;
  } catch (error) {
    console.error(error);
  }
}

//getRecommendedEvents().then((events) => console.log(events));
//getAllEvents().then((events) => console.log(events));