var exports = module.exports = {};
var _ = require('lodash');
var moment = require('moment');

if (typeof window !== 'undefined') {
  window.surfAroundTheCornerShared = module.exports;
  window._ = _;
  window.moment = moment;
}
