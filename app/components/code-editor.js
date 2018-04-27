import Component from '@ember/component';
import { storageFor } from 'ember-local-storage';

export default Component.extend({
  codeHistory: storageFor('code-history')
});
