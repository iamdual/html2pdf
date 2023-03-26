/**
 * @iamdual/html2pdf
 * @author Ekin Karadeniz <iamdual@icloud.com>
 * @source https://github.com/iamdual/html2pdf
 */

const puppeteer = require('puppeteer');
const configParser = require('../config-parser');
const generator = require('../generator');

module.exports = async function generate(req, res) {

    let config;
    if (req.method === 'POST') {
        config = configParser(req.body);
    } else {
        config = configParser(req.query);
    }

    if (!config.source) {
        res.status(400).json({ error: 'EMPTY_SOURCE', errorMessage: 'Please enter a source.' });
        return;
    }

    try {
        const pdf = await generator(config);
        res.set('Content-Type', 'application/pdf');
        res.status(200).send(pdf);
        return;
    } catch (error) {
        if (error instanceof puppeteer.TimeoutError) {
            res.status(408).json({ error: 'TIMEOUT', errorMessage: 'Request timeout.' });
            return;
        }
        res.status(500).json({ error: 'SERVER_ERROR', errorMessage: 'We are unable to fulfill your request.' });
    }
}
