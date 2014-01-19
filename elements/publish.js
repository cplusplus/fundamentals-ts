(function() {
    'use strict';

    function forEach(arrayLike, func) {
        Array.prototype.forEach.call(arrayLike, func);
    }

    // According to http://docs.angularjs.org/guide/ie, IE8 needs us to declare
    // each custom or HTML5 element by creating an instance of it with
    // document.createElement.
    function declareCustomTagNamesForIE8() {
        var allNodes = document.querySelectorAll('*');
        var customTagNameSet = {};
        for (var i = 0; i < allNodes.length; i++) {
            if (allNodes[i].tagName.indexOf('-') != -1)
                customTagNameSet[allNodes[i].tagName] = true;
        }
        var scriptComment = '[if lte IE 8]><script>'
        scriptComment += 'document.createElement("nav");';
        scriptComment += 'document.createElement("section");';
        scriptComment += 'document.createElement("time");';

        for (var name in customTagNameSet) {
            if (customTagNameSet.hasOwnProperty(name))
                scriptComment += 'document.createElement("' + name + '");';
        }
        scriptComment += '</script><![endif]'
        return document.createComment(scriptComment);
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

        copy.head.insertBefore(declareCustomTagNamesForIE8(),
                               copy.head.firstElementChild);

        return copy;
    }

    Polymer('cxx-publish-button', {
        publish: function() {
            var copy = cloneStaticAndInline(document);
            var published = new Blob(['<!DOCTYPE html>',
                                      copy.documentElement.outerHTML],
                                     {type: 'text/html'});
            window.open(URL.createObjectURL(published), '_blank');
        }
    });
})();
