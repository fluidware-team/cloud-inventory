# Cloud Inventory 

Build dynamic inventory from different Cloud Providers   


## API

Simply do a HTTP GET to `/api/v1/inventory/${provider}` using your token

```
curl -s -H "Authorization: Bearer PROVIDER_TOKEN" \
    https://cloud-inventory.fluidware.it/api/v1/inventory/${provider}
```

To filter by tag(s): 


```
curl -s -H "Authorization: Bearer PROVIDER_TOKEN" \
    https://cloud-inventory.fluidware.it/api/v1/inventory/${provider}?tags=tag1,tag2
```

### Digital Ocean

```
curl -s -H "Authorization: Bearer DO_TOKEN" \
    https://cloud-inventory.fluidware.it/api/v1/inventory/do
```

Response:

```json
{
  "_meta": {
    "hostvars": {
      "inlista-01": {
        "ansible_host": "111.222.111.222"
      }
    }
  },
  "digitalocean": {
    "hosts": [
      "inlista-01"
    ]
  },
  "inlista": {
    "hosts": [
      "inlista-01"
    ]
  }
}
```

### Linode

```
curl -s -H "Authorization: Bearer LINODE_TOKEN" \
    https://cloud-inventory.fluidware.it/api/v1/inventory/linode
```

Response

```json
{
  "_meta": {
    "hostvars": {
      "inlista-01": {
        "ansible_host": "111.222.111.222"
      }
    }
  },
  "linode": {
    "hosts": [
      "inlista-01"
    ]
  },
  "inlista": {
    "hosts": [
      "inlista-01"
    ]
  }
}
```
