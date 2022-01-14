const router = require('express').Router();
const axios = require('axios');
const { Country } = require('../db.js');
const { API } = process.env;
//-----------------------------------------------------------------------------------------------

// [ ] GET /countries:
// - En una primera instancia deberán traer todos los países desde restcountries 
// y guardarlos en su propia base de datos y luego ya utilizarlos desde allí 
// (Debe almacenar solo los datos necesarios para la ruta principal)


router.get('/', async(req,res)=>{
	try{
		//Trae todos los datos de la api y 
		//los guarda en la tabla Country del psql 
		const countryApi = await axios.get(API);
		countryApi.data.forEach(e=>{
			Country.findOrCreate({				
				where: {
					name: e.name.common
				},
				defaults:{
					id: e.cca3,
					name: e.name.common,
					flag: e.flags.svg,
					continents: e.continents,
					capital: e.capital || ['empty'],
					subregion: e.subregion || 'empty',
					area: e.area,
					population: e.population,
					maps: e.maps.googleMaps				}
			})
		})

	} 	catch (err) {
		res.status(404).json({err})
	}
		return	console.log('api loaded');
})

module.exports = router;