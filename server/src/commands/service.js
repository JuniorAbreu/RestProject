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
        // return new Promise((resolve, reject) => {
            try {
                console.log("começou");
                let data = [];
                let oldData = {};

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
                data.push(processCommand(user, "page.keyboard.press(String.fromCharCode(13))", 'Press enter to search for results.'));
                try {
                    oldData = readFile();
                } catch (error) {
                    await createFile();
                    oldData = readFile();
                }
                await oldData;
                await recordCommands(data, JSON.parse(oldData));
                console.log("terminou");

                return {status: 200};
                // resolve({status: 200});
            } catch (error) {
                // reject(error);
                return error;
            }
        // });
    }

}

function readFile() {
    console.log("read file");
    return fs.readFileSync("./storageFile.json", "utf-8");
}

function recordCommands(newData, oldData) {
    console.log("record");
    oldData = oldData.data ? oldData : {data: []};
    oldData.data = oldData.data.concat(newData);
    return saveFile(oldData);
}

function saveFile(oldData) {
    return fs.writeFile("./storageFile.json", JSON.stringify(oldData), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
}

function createFile() {
    const fileName = "./storageFile.json";
    return fs.appendFile(fileName, '{data: []}', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function processCommand(user, command, description) {
    const date = new Date();
    return {"user": user, "date": date.getTime().toLocaleString(),  "command": command, "description": description}
}