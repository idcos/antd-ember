import Ember from 'ember';

/**
 * Button Component
 ```html
    {{io-icon type="search"}}
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'i',
	attributeBindings: ['disabled', 'onClick', 'role'],
	type: '',
	/**
	 * [fa is fontawesome icon]
	 * @type {Boolean}
	 */
	fa: false,
	classNameBindings: ['typeClass'],
	typeClass: function() {
		if (this.get('fa')) {
			return 'fa fa-' + this.get('type');
		}
		return  'ioicon ioicon-' + this.get('type');
	}.property('type'),
	click: function() {
		this.sendAction('onClick');
	}
});