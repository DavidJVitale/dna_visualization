from ._version import version_info, __version__

from ._dna_visualizer import *

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'dna-visualization',
        'require': 'dna-visualization/extension'
    }]
