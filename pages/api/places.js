// pages/api/places.js
import axios from 'axios';

export default async function handler(req, res) {
  const input = req.query.input;

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
      params: {
        input: input,
        key: process.env.GOOGLE_PLACES_API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
