var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const redis = require('redis');
const config = require("config");
const redisOptions = {
    host: config.get('redisOptions.host'),
    port: config.get('redisOptions.port'),
    password: config.get('redisOptions.password')
};
const client = redis.createClient(redisOptions);
client.on('connect', function (result) {
    console.log("Redis server connected ");
});
client.on('error', function (result) {
    console.log("error " + result);
});
exports.getAll = () => {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        let users = [];
        client.keys('*', function (err, keys) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return reject(err);
                if (keys.length == 0)
                    return resolve(users);
                let j = 0;
                for (var i = 0, len = keys.length; i < len; i++) {
                    client.hgetall(keys[i].toString(), (errIn, result) => {
                        if (errIn)
                            return reject(errIn);
                        users.push(result);
                        j++;
                        if (j == len)
                            return resolve(users);
                    });
                }
            });
        });
    }));
};
exports.addUser = (Id, data) => __awaiter(this, void 0, void 0, function* () {
    //return client.hmset(Id, data);
    return new Promise((resolve, reject) => {
        client.hmset(Id, data, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
});
exports.getUser = (Id) => {
    return new Promise((resolve, reject) => {
        client.hgetall(Id, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};
exports.deleteUser = (Id) => {
    return new Promise((resolve, reject) => {
        client.del(Id, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};
