import Ember from 'ember';
import { andHelper } from 'ember-cli-idcos/helpers/and';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(andHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(andHelper);
}

export default forExport;
