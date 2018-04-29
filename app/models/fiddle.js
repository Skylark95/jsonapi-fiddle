import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  javascript: DS.attr('string', {
    defaultValue: 
`/*
 * JsonapiFiddle
 * Example api usage. Feel free to edit to your liking.
 * 
 * This sample will work with the endpoints example project
 * https://github.com/endpoints/endpoints-example
 */ 

// Create a new Jsonapi object with baseURL, headers (optional), and if
// you want to send xhr withCredentials
let api = new Jsonapi({
  baseURL: 'http://localhost:8080/v1',
  headers: {
    'foo-custom-header': 'bar-value'
  },
  withCredentials: false
});

// Create a new authors document
let author = api.createDocument({ type: 'authors' });

// Add attributes to the article either by calling addAttributes with an object
// or just modify data directly
author.addAttributes({ "name": "J. R. R. Tolkien", "date_of_birth": "1892-01-03" });
author.addAttributes({ "date_of_death": "1973-09-02", "created_at": "2018-04-29 00:13:05" });
author.data.attributes.updated_at = "2018-04-29 00:13:05"

// You can also remove attributes by calling remove attributes with an array
author.addAttributes({ "foo": "bar"});
author.removeAttributes(['foo']);

// Post author and await for result
let result = await api.post(author);

// Set the author id from the result
author.setId(result.getId());

// Patch our changes
await api.patch(author);
`
  })
});
