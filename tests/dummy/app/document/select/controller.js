import Ember from 'ember';
const swal = window.swal;
const treeData = [{
  title: '节点一',
  id: '0-0',
  children: [{
    title: '子节点一',
    disabled: true,
    id: '0-0-0',
  }, {
    title: '子节点二',
    id: '0-0-1',
  }],
}, {
  title: '节点二',
  id: '0-1',
  children: [{
    title: '子节点三',
    id: '0-1-0',
  }, {
    title: '子节点四',
    id: '0-1-1',
    children: [{
    	title: '子节点五',
    	id: '0-1-1-1'
    }]
  }],
}];
export default Ember.Controller.extend({
	checked: '1',
	value: '',
	values: ['lucy', 'jack'],
	treeData: treeData,
	treeSelectedValue: '0-1-0',
	options: [{
		value: '1',
		label: 'jack'
	}, {
		value: '2',
		label: 'lucy'
	}, {
		value: '3',
		label: 'disabled',
		disabled: true
	}, {
		value: '4',
		label: '6174'
	}],
	_valueChange: Ember.observer('value', function() {
		swal('value change' + this.get('value'));
	}),
	comboboxValue: '',
	comboboxOptions: [],
	actions: {
		onChange: function(values) {
			console.log(values);
		},
		comboboxOnChange: function() {

			if (this.get('comboboxValue') === '') {
				this.set('comboboxOptions', []);
				return;
			}

			setTimeout(() => {
				this.set('comboboxOptions', [{
					value: 'jack',
					label: 'jack'
				}, {
					value: 'lucy',
					label: 'lucy'
				}, {
					value: '6174',
					label: '6174'
				}]);
			}, 1000);
		},

		onSearch: function() {
            this.get("value");
			setTimeout(() => {
				this.set('options', [{
					value: 'jack',
					label: 'jack'
				}, {
					value: 'lucy',
					label: 'lucy'
				}, {
					value: '6174',
					label: '6174'
				}]);
			}, 10);
		}
	}
});
