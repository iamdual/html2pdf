/**
 * @iamdual/html2pdf
 * @author Ekin Karadeniz <iamdual@icloud.com>
 * @source https://github.com/iamdual/html2pdf
 */

module.exports = function configParser(params) {

    let config = {
        source: null,
        isUrl: false,
        timeout: 10,
        javascript: false,
        mediaType: 'screen',
        printBackground: true,
        pageRanges: undefined,
        format: 'A4',
        width: undefined,
        height: undefined,
        scale: 1,
        landscape: false,
        margin: {
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        },
    };

    /**
     * source
     * Set PDF source. It must be specified. The source can be a URL or an HTML.
     */
    if (typeof params.source === 'string') {
        config.source = params.source;

        if (params.source.startsWith('https://') || params.source.startsWith('http://')) {
            config.isUrl = true;
        }
    }

    /**
     * timeout
     * Set connection timeout. Default is 10.
     */
    if (typeof params.timeout !== 'undefined') {
        config.timeout = parseInt(params.timeout);
    }

    /**
     * javascript
     * Enable JavaScripts. To enable, the value should be true. Disabled by default.
     */
    if (typeof params.javascript !== 'undefined') {
        if (typeof params.javascript === 'string') {
            config.javascript = ['true', '1'].includes(params.javascript);
        }
        if (typeof params.javascript === 'boolean') {
            config.javascript = params.javascript;
        }
    }

    /**
     * pageRanges
     * Set pages by the numbers and ranges. Example: 1, 2-4. All pages included by default.
     */
    if (typeof params.pageRanges === 'string') {
        config.pageRanges = params.pageRanges;
    }

    /**
     * mediaType
     * Set paper CSS media type. Must be one of "screen" or "print". Default is "screen".
     */
    if (typeof params.mediaType === 'string') {
        const _mediaType = params.mediaType.toLowerCase();
        if (['screen', 'print'].includes(_mediaType)) {
            config.mediaType = _mediaType;
        }
    }
    
    /**
     * format
     * Set paper format. Must be one of "A0", "A1", "A2", "A3", "A4", "A5", "A6", "Letter", "Legal", "Tabloid", "Ledger". Default is "A4".
     */
    if (typeof params.format === 'string') {
        const _format = params.format.toUpperCase();
        if (['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'LETTER', 'LEGAL', 'TABLOID', 'LEDGER'].includes(_format)) {
            config.format = _format;
        }
    }

    /**
     * width, height
     * Set documentation width and height. Both must be used together. It will disable "format" option.
     */
    if (typeof params.width !== 'undefined' && typeof params.height !== 'undefined') {
        const _width = parseInt(params.width);
        const _height = parseInt(params.height);
        if (_width > 0 && _height > 0) {
            config.format = undefined;
            config.width = _width + 'px';
            config.height = _height + 'px';
        }
    }

    /**
     * scale
     * Set scale. The value must be greater than or equals to 0.1, or lower then or equals to 2. Default is 1.
     */
    if (typeof params.scale !== 'undefined') {
        const _scale = parseFloat(params.scale);
        if (_scale => 0.1 && _scale <= 2) {
            config.scale = _scale;
        }
    }

    /**
     * landscape
     * Enable landscape mode. To enable, the value should be true. Disabled by default.
     */
    if (typeof params.landscape !== 'undefined') {
        if (typeof params.landscape === 'string') {
            config.landscape = ['true', '1'].includes(params.landscape);
        }
        if (typeof params.landscape === 'boolean') {
            config.landscape = params.landscape;
        }
    }

    /**
     * margin
     * Set margin(s) for the PDF document. It can be all four margin or specified by the values separated with space. Default is 0.
     * Example: The given value "10" will set margin top, right, bottom and left to 10px.
     *          The given value "10 20 30 40" will set margin top to 10px, right to 20px, bottom to 30px and left to 40px.
     */
    if (typeof params.margin !== 'undefined') {
        let _margins = [];
        if (typeof params.margin === 'string') {
            _margins = params.margin.split(' ', 4);
            if (_margins.length === 1) {
                _margins[1] = _margins[0];
                _margins[2] = _margins[0];
                _margins[3] = _margins[0];
            }
        } else if (typeof params.margin === 'number') {
            _margins[0] = params.margin;
            _margins[1] = params.margin;
            _margins[2] = params.margin;
            _margins[3] = params.margin;
        }
        config.margin.top = (parseInt(_margins[0]) || 0) + 'px';
        config.margin.right = (parseInt(_margins[1]) || 0) + 'px';
        config.margin.bottom = (parseInt(_margins[2]) || 0) + 'px';
        config.margin.left = (parseInt(_margins[3]) || 0) + 'px';
    }

    return config;
};