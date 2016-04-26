import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['io-ace-editor'],
	didInsertElement: function() {
	    var _this = this;
		var $el = this.$('pre');

		// attributes
		var key = this.get('key'), 
			data = this.get('data'), 
			content = this.get('content') || this.get('data.' + key) || '', 
			editable = this.get('editable');

		// editor
		var editor = window.ace.edit($el[0]);
	    editor.setTheme('ace/theme/twilight');
	    editor.session.setMode("ace/mode/powershell");
	    editor.setReadOnly(!editable);
	    editor.insert(content);

	    /**
	     * [if editable]
	     * @param  {[type]} !editable [description]
	     * @return {[type]}           [description]
	     */
		if (editable) {
		    /**
		     * content change event
		     */
		    editor.getSession().on('change', function(e) {
		    	var currentValue = editor.getValue();
		    	_this.set('data.' + key, currentValue);
			});
			
		} else {
			/**
		     *  observer content
		     * @param  {[type]} ) {	               	var currentValue [description]
		     * @return {[type]}   [description]
		     */
		    this.addObserver("content", function() {
		     	var currentValue = this.get("content");
		     	if (currentValue) {
		     		editor.insert(currentValue);
		     	}
		    });
			/**
		     * observe data.key
		     * @type {[type]}
		     */
		    this.addObserver("data." + key, function() {
		     	var currentValue = _this.get("data." + key);
		     	if (currentValue) {
		     		editor.insert(currentValue);
			     	// _this.set('content', currentValue);
		     	}
		    });
		}

	},
	willDestroyElement: function() {
	}
});