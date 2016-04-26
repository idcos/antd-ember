import Ember from 'ember';

/**
 * MenuTitle Component
 ```html
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'div',
	attributeBindings: ['role'],
	classNames: 'io-menu-submenu-title',
	role: 'menu-title',
	/**
	 * [didInsertElement menu-title click event]
	 * @return {[type]} [description]
	 */
	click: function() {
		var parentView = this.get('parentView');
		parentView.set('isOpen', !parentView.get('isOpen'));
	}
});