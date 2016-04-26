import Ember from 'ember';
import DisabledClass from '../mixin/disabled-class';

/**
 * switch Component
 ```html
 ``` 
 */

export default Ember.Component.extend(DisabledClass, {
	/**
	 * [tagName description]
	 */
	tagName: 'span',
	attributeBindings: ['disabled', 'onClick', 'role'],
	classNames: 'io-switch',
	classNamePrefix: 'io-switch-',
	classNameBindings: ['checkedClass'],
	/**
	 * @attribute  checked
	 */
	checked: false,
	/**
	 * @state
	 */
	checkedClass: function() {
		if (this.get('checked')) {
			return this.get('classNamePrefix') + 'checked';
		} 
		return '';
	}.property('checked'),
	click() {
		this.send('toggle')
	},
	actions: {
		toggle() {
			this.set('checked', !this.get('checked'));
			if (this.get('onChange')) {
				this.sendAction('onChange', this.get('checked'));
			}
		}
	}
});