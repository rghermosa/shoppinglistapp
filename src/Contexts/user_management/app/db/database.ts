import clc from 'cli-color';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../User/infrastructure/typeorm/entities/User';
dotenv.config();

export class DatabaseConnection {
  private connection: DataSource;

  constructor() {
    this.create();
  }

  async create() {
    this.connection = new DataSource({
      type: 'postgres',
      host: 'auth-db',
      username: 'postgres',
      password: 'postgres',
      port: 5432,
      database: 'User',
      entities: [User],
      logging: true,
      synchronize: true,
    });
    console.log(clc.bold.cyan('\n  Connection to the database created\n'));
    return this.connection;
  }

  async connect() {
    await this.connection.initialize();
    console.log(clc.bold.yellow('\n  Database connected'));
  }

  async stop() {
    return this.connection.destroy();
  }
}
