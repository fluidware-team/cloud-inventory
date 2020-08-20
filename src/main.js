import './appenv';
import CloudInventoryApp from './cloudInventoryApp';
import { common_error, common_info, setLogger } from './utils/logUtils';

let shuttingDown = false;

const shutdown = function(exit = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log('Shutting down...');
  if (dh) {
    console.log('Shutting down db connections...');
    dh.close();
  }
  const end = function() {
    console.log('Exit');
    setImmediate(() => {
      process.exit(exit);
    });
  };
  if (server) {
    console.log('Shutting down server...');
    server.stop().finally(() => {
      end();
    });
  } else {
    end();
  }
};

process.on('uncaughtException', err => {
  console.error('Uncaught exception!', err);
  if (server != null && server.slackMessage != null) {
    const msg = `UNCAUGHT EXCEPTION: ${err.message}`;
    server.slackMessage('error', msg, ':bomb:', err => {
      if (err != null) {
      }
      shutdown(99);
    });
  } else {
    shutdown(99);
  }
});

process.on('SIGTERM', shutdown);

process.on('SIGINT', shutdown);

const startServer = () => {
  server
    .start()
    .then(() => {
      common_info('Server started');
    })
    .catch(err => {
      if (err) {
        common_error(err);
        shutdown();
      }
    });
};

const server = new CloudInventoryApp(process.env);
setLogger(server.log);

startServer();
