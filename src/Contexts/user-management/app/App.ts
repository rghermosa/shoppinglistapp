import { DatabaseConnection } from './database';
import { Server } from './server';

export class App {
  server?: Server;
  databaseConnection: DatabaseConnection;

  async start() {
    const port = '3000';
    this.server = new Server(port);
    this.databaseConnection = await new DatabaseConnection();
    await this.databaseConnection.connect();
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    await this.databaseConnection.stop();
    return this.server?.stop();
  }
}
