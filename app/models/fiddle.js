import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  javascript: DS.attr('string', {
    defaultValue: 
`/*
 * JsonapiFiddle
 * A JSFiddle for JSON API (http://jsonapi.org/)
 * Example api usage. Feel free to edit to your liking.
 * 
 * This sample will work with the endpoints example project
 * https://github.com/endpoints/endpoints-example
 *
 * Note that all saved fiddles are only saved to your brower's
 * local storage and cannot be shared at this time.
 */ 

// Create a new Jsonapi object with baseURL (required), 
// headers (optional), and if you want to send xhr withCredentials (optional)
let api = new Jsonapi({
 baseURL: 'http://localhost:8080/v1',
 headers: {
   'foo-custom-header': 'bar-value'
 },
 withCredentials: false
});

// Create a new authors JsonapiDocument object
let author = api.createDocument({ type: 'authors' });

// Add attributes by calling addAttributes
author.addAttributes({ 
 "name": "J. R. R. Tolkien", 
 "date_of_birth": "1892-01-03",
 "date_of_death": "1973-09-02", 
 "created_at": "2018-04-29 00:13:05",
 "updated_at": "2018-04-29 00:13:05"
});

// JsonapiDocument also exposes a data object that you may simply read and modify directly
author.data.attributes.updated_at = "2018-04-29 00:13:06";

// You can also remove attributes by calling removeAttributes with an array
author.removeAttributes(['foo']);

// POST author and await for result
let result = await api.post(author);

// Set id on author from result
author.setId(result.getId());

// GET request works with either resource and id OR just a JsonapiDocument object
result = await api.get('authors', author.getId());
result = await api.get(author);

// And if we had changes we could do a PATCH
result = await api.patch(author);

// Now lets crete a book
let book = api.createDocument({
  "type": "books",
  "attributes": {
    "date_published": "1954-07-29",
    "title": "The Fellowship of the Ring",
    "created_at": "2018-04-30 01:44:38",
    "updated_at": "2018-04-30 01:44:38"
  }
});

// and add a relationship to the book
book.addRelationships({
  "author": {
    "data": {
      "id": author.getId(),
      "type": author.getType()
    }
  }
});

// and finally post the book
result = await api.post(book);
book.setId(result.getId());

// And that's a wrap we may now DELETE our changes 
// with either resource and id OR just a JsonapiDocument object
await api.delete(book);
await api.delete('authors', author.getId());`
  })
});