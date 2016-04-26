import Ember from 'ember';
import uid from './uid';


/**
 * IframeUpload Component
 ```html
 ``` 
 */

export default Ember.Component.extend({
	tagName: 'span',
	attributeBindings: ['role', 'tabIndex'],
	classNames: 'io-upload',
	tabIndex: 0,
	role: 'button',
	/**
	 * @events data
	 */
	actions: {
		click: function() {

		},
		keydown: function() {

		},
		drop: function() {

		},
		dragOver: function() {

		},
		onChange: function() {

		}
	}
});

