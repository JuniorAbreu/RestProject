const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports =  {

    listAll: () => {
        try {
            return readFile();
        } catch (error) {
            return error;
        }
    },

    openBrowser: async (user) => {
        try {
            let data = [];

            const browser = await puppeteer.launch({ headless: false });
            data.push(processCommand(user, "puppeteer.launch({ headless: false })", 'Launch browser with a head.'));

            const page = await browser.newPage();
            data.push(processCommand(user, "browser.newPage()", 'Create new page.'));

            await page.goto('https://www.google.com/', {waitUntil: 'networkidle2'});
            data.push(processCommand(user, "page.goto('https://www.google.com/', {waitUntil: 'networkidle2'})", 'Redirect to google home page.'));

            await page.waitFor('input[name=q]');
            data.push(processCommand(user, "page.waitFor('input[name=q]')", 'Wait for input element.'));

            await page.$eval('input[name=q]', el => el.value = 'Qual é o maior banco da america latina?');
            data.push(processCommand(user, "page.$eval('input[name=q]', value)", 'Write text in input element.'));

            await page.keyboard.press(String.fromCharCode(13));
            data.push(processCommand(user, "page.keyboard.press(String.fromCharCode(13))", 'Simulate enter press to search for results.'));

            await recordCommands(data);

            const elementTextResult = await page.$eval('input[name=q]', el => el.textContent.trim());
            console.log(elementTextResult);
            await browser.close();

            return {status: 200};
        } catch (error) {
            return error;
        }
    }

}

function readFile() {
    return fs.readFileSync("./storageFile.json", "utf-8");
}

function recordCommands(newData) {
    let oldData = {};

    try {
        oldData = JSON.parse(readFile());
    } catch (error) {
        oldData = {data: []};
    }

    oldData.data = oldData.data.concat(newData);
    return saveFile(oldData);
}

function saveFile(oldData) {
    const fileName = "./storageFile.json";
    let model = oldData ? oldData : {data: []};
    return fs.writeFile(fileName, JSON.stringify(model), function(err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function processCommand(user, command, description) {
    const date = new Date();
    return {"user": user, "date": date.getTime(),  "command": command, "description": description}
}