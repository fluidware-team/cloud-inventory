import { http_get } from '../../../utils/httpUtils';

const LINODE_URL = 'https://api.linode.com/v4/linode/instances';

const getVms = (bearer, page = 1) => {
  return http_get(`${LINODE_URL}?page=${page}&page_size=100`, { Authorization: `Bearer ${bearer}` });
};

const getAllVms = async bearer => {
  const vms = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const data = await getVms(bearer, page);
    if (data.data && data.data.length > 0) {
      data.data.forEach(vm => vms.push(vm));
    }
    if (page < data['pages']) {
      page++;
    } else {
      hasMore = false;
    }
  }
  return vms;
};

const filterVms = (vms, tags) => {
  return vms.filter(vm => {
    let gotTag = false;
    vm.tags.forEach(tag => {
      if (tags.includes(tag)) {
        gotTag = true;
      }
    });
    return gotTag;
  });
};

const toInventory = (vms, tags) => {
  const inventory = {
    _meta: {
      hostvars: {}
    },
    linode: { hosts: [] }
  };
  vms.forEach(vm => {
    if (vm.ipv4.length === 0) return;
    const ip = vm.ipv4[0];
    inventory._meta.hostvars[vm.label] = {
      ansible_host: ip
    };
    inventory.linode.hosts.push(vm.label);
    vm.tags.forEach(tag => {
      if (tags !== false) {
        if (!tags.includes(tag)) return;
      }
      if (!inventory[tag]) {
        inventory[tag] = { hosts: [] };
      }
      inventory[tag].hosts.push(vm.label);
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
      let vms = await getAllVms(req.bearer_token);
      let tags = false;
      if (req.query.tags) {
        tags = req.query.tags.split(',');
        vms = filterVms(vms, tags);
      }
      res.json(toInventory(vms, tags));
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
