import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getDetail} from '../actions/index.js'
import ActivityCard from './ActivityCard.jsx';
import '../styles/Detail.css';

//----------------------------------------------------------------------------------------------------------------

export default function Detail(props){
	const dispatch = useDispatch()
	const {id} = useParams()

	useEffect(()=>{
		dispatch(getDetail(id))
	}, [id, dispatch])

	const myCountry = useSelector(state=>state.detail)

//----------------------------------------------------------------------------------------------------------------
	
	return(
		<div>
			<div className="detailContainer">				
					
					<div>
						<Link to='/home'>
							<button className="btnDetail">Back</button>
						</Link>
					</div>

				

		
				

		<div className="detailProps">
				
			<img src={myCountry.flag} alt="img not found" id="flagCountry"/>
				<h2><strong>{myCountry.name}</strong></h2>
				<p>Capital: {myCountry.capital}</p>
				<p>Continent: {myCountry.continents}</p>
				<p>Population: {myCountry.population} habitants</p>
				<p>Area: {myCountry.area} km2</p>
		
			
					<p id="actTitle"><strong>Activities:</strong></p>

					{myCountry.activities && myCountry.activities.map(a=> 
					<ActivityCard 
					className="activityCard"
					name={a.name}
					dificulty={a.dificulty}
					duration={a.duration}
					season={a.season}
					/>)
					}
			

			</div>
			
			<a href={myCountry.maps}><button>{myCountry.name}</button></a>
				
			</div>
		</div>
	)
}