#!/usr/bin/env node
/**
 * @iamdual/html2pdf
 * @author Ekin Karadeniz <iamdual@icloud.com>
 * @source https://github.com/iamdual/html2pdf
 */

let configArgs: [];

const yargs = require("yargs/yargs")(process.argv.slice(2))
  .command(
    `$0 [options...] <source>`,
    "",
    (yargs: any) => {
      yargs.positional("source", {
        type: "string",
        describe: "The source can be a URL, a filename or an HTML content",
      });
    },
    (args: any) => {
      configArgs = { ...args };
      ["_", "$0", "o", "output", "s", "stdout"].forEach((k: any) => {
        delete configArgs[k];
      });
    }
  )
  .option("o", {
    alias: "output",
    demandOption: false,
    describe: "Output PDF to a file",
    type: "string",
  })
  .option("s", {
    alias: "stdout",
    default: false,
    demandOption: false,
    describe: "Output PDF to stdout",
    type: "boolean",
  })
  .showHelpOnFail(true)
  .demandCommand(1, "");

const argv = yargs.argv;
import { existsSync, readFileSync, writeFile } from "fs";
import Config from "../src/config";
import generator from "../src/generator";
const panic = (message: string | NodeJS.ErrnoException) => {
  process.stderr.write(message + "\n\n");
  yargs.showHelp();
  process.exit(1);
};

let config = new Config(argv);

// Check is source is an exiting file
if (!config.isUrl && existsSync(argv.source)) {
  argv.source = readFileSync(argv.source, "utf8");
}

if (typeof argv.output !== "string" && !argv.stdout) {
  panic("Error: No output specified!");
}

generator(config).then((pdf) => {
  if (typeof argv.output === "string" && argv.output.length > 0) {
    writeFile(argv.output, pdf, "binary", (err) => {
      if (err) panic(err);
    });
  } else if (argv.stdout) {
    process.stdout.write(pdf);
  } else {
    panic("Error: No output specified!");
  }
});
