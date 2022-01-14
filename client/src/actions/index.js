import axios from 'axios';

//------------------------------------------------------------------------------------------------

//Conexion con el backend
export function getCountries(){
	return async function(dispatch){
		var json = await axios.get("http://localhost:3001/countries")
		return dispatch({
			type: 'GET_COUNTRIES',
			payload: json.data
		})
	}
}
//------------------------------------------------------------------------------------------------

//Dispara accion para usar SearchBar
export default function getName(name){
	return async function(dispatch){
		try{
		var json = await axios.get("http://localhost:3001/countries?name="+name)
		return dispatch({
			type: 'GET_NAME',
			payload: json.data
			})
		} catch (error) {
			return dispatch({
			type: 'GET_NAME',
			payload: 'Not found'	
			})
		}
	}
}
//-------------------------------------------------------------------------------------------------

//Dispara accion para ver detalle de pais
export function getDetail(id){
	return async function(dispatch){
		var json = await axios.get("http://localhost:3001/countries/"+id)
		return dispatch({
			type: 'GET_DETAIL',
			payload: json.data
		})
	}
}
//-------------------------------------------------------------------------------------------------

//Dispara accion que trae toda la tabla Activity en psql
export function getActivities(){
	return async function(dispatch){
		var json = await axios.get("http://localhost:3001/activities")
		return dispatch({
			type: 'GET_ACTIVITIES',
			payload: json.data
		})
	}
}
//-------------------------------------------------------------------------------------------------

//Dispara accion para enviar post del form a database psql
export function postActivity(payload){
	return async function(dispatch){
		var info = await axios.post("http://localhost:3001/activity", payload)
		.then(function (response) {})
        .catch(function (error) {});
	}
}
//-------------------------------------------------------------------------------------------------

//Dispara accion para filtrar por actividad
export function byActivity(payload){
	return{
		type: 'BY_ACTIVITY',
		payload
	}
}
//-------------------------------------------------------------------------------------------------

//Dispara accion para filtar por continente
export function byContinents(payload){
	return{
		type: 'BY_CONTINENTS',
		payload		
	}	
}
//-------------------------------------------------------------------------------------------------

//Dispara accion para filtrar por numero de poblacion
export function byPopulation(payload){
	return{
		type: 'BY_POPULATION',
		payload
	}
}
//--------------------------------------------------------------------------------------------------

//Dispara accion para organizar en orden alfabetico ("a-z" ; "z-a");
export function byName(payload){
	return{
		type: 'BY_NAME',
		payload
	}
}