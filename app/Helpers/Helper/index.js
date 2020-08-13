'use-strict';

const Logger = use('Logger');
const axios = require('axios');

class Helper {
	
	log(data,type = 'info'){
		function info () {
			Logger.transport('file').info(data);
		}
		function error () {
			Logger.transport('file').error(data);
		}

		var types = {
		  info: info,
		  error: error,
 		};
		return types[type]();
	}

	flash (session ,data ,type = "error") {
		function success () {
			session.flash({type : 'success' , msg : data });
		}
		function error () {
			session.flash({type : 'error' , msg : data });
		}
		function none(){
			session.flash(data);
		}
		var types = {
		  success: success,
		  error: error,
		  none : none
 		};
		return types[type]();
	}

	async axios(url, type = "GET", data = {}) {
		// this.log([url,type,data]);
		try {
			let response =  await axios({
				method: type,
				url: url,
				data: data,
			});
			return response.data;
		} catch (error) {
			let err = { errors:true };
			if (error.response) {
				/*
				 * The request was made and the server responded with a
				 * status code that falls out of the range of 2xx
				 */
				this.log(error.response);
				err.error = error.response;
			} else if (error.request) {
				/*
				* The request was made but no response was received, `error.request`
				* is an instance of XMLHttpRequest in the browser and an instance
				* of http.ClientRequest in Node.js
				*/
				this.log(error.request);
				err.error = error.request;
			} else {
				// Something happened in setting up the request and triggered an Error
				this.log(error.message);
				err.error = error.message;
			}
			return err;
		}

	}
}
module.exports = new Helper();