'use strict';

module.exports = app => {
    const date = new Date();
    const puppeteer = require('puppeteer');
    const fs = require('fs');
    const mockedUser = "W Junior";
    const commandModel = {
        "user": "",
        "date": "",
        "command": ""
    }

    let file = fs.readFileSync("./storageFile.json", "utf-8");

    return {
        listAll: (req, res) => {
            res.send("bla bla bla");
        },

        openBrowser: async (req, res) => {
            const user = req.user ? req.user : mockedUser;
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            let command = commandModel;
            await page.goto('https://www.google.com/', {waitUntil: 'networkidle2'});

            command.user = user;
            command.command = "goTo";
            command.date = date.getTime();
            await page.waitFor('input[name=q]');
            await page.$eval('input[name=q]', el => el.value = 'Qual é o maior banco da america latina?');
            await page.keyboard.press(String.fromCharCode(13));
            // console.log(file);
            
            fs.writeFile("./storageFile.json", JSON.stringify(command), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });
            console.log(fs.readFileSync("./storageFile.json", "utf-8"));
            res.send({ status: "ok"});
        }
    }
}