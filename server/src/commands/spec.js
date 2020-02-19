let rewire = require('rewire');
const mainSergice = require('./service');

// rewire to test unexported functions
const service = rewire('./service');
const processCommand = service.__get__("processCommand");

describe('Test command service functions', () => {

    it('Should contain required fields', () => {
        expect(Object.keys(processCommand()).sort()).toEqual(['user', 'date', 'command', 'description'].sort());
    });

    it('Should interact with browser', async () => {
        const result = await service.openBrowser();
        const expected = {status: 200};
        expect(result).toMatchObject(expected);
    }, 10000);

});