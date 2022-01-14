import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {postActivity, getActivities} from '../actions/index.js';
import '../styles/ActivityCreate.css';

//---------------------------------------------------------------------------------------------------------------


// function validate(input){
// 	if(!input.name){
// 		alert('A name is required')
// 	} else if(!input.dificulty){
// 		alert('Choose a level of difficulty')
// 	} else if(!input.duration){
// 		alert('Insert time in minutes')
// 	} else if(!input.season){
// 		alert('A season is required')
// 	} else if(!input.countries.length <= 0){
// 		alert('You must choose the countries to your activity')
// 	}
// }


export default function ActivityCreate(){
	const dispatch = useDispatch();
	const navigate = useNavigate();  //react-router-dom v6 .. replace useHistory()
	const countries = useSelector(state=>state.countries)

	const [errors, setErrors] = useState({})
	const [input, setInput] = useState({
		name:'',
		dificulty:'',
		duration:'',
		season:[],
		countries:[]
	})

	useEffect(()=>{
		dispatch(getActivities())
	},[dispatch])

	// function validateName(value){
	// 	if(!/^[a-zA-Z]+$/.test(value)){
	// 		setErrors('The name must only contain letters')
	// 	} else {
	// 		setErrors('')
	// 	}
	// 	setInput(value)
	// }

//----------------------------------------------------------------------------------------------------------------

	//HANDLERS
	function handleChange(e){
		setInput({
			...input,
			[e.target.name] : e.target.value
		})
		// setErrors(validate({
		// 	...input,
		// 	[e.target.name] : e.target.value
		// }))
	}

	function handleCheck(e){
			setInput({
				...input,
				[e.target.name] : e.target.value
			})

		// 	setErrors(validate({
		// 	...input,
		// 	[e.target.name] : e.target.value
		// }))
	}

	function handleSeason(e){
		if(e.target.checked && e.target.id === 'season'){
			setInput({
				...input,
				[e.target.id]: [...input.season, e.target.value]		

			})
		// 	setErrors(validate({
		// 	...input,
		// 	[e.target.name]: [...input.season, e.target.value]
		// }))
		}
	}

	function handleSelect(e){
		setInput({
			...input,
			countries: [...input.countries, e.target.value]
		})
		// setErrors(validate({
		// 	...input,
		// 	[e.target.name] : e.target.value
		// }))
	}

	function handleSubmit(e){
		e.preventDefault()
		dispatch(postActivity(input))
		alert('Activity Created!!..')
		setInput({
			name: "",
            dificulty: "",
            duration: "",
            season: [],
            countries: []
		})
		navigate('/home')
	}

	function handleDelete(e){
		setInput({
			...input,
			countries: input.countries.filter(c=> c !== e)
		})
	}

//---------------------------------------------------------------------------------------------------------------

	return(
<div className="color">
			
			<Link to= '/home'>
				<button id="btn-home">Back</button>
			</Link>
	
	<div className="containerForm">
					
		

			<form onSubmit={e=> handleSubmit(e)}>

		 	<h2>Create an activity</h2>
		 	<p>Please fill in this form to create an activity</p>
		 	<hr/>


				<label>Name:</label><br/>					
				<input type="text" value={input.name} placeholder="Entry name" name="name" 
				 onChange={e=>handleChange(e)} required />	

			

			
				<br/><label>Duration:</label>				
				<input type="number" value={input.duration} name="duration" placeholder="Entry time in minutes"
				onChange={e=>handleChange(e)} required  />	




				<br/><label>Difficulty:</label>
				 <select name="dificulty" id="dificulty" onChange={e=>handleCheck(e)} required>				 	
				 <option value="">Choose an option</option>
				 <option value="1">1</option>
				 <option value="2">2</option>
				 <option value="3">3</option>
				 <option value="4">4</option>
				 <option value="5">5</option>
				 </select>





				{/*trae lista de paises por name*/}
				<br/><label>Country:</label>
				<select onChange={e=> handleSelect(e)} required>
					{countries.map(c=>(
                      <option value={c.name}>{c.name}</option>
						))}
				</select>



				{/*permite eliminar los paises seleccionados de la lista*/}
			{input.countries.map(e=>
				<div>
					<p>{e}</p>
					<button type='button' onClick={()=>
						handleDelete(e)}>X</button>
				</div>
				)}


				<label>Season:</label><br/>
				<label>					
				<input type="checkbox" value='Summer' id='season' onChange={e=>handleSeason(e)}/>
				 Summer </label>
				<label>					
				<input type="checkbox" value='Autumn' id='season' onChange={e=>handleSeason(e)}/>
				 Autumn </label>
				<label>					
				<input type="checkbox" value='Spring' id='season' onChange={e=>handleSeason(e)}/>
				 Spring </label>
				<label>					
				<input type="checkbox" value='Winter' id='season' onChange={e=>handleSeason(e)}/>
				 Winter </label>
			
				<br/><button type='submit'>Create</button>
			
			</form>
	</div>
</div>		
	)
}