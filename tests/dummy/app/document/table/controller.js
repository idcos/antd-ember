import Ember from 'ember';
const {
    // get,
    // set
} = Ember;
export
default Ember.Controller.extend({
    columns: [{
        "propertyName": "id",
        "title": "ID",
        // "width": "150px"
        "maxWidth": "10px",
        // "headerTemplate": "snippets/city-header-template"
    }, {
        "propertyName": "firstName",
        "title": "First Name",
        "width": "200px"
    }, {
        "propertyName": "lastName",
        "title": "Last Name",
        "width": "150px"
    }, {
        "propertyName": "city",
        "title": "City",
        "template": "snippets/city-template"
    }],
    data: [{
        "id": 1,
        "firstName": "陈",
        "lastName": " 学家",
        "age": 34,
        "city": "Shanghai",
        "cityWithHtml": "<i>Shanghai</i>"
    }, {
        "id": 2,
        "firstName": "Jim",
        "lastName": "Smith",
        "age": 41,
        "city": "Karachi",
        "cityWithHtml": "<i>Karachi</i>"
    }, {
        "id": 3,
        "firstName": "Rigoberto",
        "lastName": "Patel",
        "age": 46,
        "city": "Beijing",
        "cityWithHtml": "<i>Beijing</i>"
    }, {
        "id": 4,
        "firstName": "Ian",
        "lastName": "Jones",
        "age": 36,
        "city": "Tianjin",
        "cityWithHtml": "<i>Tianjin</i>"
    }, {
        "id": 5,
        "firstName": "Wei",
        "lastName": "Williams",
        "age": 43,
        "city": "Istanbul",
        "cityWithHtml": "<i>Istanbul</i>"
    }, {
        "id": 6,
        "firstName": "Otilia",
        "lastName": "Johnson",
        "age": 24,
        "city": "Lagos",
        "cityWithHtml": "<i>Lagos</i>"
    }, {
        "id": 7,
        "firstName": "Wendell",
        "lastName": "Taylor",
        "age": 44,
        "city": "Guangzhou",
        "cityWithHtml": "<i>Guangzhou</i>"
    }, {
        "id": 8,
        "firstName": "Chasity",
        "lastName": "Thomas",
        "age": 46,
        "city": "Mumbai",
        "cityWithHtml": "<i>Mumbai</i>"
    }, {
        "id": 9,
        "firstName": "Billi",
        "lastName": "Roberts",
        "age": 21,
        "city": "Moscow",
        "cityWithHtml": "<i>Moscow</i>"
    }, {
        "id": 10,
        "firstName": "陈A",
        "lastName": "Khan",
        "age": 31,
        "city": "Dhaka",
        "cityWithHtml": "<i>Dhaka</i>"
    }],
    columns1: [{
        "propertyName": "id",
        "title": "ID",
        width: 150
        // "headerTemplate": "snippets/city-header-template"
    }, {
        "propertyName": "firstName",
        "title": "First Name",
        width: 200
    }, {
        "propertyName": "lastName",
        "title": "Last Name",
        width: 150
    }, {
        "propertyName": "city",
        "title": "City",
        "template": "snippets/city-template"
    }],
    data2: [{
        "id": 1,
        "firstName": "陈",
        "lastName": " 学家",
        "age": 34,
        "city": "Shanghai",
        "cityWithHtml": "<i>Shanghai</i>"
    }, {
        "id": 2,
        "firstName": "Jim",
        "lastName": "Smith",
        "age": 41,
        "city": "Karachi",
        "cityWithHtml": "<i>Karachi</i>"
    }, {
        "id": 3,
        "firstName": "Rigoberto",
        "lastName": "Patel",
        "age": 46,
        "city": "Beijing",
        "cityWithHtml": "<i>Beijing</i>"
    }, {
        "id": 4,
        "firstName": "Ian",
        "lastName": "Jones",
        "age": 36,
        "city": "Tianjin",
        "cityWithHtml": "<i>Tianjin</i>"
    }, {
        "id": 5,
        "firstName": "Wei",
        "lastName": "Williams",
        "age": 43,
        "city": "Istanbul",
        "cityWithHtml": "<i>Istanbul</i>"
    }, {
        "id": 6,
        "firstName": "Otilia",
        "lastName": "Johnson",
        "age": 24,
        "city": "Lagos",
        "cityWithHtml": "<i>Lagos</i>"
    }, {
        "id": 7,
        "firstName": "Wendell",
        "lastName": "Taylor",
        "age": 44,
        "city": "Guangzhou",
        "cityWithHtml": "<i>Guangzhou</i>"
    }, {
        "id": 8,
        "firstName": "Chasity",
        "lastName": "Thomas",
        "age": 46,
        "city": "Mumbai",
        "cityWithHtml": "<i>Mumbai</i>"
    }, {
        "id": 9,
        "firstName": "Billi",
        "lastName": "Roberts",
        "age": 21,
        "city": "Moscow",
        "cityWithHtml": "<i>Moscow</i>"
    }, {
        "id": 10,
        "firstName": "Chester",
        "lastName": "Khan",
        "age": 31,
        "city": "Dhaka",
        "cityWithHtml": "<i>Dhaka</i>"
    }],
    isLoading: false,
    actions: {
        update: function(selection) {
            console.log(selection);
        },
        search: function(searchText) {
            this.set('isLoading', true);
            this.set('list', []);
            setTimeout(function() {
                this.set('isLoading', false);
            }.bind(this), 500);
        }
    }
});