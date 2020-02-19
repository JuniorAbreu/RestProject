let rewire = require('rewire');
const service = rewire('./service');
const processCommand = service.__get__("processCommand");

describe('Test command service functions', () => {

    it('Should contain required fields', () => {
        expect(Object.keys(processCommand()).sort()).toEqual(['user', 'date', 'command', 'description'].sort());
    });

});