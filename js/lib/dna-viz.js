var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');

// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var DNAVizModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'DNAVizModel',
        _view_name : 'DNAVizView',
        _model_module : 'dna-visualization',
        _view_module : 'dna-visualization',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
        _seq : 'Hello World!'
    })
});


// Custom View. Renders the widget model.
var DNAVizView = widgets.DOMWidgetView.extend({
    render: function() {
        this.seq_changed();
        this.model.on('change:_seq', this.seq_changed, this);
    },

    seq_changed: function() {
        this.el.textContent = this.model.get('_seq');
    }
});


module.exports = {
    DNAVizModel : DNAVizModel,
    DNAVizView : DNAVizView
};