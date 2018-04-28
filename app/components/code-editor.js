import Component from '@ember/component';

export default Component.extend({
  valueUpdated: function() {},
  actions: {
    updateSourceText(sourceText) {
      this.set('sourceText', sourceText);
      this.get('valueUpdated')();
    }
  }
});
