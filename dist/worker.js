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
Object.defineProperty(exports, "__esModule", { value: true });
// worker.ts
const epgmodelbuilder_1 = require("./epgmodelbuilder");
function runAnalysis(opts, outputDir) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        yield epgmodelbuilder_1.epgModelBuilder.analyze({
            extensionPath: opts.input,
            extensionType: opts.sourceType,
            outputPath: outputDir,
            extensionId: (_a = opts.extensionId) !== null && _a !== void 0 ? _a : "unknown",
            extensionVersion: opts.extensionVersion,
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 从命令行参数获取配置
        const args = JSON.parse(process.argv[2]);
        const { extensionPath, sourceType, outputDir, extensionId, extensionVersion } = args;
        try {
            // 这里调用你原来的分析逻辑
            // 注意：在此进程中，taintManager 等单例是全新的，正常工作并写入 summary.json
            yield runAnalysis({
                input: extensionPath,
                sourceType: sourceType,
                outputDir,
                extensionId,
                extensionVersion,
            }, outputDir);
            process.exit(0);
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    });
}
main();
