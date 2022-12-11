const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/launch", (req, res) => {
  const subProcess = require("child_process");
  subProcess.exec(
    // "docker build -t getting-started . &&
    `docker run -d -p 300:300 nginx`,
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
  res.send("launching....");
});

app.get("/close", (req, res) => {
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
