import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';

export default Route.extend({
  codeHistory: storageFor('code-history'),

  model() {
    return this.get('codeHistory');
  }
});
