import Ember from 'ember';
import Split from './split';

/**
 * split-panel Component
 ```html
    {{#io-split-panel direction="vertical"}}
		{{#io-split-panel minSize="200" size="20"}}
		{{/io-split-panel}}
		{{#io-split-panel minSize="200" siz"80"}}
  	{{/io-split-panel}}
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'div',
	classNames: 'io-split split',
	/**
	 * @attribute  size
	 * @description  percentage of parent
	 */
	size: 5,
	/**
	 * @attribute  minSize in px
	 */
	minSize: 100,
	/**
	 * @attribute  direction [horizontal | vertical] 
	 */
	direction: 'horizontal',
	/**
	 * [didInsertElement description]
	 * @return {[type]} [description]
	 */
	didInsertElement() {
		Ember.run.later(() => {
			const children = this.$('>.split');
			let sizes = [];
			let minSize = [];
			let els = [];
			let direction = this.get('direction');
			const selfMinSize = this.get('minSize');

			if (children.length === 1) {
				children.addClass('split-' + direction);
				children.css('float', 'none');
			}

			if (children.length <= 1) {
				return;
			}

			children.each((index, child) => {
				const $child = $(child);
				const size = $child.attr('size') - 0;
				const _minSize = $child.attr('minsize') - 0;

				sizes.push(size);
				minSize.push(Math.max(selfMinSize, _minSize || 0));
				els.push(child);
				$child.addClass('split-' + direction);
			})

			Split(els,{
				sizes,
				minSize,
				direction,
				onDrag: () => {
					this.send('onDrag');
				}
			});
		}, 10);
	},
	actions: {
		onDrag(){
			if (this.get('onDrag')) {
				this.sendAction('onDrag');
			}
		}
	}
});