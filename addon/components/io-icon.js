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
		let dc=this.get("doubleClick");
		if(!dc){
			this.set("doubleClick",true);
			this.sendAction('onClick');
			let self=this;
			setTimeout(function(){self.set("doubleClick",false);},2000);
		}
	}
});