import React from 'react';
import '../styles/Card.css';

//----------------------------------------------------------------------------------------------------------

export default function Card({name, continents, flag}){
	return(
		<div className="containerCard">
			<div className="card">				
			<img src={flag} alt="img not found"
			/>
			<h3>{name}</h3>
			<h5>{continents}</h5>
			</div>
		</div>
	)
}





