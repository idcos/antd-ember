import Ember from 'ember';
import { registerHelper } from 'ember-cli-idcos/utils/register-helper';

import { andHelper } from 'ember-cli-idcos/helpers/and';
import { orHelper } from 'ember-cli-idcos/helpers/or';
import { equalHelper } from 'ember-cli-idcos/helpers/equal';
import { notHelper } from 'ember-cli-idcos/helpers/not';
import { isArrayHelper } from 'ember-cli-idcos/helpers/is-array';
import { notEqualHelper } from 'ember-cli-idcos/helpers/not-equal';
import { gtHelper } from 'ember-cli-idcos/helpers/gt';
import { gteHelper } from 'ember-cli-idcos/helpers/gte';
import { ltHelper } from 'ember-cli-idcos/helpers/lt';
import { lteHelper } from 'ember-cli-idcos/helpers/lte';

export function initialize(/* container, application */) {

  // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
  // will be auto-discovered.
  if (Ember.Helper) {
    return;
  }

  registerHelper('and', andHelper);
  registerHelper('or', orHelper);
  registerHelper('eq', equalHelper);
  registerHelper('not', notHelper);
  registerHelper('is-array', isArrayHelper);
  registerHelper('not-eq', notEqualHelper);
  registerHelper('gt', gtHelper);
  registerHelper('gte', gteHelper);
  registerHelper('lt', ltHelper);
  registerHelper('lte', lteHelper);
}

export default {
  name: 'truth-helpers',
  initialize: initialize
};
