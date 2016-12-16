import Ember from 'ember';
const swal = window.swal;
export
default Ember.Controller.extend({
    isShowingModal: false,
    model: {
        checkMeOut: false
    },
    actions: {
        handleClick(btn) {
            swal(btn.get('param1'));
        }
    }
});
