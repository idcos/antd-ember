import Ember from 'ember';

const Helper = Ember.Helper || Ember.Object;
const { get, observer, defineProperty, setProperties, computed } = Ember;
const { oneWay } = computed;

export default Helper.extend({
  compute(params/*, hash*/) {
    setProperties(this, {
      obj: params[0],
      path: params[1]
    });

    return get(this, 'content');
  },

  obj: null,

  path: null,

  content: null,

  pathDidChange: observer('path', function() {
    const path = get(this, 'path');
    if (path) {
      defineProperty(this, 'content', oneWay(`obj.${path}`));
    } else {
      defineProperty(this, 'content', null);
    }
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })

});
