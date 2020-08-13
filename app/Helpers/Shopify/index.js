'use-strict';

const Config = use('Config');
const queryString = require('query-string');
const crypto = require('crypto');
const Helper = use('App/Helpers/Helper');


class Shopify {
	
	makeLoginUrl(domain){
		const url = {
			url :  `https://${domain}/admin/oauth/authorize`,
			query : {
				client_id: Config.get('shopify.api_key'),
				redirect_uri:Config.get('shopify.api_redirect'),
				scope:Config.get('shopify.api_scopes'),
			}
		};
		return queryString.stringifyUrl(url);
	}
	
	hmac(request){
		const secret = Config.get('shopify.api_secret')
		const message = queryString.parseUrl(request.originalUrl()).query;
		const hmac = message.hmac;
		delete message.hmac;
		const check = crypto.createHmac("sha256", secret).update(queryString.stringify(message)).digest("hex");
		return hmac == check
	}

	hostName(request){
		return request.input('shop').match(/[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com[\/]?/);
	}

	makeTokenUrl(domain){
		return `https://${domain}/admin/oauth/access_token`;
	}

	makeTokenData(code){
		return {
			client_id : Config.get('shopify.api_key'),
			client_secret : Config.get('shopify.api_secret'),
			code : code
		}
	}

	extractLinkHeader(header){
		links = {
			next : undefined,
            previous : undefined
		};
        regex = '/<.*page_info=([a-z0-9\-_]+).*>; rel="?{type}"?/ig';
		for (const type in links) {
			const matches = header.matches(type.replace('{type}', regex));
            links[type] = matches[1] ? matches[1] : undefined;
		}
		return links;
    }
	
	async createDefaultWebhooks(name,token){
		const defaultWebhooks = Config.get('shopify.webhooks');
		if(defaultWebhooks.length > 0){
			const res = await ShopifyApi.getAllWebhooks(name,token);
			if(res.errors){
				return false;
			}
			webhooks = res.body;
			if(webhooks.length <= 0){
				const webhooksToCreate = defaultWebhooks;
			}else{
				const webhooksToCreate = defaultWebhooks.filter((dwebhook) => {
					let flag = true;
					this.map((created) => {
						if(created.topic == this.dwebhook.topic){
							this.flag = false;
						}
					},{dwebhook,flag});
					return flag;
				},webhooks);
			}
			// Helper.log(webhooksToCreate);
			for await(const webhook of webhooksToCreate) {
				const res = await ShopifyApi.graph(name, token, 'addWebhook', undefined, undefined, 'mutation', [ webhook.topic, { callbackUrl : webhook.address }, webhook.topic, { callbackUrl : webhook.address } ]);
				if(res.errors){
					return false;
				}
			}
		}
	}
}
module.exports = new Shopify();