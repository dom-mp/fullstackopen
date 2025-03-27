import { useState, useEffect } from 'react';
import { Search, Form, Names } from './components/components.jsx'
import phoneServices from './services/services.js'
// import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newPhone, setPhone] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [errorMessage, setErrorMessage] = useState(null);

  const addPerson = (event) => {
    event.preventDefault();
    let newPerson = {name: newName, phoneNum: newPhone, id: newName};

    if (!persons.some(obj => obj.name === newName)) {
      phoneServices.create(newPerson)
      .then(data => {
        console.log(data);
        let newPersons = [...persons];
        newPersons.push(newPerson);

        setPersons(newPersons);
        setFilteredPersons(newPersons);
        setErrorMessage(`${newName} was added successfully`)
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
    } else {
      let replace = window.confirm(`${newName} is already added to the Phonebook, replace the old number with a new one?`);

      if (replace) {
        let id = persons.filter(person => person.name === newName)[0].id;
        let url = `http://localhost:3001/persons/${id}`;
        phoneServices.updatePerson(url, newPerson)
        .then(_ => {
          phoneServices.getAll()
          .then(data => {
            setPersons(data);
            setFilteredPersons(data);
          })
        })
      }
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

  useEffect(() => {
    phoneServices.getAll()
    .then(data => {
      setPersons(data);
      setFilteredPersons(data);
    })
  }, []);

  const deleteHandler = (id) => {
    const url = `http://localhost:3001/persons/${id}`;

    return (event) => {
      let value = window.confirm('Are you sure you want to delete this?');

      if (value) {
        phoneServices.toDelete(url)
        .then(_ => {
          phoneServices.getAll()
          .then(data => {
            setPersons(data);
            setFilteredPersons(data);
          });
        });
      }
    }
  }

  return (
    <div>
      <div>
        <Search filterHandler={filterHandler} filterInput={filterInput} errorMessage={errorMessage}/>
      </div>
      <h2>Add a New:</h2>
        <Form addPerson={addPerson} onChangeHandler={onChangeHandler} newName={newName} phoneHandler={phoneHandler} newPhone={newPhone}/>
      <h2>Numbers</h2>
        <Names filteredPersons={filteredPersons} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App