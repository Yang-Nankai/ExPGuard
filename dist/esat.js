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
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const runSingleTask_1 = require("./runSingleTask");
const config_1 = __importDefault(require("./config"));
const program = new commander_1.Command();
program
    .name("epg-analyzer")
    .description("Chrome Extension Privacy Analysis Framework")
    .version(config_1.default.appVersion);
program
    .command("analyze")
    .requiredOption("--type <type>", "CRX | DIR | WEB")
    .requiredOption("--input <path>", "CRX file path or directory path or web url")
    .option("--out <dir>", "output directory", "./results")
    .option("--id <extensionId>", "extension id")
    .option("--version <version>", "extension version")
    .action((opts) => __awaiter(void 0, void 0, void 0, function* () {
    const sourceType = opts.type.toUpperCase();
    if (!["CRX", "DIR", "WEB"].includes(sourceType)) {
        console.error("Invalid --type, must be CRX | DIR | WEB");
        process.exit(1);
    }
    yield (0, runSingleTask_1.runSingleTask)({
        sourceType,
        input: opts.input,
        outputDir: path_1.default.resolve(opts.out),
        extensionId: opts.id,
        extensionVersion: opts.version,
    });
}));
program.parse(process.argv);
