'use strict'

class UserController {
	show({view}){
		return view.render('theme.dashboard')
	}
	async logout({auth,response}){
		await auth.logout()
		return response.route('login')
	}
}

module.exports = UserController
