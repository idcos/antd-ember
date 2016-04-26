import Ember from 'ember';
import FormItemMixin from '../../mixin/form-item';

/**
 * Col Component
 ```html
    {{#io-col}}{{/io-col}}
 ``` 
 */

export default Ember.Component.extend(FormItemMixin, {
	/**
	 * [tagName description]
	 */
	tagName: 'span',
	classNames: 'io-checkbox',
	classNamePrefix: 'io-checkbox-',
	attributeBindings: ['checked', 'disabled'],
	classNameBindings: ['checkedClass'],
	checkedClass: function() {
		if (this.get('checked') === true) {
			return this.get('classNamePrefix') + 'checked';
		} else {
			return '';
		}
	}.property('checked'),
	/**
	 * [checked attribute for component]
	 * @type {Boolean}
	 */
	checked: false,
	/**
	 * [onChecked event]
	 * @return {[type]} [description]
	 */
	onChecked: function() {
		this.sendAction('onChange', this.get('checked'));
	}.observes('checked'),
});