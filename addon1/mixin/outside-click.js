import Ember from 'ember';

/**
 * Mixin to set the appropriate class for components with differently styled types ("success", "danger" etc.)
 *
 * @class TypeClass
 * @namespace Mixins
 */
export default Ember.Mixin.create({
    _destroyed: false,
    _bindwillDestroyElement: function() {
        $('body').off('mousedown touchstart', this._sendOutSideClick);
    }.on('willDestroyElement'),
    _bindOutsideClick: function() {
        this.set('_sendOutSideClick', this.get('_sendOutSideClick').bind(this));
        $('body').on('mousedown touchstart', this._sendOutSideClick);
    }.on('didInsertElement'),
    _sendOutSideClick: function(ev) {
        var $el = this.$();
        if (!contains($el[0], ev.target)) {
            this.send('outsideClick');
        }
    }
});

function contains(root, n) {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
};