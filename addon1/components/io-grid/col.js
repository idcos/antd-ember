import Ember from 'ember';

/**
 * Col Component
 ```html
    {{#io-col}}{{/io-col}}
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'div',
	classNames: 'col',
	classNameBindings: ['spanClass', 'offsetClass', 'pushpullClass'],
	span: '1',
	spanClass: function() {
		return 'col-' + this.get('span');
	}.property('span'),
	offsetClass: function() {
		if (this.get('offset')) {
			return 'col-offset-' + this.get('offset');
		} else {
			return '';
		}
	}.property('offset'),
	pushpullClass: function() {
		var ret = '';
		if (this.get('push')) {
			ret += ' col-push-' + this.get('push');
		}

		if (this.get('pull')) {
			ret += ' col-pull-' + this.get('pull');
		}
		return ret;

	}.property('push', 'pull')
});