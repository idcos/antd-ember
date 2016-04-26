/**
 * icon 
 * @attr {String} name : icon type
 * @attr {String} size: icon size [s, m]
 */

import Ember from 'ember';
import ansi from './ansiup';

const {
  get,
  set
} = Ember;

export default Ember.Component.extend({
	tagName: 'div',
	classNames: ['io-ansi-up'],
	attributeBindings: ['text'],
	text: '',
	_onShowChange: Ember.observer('text', function() {
		var $root = this.$();
		var text = get(this, 'text')||'';
		text=text.replace(new RegExp("\n","g"),"<br/>");
		$root.html(ansi.ansi_to_html(text));
	}),
	didInsertElement: function() {
		var text = get(this, 'text');
		if (text) {
			this._onShowChange();
		}
	}
});