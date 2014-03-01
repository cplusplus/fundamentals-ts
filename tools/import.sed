s,\s+$,,
s,\[\s*Note:\s*,<cxx-note>,
s,\s*(-|–|—)+\s*end\s*note\],</cxx-note>,
s,\[\s*Example:\s*,<cxx-example>,
s,\s*(-|–|—)+\s*end\s*example\],</cxx-example>,

s,(-\?-)?\s*(<p>)?(<i>|<em>)?Effect(s?)(</i>|</em>)?:\s*(</i>|</em>)?\s*,<cxx-effects>,
s,(-\?-)?\s*(<p>)?(<i>|<em>)?Requires(</i>|</em>)?:\s*(</i>|</em>)?\s*,<cxx-requires>,
s,(-\?-)?\s*(<p>)?(<i>|<em>)?Synchronization(</i>|</em>)?:\s*(</i>|</em>)?\s*,<cxx-synchronization>,
s,(-\?-)?\s*(<p>)?(<i>|<em>)?Remark(s?)(</i>|</em>)?:\s*(</i>|</em>)?\s*,<cxx-remarks>,
s,(-\?-)?\s*(<p>)?(<i>|<em>)?Throws(</i>|</em>)?:\s*(</i>|</em>)?\s*,<cxx-throws>,
s,(-\?-)?\s*(<p>)?(<i>|<em>)?Complexity(</i>|</em>)?:\s*(</i>|</em>)?\s*,<cxx-complexity>,
s,(-\?-)?\s*(<p>)?(<i>|<em>)?Returns(</i>|</em>)?:\s*(</i>|</em>)?\s*,<cxx-returns>,
s,(-\?-)?\s*(<p>)?(<i>|<em>)?Precondition(s?)(</i>|</em>)?:\s*(</i>|</em>)?\s*,<cxx-preconditions>,
s,(-\?-)?\s*(<p>)?(<i>|<em>)?Post(-?)condition(s?)(</i>|</em>)?:\s*(</i>|</em>)?\s*,<cxx-postconditions>,
s,(-\?-)?\s*(<p>)?(<i>|<em>)?Error conditions(</i>|</em>)?:\s*(</i>|</em>)?\s*,<cxx-error-conditions>,
s,(-\?-)?\s*(<p>)?(<i>|<em>)?Note(s?)(</i>|</em>)?:\s*(</i>|</em>)?\s*,<cxx-notes>,

s,<tt>,<code>,g
s,</tt>,</code>,g
