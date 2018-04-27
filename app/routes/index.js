import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').createRecord('fiddle', {});
  },
  afterModel(model) {
    model.save();
    this.transitionTo('fiddle', model.get('id'))
  }
});
