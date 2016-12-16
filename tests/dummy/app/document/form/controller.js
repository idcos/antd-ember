import Ember from 'ember';

//const { get, set } = Ember;

let schema = {
    title: "用户信息",
    description: "填写用户呢",
    labelColClass: "col-8 ",
    inputColClass: "col-5 text-right",
    submit: {
        text: "保存",
        submitClass: "submit-button"
    },
    properties: {
        name: {
            // field type
            // [text|number|password|select|enum|check|textarea]
            type: "text",
            // field label
            label: "名称：",
            // field placeholder
            placeholder: "请输入用户名",
            // field label class
            labelColClass: "col-8 view-text-right",
            // field input class
            inputColClass: "col-5",
            // if required
            required: false,
            // help message
            help: "",
            // error message
            error: "请输入名称",
            //  regrex pattern
            pattern: "^.*$"
        },
        age: {
            type: "number",
            label: "年龄：",
            labelColClass: "col-8 view-text-right",
            inputColClass: "col-5",
            required: true
        },
        sex: {
            type: "enum",
            label: "选择性别：",
            labelColClass: "col-8 view-text-right",
            inputColClass: "col-5",
            enum: [["boy", "男"], ["girl", "女"]],
        },
        location: {
            type: "select",
            label: "选择所在省份：",
            labelColClass: "col-8 view-text-right",
            inputColClass: "col-5",
            options: [["a", "重庆"], ["b", "北京"], ["c", "广州"], ["d", "上海"]],
        },
        description: {
            type: "textarea",
            label: "自我介绍：",
            labelColClass: "col-8 view-text-right",
            inputColClass: "col-5",
        },
        checked: {
            type: "check",
            label: "记住我：",
            labelColClass: "col-8 view-text-right",
            inputColClass: "col-5",
            required: true,
            checkLabel: "请勾选"
        }
    }
};
export default Ember.Controller.extend({
    isShowingModal: false,
    model: {
        checkMeOut: false
    },
    schema: schema,
    formData: {
        sex: "",
        age: 18,
        location: "a",
        description: "this is my default description",
        name: ""
    },
    actions: {
        saveAction: function() {
            var model=this.get('model');
            console.log(model);
        },
        submitDynamicForm: function(data) {
            console.log('submit dynamic form', data);
        },
        fieldChange: function(field) {
            console.log('field change', field.name, field.value);
        }
    }
});
