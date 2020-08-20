import inventory from './inventory';

export default function(express) {
  const router = express.Router();
  router.use('/inventory', inventory(express));
  return router;
}
