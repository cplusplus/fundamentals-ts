s,\\pnum\\,\\,
s,\\pnum\s*,<p>,

/\\begin{itemdecl}/,/\\end{itemdecl}/ {
  s,\\begin{itemdecl},<cxx-function>,
  /<cxx-function>/n
  /\\end{itemdecl}/ !{
    s,.*,<cxx-signature>&</cxx-signature>,
  }
}
/\\end{itemdecl}/d
/\\begin{itemdescr}/d
s,\\end{itemdescr},</cxx-function>,

/\\indexlibrary/d

s,\\effects\s*,<cxx-effects>,
s,\\requires\s*,<cxx-requires>,
s,\\synchronization\s*,<cxx-synchronization>,
s,\\remark(s?)\s*,<cxx-remarks>,
s,\\throws\s*,<cxx-throws>,
s,\\complexity\s*,<cxx-complexity>,
s,\\returns\s*,<cxx-returns>,
s,\\exceptionsafety\s*,<cxx-exception-safety>,
s,\\postcondition(s?)\s*,<cxx-postconditions>,
s,\\errorconditions\s*,<cxx-error-conditions>,
s,\\notes\s*,<cxx-notes>,

s,\\tcode{\([^}]*\)},<code>\1</code>,g
s,\\textit{\([^}]*\)},<i>\1</i>,g

s,\\enternote\s*,<cxx-note>,
s,\s*\\exitnote,</cxx-note>,
s,\\enterexample\s*,<cxx-example>,
s,\s*\\exitexample,</cxx-example>,

s,\\begin{itemize},<ul>,
s,\\end{itemize},</ul>,
s,\\item\s*,<li>,

s,\\&,\&amp;,g

s,\s+$,,
