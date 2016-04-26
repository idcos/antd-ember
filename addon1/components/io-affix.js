import Ember from 'ember';

/**
 * Alert Component
 ```html
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'div',
	attributeBindings: ['disabled', 'role'],
	classNames: 'io-affix',
	classNamePrefix: 'io-affix-',
	classNameBindings: ['offset:setOffset','offsetClass'],
	/**
	 * @attribute triggerEvent
	 * @type {String [mosueover | click]}
	 */
	setOffset:false,
	_hidden:false,
	/**
	 * classNameBindings
	 * @return {[type]} [description]
	 */
	offsetClass: function() {
			return this.get('classNamePrefix') + this.get('setOffset');
	}.property('setOffset'),
	
	activeClass: function() {
		if (!this.get('_hidden')) {
			return this.get('classNamePrefix') + 'active';
		} else {
			return '';
		}
	}.property('_hidden'),
});