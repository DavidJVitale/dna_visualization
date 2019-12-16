dna-visualization
===============================

Proof of concept of a jupyter widget that allows you to visualize DNA sequences and . Works well for performing basic sequence analysis when integrated with libraries like Biopython.

Installation
------------

To install use pip:

    $ pip install dna_visualization
    $ jupyter nbextension enable --py --sys-prefix dna_visualization

To install for jupyterlab

    $ jupyter labextension install dna_visualization

For a development installation (requires npm),

    $ git clone https://github.com//dna-visualization.git
    $ cd dna-visualization
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix dna_visualization
    $ jupyter nbextension enable --py --sys-prefix dna_visualization
    $ jupyter labextension install js

When actively developing your extension, build Jupyter Lab with the command:

    $ jupyter lab --watch

This take a minute or so to get started, but then allows you to hot-reload your javascript extension.
To see a change, save your javascript, watch the terminal for an update.

Note on first `jupyter lab --watch`, you may need to touch a file to get Jupyter Lab to open.

