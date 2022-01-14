import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import getName from '../actions/index.js';
import '../styles/SearchBar.css';

//-----------------------------------------------------------------------------------------------------------------

export default function SearchBar(){
	const dispatch = useDispatch()
	const [name, setName] = useState("")

//-----------------------------------------------------------------------------------------------------------------
	
	//HANDLERS
	function handleInputChange(e){
		e.preventDefault()
		setName(e.target.value)
	}

	function handleSubmit(e){
		e.preventDefault()
		dispatch(getName(name))
	}

//-----------------------------------------------------------------------------------------------------------------

	return(
		<div className="searchBox">
			<input className="searchText" type="search" placeholder="Search..." 
			onChange={e=>handleInputChange(e)}/>
			<button type="submit"
			onClick={e=>handleSubmit(e)}>
		 	Search
			</button>
		</div>
	)
}