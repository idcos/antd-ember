/**
 * extend textfield
 */
import Ember from 'ember';

export default {
    name: 'extend TextField component',
    initialize: function() {
        Ember.TextField.reopen({
          attributeBindings: [ 'data-error' , 'maxlength', 'data-minlength', 'minlength', 'data-maxlength', 'pattern', 'max', 'min']
        });
    }
};