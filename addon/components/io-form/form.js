import Ember from 'ember';
import DisabledClass from '../../mixin/disabled-class';

const {
  set
} = Ember;
/**
 * io-form
 
 # basic form
 ```
  {{#io-form}}
  {{/io-form}}
 ```
 # dynamic form
 ```
  {{io-form schema=schema formData=data}}
 ```
 */
export default Ember.Component.extend(DisabledClass, {
  tagName: 'form',
  classNames: ['io-form', 'io-form-horizontal'],
  classNamePrefix: 'io-form-',
  classNameBindings: ['readonlyClass'],
  /**
   * @attribute  schema
   */
  schema: null,
  subsave:true,
  schemaFields: function() {
    let schema = this.get('schema');
    if (!schema) {
      return;
    } 
    // 增加已排序
    const keys = this.get("ordered")? this.get("ordered"): Object.keys(schema.properties);
    return keys.map((key) => {
      let field = schema.properties[key];
      set(field, 'name', key);
      return field;
    });
  }.property('schema'),
  /**
   * @attribute formData
   */
  formData: {},
  _onInit: function() {
    let formData = this.get('formData');
    let schemaFields = this.get('schemaFields');
    if (schemaFields && schemaFields.length > 0) {
      schemaFields.forEach((field) => {
        const name = field.name;
        set(field, 'value', formData[name]);
        const path = `schema.properties.${name}.value`;
        console.log(path);
        this.addObserver(path, () => {
          const newValue = this.get(path);
          this.set(`formData.${name}`, newValue);
          this.send('fieldChange', field);
        });
      });
    }

  }.on('init'),
  didUpdateAttrs() {
    // 修复formData改变导致数据未更新的问题
    this._super(...arguments);
    this._onInit();
  },
  /**
   * @attribute disabled
   */
  readonly: null,
  readonlyClass: function() {
    if (this.get('readonly')) {
      return this.get('classNamePrefix') + 'readonly';
    } else {
      return '';
    }
  }.property('readonly'),
  /**
   * @attribute disable force validate
   * @type {String}
   */
  validate: "",
  validateChange: function() {
    var $form = this.$();
    $form.validator('validate');
    var validatorInstance = $form.data('bs.validator');
    if (validatorInstance.hasErrors) {
      var err = validatorInstance.hasErrors();
      if(!err){
        this.sendAction('submitForm');
      }
    }
  }.observes("validate"),
  
  /**
   * [submit event handler]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  submit(e) {
    if(this.get("subsave")){
      if (e && e.isDefaultPrevented && !e.isDefaultPrevented()) {
     	  e.preventDefault();
        try {
          let self=this;
          this.set("subsave",false);
          self.sendAction('submitForm', self.get('formData'));
          setTimeout(function() {
            this.set("subsave",true);
          }.bind(this), 2000);
        } catch (err) {
          console.log('warning: ', err);
        }
      }
    }
  },

  /**
   * [didInsertElement event handler]
   * @return {[type]} [description]
   */
  didInsertElement() {
    this.$().validator();

    if (this.get('disabled')) {
      // do things disabled
    }

  },

  /**
   * [willDestroy event handler]
   * @return {[type]} [description]
   */
  willDestroy() {
    const $form = this.$();
    if ($form) {
      $form.validator('destroy');
    } 
  },
  actions: {
    fieldChange(field) {
      if (this.get('fieldChange')) {
        this.sendAction('fieldChange', field);
      }
    }
  }
});
