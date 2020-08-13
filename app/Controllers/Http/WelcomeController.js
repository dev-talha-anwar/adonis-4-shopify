'use strict'

const ShopifyApi = use('App/Helpers/ShopifyApi');
const Helper = use('App/Helpers/Helper');


class WelcomeController {

	async index ({ view }) {
		// const res = await ShopifyApi.graph(auth.user.name, auth.user.password,'shopQuery',['email']);
		// Helper.info(res);
    	return view.render('index');
  	}
}

module.exports = WelcomeController
