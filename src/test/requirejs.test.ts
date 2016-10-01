/// <reference path="../../typings/index.d.ts" />

import * as netpackrequirejs from "../netpack-requirejs";
import * as fs from "fs";

import { expect } from 'chai';

describe("NetPackTypescriptCompiler", () => {

    describe("compileStrings", () => {

        it("successfully transpiles typescript to strings", function (done) {


            let requireJsOptions = new netpackrequirejs.RequireJsOptions();
            requireJsOptions.files = new Array<netpackrequirejs.IFile>();


            var moduleAContents =
                "define(\"ModuleA\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n});";
            requireJsOptions.files.push({ "path": "wwwroot/ModuleA.js", "contents": moduleAContents });

            var moduleBContents =
                "define(\"ModuleB\", [\"require\", \"exports\", \"ModuleA\"], function (require, exports, moduleA) {\r\n    \"use strict\";\r\n});";
            requireJsOptions.files.push({ "path": "wwwroot/ModuleB.js", "contents": moduleBContents });

            var moduleCContents =
                "define(\"ModuleC\", [\"require\", \"exports\", \"ModuleA\"], function (require, exports, moduleA) {\r\n    \"use strict\";\r\n});";
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
            optimiser.optimise(requireJsOptions, (results) => {

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

            }, (message) => {
                console.log("Error: " + message);
                done(message);
            });



        });

    });
});