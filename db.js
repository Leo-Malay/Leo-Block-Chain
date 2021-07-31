const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const OId = require("mongodb").ObjectId.createFromHexString;
const mongoOption = { useNewUrlParser: !0, useUnifiedTopology: !0 };
const url =
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
const dbname = "Leo-Block-Chain";

const state = { db: null };
connect = (cb) => {
    state.db
        ? cb()
        : MongoClient.connect(url, mongoOption, (err, client) => {
              err ? cb(err) : ((state.db = client.db(dbname)), cb());
          });
};
getID = (_id) => ObjectId(_id);
getOID = (_id) => OId(_id);
getDB = () => state.db;
module.exports = {
    getDB: getDB,
    connect: connect,
    getID: getID,
    getOID: getOID,
};
