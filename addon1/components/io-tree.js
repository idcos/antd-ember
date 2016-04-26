import Ember from 'ember';
var set = Ember.set,
    get = Ember.get,
    isArray = Ember.isArray;
export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['io-tree'],
    classNameBindings: ['class'],
    selectedNode: null,
    query: '',
    selectedId: '',
    hasCheckbox: false,
    hasQuery: false,
    allFolded: false,
    nodes: [],
    didInsertElement: function() {
    },
    willDestroyElement: function() {},
    queryChanged: function() {
        var query = this.get('query');
        this.get('nodes').forEach(function(node) {
            searchInTree(node, query, false);
        });

        function searchInTree(node, query, parentShow) {
            var search = node.text.includes(query),
                children = get(node, 'children') || [];
            var show = search;
            children.forEach(function(child) {
                var childShow = searchInTree(child, query, search);
                show = show || childShow;
            });
            set(node, 'show', show || parentShow);
            return show;
        }
    }.observes('query'),
    actions: {
        treeOnSelected: function(node, parent) {
            this.send('selectNode', node);
            this.sendAction('doOnSelected', node, parent);
        },
        selectNode: function(node) {
            this.set('selectedNode', node);
            this.set('selectedId', node.id);
        },
        treeOnChecked: function(node, parent) {
            this.sendAction('itemCheckAction', node, parent);
        },
        clickItem: function(node) {
            this.send('selectNode', node);
            this.sendAction('itemClickAction', node);
        }
    }
});