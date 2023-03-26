const assert = require('assert');
const configParser = require('../src/config-parser');

describe('config-parser', function () {
    describe('PDF Source', function () {
        it('Should be a URL', function () {
            const config = configParser({ source: "https://github.com/iamdual" });
            assert.equal(config.isUrl, true);
        });
        it('Should NOT be a URL', function () {
            const config = configParser({ source: "<b>Hello world!</b>" });
            assert.equal(config.isUrl, false);
        });
    });

    describe('Margins', function () {
        it('Parsing margin with a single value', function () {
            // top -> right -> bottom -> left
            const config = configParser({ margin: 10 });
            assert.equal(config.margin.top, '10px');
            assert.equal(config.margin.right, '10px');
            assert.equal(config.margin.bottom, '10px');
            assert.equal(config.margin.left, '10px');
        });
        it('Parsing multiple margin values', function () {
            // top -> right -> bottom -> left
            const config = configParser({ margin: "10 20 30 40" });
            assert.equal(config.margin.top, '10px');
            assert.equal(config.margin.right, '20px');
            assert.equal(config.margin.bottom, '30px');
            assert.equal(config.margin.left, '40px');
        });
    });
});
