var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');

var cssStr = `
div.seq {
    overflow: auto;
    white-space: nowrap;
}
div.nucleotide {
    display: inline-block;
    width: 50px;
    height: auto;
    color: white;
    text-decoration: none;
}
div.nucleotide:hover {
    background-color: #777;
}
`

var DNAVizModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'DNAVizModel',
        _view_name : 'DNAVizView',
        _model_module : 'dna-visualization',
        _view_module : 'dna-visualization',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
        _seq : ''
    })
});

const upAPts = "10,10 25,0 40,10 40,50 10,50";
const downAPts = "10,10 40,10 40,50 25,60 10,50";

const upTPts = "10,0 25,10 40,0 40,50 10,50";
const downTPts = "10,10 40,10 40,60 25,50 10,60";

const upCPts = "10,10 20,10 20,0 30,0, 30,10 40,10 40,50 10,50";
const downCPts = "10,10 40,10 40,50 30,50 30,60 20,60 20,50 10,50"

const upGPts = "10,0 20,0 20,10 30,10, 30,0 40,0 40,50 10,50";
const downGPts = "10,10 40,10 40,60 30,60 30,50 20,50, 20,60 10,60";

// Custom View. Renders the widget model.
var DNAVizView = widgets.DOMWidgetView.extend({
    render: function() {
        this.el.className = "dna-viz-view";
        this.seqChanged();
        this.model.on('change:_seq', this.seqChanged, this);
    },

    _getNucleotideDivStr: function(char_) {
        var color = "black";
        var points = downAPts;
        if(char_ === "A"){
            color  = "red";
            points = downAPts;}
        if(char_ === "T"){
            color = "orange";
            points = downTPts;}
        if(char_ === "C"){
            color = "blue";
            points = downCPts;}
        if(char_ === "G"){
            color = "green";
            points = downGPts;}

        return `
            <div class="nucleotide">
            <svg><g>
                <polygon points="` + points + `" fill="` + color + `"/>
                <text x="13" y="40" font-family="Verdana" font-size="32" fill="white">` + char_ + `</text>
            </g></svg>
            </div>`
    },

    seqChanged: function() {
        var html = '<style>' + cssStr + '</style>'
        html += '<div class="seq">'
        var seq = this.model.get('_seq');
        for(var i=0; i< seq.length; i++){
            var char_ = seq[i];
            html += this._getNucleotideDivStr(char_);
        }
        html += '</div>'
        this.el.innerHTML = html;
    }
});


module.exports = {
    DNAVizModel : DNAVizModel,
    DNAVizView : DNAVizView
};
