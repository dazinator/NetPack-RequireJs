var y = __dirname;



var moduleAContents =
    "define(\"ModuleA\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n});";

var moduleBContents =
    "define(\"ModuleB\", [\"require\", \"exports\", \"ModuleA\"], function (require, exports, moduleA) {\r\n    \"use strict\";\r\n});";

var moduleCContents =
    "define(\"ModuleC\", [\"require\", \"exports\", \"ModuleA\"], function (require, exports, moduleA) {\r\n    \"use strict\";\r\n});";


var moduleAFile = { "path": "wwwroot/ModuleA.js", "contents": moduleAContents };
var moduleBFile = { "path": "wwwroot/ModuleB.js", "contents": moduleBContents };
var moduleCFile = { "path": "wwwroot/ModuleC.js", "contents": moduleCContents };


var commonContents = "requirejs.config({\r\n    baseUrl: \'wwwroot\',\r\n    paths: {\r\n        app: \'..\/app\'\r\n    }\r\n});";
var CommonFile = { "path": "wwwroot/Common.js", "contents": commonContents };


var files = [moduleAFile, moduleBFile, moduleCFile, CommonFile];
var commonModules = ['ModuleA'];
var commonModuleBundleName = 'Common';

var modulesArray = [
    {
        name: 'ModuleA',
        exclude: [commonModuleBundleName]
    },
    {
        name: 'ModuleB', exclude: [commonModuleBundleName]
    },
    {
        name: 'ModuleC', exclude: [commonModuleBundleName]
    },
    {
        name: commonModuleBundleName, include: commonModules
    }
];

var out = 'built.js';
var baseUrl = 'wwwroot';
var dir = 'built';
var mainConfigFile = 'Common.js';

var options = { Files: files, MainConfig: mainConfigFile, BaseUrl: baseUrl, Modules: modulesArray, Out: out, Dir: dir }

netpackRequireJs((state, args) => {
    for (var property in args) {
        if (args.hasOwnProperty(property)) {
            // do stuff
            console.log("Property Name: " + property);
            console.log("=====================================");
            var propVal = args[property];
            console.log(propVal);
        }
    }

}, options);