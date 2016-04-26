import Ember from 'ember';

/**
 * Radio Component
 ```html
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'div',
	classNames: 'form-group row',
	/**
	 * @attribute  label
	 */
	label: '',
	/**
	 * @attribute  labelColClass
	 */
	labelColClass: 'col-md-8',
	/**
	 * @attribute inputColClass
	 * @type {String}
	 */
	inputColClass: 'col-md-5',
	/**
	 * @attribute  
	 */
	required: false
});