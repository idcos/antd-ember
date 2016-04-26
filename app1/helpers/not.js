import Ember from 'ember';
import { notHelper } from 'ember-cli-idcos/helpers/not';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(notHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(notHelper);
}

export default forExport;
