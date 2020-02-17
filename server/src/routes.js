module.exports = app => {
    const commands = require('./commands/controller')(app);
    // const puppeteer = require('puppeteer');
    app.get('/commands', commands.listAll);

    app.post('/openBrowser', commands.openBrowser);
}