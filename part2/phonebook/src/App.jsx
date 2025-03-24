import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNum: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNum: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNum: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNum: '39-23-6423122', id: 4 }
  ])
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