"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const redis = require("../redis");
/*
 * GET /user/get : to get all the users
 */
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield redis.getAll();
            if (!result) {
                res.status(200).send({ message: "No users found", user: [] });
            }
            else {
                res.status(200).send({ message: "Users found", user: result });
            }
        }
        catch (err) {
            console.log(err);
            res.status(200).send({ message: err, user: [] });
        }
    });
}
/*
 * POST /user/ : to add a new user
 */
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = uuid_1.v4();
        const userdata = req.body;
        userdata.id = userId;
        try {
            let result = yield redis.addUser(userId, userdata);
            if (result) {
                res.status(200).send({ message: "User Added Successfully", userId });
            }
        }
        catch (err) {
            console.log(err);
            res.status(200).send(err);
        }
    });
}
/*
 * GET /user/:id to get a user
 */
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        try {
            let result = yield redis.getUser(id);
            if (!result) {
                res.status(200).send({ message: "No user found with given Id", user: [] });
            }
            else {
                res.status(200).send({ message: "User found with given Id", user: [result] });
            }
        }
        catch (err) {
            console.log(err);
            res.status(200).send({ message: err, user: [] });
        }
    });
}
/*
 * DELETE /user/:id : to delete a user
 */
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        try {
            let result = yield redis.deleteUser(id);
            if (!result) {
                res.status(200).send({ message: "No user found with given Id", user: [] });
            }
            else {
                res.status(200).send({ message: "User deleted successfully", user: [] });
            }
        }
        catch (err) {
            console.log(err);
            res.status(200).send({ message: err, user: [] });
        }
    });
}
/*
 * PUT /user/:id : to update a user
 */
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.id;
        const userdata = req.body;
        try {
            let result = yield redis.addUser(userId, userdata);
            if (result) {
                res.status(200).send({ message: "User Updated Successfully", user: [] });
            }
            else {
                res.status(200).send({ message: "No user found with given Id", user: [] });
            }
        }
        catch (err) {
            console.log(err);
            res.status(200).send(err);
        }
    });
}
//export the required functions
module.exports = { getUsers, addUser, getUser, deleteUser, updateUser };
