import ipywidgets as widgets
from traitlets import Unicode

@widgets.register
class DNAVisualizer(widgets.DOMWidget):
    """An example widget."""
    _view_name = Unicode('DNAVizView').tag(sync=True)
    _model_name = Unicode('DNAVizModel').tag(sync=True)
    _view_module = Unicode('dna-visualization').tag(sync=True)
    _model_module = Unicode('dna-visualization').tag(sync=True)
    _view_module_version = Unicode('^0.1.0').tag(sync=True)
    _model_module_version = Unicode('^0.1.0').tag(sync=True)
    _seq = Unicode('').tag(sync=True)

    def __init__(self, seq):
        """Initialize the DNAVisualizer with the specified sequence `seq`"""
        self._seq = seq
        super().__init__()
