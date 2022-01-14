const router = require('express').Router();
const { Country, Activity } = require('../db.js');

//------------------------------------------------------------------------------------------------


 //  [ ] POST /activity:
 //  - Recibe los datos recolectados desde el formulario controlado 
 //	   de la ruta de creación de actividad turística por body
 //  - Crea una actividad turística en la base de datos


router.post('/activity', async(req,res)=>{
	let {
		name,
		dificulty,
		duration,
		season,
		countries
	
	} = req.body

	try{
	//Se crea la actividad en la tabla Activity, en la cual, se para un name
	//que verifique si existe, de no ser asi, usa el defaults para crearla.		
	const [newActivity, validate] = await Activity.findOrCreate({
		 where:{
		 	name
		 },
		 defaults:{	
			dificulty,
			duration,
			season 
		 }
	})
	//El mapeo y validacion asignan a la constante el name (que se pasa desde body)
	//de los paises de la tabla Country
	validate && countries.map(async e=>{
		const country = await Country.findOne({
			where:{
				name: e
			}
		})
	//Se agrega al pais la actividad creada
		country.addActivity(newActivity);			 
	})
		res.send('Activity created successfully');
	
	} catch(err){
		res.send(err);
	}
})

//-----------------------------------------------------------------------------------------------


 //  [ ] GET /activities:
 //  - Obtener un listado de las actividades
 //  - Obtener los países que coincidan con el nombre pasado como query parameter 

router.get('/activities', async(req,res)=>{
	const {name} = req.query
	//Se asigna a la constante el ternario que habilita la posibilad de buscar x 
	//query el nombre de actividad
	const activity = name
	? {where: {name}}
	: {}
	//Se guarda en la constante toda la info de la tabla Activity incluyendo 
	//el contenido de a tabla Country
	const activities = await Activity.findAll(activity, {
		include: Country
	})
	res.json(activities);
})

module.exports = router;