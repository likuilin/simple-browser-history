# simple-browser-history
This is a simple self-hosted browser history server.

## Description

This project consists of a Tampermonkey userscript and an express.js Node server with a mariadb backend.

The Tampermonkey script will run on all of the pages it can. Upon page load, it will issue a POST request to create a history entry, or a `navigation`.

Afterwards, it will create `tick` entries every minute until the next navigation event. Each tick records the current time and the page title. This allows for the duration the page is open to be guesstimated, as well as rudimentary recording of SPAs and whatnot that do not navigate the page to implement navigation.

Please read the code to understand the code, it's pretty simple.

## Usage

See `docker-compose.yml` to run the server. There is no custom docker image, it's just bind mounted into `node:24-alpine3.20`.

Visit `http://localhost:13131` or whatever to check that the server is running. The intended UI for browsing the history is just adminer.

Then, install the `userscript.js` as a Tampermonkey script, replacing the hardcoded URL with one that can reach the server.

## Security

Beware! This web application explicitly makes no security guarantees. Do not expose the server to the Internet. I self-host this in a tailnet that is considered secure.

## License

Licensed AGPLv3.
