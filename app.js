const express = require("express");
const { stdout } = require("process");
var bodyParser = require('body-parser')
const app = express();
const port = 8000;

const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


const usingPortMinecraft = 25565
let serverList = []

app.get("/", (req, res) => {
  res.send("Hello World!");
});



console.log("You can acces the console with docker exec -i mc(numbreOfServer) rcon-cli");

app.get("/launch", (req, res) => {
  const subProcess = require("child_process");
  subProcess.exec(
    `docker run -d -it -p ${usingPortMinecraft + serverList.length}:${usingPortMinecraft} -e EULA=TRUE --name mc${serverList.length} itzg/minecraft-server`,

    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        console.log(`The stdout Buffer from shell: ${stdout.toString()}`);
        console.log(`The stderr Buffer from shell: ${stderr.toString()}`);
      }
    }
  );
  res.send(`launching on port :${usingPortMinecraft + serverList.length}`);
  serverList.push(usingPortMinecraft + serverList.length)
  
});

app.post("/close" ,(req, res) => {
  const subProcess = require("child_process");

  let numberOfServerPost = req.body.server;

  subProcess.exec(
    `docker rm mc${numberOfServerPost} --force`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        console.log(`The stdout Buffer from shell: ${stdout.toString()}`);
        console.log(`The stderr Buffer from shell: ${stderr.toString()}`);
      }
    }
  );
  res.send(`closing mc${numberOfServerPost}`);
  serverList.pop()
});

app.get("/purge", (req, res) => {
  const subProcess = require("child_process");
  console.log("purging");
  subProcess.exec(
    "docker system prune --volumes --force",
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        console.log(`The stdout Buffer from shell: ${stdout.toString()}`);
        console.log(`The stderr Buffer from shell: ${stderr.toString()}`);
      }
    }
  );
  res.send("purging everything.....")
});

app.get("/closeAll", (req, res) => {
  const subProcess = require("child_process");
  subProcess.exec(
    "docker rm $(docker ps -aq) --force",
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        console.log(`The stdout Buffer from shell: ${stdout.toString()}`);
        console.log(`The stderr Buffer from shell: ${stderr.toString()}`);
      }
    }
  );
  res.send("closing everything....");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

