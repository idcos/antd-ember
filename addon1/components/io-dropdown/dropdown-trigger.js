import Ember from 'ember';
import Dropdown from './dropdown';

/**
 * io-dropdown-trigger Component
 ```html
 	{{#io-dropdown}}
 		{{#io-dropdown-trigger}}
			
 		{{/io-dropdown-trigger}}
 		{{#io-dropdown-overlay}}
			
 		{{/io-dropdown-overlay}}
 	{{/io-dropdown}}
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'span',
	classNames: 'io-dropdown-trigger',
	click() {
		const parent = this.nearestOfType(Dropdown);
		if (parent) {
			parent.send('clickTrigger');
		}
	}
});