C++ HTML document framework
===========================

This is a [Polymer](http://www.polymer-project.org/)-based HTML framework for
writing ISO C++ documents and papers.  To use it for your document, you should

1. [Install Bower.](http://bower.io/#installing-bower)
2. Install this package by running `bower install cplusplus/html-doc-framework` in the root directory of your document.
3. Import this package into your main HTML file by adding two lines inside the `<head>` element:

   ```HTML
   <script src="bower_components/webcomponentsjs/webcomponents.js"></script>
   <link rel="import" href="bower_components/cxx-html-doc-framework/framework.html"/>
   ```

4. Run an HTTP server (e.g. [`python3 -m http.server`](https://docs.python.org/3/library/http.server.html#http-server-cli) or [`http-server`](https://www.npmjs.org/package/http-server)) in the directory of your main HTML file, and preview through that instead of a `file:///` URL.

I recommend the [Prince rendering engine](http://www.princexml.com/) for converting your HTML file to PDF. It has significantly better support for page-related features than any browser as of 2014.

Before I can accept a contribution to this project, you'll need to sign the
Contributor License Agreement at https://developers.google.com/open-source/cla/individual.

Custom C++-specific elements
----------------------------

Some of these elements define a `checkInvariants()` method, so you can run:

    document.querySelectorAll('*').array().forEach(
        function(node){ if (node.checkInvariants) node.checkInvariants(); });

to see if you've gotten anything wrong.

### `<cxx-include href="other.html">`

This one isn't really C++-specific: it allows partitioning a main document
into multiple pieces. `other.html`'s body will be copied in place of the
`<cxx-include>` element.


### `<cxx-clause>` and `<cxx-section>`

These automatically number clauses and sections, fill in
table-of-contents data, and allow cross-linking. `<cxx-clause>` is for
top-level sections, while `<cxx-section>` can be nested arbitrarily.
The title of the section is given in a nested `<h1>` element.
The `id` attribute is used for cross-linking.

### `<cxx-titlepage>`

Wraps the title page of an ISO document. The title page takes a
`stage` attribute whose value can be `draft` or (once I implement
them) `CD`, `DTS`, `TS`, etc.  The title page recognizes several
nested elements that describe the document.

#### `<cxx-project-number>`

The ISO project number for this TS or IS.  Find this on https://isocpp.org/std/status.

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

It's tested back to IE 8 and should degrade fairly gracefully in even
older browsers.


### `<dl is="cxx-definition-section">`

Numbers the terms in the `<dl>` with the parent `<cxx-section>`'s section
number, and formats and links the `id`.


### `<cxx-ednote>`

An editor's note that won't appear in the final published document.
This is formatted as a separate box on the side of the document,
unless it's marked with class="para", in which case it's formatted as a normal paragraph in a box.


### `<cxx-email>`

Must contain an email address as text, and wraps it into an
appropriate `mailto:` link.

### `<w-br>`

Introduces a soft line-break inside an otherwise-nowrap context. This works in
Firefox and Prince, where <wbr> fails, in addition to other browsers.

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

### `<table is="cxx-table">`

Adds a "Table # —" prefix to the table `<caption>`.

Style guide for documents using this framework
----------------------------------------------

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

In CSS, avoid the CSS `content` property because it doesn't copy/paste well in many browsers.
Use a custom element with text in the `<template>` instead.
Shadow DOM (what's generated from the template) also doesn't copy/paste well, but that's improving,
and the polyfill can produce non-Shadow DOM, which `<cxx-publish>` can fix into plain HTML.
