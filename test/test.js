var apprc = require('../index');
var conf = apprc.parse({ public : __dirname+'/public.json', private : __dirname+'/private.json' });
console.log(conf);