import Ember from 'ember';
import OutsideClick from '../../mixin/outside-click';


/**
 * io-dropdown Component
 ```html
 	{{#io-dropdown}}
 		{{#io-dropdown-trigger}}
			
 		{{/io-dropdown-trigger}}
 		{{#io-dropdown-overlay}}
			
 		{{/io-dropdown-overlay}}
 	{{/io-dropdown}}
 ``` 
 */

export default Ember.Component.extend(OutsideClick, {
	/**
	 * [tagName description]
	 */
	tagName: 'span',
	attributeBindings: ['disabled', 'role'],
	classNames: 'io-dropdown',
	classNamePrefix: 'io-dropdown-',
	classNameBindings: ['activeClass'],
	/**
	 * @attribute triggerEvent
	 * @type {String [mosueover | click]}
	 */
	triggerEvent: 'mouseover',
	_hidden: true,
	activeClass: function() {
		if (!this.get('_hidden')) {
			return this.get('classNamePrefix') + 'active'
		} else {
			return '';
		}
	}.property('_hidden'),
	/**
	 * mosueover event description
	 * @type {[type]}
	 */
	t: null,
	_mouseover: false,
	mouseEnter() {
		if (this.get('triggerEvent') !== 'mouseover') {
			return
		}
		clearTimeout(this.get('t'));
		this.set('_mouseover', true);
		this.set('_hidden', false);
	},
	mouseLeave() {
		if (this.get('triggerEvent') !== 'mouseover') {
			return
		}
		const t = setTimeout(function() {
			this.set('_mouseover', false);
			this.set('_hidden', true);
		}.bind(this), 200);
		this.set('t', t);
	},
	actions: {
		clickTrigger() {
			if (this.get('triggerEvent') === 'click') {
				this.send('toggleHidden');
			}
		},
		toggleHidden() {
			this.set('_hidden', !this.get('_hidden'));
		},
		outsideClick() {
			if (this.get('triggerEvent') === 'click') {
				this.set('_hidden', true);
			}
		}
	}
});