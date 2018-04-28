import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  alertInfo: '',
  saveDisabled: false,
  runCount: 0,
  yOffset: 120,
  innerHeight: window.innerHeight,

  height: computed('yOffset', 'innerHeight', function() {
    let yOffset = this.get('yOffset');
    let innerHeight = this.get('innerHeight');
    return innerHeight - yOffset;
  }),

  init() {
    this._super(...arguments);
    this.get('resizeService').on('didResize', () => {
      this.set('innerHeight', window.innerHeight);
    });
  },

  actions: {
    saveFiddle() {
      this.set('saveDisabled', true);
      this.set('alertInfo', 'Saving Fiddle...');
      this.get('model').save().then(() => {
        this.set('alertInfo', 'Fiddle Saved.');
        setTimeout(() => {
          this.set('alertInfo', '');
        }, 4000)
      });
    },
    enableSave() {
      this.set('saveDisabled', false);
    },
    runFiddle() {
      if (!this.get('saveDisabled')) {
        this.send('saveFiddle');
      }
      this.incrementProperty('runCount');
    }
  }
});
