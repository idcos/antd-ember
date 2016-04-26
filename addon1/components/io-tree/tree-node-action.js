import Em from 'ember';
import StyleBindingsMixin from '../../mixin/style-bindings';
import WithConfigMixin from '../../mixin/with-config';
/**
 * An icon action of a tree node
 * @class TreeNodeIconAction
 */
export default Em.Component.extend(WithConfigMixin, StyleBindingsMixin, {
    attributeBindings: ['stickyMode:sticky'],
    /**
     * The tag name of the icon action,
     * default is `<i>` but can be replaced with any tag.
     * @property tagName
     * @public
     */
    tagName: 'i',
    /**
     * Bind the visibility css property,
     * this is required for the `sticky` property
     * @property styleBindings
     * @private
     */
    styleBindings: 'visibility',
    /**
     * Defines the css visibility according to the value of the `sticky` property
     * @property visibility
     * @private
     */
    visibility: (function() {
        if (this.get('sticky')) {
            return 'visible';
        } else {
            return void 0;
        }
    }).property('sticky'),
    /**
     * 'true' if the action icon should be sticky and not disappear when item is not hovered
     * @property sticky
     * @public
     */
    sticky: false,
    stickyMode: (function() {
        if (this.get('sticky')) {
            return 'true';
        } else {
            return void 0;
        }
    }).property('sticky'),
    /**
     * Binds the specified css classes
     * @property classNameBindings
     * @private
     */
    classNameBindings: ['iconClasses'],
    /**
     * Set the given array of classes
     * @property iconClasses
     * @private
     */
    iconClasses: (function() {
        var _ref;
        return (_ref = this.get('meta.classes')) != null ? _ref.join(" ") : void 0;
    }).property('meta.classes'),
    /**
     * An alias to the node model of this action
     * @property node
     * @public
     */
    node: Em.computed.alias('parentView.node'),
    /**
     * Invoked when the action is clicked
     * @method invokde
     */
    invoked: (function() {
        return this.get('parentView.targetObject').send(this.get('meta.action'), this);
    }).on('click')
});