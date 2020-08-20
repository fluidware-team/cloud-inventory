import Microservice from '@authkeys/microservice';
import packageJson from '../package';
import os from 'os';
import loadRoutes from './routes';
import bodyParser from 'body-parser';
import { authMiddleware } from './middlewares/AuthMiddleware';

const uptime_start = new Date();

class CloudInventoryApp extends Microservice {
  getName() {
    return packageJson.name;
  }

  getVersion() {
    return packageJson.version;
  }

  setupRoutes(app, express) {
    app.disable('x-powered-by');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(authMiddleware);
    app.use(loadRoutes(express));
    app.get('/uptime', this.appAuthc, (req, res) => {
      const { name, version } = packageJson;
      const ret = {
        name,
        version,
        node_version: process.version,
        hostname: os.hostname(),
        uptime: Math.round((new Date().getTime() - uptime_start.getTime()) / 1000),
        memoryUsage: Math.round(process.memoryUsage().rss / 1024 / 1024) + 'M'
      };
      res.json(ret);
    });
  }
}

export default CloudInventoryApp;
