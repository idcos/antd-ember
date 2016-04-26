import Ember from 'ember';
import FormItemMixin from '../../mixin/form-item';
import translateSize from '../../utils/translate-size';


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
	classNames: 'io-input-wrapper',
	classNamePrefix: 'io-input-',
	role: 'form-item-input',
	/**
	 * @attribute  value
	 */
	value: '',
	/**
	 * @attribute type
	 */
	type: 'text',
	_placeholder: function() {
		if (this.get('readonly')) {
			return '';
		} else {
			return this.get('placeholder');
		}
	}.property('placeholder', 'readonly'),
	inputClass: function() {
		let ret = 'io-input '
		if (this.get('size')) {
			ret += this.get('classNamePrefix') + translateSize(this.get('size'));
		}
		return ret;
	}.property('size'),
});