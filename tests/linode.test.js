import assert from 'assert';
import { describe, it } from 'mocha';
import { filterVms } from '../src/routes/api/v1/linode';

describe('Linode', function() {
  describe('filterVms', function() {
    const tests = [
      {
        vms: [
          { name: 'a1', tags: ['a', 'b', 'c', 'd'] },
          { name: 'a2', tags: ['a', 'b', 'c', 'd'] },
          { name: 'x1', tags: ['x', 'b', 'c', 'd'] }
        ],
        tags: ['b', 'c'],
        required_tag: 'a',
        filtered_names: ['a1', 'a2']
      },
      {
        vms: [
          { name: 'a1', tags: ['a', 'b', 'c', 'd'] },
          { name: 'a2', tags: ['a', 'b', 'c', 'd'] },
          { name: 'x1', tags: ['x', 'b', 'c', 'd'] },
          { name: 'x2', tags: ['x', 'b', 'c', 'd'] }
        ],
        tags: ['b', 'c'],
        required_tag: 'x',
        filtered_names: ['x1', 'x2']
      },
      {
        vms: [
          { name: 'a1', tags: ['a', 'b', 'c', 'd'] },
          { name: 'a2', tags: ['a', 'b', 'c', 'd'] },
          { name: 'x1', tags: ['x', 'b', 'c', 'd'] },
          { name: 'x2', tags: ['x', 'b', 'c', 'd'] },
          { name: 'z1', tags: ['z', 'b', 'c', 'd'] }
        ],
        tags: ['b', 'c'],
        required_tag: 'x',
        filtered_names: ['x1', 'x2']
      },
      {
        vms: [
          { name: 'a1', tags: ['a', 'b', 'c', 'd'] },
          { name: 'a2', tags: ['a', 'b', 'c', 'd'] },
          { name: 'x1', tags: ['x', 'b', 'c', 'd'] },
          { name: 'x2', tags: ['x', 'b', 'c', 'd'] },
          { name: 'z1', tags: ['z', 'b', 'c', 'd'] }
        ],
        tags: ['b', 'c'],
        required_tag: undefined,
        filtered_names: ['a1', 'a2', 'x1', 'x2', 'z1']
      },
      {
        vms: [
          { name: 'a1', tags: ['a', 'b', 'c', 'd'] },
          { name: 'a2', tags: ['a', 'b', 'c', 'd'] },
          { name: 'x1', tags: ['x', 'b', 'c', 'd'] },
          { name: 'x2', tags: ['x', 'b', 'c', 'd'] },
          { name: 'z1', tags: ['z', 'b', 'c', 'd'] }
        ],
        tags: [],
        required_tag: 'a',
        filtered_names: ['a1', 'a2']
      }
    ];
    tests.forEach((test, i) => {
      it(`should return VMs correctly filtered #${i}`, function() {
        const filtered = filterVms(test.vms, test.tags, test.required_tag);
        assert.deepStrictEqual(
          filtered.map(f => f.name),
          test.filtered_names
        );
      });
    });
  });
});
