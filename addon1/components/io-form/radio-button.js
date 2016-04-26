import Ember from 'ember';
import FormItemMixin from '../../mixin/form-item';
import ComponentChild from '../../mixin/component-child';

/**
 * RadioButton Component
 ```html
 ``` 
 */

export default Ember.Component.extend(ComponentChild, FormItemMixin, {
	/**
	 * [tagName description]
	 */
	tagName: 'label',
	classNames: 'io-radio-button io-btn',
	classNamePrefix: 'io-radio-button-',
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