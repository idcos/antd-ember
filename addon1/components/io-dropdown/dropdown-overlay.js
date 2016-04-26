import Ember from 'ember';
import Dropdown from './dropdown';

/**
 * io-dropdown-overlay Component
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
	classNames: 'io-dropdown-overlay',
	click() {
		const parent = this.nearestOfType(Dropdown);
		if (parent) {
			parent.send('toggleHidden');
		}
	}
});