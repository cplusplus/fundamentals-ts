(function() {
    Polymer('cxx-section', {
        // String section number, like "17.2.3". 1-based.
        sec_num: "?",
        text_title: "",
        title_element: null,

        applyAuthorStyles: true,

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

            this.numberParagraphChildren();
        },

        numberParagraphChildren: function(rootElement, para_num_start) {
            var para_num = para_num_start || 1;
            for (var child = (rootElement || this).firstElementChild;
                 child;
                 child = child.nextElementSibling) {
                if (child instanceof CxxSectionElement)
                    return para_num;
                else if (child instanceof HTMLParagraphElement)
                    this.numberParagraph(para_num++, child);
                else if (child instanceof CxxFunctionElement) {
                    this.numberParagraph(para_num++, child);
                    para_num = this.numberParagraphChildren(child, para_num);
                } else if (child instanceof CxxFunctionAttributeElement)
                    this.numberParagraph(para_num++, child);
            }
            return para_num;
        },

        numberParagraph: function(number, element) {
            var id = this.id + '.' + number;
            if (element.id) {
                console.warn('Paragraph already has id:', element);
                var anchor = document.createElement('a');
                anchor.id = id;
                element.insertBefore(anchor, element.firstChild);
            } else {
                element.id = id;
            }
            element.setAttribute('para_num', number);
        }
    })
})();
