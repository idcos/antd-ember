import Ember from 'ember';
import FormItemMixin from '../../../mixin/form-item';
import OutsideClick from '../../../mixin/outside-click';
import ComponentParent from '../../../mixin/component-parent';
import TreeModel from '../../../utils/tree-model';
import KeyBindingMixin from '../../../mixin/hotkey-bindings';

/**
 * Select Component
 */

export default Ember.Component.extend(FormItemMixin, ComponentParent, OutsideClick, KeyBindingMixin, {
	/**
	 * [tagName description]
	 */
	tagName: 'span',
	classNames: 'io-select input-custom',
	classNamePrefix: 'io-select-',
	classNameBindings: ['enabledClass', 'openClass'],
	attributeBindings: ['tabindex', 'role'],
	tabindex: 0,
	role: 'form-item-select',
	/**
	 * @attribute value 
	 * @type {String | Array}
	 */
	value: null,
	/**
	 * @attribute width 
	 * @type {Number}
	 */
	width: 120,
	/**
	 * @attribute disabled 
	 */
	disabled: false,
	/**
	 * @attribute showSearch
	 * @type {[Boolean]}
	 * @description [show search input in dropdown menu if true]
	 */
	showSearch: false,
	/**
	 * @attribute multiple
	 * @description  [multiple select]
	 */
	multiple: false,
	/** 
	 * @attribute [placeholder]
	 */
	placeholder: '请选择',
	/**
	 * @attribute [options]
	 */
	options: Ember.A(),
	/**
	 * @state _hidden
	 * @type {Boolean}
	 * @description [hidden dropdown menu]
	 */
	_hidden: true,
	/**
	 * @state _activeValue
	 * @type {[type]}
	 */
	_activeValue: null,
	/**
	 * @stae multipleClass
	 * @description [multiple select class]
	 */
	multipleClass: function() {
		var type = this.get('multiple') ? 'multiple' : 'single';
		return this.get('classNamePrefix') + 'selection--' + type;
	}.property('multiple'),
	/**
	 * @state hiddenClass
	 */
	hiddenClass: function() {
		if (this.get('_hidden')) {
			return this.get('classNamePrefix') + 'dropdown-hidden';
		} else {
			return '';
		}
	}.property('_hidden'),
	openClass: function() {
		if (!this.get('_hidden')) {
			return this.get('classNamePrefix') + 'open';
		} else {
			return '';
		}
	}.property('_hidden'),
	/**
	 * @state enabledClass
	 */
	enabledClass: function() {
		if (!this.get('disabled')) {
			return this.get('classNamePrefix') + 'enabled';
		} else {
			return '';
		}
	}.property('disabled'),
	/**
	 * @observe selectedChildren
	 */
	_selectOptions: function() {
		this.send('selectOptions');
	}.observes('value', 'value.length'),
	_childrenChange: function() {
		this.send('selectOptions');
	}.observes('children', 'children.length'),
	didInsertElement: function() {
		var _this = this;
		Ember.run.later(function() {
			_this.send('selectOptions');
		}, 10);
	},
	/**
	 * [actions description]
	 * @type {Object}
	 */
	actions: {
		toggleHidden: function() {
			if (this.get('readonly')) {
				return;
			}
			this.set('_hidden', !this.get('_hidden'));
		},
		selectOptions: function() {
			const children = this.get('children');
			const multiple = this.get('multiple');
			let selectedOptions = [];

			children.forEach((child) => {
				if (this.isSelectedOption(child)) {
					child.set('selected', true);
					selectedOptions.push({
						value: child.get('value'),
						label: child.$().text()
					});
				} else  {
					child.set('selected', false);
				}
			});

			if (!multiple) {
				this.set('_selectedOptions', selectedOptions[0])
			} else {
				this.set('_selectedOptions', selectedOptions);
			}

		},
		onSelect: function(option) {
			if (this.get('multiple')) {
				if (this.isSelectedOption(option)) {
					this.set('value', this.get('value').removeObject(option.get('value')));
				} else {
					this.set('value', this.get('value').addObject(option.get('value')));
				}
			} else {
				this.set('_hidden', true);
				this.set('value', option.get('value'));
			}
			this.send('onChange');
		},
		removeOption: function(value) {
			this.set('value', this.get('value').removeObject(value));
			this.send('onChange');
		},
		outsideClick: function() {
			this.set('_hidden', true);
		},
		onChange: function() {
			Ember.run.later(function() {
				var $el = this.$();
				var $menu = this.$('.io-select-dropdown');
				$menu.css('top', ($el.height() + 5) + 'px' );
			}.bind(this), 100);

			if (this.get('onChange')) {
				this.sendAction('onChange', this.get('value'));
			}

			setTimeout(() => {
				this.$().trigger('input.bs.validator');
			}, 500);
		},
		'keyup-down': function() {
			const children = this.get('children');

			if (children.length === 0) {
				return;
			}

			if (this.get('_hidden')) {
				this.set('_hidden', false);
				children[0].set('active', true);
			} else {
				let selectedIndex = -1;
				children.forEach((child, index) => {
					if (child.get('active')) {
						selectedIndex = index;
					}
					child.set('active', false);
				});
				selectedIndex += 1;
				if (selectedIndex >= children.length) {
					selectedIndex = 0;
				}
				children[selectedIndex].set('active', true);
			}
		},
		'keyup-up': function() {
			const children = this.get('children');

			if (children.length === 0) {
				return;
			}

			if (!this.get('_hidden')) {
				let selectedIndex = 0;
				children.forEach((child, index) => {
					if (child.get('active')) {
						selectedIndex = index;
					}
					child.set('active', false);
				});
				selectedIndex -= 1;
				if (selectedIndex < 0) {
					selectedIndex = children.length - 1;
				}
				children[selectedIndex].set('active', true);
			}
		},
		'keyup-return': function() {
			const children = this.get('children');

			if (children.length === 0) {
				return;
			}

			if (this.get('_hidden')) {
				this.set('_hidden', false);
			} else {
				children.forEach((child) => {
					if (child.get('active')) {
						this.send('onSelect', child);
					}
				})
			}
		}
	},
	/**
	 * [isSelectedOption description]
	 * @param  {[type]}  child [description]
	 * @return {Boolean}       [description]
	 */
	isSelectedOption: function (child) {
		var multiple = this.get('multiple');
		var childValue = child.get('value');
		var value = this.get('value');
		if (multiple) {
			return value.contains(childValue);
		} else {
			return  childValue === value;
		}
	}
});