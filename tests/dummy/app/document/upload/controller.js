import Ember from 'ember';
import request from 'ember-cli-idcos/components/io-upload/ajax-file-upload';
export default Ember.Controller.extend({
    name: 'file',
    action: '/upload.do',
    form: {
        name: '',
        password: ''
    },
    file: '',
    _fileChange: function() {
        const file = Ember.$('#fileUpload input')[0];
        console.log(file.files);
    }.observes('file'),
    actions: {
        submitForm: function() {
            const $file = Ember.$('#fileUpload input')[0];
            const data = this.get('form');
            request({
                action: '/api/uploadfile',
                filename: 'filename',
                data: data,
                fileElement: $file,
                onSuccess: function(res){
                    console.log('success'+res.message);
                },
                onError: function(res){
                    console.log('error'+res.message);
                }
            });
        },
        onChange(ev) {
            if (ev.file.status !== 'uploading') {
                console.log(`Ember.${ev.file.name} 正在上传.... Ember.${ev.file.percent}`);
            }

            if (ev.file.status === 'done') {
                console.log(`Ember.${ev.file.name} 上传成功。`);
            }

            if (ev.file.status === 'error') {
                console.log(ev.file.response);
                console.log(`Ember.${ev.file.name} 上传失败。`);
            }
        },

    }
});
