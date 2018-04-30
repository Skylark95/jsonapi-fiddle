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
    }

    this.results.appendChild(result);
  }

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

  get(resource, resourceId) {
    let type = resource.data ? resource.data.type : resource;
    let id = resource.data ? resource.data.id : resourceId;
    return this.ajax('GET', `${type}/${id}`);
  }

  delete(resource, resourceId) {
    let type = resource.data ? resource.data.type : resource;
    let id = resource.data ? resource.data.id : resourceId;
    return this.ajax('DELETE', `${type}/${id}`);
  }

  post(request) {
    return this.ajax('POST', request.data.type, request);
  }

  patch(request) {
    return this.ajax('PATCH', `${request.data.type}/${request.data.id}`, request);
  }

  createDocument(data) {
    return new JsonapiDocument(data);
  }
}

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

  getType() {
    return this.data.type;
  }

  setType(type) {
    this.data.type = type;
  }

  addAttributes(attributes) {
    this.data.attributes = Object.assign(this.data.attributes, attributes);
  }

  removeAttributes(attributes) {
    attributes.forEach(attr => {
      delete this.data.attributes[attr];
    });
  }

  addRelationships(relationships) {
    this.data.relationships = Object.assign(this.data.relationships, relationships);
  }

  removeRelationships(relationships) {
    relationships.forEach(rel => {
      delete this.data.relationships[rel];
    });
  }

  getId() {
    return this.data.id;
  }

  setId(id) {
    this.data.id = id;
  }
}
