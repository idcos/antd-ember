import Ember from 'ember';

export default Ember.Component.extend({
  form: null,
  type: '',
  validate:"",

  validateChange: function() {
    var $form = this.$('form');
    $form.validator('validate');
    var validatorInstance = $form.data('bs.validator');
    if (validatorInstance.hasErrors) {
      var err = validatorInstance.hasErrors();
      if(!err){
        this.sendAction('submitForm', this.get('form'), this.get('type'));
      }
    }
  }.observes("validate"),
  
  submit: function(e) {
    if (e && e.isDefaultPrevented && !e.isDefaultPrevented()) {
   	  e.preventDefault();
      try {
        this.sendAction('submitForm', this.get('form'), this.get('type'));
      } catch (err) {
        console.log('warning: ', err);
      }
    }
  },

  didInsertElement: function() {
    this.$('form').validator();
  },

  willDestroy: function() {
    var $form = this.$('form');
    if ($form) {
      $form.validator('destroy');
    }
  }
});