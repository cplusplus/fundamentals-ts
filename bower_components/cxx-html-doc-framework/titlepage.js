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
    Polymer('cxx-titlepage', {
        // Default properties
        projectNumber: null,
        docnum: null,
        pubdate: null,
        editor: null,
        revises: null,
        title: null,
        stage: null,

        computeStage: function() {
            var stages = ['draft', 'pdts'];
            var presentStages = stages.filter(function(stage) {
                return document.body.classList.contains('cxx-' + stage);
            });
            if (presentStages.length == 0) {
                if (!this.stage) {
                    console.error('Couldn\'t find a document stage in body.classList:', document.body.classList);
                } else if (stages.indexOf(this.stage) == -1) {
                    console.error('Unexpected stage: ' + this.stage);
                } else {
                    document.body.classList.add('cxx-' + this.stage);
                }
            } else if (presentStages.length > 1) {
                console.error('Found multiple document stages in body.classList:', presentStages);
            } else {
                if (this.stage) {
                    console.warn('Document stage set on both <body> ("' + presentStages[0] +
                                 '") and <cxx-titlepage> ("' + this.stage + '")');
                }
                this.stage = presentStages[0];
            }
        },

        domReady: function() {
            this.projectNumber = this.querySelector('cxx-project-number');
            this.docnum = this.querySelector('cxx-docnum');
            this.pubdate = this.querySelector('time[pubdate]');
            this.editor = this.querySelector('cxx-editor');
            this.revises = this.querySelector('cxx-revises');

            var title = this.querySelector('h1:lang(en)') || this.querySelector('h1');
            if (title) {
                this.title = title.textContent;
            }
            this.title_fr = this.querySelector('h2:lang(fr)');
            if (this.title_fr) {
                this.title_fr = this.title_fr.textContent;
            }

            this.computeStage();
            var stage_suffix = '';
            if (this.stage == 'draft') {
                stage_suffix = ", Working Draft";
            } else if (this.stage == 'pdts') {
                stage_suffix = ", PDTS"
            }
            if (this.title) {
                document.title = this.title + stage_suffix;
            }
        },
    })
})();
