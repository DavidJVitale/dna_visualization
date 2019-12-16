var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'dna-visualization',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'dna-visualization',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

