//add dependencies
import * as express from "express";
import * as bodyParser from "body-parser";
const user = require('./routes/user');
const config = require("config");

const app = express();
const port = config.get('app.port');


//we can set some environment specific stuff here
if(config.util.getEnv('NODE_ENV') === 'test') {
    console.log("This is test env");
}else if(config.util.getEnv('NODE_ENV') === 'dev'){
    console.log("This is dev env")
}


//parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

//route and call appropriate methods
app.get("/", (req, res) => res.json({message: "Welcome to innovify User management"}));

app.route("/user")
    .get(user.getUsers) //get all users
    .post(user.addUser); //to add a new user
app.route("/user/:id")
    .get(user.getUser) //to get a specific user with Id
    .delete(user.deleteUser) //to delete a specific user with Id
    .put(user.updateUser); // to update a specific user with Id
    

//start the server at port
app.listen(port);
console.log("Listening on port " + port);

//In case we have any uncaught exceptions or unhandled promises, we can do something about it like below
process.on("uncaughtException", e => {
    console.log("uncaughtException", e);
    process.exit(1);
  });
process.on("unhandledRejection", e => {
    console.log("unhandledRejection", e);
    process.exit(1);
});