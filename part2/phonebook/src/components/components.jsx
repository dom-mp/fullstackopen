const Notification = ({ errorMessage }) => {
  const addedStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }
}

export const Search = (props) => {
  const addedStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }

  return (
    <div>
    <h2>PhoneBook</h2>
    <div style={addedStyle}>
      <p>{props.errorMessage}</p>
    </div>
    filter shown with: <input onChange={props.filterHandler} value={props.filterInput}/>
  </div> 
  )
}

export const Form = (props) => {
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

export const Names = (props) => {
  const filteredPersons = props.filteredPersons;
  return (
    <div>
      {filteredPersons.map(person => {
        return (
            <p key={person.id} >{person.name} {person.phoneNum} <button onClick={props.deleteHandler(person.id)}>Delete</button></p>
        )
      })}
    </div>
  )
}

// {/* // <button onClick={props.deleteHandler}>Delete</button> */}