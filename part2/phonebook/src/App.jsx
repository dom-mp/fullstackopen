import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) => {
  return (
    <div>
    <h2>PhoneBook</h2>
    filter shown with: <input onChange={props.filterHandler} value={props.filterInput}/>
  </div> 
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input onChange={props.onChangeHandler} value={props.newName}/>
      </div>
      <div>number: <input onChange={props.phoneHandler} value={props.newPhone}/></div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>
  )
}

const Names = (props) => {
  const filteredPersons = props.filteredPersons;
  return (
    <>
      {filteredPersons.map(person => {
        return <p key={person.name}>{person.name} {person.phoneNum}</p>
      })}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newPhone, setPhone] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const addPerson = (event) => {
    event.preventDefault();

    if (!persons.some(obj => obj.name === newName)) {
      let newPersons = [...persons];
      console.log(newName, newPhone)
      newPersons.push({name: newName, phoneNum: newPhone});
      setPersons(newPersons);
      setFilteredPersons(newPersons);
    } else {
      alert(`${newName} is aleady added to the Phonebook`);
    }
    setNewName('');
    setPhone('');
  }

  const filterHandler = (event) => {
    const input = event.target.value.toLowerCase();
    setFilterInput(event.target.value);

    const innerFilteredPersons = persons.filter(person => person.name.toLowerCase().includes(input));
    setFilteredPersons(innerFilteredPersons);
  }

  const onChangeHandler = (event) => {
    setNewName(event.target.value);
  }

  const phoneHandler = (event) => {
    setPhone(event.target.value);
  }

  const getPersons = () => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      // console.log(response.data);
      setPersons(response.data);
      setFilteredPersons(response.data);
    })
  }

  useEffect(getPersons, []);

  return (
    <div>
      <div>
        <Search filterHandler={filterHandler} filterInput={filterInput}/>
      </div>
      <h2>Add a New:</h2>
        <Form addPerson={addPerson} onChangeHandler={onChangeHandler} newName={newName} phoneHandler={phoneHandler} newPhone={newPhone}/>
      <h2>Numbers</h2>
        <Names filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App