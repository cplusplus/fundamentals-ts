/* Copyright 2014 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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

    function inlineImages(images) {
        Array.prototype.forEach.call(images,
            function(image) {
                if (image.naturalWidth == 0)
                    console.error(image, "hasn't loaded yet.");
                var canvas = document.createElement('canvas');
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
                image.src = canvas.toDataURL();
            });
    }

    // Replaces <caption>s inside <caption>s with <spans>, so that Firefox doesn't
    // omit them from the rendering.
    function fixNestedCaptions(doc) {
        doc.querySelectorAll('caption caption').array().forEach(function(caption) {
            var span = doc.createElement('span');
            span.innerHTML = caption.innerHTML;
            caption.parentNode.insertBefore(span, caption);
            caption.remove();
        });
    }

    function cloneStaticAndInline(doc) {
        // Inline the images on the source document instead of the copy
        // because the copy doesn't have time to load the images.
        inlineImages(doc.getElementsByTagName('img'));

        var copy = doc.cloneNode(true);

        // Remove elements that run code or don't contribute to the appearance
        // of the page.
        forEach(['cxx-publish-button', 'script', 'link[rel=import]'],
                function(selector) {
            forEach(copy.querySelectorAll(selector), function(node) {
                node.remove();
            });
        });
        forEach(copy.body.querySelectorAll('*'), function(node) {
            if (getComputedStyle(node).display === 'none') {
                node.remove();
            }
        })

        fixNestedCaptions(copy);

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

    function buildSectionIndex(doc) {
        var result = {};
        doc.querySelectorAll('cxx-clause,cxx-section').array().forEach(function(section) {
            if (!section.id) {
                console.warn(section, 'is missing its id.');
                return;
            }
            if (!section.sec_num || section.sec_num == '?') {
                console.warn(section, 'is missing its number');
                return;
            }
            result[section.id] = section.sec_num;
        });
        return result;
    }

    Polymer('cxx-publish-button', {
        publishing: false,
        flattenedBlob: null,
        publish: function() {
            if (this.publishing) {
                return;
            }
            this.publishing = true;
            var copyPromise = cloneStaticAndInline(document);
            var source = '';
            if (this.source) {
                source = '<!-- Sources at ' + this.source + ' -->\n';
            }
            var sectionIndex = buildSectionIndex(document);
            copyPromise.then(function(copy) {
                var published = new Blob(['<!DOCTYPE html>\n',
                                          source,
                                          copy.documentElement.outerHTML],
                                         {type: 'text/html'});
                this.flattenedBlob = URL.createObjectURL(published);
                this.sectionIndex = encodeURI('data:application/json,' + JSON.stringify(sectionIndex));
            }.bind(this)).catch(function(e) {
                console.error(e);
                this.publishing = false;
            }.bind(this));
        },
    });
})();
