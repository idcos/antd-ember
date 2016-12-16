import Ember from 'ember';
const swal = window.swal;
export
default Ember.Controller.extend({
    checked: true,
    _checkedOnChange: Ember.observer('checked', function() {
        swal(this.get('checked') ? 'checked' : 'uncheck');
    }),
    actions: {
        onChange: function(checked) {
            console.log('change ', checked);
            this.set('checked', checked);
        }
    }
});
