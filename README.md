# html2pdf

An HTML to PDF converter provided by RESTful API and command-line tool. Powered by `puppeteer`.

## RESTful API

The best reason to use this method is that we can use it on any programming languages and software that support HTTP requests.

### Start server with Docker (recommended)

```bash
docker run -p 3000:3000 iamdual/html2pdf
```

### Start server with source

```bash
git clone https://github.com/iamdual/html2pdf && cd html2pdf
npm install
npm start
```

### API request with POST JSON

```bash
curl -X POST 'http://localhost:3000/generate' \
    --header 'Content-Type: application/json' \
    --data '{
        "source": "https://www.google.com",
        "format": "A4",
        "timeout": 10
    }' > google.pdf
```

### API request with query parameters

```bash
curl 'http://localhost:3000/generate?source=https://google.com&timeout=10' > google.pdf
```

## Command-line tool

It also support for command-line interface, so you can convert easily to a PDF.

```bash
git clone https://github.com/iamdual/html2pdf && cd html2pdf
npm install
npm run build
sudo npm link
html2pdf '<!DOCTYPE html><strong>Hello world!</strong>' -o output.pdf
html2pdf "https://www.google.com" --format A4 --timeout 10 -o google.pdf
html2pdf ./example.html --format A4 --pageRanges 1 -o example.pdf
```

## Parameters

| Name       | Type    | Description                                                                                                                         |
| ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| source     | string  | Set PDF document source. It must be specified. The source can be a URL or an HTML code.                                             |
| timeout    | integer | Set connection timeout. Default is `10`.                                                                                            |
| javascript | boolean | Enable JavaScripts. To enable, the value should be true. Disabled by default.                                                       |
| pageRanges | string  | Set pages by the numbers and ranges. Example: `1,2-4`. All pages included by default.                                               |
| mediaType  | string  | Set paper CSS media type. Must be one of `screen` or `print`. Default is `screen`.                                                  |
| format     | string  | Set paper format. Must be one of `A0`, `A1`, `A2`, `A3`, `A4`, `A5`, `A6`, `Letter`, `Legal`, `Tabloid`, `Ledger`. Default is `A4`. |
| width      | integer | Set PDF document width. Both height and width must be used together. It will disable `format` option.                               |
| height     | integer | Set PDF document height. Both height and width must be used together. It will disable `format` option.                              |
| scale      | float   | Set scale. The value must be greater than or equals to `0.1`, or lower than or equals to `2`. Default is `1`.                       |
| landscape  | boolean | Enable landscape mode. To enable, the value should be true. Disabled by default.                                                    |
| margin     | string  | Set margin(s) for the PDF document. It can be all four margin or specified by the values separated with space. Default is `0`.      |
| userAgent  | string  | Set custom user-agent string.                                                                                                       |
| base64     | boolean | Return the PDF as a base64-encoded string (REST API only). Disabled by default.                                                     |

## Author

Ekin Karadeniz (iamdual@icloud.com)
