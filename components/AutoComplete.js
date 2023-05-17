import React, { useEffect, useState } from 'react';
import axios from 'axios';


/**
* AutoComplete component
* A search box with auto-complete functionality. Shows suggestions as the user types.
*/

export default function AutoComplete({ search, setSearch, suggestions, setSuggestions }) {

  // isInputFocused: whether the input field is currently focused
  const [isInputFocused, setInputFocus] = useState(false);

  // isListHovered: whether the suggestions list is currently being hovered over
  const [isListHovered, setListHovered] = useState(false);


  /**
 * handleChange
 * Event handler for when the input field's value changes.
 * Updates the search string to the current value of the input field.
 */
  const handleChange = (event) => {
    setSearch(event.target.value);
  };


 /**
 * handleSuggestionClick
 * Event handler for when a suggestion is clicked.
 * Updates the search string to the clicked suggestion and clears the suggestions list.
 */
  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
  };


  /**
  * useEffect hook
  * Runs when the search string changes.
  * Sends a request to the API to get new suggestions based on the current search string.
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
        placeholder="Search..."
        value={search}
        onChange={handleChange}
        className= 'border-2 border-blue-400 w-full'
        onFocus={() => setInputFocus(true)}
        onBlur={() => { if (!isListHovered) {setInputFocus(false);}}}
      />
      {(isInputFocused || isListHovered) && suggestions && suggestions.length > 0 && (
        <ul 
          className='bg-gray-300 max-w-fit' 
          onMouseEnter={() => setListHovered(true)}
          onMouseLeave={() => {setListHovered(false); if (!isInputFocused) {setInputFocus(false);}}}
        >
          {suggestions.map((suggestion, index) => (
            <li key={index} className='cursor-pointer hover:bg-sky-300 ' onClick={() => { console.log("Suggestion clicked"); handleSuggestionClick(suggestion.description)}}>
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
