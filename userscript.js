// ==UserScript==
// @name         simple-browser-history
// @namespace    https://github.com/likuilin/simple-browser-history
// @version      2025-05-11
// @description  Sends visited URLs to a central browser history recorder.
// @author       kuilin
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @connect      192.168.0.11
// ==/UserScript==

(function() {
    'use strict';

    const server = "http://192.168.0.11:13131" // also change the @connect above!

    let navid = "new";
    const tick = () => {
        const data = {navid, url: document.location.href, title: document.title};
        if (navid === "new") data.tzname = Intl.DateTimeFormat().resolvedOptions().timeZone;

        GM_xmlhttpRequest({
            method: "POST",
            url: server + "/tick",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data),
            onload: response => {
                navid = JSON.parse(response.responseText).navid;
            }
        });
    };
    setInterval(tick, 60*1000);
    tick();
})()
