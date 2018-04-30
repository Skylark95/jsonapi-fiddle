/**
 * Jsonapi class for JsonapiFiddle. Contains helper methods for interacting with a
 * JSON API (http://jsonapi.org/) service.
 * 
 * @class Jsonapi
 * @constructor 
 * @param {Object} options an options object with the following configuration options:
 * <ul>
 * <li><code>BaseURL</code> (Required): The base URL to use for the JSON API service to be called</li>
 * <li><code>headers</code> (Optional): An object of key value pairs to use for headers to send</li>
 * <li><code>withCredentials</code> (Optional): Specify if request should be with with xhr withCredentials (default false)
 * </ul>
 */
class Jsonapi {

  constructor(options) {
    this.options = options;
    this.options.headers = options.headers || {};
    this.options.headers = Object.assign(this.options.headers, {
      "Content-Type": "application/vnd.api+json",
      "Accept": "application/vnd.api+json, application/json, */*"
    });

    this.results = document.querySelectorAll('[data-jsonapi-results]');
    if (this.results.length === 0) {
      this.results = document.createElement('div');
      this.results.setAttribute('data-jsonapi-results', '');
      document.querySelector('body').appendChild(this.results);
    }
  }

  /**
   * 
   * @method _addResult
   * @private
   * @param {String} method 
   * @param {String} statusCode 
   * @param {String} statusText 
   * @param {Object} resultData 
   * @param {String} url 
   */
  _addResult(method, statusCode, statusText, resultData, url) {
    let result = document.createElement('div');
    let resultUrl = url;
    if (resultData && resultUrl.indexOf(resultData.data.id) === -1) {
      resultUrl += `/${resultData.data.id}`;
    }
    result.setAttribute('data-jsonapi-result', '');
    result.innerText = `${method} - ${statusCode} ${statusText}: `;

    let a = document.createElement('a');
    a.setAttribute('href', resultUrl);
    a.setAttribute('target', '_blank');
    a.innerText = resultUrl;
    result.appendChild(a);

    console.log(`${result.innerText}`);
    if (resultData) {
      console.log(resultData);
    } this.results.appendChild(result);
  }

  /**
   * Makes an ajax request.
   * @method ajax
   * @param {String} method HTTP method
   * @param {String} resource JSON API resource type
   * @param {JsonapiDocument} request JsonapiDocument to use for the request
   * @returns {Promise} A Promise that will be resolved upon success with a JsonapiDocument or a jQuery jqXHR object on failure (except for method DELETE)
   */
  ajax(method, resource, request) {
    let me = this;
    let options = this.options;
    let data = { data: request ? request.data : {} };
    let url = `${options.baseURL}/${resource}`;

    if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
      data = undefined;
    }

    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        method: method,
        dataType: 'json',
        crossDomain: true,
        headers: options.headers,
        xhrFields: {
          withCredentials: options.withCredentials
        },
        data: JSON.stringify(data),
        success: function (result, status, xhr) {
          let statusCode = xhr.status;
          let statusText = xhr.statusText;
          me._addResult(method, statusCode, statusText, result, url)

          if (result) {
            resolve(new JsonapiDocument(result.data));
          } else {
            resolve();
          }
        },
        error: function (xhr) {
          console.error(`${xhr.status} ${xhr.statusText}: ${url}`);
          console.error(xhr);
          reject(xhr);
        }
      });
    });
  }

  /**
   * Makes a HTTP GET request to the JSON API service
   * @method get
   * @param {*} resource The JSON API resource type as a String OR a JsonapiDocument.
   * @param {String} resourceId The id of the JSON API resource to retrieve. Only required if <code>resource</code> is a String.
   * @returns {Promise} A Promise that will be resolved upon success with a JsonapiDocument or a jQuery jqXHR object on failure
   */
  get(resource, resourceId) {
    let type = resource.data ? resource.data.type : resource;
    let id = resource.data ? resource.data.id : resourceId;
    return this.ajax('GET', `${type}/${id}`);
  }

  /**
   * Makes a HTTP DELETE request to the JSON API service
   * @method delete
   * @param {*} resource The JSON API resource type as a String OR a JsonapiDocument.
   * @param {String} resourceId The id of the JSON API resource to delete. Only required if <code>resource</code> is a String.
   */
  delete(resource, resourceId) {
    let type = resource.data ? resource.data.type : resource;
    let id = resource.data ? resource.data.id : resourceId;
    return this.ajax('DELETE', `${type}/${id}`);
  }

  /**
   * Makes a HTTP POST request to the JSON API service
   * @method post 
   * @param {JsonapiDocument} request the JsonapiDocument to post
   * @returns {Promise} A Promise that will be resolved upon success with a JsonapiDocument or a jQuery jqXHR object on failure
   */
  post(request) {
    return this.ajax('POST', request.data.type, request);
  }

  /**
   * Makes a HTTP PATCH request to the JSON API service
   * @method patch
   * @param {JsonapiDocument} request the JsonapiDocument to patch
   * @returns {Promise} A Promise that will be resolved upon success with a JsonapiDocument or a jQuery jqXHR object on failure
   */
  patch(request) {
    return this.ajax('PATCH', `${request.data.type}/${request.data.id}`, request);
  }

  /**
   * Creates a new JsonapiDocument
   * @method createDocument
   * @param {Object} data The JSON API data member. 
   * This object may consist of <code>type</code>, <code>id</code>, <code>attributes</code>, and <code>relationships</code>
   */
  createDocument(data) {
    return new JsonapiDocument(data);
  }
}

/**
 * JsonapiDocument class for JsonapiFiddle. Contains helper methods for interacting with a JSON API (http://jsonapi.org) document.
 * @class JsonapiDocument
 * @constructor
 * @param {Object} data The JSON API data member. 
 * This object may consist of <code>type</code>, <code>id</code>, <code>attributes</code>, and <code>relationships</code>
 */
class JsonapiDocument {
  constructor(data) {
    this.data = data || {};
    if (!this.data.attributes) {
      this.data.attributes = {};
    }
    if (!this.data.relationships) {
      this.data.relationships = {};
    }
  }

  /**
   * Shortcut method to get <code>data.type</code> 
   * @method getType
   * @returns {String} data.type
   */
  getType() {
    return this.data.type;
  }

  /**
   * Shortcut method to set <code>data.type</code> 
   * @method setType
   * @param {String} type data.type
   */
  setType(type) {
    this.data.type = type;
  }

  /**
   * Shortcut method to add or update attributes to <code>data.attributes</code>
   * without removing existing attributes.
   * @method addAttributes
   * @param {Object} attributes the attributes to add
   */
  addAttributes(attributes) {
    this.data.attributes = Object.assign(this.data.attributes, attributes);
  }

  /**
   * Shortcut method to remove attributes from <code>data.attributes</code>
   * @method removeAttributes
   * @param {Array} attributes an array of attribute names to remove
   */
  removeAttributes(attributes) {
    attributes.forEach(attr => {
      delete this.data.attributes[attr];
    });
  }

  /**
   * Shortcut method to add or update relationships to <code>data.relationships</code>
   * without removing existing relationships
   * @method addRelationships
   * @param {Object} relationships the relationships to add
   */
  addRelationships(relationships) {
    this.data.relationships = Object.assign(this.data.relationships, relationships);
  }

  /**
   * Shortcut method to remove relationships from <code>data.relationships</code>
   * @method removeRelationships
   * @param {Array} relationships an array of the relationship names to remove
   */
  removeRelationships(relationships) {
    relationships.forEach(rel => {
      delete this.data.relationships[rel];
    });
  }

  /**
   * Shortcut method to get <code>data.id</code>
   * @method getId
   * @returns {String} data.id
   */
  getId() {
    return this.data.id;
  }

  /**
   * Shortcut method to set <code>data.id</code>
   * @method setId
   * @param {String} id data.id
   */
  setId(id) {
    this.data.id = id;
  }
}
