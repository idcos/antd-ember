import Ember from 'ember';

/**
 * Button Component
 ```html
    {{#io-button 
  		type="primary" 
  		disabled="true" 
  		size="" 
  		onClick="onClick"
  		action="onClick"}} Button 
  	{{/io-button}}
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'button',
	attributeBindings: ['disabled', 'onClick', 'role', 'htmlType:type'],
	/**
	 * [attibutes]
	 * @type {String}
	 */
	type: 'default',
	shape: 'default',
	role: 'button',
	loading: false,
	/**
	 * [classNameBindings description]
	 * @type {Array}
	 */
	classNames: 'io-btn',
	classNamePrefix: 'io-btn-',
	classNameBindings: ['typeClass', 'shapeClass', 'sizeClass', 'loadingClass'],
	typeClass: function() {
		return this.get('classNamePrefix') + this.get('type');
	}.property('type'),
	shapeClass: function() {
		if (this.get('shape') !== '') {
			return this.get('classNamePrefix') + this.get('shape');
		} else {
			return '';
		}
	}.property('shape'),
	sizeClass: function() {
		if (this.get('size') !== '') {
			return this.get('classNamePrefix') + map(this.get('size'));
		} else {
			return '';
		}
		function map(size) {
			switch (size) {
				case 'large':
					return 'lg';
				case 'small':
					return 'sm';
				default:
					return '';
			}
		}
	}.property('size'),
	loadingClass: function() {
		if (this.get('loading')) {
			return this.get('classNamePrefix') + 'loading';
		} else {
			return '';
		}
	}.property('loading'),
	htmlType: function() {
		if (this.get('submit')) {
			return 'submit';
		} else {
			return null;
		}
	}.property('submit'),
	/**
	 * [onClick default action]
	 * @return {[type]} [description]
	 */
	click: function() {
		if (this.get('onClick')) {
			this.sendAction('onClick', this);
		} else {
			this.sendAction(this);
		}
	}
});