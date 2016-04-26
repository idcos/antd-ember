import Em from 'ember';
import WithConfigMixin from '../../mixin/with-config';
var TreeNode, getProperty;
var getProperty = function(obj, prop) {
    if (!obj) {
        return;
    }
    if (Em.typeOf(obj) === 'instance' || Em.canInvoke(obj, 'get')) {
        return obj.get(prop);
    } else {
        return obj[prop];
    }
};
/**
 * A node of a tree.
 *
 * @class TreeNode
 */
export default Em.Component.extend(WithConfigMixin, {
    attributeBindings: ['multi-selected'],
    /**
     * The model the tree node view is bound to
     */
    model: undefined,
    /**
     * A reference to the tree view, this property is auto set during component instantiation
     */
    tree: undefined,
    /**
     * A reference to the root model
     */
    rootModel: Em.computed.alias('tree.model'),
    /**
     * True if the node is currently expanded, meaning its children are visible.
     */
    expanded: Em.computed.alias('model.expanded'),
    /**
     * True if this node view is currently checked
     * This is only relevant if the tree configured to support multi selection
     */
    'multi-selected': Em.computed.alias('model.selected'),
    /**
     * True if should render an icon tag for this node view
     */
    hasIcon: true,
    /**
     * True if this node can be single selected
     */
    selectable: true,
    /**
     * True if this node is currently single selected
     */
    isSelected: (function() {
        return this.get('tree.selected.id') === this.get('model.id');
    }).property('tree.selected'),
    /**
     * True if this node is currently loading,
     * Usually that means the node is defined asynchronously and its children are currently being loaded
     */
    loading: false,
    branch: Em.computed.alias('parentView'),
    /**
     * true if the loading mode of the node's children should be async
     */
    async: Em.computed.alias('parentView.async'),
    /**
     * true if this is a leaf node, meaning it has no children
     */
    leaf: (function() {
        return !this.get('model.children') || this.get('model.children.length') === 0;
    }).property('model.children.length'),
    tagName: 'li',
    classNameBindings: ['styleClasses', 'expandedClasses', 'leafClasses'],
    styleClasses: (function() {
        var _ref;
        return (_ref = this.get('config.tree.nodeClasses')) != null ? _ref.join(" ") : void 0;
    }).property(),
    expandedClasses: (function() {
        var _ref, _ref1;
        if (this.get('expanded')) {
            return (_ref = this.get('config.tree.nodeOpenClasses')) != null ? _ref.join(" ") : void 0;
        } else {
            return (_ref1 = this.get('config.tree.nodeCloseClasses')) != null ? _ref1.join(" ") : void 0;
        }
    }).property('expanded', 'leaf', 'loading'),
    nodeSelectedClasses: (function() {
        var _ref;
        if (this.get('isSelected')) {
            return (_ref = this.get('config.tree.nodeSelectedClasses')) != null ? _ref.join(" ") : void 0;
        } else {
            return null;
        }
    }).property('isSelected'),
    /*
     * Observes the 'multi-selected' and put the tree in multi selection mode if true
     */
    addMultiSelectionToTreeSelection: (function() {
        if (this.get('multi-selected')) {
            return this.get('tree.multi-selection').pushObject(this.get('model'));
        } else {
            var multiSelection = this.get('tree.multi-selection');
            multiSelection && multiSelection.removeObject(this.get('model'));
        }
    }).observes('multi-selected').on('init'),
    iconClass: (function() {
        var icons;
        icons = [];
        if (this.get('async')) {
            if (this.get('loading')) {
                icons = icons.concat(this.iconFromModelOrDefault('nodeLoadingIconClasses'));
            } else if (!this.get('model.children')) {
                icons = this.iconFromModelOrDefault('nodeCloseIconClasses');
            } else {
                if (this.get('model.children.length') === 0) {
                    icons = icons.concat(this.iconFromModelOrDefault('nodeLeafIconClasses'));
                } else {
                    icons = this.get('expanded') ? icons.concat(this.iconFromModelOrDefault('nodeOpenIconClasses')) : icons.concat(this.iconFromModelOrDefault('nodeCloseIconClasses'));
                }
            }
        } else {
            if (this.get('leaf')) {
                icons = icons.concat(this.get('config.tree.nodeLeafIconClasses'));
            } else {
                icons = this.get('expanded') ? icons.concat(this.iconFromModelOrDefault('nodeOpenIconClasses')) : icons.concat(this.iconFromModelOrDefault('nodeCloseIconClasses'));
            }
        }
        return icons.join(" ");
    }).property('expanded', 'leaf', 'loading'),
    leafClasses: (function() {
        var _ref;
        if (this.get('leaf')) {
            return (_ref = this.get('config.tree.nodeLeafClasses')) != null ? _ref.join(" ") : void 0;
        }
    }).property('leaf'),
    hoveredActions: (function() {
        var globalHoveredActions, nodeType, types;
        globalHoveredActions = this.get('tree.hovered-actions');
        nodeType = this.get('model.nodeType');
        types = [];
        if (nodeType) {
            globalHoveredActions.forEach(function(ha) {
                if (!getProperty(ha, 'types') || !getProperty(ha, 'types').length) {
                    return types.push(ha);
                } else {
                    if (getProperty(ha, 'types').contains(nodeType)) {
                        return types.push(ha);
                    }
                }
            });
            return types;
        } else {
            return globalHoveredActions;
        }
    }).property('tree.hoveredActions', 'model.nodeType'),
    /*
     * Observes the 'model.requestReload' property, if set to true, the node's children will get reloaded
     */
    observeRequestReload: (function() {
        if (this.get('model.requestReload')) {
            this.set('model.requestReload', false);
            this.send('reloadChildren');
            return this.set('model.expanded', true);
        }
    }).observes('model.requestReload').on('init'),
    /*
     * Get the icon for the model, if set by the tree icon's metadata, otherwise use defaults configured by the tree level.
     */
    iconFromModelOrDefault: function(iconConfigName) {
        var iconsPerType, nodeType;
        nodeType = this.get('model.nodeType');
        iconsPerType = this.get('tree.icons-per-type');
        if (nodeType && iconsPerType && iconsPerType[nodeType] && iconsPerType[nodeType][iconConfigName]) {
            return iconsPerType[nodeType][iconConfigName];
        } else {
            return this.get('config.tree')[iconConfigName];
        }
    },
    actions: {
        /*
         * Expand or close the current node's children
         */
        toggle: function() {
            if (this.get('async') && !this.get('expanded') && !this.get('model.children')) {
                this.set('loading', true);
                return this.sendAction('children', this.get('model'), this);
            } else {
                return this.toggleProperty('expanded');
            }
        },
        /*
         * Reload the model's children
         */
        reloadChildren: function() {
            if (this.get('async')) {
                return this.sendAction('children', this.get('model'), this);
            }
        },
        select: function() {
            if (!this.get('selectable')) {
                return;
            }
            this.set('tree.selected', this.get('model'));
            this.get('tree').send('selectNode', this.get('model'));
        },
        toggleSelection: function() {
            if (this.get('multi-selected')) {
                return this.set('multi-selected', '');
            } else {
                return this.set('multi-selected', 'true');
            }
        }
    },
    /*
     * The name of the method to invoke in async mode to get the children of a node when expanded
     */
    children: 'getChildren',
    loadingHasChanged: (function() {
        if (!this.get('loading')) {
            return this.toggleProperty('expanded');
        }
    }).observes('loading')
});