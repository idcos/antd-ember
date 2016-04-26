import Em from 'ember';
/**
 * Provides styleBindings property to bind style 
 * properties based on object properties.
 *
 * @class StyleBindingsMixin
 * @public
 */
export default Em.Mixin.create({
    /**
     * Add `styleBindings` property as a `concatenatedProperties`.
     * @property concatenatedProperties
     * @type array
     */
    concatenatedProperties: ['styleBindings'],
    /**
     * Apply the `style` attribute to the DOM element.
     * @property attributeBindings
     * @type array
     */
    attributeBindings: ['style'],
    /**
     * The default unit for numbered value.
     * @property unit
     * @type string
     */
    unit: 'px',
    /**
     * Build a style property and its value as a string.
     * @method buildStyleString
     * @param {String} style property name
     * @param {String} property name in the current object that should be resolved as the
     * value of the style property.
     * @private
     */
    buildStyleString: function(styleName, property) {
        var value;
        value = this.get(property);
        if (value === void 0) {
            return;
        }
        if (Em.typeOf(value) === "number") {
            value = value + this.get("unit");
        }
        return styleName + ":" + value + ";";
    },
    /**
     * Apply the style bindings during the view `init` phase.
     *
     * This method assumes that the attribute `styleBindings` is defined as an array of strings where
     * each string is a property name that should be resolved as a style option.
     *
     * @method applyBindings
     * @private
     */
    applyBindings: Em.on('init', function() {
        var lookup, properties, styleBindingsstyleBindings, styleComputed, styles;
        if (!(styleBindingsstyleBindings = this.styleBindings)) {
            return;
        }
        lookup = {};
        this.styleBindings.forEach(function(binding) {
            var propArr, property, style;
            propArr = binding.split(":");
            property = propArr[0];
            style = propArr[1];
            return lookup[style || property] = property;
        });
        styles = Em.keys(lookup);
        properties = styles.map(function(style) {
            return lookup[style];
        });
        styleComputed = Em.computed(function() {
            var styleString, styleTokens;
            styleTokens = styles.map((function(_this) {
                return function(style) {
                    return _this.buildStyleString(style, lookup[style]);
                };
            })(this));
            styleString = styleTokens.join("");
            if (styleString.length !== 0) {
                return styleString;
            }
        });
        styleComputed.property.apply(styleComputed, properties);
        return Em.defineProperty(this, "style", styleComputed);
    })
});