import Ember from 'ember';
import DisabledClass from '../../mixin/disabled-class';
import OutsideClick from '../../mixin/outside-click';
import TreeModel from '../../utils/tree-model';

const  {
	get,
	set
} = Ember;

/**
 * io-cascader-picker Component
 ```js
	const options = [{
	  value: 'zhejiang',
	  id: 'zhejiang',
	  label: '浙江',
	  children: [{
	    value: 'hangzhou',
	    id: 'hangzhou',
	    label: '杭州',
	    children: [{
	      value: 'xihu',
	      id: 'xihu',
	      label: '西湖',
	    }],
	  }],
	}, {
	  value: 'jiangsu',
	  id: 'jiangsu',
	  label: '江苏',
	  children: [{
	    value: 'nanjing',
	    id: 'nanjing',
	    label: '南京',
	    children: [{
	      value: 'zhonghuamen',
	      id: 'zhonghuamen',
	      label: '中华门',
	    }],
	  }],
	}];
 ``` 
 */



export default Ember.Component.extend(DisabledClass, OutsideClick, {
	/**
	 * [tagName description]
	 */
	tagName: 'span',
	classNames: 'io-cascader-picker io-cascader',
	classNamePrefix: 'io-cascader-',
	attributeBindings: ['disabled', 'name'],
	classNameBindings: ['openClass'],
	/**
	 * [placeholder for input]
	 * @type {Boolean}
	 */
	placeholder: '请选择',
	/**
	 * [options in tree model]
	 * @type {[type]}
	 */
	options: null,
	/**
	 * [_tree transform options into tree model]
	 * @type {TreeModel}
	 */
	_tree: new TreeModel(),
	/**
	 * [_treeRoot root node of tree ]
	 * @return {[type]} [description]
	 */
	_treeRoot: function() {
		return this.get('_tree').parse({
			id: 'root',
			children: this.get('options')
		});
	}.property('options'),
	/**
	 * [_activeOptions get current active options]
	 * @return {[type]} [description]
	 */
	_activeOptions: function() {
		var values = this.get('values');
		var options = this.get('options');
		var rootNode = this.get('_treeRoot');
		var activeOptions =  values.map(function(value) {
			return rootNode.first(function(node) {
				return node.model.id === value
			})
		});

		rootNode.walk(function(node) {
			if (values.contains(node.model.id)) {
				set(node, 'model.active', true);
			} else {
				set(node, 'model.active', false);
			}
		});
		return activeOptions;
	}.property('values', 'options'),
	/**
	 * [_showMenus get shown menus from activeOptions]
	 * @return {[type]} [description]
	 */
	_showMenus: function() {
		var values = this.get('values');
		var menus = this.get('_activeOptions').filter(function(option) {
			return option.children && option.children.length > 0;
		}).map(function(option) {
			return option.children;
		});

		menus.unshift(this.get('_treeRoot').children);
		return menus;
	}.property('values', 'options'),
	/**
	 * [values  option id array]
	 * @type {Array}
	 */
	values:['zhejiang'], 
	/**
	 * [_value for input value]
	 * @return {[type]} [description]
	 */
	_value: function() {
		var rootNode = this.get('_treeRoot');
		return this.get('values').map(function(value) {
			var node = rootNode.first(function(node) {
				return node.model.id === value
			});
			return node.model.label;
		}).join('/');
	}.property('values'),
	/**
	 * [_open description]
	 * @type {Boolean}
	 */
	_open: false,
	openClass: function() {
		if (this.get('_open')) {
			return this.get('classNamePrefix') + 'open';
		} else {
			return '';
		}
	}.property('_open'),
	actions: {
		toggleMenu: function() {
			this.set('_open', !this.get('_open'));
		},
		selectOption: function(option) {
			if (option.model.disabled) {
				return;
			}
			
			var path = option.getPath();
			var values = [];
			path.forEach(function(node) {
				values.push(node.model.id);
			});
			values.shift();
			this.set('values', values);
			this.sendAction('onChange', values);
		},
		clearValues: function() {
			set(this, 'values', Ember.A());
			this.sendAction('onChange', []);
		},
		outsideClick: function() {
			set(this, '_open', false);
		}
	}
});