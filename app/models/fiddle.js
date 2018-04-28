import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  javascript: DS.attr('string', { defaultValue: "alert('Hello world!')" })
});
