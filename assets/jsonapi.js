class Jsonapi{constructor(t){this.options=t,this.options.headers=t.headers||{},this.options.headers=Object.assign(this.options.headers,{"Content-Type":"application/vnd.api+json",Accept:"application/vnd.api+json, application/json, */*"}),this.results=document.querySelectorAll("[data-jsonapi-results]"),0===this.results.length&&(this.results=document.createElement("div"),this.results.setAttribute("data-jsonapi-results",""),document.querySelector("body").appendChild(this.results))}_addResult(t,e,a,s,i){let r=document.createElement("div"),d=i
s&&-1===d.indexOf(s.data.id)&&(d+=`/${s.data.id}`),r.setAttribute("data-jsonapi-result",""),r.innerText=`${t} - ${e} ${a}: `
let n=document.createElement("a")
n.setAttribute("href",d),n.setAttribute("target","_blank"),n.innerText=d,r.appendChild(n),console.log(`${r.innerText}`),s&&console.log(s),this.results.appendChild(r)}ajax(t,e,a){let s=this,i=this.options,r={data:a?a.data:{}},d=`${i.baseURL}/${e}`
return"GET"!==t.toUpperCase()&&"DELETE"!==t.toUpperCase()||(r=void 0),new Promise((e,a)=>{$.ajax({url:d,method:t,dataType:"json",crossDomain:!0,headers:i.headers,xhrFields:{withCredentials:i.withCredentials},data:JSON.stringify(r),success:function(a,i,r){let n=r.status,o=r.statusText
s._addResult(t,n,o,a,d),a?e(new JsonapiDocument(a.data)):e()},error:function(t){console.error(`${t.status} ${t.statusText}: ${d}`),console.error(t),a(t)}})})}get(t,e){let a=t.data?t.data.type:t,s=t.data?t.data.id:e
return this.ajax("GET",`${a}/${s}`)}delete(t,e){let a=t.data?t.data.type:t,s=t.data?t.data.id:e
return this.ajax("DELETE",`${a}/${s}`)}post(t){return this.ajax("POST",t.data.type,t)}patch(t){return this.ajax("PATCH",`${t.data.type}/${t.data.id}`,t)}createDocument(t){return new JsonapiDocument(t)}}class JsonapiDocument{constructor(t){this.data=t||{},this.data.attributes||(this.data.attributes={}),this.data.relationships||(this.data.relationships={})}getType(){return this.data.type}setType(t){this.data.type=t}addAttributes(t){this.data.attributes=Object.assign(this.data.attributes,t)}removeAttributes(t){t.forEach(t=>{delete this.data.attributes[t]})}addRelationships(t){this.data.relationships=Object.assign(this.data.relationships,t)}removeRelationships(t){t.forEach(t=>{delete this.data.relationships[t]})}getId(){return this.data.id}setId(t){this.data.id=t}}