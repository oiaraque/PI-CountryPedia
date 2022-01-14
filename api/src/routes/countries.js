const router = require('express').Router();
const { Activity, Country } = require('../db.js');

//---------------------------------------------------------------------------------------------------------------------------


// - [ ] GET /countries:
// - Obtener un listado de los paises.
// - Obtener los países que coincidan con el nombre pasado como query parameter 
//   (No necesariamente tiene que ser una matcheo exacto)


router.get('/countries', async(req,res)=>{
	
	const {name} = req.query;

	//La constante almacena ya sea todo el contenido de la tabla Country
	//por la propiedad name para buscar por query incluyendo el contenido
	//de la tabla Activity, en caso que exista un name. De lo contrario,
	//trae todo el contenido de la tabla Country sin la busqueda por name
	//permitiendo matchear las actividades creadas y filtrar por pais asignado. 
	const countries = name ? await Country.findAll({
					where:{name},
					include:[{
	                model:Activity,
	                attributes:["name"], 
	                through:{
	                    attributes:[]
	                } }] }) 
				: await Country.findAll({
	            include:[{
	                model:Activity,
	                attributes:["name"], // se relacionan las actividades de cada país
	                through:{
	                    attributes:[]
	                }
	            }]
	        })	
	
	//La respuesta devuelve un mapeo de la constante con la finalidad de 
	//convertir todos los elementos en un array de strings que facilita el
	//matcheo del filtrado por actividad.	
		res.json(countries.map(e=>{
			return{
				id: e.id,
				name: e.name,
				flag: e.flag,
				continents: e.continents,
				capital: e.capital,
				subregion: e.subregion,
				area: e.area,
				population: e.population,
				activities: e.activities.map(e=>e.name),
				maps: e.maps
			}
		}));
	});

//----------------------------------------------------------------------------------------------------------------------------


//   [ ] GET /countries/{idPais}:
//   - Obtener el detalle de un país en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de país
//   - Incluir los datos de las actividades turísticas correspondientes


router.get('/countries/:id', async(req,res)=>{
	const { id } = req.params;
	//Almacena en la constante los datos de la tabla Country
	//buscando por el id del pais. e.g('GBR') incluyendo la
	//tabla de las actividades creadas.
	const countryTotal = await Country.findByPk(id, {
		include: Activity
	});
	res.json(countryTotal || 'Country not found');	
})


module.exports = router;