import assert from 'assert';
import { describe, it } from 'mocha';
import { filterServers } from '../src/routes/api/v1/hetzner';

describe('Hetzner', function() {
  describe('filterServers', function() {
    const tests = [
      {
        servers: [
          { name: 'a1', labels: { a: '', b: '', c: '', d: '' } },
          { name: 'a2', labels: { a: '', b: '', c: '', d: '' } },
          { name: 'x1', labels: { x: '', b: '', c: '', d: '' } }
        ],
        labels: ['b', 'c'],
        required_label: 'a',
        filtered_names: ['a1', 'a2']
      },
      {
        servers: [
          { name: 'a1', labels: { a: '', b: '', c: '', d: '' } },
          { name: 'a2', labels: { a: '', b: '', c: '', d: '' } },
          { name: 'x1', labels: { x: '', b: '', c: '', d: '' } },
          { name: 'x2', labels: { x: '', b: '', c: '', d: '' } }
        ],
        labels: ['b', 'c'],
        required_label: 'x',
        filtered_names: ['x1', 'x2']
      },
      {
        servers: [
          { name: 'a1', labels: { a: '', b: '', c: '', d: '' } },
          { name: 'a2', labels: { a: '', b: '', c: '', d: '' } },
          { name: 'x1', labels: { x: '', b: '', c: '', d: '' } },
          { name: 'x2', labels: { x: '', b: '', c: '', d: '' } },
          { name: 'z1', labels: { z: '', b: '', c: '', d: '' } }
        ],
        labels: ['b', 'c'],
        required_label: 'x',
        filtered_names: ['x1', 'x2']
      },
      {
        servers: [
          { name: 'a1', labels: { a: '', b: '', c: '', d: '' } },
          { name: 'a2', labels: { a: '', b: '', c: '', d: '' } },
          { name: 'x1', labels: { x: '', b: '', c: '', d: '' } },
          { name: 'x2', labels: { x: '', b: '', c: '', d: '' } },
          { name: 'z1', labels: { z: '', b: '', c: '', d: '' } }
        ],
        labels: ['b', 'c'],
        required_label: undefined,
        filtered_names: ['a1', 'a2', 'x1', 'x2', 'z1']
      },
      {
        servers: [
          { name: 'a1', labels: { a: '', b: '', c: '', d: '' } },
          { name: 'a2', labels: { a: '', b: '', c: '', d: '' } },
          { name: 'x1', labels: { x: '', b: '', c: '', d: '' } },
          { name: 'x2', labels: { x: '', b: '', c: '', d: '' } },
          { name: 'z1', labels: { z: '', b: '', c: '', d: '' } }
        ],
        labels: [],
        required_label: 'a',
        filtered_names: ['a1', 'a2']
      }
    ];
    tests.forEach((test, i) => {
      it(`should return servers correctly filtered #${i}`, function() {
        const filtered = filterServers(test.servers, test.labels, test.required_label);
        assert.deepStrictEqual(
          filtered.map(f => f.name),
          test.filtered_names
        );
      });
    });
  });
});
