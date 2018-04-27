import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | fiddle', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:fiddle');
    assert.ok(route);
  });
});
