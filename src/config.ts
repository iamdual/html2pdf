/**
 * @iamdual/html2pdf
 * @author Ekin Karadeniz <iamdual@icloud.com>
 * @source https://github.com/iamdual/html2pdf
 */

import { PaperFormat, PDFMargin } from "puppeteer";

export default class Config {
  static defaultUnit: string = "px";
  static defaultFormat: PaperFormat = "A4";
  static formatList: PaperFormat[] = [
    "A0",
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "LETTER",
    "LEGAL",
    "TABLOID",
    "LEDGER",
  ];

  readonly source: string = "";
  readonly isUrl: boolean = false;
  readonly timeout: number = 10_000;
  readonly javascript: boolean = false;
  readonly mediaType: string = "screen";
  readonly printBackground: boolean = true;
  readonly pageRanges?: string = undefined;
  readonly format?: PaperFormat = Config.defaultFormat;
  readonly width?: number = undefined;
  readonly height?: number = undefined;
  readonly scale: number = 1;
  readonly landscape: boolean = false;
  readonly margin: Margin = new Margin();

  constructor(params?: { [key: string]: any }) {
    for (const param in params) {
      switch (param) {
        case "source":
          if (typeof params[param] === "string") {
            this.source = params[param];
            this.isUrl =
              params[param].startsWith("https://") ||
              params[param].startsWith("http://");
          }
          break;
        case "timeout":
          if (typeof params[param] === "string") {
            this.timeout = parseInt(params[param]) * 1000;
          } else if (typeof params[param] === "number") {
            this.timeout = params[param] * 1000;
          }
          break;
        case "javascript":
          if (typeof params[param] === "string") {
            this.javascript = ["true", "1"].includes(params[param]);
          } else if (typeof params[param] === "boolean") {
            this.javascript = params[param];
          }
          break;
        case "mediaType":
          if (typeof params[param] === "string") {
            this.mediaType =
              params[param].toLowerCase() === "print" ? "print" : "screen";
          }
          break;
        case "printBackground":
          if (typeof params[param] === "string") {
            this.printBackground = ["true", "1"].includes(params[param]);
          } else if (typeof params[param] === "boolean") {
            this.printBackground = params[param];
          }
          break;
        case "pageRanges":
          if (typeof params[param] === "string") {
            this.pageRanges = params[param];
          }
          break;
        case "format":
          if (typeof params[param] !== "string") {
            break;
          }
          params[param] = params[param].toUpperCase();
          if (params.width !== undefined && params.height !== undefined) {
            this.format = undefined;
          } else if (!Config.formatList.includes(params[param])) {
            this.format = Config.defaultFormat;
          } else {
            this.format = params[param];
          }
          break;
        case "width":
          if (typeof params[param] === "string") {
            params[param] = parseInt(params[param]);
          }
          if (typeof params[param] === "number") {
            this.width = params[param];
          }
          break;
        case "height":
          if (typeof params[param] === "string") {
            params[param] = parseInt(params[param]);
          }
          if (typeof params[param] === "number") {
            this.height = params[param];
          }
          break;
        case "scale":
          if (typeof params[param] === "string") {
            params[param] = parseFloat(params[param]);
          }
          if (typeof params[param] === "number") {
            if (params[param] >= 0.1 || params[param] <= 2) {
              this.scale = params[param];
            } else {
              this.scale = 1;
            }
          }
          break;
        case "landscape":
          if (
            typeof params[param] === "string" ||
            typeof params[param] === "boolean"
          ) {
            this.landscape = params[param];
          }
          break;
        case "margin":
          if (typeof params[param] === "string") {
            this.margin = new Margin().fromString(params[param]);
          } else if (params[param] instanceof Margin) {
            this.margin = params[param];
          }
          break;
      }
    }
  }
}

export class Margin implements PDFMargin {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;

  constructor(top?: number, right?: number, bottom?: number, left?: number) {
    this.top = top ?? 0;
    this.right = right ?? 0;
    this.bottom = bottom ?? 0;
    this.left = left ?? 0;

    if (
      top !== undefined &&
      right === undefined &&
      bottom === undefined &&
      left === undefined
    ) {
      this.right = top;
      this.bottom = top;
      this.left = top;
    }
  }

  fromString(margins: string): Margin {
    const _margins = margins.split(" ", 4);
    if (_margins.length === 1) {
      return new Margin(parseInt(_margins[0]));
    } else if (_margins.length === 4) {
      return new Margin(
        parseInt(_margins[0]),
        parseInt(_margins[1]),
        parseInt(_margins[2]),
        parseInt(_margins[3])
      );
    }
    return new Margin();
  }

  toUnits(): PDFMargin {
    return {
      top: (this.top ?? 0) + Config.defaultUnit,
      right: (this.right ?? 0) + Config.defaultUnit,
      bottom: (this.bottom ?? 0) + Config.defaultUnit,
      left: (this.left ?? 0) + Config.defaultUnit,
    };
  }
}
