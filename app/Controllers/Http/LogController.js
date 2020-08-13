'use strict'
const Helpers = use('Helpers')
const fs = require('fs');
const queryString = require('query-string');

class LogController {
    async index({view,request,response}){ 
        let query = queryString.parseUrl(request.originalUrl()).query
        let data = [];
        if(query.clean){
            await fs.truncate(Helpers.tmpPath('adonis.log'), 0, (err) => {});
            return response.json({data : data});
        }
        const readline = require('readline');
        let myInterface = readline.createInterface({
            input: fs.createReadStream(Helpers.tmpPath('adonis.log')),
        });
        for await (const line of myInterface) {
            data.push(line);
        }
        if (request.ajax()) {
            const content =view.render('logs.table', { data : data });
            return response.json({data : content});
        }
        return view.render("logs.log", { data : data });
    }
}

module.exports = LogController
