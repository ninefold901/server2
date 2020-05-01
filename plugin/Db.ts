import Log from './Log';
import config from '../config/config.default';

import { Sequelize } from 'sequelize';
import modelIndex from '../model';

class Db {
  log: Log;
  sequelize: Sequelize;
  isLoaded: boolean;
  dbConfig: { dbname: string; username: string; password: string; host: string; port: number; };
  constructor() {
    this.log = new Log();

    this.dbConfig = config.mysql;
    this.isLoaded = false;
    this.sequelize = new Sequelize(this.dbConfig.dbname, this.dbConfig.username, this.dbConfig.password, {
      host: this.dbConfig.host,
      port: this.dbConfig.port,
      dialect: 'mysql',
    });

    this.sequelize
      .authenticate()
      .then(() => {
        this.log.write('[plugin]Db loaded.');
        this.initModel();
        this.isLoaded = true;
      })
      .catch((err) => {
        this.log.writeObj(err);
      });
  }

  initModel() {
    modelIndex(this.sequelize);
  }
}

export default Db;
