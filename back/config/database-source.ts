import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const DataSource: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`dist/**/*.entity{.js, .ts}`],
  synchronize: true,
};
