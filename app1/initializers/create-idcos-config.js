import Em from 'ember';
import IdcosConfig from 'ember-cli-idcos/config';

export default {
  name: 'ember-cli-idcos',
  initialize: function() {
    if (!Em.IdcosConfig) {
        Em.IdcosConfig = IdcosConfig.create();
    }
  }
};