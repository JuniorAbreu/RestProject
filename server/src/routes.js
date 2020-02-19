module.exports = app => {
    const commands = require('./commands/controller')(app);

    app.get('/commands', commands.listAll);
    app.post('/openBrowser', commands.openBrowser);
}