import axios from 'axios';

export default async function handle(req, res) {

  const options = {
    method: 'GET',
    url: "https://api.ipify.org/?format=json",
  };
  
  
  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
}

