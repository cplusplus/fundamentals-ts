(function() {
    'use strict';

    function forEach(arrayLike, func) {
        Array.prototype.forEach.call(arrayLike, func);
    }

    function cloneStaticAndInline(doc) {
        var copy = doc.cloneNode(true);
        function removeAll(nodes) {
            forEach(nodes, function(node) {
                node.parentNode.removeChild(node);
            });
        }
        removeAll(copy.querySelectorAll('script'));
        removeAll(copy.querySelectorAll('template'));
        removeAll(copy.querySelectorAll('cxx-publish-button'));

        // Inline all style sheets.
        removeAll(copy.querySelectorAll('style'));
        removeAll(copy.querySelectorAll('link'));
        var allStyles = '';
        forEach(doc.styleSheets,
                function(sheet) {
                    if (!sheet.disabled) {
                        forEach(sheet.cssRules, function(rule) {
                            allStyles += rule.cssText;
                        });
                    }
                });
        var allStylesElem = copy.createElement('style');
        allStylesElem.textContent = allStyles;
        copy.head.appendChild(allStylesElem);

        return copy;
    }

    Polymer('cxx-publish-button', {
        publish: function() {
            var copy = cloneStaticAndInline(document);
            var published = new Blob([copy.documentElement.outerHTML], {type: 'text/html'});
            window.open(URL.createObjectURL(published), '_blank');
        }
    });
})();
