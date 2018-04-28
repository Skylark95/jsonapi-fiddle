import Component from '@ember/component';
import { observer } from '@ember/object';

export default Component.extend({
  resultChanged: observer('runCount', function () {
    let element = this.get('element'),
      sourceText = this.get('sourceText'),
      iframe = document.createElement('iframe');

    iframe.classList = 'w-100';
    iframe.sandbox = 'allow-scripts allow-forms allow-modals';

    iframe.srcdoc = `
      <html>
        <body>
          <script>${sourceText}</script>
        </body>
      </html>`;

    element.removeChild(element.querySelector('iframe'));
    element.appendChild(iframe);
  })
});
