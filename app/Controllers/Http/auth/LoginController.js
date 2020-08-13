"use strict";


const Shopify = use('App/Helpers/Shopify');
const ShopifyAuth = use('App/Helpers/ShopifyAuth');
var url = require('url');




class LoginController {
  loginForm({ view }) {
    return view.render("auth.login");
  }
  login({request,response}){
    let domainName = url.parse(request.input('domainName')).hostname;
    return response.redirect(Shopify.makeLoginUrl(domainName),true);
  }
  async loginRedirect({request,response,auth,session}){
    await ShopifyAuth.login(request,response,auth,session);
  }
}
module.exports = LoginController;
