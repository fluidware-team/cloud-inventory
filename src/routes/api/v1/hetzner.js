import { http_get } from '../../../utils/httpUtils';

const HETZNER_URL = 'https://api.hetzner.cloud/v1/servers';

const getServers = async bearer => {
  return http_get(HETZNER_URL, { Authorization: `Bearer ${bearer}` });
};

const filterServers = (servers, labels) => {
  return servers.filter(server => {
    let gotTag = false;
    Object.keys(server.labels).forEach(label => {
      if (labels.includes(label)) {
        gotTag = true;
      }
    });
    return gotTag;
  });
};

const toInventory = (servers, labels) => {
  const inventory = {
    _meta: {
      hostvars: {}
    },
    hetzner: { hosts: [] }
  };
  servers.forEach(server => {
    const ip = server.public_net.ipv4.ip;

    inventory._meta.hostvars[server.name] = {
      ansible_host: ip
    };
    if (server.private_net && server.private_net.length > 0) {
      inventory._meta.hostvars[server.name].host_private_ip = server.private_net[0].ip;
    }

    inventory.hetzner.hosts.push(server.name);
    Object.keys(server.labels).forEach(label => {
      if (labels !== false) {
        if (!labels.includes(label)) return;
      }
      if (!inventory[label]) {
        inventory[label] = { hosts: [] };
      }
      inventory[label].hosts.push(server.name);
    });
  });
  return inventory;
};

export default function(express) {
  const router = express.Router();
  router.get('/', async (req, res) => {
    if (!req.bearer_token) {
      res.status(401).json({ status: 401, reason: 'Missing bearer token' });
      return;
    }
    const data = await getServers(req.bearer_token);
    let { servers } = data;
    let labels = false;
    if (req.query.labels) {
      labels = req.query.labels.split(',');
      servers = filterServers(servers, labels);
    }
    res.json(toInventory(servers, labels));
  });
  return router;
}
