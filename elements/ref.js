(function() {
    Polymer('cxx-ref', {
        to: "",
        insynopsis: false,

        created: function() {
            // https://github.com/Polymer/polymer/issues/342
            this.to = this.getAttribute("to");
            this.insynopsis = this.hasAttribute("insynopsis");

            this.to_elem = document.getElementById(this.to);
            if (this.to_elem == null) {
                console.error("Broken link", this.to, "from", this);
            }
            if (!this.to_elem instanceof CxxSectionElement) {
                console.error("Reference from", this,
                              "refers to non-section element", this.to_elem);
            }
        }
    });
})()

