import Ember from 'ember';
import { equalHelper } from 'ember-cli-idcos/helpers/equal';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(equalHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(equalHelper);
}

export default forExport;
