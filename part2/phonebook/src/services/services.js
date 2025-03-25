import axios from 'axios';

const getAll = () => {
  let request = axios.get('http://localhost:3001/persons');
  return request.then(response => response.data);
}

const create = ( newPerson ) => {
  let request = axios.post('http://localhost:3001/persons', newPerson);
  return request.then(response => response.data);
}

const toDelete = ( url ) => {
  let request = axios.delete(url);
  return request;
}

const updatePerson = (url, data) => {
  let request = axios.put(url, data);
  return request;
}

export default {
  getAll,
  create,
  toDelete,
  updatePerson,
}