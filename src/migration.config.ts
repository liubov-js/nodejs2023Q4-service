import configService from './ormconfig';
import { DataSource } from 'typeorm';

const datasource = new DataSource(configService);
datasource.initialize();
export default datasource;
