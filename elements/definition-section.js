(function() {
    // Record the document that this element is declared in, so we can
    // pull the <dt> template out of it.
    // The condition handles the HTML Imports polyfill:
    // http://www.polymer-project.org/platform/html-imports.html#other-notes
    var importDocument = document._currentScript
        ? document._currentScript.ownerDocument
        : document.currentScript.ownerDocument;

    Polymer('cxx-definition-section', {
        ready: function() {
            var parent_section = this.parentElement;
            while (parent_section && parent_section.tagName != 'CXX-SECTION')
                parent_section = parent_section.parentElement;
            if (!parent_section) {
                console.error('cxx-definition-section', this,
                              'must be a descendent of a <cxx-section> element.');
                return;
            }

            var next_term_number = 1;
            for (var dt = this.firstElementChild; dt;
                 dt = dt.nextElementSibling) {
                if (dt.tagName != 'DT')
                    continue;

                dt.parent_section = parent_section;
                dt.term_number = next_term_number++;

                var template = importDocument.getElementById(
                    'cxx-definition-section-term');
                template.removeAttribute('id');
                template.model = dt;

                dt.createShadowRoot().appendChild(template);
            }
        }
    });
})();
