"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXTENSION_FOLDER = exports.LOG_FILE = exports.LOG_PATH = exports.DATA_PATH = exports.SRC_PATH = exports.PROJECT_PATH = void 0;
const path_1 = __importDefault(require("path"));
exports.PROJECT_PATH = path_1.default.resolve(__dirname, '../../');
exports.SRC_PATH = path_1.default.resolve(exports.PROJECT_PATH, 'src');
exports.DATA_PATH = path_1.default.resolve(exports.PROJECT_PATH, 'data');
exports.LOG_PATH = path_1.default.resolve(exports.PROJECT_PATH, 'logs');
exports.LOG_FILE = path_1.default.resolve(exports.LOG_PATH, 'app.log');
exports.EXTENSION_FOLDER = path_1.default.resolve(exports.DATA_PATH, 'extensions');
