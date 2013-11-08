(function() {
    Polymer('cxx-titlepage', {
        // Default properties
        docnum: null,
        pubdate: null,
        editor: null,
        revises: null,
        title: null,

        applyAuthorStyles: true,
        created: function() {
            this.docnum = this.querySelector('cxx-docnum');
            this.pubdate = this.querySelector('time[pubdate]');
            this.editor = this.querySelector('cxx-editor');
            this.revises = this.querySelector('cxx-revises');
            this.title = this.querySelector('h1').textContent;
            this.stage = this.getAttribute('stage');
            if (this.stage == 'draft') {
                this.title_prefix = "Working Draft";
            } else {
                console.error('Unexpected stage: ' + this.stage);
            }
            if (this.title) {
                document.title = this.title_prefix + ', ' + this.title;
            }
        },
    })
})();
