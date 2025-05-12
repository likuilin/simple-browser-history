const process = require("process");
const fs = require("fs");

const express = require("express");
const morgan = require("morgan");

const mariadb = require('mariadb');

(async () => {
    const app = express();
    app.use(morgan("combined"));
    app.use(express.json());
    // app.set("trust proxy", 1);

    const db = mariadb.createPool({
       host: 'db',
       database: 'browserhistory',
       user: 'web',
       password: 'web'
    });

    app.get("/", (req, res) => res.send("OK"));

    app.post("/tick", (req, res, next) => {
      (async () => {
        let {navid, url, title} = req.body;

        // new nav if it's a new nav
        if (navid === "new") {
          let {tzname} = req.body;
          const [r] = await db.query("insert into navigations (tzname) values (?) returning navid;", [tzname]);
          navid = r.navid;
        } else navid = +navid;

        // parse domain, can fail
        let domain = "";
        try {
          domain = (new URL(url)).hostname;
        } catch (_) {}

        // save
        await db.query("insert into ticks(navid, domain, url, title) values (?, ?, ?, ?);",
          [navid, domain, url, title]);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({navid}));
      })().then(() => next()).catch(err => next(err));
    });

    await new Promise(resolve => app.listen(3000, () => resolve()));

    console.log("Listening on port 3000");
})().catch(console.error);
