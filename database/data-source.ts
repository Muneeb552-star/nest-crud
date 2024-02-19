import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { config } from "dotenv"; 
config()

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: [UserEntity], // Include all your entity classes here
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [__dirname + 'database/migrations/**/*{.ts,.js}'],
  // migrations: ['dist/database/migrations/**/*{.ts,.js}'],
  synchronize: process.env.DATABASE_SYNC === 'true',
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;



