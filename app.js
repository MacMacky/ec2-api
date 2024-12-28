const express = require("express");
const app = express();
const os = require("os");
const PORT = process.env.PORT || 80;

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];

    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      )
        return alias.address;
    }
  }
  return "0.0.0.0";
}

app.get("/", (_, res) => {
  res.send("OK");
});

app.get("/ip", (_, res) => {
  res.send(`Server IP Address: ${getIPAddress()}`);
});

app.listen(PORT, () => {
  console.log(`Service listening at port: ${PORT}`);
});
