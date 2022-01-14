const {Router} = require('express');

//---------------------------------------------------------------------------------------------
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//Se traen las rutas de sus respectivos paths
const activityRue = require('./activity.js');
const countriesRue = require('./countries.js');
const getCountriesRue = require('./getCountries.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(activityRue)
router.use(countriesRue)
router.use(getCountriesRue)


module.exports = router;



