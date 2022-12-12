const express = require("express");
const { stdout } = require("process");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const usingPortMinecraft = 25565
let serverList = []
app.get("/launch", (req, res) => {
  const subProcess = require("child_process");
  subProcess.exec(
    // "docker build -t getting-started . &&

    `docker run -d -it -p ${usingPortMinecraft + serverList.length}:${usingPortMinecraft + serverList.length} -e EULA=TRUE --name mc${numbreOfServer.length} itzg/minecraft-server`,

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
  res.send(`launching on port :${usingPortMinecraft + numbreOfServer[-1]}`);
  serverList.push(usingPortMinecraft + serverList.length)
  
});

app.post("/close", (req, res) => {
  const subProcess = require("child_process");

  let numbreOfServerPost
  
  !!req.body.server ? numbreOfServerPost = req.body.server  : numbreOfServerPost = numbreOfServer;

  //var numbreOfServerPost = req.body.server;
  subProcess.exec(
    // "docker build -t getting-started . &&
    `docker stop mc${numbreOfServerPost} && docker rm mc${numbreOfServerPost} --force`,
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
  res.send("closing everything ");
  numbreOfServer --;
});

app.get("/closeAll", (req, res) => {
  const subProcess = require("child_process");
  subProcess.exec(
    // "docker build -t getting-started . &&
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
  console.log(`Example app listening on port ${port}`);
});

// subProcess.exec("docker rm $(docker ps -aq) --force", (err, stdout, stderr) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   } else {
//     console.log(`The stdout Buffer from shell: ${stdout.toString()}`);
//     console.log(`The stderr Buffer from shell: ${stderr.toString()}`);
//   }
// });
