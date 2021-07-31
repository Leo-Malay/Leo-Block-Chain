// Importing the requirements.
const express = require("express");
const db = require("./db");
const Blockchain = require("./Blockchain");
const path = require("path");
var ip = require("ip");
// Defining the constants.
const app = express();
const Route = express.Router();
const blockchain = new Blockchain();
const db_node = "node_pool";
const db_block = "data_block";
// Configuring the app.
app.use(express.static("public"));
app.use(express.urlencoded({ extended: !0 }));
app.use(express.json());
app.use("/public", express.static("public"));

// Configuring the routes
Route.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});
Route.post("/data", (req, res) => {
    var resp = blockchain.newBlock(Date.now(), req.body);
    if (resp == true) {
        var lb = blockchain.lastBlock();
        var query = {
            index: lb.index,
            timestamp: lb.timestamp,
            data: lb.data,
            prevHash: lb.prevHash,
            hash: lb.hash,
        };
        db.getDB()
            .collection(db_block)
            .insertOne(query, (err, result) => {
                if (err) throw err;
                res.json({ success: true });
            });
    }
});
Route.post("/connect", (req, res) => {});
Route.post("/disconnect", (req, res) => {});
Route.get("/node_ls", (req, res) => {});
Route.get("/valid_chain", (req, res) => {
    var isVaild = blockchain.isValidChain();
    res.json({ isValid: isVaild, lastHash: blockchain.lastBlock().hash });
});

app.use("/", Route);
// Starting the server.
const port = process.env.PORT || 2905;
db.connect((err) => {
    if (err) throw err;
    db.getDB()
        .collection(db_block)
        .find({})
        .toArray((err, arr) => {
            if (err) throw err;
            console.log(
                "[+] Creating Blockchain\n[+] Total Blocks: ",
                arr.length
            );
            arr.map((ele) => {
                blockchain.newBlock(ele.timestamp, ele.data);
            });
            console.log("[+] Blockchain Valid?", blockchain.isValidChain());
        });
    app.listen(port, () => {
        console.log(
            "[+] Started at --> http://" + ip.address() + ":" + port + "/"
        );
    });
});
/**
 * node_pool --> [admin_url, node_url]
 * data_pool --> [data]
 */
