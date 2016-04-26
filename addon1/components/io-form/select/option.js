import Ember from 'ember';
import SelectedClass from '../../../mixin/selected-class';
import DisabledClass from '../../../mixin/disabled-class';
import ComponentChild from '../../../mixin/component-child';

/**
 * io-option Component
 ```html
 ``` 
 */

export default Ember.Component.extend(ComponentChild, SelectedClass, DisabledClass, {
	/**
	 * [tagName description]
	 */
	tagName: 'li',
	attributeBindings: ['disabled', 'role', 'selected'],
	classNames: 'io-select-dropdown-menu-item',
	classNamePrefix: ['io-select-dropdown-menu-item-'],
	classNameBindings: ['activeClass'],
	role: 'select-option',
	activeClass: function() {
		
		if (this.get('active')) {
			return this.get('classNamePrefix') + 'active';
		} else {
			return '';
		}

	}.property('active'),
	click: function() {
		var parent = this.get('parent');
		parent.send('onSelect', this);
	}
});