import axios from 'axios';

export const getAllCountries = () => {
  let request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
  return request;
}

// export default 