import Ember from 'ember';
import uid from './uid';
import request from './request';

const {
	get,
	set,
	RSVP
} = Ember;

/**
 * AjaxUpload Component
 ```html
 ``` 
 */

export default Ember.Component.extend({
	tagName: 'span',
	attributeBindings: ['tabIndex'],
	classNames: 'io-upload',
	tabIndex: 0,
	/**
	 * @attribute action
	 */
	action: null,
	/**
	 * @attribute data
	 */
	data: null,
	/**
	 * @attribute [headers description]
	 * @type {Object}
	 */
	headers: {},
	/**
	 * @attribute [name description]
	 * @type {String}
	 */
	name: 'file',
	multipart: false,
	withCredentials: false,
	/**
	 * @attribute drapdrop enabled
	 * @type {Boolean}
	 */
	dragdrop: false,

	/**
	 * @attribute  
	 */
	multiple: false,

	/**
	 * @state enter
	 */
	_dragEnter: false,


	/**
	 * @lifecycle didInsert
	 */
	didInsertElement() {
		this.$('input').on('change',  function(ev) {
			this.send('onChange', ev);
		}.bind(this));
	},

	/**
	 * @lifecycle destroy
	 */
	willDestroyElement() {
		this.$('input').off('change');
	},

	/**
	 * @events data
	 */
	click(event) {
		if (!$(event.target).hasClass('io-upload__input')) {
	        this.$('input').trigger('click');
	        this.$('input').val('');
	    }
	},

	/**
	 * [dragEnter description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	dragEnter(event) {
		event.preventDefault();
		if (!this.get('dragdrop')) {
			return;
		}

		if (!this.get('multiple')) {
	    }

		this.set('_dragEnter', true);	    

	},

	/**
	 * [dragOver description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	dragOver(event) {
		event.preventDefault();
	},

	/**
	 * [dragLeave description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	dragLeave(event) {
		if (!this.get('dragdrop')) {
			return;
		}
		this.set('_dragEnter', false);
	},

	/**
	 * [drop description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	drop(event) {
		if (!this.get('dragdrop')) {
			return;
		}
		const files = e.dataTransfer.files;
		this.set('_dragEnter', false);
		this.uploadFiles(files);
		event.preventDefault();
	},

	/**
	 * [keydown description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	keydown(event) {
		event.preventDefault();
		if (event.key === 'Enter') {
			this.$('input').trigger('click');
		}
	},

	/**
	 * [uploadFiles description]
	 * @return {[type]} [description]
	 */
	uploadFiles(files) {
		const parentComponent = this.get('parentComponent');
		const len = files.length;
		if (len > 0) {
			for (let i = 0; i < len; i++) {
				const file = files.item(i);
				file.uid = uid();
				this.uploadFile(file);
			}

			if (!this.get('onStart')) {
				return;
			}

			if (this.get('multiple')) {
				parentComponent
					? parentComponent.send(this.get('onStart'), Array.prototype.slice.call(files))
					: this.sendAction('onStart', Array.prototype.slice.call(files));

			} else {
				parentComponent
					? parentComponent.send(this.get('onStart'), Array.prototype.slice.call(files)[0])
					: this.sendAction('onStart', Array.prototype.slice.call(files)[0]);
			}
		}
	},

	/**
	 * [uploadFile description]
	 * actions: {
	 * 	beforeUploadAction(defer) {
	 * 	    // before okay
	 * 		defer.resolve()
	 * 		
	 * 		// before failed
	 * 		defer.reject()
	 * 	}
	 * }
	 * @return {[type]} [description]
	 */
	uploadFile(file) {
		const parentComponent = this.get('parent');
		if (!this.get('beforeUpload')) {
			return this.postFile(file);
		}

		const defer = RSVP.defer();
		defer.promise.then(() => {
			this.postFile(file);
		});

		parentComponent 
			? parentComponent.send(this.get('beforeUpload'), defer)
			: this.send('beforeUpload', defer);

	},

	/**
	 * [postFile description]
	 * @param  {[type]} file [description]
	 * @return {[type]}      [description]
	 */
	postFile(file) {
		const parentComponent = this.get('parent');
		let data = this.get('data');
		request({
			action: this.get('action'),
			filename: this.get('name'),
			file: file,
			data: data,
			headers: this.get('headers'),
			withCredentials: this.get('withCredentials'),
			onProgress: e => {
				if (this.get('onProgress')) {
					parentComponent 
						? parentComponent.send(this.get('onProgress'), e, file)
						: this.sendAction('onProgress', e, file);
				}
			},
			onSuccess: ret => {
				if (this.get('onSuccess')) {
					parentComponent
						? parentComponent.send(this.get('onSuccess'), ret, file)
						: this.sendAction('onSuccess', ret, file);
				}
			},
			onError: (err, ret) => {
				if (this.get('onError')) {
					parentComponent 
						? parentComponent.send(this.get('onError'), err, ret, file)
						: this.sendAction('onError', err, ret, file);
				}
			}
		});
	},

	/**
	 * [actions description]
	 * @type {Object}
	 */
	actions: {
		onChange(ev) {
			this.uploadFiles(ev.target.files);
			this.$('input').val('');
		}
	}
});

