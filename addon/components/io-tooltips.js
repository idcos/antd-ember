import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'span',
    attributeBindings: ['disabled', 'role'],
    classNames: 'io-tooltips',
    classNamePrefix: 'io-tooltips-',
    classNameBindings: ['typeClass', 'displayClass', 'activeClass']

});
