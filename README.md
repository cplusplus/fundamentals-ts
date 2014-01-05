fundamentals-ts
===============

The draft C++ Library Fundamentals Technical Specification

Visit [the Polymer-based rendered
version](http://cplusplus.github.io/fundamentals-ts/fundamentals-ts.html)
or the [standalone
version](http://cplusplus.github.io/fundamentals-ts/standalone.html).

This TS is written using the [Polymer
framework](http://www.polymer-project.org/) to build custom HTML
elements. See the `elements` directory for these elements'
definitions.


Style guide
-----------

This guide is intended to produce results compatible with the main C++
standard, which is written in LaTeX.

Write semantic markup according to http://developers.whatwg.org/.

Generally use `<code>` rather than `<samp>`, `<kbd>`, `<tt>` or other
monospacing elements. `<samp>` could be useful for sample compiler
error messages.  Don't use `<kbd>` for code a user might enter: that's
just `<code>`.

Use `<em>` for emphasis and `<i>` for text in another "voice", like
comments and technical terms.  `<dfn>` is good for the defining
instance of a term, but not for subsequent uses. I may add a
`<cxx-term>` element to call out uses of technical terms specifically,
which will enable automatic cross-linking and indexing.

Use `<var>` for variables. There's tension between using it for all
variables, including function parameters, and only calling out
meta-variables used in documentation.  I'm leaning toward only
meta-variables, since marking up parameters requires a huge number of
tags, which make it harder to read the source, and there's not much
reason to italicize normal variables.  Most meta-variables will end up
marked up as `<code><var>meta-variable</var></code>`.

Very little text is bold, either with `<strong>` or `<b>`.

Any repeated markup structure should be abstracted out into a custom
element in the `elements/` directory.


Custom C++-specific elements
----------------------------

### `<cxx-clause>` and `<cxx-section>`

These automatically number clauses and sections, fill in
table-of-contents data, and allow cross-linking. `<cxx-clause>` is for
top-level sections, while `<cxx-section>` can be nested
arbitrarily. The title of the section is given in either the `title`
attribute or a nested `<cxx-title>` element. The `id` attribute is
used for cross-linking.

### `<cxx-titlepage>`

Wraps the title page of an ISO document. The title page takes a
`stage` attribute whose value can be `draft` or (once I implement
them) `CD`, `DTS`, `TS`, etc.  The title page recognizes several
nested elements that describe the document.

#### `<cxx-docnum>`

The D or N number for the document.

#### `<time pubdate>`

The publication date of the document in ISO (YYYY-MM-DD) format.

#### `<cxx-revises>`

The N number of the previous version of the document.

#### `<cxx-editor>`

A paragraph describing the editor of the document.  Use `<br>` to
separate lines.

### `<cxx-toc>`

Generates a table of contents based on the `<cxx-section>` structure.

### `<cxx-publish-button>`

Open the document using Polymer's shadow-dom polyfill (add
`?shadow=polyfill` to the URL) and then click this button to generate
a standalone version of the document, that doesn't rely on any custom
elements, scripts, or external CSS.  The result of this transformation
is what actually gets published in the C++ committee mailings.

It should be compatible back to ~IE 8 and should degrade fairly
gracefully in even older browsers.


### `<cxx-ednote>`

An editor's note that won't appear in the final published document.
This is formatted as a separate box on the side of the document.


### `<cxx-email>`

Must contain an email address as text, and wraps it into an
appropriate `mailto:` link.

### `<cxx-function>`

Describes a C++ library function.  Several nested elements help
describe the signatures and semantics of a function.

#### `<cxx-signature>`

Use one of these for each related function signature that can be
described by a single set of attributes.

#### `<cxx-requires>`, `<cxx-effects>`, `<cxx-synchronization>`, `<cxx-postconditions>`, `<cxx-returns>`, `<cxx-throws>`, `<cxx-exception-safety>`, `<cxx-remarks>`, `<cxx-error-conditions>`, and `<cxx-notes>`

Each of these elements represents one attribute from [structure.specifications]p3 ([except for `<cxx-exception-safety>`](https://github.com/cplusplus/draft/issues/228)).

### `<cxx-note>`

Wraps non-normative text inside a paragraph.

### `<cxx-ref>`

Links to a section in the current document, whose `id` is given by the
`to` attribute on the `<cxx-ref>`.  References are displayed like
"`(1.2.3)`", unless the `insynopsis` attribute is also present, in
which case the reference is displayed as a C++ comment, "`// 1.2.3,
title of referenced section`".
