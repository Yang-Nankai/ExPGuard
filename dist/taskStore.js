"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.updateTask = updateTask;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const TASK_LOG = path_1.default.resolve("task-log.jsonl");
function writeLine(obj) {
    fs_1.default.appendFileSync(TASK_LOG, JSON.stringify(obj) + "\n");
}
function createTask(task) {
    const record = Object.assign(Object.assign({}, task), { status: "pending", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    writeLine({ type: "create", record });
    return record;
}
function updateTask(taskId, patch) {
    writeLine({
        type: "update",
        taskId,
        patch,
        updatedAt: new Date().toISOString(),
    });
}
