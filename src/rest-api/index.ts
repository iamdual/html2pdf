/**
 * @iamdual/html2pdf
 * @author Ekin Karadeniz <iamdual@icloud.com>
 * @source https://github.com/iamdual/html2pdf
 */

import express, { Express, Request, Response, NextFunction } from "express";
import generate from "./generate";

export const route: Express = express();
route.use(express.json());
route.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError) {
    res
      .status(400)
      .send({ error: "INVALID_REQUEST", errorMessage: err.message });
    return;
  }
  next();
});
route.all("/generate", generate);

const port = process.env.HTML2PDF_API_PORT || 3000;
route.listen(port, () => {
  console.log("Server has been started on http://localhost:%d", port);
});
