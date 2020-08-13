"use strict";
const Route = use("Route");


//website routes
Route.get("/", "WelcomeController.index").as("index").middleware(['auth']);
Route.group(() => {
    Route.get("/login", "LoginController.loginForm").as('login');
    Route.post("/login", "LoginController.login").as('loginSubmit');
    Route.get("/authenticate", "LoginController.loginRedirect").as('loginRedirect');
}).namespace('auth').middleware(['guest']);

Route.get("/logs","LogController.index").as('logs');

Route.any("index.php",({ response }) => { 
    return response.route('login'); 
});
// Route.any("*","WelcomeController.index");