import express, { json, urlencoded } from 'express';
import 'reflect-metadata';

import * as http from 'http';
import Router from 'express-promise-router';
import errorHandler from 'errorhandler';
import { ContextStarter } from './routes/ContextStarter';
import clc from 'cli-color';

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);
    ContextStarter.run(router);
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          clc.bold.cyan(`\n  App is running at http://localhost:${this.port}`)
        );
        console.log(clc.bold.magenta('\n  Press CTRL-C to stop\n'));
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
