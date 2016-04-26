import Ember from 'ember';
import FormItemMixin from '../../mixin/form-item';

/**
 * Radio Component
 ```html
 ``` 
 */

export default Ember.Component.extend(FormItemMixin, {
	/**
	 * [tagName description]
	 */
	tagName: 'span',
	classNames: 'io-radio',
	classNamePrefix: 'io-radio-',
	attributeBindings: ['checked', 'name'],
	classNameBindings: ['checkedClass'],
	/**
	 * [attributes for component]
	 * @type {Boolean}
	 */
	checked: null,
	value: null,
	checkedClass: function() {
		if (this.get('checked') === this.get('value')) {
			return this.get('classNamePrefix') + 'checked';
		} else {
			return '';
		}
	}.property('checked'),
	htmlChecked: function() {
		return this.get('value') === this.get('checked');
	}.property('checked', 'value'),
	actions: {
		change: function(ev) {
			this.set('checked', this.get('value'));
		}
	}
});