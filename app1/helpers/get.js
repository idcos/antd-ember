import Ember from 'ember';
import { getHelper } from 'ember-cli-idcos/helpers/get';
import getGlimmerHelper from 'ember-cli-idcos/helpers/get-glimmer';

var forExport = null;

if (Ember.Helper) {
  forExport = getGlimmerHelper;
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(getHelper);
}

export default forExport;
