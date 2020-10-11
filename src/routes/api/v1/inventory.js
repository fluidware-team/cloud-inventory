import digitalocean from './do';
import linode from './linode';
import hetzner from './hetzner';

export default function(express) {
  const router = express.Router();
  router.use('/do', digitalocean(express));
  router.use('/linode', linode(express));
  router.use('/hetzner', hetzner(express));
  return router;
}
