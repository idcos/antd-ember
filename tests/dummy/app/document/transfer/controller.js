import Ember from 'ember';
let targetKeys = [];
let mockData = [];
for (let i = 0; i < 20; i++) {
  const data = {
    value: i,
    label: `内容${i + 1}`,
    description: `内容${i + 1}的描述`,
    chosen: Math.random() * 2 > 1
  };
  if (data.chosen) {
    targetKeys.push(data.value);
  }
  mockData.push(data);
}

export default Ember.Controller.extend({
    dataSource: mockData,
    targetValues: targetKeys,
    actions: {
        expand: function() {
            this.get('selected').toggleProperty('expanded');
            return null;
        },
        onSelectNode: function(model) {
            console.log(model);
        }
    }
});