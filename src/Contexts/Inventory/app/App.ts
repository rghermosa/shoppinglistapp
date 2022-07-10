import { Server } from './server';

export class App {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5001';
    this.server = new Server(port);
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    return this.server?.stop();
  }
}
