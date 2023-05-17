import { useEffect, useState } from 'react';
import axios from 'axios';
import AutoComplete from '@/components/AutoComplete';

// TODO Default search currently London se default to look at user ip and default by ip address


export default function Home() {
  // Real time Weather: holds real time weather object
  const [rTWeather, setRTWeather] = useState(null);

  // search: the current search string typed by the user
  const [search, setSearch] = useState('London');

  // suggestions: the list of suggestions returned by the Places API
  const [suggestions, setSuggestions] = useState([]);

  //  Function for button
  // const handleSearchClick = () => {
  //   setSearch(search);
  // };


  /**
 * useEffect hook
 * Runs when the search string changes.
 * Sends a request to the API to get new suggestions based on the current search string.
 * TODO Change to run only when user hits enter or selects a location
 */
  useEffect(() => {
    axios
      .get(`/api/weather?location=${search}`)
      .then((response) => {
        setRTWeather(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [search]);

  if (rTWeather === null) {
    return <div>Loading...</div>;
  }

  return (

    <div className='flex flex-col items-center justify-center h-screen'>
      <div>
        <h1>Country: {rTWeather.location.country}</h1>
        <h1>Location: {rTWeather.location.name}, {rTWeather.location.region}</h1>
        <h1>Temperature: {rTWeather.current.temp_c} degrees Celsius</h1>
        {console.log(rTWeather)}
      </div>
      <div className='w-full sm:w-1/4 flex flex-col items-center mr-4'>
        <AutoComplete search={search} setSearch={setSearch} suggestions={suggestions} setSuggestions={setSuggestions} />
        {/* <button className='bg-blue-600 text-white' onClick={handleSearchClick}>Search</button> */}
      </div>

    </div>
  );
}
