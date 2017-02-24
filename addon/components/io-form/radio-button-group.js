import Ember from 'ember';
import FormItemMixin from '../../mixin/form-item';
import ComponentParent from '../../mixin/component-parent';


/**
 * RadioButtonGroup Component
 ```html
    {{#io-radio-button-group}}
  	{{/io-radio-button-group}}
 ``` 
 */

export default Ember.Component.extend(ComponentParent, FormItemMixin, {
	/**
	 * [tagName description]
	 */
	tagName: 'div',
	attributeBindings: ['disabled', 'onClick', 'role'],
	classNames: 'io-btn-group input-custom io-radio-btn-group',
	value: null,
	checked: null,
	_checkedChange: function() {
		if (!this.get('required')) {
			return;
		}
		Ember.run.later(()=> {
			const checked = this.get('checked');
			let children = this.get('children');
			let checkedChild = children.any((child)=>{
				if (child.get('value') === checked) {
					return child;
				} else {
					return null;
				}
			});

			let value = null;
			if (checkedChild) {
				value = checkedChild.get('value');
			}

			this.set('value', value);

			setTimeout(() => {
				const $el = this.$();
				if ($el && $el.trigger) {
					$el.trigger('input.bs.validator');
				}
			}, 100);
		});
	}.observes('checked').on('init')
});