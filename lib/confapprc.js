/*!
 * confapprc - lib/confapprc.js
 * Copyright(c) 2016 plcgi1 <plcgi1@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var fs = require('fs');
var hash = require('hashish');

'use strict';

/**
 * Read .apprc file to memory.Replace all {} from public.json to values from private.json
 * @param {object}
 *
 *      var rc = require('confapprc');
 *      var config = parse({ private : PATH-TO-PRIVATE-CONFIG.json, public : PATH-TO-PUBLIC.json })
 *      
 * @return {Object}
 * @api public
 */

module.exports.parse = function (options) {
  options = options || {};
  if(typeof options.public !== 'string') {
      throw new Error(__filename + ": argument 'options.public' must be a string");
  }
  if(typeof options.private !== 'string') {
      throw new Error(__filename + ": argument 'options.private' must be a string");
  }
  var priv;
  var pub;
  
  try {
    priv = JSON.parse(fs.readFileSync(options.private, 'utf8'));
    pub  = JSON.parse(fs.readFileSync(options.public, 'utf8'));
  } catch(e) {
    throw new Error('confapprc error:' + e);
  }
  
  hash.map(pub,function(key){
    console.log(key);
    if (  pub[key] && typeof pub[key] === 'string' && pub[key].match(/^\{[\d\w]+}$/) ) {
        // get value, trim {}
        var val = pub[key].replace(/^{([\d\w]+)}$/,'$1');
        pub[key] = priv[val];
    }
  });
  return pub;
}