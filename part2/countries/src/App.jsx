import { useState, useEffect } from 'react';
import { getAllCountries } from './helpers/api.js'

function App() {
  const [inputData, setInputData] = useState('');
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    getAllCountries()
    .then(request => {
      setCountries(request.data);
    })},
  []);

  const inputDataHandler = (event) => {
    setInputData(event.target.value);
  }

  const filterCountryNames = (countries, input) => {
    return countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase()))
  }

  const IndividualCountries = ({name}) => {
    return (
      <>
        <p>{name}</p>
      </>
    )
  }

  const IndividualCountry = ({country}) => {
    const languages = Object.keys(country.languages);
    let counter = 0;

    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {languages.map(key => {
            counter += 1;
            return <li key={country.languages[key] + 1}>{country.languages[key]}</li>
          })}
        </ul>
        <img src={country.flags.png} alt="flag"/>
      </>
    );
  }

  const Countries = ({inputData, countries}) => {
    if (inputData && countries) {
      const filteredCountries = filterCountryNames(countries, inputData);
      console.log(filteredCountries);
      if (filteredCountries.length > 10) {
        return (
          <div><p>There are too many matches, please specify further</p></div>
        )
      }
      else if (filteredCountries.length === 1) {
        const country = filteredCountries[0];
        return (
          <div><IndividualCountry country={country}/></div>
        )
      }
      else {
        return (
          <div>
            {filteredCountries.map(country => {
              return <IndividualCountries key={country.area} name={country.name.common}/>
            })}
          </div>
        )
      }

      return (
        <div>
  
        </div>
      );
    }

    return (<></>);
  }

  return (
    <>
    <div>
      find countries <input onChange={inputDataHandler} value={inputData}/>
    </div>
    <Countries inputData={inputData} countries={countries}/>
    </>
  )
}

export default App
