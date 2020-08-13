'use-strict';

const Shopify = use('App/Helpers/Shopify');
const ShopifyApi = use('App/Helpers/ShopifyApi');
const User = use('App/Models/User')
const Helper = use('App/Helpers/Helper');


class ShopifyAuth {
	
	async login(request,response,auth,session){
		let user = await User.query()
        .where('name' , request.input('shop'))
        .first();
        if(user){
            if(!user.password){
                const res = await Helper.axios(Shopify.makeTokenUrl(request.input('shop')),'post',Shopify.makeTokenData(request.input('code')));
                await user.merge({password : res.body.access_token});
            }
        }else{
        if(Shopify.hmac(request)){
            if(Shopify.hostName(request)){   
                const res = await Helper.axios(Shopify.makeTokenUrl(request.input('shop')),'post',Shopify.makeTokenData(request.input('code'))); 
                if(res.err){
                    Helper.flash(session,res.response);
                    return response.route('login');
                }  
                const email = await ShopifyApi.graph(request.input('shop'), res.access_token, 'shopQuery',['email'],['shop','email']);
                if(email.errors){
                    Helper.flash(session,email.body);
                    return response.route('login');
                }
                user = await User.create({
                    name: request.input('shop'),
                    email : email.body,
                    password : res.access_token
                });
            }
        }
        }
        if(user){
            await auth.login(user);
            if(await Shopify.createDefaultWebhooks(auth.user.name,auth.user.password)){
                return response.route('index');
            }else{
                Helper.flash(session,"Problem Creating Webhooks");
                return response.route('login');
            }      
        }
        Helper.flash(session,"Something Went Wrong.");
        return response.route('login');
	}
}
module.exports = new ShopifyAuth();