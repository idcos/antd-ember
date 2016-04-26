import Ember from 'ember';
import Form  from '../components/io-form/form';
import translateSize from '../utils/translate-size';

export default Ember.Mixin.create({
	classNamePrefix: 'form-item-',
	classNames: ['form-item'],
	attributeBindings: ['role', '_disabled:disabled', 'type', '_value:data-value', 'required', 'checked', '_readonly:readonly'],
	classNameBindings: ['disabledClass', 'readonlyClass', 'sizeClass'],
	role: 'form-item',
	/**
	 * [placeholder description]
	 * @type {String}
	 */
	placeholder: '请输入',
	/**
	 * [size description]
	 * @type {String}
	 */
	size: 'default',
	_value: function() {
		const value = this.get('value');
		if (Ember.isArray(value)) {
			return value.join(',');
		} else {
			return value;
		}
	}.property('value', 'value.length'),
	/**
	 * [disabled description]
	 * @type {Boolean}
	 */
	disabled: null,
	_disabled: function() {
		if (this.get('disabled') || this.get('readonly')) {
			return 'disabled';
		} else {
			return null;
		}
	}.property('disabled', 'readonly'),
	/**
	 * [readonly description]
	 * @type {Boolean}
	 */
	readonly: null,
	_readonly: function() {
		if (this.get('readonly')) {
			return 'readonly';
		} else {
			return null;
		}
	}.property('readonly'),

	/**
	 * [_form description]
	 * @type {[type]}
	 */
	_form: null,
	dataError: Ember.computed.alias('data-error'),
	disabledClass: function() {
		if (this.get('disabled')) {
			return this.get('classNamePrefix') + 'disabled';
		} else {
			return '';
		}
	}.property('disabled'),
	readonlyClass: function() {
		if (this.get('readonly')) {
			return this.get('classNamePrefix') + 'readonly';
		} else {
			return '';
		}
	}.property('readonly'),
	sizeClass: function() {
		if (this.get('size')) {
			return this.get('classNamePrefix') + translateSize(this.get('size'))
		} else {
			return '';
		}
	}.property('size'),
	_init: function() {
		let parent = this.nearestOfType(Form);
		const changeReadonly = () => {
			Ember.run.later(()=> {
				const readonly = parent.get('readonly');
				if (readonly !== null) {
					this.set('readonly', readonly);
				}
			})
		}
		if (parent) {
			this.set('_form', parent);
			changeReadonly();
			parent.addObserver('readonly', changeReadonly)
		}
	}.on('init')
})