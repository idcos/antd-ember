import Em from 'ember';
export default Em.Mixin.create({
    configName: Em.computed(function() {
        var config;
        config = this.nearestWithProperty('configName');
        if (config) {
            return config.get('configName');
        } else {
            return 'default';
        }
    }),
    config: Em.computed('configName', function() {
        return Em.IdxConfig.getConfig(this.get('configName'));
    })
});