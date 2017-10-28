import React , {Component} from 'react'
import {Link}  from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {


  // This is the kind of props we are expecting
  static propTypes = {
	  contacts: PropTypes.array.isRequired,
	  onDeleteContact: PropTypes.func.isRequired
	}

  //Here is the component state
  state ={

  	query : ""
  }

 //This is the function that will be update when the user type in the
 //search box
 updateQuery = (query) =>{
 	this.setState ({query : query.trim()}) 
 }

 // This fuction will clear the query state
  clearQuery = () =>{
  	this.setState({query : ""});
  }


  render(){
 
 	//destructuring
 	const { contacts , onDeleteContact} = this.props ;
    const {query} = this.state;

    // This will be the filter array after reading and filter the user input
  	let showingContacts;

  	//This list will be update if the name REG exist in the array
  	if(query){
  		const match = new RegExp(escapeRegExp(query) , 'i')
  		showingContacts = contacts.filter((contact) => match.test(contact.name));
  	} else{
  		//we don't update anything, we just show the original array
  		showingContacts = contacts;
  	}

  	//We sort the contact names
  	showingContacts.sort(sortBy("name"));

	  return (
	    <div className ="list-contacts">
	    	<div className ="list-contacts-top">
	    		<input
	    			className="search-contacts"
	    			type ="text"
	    			placeholder = "Search contacts"
	    			value={query}
	    			onChange ={(event) => this.updateQuery(event.target.value)}
	    		/>

	    		<Link 
	    			to ="/create"
	    			className ="add-contact">
	    		 Add Contact </Link>
	    	</div>

	    	{
	    		showingContacts.length !== contacts.length && (
	    			<div className="showing-contacts">
	    				<span> Now Showing {showingContacts.length} of {contacts.length} total</span>
	    				<button onClick={this.clearQuery}> Show all </button>
	    			</div>
	    	)}

	    	<ol className='contact-list'>
	      		{showingContacts.map((contact) => (
	        	<li key={contact.id} className='contact-list-item'>
		          <div className='contact-avatar' style={{
		            backgroundImage: `url(${contact.avatarURL})`
		          }}/>

		          <div className='contact-details'>
		            <p>{contact.name}</p>
		            <p>{contact.email}</p>
		          </div>

		          <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
		            Remove
		          </button>
		        </li>
		      ))}
	    	</ol>
	    </div>
	  )
  	}
  
}



export default ListContacts