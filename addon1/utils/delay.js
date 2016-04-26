import Em from 'ember';

var delay = function(ms) {
  ms = ms || 1500;
  return new Em.RSVP.Promise(function(resolve) {
    Em.run.later(this, resolve, ms);
  });
};

export default delay;