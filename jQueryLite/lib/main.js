var DOMNodeCollection = require('./dom_node_collection');

window.$l = function (selector) {
  if (selector instanceof Function) {
    window.queue = window.queue || [];
    window.queue.push(selector);

    if(document.readyState === "complete") {
      window.queue.forEach( function(fn) {
        return fn();
      });
    }
    else {
      window.addEventListener("load", function () {
        window.queue.forEach( function(fn) {
          return fn();
        });
      });
    }
  } else {
    if (selector instanceof HTMLElement){
      return new DOMNodeCollection([selector]);
    }
    return new DOMNodeCollection([].slice.call(document.querySelectorAll(selector)));
  }
};

window.$l.ajax = function (options) {
  var defaults = {
    success: function(data) { console.log(data); },
    error: function() { console.error("error"); },
    url: "http://api.openweathermap.org",
    method: "GET",
    data: "/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
  };

  for (var attrname in options) {
    defaults[attrname] = options[attrname];
  }

  var xhr = new XMLHttpRequest();

  xhr.open(defaults.method, defaults.url+defaults.data);

  xhr.onload = function () {
    console.log(xhr.status); // for status info
    console.log(xhr.responseType); //the type of data that was returned
    console.log(xhr.response); //the actual response. For json api calls, this will be a json string
  };

  xhr.send();

};


// window.$l(function (){
//   for(var i = 0; i < 100000; i++) {
//     console.log(window.$l("li").parent());
//   }
//
//   alert("hello");
// });
