// TODO CREATE CARD TO HOLD WEATHER INFO
import Image from "next/image"
import wind from "../assets/weather Icons/wind.svg"
import humidity from "../assets/weather Icons/humidity.svg"
import dotsIcon from "../assets/mic/three-dots-vertical.svg"
import { useState } from "react"



export default function WeatherCard({ rTWeather, onDelete }) {
  
  // stores state of drop down options on card
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-between bg-white shadow-md rounded-lg p-4 m-4 w-full flex-grow  min-w-[33.33%]">
            
      <div className="absolute top-2 right-2">
        <Image className="cursor-pointer" src={dotsIcon} width={40} onClick={() => setDropdownOpen(!isDropdownOpen)} />
          {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-slate-200 rounded-md overflow-hidden shadow-xl z-10 ">
            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white cursor-pointer" onClick={onDelete}>
              Delete
            </div>
          </div>
          )}
      </div>
      <h1 className="text-2xl font-bold mt-4 text-center whitespace-normal text-black">{rTWeather.location.name}, {rTWeather.location.region}</h1>
      
      <div className="text-4xl font-bold mt-4 text-center">
        {rTWeather.current.temp_f}°F
      </div>
      
      <div className="text-md text-gray-500 text-center">
      {rTWeather.current.condition.text}
      </div>
      
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-start">
          <div className="flex items-center">
            <Image src={wind} width={50} alt="Wind" /> <p>{rTWeather.current.gust_mph} MPH</p>
          </div>
          <div className="flex items-center">
            <Image src={humidity} width={50} alt="Humidity" /> <p>{rTWeather.current.humidity}%</p>
          </div>
        </div>
        
        <img className="w-24 h-24" src={rTWeather.current.condition.icon} alt="Weather Icon" />
      </div>
    </div>
  )
}
