import React, { Component } from "react"
import {Route}              from "react-router-dom"
import ListContacts         from "./ListContacts"
import CreateContact        from "./CreateContact"
import * as ContactsAPI     from "./utils/ContactsAPI"




class App extends Component {

  state = {
    contacts : []
  }


// This fucntion will be called by React immediately after the 
//component mounted
  componentDidMount(){

    ContactsAPI.getAll().then((contacts) =>{
      this.setState({contacts})
    })
  }

//remove contact from the contact array
  removeContact = (contact) =>{

    this.setState((state)=>({
      //create a brand new array without theobject that we dont need
      contacts : state.contacts.filter((c) => c.id !== contact.id)
    }))

    //To also remove the contact from the back end server
    ContactsAPI.remove(contact);
  } //End of removeContact


//Add a new contact to the DB
    createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }



  render() {
    return (
      <div className ="app">  
        <Route exact  path="/" render={()=> (
            <ListContacts 
              onDeleteContact={this.removeContact} 
              contacts={this.state.contacts}
            />
          )}
        />

       <Route exact path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default App;