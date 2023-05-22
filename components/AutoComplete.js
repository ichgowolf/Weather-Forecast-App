import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AutoComplete({ search, setSearch, suggestions, setSuggestions, location, setLocation }) {
  
  // isInputFocused: stores if input is focused
  const [isInputFocused, setInputFocus] = useState(false);
  // isListHovered: stores if list is being hovered by user
  const [isListHovered, setListHovered] = useState(false);
  // highlightedIndex: sets highlighted suggestions 
  const [highlightedIndex, setHighlightedIndex] = useState(-1);


  // Handle key events on the search input field such as enter and up/down keys
  const handleButtonPress = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      if (highlightedIndex !== -1) {
        setLocation(suggestions[highlightedIndex].description);
        setSearch(''); // clear input
        setSuggestions([]);
      } else {
        setLocation(event.target.value);
        setSearch(''); // clear input
      }
    } else if (event.key === "ArrowDown") {
      setHighlightedIndex(prevIndex => (prevIndex + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex(prevIndex => (prevIndex - 1 + suggestions.length) % suggestions.length);
    }
  
  }
  
  // Handle changes to the search input field and clears suggestions array
  const handleChange = (event) => {
    if(event.target.value === ""){
      setSuggestions([])
    }
    setSearch(event.target.value);
  };

  // Handle clicks on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSearch(''); // clear input
    setSuggestions([]);
  };

    /**
   * useEffect hook
   * Runs when the search string changes.
   * When the search value changes, get new suggestions from the API
   */
  useEffect(() => {
    if (search) {
      axios.get(`/api/places?input=${search}`)
        .then((response) => {
          setSuggestions(response.data.predictions);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [search, setSuggestions]);

  return (
    <div className= 'w-full border-4 mt-2'>
      <input
        type="text"
        placeholder="Search Area..."
        value={search}
        onChange={handleChange}
        onKeyDown={handleButtonPress}
        className= 'border-2 border-blue-400 w-full'
        onFocus={() => setInputFocus(true)}
        onBlur={() => { if (!isListHovered) {setInputFocus(false);}}}
      />
      {(isInputFocused || isListHovered) && suggestions && suggestions.length > 0 && (
        <ul 
          className='bg-gray-300 max-w-fit absolute z-40 ' 
          onMouseEnter={() => setListHovered(true)}
          onMouseLeave={() => {setListHovered(false); if (!isInputFocused) {setInputFocus(false);}}}
        >
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              className={`cursor-pointer hover:bg-sky-300 ${index === highlightedIndex ? 'bg-blue-200' : ''}`} 
              onClick={() => handleSuggestionClick(suggestion.description)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
