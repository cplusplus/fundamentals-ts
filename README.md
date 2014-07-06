fundamentals-ts
===============

The draft C++ Library Fundamentals Technical Specification

Visit [the Polymer-based rendered
version](https://rawgit.com/cplusplus/fundamentals-ts/v2/main.html)
or the [standalone
version](https://rawgit.com/cplusplus/fundamentals-ts/v2/fundamentals-ts.html).

This TS is written using a set of [custom HTML elements](https://github.com/cplusplus/html-doc-framework)
based on the [Polymer framework](http://www.polymer-project.org/).


Style guide
-----------

This guide is intended to produce results compatible with the main C++
standard, which is written in LaTeX.

Look for applicable [`<cxx-*>` elements](https://github.com/cplusplus/html-doc-framework),
and write semantic markup according to http://developers.whatwg.org/.

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
element in the https://github.com/cplusplus/html-doc-framework project.


Namespace formatting
--------------------

Namespace contents are indented by 2 spaces, with one blank line
between the namespace open and the first line of the contents.
Multiple namespaces can be opened at the same indentation level, like:

```c++
namespace std {
namespace experimental {

  class contents{};

} // namespace experimental
} // namespace std
```

Namespaces are only shown in header synopses, not around class or
function definitions.
