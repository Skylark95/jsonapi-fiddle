import Controller from '@ember/controller';
import { storageFor } from 'ember-local-storage';

export default Controller.extend({
  codeHistory: storageFor('code-history')
});
