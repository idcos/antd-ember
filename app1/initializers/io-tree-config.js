import Em from 'ember';
import IdxConfig from 'ember-cli-idcos/config';

export default {
  name: 'ember-idx-tree',
  initialize: function() {
    var Config = Em.IdxConfig = Em.IdxConfig ? Em.IdxConfig : IdxConfig.create();

    var defaultConfig = Config.getConfig('default');
    if (!defaultConfig) {
        Config.addConfig('default');
        defaultConfig = Config.getConfig('default');
    }

    defaultConfig['tree'] = {
        classes: ['io-tree-branch', 'io-tree', 'io-ul'],
        branchClasses: ['io-tree-branch', 'io-ul'],
        nodeClasses: ['io-tree-node'],
        nodeOpenClasses: [],
        nodeCloseClasses: [],
        nodeOpenIconClasses: ['io-tree-node__caret', 'ioicon', 'ioicon-caret-down'],
        nodeCloseIconClasses: ['io-tree-node__caret', 'ioicon', 'ioicon-caret-right'],
        nodeLeafClasses: ['io-tree-leaf'],
        nodeLeafIconClasses: ['io-tree-leaf-icon', 'ioicon',''],
        nodeLoadingIconClasses: ['io-tree-leaf-icon', 'ioicon', 'ioicon-loading'],
        nodeSelectedClasses: ['io-tree-node-active']
    }
  }
};