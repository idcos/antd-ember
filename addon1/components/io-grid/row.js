import Ember from 'ember';

/**
 * Row Component
 ```html
    {{#io-row}}{{/io-row}}
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'div',
	classNames: 'row',
	classNameBindings: ['class']
});