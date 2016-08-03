/// <reference path="../typings/index.d.ts" />

import * as path from "path";
import * as rjs from "requirejs";

var requirejs = require("requirejs-memfiles");

// https://github.com/requirejs/r.js/blob/master/build/example.build.js

export interface IRequireJsOptions {
    files: Array<IFile>
    optimize: Optimisers
    preserveLicenseComments: boolean
    generateSourceMaps: boolean
    appDir: string
    baseUrl: string
    dir: string
    keepBuildDir: boolean
    wrapShim: boolean
    locale: string // en-us
    modules: Array<IModule>
    skipDirOptimize: boolean
    // css options
    optimizeCss: CssOptimisers
    cssIn: string
    out: string | OutType
    cssPrefix: string
    inlineText: boolean //true
    useStrict: boolean //false
    namespace: string
    skipPragmas: boolean
    skipModuleInsertion: boolean
    removeCombined: boolean
    insertRequire: string
    wrap: boolean
    logLevel: LogLevels,
    onBuildRead: OnBuildReadWriteType
    onBuildWrite: OnBuildReadWriteType
    onModuleBundleComplete: OnModuleBundleCompleteType
//TODO https://github.com/requirejs/r.js/blob/master/build/example.build.js
    rawText: {
        'some/id': 'define(["another/id"], function () {});'
    },
}


type OnModuleBundleCompleteType = (data: any) =>void;

type OnBuildReadWriteType = (moduleName: string, path: string, contents: string) =>string;

type OutType = (text: string, sourceMap: string) => void;

export interface IModule {
    name: string
    create: boolean
    exclude: Array<string>
    excludeShallow: Array<string>
    include: Array<string>
    insertRequire: string
}

export interface IUglifyOutputOptions {
    beautify: boolean
}

export interface IUglifyCompressOptions {
    sequences: boolean
    dead_code: boolean
}

export interface IUglifyOptions {
    output: IUglifyOutputOptions
    compress: IUglifyCompressOptions
    warnings: boolean
    mangle: boolean
}

export interface IFile {
    path: string
    contents: string
}

type Optimisers = "none" | "uglify" | "uglify2"

type CssOptimisers = "none" | "standard" | "standard.keepLines" | "standard.keepComments" | "standard.keepComments.keepLines" | "standard.keepWhitespace"

enum LogLevels {
    TRACE = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    SILENT = 4
}

export class RequireJsOptions implements IRequireJsOptions {

    private _files: Array<IFile> = [];
    public get files(): Array<IFile> {
        return this._files;
    }
    public set files(v: Array<IFile>) {
        this._files = v;
    }

    private _optimise: string = "uglify2"
    public get optimise(): string {
        return this._optimise;
    }
    public set optimise(v: string) {
        this._optimise = v;
    }





    optimize: 'uglify2',

}

export class NetPackRequireJs {



    // constructor(options: IRequireJsOptions) {
    //     this.options = options || new RequireJsOptions();
    // }

    optimise(options: IRequireJsOptions, done: (message: string) => void): void {

        requirejs.optimize({
            optimize: 'uglify2',
            preserveLicenseComments: false,
            generateSourceMaps: true,
            appDir: appDir,
            baseUrl: baseUrl,
            dir: dir,
            modules: modules
        }, function () {
            // var output = inMemoryFiles["dist/output.js"];
            callback(null, inMemoryFiles);
            done();

        }, function (error) {
            // handle error
            callback(null, error);
            done();

        });

    }

    getStringFile(path: string): any {

        var filePath = path;
        var caseSensitive = this.useCaseSensitiveFileNames();
        var obj = this.sources;
        for (var propName in obj) {
            if (obj.hasOwnProperty(propName)) {

                if (!caseSensitive) {
                    if (propName.toLowerCase() == path.toLowerCase()) {
                        return obj[propName];
                    }
                }
                else {
                    if (propName == path) {
                        return obj[propName];
                    }
                }
            }
        }

        return undefined;
    }

    // Implementing CompilerHost interface
    getSourceFile(filename: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void): ts.SourceFile {

        var file = this.getStringFile(filename);
        if (file) {
            return ts.createSourceFile(filename, file, languageVersion, true);
        }

        if (path.normalize(filename) === this.getDefaultLibFileName())
            return this.readFromFile(filename, languageVersion, onError);

        if (this._fallbackToFiles)
            return this.readFromFile(filename, languageVersion, onError);

        return undefined;
    }

    readFile(fileName: string): string {

        var file = this.getStringFile(fileName);

        if (file) {
            return file;
        }

        if (path.normalize(fileName) === this.getDefaultLibFileName())
            return ts.sys.readFile(path.normalize(fileName));

        return "";
    }

    writeFile(filename: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void) {
        this.outputs[filename] = data;
    };

    fileExists(path: string): boolean {
        var file = this.getStringFile(path);
        if (file) {
            return true;
        }
        return false;
    }

    getNewLine = (): string => ts.sys.newLine;

    useCaseSensitiveFileNames(): boolean {
        return ts.sys.useCaseSensitiveFileNames;
    }

    getCurrentDirectory(): string {
        return ""; //ts.sys.getCurrentDirectory();
    }

    getDefaultLibFileName(): string {
        var libFile = path.normalize(ts.getDefaultLibFilePath(this.options));
        return libFile;
    }

    getCanonicalFileName(fileName: string): string {
        // if underlying system can distinguish between two files whose names differs only in cases then file name already in canonical form.
        // otherwise use toLowerCase as a canonical form.
        return ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
    }

    // Helper functions
    private readFromFile(filename: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void): ts.SourceFile {
        try {
            var text = ts.sys.readFile(path.normalize(filename));
        }
        catch (e) {
            if (onError) {
                onError(e.message);
            }

            text = "";
        }
        return text !== undefined ? ts.createSourceFile(filename, text, languageVersion, this._setParentNode) : undefined;
    }


    addSource(contents: string);
    addSource(name: string, contents: string);
    addSource(nameOrContents, contents?): void {
        var source;

        if (typeof contents == 'undefined')
            source = new StringSource(nameOrContents);
        else
            source = new StringSource(contents, nameOrContents);

        this.sources[source.fileName] = source.contents;
    }


    getSourcesFilenames(): string[] {
        var keys = [];
        var sources = this.sources;
        for (var k in sources)
            if (sources.hasOwnProperty(k))
                keys.push(k);

        return keys;
    }

}

export interface ISource {
    fileName?: string;
    contents?: string;
}

export class StringSource implements ISource {
    private static _counter = 0;

    constructor(public contents: string, public fileName: string = StringSource._nextFilename()) {
    }

    private static _nextFilename() {
        return "input_string" + (++StringSource._counter) + '.ts';
    }

    resetCounter() {
        StringSource._counter = 0;
    }
}

export interface ICompilationResult {
    sources: { [index: string]: string };
    errors: string[];
}

export default class NetPackTypescriptCompiler {

    compileStrings(input, tscArgs?, options?: ts.CompilerOptions, onError?: (message) => void): ICompilationResult {

        var host = new TypescriptCompilerHost(options);

        var sources = [];

        if (Array.isArray(input) && input.length) {
            // string[]
            if (typeof input[0] == 'string') {
                sources.push(new StringSource(input[0])); // ts.map<string, StringSource>(input, );
            }
            // Source[]
            else if (input[0] instanceof StringSource) {
                sources.concat(input);
            } else
                throw new Error('Invalid value for input argument');
        }
        // dictionary
        else if (typeof input == 'object') {
            for (var k in input) if (input.hasOwnProperty(k))
                sources.push(new StringSource(input[k], k));
        }
        else
            throw new Error('Invalid value for input argument')

        return this._compile(host, sources, tscArgs, options, onError);
    }

    _compile(host: TypescriptCompilerHost, sources: ISource[], tscArgs: string, options?: ts.CompilerOptions, onError?: (message) => void);
    _compile(host: TypescriptCompilerHost, sources: ISource[], tscArgs: string[], options?: ts.CompilerOptions, onError?: (message) => void);
    _compile(host: TypescriptCompilerHost, sources: ISource[], tscArgs?, options?: ts.CompilerOptions, onError?: (message) => void): ICompilationResult {

        if (typeof tscArgs == "string")
            tscArgs = tscArgs.split(' ');
        else
            tscArgs = tscArgs || [];

        var commandLine = ts.parseCommandLine(tscArgs);
        var files;


        sources.forEach(s => host.addSource(s.fileName, s.contents));
        files = host.getSourcesFilenames();

        var program = ts.createProgram(files, commandLine.options, host);

        let emitResult = program.emit();
        let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

        let errors = [];
        allDiagnostics.forEach(diagnostic => {
            let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            errors.push({
                "File": diagnostic.file.fileName,
                "Line": line + 1,
                "Char": character + 1,
                "Message": message
            });
        });

        if (errors.length > 0) {
            forwardErrors(errors, onError);
        }

        return {
            sources: host.outputs,
            errors: errors
        };

        function forwardErrors(errors, onError) {
            if (typeof onError == 'function') {
                errors.forEach(e => {
                    onError(e);
                });
            }
        }
    }

}



