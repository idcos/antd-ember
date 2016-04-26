import Ember from 'ember';
import FormItemMixin from '../../mixin/form-item';

/**
 * io-input Component
 ```html
 ``` 
 */

export default Ember.Component.extend(FormItemMixin, {
	/**
	 * [tagName description]
	 */
	tagName: 'span',
	classNames: 'textarea-wrapper',
	role: 'form-item-textarea',
	value: '',
	rows: 4,
	cols: 3
});