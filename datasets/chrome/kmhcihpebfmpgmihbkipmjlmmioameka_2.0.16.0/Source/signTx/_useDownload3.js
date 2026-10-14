const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["signTx/web5.js","signTx/App.js","signTx/signTx.js","assets/signTx.css","signTx/AppSignTx.js","assets/AppSignTx.css","signTx/useDetailedTxInfo.js","signTx/eternl-256.js","assets/App.css","signTx/web6.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from './signTx.js';
import { r as registerPlugin } from './App.js';

var Directory;
(function (Directory) {
    /**
     * The Documents directory.
     * On iOS it's the app's documents directory.
     * Use this directory to store user-generated content.
     * On Android it's the Public Documents folder, so it's accessible from other apps.
     * It's not accesible on Android 10 unless the app enables legacy External Storage
     * by adding `android:requestLegacyExternalStorage="true"` in the `application` tag
     * in the `AndroidManifest.xml`.
     * On Android 11 or newer the app can only access the files/folders the app created.
     *
     * @since 1.0.0
     */
    Directory["Documents"] = "DOCUMENTS";
    /**
     * The Data directory.
     * On iOS it will use the Documents directory.
     * On Android it's the directory holding application files.
     * Files will be deleted when the application is uninstalled.
     *
     * @since 1.0.0
     */
    Directory["Data"] = "DATA";
    /**
     * The Library directory.
     * On iOS it will use the Library directory.
     * On Android it's the directory holding application files.
     * Files will be deleted when the application is uninstalled.
     *
     * @since 1.1.0
     */
    Directory["Library"] = "LIBRARY";
    /**
     * The Cache directory.
     * Can be deleted in cases of low memory, so use this directory to write app-specific files.
     * that your app can re-create easily.
     *
     * @since 1.0.0
     */
    Directory["Cache"] = "CACHE";
    /**
     * The external directory.
     * On iOS it will use the Documents directory.
     * On Android it's the directory on the primary shared/external
     * storage device where the application can place persistent files it owns.
     * These files are internal to the applications, and not typically visible
     * to the user as media.
     * Files will be deleted when the application is uninstalled.
     *
     * @since 1.0.0
     */
    Directory["External"] = "EXTERNAL";
    /**
     * The external storage directory.
     * On iOS it will use the Documents directory.
     * On Android it's the primary shared/external storage directory.
     * It's not accesible on Android 10 unless the app enables legacy External Storage
     * by adding `android:requestLegacyExternalStorage="true"` in the `application` tag
     * in the `AndroidManifest.xml`.
     * It's not accesible on Android 11 or newer.
     *
     * @since 1.0.0
     */
    Directory["ExternalStorage"] = "EXTERNAL_STORAGE";
})(Directory || (Directory = {}));
var Encoding;
(function (Encoding) {
    /**
     * Eight-bit UCS Transformation Format
     *
     * @since 1.0.0
     */
    Encoding["UTF8"] = "utf8";
    /**
     * Seven-bit ASCII, a.k.a. ISO646-US, a.k.a. the Basic Latin block of the
     * Unicode character set
     * This encoding is only supported on Android.
     *
     * @since 1.0.0
     */
    Encoding["ASCII"] = "ascii";
    /**
     * Sixteen-bit UCS Transformation Format, byte order identified by an
     * optional byte-order mark
     * This encoding is only supported on Android.
     *
     * @since 1.0.0
     */
    Encoding["UTF16"] = "utf16";
})(Encoding || (Encoding = {}));

const Filesystem = registerPlugin('Filesystem', {
    web: () => __vitePreload(() => import('./web5.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6,7,8]):void 0).then(m => new m.FilesystemWeb()),
});

const Share = registerPlugin('Share', {
    web: () => __vitePreload(() => import('./web6.js'),true              ?__vite__mapDeps([9,1,2,3,4,5,6,7,8]):void 0).then(m => new m.ShareWeb()),
});

const _downloadWallet = async (walletData) => {
  if (!walletData) {
    return false;
  }
  const fileName = "eternl-" + walletData.settings.name.toLowerCase().replace(/\s/g, "-") + "-" + walletData.wallet.id.toLowerCase().replace(/\s/g, "-") + ".json";
  const result = await Filesystem.writeFile({
    path: fileName,
    data: JSON.stringify(walletData),
    directory: Directory.Cache,
    encoding: Encoding.UTF8
  });
  await Share.share({
    dialogTitle: "Download wallet backup",
    title: fileName,
    url: result.uri
  });
  return true;
};
const _downloadText = async (text, fileName) => {
  if (!text) {
    return false;
  }
  const result = await Filesystem.writeFile({
    path: fileName,
    data: text,
    directory: Directory.Cache,
    encoding: Encoding.UTF8
  });
  await Share.share({
    dialogTitle: "Store text file",
    title: fileName,
    url: result.uri
  });
  return true;
};

const _useDownload = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    _downloadText,
    _downloadWallet
}, Symbol.toStringTag, { value: 'Module' }));

export { Encoding as E, _useDownload as _ };
