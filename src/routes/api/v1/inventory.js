import digitalocean from './do';
import linode from './linode';

export default function(express) {
  const router = express.Router();
  router.use('/do', digitalocean(express));
  router.use('/linode', linode(express));
  return router;
}
