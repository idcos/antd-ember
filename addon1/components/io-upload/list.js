import Ember from 'ember';

/**
 * upload item list Component
 ```html
 ``` 
 */

export default Ember.Component.extend({
	tagName: 'div',
	attributeBindings: ['role', 'tabIndex'],
	classNames: 'io-upload-list',
	tabIndex: 0,
	role: 'upload-file-list',
	/**
	 * @events data
	 */
	actions: {
		remove() {
			
		}
	}
});

