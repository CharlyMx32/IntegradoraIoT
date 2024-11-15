/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})



const LoginController = () => import('#controllers/login_controller')
router.post('login', LoginController)

const RegistrosController = () => import('#controllers/registros_controller')
router.resource('registros', RegistrosController)
