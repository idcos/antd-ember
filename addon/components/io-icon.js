import Ember from 'ember';

/**
 * Button Component
 ```html
    {{io-icon type="search"}}
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'i',
	attributeBindings: ['disabled', 'onClick', 'role'],
	type: '',
	/**
	 * [fa is fontawesome icon]
	 * @type {Boolean}
	 */
	fa: false,
	doubleClick:false,
	classNameBindings: ['typeClass'],
	typeClass: function() {
		if (this.get('fa')) {
			return 'fa fa-' + this.get('type');
		}
		return  'ioicon ioicon-' + this.get('type');
	}.property('type'),
	click: function() {
		let dc=this.get('doubleClick');
		if(!dc){
			this.set('doubleClick',true);
			if (this.get('onClick')) {
				this.send('onClick', this);
			} else {
				this.sendAction(this);
			}
			setTimeout(function() {
                this.set("doubleClick",false);
            }.bind(this), 2000);
		}
		
	},
});