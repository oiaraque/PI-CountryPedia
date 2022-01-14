import React from 'react';
import {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries,
		 getActivities,
		 byActivity, 
		 byContinents,
		 byPopulation,
		 byName
		  } 
from '../actions/index.js';

import '../styles/Home.css';
import Card from './Card.jsx';
import Paginado from './Paginado.jsx';
import SearchBar from './SearchBar.jsx';

//----------------------------------------------------------------------------------------------------

export default function Home(){

	const dispatch = useDispatch();
	//trae los estados donde se encuentan todas las actividades y estados
	const allCountries = useSelector(state=>state.countries)
	const allActivities = useSelector(state=>state.activities)

	//sirve para setear la pag actual, modifica el estado local
	//y se renderiza 
	const [orden, setOrden] = useState("")
	// const [loading, setLoading] = useState(true)
	

	//ESTADOS LOCALES
	//estado de la pag actual y estado que setea la pag
	const [currentPage, setCurrentPage]= useState(1)
	//estado que devuelve cuantos paises hay por pagina
	const [countriesPerPage, setCountriesPerPage]= useState(10)
	//constante indice del ultimo pais
	const indexOfLastCountry = currentPage*countriesPerPage
	//constante indice del primer pais
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
	//constante de los paises en la pagina actual
	const currentCountry = allCountries.slice(
		indexOfFirstCountry,indexOfLastCountry)
	
	//constante del paginado
	const paginado = (pageNumber)=>{
		setCurrentPage(pageNumber)
	}

//-----------------------------------------------------------------------------------------------------

	//cada vez q se renderice se van a ejecutar
	//las siguientes acciones
	useEffect(()=>{
		// setLoading(true)
		dispatch(getCountries(orden),
		dispatch(getActivities()));
		// setLoading(false)
	},[dispatch])

//-----------------------------------------------------------------------------------------------------

	//HANDLERS
	function handleClick(e){
		e.preventDefault();
		dispatch(getCountries());
	}	

	function handleFilterContinent(e){
		dispatch(byContinents(e.target.value))
	}

	function handleFilterActivity(e){
		dispatch(byActivity(e.target.value))
	}

	function handleFilterPopulation(e){
		e.preventDefault();
		dispatch(byPopulation(e.target.value))		
		setOrden(byPopulation(e.target.value))	
	}

	function handleSort(e){
		e.preventDefault()
		dispatch(byName(e.target.value))
		//cuando se hace ordenamiento que setee en 
		//la primera pagina
		setCurrentPage(1)
		//el estado arranca vacio y se setea ordenado
		setOrden(byName(e.target.value))
	}

//----------------------------------------------------------------------------------------------------

	return(
	<div className="homeContainer">
		<SearchBar className="searchBar" />		
		<h1>COUNTRYPEDIA</h1>
		<button onClick={e=>{handleClick(e)}}
		 className="reload">
			Reload all countries
		</button>
		<Link to='/activity'><button className="activity">			
		Create Activity</button></Link>
		<div>
		<div className="order">			
		<div className="alfabetico">			
		{/*Debe ser filtrado por orden alfabetico*/}
		<select onChange={e=>handleSort(e)}>
			<option value="Asc">Ascendente</option>
			<option value="Desc">Descendente</option>
		</select>
		</div>
		<div className="continente">			
		{/*Debe ser filtrado por continente*/}
		<select onChange={e=>handleFilterContinent(e)}>
			<option value="All">Todos</option>
			<option value="Africa">Africa</option>
			<option value="Asia">Asia</option>
			<option value="Europe">Europe</option>
			<option value="Oceania">Oceania</option>
			<option value="North America">North America</option>
			<option value="South America">South America</option>
		</select>
		</div>
		<div className="poblacion">			
		{/*Debe ser filtrado por orden poblacion*/}
		<select onChange={e=>handleFilterPopulation(e)}>
			<option value="Population+">Population +</option>
			<option value="Population-">Population -</option>		
		</select>
		</div>
		<div className="actividad">			
		{/*Debe ser filtrado por actividad*/}
		<select onChange={e=>handleFilterActivity(e)}> 
			<option value="All">All</option>
			{allActivities && allActivities.map(a =>(
			<option value={a.name}>{a.name}</option>
				))}
		</select>	
		</div>
		</div>
		
		<Paginado 
			class="paginado"
			countriesPerPage={countriesPerPage}
			allCountries={allCountries.length}
			paginado={paginado}
		/>
		
		<div className="cards">			
		{/*Se hace map al nuevo array de countries, para renderizar
		solo los necesarios x pagina*/}
		{
			currentCountry.length ? (
				currentCountry === 'Not found' ? (
					<p>The country that you are looking does not exist</p>
					) : (
			currentCountry?.map(c=>{
				return(
					<div>
						<Link to={"/home/" + c.id}>
							<Card 
							name={c.name} 
							flag={c.flag}
							continents={c.continents}/>
						</Link>
					</div>
				)
			})		
			)) : (<p>The country that you are looking does not exist</p>)
		}
			</div>
		</div>
	</div>	
	)
}