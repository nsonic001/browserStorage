(function() {

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self === 'object' && self.self === self && self ||
    typeof global === 'object' && global.global === global && global ||
    this;


  // Create a safe reference to the Underscore object for use below.
  var browserStorage = function(obj) {
    if (obj instanceof browserStorage) return obj;
    if (!(this instanceof browserStorage)) return new browserStorage(obj);
    this._wrapped = obj;
  };
  var storage = window.localStorage,
    cookie = document.cookie,
    nativeIsArray = Array.isArray,
    nativeKeys = Object.keys;
  var run = storage;
  var isDefined = function(obj) {
    return (obj !== null && obj !== undefined);
  };
  var isString = function(obj) {
    return typeof obj === 'string';
  };
  var isObject = function(obj) {
    return typeof obj === 'object';
  };
  var isBoolean = function(obj) {
    return typeof obj === 'boolean';
  };
  var isNumber = function(obj) {
    return typeof obj === 'number';
  };
  var isFunction = function(obj) {
    return typeof obj === 'function';
  };
  var isEmpty = function(obj) {
    return !isDefined(obj) ? true : (obj instanceof Date ? false : (function(obj) {
      return nativeIsArray(obj) ? obj.length === 0 : (isObject(obj) ? nativeKeys(obj).length === 0 : (isString(obj) ? obj.trim().length === 0 : ((isBoolean(obj) || isNumber(obj) || isFunction(obj) ? false : false))));
    })(obj));
  };
  root.browserStorage = run ? browserStorage : null;

  browserStorage.suffix = ':browserStorage';
  var getSuffix = function() {
    return browserStorage.suffix;
  };
  browserStorage.setCookie = function(cName, cValue, exDays, cPath) {
    var d = new Date();
    d.setTime(d.getTime() + (exDays ? (exDays * 24 * 60 * 60 * 1000) : (24 * 60 * 60 * 1000)));
    var expires = "expires=" + d.toUTCString();
    var path = (cPath) ? "path=" + cPath : "path=/";
    cookie = cName + "=" + cValue + "; " + expires + ";" + path;
  };
  browserStorage.getCookie = function(cName) {
    var name = cName + "=";
    var ca = cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0).trim().length === 0) {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  browserStorage.checkCookie = function(cName) {
    var cookieName = browserStorage.getCookie(cName),
      cookieFound;
    if (cookieName !== "") {
      cookieFound = true;
    } else {
      cookieFound = false;
    }
    return cookieFound;
  };

  browserStorage.removeCookie = function(name) {
    cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };
  browserStorage.set = function(cName, dValue, exDays) {
    if (run) {
      if (!isString(cName) || isEmpty(cName))
        return new Error('name cannot be blank');
      // if (isEmpty(dValue))
      // return new Error('value cannot be blank');
      var sName = cName + getSuffix();
      var sValue = JSON.stringify({ data: dValue });
      exDays = (!isEmpty(exDays) && isNumber(exDays) && exDays > 0) ? exDays : 1;
      browserStorage.setCookie(cName, sName, exDays);
      if (!isEmpty(storage.getItem(sName)))
        storage.removeItem(sName);
      storage.setItem(sName, sValue);
      return true;
    }
    return new Error('some utitlity is missing');
  };
  var checkRemove = function(cName) {
    var rName = cName + getSuffix();
    if (!isEmpty(storage.getItem(rName)))
      storage.removeItem(rName);
    if (!isEmpty(browserStorage.getCookie(cName)))
      browserStorage.removeCookie(cName);
    return;
  };
  browserStorage.get = function(cName) {
    if (run) {
      if (!isString(cName) || isEmpty(cName))
        return new Error('name should be string');
      var sName = browserStorage.getCookie(cName);
      if (isEmpty(sName)) {
        var rName = cName + getSuffix();
        checkRemove(cName);
        return null;
      }
      var sValue = storage.getItem(sName);
      if (isEmpty(sValue))
        return null;
      var dValue;
      try {
        dValue = JSON.parse(sValue);
      } catch (e) {
        checkRemove(cName);
        return null;
      }
      if (dValue.data)
        return dValue.data;
    }
    return null;
  };
  browserStorage.check = function(cName) {
    browserStorage.get(cName);
  };

  browserStorage.remove = function(cName) {
    checkRemove(cName);
    return true;
  };
  browserStorage.removeAll = function() {
    storage.clear();
    return true;
  };
})();
