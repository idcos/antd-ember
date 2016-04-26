import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['io-panel'],
	didInsertElement: function() {
		var $root = this.$();
		$root.delegate('.btn.fullscreen', 'click', function() {
			$root.toggleClass('io-panel-fullscreen');
		});
	},
	willDestroyElement: function() {
	}
});