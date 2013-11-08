(function() {
    Polymer('cxx-section', {
        // String section number, like "17.2.3". 1-based.
        sec_num: "?",
        text_title: "",
        title_element: null,

        update_sec_nums: function(sec_num) {
            this.sec_num = sec_num + '';
            var child_index = 1;
            // Assume there aren't any elements between cxx-section levels.
            for (var child = this.firstChild; child; child = child.nextSibling) {
                if (child instanceof CxxSectionElement) {
                    child.update_sec_nums(this.sec_num + '.' + (child_index++));
                }
            }
        },

        created: function() {
            var title_element = this.querySelector('cxx-title');
            if (title_element && title_element.parentElement != this)
                title_element = null;
            if (title_element && this.title)
                console.warn(this, 'has two titles');
            if (!title_element && !this.title)
                console.warn(this, 'has no title');
            this.text_title = this.title;
            if (title_element) {
                this.title_element = title_element;
                this.text_title = title_element.textContent;
            }
        }
    })
})();
