"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const epgmodelbuilder_1 = require("./epgmodelbuilder");
const taint_1 = require("./taint");
const interProceduralAnalyzer_1 = require("./def-use/analyzers/interProceduralAnalyzer");
const paths_1 = require("./constants/paths");
const extensionLoader_1 = require("./extension/extensionLoader");
// import { setLogFile } from "./utils/logger";
// TODO: 后续对JS文件大小做限制，超过多少KB大小的JS扩展文件不考虑分析，或许可以加快程序运行
// 应该是跳过该 scopeTree 进行分析，其他的文件还是要分析的
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        // hcalfepkjgcohdhnjhdpbnifeopodkkh 0.1.0
        const extensionDir = path_1.default.join(paths_1.DATA_PATH, "single");
        const extensionId = "pocfdebmmcmfanifcfeeiafokecfkikj";
        const extensionVersion = "3.0.1";
        // const extensionId = "aoejhhnjefoodboboghlpjkfnknkkngj";
        // const extensionVersion = "1.1";
        const extensionPath = path_1.default.join(paths_1.DATA_PATH, "histories", `${extensionId}.${extensionVersion}.crx`);
        const outputPath = path_1.default.join(paths_1.DATA_PATH, "temp");
        // setLogFile(path.join(outputPath, "analysis.log"));
        // await epgModelBuilder.analyzeCRX({extensionPath, outputPath, extensionId, extensionVersion});
        yield epgmodelbuilder_1.epgModelBuilder.analyzeDIR({
            extensionPath: extensionDir,
            extensionType: extensionLoader_1.ExtensionSourceType.DIR,
            outputPath,
            extensionId,
            extensionVersion,
        });
        taint_1.taintManager.generateGlobalReport().forEach((r) => {
            const report = (0, taint_1.printTaintReportCLI)(r);
            console.log(report);
        });
        const summary = taint_1.taintManager.getGlobalSummary();
        console.log(summary);
        console.log(interProceduralAnalyzer_1.interAnalyzer.getCacheReport());
    });
})();
