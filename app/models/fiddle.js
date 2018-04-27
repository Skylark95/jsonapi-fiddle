import DS from 'ember-data';

export default DS.Model.extend({
  javascript: DS.attr('string', { defaultValue: "alert('Hello world!')" })
});
