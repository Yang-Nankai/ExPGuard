import { e as ref, D as computed, aM as el, aN as sl, bp as Dexie } from './index.js';

const doLog = false;
const storeId = "useFileSystemAccess";
const ErrorFileSystemAccess = {
  notSupported: "ErrorFileSystemAccess.notSupported",
  useAborted: "ErrorFileSystemAccess.userAborted",
  permissionDenied: "ErrorFileSystemAccess.permissionDenied",
  noRootDirectoryHandle: "ErrorFileSystemAccess.noRootDirectoryHandle",
  noWriteAccess: "ErrorFileSystemAccess.noWriteAccess"
};
class FileSystemAccessDB extends Dexie {
  handles;
  constructor() {
    super("eternl-file-system-access");
    this.version(2).stores({
      handles: "name"
    });
  }
}
const db = new FileSystemAccessDB();
const HandleNames = {
  root: "eternl-data",
  raw: "raw",
  metadata: "metadata",
  reports: "reports",
  testFile: "write-test.txt"
};
const _dirHandleRoot = ref(null);
const _dirHandleRaw = ref(null);
const _dirHandleMetadata = ref(null);
const _dirHandleReports = ref(null);
const _hasWriteAccessRoot = ref(false);
const _hasWriteAccessRaw = ref(false);
const _hasWriteAccessMetadata = ref(false);
const _hasWriteAccessReports = ref(false);
const isFileSystemAccessAPISupported = computed(() => "showSaveFilePicker" in window && "showOpenFilePicker" in window && "showDirectoryPicker" in window);
const isFileSystemAccessAPIAvailable = computed(() => _hasWriteAccessRoot.value && _hasWriteAccessRaw.value && _hasWriteAccessMetadata.value && _hasWriteAccessReports.value);
const _isInitializing = ref(false);
const checkSupported = () => {
  if (!isFileSystemAccessAPISupported.value) {
    throw new Error(ErrorFileSystemAccess.notSupported);
  }
};
const checkRootDirHandle = () => {
  if (!_dirHandleRoot.value) {
    throw new Error(ErrorFileSystemAccess.noRootDirectoryHandle);
  }
};
const saveDirHandleToDB = async (name, handle) => {
  await db.handles.put({ name, handle });
};
const clearDirHandlesInDb = async () => {
  await db.handles.clear();
};
const setDirHandlesFromDB = async () => {
  const dirHandleList = await db.handles.toArray();
  if (!dirHandleList || dirHandleList.length === 0) {
    return;
  }
  for (const dirHandle of dirHandleList) {
    if (!dirHandle.handle || dirHandle.handle.kind !== "directory") {
      continue;
    }
    switch (dirHandle.name) {
      case HandleNames.root:
        _dirHandleRoot.value = dirHandle.handle;
        break;
      case HandleNames.raw:
        _dirHandleRaw.value = dirHandle.handle;
        break;
      case HandleNames.metadata:
        _dirHandleMetadata.value = dirHandle.handle;
        break;
      case HandleNames.reports:
        _dirHandleReports.value = dirHandle.handle;
        break;
    }
  }
};
const clearDirectoryHandles = async () => {
  _dirHandleRoot.value = null;
  _dirHandleRaw.value = null;
  _dirHandleMetadata.value = null;
  _dirHandleReports.value = null;
  _hasWriteAccessRoot.value = false;
  _hasWriteAccessRaw.value = false;
  _hasWriteAccessMetadata.value = false;
  _hasWriteAccessReports.value = false;
  await clearDirHandlesInDb();
};
const selectRootDirectory = async () => {
  checkSupported();
  try {
    await createRootDirectory();
    if (doLog) ;
    await createAllSubDirectories();
    return true;
  } catch (err) {
    console.error("Error: selectRootDirectory:", err);
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error(ErrorFileSystemAccess.useAborted);
    }
  }
  throw new Error(ErrorFileSystemAccess.permissionDenied);
};
const createRootDirectory = async () => {
  _dirHandleRoot.value = await window.showDirectoryPicker();
  _hasWriteAccessRoot.value = await checkWriteAccessDirectory(_dirHandleRoot.value);
  if (!_hasWriteAccessRoot.value) {
    throw new Error(ErrorFileSystemAccess.noWriteAccess);
  }
  await saveDirHandleToDB(HandleNames.root, _dirHandleRoot.value);
};
const createSubDirectory = async (rootDirHandle, handleName, dirHandleRef, hasWriteAccessRef) => {
  dirHandleRef.value = await rootDirHandle.getDirectoryHandle(handleName, { create: true });
  hasWriteAccessRef.value = await checkWriteAccessDirectory(dirHandleRef.value);
  if (!hasWriteAccessRef.value) {
    throw new Error(ErrorFileSystemAccess.noWriteAccess);
  }
  await saveDirHandleToDB(handleName, dirHandleRef.value);
};
const createAllSubDirectories = async () => {
  checkSupported();
  checkRootDirHandle();
  await createSubDirectory(_dirHandleRoot.value, HandleNames.raw, _dirHandleRaw, _hasWriteAccessRaw);
  await createSubDirectory(_dirHandleRoot.value, HandleNames.metadata, _dirHandleMetadata, _hasWriteAccessMetadata);
  await createSubDirectory(_dirHandleRoot.value, HandleNames.reports, _dirHandleReports, _hasWriteAccessReports);
};
const checkWriteAccessDirectory = async (dirHandle) => {
  try {
    const testFileHandle = await dirHandle.getFileHandle(HandleNames.testFile, { create: true });
    const writable = await testFileHandle.createWritable();
    await writable.write("test");
    await writable.close();
    await dirHandle.removeEntry(HandleNames.testFile);
    return true;
  } catch (err) {
    console.error("Error: checkWriteAccessDirectory:", err);
  }
  return false;
};
const initFileSystemAccess = async (silent = false, force = false) => {
  if (_isInitializing.value) {
    return;
  }
  if (silent && isFileSystemAccessAPIAvailable.value) {
    return;
  }
  _isInitializing.value = true;
  try {
    checkSupported();
    if (force) {
      await selectRootDirectory();
      return;
    }
    await setDirHandlesFromDB();
    if (!_dirHandleRoot.value) {
      if (silent) {
        throw new Error(ErrorFileSystemAccess.noRootDirectoryHandle);
      }
      await selectRootDirectory();
    } else {
      try {
        _hasWriteAccessRoot.value = await checkWriteAccessDirectory(_dirHandleRoot.value);
        await createAllSubDirectories();
      } catch (err) {
        console.error("Error: initFileSystemAccess:", err);
        await clearDirectoryHandles();
        if (silent) {
          throw new Error(ErrorFileSystemAccess.noWriteAccess);
        }
        await selectRootDirectory();
      }
    }
  } catch (err) {
    if (silent) ; else {
      console.error("Error: initFileSystemAccess:", err);
    }
  }
  _isInitializing.value = false;
};
const useFileSystemAccess = () => {
  return {
    isFileSystemAccessAPISupported,
    isFileSystemAccessAPIAvailable,
    initFileSystemAccess,
    dirHandleRoot: _dirHandleRoot,
    dirHandleRaw: _dirHandleRaw,
    dirHandleMetadata: _dirHandleMetadata,
    dirHandleReports: _dirHandleReports,
    hasWriteAccessRoot: _hasWriteAccessRoot,
    hasWriteAccessRaw: _hasWriteAccessRaw,
    hasWriteAccessMetadata: _hasWriteAccessMetadata,
    hasWriteAccessReports: _hasWriteAccessReports
  };
};

export { useFileSystemAccess as u };
