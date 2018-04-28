import Controller from '@ember/controller';

export default Controller.extend({
  alertInfo: '',
  saveDisabled: false,
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
    }
  }
});