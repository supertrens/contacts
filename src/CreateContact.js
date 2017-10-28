import React , {Component} 	from "react"
import {Link} 				from "react-router-dom"
import serializeForm		from "form-serialize"
import ImageInput 			from "./ImageInput"

class CreateContact extends Component{

// To ask the app to stop submiting the form through URL
	handleSubmit =(e) =>{
		e.preventDefault();
		const values = serializeForm(e.target , {hash : true});

		//to check if the user add something , if he does we save it
		if(this.props.onCreateContact)
			this.props.onCreateContact(values);
	}

	render(){
		return(
			<div>
				<Link to="/" className="close-create-contact"> Close </Link>
				<form onSubmit ={this.handleSubmit}className = "create-contact-form">
					<ImageInput
						className="create-contact-avatar-input"
						name= "avatarURL"
						maxHeight={64}
					/>

					<div className ="create-contact-details">
						<input type="text" name="name" placeholder="your Name"/>
						<input type="text" name="email" placeholder="your Email"/>
						<button> Add Contact </button>
					</div>
				</form>
			</div>
		)
	}
}




export default CreateContact