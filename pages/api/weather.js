import axios from 'axios';

export default async function handle(req, res) {
  const location = req.query.location || 'London';
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: location },
    headers: {
      'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
      'X-RapidAPI-Host': process.env.X_RapidAPI_Host,
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
}




// const APIKEY = '82b479085emsh2f228a4faf2e033p16e38cjsn952124518bf0'
// const APIHOST = 'weatherapi-com.p.rapidapi.com'
// const  BASE_URL = 'https://weatherapi-com.p.rapidapi.com/'

// const getWeatherData = (infoType, searchParams) => {
//   const url = new URL(BASE_URL + '/' + infoType)
// }