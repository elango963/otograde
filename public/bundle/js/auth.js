/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/javascript/auth.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/javascript/auth.js":
/*!***********************************!*\
  !*** ./public/javascript/auth.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/utils */ \"./public/javascript/common/utils.js\");\n\n\nvar processLogin = function processLogin() {\n  $(\"#login\").on(\"submit\", function (e) {\n    e.preventDefault();\n    var $this = e.target;\n    var json = {};\n    console.info($($this).serializeArray());\n    $($this).serializeArray().map(function (input) {\n      json[Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__[\"snakeToCamel\"])(input[\"name\"])] = input[\"value\"];\n    });\n    Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__[\"ajax\"])(\"/ajax/login\", \"POST\", json, function (response) {\n      if (response.code == 200) {\n        window.location = \"/lead/create\";\n      }\n    }, function (error) {\n      alert(\"An error occoured\");\n    });\n  });\n};\n\nvar processRegister = function processRegister() {\n  $(\"#register\").on(\"submit\", function (e) {\n    e.preventDefault();\n    var $this = e.target;\n    var json = {};\n    console.info($($this).serializeArray());\n    $($this).serializeArray().map(function (input) {\n      json[Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__[\"snakeToCamel\"])(input[\"name\"])] = input[\"value\"];\n    });\n    Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__[\"ajax\"])(\"/ajax/register\", \"POST\", json, function (response) {\n      if (response.code == 200) {\n        window.location = \"/lead/create\";\n      }\n    }, function (error) {\n      alert(\"An error occoured\");\n    });\n  });\n};\n\nObject(_common_utils__WEBPACK_IMPORTED_MODULE_0__[\"initAjax\"])();\nprocessLogin();\nprocessRegister();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvamF2YXNjcmlwdC9hdXRoLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcHVibGljL2phdmFzY3JpcHQvYXV0aC5qcz9kYTkwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFqYXgsIHNuYWtlVG9DYW1lbCwgaW5pdEFqYXggfSBmcm9tIFwiLi9jb21tb24vdXRpbHNcIjtcclxuXHJcbmNvbnN0IHByb2Nlc3NMb2dpbiA9ICgpID0+IHtcclxuXHQkKFwiI2xvZ2luXCIpLm9uKFwic3VibWl0XCIsIChlKSA9PiB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRjb25zdCAkdGhpcyA9IGUudGFyZ2V0O1xyXG5cdFx0dmFyIGpzb24gPSB7fTtcclxuXHRcdGNvbnNvbGUuaW5mbygkKCR0aGlzKS5zZXJpYWxpemVBcnJheSgpKTtcclxuXHRcdCQoJHRoaXMpLnNlcmlhbGl6ZUFycmF5KCkubWFwKChpbnB1dCkgPT4ge1xyXG5cdFx0XHRqc29uW3NuYWtlVG9DYW1lbChpbnB1dFtcIm5hbWVcIl0pXSA9IGlucHV0W1widmFsdWVcIl07XHJcblx0XHR9KTtcclxuXHRcdGFqYXgoXCIvYWpheC9sb2dpblwiLCBcIlBPU1RcIiwganNvbiwgKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdGlmIChyZXNwb25zZS5jb2RlID09IDIwMCkge1xyXG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiL2xlYWQvY3JlYXRlXCI7XHJcblx0XHRcdH1cclxuXHRcdH0sIChlcnJvcikgPT4ge1xyXG5cdFx0XHRhbGVydChcIkFuIGVycm9yIG9jY291cmVkXCIpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHR9KTtcclxufTtcclxuXHJcbmNvbnN0IHByb2Nlc3NSZWdpc3RlciA9ICgpID0+IHtcclxuXHQkKFwiI3JlZ2lzdGVyXCIpLm9uKFwic3VibWl0XCIsIChlKSA9PiB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRjb25zdCAkdGhpcyA9IGUudGFyZ2V0O1xyXG5cdFx0dmFyIGpzb24gPSB7fTtcclxuXHRcdGNvbnNvbGUuaW5mbygkKCR0aGlzKS5zZXJpYWxpemVBcnJheSgpKTtcclxuXHRcdCQoJHRoaXMpLnNlcmlhbGl6ZUFycmF5KCkubWFwKChpbnB1dCkgPT4ge1xyXG5cdFx0XHRqc29uW3NuYWtlVG9DYW1lbChpbnB1dFtcIm5hbWVcIl0pXSA9IGlucHV0W1widmFsdWVcIl07XHJcblx0XHR9KTtcclxuXHRcdGFqYXgoXCIvYWpheC9yZWdpc3RlclwiLCBcIlBPU1RcIiwganNvbiwgKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdGlmIChyZXNwb25zZS5jb2RlID09IDIwMCkge1xyXG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiL2xlYWQvY3JlYXRlXCI7XHJcblx0XHRcdH1cclxuXHRcdH0sIChlcnJvcikgPT4ge1xyXG5cdFx0XHRhbGVydChcIkFuIGVycm9yIG9jY291cmVkXCIpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHR9KTtcclxufTtcclxuXHJcbmluaXRBamF4KCk7XHJcbnByb2Nlc3NMb2dpbigpO1xyXG5wcm9jZXNzUmVnaXN0ZXIoKTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./public/javascript/auth.js\n");

/***/ }),

/***/ "./public/javascript/common/utils.js":
/*!*******************************************!*\
  !*** ./public/javascript/common/utils.js ***!
  \*******************************************/
/*! exports provided: initAjax, ajax, ajaxUpload, snakeToCamel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initAjax\", function() { return initAjax; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ajax\", function() { return ajax; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ajaxUpload\", function() { return ajaxUpload; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"snakeToCamel\", function() { return snakeToCamel; });\nvar initAjax = function initAjax() {\n  $.ajaxSetup({\n    cache: true,\n    headers: {\n      \"X-CSRF-Token\": $(\"#csrfToken\").val()\n    }\n  });\n};\n\nvar ajax = function ajax(url) {\n  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"GET\";\n  var json = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  var cb = arguments.length > 3 ? arguments[3] : undefined;\n  $.ajax({\n    url: url,\n    method: method,\n    data: json,\n    success: function success(response) {\n      if (typeof cb === \"function\") cb(response);\n    },\n    error: function error(err) {\n      if (err.responseJSON && err.responseJSON.reload === true) window.location.reload();else if (typeof cb === \"function\") cb({\n        status: \"error\"\n      });\n    }\n  });\n};\n\nvar ajaxUpload = function ajaxUpload(url, formData, cb) {\n  $.ajax({\n    url: url,\n    method: \"POST\",\n    data: formData,\n    contentType: false,\n    processData: false,\n    success: function success(response) {\n      if (typeof cb === \"function\") cb(response);\n    },\n    error: function error(err) {\n      if (err.responseJSON && err.responseJSON.reload === true) window.location.reload();else if (typeof cb === \"function\") cb({\n        status: \"error\"\n      });\n    }\n  });\n};\n\nvar snakeToCamel = function snakeToCamel(str) {\n  return str.replace(/([-_][a-z])/g, function (group) {\n    return group.toUpperCase().replace('-', '').replace('_', '');\n  });\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvamF2YXNjcmlwdC9jb21tb24vdXRpbHMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvamF2YXNjcmlwdC9jb21tb24vdXRpbHMuanM/MGIzZCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbml0QWpheCA9ICgpID0+IHtcclxuXHQkLmFqYXhTZXR1cCh7XHJcblx0XHRjYWNoZTogdHJ1ZSxcclxuXHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XCJYLUNTUkYtVG9rZW5cIjogJChcIiNjc3JmVG9rZW5cIikudmFsKCksXHJcblx0XHR9LFxyXG5cdH0pO1xyXG59XHJcblxyXG5jb25zdCBhamF4ID0gKHVybCwgbWV0aG9kPVwiR0VUXCIsIGpzb249e30sIGNiKSA9PiB7XHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogdXJsLFxyXG5cdFx0bWV0aG9kOiBtZXRob2QsXHJcblx0XHRkYXRhOiBqc29uLFxyXG5cdFx0c3VjY2VzczogcmVzcG9uc2UgPT4ge1xyXG5cdFx0XHRpZiAodHlwZW9mIGNiID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0Y2IocmVzcG9uc2UpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yOiBlcnIgPT4ge1xyXG5cdFx0XHRpZiAoZXJyLnJlc3BvbnNlSlNPTiAmJiBlcnIucmVzcG9uc2VKU09OLnJlbG9hZCA9PT0gdHJ1ZSlcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBjYiA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdGNiKHsgc3RhdHVzOiBcImVycm9yXCIgfSk7XHJcblx0XHR9LFxyXG5cdH0pO1xyXG59O1xyXG5cclxuY29uc3QgYWpheFVwbG9hZCA9ICh1cmwsIGZvcm1EYXRhLCBjYikgPT4ge1xyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6IHVybCxcclxuXHRcdG1ldGhvZDogXCJQT1NUXCIsXHJcblx0XHRkYXRhOiBmb3JtRGF0YSxcclxuXHRcdGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuXHRcdHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuXHRcdHN1Y2Nlc3M6IHJlc3BvbnNlID0+IHtcclxuXHRcdFx0aWYgKHR5cGVvZiBjYiA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdGNiKHJlc3BvbnNlKTtcclxuXHRcdH0sXHJcblx0XHRlcnJvcjogZXJyID0+IHtcclxuXHRcdFx0aWYgKGVyci5yZXNwb25zZUpTT04gJiYgZXJyLnJlc3BvbnNlSlNPTi5yZWxvYWQgPT09IHRydWUpXHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgY2IgPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRjYih7IHN0YXR1czogXCJlcnJvclwiIH0pOyAgXHJcblx0XHR9LFxyXG5cdH0pO1xyXG59O1xyXG5cclxuY29uc3Qgc25ha2VUb0NhbWVsID0gKHN0cikgPT4gc3RyLnJlcGxhY2UoXHJcbiAgICAvKFstX11bYS16XSkvZyxcclxuICAgIChncm91cCkgPT4gZ3JvdXAudG9VcHBlckNhc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCctJywgJycpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ18nLCAnJylcclxuKTtcclxuXHJcbmV4cG9ydCB7XHJcblx0aW5pdEFqYXgsXHJcblx0YWpheCxcclxuXHRhamF4VXBsb2FkLFxyXG5cdHNuYWtlVG9DYW1lbFxyXG59OyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBZkE7QUFpQkE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBRkE7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./public/javascript/common/utils.js\n");

/***/ })

/******/ });