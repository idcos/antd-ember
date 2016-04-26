import Ember from 'ember';

export function searchableSelectGet([object, path]) {
  if (!path) {
    return;
  }

  return Ember.get(object, path);
}

export default Ember.Helper.helper(searchableSelectGet);
