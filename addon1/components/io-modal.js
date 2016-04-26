import Ember from 'ember';

export default Ember.Component.extend({
	modalNode: null,

	show: false,

	visibility: Ember.computed('show', function(){
		return this.get('show') ? 'show' : 'hide';
	}),

	_onShowChange: Ember.observer('show', function() {
		var $node = this.get('modalNode');
		if ($node) {
			$node.modal(this.get('visibility'));
		}
	}),

	didInsertElement: function() {
		var $node = this.$('.modal');
		this.set('modalNode', $node);
		$node.modal(this.get('visibility'));
	},

	willDestroyElement: function() {
		this.get('modalNode').modal('hide');
	}
});