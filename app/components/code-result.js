import Component from '@ember/component';
import { observer } from '@ember/object';
import ENV from 'jsonapi-fiddle/config/environment';

export default Component.extend({
  runCount: 0,
  sourceText: '',
  iframe: null,

  runCountChange: observer('runCount', function () {
    this.createIframe(this.get('sourceText'));
  }),

  heightChange: observer('height', function() {
    let iframe = this.get('iframe');
    iframe.height = this.get('height');
  }),
  
  didInsertElement() {
    this.createIframe('');
  },

  createIframe(sourceText) {
    let element = this.get('element');
    let iframe = document.createElement('iframe');

    iframe.classList = 'w-100';
    iframe.sandbox = 'allow-scripts allow-forms allow-modals';
    iframe.height = this.get('height');

    let scriptTags = '';
    if (ENV.APP.externalLibraries) {
      ENV.APP.externalLibraries.forEach((lib) => {
        scriptTags += `<script src="${lib}"></script>`
      });
    }

    iframe.srcdoc = `
      <html>
        <head>
          ${scriptTags}
        </head>
        <body>
          <script>${sourceText}</script>
        </body>
      </html>`;

    let oldiframe = element.querySelector('iframe')
    if (oldiframe) {
      element.removeChild(oldiframe);
    }
    element.appendChild(iframe);
    this.set('iframe', iframe);
  },

});
