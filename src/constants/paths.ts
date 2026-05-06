import path from 'path';

export const PROJECT_PATH = path.resolve(__dirname, '../../');
export const SRC_PATH = path.resolve(PROJECT_PATH, 'src');
export const DATA_PATH = path.resolve(PROJECT_PATH, 'data');
export const LOG_PATH = path.resolve(PROJECT_PATH, 'logs');

export const LOG_FILE = path.resolve(LOG_PATH, 'app.log');
export const EXTENSION_FOLDER = path.resolve(DATA_PATH, 'extensions');
