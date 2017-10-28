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

        <Route path="/create" component = {CreateContact} />
      </div>
    )
  }
}

export default App;