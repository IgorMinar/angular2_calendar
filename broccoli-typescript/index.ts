var Filter = require('broccoli-filter');
var ts = require('typescript');

class TypeScriptFilter extends Filter {

    constructor(public inputTree, public options = {}) {
        super(inputTree, options);
        this.extensions = ['ts'];
        this.targetExtension = 'js';
    }

    options: ts.CompilerOptions = {
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.CommonJS,
        allowNonTsExtensions: false
    };

    processString = function (str, relativePath) {
        var program = ts.createProgram([relativePath], this.options);
        return program.emit();
    };
}

module.exports = TypeScriptFilter;
