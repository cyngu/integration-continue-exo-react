"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _webVitals = require("web-vitals");
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    (0, _webVitals.getCLS)(onPerfEntry);
    (0, _webVitals.getFID)(onPerfEntry);
    (0, _webVitals.getFCP)(onPerfEntry);
    (0, _webVitals.getLCP)(onPerfEntry);
    (0, _webVitals.getTTFB)(onPerfEntry);
  }
};
var _default = exports.default = reportWebVitals;