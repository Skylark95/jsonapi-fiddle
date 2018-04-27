import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    saveFiddle() {
      this.get('model').save();
    }
  }
});
