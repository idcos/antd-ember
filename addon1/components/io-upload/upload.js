import Ember from 'ember';
import uid from './uid';

/**
 * AjaxUpload Component
 ```html
 ``` 
 */

function noop() {}
function T(){
	return true;
}

// Fix IE file.status problem
// via coping a new Object
function fileToObject(file) {
  return {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    response: file.response,
    error: file.error,
    percent: 0,
    originFileObj: file,
  };
}

/**
 * generate Progress percent: 0.1 -> 0.98
 *   - for ie
 */
function genPercentAdd() {
  let k = 0.1;
  const i = 0.01;
  const end = 0.98;
  return function (s) {
    let start = s;
    if (start >= end) {
      return start;
    }

    start += k;
    k = k - i;
    if (k < 0.001) {
      k = 0.001;
    }
    return start * 100;
  };
}

function getFileItem(file, fileList) {
  let matchWay = (!file.uid) ? 'byName' : 'byUid';
  fileList = fileList || [];
  let target = fileList.filter((item) => {
    if (matchWay === 'byName') {
      return item.name === file.name;
    }
    return item.uid === file.uid;
  })[0];
  return target;
}

export default Ember.Component.extend({
	tagName: 'span',
	attributeBindings: ['role', 'tabIndex'],
	classNames: 'io-upload',
	classNamePrefix: 'io-upload-',
	classNameBindings: ['typeClass'],
	tabIndex: 0,
	role: 'upload-button',
	//------------------------------
	//        ATTRIBUTES
	//------------------------------
	/**
	 * @attribute showUploadList
	 * @type {Object}
	 */
	showUploadList: false,
	/**
	 * @attribute listType 
	 * @type {String} [file|card]
	 */
	listType: 'file',
	/**
	 * @attribute 
	 * @type {String} [drag|select]
	 * @type {Object}
	 */
	type: 'select',
	/**
	 * @attribute multipart
	 * @type {Boolean}
	 */
	multipart: false,
	/**
	 * @attribute
	 * @type {Boolean}
	 */
	withCredentials: false,
	/**
	 * @attribute  name
	 * @type {String}
	 */
	name: 'file',
	/**
	 * @attribute  actions
	 */
	action: '',
	/**
	 * @attribute headers
	 * @type {Object}
	 */
	headers: {},
	//------------------------------
	//        STATES
	//------------------------------
	/*
	 * @state _dragdrop
	 */
	_dragdrop: function(){
		return this.get('type') === 'drag';
	}.property('type'),
	/**
	 * @state _dragState
	 *
	 * current drag drop state 
	 * 
	 * @type {String}
	 */
	_dragState: 'drop',
	/**
	 * @state _fileList
	 */
	_file: null,
	_fileList: [],
	_recentUploadStatus: false,
	/**
	 * @state typeClass
	 */
	typeClass: function() {
		return this.get('classNamePrefix') + this.get('type');
	}.property('type'),

	//------------------------------
	//        FUNCTIONS
	//------------------------------
	/**
	 * [autoUpdateProgress description]
	 * @param  {[type]} precent [description]
	 * @param  {[type]} file    [description]
	 * @return {[type]}         [description]
	 */
	autoUpdateProgress(precent, file) {
		const getPercent = genPercentAdd();
	    let curPercent = 0;
	    let progressTimer = window.setInterval(() => {
	      curPercent = getPercent(curPercent);
	      this.onProgress({
	        percent: curPercent
	      }, file);
	    }, 200);
	    this.set('_progressTimer', progressTimer);
	},
	clearProgressTimer() {
		window.clearInterval(this.get('_progressTimer'));
	},
	/**
	 * [handleRemove description]
	 * @param  {[type]} file [description]
	 * @return {[type]}      [description]
	 */
	handleRemove(file) {
		let fileList = this.get('_fileList');
		let targetItem = getFileItem(file, fileList);
		fileList.removeObject(targetItem);
		this.send('onChange', {
			file: targetItem,
			fileList: fileList
		});
	},
	actions: {
		/**
		 * [onStart description]
		 * @param  {[type]} file [description]
		 * @return {[type]}      [description]
		 */
		onStart(file){

			if (!this.get('_recentUploadStatus')) {
				return;
			}

			let targetItem;
			let nextFileList = this.get('_fileList').concat();

			if (file.length > 0) {
				targetItems = file.map(f => {
					const fileObject = fileToObject(f);
					fileObject.status = 'uploading';
					fileObject.percent = 0;
					return fileObject;
				});
				nextFileList = nextFileList.concat(targetItems);
			} else {
				targetItem = fileToObject(file);
				targetItem.status = 'uploading';
				targetItem.percent = 0;
				nextFileList.push(targetItem);
			}

			this.send('onChange', {
				file: targetItem,
				fileList: nextFileList
			});
			
			if (!window.FormData) {
				this.autoUpdateProgress(0, targetItem);
			}

		},	
		/**
		 * [beforeUpload ]
		 * 
		 * beforeUpload will send an 'beforeUpload' action
		 * if get false, then upload wont start 
		 * 
		 * @param  {[type]} defer [description]
		 * @return {[type]}       [description]
		 */
		beforeUpload(defer) {
			if (!this.get('beforeUpload')) {
				defer.resolve();
				this.set('_recentUploadStatus', true);
				return true;
			} else {
				const _defer = Ember.RSVP.defer();
				_defer.promise.then((ret) => {
					this.set('_recentUploadStatus', ret);
					defer.resolve();
				});
				this.sendAction('beforeUpload', defer, file);
				return false
			}
		},
		/**
		 * [onProgress description]
		 * @param  {[type]} event [description]
		 * @param  {[type]} file  [description]
		 * @return {[type]}       [description]
		 */
		onProgress(event, file) {
			let fileList = this.get('_fileList');
			let targetItem = getFileItem(file, fileList);
			if (!targetItem) {return;}
			targetItem.percent = event.precent;
			this.send('onChange', {
				event: event,
				file: file,
				fileList: fileList
			});
		},
		/**
		 * [onSuccess description]
		 * @param  {[type]} ret  [description]
		 * @param  {[type]} file [description]
		 * @return {[type]}      [description]
		 */
		onSuccess(ret, file) {
			this.clearProgressTimer();

			try {
				if (typeof response === 'string') {
					JSON.parse(response);
				}
			} catch (e) {
				this.send('onError', new Error('No response'), response, file);
				return;
			}

			let fileList = this.get('_fileList');
			let targetItem = getFileItem(file, fileList);
			if (targetItem) {
				targetItem.status = 'done';
				targetItem.response = ret;
				this.send('onChange', {
					file: targetItem,
					fileList: fileList
				});
			}
		},
		/**
		 * [onError description]
		 * @param  {[type]} ret  [description]
		 * @param  {[type]} file [description]
		 * @return {[type]}      [description]
		 */
		onError(error, response, file) {
			this.clearProgressTimer();
			let fileList = this.get('_fileList');
			let targetItem = getFileItem(file, fileList);
			targetItem.error = error;
			targetItem.response = response;
			targetItem.status = 'error';
			this.handleRemove(targetItem);
		},
		/**
		 * [onChange description]
		 * @param  {[type]} ev [description]
		 * @return {[type]}    [description]
		 */
		onChange(ev) {
			this.set('_file', ev.file);
			this.set('_fileList', ev.fileList);
			if (this.get('onChange')) {
				this.sendAction('onChange', ev)
			}
		},
		/**
		 * [onRemove description]
		 *
		 * manual remove action
		 * 
		 * @param  {[type]} file [description]
		 * @return {[type]}      [description]
		 */
		onRemove(file) {
			file.status = 'remvoed';
			this.handleRemove(file);
		}
	}
});