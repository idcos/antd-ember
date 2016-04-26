import Ember from 'ember';

export function htmlSafe(str) {
  return Ember.String.htmlSafe(str);
}

export default Ember.Helper.helper(htmlSafe);
