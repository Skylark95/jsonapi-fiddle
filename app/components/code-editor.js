import Component from '@ember/component';
import { observer } from '@ember/object';
import ENV from 'jsonapi-fiddle/config/environment';

export default Component.extend({
  height: 300,
  editor: null,
  apidocs: ENV.APP.apidocs,

  heightChange: observer('height', function() {
    let editor = this.get('editor');
    let height = this.get('height');
    editor.style.height = `${height}px`;
  }),

  didInsertElement() {
    let element = this.get('element');
    let editor = element.querySelector('.CodeMirror');
    let height = this.get('height');
    editor.style.height = `${height}px`;
    this.set('editor', editor);
  },

  valueUpdated: function() {},
  actions: {
    updateSourceText(sourceText) {
      this.set('sourceText', sourceText);
      this.get('valueUpdated')();
    }
  }
});
