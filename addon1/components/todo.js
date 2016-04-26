export default Ember.Component.extend({
	tagName:'div',
	classNames:'primary',
	classNameBindings:['isUrgent'],
	isUrgent:true
})