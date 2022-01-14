const initialState = {
	//estado base que contiene todos los paises 
	countries:[],
	//copia de estado anterior para realizar los cambios
	//sin afectar el base
	allCountries:[],
	//estado que contiene todas las activades con el 
	//pais asignado
	activities:[],
	//estado que guarda los detalles de /countries/:id
	detail:[]
}
//-------------------------------------------------------------------------------------------------------------------

function rootReducer(state= initialState, action){
	switch(action.type){
		case 'GET_COUNTRIES':
			return{
				...state,
				countries: action.payload,
				allCountries: action.payload
			}

		case 'GET_NAME':
			return{
				...state,
				countries: action.payload,
				allCountries: action.payload
			}

		case 'GET_DETAIL':
			return{
				...state,
				detail: action.payload
			}

		case 'GET_ACTIVITIES':
			return{
				...state,
				activities: action.payload,
			}
		// case 'POST_ACTIVITY':
		// 	return{
		// 		...state
		// 	}
		case 'BY_ACTIVITY':
			const countriesAll = state.allCountries
			const activitiesFilter = action.payload === "All"?
			countriesAll : countriesAll.filter(e=>e.activities.includes(action.payload))
			return{
				...state,
				countries: activitiesFilter
			}	 
		
		case 'BY_CONTINENTS':
			const allCountries = state.allCountries
			const continentFiltered = action.payload === "All"?
			allCountries : allCountries.filter(e=>
			e.continents[0] === action.payload)
			return{
				...state,
				countries: continentFiltered
			}

		case 'BY_POPULATION':
			let populationFilter = action.payload === "Population+"?
			state.countries.sort((prev,next)=>{
				if(next.population > prev.population){
					return 1
				}
				if(next.population < prev.population){
					return -1
				}
				return 0
			}) 
			:state.countries.sort((prev,next)=>{
				if(next.population > prev.population){
					return -1
				}
				if(next.population < prev.population){
					return 1
				}
				return 0
			}) 
			return{
				...state,
				countries: populationFilter
			}

		case 'BY_NAME':
			let sortedArr = action.payload === "Asc"?
					state.countries.sort((a,b)=>{
				if(a.name > b.name){
					return 1;
				}
				if(b.name > a.name){
					return -1;
				}
				return 0;
			})   
				:state.countries.sort((a,b)=>{
				if(a.name > b.name){
					return -1;
				}
				if(b.name > a.name){
					return 1;
				}
				return 0;
			})
			return{
				...state,
				countries: sortedArr 
			}
			default:
			return state;
	}
}
export default rootReducer;