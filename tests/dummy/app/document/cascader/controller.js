import Ember from 'ember';
const swal = window.swal;
const options = [{
    value: 'zhejiang',
    id: 'zhejiang',
    label: '浙江',
    children: [{
        value: 'hangzhou',
        id: 'hangzhou',
        label: '杭州',
        children: [{
            value: 'xihu',
            id: 'xihu',
            label: '西湖',
        }],
    }],
}, {
    value: 'jiangsu',
    id: 'jiangsu',
    label: '江苏',
    children: [{
        value: 'nanjing',
        id: 'nanjing',
        label: '南京',
        disabled: true,
        children: [{
            value: 'zhonghuamen',
            id: 'zhonghuamen',
            label: '中华门',
        }],
    }],
}];

export default Ember.Controller.extend({
    options: options,
    actions: {
        onClick: function() {
            swal('click button');
        },
        onChange: function(values) {
            console.log(values);
        }
    }
});
