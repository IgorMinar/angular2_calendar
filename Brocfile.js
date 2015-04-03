var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var typescriptCompiler = require('./broccoli-typescript');
var babelTranspiler = require('broccoli-babel-transpiler');
var traceurCompiler = require('broccoli-traceur');
var stew = require('broccoli-stew');


var appScripts = new Funnel('app', {
    srcDir: '',
    include: ['**/*.js', '**/*.ts'],
    destDir: '/'
});
//appScripts = stew.log(appScripts, { output: 'tree', label: 'appScripts' })

var appAssets =  new Funnel('app', {
    include: ['**/*.html'],

    // TODO(i): temporarily rename index.html to index-debug.html so that directory listing is served at /
    getDestinationPath: function(relativePath) {
        return relativePath === 'index.html' ? 'index-debug.html' : relativePath;
    }
});
//appAssets = stew.log(appAssets, { output: 'tree', label: 'appAssets' })


var lodash = new Funnel('node_modules/lodash', {
    srcDir: '/',
    destDir: '/vendor/lodash'
});
//lodash = stew.log(lodash, { output: 'tree', label: 'lodash' })


var systemjs = new Funnel('node_modules/systemjs', {
    srcDir: '/dist/',
    destDir: '/vendor/systemjs'
});
//systemjs = stew.log(systemjs, { output: 'tree', label: 'systemjs' })

var es6ModuleLoader = new Funnel('node_modules/es6-module-loader', {
    srcDir: '/dist/',
    destDir: '/vendor/systemjs'
});

var zonejs = new Funnel('node_modules/zone.js', {
    destDir: '/vendor/zone.js'
});

var traceurDeps = new Funnel('node_modules/traceur', {
    srcDir: '/bin/',
    destDir: '/vendor/traceur'
});

var rttsAsserts = new Funnel('node_modules/rtts_assert/', {
    srcDir: '/',
    destDir: '/vendor/rtts_assert'
});

var rx = new Funnel('node_modules/rx', {
    destDir: '/vendor/rx'
});


var es6SuffixRexexp = /(.+)\.es6/;

function angularES6(prodOrDev) {
  return new Funnel('node_modules/angular2', {
    srcDir: '/es6/' + prodOrDev + '/',
    include: ['**/*.es6', '**/*.map'],
    destDir: '/vendor/angular2',
    getDestinationPath: function(relativePath) {
        if (es6SuffixRexexp.test(relativePath)) {
            relativePath = relativePath.replace(es6SuffixRexexp, '$1.js');
        }

        return relativePath;
    }
  });
}


var DEV = false;

var angularES6Prod = angularES6('prod');
var angularES6Dev = angularES6('dev');

var vendorDeps = [lodash, systemjs, zonejs, es6ModuleLoader, traceurDeps, rx];

var vendorFilesProd = mergeTrees(vendorDeps);
var vendorFilesDev = mergeTrees(vendorDeps.concat([rttsAsserts]));

var es5Files = traceurCompiler(mergeTrees([appScripts, DEV ? angularES6Dev : angularES6Prod]), {
    annotations: true,
    memberVariables: true,
    typeAssertions: false,
    types: true,
    modules: 'instantiate'
});

module.exports = mergeTrees([es5Files, appAssets, DEV ? vendorFilesDev : vendorFilesProd]);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
 var _COMPILER_CONFIG_JS_DEFAULT = {
 sourceMaps: true,
 annotations: true, // parse annotations
 types: true, // parse types
 script: false, // parse as a module
 memberVariables: true, // parse class fields
 modules: 'instantiate'
 };
 */

//var es5 = traceurTranspiler(mergeTrees([appScripts, angularES6]), {
//    sourceMaps: true,
//    //annotations: true,
//    //memberVariables: true,
//    typeAssertions: false,
//    types: true,
//    modules: instantiate
//});


//var testsES6 = pickFiles('tests', {
//    srcDir: '/',
//    files: ['**/*.js'],
//    destDir: '/tests'
//});

//var scripts = esTranspiler(mergeTrees([srcES6, angular]), {
//    sourceMap: 'inline',
//    modules: 'amd',
//    moduleIds: true
//});


//var angularBabel = babelTranspiler(angularES6, {
//    sourceMap: 'inline',
//    modules: 'system',
//    moduleIds: true
//});
//angularBabel = stew.rename(angularBabel, 'vendor/angular', 'vendor/angular-babel');
