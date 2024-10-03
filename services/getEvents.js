import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL

export async function getRecommendedEvents() {
  try {
    const response = await axios.get(`${apiUrl}/events/`);
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
    const response = await axios.get(`${apiUrl}/events/`);
    const events = response.data;
    return events;
  } catch (error) {
    console.error(error);
  }
}

//getRecommendedEvents().then((events) => console.log(events));
//getAllEvents().then((events) => console.log(events));