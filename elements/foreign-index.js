Polymer('cxx-foreign-index', {
    attachIndex: function(e) {
        this.index = e.detail.response;
        if (typeof(this.index) != 'object') {
            this.index = JSON.parse(this.index);
        }

        for (var property in this.index) {
            if (this.index.hasOwnProperty(property) &&
                typeof(this.index[property]) != 'string') {
                console.error(this.src,
                              'should map section names to their numbers, but',
                              property, 'mapped to', this.index[property]);
            }
        }
    }
});
