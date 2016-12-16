import Ember from 'ember';
export
default Ember.Controller.extend({
    list:[{
        title: 'TED123',
        label: 'TED123',
        value: 1
    }, {
        title: 'TED234',
        label: 'TED234',
        value: 2
    }, {
        title: 'TED12323423',
        label: 'TED12323423',
        value: 3
    }],
    initialSelection: Ember.computed('list', function() {
        var list = this.get('list');
        return list[1];
    }),
    isLoading: false,
    actions: {
        update: function(selection) {
            console.log(selection);
        },
        //search: function(searchText) {
        search: function() {
            this.set('isLoading', true);
            this.set('list', []);
            setTimeout(function(){
                this.set('list', [{
                    title: 'TEDhahah',
                    label: 'TED123',
                    value: 1
                }, {
                    title: 'TEDhoho',
                    label: 'TED234',
                    value: 2
                }, {
                    title: 'TEDxixi',
                    label: 'TED12323423',
                    value: 3
                }]);  
                this.set('isLoading', false);
            }.bind(this), 500);
        }
    }
});
