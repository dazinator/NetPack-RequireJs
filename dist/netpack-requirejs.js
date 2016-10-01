/// <reference path="../typings/index.d.ts" />
"use strict";
var requirejs = require("requirejs-memfiles");
var Module = (function () {
    function Module() {
        this.name = null;
    }
    return Module;
}());
exports.Module = Module;
var LogLevels;
(function (LogLevels) {
    LogLevels[LogLevels["TRACE"] = 0] = "TRACE";
    LogLevels[LogLevels["INFO"] = 1] = "INFO";
    LogLevels[LogLevels["WARN"] = 2] = "WARN";
    LogLevels[LogLevels["ERROR"] = 3] = "ERROR";
    LogLevels[LogLevels["SILENT"] = 4] = "SILENT";
})(LogLevels || (LogLevels = {}));
var RequireJsOptions = (function () {
    function RequireJsOptions() {
        this.cssImportIgnore = null;
        this.waitSeconds = 7;
        this.files = [];
        this.optimize = "uglify2";
        this.preserveLicenseComments = false;
        this.generateSourceMaps = true;
        this.appDir = null;
        this.baseUrl = "./";
        this.dir = null;
        this.modules = new Array();
        // css ptions
        this.optimizeCss = "standard";
        this.inlineText = true;
        this.useStrict = false;
    }
    return RequireJsOptions;
}());
exports.RequireJsOptions = RequireJsOptions;
var NetPackRequireJs = (function () {
    function NetPackRequireJs() {
    }
    // constructor(options: IRequireJsOptions) {
    //     this.options = options || new RequireJsOptions();
    // }
    NetPackRequireJs.prototype.optimise = function (options, finishedCallback, onErrorCallback) {
        var inMemoryFiles = {};
        var files = options.files;
        var arrayLength = files.length;
        for (var i = 0; i < arrayLength; i++) {
            var file = files[i];
            inMemoryFiles[file.path] = file.contents;
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
    };
    return NetPackRequireJs;
}());
exports.NetPackRequireJs = NetPackRequireJs;
//# sourceMappingURL=netpack-requirejs.js.map