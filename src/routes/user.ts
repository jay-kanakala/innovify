import { v4 as uuidv4 } from 'uuid';
const redis = require("../redis");


/*
 * GET /user/get : to get all the users
 */
async function getUsers(req, res) {
    try {
        let result = await redis.getAll();
        if(!result){
            res.status(200).send({message: "No users found", user: []});
        }else{
            res.status(200).send({message: "Users found", user: result});
        }
    } catch(err) {
        console.log(err);
        res.status(200).send({message: err, user: []});
    }    
}



/*
 * POST /user/ : to add a new user
 */
async function addUser(req, res) {    
    const userId = uuidv4();
    const userdata = req.body;
    userdata.id = userId;
    try {
        let result = await redis.addUser(userId, userdata);
        if(result){
            res.status(200).send({message: "User Added Successfully", userId});
        }
    } catch(err) {
        console.log(err);
        res.status(200).send(err);
    }
}



/*
 * GET /user/:id to get a user
 */
async function getUser(req, res) {
    let id = req.params.id;
    try {
        let result = await redis.getUser(id);
        if(!result){
            res.status(200).send({message: "No user found with given Id", user: []});
        }else{
            res.status(200).send({message: "User found with given Id", user: [result]});
        }
    } catch(err) {
        console.log(err);
        res.status(200).send({message: err, user: []});
    }     
}



/*
 * DELETE /user/:id : to delete a user
 */
async function deleteUser(req, res) {
    let id = req.params.id;
    try {
        let result = await redis.deleteUser(id);
        if(!result){
            res.status(200).send({message: "No user found with given Id", user: []});
        }else{
            res.status(200).send({message: "User deleted successfully", user: []});
        }
    } catch(err) {
        console.log(err);
        res.status(200).send({message: err, user: []});
    }      
}


/*
 * PUT /user/:id : to update a user
 */
async function updateUser(req, res) {
    const userId = req.params.id;
    const userdata = req.body;
    try {
        let result = await redis.addUser(userId, userdata);
        if(result){
            res.status(200).send({message: "User Updated Successfully", user: []});
        }else{
            res.status(200).send({message: "No user found with given Id", user: []});
        }
    } catch(err) {
        console.log(err);
        res.status(200).send(err);
    }    
}

//export the required functions
module.exports = { getUsers, addUser, getUser, deleteUser, updateUser };