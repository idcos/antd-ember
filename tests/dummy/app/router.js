import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home');
  this.route('newbee');
  this.route('document', function() {
    this.route('button');
    this.route('select');
    this.route('searchableSelect');
    this.route('table');
    this.route('modal');
    this.route('tree');
    this.route('form');
    this.route('form-validator');
    this.route('newbee');
    this.route('introduce');
    this.route('icon');
    this.route('layout');
    this.route('checkbox');
    this.route('radio');
    this.route('menu');
    this.route('cascader');
    this.route('upload');
    this.route('switch');
    this.route('split');
    this.route('alert');
    this.route('dropdown');
    this.route('datepicker');
    this.route('unsave');
    this.route('transfer');
    this.route('progress');
    this.route('tooltips');
  });
});

export default Router;
