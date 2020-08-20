import v1 from './v1';

export default function(express) {
  const router = express.Router();
  router.use('/v1', v1(express));
  return router;
}
