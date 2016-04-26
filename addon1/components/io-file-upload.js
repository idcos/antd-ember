import Ember from 'ember';

export default Ember.Component.extend({
	multiple: true,
	showUploadButton: true,
	autoUpload: false,

	actions: {
		upload: function() {
			var files = this.$('.file-uploader')[0].files;
			return this.sendAction('upload', files);
		}
	}
});