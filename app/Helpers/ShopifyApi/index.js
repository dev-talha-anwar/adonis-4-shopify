'use-strict';

const Config = use('Config');
const axios = require('axios');
const Shopify = use('App/Helpers/Shopify');
const Helper = use('App/Helpers/Helper');

class ShopifyApi {
		
	shop(token,name){
		if(!this.token){
			this.token = token;
		}
		if(!this.name){
			this.name = name;
		}
	}

	async apiCall(url, type, data){
		try {
			let response =  await axios({
				url: url,
				method: type,
				data: data,
				headers : {
					"X-Shopify-Access-Token" : this.token,
					"content-type": "application/json"
				}
			});
			response =  response.data;
			response.err = false;
			return response;
		} catch (error) {
			error.err = true;
			return error;
		}
	}
	
	async rest(name, token, api,api_get_fields = undefined, api_post_fields = undefined,api_required_fields = undefined){
		this.shop(token,name);
		let call =  await this.apiCall(this.makeUrl( api , api_get_fields), Config.get(`constants.rest.${api}.method`), api_post_fields);
		if(!res.err){
			const errors=  false;
			const status = call.statusCode;
			const response = call;
			let link = null;
			if (call.header('Link',false)) {
				link = Shopify.extractLinkHeader(call.header('Link')[0]);
			}
			if(api_required_fields){
				for (const value of api_required_fields) {
					if(!call.hasOwnProperty(value)){
						return call;
					}
					call = call[value];
				}
			}
			return {
				'errors' : errors,
				'status' : status,
				'response' : response,
				'body' : call,
				'link' : link
			};
		}else{
			let response = "";
			if(call.body){
				response = call.body;
			}
			const error = {
				'errors' : true,
				'status' : call.response.status,
				'response' : call.response,
				'body' : response
			};
			return error;
		}
	}

	makeUrl(api,data = undefined){
		let url = [];
		url.push('https://'+this.name);
		for (const value of Config.get(`constants.rest.${api}.endPoint`)) {
			if(data){
				url.push(value,data);
				data = undefined;
			}else{
				url.push(value);
			}
		}
		return url.join('');
	}

	async graph(name, token, query, parameters = undefined,api_required_fields = undefined, api_type = 'query',other_params = undefined){

		this.shop(token,name);
		let url = 'https://'+this.name+Config.get(`constants.graph.endpoint`);
		let call =  await this.apiCall( url, Config.get(`constants.graph.method`), this.makeGraphRequest(query , parameters, api_type, other_params));
		const response = call.body;
		call = call.body;
		if(call.hasOwnProperty('data')){
			call = call.data;
		}
		if(api_required_fields){
			for (const value of api_required_fields) {
				if(!call.hasOwnProperty(value)){
					return call;
				}
				call = call[value];
			}
		}
		return {
			'errors' : call.hasOwnProperty('errors'),
			'response' : response,
			'body' : call,
		};
	}
	
	makeGraphRequest(query,parameters = undefined,api_type = 'query',other_params = undefined){
		let data = [];
		let count = 0;
		for (const value of Config.get(`constants.graph.${api_type}.${query}`)) {
			if(parameters){
				data.push(value);
				for(const param of parameters){
					data.push(param);
				}
				parameters = undefined;
			}else{
				data.push(value);
			}
			if(other_params){
				if(other_params.length-1 >= count){
					data.push(other_params[count]);
				}
			}
			count++;
		}
		return JSON.stringify({ [api_type] : data.join(' ')});
	}

	async getAllWebhooks(name,token){
		const res = await this.rest(name,token,'getAllWebhooks',undefined,undefined,['webhooks']);
		if(!res.errors){
			return res.body
		}
		return false;
	}
}
module.exports = new ShopifyApi();