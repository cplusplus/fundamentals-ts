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

    function fetch(url) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.onload = function() {
                resolve(this.responseText);
            }
            request.onerror = function() {
                reject(this);
            }
            request.onabort = function() {
                reject(this);
            }
            request.open('GET', url);
            request.send();
        });
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
        var sheetUpdates = Array.prototype.map.call(
            copy.querySelectorAll('link[rel="stylesheet"]'),
            function(extSheet) {
                return fetch(extSheet.href).catch(function(error) {
                    console.warning('Could not fetch', extSheet.href,
                                    'falling back to stylesheet contents.',
                                    error);
                    var styleText = '';
                    var sheet = extSheet.sheet;
                    if (!sheet.disabled) {
                        forEach(sheet.cssRules, function(rule) {
                            styleText += rule.cssText;
                        });
                    }
                    return styleText;
                }).then(function(styleText) {
                    var inlinedStyle = copy.createElement('style');
                    inlinedStyle.textContent = styleText;
                    extSheet.parentNode.insertBefore(inlinedStyle, extSheet);
                    extSheet.parentNode.removeChild(extSheet);
                });
            });

        copy.head.insertBefore(declareCustomTagNamesForIE8(),
                               copy.head.firstElementChild);

        return Promise.all(sheetUpdates).then(function() {
            return copy;
        });
    }

    Polymer('cxx-publish-button', {
        publish: function() {
            var copyPromise = cloneStaticAndInline(document);
            var source = '';
            if (this.source) {
                var source = '<!-- Sources at ' + this.source + ' -->\n';
            }
            copyPromise.then(function(copy) {
                var published = new Blob(['<!DOCTYPE html>\n',
                                          source,
                                          copy.documentElement.outerHTML],
                                         {type: 'text/html'});
                window.open(URL.createObjectURL(published), '_blank');
            });
        }
    });
})();
