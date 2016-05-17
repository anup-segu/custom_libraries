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
