import React, { useState, useEffect } from 'react'
import axios from 'axios'
// console.log(process.env.REACT_APP_API_KEY)
const App = () => {
  const [countries, setCountries] = useState([])
  // const [newName, setNewName] = useState('')
  // const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearchName] = useState('')

  useEffect(() => {
    console.log('effect Countries')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])





  const handleSearchChange = (event) => {
    console.log("handleSearchChange ", event.target.value)
    setSearchName(event.target.value)
  }


  return (
    <div>

      <Filter newSearch={newSearch} searchChange={handleSearchChange} />
      <Rows countries={countries} newSearch={newSearch} />
    </div>
  )
}


const Filter = (props) => {
  const newSearch = props.newSearch
  const searchChange = props.searchChange
  return (
    <div>
      find countries:
  <input
        value={newSearch}
        onChange={searchChange}
      />
    </div>
  )
}
const Weather = (props) => {
  const city = props.city
  // console.log(city)
  const [weather, setWeather] = useState([])
  useEffect(() => {
    // console.log('effect weather')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
        console.log(weather, 'weather current1')
      })
  }, [])
  let temp = ''
  let pic = '' 
  let wind = '' 
  let direction = '' 
  if(weather.current !== undefined){
  temp = weather.current.temperature
  pic = weather.current.weather_icons[0]
  wind = weather.current.wind_speed
  direction = weather.current.wind_dir
  console.log(temp, "temp")
  }
  return (
    <>
      <h3>Weather in {city}</h3>

      <div>temperature: {temp} °C</div>
      <img src={pic} alt="weather icon"/>
      <div>wind: {wind} kph in direcion {direction}</div>
    </>
  )
}

const Details = (props) => {
  const searchList = props.searchList
  const languages = searchList.languages.map(language => <li key={language.name}>{language.name}</li>)
  return (
    <>
      <div key={searchList.name}>
        <h2>{searchList.name}</h2>
        <p>capital {searchList.capital}</p>
        <p>population {searchList.population}</p>
        <h3>languages</h3>
        <ul>
          {languages}
        </ul>
        <img height='200px' width='400px' src={searchList.flag} alt='flag' />
      </div>
      <Weather city={searchList.capital} />
    </>
  )
}

const Rows = (props) => {
  const countries = props.countries
  // const [showCountries, setShowCountries] = useState([])
  const newSearch = props.newSearch
  const [show, setShow] = useState(false)
  const [showList, setShowList] = useState([])
  const rows = () => {
    // console.log("newSearch in rows: ", newSearch)
    // console.log("countries in rows: ", countries)
    if (newSearch === '') {
      return (
        countries.map(country =>
          <div key={country.name}>
            {country.name}
          </div>
        ))
    } else {
      const searchList = countries.filter((country) => country.name.toLowerCase().includes(newSearch.toLowerCase()))
      if (searchList.length === 0) {
        // console.log("searchList1: ", searchList)
        return (
          <div >
            country with the name {newSearch} was not found!
          </div>)
      } else if (searchList.length === 1) {
        // console.log("searchList2: ", searchList)
        // console.log("languages: ", searchList[0].languages)
        return (
          <Details searchList={searchList[0]} />

        )
      } else if (searchList.length > 10) {
        console.log("searchList3: ", searchList)
        return (
          <div>Too many matches, specify another filter</div>
        )
      } else if (searchList.length > 1 && searchList.length <= 10) {
        // console.log("searchList: ", searchList)
        // console.log("show: ", show)
        // console.log("showlist", showList)
        return (
          searchList.map(country =>
            <div key={country.name}>
              {country.name} <button onClick={() => {
                // console.log("country: ", country)
                // console.log('onclick')
                if (showList.filter(e => e === country).length > 0) {
                  // console.log('showlist does include ', country)
                  const copy = showList.filter(c => c !== country)
                  setShowList(copy)
                } else {
                  // console.log('showlist does NOT include ', country)
                  setShowList(showList.concat(country))
                }
                // console.log("showList", showList)
                return (
                  setShow(!show)
                )
              }
              }>
                {(showList.filter(c => c === country).length === 1) ? "hide" : "show"}</button>
              <ShowCountry showList={showList} country={country} />
            </div>
          ))
      }
    }
  }
  return rows()
}

const ShowCountry = (props) => {
  const showList = props.showList
  const country = props.country
  const filteredList = (showList.filter(e => e === country))
  // console.log('showCountry props:', props)
  if (filteredList.length === 0) {
    console.log('ShowCountry: nicht enthalten')
    return (
      <></>
    )
  } else if ((filteredList.length === 1)) {
    // console.log('ShowCountry: Ist enthalten')
    return (
      <Details searchList={country} />
    )
  }

}

// const showCountry = (props) => {
//   console.log(props)
//   const index = props
//   const copy = showCountries
//   copy[index] = !copy[index]
//   setShowCountries(copy)
// }

export default App
