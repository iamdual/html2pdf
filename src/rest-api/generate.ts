/**
 * @iamdual/html2pdf
 * @author Ekin Karadeniz <iamdual@icloud.com>
 * @source https://github.com/iamdual/html2pdf
 */

import { TimeoutError } from "puppeteer";
import { Request, Response } from "express";
import Config from "../config";
import Generator from "../generator";

export default async (req: Request, res: Response) => {
  if (!["GET", "POST"].includes(req.method)) {
    res
      .status(405)
      .json({ error: "INVALID_METHOD", errorMessage: "Method not allowed." });
    return;
  }

  let config: Config;
  if (req.method === "POST") {
    config = new Config(req.body);
  } else {
    config = new Config(req.query);
  }

  if (!config.source) {
    res
      .status(400)
      .json({ error: "EMPTY_SOURCE", errorMessage: "Please enter a source." });
    return;
  }

  try {
    const pdf = await Generator(config);

    if (config.base64) {
      res.set("Content-Type", "text/plain");
      res.status(200).send(Buffer.from(pdf).toString("base64"));
      return;
    }

    res.set("Content-Type", "application/pdf");
    res.status(200).send(Buffer.from(pdf));
    return;
  } catch (error) {
    if (error instanceof TimeoutError) {
      res
        .status(408)
        .json({ error: "TIMEOUT", errorMessage: "Request timeout." });
      return;
    }
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    res.status(500).json({
      error: "SERVER_ERROR",
      errorMessage: "We are unable to fulfill your request.",
    });
  }
};
