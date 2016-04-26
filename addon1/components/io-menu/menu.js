import Ember from 'ember';

/**
 * Menu Component
 ```html
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'ul',
	attributeBindings: ['role', 'style'],
	classNames: 'io-menu',
	classNamePrefix: 'io-menu-',
	classNameBindings: ['modeClass', 'themeClass', 'typeClass'],
	role: 'menu',
	modeClass: function() {
		var mode = this.get('mode');
		if (this.get('sub')) {
			mode = mode || 'vertical';
		} else {
			mode = mode || 'horizontal';
		}
		return this.get('classNamePrefix') + mode;
	}.property('mode'),
	themeClass: function() {
		var theme = this.get('theme') || 'light';
		return this.get('classNamePrefix') + theme;
	}.property('theme'),
	typeClass: function() {
		var type = this.get('sub') ? 'sub' : 'root';
		return this.get('classNamePrefix') + type;
	}.property('sub')
});