import Ember from 'ember';

/**
 * Mixin to set the appropriate class for components with differently styled types ("success", "danger" etc.)
 *
 * @class TypeClass
 * @namespace Mixins
 */
export default Ember.Mixin.create({
    /**
     * Prefix for the selected class, e.g. "btn" for button selected classes ("btn-primary2 etc.)
     *
     * @property classNamePrefix
     * @selected string
     * @required
     * @protected
     */
    classNamePrefix: null,
    classNameBindings: ['selectedClass'],
    selectedClass: Ember.computed('selected', function() {
        var prefix = this.get('classNamePrefix') || '',
            selected = this.get('selected');
        if (selected) {
            return prefix + 'selected' ;
        } else {
            return '';
        }
    }),

    /**
     * Property for selected styling
     *
     * For the available selecteds see the [Bootstrap docs](http://getbootstrap.com/css/#buttons-options) (use without "btn-" prefix)
     *
     * @property selected
     * @selected String
     * @default 'default'
     * @public
     */
    selected: false
});