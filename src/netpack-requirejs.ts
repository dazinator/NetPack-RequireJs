/// <reference path="../typings/index.d.ts" />

import * as path from "path";
import * as rjs from "requirejs";

var requirejs = require("requirejs-memfiles");

// https://github.com/requirejs/r.js/blob/master/build/example.build.js

export interface IRequireJsOptions {
    //The top level directory that contains your app. If this option is used
    //then it assumed your scripts are in a subdirectory under this path.
    //This option is not required. If it is not specified, then baseUrl
    //below is the anchor point for finding things. If this option is specified,
    //then all the files from the app directory will be copied to the dir:
    //output area, and baseUrl will assume to be a relative path under
    //this directory.
    appDir: string
    //By default, all modules are located relative to this path. If baseUrl
    //is not explicitly set, then all modules are loaded relative to
    //the directory that holds the build file. If appDir is set, then
    //baseUrl should be specified as relative to the appDir.
    baseUrl: string

    //By default all the configuration for optimization happens from the command
    //line or by properties in the config file, and configuration that was
    //passed to requirejs as part of the app's runtime "main" JS file is *not*
    //considered. However, if you prefer the "main" JS file configuration
    //to be read for the build so that you do not have to duplicate the values
    //in a separate configuration, set this property to the location of that
    //main JS file. The first requirejs({}), require({}), requirejs.config({}),
    //or require.config({}) call found in that file will be used.
    //As of 2.1.10, mainConfigFile can be an array of values, with the last
    //value's config take precedence over previous values in the array.
    mainConfigFile: string

    /// Allows the script file paths and contents to be sourced from this array (in memory)
    // rather than disk IO calls.
    files: Array<IFile>


    //The directory path to save the output. If not specified, then
    //the path will default to be a directory called "build" as a sibling
    //to the build file. All relative paths are relative to the build file.
    dir: string


    //As of RequireJS 2.0.2, the dir above will be deleted before the
    //build starts again. If you have a big build and are not doing
    //source transforms with onBuildRead/onBuildWrite, then you can
    //set keepBuildDir to true to keep the previous dir. This allows for
    //faster rebuilds, but it could lead to unexpected errors if the
    //built code is transformed in some way.
    keepBuildDir: boolean

    //As of 2.1.11, shimmed dependencies can be wrapped in a define() wrapper
    //to help when intermediate dependencies are AMD have dependencies of their
    //own. The canonical example is a project using Backbone, which depends on
    //jQuery and Underscore. Shimmed dependencies that want Backbone available
    //immediately will not see it in a build, since AMD compatible versions of
    //Backbone will not execute the define() function until dependencies are
    //ready. By wrapping those shimmed dependencies, this can be avoided, but
    //it could introduce other errors if those shimmed dependencies use the
    //global scope in weird ways, so it is not the default behavior to wrap.
    //To use shim wrapping skipModuleInsertion needs to be false.
    //More notes in http://requirejs.org/docs/api.html#config-shim
    wrapShim: boolean

    //Used to inline i18n resources into the built file. If no locale
    //is specified, i18n resources will not be inlined. Only one locale
    //can be inlined for a build. Root bundles referenced by a build layer
    //will be included in a build layer regardless of locale being set.
    locale: string // en-us

    //How to optimize all the JS files in the build output directory. 
    //Right now only the following values
    //are supported:
    //- "uglify": (default) uses UglifyJS to minify the code. Before version
    //2.2, the uglify version was a 1.3.x release. With r.js 2.2, it is now
    //a 2.x uglify release.
    //- "uglify2": in version 2.1.2+. Uses UglifyJS2. As of r.js 2.2, this
    //is just an alias for "uglify" now that 2.2 just uses uglify 2.x.
    //- "closure": uses Google's Closure Compiler in simple optimization
    //mode to minify the code. Only available if running the optimizer using
    //Java.
    //- "closure.keepLines": Same as closure option, but keeps line returns
    //in the minified files.
    //- "none": no minification will be done.
    optimize: Optimisers

    //Introduced in 2.1.2: If using "dir" for an output directory, normally the
    //optimize setting is used to optimize the build bundles (the "modules"
    //section of the config) and any other JS file in the directory. However, if
    //the non-build bundle JS files will not be loaded after a build, you can
    //skip the optimization of those files, to speed up builds. Set this value
    //to true if you want to skip optimizing those other non-build bundle JS
    //files.
    skipDirOptimize: boolean

    //Introduced in 2.1.2 and considered experimental.
    //If the minifier specified in the "optimize" option supports generating
    //source maps for the minified code, then generate them. The source maps
    //generated only translate minified JS to non-minified JS, it does not do
    //anything magical for translating minified JS to transpiled source code.
    //Currently only optimize: "uglify2" is supported when running in node or
    //rhino, and if running in rhino, "closure" with a closure compiler jar
    //build after r1592 (20111114 release).
    //The source files will show up in a browser developer tool that supports
    //source maps as ".js.src" files.
    generateSourceMaps: boolean


    //If using UglifyJS2 for script optimization, these config options can be
    //used to pass configuration values to UglifyJS2. As of r.js 2.2, UglifyJS2
    //is the only uglify option, so the config key can just be 'uglify' for
    //r.js 2.2+.
    //For possible `output` values see:
    //https://github.com/mishoo/UglifyJS2#beautifier-options
    //For possible `compress` values see:
    //https://github.com/mishoo/UglifyJS2#compressor-options
    uglify: IUglifyOptions


    //List the modules that will be optimized. All their immediate and deep
    //dependencies will be included in the module's file when the build is
    //done. If that module or any of its dependencies includes i18n bundles,
    //only the root bundles will be included unless the locale: section is set above.
    modules: Array<IModule>

    //In RequireJS 2.0, "out" can be a function. For single JS file
    //optimizations that are generated by calling requirejs.optimize(),
    //using an out function means the optimized contents are not written to
    //a file on disk, but instead pass to the out function:
    out: string | OutType

    //By default, comments that have a license in them are preserved in the
    //output when a minifier is used in the "optimize" option.
    //However, for a larger built files there could be a lot of
    //comment files that may be better served by having a smaller comment
    //at the top of the file that points to the list of all the licenses.
    //This option will turn off the auto-preservation, but you will need
    //work out how best to surface the license information.
    //NOTE: As of 2.1.7, if using xpcshell to run the optimizer, it cannot
    //parse out comments since its native Reflect parser is used, and does
    //not have the same comments option support as esprima.
    preserveLicenseComments: boolean

    //Wrap any build bundle in a start and end text specified by wrap.
    //Use this to encapsulate the module code so that define/require are
    //not globals. The end text can expose some globals from your file,
    //making it easy to create stand-alone libraries that do not mandate
    //the end user use requirejs.
    //Another way to use wrap, but uses default wrapping of:
    //(function() { + content + }());
    wrap: boolean

    //Sets the logging level. It is a number. If you want "silent" running,
    //set logLevel to 4. From the logger.js file:
    //TRACE: 0,
    //INFO: 1,
    //WARN: 2,
    //ERROR: 3,
    //SILENT: 4
    //Default is 0.
    logLevel: LogLevels

    //A function that if defined will be called for every file read in the
    //build that is done to trace JS dependencies. This allows transforms of
    //the content.
    onBuildRead: OnBuildReadWriteType

    //A function that will be called for every write to an optimized bundle
    //of modules. This allows transforms of the content before serialization.
    onBuildWrite: OnBuildReadWriteType

    //A function that is called for each JS module bundle that has been
    //completed. This function is called after all module bundles have
    //completed, but it is called for each bundle. A module bundle is a
    //"modules" entry or if just a single file JS optimization, the
    //optimized JS file.
    //Introduced in r.js version 2.1.6
    onModuleBundleComplete: OnModuleBundleCompleteType


    //Introduced in 2.1.3: Seed raw text contents for the listed module IDs.
    //These text contents will be used instead of doing a file IO call for
    //those modules. Useful if some module ID contents are dynamically
    //based on user input, which is common in web build tools.
    //  {
    //    'some/id': 'define(["another/id"], function () {});'
    //},
    rawText: any


    waitSeconds: number

    // css options
    optimizeCss: CssOptimisers

    //If optimizeCss is in use, a list of files to ignore for the @import
    //inlining. The value of this option should be a string of comma separated
    //CSS file names to ignore (like 'a.css,b.css'. The file names should match
    //whatever strings are used in the @import calls.
    cssImportIgnore: string
    //cssIn is typically used as a command line option. It can be used
    //along with out to optimize a single CSS file.
    cssIn: string

    cssPrefix: string

    //Inlines the text for any text! dependencies, to avoid the separate
    //async XMLHttpRequest calls to load those dependencies.
    inlineText: boolean //true
    //Allow "use strict"; be included in the RequireJS files.
    //Default is false because there are not many browsers that can properly
    //process and give errors on code for ES5 strict mode,
    //and there is a lot of legacy code that will not work in strict mode.
    useStrict: boolean //false

    //Allows namespacing requirejs, require and define calls to a new name.
    //This allows stronger assurances of getting a module space that will
    //not interfere with others using a define/require AMD-based module
    //system. The example below will rename define() calls to foo.define().
    //See http://requirejs.org/docs/faq-advanced.html#rename for a more
    //complete example.
    namespace: string
    //Skip processing for pragmas.
    skipPragmas: boolean
    //If skipModuleInsertion is false, then files that do not use define()
    //to define modules will get a define() placeholder inserted for them.
    //Also, require.pause/resume calls will be inserted.
    //Set it to true to avoid this. This is useful if you are building code that
    //does not use require() in the built project or in the JS files, but you
    //still want to use the optimization tool from RequireJS to concatenate modules
    //together.
    skipModuleInsertion: boolean
    //If set to true, any files that were combined into a build bundle will be
    //removed from the output folder.
    removeCombined: boolean

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
    insertRequire: string



    //TODO https://github.com/requirejs/r.js/blob/master/build/example.build.js



}


type OnModuleBundleCompleteType = (data: any) => void;

type OnBuildReadWriteType = (moduleName: string, path: string, contents: string) => string;

type OutType = (text: string, sourceMap: string) => void;

export interface IModule {
    //"foo/bar/bop",
    name: string
    //create: true can be used to create the module layer at the given
    //name, if it does not already exist in the source location. If
    //there is a module at the source location with this name, then
    //create: true is superfluous.
    create: boolean
    // the modules that should be excluded from the built file (including that modules dependencies)
    exclude: Array<string>
    //Used to specify a specific module be excluded
    //from the built module file. excludeShallow means just exclude that
    //specific module, but if that module has nested dependencies that are
    //part of the built file, keep them in there. This is useful during
    //development when you want to have a fast bundled set of modules, but
    //just develop/debug one or two modules at a time.
    excludeShallow: Array<string>
    //This moduels whose dependencies (and their depedencies etc) should be combined into one file.
    include: Array<string>
    // shows the use insertRequire (first available in 2.0):
    insertRequire: string
}

export class Module implements IModule {
    public insertRequire: string;
    public include: Array<string>;
    public excludeShallow: Array<string>;
    public exclude: Array<string>;
    public create: boolean;
    public name: string = null;
}


export interface IUglifyOutputOptions {
    beautify: boolean
}

export interface IUglifyCompressOptions {
    sequences: boolean
    dead_code: boolean
    global_defs: any
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
    public cssImportIgnore: string = null;
    public waitSeconds: number = 7;
    public files: Array<IFile> = [];
    public optimize: Optimisers = "uglify2"
    public preserveLicenseComments: boolean = false
    public generateSourceMaps: boolean = true;
    public appDir: string = null;
    public baseUrl: string = "./"
    public dir: string = null;
    public keepBuildDir: boolean;
    public wrapShim: boolean;
    public locale: string;
    public modules: Array<IModule> = new Array<IModule>();
    public skipDirOptimize: boolean;
    // css ptions
    public optimizeCss: CssOptimisers = "standard";
    public cssIn: string;
    public out: string | OutType;
    public cssPrefix: string;
    public inlineText: boolean = true;
    public useStrict: boolean = false;
    public namespace: string;
    public skipPragmas: boolean;
    public skipModuleInsertion: boolean;
    public removeCombined: boolean;
    public insertRequire: string;
    public wrap: boolean;
    public logLevel: LogLevels;
    public onBuildRead: OnBuildReadWriteType;
    public onBuildWrite: OnBuildReadWriteType;
    public onModuleBundleComplete: OnModuleBundleCompleteType;
    public rawText: any;
    public mainConfigFile: string;
    public uglify: IUglifyOptions;

}

export class NetPackRequireJs {

    // constructor(options: IRequireJsOptions) {
    //     this.options = options || new RequireJsOptions();
    // }

    optimise(options: IRequireJsOptions, finishedCallback: (files: any) => void, onErrorCallback: (message: string) => void): void {

        var inMemoryFiles = {};
        var files = options.files;

        var arrayLength = files.length;
        for (var i = 0; i < arrayLength; i++) {

            var file = files[i];
            inMemoryFiles[file.path] = file.contents;
            //Do something
        }

        requirejs.setFiles(inMemoryFiles, function (done) {
            requirejs.optimize(options, function () {
                // var output = inMemoryFiles["dist/output.js"];
                finishedCallback(inMemoryFiles);
                done();
            }, function (error) {
                // handle error
                onErrorCallback(error);
                done();

            });
        });

    }

}





