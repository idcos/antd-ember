import Ember from 'ember';

/**
 * MenuItemGroup Component
 ```html
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'li',
	attributeBindings: ['role'],
	classNames: 'io-menu-item-group',
	title: ''
});