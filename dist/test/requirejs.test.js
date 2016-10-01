/// <reference path="../../typings/index.d.ts" />
"use strict";
var netpackrequirejs = require("../netpack-requirejs");
describe("NetPackTypescriptCompiler", function () {
    describe("compileStrings", function () {
        it("successfully transpiles typescript to strings", function (done) {
            var requireJsOptions = new netpackrequirejs.RequireJsOptions();
            requireJsOptions.files = new Array();
            var moduleAContents = "define(\"ModuleA\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n});";
            requireJsOptions.files.push({ "path": "wwwroot/ModuleA.js", "contents": moduleAContents });
            var moduleBContents = "define(\"ModuleB\", [\"require\", \"exports\", \"ModuleA\"], function (require, exports, moduleA) {\r\n    \"use strict\";\r\n});";
            requireJsOptions.files.push({ "path": "wwwroot/ModuleB.js", "contents": moduleBContents });
            var moduleCContents = "define(\"ModuleC\", [\"require\", \"exports\", \"ModuleA\"], function (require, exports, moduleA) {\r\n    \"use strict\";\r\n});";
            requireJsOptions.files.push({ "path": "wwwroot/ModuleC.js", "contents": moduleCContents });
            var commonContents = "requirejs.config({\r\n    baseUrl: \'wwwroot\',\r\n    paths: {\r\n        app: \'..\/app\'\r\n    }\r\n});";
            requireJsOptions.files.push({ "path": "wwwroot/Common.js", "contents": commonContents });
            var commonModules = ['ModuleA'];
            var commonModuleBundleName = 'Common';
            var moduleA = new netpackrequirejs.Module();
            moduleA.name = 'ModuleA';
            moduleA.exclude = [commonModuleBundleName];
            requireJsOptions.modules.push(moduleA);
            var moduleB = new netpackrequirejs.Module();
            moduleB.name = 'ModuleB';
            moduleB.exclude = [commonModuleBundleName];
            requireJsOptions.modules.push(moduleB);
            var moduleC = new netpackrequirejs.Module();
            moduleC.name = 'ModuleC';
            moduleC.exclude = [commonModuleBundleName];
            requireJsOptions.modules.push(moduleC);
            var commonModule = new netpackrequirejs.Module();
            commonModule.name = commonModuleBundleName;
            commonModule.include = commonModules;
            requireJsOptions.modules.push(commonModule);
            var out = 'built.js';
            var baseUrl = 'wwwroot';
            var dir = 'built';
            var mainConfigFile = 'wwwroot/Common.js';
            requireJsOptions.mainConfigFile = mainConfigFile;
            requireJsOptions.baseUrl = baseUrl;
            //requireJsOptions.modules = modulesArray;
            //requireJsOptions.out = out;
            requireJsOptions.dir = dir;
            var optimiser = new netpackrequirejs.NetPackRequireJs();
            optimiser.optimise(requireJsOptions, function (results) {
                for (var property in results) {
                    if (results.hasOwnProperty(property)) {
                        // do stuff
                        console.log("Property Name: " + property);
                        console.log("=====================================");
                        var propVal = results[property];
                        console.log(propVal);
                    }
                }
                done();
            }, function (message) {
                console.log("Error: " + message);
                done(message);
            });
        });
    });
});
//# sourceMappingURL=requirejs.test.js.map