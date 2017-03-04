/**
 * FontAwesome-Picker
 * Tooltip component
 */
(function($) {
    var Tooltip = function(elem, options) {
        this.elem = $(elem);
        this.options = options;
    };

    Tooltip.prototype = {
        defaults: {
            text: '' // either "string" || function(elem) {}
        },

        init: function() {
            this.settings = $.extend({}, this.defaults, this.options);
            var self = this;

            this.body = $('body');

            // Prepare tooltip (once)
            this.tooltip = $('.tooltip');
            if (!this.tooltip.length) {
                this.tooltip = $('<div />')
                    .addClass('tooltip')
                    .hide()
                    .appendTo(this.body);
            }

            this.elem.mouseenter(function() {
                var tooltip = self.tooltip,
                    elem = self.elem,
                    body = self.body;

                var text = typeof self.settings.text != 'string'
                    ? self.settings.text(self.elem)
                    : self.settings.text;
                self.tooltip.text(text);

                // Show tooltip so we can get its width
                tooltip.show();

                // Compute position
                var elemOuterHeight = elem.outerHeight(true),
                    elemOuterWidth = elem.outerWidth(true),
                    tooltipOuterWidth = tooltip.outerWidth(true),
                    tooltipOuterHeight = tooltip.outerHeight(true),
                    top = elem.offset().top + elemOuterHeight,
                    left = elem.position().left + elemOuterWidth/2 - tooltipOuterWidth / 2;

                tooltip
                    .css('top', top)
                    .css('left', left);

                // Check if tooltip is out of viewport
                if (left < 0)
                    tooltip.css('left', 5);
                else if (left + tooltipOuterWidth > body.width())
                    tooltip.css('left', body.width() - tooltipOuterWidth - 15);

                if (top + tooltipOuterHeight > body.height())
                    tooltip.css('top', elem.offset().top - tooltipOuterHeight - 3);
            }).mouseleave(function() {
                self.tooltip.hide();
            })
        }
    };

    $.fn.tooltip = function(options) {
        return this.each(function() {
            new Tooltip(this, options).init();
        });
    };
})($);
