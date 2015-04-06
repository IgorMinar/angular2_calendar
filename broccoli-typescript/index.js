var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Filter = require('broccoli-filter');
var tss = require('typescript-simple');
var ts = require('typescript');
var tssCompiler = new tss.TypeScriptSimple({ target: ts.ScriptTarget.ES5, noImplicitAny: true, sourceMap: true });
var TypeScriptFilter = (function (_super) {
    __extends(TypeScriptFilter, _super);
    function TypeScriptFilter(inputTree, options) {
        if (options === void 0) { options = {}; }
        _super.call(this, inputTree, options);
        this.inputTree = inputTree;
        this.options = options;
        this.options = {
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS,
            allowNonTsExtensions: false
        };
        this.processString = function (str, relativePath) {
            var program = ts.createProgram([relativePath], this.options);
            return program.emit();
        };
        this.extensions = ['ts'];
        this.targetExtension = 'js';
    }
    return TypeScriptFilter;
})(Filter);
module.exports = TypeScriptFilter;
