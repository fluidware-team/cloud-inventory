import api from './api';

const loadRoutes = function(express) {
  const router = express.Router();
  router.use('/api', api(express));
  return router;
};

export default loadRoutes;
