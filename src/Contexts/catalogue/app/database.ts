import mysql from 'mysql';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import clc from 'cli-color';
import { DataSource } from 'typeorm';
import { Brand } from '../Brands/infrastructure/typeorm/entities/Brand';
import { Product } from '../Products/infrastructure/typeorm/entities/Product';
dotenv.config();

export class DatabaseConnection {
  private connection: DataSource;

  constructor() {
    this.create();
  }

  async create() {
    this.connection = new DataSource({
      type: 'postgres',
      host: 'catalogue-db',
      username: 'postgres',
      password: 'postgres',
      port: 5432,
      database: 'Catalogue',
      entities: [Brand, Product],
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
