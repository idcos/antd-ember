import Ember from 'ember';

/**
 * ButtonGroup Component
 ```html
    {{#io-button-group}}
    	{{#io-button}} button 1 {{/io-button}}
    	{{#io-button}} button 2 {{/io-button}}
  	{{/io-button-group}}
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'div',
	attributeBindings: ['disabled', 'onClick', 'role'],
	classNames: 'io-btn-group'
});