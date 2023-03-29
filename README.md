# html2pdf
An HTML to PDF converter provided by RESTful API and command-line tool. Powered by `puppeteer`.

## Usage

### RESTful API
```bash
curl -X POST 'http://localhost:3000/generate' \
    --header 'Content-Type: application/json' \
    --data '{
        "source": "https://www.google.com",
        "format": "A4",
        "timeout": 10
    }' > google.pdf
```

### Command-line
```bash
npm install -g https://github.com/iamdual/html2pdf
html2pdf '<!DOCTYPE html><strong>Hello world!</strong>' -o output.pdf
html2pdf "https://www.google.com" --format A4 --timeout 10 -o google.pdf
```

## Parameters
| Name       | Type    | Description                                                                                                                         |
|------------|---------|-------------------------------------------------------------------------------------------------------------------------------------|
| source     | string  | Set PDF document source. It must be specified. The source can be a URL or an HTML code.                                             |
| timeout    | integer | Set connection timeout. Default is `10`.                                                                                            |
| javascript | boolean | Enable JavaScripts. To enable, the value should be true. Disabled by default.                                                       |
| pageRanges | string  | Set pages by the numbers and ranges. Example: `1,2-4`. All pages included by default.                                               |
| mediaType  | string  | Set paper CSS media type. Must be one of `screen` or `print`. Default is `screen`.                                                  |
| format     | string  | Set paper format. Must be one of `A0`, `A1`, `A2`, `A3`, `A4`, `A5`, `A6`, `Letter`, `Legal`, `Tabloid`, `Ledger`. Default is `A4`. |
| width      | integer | Set PDF document width. Both height and width must be used together. It will disable `format` option.                               |
| height     | integer | Set PDF document height. Both height and width must be used together. It will disable `format` option.                              |
| scale      | float   | Set scale. The value must be greater than or equals to `0.1`, or lower then or equals to `2`. Default is `1`.                       |
| landscape  | boolean | Enable landscape mode. To enable, the value should be true. Disabled by default.                                                    |
| margin     | string  | Set margin(s) for the PDF document. It can be all four margin or specified by the values separated with space. Default is `0`.      |

## Author
Ekin Karadeniz (iamdual@icloud.com)
