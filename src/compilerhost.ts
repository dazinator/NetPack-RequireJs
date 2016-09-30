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
//Introduced in 2.1.3: Seed raw text contents for the listed module IDs.
    //These text contents will be used instead of doing a file IO call for
    //those modules. Useful if some module ID contents are dynamically
    //based on user input, which is common in web build tools.
    rawText: any
    
  //  {
    //    'some/id': 'define(["another/id"], function () {});'
    //},
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

    private _optimize: Optimisers = "uglify2"
    public get optimize(): Optimisers {
        return this._optimize;
    }
    public set optimize(v: Optimisers) {
        this._optimize = v;
    }

    private _preserveLicenseComments: boolean = false
    public get preserveLicenseComments(): boolean {
        return this._preserveLicenseComments;
    }
    public set preserveLicenseComments(v: boolean) {
        this._preserveLicenseComments = v;
    }
    
    private _generateSourceMaps : boolean = true;
    public get generateSourceMaps() : boolean {
        return this._generateSourceMaps;
    }
    public set generateSourceMaps(v : boolean) {
        this._generateSourceMaps = v;
    }

   
   private _appDir : string;
   public get appDir() : string {
       return this._appDir;
   }
   public set appDir(v : string) {
       this._appDir = v;
   }

   
   private _baseUrl : string;
   public get baseUrl() : string {
       return this._baseUrl;
   }
   public set baseUrl(v : string) {
       this._baseUrl = v;
   }

   
   private _dir : string;
   public get dir() : string {
       return this._dir;
   }
   public set dir(v : string) {
       this._dir = v;
   }
   
   
   private _keepBuildDir : boolean;
   public get keepBuildDir() : boolean {
       return this._keepBuildDir;
   }
   public set keepBuildDir(v : boolean) {
       this._keepBuildDir = v;
   }
   

   
   private _wrapShim : boolean;
   public get wrapShim() : boolean {
       return this._wrapShim;
   }
   public set wrapShim(v : boolean) {
       this._wrapShim = v;
   }
   
   
   private _locale : string;
   public get locale() : string {
       return this._locale;
   }
   public set locale(v : string) {
       this._locale = v;
   }
   
   
   private _modules : Array<IModule> = new Array<IModule>();
   public get modules() : Array<IModule> {
       return this._modules;
   }
   public set modules(v : Array<IModule>) {
       this._modules = v;
   }
   


private _skipDirOptimize : boolean;
public get skipDirOptimize() : boolean {
    return this._skipDirOptimize;
}
public set skipDirOptimize(v : boolean) {
    this._skipDirOptimize = v;
}


// css options
private _optimizeCss : CssOptimisers = "standard";
public get optimizeCss() : CssOptimisers {
    return this._optimizeCss;
}
public set optimizeCss(v : CssOptimisers) {
    this._optimizeCss = v;
}


private _cssIn : string;
public get cssIn() : string {
    return this._cssIn;
}
public set cssIn(v : string) {
    this._cssIn = v;
}


private _out : string | OutType;
public get out() : string | OutType {
    return this._out;
}
public set out(v : string | OutType) {
    this._out = v;
}


private _cssPrefix : string;
public get cssPrefix() : string {
    return this._cssPrefix;
}
public set cssPrefix(v : string) {
    this._cssPrefix = v;
}


private _inlineText : boolean = true;
public get inlineText() : boolean {
    return this._inlineText;
}
public set inlineText(v : boolean) {
    this._inlineText = v;
}


private _useStrict : boolean = false;
public get useStrict() : boolean {
    return this._useStrict;
}
public set useStrict(v : boolean) {
    this._useStrict = v;
}


private _namespace : string;
public get namespace() : string {
    return this._namespace;
}
public set namespace(v : string) {
    this._namespace = v;
}


private _skipPragmas : boolean;
public get skipPragmas() : boolean {
    return this._skipPragmas;
}
public set skipPragmas(v : boolean) {
    this._skipPragmas = v;
}


private _skipModuleInsertion : boolean;
public get skipModuleInsertion() : boolean {
    return this._skipModuleInsertion;
}
public set skipModuleInsertion(v : boolean) {
    this._skipModuleInsertion = v;
}



private _removeCombined : boolean;
public get removeCombined() : boolean {
    return this._removeCombined;
}
public set removeCombined(v : boolean) {
    this._removeCombined = v;
}


private _insertRequire : string;
//If the target module only calls define and does not call require() at the
    //top level, and this build output is used with an AMD shim loader like
    //almond, where the data-main script in the HTML page is replaced with just
    //a script to the built file, if there is no top-level require, no modules
    //will execute. specify insertRequire to have a require([]) call placed at
    //the end of the file to trigger the execution of modules. More detail at
    //https://github.com/requirejs/almond
    //Note that insertRequire does not affect or add to the modules that are
    //built into the build bundle. It just adds a require([]) call to the end
    //of the built file for use during the runtime execution of the built code.
public get insertRequire() : string {
    return this._insertRequire;
}
public set insertRequire(v : string) {
    this._insertRequire = v;
}


private _wrap : boolean;
public get wrap() : boolean {
    return this._wrap;
}
public set wrap(v : boolean) {
    this._wrap = v;
}

private _logLevel : LogLevels;
public get logLevel() : LogLevels {
    return this._logLevel;
}
public set logLevel(v : LogLevels) {
    this._logLevel = v;
}

private _onBuildRead : OnBuildReadWriteType;
public get onBuildRead() : OnBuildReadWriteType {
    return this._onBuildRead;
}
public set onBuildRead(v : OnBuildReadWriteType) {
    this._onBuildRead = v;
}

private _onBuildWrite : OnBuildReadWriteType;
public get onBuildWrite() : OnBuildReadWriteType {
    return this._onBuildWrite;
}
public set onBuildWrite(v : OnBuildReadWriteType) {
    this._onBuildWrite = v;
}

private _onModuleBundleComplete : OnModuleBundleCompleteType;
public get onModuleBundleComplete() : OnModuleBundleCompleteType {
    return this._onModuleBundleComplete;
}
public set onModuleBundleComplete(v : OnModuleBundleCompleteType) {
    this._onModuleBundleComplete = v;
}

private _rawText : any;
//Introduced in 2.1.3: Seed raw text contents for the listed module IDs.
    //These text contents will be used instead of doing a file IO call for
    //those modules. Useful if some module ID contents are dynamically
    //based on user input, which is common in web build tools.
    // e.g {
    //     'some/id': 'define(["another/id"], function () {});'
    //     },
public get rawText() : any {
    return this._rawText;
}
public set rawText(v : any) {
    this._rawText = v;
}

  
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
            appDir: "",
            baseUrl: "",
            dir: "",
            modules: null
        }, function () {
            // var output = inMemoryFiles["dist/output.js"];
            //callback(null, inMemoryFiles);
           // done();

        }, function (error) {
            // handle error
          //  callback(null, error);
          //  done();

        });

    }

}

   



