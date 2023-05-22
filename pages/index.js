import { useEffect, useState } from 'react';
import axios from 'axios';
import AutoComplete from '@/components/AutoComplete';
import WeatherCard from '@/components/WeatherCard';



// TODO Default search currently London se default to look at user ip and default by ip address


export default function Home() {
  // Real time Weather: holds real time weather object
  const [rTWeatherData, setRTWeatherData] = useState([]);


  // search: the current search string typed by the user
  const [search, setSearch] = useState('');

  // location: string received by user event such as button press or keydown
  const [location, setLocation] = useState('')

  // suggestions: the list of suggestions returned by the Places API
  const [suggestions, setSuggestions] = useState([]);

  // firstRender: stops app from rendering twice on start up
  const [firstRender, setFirstRender] = useState(true);


  //  Function for button
  // const handleSearchClick = () => {
  //   setSearch(search);
  // };
  
  // 
  const deleteCard = (index) => {
    const newRTWeatherData = [...rTWeatherData];
    newRTWeatherData.splice(index, 1);
    setRTWeatherData(newRTWeatherData);

  }

  

  /**
 * useEffect hook
 * Runs when the search string changes.
 * Sends a request to the API to get Ip address
 */
  useEffect(() => {
    axios
      .get(`/api/getIp/`)
      .then((response) => {
        setLocation(response.data.ip)
        console.log(response.data.ip)
      })
  }, []);


  /**
 * useEffect hook
 * Runs when the search string changes.
 * Sends a request to the API to get Real time weather data
 * TODO Change to run only when user hits enter or selects a location
 */
  useEffect(() => {
    if (!firstRender) {
      axios
        .get(`/api/weather?location=${location}`)
        .then((response) => {
          if (!rTWeatherData.find(item => item.location.name === response.data.location.name)) {
            setRTWeatherData(prev => [...prev, response.data]);
          }
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setFirstRender(false);
    }
  }, [location]);



  return (

    <div className='app'>
      <h1 className='  text-4xl font-bold text-cyan-300'>SkyScribe</h1>
      <div className='search'>
        <AutoComplete search={search} setSearch={setSearch} suggestions={suggestions} setSuggestions={setSuggestions} location={location} setLocation={setLocation} />
        {/* <button className='bg-blue-600 text-white' onClick={handleSearchClick}>Search</button> */}
      </div>

      <div className='min-w-[100%] grid grid-cols-3 gap-4'>
      {rTWeatherData.map((rTWeather, index) => (
        <WeatherCard key={index} rTWeather={rTWeather} onDelete={() => deleteCard(index)} />
      ))}
    </div>
  </div>


  );
}
