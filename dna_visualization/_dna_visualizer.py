from itertools import groupby
from operator import itemgetter

import ipywidgets as widgets
from traitlets import Unicode, Tuple, Dict, observe
from IPython.display import display

@widgets.register
class DNAVisualizer(widgets.DOMWidget):
    """An example widget."""
    _view_name = Unicode('DNAVizView').tag(sync=True)
    _model_name = Unicode('DNAVizModel').tag(sync=True)
    _view_module = Unicode('dna-visualization').tag(sync=True)
    _model_module = Unicode('dna-visualization').tag(sync=True)
    _view_module_version = Unicode('^0.1.0').tag(sync=True)
    _model_module_version = Unicode('^0.1.0').tag(sync=True)
    seq = Unicode('').tag(sync=True)
    _selected_nucleotides = Dict({}).tag(sync=True)
    selected_indexes = Tuple().tag(sync=True)
    """The zero-based indexes of user-selected nucleotides"""
    selected_words = Tuple().tag(sync=True)
    """The groupings of nucleotides selected by the user"""

    def __init__(self, seq):
        """Initialize the DNAVisualizer with the specified sequence `seq`"""
        self.seq = seq
        super().__init__()

    @observe("_selected_nucleotides")
    def _on_selected_nucleotides_update(self, change):
        sel_nucl = change["new"]
        self.selected_indexes = \
            list(int(x) for x in sel_nucl if x!= "timestamp")
        selected_words = []
        indexes = self.selected_indexes
        for k, g in groupby(enumerate(indexes), lambda ix : ix[0] - ix[1]):
            word = ""
            for index in map(itemgetter(1), g):
                word += self.seq[index]
            selected_words.append(word)
        self.selected_words = selected_words
