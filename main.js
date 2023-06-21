const express = require('express')
const port = 3000;
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser");
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());

async function readFile() {
    return new Promise((resolve) => {
        if (fs.existsSync("./db")) {
            fs.readFile("./db", "utf8", (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                resolve(JSON.parse(data));
            });
        } else {
            return resolve([]);
        }
    });
}
app.post("/user/add", async (req, res) => {
    params = req.body;

    let getUserData = await readFile();
    
    getUserData.push(params);
    fs.writeFile("./db", JSON.stringify(getUserData), (error) => {
        if (error) {
            console.log("ERROR: Not create file");
            res.json({
                status: false,
                message: "not create file",
            });
        } else {
            // console.log("Successfully inserted");
            res.json({
                status: true,
                // message: "Successfully inserted",
            });
        }
        
    });
});
app.get("/user/get", async (req, res) => {
    let getUserData = await readFile();

    //console.log("Successfully inserted");
    res.json({
        status: true,
        message: "user get successfully",
        data: getUserData,
    });
    
});
app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`server is listening on PORT : //http://localhost:${port}`)
});