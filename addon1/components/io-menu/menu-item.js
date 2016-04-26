import Ember from 'ember';
import selectedClass from '../../mixin/selected-class';
import disabledClass from '../../mixin/disabled-class';

/**
 * Menu Component
 ```html
 ``` 
 */

export default Ember.Component.extend(selectedClass, disabledClass, {
	/**
	 * [tagName description]
	 */
	tagName: 'li',
	attributeBindings: ['role'],
	submenu: false,
	classNames: 'io-menu-item',
	classNamePrefix: function() {
		if (this.get('submenu')) {
			return 'io-menu-submenu-';
		}
		return 'io-menu-item-';
	}.property('submenu'),
	classNameBindings: ['submenuClass', 'mouseOverClass', 'openClass', 'selectedValueClass'],
	role: function() {
		if (this.get('submenu')) {
			return 'submenu';
		} else {
			return 'menuitem';
		}
	}.property('submenu'),
	submenuClass: function() {
		var ret = '';
		if (this.get('submenu')) {
			ret += ' io-menu-submenu';
			if (this.get('selected')) {
				ret += ' io-menu-submenu-selected';
			}
		}
		return ret;
	}.property('submenu'),
	selectedValueClass: function() {
		var selectedValue = this.get('selectedValue');
		var value = this.get('value');
		if (value && value === selectedValue) {
			return this.get('classNamePrefix') + 'selected';
		}
		return '';
 	}.property('selectedValue', 'value'),
	activeClass: function() {
		return this.get('classNamePrefix') + 'active';
	}.property('classNamePrefix'),
	mouseOver: false,
	// root menu is an inline menu
	isOpen: false,
	_setIsInlineSubmenu: function() {
		var $el = this.$();
		var $root = $el.parent('.io-menu-inline');
		if ($root.hasClass('io-menu-inline')) {
			this.set('isInlineSubmenu', true);
		} else {
			this.set('isInlineSubmenu', false);
		}
	}.on('didInsertElement'),
	mouseOverClass: function() {
		var ret = '';
		var isInlineSubmenu = this.get('isInlineSubmenu');
		if (this.get('mouseOver')) {
			ret += this.get('activeClass');
			if (this.get('submenu') && !isInlineSubmenu) {
				ret += ' ' + this.get('classNamePrefix') + 'open';
			}
		} 

		return ret;
	}.property('mouseOver'),
	openClass: function() {
		var ret = '';
		var isInlineSubmenu = this.get('isInlineSubmenu');
		if (isInlineSubmenu && this.get('isOpen')) {
			ret = this.get('classNamePrefix') + 'open';
		} 
		return ret;
	}.property('isOpen'),
	/**
	 * [mouseover event description]
	 * @type {[type]}
	 */
	t: null,
	mouseEnter: function() {
		clearTimeout(this.get('t'));
		this.set('mouseOver', true);
	},
	mouseLeave: function() {
		var t = setTimeout(function() {
			this.set('mouseOver', false);
		}.bind(this), 100);
		this.set('t', t);
	},
	click() {
		if (this.get('onClick')) {
			this.sendAction('onClick', this);
		}
	}
});
