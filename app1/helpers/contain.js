import Ember from 'ember';

export function contain(params) {
	if(params.length&&params.length>1){
		if(params[0]&&params[1]){
			var origin = params[0];
			var str = params[1];
			return origin.indexOf(str) >= 0;
		}
	}
	return false;
}

export default Ember.Helper.helper(contain);
