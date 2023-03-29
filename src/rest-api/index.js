/**
 * @iamdual/html2pdf
 * @author Ekin Karadeniz <iamdual@icloud.com>
 * @source https://github.com/iamdual/html2pdf
 */

const express = require('express');
const app = express();
app.use(express.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).send({ error: 'INVALID_REQUEST', errorMessage: err.message });
        return;
    }
    next();
});
app.all('/generate', require('./generate'));

const port = process.env.HTML2PDF_API_PORT || 3000;
app.listen(port, function () {
    console.log('Server has been started on http://localhost:%d', port);
});
