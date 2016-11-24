import Ember from 'ember';

export function count(params) {
	return parseInt(params)+1;
}

export default Ember.Helper.helper(count);
