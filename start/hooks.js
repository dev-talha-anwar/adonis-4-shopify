const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {

  const Exception = use('Exception')
  Exception.handle('InvalidSessionException', async (_error, { response }) => {
  		return response.route('login')
  })
  const View = use('View')
  const Env = use('Env')
  View.global('app_url', () => Env.get('APP_URL'))
  View.global('storageFile', (file) => Env.get('APP_URL')+"/storage/"+file)
})