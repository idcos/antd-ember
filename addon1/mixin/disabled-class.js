import Ember from 'ember';

/**
 * Mixin to set the appropriate class for components with differently styled types ("success", "danger" etc.)
 *
 * @class TypeClass
 * @namespace Mixins
 */
export default Ember.Mixin.create({
    /**
     * Prefix for the type class, e.g. "btn" for button type classes ("btn-primary2 etc.)
     *
     * @property classNamePrefix
     * @type string
     * @required
     * @protected
     */
    classNamePrefix: null,
    classNameBindings: ['disabledClass'],
    disabledClass: Ember.computed('disabled', function() {
        var prefix = this.get('classNamePrefix') || '',
            disabled = this.get('disabled');
        if (disabled) {
            return prefix + 'disabled';
        } else {
            return '';
        }
    }),

    /**
     * Property for type styling
     *
     * For the available types see the [Bootstrap docs](http://getbootstrap.com/css/#buttons-options) (use without "btn-" prefix)
     *
     * @property type
     * @type String
     * @default 'default'
     * @public
     */
    disabled: null
});