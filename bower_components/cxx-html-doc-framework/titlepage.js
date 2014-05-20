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
        docnum: null,
        pubdate: null,
        editor: null,
        revises: null,
        title: null,

        created: function() {
            this.docnum = this.querySelector('cxx-docnum');
            this.pubdate = this.querySelector('time[pubdate]');
            this.editor = this.querySelector('cxx-editor');
            this.revises = this.querySelector('cxx-revises');
            this.title = this.querySelector('h1').textContent;
            this.stage = this.getAttribute('stage');
            if (this.stage == 'draft') {
                this.stage_title = "Working Draft";
            //} else if (this.stage == 'pdts') {
            //    this.iso_title_prefix = "Information technology – Programming languages, their environments and system software interfaces – "
            } else {
                console.error('Unexpected stage: ' + this.stage);
            }
            if (this.title) {
                document.title = this.title + ', ' + this.stage_title;
            }
        },
    })
})();
