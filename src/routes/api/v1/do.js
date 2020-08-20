import { http_get } from '../../../utils/httpUtils';

const DO_URL = 'https://api.digitalocean.com/v2/droplets';

const getDroplets = (bearer, page = 1) => {
  return http_get(`${DO_URL}?page=${page}&per_page=100`, { Authorization: `Bearer ${bearer}` });
};

const getAllDroplets = async bearer => {
  const droplets = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const data = await getDroplets(bearer, page);
    if (data.droplets && data.droplets.length > 0) {
      data.droplets.forEach(droplet => droplets.push(droplet));
    }
    if (droplets.length < data.meta.total) {
      page++;
    } else {
      hasMore = false;
    }
  }
  return droplets;
};

const filterDroplets = (droplets, tags) => {
  return droplets.filter(droplet => {
    let gotTag = false;
    droplet.tags.forEach(tag => {
      if (tags.includes(tag)) {
        gotTag = true;
      }
    });
    return gotTag;
  });
};

const toInventory = (droplets, tags) => {
  const inventory = {
    _meta: {
      hostvars: {}
    },
    digitalocean: { hosts: [] }
  };
  droplets.forEach(droplet => {
    const public_ips = droplet.networks.v4.filter(ip => ip.type === 'public');
    if (public_ips.length === 0) return;
    const ip = public_ips[0].ip_address;
    inventory._meta.hostvars[droplet.name] = {
      ansible_host: ip
    };
    inventory.digitalocean.hosts.push(droplet.name);
    droplet.tags.forEach(tag => {
      if (tags !== false) {
        if (!tags.includes(tag)) return;
      }
      if (!inventory[tag]) {
        inventory[tag] = { hosts: [] };
      }
      inventory[tag].hosts.push(droplet.name);
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
    let droplets = await getAllDroplets(req.bearer_token);
    let tags = false;
    if (req.query.tags) {
      tags = req.query.tags.split(',');
      droplets = filterDroplets(droplets, tags);
    }
    res.json(toInventory(droplets, tags));
  });
  return router;
}
