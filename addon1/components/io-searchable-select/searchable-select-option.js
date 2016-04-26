import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings:  [
    ':Searchable-select__option',
    'isDisabled:Searchable-select__option--disabled',
    'isSelected:Searchable-select__option--selected'
  ],
  attributeBindings: ['tabindex'],

  option: null,
  optionLabelKey: 'title',
  optionDisabledKey: null,
  selected: null,
  searchText: '',

  isDisabled: Ember.computed('option', 'optionDisabledKey', function() {
    if (this.get('optionDisabledKey')) {
      return Ember.get(this.get('option'), this.get('optionDisabledKey'));
    }
  }),
  isSelected: Ember.computed('option', 'selected', function() {
    if (Array.isArray(this.get('selected'))) {
      return Ember.A(this.get('selected')).contains(this.get('option'));
    } else {
      return this.get('selected') === this.get('option');
    }
  }),
  tabindex: Ember.computed('isDisabled', function() {
    if (!this.get('isDisabled')) {
      return -1;
    }
  }),

  keyDown(event) {
    // enter key selects item
    if (event.keyCode === 13) {
      this.send('selectItem');
    }
  },

  click() {
    this.send('selectItem');
  },

  actions: {
    selectItem() {
      this.attrs['select-item'](this.get('option'));
    }
  }
});