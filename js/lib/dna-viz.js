var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');

var cssStr = `
div.seq {
    overflow: auto;
    white-space: nowrap;
    user-select: none;
    -moz-user-select: none;
}
div.nucleotide {
    display: inline-block;
    width: 50px;
    height: auto;
    color: white;
    text-decoration: none;
    margin-right: -4px;
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
        seq : '',
        _selected_nucleotides: {},
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

var DNAVizView = widgets.DOMWidgetView.extend({
    render: function() {
        this.el.className = "dna-viz-view";
        this.drawSequenceEl();
        this.model.on('change:seq', this.drawSequenceEl, this);
    },

    _getNucleotideDiv: function(char_) {
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

        var nuclDiv = document.createElement("div");
        nuclDiv.classList.add("nucleotide");
        nuclDiv.innerHTML = `
            <svg><g>
                <rect fill="black" width="50" height="10"/>
                <polygon points="` + points + `" fill="` + color + `"/>
                <text x="13" y="40" font-family="Verdana" font-size="32" fill="white">` + char_ + `</text>
            </g></svg>`;
        return nuclDiv;
    },

    drawSequenceEl: function() {
        var styleDiv = document.createElement("style");
        styleDiv.innerHTML = cssStr;
        this.el.appendChild(styleDiv);

        var seqDiv = document.createElement("div");
        seqDiv.classList.add("seq");
        var seqData = this.model.get('seq');
        for(var i=0; i< seqData.length; i++){
            var char_ = seqData[i];
            var nuclDiv = this._getNucleotideDiv(char_);
            nuclDiv.id = i;
            this._setUpNuclDivMouseEvents(nuclDiv);
            seqDiv.appendChild(nuclDiv);}

        this.el.appendChild(seqDiv);
    },

    _setSelectedNucl: function(nuclDiv, toggle){
        var indexToSet = nuclDiv.id;
        if(indexToSet === ""){
            return;}
        var selectedNucl = this.model.get("_selected_nucleotides");
        var seq = this.model.get("seq");

        if(toggle && indexToSet in selectedNucl){
            delete selectedNucl[indexToSet];
            nuclDiv.style.backgroundColor = "transparent";
        } else {
            selectedNucl[indexToSet] = seq[Number(indexToSet)];
            nuclDiv.style.backgroundColor = "LightBlue";}

        newSelectedNucl = JSON.parse(JSON.stringify(selectedNucl));
        newSelectedNucl.timestamp = Date.now();
        this.model.set("_selected_nucleotides", newSelectedNucl);
    },

    _setUpNuclDivMouseEvents: function(nuclDiv) {
        nuclDiv.onmousedown = (evt) => {
            this._setSelectedNucl(evt.target.parentNode, true);};
        nuclDiv.onmouseover = (evt) => {
            if(evt.buttons === 1){
                this._setSelectedNucl(evt.target.parentNode, false);}};
        nuclDiv.onmouseup = (evt) => {
            this.model.save_changes();
        }
    }
});

module.exports = {
    DNAVizModel : DNAVizModel,
    DNAVizView : DNAVizView
};
