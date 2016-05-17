/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DOMNodeCollection = __webpack_require__(1);
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var DOMNodeCollection = function(arr){
	  this.htmlElements = arr;
	};
	
	DOMNodeCollection.prototype.html = function (str) {
	  if (str) {
	    this.htmlElements.forEach( function(el) {
	      el.innerHTML = str;
	    });
	  } else {
	    return this.htmlElements[0].innerHTML;
	  }
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  this.htmlElements.forEach( function(el) {
	    el.innerHTML = "";
	  });
	};
	
	DOMNodeCollection.prototype.append = function (element) {
	  if (element instanceof DOMNodeCollection) {
	    var fn = this;
	    element.htmlElements.forEach( function(htmlEl) {
	      fn.htmlElements.forEach( function(el) {
	        el.innerHTML += htmlEl.outerHTML;
	      });
	    });
	  } else{
	      if (element instanceof HTMLElement){
	        element = element.outerHTML;
	      }
	
	      this.htmlElements.forEach( function(el) {
	        el.innerHTML += element;
	      });
	    }
	};
	
	DOMNodeCollection.prototype.attr = function (attrName, attrVal) {
	  if(attrVal){
	    this.htmlElements.forEach( function(el) {
	      // var name = document.createAttribute(attrName);
	      el.setAttribute(attrName, attrVal);
	    });
	  } else{
	    var attribute = null;
	    this.htmlElements.forEach( function(el){
	      if (el.getAttribute(attrName)) {
	        attribute = el.getAttribute(attrName);
	        return;
	      }
	    });
	    return attribute;
	  }
	};
	
	DOMNodeCollection.prototype.addClass = function (klass) {
	  this.htmlElements.forEach( function(el) {
	    var classes = el.className.split(" ");
	
	    if (classes.indexOf(klass) === -1) {
	      classes.push(klass);
	    }
	
	    if (classes[0] === "") {
	      classes = classes.slice(1);
	    }
	
	    el.className = classes.join(" ");
	  });
	};
	
	DOMNodeCollection.prototype.removeClass = function (klass) {
	  this.htmlElements.forEach( function(el) {
	    var classes = el.className.split(" ");
	    var klassIndex = classes.indexOf(klass);
	
	    if ( klassIndex !== -1) {
	      classes.splice(klassIndex, 1);
	    }
	
	    if (classes[0] === "") {
	      classes = classes.slice(1);
	    }
	
	    el.className = classes.join(" ");
	  });
	
	};
	
	DOMNodeCollection.prototype.find = function (selector) {
	  var kids = [];
	  var queue = this.htmlElements;
	
	  while (queue.length > 0){
	    [].slice.call(queue[0].children).forEach(function(el){
	      queue.push(el);
	      kids.push(el);
	    });
	    queue.shift();
	  }
	
	  if (selector instanceof HTMLElement){
	    selector = selector.outerHTML;
	  }
	
	  var rightKids = [];
	
	  kids.forEach( function(kid) {
	    if (kid.localName === selector) {
	      rightKids.push(kid);
	    }
	  });
	
	  return new DOMNodeCollection(rightKids);
	};
	
	DOMNodeCollection.prototype.parent = function () {
	  var parents = [];
	  this.htmlElements.forEach( function(el) {
	    parents.push(el.parentElement);
	  });
	
	  return new DOMNodeCollection(parents);
	};
	
	DOMNodeCollection.prototype.children = function () {
	  var kids = [];
	  this.htmlElements.forEach( function(el) {
	    [].slice.call(el.children).forEach(function (child) {
	      kids.push(child);
	    });
	  });
	
	  return new DOMNodeCollection(kids);
	};
	
	DOMNodeCollection.prototype.remove = function (selector) {
	  if (selector) {
	    this.find(selector).htmlElements.forEach( function(el) {
	      el.outerHTML = "";
	    });
	  } else {
	    this.htmlElements.forEach( function(el) {
	      el.outerHTML = "";
	    });
	  }
	};
	
	DOMNodeCollection.prototype.on = function (event, callback) {
	  this.htmlElements.forEach(function(el) {
	    el.addEventListener(event, callback);
	  });
	};
	
	DOMNodeCollection.prototype.off = function (event, callback) {
	  this.htmlElements.forEach(function(el) {
	    el.removeEventListener(event, callback);
	  });
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map