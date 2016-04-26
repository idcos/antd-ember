import Ember from 'ember';

export default Ember.TextField.extend({
    placeholderBinding: 'content.name',
    _setRemoteValue: (function() {
        var val;
        val = this.get('value');
        if (val != null) {
            return this.set("data." + (this.get('key')), val);
        }
    }).observes('value'),
    attributeBindings: ['data', 'key'],
    didInsertElement: function() {
        var updateCurrentValue;
        updateCurrentValue = (function(_this) {
            return function() {
                var currentValue;
                currentValue = _this.get("data." + (_this.get('key')));
                if (Ember.isNone(currentValue)) {
                    return _this.set('value', "");
                }else{
                    return _this.set('value',currentValue);
                }
            };
        })(this);
        updateCurrentValue();
        return this.addObserver("data." + (this.get('key')), updateCurrentValue);
    }
});