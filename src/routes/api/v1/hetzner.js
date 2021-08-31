import { http_get } from '../../../utils/httpUtils';

const HETZNER_URL = 'https://api.hetzner.cloud/v1/servers';

const getServers = async bearer => {
  return http_get(HETZNER_URL, { Authorization: `Bearer ${bearer}` });
};

export const filterServers = (servers, labels, required_label) => {
  const useLabels = labels.length > 0;
  return servers.filter(server => {
    if (required_label) {
      if (server.labels[required_label] === undefined) {
        return false;
      }
      if (!useLabels) {
        return true;
      }
    }
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
    try {
      const data = await getServers(req.bearer_token);
      let { servers } = data;
      let labels = false;
      if (req.query.labels || req.query.required_label) {
        labels = req.query.labels ? req.query.labels.split(',') : [];
        servers = filterServers(servers, labels, req.query.required_label);
      }
      res.json(toInventory(servers, labels));
    } catch (e) {
      if (e.http_code) {
        res.status(e.http_code).json({ status: e.http_code, reason: e.message });
      } else {
        res.status(500).json({ status: 500, reason: e.message });
      }
    }
  });
  return router;
}
