import Ember from 'ember';
//const {} = Ember;
export default Ember.Controller.extend({
    isShowingModal: false,
    actions: {
        toggleModal: function() {
            this.set('isShowingModal', !this.get('isShowingModal'));
        }
    }
});
