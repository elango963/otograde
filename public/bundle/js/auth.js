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
/*! exports provided: initAjax, ajax, snakeToCamel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initAjax\", function() { return initAjax; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ajax\", function() { return ajax; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"snakeToCamel\", function() { return snakeToCamel; });\nvar initAjax = function initAjax() {\n  $.ajaxSetup({\n    cache: true,\n    headers: {\n      \"X-CSRF-Token\": $(\"#csrfToken\").val()\n    }\n  });\n};\nvar ajax = function ajax(url, method, data) {\n  var successCallBack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};\n  var errorCallBack = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};\n  $.ajax({\n    url: url,\n    data: method.toLowerCase() == 'post' ? JSON.stringify(data) : data,\n    method: method,\n    dataType: \"json\",\n    contentType: \"application/json\",\n    success: function success(response) {\n      successCallBack(response);\n    },\n    error: function error(_error) {\n      errorCallBack(_error);\n    }\n  });\n};\nvar snakeToCamel = function snakeToCamel(str) {\n  return str.replace(/([-_][a-z])/g, function (group) {\n    return group.toUpperCase().replace('-', '').replace('_', '');\n  });\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvamF2YXNjcmlwdC9jb21tb24vdXRpbHMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvamF2YXNjcmlwdC9jb21tb24vdXRpbHMuanM/MGIzZCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgaW5pdEFqYXggPSAoKSA9PiB7XHJcblx0JC5hamF4U2V0dXAoe1xyXG5cdFx0Y2FjaGU6IHRydWUsXHJcblx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFwiWC1DU1JGLVRva2VuXCI6ICQoXCIjY3NyZlRva2VuXCIpLnZhbCgpLFxyXG5cdFx0fSxcclxuXHR9KTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGFqYXggPSAodXJsLCBtZXRob2QsIGRhdGEsIHN1Y2Nlc3NDYWxsQmFjayA9ICgpID0+IHt9LCBlcnJvckNhbGxCYWNrID0gKCkgPT4ge30pID0+IHtcclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiB1cmwsXHJcblx0XHRkYXRhOiBtZXRob2QudG9Mb3dlckNhc2UoKSA9PSAncG9zdCcgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IGRhdGEsXHJcblx0XHRtZXRob2Q6IG1ldGhvZCxcclxuXHRcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdHN1Y2Nlc3M6IChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRzdWNjZXNzQ2FsbEJhY2socmVzcG9uc2UpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0ZXJyb3JDYWxsQmFjayhlcnJvcik7XHJcblx0XHR9XHJcblx0fSlcclxufTtcclxuXHJcblxyXG5leHBvcnQgY29uc3Qgc25ha2VUb0NhbWVsID0gKHN0cikgPT4gc3RyLnJlcGxhY2UoXHJcbiAgICAvKFstX11bYS16XSkvZyxcclxuICAgIChncm91cCkgPT4gZ3JvdXAudG9VcHBlckNhc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCctJywgJycpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ18nLCAnJylcclxuKTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFYQTtBQWFBO0FBR0E7QUFBQTtBQUVBO0FBQUE7QUFGQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./public/javascript/common/utils.js\n");

/***/ })

/******/ });