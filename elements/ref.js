(function() {
    Polymer('cxx-ref', {
        to: "",
        insynopsis: false,

        observe: {
            'in_elem.index': 'indexChanged'
        },
        applyAuthorStyles: true,

        inChanged: function() {
            this.in_elem = document.getElementById(this.in);
            if (this.in &&
                !(this.in_elem &&
                  this.in_elem.tagName.toUpperCase() == 'CXX-FOREIGN-INDEX')) {
                console.error('<cxx-ref>.in (', this.in,
                              ') must be a <cxx-foreign-index>; was',
                              this.in_elem);
            }
        },
        toChanged: function() {
            if (!this.in) {
                this.to_elem = document.getElementById(this.to);
                if (!this.to_elem) {
                    console.error("Broken link", this.to, "from", this);
                    return;
                }
                this.async(function() {
                    // Async makes sure the to_elem is upgraded.
                    if (!(this.to_elem instanceof CxxSectionElement ||
                          this.to_elem instanceof CxxTableElement)) {
                        console.error("Reference from", this,
                                      "refers to non-section, non-table element",
                                      this.to_elem);
                    }
                });
            }
        },

        indexChanged: function() {
            if (!(this.to in this.in_elem.index)) {
                console.error(this.to, 'not found in', this.in_elem);
            }
        }
    });
})()

