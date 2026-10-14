import { G as getAppInfo, H as backendServer, r as ref, I as getObjRef, J as forceSetLS, K as toHexString, L as isStakingEnabled, x as getDefaultExportFromCjs, M as toHexBuffer, N as Buffer$1, a as reactive, O as toHexArray, P as dispatchSignalSync, Q as json, R as getRef, n as networkIdList, S as Dexie, U as api, m as el, V as networkId$9, B as computed, w as watch, X as dispatchSignal, Y as addSignalListener, Z as getNetworkDecimals, $ as DEFAULT_WALLET_GROUP_NAME, a0 as useDebounceFn, a1 as getAutoSubmitTx, a2 as getSubmitApiEndpoint, a3 as DEFAULT_ETERNL_ENDPOINT, a4 as ETERNL_COLLATERAL_EXP_MS, a5 as getNetworkId, a6 as getErrorMsg, p as sl, C as nextTick, d as defineComponent, a7 as useScreenSize, z as useDarkMode, a8 as useDesktopMenuCollapsed, a9 as isBetaApp, D as resolveComponent, g as createElementBlock, e as openBlock, F as Fragment, t as createVNode, k as createBaseVNode, j as normalizeClass, u as unref, f as withCtx, E as toDisplayString, W as WALLET_VERSION_BETA, aa as useSlots, ab as useElementSize, ac as renderSlot, h as createCommentVNode, ad as getChainTip, ae as watchEffect, c as createBlock, af as dispatchSignalSyncTo, ag as createStaticVNode, o as onMounted, y as useTranslation, ah as createSlots, ai as createTextVNode, aj as mergeProps, ak as renderList, al as normalizeProps, am as guardReactiveProps, an as useLocalStorage, ao as useRtlHelper, ap as resolveDirective, aq as Teleport, ar as withDirectives, as as normalizeStyle, at as withModifiers, au as withKeys, q as useTheme, av as resolveDynamicComponent, aw as getCurrentInstance } from './enable.js';
import { _ as _export_sfc, G as GradientBar2, g as gsapWithCSS } from './AppEnable.js';
import { g as getCSLBip32PublicKey, s as safeFreeCSLObject, B as Bip32PrivateKey, c as chain, a as getScriptState, b as getAddressCredentials, d as getAddressKey, A as AccountError, e as getBaseAddressFromCred, f as getEnterpriseAddressFromCred, h as getCSLAddress, i as getRewardAddressFromCred, r as requireDist$1, j as requireStreamBrowserify, F as FixedTransaction, T as TransactionHash, k as blake2b256, l as TransactionBody, m as AuxiliaryData, n as TransactionWitnessSet, o as Transaction, p as AuxiliaryDataHash, C as CborContainerType, q as getTransactionJSONFromCSL, t as now, u as getUtxoHash, v as addValueToValue, w as neg, x as add, y as subtract, z as addOutputToBalance, D as compare, E as isZero, G as filterUtxoFromList, H as isGreaterThanZero, I as getFilteredUtxoList, J as sortInputListByScore, K as addToBalance, L as filterUtxoList, M as createIBalance, N as getInputBalance, O as getOutputBalance, P as clearBalance, Q as decreaseBalance, R as getPendingUtxoList, S as NativeScript, U as jsonToCsl, V as getCSLVkeywitnessHash, W as getAllInputUtxoHashList, X as loadUnknownUtxos, Y as getNativeScriptCredFromHex, Z as getIAppAccountByCred, _ as getOwnedCred, $ as calcAccountTxBalance, a0 as getHintUtxoList, a1 as checkEpochParams, a2 as createIUtxo, a3 as getAssetIdBech32, a4 as useSelectedAccount, a5 as appWallet$1, a6 as getIAppWallet, a7 as appAccount$1, a8 as getIAppAccount, a9 as DataError, aa as decryptText, ab as encryptText, ac as saveWallet, ad as AdaHandleError, ae as isValidSendAddress, af as doInitApp, ag as SyncState, ah as freeCSLObjects, ai as divide, aj as isMultiSigAccountPath, ak as updateIAccountSettingsPartial, al as saveAccountSettings, am as getSelectedWalletAccountId, an as getWalletNameList, ao as saveWalletSettings, ap as onWalletSettingsUpdated, aq as getIAccountBalances, ar as multiply, as as getUtxoCborList, at as doProcessSubmittedTxList, au as getAddressCbor, av as getLockedUtxos, aw as createTransactionOutputJSON, ax as getDonationAddress, ay as getValueJSONFromCbor, az as getAllUsedAddresses, aA as setRewardsLocked, aB as updateBalances, aC as isLessThanZero, aD as getBalanceCbor, aE as doForceSyncImportantAccounts, aF as isSyncLeader, aG as doReloadAccount, aH as getPendingTxList, aI as generatePlateHex, aJ as isHDAccount, aK as doForceSyncAccount, aL as LZString, aM as useGuard } from './useGuards.js';

const LOVELACE = "lovelace";

const getSwapURL = () => {
  const localURL = getAppInfo().localSwapBackend;
  if (localURL) {
    return localURL;
  }
  if (backendServer?.serverV2?.swap) {
    return `https://${backendServer.serverV2.swap}`;
  }
  throw new Error("No backend swap URL available.");
};

/*!
 * paths 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
    _numbersExp = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
    _scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,
    _selectorExp = /(^[#\.][a-z]|[a-y][a-z])/i,
    _DEG2RAD$1 = Math.PI / 180,
    _RAD2DEG = 180 / Math.PI,
    _sin = Math.sin,
    _cos = Math.cos,
    _abs = Math.abs,
    _sqrt = Math.sqrt,
    _atan2 = Math.atan2,
    _largeNum = 1e8,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _temp = {},
    _temp2 = {},
    _roundingNum = 1e5,
    _wrapProgress = function _wrapProgress(progress) {
  return Math.round((progress + _largeNum) % 1 * _roundingNum) / _roundingNum || (progress < 0 ? 0 : 1);
},
    //if progress lands on 1, the % will make it 0 which is why we || 1, but not if it's negative because it makes more sense for motion to end at 0 in that case.
_round = function _round(value) {
  return Math.round(value * _roundingNum) / _roundingNum || 0;
},
    _roundPrecise = function _roundPrecise(value) {
  return Math.round(value * 1e10) / 1e10 || 0;
},
    _splitSegment = function _splitSegment(rawPath, segIndex, i, t) {
  var segment = rawPath[segIndex],
      shift = t === 1 ? 6 : subdivideSegment(segment, i, t);

  if ((shift || !t) && shift + i + 2 < segment.length) {
    rawPath.splice(segIndex, 0, segment.slice(0, i + shift + 2));
    segment.splice(0, i + shift);
    return 1;
  }
},
    _getSampleIndex = function _getSampleIndex(samples, length, progress) {
  // slightly slower way than doing this (when there's no lookup): segment.lookup[progress < 1 ? ~~(length / segment.minLength) : segment.lookup.length - 1] || 0;
  var l = samples.length,
      i = ~~(progress * l);

  if (samples[i] > length) {
    while (--i && samples[i] > length) {}

    i < 0 && (i = 0);
  } else {
    while (samples[++i] < length && i < l) {}
  }

  return i < l ? i : l - 1;
},
    _reverseRawPath = function _reverseRawPath(rawPath, skipOuter) {
  var i = rawPath.length;
  rawPath.reverse();

  while (i--) {
    rawPath[i].reversed || reverseSegment(rawPath[i]);
  }
},
    _copyMetaData = function _copyMetaData(source, copy) {
  copy.totalLength = source.totalLength;

  if (source.samples) {
    //segment
    copy.samples = source.samples.slice(0);
    copy.lookup = source.lookup.slice(0);
    copy.minLength = source.minLength;
    copy.resolution = source.resolution;
  } else if (source.totalPoints) {
    //rawPath
    copy.totalPoints = source.totalPoints;
  }

  return copy;
},
    //pushes a new segment into a rawPath, but if its starting values match the ending values of the last segment, it'll merge it into that same segment (to reduce the number of segments)
_appendOrMerge = function _appendOrMerge(rawPath, segment) {
  var index = rawPath.length,
      prevSeg = rawPath[index - 1] || [],
      l = prevSeg.length;

  if (index && segment[0] === prevSeg[l - 2] && segment[1] === prevSeg[l - 1]) {
    segment = prevSeg.concat(segment.slice(2));
    index--;
  }

  rawPath[index] = segment;
};
/* TERMINOLOGY
 - RawPath - an array of arrays, one for each Segment. A single RawPath could have multiple "M" commands, defining Segments (paths aren't always connected).
 - Segment - an array containing a sequence of Cubic Bezier coordinates in alternating x, y, x, y format. Starting anchor, then control point 1, control point 2, and ending anchor, then the next control point 1, control point 2, anchor, etc. Uses less memory than an array with a bunch of {x, y} points.
 - Bezier - a single cubic Bezier with a starting anchor, two control points, and an ending anchor.
 - the variable "t" is typically the position along an individual Bezier path (time) and it's NOT linear, meaning it could accelerate/decelerate based on the control points whereas the "p" or "progress" value is linearly mapped to the whole path, so it shouldn't really accelerate/decelerate based on control points. So a progress of 0.2 would be almost exactly 20% along the path. "t" is ONLY in an individual Bezier piece.
 */
//accepts basic selector text, a path instance, a RawPath instance, or a Segment and returns a RawPath (makes it easy to homogenize things). If an element or selector text is passed in, it'll also cache the value so that if it's queried again, it'll just take the path data from there instead of parsing it all over again (as long as the path data itself hasn't changed - it'll check).


function getRawPath(value) {
  value = _isString(value) && _selectorExp.test(value) ? document.querySelector(value) || value : value;
  var e = value.getAttribute ? value : 0,
      rawPath;

  if (e && (value = value.getAttribute("d"))) {
    //implements caching
    if (!e._gsPath) {
      e._gsPath = {};
    }

    rawPath = e._gsPath[value];
    return rawPath && !rawPath._dirty ? rawPath : e._gsPath[value] = stringToRawPath(value);
  }

  return !value ? console.warn("Expecting a <path> element or an SVG path data string") : _isString(value) ? stringToRawPath(value) : _isNumber(value[0]) ? [value] : value;
} //copies a RawPath WITHOUT the length meta data (for speed)

function copyRawPath(rawPath) {
  var a = [],
      i = 0;

  for (; i < rawPath.length; i++) {
    a[i] = _copyMetaData(rawPath[i], rawPath[i].slice(0));
  }

  return _copyMetaData(rawPath, a);
}
function reverseSegment(segment) {
  var i = 0,
      y;
  segment.reverse(); //this will invert the order y, x, y, x so we must flip it back.

  for (; i < segment.length; i += 2) {
    y = segment[i];
    segment[i] = segment[i + 1];
    segment[i + 1] = y;
  }

  segment.reversed = !segment.reversed;
}

var _createPath = function _createPath(e, ignore) {
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path"),
      attr = [].slice.call(e.attributes),
      i = attr.length,
      name;
  ignore = "," + ignore + ",";

  while (--i > -1) {
    name = attr[i].nodeName.toLowerCase(); //in Microsoft Edge, if you don't set the attribute with a lowercase name, it doesn't render correctly! Super weird.

    if (ignore.indexOf("," + name + ",") < 0) {
      path.setAttributeNS(null, name, attr[i].nodeValue);
    }
  }

  return path;
},
    _typeAttrs = {
  rect: "rx,ry,x,y,width,height",
  circle: "r,cx,cy",
  ellipse: "rx,ry,cx,cy",
  line: "x1,x2,y1,y2"
},
    _attrToObj = function _attrToObj(e, attrs) {
  var props = attrs ? attrs.split(",") : [],
      obj = {},
      i = props.length;

  while (--i > -1) {
    obj[props[i]] = +e.getAttribute(props[i]) || 0;
  }

  return obj;
}; //converts an SVG shape like <circle>, <rect>, <polygon>, <polyline>, <ellipse>, etc. to a <path>, swapping it in and copying the attributes to match.


function convertToPath(element, swap) {
  var type = element.tagName.toLowerCase(),
      circ = 0.552284749831,
      data,
      x,
      y,
      r,
      ry,
      path,
      rcirc,
      rycirc,
      points,
      w,
      h,
      x2,
      x3,
      x4,
      x5,
      x6,
      y2,
      y3,
      y4,
      y5,
      y6,
      attr;

  if (type === "path" || !element.getBBox) {
    return element;
  }

  path = _createPath(element, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points");
  attr = _attrToObj(element, _typeAttrs[type]);

  if (type === "rect") {
    r = attr.rx;
    ry = attr.ry || r;
    x = attr.x;
    y = attr.y;
    w = attr.width - r * 2;
    h = attr.height - ry * 2;

    if (r || ry) {
      //if there are rounded corners, render cubic beziers
      x2 = x + r * (1 - circ);
      x3 = x + r;
      x4 = x3 + w;
      x5 = x4 + r * circ;
      x6 = x4 + r;
      y2 = y + ry * (1 - circ);
      y3 = y + ry;
      y4 = y3 + h;
      y5 = y4 + ry * circ;
      y6 = y4 + ry;
      data = "M" + x6 + "," + y3 + " V" + y4 + " C" + [x6, y5, x5, y6, x4, y6, x4 - (x4 - x3) / 3, y6, x3 + (x4 - x3) / 3, y6, x3, y6, x2, y6, x, y5, x, y4, x, y4 - (y4 - y3) / 3, x, y3 + (y4 - y3) / 3, x, y3, x, y2, x2, y, x3, y, x3 + (x4 - x3) / 3, y, x4 - (x4 - x3) / 3, y, x4, y, x5, y, x6, y2, x6, y3].join(",") + "z";
    } else {
      data = "M" + (x + w) + "," + y + " v" + h + " h" + -w + " v" + -h + " h" + w + "z";
    }
  } else if (type === "circle" || type === "ellipse") {
    if (type === "circle") {
      r = ry = attr.r;
      rycirc = r * circ;
    } else {
      r = attr.rx;
      ry = attr.ry;
      rycirc = ry * circ;
    }

    x = attr.cx;
    y = attr.cy;
    rcirc = r * circ;
    data = "M" + (x + r) + "," + y + " C" + [x + r, y + rycirc, x + rcirc, y + ry, x, y + ry, x - rcirc, y + ry, x - r, y + rycirc, x - r, y, x - r, y - rycirc, x - rcirc, y - ry, x, y - ry, x + rcirc, y - ry, x + r, y - rycirc, x + r, y].join(",") + "z";
  } else if (type === "line") {
    data = "M" + attr.x1 + "," + attr.y1 + " L" + attr.x2 + "," + attr.y2; //previously, we just converted to "Mx,y Lx,y" but Safari has bugs that cause that not to render properly when using a stroke-dasharray that's not fully visible! Using a cubic bezier fixes that issue.
  } else if (type === "polyline" || type === "polygon") {
    points = (element.getAttribute("points") + "").match(_numbersExp) || [];
    x = points.shift();
    y = points.shift();
    data = "M" + x + "," + y + " L" + points.join(",");

    if (type === "polygon") {
      data += "," + x + "," + y + "z";
    }
  }

  path.setAttribute("d", rawPathToString(path._gsRawPath = stringToRawPath(data)));

  if (swap && element.parentNode) {
    element.parentNode.insertBefore(path, element);
    element.parentNode.removeChild(element);
  }

  return path;
} //returns the rotation (in degrees) at a particular progress on a rawPath (the slope of the tangent)

function getRotationAtBezierT(segment, i, t) {
  var a = segment[i],
      b = segment[i + 2],
      c = segment[i + 4],
      x;
  a += (b - a) * t;
  b += (c - b) * t;
  a += (b - a) * t;
  x = b + (c + (segment[i + 6] - c) * t - b) * t - a;
  a = segment[i + 1];
  b = segment[i + 3];
  c = segment[i + 5];
  a += (b - a) * t;
  b += (c - b) * t;
  a += (b - a) * t;
  return _round(_atan2(b + (c + (segment[i + 7] - c) * t - b) * t - a, x) * _RAD2DEG);
}

function sliceRawPath(rawPath, start, end) {
  end = _isUndefined(end) ? 1 : _roundPrecise(end) || 0; // we must round to avoid issues like 4.15 / 8 = 0.8300000000000001 instead of 0.83 or 2.8 / 5 = 0.5599999999999999 instead of 0.56 and if someone is doing a loop like start: 2.8 / 0.5, end: 2.8 / 0.5 + 1.

  start = _roundPrecise(start) || 0;
  var loops = Math.max(0, ~~(_abs(end - start) - 1e-8)),
      path = copyRawPath(rawPath);

  if (start > end) {
    start = 1 - start;
    end = 1 - end;

    _reverseRawPath(path);

    path.totalLength = 0;
  }

  if (start < 0 || end < 0) {
    var offset = Math.abs(~~Math.min(start, end)) + 1;
    start += offset;
    end += offset;
  }

  path.totalLength || cacheRawPathMeasurements(path);
  var wrap = end > 1,
      s = getProgressData(path, start, _temp, true),
      e = getProgressData(path, end, _temp2),
      eSeg = e.segment,
      sSeg = s.segment,
      eSegIndex = e.segIndex,
      sSegIndex = s.segIndex,
      ei = e.i,
      si = s.i,
      sameSegment = sSegIndex === eSegIndex,
      sameBezier = ei === si && sameSegment,
      wrapsBehind,
      sShift,
      eShift,
      i,
      copy,
      totalSegments,
      l,
      j;

  if (wrap || loops) {
    wrapsBehind = eSegIndex < sSegIndex || sameSegment && ei < si || sameBezier && e.t < s.t;

    if (_splitSegment(path, sSegIndex, si, s.t)) {
      sSegIndex++;

      if (!wrapsBehind) {
        eSegIndex++;

        if (sameBezier) {
          e.t = (e.t - s.t) / (1 - s.t);
          ei = 0;
        } else if (sameSegment) {
          ei -= si;
        }
      }
    }

    if (Math.abs(1 - (end - start)) < 1e-5) {
      eSegIndex = sSegIndex - 1;
    } else if (!e.t && eSegIndex) {
      eSegIndex--;
    } else if (_splitSegment(path, eSegIndex, ei, e.t) && wrapsBehind) {
      sSegIndex++;
    }

    if (s.t === 1) {
      sSegIndex = (sSegIndex + 1) % path.length;
    }

    copy = [];
    totalSegments = path.length;
    l = 1 + totalSegments * loops;
    j = sSegIndex;
    l += (totalSegments - sSegIndex + eSegIndex) % totalSegments;

    for (i = 0; i < l; i++) {
      _appendOrMerge(copy, path[j++ % totalSegments]);
    }

    path = copy;
  } else {
    eShift = e.t === 1 ? 6 : subdivideSegment(eSeg, ei, e.t);

    if (start !== end) {
      sShift = subdivideSegment(sSeg, si, sameBezier ? s.t / e.t : s.t);
      sameSegment && (eShift += sShift);
      eSeg.splice(ei + eShift + 2);
      (sShift || si) && sSeg.splice(0, si + sShift);
      i = path.length;

      while (i--) {
        //chop off any extra segments
        (i < sSegIndex || i > eSegIndex) && path.splice(i, 1);
      }
    } else {
      eSeg.angle = getRotationAtBezierT(eSeg, ei + eShift, 0); //record the value before we chop because it'll be impossible to determine the angle after its length is 0!

      ei += eShift;
      s = eSeg[ei];
      e = eSeg[ei + 1];
      eSeg.length = eSeg.totalLength = 0;
      eSeg.totalPoints = path.totalPoints = 8;
      eSeg.push(s, e, s, e, s, e, s, e);
    }
  }

  path.totalLength = 0;
  return path;
} //measures a Segment according to its resolution (so if segment.resolution is 6, for example, it'll take 6 samples equally across each Bezier) and create/populate a "samples" Array that has the length up to each of those sample points (always increasing from the start) as well as a "lookup" array that's broken up according to the smallest distance between 2 samples. This gives us a very fast way of looking up a progress position rather than looping through all the points/Beziers. You can optionally have it only measure a subset, starting at startIndex and going for a specific number of beziers (remember, there are 3 x/y pairs each, for a total of 6 elements for each Bezier). It will also populate a "totalLength" property, but that's not generally super accurate because by default it'll only take 6 samples per Bezier. But for performance reasons, it's perfectly adequate for measuring progress values along the path. If you need a more accurate totalLength, either increase the resolution or use the more advanced bezierToPoints() method which keeps adding points until they don't deviate by more than a certain precision value.

function measureSegment(segment, startIndex, bezierQty) {
  startIndex = startIndex || 0;

  if (!segment.samples) {
    segment.samples = [];
    segment.lookup = [];
  }

  var resolution = ~~segment.resolution || 12,
      inc = 1 / resolution,
      endIndex = segment.length,
      x1 = segment[startIndex],
      y1 = segment[startIndex + 1],
      samplesIndex = startIndex ? startIndex / 6 * resolution : 0,
      samples = segment.samples,
      lookup = segment.lookup,
      min = (startIndex ? segment.minLength : _largeNum) || _largeNum,
      prevLength = samples[samplesIndex + bezierQty * resolution - 1],
      length = startIndex ? samples[samplesIndex - 1] : 0,
      i,
      j,
      x4,
      x3,
      x2,
      xd,
      xd1,
      y4,
      y3,
      y2,
      yd,
      yd1,
      inv,
      t,
      lengthIndex,
      l,
      segLength;
  samples.length = lookup.length = 0;

  for (j = startIndex + 2; j < endIndex; j += 6) {
    x4 = segment[j + 4] - x1;
    x3 = segment[j + 2] - x1;
    x2 = segment[j] - x1;
    y4 = segment[j + 5] - y1;
    y3 = segment[j + 3] - y1;
    y2 = segment[j + 1] - y1;
    xd = xd1 = yd = yd1 = 0;

    if (_abs(x4) < .01 && _abs(y4) < .01 && _abs(x2) + _abs(y2) < .01) {
      //dump points that are sufficiently close (basically right on top of each other, making a bezier super tiny or 0 length)
      if (segment.length > 8) {
        segment.splice(j, 6);
        j -= 6;
        endIndex -= 6;
      }
    } else {
      for (i = 1; i <= resolution; i++) {
        t = inc * i;
        inv = 1 - t;
        xd = xd1 - (xd1 = (t * t * x4 + 3 * inv * (t * x3 + inv * x2)) * t);
        yd = yd1 - (yd1 = (t * t * y4 + 3 * inv * (t * y3 + inv * y2)) * t);
        l = _sqrt(yd * yd + xd * xd);

        if (l < min) {
          min = l;
        }

        length += l;
        samples[samplesIndex++] = length;
      }
    }

    x1 += x4;
    y1 += y4;
  }

  if (prevLength) {
    prevLength -= length;

    for (; samplesIndex < samples.length; samplesIndex++) {
      samples[samplesIndex] += prevLength;
    }
  }

  if (samples.length && min) {
    segment.totalLength = segLength = samples[samples.length - 1] || 0;
    segment.minLength = min;

    if (segLength / min < 9999) {
      // if the lookup would require too many values (memory problem), we skip this and instead we use a loop to lookup values directly in the samples Array
      l = lengthIndex = 0;

      for (i = 0; i < segLength; i += min) {
        lookup[l++] = samples[lengthIndex] < i ? ++lengthIndex : lengthIndex;
      }
    }
  } else {
    segment.totalLength = samples[0] = 0;
  }

  return startIndex ? length - samples[startIndex / 2 - 1] : length;
}

function cacheRawPathMeasurements(rawPath, resolution) {
  var pathLength, points, i;

  for (i = pathLength = points = 0; i < rawPath.length; i++) {
    rawPath[i].resolution = ~~resolution || 12; //steps per Bezier curve (anchor, 2 control points, to anchor)

    points += rawPath[i].length;
    pathLength += measureSegment(rawPath[i]);
  }

  rawPath.totalPoints = points;
  rawPath.totalLength = pathLength;
  return rawPath;
} //divide segment[i] at position t (value between 0 and 1, progress along that particular cubic bezier segment that starts at segment[i]). Returns how many elements were spliced into the segment array (either 0 or 6)

function subdivideSegment(segment, i, t) {
  if (t <= 0 || t >= 1) {
    return 0;
  }

  var ax = segment[i],
      ay = segment[i + 1],
      cp1x = segment[i + 2],
      cp1y = segment[i + 3],
      cp2x = segment[i + 4],
      cp2y = segment[i + 5],
      bx = segment[i + 6],
      by = segment[i + 7],
      x1a = ax + (cp1x - ax) * t,
      x2 = cp1x + (cp2x - cp1x) * t,
      y1a = ay + (cp1y - ay) * t,
      y2 = cp1y + (cp2y - cp1y) * t,
      x1 = x1a + (x2 - x1a) * t,
      y1 = y1a + (y2 - y1a) * t,
      x2a = cp2x + (bx - cp2x) * t,
      y2a = cp2y + (by - cp2y) * t;
  x2 += (x2a - x2) * t;
  y2 += (y2a - y2) * t;
  segment.splice(i + 2, 4, _round(x1a), //first control point
  _round(y1a), _round(x1), //second control point
  _round(y1), _round(x1 + (x2 - x1) * t), //new fabricated anchor on line
  _round(y1 + (y2 - y1) * t), _round(x2), //third control point
  _round(y2), _round(x2a), //fourth control point
  _round(y2a));
  segment.samples && segment.samples.splice(i / 6 * segment.resolution | 0, 0, 0, 0, 0, 0, 0, 0);
  return 6;
} // returns an object {path, segment, segIndex, i, t}

function getProgressData(rawPath, progress, decoratee, pushToNextIfAtEnd) {
  decoratee = decoratee || {};
  rawPath.totalLength || cacheRawPathMeasurements(rawPath);

  if (progress < 0 || progress > 1) {
    progress = _wrapProgress(progress);
  }

  var segIndex = 0,
      segment = rawPath[0],
      samples,
      resolution,
      length,
      min,
      max,
      i,
      t;

  if (!progress) {
    t = i = segIndex = 0;
    segment = rawPath[0];
  } else if (progress === 1) {
    t = 1;
    segIndex = rawPath.length - 1;
    segment = rawPath[segIndex];
    i = segment.length - 8;
  } else {
    if (rawPath.length > 1) {
      //speed optimization: most of the time, there's only one segment so skip the recursion.
      length = rawPath.totalLength * progress;
      max = i = 0;

      while ((max += rawPath[i++].totalLength) < length) {
        segIndex = i;
      }

      segment = rawPath[segIndex];
      min = max - segment.totalLength;
      progress = (length - min) / (max - min) || 0;
    }

    samples = segment.samples;
    resolution = segment.resolution; //how many samples per cubic bezier chunk

    length = segment.totalLength * progress;
    i = segment.lookup.length ? segment.lookup[~~(length / segment.minLength)] || 0 : _getSampleIndex(samples, length, progress);
    min = i ? samples[i - 1] : 0;
    max = samples[i];

    if (max < length) {
      min = max;
      max = samples[++i];
    }

    t = 1 / resolution * ((length - min) / (max - min) + i % resolution);
    i = ~~(i / resolution) * 6;

    if (pushToNextIfAtEnd && t === 1) {
      if (i + 6 < segment.length) {
        i += 6;
        t = 0;
      } else if (segIndex + 1 < rawPath.length) {
        i = t = 0;
        segment = rawPath[++segIndex];
      }
    }
  }

  decoratee.t = t;
  decoratee.i = i;
  decoratee.path = rawPath;
  decoratee.segment = segment;
  decoratee.segIndex = segIndex;
  return decoratee;
}

function getPositionOnPath(rawPath, progress, includeAngle, point) {
  var segment = rawPath[0],
      result = point || {},
      samples,
      resolution,
      length,
      min,
      max,
      i,
      t,
      a,
      inv;

  if (progress < 0 || progress > 1) {
    progress = _wrapProgress(progress);
  }

  segment.lookup || cacheRawPathMeasurements(rawPath);

  if (rawPath.length > 1) {
    //speed optimization: most of the time, there's only one segment so skip the recursion.
    length = rawPath.totalLength * progress;
    max = i = 0;

    while ((max += rawPath[i++].totalLength) < length) {
      segment = rawPath[i];
    }

    min = max - segment.totalLength;
    progress = (length - min) / (max - min) || 0;
  }

  samples = segment.samples;
  resolution = segment.resolution;
  length = segment.totalLength * progress;
  i = segment.lookup.length ? segment.lookup[progress < 1 ? ~~(length / segment.minLength) : segment.lookup.length - 1] || 0 : _getSampleIndex(samples, length, progress);
  min = i ? samples[i - 1] : 0;
  max = samples[i];

  if (max < length) {
    min = max;
    max = samples[++i];
  }

  t = 1 / resolution * ((length - min) / (max - min) + i % resolution) || 0;
  inv = 1 - t;
  i = ~~(i / resolution) * 6;
  a = segment[i];
  result.x = _round((t * t * (segment[i + 6] - a) + 3 * inv * (t * (segment[i + 4] - a) + inv * (segment[i + 2] - a))) * t + a);
  result.y = _round((t * t * (segment[i + 7] - (a = segment[i + 1])) + 3 * inv * (t * (segment[i + 5] - a) + inv * (segment[i + 3] - a))) * t + a);

  if (includeAngle) {
    result.angle = segment.totalLength ? getRotationAtBezierT(segment, i, t >= 1 ? 1 - 1e-9 : t ? t : 1e-9) : segment.angle || 0;
  }

  return result;
} //applies a matrix transform to RawPath (or a segment in a RawPath) and returns whatever was passed in (it transforms the values in the array(s), not a copy).

function transformRawPath(rawPath, a, b, c, d, tx, ty) {
  var j = rawPath.length,
      segment,
      l,
      i,
      x,
      y;

  while (--j > -1) {
    segment = rawPath[j];
    l = segment.length;

    for (i = 0; i < l; i += 2) {
      x = segment[i];
      y = segment[i + 1];
      segment[i] = x * a + y * c + tx;
      segment[i + 1] = x * b + y * d + ty;
    }
  }

  rawPath._dirty = 1;
  return rawPath;
} // translates SVG arc data into a segment (cubic beziers). Angle is in degrees.

function arcToSegment(lastX, lastY, rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
  if (lastX === x && lastY === y) {
    return;
  }

  rx = _abs(rx);
  ry = _abs(ry);

  var angleRad = angle % 360 * _DEG2RAD$1,
      cosAngle = _cos(angleRad),
      sinAngle = _sin(angleRad),
      PI = Math.PI,
      TWOPI = PI * 2,
      dx2 = (lastX - x) / 2,
      dy2 = (lastY - y) / 2,
      x1 = cosAngle * dx2 + sinAngle * dy2,
      y1 = -sinAngle * dx2 + cosAngle * dy2,
      x1_sq = x1 * x1,
      y1_sq = y1 * y1,
      radiiCheck = x1_sq / (rx * rx) + y1_sq / (ry * ry);

  if (radiiCheck > 1) {
    rx = _sqrt(radiiCheck) * rx;
    ry = _sqrt(radiiCheck) * ry;
  }

  var rx_sq = rx * rx,
      ry_sq = ry * ry,
      sq = (rx_sq * ry_sq - rx_sq * y1_sq - ry_sq * x1_sq) / (rx_sq * y1_sq + ry_sq * x1_sq);

  if (sq < 0) {
    sq = 0;
  }

  var coef = (largeArcFlag === sweepFlag ? -1 : 1) * _sqrt(sq),
      cx1 = coef * (rx * y1 / ry),
      cy1 = coef * -(ry * x1 / rx),
      sx2 = (lastX + x) / 2,
      sy2 = (lastY + y) / 2,
      cx = sx2 + (cosAngle * cx1 - sinAngle * cy1),
      cy = sy2 + (sinAngle * cx1 + cosAngle * cy1),
      ux = (x1 - cx1) / rx,
      uy = (y1 - cy1) / ry,
      vx = (-x1 - cx1) / rx,
      vy = (-y1 - cy1) / ry,
      temp = ux * ux + uy * uy,
      angleStart = (uy < 0 ? -1 : 1) * Math.acos(ux / _sqrt(temp)),
      angleExtent = (ux * vy - uy * vx < 0 ? -1 : 1) * Math.acos((ux * vx + uy * vy) / _sqrt(temp * (vx * vx + vy * vy)));

  isNaN(angleExtent) && (angleExtent = PI); //rare edge case. Math.cos(-1) is NaN.

  if (!sweepFlag && angleExtent > 0) {
    angleExtent -= TWOPI;
  } else if (sweepFlag && angleExtent < 0) {
    angleExtent += TWOPI;
  }

  angleStart %= TWOPI;
  angleExtent %= TWOPI;

  var segments = Math.ceil(_abs(angleExtent) / (TWOPI / 4)),
      rawPath = [],
      angleIncrement = angleExtent / segments,
      controlLength = 4 / 3 * _sin(angleIncrement / 2) / (1 + _cos(angleIncrement / 2)),
      ma = cosAngle * rx,
      mb = sinAngle * rx,
      mc = sinAngle * -ry,
      md = cosAngle * ry,
      i;

  for (i = 0; i < segments; i++) {
    angle = angleStart + i * angleIncrement;
    x1 = _cos(angle);
    y1 = _sin(angle);
    ux = _cos(angle += angleIncrement);
    uy = _sin(angle);
    rawPath.push(x1 - controlLength * y1, y1 + controlLength * x1, ux + controlLength * uy, uy - controlLength * ux, ux, uy);
  } //now transform according to the actual size of the ellipse/arc (the beziers were noramlized, between 0 and 1 on a circle).


  for (i = 0; i < rawPath.length; i += 2) {
    x1 = rawPath[i];
    y1 = rawPath[i + 1];
    rawPath[i] = x1 * ma + y1 * mc + cx;
    rawPath[i + 1] = x1 * mb + y1 * md + cy;
  }

  rawPath[i - 2] = x; //always set the end to exactly where it's supposed to be

  rawPath[i - 1] = y;
  return rawPath;
} //Spits back a RawPath with absolute coordinates. Each segment starts with a "moveTo" command (x coordinate, then y) and then 2 control points (x, y, x, y), then anchor. The goal is to minimize memory and maximize speed.


function stringToRawPath(d) {
  var a = (d + "").replace(_scientific, function (m) {
    var n = +m;
    return n < 0.0001 && n > -1e-4 ? 0 : n;
  }).match(_svgPathExp) || [],
      //some authoring programs spit out very small numbers in scientific notation like "1e-5", so make sure we round that down to 0 first.
  path = [],
      relativeX = 0,
      relativeY = 0,
      twoThirds = 2 / 3,
      elements = a.length,
      points = 0,
      errorMessage = "ERROR: malformed path: " + d,
      i,
      j,
      x,
      y,
      command,
      isRelative,
      segment,
      startX,
      startY,
      difX,
      difY,
      beziers,
      prevCommand,
      flag1,
      flag2,
      line = function line(sx, sy, ex, ey) {
    difX = (ex - sx) / 3;
    difY = (ey - sy) / 3;
    segment.push(sx + difX, sy + difY, ex - difX, ey - difY, ex, ey);
  };

  if (!d || !isNaN(a[0]) || isNaN(a[1])) {
    console.log(errorMessage);
    return path;
  }

  for (i = 0; i < elements; i++) {
    prevCommand = command;

    if (isNaN(a[i])) {
      command = a[i].toUpperCase();
      isRelative = command !== a[i]; //lower case means relative
    } else {
      //commands like "C" can be strung together without any new command characters between.
      i--;
    }

    x = +a[i + 1];
    y = +a[i + 2];

    if (isRelative) {
      x += relativeX;
      y += relativeY;
    }

    if (!i) {
      startX = x;
      startY = y;
    } // "M" (move)


    if (command === "M") {
      if (segment) {
        if (segment.length < 8) {
          //if the path data was funky and just had a M with no actual drawing anywhere, skip it.
          path.length -= 1;
        } else {
          points += segment.length;
        }
      }

      relativeX = startX = x;
      relativeY = startY = y;
      segment = [x, y];
      path.push(segment);
      i += 2;
      command = "L"; //an "M" with more than 2 values gets interpreted as "lineTo" commands ("L").
      // "C" (cubic bezier)
    } else if (command === "C") {
      if (!segment) {
        segment = [0, 0];
      }

      if (!isRelative) {
        relativeX = relativeY = 0;
      } //note: "*1" is just a fast/short way to cast the value as a Number. WAAAY faster in Chrome, slightly slower in Firefox.


      segment.push(x, y, relativeX + a[i + 3] * 1, relativeY + a[i + 4] * 1, relativeX += a[i + 5] * 1, relativeY += a[i + 6] * 1);
      i += 6; // "S" (continuation of cubic bezier)
    } else if (command === "S") {
      difX = relativeX;
      difY = relativeY;

      if (prevCommand === "C" || prevCommand === "S") {
        difX += relativeX - segment[segment.length - 4];
        difY += relativeY - segment[segment.length - 3];
      }

      if (!isRelative) {
        relativeX = relativeY = 0;
      }

      segment.push(difX, difY, x, y, relativeX += a[i + 3] * 1, relativeY += a[i + 4] * 1);
      i += 4; // "Q" (quadratic bezier)
    } else if (command === "Q") {
      difX = relativeX + (x - relativeX) * twoThirds;
      difY = relativeY + (y - relativeY) * twoThirds;

      if (!isRelative) {
        relativeX = relativeY = 0;
      }

      relativeX += a[i + 3] * 1;
      relativeY += a[i + 4] * 1;
      segment.push(difX, difY, relativeX + (x - relativeX) * twoThirds, relativeY + (y - relativeY) * twoThirds, relativeX, relativeY);
      i += 4; // "T" (continuation of quadratic bezier)
    } else if (command === "T") {
      difX = relativeX - segment[segment.length - 4];
      difY = relativeY - segment[segment.length - 3];
      segment.push(relativeX + difX, relativeY + difY, x + (relativeX + difX * 1.5 - x) * twoThirds, y + (relativeY + difY * 1.5 - y) * twoThirds, relativeX = x, relativeY = y);
      i += 2; // "H" (horizontal line)
    } else if (command === "H") {
      line(relativeX, relativeY, relativeX = x, relativeY);
      i += 1; // "V" (vertical line)
    } else if (command === "V") {
      //adjust values because the first (and only one) isn't x in this case, it's y.
      line(relativeX, relativeY, relativeX, relativeY = x + (isRelative ? relativeY - relativeX : 0));
      i += 1; // "L" (line) or "Z" (close)
    } else if (command === "L" || command === "Z") {
      if (command === "Z") {
        x = startX;
        y = startY;
        segment.closed = true;
      }

      if (command === "L" || _abs(relativeX - x) > 0.5 || _abs(relativeY - y) > 0.5) {
        line(relativeX, relativeY, x, y);

        if (command === "L") {
          i += 2;
        }
      }

      relativeX = x;
      relativeY = y; // "A" (arc)
    } else if (command === "A") {
      flag1 = a[i + 4];
      flag2 = a[i + 5];
      difX = a[i + 6];
      difY = a[i + 7];
      j = 7;

      if (flag1.length > 1) {
        // for cases when the flags are merged, like "a8 8 0 018 8" (the 0 and 1 flags are WITH the x value of 8, but it could also be "a8 8 0 01-8 8" so it may include x or not)
        if (flag1.length < 3) {
          difY = difX;
          difX = flag2;
          j--;
        } else {
          difY = flag2;
          difX = flag1.substr(2);
          j -= 2;
        }

        flag2 = flag1.charAt(1);
        flag1 = flag1.charAt(0);
      }

      beziers = arcToSegment(relativeX, relativeY, +a[i + 1], +a[i + 2], +a[i + 3], +flag1, +flag2, (isRelative ? relativeX : 0) + difX * 1, (isRelative ? relativeY : 0) + difY * 1);
      i += j;

      if (beziers) {
        for (j = 0; j < beziers.length; j++) {
          segment.push(beziers[j]);
        }
      }

      relativeX = segment[segment.length - 2];
      relativeY = segment[segment.length - 1];
    } else {
      console.log(errorMessage);
    }
  }

  i = segment.length;

  if (i < 6) {
    //in case there's odd SVG like a M0,0 command at the very end.
    path.pop();
    i = 0;
  } else if (segment[0] === segment[i - 2] && segment[1] === segment[i - 1]) {
    segment.closed = true;
  }

  path.totalPoints = points + i;
  return path;
} //populates the points array in alternating x/y values (like [x, y, x, y...] instead of individual point objects [{x, y}, {x, y}...] to conserve memory and stay in line with how we're handling segment arrays
/*
function getAngleBetweenPoints(x0, y0, x1, y1, x2, y2) { //angle between 3 points in radians
	var dx1 = x1 - x0,
		dy1 = y1 - y0,
		dx2 = x2 - x1,
		dy2 = y2 - y1,
		dx3 = x2 - x0,
		dy3 = y2 - y0,
		a = dx1 * dx1 + dy1 * dy1,
		b = dx2 * dx2 + dy2 * dy2,
		c = dx3 * dx3 + dy3 * dy3;
	return Math.acos( (a + b - c) / _sqrt(4 * a * b) );
},
*/
//pointsToSegment() doesn't handle flat coordinates (where y is always 0) the way we need (the resulting control points are always right on top of the anchors), so this function basically makes the control points go directly up and down, varying in length based on the curviness (more curvy, further control points)

function flatPointsToSegment(points, curviness) {
  if (curviness === void 0) {
    curviness = 1;
  }

  var x = points[0],
      y = 0,
      segment = [x, y],
      i = 2;

  for (; i < points.length; i += 2) {
    segment.push(x, y, points[i], y = (points[i] - x) * curviness / 2, x = points[i], -y);
  }

  return segment;
} //points is an array of x/y points, like [x, y, x, y, x, y]

function pointsToSegment(points, curviness) {
  //points = simplifyPoints(points, tolerance);
  _abs(points[0] - points[2]) < 1e-4 && _abs(points[1] - points[3]) < 1e-4 && (points = points.slice(2)); // if the first two points are super close, dump the first one.

  var l = points.length - 2,
      x = +points[0],
      y = +points[1],
      nextX = +points[2],
      nextY = +points[3],
      segment = [x, y, x, y],
      dx2 = nextX - x,
      dy2 = nextY - y,
      closed = Math.abs(points[l] - x) < 0.001 && Math.abs(points[l + 1] - y) < 0.001,
      prevX,
      prevY,
      i,
      dx1,
      dy1,
      r1,
      r2,
      r3,
      tl,
      mx1,
      mx2,
      mxm,
      my1,
      my2,
      mym;

  if (closed) {
    // if the start and end points are basically on top of each other, close the segment by adding the 2nd point to the end, and the 2nd-to-last point to the beginning (we'll remove them at the end, but this allows the curvature to look perfect)
    points.push(nextX, nextY);
    nextX = x;
    nextY = y;
    x = points[l - 2];
    y = points[l - 1];
    points.unshift(x, y);
    l += 4;
  }

  curviness = curviness || curviness === 0 ? +curviness : 1;

  for (i = 2; i < l; i += 2) {
    prevX = x;
    prevY = y;
    x = nextX;
    y = nextY;
    nextX = +points[i + 2];
    nextY = +points[i + 3];

    if (x === nextX && y === nextY) {
      continue;
    }

    dx1 = dx2;
    dy1 = dy2;
    dx2 = nextX - x;
    dy2 = nextY - y;
    r1 = _sqrt(dx1 * dx1 + dy1 * dy1); // r1, r2, and r3 correlate x and y (and z in the future). Basically 2D or 3D hypotenuse

    r2 = _sqrt(dx2 * dx2 + dy2 * dy2);
    r3 = _sqrt(Math.pow(dx2 / r2 + dx1 / r1, 2) + Math.pow(dy2 / r2 + dy1 / r1, 2));
    tl = (r1 + r2) * curviness * 0.25 / r3;
    mx1 = x - (x - prevX) * (r1 ? tl / r1 : 0);
    mx2 = x + (nextX - x) * (r2 ? tl / r2 : 0);
    mxm = x - (mx1 + ((mx2 - mx1) * (r1 * 3 / (r1 + r2) + 0.5) / 4 || 0));
    my1 = y - (y - prevY) * (r1 ? tl / r1 : 0);
    my2 = y + (nextY - y) * (r2 ? tl / r2 : 0);
    mym = y - (my1 + ((my2 - my1) * (r1 * 3 / (r1 + r2) + 0.5) / 4 || 0));

    if (x !== prevX || y !== prevY) {
      segment.push(_round(mx1 + mxm), // first control point
      _round(my1 + mym), _round(x), // anchor
      _round(y), _round(mx2 + mxm), // second control point
      _round(my2 + mym));
    }
  }

  x !== nextX || y !== nextY || segment.length < 4 ? segment.push(_round(nextX), _round(nextY), _round(nextX), _round(nextY)) : segment.length -= 2;

  if (segment.length === 2) {
    // only one point!
    segment.push(x, y, x, y, x, y);
  } else if (closed) {
    segment.splice(0, 6);
    segment.length = segment.length - 6;
  }

  return segment;
} //returns the squared distance between an x/y coordinate and a segment between x1/y1 and x2/y2
/*
Takes any of the following and converts it to an all Cubic Bezier SVG data string:
- A <path> data string like "M0,0 L2,4 v20,15 H100"
- A RawPath, like [[x, y, x, y, x, y, x, y][[x, y, x, y, x, y, x, y]]
- A Segment, like [x, y, x, y, x, y, x, y]

Note: all numbers are rounded down to the closest 0.001 to minimize memory, maximize speed, and avoid odd numbers like 1e-13
*/

function rawPathToString(rawPath) {
  if (_isNumber(rawPath[0])) {
    //in case a segment is passed in instead
    rawPath = [rawPath];
  }

  var result = "",
      l = rawPath.length,
      sl,
      s,
      i,
      segment;

  for (s = 0; s < l; s++) {
    segment = rawPath[s];
    result += "M" + _round(segment[0]) + "," + _round(segment[1]) + " C";
    sl = segment.length;

    for (i = 2; i < sl; i++) {
      result += _round(segment[i++]) + "," + _round(segment[i++]) + " " + _round(segment[i++]) + "," + _round(segment[i++]) + " " + _round(segment[i++]) + "," + _round(segment[i]) + " ";
    }

    if (segment.closed) {
      result += "z";
    }
  }

  return result;
}
/*
// takes a segment with coordinates [x, y, x, y, ...] and converts the control points into angles and lengths [x, y, angle, length, angle, length, x, y, angle, length, ...] so that it animates more cleanly and avoids odd breaks/kinks. For example, if you animate from 1 o'clock to 6 o'clock, it'd just go directly/linearly rather than around. So the length would be very short in the middle of the tween.
export function cpCoordsToAngles(segment, copy) {
	var result = copy ? segment.slice(0) : segment,
		x, y, i;
	for (i = 0; i < segment.length; i+=6) {
		x = segment[i+2] - segment[i];
		y = segment[i+3] - segment[i+1];
		result[i+2] = Math.atan2(y, x);
		result[i+3] = Math.sqrt(x * x + y * y);
		x = segment[i+6] - segment[i+4];
		y = segment[i+7] - segment[i+5];
		result[i+4] = Math.atan2(y, x);
		result[i+5] = Math.sqrt(x * x + y * y);
	}
	return result;
}

// takes a segment that was converted with cpCoordsToAngles() to have angles and lengths instead of coordinates for the control points, and converts it BACK into coordinates.
export function cpAnglesToCoords(segment, copy) {
	var result = copy ? segment.slice(0) : segment,
		length = segment.length,
		rnd = 1000,
		angle, l, i, j;
	for (i = 0; i < length; i+=6) {
		angle = segment[i+2];
		l = segment[i+3]; //length
		result[i+2] = (((segment[i] + Math.cos(angle) * l) * rnd) | 0) / rnd;
		result[i+3] = (((segment[i+1] + Math.sin(angle) * l) * rnd) | 0) / rnd;
		angle = segment[i+4];
		l = segment[i+5]; //length
		result[i+4] = (((segment[i+6] - Math.cos(angle) * l) * rnd) | 0) / rnd;
		result[i+5] = (((segment[i+7] - Math.sin(angle) * l) * rnd) | 0) / rnd;
	}
	return result;
}

//adds an "isSmooth" array to each segment and populates it with a boolean value indicating whether or not it's smooth (the control points have basically the same slope). For any smooth control points, it converts the coordinates into angle (x, in radians) and length (y) and puts them into the same index value in a smoothData array.
export function populateSmoothData(rawPath) {
	let j = rawPath.length,
		smooth, segment, x, y, x2, y2, i, l, a, a2, isSmooth, smoothData;
	while (--j > -1) {
		segment = rawPath[j];
		isSmooth = segment.isSmooth = segment.isSmooth || [0, 0, 0, 0];
		smoothData = segment.smoothData = segment.smoothData || [0, 0, 0, 0];
		isSmooth.length = 4;
		l = segment.length - 2;
		for (i = 6; i < l; i += 6) {
			x = segment[i] - segment[i - 2];
			y = segment[i + 1] - segment[i - 1];
			x2 = segment[i + 2] - segment[i];
			y2 = segment[i + 3] - segment[i + 1];
			a = _atan2(y, x);
			a2 = _atan2(y2, x2);
			smooth = (Math.abs(a - a2) < 0.09);
			if (smooth) {
				smoothData[i - 2] = a;
				smoothData[i + 2] = a2;
				smoothData[i - 1] = _sqrt(x * x + y * y);
				smoothData[i + 3] = _sqrt(x2 * x2 + y2 * y2);
			}
			isSmooth.push(smooth, smooth, 0, 0, smooth, smooth);
		}
		//if the first and last points are identical, check to see if there's a smooth transition. We must handle this a bit differently due to their positions in the array.
		if (segment[l] === segment[0] && segment[l+1] === segment[1]) {
			x = segment[0] - segment[l-2];
			y = segment[1] - segment[l-1];
			x2 = segment[2] - segment[0];
			y2 = segment[3] - segment[1];
			a = _atan2(y, x);
			a2 = _atan2(y2, x2);
			if (Math.abs(a - a2) < 0.09) {
				smoothData[l-2] = a;
				smoothData[2] = a2;
				smoothData[l-1] = _sqrt(x * x + y * y);
				smoothData[3] = _sqrt(x2 * x2 + y2 * y2);
				isSmooth[l-2] = isSmooth[l-1] = true; //don't change indexes 2 and 3 because we'll trigger everything from the END, and this will optimize file size a bit.
			}
		}
	}
	return rawPath;
}
export function pointToScreen(svgElement, point) {
	if (arguments.length < 2) { //by default, take the first set of coordinates in the path as the point
		let rawPath = getRawPath(svgElement);
		point = svgElement.ownerSVGElement.createSVGPoint();
		point.x = rawPath[0][0];
		point.y = rawPath[0][1];
	}
	return point.matrixTransform(svgElement.getScreenCTM());
}

*/

/*!
 * matrix 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _doc,
    _win,
    _docElement,
    _body,
    _divContainer,
    _svgContainer,
    _identityMatrix,
    _gEl,
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _hasOffsetBug,
    _setDoc = function _setDoc(element) {
  var doc = element.ownerDocument || element;

  if (!(_transformProp in element.style) && "msTransform" in element.style) {
    //to improve compatibility with old Microsoft browsers
    _transformProp = "msTransform";
    _transformOriginProp = _transformProp + "Origin";
  }

  while (doc.parentNode && (doc = doc.parentNode)) {}

  _win = window;
  _identityMatrix = new Matrix2D();

  if (doc) {
    _doc = doc;
    _docElement = doc.documentElement;
    _body = doc.body;
    _gEl = _doc.createElementNS("http://www.w3.org/2000/svg", "g"); // prevent any existing CSS from transforming it

    _gEl.style.transform = "none"; // now test for the offset reporting bug. Use feature detection instead of browser sniffing to make things more bulletproof and future-proof. Hopefully Safari will fix their bug soon.

    var d1 = doc.createElement("div"),
        d2 = doc.createElement("div"),
        root = doc && (doc.body || doc.firstElementChild);

    if (root && root.appendChild) {
      root.appendChild(d1);
      d1.appendChild(d2);
      d1.setAttribute("style", "position:static;transform:translate3d(0,0,1px)");
      _hasOffsetBug = d2.offsetParent !== d1;
      root.removeChild(d1);
    }
  }

  return doc;
},
    _forceNonZeroScale = function _forceNonZeroScale(e) {
  // walks up the element's ancestors and finds any that had their scale set to 0 via GSAP, and changes them to 0.0001 to ensure that measurements work. Firefox has a bug that causes it to incorrectly report getBoundingClientRect() when scale is 0.
  var a, cache;

  while (e && e !== _body) {
    cache = e._gsap;
    cache && cache.uncache && cache.get(e, "x"); // force re-parsing of transforms if necessary

    if (cache && !cache.scaleX && !cache.scaleY && cache.renderTransform) {
      cache.scaleX = cache.scaleY = 1e-4;
      cache.renderTransform(1, cache);
      a ? a.push(cache) : a = [cache];
    }

    e = e.parentNode;
  }

  return a;
},
    // possible future addition: pass an element to _forceDisplay() and it'll walk up all its ancestors and make sure anything with display: none is set to display: block, and if there's no parentNode, it'll add it to the body. It returns an Array that you can then feed to _revertDisplay() to have it revert all the changes it made.
// _forceDisplay = e => {
// 	let a = [],
// 		parent;
// 	while (e && e !== _body) {
// 		parent = e.parentNode;
// 		(_win.getComputedStyle(e).display === "none" || !parent) && a.push(e, e.style.display, parent) && (e.style.display = "block");
// 		parent || _body.appendChild(e);
// 		e = parent;
// 	}
// 	return a;
// },
// _revertDisplay = a => {
// 	for (let i = 0; i < a.length; i+=3) {
// 		a[i+1] ? (a[i].style.display = a[i+1]) : a[i].style.removeProperty("display");
// 		a[i+2] || a[i].parentNode.removeChild(a[i]);
// 	}
// },
_svgTemps = [],
    //we create 3 elements for SVG, and 3 for other DOM elements and cache them for performance reasons. They get nested in _divContainer and _svgContainer so that just one element is added to the DOM on each successive attempt. Again, performance is key.
_divTemps = [],
    _getDocScrollTop = function _getDocScrollTop() {
  return _win.pageYOffset || _doc.scrollTop || _docElement.scrollTop || _body.scrollTop || 0;
},
    _getDocScrollLeft = function _getDocScrollLeft() {
  return _win.pageXOffset || _doc.scrollLeft || _docElement.scrollLeft || _body.scrollLeft || 0;
},
    _svgOwner = function _svgOwner(element) {
  return element.ownerSVGElement || ((element.tagName + "").toLowerCase() === "svg" ? element : null);
},
    _isFixed = function _isFixed(element) {
  if (_win.getComputedStyle(element).position === "fixed") {
    return true;
  }

  element = element.parentNode;

  if (element && element.nodeType === 1) {
    // avoid document fragments which will throw an error.
    return _isFixed(element);
  }
},
    _createSibling = function _createSibling(element, i) {
  if (element.parentNode && (_doc || _setDoc(element))) {
    var svg = _svgOwner(element),
        ns = svg ? svg.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml",
        type = svg ? i ? "rect" : "g" : "div",
        x = i !== 2 ? 0 : 100,
        y = i === 3 ? 100 : 0,
        css = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;",
        e = _doc.createElementNS ? _doc.createElementNS(ns.replace(/^https/, "http"), type) : _doc.createElement(type);

    if (i) {
      if (!svg) {
        if (!_divContainer) {
          _divContainer = _createSibling(element);
          _divContainer.style.cssText = css;
        }

        e.style.cssText = css + "width:0.1px;height:0.1px;top:" + y + "px;left:" + x + "px";

        _divContainer.appendChild(e);
      } else {
        _svgContainer || (_svgContainer = _createSibling(element));
        e.setAttribute("width", 0.01);
        e.setAttribute("height", 0.01);
        e.setAttribute("transform", "translate(" + x + "," + y + ")");

        _svgContainer.appendChild(e);
      }
    }

    return e;
  }

  throw "Need document and parent.";
},
    _consolidate = function _consolidate(m) {
  // replaces SVGTransformList.consolidate() because a bug in Firefox causes it to break pointer events. See https://gsap.com/forums/topic/23248-touch-is-not-working-on-draggable-in-firefox-windows-v324/?tab=comments#comment-109800
  var c = new Matrix2D(),
      i = 0;

  for (; i < m.numberOfItems; i++) {
    c.multiply(m.getItem(i).matrix);
  }

  return c;
},
    _getCTM = function _getCTM(svg) {
  var m = svg.getCTM(),
      transform;

  if (!m) {
    // Firefox returns null for getCTM() on root <svg> elements, so this is a workaround using a <g> that we temporarily append.
    transform = svg.style[_transformProp];
    svg.style[_transformProp] = "none"; // a bug in Firefox causes css transforms to contaminate the getCTM()

    svg.appendChild(_gEl);
    m = _gEl.getCTM();
    svg.removeChild(_gEl);
    transform ? svg.style[_transformProp] = transform : svg.style.removeProperty(_transformProp.replace(/([A-Z])/g, "-$1").toLowerCase());
  }

  return m || _identityMatrix.clone(); // Firefox will still return null if the <svg> has a width/height of 0 in the browser.
},
    _placeSiblings = function _placeSiblings(element, adjustGOffset) {
  var svg = _svgOwner(element),
      isRootSVG = element === svg,
      siblings = svg ? _svgTemps : _divTemps,
      parent = element.parentNode,
      container,
      m,
      b,
      x,
      y,
      cs;

  if (element === _win) {
    return element;
  }

  siblings.length || siblings.push(_createSibling(element, 1), _createSibling(element, 2), _createSibling(element, 3));
  container = svg ? _svgContainer : _divContainer;

  if (svg) {
    if (isRootSVG) {
      b = _getCTM(element);
      x = -b.e / b.a;
      y = -b.f / b.d;
      m = _identityMatrix;
    } else if (element.getBBox) {
      b = element.getBBox();
      m = element.transform ? element.transform.baseVal : {}; // IE11 doesn't follow the spec.

      m = !m.numberOfItems ? _identityMatrix : m.numberOfItems > 1 ? _consolidate(m) : m.getItem(0).matrix; // don't call m.consolidate().matrix because a bug in Firefox makes pointer events not work when consolidate() is called on the same tick as getBoundingClientRect()! See https://gsap.com/forums/topic/23248-touch-is-not-working-on-draggable-in-firefox-windows-v324/?tab=comments#comment-109800

      x = m.a * b.x + m.c * b.y;
      y = m.b * b.x + m.d * b.y;
    } else {
      // may be a <mask> which has no getBBox() so just use defaults instead of throwing errors.
      m = new Matrix2D();
      x = y = 0;
    }

    if (adjustGOffset && element.tagName.toLowerCase() === "g") {
      x = y = 0;
    }

    (isRootSVG ? svg : parent).appendChild(container);
    container.setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + (m.e + x) + "," + (m.f + y) + ")");
  } else {
    x = y = 0;

    if (_hasOffsetBug) {
      // some browsers (like Safari) have a bug that causes them to misreport offset values. When an ancestor element has a transform applied, it's supposed to treat it as if it's position: relative (new context). Safari botches this, so we need to find the closest ancestor (between the element and its offsetParent) that has a transform applied and if one is found, grab its offsetTop/Left and subtract them to compensate.
      m = element.offsetParent;
      b = element;

      while (b && (b = b.parentNode) && b !== m && b.parentNode) {
        if ((_win.getComputedStyle(b)[_transformProp] + "").length > 4) {
          x = b.offsetLeft;
          y = b.offsetTop;
          b = 0;
        }
      }
    }

    cs = _win.getComputedStyle(element);

    if (cs.position !== "absolute" && cs.position !== "fixed") {
      m = element.offsetParent;

      while (parent && parent !== m) {
        // if there's an ancestor element between the element and its offsetParent that's scrolled, we must factor that in.
        x += parent.scrollLeft || 0;
        y += parent.scrollTop || 0;
        parent = parent.parentNode;
      }
    }

    b = container.style;
    b.top = element.offsetTop - y + "px";
    b.left = element.offsetLeft - x + "px";
    b[_transformProp] = cs[_transformProp];
    b[_transformOriginProp] = cs[_transformOriginProp]; // b.border = m.border;
    // b.borderLeftStyle = m.borderLeftStyle;
    // b.borderTopStyle = m.borderTopStyle;
    // b.borderLeftWidth = m.borderLeftWidth;
    // b.borderTopWidth = m.borderTopWidth;

    b.position = cs.position === "fixed" ? "fixed" : "absolute";
    element.parentNode.appendChild(container);
  }

  return container;
},
    _setMatrix = function _setMatrix(m, a, b, c, d, e, f) {
  m.a = a;
  m.b = b;
  m.c = c;
  m.d = d;
  m.e = e;
  m.f = f;
  return m;
};

var Matrix2D = /*#__PURE__*/function () {
  function Matrix2D(a, b, c, d, e, f) {
    if (a === void 0) {
      a = 1;
    }

    if (b === void 0) {
      b = 0;
    }

    if (c === void 0) {
      c = 0;
    }

    if (d === void 0) {
      d = 1;
    }

    if (e === void 0) {
      e = 0;
    }

    if (f === void 0) {
      f = 0;
    }

    _setMatrix(this, a, b, c, d, e, f);
  }

  var _proto = Matrix2D.prototype;

  _proto.inverse = function inverse() {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f,
        determinant = a * d - b * c || 1e-10;
    return _setMatrix(this, d / determinant, -b / determinant, -c / determinant, a / determinant, (c * f - d * e) / determinant, -(a * f - b * e) / determinant);
  };

  _proto.multiply = function multiply(matrix) {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f,
        a2 = matrix.a,
        b2 = matrix.c,
        c2 = matrix.b,
        d2 = matrix.d,
        e2 = matrix.e,
        f2 = matrix.f;
    return _setMatrix(this, a2 * a + c2 * c, a2 * b + c2 * d, b2 * a + d2 * c, b2 * b + d2 * d, e + e2 * a + f2 * c, f + e2 * b + f2 * d);
  };

  _proto.clone = function clone() {
    return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f);
  };

  _proto.equals = function equals(matrix) {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f;
    return a === matrix.a && b === matrix.b && c === matrix.c && d === matrix.d && e === matrix.e && f === matrix.f;
  };

  _proto.apply = function apply(point, decoratee) {
    if (decoratee === void 0) {
      decoratee = {};
    }

    var x = point.x,
        y = point.y,
        a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f;
    decoratee.x = x * a + y * c + e || 0;
    decoratee.y = x * b + y * d + f || 0;
    return decoratee;
  };

  return Matrix2D;
}(); // Feed in an element and it'll return a 2D matrix (optionally inverted) so that you can translate between coordinate spaces.
// Inverting lets you translate a global point into a local coordinate space. No inverting lets you go the other way.
// We needed this to work around various browser bugs, like Firefox doesn't accurately report getScreenCTM() when there
// are transforms applied to ancestor elements.
// The matrix math to convert any x/y coordinate is as follows, which is wrapped in a convenient apply() method of Matrix2D above:
//     tx = m.a * x + m.c * y + m.e
//     ty = m.b * x + m.d * y + m.f

function getGlobalMatrix(element, inverse, adjustGOffset, includeScrollInFixed) {
  // adjustGOffset is typically used only when grabbing an element's PARENT's global matrix, and it ignores the x/y offset of any SVG <g> elements because they behave in a special way.
  if (!element || !element.parentNode || (_doc || _setDoc(element)).documentElement === element) {
    return new Matrix2D();
  }

  var zeroScales = _forceNonZeroScale(element),
      svg = _svgOwner(element),
      temps = svg ? _svgTemps : _divTemps,
      container = _placeSiblings(element, adjustGOffset),
      b1 = temps[0].getBoundingClientRect(),
      b2 = temps[1].getBoundingClientRect(),
      b3 = temps[2].getBoundingClientRect(),
      parent = container.parentNode,
      isFixed = !includeScrollInFixed && _isFixed(element),
      m = new Matrix2D((b2.left - b1.left) / 100, (b2.top - b1.top) / 100, (b3.left - b1.left) / 100, (b3.top - b1.top) / 100, b1.left + (isFixed ? 0 : _getDocScrollLeft()), b1.top + (isFixed ? 0 : _getDocScrollTop()));

  parent.removeChild(container);

  if (zeroScales) {
    b1 = zeroScales.length;

    while (b1--) {
      b2 = zeroScales[b1];
      b2.scaleX = b2.scaleY = 0;
      b2.renderTransform(1, b2);
    }
  }

  return inverse ? m.inverse() : m;
}
// 	_doc || _setDoc(element);
// 	let m = (_win.getComputedStyle(element)[_transformProp] + "").substr(7).match(/[-.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g),
// 		is2D = m && m.length === 6;
// 	return !m || m.length < 6 ? new Matrix2D() : new Matrix2D(+m[0], +m[1], +m[is2D ? 2 : 4], +m[is2D ? 3 : 5], +m[is2D ? 4 : 12], +m[is2D ? 5 : 13]);
// }

/*!
 * MotionPathPlugin 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/


var _xProps = "x,translateX,left,marginLeft,xPercent".split(","),
    _yProps = "y,translateY,top,marginTop,yPercent".split(","),
    _DEG2RAD = Math.PI / 180,
    gsap,
    PropTween,
    _getUnit,
    _toArray,
    _getStyleSaver,
    _reverting,
    _getGSAP = function _getGSAP() {
  return gsap || typeof window !== "undefined" && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _populateSegmentFromArray = function _populateSegmentFromArray(segment, values, property, mode) {
  //mode: 0 = x but don't fill y yet, 1 = y, 2 = x and fill y with 0.
  var l = values.length,
      si = mode === 2 ? 0 : mode,
      i = 0;

  for (; i < l; i++) {
    segment[si] = parseFloat(values[i][property]);
    mode === 2 && (segment[si + 1] = 0);
    si += 2;
  }

  return segment;
},
    _getPropNum = function _getPropNum(target, prop, unit) {
  return parseFloat(target._gsap.get(target, prop, unit || "px")) || 0;
},
    _relativize = function _relativize(segment) {
  var x = segment[0],
      y = segment[1],
      i;

  for (i = 2; i < segment.length; i += 2) {
    x = segment[i] += x;
    y = segment[i + 1] += y;
  }
},
    // feed in an array of quadratic bezier points like [{x: 0, y: 0}, ...] and it'll convert it to cubic bezier
// _quadToCubic = points => {
// 	let cubic = [],
// 		l = points.length - 1,
// 		i = 1,
// 		a, b, c;
// 	for (; i < l; i+=2) {
// 		a = points[i-1];
// 		b = points[i];
// 		c = points[i+1];
// 		cubic.push(a, {x: (2 * b.x + a.x) / 3, y: (2 * b.y + a.y) / 3}, {x: (2 * b.x + c.x) / 3, y: (2 * b.y + c.y) / 3});
// 	}
// 	cubic.push(points[l]);
// 	return cubic;
// },
_segmentToRawPath = function _segmentToRawPath(plugin, segment, target, x, y, slicer, vars, unitX, unitY) {
  if (vars.type === "cubic") {
    segment = [segment];
  } else {
    vars.fromCurrent !== false && segment.unshift(_getPropNum(target, x, unitX), y ? _getPropNum(target, y, unitY) : 0);
    vars.relative && _relativize(segment);
    var pointFunc = y ? pointsToSegment : flatPointsToSegment;
    segment = [pointFunc(segment, vars.curviness)];
  }

  segment = slicer(_align(segment, target, vars));

  _addDimensionalPropTween(plugin, target, x, segment, "x", unitX);

  y && _addDimensionalPropTween(plugin, target, y, segment, "y", unitY);
  return cacheRawPathMeasurements(segment, vars.resolution || (vars.curviness === 0 ? 20 : 12)); //when curviness is 0, it creates control points right on top of the anchors which makes it more sensitive to resolution, thus we change the default accordingly.
},
    _emptyFunc = function _emptyFunc(v) {
  return v;
},
    _numExp = /[-+\.]*\d+\.?(?:e-|e\+)?\d*/g,
    _originToPoint = function _originToPoint(element, origin, parentMatrix) {
  // origin is an array of normalized values (0-1) in relation to the width/height, so [0.5, 0.5] would be the center. It can also be "auto" in which case it will be the top left unless it's a <path>, when it will start at the beginning of the path itself.
  var m = getGlobalMatrix(element),
      x = 0,
      y = 0,
      svg;

  if ((element.tagName + "").toLowerCase() === "svg") {
    svg = element.viewBox.baseVal;
    svg.width || (svg = {
      width: +element.getAttribute("width"),
      height: +element.getAttribute("height")
    });
  } else {
    svg = origin && element.getBBox && element.getBBox();
  }

  if (origin && origin !== "auto") {
    x = origin.push ? origin[0] * (svg ? svg.width : element.offsetWidth || 0) : origin.x;
    y = origin.push ? origin[1] * (svg ? svg.height : element.offsetHeight || 0) : origin.y;
  }

  return parentMatrix.apply(x || y ? m.apply({
    x: x,
    y: y
  }) : {
    x: m.e,
    y: m.f
  });
},
    _getAlignMatrix = function _getAlignMatrix(fromElement, toElement, fromOrigin, toOrigin) {
  var parentMatrix = getGlobalMatrix(fromElement.parentNode, true, true),
      m = parentMatrix.clone().multiply(getGlobalMatrix(toElement)),
      fromPoint = _originToPoint(fromElement, fromOrigin, parentMatrix),
      _originToPoint2 = _originToPoint(toElement, toOrigin, parentMatrix),
      x = _originToPoint2.x,
      y = _originToPoint2.y,
      p;

  m.e = m.f = 0;

  if (toOrigin === "auto" && toElement.getTotalLength && toElement.tagName.toLowerCase() === "path") {
    p = toElement.getAttribute("d").match(_numExp) || [];
    p = m.apply({
      x: +p[0],
      y: +p[1]
    });
    x += p.x;
    y += p.y;
  } //if (p || (toElement.getBBox && fromElement.getBBox && toElement.ownerSVGElement === fromElement.ownerSVGElement)) {


  if (p) {
    p = m.apply(toElement.getBBox());
    x -= p.x;
    y -= p.y;
  }

  m.e = x - fromPoint.x;
  m.f = y - fromPoint.y;
  return m;
},
    _align = function _align(rawPath, target, _ref) {
  var align = _ref.align,
      matrix = _ref.matrix,
      offsetX = _ref.offsetX,
      offsetY = _ref.offsetY,
      alignOrigin = _ref.alignOrigin;

  var x = rawPath[0][0],
      y = rawPath[0][1],
      curX = _getPropNum(target, "x"),
      curY = _getPropNum(target, "y"),
      alignTarget,
      m,
      p;

  if (!rawPath || !rawPath.length) {
    return getRawPath("M0,0L0,0");
  }

  if (align) {
    if (align === "self" || (alignTarget = _toArray(align)[0] || target) === target) {
      transformRawPath(rawPath, 1, 0, 0, 1, curX - x, curY - y);
    } else {
      if (alignOrigin && alignOrigin[2] !== false) {
        gsap.set(target, {
          transformOrigin: alignOrigin[0] * 100 + "% " + alignOrigin[1] * 100 + "%"
        });
      } else {
        alignOrigin = [_getPropNum(target, "xPercent") / -100, _getPropNum(target, "yPercent") / -100];
      }

      m = _getAlignMatrix(target, alignTarget, alignOrigin, "auto");
      p = m.apply({
        x: x,
        y: y
      });
      transformRawPath(rawPath, m.a, m.b, m.c, m.d, curX + m.e - (p.x - m.e), curY + m.f - (p.y - m.f));
    }
  }

  if (matrix) {
    transformRawPath(rawPath, matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
  } else if (offsetX || offsetY) {
    transformRawPath(rawPath, 1, 0, 0, 1, offsetX || 0, offsetY || 0);
  }

  return rawPath;
},
    _addDimensionalPropTween = function _addDimensionalPropTween(plugin, target, property, rawPath, pathProperty, forceUnit) {
  var cache = target._gsap,
      harness = cache.harness,
      alias = harness && harness.aliases && harness.aliases[property],
      prop = alias && alias.indexOf(",") < 0 ? alias : property,
      pt = plugin._pt = new PropTween(plugin._pt, target, prop, 0, 0, _emptyFunc, 0, cache.set(target, prop, plugin));
  pt.u = _getUnit(cache.get(target, prop, forceUnit)) || 0;
  pt.path = rawPath;
  pt.pp = pathProperty;

  plugin._props.push(prop);
},
    _sliceModifier = function _sliceModifier(start, end) {
  return function (rawPath) {
    return start || end !== 1 ? sliceRawPath(rawPath, start, end) : rawPath;
  };
};

var MotionPathPlugin = {
  version: "3.12.5",
  name: "motionPath",
  register: function register(core, Plugin, propTween) {
    gsap = core;
    _getUnit = gsap.utils.getUnit;
    _toArray = gsap.utils.toArray;
    _getStyleSaver = gsap.core.getStyleSaver;

    _reverting = gsap.core.reverting || function () {};

    PropTween = propTween;
  },
  init: function init(target, vars, tween) {
    if (!gsap) {
      console.warn("Please gsap.registerPlugin(MotionPathPlugin)");
      return false;
    }

    if (!(typeof vars === "object" && !vars.style) || !vars.path) {
      vars = {
        path: vars
      };
    }

    var rawPaths = [],
        _vars = vars,
        path = _vars.path,
        autoRotate = _vars.autoRotate,
        unitX = _vars.unitX,
        unitY = _vars.unitY,
        x = _vars.x,
        y = _vars.y,
        firstObj = path[0],
        slicer = _sliceModifier(vars.start, "end" in vars ? vars.end : 1),
        rawPath,
        p;

    this.rawPaths = rawPaths;
    this.target = target;
    this.tween = tween;
    this.styles = _getStyleSaver && _getStyleSaver(target, "transform");

    if (this.rotate = autoRotate || autoRotate === 0) {
      //get the rotational data FIRST so that the setTransform() method is called in the correct order in the render() loop - rotation gets set last.
      this.rOffset = parseFloat(autoRotate) || 0;
      this.radians = !!vars.useRadians;
      this.rProp = vars.rotation || "rotation"; // rotation property

      this.rSet = target._gsap.set(target, this.rProp, this); // rotation setter

      this.ru = _getUnit(target._gsap.get(target, this.rProp)) || 0; // rotation units
    }

    if (Array.isArray(path) && !("closed" in path) && typeof firstObj !== "number") {
      for (p in firstObj) {
        if (!x && ~_xProps.indexOf(p)) {
          x = p;
        } else if (!y && ~_yProps.indexOf(p)) {
          y = p;
        }
      }

      if (x && y) {
        //correlated values
        rawPaths.push(_segmentToRawPath(this, _populateSegmentFromArray(_populateSegmentFromArray([], path, x, 0), path, y, 1), target, x, y, slicer, vars, unitX || _getUnit(path[0][x]), unitY || _getUnit(path[0][y])));
      } else {
        x = y = 0;
      }

      for (p in firstObj) {
        p !== x && p !== y && rawPaths.push(_segmentToRawPath(this, _populateSegmentFromArray([], path, p, 2), target, p, 0, slicer, vars, _getUnit(path[0][p])));
      }
    } else {
      rawPath = slicer(_align(getRawPath(vars.path), target, vars));
      cacheRawPathMeasurements(rawPath, vars.resolution);
      rawPaths.push(rawPath);

      _addDimensionalPropTween(this, target, vars.x || "x", rawPath, "x", vars.unitX || "px");

      _addDimensionalPropTween(this, target, vars.y || "y", rawPath, "y", vars.unitY || "px");
    }
  },
  render: function render(ratio, data) {
    var rawPaths = data.rawPaths,
        i = rawPaths.length,
        pt = data._pt;

    if (data.tween._time || !_reverting()) {
      if (ratio > 1) {
        ratio = 1;
      } else if (ratio < 0) {
        ratio = 0;
      }

      while (i--) {
        getPositionOnPath(rawPaths[i], ratio, !i && data.rotate, rawPaths[i]);
      }

      while (pt) {
        pt.set(pt.t, pt.p, pt.path[pt.pp] + pt.u, pt.d, ratio);
        pt = pt._next;
      }

      data.rotate && data.rSet(data.target, data.rProp, rawPaths[0].angle * (data.radians ? _DEG2RAD : 1) + data.rOffset + data.ru, data, ratio);
    } else {
      data.styles.revert();
    }
  },
  getLength: function getLength(path) {
    return cacheRawPathMeasurements(getRawPath(path)).totalLength;
  },
  sliceRawPath: sliceRawPath,
  getRawPath: getRawPath,
  pointsToSegment: pointsToSegment,
  stringToRawPath: stringToRawPath,
  rawPathToString: rawPathToString,
  transformRawPath: transformRawPath,
  getGlobalMatrix: getGlobalMatrix,
  getPositionOnPath: getPositionOnPath,
  cacheRawPathMeasurements: cacheRawPathMeasurements,
  convertToPath: function convertToPath$1(targets, swap) {
    return _toArray(targets).map(function (target) {
      return convertToPath(target, swap !== false);
    });
  },
  convertCoordinates: function convertCoordinates(fromElement, toElement, point) {
    var m = getGlobalMatrix(toElement, true, true).multiply(getGlobalMatrix(fromElement));
    return point ? m.apply(point) : m;
  },
  getAlignMatrix: _getAlignMatrix,
  getRelativePosition: function getRelativePosition(fromElement, toElement, fromOrigin, toOrigin) {
    var m = _getAlignMatrix(fromElement, toElement, fromOrigin, toOrigin);

    return {
      x: m.e,
      y: m.f
    };
  },
  arrayToRawPath: function arrayToRawPath(value, vars) {
    vars = vars || {};

    var segment = _populateSegmentFromArray(_populateSegmentFromArray([], value, vars.x || "x", 0), value, vars.y || "y", 1);

    vars.relative && _relativize(segment);
    return [vars.type === "cubic" ? segment : pointsToSegment(segment, vars.curviness)];
  }
};
_getGSAP() && gsap.registerPlugin(MotionPathPlugin);

var ApiChannel = /* @__PURE__ */ ((ApiChannel2) => {
  ApiChannel2["domToCS"] = "eternl-dom-to-cs";
  ApiChannel2["csToDom"] = "eternl-cs-to-dom";
  ApiChannel2["csToBg"] = "eternl-cs-to-bg";
  ApiChannel2["bgToCs"] = "eternl-bg-to-cs";
  ApiChannel2["bgToEnable"] = "eternl-bg-to-enable";
  ApiChannel2["enableToBg"] = "eternl-enable-to-bg";
  ApiChannel2["bgToSidePanel"] = "eternl-bg-to-side-panel";
  ApiChannel2["sidePanelToBg"] = "eternl-side-panel-to-bg";
  ApiChannel2["bgToMain"] = "eternl-bg-to-main";
  ApiChannel2["mainToBg"] = "eternl-main-to-bg";
  ApiChannel2["bgToPermissions"] = "eternl-bg-to-permissions";
  ApiChannel2["permissionsToBg"] = "eternl-permissions-to-bg";
  ApiChannel2["bgToSignTx"] = "eternl-bg-to-sign-tx";
  ApiChannel2["signTxToBg"] = "eternl-sign-tx-to-bg";
  ApiChannel2["bgToSignData"] = "eternl-bg-to-sign-data";
  ApiChannel2["signDataToBg"] = "eternl-sign-data-to-bg";
  ApiChannel2["popupToBg"] = "eternl-popup-to-bg";
  ApiChannel2["bgToOffscreen"] = "eternl-bg-to-offscreen";
  ApiChannel2["offscreenToBg"] = "eternl-offscreen-to-bg";
  return ApiChannel2;
})(ApiChannel || {});

const extCip30 = { cip: 30 };
const extCip95 = { cip: 95 };
const extCip103 = { cip: 103 };
const extCip104 = { cip: 104 };
const extCip142 = { cip: 142 };
const supportedExtensions = [
  extCip30,
  extCip95,
  extCip103,
  extCip104,
  extCip142
];
const autoGrantWithCIP30List = [
  extCip103,
  extCip142
];
const METHOD = {
  enable: "enable",
  isEnabled: "isEnabled",
  getExtensions: "getExtensions",
  getNetworkId: "getNetworkId",
  getBalance: "getBalance",
  getChangeAddress: "getChangeAddress",
  getRewardAddresses: "getRewardAddresses",
  getRewardAddress: "getRewardAddress",
  getUnusedAddresses: "getUnusedAddresses",
  getForcedUnusedAddresses: "getForcedUnusedAddresses",
  getUsedAddresses: "getUsedAddresses",
  getUtxos: "getUtxos",
  getCollateral: "getCollateral",
  getLockedUtxos: "getLockedUtxos",
  signData: "signData",
  signTx: "signTx",
  submitTx: "submitTx",
  syncAccount: "syncAccount",
  enableLogs: "enableLogs",
  // CIP-95
  getPubDRepKey: "getPubDRepKey",
  getRegisteredPubStakeKeys: "getRegisteredPubStakeKeys",
  getUnregisteredPubStakeKeys: "getUnregisteredPubStakeKeys",
  // CIP-103
  signTxs: "signTxs",
  // CIP-104
  getAccountPub: "getAccountPub",
  // CIP-142
  getNetworkMagic: "getNetworkMagic",
  // experimental
  getConnectedNetworkId: "getConnectedNetworkId"
};
const DEFAULT_PAGINATE = { page: 0, limit: Number.MAX_SAFE_INTEGER };

const _reqMap = /* @__PURE__ */ new Map();
const setApiRequest = (req, callerId) => {
  const _oldReq = _reqMap.get(callerId);
  if (_oldReq && _oldReq.payload.resolve) {
    _oldReq.payload.resolve();
    delete _oldReq.payload.resolve;
  }
  _reqMap.set(callerId, req ?? null);
};
const getApiRequest = (callerId) => {
  return _reqMap.get(callerId) ?? null;
};

ref({});
ref({});

const getConnectedOriginsMap = () => getObjRef("connectedOrigins", {});
const setConnectedOriginsMap$1 = (value) => {
  const _ref = getConnectedOriginsMap();
  _ref.value = value;
  forceSetLS("connectedOrigins", value);
};

let _connectedOriginsMap = {};
let _dappAccountId = "";
let _originAccountList = [];
const setConnectedOriginsMap = (connectedOriginsMap) => {
  _connectedOriginsMap = connectedOriginsMap;
  return _connectedOriginsMap;
};
const setDappAccountId = (dappAccountId) => {
  _dappAccountId = dappAccountId;
  return _dappAccountId;
};
const addConnectedOrigin$1 = (origin, extensions) => {
  if (!extensions) {
    return _connectedOriginsMap;
  }
  const originExtensionList = _connectedOriginsMap[origin] ?? [];
  for (const extension of extensions) {
    if (!originExtensionList.some((e) => e.cip === extension.cip)) {
      originExtensionList.push(extension);
    }
  }
  _connectedOriginsMap[origin] = originExtensionList;
  return _connectedOriginsMap;
};
const isConnectedOrigin$1 = (origin, extensions) => {
  if (!origin) {
    return void 0;
  }
  const map = _connectedOriginsMap;
  let originExtensions = map[origin];
  if (!originExtensions) {
    return extensions;
  }
  const grantExtensionList = [];
  if (extensions) {
    grantExtensionList.push(...extensions);
  }
  if (typeof originExtensions === "object") {
    originExtensions = Object.values(originExtensions);
  }
  for (let i = 0; i < originExtensions.length; i++) {
    const extension = originExtensions[i];
    const index = grantExtensionList.findIndex((e) => e.cip === extension.cip);
    if (index > -1) {
      grantExtensionList.splice(index, 1);
    }
  }
  return grantExtensionList.length === 0 ? null : grantExtensionList;
};
const setOriginAccount$1 = (origin, domId, calledEnable) => {
  if (!domId) {
    domId = "/ndi";
  }
  if (!domId.startsWith("/")) {
    domId = "/" + domId;
  }
  let found = false;
  let originAccount = null;
  for (let i = 0; i < _originAccountList.length; i++) {
    const entry = _originAccountList[i];
    if (entry.origin === origin && entry.domId === domId) {
      originAccount = entry;
      entry.lastUpdated = Date.now();
      if (entry.accountId === _dappAccountId) {
        entry.needsEnableCall = false;
      } else if (calledEnable) {
        entry.accountId = _dappAccountId;
        entry.needsEnableCall = false;
      } else {
        entry.needsEnableCall = true;
      }
      found = true;
      break;
    }
  }
  if (!found) {
    originAccount = {
      accountId: _dappAccountId,
      origin,
      domId,
      lastUpdated: Date.now(),
      needsEnableCall: !calledEnable
    };
    _originAccountList.push(originAccount);
  }
  for (let i = _originAccountList.length - 1; i >= 0; i--) {
    const entry = _originAccountList[i];
    if (entry.lastUpdated < Date.now() - 1e3 * 60 * 60 * 4) {
      _originAccountList.splice(i, 1);
    }
  }
  return { originAccountList: _originAccountList, originAccount };
};

const isConnectedOrigin = (origin, extensions) => {
  if (!origin) {
    return void 0;
  }
  const map = getConnectedOriginsMap().value;
  setConnectedOriginsMap(map);
  return isConnectedOrigin$1(origin, extensions);
};
const getConnectedExtensions = (origin) => {
  const map = getConnectedOriginsMap().value;
  return origin ? map[origin] ?? [] : [];
};
const addConnectedOrigin = (origin, extensions) => {
  if (!origin) {
    return;
  }
  const map = getConnectedOriginsMap().value;
  setConnectedOriginsMap(map);
  addConnectedOrigin$1(origin, extensions);
  setConnectedOriginsMap$1(map);
};
const setOriginAccount = (appAccoundId, origin, domId, calledEnable) => {
  setDappAccountId(appAccoundId);
  const {
    originAccount
  } = setOriginAccount$1(origin, domId, calledEnable);
  return originAccount;
};
const isOriginEnabledAccount = (appAccoundId, origin, domId, calledEnable) => !setOriginAccount(appAccoundId, origin, domId, calledEnable).needsEnableCall;

const ErrorSubmitTx = {
  failed: "ErrorSubmitTx.failed",
  noTxToSubmit: "ErrorSubmitTx.noTxToSubmit"
};

const createIReceiveAddress = (bech32, used, path, pathInfo) => {
  return {
    used,
    bech32,
    pathInfo,
    searchablePath: path.join(" ")
  };
};

const cslDerivePubKey = (key, path, doHarden, freeKey) => {
  let _keyInit = key;
  let _key = key;
  for (let p = 0; p < path.length; p++) {
    _key = _key.derive(path[p]);
    if (key !== _keyInit) {
      safeFreeCSLObject(key);
    }
    key = _key;
  }
  if (key !== _keyInit) {
    safeFreeCSLObject(_keyInit);
  }
  return _key;
};
const derivePubKey = (pubBech32, path, doHarden) => cslDerivePubKey(getCSLBip32PublicKey(pubBech32), path);
const getDerivationPath = (path) => {
  if (path.length === 0) return "";
  return `m/${path.map((step, index) => step + (index < 3 ? "'" : "")).join("/")}`;
};

const getPubKeyFromPrvKey = (prvBech32) => {
  const cslPrvKey = Bip32PrivateKey.from_bech32(prvBech32);
  const cslPubKey = cslPrvKey.to_public();
  const pubKeyBech32 = cslPubKey.to_bech32();
  safeFreeCSLObject(cslPrvKey);
  safeFreeCSLObject(cslPubKey);
  return pubKeyBech32;
};
const createPubKeyStake = (accPubBech32, index) => {
  const cslPubKey = derivePubKey(accPubBech32, [chain.stake, index]);
  const pubKeyBech32 = cslPubKey.to_bech32();
  safeFreeCSLObject(cslPubKey);
  return pubKeyBech32;
};
const getPubKeyStake = (accPubBech32, index) => {
  const stakeKey = createPubKeyStake(accPubBech32, index);
  const cslPubKey = getCSLBip32PublicKey(stakeKey);
  const rawKey = cslPubKey.to_raw_key();
  const hex = toHexString(rawKey.as_bytes());
  safeFreeCSLObject(rawKey);
  safeFreeCSLObject(cslPubKey);
  return hex;
};
const createPubKeyDRep = (accPubBech32, index) => {
  const cslPubKey = derivePubKey(accPubBech32, [chain.drep, index]);
  const pubKeyBech32 = cslPubKey.to_bech32();
  safeFreeCSLObject(cslPubKey);
  return pubKeyBech32;
};
const getPubKeyDRep = (accPubBech32, index) => {
  const drepKey = createPubKeyDRep(accPubBech32, index);
  const cslPubKey = getCSLBip32PublicKey(drepKey);
  const rawKey = cslPubKey.to_raw_key();
  const hex = toHexString(rawKey.as_bytes());
  safeFreeCSLObject(rawKey);
  safeFreeCSLObject(cslPubKey);
  return hex;
};

const getChangeAddress = (accountData, onlyIfEnabled = false, preferRootAddr = false, preferPaymentAddr = false, ignoreSAM = false, free) => {
  if (!accountData) {
    return null;
  }
  const networkId = accountData.state.networkId;
  const {
    isPayScript,
    isStakeScript
  } = getScriptState(accountData, true, true);
  if (!ignoreSAM && accountData.settings.sam.enabled) {
    const customAddrBech32 = accountData.settings.sam.addr ?? null;
    if (customAddrBech32) {
      const { paymentCred } = getAddressCredentials(customAddrBech32);
      const {
        paymentKey,
        changeKey: changeKey2
      } = getAddressKey([accountData.keys], paymentCred, null);
      let receiveAddr = null;
      if (paymentKey) {
        receiveAddr = createIReceiveAddress(customAddrBech32, paymentKey.used, paymentKey.path, getDerivationPath(paymentKey.path));
      } else if (changeKey2) {
        receiveAddr = createIReceiveAddress(customAddrBech32, changeKey2.used, changeKey2.path, getDerivationPath(changeKey2.path));
      }
      if (receiveAddr) {
        return {
          csl: getCSLAddress(customAddrBech32, free),
          addr: receiveAddr
        };
      } else {
        throw AccountError.wrongCustomAddress;
      }
    } else {
      const paymentKey = accountData.keys.payment[0];
      const stakeKey2 = accountData.keys.stake.length > 0 ? accountData.keys.stake[0] : null;
      const addrBech322 = stakeKey2 && isStakingEnabled(networkId) ? getBaseAddressFromCred(paymentKey.cred, stakeKey2.cred, networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(paymentKey.cred, networkId, isPayScript);
      return {
        csl: getCSLAddress(addrBech322, free),
        addr: createIReceiveAddress(addrBech322, paymentKey.used, paymentKey.path, getDerivationPath(paymentKey.path))
      };
    }
  }
  if (onlyIfEnabled) {
    return null;
  }
  if (preferRootAddr) {
    const paymentKey = accountData.keys.payment[0];
    const stakeKey2 = accountData.keys.stake.length > 0 ? accountData.keys.stake[0] : null;
    const addrBech322 = stakeKey2 && isStakingEnabled(networkId) ? getBaseAddressFromCred(paymentKey.cred, stakeKey2.cred, networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(paymentKey.cred, networkId, isPayScript);
    return {
      csl: getCSLAddress(addrBech322, free),
      addr: createIReceiveAddress(addrBech322, paymentKey.used, paymentKey.path, getDerivationPath(paymentKey.path))
    };
  }
  const changeKey = preferPaymentAddr ? accountData.keys.payment.find((payment) => !payment.used) ?? accountData.keys.payment[0] : accountData.keys.change.find((change) => !change.used) ?? accountData.keys.change[0];
  const stakeKey = accountData.keys.stake.length > 0 ? accountData.keys.stake[0] : null;
  const addrBech32 = stakeKey && isStakingEnabled(networkId) ? getBaseAddressFromCred(changeKey.cred, stakeKey.cred, networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(changeKey.cred, networkId, isPayScript);
  return {
    csl: getCSLAddress(addrBech32, free),
    addr: createIReceiveAddress(addrBech32, changeKey.used, changeKey.path, getDerivationPath(changeKey.path))
  };
};
const getReceiveAddress = (accountData) => {
  const changeAddress = getChangeAddress(accountData, false, false, true, false);
  if (changeAddress) {
    safeFreeCSLObject(changeAddress.csl);
    return changeAddress.addr;
  }
  return null;
};
const getForcedUnusedAddress = (accountData) => {
  const changeAddress = getChangeAddress(accountData, false, false, true, true);
  if (changeAddress) {
    safeFreeCSLObject(changeAddress.csl);
    return changeAddress.addr;
  }
  return null;
};
const getStakeAddress = (accountData) => {
  if (accountData.keys.stake.length === 0) {
    return null;
  }
  const stakeKey = accountData.keys.stake[0];
  const networkId = accountData.state.networkId;
  const { isStakeScript } = getScriptState(accountData, false, true);
  const addrBech32 = isStakingEnabled(networkId) ? getRewardAddressFromCred(stakeKey.cred, networkId, isStakeScript) : "";
  return isStakingEnabled(networkId) ? createIReceiveAddress(addrBech32, stakeKey.used, stakeKey.path, getDerivationPath(stakeKey.path)) : null;
};

const ErrorTxCbor = {
  unableToDeserializeBody: "ErrorTxCbor.unableToDeserializeBody",
  unableToCreateTx: "ErrorTxCbor.unableToCreateTx",
  auxDataMismatch: "ErrorTxCbor.auxDataMismatch",
  auxDataMissing: "ErrorTxCbor.auxDataMissing"
};

var Decoder$1 = {};

var bignumber$1 = {exports: {}};

var bignumber = bignumber$1.exports;

var hasRequiredBignumber;

function requireBignumber () {
	if (hasRequiredBignumber) return bignumber$1.exports;
	hasRequiredBignumber = 1;
	(function (module) {
(function (globalObject) {

		/*
		 *      bignumber.js v9.3.1
		 *      A JavaScript library for arbitrary-precision arithmetic.
		 *      https://github.com/MikeMcl/bignumber.js
		 *      Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
		 *      MIT Licensed.
		 *
		 *      BigNumber.prototype methods     |  BigNumber methods
		 *                                      |
		 *      absoluteValue            abs    |  clone
		 *      comparedTo                      |  config               set
		 *      decimalPlaces            dp     |      DECIMAL_PLACES
		 *      dividedBy                div    |      ROUNDING_MODE
		 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
		 *      exponentiatedBy          pow    |      RANGE
		 *      integerValue                    |      CRYPTO
		 *      isEqualTo                eq     |      MODULO_MODE
		 *      isFinite                        |      POW_PRECISION
		 *      isGreaterThan            gt     |      FORMAT
		 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
		 *      isInteger                       |  isBigNumber
		 *      isLessThan               lt     |  maximum              max
		 *      isLessThanOrEqualTo      lte    |  minimum              min
		 *      isNaN                           |  random
		 *      isNegative                      |  sum
		 *      isPositive                      |
		 *      isZero                          |
		 *      minus                           |
		 *      modulo                   mod    |
		 *      multipliedBy             times  |
		 *      negated                         |
		 *      plus                            |
		 *      precision                sd     |
		 *      shiftedBy                       |
		 *      squareRoot               sqrt   |
		 *      toExponential                   |
		 *      toFixed                         |
		 *      toFormat                        |
		 *      toFraction                      |
		 *      toJSON                          |
		 *      toNumber                        |
		 *      toPrecision                     |
		 *      toString                        |
		 *      valueOf                         |
		 *
		 */


		  var BigNumber,
		    isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
		    mathceil = Math.ceil,
		    mathfloor = Math.floor,

		    bignumberError = '[BigNumber Error] ',
		    tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

		    BASE = 1e14,
		    LOG_BASE = 14,
		    MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
		    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
		    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
		    SQRT_BASE = 1e7,

		    // EDITABLE
		    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
		    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
		    MAX = 1E9;                                   // 0 to MAX_INT32


		  /*
		   * Create and return a BigNumber constructor.
		   */
		  function clone(configObject) {
		    var div, convertBase, parseNumeric,
		      P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
		      ONE = new BigNumber(1),


		      //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


		      // The default values below must be integers within the inclusive ranges stated.
		      // The values can also be changed at run-time using BigNumber.set.

		      // The maximum number of decimal places for operations involving division.
		      DECIMAL_PLACES = 20,                     // 0 to MAX

		      // The rounding mode used when rounding to the above decimal places, and when using
		      // toExponential, toFixed, toFormat and toPrecision, and round (default value).
		      // UP         0 Away from zero.
		      // DOWN       1 Towards zero.
		      // CEIL       2 Towards +Infinity.
		      // FLOOR      3 Towards -Infinity.
		      // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
		      // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
		      // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
		      // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
		      // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
		      ROUNDING_MODE = 4,                       // 0 to 8

		      // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

		      // The exponent value at and beneath which toString returns exponential notation.
		      // Number type: -7
		      TO_EXP_NEG = -7,                         // 0 to -MAX

		      // The exponent value at and above which toString returns exponential notation.
		      // Number type: 21
		      TO_EXP_POS = 21,                         // 0 to MAX

		      // RANGE : [MIN_EXP, MAX_EXP]

		      // The minimum exponent value, beneath which underflow to zero occurs.
		      // Number type: -324  (5e-324)
		      MIN_EXP = -1e7,                          // -1 to -MAX

		      // The maximum exponent value, above which overflow to Infinity occurs.
		      // Number type:  308  (1.7976931348623157e+308)
		      // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
		      MAX_EXP = 1e7,                           // 1 to MAX

		      // Whether to use cryptographically-secure random number generation, if available.
		      CRYPTO = false,                          // true or false

		      // The modulo mode used when calculating the modulus: a mod n.
		      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
		      // The remainder (r) is calculated as: r = a - n * q.
		      //
		      // UP        0 The remainder is positive if the dividend is negative, else is negative.
		      // DOWN      1 The remainder has the same sign as the dividend.
		      //             This modulo mode is commonly known as 'truncated division' and is
		      //             equivalent to (a % n) in JavaScript.
		      // FLOOR     3 The remainder has the same sign as the divisor (Python %).
		      // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
		      // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
		      //             The remainder is always positive.
		      //
		      // The truncated division, floored division, Euclidian division and IEEE 754 remainder
		      // modes are commonly used for the modulus operation.
		      // Although the other rounding modes can also be used, they may not give useful results.
		      MODULO_MODE = 1,                         // 0 to 9

		      // The maximum number of significant digits of the result of the exponentiatedBy operation.
		      // If POW_PRECISION is 0, there will be unlimited significant digits.
		      POW_PRECISION = 0,                       // 0 to MAX

		      // The format specification used by the BigNumber.prototype.toFormat method.
		      FORMAT = {
		        prefix: '',
		        groupSize: 3,
		        secondaryGroupSize: 0,
		        groupSeparator: ',',
		        decimalSeparator: '.',
		        fractionGroupSize: 0,
		        fractionGroupSeparator: '\xA0',        // non-breaking space
		        suffix: ''
		      },

		      // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
		      // '-', '.', whitespace, or repeated character.
		      // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
		      ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz',
		      alphabetHasNormalDecimalDigits = true;


		    //------------------------------------------------------------------------------------------


		    // CONSTRUCTOR


		    /*
		     * The BigNumber constructor and exported function.
		     * Create and return a new instance of a BigNumber object.
		     *
		     * v {number|string|BigNumber} A numeric value.
		     * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
		     */
		    function BigNumber(v, b) {
		      var alphabet, c, caseChanged, e, i, isNum, len, str,
		        x = this;

		      // Enable constructor call without `new`.
		      if (!(x instanceof BigNumber)) return new BigNumber(v, b);

		      if (b == null) {

		        if (v && v._isBigNumber === true) {
		          x.s = v.s;

		          if (!v.c || v.e > MAX_EXP) {
		            x.c = x.e = null;
		          } else if (v.e < MIN_EXP) {
		            x.c = [x.e = 0];
		          } else {
		            x.e = v.e;
		            x.c = v.c.slice();
		          }

		          return;
		        }

		        if ((isNum = typeof v == 'number') && v * 0 == 0) {

		          // Use `1 / n` to handle minus zero also.
		          x.s = 1 / v < 0 ? (v = -v, -1) : 1;

		          // Fast path for integers, where n < 2147483648 (2**31).
		          if (v === ~~v) {
		            for (e = 0, i = v; i >= 10; i /= 10, e++);

		            if (e > MAX_EXP) {
		              x.c = x.e = null;
		            } else {
		              x.e = e;
		              x.c = [v];
		            }

		            return;
		          }

		          str = String(v);
		        } else {

		          if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

		          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
		        }

		        // Decimal point?
		        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

		        // Exponential form?
		        if ((i = str.search(/e/i)) > 0) {

		          // Determine exponent.
		          if (e < 0) e = i;
		          e += +str.slice(i + 1);
		          str = str.substring(0, i);
		        } else if (e < 0) {

		          // Integer.
		          e = str.length;
		        }

		      } else {

		        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
		        intCheck(b, 2, ALPHABET.length, 'Base');

		        // Allow exponential notation to be used with base 10 argument, while
		        // also rounding to DECIMAL_PLACES as with other bases.
		        if (b == 10 && alphabetHasNormalDecimalDigits) {
		          x = new BigNumber(v);
		          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
		        }

		        str = String(v);

		        if (isNum = typeof v == 'number') {

		          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
		          if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

		          x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

		          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
		          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
		            throw Error
		             (tooManyDigits + v);
		          }
		        } else {
		          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
		        }

		        alphabet = ALPHABET.slice(0, b);
		        e = i = 0;

		        // Check that str is a valid base b number.
		        // Don't use RegExp, so alphabet can contain special characters.
		        for (len = str.length; i < len; i++) {
		          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
		            if (c == '.') {

		              // If '.' is not the first character and it has not be found before.
		              if (i > e) {
		                e = len;
		                continue;
		              }
		            } else if (!caseChanged) {

		              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
		              if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
		                  str == str.toLowerCase() && (str = str.toUpperCase())) {
		                caseChanged = true;
		                i = -1;
		                e = 0;
		                continue;
		              }
		            }

		            return parseNumeric(x, String(v), isNum, b);
		          }
		        }

		        // Prevent later check for length on converted number.
		        isNum = false;
		        str = convertBase(str, b, 10, x.s);

		        // Decimal point?
		        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
		        else e = str.length;
		      }

		      // Determine leading zeros.
		      for (i = 0; str.charCodeAt(i) === 48; i++);

		      // Determine trailing zeros.
		      for (len = str.length; str.charCodeAt(--len) === 48;);

		      if (str = str.slice(i, ++len)) {
		        len -= i;

		        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
		        if (isNum && BigNumber.DEBUG &&
		          len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
		            throw Error
		             (tooManyDigits + (x.s * v));
		        }

		         // Overflow?
		        if ((e = e - i - 1) > MAX_EXP) {

		          // Infinity.
		          x.c = x.e = null;

		        // Underflow?
		        } else if (e < MIN_EXP) {

		          // Zero.
		          x.c = [x.e = 0];
		        } else {
		          x.e = e;
		          x.c = [];

		          // Transform base

		          // e is the base 10 exponent.
		          // i is where to slice str to get the first element of the coefficient array.
		          i = (e + 1) % LOG_BASE;
		          if (e < 0) i += LOG_BASE;  // i < 1

		          if (i < len) {
		            if (i) x.c.push(+str.slice(0, i));

		            for (len -= LOG_BASE; i < len;) {
		              x.c.push(+str.slice(i, i += LOG_BASE));
		            }

		            i = LOG_BASE - (str = str.slice(i)).length;
		          } else {
		            i -= len;
		          }

		          for (; i--; str += '0');
		          x.c.push(+str);
		        }
		      } else {

		        // Zero.
		        x.c = [x.e = 0];
		      }
		    }


		    // CONSTRUCTOR PROPERTIES


		    BigNumber.clone = clone;

		    BigNumber.ROUND_UP = 0;
		    BigNumber.ROUND_DOWN = 1;
		    BigNumber.ROUND_CEIL = 2;
		    BigNumber.ROUND_FLOOR = 3;
		    BigNumber.ROUND_HALF_UP = 4;
		    BigNumber.ROUND_HALF_DOWN = 5;
		    BigNumber.ROUND_HALF_EVEN = 6;
		    BigNumber.ROUND_HALF_CEIL = 7;
		    BigNumber.ROUND_HALF_FLOOR = 8;
		    BigNumber.EUCLID = 9;


		    /*
		     * Configure infrequently-changing library-wide settings.
		     *
		     * Accept an object with the following optional properties (if the value of a property is
		     * a number, it must be an integer within the inclusive range stated):
		     *
		     *   DECIMAL_PLACES   {number}           0 to MAX
		     *   ROUNDING_MODE    {number}           0 to 8
		     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
		     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
		     *   CRYPTO           {boolean}          true or false
		     *   MODULO_MODE      {number}           0 to 9
		     *   POW_PRECISION       {number}           0 to MAX
		     *   ALPHABET         {string}           A string of two or more unique characters which does
		     *                                       not contain '.'.
		     *   FORMAT           {object}           An object with some of the following properties:
		     *     prefix                 {string}
		     *     groupSize              {number}
		     *     secondaryGroupSize     {number}
		     *     groupSeparator         {string}
		     *     decimalSeparator       {string}
		     *     fractionGroupSize      {number}
		     *     fractionGroupSeparator {string}
		     *     suffix                 {string}
		     *
		     * (The values assigned to the above FORMAT object properties are not checked for validity.)
		     *
		     * E.g.
		     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
		     *
		     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
		     *
		     * Return an object with the properties current values.
		     */
		    BigNumber.config = BigNumber.set = function (obj) {
		      var p, v;

		      if (obj != null) {

		        if (typeof obj == 'object') {

		          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
		          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
		          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
		            v = obj[p];
		            intCheck(v, 0, MAX, p);
		            DECIMAL_PLACES = v;
		          }

		          // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
		          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
		          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
		            v = obj[p];
		            intCheck(v, 0, 8, p);
		            ROUNDING_MODE = v;
		          }

		          // EXPONENTIAL_AT {number|number[]}
		          // Integer, -MAX to MAX inclusive or
		          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
		          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
		          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
		            v = obj[p];
		            if (v && v.pop) {
		              intCheck(v[0], -MAX, 0, p);
		              intCheck(v[1], 0, MAX, p);
		              TO_EXP_NEG = v[0];
		              TO_EXP_POS = v[1];
		            } else {
		              intCheck(v, -MAX, MAX, p);
		              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
		            }
		          }

		          // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
		          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
		          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
		          if (obj.hasOwnProperty(p = 'RANGE')) {
		            v = obj[p];
		            if (v && v.pop) {
		              intCheck(v[0], -MAX, -1, p);
		              intCheck(v[1], 1, MAX, p);
		              MIN_EXP = v[0];
		              MAX_EXP = v[1];
		            } else {
		              intCheck(v, -MAX, MAX, p);
		              if (v) {
		                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
		              } else {
		                throw Error
		                 (bignumberError + p + ' cannot be zero: ' + v);
		              }
		            }
		          }

		          // CRYPTO {boolean} true or false.
		          // '[BigNumber Error] CRYPTO not true or false: {v}'
		          // '[BigNumber Error] crypto unavailable'
		          if (obj.hasOwnProperty(p = 'CRYPTO')) {
		            v = obj[p];
		            if (v === !!v) {
		              if (v) {
		                if (typeof crypto != 'undefined' && crypto &&
		                 (crypto.getRandomValues || crypto.randomBytes)) {
		                  CRYPTO = v;
		                } else {
		                  CRYPTO = !v;
		                  throw Error
		                   (bignumberError + 'crypto unavailable');
		                }
		              } else {
		                CRYPTO = v;
		              }
		            } else {
		              throw Error
		               (bignumberError + p + ' not true or false: ' + v);
		            }
		          }

		          // MODULO_MODE {number} Integer, 0 to 9 inclusive.
		          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
		          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
		            v = obj[p];
		            intCheck(v, 0, 9, p);
		            MODULO_MODE = v;
		          }

		          // POW_PRECISION {number} Integer, 0 to MAX inclusive.
		          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
		          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
		            v = obj[p];
		            intCheck(v, 0, MAX, p);
		            POW_PRECISION = v;
		          }

		          // FORMAT {object}
		          // '[BigNumber Error] FORMAT not an object: {v}'
		          if (obj.hasOwnProperty(p = 'FORMAT')) {
		            v = obj[p];
		            if (typeof v == 'object') FORMAT = v;
		            else throw Error
		             (bignumberError + p + ' not an object: ' + v);
		          }

		          // ALPHABET {string}
		          // '[BigNumber Error] ALPHABET invalid: {v}'
		          if (obj.hasOwnProperty(p = 'ALPHABET')) {
		            v = obj[p];

		            // Disallow if less than two characters,
		            // or if it contains '+', '-', '.', whitespace, or a repeated character.
		            if (typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
		              alphabetHasNormalDecimalDigits = v.slice(0, 10) == '0123456789';
		              ALPHABET = v;
		            } else {
		              throw Error
		               (bignumberError + p + ' invalid: ' + v);
		            }
		          }

		        } else {

		          // '[BigNumber Error] Object expected: {v}'
		          throw Error
		           (bignumberError + 'Object expected: ' + obj);
		        }
		      }

		      return {
		        DECIMAL_PLACES: DECIMAL_PLACES,
		        ROUNDING_MODE: ROUNDING_MODE,
		        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
		        RANGE: [MIN_EXP, MAX_EXP],
		        CRYPTO: CRYPTO,
		        MODULO_MODE: MODULO_MODE,
		        POW_PRECISION: POW_PRECISION,
		        FORMAT: FORMAT,
		        ALPHABET: ALPHABET
		      };
		    };


		    /*
		     * Return true if v is a BigNumber instance, otherwise return false.
		     *
		     * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
		     *
		     * v {any}
		     *
		     * '[BigNumber Error] Invalid BigNumber: {v}'
		     */
		    BigNumber.isBigNumber = function (v) {
		      if (!v || v._isBigNumber !== true) return false;
		      if (!BigNumber.DEBUG) return true;

		      var i, n,
		        c = v.c,
		        e = v.e,
		        s = v.s;

		      out: if ({}.toString.call(c) == '[object Array]') {

		        if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

		          // If the first element is zero, the BigNumber value must be zero.
		          if (c[0] === 0) {
		            if (e === 0 && c.length === 1) return true;
		            break out;
		          }

		          // Calculate number of digits that c[0] should have, based on the exponent.
		          i = (e + 1) % LOG_BASE;
		          if (i < 1) i += LOG_BASE;

		          // Calculate number of digits of c[0].
		          //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
		          if (String(c[0]).length == i) {

		            for (i = 0; i < c.length; i++) {
		              n = c[i];
		              if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
		            }

		            // Last element cannot be zero, unless it is the only element.
		            if (n !== 0) return true;
		          }
		        }

		      // Infinity/NaN
		      } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
		        return true;
		      }

		      throw Error
		        (bignumberError + 'Invalid BigNumber: ' + v);
		    };


		    /*
		     * Return a new BigNumber whose value is the maximum of the arguments.
		     *
		     * arguments {number|string|BigNumber}
		     */
		    BigNumber.maximum = BigNumber.max = function () {
		      return maxOrMin(arguments, -1);
		    };


		    /*
		     * Return a new BigNumber whose value is the minimum of the arguments.
		     *
		     * arguments {number|string|BigNumber}
		     */
		    BigNumber.minimum = BigNumber.min = function () {
		      return maxOrMin(arguments, 1);
		    };


		    /*
		     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
		     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
		     * zeros are produced).
		     *
		     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
		     *
		     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
		     * '[BigNumber Error] crypto unavailable'
		     */
		    BigNumber.random = (function () {
		      var pow2_53 = 0x20000000000000;

		      // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
		      // Check if Math.random() produces more than 32 bits of randomness.
		      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
		      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
		      var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
		       ? function () { return mathfloor(Math.random() * pow2_53); }
		       : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
		         (Math.random() * 0x800000 | 0); };

		      return function (dp) {
		        var a, b, e, k, v,
		          i = 0,
		          c = [],
		          rand = new BigNumber(ONE);

		        if (dp == null) dp = DECIMAL_PLACES;
		        else intCheck(dp, 0, MAX);

		        k = mathceil(dp / LOG_BASE);

		        if (CRYPTO) {

		          // Browsers supporting crypto.getRandomValues.
		          if (crypto.getRandomValues) {

		            a = crypto.getRandomValues(new Uint32Array(k *= 2));

		            for (; i < k;) {

		              // 53 bits:
		              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
		              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
		              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
		              //                                     11111 11111111 11111111
		              // 0x20000 is 2^21.
		              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

		              // Rejection sampling:
		              // 0 <= v < 9007199254740992
		              // Probability that v >= 9e15, is
		              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
		              if (v >= 9e15) {
		                b = crypto.getRandomValues(new Uint32Array(2));
		                a[i] = b[0];
		                a[i + 1] = b[1];
		              } else {

		                // 0 <= v <= 8999999999999999
		                // 0 <= (v % 1e14) <= 99999999999999
		                c.push(v % 1e14);
		                i += 2;
		              }
		            }
		            i = k / 2;

		          // Node.js supporting crypto.randomBytes.
		          } else if (crypto.randomBytes) {

		            // buffer
		            a = crypto.randomBytes(k *= 7);

		            for (; i < k;) {

		              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
		              // 0x100000000 is 2^32, 0x1000000 is 2^24
		              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
		              // 0 <= v < 9007199254740992
		              v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
		                 (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
		                 (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

		              if (v >= 9e15) {
		                crypto.randomBytes(7).copy(a, i);
		              } else {

		                // 0 <= (v % 1e14) <= 99999999999999
		                c.push(v % 1e14);
		                i += 7;
		              }
		            }
		            i = k / 7;
		          } else {
		            CRYPTO = false;
		            throw Error
		             (bignumberError + 'crypto unavailable');
		          }
		        }

		        // Use Math.random.
		        if (!CRYPTO) {

		          for (; i < k;) {
		            v = random53bitInt();
		            if (v < 9e15) c[i++] = v % 1e14;
		          }
		        }

		        k = c[--i];
		        dp %= LOG_BASE;

		        // Convert trailing digits to zeros according to dp.
		        if (k && dp) {
		          v = POWS_TEN[LOG_BASE - dp];
		          c[i] = mathfloor(k / v) * v;
		        }

		        // Remove trailing elements which are zero.
		        for (; c[i] === 0; c.pop(), i--);

		        // Zero?
		        if (i < 0) {
		          c = [e = 0];
		        } else {

		          // Remove leading elements which are zero and adjust exponent accordingly.
		          for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

		          // Count the digits of the first element of c to determine leading zeros, and...
		          for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

		          // adjust the exponent accordingly.
		          if (i < LOG_BASE) e -= LOG_BASE - i;
		        }

		        rand.e = e;
		        rand.c = c;
		        return rand;
		      };
		    })();


		    /*
		     * Return a BigNumber whose value is the sum of the arguments.
		     *
		     * arguments {number|string|BigNumber}
		     */
		    BigNumber.sum = function () {
		      var i = 1,
		        args = arguments,
		        sum = new BigNumber(args[0]);
		      for (; i < args.length;) sum = sum.plus(args[i++]);
		      return sum;
		    };


		    // PRIVATE FUNCTIONS


		    // Called by BigNumber and BigNumber.prototype.toString.
		    convertBase = (function () {
		      var decimal = '0123456789';

		      /*
		       * Convert string of baseIn to an array of numbers of baseOut.
		       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
		       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
		       */
		      function toBaseOut(str, baseIn, baseOut, alphabet) {
		        var j,
		          arr = [0],
		          arrL,
		          i = 0,
		          len = str.length;

		        for (; i < len;) {
		          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

		          arr[0] += alphabet.indexOf(str.charAt(i++));

		          for (j = 0; j < arr.length; j++) {

		            if (arr[j] > baseOut - 1) {
		              if (arr[j + 1] == null) arr[j + 1] = 0;
		              arr[j + 1] += arr[j] / baseOut | 0;
		              arr[j] %= baseOut;
		            }
		          }
		        }

		        return arr.reverse();
		      }

		      // Convert a numeric string of baseIn to a numeric string of baseOut.
		      // If the caller is toString, we are converting from base 10 to baseOut.
		      // If the caller is BigNumber, we are converting from baseIn to base 10.
		      return function (str, baseIn, baseOut, sign, callerIsToString) {
		        var alphabet, d, e, k, r, x, xc, y,
		          i = str.indexOf('.'),
		          dp = DECIMAL_PLACES,
		          rm = ROUNDING_MODE;

		        // Non-integer.
		        if (i >= 0) {
		          k = POW_PRECISION;

		          // Unlimited precision.
		          POW_PRECISION = 0;
		          str = str.replace('.', '');
		          y = new BigNumber(baseIn);
		          x = y.pow(str.length - i);
		          POW_PRECISION = k;

		          // Convert str as if an integer, then restore the fraction part by dividing the
		          // result by its base raised to a power.

		          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
		           10, baseOut, decimal);
		          y.e = y.c.length;
		        }

		        // Convert the number as integer.

		        xc = toBaseOut(str, baseIn, baseOut, callerIsToString
		         ? (alphabet = ALPHABET, decimal)
		         : (alphabet = decimal, ALPHABET));

		        // xc now represents str as an integer and converted to baseOut. e is the exponent.
		        e = k = xc.length;

		        // Remove trailing zeros.
		        for (; xc[--k] == 0; xc.pop());

		        // Zero?
		        if (!xc[0]) return alphabet.charAt(0);

		        // Does str represent an integer? If so, no need for the division.
		        if (i < 0) {
		          --e;
		        } else {
		          x.c = xc;
		          x.e = e;

		          // The sign is needed for correct rounding.
		          x.s = sign;
		          x = div(x, y, dp, rm, baseOut);
		          xc = x.c;
		          r = x.r;
		          e = x.e;
		        }

		        // xc now represents str converted to baseOut.

		        // The index of the rounding digit.
		        d = e + dp + 1;

		        // The rounding digit: the digit to the right of the digit that may be rounded up.
		        i = xc[d];

		        // Look at the rounding digits and mode to determine whether to round up.

		        k = baseOut / 2;
		        r = r || d < 0 || xc[d + 1] != null;

		        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
		              : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
		               rm == (x.s < 0 ? 8 : 7));

		        // If the index of the rounding digit is not greater than zero, or xc represents
		        // zero, then the result of the base conversion is zero or, if rounding up, a value
		        // such as 0.00001.
		        if (d < 1 || !xc[0]) {

		          // 1^-dp or 0
		          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
		        } else {

		          // Truncate xc to the required number of decimal places.
		          xc.length = d;

		          // Round up?
		          if (r) {

		            // Rounding up may mean the previous digit has to be rounded up and so on.
		            for (--baseOut; ++xc[--d] > baseOut;) {
		              xc[d] = 0;

		              if (!d) {
		                ++e;
		                xc = [1].concat(xc);
		              }
		            }
		          }

		          // Determine trailing zeros.
		          for (k = xc.length; !xc[--k];);

		          // E.g. [4, 11, 15] becomes 4bf.
		          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

		          // Add leading zeros, decimal point and trailing zeros as required.
		          str = toFixedPoint(str, e, alphabet.charAt(0));
		        }

		        // The caller will add the sign.
		        return str;
		      };
		    })();


		    // Perform division in the specified base. Called by div and convertBase.
		    div = (function () {

		      // Assume non-zero x and k.
		      function multiply(x, k, base) {
		        var m, temp, xlo, xhi,
		          carry = 0,
		          i = x.length,
		          klo = k % SQRT_BASE,
		          khi = k / SQRT_BASE | 0;

		        for (x = x.slice(); i--;) {
		          xlo = x[i] % SQRT_BASE;
		          xhi = x[i] / SQRT_BASE | 0;
		          m = khi * xlo + xhi * klo;
		          temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
		          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
		          x[i] = temp % base;
		        }

		        if (carry) x = [carry].concat(x);

		        return x;
		      }

		      function compare(a, b, aL, bL) {
		        var i, cmp;

		        if (aL != bL) {
		          cmp = aL > bL ? 1 : -1;
		        } else {

		          for (i = cmp = 0; i < aL; i++) {

		            if (a[i] != b[i]) {
		              cmp = a[i] > b[i] ? 1 : -1;
		              break;
		            }
		          }
		        }

		        return cmp;
		      }

		      function subtract(a, b, aL, base) {
		        var i = 0;

		        // Subtract b from a.
		        for (; aL--;) {
		          a[aL] -= i;
		          i = a[aL] < b[aL] ? 1 : 0;
		          a[aL] = i * base + a[aL] - b[aL];
		        }

		        // Remove leading zeros.
		        for (; !a[0] && a.length > 1; a.splice(0, 1));
		      }

		      // x: dividend, y: divisor.
		      return function (x, y, dp, rm, base) {
		        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
		          yL, yz,
		          s = x.s == y.s ? 1 : -1,
		          xc = x.c,
		          yc = y.c;

		        // Either NaN, Infinity or 0?
		        if (!xc || !xc[0] || !yc || !yc[0]) {

		          return new BigNumber(

		           // Return NaN if either NaN, or both Infinity or 0.
		           !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

		            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
		            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
		         );
		        }

		        q = new BigNumber(s);
		        qc = q.c = [];
		        e = x.e - y.e;
		        s = dp + e + 1;

		        if (!base) {
		          base = BASE;
		          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
		          s = s / LOG_BASE | 0;
		        }

		        // Result exponent may be one less then the current value of e.
		        // The coefficients of the BigNumbers from convertBase may have trailing zeros.
		        for (i = 0; yc[i] == (xc[i] || 0); i++);

		        if (yc[i] > (xc[i] || 0)) e--;

		        if (s < 0) {
		          qc.push(1);
		          more = true;
		        } else {
		          xL = xc.length;
		          yL = yc.length;
		          i = 0;
		          s += 2;

		          // Normalise xc and yc so highest order digit of yc is >= base / 2.

		          n = mathfloor(base / (yc[0] + 1));

		          // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
		          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
		          if (n > 1) {
		            yc = multiply(yc, n, base);
		            xc = multiply(xc, n, base);
		            yL = yc.length;
		            xL = xc.length;
		          }

		          xi = yL;
		          rem = xc.slice(0, yL);
		          remL = rem.length;

		          // Add zeros to make remainder as long as divisor.
		          for (; remL < yL; rem[remL++] = 0);
		          yz = yc.slice();
		          yz = [0].concat(yz);
		          yc0 = yc[0];
		          if (yc[1] >= base / 2) yc0++;
		          // Not necessary, but to prevent trial digit n > base, when using base 3.
		          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

		          do {
		            n = 0;

		            // Compare divisor and remainder.
		            cmp = compare(yc, rem, yL, remL);

		            // If divisor < remainder.
		            if (cmp < 0) {

		              // Calculate trial digit, n.

		              rem0 = rem[0];
		              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

		              // n is how many times the divisor goes into the current remainder.
		              n = mathfloor(rem0 / yc0);

		              //  Algorithm:
		              //  product = divisor multiplied by trial digit (n).
		              //  Compare product and remainder.
		              //  If product is greater than remainder:
		              //    Subtract divisor from product, decrement trial digit.
		              //  Subtract product from remainder.
		              //  If product was less than remainder at the last compare:
		              //    Compare new remainder and divisor.
		              //    If remainder is greater than divisor:
		              //      Subtract divisor from remainder, increment trial digit.

		              if (n > 1) {

		                // n may be > base only when base is 3.
		                if (n >= base) n = base - 1;

		                // product = divisor * trial digit.
		                prod = multiply(yc, n, base);
		                prodL = prod.length;
		                remL = rem.length;

		                // Compare product and remainder.
		                // If product > remainder then trial digit n too high.
		                // n is 1 too high about 5% of the time, and is not known to have
		                // ever been more than 1 too high.
		                while (compare(prod, rem, prodL, remL) == 1) {
		                  n--;

		                  // Subtract divisor from product.
		                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
		                  prodL = prod.length;
		                  cmp = 1;
		                }
		              } else {

		                // n is 0 or 1, cmp is -1.
		                // If n is 0, there is no need to compare yc and rem again below,
		                // so change cmp to 1 to avoid it.
		                // If n is 1, leave cmp as -1, so yc and rem are compared again.
		                if (n == 0) {

		                  // divisor < remainder, so n must be at least 1.
		                  cmp = n = 1;
		                }

		                // product = divisor
		                prod = yc.slice();
		                prodL = prod.length;
		              }

		              if (prodL < remL) prod = [0].concat(prod);

		              // Subtract product from remainder.
		              subtract(rem, prod, remL, base);
		              remL = rem.length;

		               // If product was < remainder.
		              if (cmp == -1) {

		                // Compare divisor and new remainder.
		                // If divisor < new remainder, subtract divisor from remainder.
		                // Trial digit n too low.
		                // n is 1 too low about 5% of the time, and very rarely 2 too low.
		                while (compare(yc, rem, yL, remL) < 1) {
		                  n++;

		                  // Subtract divisor from remainder.
		                  subtract(rem, yL < remL ? yz : yc, remL, base);
		                  remL = rem.length;
		                }
		              }
		            } else if (cmp === 0) {
		              n++;
		              rem = [0];
		            } // else cmp === 1 and n will be 0

		            // Add the next digit, n, to the result array.
		            qc[i++] = n;

		            // Update the remainder.
		            if (rem[0]) {
		              rem[remL++] = xc[xi] || 0;
		            } else {
		              rem = [xc[xi]];
		              remL = 1;
		            }
		          } while ((xi++ < xL || rem[0] != null) && s--);

		          more = rem[0] != null;

		          // Leading zero?
		          if (!qc[0]) qc.splice(0, 1);
		        }

		        if (base == BASE) {

		          // To calculate q.e, first get the number of digits of qc[0].
		          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

		          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

		        // Caller is convertBase.
		        } else {
		          q.e = e;
		          q.r = +more;
		        }

		        return q;
		      };
		    })();


		    /*
		     * Return a string representing the value of BigNumber n in fixed-point or exponential
		     * notation rounded to the specified decimal places or significant digits.
		     *
		     * n: a BigNumber.
		     * i: the index of the last digit required (i.e. the digit that may be rounded up).
		     * rm: the rounding mode.
		     * id: 1 (toExponential) or 2 (toPrecision).
		     */
		    function format(n, i, rm, id) {
		      var c0, e, ne, len, str;

		      if (rm == null) rm = ROUNDING_MODE;
		      else intCheck(rm, 0, 8);

		      if (!n.c) return n.toString();

		      c0 = n.c[0];
		      ne = n.e;

		      if (i == null) {
		        str = coeffToString(n.c);
		        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
		         ? toExponential(str, ne)
		         : toFixedPoint(str, ne, '0');
		      } else {
		        n = round(new BigNumber(n), i, rm);

		        // n.e may have changed if the value was rounded up.
		        e = n.e;

		        str = coeffToString(n.c);
		        len = str.length;

		        // toPrecision returns exponential notation if the number of significant digits
		        // specified is less than the number of digits necessary to represent the integer
		        // part of the value in fixed-point notation.

		        // Exponential notation.
		        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

		          // Append zeros?
		          for (; len < i; str += '0', len++);
		          str = toExponential(str, e);

		        // Fixed-point notation.
		        } else {
		          i -= ne + (id === 2 && e > ne);
		          str = toFixedPoint(str, e, '0');

		          // Append zeros?
		          if (e + 1 > len) {
		            if (--i > 0) for (str += '.'; i--; str += '0');
		          } else {
		            i += e - len;
		            if (i > 0) {
		              if (e + 1 == len) str += '.';
		              for (; i--; str += '0');
		            }
		          }
		        }
		      }

		      return n.s < 0 && c0 ? '-' + str : str;
		    }


		    // Handle BigNumber.max and BigNumber.min.
		    // If any number is NaN, return NaN.
		    function maxOrMin(args, n) {
		      var k, y,
		        i = 1,
		        x = new BigNumber(args[0]);

		      for (; i < args.length; i++) {
		        y = new BigNumber(args[i]);
		        if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
		          x = y;
		        }
		      }

		      return x;
		    }


		    /*
		     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
		     * Called by minus, plus and times.
		     */
		    function normalise(n, c, e) {
		      var i = 1,
		        j = c.length;

		       // Remove trailing zeros.
		      for (; !c[--j]; c.pop());

		      // Calculate the base 10 exponent. First get the number of digits of c[0].
		      for (j = c[0]; j >= 10; j /= 10, i++);

		      // Overflow?
		      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

		        // Infinity.
		        n.c = n.e = null;

		      // Underflow?
		      } else if (e < MIN_EXP) {

		        // Zero.
		        n.c = [n.e = 0];
		      } else {
		        n.e = e;
		        n.c = c;
		      }

		      return n;
		    }


		    // Handle values that fail the validity test in BigNumber.
		    parseNumeric = (function () {
		      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
		        dotAfter = /^([^.]+)\.$/,
		        dotBefore = /^\.([^.]+)$/,
		        isInfinityOrNaN = /^-?(Infinity|NaN)$/,
		        whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

		      return function (x, str, isNum, b) {
		        var base,
		          s = isNum ? str : str.replace(whitespaceOrPlus, '');

		        // No exception on ±Infinity or NaN.
		        if (isInfinityOrNaN.test(s)) {
		          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
		        } else {
		          if (!isNum) {

		            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
		            s = s.replace(basePrefix, function (m, p1, p2) {
		              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
		              return !b || b == base ? p1 : m;
		            });

		            if (b) {
		              base = b;

		              // E.g. '1.' to '1', '.1' to '0.1'
		              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
		            }

		            if (str != s) return new BigNumber(s, base);
		          }

		          // '[BigNumber Error] Not a number: {n}'
		          // '[BigNumber Error] Not a base {b} number: {n}'
		          if (BigNumber.DEBUG) {
		            throw Error
		              (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
		          }

		          // NaN
		          x.s = null;
		        }

		        x.c = x.e = null;
		      }
		    })();


		    /*
		     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
		     * If r is truthy, it is known that there are more digits after the rounding digit.
		     */
		    function round(x, sd, rm, r) {
		      var d, i, j, k, n, ni, rd,
		        xc = x.c,
		        pows10 = POWS_TEN;

		      // if x is not Infinity or NaN...
		      if (xc) {

		        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
		        // n is a base 1e14 number, the value of the element of array x.c containing rd.
		        // ni is the index of n within x.c.
		        // d is the number of digits of n.
		        // i is the index of rd within n including leading zeros.
		        // j is the actual index of rd within n (if < 0, rd is a leading zero).
		        out: {

		          // Get the number of digits of the first element of xc.
		          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
		          i = sd - d;

		          // If the rounding digit is in the first element of xc...
		          if (i < 0) {
		            i += LOG_BASE;
		            j = sd;
		            n = xc[ni = 0];

		            // Get the rounding digit at index j of n.
		            rd = mathfloor(n / pows10[d - j - 1] % 10);
		          } else {
		            ni = mathceil((i + 1) / LOG_BASE);

		            if (ni >= xc.length) {

		              if (r) {

		                // Needed by sqrt.
		                for (; xc.length <= ni; xc.push(0));
		                n = rd = 0;
		                d = 1;
		                i %= LOG_BASE;
		                j = i - LOG_BASE + 1;
		              } else {
		                break out;
		              }
		            } else {
		              n = k = xc[ni];

		              // Get the number of digits of n.
		              for (d = 1; k >= 10; k /= 10, d++);

		              // Get the index of rd within n.
		              i %= LOG_BASE;

		              // Get the index of rd within n, adjusted for leading zeros.
		              // The number of leading zeros of n is given by LOG_BASE - d.
		              j = i - LOG_BASE + d;

		              // Get the rounding digit at index j of n.
		              rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
		            }
		          }

		          r = r || sd < 0 ||

		          // Are there any non-zero digits after the rounding digit?
		          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
		          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
		           xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

		          r = rm < 4
		           ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
		           : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

		            // Check whether the digit to the left of the rounding digit is odd.
		            ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
		             rm == (x.s < 0 ? 8 : 7));

		          if (sd < 1 || !xc[0]) {
		            xc.length = 0;

		            if (r) {

		              // Convert sd to decimal places.
		              sd -= x.e + 1;

		              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
		              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
		              x.e = -sd || 0;
		            } else {

		              // Zero.
		              xc[0] = x.e = 0;
		            }

		            return x;
		          }

		          // Remove excess digits.
		          if (i == 0) {
		            xc.length = ni;
		            k = 1;
		            ni--;
		          } else {
		            xc.length = ni + 1;
		            k = pows10[LOG_BASE - i];

		            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
		            // j > 0 means i > number of leading zeros of n.
		            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
		          }

		          // Round up?
		          if (r) {

		            for (; ;) {

		              // If the digit to be rounded up is in the first element of xc...
		              if (ni == 0) {

		                // i will be the length of xc[0] before k is added.
		                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
		                j = xc[0] += k;
		                for (k = 1; j >= 10; j /= 10, k++);

		                // if i != k the length has increased.
		                if (i != k) {
		                  x.e++;
		                  if (xc[0] == BASE) xc[0] = 1;
		                }

		                break;
		              } else {
		                xc[ni] += k;
		                if (xc[ni] != BASE) break;
		                xc[ni--] = 0;
		                k = 1;
		              }
		            }
		          }

		          // Remove trailing zeros.
		          for (i = xc.length; xc[--i] === 0; xc.pop());
		        }

		        // Overflow? Infinity.
		        if (x.e > MAX_EXP) {
		          x.c = x.e = null;

		        // Underflow? Zero.
		        } else if (x.e < MIN_EXP) {
		          x.c = [x.e = 0];
		        }
		      }

		      return x;
		    }


		    function valueOf(n) {
		      var str,
		        e = n.e;

		      if (e === null) return n.toString();

		      str = coeffToString(n.c);

		      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
		        ? toExponential(str, e)
		        : toFixedPoint(str, e, '0');

		      return n.s < 0 ? '-' + str : str;
		    }


		    // PROTOTYPE/INSTANCE METHODS


		    /*
		     * Return a new BigNumber whose value is the absolute value of this BigNumber.
		     */
		    P.absoluteValue = P.abs = function () {
		      var x = new BigNumber(this);
		      if (x.s < 0) x.s = 1;
		      return x;
		    };


		    /*
		     * Return
		     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
		     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
		     *   0 if they have the same value,
		     *   or null if the value of either is NaN.
		     */
		    P.comparedTo = function (y, b) {
		      return compare(this, new BigNumber(y, b));
		    };


		    /*
		     * If dp is undefined or null or true or false, return the number of decimal places of the
		     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
		     *
		     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
		     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
		     * ROUNDING_MODE if rm is omitted.
		     *
		     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
		     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
		     *
		     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
		     */
		    P.decimalPlaces = P.dp = function (dp, rm) {
		      var c, n, v,
		        x = this;

		      if (dp != null) {
		        intCheck(dp, 0, MAX);
		        if (rm == null) rm = ROUNDING_MODE;
		        else intCheck(rm, 0, 8);

		        return round(new BigNumber(x), dp + x.e + 1, rm);
		      }

		      if (!(c = x.c)) return null;
		      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

		      // Subtract the number of trailing zeros of the last number.
		      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
		      if (n < 0) n = 0;

		      return n;
		    };


		    /*
		     *  n / 0 = I
		     *  n / N = N
		     *  n / I = 0
		     *  0 / n = 0
		     *  0 / 0 = N
		     *  0 / N = N
		     *  0 / I = 0
		     *  N / n = N
		     *  N / 0 = N
		     *  N / N = N
		     *  N / I = N
		     *  I / n = I
		     *  I / 0 = I
		     *  I / N = N
		     *  I / I = N
		     *
		     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
		     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
		     */
		    P.dividedBy = P.div = function (y, b) {
		      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
		    };


		    /*
		     * Return a new BigNumber whose value is the integer part of dividing the value of this
		     * BigNumber by the value of BigNumber(y, b).
		     */
		    P.dividedToIntegerBy = P.idiv = function (y, b) {
		      return div(this, new BigNumber(y, b), 0, 1);
		    };


		    /*
		     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
		     *
		     * If m is present, return the result modulo m.
		     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
		     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
		     *
		     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
		     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
		     *
		     * n {number|string|BigNumber} The exponent. An integer.
		     * [m] {number|string|BigNumber} The modulus.
		     *
		     * '[BigNumber Error] Exponent not an integer: {n}'
		     */
		    P.exponentiatedBy = P.pow = function (n, m) {
		      var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
		        x = this;

		      n = new BigNumber(n);

		      // Allow NaN and ±Infinity, but not other non-integers.
		      if (n.c && !n.isInteger()) {
		        throw Error
		          (bignumberError + 'Exponent not an integer: ' + valueOf(n));
		      }

		      if (m != null) m = new BigNumber(m);

		      // Exponent of MAX_SAFE_INTEGER is 15.
		      nIsBig = n.e > 14;

		      // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
		      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

		        // The sign of the result of pow when x is negative depends on the evenness of n.
		        // If +n overflows to ±Infinity, the evenness of n would be not be known.
		        y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
		        return m ? y.mod(m) : y;
		      }

		      nIsNeg = n.s < 0;

		      if (m) {

		        // x % m returns NaN if abs(m) is zero, or m is NaN.
		        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

		        isModExp = !nIsNeg && x.isInteger() && m.isInteger();

		        if (isModExp) x = x.mod(m);

		      // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
		      // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
		      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
		        // [1, 240000000]
		        ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
		        // [80000000000000]  [99999750000000]
		        : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

		        // If x is negative and n is odd, k = -0, else k = 0.
		        k = x.s < 0 && isOdd(n) ? -0 : 0;

		        // If x >= 1, k = ±Infinity.
		        if (x.e > -1) k = 1 / k;

		        // If n is negative return ±0, else return ±Infinity.
		        return new BigNumber(nIsNeg ? 1 / k : k);

		      } else if (POW_PRECISION) {

		        // Truncating each coefficient array to a length of k after each multiplication
		        // equates to truncating significant digits to POW_PRECISION + [28, 41],
		        // i.e. there will be a minimum of 28 guard digits retained.
		        k = mathceil(POW_PRECISION / LOG_BASE + 2);
		      }

		      if (nIsBig) {
		        half = new BigNumber(0.5);
		        if (nIsNeg) n.s = 1;
		        nIsOdd = isOdd(n);
		      } else {
		        i = Math.abs(+valueOf(n));
		        nIsOdd = i % 2;
		      }

		      y = new BigNumber(ONE);

		      // Performs 54 loop iterations for n of 9007199254740991.
		      for (; ;) {

		        if (nIsOdd) {
		          y = y.times(x);
		          if (!y.c) break;

		          if (k) {
		            if (y.c.length > k) y.c.length = k;
		          } else if (isModExp) {
		            y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
		          }
		        }

		        if (i) {
		          i = mathfloor(i / 2);
		          if (i === 0) break;
		          nIsOdd = i % 2;
		        } else {
		          n = n.times(half);
		          round(n, n.e + 1, 1);

		          if (n.e > 14) {
		            nIsOdd = isOdd(n);
		          } else {
		            i = +valueOf(n);
		            if (i === 0) break;
		            nIsOdd = i % 2;
		          }
		        }

		        x = x.times(x);

		        if (k) {
		          if (x.c && x.c.length > k) x.c.length = k;
		        } else if (isModExp) {
		          x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
		        }
		      }

		      if (isModExp) return y;
		      if (nIsNeg) y = ONE.div(y);

		      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
		    };


		    /*
		     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
		     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
		     *
		     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
		     *
		     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
		     */
		    P.integerValue = function (rm) {
		      var n = new BigNumber(this);
		      if (rm == null) rm = ROUNDING_MODE;
		      else intCheck(rm, 0, 8);
		      return round(n, n.e + 1, rm);
		    };


		    /*
		     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
		     * otherwise return false.
		     */
		    P.isEqualTo = P.eq = function (y, b) {
		      return compare(this, new BigNumber(y, b)) === 0;
		    };


		    /*
		     * Return true if the value of this BigNumber is a finite number, otherwise return false.
		     */
		    P.isFinite = function () {
		      return !!this.c;
		    };


		    /*
		     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
		     * otherwise return false.
		     */
		    P.isGreaterThan = P.gt = function (y, b) {
		      return compare(this, new BigNumber(y, b)) > 0;
		    };


		    /*
		     * Return true if the value of this BigNumber is greater than or equal to the value of
		     * BigNumber(y, b), otherwise return false.
		     */
		    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
		      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

		    };


		    /*
		     * Return true if the value of this BigNumber is an integer, otherwise return false.
		     */
		    P.isInteger = function () {
		      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
		    };


		    /*
		     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
		     * otherwise return false.
		     */
		    P.isLessThan = P.lt = function (y, b) {
		      return compare(this, new BigNumber(y, b)) < 0;
		    };


		    /*
		     * Return true if the value of this BigNumber is less than or equal to the value of
		     * BigNumber(y, b), otherwise return false.
		     */
		    P.isLessThanOrEqualTo = P.lte = function (y, b) {
		      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
		    };


		    /*
		     * Return true if the value of this BigNumber is NaN, otherwise return false.
		     */
		    P.isNaN = function () {
		      return !this.s;
		    };


		    /*
		     * Return true if the value of this BigNumber is negative, otherwise return false.
		     */
		    P.isNegative = function () {
		      return this.s < 0;
		    };


		    /*
		     * Return true if the value of this BigNumber is positive, otherwise return false.
		     */
		    P.isPositive = function () {
		      return this.s > 0;
		    };


		    /*
		     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
		     */
		    P.isZero = function () {
		      return !!this.c && this.c[0] == 0;
		    };


		    /*
		     *  n - 0 = n
		     *  n - N = N
		     *  n - I = -I
		     *  0 - n = -n
		     *  0 - 0 = 0
		     *  0 - N = N
		     *  0 - I = -I
		     *  N - n = N
		     *  N - 0 = N
		     *  N - N = N
		     *  N - I = N
		     *  I - n = I
		     *  I - 0 = I
		     *  I - N = N
		     *  I - I = N
		     *
		     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
		     * BigNumber(y, b).
		     */
		    P.minus = function (y, b) {
		      var i, j, t, xLTy,
		        x = this,
		        a = x.s;

		      y = new BigNumber(y, b);
		      b = y.s;

		      // Either NaN?
		      if (!a || !b) return new BigNumber(NaN);

		      // Signs differ?
		      if (a != b) {
		        y.s = -b;
		        return x.plus(y);
		      }

		      var xe = x.e / LOG_BASE,
		        ye = y.e / LOG_BASE,
		        xc = x.c,
		        yc = y.c;

		      if (!xe || !ye) {

		        // Either Infinity?
		        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

		        // Either zero?
		        if (!xc[0] || !yc[0]) {

		          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
		          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

		           // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
		           ROUNDING_MODE == 3 ? -0 : 0);
		        }
		      }

		      xe = bitFloor(xe);
		      ye = bitFloor(ye);
		      xc = xc.slice();

		      // Determine which is the bigger number.
		      if (a = xe - ye) {

		        if (xLTy = a < 0) {
		          a = -a;
		          t = xc;
		        } else {
		          ye = xe;
		          t = yc;
		        }

		        t.reverse();

		        // Prepend zeros to equalise exponents.
		        for (b = a; b--; t.push(0));
		        t.reverse();
		      } else {

		        // Exponents equal. Check digit by digit.
		        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

		        for (a = b = 0; b < j; b++) {

		          if (xc[b] != yc[b]) {
		            xLTy = xc[b] < yc[b];
		            break;
		          }
		        }
		      }

		      // x < y? Point xc to the array of the bigger number.
		      if (xLTy) {
		        t = xc;
		        xc = yc;
		        yc = t;
		        y.s = -y.s;
		      }

		      b = (j = yc.length) - (i = xc.length);

		      // Append zeros to xc if shorter.
		      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
		      if (b > 0) for (; b--; xc[i++] = 0);
		      b = BASE - 1;

		      // Subtract yc from xc.
		      for (; j > a;) {

		        if (xc[--j] < yc[j]) {
		          for (i = j; i && !xc[--i]; xc[i] = b);
		          --xc[i];
		          xc[j] += BASE;
		        }

		        xc[j] -= yc[j];
		      }

		      // Remove leading zeros and adjust exponent accordingly.
		      for (; xc[0] == 0; xc.splice(0, 1), --ye);

		      // Zero?
		      if (!xc[0]) {

		        // Following IEEE 754 (2008) 6.3,
		        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
		        y.s = ROUNDING_MODE == 3 ? -1 : 1;
		        y.c = [y.e = 0];
		        return y;
		      }

		      // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
		      // for finite x and y.
		      return normalise(y, xc, ye);
		    };


		    /*
		     *   n % 0 =  N
		     *   n % N =  N
		     *   n % I =  n
		     *   0 % n =  0
		     *  -0 % n = -0
		     *   0 % 0 =  N
		     *   0 % N =  N
		     *   0 % I =  0
		     *   N % n =  N
		     *   N % 0 =  N
		     *   N % N =  N
		     *   N % I =  N
		     *   I % n =  N
		     *   I % 0 =  N
		     *   I % N =  N
		     *   I % I =  N
		     *
		     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
		     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
		     */
		    P.modulo = P.mod = function (y, b) {
		      var q, s,
		        x = this;

		      y = new BigNumber(y, b);

		      // Return NaN if x is Infinity or NaN, or y is NaN or zero.
		      if (!x.c || !y.s || y.c && !y.c[0]) {
		        return new BigNumber(NaN);

		      // Return x if y is Infinity or x is zero.
		      } else if (!y.c || x.c && !x.c[0]) {
		        return new BigNumber(x);
		      }

		      if (MODULO_MODE == 9) {

		        // Euclidian division: q = sign(y) * floor(x / abs(y))
		        // r = x - qy    where  0 <= r < abs(y)
		        s = y.s;
		        y.s = 1;
		        q = div(x, y, 0, 3);
		        y.s = s;
		        q.s *= s;
		      } else {
		        q = div(x, y, 0, MODULO_MODE);
		      }

		      y = x.minus(q.times(y));

		      // To match JavaScript %, ensure sign of zero is sign of dividend.
		      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

		      return y;
		    };


		    /*
		     *  n * 0 = 0
		     *  n * N = N
		     *  n * I = I
		     *  0 * n = 0
		     *  0 * 0 = 0
		     *  0 * N = N
		     *  0 * I = N
		     *  N * n = N
		     *  N * 0 = N
		     *  N * N = N
		     *  N * I = N
		     *  I * n = I
		     *  I * 0 = N
		     *  I * N = N
		     *  I * I = I
		     *
		     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
		     * of BigNumber(y, b).
		     */
		    P.multipliedBy = P.times = function (y, b) {
		      var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
		        base, sqrtBase,
		        x = this,
		        xc = x.c,
		        yc = (y = new BigNumber(y, b)).c;

		      // Either NaN, ±Infinity or ±0?
		      if (!xc || !yc || !xc[0] || !yc[0]) {

		        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
		        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
		          y.c = y.e = y.s = null;
		        } else {
		          y.s *= x.s;

		          // Return ±Infinity if either is ±Infinity.
		          if (!xc || !yc) {
		            y.c = y.e = null;

		          // Return ±0 if either is ±0.
		          } else {
		            y.c = [0];
		            y.e = 0;
		          }
		        }

		        return y;
		      }

		      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
		      y.s *= x.s;
		      xcL = xc.length;
		      ycL = yc.length;

		      // Ensure xc points to longer array and xcL to its length.
		      if (xcL < ycL) {
		        zc = xc;
		        xc = yc;
		        yc = zc;
		        i = xcL;
		        xcL = ycL;
		        ycL = i;
		      }

		      // Initialise the result array with zeros.
		      for (i = xcL + ycL, zc = []; i--; zc.push(0));

		      base = BASE;
		      sqrtBase = SQRT_BASE;

		      for (i = ycL; --i >= 0;) {
		        c = 0;
		        ylo = yc[i] % sqrtBase;
		        yhi = yc[i] / sqrtBase | 0;

		        for (k = xcL, j = i + k; j > i;) {
		          xlo = xc[--k] % sqrtBase;
		          xhi = xc[k] / sqrtBase | 0;
		          m = yhi * xlo + xhi * ylo;
		          xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
		          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
		          zc[j--] = xlo % base;
		        }

		        zc[j] = c;
		      }

		      if (c) {
		        ++e;
		      } else {
		        zc.splice(0, 1);
		      }

		      return normalise(y, zc, e);
		    };


		    /*
		     * Return a new BigNumber whose value is the value of this BigNumber negated,
		     * i.e. multiplied by -1.
		     */
		    P.negated = function () {
		      var x = new BigNumber(this);
		      x.s = -x.s || null;
		      return x;
		    };


		    /*
		     *  n + 0 = n
		     *  n + N = N
		     *  n + I = I
		     *  0 + n = n
		     *  0 + 0 = 0
		     *  0 + N = N
		     *  0 + I = I
		     *  N + n = N
		     *  N + 0 = N
		     *  N + N = N
		     *  N + I = N
		     *  I + n = I
		     *  I + 0 = I
		     *  I + N = N
		     *  I + I = I
		     *
		     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
		     * BigNumber(y, b).
		     */
		    P.plus = function (y, b) {
		      var t,
		        x = this,
		        a = x.s;

		      y = new BigNumber(y, b);
		      b = y.s;

		      // Either NaN?
		      if (!a || !b) return new BigNumber(NaN);

		      // Signs differ?
		       if (a != b) {
		        y.s = -b;
		        return x.minus(y);
		      }

		      var xe = x.e / LOG_BASE,
		        ye = y.e / LOG_BASE,
		        xc = x.c,
		        yc = y.c;

		      if (!xe || !ye) {

		        // Return ±Infinity if either ±Infinity.
		        if (!xc || !yc) return new BigNumber(a / 0);

		        // Either zero?
		        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
		        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
		      }

		      xe = bitFloor(xe);
		      ye = bitFloor(ye);
		      xc = xc.slice();

		      // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
		      if (a = xe - ye) {
		        if (a > 0) {
		          ye = xe;
		          t = yc;
		        } else {
		          a = -a;
		          t = xc;
		        }

		        t.reverse();
		        for (; a--; t.push(0));
		        t.reverse();
		      }

		      a = xc.length;
		      b = yc.length;

		      // Point xc to the longer array, and b to the shorter length.
		      if (a - b < 0) {
		        t = yc;
		        yc = xc;
		        xc = t;
		        b = a;
		      }

		      // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
		      for (a = 0; b;) {
		        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
		        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
		      }

		      if (a) {
		        xc = [a].concat(xc);
		        ++ye;
		      }

		      // No need to check for zero, as +x + +y != 0 && -x + -y != 0
		      // ye = MAX_EXP + 1 possible
		      return normalise(y, xc, ye);
		    };


		    /*
		     * If sd is undefined or null or true or false, return the number of significant digits of
		     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
		     * If sd is true include integer-part trailing zeros in the count.
		     *
		     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
		     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
		     * ROUNDING_MODE if rm is omitted.
		     *
		     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
		     *                     boolean: whether to count integer-part trailing zeros: true or false.
		     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
		     *
		     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
		     */
		    P.precision = P.sd = function (sd, rm) {
		      var c, n, v,
		        x = this;

		      if (sd != null && sd !== !!sd) {
		        intCheck(sd, 1, MAX);
		        if (rm == null) rm = ROUNDING_MODE;
		        else intCheck(rm, 0, 8);

		        return round(new BigNumber(x), sd, rm);
		      }

		      if (!(c = x.c)) return null;
		      v = c.length - 1;
		      n = v * LOG_BASE + 1;

		      if (v = c[v]) {

		        // Subtract the number of trailing zeros of the last element.
		        for (; v % 10 == 0; v /= 10, n--);

		        // Add the number of digits of the first element.
		        for (v = c[0]; v >= 10; v /= 10, n++);
		      }

		      if (sd && x.e + 1 > n) n = x.e + 1;

		      return n;
		    };


		    /*
		     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
		     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
		     *
		     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
		     *
		     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
		     */
		    P.shiftedBy = function (k) {
		      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
		      return this.times('1e' + k);
		    };


		    /*
		     *  sqrt(-n) =  N
		     *  sqrt(N) =  N
		     *  sqrt(-I) =  N
		     *  sqrt(I) =  I
		     *  sqrt(0) =  0
		     *  sqrt(-0) = -0
		     *
		     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
		     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
		     */
		    P.squareRoot = P.sqrt = function () {
		      var m, n, r, rep, t,
		        x = this,
		        c = x.c,
		        s = x.s,
		        e = x.e,
		        dp = DECIMAL_PLACES + 4,
		        half = new BigNumber('0.5');

		      // Negative/NaN/Infinity/zero?
		      if (s !== 1 || !c || !c[0]) {
		        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
		      }

		      // Initial estimate.
		      s = Math.sqrt(+valueOf(x));

		      // Math.sqrt underflow/overflow?
		      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
		      if (s == 0 || s == 1 / 0) {
		        n = coeffToString(c);
		        if ((n.length + e) % 2 == 0) n += '0';
		        s = Math.sqrt(+n);
		        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

		        if (s == 1 / 0) {
		          n = '5e' + e;
		        } else {
		          n = s.toExponential();
		          n = n.slice(0, n.indexOf('e') + 1) + e;
		        }

		        r = new BigNumber(n);
		      } else {
		        r = new BigNumber(s + '');
		      }

		      // Check for zero.
		      // r could be zero if MIN_EXP is changed after the this value was created.
		      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
		      // coeffToString to throw.
		      if (r.c[0]) {
		        e = r.e;
		        s = e + dp;
		        if (s < 3) s = 0;

		        // Newton-Raphson iteration.
		        for (; ;) {
		          t = r;
		          r = half.times(t.plus(div(x, t, dp, 1)));

		          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

		            // The exponent of r may here be one less than the final result exponent,
		            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
		            // are indexed correctly.
		            if (r.e < e) --s;
		            n = n.slice(s - 3, s + 1);

		            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
		            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
		            // iteration.
		            if (n == '9999' || !rep && n == '4999') {

		              // On the first iteration only, check to see if rounding up gives the
		              // exact result as the nines may infinitely repeat.
		              if (!rep) {
		                round(t, t.e + DECIMAL_PLACES + 2, 0);

		                if (t.times(t).eq(x)) {
		                  r = t;
		                  break;
		                }
		              }

		              dp += 4;
		              s += 4;
		              rep = 1;
		            } else {

		              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
		              // result. If not, then there are further digits and m will be truthy.
		              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

		                // Truncate to the first rounding digit.
		                round(r, r.e + DECIMAL_PLACES + 2, 1);
		                m = !r.times(r).eq(x);
		              }

		              break;
		            }
		          }
		        }
		      }

		      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
		    };


		    /*
		     * Return a string representing the value of this BigNumber in exponential notation and
		     * rounded using ROUNDING_MODE to dp fixed decimal places.
		     *
		     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
		     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
		     *
		     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
		     */
		    P.toExponential = function (dp, rm) {
		      if (dp != null) {
		        intCheck(dp, 0, MAX);
		        dp++;
		      }
		      return format(this, dp, rm, 1);
		    };


		    /*
		     * Return a string representing the value of this BigNumber in fixed-point notation rounding
		     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
		     *
		     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
		     * but e.g. (-0.00001).toFixed(0) is '-0'.
		     *
		     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
		     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
		     *
		     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
		     */
		    P.toFixed = function (dp, rm) {
		      if (dp != null) {
		        intCheck(dp, 0, MAX);
		        dp = dp + this.e + 1;
		      }
		      return format(this, dp, rm);
		    };


		    /*
		     * Return a string representing the value of this BigNumber in fixed-point notation rounded
		     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
		     * of the format or FORMAT object (see BigNumber.set).
		     *
		     * The formatting object may contain some or all of the properties shown below.
		     *
		     * FORMAT = {
		     *   prefix: '',
		     *   groupSize: 3,
		     *   secondaryGroupSize: 0,
		     *   groupSeparator: ',',
		     *   decimalSeparator: '.',
		     *   fractionGroupSize: 0,
		     *   fractionGroupSeparator: '\xA0',      // non-breaking space
		     *   suffix: ''
		     * };
		     *
		     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
		     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
		     * [format] {object} Formatting options. See FORMAT pbject above.
		     *
		     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
		     * '[BigNumber Error] Argument not an object: {format}'
		     */
		    P.toFormat = function (dp, rm, format) {
		      var str,
		        x = this;

		      if (format == null) {
		        if (dp != null && rm && typeof rm == 'object') {
		          format = rm;
		          rm = null;
		        } else if (dp && typeof dp == 'object') {
		          format = dp;
		          dp = rm = null;
		        } else {
		          format = FORMAT;
		        }
		      } else if (typeof format != 'object') {
		        throw Error
		          (bignumberError + 'Argument not an object: ' + format);
		      }

		      str = x.toFixed(dp, rm);

		      if (x.c) {
		        var i,
		          arr = str.split('.'),
		          g1 = +format.groupSize,
		          g2 = +format.secondaryGroupSize,
		          groupSeparator = format.groupSeparator || '',
		          intPart = arr[0],
		          fractionPart = arr[1],
		          isNeg = x.s < 0,
		          intDigits = isNeg ? intPart.slice(1) : intPart,
		          len = intDigits.length;

		        if (g2) {
		          i = g1;
		          g1 = g2;
		          g2 = i;
		          len -= i;
		        }

		        if (g1 > 0 && len > 0) {
		          i = len % g1 || g1;
		          intPart = intDigits.substr(0, i);
		          for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
		          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
		          if (isNeg) intPart = '-' + intPart;
		        }

		        str = fractionPart
		         ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
		          ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
		           '$&' + (format.fractionGroupSeparator || ''))
		          : fractionPart)
		         : intPart;
		      }

		      return (format.prefix || '') + str + (format.suffix || '');
		    };


		    /*
		     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
		     * fraction with an integer numerator and an integer denominator.
		     * The denominator will be a positive non-zero value less than or equal to the specified
		     * maximum denominator. If a maximum denominator is not specified, the denominator will be
		     * the lowest value necessary to represent the number exactly.
		     *
		     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
		     *
		     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
		     */
		    P.toFraction = function (md) {
		      var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
		        x = this,
		        xc = x.c;

		      if (md != null) {
		        n = new BigNumber(md);

		        // Throw if md is less than one or is not an integer, unless it is Infinity.
		        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
		          throw Error
		            (bignumberError + 'Argument ' +
		              (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
		        }
		      }

		      if (!xc) return new BigNumber(x);

		      d = new BigNumber(ONE);
		      n1 = d0 = new BigNumber(ONE);
		      d1 = n0 = new BigNumber(ONE);
		      s = coeffToString(xc);

		      // Determine initial denominator.
		      // d is a power of 10 and the minimum max denominator that specifies the value exactly.
		      e = d.e = s.length - x.e - 1;
		      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
		      md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

		      exp = MAX_EXP;
		      MAX_EXP = 1 / 0;
		      n = new BigNumber(s);

		      // n0 = d1 = 0
		      n0.c[0] = 0;

		      for (; ;)  {
		        q = div(n, d, 0, 1);
		        d2 = d0.plus(q.times(d1));
		        if (d2.comparedTo(md) == 1) break;
		        d0 = d1;
		        d1 = d2;
		        n1 = n0.plus(q.times(d2 = n1));
		        n0 = d2;
		        d = n.minus(q.times(d2 = d));
		        n = d2;
		      }

		      d2 = div(md.minus(d0), d1, 0, 1);
		      n0 = n0.plus(d2.times(n1));
		      d0 = d0.plus(d2.times(d1));
		      n0.s = n1.s = x.s;
		      e = e * 2;

		      // Determine which fraction is closer to x, n0/d0 or n1/d1
		      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
		          div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

		      MAX_EXP = exp;

		      return r;
		    };


		    /*
		     * Return the value of this BigNumber converted to a number primitive.
		     */
		    P.toNumber = function () {
		      return +valueOf(this);
		    };


		    /*
		     * Return a string representing the value of this BigNumber rounded to sd significant digits
		     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
		     * necessary to represent the integer part of the value in fixed-point notation, then use
		     * exponential notation.
		     *
		     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
		     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
		     *
		     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
		     */
		    P.toPrecision = function (sd, rm) {
		      if (sd != null) intCheck(sd, 1, MAX);
		      return format(this, sd, rm, 2);
		    };


		    /*
		     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
		     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
		     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
		     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
		     * TO_EXP_NEG, return exponential notation.
		     *
		     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
		     *
		     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
		     */
		    P.toString = function (b) {
		      var str,
		        n = this,
		        s = n.s,
		        e = n.e;

		      // Infinity or NaN?
		      if (e === null) {
		        if (s) {
		          str = 'Infinity';
		          if (s < 0) str = '-' + str;
		        } else {
		          str = 'NaN';
		        }
		      } else {
		        if (b == null) {
		          str = e <= TO_EXP_NEG || e >= TO_EXP_POS
		           ? toExponential(coeffToString(n.c), e)
		           : toFixedPoint(coeffToString(n.c), e, '0');
		        } else if (b === 10 && alphabetHasNormalDecimalDigits) {
		          n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
		          str = toFixedPoint(coeffToString(n.c), n.e, '0');
		        } else {
		          intCheck(b, 2, ALPHABET.length, 'Base');
		          str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
		        }

		        if (s < 0 && n.c[0]) str = '-' + str;
		      }

		      return str;
		    };


		    /*
		     * Return as toString, but do not accept a base argument, and include the minus sign for
		     * negative zero.
		     */
		    P.valueOf = P.toJSON = function () {
		      return valueOf(this);
		    };


		    P._isBigNumber = true;

		    if (configObject != null) BigNumber.set(configObject);

		    return BigNumber;
		  }


		  // PRIVATE HELPER FUNCTIONS

		  // These functions don't need access to variables,
		  // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


		  function bitFloor(n) {
		    var i = n | 0;
		    return n > 0 || n === i ? i : i - 1;
		  }


		  // Return a coefficient array as a string of base 10 digits.
		  function coeffToString(a) {
		    var s, z,
		      i = 1,
		      j = a.length,
		      r = a[0] + '';

		    for (; i < j;) {
		      s = a[i++] + '';
		      z = LOG_BASE - s.length;
		      for (; z--; s = '0' + s);
		      r += s;
		    }

		    // Determine trailing zeros.
		    for (j = r.length; r.charCodeAt(--j) === 48;);

		    return r.slice(0, j + 1 || 1);
		  }


		  // Compare the value of BigNumbers x and y.
		  function compare(x, y) {
		    var a, b,
		      xc = x.c,
		      yc = y.c,
		      i = x.s,
		      j = y.s,
		      k = x.e,
		      l = y.e;

		    // Either NaN?
		    if (!i || !j) return null;

		    a = xc && !xc[0];
		    b = yc && !yc[0];

		    // Either zero?
		    if (a || b) return a ? b ? 0 : -j : i;

		    // Signs differ?
		    if (i != j) return i;

		    a = i < 0;
		    b = k == l;

		    // Either Infinity?
		    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

		    // Compare exponents.
		    if (!b) return k > l ^ a ? 1 : -1;

		    j = (k = xc.length) < (l = yc.length) ? k : l;

		    // Compare digit by digit.
		    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

		    // Compare lengths.
		    return k == l ? 0 : k > l ^ a ? 1 : -1;
		  }


		  /*
		   * Check that n is a primitive number, an integer, and in range, otherwise throw.
		   */
		  function intCheck(n, min, max, name) {
		    if (n < min || n > max || n !== mathfloor(n)) {
		      throw Error
		       (bignumberError + (name || 'Argument') + (typeof n == 'number'
		         ? n < min || n > max ? ' out of range: ' : ' not an integer: '
		         : ' not a primitive number: ') + String(n));
		    }
		  }


		  // Assumes finite n.
		  function isOdd(n) {
		    var k = n.c.length - 1;
		    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
		  }


		  function toExponential(str, e) {
		    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
		     (e < 0 ? 'e' : 'e+') + e;
		  }


		  function toFixedPoint(str, e, z) {
		    var len, zs;

		    // Negative exponent?
		    if (e < 0) {

		      // Prepend zeros.
		      for (zs = z + '.'; ++e; zs += z);
		      str = zs + str;

		    // Positive exponent
		    } else {
		      len = str.length;

		      // Append zeros.
		      if (++e > len) {
		        for (zs = z, e -= len; --e; zs += z);
		        str += zs;
		      } else if (e < len) {
		        str = str.slice(0, e) + '.' + str.slice(e);
		      }
		    }

		    return str;
		  }


		  // EXPORT


		  BigNumber = clone();
		  BigNumber['default'] = BigNumber.BigNumber = BigNumber;

		  // AMD.
		  if (module.exports) {
		    module.exports = BigNumber;

		  // Browser.
		  } else {
		    if (!globalObject) {
		      globalObject = typeof self != 'undefined' && self ? self : window;
		    }

		    globalObject.BigNumber = BigNumber;
		  }
		})(bignumber); 
	} (bignumber$1));
	return bignumber$1.exports;
}

var utils$1 = {};

var hasRequiredUtils$1;

function requireUtils$1 () {
	if (hasRequiredUtils$1) return utils$1;
	hasRequiredUtils$1 = 1;
	(function (exports) {
		var __importDefault = (utils$1 && utils$1.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.utf8Decoder = exports.addSpanBytesToObject = exports.getBigNum = exports.MAX_BIG_NUM_INT64 = exports.MAX_BIG_NUM_INT32 = exports.MAX_BIG_NUM_INT = exports.POW_2_53 = exports.POW_2_32 = exports.POW_2_24 = exports.SHIFT32 = void 0;
		const bignumber_js_1 = __importDefault(requireBignumber());
		const MAX_SAFE_HIGH = 0x1fffff;
		exports.SHIFT32 = 0x100000000;
		exports.POW_2_24 = 5.960464477539063e-8;
		exports.POW_2_32 = 4294967296;
		exports.POW_2_53 = 9007199254740992;
		exports.MAX_BIG_NUM_INT = new bignumber_js_1.default('0x20000000000000');
		exports.MAX_BIG_NUM_INT32 = new bignumber_js_1.default('0xffffffff');
		exports.MAX_BIG_NUM_INT64 = new bignumber_js_1.default('0xffffffffffffffff');
		const getBigNum = (f, g) => {
		    if (f > MAX_SAFE_HIGH) {
		        return new bignumber_js_1.default(f).times(exports.SHIFT32).plus(g);
		    }
		    return f * exports.SHIFT32 + g;
		};
		exports.getBigNum = getBigNum;
		const addSpanBytesToObject = (obj, span) => {
		    const spanObj = obj;
		    spanObj.byteSpan = span;
		    spanObj.getByteSpan = function () {
		        return this.byteSpan;
		    };
		    return spanObj;
		};
		exports.addSpanBytesToObject = addSpanBytesToObject;
		const td = new TextDecoder('utf8', { fatal: true, ignoreBOM: true });
		const utf8Decoder = (buf) => td.decode(buf);
		exports.utf8Decoder = utf8Decoder; 
	} (utils$1));
	return utils$1;
}

var BufferList = {};

var hasRequiredBufferList;

function requireBufferList () {
	if (hasRequiredBufferList) return BufferList;
	hasRequiredBufferList = 1;
	Object.defineProperty(BufferList, "__esModule", { value: true });
	const buffer_1 = requireDist$1();
	let BufferList$1 = class BufferList {
	    constructor() {
	        this.buf = buffer_1.Buffer.alloc(0);
	    }
	    get length() {
	        return this.buf.length;
	    }
	    read(n) {
	        if (n === 0) {
	            return buffer_1.Buffer.alloc(0);
	        }
	        if (n < 0) {
	            throw new Error('invalid length');
	        }
	        const chunk = this.buf.slice(0, n);
	        this.buf = this.buf.slice(n);
	        if (chunk.length < n) {
	            throw new Error('Not enough buffer');
	        }
	        return chunk;
	    }
	    push(chunk) {
	        if (!chunk.length)
	            return;
	        this.buf = buffer_1.Buffer.concat([this.buf, chunk]);
	    }
	};
	BufferList.default = BufferList$1;
	return BufferList;
}

var SimpleValue = {};

var hasRequiredSimpleValue;

function requireSimpleValue () {
	if (hasRequiredSimpleValue) return SimpleValue;
	hasRequiredSimpleValue = 1;
	Object.defineProperty(SimpleValue, "__esModule", { value: true });
	let SimpleValue$1 = class SimpleValue {
	    constructor(value) {
	        this.value = value;
	    }
	};
	SimpleValue.default = SimpleValue$1;
	return SimpleValue;
}

var CborTag = {};

var hasRequiredCborTag;

function requireCborTag () {
	if (hasRequiredCborTag) return CborTag;
	hasRequiredCborTag = 1;
	Object.defineProperty(CborTag, "__esModule", { value: true });
	let CborTag$1 = class CborTag {
	    constructor(value, tag) {
	        this.byteSpan = [0, 0];
	        this.value = value;
	        this.tag = tag;
	    }
	    setByteSpan(byteSpan) {
	        this.byteSpan = byteSpan;
	    }
	    getByteSpan() {
	        return this.byteSpan;
	    }
	};
	CborTag.default = CborTag$1;
	return CborTag;
}

var CborArray = {};

var hasRequiredCborArray;

function requireCborArray () {
	if (hasRequiredCborArray) return CborArray;
	hasRequiredCborArray = 1;
	Object.defineProperty(CborArray, "__esModule", { value: true });
	let CborArray$1 = class CborArray extends Array {
	    constructor() {
	        super(...arguments);
	        this.byteSpan = [0, 0];
	    }
	    setByteSpan(byteSpan) {
	        this.byteSpan = byteSpan;
	    }
	    getByteSpan() {
	        return this.byteSpan;
	    }
	};
	CborArray.default = CborArray$1;
	return CborArray;
}

var CborMap = {};

var hasRequiredCborMap;

function requireCborMap () {
	if (hasRequiredCborMap) return CborMap;
	hasRequiredCborMap = 1;
	Object.defineProperty(CborMap, "__esModule", { value: true });
	let CborMap$1 = class CborMap extends Map {
	    constructor() {
	        super(...arguments);
	        this.byteSpan = [0, 0];
	    }
	    setByteSpan(byteSpan) {
	        this.byteSpan = byteSpan;
	    }
	    getByteSpan() {
	        return this.byteSpan;
	    }
	};
	CborMap.default = CborMap$1;
	return CborMap;
}

var hasRequiredDecoder;

function requireDecoder () {
	if (hasRequiredDecoder) return Decoder$1;
	hasRequiredDecoder = 1;
	/* eslint-disable no-underscore-dangle */
	/* eslint-disable no-bitwise */
	var __createBinding = (Decoder$1 && Decoder$1.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (Decoder$1 && Decoder$1.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (Decoder$1 && Decoder$1.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __importDefault = (Decoder$1 && Decoder$1.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(Decoder$1, "__esModule", { value: true });
	const buffer_1 = requireDist$1();
	const stream = __importStar(requireStreamBrowserify());
	const bignumber_js_1 = __importDefault(requireBignumber());
	const utils_1 = requireUtils$1();
	const BufferList_1 = __importDefault(requireBufferList());
	const SimpleValue_1 = __importDefault(requireSimpleValue());
	const CborTag_1 = __importDefault(requireCborTag());
	const CborArray_1 = __importDefault(requireCborArray());
	const CborMap_1 = __importDefault(requireCborMap());
	const readFloat16 = (value) => {
	    const sign = value & 0x8000;
	    let exponent = value & 0x7c00;
	    const fraction = value & 0x03ff;
	    if (exponent === 0x7c00)
	        exponent = 0xff << 10;
	    else if (exponent !== 0)
	        exponent += (127 - 15) << 10;
	    else if (fraction !== 0)
	        return (sign ? -1 : 1) * fraction * utils_1.POW_2_24;
	    const buf = buffer_1.Buffer.alloc(4);
	    buf.writeUInt32BE((sign << 16) | (exponent << 13) | (fraction << 13));
	    return buf.readFloatBE(0);
	};
	const isBreakPoint = (value) => {
	    if (value !== 0xff)
	        return false;
	    return true;
	};
	class Decoder extends stream.Transform {
	    constructor() {
	        super({
	            writableObjectMode: false,
	            readableObjectMode: true,
	        });
	        this.needed = null;
	        this.fresh = true;
	        this._parser = this.parse();
	        this.offset = 0;
	        this.usedBytes = [];
	        this.bl = new BufferList_1.default();
	        this.restart();
	    }
	    static decode(inputBytes) {
	        const decoder = new Decoder();
	        const bs = new BufferList_1.default();
	        bs.push(inputBytes);
	        const parser = decoder.parse();
	        let state = parser.next();
	        while (!state.done) {
	            const b = bs.read(state.value);
	            if (b == null || b.length !== state.value) {
	                throw new Error('Insufficient data');
	            }
	            state = parser.next(b);
	        }
	        if (bs.length > 0) {
	            throw new Error('Remaining Bytes');
	        }
	        return {
	            bytes: inputBytes,
	            value: state.value,
	        };
	    }
	    readUInt64(f, g, startByte) {
	        const bigNum = (0, utils_1.getBigNum)(f, g);
	        if (bignumber_js_1.default.isBigNumber(bigNum)) {
	            return (0, utils_1.addSpanBytesToObject)(bigNum, [startByte, this.offset]);
	        }
	        return bigNum;
	    }
	    updateTracker(bytes) {
	        this.usedBytes.push(bytes);
	        this.offset += bytes.length;
	    }
	    *readIndefiniteStringLength(majorType, startByte) {
	        let bytes = yield 1;
	        let length;
	        const number = bytes.readUInt8(0);
	        if (number === 0xff) {
	            length = -1;
	        }
	        else {
	            const ai = number & 0x1f;
	            // read length
	            const lengthReader = this.readLength(ai, startByte);
	            let lengthStatus = lengthReader.next();
	            while (!lengthStatus.done) {
	                bytes = yield lengthStatus.value;
	                lengthStatus = lengthReader.next(bytes);
	            }
	            length = lengthStatus.value;
	            //
	            if (length < 0 || number >> 5 !== majorType) {
	                throw new Error('Invalid indefinite length encoding');
	            }
	        }
	        return length;
	    }
	    *readLength(additionalInformation, startByte) {
	        if (additionalInformation < 24) {
	            return additionalInformation;
	        }
	        if (additionalInformation === 24) {
	            const bytes = yield 1;
	            return bytes.readUInt8(0);
	        }
	        if (additionalInformation === 25) {
	            const bytes = yield 2;
	            return bytes.readUInt16BE(0);
	        }
	        if (additionalInformation === 26) {
	            const bytes = yield 4;
	            return bytes.readUInt32BE(0);
	        }
	        if (additionalInformation === 27) {
	            const fBytes = yield 4;
	            const f = fBytes.readUInt32BE(0);
	            const gBytes = yield 4;
	            const g = gBytes.readUInt32BE(0);
	            return this.readUInt64(f, g, startByte);
	        }
	        if (additionalInformation === 31) {
	            return -1;
	        }
	        throw new Error('Invalid length encoding');
	    }
	    _transform(fresh, encoding, cb) {
	        this.bl.push(fresh);
	        while (this.bl.length >= this.needed) {
	            let ret = null;
	            let chunk;
	            if (this.needed === null) {
	                chunk = undefined;
	            }
	            else {
	                chunk = this.bl.read(this.needed);
	            }
	            try {
	                ret = this._parser.next(chunk);
	            }
	            catch (e) {
	                return cb(e);
	            }
	            if (this.needed) {
	                this.fresh = false;
	            }
	            if (ret.done) {
	                this.push({
	                    bytes: this.usedBytes,
	                    value: ret.value,
	                });
	                this.restart();
	            }
	            else {
	                this.needed = ret.value || Infinity;
	            }
	        }
	        return cb();
	    }
	    *parse(suppliedBytes) {
	        let startByte = this.offset;
	        let bytes;
	        if (suppliedBytes) {
	            bytes = suppliedBytes;
	            startByte -= suppliedBytes.length;
	        }
	        else {
	            bytes = yield 1;
	            this.updateTracker(bytes);
	        }
	        const value = bytes.readUInt8(0);
	        const majorType = value >> 5;
	        const additionalInformation = value & 0x1f;
	        let length;
	        if (majorType === 7) {
	            if (additionalInformation === 25) {
	                bytes = yield 2;
	                this.updateTracker(bytes);
	                const number = bytes.readUInt16BE(0);
	                return readFloat16(number);
	            }
	            if (additionalInformation === 26) {
	                bytes = yield 4;
	                this.updateTracker(bytes);
	                return bytes.readFloatBE(0);
	            }
	            if (additionalInformation === 27) {
	                bytes = yield 8;
	                this.updateTracker(bytes);
	                return bytes.readDoubleBE(0);
	            }
	        }
	        // read length
	        const lengthReader = this.readLength(additionalInformation, startByte);
	        let lengthStatus = lengthReader.next();
	        while (!lengthStatus.done) {
	            bytes = yield lengthStatus.value;
	            this.updateTracker(bytes);
	            lengthStatus = lengthReader.next(bytes);
	        }
	        length = lengthStatus.value;
	        //
	        if (length < 0 && (majorType < 2 || majorType > 6))
	            throw new Error('Invalid length');
	        switch (majorType) {
	            case 0:
	                return length;
	            case 1: {
	                if (length === Number.MAX_SAFE_INTEGER) {
	                    const bigNum = new bignumber_js_1.default(-1).minus(new bignumber_js_1.default(Number.MAX_SAFE_INTEGER.toString(16), 16));
	                    return (0, utils_1.addSpanBytesToObject)(bigNum, [startByte, this.offset]);
	                }
	                if (bignumber_js_1.default.isBigNumber(length)) {
	                    const bigNum = new bignumber_js_1.default(-1).minus(length);
	                    return (0, utils_1.addSpanBytesToObject)(bigNum, [startByte, this.offset]);
	                }
	                return -1 - length;
	            }
	            case 2: {
	                if (length < 0) {
	                    const chunks = [];
	                    {
	                        // read indefinite length
	                        const inDefLengthReader = this.readIndefiniteStringLength(majorType, startByte);
	                        let inDefLengthStatus = inDefLengthReader.next();
	                        while (!inDefLengthStatus.done) {
	                            bytes = yield inDefLengthStatus.value;
	                            this.updateTracker(bytes);
	                            inDefLengthStatus = inDefLengthReader.next(bytes);
	                        }
	                        length = inDefLengthStatus.value;
	                        //
	                    }
	                    while (length >= 0) {
	                        bytes = yield length;
	                        this.updateTracker(bytes);
	                        chunks.push(bytes);
	                        {
	                            // read indefinite length
	                            const inDefLengthReader = this.readIndefiniteStringLength(majorType, startByte);
	                            let inDefLengthStatus = inDefLengthReader.next();
	                            while (!inDefLengthStatus.done) {
	                                bytes = yield inDefLengthStatus.value;
	                                this.updateTracker(bytes);
	                                inDefLengthStatus = inDefLengthReader.next(bytes);
	                            }
	                            length = inDefLengthStatus.value;
	                            //
	                        }
	                    }
	                    const buf = buffer_1.Buffer.concat(chunks);
	                    return (0, utils_1.addSpanBytesToObject)(buf, [startByte, this.offset]);
	                }
	                bytes = yield length;
	                this.updateTracker(bytes);
	                return (0, utils_1.addSpanBytesToObject)(bytes, [startByte, this.offset]);
	            }
	            case 3: {
	                const stringBuf = [];
	                if (length < 0) {
	                    {
	                        // read indefinite length
	                        const inDefLengthReader = this.readIndefiniteStringLength(majorType, startByte);
	                        let inDefLengthStatus = inDefLengthReader.next();
	                        while (!inDefLengthStatus.done) {
	                            bytes = yield inDefLengthStatus.value;
	                            this.updateTracker(bytes);
	                            inDefLengthStatus = inDefLengthReader.next(bytes);
	                        }
	                        length = inDefLengthStatus.value;
	                        //
	                    }
	                    while (length >= 0) {
	                        bytes = yield length;
	                        this.updateTracker(bytes);
	                        stringBuf.push(bytes);
	                        //
	                        {
	                            // read indefinite length
	                            const inDefLengthReader = this.readIndefiniteStringLength(majorType, startByte);
	                            let inDefLengthStatus = inDefLengthReader.next();
	                            while (!inDefLengthStatus.done) {
	                                bytes = yield inDefLengthStatus.value;
	                                this.updateTracker(bytes);
	                                inDefLengthStatus = inDefLengthReader.next(bytes);
	                            }
	                            length = inDefLengthStatus.value;
	                            //
	                        }
	                    }
	                    const string = (0, utils_1.utf8Decoder)(buffer_1.Buffer.concat(stringBuf));
	                    return string;
	                }
	                bytes = yield length;
	                this.updateTracker(bytes);
	                const string = (0, utils_1.utf8Decoder)(bytes);
	                return string;
	            }
	            case 4: {
	                if (length < 0) {
	                    const ary = new CborArray_1.default();
	                    bytes = yield 1;
	                    this.updateTracker(bytes);
	                    let bp = bytes.readUInt8(0);
	                    while (!isBreakPoint(bp)) {
	                        ary.push(yield* this.parse(bytes));
	                        bytes = yield 1;
	                        this.updateTracker(bytes);
	                        bp = bytes.readUInt8(0);
	                    }
	                    ary.setByteSpan([startByte, this.offset]);
	                    return ary;
	                }
	                const ary = new CborArray_1.default();
	                for (let i = 0; i < length; i += 1) {
	                    ary.push(yield* this.parse());
	                }
	                ary.setByteSpan([startByte, this.offset]);
	                return ary;
	            }
	            case 5: {
	                if (length < 0) {
	                    const obj = new CborMap_1.default();
	                    bytes = yield 1;
	                    this.updateTracker(bytes);
	                    let bp = bytes.readUInt8(0);
	                    while (!isBreakPoint(bp)) {
	                        const key = yield* this.parse(bytes);
	                        const val = yield* this.parse();
	                        obj.set(key, val);
	                        bytes = yield 1;
	                        this.updateTracker(bytes);
	                        bp = bytes.readUInt8(0);
	                    }
	                    obj.setByteSpan([startByte, this.offset]);
	                    return obj;
	                }
	                const obj = new CborMap_1.default();
	                for (let i = 0; i < length; i += 1) {
	                    const key = yield* this.parse();
	                    const val = yield* this.parse();
	                    obj.set(key, val);
	                }
	                obj.setByteSpan([startByte, this.offset]);
	                return obj;
	            }
	            case 6: {
	                const tag = new CborTag_1.default(yield* this.parse(), length);
	                tag.setByteSpan([startByte, this.offset]);
	                return tag;
	            }
	            case 7: {
	                switch (length) {
	                    case 20:
	                        return false;
	                    case 21:
	                        return true;
	                    case 22:
	                        return null;
	                    case 23:
	                        return undefined;
	                    default:
	                        return new SimpleValue_1.default(length);
	                }
	            }
	            default: {
	                throw new Error('Invalid CBOR encoding');
	            }
	        }
	    }
	    restart() {
	        this.needed = null;
	        this._parser = this.parse();
	        this.fresh = true;
	        this.offset = 0;
	        this.usedBytes = [];
	    }
	    _flush(cb) {
	        cb(this.fresh ? null : new Error('unexpected end of input'));
	    }
	}
	Decoder$1.default = Decoder;
	return Decoder$1;
}

var DecoderExports = requireDecoder();
const Decoder = /*@__PURE__*/getDefaultExportFromCjs(DecoderExports);

var encode = {};

var dist = {};

var helpers = {};

var hasRequiredHelpers;

function requireHelpers () {
	if (hasRequiredHelpers) return helpers;
	hasRequiredHelpers = 1;
	(function (exports) {
		var __importDefault = (helpers && helpers.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.CborTag = exports.IndefiniteArray = exports.IndefiniteMap = void 0;
		/* eslint-disable max-classes-per-file */
		class IndefiniteMap extends Map {
		}
		exports.IndefiniteMap = IndefiniteMap;
		class IndefiniteArray extends Array {
		}
		exports.IndefiniteArray = IndefiniteArray;
		var CborTag_1 = requireCborTag();
		Object.defineProperty(exports, "CborTag", { enumerable: true, get: function () { return __importDefault(CborTag_1).default; } }); 
	} (helpers));
	return helpers;
}

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	(function (exports) {
		var __createBinding = (dist && dist.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (dist && dist.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		var __importDefault = (dist && dist.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Decoder = exports.Encoder = void 0;
		const encode_1 = __importDefault(requireEncode());
		// to maintain similar API as Decoder
		exports.Encoder = {
		    encode: encode_1.default,
		};
		var Decoder_1 = requireDecoder();
		Object.defineProperty(exports, "Decoder", { enumerable: true, get: function () { return __importDefault(Decoder_1).default; } });
		__exportStar(requireHelpers(), exports); 
	} (dist));
	return dist;
}

var hasRequiredEncode;

function requireEncode () {
	if (hasRequiredEncode) return encode;
	hasRequiredEncode = 1;
	var __importDefault = (encode && encode.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(encode, "__esModule", { value: true });
	/* eslint-disable no-bitwise */
	const buffer_1 = requireDist$1();
	const bignumber_js_1 = __importDefault(requireBignumber());
	const _1 = requireDist();
	const helpers_1 = requireHelpers();
	const utils_1 = requireUtils$1();
	const NAN_BUF = buffer_1.Buffer.from('f97e00', 'hex');
	const BREAK = buffer_1.Buffer.from('ff', 'hex');
	encode.default = (input, options = { collapseBigNumber: true }) => {
	    const outBufAry = [];
	    function pushFloat64(value) {
	        const buf = buffer_1.Buffer.allocUnsafe(8);
	        buf.writeDoubleBE(value);
	        outBufAry.push(buf);
	    }
	    function pushUInt8(value) {
	        const buf = buffer_1.Buffer.allocUnsafe(1);
	        buf.writeUInt8(value, 0);
	        outBufAry.push(buf);
	    }
	    function pushBuffer(value) {
	        outBufAry.push(value);
	    }
	    function pushUInt16(value) {
	        const buf = buffer_1.Buffer.allocUnsafe(2);
	        buf.writeUInt16BE(value, 0);
	        outBufAry.push(buf);
	    }
	    function pushUInt32(value) {
	        const buf = buffer_1.Buffer.allocUnsafe(4);
	        buf.writeUInt32BE(value, 0);
	        outBufAry.push(buf);
	    }
	    function pushUInt64(value) {
	        const low = value % utils_1.POW_2_32;
	        const high = (value - low) / utils_1.POW_2_32;
	        const buf = buffer_1.Buffer.allocUnsafe(8);
	        buf.writeUInt32BE(high, 0);
	        buf.writeUInt32BE(low, 4);
	        outBufAry.push(buf);
	    }
	    function pushTypeAndLength(type, length) {
	        if (length < 24) {
	            pushUInt8((type << 5) | length);
	        }
	        else if (length < 0x100) {
	            pushUInt8((type << 5) | 24);
	            pushUInt8(length);
	        }
	        else if (length < 0x10000) {
	            pushUInt8((type << 5) | 25);
	            pushUInt16(length);
	        }
	        else if (length < 0x100000000) {
	            pushUInt8((type << 5) | 26);
	            pushUInt32(length);
	        }
	        else {
	            pushUInt8((type << 5) | 27);
	            pushUInt64(length);
	        }
	    }
	    function pushIntNum(value) {
	        if (Object.is(value, -0)) {
	            return pushBuffer(buffer_1.Buffer.from('f98000', 'hex'));
	        }
	        if (value >= 0 && value <= utils_1.POW_2_53) {
	            return pushTypeAndLength(0, value);
	        }
	        if (-utils_1.POW_2_53 <= value && value < 0) {
	            return pushTypeAndLength(1, -(value + 1));
	        }
	    }
	    function pushBigInt(value) {
	        let valueM = value;
	        let type = 0;
	        let tag = 2;
	        if (valueM.isNegative()) {
	            valueM = valueM.negated().minus(1);
	            type = 1;
	            tag = 3;
	        }
	        if (options.collapseBigNumber && valueM.lte(utils_1.MAX_BIG_NUM_INT64)) {
	            if (valueM.lte(utils_1.MAX_BIG_NUM_INT32)) {
	                return pushTypeAndLength(type, valueM.toNumber());
	            }
	            pushUInt8((type << 5) | 27);
	            pushUInt32(valueM.dividedToIntegerBy(utils_1.SHIFT32).toNumber());
	            pushUInt32(valueM.mod(utils_1.SHIFT32).toNumber());
	        }
	        else {
	            let str = valueM.toString(16);
	            if (str.length % 2) {
	                str = `0${str}`;
	            }
	            // push tag
	            pushTypeAndLength(6, tag);
	            // push buffer
	            const buf = buffer_1.Buffer.from(str, 'hex');
	            pushTypeAndLength(2, buf.length);
	            pushBuffer(buf);
	        }
	    }
	    function pushBigNumber(value) {
	        if (value.isNaN()) {
	            pushBuffer(NAN_BUF);
	        }
	        else if (value.isInteger()) {
	            pushBigInt(value);
	        }
	        else {
	            // push decimal
	            pushTypeAndLength(6, 4);
	            pushTypeAndLength(4, 2);
	            const dec = value.decimalPlaces();
	            const slide = value.shiftedBy(dec);
	            pushIntNum(-dec);
	            if (slide.abs().isLessThan(utils_1.MAX_BIG_NUM_INT)) {
	                pushIntNum(slide.toNumber());
	            }
	            else {
	                pushBigInt(slide);
	            }
	        }
	    }
	    function encodeItem(value) {
	        if (value === false)
	            return pushUInt8(0xf4);
	        if (value === true)
	            return pushUInt8(0xf5);
	        if (value === null)
	            return pushUInt8(0xf6);
	        if (value === undefined)
	            return pushUInt8(0xf7);
	        switch (typeof value) {
	            case 'number': {
	                if (Math.round(value) === value) {
	                    return pushIntNum(value);
	                }
	                pushUInt8(0xfb);
	                return pushFloat64(value);
	            }
	            case 'string': {
	                const strBuff = buffer_1.Buffer.from(value, 'utf8');
	                pushTypeAndLength(3, strBuff.length);
	                return pushBuffer(strBuff);
	            }
	            default: {
	                if (Array.isArray(value)) {
	                    if (value instanceof helpers_1.IndefiniteArray) {
	                        pushUInt8((4 << 5) | 31);
	                    }
	                    else {
	                        pushTypeAndLength(4, value.length);
	                    }
	                    for (const v of value) {
	                        encodeItem(v);
	                    }
	                    if (value instanceof helpers_1.IndefiniteArray) {
	                        pushBuffer(BREAK);
	                    }
	                }
	                else if (value instanceof buffer_1.Buffer) {
	                    pushTypeAndLength(2, value.length);
	                    pushBuffer(value);
	                }
	                else if (value instanceof ArrayBuffer) {
	                    const buf = buffer_1.Buffer.from(value);
	                    pushTypeAndLength(2, buf.length);
	                    pushBuffer(buf);
	                }
	                else if (value instanceof Uint8ClampedArray) {
	                    const buf = buffer_1.Buffer.from(value);
	                    pushTypeAndLength(2, buf.length);
	                    pushBuffer(buf);
	                }
	                else if (value instanceof Uint8Array) {
	                    const buf = buffer_1.Buffer.from(value);
	                    pushTypeAndLength(2, buf.length);
	                    pushBuffer(buf);
	                }
	                else if (bignumber_js_1.default.isBigNumber(value)) {
	                    pushBigNumber(value);
	                }
	                else if (value instanceof _1.CborTag) {
	                    pushTypeAndLength(6, value.tag);
	                    encodeItem(value.value);
	                }
	                else {
	                    let entries;
	                    if (value instanceof Map) {
	                        entries = [...value.entries()];
	                    }
	                    else {
	                        entries = [...Object.entries(value)];
	                    }
	                    if (value instanceof helpers_1.IndefiniteMap) {
	                        pushUInt8((5 << 5) | 31);
	                    }
	                    else {
	                        pushTypeAndLength(5, entries.length);
	                    }
	                    for (const [key, v] of entries) {
	                        encodeItem(key);
	                        encodeItem(v);
	                    }
	                    if (value instanceof helpers_1.IndefiniteMap) {
	                        pushBuffer(BREAK);
	                    }
	                }
	            }
	        }
	    }
	    encodeItem(input);
	    return buffer_1.Buffer.concat(outBufAry);
	};
	return encode;
}

requireEncode();

const getDecodedCbor = (tx) => {
  try {
    return !tx ? null : Decoder.decode(toHexBuffer(tx));
  } catch (e) {
    console.error("getDecodedCbor", e);
  }
  return null;
};
const getDecodedTxBody = (tx) => tx.value["0"];
const getRequiredSignersFromCbor = (tx) => {
  if (typeof tx === "string") {
    tx = getDecodedCbor(tx);
  }
  const decodedTx = tx;
  const decodedTxBody = getDecodedTxBody(decodedTx);
  const signers = [];
  for (const item of decodedTxBody) {
    const key = item[0];
    let value = item[1];
    if (key === 14) {
      if (!Array.isArray(value)) {
        value = value.value;
      }
      for (const signer of value) {
        signers.push(toHexString(signer));
      }
    }
  }
  return signers.length > 0 ? signers : void 0;
};
const hasConwaySetTag = (tx) => {
  if (typeof tx === "string") {
    tx = getDecodedCbor(tx);
  }
  const decodedTx = tx;
  const decodedTxBody = getDecodedTxBody(decodedTx);
  for (const item of decodedTxBody) {
    const key = item[0];
    let value = item[1];
    if (key === 0) {
      return !Array.isArray(value);
    }
  }
  return false;
};

const getTransactionFromCbor = (networkId, txCbor, txIndex, free) => {
  const fixedTx = FixedTransaction.from_hex(txCbor);
  free.push(fixedTx);
  const decodedTxBody = fixedTx.raw_body();
  const decodedTxAuxData = fixedTx.raw_auxiliary_data();
  const decodedTxWitnessSet = fixedTx.raw_witness_set();
  const cslTxHash = TransactionHash.from_bytes(blake2b256(Buffer$1.from(decodedTxBody)));
  free.push(cslTxHash);
  const txHash = toHexString(cslTxHash.to_bytes());
  let cslTx;
  let cslTxBody;
  let cslAuxData;
  let cslWitnessSet;
  try {
    cslTxBody = TransactionBody.from_bytes(decodedTxBody);
  } catch (e1) {
    console.error(ErrorTxCbor.unableToDeserializeBody + ": " + JSON.stringify(e1));
    throw ErrorTxCbor.unableToDeserializeBody;
  }
  if (decodedTxAuxData) {
    try {
      cslAuxData = AuxiliaryData.from_bytes(decodedTxAuxData);
    } catch (e2) {
      cslAuxData = void 0;
    }
  }
  if (decodedTxWitnessSet) {
    try {
      cslWitnessSet = TransactionWitnessSet.from_bytes(decodedTxWitnessSet);
    } catch (e3) {
      cslWitnessSet = TransactionWitnessSet.new();
    }
  } else {
    cslWitnessSet = TransactionWitnessSet.new();
  }
  try {
    cslTx = Transaction.new(cslTxBody, cslWitnessSet, cslAuxData);
    cslTx.set_is_valid(fixedTx.is_valid());
  } catch (e4) {
    console.error(ErrorTxCbor.unableToCreateTx + ": " + JSON.stringify(e4));
    throw ErrorTxCbor.unableToCreateTx;
  }
  cslAuxData = cslTx.auxiliary_data();
  free.push(cslTxBody);
  free.push(cslAuxData);
  free.push(cslWitnessSet);
  free.push(cslTx);
  let bodyAuxDataHash = "";
  let auxDataHash = "";
  let warning = "";
  if (cslTxBody) {
    const cslBodyAuxDataHash = cslTxBody.auxiliary_data_hash();
    bodyAuxDataHash = cslBodyAuxDataHash?.to_hex() ?? "";
    safeFreeCSLObject(cslBodyAuxDataHash);
  }
  if (decodedTxAuxData) {
    const cslAuxDataHash = AuxiliaryDataHash.from_bytes(blake2b256(Buffer$1.from(decodedTxAuxData)));
    auxDataHash = cslAuxDataHash?.to_hex() ?? "";
    safeFreeCSLObject(cslAuxDataHash);
  }
  if (bodyAuxDataHash.length > 0 && auxDataHash.length === 0) {
    warning = ErrorTxCbor.auxDataMissing;
  } else if (bodyAuxDataHash.length > 0 && auxDataHash !== bodyAuxDataHash) {
    warning = ErrorTxCbor.auxDataMismatch;
  }
  const colOutputDataList = [];
  const outputDataList = [];
  const cslColOutput = cslTxBody.collateral_return();
  if (cslColOutput) {
    colOutputDataList[0] = { isBabbage: cslColOutput.serialization_format() === CborContainerType.Map };
    free.push(cslColOutput);
  }
  const cslOutputList = cslTxBody.outputs();
  const cslOutputCount = cslOutputList.len();
  for (let i = 0; i < cslOutputCount; i++) {
    const cslOutput = cslOutputList.get(i);
    const isBabbage = cslOutput.serialization_format() === CborContainerType.Map;
    outputDataList[i] = { isBabbage };
    if (isBabbage) {
      const cslPlutusData = cslOutput.plutus_data();
      const cslPlutusScript = cslOutput.script_ref();
      if (cslPlutusData) {
        outputDataList[i].plutusDataBytes = cslPlutusData.to_bytes();
      }
      if (cslPlutusScript) {
        const script = getDecodedCbor(toHexString(cslPlutusScript.to_bytes()));
        outputDataList[i].plutusScriptBytes = script?.value?.value ?? cslPlutusScript.to_bytes();
      }
      free.push(cslPlutusData);
      free.push(cslPlutusScript);
    }
    free.push(cslOutput);
  }
  free.push(cslOutputList);
  const requiredSigners = getRequiredSignersFromCbor(txCbor);
  const hasSetTag = hasConwaySetTag(txCbor);
  const builtTx = getTransactionJSONFromCSL(networkId, cslTx, requiredSigners);
  builtTx.cbor = txCbor;
  builtTx.hash = txHash;
  builtTx.size = fixedTx.to_bytes().byteLength;
  builtTx.time = now();
  builtTx.inputUtxoList = [];
  builtTx.colOutputDataList = colOutputDataList;
  builtTx.outputData = outputDataList;
  builtTx.hasConwaySetTag = hasSetTag;
  return {
    txIndex,
    txCbor,
    txHash,
    cslTx,
    cslTxBody,
    cslTxHash,
    cslAuxData,
    cslWitnessSet,
    bodyAuxDataHash,
    auxDataHash,
    builtTx,
    txCredList: null,
    error: null,
    warning
  };
};

const ErrorBuildTx = {
  notEnoughUtxos: "ErrorBuildTx.notEnoughUtxos",
  notEnoughAda: "ErrorBuildTx.notEnoughAda",
  couldNotCoverAmount: "ErrorBuildTx.couldNotCoverAmount",
  tokenNotFound: "ErrorBuildTx.tokenNotFound",
  notEnoughTokens: "ErrorBuildTx.notEnoughTokens",
  maxBudgetReached: "ErrorBuildTx.maxBudgetReached"};

const Plate_V2_Prefix = "v2|";
const createIUIPlate = (ref) => {
  return {
    image: ref?.image ?? null,
    data: ref?.data ?? null,
    checksum: ref?.checksum ?? null
  };
};

const onTxSignReset = "onTxSignReset";
const onTxSubmitted = "onTxSubmitted";
const doLoadTxAssetMetadata = "doLoadTxAssetMetadata";

const getDeposit = (tx, chosenCredSet, invert = false) => {
  let deposit = "0";
  const inputUtxoList = tx.inputUtxoList;
  if (inputUtxoList && inputUtxoList.length > 0) {
    const balance = { coin: "0" };
    for (const input of tx.body.inputs) {
      const utxo = inputUtxoList.find((utxo2) => getUtxoHash(utxo2.input) === getUtxoHash(input));
      if (utxo) {
        addValueToValue(balance, utxo.output.amount, false);
      }
    }
    for (const output of tx.body.outputs) {
      addValueToValue(balance, output.amount, true);
    }
    addValueToValue(balance, { coin: tx.body.fee }, true);
    if (tx.body.withdrawals) {
      for (const stakeKey in tx.body.withdrawals) {
        const amount = tx.body.withdrawals[stakeKey];
        addValueToValue(balance, { coin: amount }, false);
      }
    }
    deposit = balance.coin;
  }
  getDepositByCerts(tx, 2, 500, chosenCredSet, invert);
  if (invert && deposit !== "0") {
    return neg(deposit);
  }
  return deposit;
};
const getDepositByCerts = (tx, stakeAddressDeposit, stakePoolDeposit, chosenCredSet, invert = false) => {
  const certs = tx.body.certs;
  let deposit = "0";
  if (certs) {
    for (const cert of certs) {
      if (cert.hasOwnProperty("StakeRegistration") || cert.hasOwnProperty("StakeRegistrationAndDelegation") || cert.hasOwnProperty("StakeVoteRegistrationAndDelegation") || cert.hasOwnProperty("VoteRegistrationAndDelegation")) {
        if (chosenCredSet) {
          let regCert;
          if (cert.hasOwnProperty("StakeRegistration")) {
            regCert = cert.StakeRegistration;
          } else if (cert.hasOwnProperty("StakeRegistrationAndDelegation")) {
            regCert = cert.StakeRegistrationAndDelegation;
          } else if (cert.hasOwnProperty("StakeVoteRegistrationAndDelegation")) {
            regCert = cert.StakeVoteRegistrationAndDelegation;
          } else {
            regCert = cert.VoteRegistrationAndDelegation;
          }
          const cred = Object.values(regCert.stake_credential)[0];
          chosenCredSet.add(cred);
        }
        deposit = add(deposit, stakeAddressDeposit);
      } else if (cert.hasOwnProperty("StakeDeregistration")) {
        if (chosenCredSet) {
          const cred = Object.values(cert.StakeDeregistration.stake_credential)[0];
          chosenCredSet.add(cred);
        }
        deposit = subtract(deposit, stakeAddressDeposit);
      } else if (cert.hasOwnProperty("PoolRegistration")) {
        if (chosenCredSet) {
          const poolParams = cert.PoolRegistration.pool_params;
          chosenCredSet.add(poolParams.operator);
          for (const owner of poolParams.pool_owners) {
            chosenCredSet.add(owner);
          }
        }
        deposit = add(deposit, stakePoolDeposit);
      } else if (cert.hasOwnProperty("PoolRetirement")) {
        if (chosenCredSet) {
          const cred = cert.PoolRetirement.pool_keyhash;
          chosenCredSet.add(cred);
        }
      } else if (cert.hasOwnProperty("StakeDelegation") || cert.hasOwnProperty("StakeAndVoteDelegation") || cert.hasOwnProperty("VoteDelegation")) {
        if (chosenCredSet) {
          let delCert;
          if (cert.hasOwnProperty("StakeDelegation")) {
            delCert = cert.StakeDelegation;
          } else if (cert.hasOwnProperty("StakeAndVoteDelegation")) {
            delCert = cert.StakeAndVoteDelegation;
          } else {
            delCert = cert.VoteDelegation;
          }
          const cred = Object.values(delCert.stake_credential)[0];
          chosenCredSet.add(cred);
        }
      } else if (cert.hasOwnProperty("DRepRegistration")) {
        const drepReg = cert.DRepRegistration;
        if (chosenCredSet) {
          const cred = Object.values(drepReg.voting_credential)[0];
          chosenCredSet.add(cred);
        }
        deposit = add(deposit, drepReg.coin);
      } else if (cert.hasOwnProperty("DRepDeregistration")) {
        const drepDeReg = cert.DRepDeregistration;
        if (chosenCredSet) {
          const cred = Object.values(drepDeReg.voting_credential)[0];
          chosenCredSet.add(cred);
        }
        deposit = subtract(deposit, drepDeReg.coin);
      } else if (cert.hasOwnProperty("DRepUpdate")) {
        if (chosenCredSet) {
          const cred = Object.values(cert.DRepUpdate.voting_credential)[0];
          chosenCredSet.add(cred);
        }
      } else if (cert.hasOwnProperty("CommitteeHotAuth") || cert.hasOwnProperty("CommitteeColdResign")) {
        if (chosenCredSet) {
          let committeeCert;
          if (cert.hasOwnProperty("CommitteeHotAuth")) {
            committeeCert = cert.CommitteeHotAuth;
          } else {
            committeeCert = cert.CommitteeColdResign;
          }
          const cred = Object.values(committeeCert.committee_cold_credential)[0];
          chosenCredSet.add(cred);
        }
      } else if (cert.hasOwnProperty("GenesisKeyDelegation")) ; else if (cert.hasOwnProperty("MoveInstantaneousRewardsCert")) ; else {
        throw new Error("Unknown certificate: " + JSON.stringify(cert));
      }
    }
  }
  if (invert && deposit !== "0") {
    return neg(deposit);
  }
  return deposit;
};

const activeSlotsCoeff$8 = 0.05;
const protocolParams$8 = {"protocolVersion":{"minor":0,"major":2},"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"maxTxSize":16384,"maxBlockBodySize":65536,"maxBlockHeaderSize":1100,"minFeeA":44,"minFeeB":155381,"minUTxOValue":1000000,"poolDeposit":500000000,"minPoolCost":340000000,"keyDeposit":2000000,"nOpt":150,"rho":0.003,"tau":0.2,"a0":0.3};
const updateQuorum$8 = 5;
const networkId$8 = "Mainnet";
const initialFunds$1 = {};
const maxLovelaceSupply$8 = 45000000000000000;
const networkMagic$8 = 764824073;
const epochLength$8 = 432000;
const systemStart$8 = "2017-09-23T21:44:51Z";
const slotsPerKESPeriod$8 = 129600;
const slotLength$8 = 1;
const maxKESEvolutions$8 = 62;
const securityParam$8 = 2160;
const mainnetShelley = {
  activeSlotsCoeff: activeSlotsCoeff$8,
  protocolParams: protocolParams$8,
  updateQuorum: updateQuorum$8,
  networkId: networkId$8,
  initialFunds: initialFunds$1,
  maxLovelaceSupply: maxLovelaceSupply$8,
  networkMagic: networkMagic$8,
  epochLength: epochLength$8,
  systemStart: systemStart$8,
  slotsPerKESPeriod: slotsPerKESPeriod$8,
  slotLength: slotLength$8,
  maxKESEvolutions: maxKESEvolutions$8,
  securityParam: securityParam$8,
};

const maxLovelaceSupply$7 = 45000000000000000;
const securityParam$7 = 36;
const slotsPerKESPeriod$7 = 129600;
const updateQuorum$7 = 1;
const activeSlotsCoeff$7 = 0.05;
const protocolParams$7 = {"minUTxOValue":1000000,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"minFeeB":1000,"tau":0.1,"maxBlockBodySize":65536,"minPoolCost":340000000,"minFeeA":1,"maxTxSize":16384,"nOpt":10,"maxBlockHeaderSize":1100,"keyDeposit":2000000,"protocolVersion":{"minor":0,"major":2},"poolDeposit":500000000,"a0":0.3,"rho":0.0003,"decentralisationParam":0.8};
const networkMagic$7 = 141;
const maxKESEvolutions$7 = 62;
const networkId$7 = "Testnet";
const slotLength$7 = 1;
const systemStart$7 = "2021-12-09T22:55:22Z";
const epochLength$7 = 3600;
const guildShelley = {
  maxLovelaceSupply: maxLovelaceSupply$7,
  securityParam: securityParam$7,
  slotsPerKESPeriod: slotsPerKESPeriod$7,
  updateQuorum: updateQuorum$7,
  activeSlotsCoeff: activeSlotsCoeff$7,
  protocolParams: protocolParams$7,
  networkMagic: networkMagic$7,
  maxKESEvolutions: maxKESEvolutions$7,
  networkId: networkId$7,
  slotLength: slotLength$7,
  systemStart: systemStart$7,
  epochLength: epochLength$7,
};

const maxLovelaceSupply$6 = 45000000000000000;
const securityParam$6 = 432;
const slotsPerKESPeriod$6 = 129600;
const updateQuorum$6 = 3;
const activeSlotsCoeff$6 = 0.05;
const protocolParams$6 = {"a0":0.3,"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"keyDeposit":2000000,"maxBlockBodySize":65536,"maxBlockHeaderSize":1100,"maxTxSize":16384,"minFeeA":44,"minFeeB":155381,"minPoolCost":340000000,"minUTxOValue":1000000,"nOpt":150,"poolDeposit":500000000,"protocolVersion":{"major":6,"minor":0},"rho":0.003,"tau":0.2};
const networkMagic$6 = 4;
const initialFunds = {};
const maxKESEvolutions$6 = 62;
const networkId$6 = "Testnet";
const slotLength$6 = 1;
const systemStart$6 = "2023-06-15T00:30:00Z";
const epochLength$6 = 86400;
const sanchoShelley = {
  maxLovelaceSupply: maxLovelaceSupply$6,
  securityParam: securityParam$6,
  slotsPerKESPeriod: slotsPerKESPeriod$6,
  updateQuorum: updateQuorum$6,
  activeSlotsCoeff: activeSlotsCoeff$6,
  protocolParams: protocolParams$6,
  networkMagic: networkMagic$6,
  initialFunds,
  maxKESEvolutions: maxKESEvolutions$6,
  networkId: networkId$6,
  slotLength: slotLength$6,
  systemStart: systemStart$6,
  epochLength: epochLength$6,
};

const activeSlotsCoeff$5 = 0.05;
const epochLength$5 = 432000;
const maxKESEvolutions$5 = 62;
const maxLovelaceSupply$5 = 45000000000000000;
const networkId$5 = "Testnet";
const networkMagic$5 = 1;
const protocolParams$5 = {"protocolVersion":{"minor":0,"major":2},"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"maxTxSize":16384,"maxBlockBodySize":65536,"maxBlockHeaderSize":1100,"minFeeA":44,"minFeeB":155381,"minUTxOValue":1000000,"poolDeposit":500000000,"minPoolCost":340000000,"keyDeposit":2000000,"nOpt":150,"rho":0.003,"tau":0.2,"a0":0.3};
const securityParam$5 = 2160;
const slotLength$5 = 1;
const slotsPerKESPeriod$5 = 129600;
const systemStart$5 = "2022-06-01T00:00:00Z";
const updateQuorum$5 = 5;
const preprodShelley = {
  activeSlotsCoeff: activeSlotsCoeff$5,
  epochLength: epochLength$5,
  maxKESEvolutions: maxKESEvolutions$5,
  maxLovelaceSupply: maxLovelaceSupply$5,
  networkId: networkId$5,
  networkMagic: networkMagic$5,
  protocolParams: protocolParams$5,
  securityParam: securityParam$5,
  slotLength: slotLength$5,
  slotsPerKESPeriod: slotsPerKESPeriod$5,
  systemStart: systemStart$5,
  updateQuorum: updateQuorum$5,
};

const activeSlotsCoeff$4 = 0.05;
const epochLength$4 = 86400;
const maxKESEvolutions$4 = 62;
const maxLovelaceSupply$4 = 45000000000000000;
const networkId$4 = "Testnet";
const networkMagic$4 = 2;
const protocolParams$4 = {"protocolVersion":{"minor":0,"major":6},"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"maxTxSize":16384,"maxBlockBodySize":65536,"maxBlockHeaderSize":1100,"minFeeA":44,"minFeeB":155381,"minUTxOValue":1000000,"poolDeposit":500000000,"minPoolCost":340000000,"keyDeposit":2000000,"nOpt":150,"rho":0.003,"tau":0.2,"a0":0.3};
const securityParam$4 = 432;
const slotLength$4 = 1;
const slotsPerKESPeriod$4 = 129600;
const systemStart$4 = "2022-10-25T00:00:00Z";
const updateQuorum$4 = 5;
const previewShelley = {
  activeSlotsCoeff: activeSlotsCoeff$4,
  epochLength: epochLength$4,
  maxKESEvolutions: maxKESEvolutions$4,
  maxLovelaceSupply: maxLovelaceSupply$4,
  networkId: networkId$4,
  networkMagic: networkMagic$4,
  protocolParams: protocolParams$4,
  securityParam: securityParam$4,
  slotLength: slotLength$4,
  slotsPerKESPeriod: slotsPerKESPeriod$4,
  systemStart: systemStart$4,
  updateQuorum: updateQuorum$4,
};

const activeSlotsCoeff$3 = 0.25;
const epochLength$3 = 86400;
const maxKESEvolutions$3 = 62;
const maxLovelaceSupply$3 = 3000000000000000;
const networkId$3 = "Mainnet";
const networkMagic$3 = 764824073;
const protocolParams$3 = {"a0":0,"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"keyDeposit":0,"maxBlockBodySize":180224,"maxBlockHeaderSize":1100,"maxTxSize":16384,"minFeeA":45,"minFeeB":156253,"minPoolCost":0,"minUTxOValue":1000000,"nOpt":100,"poolDeposit":0,"protocolVersion":{"major":2,"minor":0},"rho":0.00001,"tau":0.000001};
const securityParam$3 = 2160;
const slotLength$3 = 1;
const slotsPerKESPeriod$3 = 129600;
const systemStart$3 = "2025-07-09T10:38:04.000000000Z";
const updateQuorum$3 = 3;
const afvtShelley = {
  activeSlotsCoeff: activeSlotsCoeff$3,
  epochLength: epochLength$3,
  maxKESEvolutions: maxKESEvolutions$3,
  maxLovelaceSupply: maxLovelaceSupply$3,
  networkId: networkId$3,
  networkMagic: networkMagic$3,
  protocolParams: protocolParams$3,
  securityParam: securityParam$3,
  slotLength: slotLength$3,
  slotsPerKESPeriod: slotsPerKESPeriod$3,
  systemStart: systemStart$3,
  updateQuorum: updateQuorum$3,
};

const activeSlotsCoeff$2 = 0.25;
const epochLength$2 = 86400;
const maxKESEvolutions$2 = 62;
const maxLovelaceSupply$2 = 3000000000000000;
const networkId$2 = "Mainnet";
const networkMagic$2 = 764824073;
const protocolParams$2 = {"a0":0,"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"keyDeposit":0,"maxBlockBodySize":180224,"maxBlockHeaderSize":1100,"maxTxSize":16384,"minFeeA":45,"minFeeB":156253,"minPoolCost":0,"minUTxOValue":1000000,"nOpt":100,"poolDeposit":0,"protocolVersion":{"major":2,"minor":0},"rho":0.00001,"tau":0.000001};
const securityParam$2 = 2160;
const slotLength$2 = 1;
const slotsPerKESPeriod$2 = 129600;
const systemStart$2 = "2025-08-29T16:40:00.000000000Z";
const updateQuorum$2 = 3;
const afvmShelley = {
  activeSlotsCoeff: activeSlotsCoeff$2,
  epochLength: epochLength$2,
  maxKESEvolutions: maxKESEvolutions$2,
  maxLovelaceSupply: maxLovelaceSupply$2,
  networkId: networkId$2,
  networkMagic: networkMagic$2,
  protocolParams: protocolParams$2,
  securityParam: securityParam$2,
  slotLength: slotLength$2,
  slotsPerKESPeriod: slotsPerKESPeriod$2,
  systemStart: systemStart$2,
  updateQuorum: updateQuorum$2,
};

const systemStart$1 = "2024-05-16T17:18:10.000000000Z";
const networkMagic$1 = 3311;
const networkId$1 = "Testnet";
const activeSlotsCoeff$1 = 0.05;
const securityParam$1 = 2160;
const epochLength$1 = 432000;
const slotsPerKESPeriod$1 = 129600;
const maxKESEvolutions$1 = 62;
const slotLength$1 = 1;
const updateQuorum$1 = 2;
const maxLovelaceSupply$1 = 3000000000000000;
const protocolParams$1 = {"minFeeA":47,"minFeeB":158298,"maxBlockBodySize":65536,"maxTxSize":16384,"maxBlockHeaderSize":1100,"keyDeposit":0,"poolDeposit":0,"eMax":18,"nOpt":100,"a0":0,"rho":0.0038,"tau":0.000001,"minPoolCost":0,"decentralisationParam":0.7,"extraEntropy":{"tag":"NeutralNonce"},"protocolVersion":{"major":7,"minor":0},"minUTxOValue":1000000};
const afptShelley = {
  systemStart: systemStart$1,
  networkMagic: networkMagic$1,
  networkId: networkId$1,
  activeSlotsCoeff: activeSlotsCoeff$1,
  securityParam: securityParam$1,
  epochLength: epochLength$1,
  slotsPerKESPeriod: slotsPerKESPeriod$1,
  maxKESEvolutions: maxKESEvolutions$1,
  slotLength: slotLength$1,
  updateQuorum: updateQuorum$1,
  maxLovelaceSupply: maxLovelaceSupply$1,
  protocolParams: protocolParams$1,
};

const systemStart = "2024-05-13T17:40:00.000000000Z";
const networkMagic = 764824073;
const networkId = "Mainnet";
const activeSlotsCoeff = 0.05;
const securityParam = 2160;
const epochLength = 432000;
const slotsPerKESPeriod = 129600;
const maxKESEvolutions = 60;
const slotLength = 1;
const updateQuorum = 5;
const maxLovelaceSupply = 3000000000000000;
const protocolParams = {"minFeeA":47,"minFeeB":158298,"maxBlockBodySize":65536,"maxTxSize":16384,"maxBlockHeaderSize":1100,"keyDeposit":0,"poolDeposit":0,"eMax":18,"nOpt":100,"a0":0,"rho":0.00001,"tau":0.000001,"minPoolCost":0,"decentralisationParam":0.7,"extraEntropy":{"tag":"NeutralNonce"},"protocolVersion":{"major":2,"minor":0},"minUTxOValue":1000000};
const afpmShelley = {
  systemStart,
  networkMagic,
  networkId,
  activeSlotsCoeff,
  securityParam,
  epochLength,
  slotsPerKESPeriod,
  maxKESEvolutions,
  slotLength,
  updateQuorum,
  maxLovelaceSupply,
  protocolParams,
};

const blockVersionData$8 = {"heavyDelThd":"300000000000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxProposalSize":"700","maxTxSize":"4096","mpcThd":"20000000000000","scriptVersion":0,"slotDuration":"20000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"multiplier":"43946000000","summand":"155381000000000"},"unlockStakeEpoch":"18446744073709551615","updateImplicit":"10000","updateProposalThd":"100000000000000","updateVoteThd":"1000000000000"};
const ftsSeed = "76617361206f7061736120736b6f766f726f64612047677572646120626f726f64612070726f766f6461";
const protocolConsts$8 = {"k":2160,"protocolMagic":764824073,"vssMaxTTL":6,"vssMinTTL":2};
const startTime$8 = 1506203091;
const mainnetByron = {
  blockVersionData: blockVersionData$8,
  ftsSeed,
  protocolConsts: protocolConsts$8,
  startTime: startTime$8,
};

const startTime$7 = 1639090522;
const blockVersionData$7 = {"scriptVersion":0,"slotDuration":"100","maxBlockSize":"641000","maxHeaderSize":"200000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"200000","heavyDelThd":"300000","updateVoteThd":"100000","updateProposalThd":"100000","updateImplicit":"10000","softforkRule":{"initThd":"900000","minThd":"600000","thdDecrement":"100000"},"txFeePolicy":{"summand":"0","multiplier":"439460"},"unlockStakeEpoch":"184467"};
const protocolConsts$7 = {"k":36,"protocolMagic":141};
const avvmDistr = {};
const guildByron = {
  startTime: startTime$7,
  blockVersionData: blockVersionData$7,
  protocolConsts: protocolConsts$7,
  avvmDistr,
};

const startTime$6 = 1686789000;
const blockVersionData$6 = {"avvmDistr":{},"heavyDelThd":"300000000000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxProposalSize":"700","maxTxSize":"4096","mpcThd":"20000000000000","scriptVersion":0,"slotDuration":"20000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"multiplier":"43946000000","summand":"155381000000000"},"unlockStakeEpoch":"18446744073709551615","updateImplicit":"10000","updateProposalThd":"100000000000000","updateVoteThd":"1000000000000"};
const protocolConsts$6 = {"k":432,"protocolMagic":4};
const sanchoByron = {
  startTime: startTime$6,
  blockVersionData: blockVersionData$6,
  protocolConsts: protocolConsts$6,
};

const startTime$5 = 1654041600;
const blockVersionData$5 = {"scriptVersion":0,"slotDuration":"20000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
const protocolConsts$5 = {"k":2160,"protocolMagic":1};
const preprodByron = {
  startTime: startTime$5,
  blockVersionData: blockVersionData$5,
  protocolConsts: protocolConsts$5,
};

const startTime$4 = 1666656000;
const blockVersionData$4 = {"scriptVersion":0,"slotDuration":"20000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
const protocolConsts$4 = {"k":432,"protocolMagic":2};
const previewByron = {
  startTime: startTime$4,
  blockVersionData: blockVersionData$4,
  protocolConsts: protocolConsts$4,
};

const startTime$3 = 1752057484;
const blockVersionData$3 = {"scriptVersion":0,"slotDuration":"1000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
const protocolConsts$3 = {"k":2160,"protocolMagic":764824073};
const afvtByron = {
  startTime: startTime$3,
  blockVersionData: blockVersionData$3,
  protocolConsts: protocolConsts$3,
};

const startTime$2 = 1756485600;
const blockVersionData$2 = {"scriptVersion":0,"slotDuration":"1000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
const protocolConsts$2 = {"k":2160,"protocolMagic":764824073};
const afvmByron = {
  startTime: startTime$2,
  blockVersionData: blockVersionData$2,
  protocolConsts: protocolConsts$2,
};

const startTime$1 = 1715879890;
const blockVersionData$1 = {"scriptVersion":0,"slotDuration":"20000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
const protocolConsts$1 = {"k":2160,"protocolMagic":3311};
const afptByron = {
  startTime: startTime$1,
  blockVersionData: blockVersionData$1,
  protocolConsts: protocolConsts$1,
};

const startTime = 1715622000;
const blockVersionData = {"scriptVersion":0,"slotDuration":"20000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
const protocolConsts = {"k":2160,"protocolMagic":764824073};
const afpmByron = {
  startTime,
  blockVersionData,
  protocolConsts,
};

const GenesisStore = {
  mainnet: {
    shelley: mainnetShelley,
    byron: mainnetByron
  },
  guild: {
    shelley: guildShelley,
    byron: guildByron
  },
  sancho: {
    shelley: sanchoShelley,
    byron: sanchoByron
  },
  preprod: {
    shelley: preprodShelley,
    byron: preprodByron
  },
  preview: {
    shelley: previewShelley,
    byron: previewByron
  },
  afvt: {
    shelley: afvtShelley,
    byron: afvtByron
  },
  afvm: {
    shelley: afvmShelley,
    byron: afvmByron
  },
  afpt: {
    shelley: afptShelley,
    byron: afptByron
  },
  afpm: {
    shelley: afpmShelley,
    byron: afpmByron
  }
};

const getByron = (networkId) => GenesisStore[networkId].byron;
const getShelley = (networkId) => GenesisStore[networkId].shelley;
const getNetworkMagic = (networkId) => GenesisStore[networkId].shelley.networkMagic;
const getEpochLength = (networkId) => GenesisStore[networkId].shelley.epochLength;
const getShelleyTransitionEpoch = (networkId) => {
  switch (networkId) {
    case "mainnet":
      return 208;
    case "preprod":
      return 4;
    case "preview":
      return 0;
    case "guild":
      return 2;
    case "sancho":
      return 0;
    case "afvt":
      return 2;
    case "afvm":
      return 2;
    case "afpt":
      return 0;
    case "afpm":
      return 2;
    default:
      return 0;
  }
};
const getCommonData = (networkId) => {
  const byron = getByron(networkId);
  const currentTimeSec = Math.floor(now() / 1e3);
  const shelleyTransEpoch = getShelleyTransitionEpoch(networkId);
  const byronEpochLength = byron.protocolConsts.k * 10;
  const byronSlots = shelleyTransEpoch * byronEpochLength;
  const byronSlotLength = byron.blockVersionData.slotDuration;
  const byronEndTime = byron.startTime + Math.floor(shelleyTransEpoch * byronEpochLength * parseInt(byronSlotLength) / 1e3);
  return {
    currentTimeSec,
    shelleyTransEpoch,
    byronEpochLength,
    byronSlots,
    byronSlotLength,
    byronEndTime
  };
};
const getCalculatedChainTip = (networkId) => {
  const byron = getByron(networkId);
  const shelley = getShelley(networkId);
  const common = getCommonData(networkId);
  if (common.currentTimeSec < common.byronEndTime) {
    return Math.floor(
      (common.currentTimeSec - byron.startTime) * 1e3
    ) / parseInt(byron.blockVersionData.slotDuration);
  }
  return common.byronSlots + Math.floor(
    (common.currentTimeSec - common.byronEndTime) / shelley.slotLength
  );
};
const getCalculatedEpochSlot = (networkId) => {
  const shelley = getShelley(networkId);
  const common = getCommonData(networkId);
  const tip = getCalculatedChainTip(networkId) - common.byronSlots - (getCalculatedEpoch(networkId) - common.shelleyTransEpoch) * shelley.epochLength;
  return Math.floor(tip);
};
const getCalculatedEpoch = (id) => {
  const byron = getByron(id);
  const shelley = getShelley(id);
  const common = getCommonData(id);
  if (common.currentTimeSec < common.byronEndTime) {
    return Math.floor(
      (common.currentTimeSec - byron.startTime) * 1e3 / parseInt(byron.blockVersionData.slotDuration) / common.byronEpochLength
    );
  }
  return common.shelleyTransEpoch + Math.floor(
    (common.currentTimeSec - common.byronEndTime) / shelley.slotLength / shelley.epochLength
  );
};
const updateChainTip = (id, chainTip, data) => {
  const shelley = getShelley(id);
  const calcTip = getCalculatedChainTip(id);
  chainTip.blockNo = data.blockNo;
  chainTip.slotNo = data.slotNo;
  chainTip.epochNo = data.epochNo;
  chainTip.epochSlot = data.epochSlot;
  chainTip.epochSlots = shelley.epochLength;
  chainTip.epochPercent = parseFloat((chainTip.epochSlot / chainTip.epochSlots * 100).toFixed(2));
  chainTip.syncProgress = Math.round(chainTip.slotNo / calcTip * 1e4) / 100;
  chainTip.onTip = calcTip - chainTip.slotNo < 300;
  return chainTip;
};

const TX_INPUT_SIZE = 36;
const TX_WITNESS_SIZE = 96;
const selectInputs = (adaOnlyUtxoList, multiAssetUtxoList, chosenInputList, chosenCredSet, balance, maxInputBudget = 999999, adaOnly = false) => {
  if (adaOnlyUtxoList.length === 0 && multiAssetUtxoList.length === 0) {
    if (chosenInputList.length > 0 && balance.toCover.total === "0") {
      return true;
    }
    throw ErrorBuildTx.notEnoughUtxos;
  }
  isWithinBudget(chosenInputList.length, chosenCredSet.size, maxInputBudget);
  if (balance.toCover.multiasset && !adaOnly) {
    const multiAssetList = Object.entries(balance.toCover.multiasset);
    for (const multiAsset of multiAssetList) {
      const policyId = multiAsset[0];
      const assetList = Object.entries(multiAsset[1]);
      for (const asset of assetList) {
        const assetName = asset[0];
        const wantedQuantity = asset[1];
        const _filteredList = [];
        let numChosen = balance.chosenInputs.multiasset?.[policyId]?.[assetName] ?? "0";
        if (compare(numChosen, ">=", wantedQuantity)) {
          continue;
        }
        let numAvailable = numChosen;
        for (let i = multiAssetUtxoList.length - 1; i >= 0; i--) {
          const utxo = multiAssetUtxoList[i];
          const assetQuantity = utxo.output.amount.multiasset?.[policyId]?.[assetName];
          if (assetQuantity) {
            _filteredList.push(utxo);
            numAvailable = add(numAvailable, assetQuantity);
          }
        }
        if (compare(numAvailable, "<", wantedQuantity)) {
          if (_filteredList.length === 0) {
            throw ErrorBuildTx.tokenNotFound;
          }
          throw ErrorBuildTx.notEnoughTokens;
        }
        if (_filteredList.length === 0) {
          continue;
        }
        _filteredList.sort((a, b) => {
          const qa = a.output.amount.multiasset[policyId][assetName];
          const qb = b.output.amount.multiasset[policyId][assetName];
          return compare(qa, ">", qb) ? -1 : 1;
        });
        for (const utxo of _filteredList) {
          const assetQuantity = utxo.output.amount.multiasset[policyId][assetName];
          if (assetQuantity) {
            const addedInput2 = selectUtxo(chosenInputList, chosenCredSet, balance, multiAssetUtxoList, utxo, maxInputBudget);
            if (!addedInput2) {
              throw ErrorBuildTx.maxBudgetReached;
            }
            numChosen = add(numChosen, assetQuantity);
          }
          if (compare(numChosen, ">=", wantedQuantity)) {
            break;
          }
        }
      }
    }
  }
  let addedInput = selectForRemainingAda(chosenInputList, chosenCredSet, balance, adaOnlyUtxoList, maxInputBudget, 1);
  const notInBudget = !addedInput;
  if (!addedInput || (isZero(balance.chosenInputs.total) || compare(balance.chosenInputs.total, "<", balance.toCover.total))) {
    addedInput = selectForRemainingAda(chosenInputList, chosenCredSet, balance, multiAssetUtxoList, maxInputBudget, 1);
  }
  if (chosenInputList.length === 0) {
    throw ErrorBuildTx.notEnoughUtxos;
  }
  if (!addedInput || notInBudget) {
    throw ErrorBuildTx.maxBudgetReached;
  }
  if (isZero(balance.chosenInputs.total) || compare(balance.chosenInputs.total, "<", balance.toCover.total)) {
    throw ErrorBuildTx.notEnoughAda;
  }
  return addedInput;
};
const selectUtxo = (chosenInputList, chosenCredSet, balance, utxoList, utxo, maxInputBudget) => {
  const numCreds = chosenCredSet.size + (chosenCredSet.has(utxo.pc) ? 0 : 1);
  const numInputs = chosenInputList.length + 1;
  const fitsBudget = isWithinBudget(numInputs, numCreds, maxInputBudget);
  if (!fitsBudget) {
    return false;
  }
  filterUtxoFromList(utxoList, utxo);
  chosenInputList.push(utxo);
  chosenCredSet.add(utxo.pc);
  addOutputToBalance(balance.chosenInputs, utxo.output);
  return true;
};
const selectAllUtxos = (chosenInputList, chosenCredSet, balance, preselectedInputList, maxInputBudget) => {
  for (const utxo of preselectedInputList) {
    if (chosenInputList.some((input) => input.input.transaction_id === utxo.input.transaction_id && input.input.index === utxo.input.index)) {
      continue;
    }
    chosenInputList.push(utxo);
    chosenCredSet.add(utxo.pc);
    addOutputToBalance(balance.chosenInputs, utxo.output);
  }
  return !isWithinBudget(chosenInputList.length, chosenCredSet.size, maxInputBudget);
};
const selectForRemainingAda = (chosenInputList, chosenCredSet, balance, utxoList, maxInputBudget, minInputsToSelect = 0) => {
  if (isZero(balance.chosenInputs.total) || compare(balance.chosenInputs.total, "<", balance.toCover.total) || minInputsToSelect > chosenInputList.length) {
    for (let i = utxoList.length - 1; i >= 0; i--) {
      const utxo = utxoList[i];
      if (!selectUtxo(chosenInputList, chosenCredSet, balance, utxoList, utxo, maxInputBudget)) {
        return false;
      }
      if (isGreaterThanZero(balance.chosenInputs.total) && compare(balance.chosenInputs.total, ">=", balance.toCover.total) && minInputsToSelect <= chosenInputList.length) {
        return true;
      }
    }
  }
  return true;
};
const isWithinBudget = (numInputs, numCreds, maxInputBudget) => {
  const currentSize = numInputs * TX_INPUT_SIZE + numCreds * TX_WITNESS_SIZE;
  return currentSize <= maxInputBudget;
};

const _chosenInputList = [];
const _chosenCredSet = /* @__PURE__ */ new Set();
let _userOutputList = [];
const getChosenInputList = (txIndex, reset = true) => {
  if (!_chosenInputList[txIndex]) {
    _chosenInputList[txIndex] = reactive([]);
  }
  if (reset) {
    _chosenInputList[txIndex].length = 0;
  }
  return _chosenInputList[txIndex];
};
const getChosenCredSet = (reset = true) => {
  if (reset) {
    _chosenCredSet.clear();
  }
  return _chosenCredSet;
};
const getUserOutputList = (outputList) => {
  if (!outputList) {
    return _userOutputList;
  }
  _userOutputList = outputList.concat();
  return _userOutputList;
};

const createIBuiltTxBalance = (userOutputList, utxoList) => {
  return {
    userOutputs: getOutputBalance(createIBalance(), userOutputList),
    allInputs: getInputBalance(createIBalance(), utxoList),
    chosenInputs: createIBalance(),
    changeOutputs: createIBalance(),
    deposits: createIBalance(),
    minFee: createIBalance(),
    diff: createIBalance(),
    toCover: createIBalance(),
    toCoverTmp: createIBalance()
  };
};
const selectInitialInputs = async (outputList, tx, txConfig, appAccount, spentInputList, maxInputBudget) => {
  let {
    utxoList,
    collateralUtxoList
  } = getFilteredUtxoList(appAccount, false, true, true, true);
  sortInputListByScore(utxoList, txConfig.epochParams.txFeePerByte, getInternalBundleSize(txConfig));
  let adaOnlyUtxoList = utxoList.filter((utxo) => !utxo.output.amount.multiasset);
  let multiAssetUtxoList = utxoList.filter((utxo) => !!utxo.output.amount.multiasset);
  const chosenInputList = getChosenInputList(txConfig.txIndex);
  const chosenCredSet = getChosenCredSet();
  const userOutputList = getUserOutputList(outputList);
  txConfig.numAdaOnlyUtxos = adaOnlyUtxoList.length;
  txConfig.numCollateralUtxos = collateralUtxoList.length;
  const balance = createIBuiltTxBalance(userOutputList, utxoList);
  updateDiffBalance(balance, "sendall", false, true);
  addToBalance(balance.toCover, balance.userOutputs);
  addToBalance(balance.toCover, balance.deposits, true, true);
  updateDiffBalance(balance);
  const preselectedList = [];
  let maxBudgetReached = false;
  if (preselectedList.length > 0) {
    maxBudgetReached = selectAllUtxos(
      chosenInputList,
      chosenCredSet,
      balance,
      preselectedList,
      maxInputBudget
    );
    if (maxBudgetReached) {
      throw ErrorBuildTx.maxBudgetReached;
    }
    filterUtxoList(adaOnlyUtxoList, chosenInputList);
    filterUtxoList(multiAssetUtxoList, chosenInputList);
  }
  const coveredAllOutputs = selectInputs(
    adaOnlyUtxoList,
    multiAssetUtxoList,
    chosenInputList,
    chosenCredSet,
    balance,
    maxInputBudget
  );
  if (!coveredAllOutputs) {
    throw ErrorBuildTx.couldNotCoverAmount;
  }
  filterUtxoList(adaOnlyUtxoList, chosenInputList);
  filterUtxoList(multiAssetUtxoList, chosenInputList);
  updateDiffBalance(balance);
  return {
    utxoList,
    adaOnlyUtxoList,
    multiAssetUtxoList,
    collateralUtxoList,
    chosenInputList,
    chosenCredSet,
    balance
  };
};
const selectForAmount = async (outputList, txConfig, appAccount) => selectInitialInputs(outputList, null, txConfig, appAccount, [], 999999);
const getInternalBundleSize = (txConfig) => {
  if ((txConfig.allowUtxoManagement || txConfig.tokenFragmentation.enabledInternal) && txConfig.tokenFragmentation.bundleSize > 0) {
    return txConfig.tokenFragmentation.bundleSize;
  }
  return 0;
};
const updateDiffBalance = (balance, label, includeFee = true, allInputs = false) => {
  clearBalance(balance.diff);
  addToBalance(balance.diff, allInputs ? balance.allInputs : balance.chosenInputs);
  decreaseBalance(balance.diff, balance.userOutputs);
  decreaseBalance(balance.diff, balance.changeOutputs);
  if (includeFee) {
    decreaseBalance(balance.diff, balance.minFee);
  }
  decreaseBalance(balance.diff, balance.deposits, true, true);
};

const generateTxConfig = (appAccount, epochParams, txIndex, buildCounter) => {
  const accountData = appAccount.data;
  const changeAddrBech32 = getChangeAddress(accountData)?.addr.bech32 ?? null;
  if (!changeAddrBech32) {
    throw new Error("No change address found.");
  }
  const {
    pendingWithdrawalMap
  } = getPendingUtxoList(appAccount);
  const stakeCredArray = Object.keys(pendingWithdrawalMap);
  const hasPendingWithdrawal = accountData.keys.stake.some((cred) => stakeCredArray.includes(cred.cred));
  const tfBundleSize = accountData.settings.tf.enabled ? accountData.settings.tf.bundleSize : 0;
  return {
    txIndex,
    buildCounter,
    maxCoinOutputIndex: -1,
    networkId: accountData.state.networkId,
    changeAddrBech32,
    processOutputList: true,
    allowChangeOnly: false,
    allowSendAll: true,
    // accountData.settings.sendAll.enabled,
    allowWithdrawal: accountData.settings.aw.enabled && !hasPendingWithdrawal,
    allowUtxoManagement: accountData.settings.aum.enabled,
    forceWithdrawal: false,
    numAdaOnlyUtxos: 0,
    // set during building
    numCollateralUtxos: 0,
    // set during building
    validityStartInterval: -1,
    addCertsAfterFirstTx: false,
    preventNavigation: false,
    epochParams,
    feeOffset: 0,
    forceTF: false,
    forceCU: false,
    maybeMultipleTx: false,
    tokenFragmentation: {
      enabledInternal: tfBundleSize > 0,
      enabledExternal: false,
      bundleSize: tfBundleSize
    },
    result: {
      isSendAll: false,
      isHigherThanUsualFee: false
    }
  };
};

const getTransactionHashFromCbor = (txCbor) => {
  let txHash = null;
  if (txCbor) {
    try {
      const fixedTx = FixedTransaction.from_bytes(toHexArray(txCbor));
      const decodedTxBody = fixedTx.raw_body();
      const cslTxHash = TransactionHash.from_bytes(blake2b256(Buffer$1.from(decodedTxBody)));
      txHash = toHexString(cslTxHash.to_bytes());
      safeFreeCSLObject(cslTxHash);
      safeFreeCSLObject(fixedTx);
    } catch (e) {
    }
  }
  return txHash;
};

const ErrorSignTx = {
  missingTx: "ErrorSignTx.missingTx",
  deprecatedCertificate: "ErrorSignTx.deprecatedCertificate",
  failedToSign: "ErrorSignTx.failedToSign",
  txCborInvalid: "ErrorSignTx.txCborInvalid",
  canOnlySignPartially: "ErrorSignTx.canOnlySignPartially"};

const getNativeScriptFromJSON = (script) => {
  return NativeScript.from_json(jsonToCsl(script));
};
const getHexFromNativeScriptJSON = (script) => {
  const cslNativeScript = getNativeScriptFromJSON(script);
  const hex = toHexString(cslNativeScript.to_bytes());
  safeFreeCSLObject(cslNativeScript);
  return hex;
};
const validateMultiSig = (networkId, nsList, signatures, sigNeeded) => {
  let _sigCnt = 0;
  let _sigNeeded = sigNeeded ?? nsList.length;
  for (const item of nsList) {
    if (item.hasOwnProperty("ScriptPubkey")) {
      const _item = item;
      if (signatures.includes(_item.ScriptPubkey.addr_keyhash)) {
        _sigCnt++;
      }
    } else if (item.hasOwnProperty("TimelockStart")) {
      const _item = item;
      if (parseInt(_item.TimelockStart.slot) >= getCalculatedChainTip(networkId)) {
        _sigCnt++;
      }
    } else if (item.hasOwnProperty("TimelockExpiry")) {
      const _item = item;
      if (parseInt(_item.TimelockExpiry.slot) < getCalculatedChainTip(networkId)) {
        _sigCnt++;
      }
    } else if (item.hasOwnProperty("ScriptAll")) {
      const _item = item;
      if (validateMultiSig(networkId, _item.ScriptAll.native_scripts, signatures)) {
        _sigCnt++;
      }
    } else if (item.hasOwnProperty("ScriptAny")) {
      const _item = item;
      if (validateMultiSig(networkId, _item.ScriptAny.native_scripts, signatures, 1)) {
        _sigCnt++;
      }
    } else if (item.hasOwnProperty("ScriptNOfK")) {
      const _item = item;
      if (validateMultiSig(networkId, _item.ScriptNOfK.native_scripts, signatures, _item.ScriptNOfK.n)) {
        _sigCnt++;
      }
    }
    if (_sigCnt >= _sigNeeded) {
      return true;
    }
  }
  return false;
};

const dataMap = {};
const useWitnesses = () => {
  const getWitnessesData = (txHash) => {
    if (!dataMap[txHash]) {
      dataMap[txHash] = {
        vkeyWitnessHashList: [],
        redeemerSpendIndexList: [],
        redeemerMintIndexList: [],
        inputList: [],
        mintList: [],
        nativeScriptList: [],
        plutusContractList: []
      };
    }
    return dataMap[txHash];
  };
  const parseWitnesses = (tx) => {
    if (!tx) {
      return;
    }
    const data = getWitnessesData(tx.hash);
    const isFirst = data.inputList.length === 0;
    if (isFirst) {
      data.inputList.push(...tx.body.inputs);
      data.inputList.sort((a, b) => a.transaction_id.localeCompare(b.transaction_id, "en-US") || a.index - b.index);
      if (tx.body.mint) {
        data.mintList.push(...tx.body.mint.map((m) => m[0]));
        data.mintList.sort((a, b) => a.localeCompare(b, "en-US"));
      }
      for (const redeemer of tx?.witness_set.redeemers ?? []) {
        if (redeemer.tag === "Spend") {
          data.redeemerSpendIndexList.push(parseInt(redeemer.index));
        } else if (redeemer.tag === "Mint") {
          data.redeemerMintIndexList.push(parseInt(redeemer.index));
        }
      }
    }
    for (const vkeyWitness of tx?.witness_set.vkeys ?? []) {
      const hash = getCSLVkeywitnessHash(JSON.stringify(vkeyWitness));
      if (!data.vkeyWitnessHashList.includes(hash)) {
        data.vkeyWitnessHashList.push(hash);
      }
    }
  };
  const isSignedHash = (txHash, hash) => {
    const data = getWitnessesData(txHash);
    return data.vkeyWitnessHashList.includes(hash);
  };
  const isSignedUtxo = (txHash, utxo) => {
    if (!utxo.pc || typeof utxo.pc !== "string") {
      return false;
    }
    const data = getWitnessesData(txHash);
    return data.vkeyWitnessHashList.includes(utxo.pc) || data.nativeScriptList.some((ns) => ns.scriptHash === utxo.pc);
  };
  const hasSpendRedeemer = (txHash, _input) => {
    const data = getWitnessesData(txHash);
    const hash = getUtxoHash(_input);
    const index = data.inputList.findIndex((input) => getUtxoHash(input) === hash) ?? -1;
    return index >= 0 && data.redeemerSpendIndexList.includes(index);
  };
  const hasMintRedeemer = (txHash, _policyId) => {
    const data = getWitnessesData(txHash);
    const index = data.mintList.indexOf(_policyId);
    return index >= 0 && data.redeemerMintIndexList.includes(index);
  };
  const getVkeyWitnessHashList = (txHash) => {
    const data = getWitnessesData(txHash);
    return data.vkeyWitnessHashList;
  };
  return {
    getWitnessesData,
    parseWitnesses,
    isSignedHash,
    isSignedUtxo,
    hasSpendRedeemer,
    hasMintRedeemer,
    getVkeyWitnessHashList
  };
};

const getAllVkeysFromNativeScriptList = (nsList) => {
  const vkeySet = /* @__PURE__ */ new Set();
  for (const item of nsList) {
    if (item.hasOwnProperty("ScriptAll")) {
      let vkeyList = getAllVkeysFromNativeScriptList(item["ScriptAll"].native_scripts);
      for (const vkey of vkeyList) {
        vkeySet.add(vkey);
      }
    } else if (item.hasOwnProperty("ScriptAny")) {
      let vkeyList = getAllVkeysFromNativeScriptList(item["ScriptAny"].native_scripts);
      for (const vkey of vkeyList) {
        vkeySet.add(vkey);
      }
    } else if (item.hasOwnProperty("ScriptNOfK")) {
      let vkeyList = getAllVkeysFromNativeScriptList(item["ScriptNOfK"].native_scripts);
      for (const vkey of vkeyList) {
        vkeySet.add(vkey);
      }
    } else if (item.hasOwnProperty("ScriptPubkey")) {
      vkeySet.add(item["ScriptPubkey"].addr_keyhash);
    }
  }
  return Array.from(vkeySet);
};
const getNativeScriptCredList = async (networkId, tx, script, witnessUtil) => {
  const known = /* @__PURE__ */ new Set();
  const unknown = /* @__PURE__ */ new Set();
  const ownedList = [];
  const foreign = /* @__PURE__ */ new Set();
  const signed = /* @__PURE__ */ new Set();
  const unsigned = /* @__PURE__ */ new Set();
  const vkeyList = getAllVkeysFromNativeScriptList([script]);
  for (const nsSig of vkeyList) {
    known.add(nsSig);
    if (witnessUtil.isSignedHash(tx.hash, nsSig)) {
      signed.add(nsSig);
    }
  }
  const knownList = Array.from(known);
  for (const cred of knownList) {
    const appAccount = getIAppAccountByCred(cred, true);
    if (appAccount && !appAccount.isReadOnly) {
      const ownedCred = getOwnedCred([appAccount.data.keys], cred);
      const _owned = ownedList.find((oc) => oc.accountId === appAccount.id);
      if (_owned) {
        if (_owned.credList.some((c) => c.cred === cred)) {
          continue;
        }
        _owned.credList.push(ownedCred);
      } else {
        const txBalance = await calcAccountTxBalance(appAccount, tx);
        ownedList.push({
          accountId: appAccount.id,
          walletId: appAccount.walletId,
          type: appAccount.data.account.signType,
          credList: [ownedCred],
          txBalance
        });
      }
    } else {
      foreign.add(cred);
    }
  }
  const foreignList = Array.from(foreign);
  for (const foreignCred of foreignList) {
    if (!signed.has(foreignCred)) {
      unsigned.add(foreignCred);
    }
  }
  for (const ownedCred of ownedList) {
    for (const cred of ownedCred.credList) {
      if (!signed.has(cred.cred)) {
        unsigned.add(cred.cred);
      }
    }
  }
  const unsignedCredList = Array.from(unsigned);
  const scriptValid = validateMultiSig(networkId, [script], Array.from(signed));
  return {
    known: knownList,
    unknown: Array.from(unknown),
    ownedList,
    foreign: foreignList,
    signed: Array.from(signed),
    unsigned: unsignedCredList,
    scriptValid
  };
};
const getSignTxCredList = async (networkId, tx, restrictToAccountIds) => {
  if (!tx) {
    throw ErrorSignTx.missingTx;
  }
  if (!tx.inputUtxoList) {
    throw ErrorSignTx.missingTx;
  }
  const unknownInputList = getAllInputUtxoHashList(tx);
  if (unknownInputList.length > 0) {
    await loadUnknownUtxos(networkId, tx.inputUtxoList, unknownInputList);
  }
  const known = /* @__PURE__ */ new Set();
  const unknown = /* @__PURE__ */ new Set();
  const ownedList = [];
  const foreign = /* @__PURE__ */ new Set();
  const signed = /* @__PURE__ */ new Set();
  const unsigned = /* @__PURE__ */ new Set();
  const certCreds = /* @__PURE__ */ new Set();
  const scriptCredList = [];
  const witnessUtil = useWitnesses();
  witnessUtil.parseWitnesses(tx);
  if (tx.body.required_signers) {
    for (const reqSig of tx.body.required_signers) {
      known.add(reqSig);
      if (witnessUtil.isSignedHash(tx.hash, reqSig)) {
        signed.add(reqSig);
      }
    }
  }
  let allScriptsValid = true;
  if (tx.witness_set.native_scripts) {
    for (const script of tx.witness_set.native_scripts) {
      const nsCredList = await getNativeScriptCredList(networkId, tx, script, witnessUtil);
      scriptCredList.push(nsCredList);
      if (!nsCredList.scriptValid) {
        allScriptsValid = false;
      }
      const scriptHex = getHexFromNativeScriptJSON(script);
      const scriptHash = getNativeScriptCredFromHex(scriptHex);
      signed.add(scriptHash);
    }
  }
  addCredsFromInputList(tx.hash, tx.body.collateral, known, unknown, signed, tx.inputUtxoList, witnessUtil.isSignedUtxo, witnessUtil.hasSpendRedeemer);
  addCredsFromInputList(tx.hash, tx.body.inputs, known, unknown, signed, tx.inputUtxoList, witnessUtil.isSignedUtxo, witnessUtil.hasSpendRedeemer);
  addCredsFromWithdrawalList(tx.hash, tx.body.withdrawals, known, signed, witnessUtil.isSignedHash);
  addCredsFromGovActions(tx.hash, tx.body.voting_procedures, known, signed, witnessUtil.isSignedHash);
  getDeposit(tx, certCreds);
  const certCredsList = Array.from(certCreds);
  for (const cred of certCredsList) {
    known.add(cred);
    if (witnessUtil.isSignedHash(tx.hash, cred)) {
      signed.add(cred);
    }
  }
  const knownList = Array.from(known);
  for (const cred of knownList) {
    const appAccount = getIAppAccountByCred(cred, true);
    if (!!appAccount && (true)) {
      const ownedCred = getOwnedCred([appAccount.data.keys], cred);
      const _owned = ownedList.find((oc) => oc.accountId === appAccount.id);
      if (_owned) {
        if (_owned.credList.some((c) => c.cred === cred)) {
          continue;
        }
        _owned.credList.push(ownedCred);
      } else {
        const txBalance = await calcAccountTxBalance(appAccount, tx);
        ownedList.push({
          accountId: appAccount.id,
          walletId: appAccount.walletId,
          type: appAccount.data.account.signType,
          credList: [ownedCred],
          txBalance
        });
      }
    } else {
      foreign.add(cred);
    }
  }
  const foreignList = Array.from(foreign);
  let allForeignSigned = unknown.size === 0;
  let allOwnedSigned = true;
  for (const foreignCred of foreignList) {
    if (!signed.has(foreignCred)) {
      allForeignSigned = false;
      unsigned.add(foreignCred);
    }
  }
  for (const ownedCred of ownedList) {
    for (const cred of ownedCred.credList) {
      if (!signed.has(cred.cred)) {
        allOwnedSigned = false;
        unsigned.add(cred.cred);
      }
    }
  }
  const unsignedCredList = Array.from(unsigned);
  let canSignAllUnsigned = true;
  for (const unsignedCred of unsignedCredList) {
    if (!ownedList.some((oc) => oc.credList.some((c) => c.cred === unsignedCred))) {
      canSignAllUnsigned = false;
      break;
    }
  }
  return {
    known: knownList,
    unknown: Array.from(unknown),
    ownedList,
    foreign: foreignList,
    signed: Array.from(signed),
    unsigned: unsignedCredList,
    scriptCredList,
    total: knownList.length + unknown.size,
    allForeignSigned,
    allOwnedSigned,
    canSignAllUnsigned,
    allScriptsValid
  };
};
const addCredsFromInputList = (txHash, inputList, known, unknown, signed, inputUtxoList, isSignedUtxo, hasRedeemer) => {
  if (inputList) {
    for (const input of inputList) {
      const inputUtxoHash = getUtxoHash(input);
      const utxo = inputUtxoList.find((utxo2) => getUtxoHash(utxo2.input) === inputUtxoHash);
      if (!utxo) {
        unknown.add(inputUtxoHash);
        continue;
      }
      known.add(utxo.pc);
      if (isSignedUtxo(txHash, utxo) || hasRedeemer(txHash, utxo.input)) {
        signed.add(utxo.pc);
      }
    }
  }
};
const addCredsFromWithdrawalList = (txHash, withdrawalList, known, signed, isSignedHash) => {
  if (withdrawalList) {
    const entryList = Object.entries(withdrawalList);
    for (const withdrawal of entryList) {
      if (withdrawal[1] === "0") {
        continue;
      }
      const credentials = getAddressCredentials(withdrawal[0]);
      if (credentials.stakeCred) {
        known.add(credentials.stakeCred);
        if (isSignedHash(txHash, credentials.stakeCred)) {
          signed.add(credentials.stakeCred);
        }
      }
    }
  }
};
const addCredsFromGovActions = (txHash, voting_procedures, known, signed, isSignedHash) => {
  if (voting_procedures) {
    for (const procedure of voting_procedures) {
      const voterType = Object.keys(procedure.voter)[0];
      switch (voterType) {
        case "ConstitutionalCommitteeHotCred": {
          const ccHotKey = procedure.voter.ConstitutionalCommitteeHotCred;
          const cred = Object.values(ccHotKey)[0];
          known.add(cred);
          if (isSignedHash(txHash, cred)) {
            signed.add(cred);
          }
          break;
        }
        case "DRep": {
          const drep = procedure.voter.DRep;
          const cred = Object.values(drep)[0];
          known.add(cred);
          if (isSignedHash(txHash, cred)) {
            signed.add(cred);
          }
          break;
        }
      }
    }
  }
};

const txBuildRes = ref(null);
const txSubmitType = ref(null);
const partialSign = ref(false);
const builtSignal = ref(null);
const trackingUuid = ref(null);
const openSignTx = (_res, _txSubmitType, _partialSign = false, _builtSignal = null, _trackingUuid = null) => {
  if (_res && _txSubmitType) {
    partialSign.value = _partialSign;
    txSubmitType.value = _txSubmitType;
    txBuildRes.value = _res;
    builtSignal.value = _builtSignal;
    trackingUuid.value = _trackingUuid;
  } else {
    partialSign.value = false;
    txSubmitType.value = null;
    txBuildRes.value = null;
    builtSignal.value = null;
    trackingUuid.value = null;
    dispatchSignalSync(onTxSignReset);
  }
};
const resetSignTx = () => openSignTx();
const useSignTx = () => {
  return {
    txBuildRes,
    txSubmitType,
    partialSign,
    builtSignal,
    trackingUuid,
    openSignTx,
    resetSignTx
  };
};

ref(null);
ref(null);
ref(null);
ref(null);
ref(null);
ref(null);
ref(null);

var ApiErrorCode = /* @__PURE__ */ ((ApiErrorCode2) => {
  ApiErrorCode2[ApiErrorCode2["InvalidRequest"] = -1] = "InvalidRequest";
  ApiErrorCode2[ApiErrorCode2["InternalError"] = -2] = "InternalError";
  ApiErrorCode2[ApiErrorCode2["Refused"] = -3] = "Refused";
  ApiErrorCode2[ApiErrorCode2["AccountChange"] = -4] = "AccountChange";
  return ApiErrorCode2;
})(ApiErrorCode || {});
var DataSignErrorCode = /* @__PURE__ */ ((DataSignErrorCode2) => {
  DataSignErrorCode2[DataSignErrorCode2["ProofGeneration"] = 1] = "ProofGeneration";
  DataSignErrorCode2[DataSignErrorCode2["AddressNotPK"] = 2] = "AddressNotPK";
  DataSignErrorCode2[DataSignErrorCode2["UserDeclined"] = 3] = "UserDeclined";
  DataSignErrorCode2[DataSignErrorCode2["InvalidFormat"] = 4] = "InvalidFormat";
  return DataSignErrorCode2;
})(DataSignErrorCode || {});
var TxSendErrorCode = /* @__PURE__ */ ((TxSendErrorCode2) => {
  TxSendErrorCode2[TxSendErrorCode2["Refused"] = 1] = "Refused";
  TxSendErrorCode2[TxSendErrorCode2["Failure"] = 2] = "Failure";
  return TxSendErrorCode2;
})(TxSendErrorCode || {});
var TxSignErrorCode = /* @__PURE__ */ ((TxSignErrorCode2) => {
  TxSignErrorCode2[TxSignErrorCode2["ProofGeneration"] = 1] = "ProofGeneration";
  TxSignErrorCode2[TxSignErrorCode2["UserDeclined"] = 2] = "UserDeclined";
  TxSignErrorCode2[TxSignErrorCode2["DeprecatedCertificate"] = 3] = "DeprecatedCertificate";
  return TxSignErrorCode2;
})(TxSignErrorCode || {});

const createInternalError = (info) => ({ success: false, error: { code: ApiErrorCode.InternalError, info } });
const createInvalidRequestError = (info) => ({ success: false, error: { code: ApiErrorCode.InvalidRequest, info } });
const errorInternal = (e) => createInternalError(e);
const errorNoOrigin = () => createInternalError("Error: no origin");
const errorNoAccount = () => createInternalError("no account set");
const errorNoNetworkId = () => createInternalError("no networkId");
const errorNoNetworkMagic = () => createInternalError("no network magic");
const errorNoChangeAddr = () => createInternalError("no change address");
const errorNoRewardAddr = () => createInternalError("no reward address");
const errorNotConnected = () => createInvalidRequestError("not connected");
const errorInvalidInputAmount = (e) => createInvalidRequestError("invalid input: amount: " + e);
const errorInvalidAmount = (e) => createInvalidRequestError("invalid amount: " + e);
const errorNoSubmitTx = () => createInvalidRequestError("no submit tx set");
const errorInvalidArgument = () => createInvalidRequestError("invalid argument");
const errorUnsupportedExtensions = (extensions) => createInvalidRequestError("unsupported extensions requested: " + extensions);
const errorPaginateRange = (numPages) => ({ success: false, error: { code: 1, info: "page out of range", maxPages: numPages } });
const errorConnectionRefused = () => ({ success: false, error: { code: ApiErrorCode.Refused, info: "user canceled connection" } });
const errorAccountChanged = () => ({ success: false, error: { code: ApiErrorCode.AccountChange, info: "account changed" } });
const errorTxUserDeclined = () => ({ success: false, error: { code: TxSignErrorCode.UserDeclined, info: "user declined sign tx" } });
const errorDataUserDeclined = () => ({ success: false, error: { code: DataSignErrorCode.UserDeclined, info: "user declined sign data" } });
const errorSubmitTxFailed = (e) => ({ success: false, error: { code: TxSendErrorCode.Failure, info: e } });

const parseTxSignRequest = async (appAccount, txSubmitType, txRequestList, buildSignal, trackingUuid) => {
  if (!appAccount) {
    return null;
  }
  const txList = txRequestList;
  const networkId2 = appAccount.data.state.networkId;
  const resList = [];
  const hintUtxoList = getHintUtxoList(appAccount);
  let partialSign = false;
  const txLen = txList.length;
  const epochParams = checkEpochParams();
  for (let i = 0; i < txLen; i++) {
    const free = [];
    const res = getTransactionFromCbor(networkId2, txList[i].cbor, i, free);
    if (!res.builtTx) {
      throw ErrorSignTx.txCborInvalid;
    }
    for (const cert of res.builtTx.body.certs ?? []) {
      if ((cert.hasOwnProperty("GenesisKeyDelegation") || cert.hasOwnProperty("MoveInstantaneousRewardsCert")) && epochParams.isAtLeastConwayEra) {
        throw ErrorSignTx.deprecatedCertificate;
      }
    }
    res.builtTx.inputUtxoList = hintUtxoList.filter((chained) => res.builtTx.body.inputs.some((input) => input.transaction_id === chained.input.transaction_id && input.index === chained.input.index));
    res.builtTx.inputUtxoList.push(...hintUtxoList.filter((chained) => !!res.builtTx.body.collateral?.some((input) => input.transaction_id === chained.input.transaction_id && input.index === chained.input.index)));
    const creds = await getSignTxCredList(networkId2, res.signedTx?.tx ?? res.builtTx);
    console.log("res.creds", json(creds));
    res.txCredList = creds;
    if (!txList[i].partialSign && !creds.canSignAllUnsigned) {
      if (creds.ownedList.length === 0) {
        throw ErrorSignTx.failedToSign;
      }
      throw ErrorSignTx.canOnlySignPartially;
    }
    if (!partialSign && txList[i].partialSign) {
      partialSign = true;
    }
    resList.push(res);
    const outputLen = res.builtTx.body.outputs.length;
    if (txLen > 1) {
      for (let j = 0; j < outputLen; j++) {
        hintUtxoList.push(createIUtxo({
          input: {
            transaction_id: res.txHash,
            index: j
          },
          output: res.builtTx.body.outputs[j]
        }));
      }
    }
  }
  useSignTx().openSignTx(resList, txSubmitType, partialSign, buildSignal, trackingUuid);
  console.warn("parseTx: success");
  return resList;
};

const getSlippage = () => getRef("slippage", "300");
const getDEXBlocklist = () => getObjRef("dexblocklist", []);
const setDEXBlocklist = (blocklist) => {
  const _ref = getDEXBlocklist();
  _ref.value = blocklist;
  forceSetLS("dexblocklist", _ref.value);
};
const getAggBlocklist = () => getObjRef("aggblocklist", []);
const setAggBlocklist = (blocklist) => {
  const _ref = getAggBlocklist();
  _ref.value = blocklist;
  forceSetLS("aggblocklist", _ref.value);
};

class AssetDB extends Dexie {
  list;
  cdn;
  constructor(networkId) {
    super("eternl-" + networkId + "-asset");
    this.version(1).stores({
      list: "p",
      cdn: "f"
    });
    this.version(2).upgrade((tx) => {
      return tx.table("list").clear();
    });
  }
}
const dbMap$1 = networkIdList.reduce((o, n) => {
  o[n] = null;
  return o;
}, {});
const getDB$1 = async (networkId) => {
  let db = dbMap$1[networkId];
  if (!db) {
    db = new AssetDB(networkId);
    dbMap$1[networkId] = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const getAssets = (networkId, assets) => {
  return getDB$1(networkId).then((db) => {
    return db.list.bulkGet(Object.keys(assets)).then((dbList) => {
      const assetList = {};
      for (const item of dbList) {
        if (item) {
          const wantedAssets = assets[item.p];
          assetList[item.p] = item.a.filter((ai) => wantedAssets.includes(ai.h));
        }
      }
      return assetList;
    }).catch((e) => null);
  }).catch((e) => null);
};
const putAssets = (networkId, assets) => {
  return getDB$1(networkId).then((db) => {
    return db.transaction("rw", db.list, async (tx) => {
      const dbList = await db.list.bulkGet(Object.keys(assets));
      for (const entry of Object.entries(assets)) {
        const dbAsset = dbList.find((a) => a && a.p === entry[0]);
        if (dbAsset) {
          const assetList = dbAsset.a.filter((a) => !entry[1].some((ai) => ai.h === a.h));
          assetList.push(...entry[1]);
          db.list.put({ p: entry[0], a: assetList });
        } else {
          db.list.put({ p: entry[0], a: entry[1] });
        }
      }
      return true;
    });
  }).catch((e) => false);
};
const removeAllAssets = (networkId) => getDB$1(networkId).then((db) => db.list.clear());
const getCDNImage = (networkId, fingerprint) => {
  return getDB$1(networkId).then((db) => db.cdn.get(fingerprint));
};
const getCDNImages = (networkId, fingerprints) => {
  return getDB$1(networkId).then((db) => {
    return db.transaction("r", db.cdn, async (tx) => {
      return await db.cdn.bulkGet(fingerprints);
    });
  }).catch((e) => []);
};
const putCDNImage = (networkId, image) => {
  return getDB$1(networkId).then((db) => db.cdn.put(image));
};
const putCDNImages = (networkId, images) => {
  return getDB$1(networkId).then((db) => {
    return db.transaction("rw", db.cdn, async (tx) => {
      db.cdn.bulkPut(images);
      return true;
    });
  }).catch((e) => false);
};
const removeAllCDNImages = (networkId) => getDB$1(networkId).then((db) => db.cdn.clear());
const AssetDB$1 = {
  getAssets,
  putAssets,
  getCDNImage,
  getCDNImages,
  putCDNImage,
  putCDNImages,
  removeAllAssets,
  removeAllCDNImages
};

networkIdList.reduce((o, n) => {
  o[n] = {
    postgrest: { rpc(a, b) {
      return { single() {
      } };
    }, url: "", schema: "" },
    postgrestFH: { rpc(a, b) {
      return { single() {
      } };
    }, url: "", schema: "" },
    gql: "",
    fh: {
      jwt_token: "",
      api: ""
    },
    catalyst: "",
    id: n
  };
  if (n === "mainnet") {
    o[n].bf = {
      pid: "Qyj1TZi2K991Na979bZd1VBHw66RxhpW",
      api: "https://cardano-mainnet.blockfrost.io/api/v0"
    };
    o[n].swap = {
      ms: {
        pools: "https://onchain.muesliswap.com/pools/pair",
        orders: "https://onchain.muesliswap.com/orders/all",
        datum: "https://aggregator.muesliswap.com/constructSwapDatum",
        cancel: "https://aggregator.muesliswap.com/cancelSwapTransaction",
        verified: "https://api.muesliswap.com/token-status"
      },
      dh: {
        us: "https://api-us.dexhunterv3.app",
        eu: "https://api-eu.dexhunterv3.app",
        orders: "/swap/orders/",
        lpinfo: "/swap/pairStats/",
        assets: "/swap/tokens",
        estimate: "/swap/estimate",
        restimate: "/swap/reverseEstimate",
        lestimate: "/swap/limit/estimate",
        avgprice: "/swap/averagePrice/",
        build: "/swap/build",
        limit: "/swap/limit/build",
        cancel: "/swap/cancel",
        options: { headers: [{ name: "X-Partner-Id", value: "eternl-Zdfz2u71Q7cL" }] }
      },
      ss: {
        token: "https://eternl.steelswap.io/tokens/list/",
        usdPrice: "https://eternl.steelswap.io/tokens/price/usd/"
      },
      py: {
        floorAndSales: "https://devapi.pyroanalytics.io/v1/policy/collectionFloorAndSales"
      }
    };
    o[n].catalyst = "https://core.projectcatalyst.io/api/v0/fund";
  } else if (n === "preprod") {
    o[n].bf = {
      pid: "preprodmrTNQWgyoje1RDejR7FeJYUAuUSDMbP2",
      api: "https://cardano-preprod.blockfrost.io/api/v0"
    };
    o[n].swap = {
      ms: {
        pools: "https://preprod.onchain.muesliswap.com/pools/pair",
        orders: "https://preprod.onchain.muesliswap.com/orders/all",
        datum: "https://aggregator.muesliswap.com/constructTestnetSwapDatum",
        cancel: "https://aggregator.muesliswap.com/cancelTestnetSwapTransaction",
        verified: ""
      },
      ss: {
        token: "https://ci.cardem.io/api/tokens/list/",
        usdPrice: "https://ci.cardem.io/api/tokens/price/usd/"
      }
    };
    o[n].catalyst = "https://core.projectcatalyst.io/api/v0/fund";
  } else if (n === "preview") {
    o[n].bf = {
      pid: "preview9uvxT4opuz8kZGYYXNLzVsjhk43VYF6U",
      api: "https://cardano-preview.blockfrost.io/api/v0"
    };
  }
  return o;
}, {});
networkIdList.reduce((o, n) => {
  o[n] = [];
  return o;
}, {});
networkIdList.reduce((o, n) => {
  o[n] = {
    postgrest: { rpc(a, b) {
      return { single() {
      } };
    }, url: "", schema: "" },
    postgrestFH: { rpc(a, b) {
      return { single() {
      } };
    }, url: "", schema: "" },
    gql: "",
    fh: {
      jwt_token: "",
      api: ""
    },
    catalyst: "",
    id: n
  };
  return o;
}, {});

var MediaSize = /* @__PURE__ */ ((MediaSize2) => {
  MediaSize2[MediaSize2["LOW"] = 128] = "LOW";
  MediaSize2[MediaSize2["HIGH"] = 1024] = "HIGH";
  return MediaSize2;
})(MediaSize || {});

const fetchAssetInfo = async (networkId, assetMap) => {
  const url = `/${networkId}/v2/asset/info`;
  const res = await api.post(url, { assetList: assetMap }).catch((err) => {
    console.error(el("fetchAssetInfo"), json(err));
  });
  if (res?.data) {
    return res?.data;
  }
  return {};
};
const fetchAssetCDN = async (networkId, assetList) => {
  const url = `/${networkId}/v2/asset/cdn`;
  const res = await api.post(url, { assetList }).catch((err) => {
    console.error(el("fetchAssetCDN"), json(err));
  });
  if (res?.data) {
    return res?.data;
  }
  return [];
};
const fetchImageCDN = async (url, fingerprint) => {
  const res = await api.fetchData(url, true, null, {
    responseType: "arraybuffer"
  }).catch((err) => {
    console.warn(el("fetchImageCdn"), fingerprint, json(err));
  });
  if (res) {
    return res;
  }
  return null;
};
const fetchAssetCDNImage = async (networkId, assetCDN, mediaSize = MediaSize.LOW) => {
  const imageParam = assetCDN.l.find((p) => p.s === mediaSize);
  let image = null;
  if (imageParam) {
    const imageUrl = buildUrl(networkId, buildBaseUrl(networkId, assetCDN.f), imageParam);
    if (imageUrl) {
      image = await fetchImageCDN(imageUrl, assetCDN.f);
    }
  }
  return image;
};
const buildBaseUrl = (networkId, fingerprint) => {
  if (networkId === "mainnet") {
    return `https://${fingerprint}.eternl.nftcdn.io/image`;
  } else if (networkId === "preprod" || networkId === "preview") {
    return `https://${fingerprint}.${networkId}.nftcdn.io/image`;
  }
  return null;
};
const buildUrl = (networkId, baseUrl, params) => {
  if (!baseUrl) {
    return null;
  }
  if (params.s) {
    baseUrl += "?size=" + params.s;
  }
  return baseUrl + (networkId !== "preview" ? "&tk=" + params.tk : "");
};

const _assetInfoMap = /* @__PURE__ */ new Map();
const _assetFingerprintMap = /* @__PURE__ */ new Map();
const _promiseMap$1 = /* @__PURE__ */ new Map();
const getAssetInfoCheck = (policyId, assetName) => {
  if (!policyId || !assetName) {
    return void 0;
  }
  let assetInfo = _assetInfoMap.get(policyId)?.get(assetName);
  return assetInfo;
};
const getAssetInfo = async (policyId, assetName) => {
  if (!policyId || assetName == null) {
    return void 0;
  }
  let assetInfo = _assetInfoMap.get(policyId)?.get(assetName);
  if (assetInfo) {
    return assetInfo;
  }
  assetInfo = await getAssetInfoFromDB(policyId, assetName);
  if (assetInfo) {
    return assetInfo;
  }
  let assetInfoPromise = _promiseMap$1.get(policyId + assetName);
  if (!assetInfoPromise) {
    assetInfoPromise = loadAssetInfo(policyId, assetName);
    _promiseMap$1.set(policyId + assetName, assetInfoPromise);
  }
  assetInfo = await assetInfoPromise;
  return assetInfo;
};
const getAssetInfoList = async (assetDetailsList) => {
  const assetMap = {};
  for (const assetDetails of assetDetailsList) {
    if (!assetDetails) {
      continue;
    }
    if (assetDetails.ai) {
      continue;
    }
    let assetInfo = _assetInfoMap.get(assetDetails.p)?.get(assetDetails.t.a);
    if (assetInfo) {
      assetDetails.ai = assetInfo;
      continue;
    }
    assetMap[assetDetails.p] = assetMap[assetDetails.p] || [];
    assetMap[assetDetails.p].push(assetDetails.t.a);
  }
  await getAssetInfoFromDBList(assetMap);
  return _assetInfoMap;
};
const addToAssetFingerprintMap = (tokenList) => {
  for (const entry of tokenList) {
    const fingerprint = getAssetIdBech32(entry.policyId, entry.hexName);
    if (_assetFingerprintMap.has(fingerprint)) {
      continue;
    }
    _assetFingerprintMap.set(fingerprint, { p: entry.policyId, t: { a: entry.hexName, q: "0" } });
  }
};
const addAllAssetInfoToMap = (assetInfoMap) => {
  for (const policyId in assetInfoMap) {
    const assetInfoList = assetInfoMap[policyId];
    let policyMap = _assetInfoMap.get(policyId);
    if (!policyMap) {
      policyMap = /* @__PURE__ */ new Map();
      _assetInfoMap.set(policyId, policyMap);
    }
    for (const assetInfo of assetInfoList) {
      policyMap.set(assetInfo.h, assetInfo);
      const fingerprint = getAssetIdBech32(policyId, assetInfo.h);
      _assetFingerprintMap.set(fingerprint, { p: policyId, t: { a: assetInfo.h, q: "0" } });
    }
  }
};
const getAssetInfoFromDB = async (policyId, assetName) => {
  const assetMap = { [policyId]: [assetName] };
  const dbAssets = await AssetDB$1.getAssets(networkId$9.value, assetMap) ?? {};
  const assetInfo = dbAssets[policyId]?.find((ai) => ai.h === assetName);
  addAssetInfoToMap(policyId, assetName, assetInfo);
  return assetInfo;
};
const getAssetInfoFromDBList = async (assetMap) => {
  if (Object.keys(assetMap).length === 0) {
    return;
  }
  const dbAssets = await AssetDB$1.getAssets(networkId$9.value, assetMap) ?? {};
  addAllAssetInfoToMap(dbAssets);
  return dbAssets;
};
const loadAssetInfo = async (policyId, assetName) => {
  const assetMap = { [policyId]: [assetName] };
  const assetInfoMap = await fetchAssetInfo(networkId$9.value, assetMap);
  if (!assetInfoMap) {
    return void 0;
  }
  const assetInfo = assetInfoMap[policyId]?.find((ai) => ai.h === assetName);
  addAssetInfoToMap(policyId, assetName, assetInfo);
  if (assetInfo) {
    await saveAssetInfoToDB(policyId, assetInfo);
  }
  _promiseMap$1.delete(policyId + assetName);
  return assetInfo;
};
const saveAssetInfoToDB = (policyId, assetInfo) => {
  return AssetDB$1.putAssets(networkId$9.value, { [policyId]: [assetInfo] });
};
const addAssetInfoToMap = (policyId, assetName, assetInfo) => {
  if (!assetInfo) {
    return;
  }
  let policyMap = _assetInfoMap.get(policyId);
  if (!policyMap) {
    policyMap = /* @__PURE__ */ new Map();
    _assetInfoMap.set(policyId, policyMap);
  }
  policyMap.set(assetName, assetInfo);
  const fingerprint = getAssetIdBech32(policyId, assetName);
  _assetFingerprintMap.set(fingerprint, { p: policyId, t: { a: assetName, q: "0" } });
};

const {
  selectedWalletId,
  selectedAccountId
} = useSelectedAccount();
const buildWalletId = selectedWalletId;
const buildAccountId = selectedAccountId;
const isBuildAccountSet = computed(() => !!buildAccountId.value);

function useAppWallet(walletId) {
  const appWalletRef = ref(null);
  let toid = -1;
  const updateRef = () => {
    clearTimeout(toid);
    if (walletId.value) {
      let maybeAppWallet = appWallet$1.value;
      if (!maybeAppWallet || maybeAppWallet.id !== walletId.value) {
        maybeAppWallet = null;
      }
      appWalletRef.value = maybeAppWallet ?? getIAppWallet(walletId.value);
      if (!appWalletRef.value) {
        toid = setTimeout(updateRef, 250);
      }
    } else {
      appWalletRef.value = null;
    }
  };
  watch(walletId, () => {
    updateRef();
  }, { immediate: true });
  return appWalletRef;
}

function useAppAccount(appWalletRef, accountId) {
  const appAccountRef = ref(null);
  const updateRefs = () => {
    if (appWalletRef.value && accountId.value) {
      let maybeAppAccount = appAccount$1.value;
      if (!maybeAppAccount || maybeAppAccount.id !== accountId.value) {
        maybeAppAccount = null;
      }
      const newAppAccount = maybeAppAccount ?? getIAppAccount(accountId.value, appWalletRef.value.id);
      if (appAccountRef.value !== newAppAccount) {
        appAccountRef.value = newAppAccount;
      }
    } else {
      if (appAccountRef.value !== null) {
        appAccountRef.value = null;
      }
    }
  };
  watch(() => appWalletRef.value?.accountList.length, () => {
    updateRefs();
  });
  watch(accountId, () => {
    updateRefs();
  }, { immediate: true });
  return appAccountRef;
}

const updateIWalletSettingsPartial = (obj, ref) => {
  if (obj.id !== ref.id || obj.networkId !== ref.networkId) {
    throw DataError.updateIWalletSettingsIfNeeded;
  }
  if (ref.hasOwnProperty("name") && obj.name !== ref.name) {
    obj.name = ref.name;
  }
  if (ref.hasOwnProperty("groupName") && obj.groupName !== ref.groupName) {
    obj.groupName = ref.groupName;
  }
  if (ref.hasOwnProperty("description") && obj.description !== ref.description) {
    obj.description = ref.description;
  }
  if (ref.hasOwnProperty("useBiometrics") && obj.useBiometrics !== ref.useBiometrics) {
    obj.useBiometrics = ref.useBiometrics;
  }
  if (ref.plate?.hasOwnProperty("checksum") && obj.plate.checksum !== ref.plate.checksum) {
    obj.plate.checksum = ref.plate.checksum;
  }
  if (ref.plate?.hasOwnProperty("image") && obj.plate.image !== ref.plate.image) {
    obj.plate.image = ref.plate.image;
  }
  if (ref.plate?.hasOwnProperty("data") && obj.plate.data !== ref.plate.data) {
    obj.plate.data = ref.plate.data;
  }
  if (ref.background?.hasOwnProperty("policy") && obj.background.policy !== ref.background.policy) {
    obj.background.policy = ref.background.policy;
  }
  if (ref.background?.hasOwnProperty("name") && obj.background.name !== ref.background.name) {
    obj.background.name = ref.background.name;
  }
  if (ref.background?.hasOwnProperty("opacity") && obj.background.opacity !== ref.background.opacity) {
    obj.background.opacity = ref.background.opacity ?? 100;
  }
  return obj;
};

var cip4Js = {};

var blake2b$1 = {exports: {}};

var nanoassert;
var hasRequiredNanoassert;

function requireNanoassert () {
	if (hasRequiredNanoassert) return nanoassert;
	hasRequiredNanoassert = 1;
	assert.notEqual = notEqual;
	assert.notOk = notOk;
	assert.equal = equal;
	assert.ok = assert;

	nanoassert = assert;

	function equal (a, b, m) {
	  assert(a == b, m); // eslint-disable-line eqeqeq
	}

	function notEqual (a, b, m) {
	  assert(a != b, m); // eslint-disable-line eqeqeq
	}

	function notOk (t, m) {
	  assert(!t, m);
	}

	function assert (t, m) {
	  if (!t) throw new Error(m || 'AssertionError')
	}
	return nanoassert;
}

var blake2bWasm = {exports: {}};

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var blake2b;
var hasRequiredBlake2b$1;

function requireBlake2b$1 () {
	if (hasRequiredBlake2b$1) return blake2b;
	hasRequiredBlake2b$1 = 1;
	blake2b = loadWebAssembly;

	loadWebAssembly.supported = typeof WebAssembly !== 'undefined';

	function loadWebAssembly (opts) {
	  if (!loadWebAssembly.supported) return null

	  var imp = opts && opts.imports;
	  var wasm = toUint8Array('AGFzbQEAAAABEANgAn9/AGADf39/AGABfwADBQQAAQICBQUBAQroBwdNBQZtZW1vcnkCAAxibGFrZTJiX2luaXQAAA5ibGFrZTJiX3VwZGF0ZQABDWJsYWtlMmJfZmluYWwAAhBibGFrZTJiX2NvbXByZXNzAAMK00AElgMAIABCADcDACAAQQhqQgA3AwAgAEEQakIANwMAIABBGGpCADcDACAAQSBqQgA3AwAgAEEoakIANwMAIABBMGpCADcDACAAQThqQgA3AwAgAEHAAGpCADcDACAAQcgAakIANwMAIABB0ABqQgA3AwAgAEHYAGpCADcDACAAQeAAakIANwMAIABB6ABqQgA3AwAgAEHwAGpCADcDACAAQfgAakIANwMAIABBgAFqQoiS853/zPmE6gBBACkDAIU3AwAgAEGIAWpCu86qptjQ67O7f0EIKQMAhTcDACAAQZABakKr8NP0r+68tzxBECkDAIU3AwAgAEGYAWpC8e30+KWn/aelf0EYKQMAhTcDACAAQaABakLRhZrv+s+Uh9EAQSApAwCFNwMAIABBqAFqQp/Y+dnCkdqCm39BKCkDAIU3AwAgAEGwAWpC6/qG2r+19sEfQTApAwCFNwMAIABBuAFqQvnC+JuRo7Pw2wBBOCkDAIU3AwAgAEHAAWpCADcDACAAQcgBakIANwMAIABB0AFqQgA3AwALbQEDfyAAQcABaiEDIABByAFqIQQgBCkDAKchBQJAA0AgASACRg0BIAVBgAFGBEAgAyADKQMAIAWtfDcDAEEAIQUgABADCyAAIAVqIAEtAAA6AAAgBUEBaiEFIAFBAWohAQwACwsgBCAFrTcDAAtkAQN/IABBwAFqIQEgAEHIAWohAiABIAEpAwAgAikDAHw3AwAgAEHQAWpCfzcDACACKQMApyEDAkADQCADQYABRg0BIAAgA2pBADoAACADQQFqIQMMAAsLIAIgA603AwAgABADC+U7AiB+CX8gAEGAAWohISAAQYgBaiEiIABBkAFqISMgAEGYAWohJCAAQaABaiElIABBqAFqISYgAEGwAWohJyAAQbgBaiEoICEpAwAhASAiKQMAIQIgIykDACEDICQpAwAhBCAlKQMAIQUgJikDACEGICcpAwAhByAoKQMAIQhCiJLznf/M+YTqACEJQrvOqqbY0Ouzu38hCkKr8NP0r+68tzwhC0Lx7fT4paf9p6V/IQxC0YWa7/rPlIfRACENQp/Y+dnCkdqCm38hDkLr+obav7X2wR8hD0L5wvibkaOz8NsAIRAgACkDACERIABBCGopAwAhEiAAQRBqKQMAIRMgAEEYaikDACEUIABBIGopAwAhFSAAQShqKQMAIRYgAEEwaikDACEXIABBOGopAwAhGCAAQcAAaikDACEZIABByABqKQMAIRogAEHQAGopAwAhGyAAQdgAaikDACEcIABB4ABqKQMAIR0gAEHoAGopAwAhHiAAQfAAaikDACEfIABB+ABqKQMAISAgDSAAQcABaikDAIUhDSAPIABB0AFqKQMAhSEPIAEgBSARfHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgEnx8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBN8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAUfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgFXx8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIBZ8fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAXfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggGHx8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIBl8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiAafHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgG3x8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIBx8fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAdfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggHnx8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIB98fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAgfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgH3x8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIBt8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAVfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgGXx8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBp8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByAgfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggHnx8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIBd8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiASfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgHXx8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIBF8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByATfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggHHx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIBh8fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSAWfHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgFHx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIBx8fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSAZfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgHXx8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBF8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAWfHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgE3x8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIICB8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAefHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgG3x8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIB98fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAUfHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgF3x8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIBh8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCASfHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgGnx8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBV8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSAYfHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgGnx8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBR8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiASfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgHnx8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIB18fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAcfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggH3x8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIBN8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiAXfHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgFnx8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIBt8fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAVfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggEXx8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFICB8fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAZfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgGnx8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIBF8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAWfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgGHx8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBN8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByAVfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggG3x8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIICB8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiAffHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgEnx8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIBx8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByAdfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggF3x8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIBl8fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSAUfHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgHnx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIBN8fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSAdfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgF3x8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBt8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByARfHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgHHx8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIBl8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAUfHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgFXx8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIB58fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAYfHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgFnx8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIICB8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCAffHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgEnx8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBp8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSAdfHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgFnx8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBJ8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAgfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgH3x8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIB58fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAVfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggG3x8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIBF8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiAYfHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgF3x8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIBR8fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAafHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggE3x8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIBl8fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAcfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgHnx8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIBx8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAYfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgH3x8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIB18fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByASfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggFHx8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIBp8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiAWfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgEXx8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHICB8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByAVfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggGXx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIBd8fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSATfHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgG3x8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIBd8fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSAgfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgH3x8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBp8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAcfHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgFHx8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIBF8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAZfHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgHXx8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIBN8fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAefHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgGHx8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIBJ8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCAVfHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgG3x8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBZ8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSAbfHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgE3x8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBl8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAVfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgGHx8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIBd8fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCASfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggFnx8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGICB8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiAcfHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgGnx8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIB98fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAUfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggHXx8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIB58fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSARfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgEXx8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIBJ8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiATfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgFHx8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBV8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByAWfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggF3x8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIBh8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiAZfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgGnx8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIBt8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByAcfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggHXx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIB58fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSAffHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgIHx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIB98fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSAbfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgFXx8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBl8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAafHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgIHx8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIB58fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAXfHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgEnx8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIB18fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByARfHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgE3x8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIBx8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCAYfHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgFnx8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBR8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFICEgISkDACABIAmFhTcDACAiICIpAwAgAiAKhYU3AwAgIyAjKQMAIAMgC4WFNwMAICQgJCkDACAEIAyFhTcDACAlICUpAwAgBSANhYU3AwAgJiAmKQMAIAYgDoWFNwMAICcgJykDACAHIA+FhTcDACAoICgpAwAgCCAQhYU3AwAL');
	  var ready = null;

	  var mod = {
	    buffer: wasm,
	    memory: null,
	    exports: null,
	    realloc: realloc,
	    onload: onload
	  };

	  onload(function () {});

	  return mod

	  function realloc (size) {
	    mod.exports.memory.grow(Math.ceil(Math.abs(size - mod.memory.length) / 65536));
	    mod.memory = new Uint8Array(mod.exports.memory.buffer);
	  }

	  function onload (cb) {
	    if (mod.exports) return cb()

	    if (ready) {
	      ready.then(cb.bind(null, null)).catch(cb);
	      return
	    }

	    try {
	      if (opts && opts.async) throw new Error('async')
	      setup({instance: new WebAssembly.Instance(new WebAssembly.Module(wasm), imp)});
	    } catch (err) {
	      ready = WebAssembly.instantiate(wasm, imp).then(setup);
	    }

	    onload(cb);
	  }

	  function setup (w) {
	    mod.exports = w.instance.exports;
	    mod.memory = mod.exports.memory && mod.exports.memory.buffer && new Uint8Array(mod.exports.memory.buffer);
	  }
	}

	function toUint8Array (s) {
	  if (typeof atob === 'function') return new Uint8Array(atob(s).split('').map(charCodeAt))
	  return new (commonjsRequire('buf' + 'fer').Buffer)(s, 'base64')
	}

	function charCodeAt (c) {
	  return c.charCodeAt(0)
	}
	return blake2b;
}

var hasRequiredBlake2bWasm;

function requireBlake2bWasm () {
	if (hasRequiredBlake2bWasm) return blake2bWasm.exports;
	hasRequiredBlake2bWasm = 1;
	var assert = requireNanoassert();
	var wasm = requireBlake2b$1()();

	var head = 64;
	var freeList = [];

	blake2bWasm.exports = Blake2b;
	var BYTES_MIN = blake2bWasm.exports.BYTES_MIN = 16;
	var BYTES_MAX = blake2bWasm.exports.BYTES_MAX = 64;
	blake2bWasm.exports.BYTES = 32;
	var KEYBYTES_MIN = blake2bWasm.exports.KEYBYTES_MIN = 16;
	var KEYBYTES_MAX = blake2bWasm.exports.KEYBYTES_MAX = 64;
	blake2bWasm.exports.KEYBYTES = 32;
	var SALTBYTES = blake2bWasm.exports.SALTBYTES = 16;
	var PERSONALBYTES = blake2bWasm.exports.PERSONALBYTES = 16;

	function Blake2b (digestLength, key, salt, personal, noAssert) {
	  if (!(this instanceof Blake2b)) return new Blake2b(digestLength, key, salt, personal, noAssert)
	  if (!(wasm && wasm.exports)) throw new Error('WASM not loaded. Wait for Blake2b.ready(cb)')
	  if (!digestLength) digestLength = 32;

	  if (noAssert !== true) {
	    assert(digestLength >= BYTES_MIN, 'digestLength must be at least ' + BYTES_MIN + ', was given ' + digestLength);
	    assert(digestLength <= BYTES_MAX, 'digestLength must be at most ' + BYTES_MAX + ', was given ' + digestLength);
	    if (key != null) assert(key.length >= KEYBYTES_MIN, 'key must be at least ' + KEYBYTES_MIN + ', was given ' + key.length);
	    if (key != null) assert(key.length <= KEYBYTES_MAX, 'key must be at least ' + KEYBYTES_MAX + ', was given ' + key.length);
	    if (salt != null) assert(salt.length === SALTBYTES, 'salt must be exactly ' + SALTBYTES + ', was given ' + salt.length);
	    if (personal != null) assert(personal.length === PERSONALBYTES, 'personal must be exactly ' + PERSONALBYTES + ', was given ' + personal.length);
	  }

	  if (!freeList.length) {
	    freeList.push(head);
	    head += 216;
	  }

	  this.digestLength = digestLength;
	  this.finalized = false;
	  this.pointer = freeList.pop();

	  wasm.memory.fill(0, 0, 64);
	  wasm.memory[0] = this.digestLength;
	  wasm.memory[1] = key ? key.length : 0;
	  wasm.memory[2] = 1; // fanout
	  wasm.memory[3] = 1; // depth

	  if (salt) wasm.memory.set(salt, 32);
	  if (personal) wasm.memory.set(personal, 48);

	  if (this.pointer + 216 > wasm.memory.length) wasm.realloc(this.pointer + 216); // we need 216 bytes for the state
	  wasm.exports.blake2b_init(this.pointer, this.digestLength);

	  if (key) {
	    this.update(key);
	    wasm.memory.fill(0, head, head + key.length); // whiteout key
	    wasm.memory[this.pointer + 200] = 128;
	  }
	}


	Blake2b.prototype.update = function (input) {
	  assert(this.finalized === false, 'Hash instance finalized');
	  assert(input, 'input must be TypedArray or Buffer');

	  if (head + input.length > wasm.memory.length) wasm.realloc(head + input.length);
	  wasm.memory.set(input, head);
	  wasm.exports.blake2b_update(this.pointer, head, head + input.length);
	  return this
	};

	Blake2b.prototype.digest = function (enc) {
	  assert(this.finalized === false, 'Hash instance finalized');
	  this.finalized = true;

	  freeList.push(this.pointer);
	  wasm.exports.blake2b_final(this.pointer);

	  if (!enc || enc === 'binary') {
	    return wasm.memory.slice(this.pointer + 128, this.pointer + 128 + this.digestLength)
	  }

	  if (enc === 'hex') {
	    return hexSlice(wasm.memory, this.pointer + 128, this.digestLength)
	  }

	  assert(enc.length >= this.digestLength, 'input must be TypedArray or Buffer');
	  for (var i = 0; i < this.digestLength; i++) {
	    enc[i] = wasm.memory[this.pointer + 128 + i];
	  }

	  return enc
	};

	// libsodium compat
	Blake2b.prototype.final = Blake2b.prototype.digest;

	Blake2b.WASM = wasm && wasm.buffer;
	Blake2b.SUPPORTED = typeof WebAssembly !== 'undefined';

	Blake2b.ready = function (cb) {
	  if (!cb) cb = noop;
	  if (!wasm) return cb(new Error('WebAssembly not supported'))

	  // backwards compat, can be removed in a new major
	  var p = new Promise(function (reject, resolve) {
	    wasm.onload(function (err) {
	      if (err) resolve();
	      else reject();
	      cb(err);
	    });
	  });

	  return p
	};

	Blake2b.prototype.ready = Blake2b.ready;

	function noop () {}

	function hexSlice (buf, start, len) {
	  var str = '';
	  for (var i = 0; i < len; i++) str += toHex(buf[start + i]);
	  return str
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	return blake2bWasm.exports;
}

var hasRequiredBlake2b;

function requireBlake2b () {
	if (hasRequiredBlake2b) return blake2b$1.exports;
	hasRequiredBlake2b = 1;
	var assert = requireNanoassert();
	var b2wasm = requireBlake2bWasm();

	// 64-bit unsigned addition
	// Sets v[a,a+1] += v[b,b+1]
	// v should be a Uint32Array
	function ADD64AA (v, a, b) {
	  var o0 = v[a] + v[b];
	  var o1 = v[a + 1] + v[b + 1];
	  if (o0 >= 0x100000000) {
	    o1++;
	  }
	  v[a] = o0;
	  v[a + 1] = o1;
	}

	// 64-bit unsigned addition
	// Sets v[a,a+1] += b
	// b0 is the low 32 bits of b, b1 represents the high 32 bits
	function ADD64AC (v, a, b0, b1) {
	  var o0 = v[a] + b0;
	  if (b0 < 0) {
	    o0 += 0x100000000;
	  }
	  var o1 = v[a + 1] + b1;
	  if (o0 >= 0x100000000) {
	    o1++;
	  }
	  v[a] = o0;
	  v[a + 1] = o1;
	}

	// Little-endian byte access
	function B2B_GET32 (arr, i) {
	  return (arr[i] ^
	  (arr[i + 1] << 8) ^
	  (arr[i + 2] << 16) ^
	  (arr[i + 3] << 24))
	}

	// G Mixing function
	// The ROTRs are inlined for speed
	function B2B_G (a, b, c, d, ix, iy) {
	  var x0 = m[ix];
	  var x1 = m[ix + 1];
	  var y0 = m[iy];
	  var y1 = m[iy + 1];

	  ADD64AA(v, a, b); // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
	  ADD64AC(v, a, x0, x1); // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits

	  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
	  var xor0 = v[d] ^ v[a];
	  var xor1 = v[d + 1] ^ v[a + 1];
	  v[d] = xor1;
	  v[d + 1] = xor0;

	  ADD64AA(v, c, d);

	  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
	  xor0 = v[b] ^ v[c];
	  xor1 = v[b + 1] ^ v[c + 1];
	  v[b] = (xor0 >>> 24) ^ (xor1 << 8);
	  v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8);

	  ADD64AA(v, a, b);
	  ADD64AC(v, a, y0, y1);

	  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
	  xor0 = v[d] ^ v[a];
	  xor1 = v[d + 1] ^ v[a + 1];
	  v[d] = (xor0 >>> 16) ^ (xor1 << 16);
	  v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16);

	  ADD64AA(v, c, d);

	  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
	  xor0 = v[b] ^ v[c];
	  xor1 = v[b + 1] ^ v[c + 1];
	  v[b] = (xor1 >>> 31) ^ (xor0 << 1);
	  v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1);
	}

	// Initialization Vector
	var BLAKE2B_IV32 = new Uint32Array([
	  0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
	  0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
	  0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
	  0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19
	]);

	var SIGMA8 = [
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
	  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
	  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
	  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
	  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
	  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
	  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
	  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
	  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3
	];

	// These are offsets into a uint64 buffer.
	// Multiply them all by 2 to make them offsets into a uint32 buffer,
	// because this is Javascript and we don't have uint64s
	var SIGMA82 = new Uint8Array(SIGMA8.map(function (x) { return x * 2 }));

	// Compression function. 'last' flag indicates last block.
	// Note we're representing 16 uint64s as 32 uint32s
	var v = new Uint32Array(32);
	var m = new Uint32Array(32);
	function blake2bCompress (ctx, last) {
	  var i = 0;

	  // init work variables
	  for (i = 0; i < 16; i++) {
	    v[i] = ctx.h[i];
	    v[i + 16] = BLAKE2B_IV32[i];
	  }

	  // low 64 bits of offset
	  v[24] = v[24] ^ ctx.t;
	  v[25] = v[25] ^ (ctx.t / 0x100000000);
	  // high 64 bits not supported, offset may not be higher than 2**53-1

	  // last block flag set ?
	  if (last) {
	    v[28] = ~v[28];
	    v[29] = ~v[29];
	  }

	  // get little-endian words
	  for (i = 0; i < 32; i++) {
	    m[i] = B2B_GET32(ctx.b, 4 * i);
	  }

	  // twelve rounds of mixing
	  for (i = 0; i < 12; i++) {
	    B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
	    B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
	    B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
	    B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
	    B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
	    B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
	    B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
	    B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
	  }

	  for (i = 0; i < 16; i++) {
	    ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
	  }
	}

	// reusable parameter_block
	var parameter_block = new Uint8Array([
	  0, 0, 0, 0,      //  0: outlen, keylen, fanout, depth
	  0, 0, 0, 0,      //  4: leaf length, sequential mode
	  0, 0, 0, 0,      //  8: node offset
	  0, 0, 0, 0,      // 12: node offset
	  0, 0, 0, 0,      // 16: node depth, inner length, rfu
	  0, 0, 0, 0,      // 20: rfu
	  0, 0, 0, 0,      // 24: rfu
	  0, 0, 0, 0,      // 28: rfu
	  0, 0, 0, 0,      // 32: salt
	  0, 0, 0, 0,      // 36: salt
	  0, 0, 0, 0,      // 40: salt
	  0, 0, 0, 0,      // 44: salt
	  0, 0, 0, 0,      // 48: personal
	  0, 0, 0, 0,      // 52: personal
	  0, 0, 0, 0,      // 56: personal
	  0, 0, 0, 0       // 60: personal
	]);

	// Creates a BLAKE2b hashing context
	// Requires an output length between 1 and 64 bytes
	// Takes an optional Uint8Array key
	function Blake2b (outlen, key, salt, personal) {
	  // zero out parameter_block before usage
	  parameter_block.fill(0);
	  // state, 'param block'

	  this.b = new Uint8Array(128);
	  this.h = new Uint32Array(16);
	  this.t = 0; // input count
	  this.c = 0; // pointer within buffer
	  this.outlen = outlen; // output length in bytes

	  parameter_block[0] = outlen;
	  if (key) parameter_block[1] = key.length;
	  parameter_block[2] = 1; // fanout
	  parameter_block[3] = 1; // depth

	  if (salt) parameter_block.set(salt, 32);
	  if (personal) parameter_block.set(personal, 48);

	  // initialize hash state
	  for (var i = 0; i < 16; i++) {
	    this.h[i] = BLAKE2B_IV32[i] ^ B2B_GET32(parameter_block, i * 4);
	  }

	  // key the hash, if applicable
	  if (key) {
	    blake2bUpdate(this, key);
	    // at the end
	    this.c = 128;
	  }
	}

	Blake2b.prototype.update = function (input) {
	  assert(input != null, 'input must be Uint8Array or Buffer');
	  blake2bUpdate(this, input);
	  return this
	};

	Blake2b.prototype.digest = function (out) {
	  var buf = (!out || out === 'binary' || out === 'hex') ? new Uint8Array(this.outlen) : out;
	  assert(buf.length >= this.outlen, 'out must have at least outlen bytes of space');
	  blake2bFinal(this, buf);
	  if (out === 'hex') return hexSlice(buf)
	  return buf
	};

	Blake2b.prototype.final = Blake2b.prototype.digest;

	Blake2b.ready = function (cb) {
	  b2wasm.ready(function () {
	    cb(); // ignore the error
	  });
	};

	// Updates a BLAKE2b streaming hash
	// Requires hash context and Uint8Array (byte array)
	function blake2bUpdate (ctx, input) {
	  for (var i = 0; i < input.length; i++) {
	    if (ctx.c === 128) { // buffer full ?
	      ctx.t += ctx.c; // add counters
	      blake2bCompress(ctx, false); // compress (not last)
	      ctx.c = 0; // counter to zero
	    }
	    ctx.b[ctx.c++] = input[i];
	  }
	}

	// Completes a BLAKE2b streaming hash
	// Returns a Uint8Array containing the message digest
	function blake2bFinal (ctx, out) {
	  ctx.t += ctx.c; // mark last block offset

	  while (ctx.c < 128) { // fill up with zeros
	    ctx.b[ctx.c++] = 0;
	  }
	  blake2bCompress(ctx, true); // final block flag = 1

	  for (var i = 0; i < ctx.outlen; i++) {
	    out[i] = ctx.h[i >> 2] >> (8 * (i & 3));
	  }
	  return out
	}

	function hexSlice (buf) {
	  var str = '';
	  for (var i = 0; i < buf.length; i++) str += toHex(buf[i]);
	  return str
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	var Proto = Blake2b;

	blake2b$1.exports = function createHash (outlen, key, salt, personal, noAssert) {
	  if (noAssert !== true) {
	    assert(outlen >= BYTES_MIN, 'outlen must be at least ' + BYTES_MIN + ', was given ' + outlen);
	    assert(outlen <= BYTES_MAX, 'outlen must be at most ' + BYTES_MAX + ', was given ' + outlen);
	    if (key != null) assert(key.length >= KEYBYTES_MIN, 'key must be at least ' + KEYBYTES_MIN + ', was given ' + key.length);
	    if (key != null) assert(key.length <= KEYBYTES_MAX, 'key must be at most ' + KEYBYTES_MAX + ', was given ' + key.length);
	    if (salt != null) assert(salt.length === SALTBYTES, 'salt must be exactly ' + SALTBYTES + ', was given ' + salt.length);
	    if (personal != null) assert(personal.length === PERSONALBYTES, 'personal must be exactly ' + PERSONALBYTES + ', was given ' + personal.length);
	  }

	  return new Proto(outlen, key, salt, personal)
	};

	blake2b$1.exports.ready = function (cb) {
	  b2wasm.ready(function () { // ignore errors
	    cb();
	  });
	};

	blake2b$1.exports.WASM_SUPPORTED = b2wasm.SUPPORTED;
	blake2b$1.exports.WASM_LOADED = false;

	var BYTES_MIN = blake2b$1.exports.BYTES_MIN = 16;
	var BYTES_MAX = blake2b$1.exports.BYTES_MAX = 64;
	blake2b$1.exports.BYTES = 32;
	var KEYBYTES_MIN = blake2b$1.exports.KEYBYTES_MIN = 16;
	var KEYBYTES_MAX = blake2b$1.exports.KEYBYTES_MAX = 64;
	blake2b$1.exports.KEYBYTES = 32;
	var SALTBYTES = blake2b$1.exports.SALTBYTES = 16;
	var PERSONALBYTES = blake2b$1.exports.PERSONALBYTES = 16;

	b2wasm.ready(function (err) {
	  if (!err) {
	    blake2b$1.exports.WASM_LOADED = true;
	    Proto = b2wasm;
	  }
	});
	return blake2b$1.exports;
}

var bufferCrc32;
var hasRequiredBufferCrc32;

function requireBufferCrc32 () {
	if (hasRequiredBufferCrc32) return bufferCrc32;
	hasRequiredBufferCrc32 = 1;
	var Buffer = requireDist$1().Buffer;

	var CRC_TABLE = [
	  0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419,
	  0x706af48f, 0xe963a535, 0x9e6495a3, 0x0edb8832, 0x79dcb8a4,
	  0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07,
	  0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de,
	  0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856,
	  0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9,
	  0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4,
	  0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b,
	  0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3,
	  0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a,
	  0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599,
	  0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924,
	  0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190,
	  0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f,
	  0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0x0f00f934, 0x9609a88e,
	  0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01,
	  0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed,
	  0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950,
	  0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3,
	  0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2,
	  0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a,
	  0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5,
	  0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010,
	  0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f,
	  0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17,
	  0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6,
	  0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615,
	  0x73dc1683, 0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8,
	  0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1, 0xf00f9344,
	  0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb,
	  0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a,
	  0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5,
	  0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1,
	  0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c,
	  0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef,
	  0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236,
	  0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe,
	  0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31,
	  0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c,
	  0x026d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x05005713,
	  0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b,
	  0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 0x86d3d2d4, 0xf1d4e242,
	  0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1,
	  0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c,
	  0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278,
	  0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7,
	  0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66,
	  0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9,
	  0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605,
	  0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8,
	  0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b,
	  0x2d02ef8d
	];

	if (typeof Int32Array !== 'undefined') {
	  CRC_TABLE = new Int32Array(CRC_TABLE);
	}

	function ensureBuffer(input) {
	  if (Buffer.isBuffer(input)) {
	    return input;
	  }

	  var hasNewBufferAPI =
	      typeof Buffer.alloc === "function" &&
	      typeof Buffer.from === "function";

	  if (typeof input === "number") {
	    return hasNewBufferAPI ? Buffer.alloc(input) : new Buffer(input);
	  }
	  else if (typeof input === "string") {
	    return hasNewBufferAPI ? Buffer.from(input) : new Buffer(input);
	  }
	  else {
	    throw new Error("input must be buffer, number, or string, received " +
	                    typeof input);
	  }
	}

	function bufferizeInt(num) {
	  var tmp = ensureBuffer(4);
	  tmp.writeInt32BE(num, 0);
	  return tmp;
	}

	function _crc32(buf, previous) {
	  buf = ensureBuffer(buf);
	  if (Buffer.isBuffer(previous)) {
	    previous = previous.readUInt32BE(0);
	  }
	  var crc = ~~previous ^ -1;
	  for (var n = 0; n < buf.length; n++) {
	    crc = CRC_TABLE[(crc ^ buf[n]) & 0xff] ^ (crc >>> 8);
	  }
	  return (crc ^ -1);
	}

	function crc32() {
	  return bufferizeInt(_crc32.apply(null, arguments));
	}
	crc32.signed = function () {
	  return _crc32.apply(null, arguments);
	};
	crc32.unsigned = function () {
	  return _crc32.apply(null, arguments) >>> 0;
	};

	bufferCrc32 = crc32;
	return bufferCrc32;
}

var fnvPlus = {exports: {}};

/**
 * FNV-1a Hash implementation (32, 64, 128, 256, 512, and 1024 bit)
 * @author Travis Webb <me@traviswebb.com>
 * @see http://tools.ietf.org/html/draft-eastlake-fnv-06
 */

var hasRequiredFnvPlus;

function requireFnvPlus () {
	if (hasRequiredFnvPlus) return fnvPlus.exports;
	hasRequiredFnvPlus = 1;
	(function (module) {
		var fnvplus = (function(){
			var i, hl = [], hl16 = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'],
				version = '1a',
				useUTF8 = false,
				_hash32, _hash52, _hash64, _hash128, _hash256, _hash512, _hash1024,
				referenceSeed = 'chongo <Landon Curt Noll> /\\../\\',
				defaultKeyspace = 52,
				fnvConstants = {
					32: {offset: 0},
					64: {offset: [0,0,0,0]},
					128: {offset: [0,0,0,0,0,0,0,0]},
					256: {offset: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
					512: {offset: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
					1024: {offset: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}};

			for(i=0; i < 256; i++){
				hl[i] = ((i >> 4) & 15).toString(16) + (i & 15).toString(16);
			}

			function hexToBase(hex, base){
				var alphabet = '0123456789abcdefghijklmnopqrstuvwxyz',
					digits = [0], carry, i, j, string = '';

				for(i = 0; i < hex.length; i+=2){
					carry = parseInt(hex.substr(i,2),16);
					for(j = 0; j < digits.length; j++){
						carry += digits[j] << 8;
						digits[j] = carry % base;
						carry = (carry / base) | 0;
					}
					while (carry > 0) {
						digits.push(carry % base);
						carry = (carry / base) | 0;
					}
				}

				for (i = digits.length - 1; i >= 0; --i){
					string += alphabet[digits[i]];
				}

				return string;
			}

			function hashValHex(value, keyspace) {
				return {
					bits: keyspace,
					value: value,
					dec: function(){return hexToBase(value, 10);},
					hex: function(){return value;},
					str: function(){return hexToBase(value, 36);}
				};
			}

			function hashValInt32(value, keyspace) {
				return {
					bits: keyspace,
					value: value,
					dec: function(){return value.toString();},
					hex: function(){return hl[value>>>24]+ hl[(value>>>16)&255]+hl[(value>>>8)&255]+hl[value&255];},
					str: function(){return value.toString(36);}
				};
			}

			function hashValInt52(value, keyspace) {
				return {
					bits: keyspace,
					value: value,
					dec: function(){return value.toString();},
					hex: function(){return ('0000000000000000'+value.toString(16)).substr(-13);},
					str: function(){return value.toString(36);}
				};
			}

			function hash(message, keyspace) {
				var str = (typeof message === 'object') ? JSON.stringify(message) : message;

				switch(keyspace || defaultKeyspace){
					case 32:
						return _hash32(str);
					case 64:
						return _hash64(str);
					case 128:
						return _hash128(str);
					case 256:
						return _hash256(str);
					case 512:
						return _hash512(str);
					case 1024:
						return _hash1024(str);
					default:
						return _hash52(str);
				}
			}

			function setKeyspace(keyspace) {
				if (keyspace === 52 || fnvConstants[keyspace]) {
					defaultKeyspace = keyspace;
				} else {
					throw new Error('Supported FNV keyspacs: 32, 52, 64, 128, 256, 512, and 1024 bit');
				}
			}

			function setVersion(_version) {
				if (_version === '1a' ) {
					version = _version;
					_hash32   = useUTF8 ? _hash32_1a_utf   : _hash32_1a;
					_hash52   = useUTF8 ? _hash52_1a_utf   : _hash52_1a;
					_hash64   = useUTF8 ? _hash64_1a_utf   : _hash64_1a;
					_hash128  = useUTF8 ? _hash128_1a_utf  : _hash128_1a;
					_hash256  = useUTF8 ? _hash256_1a_utf  : _hash256_1a;
					_hash512  = useUTF8 ? _hash512_1a_utf  : _hash512_1a;
					_hash1024 = useUTF8 ? _hash1024_1a_utf : _hash1024_1a;
				} else if (_version === '1') {
					version = _version;
					_hash32   = useUTF8 ? _hash32_1_utf   : _hash32_1;
					_hash52   = useUTF8 ? _hash52_1_utf   : _hash52_1;
					_hash64   = useUTF8 ? _hash64_1_utf   : _hash64_1;
					_hash128  = useUTF8 ? _hash128_1_utf  : _hash128_1;
					_hash256  = useUTF8 ? _hash256_1_utf  : _hash256_1;
					_hash512  = useUTF8 ? _hash512_1_utf  : _hash512_1;
					_hash1024 = useUTF8 ? _hash1024_1_utf : _hash1024_1;
				} else {
					throw new Error('Supported FNV versions: 1, 1a');
				}
			}

			function setUTF8(utf8) {
				if (utf8) {
					useUTF8 = true;
					_hash32   = version == '1a' ? _hash32_1a_utf   : _hash32_1_utf;
					_hash52   = version == '1a' ? _hash52_1a_utf   : _hash52_1_utf;
					_hash64   = version == '1a' ? _hash64_1a_utf   : _hash64_1_utf;
					_hash128  = version == '1a' ? _hash128_1a_utf  : _hash128_1_utf;
					_hash256  = version == '1a' ? _hash256_1a_utf  : _hash256_1_utf;
					_hash512  = version == '1a' ? _hash512_1a_utf  : _hash512_1_utf;
					_hash1024 = version == '1a' ? _hash1024_1a_utf : _hash1024_1_utf;
				} else {
					useUTF8 = false;
					_hash32   = version == '1a' ? _hash32_1a   : _hash32_1;
					_hash52   = version == '1a' ? _hash52_1a   : _hash52_1;
					_hash64   = version == '1a' ? _hash64_1a   : _hash64_1;
					_hash128  = version == '1a' ? _hash128_1a  : _hash128_1;
					_hash256  = version == '1a' ? _hash256_1a  : _hash256_1;
					_hash512  = version == '1a' ? _hash512_1a  : _hash512_1;
					_hash1024 = version == '1a' ? _hash1024_1a : _hash1024_1;
				}
			}

			function seed(seed) {
				var oldVersion = version, res, i;

				seed = (seed || seed === 0) ? seed : referenceSeed;

				if (seed === referenceSeed) setVersion('1');

				for (var keysize in fnvConstants) {
					fnvConstants[keysize].offset = [];
					for(i = 0; i < keysize / 16; i++){
						fnvConstants[keysize].offset[i]	= 0;
					}
					res = hash(seed, parseInt(keysize, 10)).hex();
					for(i = 0; i < keysize / 16; i++){
						fnvConstants[keysize].offset[i]	= parseInt(res.substr(i*4,4), 16);
					}
				}

				setVersion(oldVersion);
			}

			/**
			 * Implementation without library overhead.
			 */

			function _hash32_1a_fast(str) {
				var i, l = str.length-3, t0=0,v0=0x9dc5,t1=0,v1=0x811c;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}


				return ((v1<<16)>>>0)+v0;
			}

			function _hash32_1a_fast_hex(str) {
				var i, l = str.length-3, t0=0,v0=0x9dc5,t1=0,v1=0x811c;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}


				return hl[(v1>>>8)&255]+hl[v1&255]+hl[(v0>>>8)&255]+hl[v0&255];
			}

			function _hash52_1a_fast(str){
				var i,l=str.length-3,t0=0,v0=0x2325,t1=0,v1=0x8422,t2=0,v2=0x9ce4,t3=0,v3=0xcbf2;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return (v3&15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0^(v3>>4));
			}

			function _hash52_1a_fast_hex(str){
				var i,l=str.length-3,t0=0,v0=0x2325,t1=0,v1=0x8422,t2=0,v2=0x9ce4,t3=0,v3=0xcbf2;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hl16[v3&15]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[(v0>>8)^(v3>>12)]+hl[(v0^(v3>>4))&255];
			}

			function _hash64_1a_fast(str){
				var i,l=str.length-3,t0=0,v0=0x2325,t1=0,v1=0x8422,t2=0,v2=0x9ce4,t3=0,v3=0xcbf2;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255];
			}

			function _hash32_1a_fast_utf(str) {
				var c,i,l=str.length,t0=0,v0=0x9dc5,t1=0,v1=0x811c;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}

				return ((v1<<16)>>>0)+v0;
			}

			function _hash32_1a_fast_hex_utf(str) {
				var c,i,l=str.length,t0=0,v0=0x9dc5,t1=0,v1=0x811c;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}


				return hl[(v1>>>8)&255]+hl[v1&255]+hl[(v0>>>8)&255]+hl[v0&255];
			}

			function _hash52_1a_fast_utf(str){
				var c,i,l=str.length,t0=0,v0=0x2325,t1=0,v1=0x8422,t2=0,v2=0x9ce4,t3=0,v3=0xcbf2;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return (v3&15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0^(v3>>4));
			}

			function _hash52_1a_fast_hex_utf (str){
				var c,i,l=str.length,t0=0,v0=0x2325,t1=0,v1=0x8422,t2=0,v2=0x9ce4,t3=0,v3=0xcbf2;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hl16[v3&15]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[(v0>>8)^(v3>>12)]+hl[(v0^(v3>>4))&255];
			}

			function _hash64_1a_fast_utf(str){
				var c,i,l=str.length,t0=0,v0=0x2325,t1=0,v1=0x8422,t2=0,v2=0x9ce4,t3=0,v3=0xcbf2;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255];
			}
			/**
			 * Regular functions. This versions are accessible through API
			 */

			function _hash32_1a(str){
				var i,l=str.length-3,s=fnvConstants[32].offset,t0=0,v0=s[1]|0,t1=0,v1=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}

				return hashValInt32(((v1<<16)>>>0)+v0,32);
			}

			function _hash32_1(str){
				var i,l=str.length-3,s=fnvConstants[32].offset,t0=0,v0=s[1]|0,t1=0,v1=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValInt32(((v1<<16)>>>0)+v0,32);
			}

			function _hash32_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[32].offset,t0=0,v0=s[1]|0,t1=0,v1=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}

				return hashValInt32(((v1<<16)>>>0)+v0,32);
			}

			function _hash32_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[32].offset,t0=0,v0=s[1]|0,t1=0,v1=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValInt32(((v1<<16)>>>0)+v0,32);
			}

			_hash32 = _hash32_1a;

			function _hash52_1a(str){
				var i,l=str.length-3,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hashValInt52((v3&15)*281474976710656+v2*4294967296+v1*65536+(v0^(v3>>4)),52);
			}

			function _hash52_1(str){
				var i,l=str.length-3,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValInt52((v3&15)*281474976710656+v2*4294967296+v1*65536+(v0^(v3>>4)),52);
			}

			function _hash52_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hashValInt52((v3&15)*281474976710656+v2*4294967296+v1*65536+(v0^(v3>>4)),52);
			}

			function _hash52_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValInt52((v3&15)*281474976710656+v2*4294967296+v1*65536+(v0^(v3>>4)),52);
			}

			_hash52 = _hash52_1a;

			function _hash64_1a(str){
				var i,l=str.length-3,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hashValHex(hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],64);
			}

			function _hash64_1(str){
				var i,l=str.length-3,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValHex(hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],64);
			}

			function _hash64_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hashValHex(hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],64);
			}

			function _hash64_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValHex(hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],64);
			}

			_hash64 = _hash64_1a;

			function _hash128_1a(str){
				var i,l=str.length-3,s=fnvConstants[128].offset,t0=0,v0=s[7]|0,t1=0,v1=s[6]|0,t2=0,v2=s[5]|0,t3=0,v3=s[4]|0,t4=0,v4=s[3]|0,t5=0,v5=s[2]|0,t6=0,v6=s[1]|0,t7=0,v7=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
				}

				return hashValHex(hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],128);
			}

			function _hash128_1(str){
				var i,l=str.length-3,s=fnvConstants[128].offset,t0=0,v0=s[7]|0,t1=0,v1=s[6]|0,t2=0,v2=s[5]|0,t3=0,v3=s[4]|0,t4=0,v4=s[3]|0,t5=0,v5=s[2]|0,t6=0,v6=s[1]|0,t7=0,v7=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValHex(hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],128);
			}

			function _hash128_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[128].offset,t0=0,v0=s[7]|0,t1=0,v1=s[6]|0,t2=0,v2=s[5]|0,t3=0,v3=s[4]|0,t4=0,v4=s[3]|0,t5=0,v5=s[2]|0,t6=0,v6=s[1]|0,t7=0,v7=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=(c&63)|128;
					}
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
				}

				return hashValHex(hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],128);
			}

			function _hash128_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[128].offset,t0=0,v0=s[7]|0,t1=0,v1=s[6]|0,t2=0,v2=s[5]|0,t3=0,v3=s[4]|0,t4=0,v4=s[3]|0,t5=0,v5=s[2]|0,t6=0,v6=s[1]|0,t7=0,v7=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValHex(hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],128);
			}

			_hash128 = _hash128_1a;

			function _hash256_1a(str){
				var i,l=str.length-3,s=fnvConstants[256].offset,t0=0,v0=s[15]|0,t1=0,v1=s[14]|0,t2=0,v2=s[13]|0,t3=0,v3=s[12]|0,t4=0,v4=s[11]|0,t5=0,v5=s[10]|0,t6=0,v6=s[9]|0,t7=0,v7=s[8]|0,t8=0,v8=s[7]|0,t9=0,v9=s[6]|0,t10=0,v10=s[5]|0,t11=0,v11=s[4]|0,t12=0,v12=s[3]|0,t13=0,v13=s[2]|0,t14=0,v14=s[1]|0,t15=0,v15=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
				}

				return hashValHex(hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],256);
			}

			function _hash256_1(str){
				var i,l=str.length-3,s=fnvConstants[256].offset,t0=0,v0=s[15]|0,t1=0,v1=s[14]|0,t2=0,v2=s[13]|0,t3=0,v3=s[12]|0,t4=0,v4=s[11]|0,t5=0,v5=s[10]|0,t6=0,v6=s[9]|0,t7=0,v7=s[8]|0,t8=0,v8=s[7]|0,t9=0,v9=s[6]|0,t10=0,v10=s[5]|0,t11=0,v11=s[4]|0,t12=0,v12=s[3]|0,t13=0,v13=s[2]|0,t14=0,v14=s[1]|0,t15=0,v15=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValHex(hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],256);
			}

			function _hash256_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[256].offset,t0=0,v0=s[15]|0,t1=0,v1=s[14]|0,t2=0,v2=s[13]|0,t3=0,v3=s[12]|0,t4=0,v4=s[11]|0,t5=0,v5=s[10]|0,t6=0,v6=s[9]|0,t7=0,v7=s[8]|0,t8=0,v8=s[7]|0,t9=0,v9=s[6]|0,t10=0,v10=s[5]|0,t11=0,v11=s[4]|0,t12=0,v12=s[3]|0,t13=0,v13=s[2]|0,t14=0,v14=s[1]|0,t15=0,v15=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=(c&63)|128;
					}
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
				}

				return hashValHex(hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],256);
			}

			function _hash256_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[256].offset,t0=0,v0=s[15]|0,t1=0,v1=s[14]|0,t2=0,v2=s[13]|0,t3=0,v3=s[12]|0,t4=0,v4=s[11]|0,t5=0,v5=s[10]|0,t6=0,v6=s[9]|0,t7=0,v7=s[8]|0,t8=0,v8=s[7]|0,t9=0,v9=s[6]|0,t10=0,v10=s[5]|0,t11=0,v11=s[4]|0,t12=0,v12=s[3]|0,t13=0,v13=s[2]|0,t14=0,v14=s[1]|0,t15=0,v15=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValHex(hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],256);
			}

			_hash256 = _hash256_1a;

			function _hash512_1a(str){
				var i,l=str.length-3,s=fnvConstants[512].offset,t0=0,v0=s[31]|0,t1=0,v1=s[30]|0,t2=0,v2=s[29]|0,t3=0,v3=s[28]|0,t4=0,v4=s[27]|0,t5=0,v5=s[26]|0,t6=0,v6=s[25]|0,t7=0,v7=s[24]|0,t8=0,v8=s[23]|0,t9=0,v9=s[22]|0,t10=0,v10=s[21]|0,t11=0,v11=s[20]|0,t12=0,v12=s[19]|0,t13=0,v13=s[18]|0,t14=0,v14=s[17]|0,t15=0,v15=s[16]|0,t16=0,v16=s[15]|0,t17=0,v17=s[14]|0,t18=0,v18=s[13]|0,t19=0,v19=s[12]|0,t20=0,v20=s[11]|0,t21=0,v21=s[10]|0,t22=0,v22=s[9]|0,t23=0,v23=s[8]|0,t24=0,v24=s[7]|0,t25=0,v25=s[6]|0,t26=0,v26=s[5]|0,t27=0,v27=s[4]|0,t28=0,v28=s[3]|0,t29=0,v29=s[2]|0,t30=0,v30=s[1]|0,t31=0,v31=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
				}

				return hashValHex(hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],512);
			}

			function _hash512_1(str){
				var i,l=str.length-3,s=fnvConstants[512].offset,t0=0,v0=s[31]|0,t1=0,v1=s[30]|0,t2=0,v2=s[29]|0,t3=0,v3=s[28]|0,t4=0,v4=s[27]|0,t5=0,v5=s[26]|0,t6=0,v6=s[25]|0,t7=0,v7=s[24]|0,t8=0,v8=s[23]|0,t9=0,v9=s[22]|0,t10=0,v10=s[21]|0,t11=0,v11=s[20]|0,t12=0,v12=s[19]|0,t13=0,v13=s[18]|0,t14=0,v14=s[17]|0,t15=0,v15=s[16]|0,t16=0,v16=s[15]|0,t17=0,v17=s[14]|0,t18=0,v18=s[13]|0,t19=0,v19=s[12]|0,t20=0,v20=s[11]|0,t21=0,v21=s[10]|0,t22=0,v22=s[9]|0,t23=0,v23=s[8]|0,t24=0,v24=s[7]|0,t25=0,v25=s[6]|0,t26=0,v26=s[5]|0,t27=0,v27=s[4]|0,t28=0,v28=s[3]|0,t29=0,v29=s[2]|0,t30=0,v30=s[1]|0,t31=0,v31=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValHex(hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],512);
			}

			function _hash512_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[512].offset,t0=0,v0=s[31]|0,t1=0,v1=s[30]|0,t2=0,v2=s[29]|0,t3=0,v3=s[28]|0,t4=0,v4=s[27]|0,t5=0,v5=s[26]|0,t6=0,v6=s[25]|0,t7=0,v7=s[24]|0,t8=0,v8=s[23]|0,t9=0,v9=s[22]|0,t10=0,v10=s[21]|0,t11=0,v11=s[20]|0,t12=0,v12=s[19]|0,t13=0,v13=s[18]|0,t14=0,v14=s[17]|0,t15=0,v15=s[16]|0,t16=0,v16=s[15]|0,t17=0,v17=s[14]|0,t18=0,v18=s[13]|0,t19=0,v19=s[12]|0,t20=0,v20=s[11]|0,t21=0,v21=s[10]|0,t22=0,v22=s[9]|0,t23=0,v23=s[8]|0,t24=0,v24=s[7]|0,t25=0,v25=s[6]|0,t26=0,v26=s[5]|0,t27=0,v27=s[4]|0,t28=0,v28=s[3]|0,t29=0,v29=s[2]|0,t30=0,v30=s[1]|0,t31=0,v31=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=(c&63)|128;
					}
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
				}

				return hashValHex(hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],512);
			}

			function _hash512_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[512].offset,t0=0,v0=s[31]|0,t1=0,v1=s[30]|0,t2=0,v2=s[29]|0,t3=0,v3=s[28]|0,t4=0,v4=s[27]|0,t5=0,v5=s[26]|0,t6=0,v6=s[25]|0,t7=0,v7=s[24]|0,t8=0,v8=s[23]|0,t9=0,v9=s[22]|0,t10=0,v10=s[21]|0,t11=0,v11=s[20]|0,t12=0,v12=s[19]|0,t13=0,v13=s[18]|0,t14=0,v14=s[17]|0,t15=0,v15=s[16]|0,t16=0,v16=s[15]|0,t17=0,v17=s[14]|0,t18=0,v18=s[13]|0,t19=0,v19=s[12]|0,t20=0,v20=s[11]|0,t21=0,v21=s[10]|0,t22=0,v22=s[9]|0,t23=0,v23=s[8]|0,t24=0,v24=s[7]|0,t25=0,v25=s[6]|0,t26=0,v26=s[5]|0,t27=0,v27=s[4]|0,t28=0,v28=s[3]|0,t29=0,v29=s[2]|0,t30=0,v30=s[1]|0,t31=0,v31=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValHex(hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],512);
			}

			_hash512 = _hash512_1a;

			function _hash1024_1a(str){
				var i,l=str.length-3,s=fnvConstants[1024].offset,t0=0,v0=s[63]|0,t1=0,v1=s[62]|0,t2=0,v2=s[61]|0,t3=0,v3=s[60]|0,t4=0,v4=s[59]|0,t5=0,v5=s[58]|0,t6=0,v6=s[57]|0,t7=0,v7=s[56]|0,t8=0,v8=s[55]|0,t9=0,v9=s[54]|0,t10=0,v10=s[53]|0,t11=0,v11=s[52]|0,t12=0,v12=s[51]|0,t13=0,v13=s[50]|0,t14=0,v14=s[49]|0,t15=0,v15=s[48]|0,t16=0,v16=s[47]|0,t17=0,v17=s[46]|0,t18=0,v18=s[45]|0,t19=0,v19=s[44]|0,t20=0,v20=s[43]|0,t21=0,v21=s[42]|0,t22=0,v22=s[41]|0,t23=0,v23=s[40]|0,t24=0,v24=s[39]|0,t25=0,v25=s[38]|0,t26=0,v26=s[37]|0,t27=0,v27=s[36]|0,t28=0,v28=s[35]|0,t29=0,v29=s[34]|0,t30=0,v30=s[33]|0,t31=0,v31=s[32]|0,t32=0,v32=s[31]|0,t33=0,v33=s[30]|0,t34=0,v34=s[29]|0,t35=0,v35=s[28]|0,t36=0,v36=s[27]|0,t37=0,v37=s[26]|0,t38=0,v38=s[25]|0,t39=0,v39=s[24]|0,t40=0,v40=s[23]|0,t41=0,v41=s[22]|0,t42=0,v42=s[21]|0,t43=0,v43=s[20]|0,t44=0,v44=s[19]|0,t45=0,v45=s[18]|0,t46=0,v46=s[17]|0,t47=0,v47=s[16]|0,t48=0,v48=s[15]|0,t49=0,v49=s[14]|0,t50=0,v50=s[13]|0,t51=0,v51=s[12]|0,t52=0,v52=s[11]|0,t53=0,v53=s[10]|0,t54=0,v54=s[9]|0,t55=0,v55=s[8]|0,t56=0,v56=s[7]|0,t57=0,v57=s[6]|0,t58=0,v58=s[5]|0,t59=0,v59=s[4]|0,t60=0,v60=s[3]|0,t61=0,v61=s[2]|0,t62=0,v62=s[1]|0,t63=0,v63=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
				}

				return hashValHex(hl[v63>>8]+hl[v63&255]+hl[v62>>8]+hl[v62&255]+hl[v61>>8]+hl[v61&255]+hl[v60>>8]+hl[v60&255]+hl[v59>>8]+hl[v59&255]+hl[v58>>8]+hl[v58&255]+hl[v57>>8]+hl[v57&255]+hl[v56>>8]+hl[v56&255]+hl[v55>>8]+hl[v55&255]+hl[v54>>8]+hl[v54&255]+hl[v53>>8]+hl[v53&255]+hl[v52>>8]+hl[v52&255]+hl[v51>>8]+hl[v51&255]+hl[v50>>8]+hl[v50&255]+hl[v49>>8]+hl[v49&255]+hl[v48>>8]+hl[v48&255]+hl[v47>>8]+hl[v47&255]+hl[v46>>8]+hl[v46&255]+hl[v45>>8]+hl[v45&255]+hl[v44>>8]+hl[v44&255]+hl[v43>>8]+hl[v43&255]+hl[v42>>8]+hl[v42&255]+hl[v41>>8]+hl[v41&255]+hl[v40>>8]+hl[v40&255]+hl[v39>>8]+hl[v39&255]+hl[v38>>8]+hl[v38&255]+hl[v37>>8]+hl[v37&255]+hl[v36>>8]+hl[v36&255]+hl[v35>>8]+hl[v35&255]+hl[v34>>8]+hl[v34&255]+hl[v33>>8]+hl[v33&255]+hl[v32>>8]+hl[v32&255]+hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],1024);
			}

			function _hash1024_1(str){
				var i,l=str.length-3,s=fnvConstants[1024].offset,t0=0,v0=s[63]|0,t1=0,v1=s[62]|0,t2=0,v2=s[61]|0,t3=0,v3=s[60]|0,t4=0,v4=s[59]|0,t5=0,v5=s[58]|0,t6=0,v6=s[57]|0,t7=0,v7=s[56]|0,t8=0,v8=s[55]|0,t9=0,v9=s[54]|0,t10=0,v10=s[53]|0,t11=0,v11=s[52]|0,t12=0,v12=s[51]|0,t13=0,v13=s[50]|0,t14=0,v14=s[49]|0,t15=0,v15=s[48]|0,t16=0,v16=s[47]|0,t17=0,v17=s[46]|0,t18=0,v18=s[45]|0,t19=0,v19=s[44]|0,t20=0,v20=s[43]|0,t21=0,v21=s[42]|0,t22=0,v22=s[41]|0,t23=0,v23=s[40]|0,t24=0,v24=s[39]|0,t25=0,v25=s[38]|0,t26=0,v26=s[37]|0,t27=0,v27=s[36]|0,t28=0,v28=s[35]|0,t29=0,v29=s[34]|0,t30=0,v30=s[33]|0,t31=0,v31=s[32]|0,t32=0,v32=s[31]|0,t33=0,v33=s[30]|0,t34=0,v34=s[29]|0,t35=0,v35=s[28]|0,t36=0,v36=s[27]|0,t37=0,v37=s[26]|0,t38=0,v38=s[25]|0,t39=0,v39=s[24]|0,t40=0,v40=s[23]|0,t41=0,v41=s[22]|0,t42=0,v42=s[21]|0,t43=0,v43=s[20]|0,t44=0,v44=s[19]|0,t45=0,v45=s[18]|0,t46=0,v46=s[17]|0,t47=0,v47=s[16]|0,t48=0,v48=s[15]|0,t49=0,v49=s[14]|0,t50=0,v50=s[13]|0,t51=0,v51=s[12]|0,t52=0,v52=s[11]|0,t53=0,v53=s[10]|0,t54=0,v54=s[9]|0,t55=0,v55=s[8]|0,t56=0,v56=s[7]|0,t57=0,v57=s[6]|0,t58=0,v58=s[5]|0,t59=0,v59=s[4]|0,t60=0,v60=s[3]|0,t61=0,v61=s[2]|0,t62=0,v62=s[1]|0,t63=0,v63=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValHex(hl[v63>>8]+hl[v63&255]+hl[v62>>8]+hl[v62&255]+hl[v61>>8]+hl[v61&255]+hl[v60>>8]+hl[v60&255]+hl[v59>>8]+hl[v59&255]+hl[v58>>8]+hl[v58&255]+hl[v57>>8]+hl[v57&255]+hl[v56>>8]+hl[v56&255]+hl[v55>>8]+hl[v55&255]+hl[v54>>8]+hl[v54&255]+hl[v53>>8]+hl[v53&255]+hl[v52>>8]+hl[v52&255]+hl[v51>>8]+hl[v51&255]+hl[v50>>8]+hl[v50&255]+hl[v49>>8]+hl[v49&255]+hl[v48>>8]+hl[v48&255]+hl[v47>>8]+hl[v47&255]+hl[v46>>8]+hl[v46&255]+hl[v45>>8]+hl[v45&255]+hl[v44>>8]+hl[v44&255]+hl[v43>>8]+hl[v43&255]+hl[v42>>8]+hl[v42&255]+hl[v41>>8]+hl[v41&255]+hl[v40>>8]+hl[v40&255]+hl[v39>>8]+hl[v39&255]+hl[v38>>8]+hl[v38&255]+hl[v37>>8]+hl[v37&255]+hl[v36>>8]+hl[v36&255]+hl[v35>>8]+hl[v35&255]+hl[v34>>8]+hl[v34&255]+hl[v33>>8]+hl[v33&255]+hl[v32>>8]+hl[v32&255]+hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],1024);
			}

			function _hash1024_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[1024].offset,t0=0,v0=s[63]|0,t1=0,v1=s[62]|0,t2=0,v2=s[61]|0,t3=0,v3=s[60]|0,t4=0,v4=s[59]|0,t5=0,v5=s[58]|0,t6=0,v6=s[57]|0,t7=0,v7=s[56]|0,t8=0,v8=s[55]|0,t9=0,v9=s[54]|0,t10=0,v10=s[53]|0,t11=0,v11=s[52]|0,t12=0,v12=s[51]|0,t13=0,v13=s[50]|0,t14=0,v14=s[49]|0,t15=0,v15=s[48]|0,t16=0,v16=s[47]|0,t17=0,v17=s[46]|0,t18=0,v18=s[45]|0,t19=0,v19=s[44]|0,t20=0,v20=s[43]|0,t21=0,v21=s[42]|0,t22=0,v22=s[41]|0,t23=0,v23=s[40]|0,t24=0,v24=s[39]|0,t25=0,v25=s[38]|0,t26=0,v26=s[37]|0,t27=0,v27=s[36]|0,t28=0,v28=s[35]|0,t29=0,v29=s[34]|0,t30=0,v30=s[33]|0,t31=0,v31=s[32]|0,t32=0,v32=s[31]|0,t33=0,v33=s[30]|0,t34=0,v34=s[29]|0,t35=0,v35=s[28]|0,t36=0,v36=s[27]|0,t37=0,v37=s[26]|0,t38=0,v38=s[25]|0,t39=0,v39=s[24]|0,t40=0,v40=s[23]|0,t41=0,v41=s[22]|0,t42=0,v42=s[21]|0,t43=0,v43=s[20]|0,t44=0,v44=s[19]|0,t45=0,v45=s[18]|0,t46=0,v46=s[17]|0,t47=0,v47=s[16]|0,t48=0,v48=s[15]|0,t49=0,v49=s[14]|0,t50=0,v50=s[13]|0,t51=0,v51=s[12]|0,t52=0,v52=s[11]|0,t53=0,v53=s[10]|0,t54=0,v54=s[9]|0,t55=0,v55=s[8]|0,t56=0,v56=s[7]|0,t57=0,v57=s[6]|0,t58=0,v58=s[5]|0,t59=0,v59=s[4]|0,t60=0,v60=s[3]|0,t61=0,v61=s[2]|0,t62=0,v62=s[1]|0,t63=0,v63=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=(c&63)|128;
					}
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
				}

				return hashValHex(hl[v63>>8]+hl[v63&255]+hl[v62>>8]+hl[v62&255]+hl[v61>>8]+hl[v61&255]+hl[v60>>8]+hl[v60&255]+hl[v59>>8]+hl[v59&255]+hl[v58>>8]+hl[v58&255]+hl[v57>>8]+hl[v57&255]+hl[v56>>8]+hl[v56&255]+hl[v55>>8]+hl[v55&255]+hl[v54>>8]+hl[v54&255]+hl[v53>>8]+hl[v53&255]+hl[v52>>8]+hl[v52&255]+hl[v51>>8]+hl[v51&255]+hl[v50>>8]+hl[v50&255]+hl[v49>>8]+hl[v49&255]+hl[v48>>8]+hl[v48&255]+hl[v47>>8]+hl[v47&255]+hl[v46>>8]+hl[v46&255]+hl[v45>>8]+hl[v45&255]+hl[v44>>8]+hl[v44&255]+hl[v43>>8]+hl[v43&255]+hl[v42>>8]+hl[v42&255]+hl[v41>>8]+hl[v41&255]+hl[v40>>8]+hl[v40&255]+hl[v39>>8]+hl[v39&255]+hl[v38>>8]+hl[v38&255]+hl[v37>>8]+hl[v37&255]+hl[v36>>8]+hl[v36&255]+hl[v35>>8]+hl[v35&255]+hl[v34>>8]+hl[v34&255]+hl[v33>>8]+hl[v33&255]+hl[v32>>8]+hl[v32&255]+hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],1024);
			}

			function _hash1024_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[1024].offset,t0=0,v0=s[63]|0,t1=0,v1=s[62]|0,t2=0,v2=s[61]|0,t3=0,v3=s[60]|0,t4=0,v4=s[59]|0,t5=0,v5=s[58]|0,t6=0,v6=s[57]|0,t7=0,v7=s[56]|0,t8=0,v8=s[55]|0,t9=0,v9=s[54]|0,t10=0,v10=s[53]|0,t11=0,v11=s[52]|0,t12=0,v12=s[51]|0,t13=0,v13=s[50]|0,t14=0,v14=s[49]|0,t15=0,v15=s[48]|0,t16=0,v16=s[47]|0,t17=0,v17=s[46]|0,t18=0,v18=s[45]|0,t19=0,v19=s[44]|0,t20=0,v20=s[43]|0,t21=0,v21=s[42]|0,t22=0,v22=s[41]|0,t23=0,v23=s[40]|0,t24=0,v24=s[39]|0,t25=0,v25=s[38]|0,t26=0,v26=s[37]|0,t27=0,v27=s[36]|0,t28=0,v28=s[35]|0,t29=0,v29=s[34]|0,t30=0,v30=s[33]|0,t31=0,v31=s[32]|0,t32=0,v32=s[31]|0,t33=0,v33=s[30]|0,t34=0,v34=s[29]|0,t35=0,v35=s[28]|0,t36=0,v36=s[27]|0,t37=0,v37=s[26]|0,t38=0,v38=s[25]|0,t39=0,v39=s[24]|0,t40=0,v40=s[23]|0,t41=0,v41=s[22]|0,t42=0,v42=s[21]|0,t43=0,v43=s[20]|0,t44=0,v44=s[19]|0,t45=0,v45=s[18]|0,t46=0,v46=s[17]|0,t47=0,v47=s[16]|0,t48=0,v48=s[15]|0,t49=0,v49=s[14]|0,t50=0,v50=s[13]|0,t51=0,v51=s[12]|0,t52=0,v52=s[11]|0,t53=0,v53=s[10]|0,t54=0,v54=s[9]|0,t55=0,v55=s[8]|0,t56=0,v56=s[7]|0,t57=0,v57=s[6]|0,t58=0,v58=s[5]|0,t59=0,v59=s[4]|0,t60=0,v60=s[3]|0,t61=0,v61=s[2]|0,t62=0,v62=s[1]|0,t63=0,v63=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValHex(hl[v63>>8]+hl[v63&255]+hl[v62>>8]+hl[v62&255]+hl[v61>>8]+hl[v61&255]+hl[v60>>8]+hl[v60&255]+hl[v59>>8]+hl[v59&255]+hl[v58>>8]+hl[v58&255]+hl[v57>>8]+hl[v57&255]+hl[v56>>8]+hl[v56&255]+hl[v55>>8]+hl[v55&255]+hl[v54>>8]+hl[v54&255]+hl[v53>>8]+hl[v53&255]+hl[v52>>8]+hl[v52&255]+hl[v51>>8]+hl[v51&255]+hl[v50>>8]+hl[v50&255]+hl[v49>>8]+hl[v49&255]+hl[v48>>8]+hl[v48&255]+hl[v47>>8]+hl[v47&255]+hl[v46>>8]+hl[v46&255]+hl[v45>>8]+hl[v45&255]+hl[v44>>8]+hl[v44&255]+hl[v43>>8]+hl[v43&255]+hl[v42>>8]+hl[v42&255]+hl[v41>>8]+hl[v41&255]+hl[v40>>8]+hl[v40&255]+hl[v39>>8]+hl[v39&255]+hl[v38>>8]+hl[v38&255]+hl[v37>>8]+hl[v37&255]+hl[v36>>8]+hl[v36&255]+hl[v35>>8]+hl[v35&255]+hl[v34>>8]+hl[v34&255]+hl[v33>>8]+hl[v33&255]+hl[v32>>8]+hl[v32&255]+hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],1024);
			}

			_hash1024 = _hash1024_1a;

			// Init library.
			setVersion('1a');
			setUTF8(false);
			seed();

			return {
				hash: hash,
				setKeyspace: setKeyspace,
				version: setVersion,
				useUTF8: setUTF8,
				seed: seed,
				fast1a32: _hash32_1a_fast,
				fast1a32hex:_hash32_1a_fast_hex,
				fast1a52: _hash52_1a_fast,
				fast1a52hex: _hash52_1a_fast_hex,
				fast1a64: _hash64_1a_fast,
				fast1a32utf: _hash32_1a_fast_utf,
				fast1a32hexutf:_hash32_1a_fast_hex_utf,
				fast1a52utf: _hash52_1a_fast_utf,
				fast1a52hexutf: _hash52_1a_fast_hex_utf,
				fast1a64utf: _hash64_1a_fast_utf
			};
		})();

		module.exports = fnvplus; 
	} (fnvPlus));
	return fnvPlus.exports;
}

var hasRequiredCip4Js;

function requireCip4Js () {
	if (hasRequiredCip4Js) return cip4Js;
	hasRequiredCip4Js = 1;
	var __importDefault = (cip4Js && cip4Js.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(cip4Js, "__esModule", { value: true });
	const blake2b_1 = __importDefault(requireBlake2b());
	const buffer_crc32_1 = __importDefault(requireBufferCrc32());
	const fnv_plus_1 = requireFnvPlus();
	const ALPHA = `ABCDEJHKLNOPSTXZ`;
	function textPartFromBytes([a, b, c, d]) {
	    const letters = (x) => `${ALPHA[Math.floor(x / 16)]}${ALPHA[x % 16]}`;
	    const numbers = `${((c << 8) + d) % 10000}`.padStart(4, '0');
	    return `${letters(a)}${letters(b)}-${numbers}`;
	}
	function legacyWalletChecksum(publicKeyHash /* note: lowercase hex representation */) {
	    // ImagePart
	    const output = new Uint8Array(64);
	    const input = Buffer$1.from(publicKeyHash);
	    const ImagePart = blake2b_1.default(output.length).update(input).digest('hex');
	    // TextPart
	    const [a, b, c, d] = buffer_crc32_1.default(ImagePart);
	    const TextPart = textPartFromBytes([a, b, c, d]);
	    return { ImagePart, TextPart };
	}
	cip4Js.legacyWalletChecksum = legacyWalletChecksum;
	function toBytesInt32(int32) {
	    const byteArray = [0, 0, 0, 0];
	    for (let index = 0; index < byteArray.length; index++) {
	        const byte = int32 & 0xff;
	        byteArray[index] = byte;
	        int32 = (int32 - byte) / 256;
	    }
	    return byteArray;
	}
	function textPartFromWalletChecksumImagePart(walletChecksum) {
	    return textPartFromBytes(toBytesInt32(fnv_plus_1.fast1a32(walletChecksum)));
	}
	cip4Js.textPartFromWalletChecksumImagePart = textPartFromWalletChecksumImagePart;
	function hash(len, inp, msg) {
	    return blake2b_1.default(len, undefined, undefined, Buffer$1.from(msg) // personal
	    ).update(Buffer$1.from(inp)).digest('hex');
	}
	function hash44(s) {
	    const shortHash = hash(33, s, 'shorten checksum');
	    const buff1 = Array.from(Buffer$1.from(shortHash, 'hex').toString('base64'));
	    const requiredReplacementPositions = buff1
	        .map((c, i) => c === '+' || c === '/' ? i : -1)
	        .filter(i => i >= 0);
	    const reverse = s.split('').reverse().join('');
	    for (let i = 0; i < 100; i++) {
	        const shortHash2 = hash(39, `${reverse}${i}`, 'shorten checksum');
	        const buff2 = Array.from(Buffer$1.from(shortHash2, 'hex').toString('base64'));
	        const availableReplacements = buff2.filter(c => c !== '+' && c !== '/');
	        if (availableReplacements.length >= requiredReplacementPositions.length) {
	            requiredReplacementPositions.forEach((position, i) => {
	                buff1[position] = availableReplacements[i];
	            });
	            return buff1.join('');
	        }
	    }
	    return buff1.map(c => c === '+' ? 'a' : (c === '/' ? 'b' : c)).join('');
	}
	cip4Js.hash44 = hash44;
	function walletChecksum(publicKeyHash /* note: lowercase hex representation */) {
	    // ImagePart
	    const ImagePart = hash(64, publicKeyHash, 'wallets checksum');
	    // TextPart
	    const TextPart = textPartFromWalletChecksumImagePart(ImagePart);
	    return { ImagePart, TextPart };
	}
	cip4Js.walletChecksum = walletChecksum;
	return cip4Js;
}

requireCip4Js();

const createIRootKey = (pubBech32, prvBech32Encr) => {
  return {
    pub: pubBech32,
    prv: prvBech32Encr,
    v: "2"
  };
};

var src = {};

var sha256 = {};

var sha2 = {};

var _md = {};

var utils = {};

var crypto$1 = {};

var hasRequiredCrypto;

function requireCrypto () {
	if (hasRequiredCrypto) return crypto$1;
	hasRequiredCrypto = 1;
	Object.defineProperty(crypto$1, "__esModule", { value: true });
	crypto$1.crypto = void 0;
	crypto$1.crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;
	
	return crypto$1;
}

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	(function (exports) {
		/**
		 * Utilities for hex, bytes, CSPRNG.
		 * @module
		 */
		/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.Hash = exports.nextTick = exports.swap32IfBE = exports.byteSwapIfBE = exports.swap8IfBE = exports.isLE = void 0;
		exports.isBytes = isBytes;
		exports.anumber = anumber;
		exports.abytes = abytes;
		exports.ahash = ahash;
		exports.aexists = aexists;
		exports.aoutput = aoutput;
		exports.u8 = u8;
		exports.u32 = u32;
		exports.clean = clean;
		exports.createView = createView;
		exports.rotr = rotr;
		exports.rotl = rotl;
		exports.byteSwap = byteSwap;
		exports.byteSwap32 = byteSwap32;
		exports.bytesToHex = bytesToHex;
		exports.hexToBytes = hexToBytes;
		exports.asyncLoop = asyncLoop;
		exports.utf8ToBytes = utf8ToBytes;
		exports.bytesToUtf8 = bytesToUtf8;
		exports.toBytes = toBytes;
		exports.kdfInputToBytes = kdfInputToBytes;
		exports.concatBytes = concatBytes;
		exports.checkOpts = checkOpts;
		exports.createHasher = createHasher;
		exports.createOptHasher = createOptHasher;
		exports.createXOFer = createXOFer;
		exports.randomBytes = randomBytes;
		// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
		// node.js versions earlier than v19 don't declare it in global scope.
		// For node.js, package.json#exports field mapping rewrites import
		// from `crypto` to `cryptoNode`, which imports native module.
		// Makes the utils un-importable in browsers without a bundler.
		// Once node.js 18 is deprecated (2025-04-30), we can just drop the import.
		const crypto_1 = /*@__PURE__*/ requireCrypto();
		/** Checks if something is Uint8Array. Be careful: nodejs Buffer will return true. */
		function isBytes(a) {
		    return a instanceof Uint8Array || (ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array');
		}
		/** Asserts something is positive integer. */
		function anumber(n) {
		    if (!Number.isSafeInteger(n) || n < 0)
		        throw new Error('positive integer expected, got ' + n);
		}
		/** Asserts something is Uint8Array. */
		function abytes(b, ...lengths) {
		    if (!isBytes(b))
		        throw new Error('Uint8Array expected');
		    if (lengths.length > 0 && !lengths.includes(b.length))
		        throw new Error('Uint8Array expected of length ' + lengths + ', got length=' + b.length);
		}
		/** Asserts something is hash */
		function ahash(h) {
		    if (typeof h !== 'function' || typeof h.create !== 'function')
		        throw new Error('Hash should be wrapped by utils.createHasher');
		    anumber(h.outputLen);
		    anumber(h.blockLen);
		}
		/** Asserts a hash instance has not been destroyed / finished */
		function aexists(instance, checkFinished = true) {
		    if (instance.destroyed)
		        throw new Error('Hash instance has been destroyed');
		    if (checkFinished && instance.finished)
		        throw new Error('Hash#digest() has already been called');
		}
		/** Asserts output is properly-sized byte array */
		function aoutput(out, instance) {
		    abytes(out);
		    const min = instance.outputLen;
		    if (out.length < min) {
		        throw new Error('digestInto() expects output buffer of length at least ' + min);
		    }
		}
		/** Cast u8 / u16 / u32 to u8. */
		function u8(arr) {
		    return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
		}
		/** Cast u8 / u16 / u32 to u32. */
		function u32(arr) {
		    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
		}
		/** Zeroize a byte array. Warning: JS provides no guarantees. */
		function clean(...arrays) {
		    for (let i = 0; i < arrays.length; i++) {
		        arrays[i].fill(0);
		    }
		}
		/** Create DataView of an array for easy byte-level manipulation. */
		function createView(arr) {
		    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
		}
		/** The rotate right (circular right shift) operation for uint32 */
		function rotr(word, shift) {
		    return (word << (32 - shift)) | (word >>> shift);
		}
		/** The rotate left (circular left shift) operation for uint32 */
		function rotl(word, shift) {
		    return (word << shift) | ((word >>> (32 - shift)) >>> 0);
		}
		/** Is current platform little-endian? Most are. Big-Endian platform: IBM */
		exports.isLE = (() => new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44)();
		/** The byte swap operation for uint32 */
		function byteSwap(word) {
		    return (((word << 24) & 0xff000000) |
		        ((word << 8) & 0xff0000) |
		        ((word >>> 8) & 0xff00) |
		        ((word >>> 24) & 0xff));
		}
		/** Conditionally byte swap if on a big-endian platform */
		exports.swap8IfBE = exports.isLE
		    ? (n) => n
		    : (n) => byteSwap(n);
		/** @deprecated */
		exports.byteSwapIfBE = exports.swap8IfBE;
		/** In place byte swap for Uint32Array */
		function byteSwap32(arr) {
		    for (let i = 0; i < arr.length; i++) {
		        arr[i] = byteSwap(arr[i]);
		    }
		    return arr;
		}
		exports.swap32IfBE = exports.isLE
		    ? (u) => u
		    : byteSwap32;
		// Built-in hex conversion https://caniuse.com/mdn-javascript_builtins_uint8array_fromhex
		const hasHexBuiltin = /* @__PURE__ */ (() => 
		// @ts-ignore
		typeof Uint8Array.from([]).toHex === 'function' && typeof Uint8Array.fromHex === 'function')();
		// Array where index 0xf0 (240) is mapped to string 'f0'
		const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
		/**
		 * Convert byte array to hex string. Uses built-in function, when available.
		 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
		 */
		function bytesToHex(bytes) {
		    abytes(bytes);
		    // @ts-ignore
		    if (hasHexBuiltin)
		        return bytes.toHex();
		    // pre-caching improves the speed 6x
		    let hex = '';
		    for (let i = 0; i < bytes.length; i++) {
		        hex += hexes[bytes[i]];
		    }
		    return hex;
		}
		// We use optimized technique to convert hex string to byte array
		const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
		function asciiToBase16(ch) {
		    if (ch >= asciis._0 && ch <= asciis._9)
		        return ch - asciis._0; // '2' => 50-48
		    if (ch >= asciis.A && ch <= asciis.F)
		        return ch - (asciis.A - 10); // 'B' => 66-(65-10)
		    if (ch >= asciis.a && ch <= asciis.f)
		        return ch - (asciis.a - 10); // 'b' => 98-(97-10)
		    return;
		}
		/**
		 * Convert hex string to byte array. Uses built-in function, when available.
		 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
		 */
		function hexToBytes(hex) {
		    if (typeof hex !== 'string')
		        throw new Error('hex string expected, got ' + typeof hex);
		    // @ts-ignore
		    if (hasHexBuiltin)
		        return Uint8Array.fromHex(hex);
		    const hl = hex.length;
		    const al = hl / 2;
		    if (hl % 2)
		        throw new Error('hex string expected, got unpadded hex of length ' + hl);
		    const array = new Uint8Array(al);
		    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
		        const n1 = asciiToBase16(hex.charCodeAt(hi));
		        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
		        if (n1 === undefined || n2 === undefined) {
		            const char = hex[hi] + hex[hi + 1];
		            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
		        }
		        array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
		    }
		    return array;
		}
		/**
		 * There is no setImmediate in browser and setTimeout is slow.
		 * Call of async fn will return Promise, which will be fullfiled only on
		 * next scheduler queue processing step and this is exactly what we need.
		 */
		const nextTick = async () => { };
		exports.nextTick = nextTick;
		/** Returns control to thread each 'tick' ms to avoid blocking. */
		async function asyncLoop(iters, tick, cb) {
		    let ts = Date.now();
		    for (let i = 0; i < iters; i++) {
		        cb(i);
		        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
		        const diff = Date.now() - ts;
		        if (diff >= 0 && diff < tick)
		            continue;
		        await (0, exports.nextTick)();
		        ts += diff;
		    }
		}
		/**
		 * Converts string to bytes using UTF8 encoding.
		 * @example utf8ToBytes('abc') // Uint8Array.from([97, 98, 99])
		 */
		function utf8ToBytes(str) {
		    if (typeof str !== 'string')
		        throw new Error('string expected');
		    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
		}
		/**
		 * Converts bytes to string using UTF8 encoding.
		 * @example bytesToUtf8(Uint8Array.from([97, 98, 99])) // 'abc'
		 */
		function bytesToUtf8(bytes) {
		    return new TextDecoder().decode(bytes);
		}
		/**
		 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
		 * Warning: when Uint8Array is passed, it would NOT get copied.
		 * Keep in mind for future mutable operations.
		 */
		function toBytes(data) {
		    if (typeof data === 'string')
		        data = utf8ToBytes(data);
		    abytes(data);
		    return data;
		}
		/**
		 * Helper for KDFs: consumes uint8array or string.
		 * When string is passed, does utf8 decoding, using TextDecoder.
		 */
		function kdfInputToBytes(data) {
		    if (typeof data === 'string')
		        data = utf8ToBytes(data);
		    abytes(data);
		    return data;
		}
		/** Copies several Uint8Arrays into one. */
		function concatBytes(...arrays) {
		    let sum = 0;
		    for (let i = 0; i < arrays.length; i++) {
		        const a = arrays[i];
		        abytes(a);
		        sum += a.length;
		    }
		    const res = new Uint8Array(sum);
		    for (let i = 0, pad = 0; i < arrays.length; i++) {
		        const a = arrays[i];
		        res.set(a, pad);
		        pad += a.length;
		    }
		    return res;
		}
		function checkOpts(defaults, opts) {
		    if (opts !== undefined && {}.toString.call(opts) !== '[object Object]')
		        throw new Error('options should be object or undefined');
		    const merged = Object.assign(defaults, opts);
		    return merged;
		}
		/** For runtime check if class implements interface */
		class Hash {
		}
		exports.Hash = Hash;
		/** Wraps hash function, creating an interface on top of it */
		function createHasher(hashCons) {
		    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
		    const tmp = hashCons();
		    hashC.outputLen = tmp.outputLen;
		    hashC.blockLen = tmp.blockLen;
		    hashC.create = () => hashCons();
		    return hashC;
		}
		function createOptHasher(hashCons) {
		    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
		    const tmp = hashCons({});
		    hashC.outputLen = tmp.outputLen;
		    hashC.blockLen = tmp.blockLen;
		    hashC.create = (opts) => hashCons(opts);
		    return hashC;
		}
		function createXOFer(hashCons) {
		    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
		    const tmp = hashCons({});
		    hashC.outputLen = tmp.outputLen;
		    hashC.blockLen = tmp.blockLen;
		    hashC.create = (opts) => hashCons(opts);
		    return hashC;
		}
		exports.wrapConstructor = createHasher;
		exports.wrapConstructorWithOpts = createOptHasher;
		exports.wrapXOFConstructorWithOpts = createXOFer;
		/** Cryptographically secure PRNG. Uses internal OS-level `crypto.getRandomValues`. */
		function randomBytes(bytesLength = 32) {
		    if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === 'function') {
		        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
		    }
		    // Legacy Node.js compatibility
		    if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === 'function') {
		        return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
		    }
		    throw new Error('crypto.getRandomValues must be defined');
		}
		
	} (utils));
	return utils;
}

var hasRequired_md;

function require_md () {
	if (hasRequired_md) return _md;
	hasRequired_md = 1;
	Object.defineProperty(_md, "__esModule", { value: true });
	_md.SHA512_IV = _md.SHA384_IV = _md.SHA224_IV = _md.SHA256_IV = _md.HashMD = void 0;
	_md.setBigUint64 = setBigUint64;
	_md.Chi = Chi;
	_md.Maj = Maj;
	/**
	 * Internal Merkle-Damgard hash utils.
	 * @module
	 */
	const utils_ts_1 = /*@__PURE__*/ requireUtils();
	/** Polyfill for Safari 14. https://caniuse.com/mdn-javascript_builtins_dataview_setbiguint64 */
	function setBigUint64(view, byteOffset, value, isLE) {
	    if (typeof view.setBigUint64 === 'function')
	        return view.setBigUint64(byteOffset, value, isLE);
	    const _32n = BigInt(32);
	    const _u32_max = BigInt(0xffffffff);
	    const wh = Number((value >> _32n) & _u32_max);
	    const wl = Number(value & _u32_max);
	    const h = isLE ? 4 : 0;
	    const l = isLE ? 0 : 4;
	    view.setUint32(byteOffset + h, wh, isLE);
	    view.setUint32(byteOffset + l, wl, isLE);
	}
	/** Choice: a ? b : c */
	function Chi(a, b, c) {
	    return (a & b) ^ (~a & c);
	}
	/** Majority function, true if any two inputs is true. */
	function Maj(a, b, c) {
	    return (a & b) ^ (a & c) ^ (b & c);
	}
	/**
	 * Merkle-Damgard hash construction base class.
	 * Could be used to create MD5, RIPEMD, SHA1, SHA2.
	 */
	class HashMD extends utils_ts_1.Hash {
	    constructor(blockLen, outputLen, padOffset, isLE) {
	        super();
	        this.finished = false;
	        this.length = 0;
	        this.pos = 0;
	        this.destroyed = false;
	        this.blockLen = blockLen;
	        this.outputLen = outputLen;
	        this.padOffset = padOffset;
	        this.isLE = isLE;
	        this.buffer = new Uint8Array(blockLen);
	        this.view = (0, utils_ts_1.createView)(this.buffer);
	    }
	    update(data) {
	        (0, utils_ts_1.aexists)(this);
	        data = (0, utils_ts_1.toBytes)(data);
	        (0, utils_ts_1.abytes)(data);
	        const { view, buffer, blockLen } = this;
	        const len = data.length;
	        for (let pos = 0; pos < len;) {
	            const take = Math.min(blockLen - this.pos, len - pos);
	            // Fast path: we have at least one block in input, cast it to view and process
	            if (take === blockLen) {
	                const dataView = (0, utils_ts_1.createView)(data);
	                for (; blockLen <= len - pos; pos += blockLen)
	                    this.process(dataView, pos);
	                continue;
	            }
	            buffer.set(data.subarray(pos, pos + take), this.pos);
	            this.pos += take;
	            pos += take;
	            if (this.pos === blockLen) {
	                this.process(view, 0);
	                this.pos = 0;
	            }
	        }
	        this.length += data.length;
	        this.roundClean();
	        return this;
	    }
	    digestInto(out) {
	        (0, utils_ts_1.aexists)(this);
	        (0, utils_ts_1.aoutput)(out, this);
	        this.finished = true;
	        // Padding
	        // We can avoid allocation of buffer for padding completely if it
	        // was previously not allocated here. But it won't change performance.
	        const { buffer, view, blockLen, isLE } = this;
	        let { pos } = this;
	        // append the bit '1' to the message
	        buffer[pos++] = 0b10000000;
	        (0, utils_ts_1.clean)(this.buffer.subarray(pos));
	        // we have less than padOffset left in buffer, so we cannot put length in
	        // current block, need process it and pad again
	        if (this.padOffset > blockLen - pos) {
	            this.process(view, 0);
	            pos = 0;
	        }
	        // Pad until full block byte with zeros
	        for (let i = pos; i < blockLen; i++)
	            buffer[i] = 0;
	        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
	        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
	        // So we just write lowest 64 bits of that value.
	        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
	        this.process(view, 0);
	        const oview = (0, utils_ts_1.createView)(out);
	        const len = this.outputLen;
	        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
	        if (len % 4)
	            throw new Error('_sha2: outputLen should be aligned to 32bit');
	        const outLen = len / 4;
	        const state = this.get();
	        if (outLen > state.length)
	            throw new Error('_sha2: outputLen bigger than state');
	        for (let i = 0; i < outLen; i++)
	            oview.setUint32(4 * i, state[i], isLE);
	    }
	    digest() {
	        const { buffer, outputLen } = this;
	        this.digestInto(buffer);
	        const res = buffer.slice(0, outputLen);
	        this.destroy();
	        return res;
	    }
	    _cloneInto(to) {
	        to || (to = new this.constructor());
	        to.set(...this.get());
	        const { blockLen, buffer, length, finished, destroyed, pos } = this;
	        to.destroyed = destroyed;
	        to.finished = finished;
	        to.length = length;
	        to.pos = pos;
	        if (length % blockLen)
	            to.buffer.set(buffer);
	        return to;
	    }
	    clone() {
	        return this._cloneInto();
	    }
	}
	_md.HashMD = HashMD;
	/**
	 * Initial SHA-2 state: fractional parts of square roots of first 16 primes 2..53.
	 * Check out `test/misc/sha2-gen-iv.js` for recomputation guide.
	 */
	/** Initial SHA256 state. Bits 0..32 of frac part of sqrt of primes 2..19 */
	_md.SHA256_IV = Uint32Array.from([
	    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
	]);
	/** Initial SHA224 state. Bits 32..64 of frac part of sqrt of primes 23..53 */
	_md.SHA224_IV = Uint32Array.from([
	    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4,
	]);
	/** Initial SHA384 state. Bits 0..64 of frac part of sqrt of primes 23..53 */
	_md.SHA384_IV = Uint32Array.from([
	    0xcbbb9d5d, 0xc1059ed8, 0x629a292a, 0x367cd507, 0x9159015a, 0x3070dd17, 0x152fecd8, 0xf70e5939,
	    0x67332667, 0xffc00b31, 0x8eb44a87, 0x68581511, 0xdb0c2e0d, 0x64f98fa7, 0x47b5481d, 0xbefa4fa4,
	]);
	/** Initial SHA512 state. Bits 0..64 of frac part of sqrt of primes 2..19 */
	_md.SHA512_IV = Uint32Array.from([
	    0x6a09e667, 0xf3bcc908, 0xbb67ae85, 0x84caa73b, 0x3c6ef372, 0xfe94f82b, 0xa54ff53a, 0x5f1d36f1,
	    0x510e527f, 0xade682d1, 0x9b05688c, 0x2b3e6c1f, 0x1f83d9ab, 0xfb41bd6b, 0x5be0cd19, 0x137e2179,
	]);
	
	return _md;
}

var _u64 = {};

var hasRequired_u64;

function require_u64 () {
	if (hasRequired_u64) return _u64;
	hasRequired_u64 = 1;
	Object.defineProperty(_u64, "__esModule", { value: true });
	_u64.toBig = _u64.shrSL = _u64.shrSH = _u64.rotrSL = _u64.rotrSH = _u64.rotrBL = _u64.rotrBH = _u64.rotr32L = _u64.rotr32H = _u64.rotlSL = _u64.rotlSH = _u64.rotlBL = _u64.rotlBH = _u64.add5L = _u64.add5H = _u64.add4L = _u64.add4H = _u64.add3L = _u64.add3H = void 0;
	_u64.add = add;
	_u64.fromBig = fromBig;
	_u64.split = split;
	/**
	 * Internal helpers for u64. BigUint64Array is too slow as per 2025, so we implement it using Uint32Array.
	 * @todo re-check https://issues.chromium.org/issues/42212588
	 * @module
	 */
	const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
	const _32n = /* @__PURE__ */ BigInt(32);
	function fromBig(n, le = false) {
	    if (le)
	        return { h: Number(n & U32_MASK64), l: Number((n >> _32n) & U32_MASK64) };
	    return { h: Number((n >> _32n) & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
	}
	function split(lst, le = false) {
	    const len = lst.length;
	    let Ah = new Uint32Array(len);
	    let Al = new Uint32Array(len);
	    for (let i = 0; i < len; i++) {
	        const { h, l } = fromBig(lst[i], le);
	        [Ah[i], Al[i]] = [h, l];
	    }
	    return [Ah, Al];
	}
	const toBig = (h, l) => (BigInt(h >>> 0) << _32n) | BigInt(l >>> 0);
	_u64.toBig = toBig;
	// for Shift in [0, 32)
	const shrSH = (h, _l, s) => h >>> s;
	_u64.shrSH = shrSH;
	const shrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
	_u64.shrSL = shrSL;
	// Right rotate for Shift in [1, 32)
	const rotrSH = (h, l, s) => (h >>> s) | (l << (32 - s));
	_u64.rotrSH = rotrSH;
	const rotrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
	_u64.rotrSL = rotrSL;
	// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
	const rotrBH = (h, l, s) => (h << (64 - s)) | (l >>> (s - 32));
	_u64.rotrBH = rotrBH;
	const rotrBL = (h, l, s) => (h >>> (s - 32)) | (l << (64 - s));
	_u64.rotrBL = rotrBL;
	// Right rotate for shift===32 (just swaps l&h)
	const rotr32H = (_h, l) => l;
	_u64.rotr32H = rotr32H;
	const rotr32L = (h, _l) => h;
	_u64.rotr32L = rotr32L;
	// Left rotate for Shift in [1, 32)
	const rotlSH = (h, l, s) => (h << s) | (l >>> (32 - s));
	_u64.rotlSH = rotlSH;
	const rotlSL = (h, l, s) => (l << s) | (h >>> (32 - s));
	_u64.rotlSL = rotlSL;
	// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
	const rotlBH = (h, l, s) => (l << (s - 32)) | (h >>> (64 - s));
	_u64.rotlBH = rotlBH;
	const rotlBL = (h, l, s) => (h << (s - 32)) | (l >>> (64 - s));
	_u64.rotlBL = rotlBL;
	// JS uses 32-bit signed integers for bitwise operations which means we cannot
	// simple take carry out of low bit sum by shift, we need to use division.
	function add(Ah, Al, Bh, Bl) {
	    const l = (Al >>> 0) + (Bl >>> 0);
	    return { h: (Ah + Bh + ((l / 2 ** 32) | 0)) | 0, l: l | 0 };
	}
	// Addition with more than 2 elements
	const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
	_u64.add3L = add3L;
	const add3H = (low, Ah, Bh, Ch) => (Ah + Bh + Ch + ((low / 2 ** 32) | 0)) | 0;
	_u64.add3H = add3H;
	const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
	_u64.add4L = add4L;
	const add4H = (low, Ah, Bh, Ch, Dh) => (Ah + Bh + Ch + Dh + ((low / 2 ** 32) | 0)) | 0;
	_u64.add4H = add4H;
	const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
	_u64.add5L = add5L;
	const add5H = (low, Ah, Bh, Ch, Dh, Eh) => (Ah + Bh + Ch + Dh + Eh + ((low / 2 ** 32) | 0)) | 0;
	_u64.add5H = add5H;
	// prettier-ignore
	const u64 = {
	    fromBig, split, toBig,
	    shrSH, shrSL,
	    rotrSH, rotrSL, rotrBH, rotrBL,
	    rotr32H, rotr32L,
	    rotlSH, rotlSL, rotlBH, rotlBL,
	    add, add3L, add3H, add4L, add4H, add5H, add5L,
	};
	_u64.default = u64;
	
	return _u64;
}

var hasRequiredSha2;

function requireSha2 () {
	if (hasRequiredSha2) return sha2;
	hasRequiredSha2 = 1;
	Object.defineProperty(sha2, "__esModule", { value: true });
	sha2.sha512_224 = sha2.sha512_256 = sha2.sha384 = sha2.sha512 = sha2.sha224 = sha2.sha256 = sha2.SHA512_256 = sha2.SHA512_224 = sha2.SHA384 = sha2.SHA512 = sha2.SHA224 = sha2.SHA256 = void 0;
	/**
	 * SHA2 hash function. A.k.a. sha256, sha384, sha512, sha512_224, sha512_256.
	 * SHA256 is the fastest hash implementable in JS, even faster than Blake3.
	 * Check out [RFC 4634](https://datatracker.ietf.org/doc/html/rfc4634) and
	 * [FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).
	 * @module
	 */
	const _md_ts_1 = /*@__PURE__*/ require_md();
	const u64 = /*@__PURE__*/ require_u64();
	const utils_ts_1 = /*@__PURE__*/ requireUtils();
	/**
	 * Round constants:
	 * First 32 bits of fractional parts of the cube roots of the first 64 primes 2..311)
	 */
	// prettier-ignore
	const SHA256_K = /* @__PURE__ */ Uint32Array.from([
	    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
	]);
	/** Reusable temporary buffer. "W" comes straight from spec. */
	const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
	class SHA256 extends _md_ts_1.HashMD {
	    constructor(outputLen = 32) {
	        super(64, outputLen, 8, false);
	        // We cannot use array here since array allows indexing by variable
	        // which means optimizer/compiler cannot use registers.
	        this.A = _md_ts_1.SHA256_IV[0] | 0;
	        this.B = _md_ts_1.SHA256_IV[1] | 0;
	        this.C = _md_ts_1.SHA256_IV[2] | 0;
	        this.D = _md_ts_1.SHA256_IV[3] | 0;
	        this.E = _md_ts_1.SHA256_IV[4] | 0;
	        this.F = _md_ts_1.SHA256_IV[5] | 0;
	        this.G = _md_ts_1.SHA256_IV[6] | 0;
	        this.H = _md_ts_1.SHA256_IV[7] | 0;
	    }
	    get() {
	        const { A, B, C, D, E, F, G, H } = this;
	        return [A, B, C, D, E, F, G, H];
	    }
	    // prettier-ignore
	    set(A, B, C, D, E, F, G, H) {
	        this.A = A | 0;
	        this.B = B | 0;
	        this.C = C | 0;
	        this.D = D | 0;
	        this.E = E | 0;
	        this.F = F | 0;
	        this.G = G | 0;
	        this.H = H | 0;
	    }
	    process(view, offset) {
	        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
	        for (let i = 0; i < 16; i++, offset += 4)
	            SHA256_W[i] = view.getUint32(offset, false);
	        for (let i = 16; i < 64; i++) {
	            const W15 = SHA256_W[i - 15];
	            const W2 = SHA256_W[i - 2];
	            const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ (W15 >>> 3);
	            const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ (W2 >>> 10);
	            SHA256_W[i] = (s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16]) | 0;
	        }
	        // Compression function main loop, 64 rounds
	        let { A, B, C, D, E, F, G, H } = this;
	        for (let i = 0; i < 64; i++) {
	            const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
	            const T1 = (H + sigma1 + (0, _md_ts_1.Chi)(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
	            const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
	            const T2 = (sigma0 + (0, _md_ts_1.Maj)(A, B, C)) | 0;
	            H = G;
	            G = F;
	            F = E;
	            E = (D + T1) | 0;
	            D = C;
	            C = B;
	            B = A;
	            A = (T1 + T2) | 0;
	        }
	        // Add the compressed chunk to the current hash value
	        A = (A + this.A) | 0;
	        B = (B + this.B) | 0;
	        C = (C + this.C) | 0;
	        D = (D + this.D) | 0;
	        E = (E + this.E) | 0;
	        F = (F + this.F) | 0;
	        G = (G + this.G) | 0;
	        H = (H + this.H) | 0;
	        this.set(A, B, C, D, E, F, G, H);
	    }
	    roundClean() {
	        (0, utils_ts_1.clean)(SHA256_W);
	    }
	    destroy() {
	        this.set(0, 0, 0, 0, 0, 0, 0, 0);
	        (0, utils_ts_1.clean)(this.buffer);
	    }
	}
	sha2.SHA256 = SHA256;
	class SHA224 extends SHA256 {
	    constructor() {
	        super(28);
	        this.A = _md_ts_1.SHA224_IV[0] | 0;
	        this.B = _md_ts_1.SHA224_IV[1] | 0;
	        this.C = _md_ts_1.SHA224_IV[2] | 0;
	        this.D = _md_ts_1.SHA224_IV[3] | 0;
	        this.E = _md_ts_1.SHA224_IV[4] | 0;
	        this.F = _md_ts_1.SHA224_IV[5] | 0;
	        this.G = _md_ts_1.SHA224_IV[6] | 0;
	        this.H = _md_ts_1.SHA224_IV[7] | 0;
	    }
	}
	sha2.SHA224 = SHA224;
	// SHA2-512 is slower than sha256 in js because u64 operations are slow.
	// Round contants
	// First 32 bits of the fractional parts of the cube roots of the first 80 primes 2..409
	// prettier-ignore
	const K512 = /* @__PURE__ */ (() => u64.split([
	    '0x428a2f98d728ae22', '0x7137449123ef65cd', '0xb5c0fbcfec4d3b2f', '0xe9b5dba58189dbbc',
	    '0x3956c25bf348b538', '0x59f111f1b605d019', '0x923f82a4af194f9b', '0xab1c5ed5da6d8118',
	    '0xd807aa98a3030242', '0x12835b0145706fbe', '0x243185be4ee4b28c', '0x550c7dc3d5ffb4e2',
	    '0x72be5d74f27b896f', '0x80deb1fe3b1696b1', '0x9bdc06a725c71235', '0xc19bf174cf692694',
	    '0xe49b69c19ef14ad2', '0xefbe4786384f25e3', '0x0fc19dc68b8cd5b5', '0x240ca1cc77ac9c65',
	    '0x2de92c6f592b0275', '0x4a7484aa6ea6e483', '0x5cb0a9dcbd41fbd4', '0x76f988da831153b5',
	    '0x983e5152ee66dfab', '0xa831c66d2db43210', '0xb00327c898fb213f', '0xbf597fc7beef0ee4',
	    '0xc6e00bf33da88fc2', '0xd5a79147930aa725', '0x06ca6351e003826f', '0x142929670a0e6e70',
	    '0x27b70a8546d22ffc', '0x2e1b21385c26c926', '0x4d2c6dfc5ac42aed', '0x53380d139d95b3df',
	    '0x650a73548baf63de', '0x766a0abb3c77b2a8', '0x81c2c92e47edaee6', '0x92722c851482353b',
	    '0xa2bfe8a14cf10364', '0xa81a664bbc423001', '0xc24b8b70d0f89791', '0xc76c51a30654be30',
	    '0xd192e819d6ef5218', '0xd69906245565a910', '0xf40e35855771202a', '0x106aa07032bbd1b8',
	    '0x19a4c116b8d2d0c8', '0x1e376c085141ab53', '0x2748774cdf8eeb99', '0x34b0bcb5e19b48a8',
	    '0x391c0cb3c5c95a63', '0x4ed8aa4ae3418acb', '0x5b9cca4f7763e373', '0x682e6ff3d6b2b8a3',
	    '0x748f82ee5defb2fc', '0x78a5636f43172f60', '0x84c87814a1f0ab72', '0x8cc702081a6439ec',
	    '0x90befffa23631e28', '0xa4506cebde82bde9', '0xbef9a3f7b2c67915', '0xc67178f2e372532b',
	    '0xca273eceea26619c', '0xd186b8c721c0c207', '0xeada7dd6cde0eb1e', '0xf57d4f7fee6ed178',
	    '0x06f067aa72176fba', '0x0a637dc5a2c898a6', '0x113f9804bef90dae', '0x1b710b35131c471b',
	    '0x28db77f523047d84', '0x32caab7b40c72493', '0x3c9ebe0a15c9bebc', '0x431d67c49c100d4c',
	    '0x4cc5d4becb3e42b6', '0x597f299cfc657e2a', '0x5fcb6fab3ad6faec', '0x6c44198c4a475817'
	].map(n => BigInt(n))))();
	const SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
	const SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
	// Reusable temporary buffers
	const SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
	const SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
	class SHA512 extends _md_ts_1.HashMD {
	    constructor(outputLen = 64) {
	        super(128, outputLen, 16, false);
	        // We cannot use array here since array allows indexing by variable
	        // which means optimizer/compiler cannot use registers.
	        // h -- high 32 bits, l -- low 32 bits
	        this.Ah = _md_ts_1.SHA512_IV[0] | 0;
	        this.Al = _md_ts_1.SHA512_IV[1] | 0;
	        this.Bh = _md_ts_1.SHA512_IV[2] | 0;
	        this.Bl = _md_ts_1.SHA512_IV[3] | 0;
	        this.Ch = _md_ts_1.SHA512_IV[4] | 0;
	        this.Cl = _md_ts_1.SHA512_IV[5] | 0;
	        this.Dh = _md_ts_1.SHA512_IV[6] | 0;
	        this.Dl = _md_ts_1.SHA512_IV[7] | 0;
	        this.Eh = _md_ts_1.SHA512_IV[8] | 0;
	        this.El = _md_ts_1.SHA512_IV[9] | 0;
	        this.Fh = _md_ts_1.SHA512_IV[10] | 0;
	        this.Fl = _md_ts_1.SHA512_IV[11] | 0;
	        this.Gh = _md_ts_1.SHA512_IV[12] | 0;
	        this.Gl = _md_ts_1.SHA512_IV[13] | 0;
	        this.Hh = _md_ts_1.SHA512_IV[14] | 0;
	        this.Hl = _md_ts_1.SHA512_IV[15] | 0;
	    }
	    // prettier-ignore
	    get() {
	        const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
	        return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
	    }
	    // prettier-ignore
	    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
	        this.Ah = Ah | 0;
	        this.Al = Al | 0;
	        this.Bh = Bh | 0;
	        this.Bl = Bl | 0;
	        this.Ch = Ch | 0;
	        this.Cl = Cl | 0;
	        this.Dh = Dh | 0;
	        this.Dl = Dl | 0;
	        this.Eh = Eh | 0;
	        this.El = El | 0;
	        this.Fh = Fh | 0;
	        this.Fl = Fl | 0;
	        this.Gh = Gh | 0;
	        this.Gl = Gl | 0;
	        this.Hh = Hh | 0;
	        this.Hl = Hl | 0;
	    }
	    process(view, offset) {
	        // Extend the first 16 words into the remaining 64 words w[16..79] of the message schedule array
	        for (let i = 0; i < 16; i++, offset += 4) {
	            SHA512_W_H[i] = view.getUint32(offset);
	            SHA512_W_L[i] = view.getUint32((offset += 4));
	        }
	        for (let i = 16; i < 80; i++) {
	            // s0 := (w[i-15] rightrotate 1) xor (w[i-15] rightrotate 8) xor (w[i-15] rightshift 7)
	            const W15h = SHA512_W_H[i - 15] | 0;
	            const W15l = SHA512_W_L[i - 15] | 0;
	            const s0h = u64.rotrSH(W15h, W15l, 1) ^ u64.rotrSH(W15h, W15l, 8) ^ u64.shrSH(W15h, W15l, 7);
	            const s0l = u64.rotrSL(W15h, W15l, 1) ^ u64.rotrSL(W15h, W15l, 8) ^ u64.shrSL(W15h, W15l, 7);
	            // s1 := (w[i-2] rightrotate 19) xor (w[i-2] rightrotate 61) xor (w[i-2] rightshift 6)
	            const W2h = SHA512_W_H[i - 2] | 0;
	            const W2l = SHA512_W_L[i - 2] | 0;
	            const s1h = u64.rotrSH(W2h, W2l, 19) ^ u64.rotrBH(W2h, W2l, 61) ^ u64.shrSH(W2h, W2l, 6);
	            const s1l = u64.rotrSL(W2h, W2l, 19) ^ u64.rotrBL(W2h, W2l, 61) ^ u64.shrSL(W2h, W2l, 6);
	            // SHA256_W[i] = s0 + s1 + SHA256_W[i - 7] + SHA256_W[i - 16];
	            const SUMl = u64.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
	            const SUMh = u64.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
	            SHA512_W_H[i] = SUMh | 0;
	            SHA512_W_L[i] = SUMl | 0;
	        }
	        let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
	        // Compression function main loop, 80 rounds
	        for (let i = 0; i < 80; i++) {
	            // S1 := (e rightrotate 14) xor (e rightrotate 18) xor (e rightrotate 41)
	            const sigma1h = u64.rotrSH(Eh, El, 14) ^ u64.rotrSH(Eh, El, 18) ^ u64.rotrBH(Eh, El, 41);
	            const sigma1l = u64.rotrSL(Eh, El, 14) ^ u64.rotrSL(Eh, El, 18) ^ u64.rotrBL(Eh, El, 41);
	            //const T1 = (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
	            const CHIh = (Eh & Fh) ^ (~Eh & Gh);
	            const CHIl = (El & Fl) ^ (~El & Gl);
	            // T1 = H + sigma1 + Chi(E, F, G) + SHA512_K[i] + SHA512_W[i]
	            // prettier-ignore
	            const T1ll = u64.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
	            const T1h = u64.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
	            const T1l = T1ll | 0;
	            // S0 := (a rightrotate 28) xor (a rightrotate 34) xor (a rightrotate 39)
	            const sigma0h = u64.rotrSH(Ah, Al, 28) ^ u64.rotrBH(Ah, Al, 34) ^ u64.rotrBH(Ah, Al, 39);
	            const sigma0l = u64.rotrSL(Ah, Al, 28) ^ u64.rotrBL(Ah, Al, 34) ^ u64.rotrBL(Ah, Al, 39);
	            const MAJh = (Ah & Bh) ^ (Ah & Ch) ^ (Bh & Ch);
	            const MAJl = (Al & Bl) ^ (Al & Cl) ^ (Bl & Cl);
	            Hh = Gh | 0;
	            Hl = Gl | 0;
	            Gh = Fh | 0;
	            Gl = Fl | 0;
	            Fh = Eh | 0;
	            Fl = El | 0;
	            ({ h: Eh, l: El } = u64.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
	            Dh = Ch | 0;
	            Dl = Cl | 0;
	            Ch = Bh | 0;
	            Cl = Bl | 0;
	            Bh = Ah | 0;
	            Bl = Al | 0;
	            const All = u64.add3L(T1l, sigma0l, MAJl);
	            Ah = u64.add3H(All, T1h, sigma0h, MAJh);
	            Al = All | 0;
	        }
	        // Add the compressed chunk to the current hash value
	        ({ h: Ah, l: Al } = u64.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
	        ({ h: Bh, l: Bl } = u64.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
	        ({ h: Ch, l: Cl } = u64.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
	        ({ h: Dh, l: Dl } = u64.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
	        ({ h: Eh, l: El } = u64.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
	        ({ h: Fh, l: Fl } = u64.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
	        ({ h: Gh, l: Gl } = u64.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
	        ({ h: Hh, l: Hl } = u64.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
	        this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
	    }
	    roundClean() {
	        (0, utils_ts_1.clean)(SHA512_W_H, SHA512_W_L);
	    }
	    destroy() {
	        (0, utils_ts_1.clean)(this.buffer);
	        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	    }
	}
	sha2.SHA512 = SHA512;
	class SHA384 extends SHA512 {
	    constructor() {
	        super(48);
	        this.Ah = _md_ts_1.SHA384_IV[0] | 0;
	        this.Al = _md_ts_1.SHA384_IV[1] | 0;
	        this.Bh = _md_ts_1.SHA384_IV[2] | 0;
	        this.Bl = _md_ts_1.SHA384_IV[3] | 0;
	        this.Ch = _md_ts_1.SHA384_IV[4] | 0;
	        this.Cl = _md_ts_1.SHA384_IV[5] | 0;
	        this.Dh = _md_ts_1.SHA384_IV[6] | 0;
	        this.Dl = _md_ts_1.SHA384_IV[7] | 0;
	        this.Eh = _md_ts_1.SHA384_IV[8] | 0;
	        this.El = _md_ts_1.SHA384_IV[9] | 0;
	        this.Fh = _md_ts_1.SHA384_IV[10] | 0;
	        this.Fl = _md_ts_1.SHA384_IV[11] | 0;
	        this.Gh = _md_ts_1.SHA384_IV[12] | 0;
	        this.Gl = _md_ts_1.SHA384_IV[13] | 0;
	        this.Hh = _md_ts_1.SHA384_IV[14] | 0;
	        this.Hl = _md_ts_1.SHA384_IV[15] | 0;
	    }
	}
	sha2.SHA384 = SHA384;
	/**
	 * Truncated SHA512/256 and SHA512/224.
	 * SHA512_IV is XORed with 0xa5a5a5a5a5a5a5a5, then used as "intermediary" IV of SHA512/t.
	 * Then t hashes string to produce result IV.
	 * See `test/misc/sha2-gen-iv.js`.
	 */
	/** SHA512/224 IV */
	const T224_IV = /* @__PURE__ */ Uint32Array.from([
	    0x8c3d37c8, 0x19544da2, 0x73e19966, 0x89dcd4d6, 0x1dfab7ae, 0x32ff9c82, 0x679dd514, 0x582f9fcf,
	    0x0f6d2b69, 0x7bd44da8, 0x77e36f73, 0x04c48942, 0x3f9d85a8, 0x6a1d36c8, 0x1112e6ad, 0x91d692a1,
	]);
	/** SHA512/256 IV */
	const T256_IV = /* @__PURE__ */ Uint32Array.from([
	    0x22312194, 0xfc2bf72c, 0x9f555fa3, 0xc84c64c2, 0x2393b86b, 0x6f53b151, 0x96387719, 0x5940eabd,
	    0x96283ee2, 0xa88effe3, 0xbe5e1e25, 0x53863992, 0x2b0199fc, 0x2c85b8aa, 0x0eb72ddc, 0x81c52ca2,
	]);
	class SHA512_224 extends SHA512 {
	    constructor() {
	        super(28);
	        this.Ah = T224_IV[0] | 0;
	        this.Al = T224_IV[1] | 0;
	        this.Bh = T224_IV[2] | 0;
	        this.Bl = T224_IV[3] | 0;
	        this.Ch = T224_IV[4] | 0;
	        this.Cl = T224_IV[5] | 0;
	        this.Dh = T224_IV[6] | 0;
	        this.Dl = T224_IV[7] | 0;
	        this.Eh = T224_IV[8] | 0;
	        this.El = T224_IV[9] | 0;
	        this.Fh = T224_IV[10] | 0;
	        this.Fl = T224_IV[11] | 0;
	        this.Gh = T224_IV[12] | 0;
	        this.Gl = T224_IV[13] | 0;
	        this.Hh = T224_IV[14] | 0;
	        this.Hl = T224_IV[15] | 0;
	    }
	}
	sha2.SHA512_224 = SHA512_224;
	class SHA512_256 extends SHA512 {
	    constructor() {
	        super(32);
	        this.Ah = T256_IV[0] | 0;
	        this.Al = T256_IV[1] | 0;
	        this.Bh = T256_IV[2] | 0;
	        this.Bl = T256_IV[3] | 0;
	        this.Ch = T256_IV[4] | 0;
	        this.Cl = T256_IV[5] | 0;
	        this.Dh = T256_IV[6] | 0;
	        this.Dl = T256_IV[7] | 0;
	        this.Eh = T256_IV[8] | 0;
	        this.El = T256_IV[9] | 0;
	        this.Fh = T256_IV[10] | 0;
	        this.Fl = T256_IV[11] | 0;
	        this.Gh = T256_IV[12] | 0;
	        this.Gl = T256_IV[13] | 0;
	        this.Hh = T256_IV[14] | 0;
	        this.Hl = T256_IV[15] | 0;
	    }
	}
	sha2.SHA512_256 = SHA512_256;
	/**
	 * SHA2-256 hash function from RFC 4634.
	 *
	 * It is the fastest JS hash, even faster than Blake3.
	 * To break sha256 using birthday attack, attackers need to try 2^128 hashes.
	 * BTC network is doing 2^70 hashes/sec (2^95 hashes/year) as per 2025.
	 */
	sha2.sha256 = (0, utils_ts_1.createHasher)(() => new SHA256());
	/** SHA2-224 hash function from RFC 4634 */
	sha2.sha224 = (0, utils_ts_1.createHasher)(() => new SHA224());
	/** SHA2-512 hash function from RFC 4634. */
	sha2.sha512 = (0, utils_ts_1.createHasher)(() => new SHA512());
	/** SHA2-384 hash function from RFC 4634. */
	sha2.sha384 = (0, utils_ts_1.createHasher)(() => new SHA384());
	/**
	 * SHA2-512/256 "truncated" hash function, with improved resistance to length extension attacks.
	 * See the paper on [truncated SHA512](https://eprint.iacr.org/2010/548.pdf).
	 */
	sha2.sha512_256 = (0, utils_ts_1.createHasher)(() => new SHA512_256());
	/**
	 * SHA2-512/224 "truncated" hash function, with improved resistance to length extension attacks.
	 * See the paper on [truncated SHA512](https://eprint.iacr.org/2010/548.pdf).
	 */
	sha2.sha512_224 = (0, utils_ts_1.createHasher)(() => new SHA512_224());
	
	return sha2;
}

var hasRequiredSha256;

function requireSha256 () {
	if (hasRequiredSha256) return sha256;
	hasRequiredSha256 = 1;
	Object.defineProperty(sha256, "__esModule", { value: true });
	sha256.sha224 = sha256.SHA224 = sha256.sha256 = sha256.SHA256 = void 0;
	/**
	 * SHA2-256 a.k.a. sha256. In JS, it is the fastest hash, even faster than Blake3.
	 *
	 * To break sha256 using birthday attack, attackers need to try 2^128 hashes.
	 * BTC network is doing 2^70 hashes/sec (2^95 hashes/year) as per 2025.
	 *
	 * Check out [FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).
	 * @module
	 * @deprecated
	 */
	const sha2_ts_1 = /*@__PURE__*/ requireSha2();
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha256.SHA256 = sha2_ts_1.SHA256;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha256.sha256 = sha2_ts_1.sha256;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha256.SHA224 = sha2_ts_1.SHA224;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha256.sha224 = sha2_ts_1.sha224;
	
	return sha256;
}

var sha512 = {};

var hasRequiredSha512;

function requireSha512 () {
	if (hasRequiredSha512) return sha512;
	hasRequiredSha512 = 1;
	Object.defineProperty(sha512, "__esModule", { value: true });
	sha512.sha512_256 = sha512.SHA512_256 = sha512.sha512_224 = sha512.SHA512_224 = sha512.sha384 = sha512.SHA384 = sha512.sha512 = sha512.SHA512 = void 0;
	/**
	 * SHA2-512 a.k.a. sha512 and sha384. It is slower than sha256 in js because u64 operations are slow.
	 *
	 * Check out [RFC 4634](https://datatracker.ietf.org/doc/html/rfc4634) and
	 * [the paper on truncated SHA512/256](https://eprint.iacr.org/2010/548.pdf).
	 * @module
	 * @deprecated
	 */
	const sha2_ts_1 = /*@__PURE__*/ requireSha2();
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.SHA512 = sha2_ts_1.SHA512;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.sha512 = sha2_ts_1.sha512;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.SHA384 = sha2_ts_1.SHA384;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.sha384 = sha2_ts_1.sha384;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.SHA512_224 = sha2_ts_1.SHA512_224;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.sha512_224 = sha2_ts_1.sha512_224;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.SHA512_256 = sha2_ts_1.SHA512_256;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.sha512_256 = sha2_ts_1.sha512_256;
	
	return sha512;
}

var pbkdf2 = {};

var hmac = {};

var hasRequiredHmac;

function requireHmac () {
	if (hasRequiredHmac) return hmac;
	hasRequiredHmac = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.hmac = exports.HMAC = void 0;
		/**
		 * HMAC: RFC2104 message authentication code.
		 * @module
		 */
		const utils_ts_1 = /*@__PURE__*/ requireUtils();
		class HMAC extends utils_ts_1.Hash {
		    constructor(hash, _key) {
		        super();
		        this.finished = false;
		        this.destroyed = false;
		        (0, utils_ts_1.ahash)(hash);
		        const key = (0, utils_ts_1.toBytes)(_key);
		        this.iHash = hash.create();
		        if (typeof this.iHash.update !== 'function')
		            throw new Error('Expected instance of class which extends utils.Hash');
		        this.blockLen = this.iHash.blockLen;
		        this.outputLen = this.iHash.outputLen;
		        const blockLen = this.blockLen;
		        const pad = new Uint8Array(blockLen);
		        // blockLen can be bigger than outputLen
		        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
		        for (let i = 0; i < pad.length; i++)
		            pad[i] ^= 0x36;
		        this.iHash.update(pad);
		        // By doing update (processing of first block) of outer hash here we can re-use it between multiple calls via clone
		        this.oHash = hash.create();
		        // Undo internal XOR && apply outer XOR
		        for (let i = 0; i < pad.length; i++)
		            pad[i] ^= 0x36 ^ 0x5c;
		        this.oHash.update(pad);
		        (0, utils_ts_1.clean)(pad);
		    }
		    update(buf) {
		        (0, utils_ts_1.aexists)(this);
		        this.iHash.update(buf);
		        return this;
		    }
		    digestInto(out) {
		        (0, utils_ts_1.aexists)(this);
		        (0, utils_ts_1.abytes)(out, this.outputLen);
		        this.finished = true;
		        this.iHash.digestInto(out);
		        this.oHash.update(out);
		        this.oHash.digestInto(out);
		        this.destroy();
		    }
		    digest() {
		        const out = new Uint8Array(this.oHash.outputLen);
		        this.digestInto(out);
		        return out;
		    }
		    _cloneInto(to) {
		        // Create new instance without calling constructor since key already in state and we don't know it.
		        to || (to = Object.create(Object.getPrototypeOf(this), {}));
		        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
		        to = to;
		        to.finished = finished;
		        to.destroyed = destroyed;
		        to.blockLen = blockLen;
		        to.outputLen = outputLen;
		        to.oHash = oHash._cloneInto(to.oHash);
		        to.iHash = iHash._cloneInto(to.iHash);
		        return to;
		    }
		    clone() {
		        return this._cloneInto();
		    }
		    destroy() {
		        this.destroyed = true;
		        this.oHash.destroy();
		        this.iHash.destroy();
		    }
		}
		exports.HMAC = HMAC;
		/**
		 * HMAC: RFC2104 message authentication code.
		 * @param hash - function that would be used e.g. sha256
		 * @param key - message key
		 * @param message - message data
		 * @example
		 * import { hmac } from '@noble/hashes/hmac';
		 * import { sha256 } from '@noble/hashes/sha2';
		 * const mac1 = hmac(sha256, 'key', 'message');
		 */
		const hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
		exports.hmac = hmac;
		exports.hmac.create = (hash, key) => new HMAC(hash, key);
		
	} (hmac));
	return hmac;
}

var hasRequiredPbkdf2;

function requirePbkdf2 () {
	if (hasRequiredPbkdf2) return pbkdf2;
	hasRequiredPbkdf2 = 1;
	Object.defineProperty(pbkdf2, "__esModule", { value: true });
	pbkdf2.pbkdf2 = pbkdf2$1;
	pbkdf2.pbkdf2Async = pbkdf2Async;
	/**
	 * PBKDF (RFC 2898). Can be used to create a key from password and salt.
	 * @module
	 */
	const hmac_ts_1 = /*@__PURE__*/ requireHmac();
	// prettier-ignore
	const utils_ts_1 = /*@__PURE__*/ requireUtils();
	// Common prologue and epilogue for sync/async functions
	function pbkdf2Init(hash, _password, _salt, _opts) {
	    (0, utils_ts_1.ahash)(hash);
	    const opts = (0, utils_ts_1.checkOpts)({ dkLen: 32, asyncTick: 10 }, _opts);
	    const { c, dkLen, asyncTick } = opts;
	    (0, utils_ts_1.anumber)(c);
	    (0, utils_ts_1.anumber)(dkLen);
	    (0, utils_ts_1.anumber)(asyncTick);
	    if (c < 1)
	        throw new Error('iterations (c) should be >= 1');
	    const password = (0, utils_ts_1.kdfInputToBytes)(_password);
	    const salt = (0, utils_ts_1.kdfInputToBytes)(_salt);
	    // DK = PBKDF2(PRF, Password, Salt, c, dkLen);
	    const DK = new Uint8Array(dkLen);
	    // U1 = PRF(Password, Salt + INT_32_BE(i))
	    const PRF = hmac_ts_1.hmac.create(hash, password);
	    const PRFSalt = PRF._cloneInto().update(salt);
	    return { c, dkLen, asyncTick, DK, PRF, PRFSalt };
	}
	function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
	    PRF.destroy();
	    PRFSalt.destroy();
	    if (prfW)
	        prfW.destroy();
	    (0, utils_ts_1.clean)(u);
	    return DK;
	}
	/**
	 * PBKDF2-HMAC: RFC 2898 key derivation function
	 * @param hash - hash function that would be used e.g. sha256
	 * @param password - password from which a derived key is generated
	 * @param salt - cryptographic salt
	 * @param opts - {c, dkLen} where c is work factor and dkLen is output message size
	 * @example
	 * const key = pbkdf2(sha256, 'password', 'salt', { dkLen: 32, c: Math.pow(2, 18) });
	 */
	function pbkdf2$1(hash, password, salt, opts) {
	    const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
	    let prfW; // Working copy
	    const arr = new Uint8Array(4);
	    const view = (0, utils_ts_1.createView)(arr);
	    const u = new Uint8Array(PRF.outputLen);
	    // DK = T1 + T2 + ⋯ + Tdklen/hlen
	    for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
	        // Ti = F(Password, Salt, c, i)
	        const Ti = DK.subarray(pos, pos + PRF.outputLen);
	        view.setInt32(0, ti, false);
	        // F(Password, Salt, c, i) = U1 ^ U2 ^ ⋯ ^ Uc
	        // U1 = PRF(Password, Salt + INT_32_BE(i))
	        (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
	        Ti.set(u.subarray(0, Ti.length));
	        for (let ui = 1; ui < c; ui++) {
	            // Uc = PRF(Password, Uc−1)
	            PRF._cloneInto(prfW).update(u).digestInto(u);
	            for (let i = 0; i < Ti.length; i++)
	                Ti[i] ^= u[i];
	        }
	    }
	    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
	}
	/**
	 * PBKDF2-HMAC: RFC 2898 key derivation function. Async version.
	 * @example
	 * await pbkdf2Async(sha256, 'password', 'salt', { dkLen: 32, c: 500_000 });
	 */
	async function pbkdf2Async(hash, password, salt, opts) {
	    const { c, dkLen, asyncTick, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
	    let prfW; // Working copy
	    const arr = new Uint8Array(4);
	    const view = (0, utils_ts_1.createView)(arr);
	    const u = new Uint8Array(PRF.outputLen);
	    // DK = T1 + T2 + ⋯ + Tdklen/hlen
	    for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
	        // Ti = F(Password, Salt, c, i)
	        const Ti = DK.subarray(pos, pos + PRF.outputLen);
	        view.setInt32(0, ti, false);
	        // F(Password, Salt, c, i) = U1 ^ U2 ^ ⋯ ^ Uc
	        // U1 = PRF(Password, Salt + INT_32_BE(i))
	        (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
	        Ti.set(u.subarray(0, Ti.length));
	        await (0, utils_ts_1.asyncLoop)(c - 1, asyncTick, () => {
	            // Uc = PRF(Password, Uc−1)
	            PRF._cloneInto(prfW).update(u).digestInto(u);
	            for (let i = 0; i < Ti.length; i++)
	                Ti[i] ^= u[i];
	        });
	    }
	    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
	}
	
	return pbkdf2;
}

var _wordlists = {};

const require$$0 = /* #__PURE__ */ JSON.parse("[\"abdikace\",\"abeceda\",\"adresa\",\"agrese\",\"akce\",\"aktovka\",\"alej\",\"alkohol\",\"amputace\",\"ananas\",\"andulka\",\"anekdota\",\"anketa\",\"antika\",\"anulovat\",\"archa\",\"arogance\",\"asfalt\",\"asistent\",\"aspirace\",\"astma\",\"astronom\",\"atlas\",\"atletika\",\"atol\",\"autobus\",\"azyl\",\"babka\",\"bachor\",\"bacil\",\"baculka\",\"badatel\",\"bageta\",\"bagr\",\"bahno\",\"bakterie\",\"balada\",\"baletka\",\"balkon\",\"balonek\",\"balvan\",\"balza\",\"bambus\",\"bankomat\",\"barbar\",\"baret\",\"barman\",\"baroko\",\"barva\",\"baterka\",\"batoh\",\"bavlna\",\"bazalka\",\"bazilika\",\"bazuka\",\"bedna\",\"beran\",\"beseda\",\"bestie\",\"beton\",\"bezinka\",\"bezmoc\",\"beztak\",\"bicykl\",\"bidlo\",\"biftek\",\"bikiny\",\"bilance\",\"biograf\",\"biolog\",\"bitva\",\"bizon\",\"blahobyt\",\"blatouch\",\"blecha\",\"bledule\",\"blesk\",\"blikat\",\"blizna\",\"blokovat\",\"bloudit\",\"blud\",\"bobek\",\"bobr\",\"bodlina\",\"bodnout\",\"bohatost\",\"bojkot\",\"bojovat\",\"bokorys\",\"bolest\",\"borec\",\"borovice\",\"bota\",\"boubel\",\"bouchat\",\"bouda\",\"boule\",\"bourat\",\"boxer\",\"bradavka\",\"brambora\",\"branka\",\"bratr\",\"brepta\",\"briketa\",\"brko\",\"brloh\",\"bronz\",\"broskev\",\"brunetka\",\"brusinka\",\"brzda\",\"brzy\",\"bublina\",\"bubnovat\",\"buchta\",\"buditel\",\"budka\",\"budova\",\"bufet\",\"bujarost\",\"bukvice\",\"buldok\",\"bulva\",\"bunda\",\"bunkr\",\"burza\",\"butik\",\"buvol\",\"buzola\",\"bydlet\",\"bylina\",\"bytovka\",\"bzukot\",\"capart\",\"carevna\",\"cedr\",\"cedule\",\"cejch\",\"cejn\",\"cela\",\"celer\",\"celkem\",\"celnice\",\"cenina\",\"cennost\",\"cenovka\",\"centrum\",\"cenzor\",\"cestopis\",\"cetka\",\"chalupa\",\"chapadlo\",\"charita\",\"chata\",\"chechtat\",\"chemie\",\"chichot\",\"chirurg\",\"chlad\",\"chleba\",\"chlubit\",\"chmel\",\"chmura\",\"chobot\",\"chochol\",\"chodba\",\"cholera\",\"chomout\",\"chopit\",\"choroba\",\"chov\",\"chrapot\",\"chrlit\",\"chrt\",\"chrup\",\"chtivost\",\"chudina\",\"chutnat\",\"chvat\",\"chvilka\",\"chvost\",\"chyba\",\"chystat\",\"chytit\",\"cibule\",\"cigareta\",\"cihelna\",\"cihla\",\"cinkot\",\"cirkus\",\"cisterna\",\"citace\",\"citrus\",\"cizinec\",\"cizost\",\"clona\",\"cokoliv\",\"couvat\",\"ctitel\",\"ctnost\",\"cudnost\",\"cuketa\",\"cukr\",\"cupot\",\"cvaknout\",\"cval\",\"cvik\",\"cvrkot\",\"cyklista\",\"daleko\",\"dareba\",\"datel\",\"datum\",\"dcera\",\"debata\",\"dechovka\",\"decibel\",\"deficit\",\"deflace\",\"dekl\",\"dekret\",\"demokrat\",\"deprese\",\"derby\",\"deska\",\"detektiv\",\"dikobraz\",\"diktovat\",\"dioda\",\"diplom\",\"disk\",\"displej\",\"divadlo\",\"divoch\",\"dlaha\",\"dlouho\",\"dluhopis\",\"dnes\",\"dobro\",\"dobytek\",\"docent\",\"dochutit\",\"dodnes\",\"dohled\",\"dohoda\",\"dohra\",\"dojem\",\"dojnice\",\"doklad\",\"dokola\",\"doktor\",\"dokument\",\"dolar\",\"doleva\",\"dolina\",\"doma\",\"dominant\",\"domluvit\",\"domov\",\"donutit\",\"dopad\",\"dopis\",\"doplnit\",\"doposud\",\"doprovod\",\"dopustit\",\"dorazit\",\"dorost\",\"dort\",\"dosah\",\"doslov\",\"dostatek\",\"dosud\",\"dosyta\",\"dotaz\",\"dotek\",\"dotknout\",\"doufat\",\"doutnat\",\"dovozce\",\"dozadu\",\"doznat\",\"dozorce\",\"drahota\",\"drak\",\"dramatik\",\"dravec\",\"draze\",\"drdol\",\"drobnost\",\"drogerie\",\"drozd\",\"drsnost\",\"drtit\",\"drzost\",\"duben\",\"duchovno\",\"dudek\",\"duha\",\"duhovka\",\"dusit\",\"dusno\",\"dutost\",\"dvojice\",\"dvorec\",\"dynamit\",\"ekolog\",\"ekonomie\",\"elektron\",\"elipsa\",\"email\",\"emise\",\"emoce\",\"empatie\",\"epizoda\",\"epocha\",\"epopej\",\"epos\",\"esej\",\"esence\",\"eskorta\",\"eskymo\",\"etiketa\",\"euforie\",\"evoluce\",\"exekuce\",\"exkurze\",\"expedice\",\"exploze\",\"export\",\"extrakt\",\"facka\",\"fajfka\",\"fakulta\",\"fanatik\",\"fantazie\",\"farmacie\",\"favorit\",\"fazole\",\"federace\",\"fejeton\",\"fenka\",\"fialka\",\"figurant\",\"filozof\",\"filtr\",\"finance\",\"finta\",\"fixace\",\"fjord\",\"flanel\",\"flirt\",\"flotila\",\"fond\",\"fosfor\",\"fotbal\",\"fotka\",\"foton\",\"frakce\",\"freska\",\"fronta\",\"fukar\",\"funkce\",\"fyzika\",\"galeje\",\"garant\",\"genetika\",\"geolog\",\"gilotina\",\"glazura\",\"glejt\",\"golem\",\"golfista\",\"gotika\",\"graf\",\"gramofon\",\"granule\",\"grep\",\"gril\",\"grog\",\"groteska\",\"guma\",\"hadice\",\"hadr\",\"hala\",\"halenka\",\"hanba\",\"hanopis\",\"harfa\",\"harpuna\",\"havran\",\"hebkost\",\"hejkal\",\"hejno\",\"hejtman\",\"hektar\",\"helma\",\"hematom\",\"herec\",\"herna\",\"heslo\",\"hezky\",\"historik\",\"hladovka\",\"hlasivky\",\"hlava\",\"hledat\",\"hlen\",\"hlodavec\",\"hloh\",\"hloupost\",\"hltat\",\"hlubina\",\"hluchota\",\"hmat\",\"hmota\",\"hmyz\",\"hnis\",\"hnojivo\",\"hnout\",\"hoblina\",\"hoboj\",\"hoch\",\"hodiny\",\"hodlat\",\"hodnota\",\"hodovat\",\"hojnost\",\"hokej\",\"holinka\",\"holka\",\"holub\",\"homole\",\"honitba\",\"honorace\",\"horal\",\"horda\",\"horizont\",\"horko\",\"horlivec\",\"hormon\",\"hornina\",\"horoskop\",\"horstvo\",\"hospoda\",\"hostina\",\"hotovost\",\"houba\",\"houf\",\"houpat\",\"houska\",\"hovor\",\"hradba\",\"hranice\",\"hravost\",\"hrazda\",\"hrbolek\",\"hrdina\",\"hrdlo\",\"hrdost\",\"hrnek\",\"hrobka\",\"hromada\",\"hrot\",\"hrouda\",\"hrozen\",\"hrstka\",\"hrubost\",\"hryzat\",\"hubenost\",\"hubnout\",\"hudba\",\"hukot\",\"humr\",\"husita\",\"hustota\",\"hvozd\",\"hybnost\",\"hydrant\",\"hygiena\",\"hymna\",\"hysterik\",\"idylka\",\"ihned\",\"ikona\",\"iluze\",\"imunita\",\"infekce\",\"inflace\",\"inkaso\",\"inovace\",\"inspekce\",\"internet\",\"invalida\",\"investor\",\"inzerce\",\"ironie\",\"jablko\",\"jachta\",\"jahoda\",\"jakmile\",\"jakost\",\"jalovec\",\"jantar\",\"jarmark\",\"jaro\",\"jasan\",\"jasno\",\"jatka\",\"javor\",\"jazyk\",\"jedinec\",\"jedle\",\"jednatel\",\"jehlan\",\"jekot\",\"jelen\",\"jelito\",\"jemnost\",\"jenom\",\"jepice\",\"jeseter\",\"jevit\",\"jezdec\",\"jezero\",\"jinak\",\"jindy\",\"jinoch\",\"jiskra\",\"jistota\",\"jitrnice\",\"jizva\",\"jmenovat\",\"jogurt\",\"jurta\",\"kabaret\",\"kabel\",\"kabinet\",\"kachna\",\"kadet\",\"kadidlo\",\"kahan\",\"kajak\",\"kajuta\",\"kakao\",\"kaktus\",\"kalamita\",\"kalhoty\",\"kalibr\",\"kalnost\",\"kamera\",\"kamkoliv\",\"kamna\",\"kanibal\",\"kanoe\",\"kantor\",\"kapalina\",\"kapela\",\"kapitola\",\"kapka\",\"kaple\",\"kapota\",\"kapr\",\"kapusta\",\"kapybara\",\"karamel\",\"karotka\",\"karton\",\"kasa\",\"katalog\",\"katedra\",\"kauce\",\"kauza\",\"kavalec\",\"kazajka\",\"kazeta\",\"kazivost\",\"kdekoliv\",\"kdesi\",\"kedluben\",\"kemp\",\"keramika\",\"kino\",\"klacek\",\"kladivo\",\"klam\",\"klapot\",\"klasika\",\"klaun\",\"klec\",\"klenba\",\"klepat\",\"klesnout\",\"klid\",\"klima\",\"klisna\",\"klobouk\",\"klokan\",\"klopa\",\"kloub\",\"klubovna\",\"klusat\",\"kluzkost\",\"kmen\",\"kmitat\",\"kmotr\",\"kniha\",\"knot\",\"koalice\",\"koberec\",\"kobka\",\"kobliha\",\"kobyla\",\"kocour\",\"kohout\",\"kojenec\",\"kokos\",\"koktejl\",\"kolaps\",\"koleda\",\"kolize\",\"kolo\",\"komando\",\"kometa\",\"komik\",\"komnata\",\"komora\",\"kompas\",\"komunita\",\"konat\",\"koncept\",\"kondice\",\"konec\",\"konfese\",\"kongres\",\"konina\",\"konkurs\",\"kontakt\",\"konzerva\",\"kopanec\",\"kopie\",\"kopnout\",\"koprovka\",\"korbel\",\"korektor\",\"kormidlo\",\"koroptev\",\"korpus\",\"koruna\",\"koryto\",\"korzet\",\"kosatec\",\"kostka\",\"kotel\",\"kotleta\",\"kotoul\",\"koukat\",\"koupelna\",\"kousek\",\"kouzlo\",\"kovboj\",\"koza\",\"kozoroh\",\"krabice\",\"krach\",\"krajina\",\"kralovat\",\"krasopis\",\"kravata\",\"kredit\",\"krejcar\",\"kresba\",\"kreveta\",\"kriket\",\"kritik\",\"krize\",\"krkavec\",\"krmelec\",\"krmivo\",\"krocan\",\"krok\",\"kronika\",\"kropit\",\"kroupa\",\"krovka\",\"krtek\",\"kruhadlo\",\"krupice\",\"krutost\",\"krvinka\",\"krychle\",\"krypta\",\"krystal\",\"kryt\",\"kudlanka\",\"kufr\",\"kujnost\",\"kukla\",\"kulajda\",\"kulich\",\"kulka\",\"kulomet\",\"kultura\",\"kuna\",\"kupodivu\",\"kurt\",\"kurzor\",\"kutil\",\"kvalita\",\"kvasinka\",\"kvestor\",\"kynolog\",\"kyselina\",\"kytara\",\"kytice\",\"kytka\",\"kytovec\",\"kyvadlo\",\"labrador\",\"lachtan\",\"ladnost\",\"laik\",\"lakomec\",\"lamela\",\"lampa\",\"lanovka\",\"lasice\",\"laso\",\"lastura\",\"latinka\",\"lavina\",\"lebka\",\"leckdy\",\"leden\",\"lednice\",\"ledovka\",\"ledvina\",\"legenda\",\"legie\",\"legrace\",\"lehce\",\"lehkost\",\"lehnout\",\"lektvar\",\"lenochod\",\"lentilka\",\"lepenka\",\"lepidlo\",\"letadlo\",\"letec\",\"letmo\",\"letokruh\",\"levhart\",\"levitace\",\"levobok\",\"libra\",\"lichotka\",\"lidojed\",\"lidskost\",\"lihovina\",\"lijavec\",\"lilek\",\"limetka\",\"linie\",\"linka\",\"linoleum\",\"listopad\",\"litina\",\"litovat\",\"lobista\",\"lodivod\",\"logika\",\"logoped\",\"lokalita\",\"loket\",\"lomcovat\",\"lopata\",\"lopuch\",\"lord\",\"losos\",\"lotr\",\"loudal\",\"louh\",\"louka\",\"louskat\",\"lovec\",\"lstivost\",\"lucerna\",\"lucifer\",\"lump\",\"lusk\",\"lustrace\",\"lvice\",\"lyra\",\"lyrika\",\"lysina\",\"madam\",\"madlo\",\"magistr\",\"mahagon\",\"majetek\",\"majitel\",\"majorita\",\"makak\",\"makovice\",\"makrela\",\"malba\",\"malina\",\"malovat\",\"malvice\",\"maminka\",\"mandle\",\"manko\",\"marnost\",\"masakr\",\"maskot\",\"masopust\",\"matice\",\"matrika\",\"maturita\",\"mazanec\",\"mazivo\",\"mazlit\",\"mazurka\",\"mdloba\",\"mechanik\",\"meditace\",\"medovina\",\"melasa\",\"meloun\",\"mentolka\",\"metla\",\"metoda\",\"metr\",\"mezera\",\"migrace\",\"mihnout\",\"mihule\",\"mikina\",\"mikrofon\",\"milenec\",\"milimetr\",\"milost\",\"mimika\",\"mincovna\",\"minibar\",\"minomet\",\"minulost\",\"miska\",\"mistr\",\"mixovat\",\"mladost\",\"mlha\",\"mlhovina\",\"mlok\",\"mlsat\",\"mluvit\",\"mnich\",\"mnohem\",\"mobil\",\"mocnost\",\"modelka\",\"modlitba\",\"mohyla\",\"mokro\",\"molekula\",\"momentka\",\"monarcha\",\"monokl\",\"monstrum\",\"montovat\",\"monzun\",\"mosaz\",\"moskyt\",\"most\",\"motivace\",\"motorka\",\"motyka\",\"moucha\",\"moudrost\",\"mozaika\",\"mozek\",\"mozol\",\"mramor\",\"mravenec\",\"mrkev\",\"mrtvola\",\"mrzet\",\"mrzutost\",\"mstitel\",\"mudrc\",\"muflon\",\"mulat\",\"mumie\",\"munice\",\"muset\",\"mutace\",\"muzeum\",\"muzikant\",\"myslivec\",\"mzda\",\"nabourat\",\"nachytat\",\"nadace\",\"nadbytek\",\"nadhoz\",\"nadobro\",\"nadpis\",\"nahlas\",\"nahnat\",\"nahodile\",\"nahradit\",\"naivita\",\"najednou\",\"najisto\",\"najmout\",\"naklonit\",\"nakonec\",\"nakrmit\",\"nalevo\",\"namazat\",\"namluvit\",\"nanometr\",\"naoko\",\"naopak\",\"naostro\",\"napadat\",\"napevno\",\"naplnit\",\"napnout\",\"naposled\",\"naprosto\",\"narodit\",\"naruby\",\"narychlo\",\"nasadit\",\"nasekat\",\"naslepo\",\"nastat\",\"natolik\",\"navenek\",\"navrch\",\"navzdory\",\"nazvat\",\"nebe\",\"nechat\",\"necky\",\"nedaleko\",\"nedbat\",\"neduh\",\"negace\",\"nehet\",\"nehoda\",\"nejen\",\"nejprve\",\"neklid\",\"nelibost\",\"nemilost\",\"nemoc\",\"neochota\",\"neonka\",\"nepokoj\",\"nerost\",\"nerv\",\"nesmysl\",\"nesoulad\",\"netvor\",\"neuron\",\"nevina\",\"nezvykle\",\"nicota\",\"nijak\",\"nikam\",\"nikdy\",\"nikl\",\"nikterak\",\"nitro\",\"nocleh\",\"nohavice\",\"nominace\",\"nora\",\"norek\",\"nositel\",\"nosnost\",\"nouze\",\"noviny\",\"novota\",\"nozdra\",\"nuda\",\"nudle\",\"nuget\",\"nutit\",\"nutnost\",\"nutrie\",\"nymfa\",\"obal\",\"obarvit\",\"obava\",\"obdiv\",\"obec\",\"obehnat\",\"obejmout\",\"obezita\",\"obhajoba\",\"obilnice\",\"objasnit\",\"objekt\",\"obklopit\",\"oblast\",\"oblek\",\"obliba\",\"obloha\",\"obluda\",\"obnos\",\"obohatit\",\"obojek\",\"obout\",\"obrazec\",\"obrna\",\"obruba\",\"obrys\",\"obsah\",\"obsluha\",\"obstarat\",\"obuv\",\"obvaz\",\"obvinit\",\"obvod\",\"obvykle\",\"obyvatel\",\"obzor\",\"ocas\",\"ocel\",\"ocenit\",\"ochladit\",\"ochota\",\"ochrana\",\"ocitnout\",\"odboj\",\"odbyt\",\"odchod\",\"odcizit\",\"odebrat\",\"odeslat\",\"odevzdat\",\"odezva\",\"odhadce\",\"odhodit\",\"odjet\",\"odjinud\",\"odkaz\",\"odkoupit\",\"odliv\",\"odluka\",\"odmlka\",\"odolnost\",\"odpad\",\"odpis\",\"odplout\",\"odpor\",\"odpustit\",\"odpykat\",\"odrazka\",\"odsoudit\",\"odstup\",\"odsun\",\"odtok\",\"odtud\",\"odvaha\",\"odveta\",\"odvolat\",\"odvracet\",\"odznak\",\"ofina\",\"ofsajd\",\"ohlas\",\"ohnisko\",\"ohrada\",\"ohrozit\",\"ohryzek\",\"okap\",\"okenice\",\"oklika\",\"okno\",\"okouzlit\",\"okovy\",\"okrasa\",\"okres\",\"okrsek\",\"okruh\",\"okupant\",\"okurka\",\"okusit\",\"olejnina\",\"olizovat\",\"omak\",\"omeleta\",\"omezit\",\"omladina\",\"omlouvat\",\"omluva\",\"omyl\",\"onehdy\",\"opakovat\",\"opasek\",\"operace\",\"opice\",\"opilost\",\"opisovat\",\"opora\",\"opozice\",\"opravdu\",\"oproti\",\"orbital\",\"orchestr\",\"orgie\",\"orlice\",\"orloj\",\"ortel\",\"osada\",\"oschnout\",\"osika\",\"osivo\",\"oslava\",\"oslepit\",\"oslnit\",\"oslovit\",\"osnova\",\"osoba\",\"osolit\",\"ospalec\",\"osten\",\"ostraha\",\"ostuda\",\"ostych\",\"osvojit\",\"oteplit\",\"otisk\",\"otop\",\"otrhat\",\"otrlost\",\"otrok\",\"otruby\",\"otvor\",\"ovanout\",\"ovar\",\"oves\",\"ovlivnit\",\"ovoce\",\"oxid\",\"ozdoba\",\"pachatel\",\"pacient\",\"padouch\",\"pahorek\",\"pakt\",\"palanda\",\"palec\",\"palivo\",\"paluba\",\"pamflet\",\"pamlsek\",\"panenka\",\"panika\",\"panna\",\"panovat\",\"panstvo\",\"pantofle\",\"paprika\",\"parketa\",\"parodie\",\"parta\",\"paruka\",\"paryba\",\"paseka\",\"pasivita\",\"pastelka\",\"patent\",\"patrona\",\"pavouk\",\"pazneht\",\"pazourek\",\"pecka\",\"pedagog\",\"pejsek\",\"peklo\",\"peloton\",\"penalta\",\"pendrek\",\"penze\",\"periskop\",\"pero\",\"pestrost\",\"petarda\",\"petice\",\"petrolej\",\"pevnina\",\"pexeso\",\"pianista\",\"piha\",\"pijavice\",\"pikle\",\"piknik\",\"pilina\",\"pilnost\",\"pilulka\",\"pinzeta\",\"pipeta\",\"pisatel\",\"pistole\",\"pitevna\",\"pivnice\",\"pivovar\",\"placenta\",\"plakat\",\"plamen\",\"planeta\",\"plastika\",\"platit\",\"plavidlo\",\"plaz\",\"plech\",\"plemeno\",\"plenta\",\"ples\",\"pletivo\",\"plevel\",\"plivat\",\"plnit\",\"plno\",\"plocha\",\"plodina\",\"plomba\",\"plout\",\"pluk\",\"plyn\",\"pobavit\",\"pobyt\",\"pochod\",\"pocit\",\"poctivec\",\"podat\",\"podcenit\",\"podepsat\",\"podhled\",\"podivit\",\"podklad\",\"podmanit\",\"podnik\",\"podoba\",\"podpora\",\"podraz\",\"podstata\",\"podvod\",\"podzim\",\"poezie\",\"pohanka\",\"pohnutka\",\"pohovor\",\"pohroma\",\"pohyb\",\"pointa\",\"pojistka\",\"pojmout\",\"pokazit\",\"pokles\",\"pokoj\",\"pokrok\",\"pokuta\",\"pokyn\",\"poledne\",\"polibek\",\"polknout\",\"poloha\",\"polynom\",\"pomalu\",\"pominout\",\"pomlka\",\"pomoc\",\"pomsta\",\"pomyslet\",\"ponechat\",\"ponorka\",\"ponurost\",\"popadat\",\"popel\",\"popisek\",\"poplach\",\"poprosit\",\"popsat\",\"popud\",\"poradce\",\"porce\",\"porod\",\"porucha\",\"poryv\",\"posadit\",\"posed\",\"posila\",\"poskok\",\"poslanec\",\"posoudit\",\"pospolu\",\"postava\",\"posudek\",\"posyp\",\"potah\",\"potkan\",\"potlesk\",\"potomek\",\"potrava\",\"potupa\",\"potvora\",\"poukaz\",\"pouto\",\"pouzdro\",\"povaha\",\"povidla\",\"povlak\",\"povoz\",\"povrch\",\"povstat\",\"povyk\",\"povzdech\",\"pozdrav\",\"pozemek\",\"poznatek\",\"pozor\",\"pozvat\",\"pracovat\",\"prahory\",\"praktika\",\"prales\",\"praotec\",\"praporek\",\"prase\",\"pravda\",\"princip\",\"prkno\",\"probudit\",\"procento\",\"prodej\",\"profese\",\"prohra\",\"projekt\",\"prolomit\",\"promile\",\"pronikat\",\"propad\",\"prorok\",\"prosba\",\"proton\",\"proutek\",\"provaz\",\"prskavka\",\"prsten\",\"prudkost\",\"prut\",\"prvek\",\"prvohory\",\"psanec\",\"psovod\",\"pstruh\",\"ptactvo\",\"puberta\",\"puch\",\"pudl\",\"pukavec\",\"puklina\",\"pukrle\",\"pult\",\"pumpa\",\"punc\",\"pupen\",\"pusa\",\"pusinka\",\"pustina\",\"putovat\",\"putyka\",\"pyramida\",\"pysk\",\"pytel\",\"racek\",\"rachot\",\"radiace\",\"radnice\",\"radon\",\"raft\",\"ragby\",\"raketa\",\"rakovina\",\"rameno\",\"rampouch\",\"rande\",\"rarach\",\"rarita\",\"rasovna\",\"rastr\",\"ratolest\",\"razance\",\"razidlo\",\"reagovat\",\"reakce\",\"recept\",\"redaktor\",\"referent\",\"reflex\",\"rejnok\",\"reklama\",\"rekord\",\"rekrut\",\"rektor\",\"reputace\",\"revize\",\"revma\",\"revolver\",\"rezerva\",\"riskovat\",\"riziko\",\"robotika\",\"rodokmen\",\"rohovka\",\"rokle\",\"rokoko\",\"romaneto\",\"ropovod\",\"ropucha\",\"rorejs\",\"rosol\",\"rostlina\",\"rotmistr\",\"rotoped\",\"rotunda\",\"roubenka\",\"roucho\",\"roup\",\"roura\",\"rovina\",\"rovnice\",\"rozbor\",\"rozchod\",\"rozdat\",\"rozeznat\",\"rozhodce\",\"rozinka\",\"rozjezd\",\"rozkaz\",\"rozloha\",\"rozmar\",\"rozpad\",\"rozruch\",\"rozsah\",\"roztok\",\"rozum\",\"rozvod\",\"rubrika\",\"ruchadlo\",\"rukavice\",\"rukopis\",\"ryba\",\"rybolov\",\"rychlost\",\"rydlo\",\"rypadlo\",\"rytina\",\"ryzost\",\"sadista\",\"sahat\",\"sako\",\"samec\",\"samizdat\",\"samota\",\"sanitka\",\"sardinka\",\"sasanka\",\"satelit\",\"sazba\",\"sazenice\",\"sbor\",\"schovat\",\"sebranka\",\"secese\",\"sedadlo\",\"sediment\",\"sedlo\",\"sehnat\",\"sejmout\",\"sekera\",\"sekta\",\"sekunda\",\"sekvoje\",\"semeno\",\"seno\",\"servis\",\"sesadit\",\"seshora\",\"seskok\",\"seslat\",\"sestra\",\"sesuv\",\"sesypat\",\"setba\",\"setina\",\"setkat\",\"setnout\",\"setrvat\",\"sever\",\"seznam\",\"shoda\",\"shrnout\",\"sifon\",\"silnice\",\"sirka\",\"sirotek\",\"sirup\",\"situace\",\"skafandr\",\"skalisko\",\"skanzen\",\"skaut\",\"skeptik\",\"skica\",\"skladba\",\"sklenice\",\"sklo\",\"skluz\",\"skoba\",\"skokan\",\"skoro\",\"skripta\",\"skrz\",\"skupina\",\"skvost\",\"skvrna\",\"slabika\",\"sladidlo\",\"slanina\",\"slast\",\"slavnost\",\"sledovat\",\"slepec\",\"sleva\",\"slezina\",\"slib\",\"slina\",\"sliznice\",\"slon\",\"sloupek\",\"slovo\",\"sluch\",\"sluha\",\"slunce\",\"slupka\",\"slza\",\"smaragd\",\"smetana\",\"smilstvo\",\"smlouva\",\"smog\",\"smrad\",\"smrk\",\"smrtka\",\"smutek\",\"smysl\",\"snad\",\"snaha\",\"snob\",\"sobota\",\"socha\",\"sodovka\",\"sokol\",\"sopka\",\"sotva\",\"souboj\",\"soucit\",\"soudce\",\"souhlas\",\"soulad\",\"soumrak\",\"souprava\",\"soused\",\"soutok\",\"souviset\",\"spalovna\",\"spasitel\",\"spis\",\"splav\",\"spodek\",\"spojenec\",\"spolu\",\"sponzor\",\"spornost\",\"spousta\",\"sprcha\",\"spustit\",\"sranda\",\"sraz\",\"srdce\",\"srna\",\"srnec\",\"srovnat\",\"srpen\",\"srst\",\"srub\",\"stanice\",\"starosta\",\"statika\",\"stavba\",\"stehno\",\"stezka\",\"stodola\",\"stolek\",\"stopa\",\"storno\",\"stoupat\",\"strach\",\"stres\",\"strhnout\",\"strom\",\"struna\",\"studna\",\"stupnice\",\"stvol\",\"styk\",\"subjekt\",\"subtropy\",\"suchar\",\"sudost\",\"sukno\",\"sundat\",\"sunout\",\"surikata\",\"surovina\",\"svah\",\"svalstvo\",\"svetr\",\"svatba\",\"svazek\",\"svisle\",\"svitek\",\"svoboda\",\"svodidlo\",\"svorka\",\"svrab\",\"sykavka\",\"sykot\",\"synek\",\"synovec\",\"sypat\",\"sypkost\",\"syrovost\",\"sysel\",\"sytost\",\"tabletka\",\"tabule\",\"tahoun\",\"tajemno\",\"tajfun\",\"tajga\",\"tajit\",\"tajnost\",\"taktika\",\"tamhle\",\"tampon\",\"tancovat\",\"tanec\",\"tanker\",\"tapeta\",\"tavenina\",\"tazatel\",\"technika\",\"tehdy\",\"tekutina\",\"telefon\",\"temnota\",\"tendence\",\"tenista\",\"tenor\",\"teplota\",\"tepna\",\"teprve\",\"terapie\",\"termoska\",\"textil\",\"ticho\",\"tiskopis\",\"titulek\",\"tkadlec\",\"tkanina\",\"tlapka\",\"tleskat\",\"tlukot\",\"tlupa\",\"tmel\",\"toaleta\",\"topinka\",\"topol\",\"torzo\",\"touha\",\"toulec\",\"tradice\",\"traktor\",\"tramp\",\"trasa\",\"traverza\",\"trefit\",\"trest\",\"trezor\",\"trhavina\",\"trhlina\",\"trochu\",\"trojice\",\"troska\",\"trouba\",\"trpce\",\"trpitel\",\"trpkost\",\"trubec\",\"truchlit\",\"truhlice\",\"trus\",\"trvat\",\"tudy\",\"tuhnout\",\"tuhost\",\"tundra\",\"turista\",\"turnaj\",\"tuzemsko\",\"tvaroh\",\"tvorba\",\"tvrdost\",\"tvrz\",\"tygr\",\"tykev\",\"ubohost\",\"uboze\",\"ubrat\",\"ubrousek\",\"ubrus\",\"ubytovna\",\"ucho\",\"uctivost\",\"udivit\",\"uhradit\",\"ujednat\",\"ujistit\",\"ujmout\",\"ukazatel\",\"uklidnit\",\"uklonit\",\"ukotvit\",\"ukrojit\",\"ulice\",\"ulita\",\"ulovit\",\"umyvadlo\",\"unavit\",\"uniforma\",\"uniknout\",\"upadnout\",\"uplatnit\",\"uplynout\",\"upoutat\",\"upravit\",\"uran\",\"urazit\",\"usednout\",\"usilovat\",\"usmrtit\",\"usnadnit\",\"usnout\",\"usoudit\",\"ustlat\",\"ustrnout\",\"utahovat\",\"utkat\",\"utlumit\",\"utonout\",\"utopenec\",\"utrousit\",\"uvalit\",\"uvolnit\",\"uvozovka\",\"uzdravit\",\"uzel\",\"uzenina\",\"uzlina\",\"uznat\",\"vagon\",\"valcha\",\"valoun\",\"vana\",\"vandal\",\"vanilka\",\"varan\",\"varhany\",\"varovat\",\"vcelku\",\"vchod\",\"vdova\",\"vedro\",\"vegetace\",\"vejce\",\"velbloud\",\"veletrh\",\"velitel\",\"velmoc\",\"velryba\",\"venkov\",\"veranda\",\"verze\",\"veselka\",\"veskrze\",\"vesnice\",\"vespodu\",\"vesta\",\"veterina\",\"veverka\",\"vibrace\",\"vichr\",\"videohra\",\"vidina\",\"vidle\",\"vila\",\"vinice\",\"viset\",\"vitalita\",\"vize\",\"vizitka\",\"vjezd\",\"vklad\",\"vkus\",\"vlajka\",\"vlak\",\"vlasec\",\"vlevo\",\"vlhkost\",\"vliv\",\"vlnovka\",\"vloupat\",\"vnucovat\",\"vnuk\",\"voda\",\"vodivost\",\"vodoznak\",\"vodstvo\",\"vojensky\",\"vojna\",\"vojsko\",\"volant\",\"volba\",\"volit\",\"volno\",\"voskovka\",\"vozidlo\",\"vozovna\",\"vpravo\",\"vrabec\",\"vracet\",\"vrah\",\"vrata\",\"vrba\",\"vrcholek\",\"vrhat\",\"vrstva\",\"vrtule\",\"vsadit\",\"vstoupit\",\"vstup\",\"vtip\",\"vybavit\",\"vybrat\",\"vychovat\",\"vydat\",\"vydra\",\"vyfotit\",\"vyhledat\",\"vyhnout\",\"vyhodit\",\"vyhradit\",\"vyhubit\",\"vyjasnit\",\"vyjet\",\"vyjmout\",\"vyklopit\",\"vykonat\",\"vylekat\",\"vymazat\",\"vymezit\",\"vymizet\",\"vymyslet\",\"vynechat\",\"vynikat\",\"vynutit\",\"vypadat\",\"vyplatit\",\"vypravit\",\"vypustit\",\"vyrazit\",\"vyrovnat\",\"vyrvat\",\"vyslovit\",\"vysoko\",\"vystavit\",\"vysunout\",\"vysypat\",\"vytasit\",\"vytesat\",\"vytratit\",\"vyvinout\",\"vyvolat\",\"vyvrhel\",\"vyzdobit\",\"vyznat\",\"vzadu\",\"vzbudit\",\"vzchopit\",\"vzdor\",\"vzduch\",\"vzdychat\",\"vzestup\",\"vzhledem\",\"vzkaz\",\"vzlykat\",\"vznik\",\"vzorek\",\"vzpoura\",\"vztah\",\"vztek\",\"xylofon\",\"zabrat\",\"zabydlet\",\"zachovat\",\"zadarmo\",\"zadusit\",\"zafoukat\",\"zahltit\",\"zahodit\",\"zahrada\",\"zahynout\",\"zajatec\",\"zajet\",\"zajistit\",\"zaklepat\",\"zakoupit\",\"zalepit\",\"zamezit\",\"zamotat\",\"zamyslet\",\"zanechat\",\"zanikat\",\"zaplatit\",\"zapojit\",\"zapsat\",\"zarazit\",\"zastavit\",\"zasunout\",\"zatajit\",\"zatemnit\",\"zatknout\",\"zaujmout\",\"zavalit\",\"zavelet\",\"zavinit\",\"zavolat\",\"zavrtat\",\"zazvonit\",\"zbavit\",\"zbrusu\",\"zbudovat\",\"zbytek\",\"zdaleka\",\"zdarma\",\"zdatnost\",\"zdivo\",\"zdobit\",\"zdroj\",\"zdvih\",\"zdymadlo\",\"zelenina\",\"zeman\",\"zemina\",\"zeptat\",\"zezadu\",\"zezdola\",\"zhatit\",\"zhltnout\",\"zhluboka\",\"zhotovit\",\"zhruba\",\"zima\",\"zimnice\",\"zjemnit\",\"zklamat\",\"zkoumat\",\"zkratka\",\"zkumavka\",\"zlato\",\"zlehka\",\"zloba\",\"zlom\",\"zlost\",\"zlozvyk\",\"zmapovat\",\"zmar\",\"zmatek\",\"zmije\",\"zmizet\",\"zmocnit\",\"zmodrat\",\"zmrzlina\",\"zmutovat\",\"znak\",\"znalost\",\"znamenat\",\"znovu\",\"zobrazit\",\"zotavit\",\"zoubek\",\"zoufale\",\"zplodit\",\"zpomalit\",\"zprava\",\"zprostit\",\"zprudka\",\"zprvu\",\"zrada\",\"zranit\",\"zrcadlo\",\"zrnitost\",\"zrno\",\"zrovna\",\"zrychlit\",\"zrzavost\",\"zticha\",\"ztratit\",\"zubovina\",\"zubr\",\"zvednout\",\"zvenku\",\"zvesela\",\"zvon\",\"zvrat\",\"zvukovod\",\"zvyk\"]");

const require$$1 = /* #__PURE__ */ JSON.parse("[\"的\",\"一\",\"是\",\"在\",\"不\",\"了\",\"有\",\"和\",\"人\",\"这\",\"中\",\"大\",\"为\",\"上\",\"个\",\"国\",\"我\",\"以\",\"要\",\"他\",\"时\",\"来\",\"用\",\"们\",\"生\",\"到\",\"作\",\"地\",\"于\",\"出\",\"就\",\"分\",\"对\",\"成\",\"会\",\"可\",\"主\",\"发\",\"年\",\"动\",\"同\",\"工\",\"也\",\"能\",\"下\",\"过\",\"子\",\"说\",\"产\",\"种\",\"面\",\"而\",\"方\",\"后\",\"多\",\"定\",\"行\",\"学\",\"法\",\"所\",\"民\",\"得\",\"经\",\"十\",\"三\",\"之\",\"进\",\"着\",\"等\",\"部\",\"度\",\"家\",\"电\",\"力\",\"里\",\"如\",\"水\",\"化\",\"高\",\"自\",\"二\",\"理\",\"起\",\"小\",\"物\",\"现\",\"实\",\"加\",\"量\",\"都\",\"两\",\"体\",\"制\",\"机\",\"当\",\"使\",\"点\",\"从\",\"业\",\"本\",\"去\",\"把\",\"性\",\"好\",\"应\",\"开\",\"它\",\"合\",\"还\",\"因\",\"由\",\"其\",\"些\",\"然\",\"前\",\"外\",\"天\",\"政\",\"四\",\"日\",\"那\",\"社\",\"义\",\"事\",\"平\",\"形\",\"相\",\"全\",\"表\",\"间\",\"样\",\"与\",\"关\",\"各\",\"重\",\"新\",\"线\",\"内\",\"数\",\"正\",\"心\",\"反\",\"你\",\"明\",\"看\",\"原\",\"又\",\"么\",\"利\",\"比\",\"或\",\"但\",\"质\",\"气\",\"第\",\"向\",\"道\",\"命\",\"此\",\"变\",\"条\",\"只\",\"没\",\"结\",\"解\",\"问\",\"意\",\"建\",\"月\",\"公\",\"无\",\"系\",\"军\",\"很\",\"情\",\"者\",\"最\",\"立\",\"代\",\"想\",\"已\",\"通\",\"并\",\"提\",\"直\",\"题\",\"党\",\"程\",\"展\",\"五\",\"果\",\"料\",\"象\",\"员\",\"革\",\"位\",\"入\",\"常\",\"文\",\"总\",\"次\",\"品\",\"式\",\"活\",\"设\",\"及\",\"管\",\"特\",\"件\",\"长\",\"求\",\"老\",\"头\",\"基\",\"资\",\"边\",\"流\",\"路\",\"级\",\"少\",\"图\",\"山\",\"统\",\"接\",\"知\",\"较\",\"将\",\"组\",\"见\",\"计\",\"别\",\"她\",\"手\",\"角\",\"期\",\"根\",\"论\",\"运\",\"农\",\"指\",\"几\",\"九\",\"区\",\"强\",\"放\",\"决\",\"西\",\"被\",\"干\",\"做\",\"必\",\"战\",\"先\",\"回\",\"则\",\"任\",\"取\",\"据\",\"处\",\"队\",\"南\",\"给\",\"色\",\"光\",\"门\",\"即\",\"保\",\"治\",\"北\",\"造\",\"百\",\"规\",\"热\",\"领\",\"七\",\"海\",\"口\",\"东\",\"导\",\"器\",\"压\",\"志\",\"世\",\"金\",\"增\",\"争\",\"济\",\"阶\",\"油\",\"思\",\"术\",\"极\",\"交\",\"受\",\"联\",\"什\",\"认\",\"六\",\"共\",\"权\",\"收\",\"证\",\"改\",\"清\",\"美\",\"再\",\"采\",\"转\",\"更\",\"单\",\"风\",\"切\",\"打\",\"白\",\"教\",\"速\",\"花\",\"带\",\"安\",\"场\",\"身\",\"车\",\"例\",\"真\",\"务\",\"具\",\"万\",\"每\",\"目\",\"至\",\"达\",\"走\",\"积\",\"示\",\"议\",\"声\",\"报\",\"斗\",\"完\",\"类\",\"八\",\"离\",\"华\",\"名\",\"确\",\"才\",\"科\",\"张\",\"信\",\"马\",\"节\",\"话\",\"米\",\"整\",\"空\",\"元\",\"况\",\"今\",\"集\",\"温\",\"传\",\"土\",\"许\",\"步\",\"群\",\"广\",\"石\",\"记\",\"需\",\"段\",\"研\",\"界\",\"拉\",\"林\",\"律\",\"叫\",\"且\",\"究\",\"观\",\"越\",\"织\",\"装\",\"影\",\"算\",\"低\",\"持\",\"音\",\"众\",\"书\",\"布\",\"复\",\"容\",\"儿\",\"须\",\"际\",\"商\",\"非\",\"验\",\"连\",\"断\",\"深\",\"难\",\"近\",\"矿\",\"千\",\"周\",\"委\",\"素\",\"技\",\"备\",\"半\",\"办\",\"青\",\"省\",\"列\",\"习\",\"响\",\"约\",\"支\",\"般\",\"史\",\"感\",\"劳\",\"便\",\"团\",\"往\",\"酸\",\"历\",\"市\",\"克\",\"何\",\"除\",\"消\",\"构\",\"府\",\"称\",\"太\",\"准\",\"精\",\"值\",\"号\",\"率\",\"族\",\"维\",\"划\",\"选\",\"标\",\"写\",\"存\",\"候\",\"毛\",\"亲\",\"快\",\"效\",\"斯\",\"院\",\"查\",\"江\",\"型\",\"眼\",\"王\",\"按\",\"格\",\"养\",\"易\",\"置\",\"派\",\"层\",\"片\",\"始\",\"却\",\"专\",\"状\",\"育\",\"厂\",\"京\",\"识\",\"适\",\"属\",\"圆\",\"包\",\"火\",\"住\",\"调\",\"满\",\"县\",\"局\",\"照\",\"参\",\"红\",\"细\",\"引\",\"听\",\"该\",\"铁\",\"价\",\"严\",\"首\",\"底\",\"液\",\"官\",\"德\",\"随\",\"病\",\"苏\",\"失\",\"尔\",\"死\",\"讲\",\"配\",\"女\",\"黄\",\"推\",\"显\",\"谈\",\"罪\",\"神\",\"艺\",\"呢\",\"席\",\"含\",\"企\",\"望\",\"密\",\"批\",\"营\",\"项\",\"防\",\"举\",\"球\",\"英\",\"氧\",\"势\",\"告\",\"李\",\"台\",\"落\",\"木\",\"帮\",\"轮\",\"破\",\"亚\",\"师\",\"围\",\"注\",\"远\",\"字\",\"材\",\"排\",\"供\",\"河\",\"态\",\"封\",\"另\",\"施\",\"减\",\"树\",\"溶\",\"怎\",\"止\",\"案\",\"言\",\"士\",\"均\",\"武\",\"固\",\"叶\",\"鱼\",\"波\",\"视\",\"仅\",\"费\",\"紧\",\"爱\",\"左\",\"章\",\"早\",\"朝\",\"害\",\"续\",\"轻\",\"服\",\"试\",\"食\",\"充\",\"兵\",\"源\",\"判\",\"护\",\"司\",\"足\",\"某\",\"练\",\"差\",\"致\",\"板\",\"田\",\"降\",\"黑\",\"犯\",\"负\",\"击\",\"范\",\"继\",\"兴\",\"似\",\"余\",\"坚\",\"曲\",\"输\",\"修\",\"故\",\"城\",\"夫\",\"够\",\"送\",\"笔\",\"船\",\"占\",\"右\",\"财\",\"吃\",\"富\",\"春\",\"职\",\"觉\",\"汉\",\"画\",\"功\",\"巴\",\"跟\",\"虽\",\"杂\",\"飞\",\"检\",\"吸\",\"助\",\"升\",\"阳\",\"互\",\"初\",\"创\",\"抗\",\"考\",\"投\",\"坏\",\"策\",\"古\",\"径\",\"换\",\"未\",\"跑\",\"留\",\"钢\",\"曾\",\"端\",\"责\",\"站\",\"简\",\"述\",\"钱\",\"副\",\"尽\",\"帝\",\"射\",\"草\",\"冲\",\"承\",\"独\",\"令\",\"限\",\"阿\",\"宣\",\"环\",\"双\",\"请\",\"超\",\"微\",\"让\",\"控\",\"州\",\"良\",\"轴\",\"找\",\"否\",\"纪\",\"益\",\"依\",\"优\",\"顶\",\"础\",\"载\",\"倒\",\"房\",\"突\",\"坐\",\"粉\",\"敌\",\"略\",\"客\",\"袁\",\"冷\",\"胜\",\"绝\",\"析\",\"块\",\"剂\",\"测\",\"丝\",\"协\",\"诉\",\"念\",\"陈\",\"仍\",\"罗\",\"盐\",\"友\",\"洋\",\"错\",\"苦\",\"夜\",\"刑\",\"移\",\"频\",\"逐\",\"靠\",\"混\",\"母\",\"短\",\"皮\",\"终\",\"聚\",\"汽\",\"村\",\"云\",\"哪\",\"既\",\"距\",\"卫\",\"停\",\"烈\",\"央\",\"察\",\"烧\",\"迅\",\"境\",\"若\",\"印\",\"洲\",\"刻\",\"括\",\"激\",\"孔\",\"搞\",\"甚\",\"室\",\"待\",\"核\",\"校\",\"散\",\"侵\",\"吧\",\"甲\",\"游\",\"久\",\"菜\",\"味\",\"旧\",\"模\",\"湖\",\"货\",\"损\",\"预\",\"阻\",\"毫\",\"普\",\"稳\",\"乙\",\"妈\",\"植\",\"息\",\"扩\",\"银\",\"语\",\"挥\",\"酒\",\"守\",\"拿\",\"序\",\"纸\",\"医\",\"缺\",\"雨\",\"吗\",\"针\",\"刘\",\"啊\",\"急\",\"唱\",\"误\",\"训\",\"愿\",\"审\",\"附\",\"获\",\"茶\",\"鲜\",\"粮\",\"斤\",\"孩\",\"脱\",\"硫\",\"肥\",\"善\",\"龙\",\"演\",\"父\",\"渐\",\"血\",\"欢\",\"械\",\"掌\",\"歌\",\"沙\",\"刚\",\"攻\",\"谓\",\"盾\",\"讨\",\"晚\",\"粒\",\"乱\",\"燃\",\"矛\",\"乎\",\"杀\",\"药\",\"宁\",\"鲁\",\"贵\",\"钟\",\"煤\",\"读\",\"班\",\"伯\",\"香\",\"介\",\"迫\",\"句\",\"丰\",\"培\",\"握\",\"兰\",\"担\",\"弦\",\"蛋\",\"沉\",\"假\",\"穿\",\"执\",\"答\",\"乐\",\"谁\",\"顺\",\"烟\",\"缩\",\"征\",\"脸\",\"喜\",\"松\",\"脚\",\"困\",\"异\",\"免\",\"背\",\"星\",\"福\",\"买\",\"染\",\"井\",\"概\",\"慢\",\"怕\",\"磁\",\"倍\",\"祖\",\"皇\",\"促\",\"静\",\"补\",\"评\",\"翻\",\"肉\",\"践\",\"尼\",\"衣\",\"宽\",\"扬\",\"棉\",\"希\",\"伤\",\"操\",\"垂\",\"秋\",\"宜\",\"氢\",\"套\",\"督\",\"振\",\"架\",\"亮\",\"末\",\"宪\",\"庆\",\"编\",\"牛\",\"触\",\"映\",\"雷\",\"销\",\"诗\",\"座\",\"居\",\"抓\",\"裂\",\"胞\",\"呼\",\"娘\",\"景\",\"威\",\"绿\",\"晶\",\"厚\",\"盟\",\"衡\",\"鸡\",\"孙\",\"延\",\"危\",\"胶\",\"屋\",\"乡\",\"临\",\"陆\",\"顾\",\"掉\",\"呀\",\"灯\",\"岁\",\"措\",\"束\",\"耐\",\"剧\",\"玉\",\"赵\",\"跳\",\"哥\",\"季\",\"课\",\"凯\",\"胡\",\"额\",\"款\",\"绍\",\"卷\",\"齐\",\"伟\",\"蒸\",\"殖\",\"永\",\"宗\",\"苗\",\"川\",\"炉\",\"岩\",\"弱\",\"零\",\"杨\",\"奏\",\"沿\",\"露\",\"杆\",\"探\",\"滑\",\"镇\",\"饭\",\"浓\",\"航\",\"怀\",\"赶\",\"库\",\"夺\",\"伊\",\"灵\",\"税\",\"途\",\"灭\",\"赛\",\"归\",\"召\",\"鼓\",\"播\",\"盘\",\"裁\",\"险\",\"康\",\"唯\",\"录\",\"菌\",\"纯\",\"借\",\"糖\",\"盖\",\"横\",\"符\",\"私\",\"努\",\"堂\",\"域\",\"枪\",\"润\",\"幅\",\"哈\",\"竟\",\"熟\",\"虫\",\"泽\",\"脑\",\"壤\",\"碳\",\"欧\",\"遍\",\"侧\",\"寨\",\"敢\",\"彻\",\"虑\",\"斜\",\"薄\",\"庭\",\"纳\",\"弹\",\"饲\",\"伸\",\"折\",\"麦\",\"湿\",\"暗\",\"荷\",\"瓦\",\"塞\",\"床\",\"筑\",\"恶\",\"户\",\"访\",\"塔\",\"奇\",\"透\",\"梁\",\"刀\",\"旋\",\"迹\",\"卡\",\"氯\",\"遇\",\"份\",\"毒\",\"泥\",\"退\",\"洗\",\"摆\",\"灰\",\"彩\",\"卖\",\"耗\",\"夏\",\"择\",\"忙\",\"铜\",\"献\",\"硬\",\"予\",\"繁\",\"圈\",\"雪\",\"函\",\"亦\",\"抽\",\"篇\",\"阵\",\"阴\",\"丁\",\"尺\",\"追\",\"堆\",\"雄\",\"迎\",\"泛\",\"爸\",\"楼\",\"避\",\"谋\",\"吨\",\"野\",\"猪\",\"旗\",\"累\",\"偏\",\"典\",\"馆\",\"索\",\"秦\",\"脂\",\"潮\",\"爷\",\"豆\",\"忽\",\"托\",\"惊\",\"塑\",\"遗\",\"愈\",\"朱\",\"替\",\"纤\",\"粗\",\"倾\",\"尚\",\"痛\",\"楚\",\"谢\",\"奋\",\"购\",\"磨\",\"君\",\"池\",\"旁\",\"碎\",\"骨\",\"监\",\"捕\",\"弟\",\"暴\",\"割\",\"贯\",\"殊\",\"释\",\"词\",\"亡\",\"壁\",\"顿\",\"宝\",\"午\",\"尘\",\"闻\",\"揭\",\"炮\",\"残\",\"冬\",\"桥\",\"妇\",\"警\",\"综\",\"招\",\"吴\",\"付\",\"浮\",\"遭\",\"徐\",\"您\",\"摇\",\"谷\",\"赞\",\"箱\",\"隔\",\"订\",\"男\",\"吹\",\"园\",\"纷\",\"唐\",\"败\",\"宋\",\"玻\",\"巨\",\"耕\",\"坦\",\"荣\",\"闭\",\"湾\",\"键\",\"凡\",\"驻\",\"锅\",\"救\",\"恩\",\"剥\",\"凝\",\"碱\",\"齿\",\"截\",\"炼\",\"麻\",\"纺\",\"禁\",\"废\",\"盛\",\"版\",\"缓\",\"净\",\"睛\",\"昌\",\"婚\",\"涉\",\"筒\",\"嘴\",\"插\",\"岸\",\"朗\",\"庄\",\"街\",\"藏\",\"姑\",\"贸\",\"腐\",\"奴\",\"啦\",\"惯\",\"乘\",\"伙\",\"恢\",\"匀\",\"纱\",\"扎\",\"辩\",\"耳\",\"彪\",\"臣\",\"亿\",\"璃\",\"抵\",\"脉\",\"秀\",\"萨\",\"俄\",\"网\",\"舞\",\"店\",\"喷\",\"纵\",\"寸\",\"汗\",\"挂\",\"洪\",\"贺\",\"闪\",\"柬\",\"爆\",\"烯\",\"津\",\"稻\",\"墙\",\"软\",\"勇\",\"像\",\"滚\",\"厘\",\"蒙\",\"芳\",\"肯\",\"坡\",\"柱\",\"荡\",\"腿\",\"仪\",\"旅\",\"尾\",\"轧\",\"冰\",\"贡\",\"登\",\"黎\",\"削\",\"钻\",\"勒\",\"逃\",\"障\",\"氨\",\"郭\",\"峰\",\"币\",\"港\",\"伏\",\"轨\",\"亩\",\"毕\",\"擦\",\"莫\",\"刺\",\"浪\",\"秘\",\"援\",\"株\",\"健\",\"售\",\"股\",\"岛\",\"甘\",\"泡\",\"睡\",\"童\",\"铸\",\"汤\",\"阀\",\"休\",\"汇\",\"舍\",\"牧\",\"绕\",\"炸\",\"哲\",\"磷\",\"绩\",\"朋\",\"淡\",\"尖\",\"启\",\"陷\",\"柴\",\"呈\",\"徒\",\"颜\",\"泪\",\"稍\",\"忘\",\"泵\",\"蓝\",\"拖\",\"洞\",\"授\",\"镜\",\"辛\",\"壮\",\"锋\",\"贫\",\"虚\",\"弯\",\"摩\",\"泰\",\"幼\",\"廷\",\"尊\",\"窗\",\"纲\",\"弄\",\"隶\",\"疑\",\"氏\",\"宫\",\"姐\",\"震\",\"瑞\",\"怪\",\"尤\",\"琴\",\"循\",\"描\",\"膜\",\"违\",\"夹\",\"腰\",\"缘\",\"珠\",\"穷\",\"森\",\"枝\",\"竹\",\"沟\",\"催\",\"绳\",\"忆\",\"邦\",\"剩\",\"幸\",\"浆\",\"栏\",\"拥\",\"牙\",\"贮\",\"礼\",\"滤\",\"钠\",\"纹\",\"罢\",\"拍\",\"咱\",\"喊\",\"袖\",\"埃\",\"勤\",\"罚\",\"焦\",\"潜\",\"伍\",\"墨\",\"欲\",\"缝\",\"姓\",\"刊\",\"饱\",\"仿\",\"奖\",\"铝\",\"鬼\",\"丽\",\"跨\",\"默\",\"挖\",\"链\",\"扫\",\"喝\",\"袋\",\"炭\",\"污\",\"幕\",\"诸\",\"弧\",\"励\",\"梅\",\"奶\",\"洁\",\"灾\",\"舟\",\"鉴\",\"苯\",\"讼\",\"抱\",\"毁\",\"懂\",\"寒\",\"智\",\"埔\",\"寄\",\"届\",\"跃\",\"渡\",\"挑\",\"丹\",\"艰\",\"贝\",\"碰\",\"拔\",\"爹\",\"戴\",\"码\",\"梦\",\"芽\",\"熔\",\"赤\",\"渔\",\"哭\",\"敬\",\"颗\",\"奔\",\"铅\",\"仲\",\"虎\",\"稀\",\"妹\",\"乏\",\"珍\",\"申\",\"桌\",\"遵\",\"允\",\"隆\",\"螺\",\"仓\",\"魏\",\"锐\",\"晓\",\"氮\",\"兼\",\"隐\",\"碍\",\"赫\",\"拨\",\"忠\",\"肃\",\"缸\",\"牵\",\"抢\",\"博\",\"巧\",\"壳\",\"兄\",\"杜\",\"讯\",\"诚\",\"碧\",\"祥\",\"柯\",\"页\",\"巡\",\"矩\",\"悲\",\"灌\",\"龄\",\"伦\",\"票\",\"寻\",\"桂\",\"铺\",\"圣\",\"恐\",\"恰\",\"郑\",\"趣\",\"抬\",\"荒\",\"腾\",\"贴\",\"柔\",\"滴\",\"猛\",\"阔\",\"辆\",\"妻\",\"填\",\"撤\",\"储\",\"签\",\"闹\",\"扰\",\"紫\",\"砂\",\"递\",\"戏\",\"吊\",\"陶\",\"伐\",\"喂\",\"疗\",\"瓶\",\"婆\",\"抚\",\"臂\",\"摸\",\"忍\",\"虾\",\"蜡\",\"邻\",\"胸\",\"巩\",\"挤\",\"偶\",\"弃\",\"槽\",\"劲\",\"乳\",\"邓\",\"吉\",\"仁\",\"烂\",\"砖\",\"租\",\"乌\",\"舰\",\"伴\",\"瓜\",\"浅\",\"丙\",\"暂\",\"燥\",\"橡\",\"柳\",\"迷\",\"暖\",\"牌\",\"秧\",\"胆\",\"详\",\"簧\",\"踏\",\"瓷\",\"谱\",\"呆\",\"宾\",\"糊\",\"洛\",\"辉\",\"愤\",\"竞\",\"隙\",\"怒\",\"粘\",\"乃\",\"绪\",\"肩\",\"籍\",\"敏\",\"涂\",\"熙\",\"皆\",\"侦\",\"悬\",\"掘\",\"享\",\"纠\",\"醒\",\"狂\",\"锁\",\"淀\",\"恨\",\"牲\",\"霸\",\"爬\",\"赏\",\"逆\",\"玩\",\"陵\",\"祝\",\"秒\",\"浙\",\"貌\",\"役\",\"彼\",\"悉\",\"鸭\",\"趋\",\"凤\",\"晨\",\"畜\",\"辈\",\"秩\",\"卵\",\"署\",\"梯\",\"炎\",\"滩\",\"棋\",\"驱\",\"筛\",\"峡\",\"冒\",\"啥\",\"寿\",\"译\",\"浸\",\"泉\",\"帽\",\"迟\",\"硅\",\"疆\",\"贷\",\"漏\",\"稿\",\"冠\",\"嫩\",\"胁\",\"芯\",\"牢\",\"叛\",\"蚀\",\"奥\",\"鸣\",\"岭\",\"羊\",\"凭\",\"串\",\"塘\",\"绘\",\"酵\",\"融\",\"盆\",\"锡\",\"庙\",\"筹\",\"冻\",\"辅\",\"摄\",\"袭\",\"筋\",\"拒\",\"僚\",\"旱\",\"钾\",\"鸟\",\"漆\",\"沈\",\"眉\",\"疏\",\"添\",\"棒\",\"穗\",\"硝\",\"韩\",\"逼\",\"扭\",\"侨\",\"凉\",\"挺\",\"碗\",\"栽\",\"炒\",\"杯\",\"患\",\"馏\",\"劝\",\"豪\",\"辽\",\"勃\",\"鸿\",\"旦\",\"吏\",\"拜\",\"狗\",\"埋\",\"辊\",\"掩\",\"饮\",\"搬\",\"骂\",\"辞\",\"勾\",\"扣\",\"估\",\"蒋\",\"绒\",\"雾\",\"丈\",\"朵\",\"姆\",\"拟\",\"宇\",\"辑\",\"陕\",\"雕\",\"偿\",\"蓄\",\"崇\",\"剪\",\"倡\",\"厅\",\"咬\",\"驶\",\"薯\",\"刷\",\"斥\",\"番\",\"赋\",\"奉\",\"佛\",\"浇\",\"漫\",\"曼\",\"扇\",\"钙\",\"桃\",\"扶\",\"仔\",\"返\",\"俗\",\"亏\",\"腔\",\"鞋\",\"棱\",\"覆\",\"框\",\"悄\",\"叔\",\"撞\",\"骗\",\"勘\",\"旺\",\"沸\",\"孤\",\"吐\",\"孟\",\"渠\",\"屈\",\"疾\",\"妙\",\"惜\",\"仰\",\"狠\",\"胀\",\"谐\",\"抛\",\"霉\",\"桑\",\"岗\",\"嘛\",\"衰\",\"盗\",\"渗\",\"脏\",\"赖\",\"涌\",\"甜\",\"曹\",\"阅\",\"肌\",\"哩\",\"厉\",\"烃\",\"纬\",\"毅\",\"昨\",\"伪\",\"症\",\"煮\",\"叹\",\"钉\",\"搭\",\"茎\",\"笼\",\"酷\",\"偷\",\"弓\",\"锥\",\"恒\",\"杰\",\"坑\",\"鼻\",\"翼\",\"纶\",\"叙\",\"狱\",\"逮\",\"罐\",\"络\",\"棚\",\"抑\",\"膨\",\"蔬\",\"寺\",\"骤\",\"穆\",\"冶\",\"枯\",\"册\",\"尸\",\"凸\",\"绅\",\"坯\",\"牺\",\"焰\",\"轰\",\"欣\",\"晋\",\"瘦\",\"御\",\"锭\",\"锦\",\"丧\",\"旬\",\"锻\",\"垄\",\"搜\",\"扑\",\"邀\",\"亭\",\"酯\",\"迈\",\"舒\",\"脆\",\"酶\",\"闲\",\"忧\",\"酚\",\"顽\",\"羽\",\"涨\",\"卸\",\"仗\",\"陪\",\"辟\",\"惩\",\"杭\",\"姚\",\"肚\",\"捉\",\"飘\",\"漂\",\"昆\",\"欺\",\"吾\",\"郎\",\"烷\",\"汁\",\"呵\",\"饰\",\"萧\",\"雅\",\"邮\",\"迁\",\"燕\",\"撒\",\"姻\",\"赴\",\"宴\",\"烦\",\"债\",\"帐\",\"斑\",\"铃\",\"旨\",\"醇\",\"董\",\"饼\",\"雏\",\"姿\",\"拌\",\"傅\",\"腹\",\"妥\",\"揉\",\"贤\",\"拆\",\"歪\",\"葡\",\"胺\",\"丢\",\"浩\",\"徽\",\"昂\",\"垫\",\"挡\",\"览\",\"贪\",\"慰\",\"缴\",\"汪\",\"慌\",\"冯\",\"诺\",\"姜\",\"谊\",\"凶\",\"劣\",\"诬\",\"耀\",\"昏\",\"躺\",\"盈\",\"骑\",\"乔\",\"溪\",\"丛\",\"卢\",\"抹\",\"闷\",\"咨\",\"刮\",\"驾\",\"缆\",\"悟\",\"摘\",\"铒\",\"掷\",\"颇\",\"幻\",\"柄\",\"惠\",\"惨\",\"佳\",\"仇\",\"腊\",\"窝\",\"涤\",\"剑\",\"瞧\",\"堡\",\"泼\",\"葱\",\"罩\",\"霍\",\"捞\",\"胎\",\"苍\",\"滨\",\"俩\",\"捅\",\"湘\",\"砍\",\"霞\",\"邵\",\"萄\",\"疯\",\"淮\",\"遂\",\"熊\",\"粪\",\"烘\",\"宿\",\"档\",\"戈\",\"驳\",\"嫂\",\"裕\",\"徙\",\"箭\",\"捐\",\"肠\",\"撑\",\"晒\",\"辨\",\"殿\",\"莲\",\"摊\",\"搅\",\"酱\",\"屏\",\"疫\",\"哀\",\"蔡\",\"堵\",\"沫\",\"皱\",\"畅\",\"叠\",\"阁\",\"莱\",\"敲\",\"辖\",\"钩\",\"痕\",\"坝\",\"巷\",\"饿\",\"祸\",\"丘\",\"玄\",\"溜\",\"曰\",\"逻\",\"彭\",\"尝\",\"卿\",\"妨\",\"艇\",\"吞\",\"韦\",\"怨\",\"矮\",\"歇\"]");

const require$$2 = /* #__PURE__ */ JSON.parse("[\"的\",\"一\",\"是\",\"在\",\"不\",\"了\",\"有\",\"和\",\"人\",\"這\",\"中\",\"大\",\"為\",\"上\",\"個\",\"國\",\"我\",\"以\",\"要\",\"他\",\"時\",\"來\",\"用\",\"們\",\"生\",\"到\",\"作\",\"地\",\"於\",\"出\",\"就\",\"分\",\"對\",\"成\",\"會\",\"可\",\"主\",\"發\",\"年\",\"動\",\"同\",\"工\",\"也\",\"能\",\"下\",\"過\",\"子\",\"說\",\"產\",\"種\",\"面\",\"而\",\"方\",\"後\",\"多\",\"定\",\"行\",\"學\",\"法\",\"所\",\"民\",\"得\",\"經\",\"十\",\"三\",\"之\",\"進\",\"著\",\"等\",\"部\",\"度\",\"家\",\"電\",\"力\",\"裡\",\"如\",\"水\",\"化\",\"高\",\"自\",\"二\",\"理\",\"起\",\"小\",\"物\",\"現\",\"實\",\"加\",\"量\",\"都\",\"兩\",\"體\",\"制\",\"機\",\"當\",\"使\",\"點\",\"從\",\"業\",\"本\",\"去\",\"把\",\"性\",\"好\",\"應\",\"開\",\"它\",\"合\",\"還\",\"因\",\"由\",\"其\",\"些\",\"然\",\"前\",\"外\",\"天\",\"政\",\"四\",\"日\",\"那\",\"社\",\"義\",\"事\",\"平\",\"形\",\"相\",\"全\",\"表\",\"間\",\"樣\",\"與\",\"關\",\"各\",\"重\",\"新\",\"線\",\"內\",\"數\",\"正\",\"心\",\"反\",\"你\",\"明\",\"看\",\"原\",\"又\",\"麼\",\"利\",\"比\",\"或\",\"但\",\"質\",\"氣\",\"第\",\"向\",\"道\",\"命\",\"此\",\"變\",\"條\",\"只\",\"沒\",\"結\",\"解\",\"問\",\"意\",\"建\",\"月\",\"公\",\"無\",\"系\",\"軍\",\"很\",\"情\",\"者\",\"最\",\"立\",\"代\",\"想\",\"已\",\"通\",\"並\",\"提\",\"直\",\"題\",\"黨\",\"程\",\"展\",\"五\",\"果\",\"料\",\"象\",\"員\",\"革\",\"位\",\"入\",\"常\",\"文\",\"總\",\"次\",\"品\",\"式\",\"活\",\"設\",\"及\",\"管\",\"特\",\"件\",\"長\",\"求\",\"老\",\"頭\",\"基\",\"資\",\"邊\",\"流\",\"路\",\"級\",\"少\",\"圖\",\"山\",\"統\",\"接\",\"知\",\"較\",\"將\",\"組\",\"見\",\"計\",\"別\",\"她\",\"手\",\"角\",\"期\",\"根\",\"論\",\"運\",\"農\",\"指\",\"幾\",\"九\",\"區\",\"強\",\"放\",\"決\",\"西\",\"被\",\"幹\",\"做\",\"必\",\"戰\",\"先\",\"回\",\"則\",\"任\",\"取\",\"據\",\"處\",\"隊\",\"南\",\"給\",\"色\",\"光\",\"門\",\"即\",\"保\",\"治\",\"北\",\"造\",\"百\",\"規\",\"熱\",\"領\",\"七\",\"海\",\"口\",\"東\",\"導\",\"器\",\"壓\",\"志\",\"世\",\"金\",\"增\",\"爭\",\"濟\",\"階\",\"油\",\"思\",\"術\",\"極\",\"交\",\"受\",\"聯\",\"什\",\"認\",\"六\",\"共\",\"權\",\"收\",\"證\",\"改\",\"清\",\"美\",\"再\",\"採\",\"轉\",\"更\",\"單\",\"風\",\"切\",\"打\",\"白\",\"教\",\"速\",\"花\",\"帶\",\"安\",\"場\",\"身\",\"車\",\"例\",\"真\",\"務\",\"具\",\"萬\",\"每\",\"目\",\"至\",\"達\",\"走\",\"積\",\"示\",\"議\",\"聲\",\"報\",\"鬥\",\"完\",\"類\",\"八\",\"離\",\"華\",\"名\",\"確\",\"才\",\"科\",\"張\",\"信\",\"馬\",\"節\",\"話\",\"米\",\"整\",\"空\",\"元\",\"況\",\"今\",\"集\",\"溫\",\"傳\",\"土\",\"許\",\"步\",\"群\",\"廣\",\"石\",\"記\",\"需\",\"段\",\"研\",\"界\",\"拉\",\"林\",\"律\",\"叫\",\"且\",\"究\",\"觀\",\"越\",\"織\",\"裝\",\"影\",\"算\",\"低\",\"持\",\"音\",\"眾\",\"書\",\"布\",\"复\",\"容\",\"兒\",\"須\",\"際\",\"商\",\"非\",\"驗\",\"連\",\"斷\",\"深\",\"難\",\"近\",\"礦\",\"千\",\"週\",\"委\",\"素\",\"技\",\"備\",\"半\",\"辦\",\"青\",\"省\",\"列\",\"習\",\"響\",\"約\",\"支\",\"般\",\"史\",\"感\",\"勞\",\"便\",\"團\",\"往\",\"酸\",\"歷\",\"市\",\"克\",\"何\",\"除\",\"消\",\"構\",\"府\",\"稱\",\"太\",\"準\",\"精\",\"值\",\"號\",\"率\",\"族\",\"維\",\"劃\",\"選\",\"標\",\"寫\",\"存\",\"候\",\"毛\",\"親\",\"快\",\"效\",\"斯\",\"院\",\"查\",\"江\",\"型\",\"眼\",\"王\",\"按\",\"格\",\"養\",\"易\",\"置\",\"派\",\"層\",\"片\",\"始\",\"卻\",\"專\",\"狀\",\"育\",\"廠\",\"京\",\"識\",\"適\",\"屬\",\"圓\",\"包\",\"火\",\"住\",\"調\",\"滿\",\"縣\",\"局\",\"照\",\"參\",\"紅\",\"細\",\"引\",\"聽\",\"該\",\"鐵\",\"價\",\"嚴\",\"首\",\"底\",\"液\",\"官\",\"德\",\"隨\",\"病\",\"蘇\",\"失\",\"爾\",\"死\",\"講\",\"配\",\"女\",\"黃\",\"推\",\"顯\",\"談\",\"罪\",\"神\",\"藝\",\"呢\",\"席\",\"含\",\"企\",\"望\",\"密\",\"批\",\"營\",\"項\",\"防\",\"舉\",\"球\",\"英\",\"氧\",\"勢\",\"告\",\"李\",\"台\",\"落\",\"木\",\"幫\",\"輪\",\"破\",\"亞\",\"師\",\"圍\",\"注\",\"遠\",\"字\",\"材\",\"排\",\"供\",\"河\",\"態\",\"封\",\"另\",\"施\",\"減\",\"樹\",\"溶\",\"怎\",\"止\",\"案\",\"言\",\"士\",\"均\",\"武\",\"固\",\"葉\",\"魚\",\"波\",\"視\",\"僅\",\"費\",\"緊\",\"愛\",\"左\",\"章\",\"早\",\"朝\",\"害\",\"續\",\"輕\",\"服\",\"試\",\"食\",\"充\",\"兵\",\"源\",\"判\",\"護\",\"司\",\"足\",\"某\",\"練\",\"差\",\"致\",\"板\",\"田\",\"降\",\"黑\",\"犯\",\"負\",\"擊\",\"范\",\"繼\",\"興\",\"似\",\"餘\",\"堅\",\"曲\",\"輸\",\"修\",\"故\",\"城\",\"夫\",\"夠\",\"送\",\"筆\",\"船\",\"佔\",\"右\",\"財\",\"吃\",\"富\",\"春\",\"職\",\"覺\",\"漢\",\"畫\",\"功\",\"巴\",\"跟\",\"雖\",\"雜\",\"飛\",\"檢\",\"吸\",\"助\",\"昇\",\"陽\",\"互\",\"初\",\"創\",\"抗\",\"考\",\"投\",\"壞\",\"策\",\"古\",\"徑\",\"換\",\"未\",\"跑\",\"留\",\"鋼\",\"曾\",\"端\",\"責\",\"站\",\"簡\",\"述\",\"錢\",\"副\",\"盡\",\"帝\",\"射\",\"草\",\"衝\",\"承\",\"獨\",\"令\",\"限\",\"阿\",\"宣\",\"環\",\"雙\",\"請\",\"超\",\"微\",\"讓\",\"控\",\"州\",\"良\",\"軸\",\"找\",\"否\",\"紀\",\"益\",\"依\",\"優\",\"頂\",\"礎\",\"載\",\"倒\",\"房\",\"突\",\"坐\",\"粉\",\"敵\",\"略\",\"客\",\"袁\",\"冷\",\"勝\",\"絕\",\"析\",\"塊\",\"劑\",\"測\",\"絲\",\"協\",\"訴\",\"念\",\"陳\",\"仍\",\"羅\",\"鹽\",\"友\",\"洋\",\"錯\",\"苦\",\"夜\",\"刑\",\"移\",\"頻\",\"逐\",\"靠\",\"混\",\"母\",\"短\",\"皮\",\"終\",\"聚\",\"汽\",\"村\",\"雲\",\"哪\",\"既\",\"距\",\"衛\",\"停\",\"烈\",\"央\",\"察\",\"燒\",\"迅\",\"境\",\"若\",\"印\",\"洲\",\"刻\",\"括\",\"激\",\"孔\",\"搞\",\"甚\",\"室\",\"待\",\"核\",\"校\",\"散\",\"侵\",\"吧\",\"甲\",\"遊\",\"久\",\"菜\",\"味\",\"舊\",\"模\",\"湖\",\"貨\",\"損\",\"預\",\"阻\",\"毫\",\"普\",\"穩\",\"乙\",\"媽\",\"植\",\"息\",\"擴\",\"銀\",\"語\",\"揮\",\"酒\",\"守\",\"拿\",\"序\",\"紙\",\"醫\",\"缺\",\"雨\",\"嗎\",\"針\",\"劉\",\"啊\",\"急\",\"唱\",\"誤\",\"訓\",\"願\",\"審\",\"附\",\"獲\",\"茶\",\"鮮\",\"糧\",\"斤\",\"孩\",\"脫\",\"硫\",\"肥\",\"善\",\"龍\",\"演\",\"父\",\"漸\",\"血\",\"歡\",\"械\",\"掌\",\"歌\",\"沙\",\"剛\",\"攻\",\"謂\",\"盾\",\"討\",\"晚\",\"粒\",\"亂\",\"燃\",\"矛\",\"乎\",\"殺\",\"藥\",\"寧\",\"魯\",\"貴\",\"鐘\",\"煤\",\"讀\",\"班\",\"伯\",\"香\",\"介\",\"迫\",\"句\",\"豐\",\"培\",\"握\",\"蘭\",\"擔\",\"弦\",\"蛋\",\"沉\",\"假\",\"穿\",\"執\",\"答\",\"樂\",\"誰\",\"順\",\"煙\",\"縮\",\"徵\",\"臉\",\"喜\",\"松\",\"腳\",\"困\",\"異\",\"免\",\"背\",\"星\",\"福\",\"買\",\"染\",\"井\",\"概\",\"慢\",\"怕\",\"磁\",\"倍\",\"祖\",\"皇\",\"促\",\"靜\",\"補\",\"評\",\"翻\",\"肉\",\"踐\",\"尼\",\"衣\",\"寬\",\"揚\",\"棉\",\"希\",\"傷\",\"操\",\"垂\",\"秋\",\"宜\",\"氫\",\"套\",\"督\",\"振\",\"架\",\"亮\",\"末\",\"憲\",\"慶\",\"編\",\"牛\",\"觸\",\"映\",\"雷\",\"銷\",\"詩\",\"座\",\"居\",\"抓\",\"裂\",\"胞\",\"呼\",\"娘\",\"景\",\"威\",\"綠\",\"晶\",\"厚\",\"盟\",\"衡\",\"雞\",\"孫\",\"延\",\"危\",\"膠\",\"屋\",\"鄉\",\"臨\",\"陸\",\"顧\",\"掉\",\"呀\",\"燈\",\"歲\",\"措\",\"束\",\"耐\",\"劇\",\"玉\",\"趙\",\"跳\",\"哥\",\"季\",\"課\",\"凱\",\"胡\",\"額\",\"款\",\"紹\",\"卷\",\"齊\",\"偉\",\"蒸\",\"殖\",\"永\",\"宗\",\"苗\",\"川\",\"爐\",\"岩\",\"弱\",\"零\",\"楊\",\"奏\",\"沿\",\"露\",\"桿\",\"探\",\"滑\",\"鎮\",\"飯\",\"濃\",\"航\",\"懷\",\"趕\",\"庫\",\"奪\",\"伊\",\"靈\",\"稅\",\"途\",\"滅\",\"賽\",\"歸\",\"召\",\"鼓\",\"播\",\"盤\",\"裁\",\"險\",\"康\",\"唯\",\"錄\",\"菌\",\"純\",\"借\",\"糖\",\"蓋\",\"橫\",\"符\",\"私\",\"努\",\"堂\",\"域\",\"槍\",\"潤\",\"幅\",\"哈\",\"竟\",\"熟\",\"蟲\",\"澤\",\"腦\",\"壤\",\"碳\",\"歐\",\"遍\",\"側\",\"寨\",\"敢\",\"徹\",\"慮\",\"斜\",\"薄\",\"庭\",\"納\",\"彈\",\"飼\",\"伸\",\"折\",\"麥\",\"濕\",\"暗\",\"荷\",\"瓦\",\"塞\",\"床\",\"築\",\"惡\",\"戶\",\"訪\",\"塔\",\"奇\",\"透\",\"梁\",\"刀\",\"旋\",\"跡\",\"卡\",\"氯\",\"遇\",\"份\",\"毒\",\"泥\",\"退\",\"洗\",\"擺\",\"灰\",\"彩\",\"賣\",\"耗\",\"夏\",\"擇\",\"忙\",\"銅\",\"獻\",\"硬\",\"予\",\"繁\",\"圈\",\"雪\",\"函\",\"亦\",\"抽\",\"篇\",\"陣\",\"陰\",\"丁\",\"尺\",\"追\",\"堆\",\"雄\",\"迎\",\"泛\",\"爸\",\"樓\",\"避\",\"謀\",\"噸\",\"野\",\"豬\",\"旗\",\"累\",\"偏\",\"典\",\"館\",\"索\",\"秦\",\"脂\",\"潮\",\"爺\",\"豆\",\"忽\",\"托\",\"驚\",\"塑\",\"遺\",\"愈\",\"朱\",\"替\",\"纖\",\"粗\",\"傾\",\"尚\",\"痛\",\"楚\",\"謝\",\"奮\",\"購\",\"磨\",\"君\",\"池\",\"旁\",\"碎\",\"骨\",\"監\",\"捕\",\"弟\",\"暴\",\"割\",\"貫\",\"殊\",\"釋\",\"詞\",\"亡\",\"壁\",\"頓\",\"寶\",\"午\",\"塵\",\"聞\",\"揭\",\"炮\",\"殘\",\"冬\",\"橋\",\"婦\",\"警\",\"綜\",\"招\",\"吳\",\"付\",\"浮\",\"遭\",\"徐\",\"您\",\"搖\",\"谷\",\"贊\",\"箱\",\"隔\",\"訂\",\"男\",\"吹\",\"園\",\"紛\",\"唐\",\"敗\",\"宋\",\"玻\",\"巨\",\"耕\",\"坦\",\"榮\",\"閉\",\"灣\",\"鍵\",\"凡\",\"駐\",\"鍋\",\"救\",\"恩\",\"剝\",\"凝\",\"鹼\",\"齒\",\"截\",\"煉\",\"麻\",\"紡\",\"禁\",\"廢\",\"盛\",\"版\",\"緩\",\"淨\",\"睛\",\"昌\",\"婚\",\"涉\",\"筒\",\"嘴\",\"插\",\"岸\",\"朗\",\"莊\",\"街\",\"藏\",\"姑\",\"貿\",\"腐\",\"奴\",\"啦\",\"慣\",\"乘\",\"夥\",\"恢\",\"勻\",\"紗\",\"扎\",\"辯\",\"耳\",\"彪\",\"臣\",\"億\",\"璃\",\"抵\",\"脈\",\"秀\",\"薩\",\"俄\",\"網\",\"舞\",\"店\",\"噴\",\"縱\",\"寸\",\"汗\",\"掛\",\"洪\",\"賀\",\"閃\",\"柬\",\"爆\",\"烯\",\"津\",\"稻\",\"牆\",\"軟\",\"勇\",\"像\",\"滾\",\"厘\",\"蒙\",\"芳\",\"肯\",\"坡\",\"柱\",\"盪\",\"腿\",\"儀\",\"旅\",\"尾\",\"軋\",\"冰\",\"貢\",\"登\",\"黎\",\"削\",\"鑽\",\"勒\",\"逃\",\"障\",\"氨\",\"郭\",\"峰\",\"幣\",\"港\",\"伏\",\"軌\",\"畝\",\"畢\",\"擦\",\"莫\",\"刺\",\"浪\",\"秘\",\"援\",\"株\",\"健\",\"售\",\"股\",\"島\",\"甘\",\"泡\",\"睡\",\"童\",\"鑄\",\"湯\",\"閥\",\"休\",\"匯\",\"舍\",\"牧\",\"繞\",\"炸\",\"哲\",\"磷\",\"績\",\"朋\",\"淡\",\"尖\",\"啟\",\"陷\",\"柴\",\"呈\",\"徒\",\"顏\",\"淚\",\"稍\",\"忘\",\"泵\",\"藍\",\"拖\",\"洞\",\"授\",\"鏡\",\"辛\",\"壯\",\"鋒\",\"貧\",\"虛\",\"彎\",\"摩\",\"泰\",\"幼\",\"廷\",\"尊\",\"窗\",\"綱\",\"弄\",\"隸\",\"疑\",\"氏\",\"宮\",\"姐\",\"震\",\"瑞\",\"怪\",\"尤\",\"琴\",\"循\",\"描\",\"膜\",\"違\",\"夾\",\"腰\",\"緣\",\"珠\",\"窮\",\"森\",\"枝\",\"竹\",\"溝\",\"催\",\"繩\",\"憶\",\"邦\",\"剩\",\"幸\",\"漿\",\"欄\",\"擁\",\"牙\",\"貯\",\"禮\",\"濾\",\"鈉\",\"紋\",\"罷\",\"拍\",\"咱\",\"喊\",\"袖\",\"埃\",\"勤\",\"罰\",\"焦\",\"潛\",\"伍\",\"墨\",\"欲\",\"縫\",\"姓\",\"刊\",\"飽\",\"仿\",\"獎\",\"鋁\",\"鬼\",\"麗\",\"跨\",\"默\",\"挖\",\"鏈\",\"掃\",\"喝\",\"袋\",\"炭\",\"污\",\"幕\",\"諸\",\"弧\",\"勵\",\"梅\",\"奶\",\"潔\",\"災\",\"舟\",\"鑑\",\"苯\",\"訟\",\"抱\",\"毀\",\"懂\",\"寒\",\"智\",\"埔\",\"寄\",\"屆\",\"躍\",\"渡\",\"挑\",\"丹\",\"艱\",\"貝\",\"碰\",\"拔\",\"爹\",\"戴\",\"碼\",\"夢\",\"芽\",\"熔\",\"赤\",\"漁\",\"哭\",\"敬\",\"顆\",\"奔\",\"鉛\",\"仲\",\"虎\",\"稀\",\"妹\",\"乏\",\"珍\",\"申\",\"桌\",\"遵\",\"允\",\"隆\",\"螺\",\"倉\",\"魏\",\"銳\",\"曉\",\"氮\",\"兼\",\"隱\",\"礙\",\"赫\",\"撥\",\"忠\",\"肅\",\"缸\",\"牽\",\"搶\",\"博\",\"巧\",\"殼\",\"兄\",\"杜\",\"訊\",\"誠\",\"碧\",\"祥\",\"柯\",\"頁\",\"巡\",\"矩\",\"悲\",\"灌\",\"齡\",\"倫\",\"票\",\"尋\",\"桂\",\"鋪\",\"聖\",\"恐\",\"恰\",\"鄭\",\"趣\",\"抬\",\"荒\",\"騰\",\"貼\",\"柔\",\"滴\",\"猛\",\"闊\",\"輛\",\"妻\",\"填\",\"撤\",\"儲\",\"簽\",\"鬧\",\"擾\",\"紫\",\"砂\",\"遞\",\"戲\",\"吊\",\"陶\",\"伐\",\"餵\",\"療\",\"瓶\",\"婆\",\"撫\",\"臂\",\"摸\",\"忍\",\"蝦\",\"蠟\",\"鄰\",\"胸\",\"鞏\",\"擠\",\"偶\",\"棄\",\"槽\",\"勁\",\"乳\",\"鄧\",\"吉\",\"仁\",\"爛\",\"磚\",\"租\",\"烏\",\"艦\",\"伴\",\"瓜\",\"淺\",\"丙\",\"暫\",\"燥\",\"橡\",\"柳\",\"迷\",\"暖\",\"牌\",\"秧\",\"膽\",\"詳\",\"簧\",\"踏\",\"瓷\",\"譜\",\"呆\",\"賓\",\"糊\",\"洛\",\"輝\",\"憤\",\"競\",\"隙\",\"怒\",\"粘\",\"乃\",\"緒\",\"肩\",\"籍\",\"敏\",\"塗\",\"熙\",\"皆\",\"偵\",\"懸\",\"掘\",\"享\",\"糾\",\"醒\",\"狂\",\"鎖\",\"淀\",\"恨\",\"牲\",\"霸\",\"爬\",\"賞\",\"逆\",\"玩\",\"陵\",\"祝\",\"秒\",\"浙\",\"貌\",\"役\",\"彼\",\"悉\",\"鴨\",\"趨\",\"鳳\",\"晨\",\"畜\",\"輩\",\"秩\",\"卵\",\"署\",\"梯\",\"炎\",\"灘\",\"棋\",\"驅\",\"篩\",\"峽\",\"冒\",\"啥\",\"壽\",\"譯\",\"浸\",\"泉\",\"帽\",\"遲\",\"矽\",\"疆\",\"貸\",\"漏\",\"稿\",\"冠\",\"嫩\",\"脅\",\"芯\",\"牢\",\"叛\",\"蝕\",\"奧\",\"鳴\",\"嶺\",\"羊\",\"憑\",\"串\",\"塘\",\"繪\",\"酵\",\"融\",\"盆\",\"錫\",\"廟\",\"籌\",\"凍\",\"輔\",\"攝\",\"襲\",\"筋\",\"拒\",\"僚\",\"旱\",\"鉀\",\"鳥\",\"漆\",\"沈\",\"眉\",\"疏\",\"添\",\"棒\",\"穗\",\"硝\",\"韓\",\"逼\",\"扭\",\"僑\",\"涼\",\"挺\",\"碗\",\"栽\",\"炒\",\"杯\",\"患\",\"餾\",\"勸\",\"豪\",\"遼\",\"勃\",\"鴻\",\"旦\",\"吏\",\"拜\",\"狗\",\"埋\",\"輥\",\"掩\",\"飲\",\"搬\",\"罵\",\"辭\",\"勾\",\"扣\",\"估\",\"蔣\",\"絨\",\"霧\",\"丈\",\"朵\",\"姆\",\"擬\",\"宇\",\"輯\",\"陝\",\"雕\",\"償\",\"蓄\",\"崇\",\"剪\",\"倡\",\"廳\",\"咬\",\"駛\",\"薯\",\"刷\",\"斥\",\"番\",\"賦\",\"奉\",\"佛\",\"澆\",\"漫\",\"曼\",\"扇\",\"鈣\",\"桃\",\"扶\",\"仔\",\"返\",\"俗\",\"虧\",\"腔\",\"鞋\",\"棱\",\"覆\",\"框\",\"悄\",\"叔\",\"撞\",\"騙\",\"勘\",\"旺\",\"沸\",\"孤\",\"吐\",\"孟\",\"渠\",\"屈\",\"疾\",\"妙\",\"惜\",\"仰\",\"狠\",\"脹\",\"諧\",\"拋\",\"黴\",\"桑\",\"崗\",\"嘛\",\"衰\",\"盜\",\"滲\",\"臟\",\"賴\",\"湧\",\"甜\",\"曹\",\"閱\",\"肌\",\"哩\",\"厲\",\"烴\",\"緯\",\"毅\",\"昨\",\"偽\",\"症\",\"煮\",\"嘆\",\"釘\",\"搭\",\"莖\",\"籠\",\"酷\",\"偷\",\"弓\",\"錐\",\"恆\",\"傑\",\"坑\",\"鼻\",\"翼\",\"綸\",\"敘\",\"獄\",\"逮\",\"罐\",\"絡\",\"棚\",\"抑\",\"膨\",\"蔬\",\"寺\",\"驟\",\"穆\",\"冶\",\"枯\",\"冊\",\"屍\",\"凸\",\"紳\",\"坯\",\"犧\",\"焰\",\"轟\",\"欣\",\"晉\",\"瘦\",\"禦\",\"錠\",\"錦\",\"喪\",\"旬\",\"鍛\",\"壟\",\"搜\",\"撲\",\"邀\",\"亭\",\"酯\",\"邁\",\"舒\",\"脆\",\"酶\",\"閒\",\"憂\",\"酚\",\"頑\",\"羽\",\"漲\",\"卸\",\"仗\",\"陪\",\"闢\",\"懲\",\"杭\",\"姚\",\"肚\",\"捉\",\"飄\",\"漂\",\"昆\",\"欺\",\"吾\",\"郎\",\"烷\",\"汁\",\"呵\",\"飾\",\"蕭\",\"雅\",\"郵\",\"遷\",\"燕\",\"撒\",\"姻\",\"赴\",\"宴\",\"煩\",\"債\",\"帳\",\"斑\",\"鈴\",\"旨\",\"醇\",\"董\",\"餅\",\"雛\",\"姿\",\"拌\",\"傅\",\"腹\",\"妥\",\"揉\",\"賢\",\"拆\",\"歪\",\"葡\",\"胺\",\"丟\",\"浩\",\"徽\",\"昂\",\"墊\",\"擋\",\"覽\",\"貪\",\"慰\",\"繳\",\"汪\",\"慌\",\"馮\",\"諾\",\"姜\",\"誼\",\"兇\",\"劣\",\"誣\",\"耀\",\"昏\",\"躺\",\"盈\",\"騎\",\"喬\",\"溪\",\"叢\",\"盧\",\"抹\",\"悶\",\"諮\",\"刮\",\"駕\",\"纜\",\"悟\",\"摘\",\"鉺\",\"擲\",\"頗\",\"幻\",\"柄\",\"惠\",\"慘\",\"佳\",\"仇\",\"臘\",\"窩\",\"滌\",\"劍\",\"瞧\",\"堡\",\"潑\",\"蔥\",\"罩\",\"霍\",\"撈\",\"胎\",\"蒼\",\"濱\",\"倆\",\"捅\",\"湘\",\"砍\",\"霞\",\"邵\",\"萄\",\"瘋\",\"淮\",\"遂\",\"熊\",\"糞\",\"烘\",\"宿\",\"檔\",\"戈\",\"駁\",\"嫂\",\"裕\",\"徙\",\"箭\",\"捐\",\"腸\",\"撐\",\"曬\",\"辨\",\"殿\",\"蓮\",\"攤\",\"攪\",\"醬\",\"屏\",\"疫\",\"哀\",\"蔡\",\"堵\",\"沫\",\"皺\",\"暢\",\"疊\",\"閣\",\"萊\",\"敲\",\"轄\",\"鉤\",\"痕\",\"壩\",\"巷\",\"餓\",\"禍\",\"丘\",\"玄\",\"溜\",\"曰\",\"邏\",\"彭\",\"嘗\",\"卿\",\"妨\",\"艇\",\"吞\",\"韋\",\"怨\",\"矮\",\"歇\"]");

const require$$3 = /* #__PURE__ */ JSON.parse("[\"가격\",\"가끔\",\"가난\",\"가능\",\"가득\",\"가르침\",\"가뭄\",\"가방\",\"가상\",\"가슴\",\"가운데\",\"가을\",\"가이드\",\"가입\",\"가장\",\"가정\",\"가족\",\"가죽\",\"각오\",\"각자\",\"간격\",\"간부\",\"간섭\",\"간장\",\"간접\",\"간판\",\"갈등\",\"갈비\",\"갈색\",\"갈증\",\"감각\",\"감기\",\"감소\",\"감수성\",\"감자\",\"감정\",\"갑자기\",\"강남\",\"강당\",\"강도\",\"강력히\",\"강변\",\"강북\",\"강사\",\"강수량\",\"강아지\",\"강원도\",\"강의\",\"강제\",\"강조\",\"같이\",\"개구리\",\"개나리\",\"개방\",\"개별\",\"개선\",\"개성\",\"개인\",\"객관적\",\"거실\",\"거액\",\"거울\",\"거짓\",\"거품\",\"걱정\",\"건강\",\"건물\",\"건설\",\"건조\",\"건축\",\"걸음\",\"검사\",\"검토\",\"게시판\",\"게임\",\"겨울\",\"견해\",\"결과\",\"결국\",\"결론\",\"결석\",\"결승\",\"결심\",\"결정\",\"결혼\",\"경계\",\"경고\",\"경기\",\"경력\",\"경복궁\",\"경비\",\"경상도\",\"경영\",\"경우\",\"경쟁\",\"경제\",\"경주\",\"경찰\",\"경치\",\"경향\",\"경험\",\"계곡\",\"계단\",\"계란\",\"계산\",\"계속\",\"계약\",\"계절\",\"계층\",\"계획\",\"고객\",\"고구려\",\"고궁\",\"고급\",\"고등학생\",\"고무신\",\"고민\",\"고양이\",\"고장\",\"고전\",\"고집\",\"고춧가루\",\"고통\",\"고향\",\"곡식\",\"골목\",\"골짜기\",\"골프\",\"공간\",\"공개\",\"공격\",\"공군\",\"공급\",\"공기\",\"공동\",\"공무원\",\"공부\",\"공사\",\"공식\",\"공업\",\"공연\",\"공원\",\"공장\",\"공짜\",\"공책\",\"공통\",\"공포\",\"공항\",\"공휴일\",\"과목\",\"과일\",\"과장\",\"과정\",\"과학\",\"관객\",\"관계\",\"관광\",\"관념\",\"관람\",\"관련\",\"관리\",\"관습\",\"관심\",\"관점\",\"관찰\",\"광경\",\"광고\",\"광장\",\"광주\",\"괴로움\",\"굉장히\",\"교과서\",\"교문\",\"교복\",\"교실\",\"교양\",\"교육\",\"교장\",\"교직\",\"교통\",\"교환\",\"교훈\",\"구경\",\"구름\",\"구멍\",\"구별\",\"구분\",\"구석\",\"구성\",\"구속\",\"구역\",\"구입\",\"구청\",\"구체적\",\"국가\",\"국기\",\"국내\",\"국립\",\"국물\",\"국민\",\"국수\",\"국어\",\"국왕\",\"국적\",\"국제\",\"국회\",\"군대\",\"군사\",\"군인\",\"궁극적\",\"권리\",\"권위\",\"권투\",\"귀국\",\"귀신\",\"규정\",\"규칙\",\"균형\",\"그날\",\"그냥\",\"그늘\",\"그러나\",\"그룹\",\"그릇\",\"그림\",\"그제서야\",\"그토록\",\"극복\",\"극히\",\"근거\",\"근교\",\"근래\",\"근로\",\"근무\",\"근본\",\"근원\",\"근육\",\"근처\",\"글씨\",\"글자\",\"금강산\",\"금고\",\"금년\",\"금메달\",\"금액\",\"금연\",\"금요일\",\"금지\",\"긍정적\",\"기간\",\"기관\",\"기념\",\"기능\",\"기독교\",\"기둥\",\"기록\",\"기름\",\"기법\",\"기본\",\"기분\",\"기쁨\",\"기숙사\",\"기술\",\"기억\",\"기업\",\"기온\",\"기운\",\"기원\",\"기적\",\"기준\",\"기침\",\"기혼\",\"기획\",\"긴급\",\"긴장\",\"길이\",\"김밥\",\"김치\",\"김포공항\",\"깍두기\",\"깜빡\",\"깨달음\",\"깨소금\",\"껍질\",\"꼭대기\",\"꽃잎\",\"나들이\",\"나란히\",\"나머지\",\"나물\",\"나침반\",\"나흘\",\"낙엽\",\"난방\",\"날개\",\"날씨\",\"날짜\",\"남녀\",\"남대문\",\"남매\",\"남산\",\"남자\",\"남편\",\"남학생\",\"낭비\",\"낱말\",\"내년\",\"내용\",\"내일\",\"냄비\",\"냄새\",\"냇물\",\"냉동\",\"냉면\",\"냉방\",\"냉장고\",\"넥타이\",\"넷째\",\"노동\",\"노란색\",\"노력\",\"노인\",\"녹음\",\"녹차\",\"녹화\",\"논리\",\"논문\",\"논쟁\",\"놀이\",\"농구\",\"농담\",\"농민\",\"농부\",\"농업\",\"농장\",\"농촌\",\"높이\",\"눈동자\",\"눈물\",\"눈썹\",\"뉴욕\",\"느낌\",\"늑대\",\"능동적\",\"능력\",\"다방\",\"다양성\",\"다음\",\"다이어트\",\"다행\",\"단계\",\"단골\",\"단독\",\"단맛\",\"단순\",\"단어\",\"단위\",\"단점\",\"단체\",\"단추\",\"단편\",\"단풍\",\"달걀\",\"달러\",\"달력\",\"달리\",\"닭고기\",\"담당\",\"담배\",\"담요\",\"담임\",\"답변\",\"답장\",\"당근\",\"당분간\",\"당연히\",\"당장\",\"대규모\",\"대낮\",\"대단히\",\"대답\",\"대도시\",\"대략\",\"대량\",\"대륙\",\"대문\",\"대부분\",\"대신\",\"대응\",\"대장\",\"대전\",\"대접\",\"대중\",\"대책\",\"대출\",\"대충\",\"대통령\",\"대학\",\"대한민국\",\"대합실\",\"대형\",\"덩어리\",\"데이트\",\"도대체\",\"도덕\",\"도둑\",\"도망\",\"도서관\",\"도심\",\"도움\",\"도입\",\"도자기\",\"도저히\",\"도전\",\"도중\",\"도착\",\"독감\",\"독립\",\"독서\",\"독일\",\"독창적\",\"동화책\",\"뒷모습\",\"뒷산\",\"딸아이\",\"마누라\",\"마늘\",\"마당\",\"마라톤\",\"마련\",\"마무리\",\"마사지\",\"마약\",\"마요네즈\",\"마을\",\"마음\",\"마이크\",\"마중\",\"마지막\",\"마찬가지\",\"마찰\",\"마흔\",\"막걸리\",\"막내\",\"막상\",\"만남\",\"만두\",\"만세\",\"만약\",\"만일\",\"만점\",\"만족\",\"만화\",\"많이\",\"말기\",\"말씀\",\"말투\",\"맘대로\",\"망원경\",\"매년\",\"매달\",\"매력\",\"매번\",\"매스컴\",\"매일\",\"매장\",\"맥주\",\"먹이\",\"먼저\",\"먼지\",\"멀리\",\"메일\",\"며느리\",\"며칠\",\"면담\",\"멸치\",\"명단\",\"명령\",\"명예\",\"명의\",\"명절\",\"명칭\",\"명함\",\"모금\",\"모니터\",\"모델\",\"모든\",\"모범\",\"모습\",\"모양\",\"모임\",\"모조리\",\"모집\",\"모퉁이\",\"목걸이\",\"목록\",\"목사\",\"목소리\",\"목숨\",\"목적\",\"목표\",\"몰래\",\"몸매\",\"몸무게\",\"몸살\",\"몸속\",\"몸짓\",\"몸통\",\"몹시\",\"무관심\",\"무궁화\",\"무더위\",\"무덤\",\"무릎\",\"무슨\",\"무엇\",\"무역\",\"무용\",\"무조건\",\"무지개\",\"무척\",\"문구\",\"문득\",\"문법\",\"문서\",\"문제\",\"문학\",\"문화\",\"물가\",\"물건\",\"물결\",\"물고기\",\"물론\",\"물리학\",\"물음\",\"물질\",\"물체\",\"미국\",\"미디어\",\"미사일\",\"미술\",\"미역\",\"미용실\",\"미움\",\"미인\",\"미팅\",\"미혼\",\"민간\",\"민족\",\"민주\",\"믿음\",\"밀가루\",\"밀리미터\",\"밑바닥\",\"바가지\",\"바구니\",\"바나나\",\"바늘\",\"바닥\",\"바닷가\",\"바람\",\"바이러스\",\"바탕\",\"박물관\",\"박사\",\"박수\",\"반대\",\"반드시\",\"반말\",\"반발\",\"반성\",\"반응\",\"반장\",\"반죽\",\"반지\",\"반찬\",\"받침\",\"발가락\",\"발걸음\",\"발견\",\"발달\",\"발레\",\"발목\",\"발바닥\",\"발생\",\"발음\",\"발자국\",\"발전\",\"발톱\",\"발표\",\"밤하늘\",\"밥그릇\",\"밥맛\",\"밥상\",\"밥솥\",\"방금\",\"방면\",\"방문\",\"방바닥\",\"방법\",\"방송\",\"방식\",\"방안\",\"방울\",\"방지\",\"방학\",\"방해\",\"방향\",\"배경\",\"배꼽\",\"배달\",\"배드민턴\",\"백두산\",\"백색\",\"백성\",\"백인\",\"백제\",\"백화점\",\"버릇\",\"버섯\",\"버튼\",\"번개\",\"번역\",\"번지\",\"번호\",\"벌금\",\"벌레\",\"벌써\",\"범위\",\"범인\",\"범죄\",\"법률\",\"법원\",\"법적\",\"법칙\",\"베이징\",\"벨트\",\"변경\",\"변동\",\"변명\",\"변신\",\"변호사\",\"변화\",\"별도\",\"별명\",\"별일\",\"병실\",\"병아리\",\"병원\",\"보관\",\"보너스\",\"보라색\",\"보람\",\"보름\",\"보상\",\"보안\",\"보자기\",\"보장\",\"보전\",\"보존\",\"보통\",\"보편적\",\"보험\",\"복도\",\"복사\",\"복숭아\",\"복습\",\"볶음\",\"본격적\",\"본래\",\"본부\",\"본사\",\"본성\",\"본인\",\"본질\",\"볼펜\",\"봉사\",\"봉지\",\"봉투\",\"부근\",\"부끄러움\",\"부담\",\"부동산\",\"부문\",\"부분\",\"부산\",\"부상\",\"부엌\",\"부인\",\"부작용\",\"부장\",\"부정\",\"부족\",\"부지런히\",\"부친\",\"부탁\",\"부품\",\"부회장\",\"북부\",\"북한\",\"분노\",\"분량\",\"분리\",\"분명\",\"분석\",\"분야\",\"분위기\",\"분필\",\"분홍색\",\"불고기\",\"불과\",\"불교\",\"불꽃\",\"불만\",\"불법\",\"불빛\",\"불안\",\"불이익\",\"불행\",\"브랜드\",\"비극\",\"비난\",\"비닐\",\"비둘기\",\"비디오\",\"비로소\",\"비만\",\"비명\",\"비밀\",\"비바람\",\"비빔밥\",\"비상\",\"비용\",\"비율\",\"비중\",\"비타민\",\"비판\",\"빌딩\",\"빗물\",\"빗방울\",\"빗줄기\",\"빛깔\",\"빨간색\",\"빨래\",\"빨리\",\"사건\",\"사계절\",\"사나이\",\"사냥\",\"사람\",\"사랑\",\"사립\",\"사모님\",\"사물\",\"사방\",\"사상\",\"사생활\",\"사설\",\"사슴\",\"사실\",\"사업\",\"사용\",\"사월\",\"사장\",\"사전\",\"사진\",\"사촌\",\"사춘기\",\"사탕\",\"사투리\",\"사흘\",\"산길\",\"산부인과\",\"산업\",\"산책\",\"살림\",\"살인\",\"살짝\",\"삼계탕\",\"삼국\",\"삼십\",\"삼월\",\"삼촌\",\"상관\",\"상금\",\"상대\",\"상류\",\"상반기\",\"상상\",\"상식\",\"상업\",\"상인\",\"상자\",\"상점\",\"상처\",\"상추\",\"상태\",\"상표\",\"상품\",\"상황\",\"새벽\",\"색깔\",\"색연필\",\"생각\",\"생명\",\"생물\",\"생방송\",\"생산\",\"생선\",\"생신\",\"생일\",\"생활\",\"서랍\",\"서른\",\"서명\",\"서민\",\"서비스\",\"서양\",\"서울\",\"서적\",\"서점\",\"서쪽\",\"서클\",\"석사\",\"석유\",\"선거\",\"선물\",\"선배\",\"선생\",\"선수\",\"선원\",\"선장\",\"선전\",\"선택\",\"선풍기\",\"설거지\",\"설날\",\"설렁탕\",\"설명\",\"설문\",\"설사\",\"설악산\",\"설치\",\"설탕\",\"섭씨\",\"성공\",\"성당\",\"성명\",\"성별\",\"성인\",\"성장\",\"성적\",\"성질\",\"성함\",\"세금\",\"세미나\",\"세상\",\"세월\",\"세종대왕\",\"세탁\",\"센터\",\"센티미터\",\"셋째\",\"소규모\",\"소극적\",\"소금\",\"소나기\",\"소년\",\"소득\",\"소망\",\"소문\",\"소설\",\"소속\",\"소아과\",\"소용\",\"소원\",\"소음\",\"소중히\",\"소지품\",\"소질\",\"소풍\",\"소형\",\"속담\",\"속도\",\"속옷\",\"손가락\",\"손길\",\"손녀\",\"손님\",\"손등\",\"손목\",\"손뼉\",\"손실\",\"손질\",\"손톱\",\"손해\",\"솔직히\",\"솜씨\",\"송아지\",\"송이\",\"송편\",\"쇠고기\",\"쇼핑\",\"수건\",\"수년\",\"수단\",\"수돗물\",\"수동적\",\"수면\",\"수명\",\"수박\",\"수상\",\"수석\",\"수술\",\"수시로\",\"수업\",\"수염\",\"수영\",\"수입\",\"수준\",\"수집\",\"수출\",\"수컷\",\"수필\",\"수학\",\"수험생\",\"수화기\",\"숙녀\",\"숙소\",\"숙제\",\"순간\",\"순서\",\"순수\",\"순식간\",\"순위\",\"숟가락\",\"술병\",\"술집\",\"숫자\",\"스님\",\"스물\",\"스스로\",\"스승\",\"스웨터\",\"스위치\",\"스케이트\",\"스튜디오\",\"스트레스\",\"스포츠\",\"슬쩍\",\"슬픔\",\"습관\",\"습기\",\"승객\",\"승리\",\"승부\",\"승용차\",\"승진\",\"시각\",\"시간\",\"시골\",\"시금치\",\"시나리오\",\"시댁\",\"시리즈\",\"시멘트\",\"시민\",\"시부모\",\"시선\",\"시설\",\"시스템\",\"시아버지\",\"시어머니\",\"시월\",\"시인\",\"시일\",\"시작\",\"시장\",\"시절\",\"시점\",\"시중\",\"시즌\",\"시집\",\"시청\",\"시합\",\"시험\",\"식구\",\"식기\",\"식당\",\"식량\",\"식료품\",\"식물\",\"식빵\",\"식사\",\"식생활\",\"식초\",\"식탁\",\"식품\",\"신고\",\"신규\",\"신념\",\"신문\",\"신발\",\"신비\",\"신사\",\"신세\",\"신용\",\"신제품\",\"신청\",\"신체\",\"신화\",\"실감\",\"실내\",\"실력\",\"실례\",\"실망\",\"실수\",\"실습\",\"실시\",\"실장\",\"실정\",\"실질적\",\"실천\",\"실체\",\"실컷\",\"실태\",\"실패\",\"실험\",\"실현\",\"심리\",\"심부름\",\"심사\",\"심장\",\"심정\",\"심판\",\"쌍둥이\",\"씨름\",\"씨앗\",\"아가씨\",\"아나운서\",\"아드님\",\"아들\",\"아쉬움\",\"아스팔트\",\"아시아\",\"아울러\",\"아저씨\",\"아줌마\",\"아직\",\"아침\",\"아파트\",\"아프리카\",\"아픔\",\"아홉\",\"아흔\",\"악기\",\"악몽\",\"악수\",\"안개\",\"안경\",\"안과\",\"안내\",\"안녕\",\"안동\",\"안방\",\"안부\",\"안주\",\"알루미늄\",\"알코올\",\"암시\",\"암컷\",\"압력\",\"앞날\",\"앞문\",\"애인\",\"애정\",\"액수\",\"앨범\",\"야간\",\"야단\",\"야옹\",\"약간\",\"약국\",\"약속\",\"약수\",\"약점\",\"약품\",\"약혼녀\",\"양념\",\"양력\",\"양말\",\"양배추\",\"양주\",\"양파\",\"어둠\",\"어려움\",\"어른\",\"어젯밤\",\"어쨌든\",\"어쩌다가\",\"어쩐지\",\"언니\",\"언덕\",\"언론\",\"언어\",\"얼굴\",\"얼른\",\"얼음\",\"얼핏\",\"엄마\",\"업무\",\"업종\",\"업체\",\"엉덩이\",\"엉망\",\"엉터리\",\"엊그제\",\"에너지\",\"에어컨\",\"엔진\",\"여건\",\"여고생\",\"여관\",\"여군\",\"여권\",\"여대생\",\"여덟\",\"여동생\",\"여든\",\"여론\",\"여름\",\"여섯\",\"여성\",\"여왕\",\"여인\",\"여전히\",\"여직원\",\"여학생\",\"여행\",\"역사\",\"역시\",\"역할\",\"연결\",\"연구\",\"연극\",\"연기\",\"연락\",\"연설\",\"연세\",\"연속\",\"연습\",\"연애\",\"연예인\",\"연인\",\"연장\",\"연주\",\"연출\",\"연필\",\"연합\",\"연휴\",\"열기\",\"열매\",\"열쇠\",\"열심히\",\"열정\",\"열차\",\"열흘\",\"염려\",\"엽서\",\"영국\",\"영남\",\"영상\",\"영양\",\"영역\",\"영웅\",\"영원히\",\"영하\",\"영향\",\"영혼\",\"영화\",\"옆구리\",\"옆방\",\"옆집\",\"예감\",\"예금\",\"예방\",\"예산\",\"예상\",\"예선\",\"예술\",\"예습\",\"예식장\",\"예약\",\"예전\",\"예절\",\"예정\",\"예컨대\",\"옛날\",\"오늘\",\"오락\",\"오랫동안\",\"오렌지\",\"오로지\",\"오른발\",\"오븐\",\"오십\",\"오염\",\"오월\",\"오전\",\"오직\",\"오징어\",\"오페라\",\"오피스텔\",\"오히려\",\"옥상\",\"옥수수\",\"온갖\",\"온라인\",\"온몸\",\"온종일\",\"온통\",\"올가을\",\"올림픽\",\"올해\",\"옷차림\",\"와이셔츠\",\"와인\",\"완성\",\"완전\",\"왕비\",\"왕자\",\"왜냐하면\",\"왠지\",\"외갓집\",\"외국\",\"외로움\",\"외삼촌\",\"외출\",\"외침\",\"외할머니\",\"왼발\",\"왼손\",\"왼쪽\",\"요금\",\"요일\",\"요즘\",\"요청\",\"용기\",\"용서\",\"용어\",\"우산\",\"우선\",\"우승\",\"우연히\",\"우정\",\"우체국\",\"우편\",\"운동\",\"운명\",\"운반\",\"운전\",\"운행\",\"울산\",\"울음\",\"움직임\",\"웃어른\",\"웃음\",\"워낙\",\"원고\",\"원래\",\"원서\",\"원숭이\",\"원인\",\"원장\",\"원피스\",\"월급\",\"월드컵\",\"월세\",\"월요일\",\"웨이터\",\"위반\",\"위법\",\"위성\",\"위원\",\"위험\",\"위협\",\"윗사람\",\"유난히\",\"유럽\",\"유명\",\"유물\",\"유산\",\"유적\",\"유치원\",\"유학\",\"유행\",\"유형\",\"육군\",\"육상\",\"육십\",\"육체\",\"은행\",\"음력\",\"음료\",\"음반\",\"음성\",\"음식\",\"음악\",\"음주\",\"의견\",\"의논\",\"의문\",\"의복\",\"의식\",\"의심\",\"의외로\",\"의욕\",\"의원\",\"의학\",\"이것\",\"이곳\",\"이념\",\"이놈\",\"이달\",\"이대로\",\"이동\",\"이렇게\",\"이력서\",\"이론적\",\"이름\",\"이민\",\"이발소\",\"이별\",\"이불\",\"이빨\",\"이상\",\"이성\",\"이슬\",\"이야기\",\"이용\",\"이웃\",\"이월\",\"이윽고\",\"이익\",\"이전\",\"이중\",\"이튿날\",\"이틀\",\"이혼\",\"인간\",\"인격\",\"인공\",\"인구\",\"인근\",\"인기\",\"인도\",\"인류\",\"인물\",\"인생\",\"인쇄\",\"인연\",\"인원\",\"인재\",\"인종\",\"인천\",\"인체\",\"인터넷\",\"인하\",\"인형\",\"일곱\",\"일기\",\"일단\",\"일대\",\"일등\",\"일반\",\"일본\",\"일부\",\"일상\",\"일생\",\"일손\",\"일요일\",\"일월\",\"일정\",\"일종\",\"일주일\",\"일찍\",\"일체\",\"일치\",\"일행\",\"일회용\",\"임금\",\"임무\",\"입대\",\"입력\",\"입맛\",\"입사\",\"입술\",\"입시\",\"입원\",\"입장\",\"입학\",\"자가용\",\"자격\",\"자극\",\"자동\",\"자랑\",\"자부심\",\"자식\",\"자신\",\"자연\",\"자원\",\"자율\",\"자전거\",\"자정\",\"자존심\",\"자판\",\"작가\",\"작년\",\"작성\",\"작업\",\"작용\",\"작은딸\",\"작품\",\"잔디\",\"잔뜩\",\"잔치\",\"잘못\",\"잠깐\",\"잠수함\",\"잠시\",\"잠옷\",\"잠자리\",\"잡지\",\"장관\",\"장군\",\"장기간\",\"장래\",\"장례\",\"장르\",\"장마\",\"장면\",\"장모\",\"장미\",\"장비\",\"장사\",\"장소\",\"장식\",\"장애인\",\"장인\",\"장점\",\"장차\",\"장학금\",\"재능\",\"재빨리\",\"재산\",\"재생\",\"재작년\",\"재정\",\"재채기\",\"재판\",\"재학\",\"재활용\",\"저것\",\"저고리\",\"저곳\",\"저녁\",\"저런\",\"저렇게\",\"저번\",\"저울\",\"저절로\",\"저축\",\"적극\",\"적당히\",\"적성\",\"적용\",\"적응\",\"전개\",\"전공\",\"전기\",\"전달\",\"전라도\",\"전망\",\"전문\",\"전반\",\"전부\",\"전세\",\"전시\",\"전용\",\"전자\",\"전쟁\",\"전주\",\"전철\",\"전체\",\"전통\",\"전혀\",\"전후\",\"절대\",\"절망\",\"절반\",\"절약\",\"절차\",\"점검\",\"점수\",\"점심\",\"점원\",\"점점\",\"점차\",\"접근\",\"접시\",\"접촉\",\"젓가락\",\"정거장\",\"정도\",\"정류장\",\"정리\",\"정말\",\"정면\",\"정문\",\"정반대\",\"정보\",\"정부\",\"정비\",\"정상\",\"정성\",\"정오\",\"정원\",\"정장\",\"정지\",\"정치\",\"정확히\",\"제공\",\"제과점\",\"제대로\",\"제목\",\"제발\",\"제법\",\"제삿날\",\"제안\",\"제일\",\"제작\",\"제주도\",\"제출\",\"제품\",\"제한\",\"조각\",\"조건\",\"조금\",\"조깅\",\"조명\",\"조미료\",\"조상\",\"조선\",\"조용히\",\"조절\",\"조정\",\"조직\",\"존댓말\",\"존재\",\"졸업\",\"졸음\",\"종교\",\"종로\",\"종류\",\"종소리\",\"종업원\",\"종종\",\"종합\",\"좌석\",\"죄인\",\"주관적\",\"주름\",\"주말\",\"주머니\",\"주먹\",\"주문\",\"주민\",\"주방\",\"주변\",\"주식\",\"주인\",\"주일\",\"주장\",\"주전자\",\"주택\",\"준비\",\"줄거리\",\"줄기\",\"줄무늬\",\"중간\",\"중계방송\",\"중국\",\"중년\",\"중단\",\"중독\",\"중반\",\"중부\",\"중세\",\"중소기업\",\"중순\",\"중앙\",\"중요\",\"중학교\",\"즉석\",\"즉시\",\"즐거움\",\"증가\",\"증거\",\"증권\",\"증상\",\"증세\",\"지각\",\"지갑\",\"지경\",\"지극히\",\"지금\",\"지급\",\"지능\",\"지름길\",\"지리산\",\"지방\",\"지붕\",\"지식\",\"지역\",\"지우개\",\"지원\",\"지적\",\"지점\",\"지진\",\"지출\",\"직선\",\"직업\",\"직원\",\"직장\",\"진급\",\"진동\",\"진로\",\"진료\",\"진리\",\"진짜\",\"진찰\",\"진출\",\"진통\",\"진행\",\"질문\",\"질병\",\"질서\",\"짐작\",\"집단\",\"집안\",\"집중\",\"짜증\",\"찌꺼기\",\"차남\",\"차라리\",\"차량\",\"차림\",\"차별\",\"차선\",\"차츰\",\"착각\",\"찬물\",\"찬성\",\"참가\",\"참기름\",\"참새\",\"참석\",\"참여\",\"참외\",\"참조\",\"찻잔\",\"창가\",\"창고\",\"창구\",\"창문\",\"창밖\",\"창작\",\"창조\",\"채널\",\"채점\",\"책가방\",\"책방\",\"책상\",\"책임\",\"챔피언\",\"처벌\",\"처음\",\"천국\",\"천둥\",\"천장\",\"천재\",\"천천히\",\"철도\",\"철저히\",\"철학\",\"첫날\",\"첫째\",\"청년\",\"청바지\",\"청소\",\"청춘\",\"체계\",\"체력\",\"체온\",\"체육\",\"체중\",\"체험\",\"초등학생\",\"초반\",\"초밥\",\"초상화\",\"초순\",\"초여름\",\"초원\",\"초저녁\",\"초점\",\"초청\",\"초콜릿\",\"촛불\",\"총각\",\"총리\",\"총장\",\"촬영\",\"최근\",\"최상\",\"최선\",\"최신\",\"최악\",\"최종\",\"추석\",\"추억\",\"추진\",\"추천\",\"추측\",\"축구\",\"축소\",\"축제\",\"축하\",\"출근\",\"출발\",\"출산\",\"출신\",\"출연\",\"출입\",\"출장\",\"출판\",\"충격\",\"충고\",\"충돌\",\"충분히\",\"충청도\",\"취업\",\"취직\",\"취향\",\"치약\",\"친구\",\"친척\",\"칠십\",\"칠월\",\"칠판\",\"침대\",\"침묵\",\"침실\",\"칫솔\",\"칭찬\",\"카메라\",\"카운터\",\"칼국수\",\"캐릭터\",\"캠퍼스\",\"캠페인\",\"커튼\",\"컨디션\",\"컬러\",\"컴퓨터\",\"코끼리\",\"코미디\",\"콘서트\",\"콜라\",\"콤플렉스\",\"콩나물\",\"쾌감\",\"쿠데타\",\"크림\",\"큰길\",\"큰딸\",\"큰소리\",\"큰아들\",\"큰어머니\",\"큰일\",\"큰절\",\"클래식\",\"클럽\",\"킬로\",\"타입\",\"타자기\",\"탁구\",\"탁자\",\"탄생\",\"태권도\",\"태양\",\"태풍\",\"택시\",\"탤런트\",\"터널\",\"터미널\",\"테니스\",\"테스트\",\"테이블\",\"텔레비전\",\"토론\",\"토마토\",\"토요일\",\"통계\",\"통과\",\"통로\",\"통신\",\"통역\",\"통일\",\"통장\",\"통제\",\"통증\",\"통합\",\"통화\",\"퇴근\",\"퇴원\",\"퇴직금\",\"튀김\",\"트럭\",\"특급\",\"특별\",\"특성\",\"특수\",\"특징\",\"특히\",\"튼튼히\",\"티셔츠\",\"파란색\",\"파일\",\"파출소\",\"판결\",\"판단\",\"판매\",\"판사\",\"팔십\",\"팔월\",\"팝송\",\"패션\",\"팩스\",\"팩시밀리\",\"팬티\",\"퍼센트\",\"페인트\",\"편견\",\"편의\",\"편지\",\"편히\",\"평가\",\"평균\",\"평생\",\"평소\",\"평양\",\"평일\",\"평화\",\"포스터\",\"포인트\",\"포장\",\"포함\",\"표면\",\"표정\",\"표준\",\"표현\",\"품목\",\"품질\",\"풍경\",\"풍속\",\"풍습\",\"프랑스\",\"프린터\",\"플라스틱\",\"피곤\",\"피망\",\"피아노\",\"필름\",\"필수\",\"필요\",\"필자\",\"필통\",\"핑계\",\"하느님\",\"하늘\",\"하드웨어\",\"하룻밤\",\"하반기\",\"하숙집\",\"하순\",\"하여튼\",\"하지만\",\"하천\",\"하품\",\"하필\",\"학과\",\"학교\",\"학급\",\"학기\",\"학년\",\"학력\",\"학번\",\"학부모\",\"학비\",\"학생\",\"학술\",\"학습\",\"학용품\",\"학원\",\"학위\",\"학자\",\"학점\",\"한계\",\"한글\",\"한꺼번에\",\"한낮\",\"한눈\",\"한동안\",\"한때\",\"한라산\",\"한마디\",\"한문\",\"한번\",\"한복\",\"한식\",\"한여름\",\"한쪽\",\"할머니\",\"할아버지\",\"할인\",\"함께\",\"함부로\",\"합격\",\"합리적\",\"항공\",\"항구\",\"항상\",\"항의\",\"해결\",\"해군\",\"해답\",\"해당\",\"해물\",\"해석\",\"해설\",\"해수욕장\",\"해안\",\"핵심\",\"핸드백\",\"햄버거\",\"햇볕\",\"햇살\",\"행동\",\"행복\",\"행사\",\"행운\",\"행위\",\"향기\",\"향상\",\"향수\",\"허락\",\"허용\",\"헬기\",\"현관\",\"현금\",\"현대\",\"현상\",\"현실\",\"현장\",\"현재\",\"현지\",\"혈액\",\"협력\",\"형부\",\"형사\",\"형수\",\"형식\",\"형제\",\"형태\",\"형편\",\"혜택\",\"호기심\",\"호남\",\"호랑이\",\"호박\",\"호텔\",\"호흡\",\"혹시\",\"홀로\",\"홈페이지\",\"홍보\",\"홍수\",\"홍차\",\"화면\",\"화분\",\"화살\",\"화요일\",\"화장\",\"화학\",\"확보\",\"확인\",\"확장\",\"확정\",\"환갑\",\"환경\",\"환영\",\"환율\",\"환자\",\"활기\",\"활동\",\"활발히\",\"활용\",\"활짝\",\"회견\",\"회관\",\"회복\",\"회색\",\"회원\",\"회장\",\"회전\",\"횟수\",\"횡단보도\",\"효율적\",\"후반\",\"후춧가루\",\"훈련\",\"훨씬\",\"휴식\",\"휴일\",\"흉내\",\"흐름\",\"흑백\",\"흑인\",\"흔적\",\"흔히\",\"흥미\",\"흥분\",\"희곡\",\"희망\",\"희생\",\"흰색\",\"힘껏\"]");

const require$$4 = /* #__PURE__ */ JSON.parse("[\"abaisser\",\"abandon\",\"abdiquer\",\"abeille\",\"abolir\",\"aborder\",\"aboutir\",\"aboyer\",\"abrasif\",\"abreuver\",\"abriter\",\"abroger\",\"abrupt\",\"absence\",\"absolu\",\"absurde\",\"abusif\",\"abyssal\",\"académie\",\"acajou\",\"acarien\",\"accabler\",\"accepter\",\"acclamer\",\"accolade\",\"accroche\",\"accuser\",\"acerbe\",\"achat\",\"acheter\",\"aciduler\",\"acier\",\"acompte\",\"acquérir\",\"acronyme\",\"acteur\",\"actif\",\"actuel\",\"adepte\",\"adéquat\",\"adhésif\",\"adjectif\",\"adjuger\",\"admettre\",\"admirer\",\"adopter\",\"adorer\",\"adoucir\",\"adresse\",\"adroit\",\"adulte\",\"adverbe\",\"aérer\",\"aéronef\",\"affaire\",\"affecter\",\"affiche\",\"affreux\",\"affubler\",\"agacer\",\"agencer\",\"agile\",\"agiter\",\"agrafer\",\"agréable\",\"agrume\",\"aider\",\"aiguille\",\"ailier\",\"aimable\",\"aisance\",\"ajouter\",\"ajuster\",\"alarmer\",\"alchimie\",\"alerte\",\"algèbre\",\"algue\",\"aliéner\",\"aliment\",\"alléger\",\"alliage\",\"allouer\",\"allumer\",\"alourdir\",\"alpaga\",\"altesse\",\"alvéole\",\"amateur\",\"ambigu\",\"ambre\",\"aménager\",\"amertume\",\"amidon\",\"amiral\",\"amorcer\",\"amour\",\"amovible\",\"amphibie\",\"ampleur\",\"amusant\",\"analyse\",\"anaphore\",\"anarchie\",\"anatomie\",\"ancien\",\"anéantir\",\"angle\",\"angoisse\",\"anguleux\",\"animal\",\"annexer\",\"annonce\",\"annuel\",\"anodin\",\"anomalie\",\"anonyme\",\"anormal\",\"antenne\",\"antidote\",\"anxieux\",\"apaiser\",\"apéritif\",\"aplanir\",\"apologie\",\"appareil\",\"appeler\",\"apporter\",\"appuyer\",\"aquarium\",\"aqueduc\",\"arbitre\",\"arbuste\",\"ardeur\",\"ardoise\",\"argent\",\"arlequin\",\"armature\",\"armement\",\"armoire\",\"armure\",\"arpenter\",\"arracher\",\"arriver\",\"arroser\",\"arsenic\",\"artériel\",\"article\",\"aspect\",\"asphalte\",\"aspirer\",\"assaut\",\"asservir\",\"assiette\",\"associer\",\"assurer\",\"asticot\",\"astre\",\"astuce\",\"atelier\",\"atome\",\"atrium\",\"atroce\",\"attaque\",\"attentif\",\"attirer\",\"attraper\",\"aubaine\",\"auberge\",\"audace\",\"audible\",\"augurer\",\"aurore\",\"automne\",\"autruche\",\"avaler\",\"avancer\",\"avarice\",\"avenir\",\"averse\",\"aveugle\",\"aviateur\",\"avide\",\"avion\",\"aviser\",\"avoine\",\"avouer\",\"avril\",\"axial\",\"axiome\",\"badge\",\"bafouer\",\"bagage\",\"baguette\",\"baignade\",\"balancer\",\"balcon\",\"baleine\",\"balisage\",\"bambin\",\"bancaire\",\"bandage\",\"banlieue\",\"bannière\",\"banquier\",\"barbier\",\"baril\",\"baron\",\"barque\",\"barrage\",\"bassin\",\"bastion\",\"bataille\",\"bateau\",\"batterie\",\"baudrier\",\"bavarder\",\"belette\",\"bélier\",\"belote\",\"bénéfice\",\"berceau\",\"berger\",\"berline\",\"bermuda\",\"besace\",\"besogne\",\"bétail\",\"beurre\",\"biberon\",\"bicycle\",\"bidule\",\"bijou\",\"bilan\",\"bilingue\",\"billard\",\"binaire\",\"biologie\",\"biopsie\",\"biotype\",\"biscuit\",\"bison\",\"bistouri\",\"bitume\",\"bizarre\",\"blafard\",\"blague\",\"blanchir\",\"blessant\",\"blinder\",\"blond\",\"bloquer\",\"blouson\",\"bobard\",\"bobine\",\"boire\",\"boiser\",\"bolide\",\"bonbon\",\"bondir\",\"bonheur\",\"bonifier\",\"bonus\",\"bordure\",\"borne\",\"botte\",\"boucle\",\"boueux\",\"bougie\",\"boulon\",\"bouquin\",\"bourse\",\"boussole\",\"boutique\",\"boxeur\",\"branche\",\"brasier\",\"brave\",\"brebis\",\"brèche\",\"breuvage\",\"bricoler\",\"brigade\",\"brillant\",\"brioche\",\"brique\",\"brochure\",\"broder\",\"bronzer\",\"brousse\",\"broyeur\",\"brume\",\"brusque\",\"brutal\",\"bruyant\",\"buffle\",\"buisson\",\"bulletin\",\"bureau\",\"burin\",\"bustier\",\"butiner\",\"butoir\",\"buvable\",\"buvette\",\"cabanon\",\"cabine\",\"cachette\",\"cadeau\",\"cadre\",\"caféine\",\"caillou\",\"caisson\",\"calculer\",\"calepin\",\"calibre\",\"calmer\",\"calomnie\",\"calvaire\",\"camarade\",\"caméra\",\"camion\",\"campagne\",\"canal\",\"caneton\",\"canon\",\"cantine\",\"canular\",\"capable\",\"caporal\",\"caprice\",\"capsule\",\"capter\",\"capuche\",\"carabine\",\"carbone\",\"caresser\",\"caribou\",\"carnage\",\"carotte\",\"carreau\",\"carton\",\"cascade\",\"casier\",\"casque\",\"cassure\",\"causer\",\"caution\",\"cavalier\",\"caverne\",\"caviar\",\"cédille\",\"ceinture\",\"céleste\",\"cellule\",\"cendrier\",\"censurer\",\"central\",\"cercle\",\"cérébral\",\"cerise\",\"cerner\",\"cerveau\",\"cesser\",\"chagrin\",\"chaise\",\"chaleur\",\"chambre\",\"chance\",\"chapitre\",\"charbon\",\"chasseur\",\"chaton\",\"chausson\",\"chavirer\",\"chemise\",\"chenille\",\"chéquier\",\"chercher\",\"cheval\",\"chien\",\"chiffre\",\"chignon\",\"chimère\",\"chiot\",\"chlorure\",\"chocolat\",\"choisir\",\"chose\",\"chouette\",\"chrome\",\"chute\",\"cigare\",\"cigogne\",\"cimenter\",\"cinéma\",\"cintrer\",\"circuler\",\"cirer\",\"cirque\",\"citerne\",\"citoyen\",\"citron\",\"civil\",\"clairon\",\"clameur\",\"claquer\",\"classe\",\"clavier\",\"client\",\"cligner\",\"climat\",\"clivage\",\"cloche\",\"clonage\",\"cloporte\",\"cobalt\",\"cobra\",\"cocasse\",\"cocotier\",\"coder\",\"codifier\",\"coffre\",\"cogner\",\"cohésion\",\"coiffer\",\"coincer\",\"colère\",\"colibri\",\"colline\",\"colmater\",\"colonel\",\"combat\",\"comédie\",\"commande\",\"compact\",\"concert\",\"conduire\",\"confier\",\"congeler\",\"connoter\",\"consonne\",\"contact\",\"convexe\",\"copain\",\"copie\",\"corail\",\"corbeau\",\"cordage\",\"corniche\",\"corpus\",\"correct\",\"cortège\",\"cosmique\",\"costume\",\"coton\",\"coude\",\"coupure\",\"courage\",\"couteau\",\"couvrir\",\"coyote\",\"crabe\",\"crainte\",\"cravate\",\"crayon\",\"créature\",\"créditer\",\"crémeux\",\"creuser\",\"crevette\",\"cribler\",\"crier\",\"cristal\",\"critère\",\"croire\",\"croquer\",\"crotale\",\"crucial\",\"cruel\",\"crypter\",\"cubique\",\"cueillir\",\"cuillère\",\"cuisine\",\"cuivre\",\"culminer\",\"cultiver\",\"cumuler\",\"cupide\",\"curatif\",\"curseur\",\"cyanure\",\"cycle\",\"cylindre\",\"cynique\",\"daigner\",\"damier\",\"danger\",\"danseur\",\"dauphin\",\"débattre\",\"débiter\",\"déborder\",\"débrider\",\"débutant\",\"décaler\",\"décembre\",\"déchirer\",\"décider\",\"déclarer\",\"décorer\",\"décrire\",\"décupler\",\"dédale\",\"déductif\",\"déesse\",\"défensif\",\"défiler\",\"défrayer\",\"dégager\",\"dégivrer\",\"déglutir\",\"dégrafer\",\"déjeuner\",\"délice\",\"déloger\",\"demander\",\"demeurer\",\"démolir\",\"dénicher\",\"dénouer\",\"dentelle\",\"dénuder\",\"départ\",\"dépenser\",\"déphaser\",\"déplacer\",\"déposer\",\"déranger\",\"dérober\",\"désastre\",\"descente\",\"désert\",\"désigner\",\"désobéir\",\"dessiner\",\"destrier\",\"détacher\",\"détester\",\"détourer\",\"détresse\",\"devancer\",\"devenir\",\"deviner\",\"devoir\",\"diable\",\"dialogue\",\"diamant\",\"dicter\",\"différer\",\"digérer\",\"digital\",\"digne\",\"diluer\",\"dimanche\",\"diminuer\",\"dioxyde\",\"directif\",\"diriger\",\"discuter\",\"disposer\",\"dissiper\",\"distance\",\"divertir\",\"diviser\",\"docile\",\"docteur\",\"dogme\",\"doigt\",\"domaine\",\"domicile\",\"dompter\",\"donateur\",\"donjon\",\"donner\",\"dopamine\",\"dortoir\",\"dorure\",\"dosage\",\"doseur\",\"dossier\",\"dotation\",\"douanier\",\"double\",\"douceur\",\"douter\",\"doyen\",\"dragon\",\"draper\",\"dresser\",\"dribbler\",\"droiture\",\"duperie\",\"duplexe\",\"durable\",\"durcir\",\"dynastie\",\"éblouir\",\"écarter\",\"écharpe\",\"échelle\",\"éclairer\",\"éclipse\",\"éclore\",\"écluse\",\"école\",\"économie\",\"écorce\",\"écouter\",\"écraser\",\"écrémer\",\"écrivain\",\"écrou\",\"écume\",\"écureuil\",\"édifier\",\"éduquer\",\"effacer\",\"effectif\",\"effigie\",\"effort\",\"effrayer\",\"effusion\",\"égaliser\",\"égarer\",\"éjecter\",\"élaborer\",\"élargir\",\"électron\",\"élégant\",\"éléphant\",\"élève\",\"éligible\",\"élitisme\",\"éloge\",\"élucider\",\"éluder\",\"emballer\",\"embellir\",\"embryon\",\"émeraude\",\"émission\",\"emmener\",\"émotion\",\"émouvoir\",\"empereur\",\"employer\",\"emporter\",\"emprise\",\"émulsion\",\"encadrer\",\"enchère\",\"enclave\",\"encoche\",\"endiguer\",\"endosser\",\"endroit\",\"enduire\",\"énergie\",\"enfance\",\"enfermer\",\"enfouir\",\"engager\",\"engin\",\"englober\",\"énigme\",\"enjamber\",\"enjeu\",\"enlever\",\"ennemi\",\"ennuyeux\",\"enrichir\",\"enrobage\",\"enseigne\",\"entasser\",\"entendre\",\"entier\",\"entourer\",\"entraver\",\"énumérer\",\"envahir\",\"enviable\",\"envoyer\",\"enzyme\",\"éolien\",\"épaissir\",\"épargne\",\"épatant\",\"épaule\",\"épicerie\",\"épidémie\",\"épier\",\"épilogue\",\"épine\",\"épisode\",\"épitaphe\",\"époque\",\"épreuve\",\"éprouver\",\"épuisant\",\"équerre\",\"équipe\",\"ériger\",\"érosion\",\"erreur\",\"éruption\",\"escalier\",\"espadon\",\"espèce\",\"espiègle\",\"espoir\",\"esprit\",\"esquiver\",\"essayer\",\"essence\",\"essieu\",\"essorer\",\"estime\",\"estomac\",\"estrade\",\"étagère\",\"étaler\",\"étanche\",\"étatique\",\"éteindre\",\"étendoir\",\"éternel\",\"éthanol\",\"éthique\",\"ethnie\",\"étirer\",\"étoffer\",\"étoile\",\"étonnant\",\"étourdir\",\"étrange\",\"étroit\",\"étude\",\"euphorie\",\"évaluer\",\"évasion\",\"éventail\",\"évidence\",\"éviter\",\"évolutif\",\"évoquer\",\"exact\",\"exagérer\",\"exaucer\",\"exceller\",\"excitant\",\"exclusif\",\"excuse\",\"exécuter\",\"exemple\",\"exercer\",\"exhaler\",\"exhorter\",\"exigence\",\"exiler\",\"exister\",\"exotique\",\"expédier\",\"explorer\",\"exposer\",\"exprimer\",\"exquis\",\"extensif\",\"extraire\",\"exulter\",\"fable\",\"fabuleux\",\"facette\",\"facile\",\"facture\",\"faiblir\",\"falaise\",\"fameux\",\"famille\",\"farceur\",\"farfelu\",\"farine\",\"farouche\",\"fasciner\",\"fatal\",\"fatigue\",\"faucon\",\"fautif\",\"faveur\",\"favori\",\"fébrile\",\"féconder\",\"fédérer\",\"félin\",\"femme\",\"fémur\",\"fendoir\",\"féodal\",\"fermer\",\"féroce\",\"ferveur\",\"festival\",\"feuille\",\"feutre\",\"février\",\"fiasco\",\"ficeler\",\"fictif\",\"fidèle\",\"figure\",\"filature\",\"filetage\",\"filière\",\"filleul\",\"filmer\",\"filou\",\"filtrer\",\"financer\",\"finir\",\"fiole\",\"firme\",\"fissure\",\"fixer\",\"flairer\",\"flamme\",\"flasque\",\"flatteur\",\"fléau\",\"flèche\",\"fleur\",\"flexion\",\"flocon\",\"flore\",\"fluctuer\",\"fluide\",\"fluvial\",\"folie\",\"fonderie\",\"fongible\",\"fontaine\",\"forcer\",\"forgeron\",\"formuler\",\"fortune\",\"fossile\",\"foudre\",\"fougère\",\"fouiller\",\"foulure\",\"fourmi\",\"fragile\",\"fraise\",\"franchir\",\"frapper\",\"frayeur\",\"frégate\",\"freiner\",\"frelon\",\"frémir\",\"frénésie\",\"frère\",\"friable\",\"friction\",\"frisson\",\"frivole\",\"froid\",\"fromage\",\"frontal\",\"frotter\",\"fruit\",\"fugitif\",\"fuite\",\"fureur\",\"furieux\",\"furtif\",\"fusion\",\"futur\",\"gagner\",\"galaxie\",\"galerie\",\"gambader\",\"garantir\",\"gardien\",\"garnir\",\"garrigue\",\"gazelle\",\"gazon\",\"géant\",\"gélatine\",\"gélule\",\"gendarme\",\"général\",\"génie\",\"genou\",\"gentil\",\"géologie\",\"géomètre\",\"géranium\",\"germe\",\"gestuel\",\"geyser\",\"gibier\",\"gicler\",\"girafe\",\"givre\",\"glace\",\"glaive\",\"glisser\",\"globe\",\"gloire\",\"glorieux\",\"golfeur\",\"gomme\",\"gonfler\",\"gorge\",\"gorille\",\"goudron\",\"gouffre\",\"goulot\",\"goupille\",\"gourmand\",\"goutte\",\"graduel\",\"graffiti\",\"graine\",\"grand\",\"grappin\",\"gratuit\",\"gravir\",\"grenat\",\"griffure\",\"griller\",\"grimper\",\"grogner\",\"gronder\",\"grotte\",\"groupe\",\"gruger\",\"grutier\",\"gruyère\",\"guépard\",\"guerrier\",\"guide\",\"guimauve\",\"guitare\",\"gustatif\",\"gymnaste\",\"gyrostat\",\"habitude\",\"hachoir\",\"halte\",\"hameau\",\"hangar\",\"hanneton\",\"haricot\",\"harmonie\",\"harpon\",\"hasard\",\"hélium\",\"hématome\",\"herbe\",\"hérisson\",\"hermine\",\"héron\",\"hésiter\",\"heureux\",\"hiberner\",\"hibou\",\"hilarant\",\"histoire\",\"hiver\",\"homard\",\"hommage\",\"homogène\",\"honneur\",\"honorer\",\"honteux\",\"horde\",\"horizon\",\"horloge\",\"hormone\",\"horrible\",\"houleux\",\"housse\",\"hublot\",\"huileux\",\"humain\",\"humble\",\"humide\",\"humour\",\"hurler\",\"hydromel\",\"hygiène\",\"hymne\",\"hypnose\",\"idylle\",\"ignorer\",\"iguane\",\"illicite\",\"illusion\",\"image\",\"imbiber\",\"imiter\",\"immense\",\"immobile\",\"immuable\",\"impact\",\"impérial\",\"implorer\",\"imposer\",\"imprimer\",\"imputer\",\"incarner\",\"incendie\",\"incident\",\"incliner\",\"incolore\",\"indexer\",\"indice\",\"inductif\",\"inédit\",\"ineptie\",\"inexact\",\"infini\",\"infliger\",\"informer\",\"infusion\",\"ingérer\",\"inhaler\",\"inhiber\",\"injecter\",\"injure\",\"innocent\",\"inoculer\",\"inonder\",\"inscrire\",\"insecte\",\"insigne\",\"insolite\",\"inspirer\",\"instinct\",\"insulter\",\"intact\",\"intense\",\"intime\",\"intrigue\",\"intuitif\",\"inutile\",\"invasion\",\"inventer\",\"inviter\",\"invoquer\",\"ironique\",\"irradier\",\"irréel\",\"irriter\",\"isoler\",\"ivoire\",\"ivresse\",\"jaguar\",\"jaillir\",\"jambe\",\"janvier\",\"jardin\",\"jauger\",\"jaune\",\"javelot\",\"jetable\",\"jeton\",\"jeudi\",\"jeunesse\",\"joindre\",\"joncher\",\"jongler\",\"joueur\",\"jouissif\",\"journal\",\"jovial\",\"joyau\",\"joyeux\",\"jubiler\",\"jugement\",\"junior\",\"jupon\",\"juriste\",\"justice\",\"juteux\",\"juvénile\",\"kayak\",\"kimono\",\"kiosque\",\"label\",\"labial\",\"labourer\",\"lacérer\",\"lactose\",\"lagune\",\"laine\",\"laisser\",\"laitier\",\"lambeau\",\"lamelle\",\"lampe\",\"lanceur\",\"langage\",\"lanterne\",\"lapin\",\"largeur\",\"larme\",\"laurier\",\"lavabo\",\"lavoir\",\"lecture\",\"légal\",\"léger\",\"légume\",\"lessive\",\"lettre\",\"levier\",\"lexique\",\"lézard\",\"liasse\",\"libérer\",\"libre\",\"licence\",\"licorne\",\"liège\",\"lièvre\",\"ligature\",\"ligoter\",\"ligue\",\"limer\",\"limite\",\"limonade\",\"limpide\",\"linéaire\",\"lingot\",\"lionceau\",\"liquide\",\"lisière\",\"lister\",\"lithium\",\"litige\",\"littoral\",\"livreur\",\"logique\",\"lointain\",\"loisir\",\"lombric\",\"loterie\",\"louer\",\"lourd\",\"loutre\",\"louve\",\"loyal\",\"lubie\",\"lucide\",\"lucratif\",\"lueur\",\"lugubre\",\"luisant\",\"lumière\",\"lunaire\",\"lundi\",\"luron\",\"lutter\",\"luxueux\",\"machine\",\"magasin\",\"magenta\",\"magique\",\"maigre\",\"maillon\",\"maintien\",\"mairie\",\"maison\",\"majorer\",\"malaxer\",\"maléfice\",\"malheur\",\"malice\",\"mallette\",\"mammouth\",\"mandater\",\"maniable\",\"manquant\",\"manteau\",\"manuel\",\"marathon\",\"marbre\",\"marchand\",\"mardi\",\"maritime\",\"marqueur\",\"marron\",\"marteler\",\"mascotte\",\"massif\",\"matériel\",\"matière\",\"matraque\",\"maudire\",\"maussade\",\"mauve\",\"maximal\",\"méchant\",\"méconnu\",\"médaille\",\"médecin\",\"méditer\",\"méduse\",\"meilleur\",\"mélange\",\"mélodie\",\"membre\",\"mémoire\",\"menacer\",\"mener\",\"menhir\",\"mensonge\",\"mentor\",\"mercredi\",\"mérite\",\"merle\",\"messager\",\"mesure\",\"métal\",\"météore\",\"méthode\",\"métier\",\"meuble\",\"miauler\",\"microbe\",\"miette\",\"mignon\",\"migrer\",\"milieu\",\"million\",\"mimique\",\"mince\",\"minéral\",\"minimal\",\"minorer\",\"minute\",\"miracle\",\"miroiter\",\"missile\",\"mixte\",\"mobile\",\"moderne\",\"moelleux\",\"mondial\",\"moniteur\",\"monnaie\",\"monotone\",\"monstre\",\"montagne\",\"monument\",\"moqueur\",\"morceau\",\"morsure\",\"mortier\",\"moteur\",\"motif\",\"mouche\",\"moufle\",\"moulin\",\"mousson\",\"mouton\",\"mouvant\",\"multiple\",\"munition\",\"muraille\",\"murène\",\"murmure\",\"muscle\",\"muséum\",\"musicien\",\"mutation\",\"muter\",\"mutuel\",\"myriade\",\"myrtille\",\"mystère\",\"mythique\",\"nageur\",\"nappe\",\"narquois\",\"narrer\",\"natation\",\"nation\",\"nature\",\"naufrage\",\"nautique\",\"navire\",\"nébuleux\",\"nectar\",\"néfaste\",\"négation\",\"négliger\",\"négocier\",\"neige\",\"nerveux\",\"nettoyer\",\"neurone\",\"neutron\",\"neveu\",\"niche\",\"nickel\",\"nitrate\",\"niveau\",\"noble\",\"nocif\",\"nocturne\",\"noirceur\",\"noisette\",\"nomade\",\"nombreux\",\"nommer\",\"normatif\",\"notable\",\"notifier\",\"notoire\",\"nourrir\",\"nouveau\",\"novateur\",\"novembre\",\"novice\",\"nuage\",\"nuancer\",\"nuire\",\"nuisible\",\"numéro\",\"nuptial\",\"nuque\",\"nutritif\",\"obéir\",\"objectif\",\"obliger\",\"obscur\",\"observer\",\"obstacle\",\"obtenir\",\"obturer\",\"occasion\",\"occuper\",\"océan\",\"octobre\",\"octroyer\",\"octupler\",\"oculaire\",\"odeur\",\"odorant\",\"offenser\",\"officier\",\"offrir\",\"ogive\",\"oiseau\",\"oisillon\",\"olfactif\",\"olivier\",\"ombrage\",\"omettre\",\"onctueux\",\"onduler\",\"onéreux\",\"onirique\",\"opale\",\"opaque\",\"opérer\",\"opinion\",\"opportun\",\"opprimer\",\"opter\",\"optique\",\"orageux\",\"orange\",\"orbite\",\"ordonner\",\"oreille\",\"organe\",\"orgueil\",\"orifice\",\"ornement\",\"orque\",\"ortie\",\"osciller\",\"osmose\",\"ossature\",\"otarie\",\"ouragan\",\"ourson\",\"outil\",\"outrager\",\"ouvrage\",\"ovation\",\"oxyde\",\"oxygène\",\"ozone\",\"paisible\",\"palace\",\"palmarès\",\"palourde\",\"palper\",\"panache\",\"panda\",\"pangolin\",\"paniquer\",\"panneau\",\"panorama\",\"pantalon\",\"papaye\",\"papier\",\"papoter\",\"papyrus\",\"paradoxe\",\"parcelle\",\"paresse\",\"parfumer\",\"parler\",\"parole\",\"parrain\",\"parsemer\",\"partager\",\"parure\",\"parvenir\",\"passion\",\"pastèque\",\"paternel\",\"patience\",\"patron\",\"pavillon\",\"pavoiser\",\"payer\",\"paysage\",\"peigne\",\"peintre\",\"pelage\",\"pélican\",\"pelle\",\"pelouse\",\"peluche\",\"pendule\",\"pénétrer\",\"pénible\",\"pensif\",\"pénurie\",\"pépite\",\"péplum\",\"perdrix\",\"perforer\",\"période\",\"permuter\",\"perplexe\",\"persil\",\"perte\",\"peser\",\"pétale\",\"petit\",\"pétrir\",\"peuple\",\"pharaon\",\"phobie\",\"phoque\",\"photon\",\"phrase\",\"physique\",\"piano\",\"pictural\",\"pièce\",\"pierre\",\"pieuvre\",\"pilote\",\"pinceau\",\"pipette\",\"piquer\",\"pirogue\",\"piscine\",\"piston\",\"pivoter\",\"pixel\",\"pizza\",\"placard\",\"plafond\",\"plaisir\",\"planer\",\"plaque\",\"plastron\",\"plateau\",\"pleurer\",\"plexus\",\"pliage\",\"plomb\",\"plonger\",\"pluie\",\"plumage\",\"pochette\",\"poésie\",\"poète\",\"pointe\",\"poirier\",\"poisson\",\"poivre\",\"polaire\",\"policier\",\"pollen\",\"polygone\",\"pommade\",\"pompier\",\"ponctuel\",\"pondérer\",\"poney\",\"portique\",\"position\",\"posséder\",\"posture\",\"potager\",\"poteau\",\"potion\",\"pouce\",\"poulain\",\"poumon\",\"pourpre\",\"poussin\",\"pouvoir\",\"prairie\",\"pratique\",\"précieux\",\"prédire\",\"préfixe\",\"prélude\",\"prénom\",\"présence\",\"prétexte\",\"prévoir\",\"primitif\",\"prince\",\"prison\",\"priver\",\"problème\",\"procéder\",\"prodige\",\"profond\",\"progrès\",\"proie\",\"projeter\",\"prologue\",\"promener\",\"propre\",\"prospère\",\"protéger\",\"prouesse\",\"proverbe\",\"prudence\",\"pruneau\",\"psychose\",\"public\",\"puceron\",\"puiser\",\"pulpe\",\"pulsar\",\"punaise\",\"punitif\",\"pupitre\",\"purifier\",\"puzzle\",\"pyramide\",\"quasar\",\"querelle\",\"question\",\"quiétude\",\"quitter\",\"quotient\",\"racine\",\"raconter\",\"radieux\",\"ragondin\",\"raideur\",\"raisin\",\"ralentir\",\"rallonge\",\"ramasser\",\"rapide\",\"rasage\",\"ratisser\",\"ravager\",\"ravin\",\"rayonner\",\"réactif\",\"réagir\",\"réaliser\",\"réanimer\",\"recevoir\",\"réciter\",\"réclamer\",\"récolter\",\"recruter\",\"reculer\",\"recycler\",\"rédiger\",\"redouter\",\"refaire\",\"réflexe\",\"réformer\",\"refrain\",\"refuge\",\"régalien\",\"région\",\"réglage\",\"régulier\",\"réitérer\",\"rejeter\",\"rejouer\",\"relatif\",\"relever\",\"relief\",\"remarque\",\"remède\",\"remise\",\"remonter\",\"remplir\",\"remuer\",\"renard\",\"renfort\",\"renifler\",\"renoncer\",\"rentrer\",\"renvoi\",\"replier\",\"reporter\",\"reprise\",\"reptile\",\"requin\",\"réserve\",\"résineux\",\"résoudre\",\"respect\",\"rester\",\"résultat\",\"rétablir\",\"retenir\",\"réticule\",\"retomber\",\"retracer\",\"réunion\",\"réussir\",\"revanche\",\"revivre\",\"révolte\",\"révulsif\",\"richesse\",\"rideau\",\"rieur\",\"rigide\",\"rigoler\",\"rincer\",\"riposter\",\"risible\",\"risque\",\"rituel\",\"rival\",\"rivière\",\"rocheux\",\"romance\",\"rompre\",\"ronce\",\"rondin\",\"roseau\",\"rosier\",\"rotatif\",\"rotor\",\"rotule\",\"rouge\",\"rouille\",\"rouleau\",\"routine\",\"royaume\",\"ruban\",\"rubis\",\"ruche\",\"ruelle\",\"rugueux\",\"ruiner\",\"ruisseau\",\"ruser\",\"rustique\",\"rythme\",\"sabler\",\"saboter\",\"sabre\",\"sacoche\",\"safari\",\"sagesse\",\"saisir\",\"salade\",\"salive\",\"salon\",\"saluer\",\"samedi\",\"sanction\",\"sanglier\",\"sarcasme\",\"sardine\",\"saturer\",\"saugrenu\",\"saumon\",\"sauter\",\"sauvage\",\"savant\",\"savonner\",\"scalpel\",\"scandale\",\"scélérat\",\"scénario\",\"sceptre\",\"schéma\",\"science\",\"scinder\",\"score\",\"scrutin\",\"sculpter\",\"séance\",\"sécable\",\"sécher\",\"secouer\",\"sécréter\",\"sédatif\",\"séduire\",\"seigneur\",\"séjour\",\"sélectif\",\"semaine\",\"sembler\",\"semence\",\"séminal\",\"sénateur\",\"sensible\",\"sentence\",\"séparer\",\"séquence\",\"serein\",\"sergent\",\"sérieux\",\"serrure\",\"sérum\",\"service\",\"sésame\",\"sévir\",\"sevrage\",\"sextuple\",\"sidéral\",\"siècle\",\"siéger\",\"siffler\",\"sigle\",\"signal\",\"silence\",\"silicium\",\"simple\",\"sincère\",\"sinistre\",\"siphon\",\"sirop\",\"sismique\",\"situer\",\"skier\",\"social\",\"socle\",\"sodium\",\"soigneux\",\"soldat\",\"soleil\",\"solitude\",\"soluble\",\"sombre\",\"sommeil\",\"somnoler\",\"sonde\",\"songeur\",\"sonnette\",\"sonore\",\"sorcier\",\"sortir\",\"sosie\",\"sottise\",\"soucieux\",\"soudure\",\"souffle\",\"soulever\",\"soupape\",\"source\",\"soutirer\",\"souvenir\",\"spacieux\",\"spatial\",\"spécial\",\"sphère\",\"spiral\",\"stable\",\"station\",\"sternum\",\"stimulus\",\"stipuler\",\"strict\",\"studieux\",\"stupeur\",\"styliste\",\"sublime\",\"substrat\",\"subtil\",\"subvenir\",\"succès\",\"sucre\",\"suffixe\",\"suggérer\",\"suiveur\",\"sulfate\",\"superbe\",\"supplier\",\"surface\",\"suricate\",\"surmener\",\"surprise\",\"sursaut\",\"survie\",\"suspect\",\"syllabe\",\"symbole\",\"symétrie\",\"synapse\",\"syntaxe\",\"système\",\"tabac\",\"tablier\",\"tactile\",\"tailler\",\"talent\",\"talisman\",\"talonner\",\"tambour\",\"tamiser\",\"tangible\",\"tapis\",\"taquiner\",\"tarder\",\"tarif\",\"tartine\",\"tasse\",\"tatami\",\"tatouage\",\"taupe\",\"taureau\",\"taxer\",\"témoin\",\"temporel\",\"tenaille\",\"tendre\",\"teneur\",\"tenir\",\"tension\",\"terminer\",\"terne\",\"terrible\",\"tétine\",\"texte\",\"thème\",\"théorie\",\"thérapie\",\"thorax\",\"tibia\",\"tiède\",\"timide\",\"tirelire\",\"tiroir\",\"tissu\",\"titane\",\"titre\",\"tituber\",\"toboggan\",\"tolérant\",\"tomate\",\"tonique\",\"tonneau\",\"toponyme\",\"torche\",\"tordre\",\"tornade\",\"torpille\",\"torrent\",\"torse\",\"tortue\",\"totem\",\"toucher\",\"tournage\",\"tousser\",\"toxine\",\"traction\",\"trafic\",\"tragique\",\"trahir\",\"train\",\"trancher\",\"travail\",\"trèfle\",\"tremper\",\"trésor\",\"treuil\",\"triage\",\"tribunal\",\"tricoter\",\"trilogie\",\"triomphe\",\"tripler\",\"triturer\",\"trivial\",\"trombone\",\"tronc\",\"tropical\",\"troupeau\",\"tuile\",\"tulipe\",\"tumulte\",\"tunnel\",\"turbine\",\"tuteur\",\"tutoyer\",\"tuyau\",\"tympan\",\"typhon\",\"typique\",\"tyran\",\"ubuesque\",\"ultime\",\"ultrason\",\"unanime\",\"unifier\",\"union\",\"unique\",\"unitaire\",\"univers\",\"uranium\",\"urbain\",\"urticant\",\"usage\",\"usine\",\"usuel\",\"usure\",\"utile\",\"utopie\",\"vacarme\",\"vaccin\",\"vagabond\",\"vague\",\"vaillant\",\"vaincre\",\"vaisseau\",\"valable\",\"valise\",\"vallon\",\"valve\",\"vampire\",\"vanille\",\"vapeur\",\"varier\",\"vaseux\",\"vassal\",\"vaste\",\"vecteur\",\"vedette\",\"végétal\",\"véhicule\",\"veinard\",\"véloce\",\"vendredi\",\"vénérer\",\"venger\",\"venimeux\",\"ventouse\",\"verdure\",\"vérin\",\"vernir\",\"verrou\",\"verser\",\"vertu\",\"veston\",\"vétéran\",\"vétuste\",\"vexant\",\"vexer\",\"viaduc\",\"viande\",\"victoire\",\"vidange\",\"vidéo\",\"vignette\",\"vigueur\",\"vilain\",\"village\",\"vinaigre\",\"violon\",\"vipère\",\"virement\",\"virtuose\",\"virus\",\"visage\",\"viseur\",\"vision\",\"visqueux\",\"visuel\",\"vital\",\"vitesse\",\"viticole\",\"vitrine\",\"vivace\",\"vivipare\",\"vocation\",\"voguer\",\"voile\",\"voisin\",\"voiture\",\"volaille\",\"volcan\",\"voltiger\",\"volume\",\"vorace\",\"vortex\",\"voter\",\"vouloir\",\"voyage\",\"voyelle\",\"wagon\",\"xénon\",\"yacht\",\"zèbre\",\"zénith\",\"zeste\",\"zoologie\"]");

const require$$5 = /* #__PURE__ */ JSON.parse("[\"abaco\",\"abbaglio\",\"abbinato\",\"abete\",\"abisso\",\"abolire\",\"abrasivo\",\"abrogato\",\"accadere\",\"accenno\",\"accusato\",\"acetone\",\"achille\",\"acido\",\"acqua\",\"acre\",\"acrilico\",\"acrobata\",\"acuto\",\"adagio\",\"addebito\",\"addome\",\"adeguato\",\"aderire\",\"adipe\",\"adottare\",\"adulare\",\"affabile\",\"affetto\",\"affisso\",\"affranto\",\"aforisma\",\"afoso\",\"africano\",\"agave\",\"agente\",\"agevole\",\"aggancio\",\"agire\",\"agitare\",\"agonismo\",\"agricolo\",\"agrumeto\",\"aguzzo\",\"alabarda\",\"alato\",\"albatro\",\"alberato\",\"albo\",\"albume\",\"alce\",\"alcolico\",\"alettone\",\"alfa\",\"algebra\",\"aliante\",\"alibi\",\"alimento\",\"allagato\",\"allegro\",\"allievo\",\"allodola\",\"allusivo\",\"almeno\",\"alogeno\",\"alpaca\",\"alpestre\",\"altalena\",\"alterno\",\"alticcio\",\"altrove\",\"alunno\",\"alveolo\",\"alzare\",\"amalgama\",\"amanita\",\"amarena\",\"ambito\",\"ambrato\",\"ameba\",\"america\",\"ametista\",\"amico\",\"ammasso\",\"ammenda\",\"ammirare\",\"ammonito\",\"amore\",\"ampio\",\"ampliare\",\"amuleto\",\"anacardo\",\"anagrafe\",\"analista\",\"anarchia\",\"anatra\",\"anca\",\"ancella\",\"ancora\",\"andare\",\"andrea\",\"anello\",\"angelo\",\"angolare\",\"angusto\",\"anima\",\"annegare\",\"annidato\",\"anno\",\"annuncio\",\"anonimo\",\"anticipo\",\"anzi\",\"apatico\",\"apertura\",\"apode\",\"apparire\",\"appetito\",\"appoggio\",\"approdo\",\"appunto\",\"aprile\",\"arabica\",\"arachide\",\"aragosta\",\"araldica\",\"arancio\",\"aratura\",\"arazzo\",\"arbitro\",\"archivio\",\"ardito\",\"arenile\",\"argento\",\"argine\",\"arguto\",\"aria\",\"armonia\",\"arnese\",\"arredato\",\"arringa\",\"arrosto\",\"arsenico\",\"arso\",\"artefice\",\"arzillo\",\"asciutto\",\"ascolto\",\"asepsi\",\"asettico\",\"asfalto\",\"asino\",\"asola\",\"aspirato\",\"aspro\",\"assaggio\",\"asse\",\"assoluto\",\"assurdo\",\"asta\",\"astenuto\",\"astice\",\"astratto\",\"atavico\",\"ateismo\",\"atomico\",\"atono\",\"attesa\",\"attivare\",\"attorno\",\"attrito\",\"attuale\",\"ausilio\",\"austria\",\"autista\",\"autonomo\",\"autunno\",\"avanzato\",\"avere\",\"avvenire\",\"avviso\",\"avvolgere\",\"azione\",\"azoto\",\"azzimo\",\"azzurro\",\"babele\",\"baccano\",\"bacino\",\"baco\",\"badessa\",\"badilata\",\"bagnato\",\"baita\",\"balcone\",\"baldo\",\"balena\",\"ballata\",\"balzano\",\"bambino\",\"bandire\",\"baraonda\",\"barbaro\",\"barca\",\"baritono\",\"barlume\",\"barocco\",\"basilico\",\"basso\",\"batosta\",\"battuto\",\"baule\",\"bava\",\"bavosa\",\"becco\",\"beffa\",\"belgio\",\"belva\",\"benda\",\"benevole\",\"benigno\",\"benzina\",\"bere\",\"berlina\",\"beta\",\"bibita\",\"bici\",\"bidone\",\"bifido\",\"biga\",\"bilancia\",\"bimbo\",\"binocolo\",\"biologo\",\"bipede\",\"bipolare\",\"birbante\",\"birra\",\"biscotto\",\"bisesto\",\"bisnonno\",\"bisonte\",\"bisturi\",\"bizzarro\",\"blando\",\"blatta\",\"bollito\",\"bonifico\",\"bordo\",\"bosco\",\"botanico\",\"bottino\",\"bozzolo\",\"braccio\",\"bradipo\",\"brama\",\"branca\",\"bravura\",\"bretella\",\"brevetto\",\"brezza\",\"briglia\",\"brillante\",\"brindare\",\"broccolo\",\"brodo\",\"bronzina\",\"brullo\",\"bruno\",\"bubbone\",\"buca\",\"budino\",\"buffone\",\"buio\",\"bulbo\",\"buono\",\"burlone\",\"burrasca\",\"bussola\",\"busta\",\"cadetto\",\"caduco\",\"calamaro\",\"calcolo\",\"calesse\",\"calibro\",\"calmo\",\"caloria\",\"cambusa\",\"camerata\",\"camicia\",\"cammino\",\"camola\",\"campale\",\"canapa\",\"candela\",\"cane\",\"canino\",\"canotto\",\"cantina\",\"capace\",\"capello\",\"capitolo\",\"capogiro\",\"cappero\",\"capra\",\"capsula\",\"carapace\",\"carcassa\",\"cardo\",\"carisma\",\"carovana\",\"carretto\",\"cartolina\",\"casaccio\",\"cascata\",\"caserma\",\"caso\",\"cassone\",\"castello\",\"casuale\",\"catasta\",\"catena\",\"catrame\",\"cauto\",\"cavillo\",\"cedibile\",\"cedrata\",\"cefalo\",\"celebre\",\"cellulare\",\"cena\",\"cenone\",\"centesimo\",\"ceramica\",\"cercare\",\"certo\",\"cerume\",\"cervello\",\"cesoia\",\"cespo\",\"ceto\",\"chela\",\"chiaro\",\"chicca\",\"chiedere\",\"chimera\",\"china\",\"chirurgo\",\"chitarra\",\"ciao\",\"ciclismo\",\"cifrare\",\"cigno\",\"cilindro\",\"ciottolo\",\"circa\",\"cirrosi\",\"citrico\",\"cittadino\",\"ciuffo\",\"civetta\",\"civile\",\"classico\",\"clinica\",\"cloro\",\"cocco\",\"codardo\",\"codice\",\"coerente\",\"cognome\",\"collare\",\"colmato\",\"colore\",\"colposo\",\"coltivato\",\"colza\",\"coma\",\"cometa\",\"commando\",\"comodo\",\"computer\",\"comune\",\"conciso\",\"condurre\",\"conferma\",\"congelare\",\"coniuge\",\"connesso\",\"conoscere\",\"consumo\",\"continuo\",\"convegno\",\"coperto\",\"copione\",\"coppia\",\"copricapo\",\"corazza\",\"cordata\",\"coricato\",\"cornice\",\"corolla\",\"corpo\",\"corredo\",\"corsia\",\"cortese\",\"cosmico\",\"costante\",\"cottura\",\"covato\",\"cratere\",\"cravatta\",\"creato\",\"credere\",\"cremoso\",\"crescita\",\"creta\",\"criceto\",\"crinale\",\"crisi\",\"critico\",\"croce\",\"cronaca\",\"crostata\",\"cruciale\",\"crusca\",\"cucire\",\"cuculo\",\"cugino\",\"cullato\",\"cupola\",\"curatore\",\"cursore\",\"curvo\",\"cuscino\",\"custode\",\"dado\",\"daino\",\"dalmata\",\"damerino\",\"daniela\",\"dannoso\",\"danzare\",\"datato\",\"davanti\",\"davvero\",\"debutto\",\"decennio\",\"deciso\",\"declino\",\"decollo\",\"decreto\",\"dedicato\",\"definito\",\"deforme\",\"degno\",\"delegare\",\"delfino\",\"delirio\",\"delta\",\"demenza\",\"denotato\",\"dentro\",\"deposito\",\"derapata\",\"derivare\",\"deroga\",\"descritto\",\"deserto\",\"desiderio\",\"desumere\",\"detersivo\",\"devoto\",\"diametro\",\"dicembre\",\"diedro\",\"difeso\",\"diffuso\",\"digerire\",\"digitale\",\"diluvio\",\"dinamico\",\"dinnanzi\",\"dipinto\",\"diploma\",\"dipolo\",\"diradare\",\"dire\",\"dirotto\",\"dirupo\",\"disagio\",\"discreto\",\"disfare\",\"disgelo\",\"disposto\",\"distanza\",\"disumano\",\"dito\",\"divano\",\"divelto\",\"dividere\",\"divorato\",\"doblone\",\"docente\",\"doganale\",\"dogma\",\"dolce\",\"domato\",\"domenica\",\"dominare\",\"dondolo\",\"dono\",\"dormire\",\"dote\",\"dottore\",\"dovuto\",\"dozzina\",\"drago\",\"druido\",\"dubbio\",\"dubitare\",\"ducale\",\"duna\",\"duomo\",\"duplice\",\"duraturo\",\"ebano\",\"eccesso\",\"ecco\",\"eclissi\",\"economia\",\"edera\",\"edicola\",\"edile\",\"editoria\",\"educare\",\"egemonia\",\"egli\",\"egoismo\",\"egregio\",\"elaborato\",\"elargire\",\"elegante\",\"elencato\",\"eletto\",\"elevare\",\"elfico\",\"elica\",\"elmo\",\"elsa\",\"eluso\",\"emanato\",\"emblema\",\"emesso\",\"emiro\",\"emotivo\",\"emozione\",\"empirico\",\"emulo\",\"endemico\",\"enduro\",\"energia\",\"enfasi\",\"enoteca\",\"entrare\",\"enzima\",\"epatite\",\"epilogo\",\"episodio\",\"epocale\",\"eppure\",\"equatore\",\"erario\",\"erba\",\"erboso\",\"erede\",\"eremita\",\"erigere\",\"ermetico\",\"eroe\",\"erosivo\",\"errante\",\"esagono\",\"esame\",\"esanime\",\"esaudire\",\"esca\",\"esempio\",\"esercito\",\"esibito\",\"esigente\",\"esistere\",\"esito\",\"esofago\",\"esortato\",\"esoso\",\"espanso\",\"espresso\",\"essenza\",\"esso\",\"esteso\",\"estimare\",\"estonia\",\"estroso\",\"esultare\",\"etilico\",\"etnico\",\"etrusco\",\"etto\",\"euclideo\",\"europa\",\"evaso\",\"evidenza\",\"evitato\",\"evoluto\",\"evviva\",\"fabbrica\",\"faccenda\",\"fachiro\",\"falco\",\"famiglia\",\"fanale\",\"fanfara\",\"fango\",\"fantasma\",\"fare\",\"farfalla\",\"farinoso\",\"farmaco\",\"fascia\",\"fastoso\",\"fasullo\",\"faticare\",\"fato\",\"favoloso\",\"febbre\",\"fecola\",\"fede\",\"fegato\",\"felpa\",\"feltro\",\"femmina\",\"fendere\",\"fenomeno\",\"fermento\",\"ferro\",\"fertile\",\"fessura\",\"festivo\",\"fetta\",\"feudo\",\"fiaba\",\"fiducia\",\"fifa\",\"figurato\",\"filo\",\"finanza\",\"finestra\",\"finire\",\"fiore\",\"fiscale\",\"fisico\",\"fiume\",\"flacone\",\"flamenco\",\"flebo\",\"flemma\",\"florido\",\"fluente\",\"fluoro\",\"fobico\",\"focaccia\",\"focoso\",\"foderato\",\"foglio\",\"folata\",\"folclore\",\"folgore\",\"fondente\",\"fonetico\",\"fonia\",\"fontana\",\"forbito\",\"forchetta\",\"foresta\",\"formica\",\"fornaio\",\"foro\",\"fortezza\",\"forzare\",\"fosfato\",\"fosso\",\"fracasso\",\"frana\",\"frassino\",\"fratello\",\"freccetta\",\"frenata\",\"fresco\",\"frigo\",\"frollino\",\"fronde\",\"frugale\",\"frutta\",\"fucilata\",\"fucsia\",\"fuggente\",\"fulmine\",\"fulvo\",\"fumante\",\"fumetto\",\"fumoso\",\"fune\",\"funzione\",\"fuoco\",\"furbo\",\"furgone\",\"furore\",\"fuso\",\"futile\",\"gabbiano\",\"gaffe\",\"galateo\",\"gallina\",\"galoppo\",\"gambero\",\"gamma\",\"garanzia\",\"garbo\",\"garofano\",\"garzone\",\"gasdotto\",\"gasolio\",\"gastrico\",\"gatto\",\"gaudio\",\"gazebo\",\"gazzella\",\"geco\",\"gelatina\",\"gelso\",\"gemello\",\"gemmato\",\"gene\",\"genitore\",\"gennaio\",\"genotipo\",\"gergo\",\"ghepardo\",\"ghiaccio\",\"ghisa\",\"giallo\",\"gilda\",\"ginepro\",\"giocare\",\"gioiello\",\"giorno\",\"giove\",\"girato\",\"girone\",\"gittata\",\"giudizio\",\"giurato\",\"giusto\",\"globulo\",\"glutine\",\"gnomo\",\"gobba\",\"golf\",\"gomito\",\"gommone\",\"gonfio\",\"gonna\",\"governo\",\"gracile\",\"grado\",\"grafico\",\"grammo\",\"grande\",\"grattare\",\"gravoso\",\"grazia\",\"greca\",\"gregge\",\"grifone\",\"grigio\",\"grinza\",\"grotta\",\"gruppo\",\"guadagno\",\"guaio\",\"guanto\",\"guardare\",\"gufo\",\"guidare\",\"ibernato\",\"icona\",\"identico\",\"idillio\",\"idolo\",\"idra\",\"idrico\",\"idrogeno\",\"igiene\",\"ignaro\",\"ignorato\",\"ilare\",\"illeso\",\"illogico\",\"illudere\",\"imballo\",\"imbevuto\",\"imbocco\",\"imbuto\",\"immane\",\"immerso\",\"immolato\",\"impacco\",\"impeto\",\"impiego\",\"importo\",\"impronta\",\"inalare\",\"inarcare\",\"inattivo\",\"incanto\",\"incendio\",\"inchino\",\"incisivo\",\"incluso\",\"incontro\",\"incrocio\",\"incubo\",\"indagine\",\"india\",\"indole\",\"inedito\",\"infatti\",\"infilare\",\"inflitto\",\"ingaggio\",\"ingegno\",\"inglese\",\"ingordo\",\"ingrosso\",\"innesco\",\"inodore\",\"inoltrare\",\"inondato\",\"insano\",\"insetto\",\"insieme\",\"insonnia\",\"insulina\",\"intasato\",\"intero\",\"intonaco\",\"intuito\",\"inumidire\",\"invalido\",\"invece\",\"invito\",\"iperbole\",\"ipnotico\",\"ipotesi\",\"ippica\",\"iride\",\"irlanda\",\"ironico\",\"irrigato\",\"irrorare\",\"isolato\",\"isotopo\",\"isterico\",\"istituto\",\"istrice\",\"italia\",\"iterare\",\"labbro\",\"labirinto\",\"lacca\",\"lacerato\",\"lacrima\",\"lacuna\",\"laddove\",\"lago\",\"lampo\",\"lancetta\",\"lanterna\",\"lardoso\",\"larga\",\"laringe\",\"lastra\",\"latenza\",\"latino\",\"lattuga\",\"lavagna\",\"lavoro\",\"legale\",\"leggero\",\"lembo\",\"lentezza\",\"lenza\",\"leone\",\"lepre\",\"lesivo\",\"lessato\",\"lesto\",\"letterale\",\"leva\",\"levigato\",\"libero\",\"lido\",\"lievito\",\"lilla\",\"limatura\",\"limitare\",\"limpido\",\"lineare\",\"lingua\",\"liquido\",\"lira\",\"lirica\",\"lisca\",\"lite\",\"litigio\",\"livrea\",\"locanda\",\"lode\",\"logica\",\"lombare\",\"londra\",\"longevo\",\"loquace\",\"lorenzo\",\"loto\",\"lotteria\",\"luce\",\"lucidato\",\"lumaca\",\"luminoso\",\"lungo\",\"lupo\",\"luppolo\",\"lusinga\",\"lusso\",\"lutto\",\"macabro\",\"macchina\",\"macero\",\"macinato\",\"madama\",\"magico\",\"maglia\",\"magnete\",\"magro\",\"maiolica\",\"malafede\",\"malgrado\",\"malinteso\",\"malsano\",\"malto\",\"malumore\",\"mana\",\"mancia\",\"mandorla\",\"mangiare\",\"manifesto\",\"mannaro\",\"manovra\",\"mansarda\",\"mantide\",\"manubrio\",\"mappa\",\"maratona\",\"marcire\",\"maretta\",\"marmo\",\"marsupio\",\"maschera\",\"massaia\",\"mastino\",\"materasso\",\"matricola\",\"mattone\",\"maturo\",\"mazurca\",\"meandro\",\"meccanico\",\"mecenate\",\"medesimo\",\"meditare\",\"mega\",\"melassa\",\"melis\",\"melodia\",\"meninge\",\"meno\",\"mensola\",\"mercurio\",\"merenda\",\"merlo\",\"meschino\",\"mese\",\"messere\",\"mestolo\",\"metallo\",\"metodo\",\"mettere\",\"miagolare\",\"mica\",\"micelio\",\"michele\",\"microbo\",\"midollo\",\"miele\",\"migliore\",\"milano\",\"milite\",\"mimosa\",\"minerale\",\"mini\",\"minore\",\"mirino\",\"mirtillo\",\"miscela\",\"missiva\",\"misto\",\"misurare\",\"mitezza\",\"mitigare\",\"mitra\",\"mittente\",\"mnemonico\",\"modello\",\"modifica\",\"modulo\",\"mogano\",\"mogio\",\"mole\",\"molosso\",\"monastero\",\"monco\",\"mondina\",\"monetario\",\"monile\",\"monotono\",\"monsone\",\"montato\",\"monviso\",\"mora\",\"mordere\",\"morsicato\",\"mostro\",\"motivato\",\"motosega\",\"motto\",\"movenza\",\"movimento\",\"mozzo\",\"mucca\",\"mucosa\",\"muffa\",\"mughetto\",\"mugnaio\",\"mulatto\",\"mulinello\",\"multiplo\",\"mummia\",\"munto\",\"muovere\",\"murale\",\"musa\",\"muscolo\",\"musica\",\"mutevole\",\"muto\",\"nababbo\",\"nafta\",\"nanometro\",\"narciso\",\"narice\",\"narrato\",\"nascere\",\"nastrare\",\"naturale\",\"nautica\",\"naviglio\",\"nebulosa\",\"necrosi\",\"negativo\",\"negozio\",\"nemmeno\",\"neofita\",\"neretto\",\"nervo\",\"nessuno\",\"nettuno\",\"neutrale\",\"neve\",\"nevrotico\",\"nicchia\",\"ninfa\",\"nitido\",\"nobile\",\"nocivo\",\"nodo\",\"nome\",\"nomina\",\"nordico\",\"normale\",\"norvegese\",\"nostrano\",\"notare\",\"notizia\",\"notturno\",\"novella\",\"nucleo\",\"nulla\",\"numero\",\"nuovo\",\"nutrire\",\"nuvola\",\"nuziale\",\"oasi\",\"obbedire\",\"obbligo\",\"obelisco\",\"oblio\",\"obolo\",\"obsoleto\",\"occasione\",\"occhio\",\"occidente\",\"occorrere\",\"occultare\",\"ocra\",\"oculato\",\"odierno\",\"odorare\",\"offerta\",\"offrire\",\"offuscato\",\"oggetto\",\"oggi\",\"ognuno\",\"olandese\",\"olfatto\",\"oliato\",\"oliva\",\"ologramma\",\"oltre\",\"omaggio\",\"ombelico\",\"ombra\",\"omega\",\"omissione\",\"ondoso\",\"onere\",\"onice\",\"onnivoro\",\"onorevole\",\"onta\",\"operato\",\"opinione\",\"opposto\",\"oracolo\",\"orafo\",\"ordine\",\"orecchino\",\"orefice\",\"orfano\",\"organico\",\"origine\",\"orizzonte\",\"orma\",\"ormeggio\",\"ornativo\",\"orologio\",\"orrendo\",\"orribile\",\"ortensia\",\"ortica\",\"orzata\",\"orzo\",\"osare\",\"oscurare\",\"osmosi\",\"ospedale\",\"ospite\",\"ossa\",\"ossidare\",\"ostacolo\",\"oste\",\"otite\",\"otre\",\"ottagono\",\"ottimo\",\"ottobre\",\"ovale\",\"ovest\",\"ovino\",\"oviparo\",\"ovocito\",\"ovunque\",\"ovviare\",\"ozio\",\"pacchetto\",\"pace\",\"pacifico\",\"padella\",\"padrone\",\"paese\",\"paga\",\"pagina\",\"palazzina\",\"palesare\",\"pallido\",\"palo\",\"palude\",\"pandoro\",\"pannello\",\"paolo\",\"paonazzo\",\"paprica\",\"parabola\",\"parcella\",\"parere\",\"pargolo\",\"pari\",\"parlato\",\"parola\",\"partire\",\"parvenza\",\"parziale\",\"passivo\",\"pasticca\",\"patacca\",\"patologia\",\"pattume\",\"pavone\",\"peccato\",\"pedalare\",\"pedonale\",\"peggio\",\"peloso\",\"penare\",\"pendice\",\"penisola\",\"pennuto\",\"penombra\",\"pensare\",\"pentola\",\"pepe\",\"pepita\",\"perbene\",\"percorso\",\"perdonato\",\"perforare\",\"pergamena\",\"periodo\",\"permesso\",\"perno\",\"perplesso\",\"persuaso\",\"pertugio\",\"pervaso\",\"pesatore\",\"pesista\",\"peso\",\"pestifero\",\"petalo\",\"pettine\",\"petulante\",\"pezzo\",\"piacere\",\"pianta\",\"piattino\",\"piccino\",\"picozza\",\"piega\",\"pietra\",\"piffero\",\"pigiama\",\"pigolio\",\"pigro\",\"pila\",\"pilifero\",\"pillola\",\"pilota\",\"pimpante\",\"pineta\",\"pinna\",\"pinolo\",\"pioggia\",\"piombo\",\"piramide\",\"piretico\",\"pirite\",\"pirolisi\",\"pitone\",\"pizzico\",\"placebo\",\"planare\",\"plasma\",\"platano\",\"plenario\",\"pochezza\",\"poderoso\",\"podismo\",\"poesia\",\"poggiare\",\"polenta\",\"poligono\",\"pollice\",\"polmonite\",\"polpetta\",\"polso\",\"poltrona\",\"polvere\",\"pomice\",\"pomodoro\",\"ponte\",\"popoloso\",\"porfido\",\"poroso\",\"porpora\",\"porre\",\"portata\",\"posa\",\"positivo\",\"possesso\",\"postulato\",\"potassio\",\"potere\",\"pranzo\",\"prassi\",\"pratica\",\"precluso\",\"predica\",\"prefisso\",\"pregiato\",\"prelievo\",\"premere\",\"prenotare\",\"preparato\",\"presenza\",\"pretesto\",\"prevalso\",\"prima\",\"principe\",\"privato\",\"problema\",\"procura\",\"produrre\",\"profumo\",\"progetto\",\"prolunga\",\"promessa\",\"pronome\",\"proposta\",\"proroga\",\"proteso\",\"prova\",\"prudente\",\"prugna\",\"prurito\",\"psiche\",\"pubblico\",\"pudica\",\"pugilato\",\"pugno\",\"pulce\",\"pulito\",\"pulsante\",\"puntare\",\"pupazzo\",\"pupilla\",\"puro\",\"quadro\",\"qualcosa\",\"quasi\",\"querela\",\"quota\",\"raccolto\",\"raddoppio\",\"radicale\",\"radunato\",\"raffica\",\"ragazzo\",\"ragione\",\"ragno\",\"ramarro\",\"ramingo\",\"ramo\",\"randagio\",\"rantolare\",\"rapato\",\"rapina\",\"rappreso\",\"rasatura\",\"raschiato\",\"rasente\",\"rassegna\",\"rastrello\",\"rata\",\"ravveduto\",\"reale\",\"recepire\",\"recinto\",\"recluta\",\"recondito\",\"recupero\",\"reddito\",\"redimere\",\"regalato\",\"registro\",\"regola\",\"regresso\",\"relazione\",\"remare\",\"remoto\",\"renna\",\"replica\",\"reprimere\",\"reputare\",\"resa\",\"residente\",\"responso\",\"restauro\",\"rete\",\"retina\",\"retorica\",\"rettifica\",\"revocato\",\"riassunto\",\"ribadire\",\"ribelle\",\"ribrezzo\",\"ricarica\",\"ricco\",\"ricevere\",\"riciclato\",\"ricordo\",\"ricreduto\",\"ridicolo\",\"ridurre\",\"rifasare\",\"riflesso\",\"riforma\",\"rifugio\",\"rigare\",\"rigettato\",\"righello\",\"rilassato\",\"rilevato\",\"rimanere\",\"rimbalzo\",\"rimedio\",\"rimorchio\",\"rinascita\",\"rincaro\",\"rinforzo\",\"rinnovo\",\"rinomato\",\"rinsavito\",\"rintocco\",\"rinuncia\",\"rinvenire\",\"riparato\",\"ripetuto\",\"ripieno\",\"riportare\",\"ripresa\",\"ripulire\",\"risata\",\"rischio\",\"riserva\",\"risibile\",\"riso\",\"rispetto\",\"ristoro\",\"risultato\",\"risvolto\",\"ritardo\",\"ritegno\",\"ritmico\",\"ritrovo\",\"riunione\",\"riva\",\"riverso\",\"rivincita\",\"rivolto\",\"rizoma\",\"roba\",\"robotico\",\"robusto\",\"roccia\",\"roco\",\"rodaggio\",\"rodere\",\"roditore\",\"rogito\",\"rollio\",\"romantico\",\"rompere\",\"ronzio\",\"rosolare\",\"rospo\",\"rotante\",\"rotondo\",\"rotula\",\"rovescio\",\"rubizzo\",\"rubrica\",\"ruga\",\"rullino\",\"rumine\",\"rumoroso\",\"ruolo\",\"rupe\",\"russare\",\"rustico\",\"sabato\",\"sabbiare\",\"sabotato\",\"sagoma\",\"salasso\",\"saldatura\",\"salgemma\",\"salivare\",\"salmone\",\"salone\",\"saltare\",\"saluto\",\"salvo\",\"sapere\",\"sapido\",\"saporito\",\"saraceno\",\"sarcasmo\",\"sarto\",\"sassoso\",\"satellite\",\"satira\",\"satollo\",\"saturno\",\"savana\",\"savio\",\"saziato\",\"sbadiglio\",\"sbalzo\",\"sbancato\",\"sbarra\",\"sbattere\",\"sbavare\",\"sbendare\",\"sbirciare\",\"sbloccato\",\"sbocciato\",\"sbrinare\",\"sbruffone\",\"sbuffare\",\"scabroso\",\"scadenza\",\"scala\",\"scambiare\",\"scandalo\",\"scapola\",\"scarso\",\"scatenare\",\"scavato\",\"scelto\",\"scenico\",\"scettro\",\"scheda\",\"schiena\",\"sciarpa\",\"scienza\",\"scindere\",\"scippo\",\"sciroppo\",\"scivolo\",\"sclerare\",\"scodella\",\"scolpito\",\"scomparto\",\"sconforto\",\"scoprire\",\"scorta\",\"scossone\",\"scozzese\",\"scriba\",\"scrollare\",\"scrutinio\",\"scuderia\",\"scultore\",\"scuola\",\"scuro\",\"scusare\",\"sdebitare\",\"sdoganare\",\"seccatura\",\"secondo\",\"sedano\",\"seggiola\",\"segnalato\",\"segregato\",\"seguito\",\"selciato\",\"selettivo\",\"sella\",\"selvaggio\",\"semaforo\",\"sembrare\",\"seme\",\"seminato\",\"sempre\",\"senso\",\"sentire\",\"sepolto\",\"sequenza\",\"serata\",\"serbato\",\"sereno\",\"serio\",\"serpente\",\"serraglio\",\"servire\",\"sestina\",\"setola\",\"settimana\",\"sfacelo\",\"sfaldare\",\"sfamato\",\"sfarzoso\",\"sfaticato\",\"sfera\",\"sfida\",\"sfilato\",\"sfinge\",\"sfocato\",\"sfoderare\",\"sfogo\",\"sfoltire\",\"sforzato\",\"sfratto\",\"sfruttato\",\"sfuggito\",\"sfumare\",\"sfuso\",\"sgabello\",\"sgarbato\",\"sgonfiare\",\"sgorbio\",\"sgrassato\",\"sguardo\",\"sibilo\",\"siccome\",\"sierra\",\"sigla\",\"signore\",\"silenzio\",\"sillaba\",\"simbolo\",\"simpatico\",\"simulato\",\"sinfonia\",\"singolo\",\"sinistro\",\"sino\",\"sintesi\",\"sinusoide\",\"sipario\",\"sisma\",\"sistole\",\"situato\",\"slitta\",\"slogatura\",\"sloveno\",\"smarrito\",\"smemorato\",\"smentito\",\"smeraldo\",\"smilzo\",\"smontare\",\"smottato\",\"smussato\",\"snellire\",\"snervato\",\"snodo\",\"sobbalzo\",\"sobrio\",\"soccorso\",\"sociale\",\"sodale\",\"soffitto\",\"sogno\",\"soldato\",\"solenne\",\"solido\",\"sollazzo\",\"solo\",\"solubile\",\"solvente\",\"somatico\",\"somma\",\"sonda\",\"sonetto\",\"sonnifero\",\"sopire\",\"soppeso\",\"sopra\",\"sorgere\",\"sorpasso\",\"sorriso\",\"sorso\",\"sorteggio\",\"sorvolato\",\"sospiro\",\"sosta\",\"sottile\",\"spada\",\"spalla\",\"spargere\",\"spatola\",\"spavento\",\"spazzola\",\"specie\",\"spedire\",\"spegnere\",\"spelatura\",\"speranza\",\"spessore\",\"spettrale\",\"spezzato\",\"spia\",\"spigoloso\",\"spillato\",\"spinoso\",\"spirale\",\"splendido\",\"sportivo\",\"sposo\",\"spranga\",\"sprecare\",\"spronato\",\"spruzzo\",\"spuntino\",\"squillo\",\"sradicare\",\"srotolato\",\"stabile\",\"stacco\",\"staffa\",\"stagnare\",\"stampato\",\"stantio\",\"starnuto\",\"stasera\",\"statuto\",\"stelo\",\"steppa\",\"sterzo\",\"stiletto\",\"stima\",\"stirpe\",\"stivale\",\"stizzoso\",\"stonato\",\"storico\",\"strappo\",\"stregato\",\"stridulo\",\"strozzare\",\"strutto\",\"stuccare\",\"stufo\",\"stupendo\",\"subentro\",\"succoso\",\"sudore\",\"suggerito\",\"sugo\",\"sultano\",\"suonare\",\"superbo\",\"supporto\",\"surgelato\",\"surrogato\",\"sussurro\",\"sutura\",\"svagare\",\"svedese\",\"sveglio\",\"svelare\",\"svenuto\",\"svezia\",\"sviluppo\",\"svista\",\"svizzera\",\"svolta\",\"svuotare\",\"tabacco\",\"tabulato\",\"tacciare\",\"taciturno\",\"tale\",\"talismano\",\"tampone\",\"tannino\",\"tara\",\"tardivo\",\"targato\",\"tariffa\",\"tarpare\",\"tartaruga\",\"tasto\",\"tattico\",\"taverna\",\"tavolata\",\"tazza\",\"teca\",\"tecnico\",\"telefono\",\"temerario\",\"tempo\",\"temuto\",\"tendone\",\"tenero\",\"tensione\",\"tentacolo\",\"teorema\",\"terme\",\"terrazzo\",\"terzetto\",\"tesi\",\"tesserato\",\"testato\",\"tetro\",\"tettoia\",\"tifare\",\"tigella\",\"timbro\",\"tinto\",\"tipico\",\"tipografo\",\"tiraggio\",\"tiro\",\"titanio\",\"titolo\",\"titubante\",\"tizio\",\"tizzone\",\"toccare\",\"tollerare\",\"tolto\",\"tombola\",\"tomo\",\"tonfo\",\"tonsilla\",\"topazio\",\"topologia\",\"toppa\",\"torba\",\"tornare\",\"torrone\",\"tortora\",\"toscano\",\"tossire\",\"tostatura\",\"totano\",\"trabocco\",\"trachea\",\"trafila\",\"tragedia\",\"tralcio\",\"tramonto\",\"transito\",\"trapano\",\"trarre\",\"trasloco\",\"trattato\",\"trave\",\"treccia\",\"tremolio\",\"trespolo\",\"tributo\",\"tricheco\",\"trifoglio\",\"trillo\",\"trincea\",\"trio\",\"tristezza\",\"triturato\",\"trivella\",\"tromba\",\"trono\",\"troppo\",\"trottola\",\"trovare\",\"truccato\",\"tubatura\",\"tuffato\",\"tulipano\",\"tumulto\",\"tunisia\",\"turbare\",\"turchino\",\"tuta\",\"tutela\",\"ubicato\",\"uccello\",\"uccisore\",\"udire\",\"uditivo\",\"uffa\",\"ufficio\",\"uguale\",\"ulisse\",\"ultimato\",\"umano\",\"umile\",\"umorismo\",\"uncinetto\",\"ungere\",\"ungherese\",\"unicorno\",\"unificato\",\"unisono\",\"unitario\",\"unte\",\"uovo\",\"upupa\",\"uragano\",\"urgenza\",\"urlo\",\"usanza\",\"usato\",\"uscito\",\"usignolo\",\"usuraio\",\"utensile\",\"utilizzo\",\"utopia\",\"vacante\",\"vaccinato\",\"vagabondo\",\"vagliato\",\"valanga\",\"valgo\",\"valico\",\"valletta\",\"valoroso\",\"valutare\",\"valvola\",\"vampata\",\"vangare\",\"vanitoso\",\"vano\",\"vantaggio\",\"vanvera\",\"vapore\",\"varano\",\"varcato\",\"variante\",\"vasca\",\"vedetta\",\"vedova\",\"veduto\",\"vegetale\",\"veicolo\",\"velcro\",\"velina\",\"velluto\",\"veloce\",\"venato\",\"vendemmia\",\"vento\",\"verace\",\"verbale\",\"vergogna\",\"verifica\",\"vero\",\"verruca\",\"verticale\",\"vescica\",\"vessillo\",\"vestale\",\"veterano\",\"vetrina\",\"vetusto\",\"viandante\",\"vibrante\",\"vicenda\",\"vichingo\",\"vicinanza\",\"vidimare\",\"vigilia\",\"vigneto\",\"vigore\",\"vile\",\"villano\",\"vimini\",\"vincitore\",\"viola\",\"vipera\",\"virgola\",\"virologo\",\"virulento\",\"viscoso\",\"visione\",\"vispo\",\"vissuto\",\"visura\",\"vita\",\"vitello\",\"vittima\",\"vivanda\",\"vivido\",\"viziare\",\"voce\",\"voga\",\"volatile\",\"volere\",\"volpe\",\"voragine\",\"vulcano\",\"zampogna\",\"zanna\",\"zappato\",\"zattera\",\"zavorra\",\"zefiro\",\"zelante\",\"zelo\",\"zenzero\",\"zerbino\",\"zibetto\",\"zinco\",\"zircone\",\"zitto\",\"zolla\",\"zotico\",\"zucchero\",\"zufolo\",\"zulu\",\"zuppa\"]");

const require$$6 = /* #__PURE__ */ JSON.parse("[\"ábaco\",\"abdomen\",\"abeja\",\"abierto\",\"abogado\",\"abono\",\"aborto\",\"abrazo\",\"abrir\",\"abuelo\",\"abuso\",\"acabar\",\"academia\",\"acceso\",\"acción\",\"aceite\",\"acelga\",\"acento\",\"aceptar\",\"ácido\",\"aclarar\",\"acné\",\"acoger\",\"acoso\",\"activo\",\"acto\",\"actriz\",\"actuar\",\"acudir\",\"acuerdo\",\"acusar\",\"adicto\",\"admitir\",\"adoptar\",\"adorno\",\"aduana\",\"adulto\",\"aéreo\",\"afectar\",\"afición\",\"afinar\",\"afirmar\",\"ágil\",\"agitar\",\"agonía\",\"agosto\",\"agotar\",\"agregar\",\"agrio\",\"agua\",\"agudo\",\"águila\",\"aguja\",\"ahogo\",\"ahorro\",\"aire\",\"aislar\",\"ajedrez\",\"ajeno\",\"ajuste\",\"alacrán\",\"alambre\",\"alarma\",\"alba\",\"álbum\",\"alcalde\",\"aldea\",\"alegre\",\"alejar\",\"alerta\",\"aleta\",\"alfiler\",\"alga\",\"algodón\",\"aliado\",\"aliento\",\"alivio\",\"alma\",\"almeja\",\"almíbar\",\"altar\",\"alteza\",\"altivo\",\"alto\",\"altura\",\"alumno\",\"alzar\",\"amable\",\"amante\",\"amapola\",\"amargo\",\"amasar\",\"ámbar\",\"ámbito\",\"ameno\",\"amigo\",\"amistad\",\"amor\",\"amparo\",\"amplio\",\"ancho\",\"anciano\",\"ancla\",\"andar\",\"andén\",\"anemia\",\"ángulo\",\"anillo\",\"ánimo\",\"anís\",\"anotar\",\"antena\",\"antiguo\",\"antojo\",\"anual\",\"anular\",\"anuncio\",\"añadir\",\"añejo\",\"año\",\"apagar\",\"aparato\",\"apetito\",\"apio\",\"aplicar\",\"apodo\",\"aporte\",\"apoyo\",\"aprender\",\"aprobar\",\"apuesta\",\"apuro\",\"arado\",\"araña\",\"arar\",\"árbitro\",\"árbol\",\"arbusto\",\"archivo\",\"arco\",\"arder\",\"ardilla\",\"arduo\",\"área\",\"árido\",\"aries\",\"armonía\",\"arnés\",\"aroma\",\"arpa\",\"arpón\",\"arreglo\",\"arroz\",\"arruga\",\"arte\",\"artista\",\"asa\",\"asado\",\"asalto\",\"ascenso\",\"asegurar\",\"aseo\",\"asesor\",\"asiento\",\"asilo\",\"asistir\",\"asno\",\"asombro\",\"áspero\",\"astilla\",\"astro\",\"astuto\",\"asumir\",\"asunto\",\"atajo\",\"ataque\",\"atar\",\"atento\",\"ateo\",\"ático\",\"atleta\",\"átomo\",\"atraer\",\"atroz\",\"atún\",\"audaz\",\"audio\",\"auge\",\"aula\",\"aumento\",\"ausente\",\"autor\",\"aval\",\"avance\",\"avaro\",\"ave\",\"avellana\",\"avena\",\"avestruz\",\"avión\",\"aviso\",\"ayer\",\"ayuda\",\"ayuno\",\"azafrán\",\"azar\",\"azote\",\"azúcar\",\"azufre\",\"azul\",\"baba\",\"babor\",\"bache\",\"bahía\",\"baile\",\"bajar\",\"balanza\",\"balcón\",\"balde\",\"bambú\",\"banco\",\"banda\",\"baño\",\"barba\",\"barco\",\"barniz\",\"barro\",\"báscula\",\"bastón\",\"basura\",\"batalla\",\"batería\",\"batir\",\"batuta\",\"baúl\",\"bazar\",\"bebé\",\"bebida\",\"bello\",\"besar\",\"beso\",\"bestia\",\"bicho\",\"bien\",\"bingo\",\"blanco\",\"bloque\",\"blusa\",\"boa\",\"bobina\",\"bobo\",\"boca\",\"bocina\",\"boda\",\"bodega\",\"boina\",\"bola\",\"bolero\",\"bolsa\",\"bomba\",\"bondad\",\"bonito\",\"bono\",\"bonsái\",\"borde\",\"borrar\",\"bosque\",\"bote\",\"botín\",\"bóveda\",\"bozal\",\"bravo\",\"brazo\",\"brecha\",\"breve\",\"brillo\",\"brinco\",\"brisa\",\"broca\",\"broma\",\"bronce\",\"brote\",\"bruja\",\"brusco\",\"bruto\",\"buceo\",\"bucle\",\"bueno\",\"buey\",\"bufanda\",\"bufón\",\"búho\",\"buitre\",\"bulto\",\"burbuja\",\"burla\",\"burro\",\"buscar\",\"butaca\",\"buzón\",\"caballo\",\"cabeza\",\"cabina\",\"cabra\",\"cacao\",\"cadáver\",\"cadena\",\"caer\",\"café\",\"caída\",\"caimán\",\"caja\",\"cajón\",\"cal\",\"calamar\",\"calcio\",\"caldo\",\"calidad\",\"calle\",\"calma\",\"calor\",\"calvo\",\"cama\",\"cambio\",\"camello\",\"camino\",\"campo\",\"cáncer\",\"candil\",\"canela\",\"canguro\",\"canica\",\"canto\",\"caña\",\"cañón\",\"caoba\",\"caos\",\"capaz\",\"capitán\",\"capote\",\"captar\",\"capucha\",\"cara\",\"carbón\",\"cárcel\",\"careta\",\"carga\",\"cariño\",\"carne\",\"carpeta\",\"carro\",\"carta\",\"casa\",\"casco\",\"casero\",\"caspa\",\"castor\",\"catorce\",\"catre\",\"caudal\",\"causa\",\"cazo\",\"cebolla\",\"ceder\",\"cedro\",\"celda\",\"célebre\",\"celoso\",\"célula\",\"cemento\",\"ceniza\",\"centro\",\"cerca\",\"cerdo\",\"cereza\",\"cero\",\"cerrar\",\"certeza\",\"césped\",\"cetro\",\"chacal\",\"chaleco\",\"champú\",\"chancla\",\"chapa\",\"charla\",\"chico\",\"chiste\",\"chivo\",\"choque\",\"choza\",\"chuleta\",\"chupar\",\"ciclón\",\"ciego\",\"cielo\",\"cien\",\"cierto\",\"cifra\",\"cigarro\",\"cima\",\"cinco\",\"cine\",\"cinta\",\"ciprés\",\"circo\",\"ciruela\",\"cisne\",\"cita\",\"ciudad\",\"clamor\",\"clan\",\"claro\",\"clase\",\"clave\",\"cliente\",\"clima\",\"clínica\",\"cobre\",\"cocción\",\"cochino\",\"cocina\",\"coco\",\"código\",\"codo\",\"cofre\",\"coger\",\"cohete\",\"cojín\",\"cojo\",\"cola\",\"colcha\",\"colegio\",\"colgar\",\"colina\",\"collar\",\"colmo\",\"columna\",\"combate\",\"comer\",\"comida\",\"cómodo\",\"compra\",\"conde\",\"conejo\",\"conga\",\"conocer\",\"consejo\",\"contar\",\"copa\",\"copia\",\"corazón\",\"corbata\",\"corcho\",\"cordón\",\"corona\",\"correr\",\"coser\",\"cosmos\",\"costa\",\"cráneo\",\"cráter\",\"crear\",\"crecer\",\"creído\",\"crema\",\"cría\",\"crimen\",\"cripta\",\"crisis\",\"cromo\",\"crónica\",\"croqueta\",\"crudo\",\"cruz\",\"cuadro\",\"cuarto\",\"cuatro\",\"cubo\",\"cubrir\",\"cuchara\",\"cuello\",\"cuento\",\"cuerda\",\"cuesta\",\"cueva\",\"cuidar\",\"culebra\",\"culpa\",\"culto\",\"cumbre\",\"cumplir\",\"cuna\",\"cuneta\",\"cuota\",\"cupón\",\"cúpula\",\"curar\",\"curioso\",\"curso\",\"curva\",\"cutis\",\"dama\",\"danza\",\"dar\",\"dardo\",\"dátil\",\"deber\",\"débil\",\"década\",\"decir\",\"dedo\",\"defensa\",\"definir\",\"dejar\",\"delfín\",\"delgado\",\"delito\",\"demora\",\"denso\",\"dental\",\"deporte\",\"derecho\",\"derrota\",\"desayuno\",\"deseo\",\"desfile\",\"desnudo\",\"destino\",\"desvío\",\"detalle\",\"detener\",\"deuda\",\"día\",\"diablo\",\"diadema\",\"diamante\",\"diana\",\"diario\",\"dibujo\",\"dictar\",\"diente\",\"dieta\",\"diez\",\"difícil\",\"digno\",\"dilema\",\"diluir\",\"dinero\",\"directo\",\"dirigir\",\"disco\",\"diseño\",\"disfraz\",\"diva\",\"divino\",\"doble\",\"doce\",\"dolor\",\"domingo\",\"don\",\"donar\",\"dorado\",\"dormir\",\"dorso\",\"dos\",\"dosis\",\"dragón\",\"droga\",\"ducha\",\"duda\",\"duelo\",\"dueño\",\"dulce\",\"dúo\",\"duque\",\"durar\",\"dureza\",\"duro\",\"ébano\",\"ebrio\",\"echar\",\"eco\",\"ecuador\",\"edad\",\"edición\",\"edificio\",\"editor\",\"educar\",\"efecto\",\"eficaz\",\"eje\",\"ejemplo\",\"elefante\",\"elegir\",\"elemento\",\"elevar\",\"elipse\",\"élite\",\"elixir\",\"elogio\",\"eludir\",\"embudo\",\"emitir\",\"emoción\",\"empate\",\"empeño\",\"empleo\",\"empresa\",\"enano\",\"encargo\",\"enchufe\",\"encía\",\"enemigo\",\"enero\",\"enfado\",\"enfermo\",\"engaño\",\"enigma\",\"enlace\",\"enorme\",\"enredo\",\"ensayo\",\"enseñar\",\"entero\",\"entrar\",\"envase\",\"envío\",\"época\",\"equipo\",\"erizo\",\"escala\",\"escena\",\"escolar\",\"escribir\",\"escudo\",\"esencia\",\"esfera\",\"esfuerzo\",\"espada\",\"espejo\",\"espía\",\"esposa\",\"espuma\",\"esquí\",\"estar\",\"este\",\"estilo\",\"estufa\",\"etapa\",\"eterno\",\"ética\",\"etnia\",\"evadir\",\"evaluar\",\"evento\",\"evitar\",\"exacto\",\"examen\",\"exceso\",\"excusa\",\"exento\",\"exigir\",\"exilio\",\"existir\",\"éxito\",\"experto\",\"explicar\",\"exponer\",\"extremo\",\"fábrica\",\"fábula\",\"fachada\",\"fácil\",\"factor\",\"faena\",\"faja\",\"falda\",\"fallo\",\"falso\",\"faltar\",\"fama\",\"familia\",\"famoso\",\"faraón\",\"farmacia\",\"farol\",\"farsa\",\"fase\",\"fatiga\",\"fauna\",\"favor\",\"fax\",\"febrero\",\"fecha\",\"feliz\",\"feo\",\"feria\",\"feroz\",\"fértil\",\"fervor\",\"festín\",\"fiable\",\"fianza\",\"fiar\",\"fibra\",\"ficción\",\"ficha\",\"fideo\",\"fiebre\",\"fiel\",\"fiera\",\"fiesta\",\"figura\",\"fijar\",\"fijo\",\"fila\",\"filete\",\"filial\",\"filtro\",\"fin\",\"finca\",\"fingir\",\"finito\",\"firma\",\"flaco\",\"flauta\",\"flecha\",\"flor\",\"flota\",\"fluir\",\"flujo\",\"flúor\",\"fobia\",\"foca\",\"fogata\",\"fogón\",\"folio\",\"folleto\",\"fondo\",\"forma\",\"forro\",\"fortuna\",\"forzar\",\"fosa\",\"foto\",\"fracaso\",\"frágil\",\"franja\",\"frase\",\"fraude\",\"freír\",\"freno\",\"fresa\",\"frío\",\"frito\",\"fruta\",\"fuego\",\"fuente\",\"fuerza\",\"fuga\",\"fumar\",\"función\",\"funda\",\"furgón\",\"furia\",\"fusil\",\"fútbol\",\"futuro\",\"gacela\",\"gafas\",\"gaita\",\"gajo\",\"gala\",\"galería\",\"gallo\",\"gamba\",\"ganar\",\"gancho\",\"ganga\",\"ganso\",\"garaje\",\"garza\",\"gasolina\",\"gastar\",\"gato\",\"gavilán\",\"gemelo\",\"gemir\",\"gen\",\"género\",\"genio\",\"gente\",\"geranio\",\"gerente\",\"germen\",\"gesto\",\"gigante\",\"gimnasio\",\"girar\",\"giro\",\"glaciar\",\"globo\",\"gloria\",\"gol\",\"golfo\",\"goloso\",\"golpe\",\"goma\",\"gordo\",\"gorila\",\"gorra\",\"gota\",\"goteo\",\"gozar\",\"grada\",\"gráfico\",\"grano\",\"grasa\",\"gratis\",\"grave\",\"grieta\",\"grillo\",\"gripe\",\"gris\",\"grito\",\"grosor\",\"grúa\",\"grueso\",\"grumo\",\"grupo\",\"guante\",\"guapo\",\"guardia\",\"guerra\",\"guía\",\"guiño\",\"guion\",\"guiso\",\"guitarra\",\"gusano\",\"gustar\",\"haber\",\"hábil\",\"hablar\",\"hacer\",\"hacha\",\"hada\",\"hallar\",\"hamaca\",\"harina\",\"haz\",\"hazaña\",\"hebilla\",\"hebra\",\"hecho\",\"helado\",\"helio\",\"hembra\",\"herir\",\"hermano\",\"héroe\",\"hervir\",\"hielo\",\"hierro\",\"hígado\",\"higiene\",\"hijo\",\"himno\",\"historia\",\"hocico\",\"hogar\",\"hoguera\",\"hoja\",\"hombre\",\"hongo\",\"honor\",\"honra\",\"hora\",\"hormiga\",\"horno\",\"hostil\",\"hoyo\",\"hueco\",\"huelga\",\"huerta\",\"hueso\",\"huevo\",\"huida\",\"huir\",\"humano\",\"húmedo\",\"humilde\",\"humo\",\"hundir\",\"huracán\",\"hurto\",\"icono\",\"ideal\",\"idioma\",\"ídolo\",\"iglesia\",\"iglú\",\"igual\",\"ilegal\",\"ilusión\",\"imagen\",\"imán\",\"imitar\",\"impar\",\"imperio\",\"imponer\",\"impulso\",\"incapaz\",\"índice\",\"inerte\",\"infiel\",\"informe\",\"ingenio\",\"inicio\",\"inmenso\",\"inmune\",\"innato\",\"insecto\",\"instante\",\"interés\",\"íntimo\",\"intuir\",\"inútil\",\"invierno\",\"ira\",\"iris\",\"ironía\",\"isla\",\"islote\",\"jabalí\",\"jabón\",\"jamón\",\"jarabe\",\"jardín\",\"jarra\",\"jaula\",\"jazmín\",\"jefe\",\"jeringa\",\"jinete\",\"jornada\",\"joroba\",\"joven\",\"joya\",\"juerga\",\"jueves\",\"juez\",\"jugador\",\"jugo\",\"juguete\",\"juicio\",\"junco\",\"jungla\",\"junio\",\"juntar\",\"júpiter\",\"jurar\",\"justo\",\"juvenil\",\"juzgar\",\"kilo\",\"koala\",\"labio\",\"lacio\",\"lacra\",\"lado\",\"ladrón\",\"lagarto\",\"lágrima\",\"laguna\",\"laico\",\"lamer\",\"lámina\",\"lámpara\",\"lana\",\"lancha\",\"langosta\",\"lanza\",\"lápiz\",\"largo\",\"larva\",\"lástima\",\"lata\",\"látex\",\"latir\",\"laurel\",\"lavar\",\"lazo\",\"leal\",\"lección\",\"leche\",\"lector\",\"leer\",\"legión\",\"legumbre\",\"lejano\",\"lengua\",\"lento\",\"leña\",\"león\",\"leopardo\",\"lesión\",\"letal\",\"letra\",\"leve\",\"leyenda\",\"libertad\",\"libro\",\"licor\",\"líder\",\"lidiar\",\"lienzo\",\"liga\",\"ligero\",\"lima\",\"límite\",\"limón\",\"limpio\",\"lince\",\"lindo\",\"línea\",\"lingote\",\"lino\",\"linterna\",\"líquido\",\"liso\",\"lista\",\"litera\",\"litio\",\"litro\",\"llaga\",\"llama\",\"llanto\",\"llave\",\"llegar\",\"llenar\",\"llevar\",\"llorar\",\"llover\",\"lluvia\",\"lobo\",\"loción\",\"loco\",\"locura\",\"lógica\",\"logro\",\"lombriz\",\"lomo\",\"lonja\",\"lote\",\"lucha\",\"lucir\",\"lugar\",\"lujo\",\"luna\",\"lunes\",\"lupa\",\"lustro\",\"luto\",\"luz\",\"maceta\",\"macho\",\"madera\",\"madre\",\"maduro\",\"maestro\",\"mafia\",\"magia\",\"mago\",\"maíz\",\"maldad\",\"maleta\",\"malla\",\"malo\",\"mamá\",\"mambo\",\"mamut\",\"manco\",\"mando\",\"manejar\",\"manga\",\"maniquí\",\"manjar\",\"mano\",\"manso\",\"manta\",\"mañana\",\"mapa\",\"máquina\",\"mar\",\"marco\",\"marea\",\"marfil\",\"margen\",\"marido\",\"mármol\",\"marrón\",\"martes\",\"marzo\",\"masa\",\"máscara\",\"masivo\",\"matar\",\"materia\",\"matiz\",\"matriz\",\"máximo\",\"mayor\",\"mazorca\",\"mecha\",\"medalla\",\"medio\",\"médula\",\"mejilla\",\"mejor\",\"melena\",\"melón\",\"memoria\",\"menor\",\"mensaje\",\"mente\",\"menú\",\"mercado\",\"merengue\",\"mérito\",\"mes\",\"mesón\",\"meta\",\"meter\",\"método\",\"metro\",\"mezcla\",\"miedo\",\"miel\",\"miembro\",\"miga\",\"mil\",\"milagro\",\"militar\",\"millón\",\"mimo\",\"mina\",\"minero\",\"mínimo\",\"minuto\",\"miope\",\"mirar\",\"misa\",\"miseria\",\"misil\",\"mismo\",\"mitad\",\"mito\",\"mochila\",\"moción\",\"moda\",\"modelo\",\"moho\",\"mojar\",\"molde\",\"moler\",\"molino\",\"momento\",\"momia\",\"monarca\",\"moneda\",\"monja\",\"monto\",\"moño\",\"morada\",\"morder\",\"moreno\",\"morir\",\"morro\",\"morsa\",\"mortal\",\"mosca\",\"mostrar\",\"motivo\",\"mover\",\"móvil\",\"mozo\",\"mucho\",\"mudar\",\"mueble\",\"muela\",\"muerte\",\"muestra\",\"mugre\",\"mujer\",\"mula\",\"muleta\",\"multa\",\"mundo\",\"muñeca\",\"mural\",\"muro\",\"músculo\",\"museo\",\"musgo\",\"música\",\"muslo\",\"nácar\",\"nación\",\"nadar\",\"naipe\",\"naranja\",\"nariz\",\"narrar\",\"nasal\",\"natal\",\"nativo\",\"natural\",\"náusea\",\"naval\",\"nave\",\"navidad\",\"necio\",\"néctar\",\"negar\",\"negocio\",\"negro\",\"neón\",\"nervio\",\"neto\",\"neutro\",\"nevar\",\"nevera\",\"nicho\",\"nido\",\"niebla\",\"nieto\",\"niñez\",\"niño\",\"nítido\",\"nivel\",\"nobleza\",\"noche\",\"nómina\",\"noria\",\"norma\",\"norte\",\"nota\",\"noticia\",\"novato\",\"novela\",\"novio\",\"nube\",\"nuca\",\"núcleo\",\"nudillo\",\"nudo\",\"nuera\",\"nueve\",\"nuez\",\"nulo\",\"número\",\"nutria\",\"oasis\",\"obeso\",\"obispo\",\"objeto\",\"obra\",\"obrero\",\"observar\",\"obtener\",\"obvio\",\"oca\",\"ocaso\",\"océano\",\"ochenta\",\"ocho\",\"ocio\",\"ocre\",\"octavo\",\"octubre\",\"oculto\",\"ocupar\",\"ocurrir\",\"odiar\",\"odio\",\"odisea\",\"oeste\",\"ofensa\",\"oferta\",\"oficio\",\"ofrecer\",\"ogro\",\"oído\",\"oír\",\"ojo\",\"ola\",\"oleada\",\"olfato\",\"olivo\",\"olla\",\"olmo\",\"olor\",\"olvido\",\"ombligo\",\"onda\",\"onza\",\"opaco\",\"opción\",\"ópera\",\"opinar\",\"oponer\",\"optar\",\"óptica\",\"opuesto\",\"oración\",\"orador\",\"oral\",\"órbita\",\"orca\",\"orden\",\"oreja\",\"órgano\",\"orgía\",\"orgullo\",\"oriente\",\"origen\",\"orilla\",\"oro\",\"orquesta\",\"oruga\",\"osadía\",\"oscuro\",\"osezno\",\"oso\",\"ostra\",\"otoño\",\"otro\",\"oveja\",\"óvulo\",\"óxido\",\"oxígeno\",\"oyente\",\"ozono\",\"pacto\",\"padre\",\"paella\",\"página\",\"pago\",\"país\",\"pájaro\",\"palabra\",\"palco\",\"paleta\",\"pálido\",\"palma\",\"paloma\",\"palpar\",\"pan\",\"panal\",\"pánico\",\"pantera\",\"pañuelo\",\"papá\",\"papel\",\"papilla\",\"paquete\",\"parar\",\"parcela\",\"pared\",\"parir\",\"paro\",\"párpado\",\"parque\",\"párrafo\",\"parte\",\"pasar\",\"paseo\",\"pasión\",\"paso\",\"pasta\",\"pata\",\"patio\",\"patria\",\"pausa\",\"pauta\",\"pavo\",\"payaso\",\"peatón\",\"pecado\",\"pecera\",\"pecho\",\"pedal\",\"pedir\",\"pegar\",\"peine\",\"pelar\",\"peldaño\",\"pelea\",\"peligro\",\"pellejo\",\"pelo\",\"peluca\",\"pena\",\"pensar\",\"peñón\",\"peón\",\"peor\",\"pepino\",\"pequeño\",\"pera\",\"percha\",\"perder\",\"pereza\",\"perfil\",\"perico\",\"perla\",\"permiso\",\"perro\",\"persona\",\"pesa\",\"pesca\",\"pésimo\",\"pestaña\",\"pétalo\",\"petróleo\",\"pez\",\"pezuña\",\"picar\",\"pichón\",\"pie\",\"piedra\",\"pierna\",\"pieza\",\"pijama\",\"pilar\",\"piloto\",\"pimienta\",\"pino\",\"pintor\",\"pinza\",\"piña\",\"piojo\",\"pipa\",\"pirata\",\"pisar\",\"piscina\",\"piso\",\"pista\",\"pitón\",\"pizca\",\"placa\",\"plan\",\"plata\",\"playa\",\"plaza\",\"pleito\",\"pleno\",\"plomo\",\"pluma\",\"plural\",\"pobre\",\"poco\",\"poder\",\"podio\",\"poema\",\"poesía\",\"poeta\",\"polen\",\"policía\",\"pollo\",\"polvo\",\"pomada\",\"pomelo\",\"pomo\",\"pompa\",\"poner\",\"porción\",\"portal\",\"posada\",\"poseer\",\"posible\",\"poste\",\"potencia\",\"potro\",\"pozo\",\"prado\",\"precoz\",\"pregunta\",\"premio\",\"prensa\",\"preso\",\"previo\",\"primo\",\"príncipe\",\"prisión\",\"privar\",\"proa\",\"probar\",\"proceso\",\"producto\",\"proeza\",\"profesor\",\"programa\",\"prole\",\"promesa\",\"pronto\",\"propio\",\"próximo\",\"prueba\",\"público\",\"puchero\",\"pudor\",\"pueblo\",\"puerta\",\"puesto\",\"pulga\",\"pulir\",\"pulmón\",\"pulpo\",\"pulso\",\"puma\",\"punto\",\"puñal\",\"puño\",\"pupa\",\"pupila\",\"puré\",\"quedar\",\"queja\",\"quemar\",\"querer\",\"queso\",\"quieto\",\"química\",\"quince\",\"quitar\",\"rábano\",\"rabia\",\"rabo\",\"ración\",\"radical\",\"raíz\",\"rama\",\"rampa\",\"rancho\",\"rango\",\"rapaz\",\"rápido\",\"rapto\",\"rasgo\",\"raspa\",\"rato\",\"rayo\",\"raza\",\"razón\",\"reacción\",\"realidad\",\"rebaño\",\"rebote\",\"recaer\",\"receta\",\"rechazo\",\"recoger\",\"recreo\",\"recto\",\"recurso\",\"red\",\"redondo\",\"reducir\",\"reflejo\",\"reforma\",\"refrán\",\"refugio\",\"regalo\",\"regir\",\"regla\",\"regreso\",\"rehén\",\"reino\",\"reír\",\"reja\",\"relato\",\"relevo\",\"relieve\",\"relleno\",\"reloj\",\"remar\",\"remedio\",\"remo\",\"rencor\",\"rendir\",\"renta\",\"reparto\",\"repetir\",\"reposo\",\"reptil\",\"res\",\"rescate\",\"resina\",\"respeto\",\"resto\",\"resumen\",\"retiro\",\"retorno\",\"retrato\",\"reunir\",\"revés\",\"revista\",\"rey\",\"rezar\",\"rico\",\"riego\",\"rienda\",\"riesgo\",\"rifa\",\"rígido\",\"rigor\",\"rincón\",\"riñón\",\"río\",\"riqueza\",\"risa\",\"ritmo\",\"rito\",\"rizo\",\"roble\",\"roce\",\"rociar\",\"rodar\",\"rodeo\",\"rodilla\",\"roer\",\"rojizo\",\"rojo\",\"romero\",\"romper\",\"ron\",\"ronco\",\"ronda\",\"ropa\",\"ropero\",\"rosa\",\"rosca\",\"rostro\",\"rotar\",\"rubí\",\"rubor\",\"rudo\",\"rueda\",\"rugir\",\"ruido\",\"ruina\",\"ruleta\",\"rulo\",\"rumbo\",\"rumor\",\"ruptura\",\"ruta\",\"rutina\",\"sábado\",\"saber\",\"sabio\",\"sable\",\"sacar\",\"sagaz\",\"sagrado\",\"sala\",\"saldo\",\"salero\",\"salir\",\"salmón\",\"salón\",\"salsa\",\"salto\",\"salud\",\"salvar\",\"samba\",\"sanción\",\"sandía\",\"sanear\",\"sangre\",\"sanidad\",\"sano\",\"santo\",\"sapo\",\"saque\",\"sardina\",\"sartén\",\"sastre\",\"satán\",\"sauna\",\"saxofón\",\"sección\",\"seco\",\"secreto\",\"secta\",\"sed\",\"seguir\",\"seis\",\"sello\",\"selva\",\"semana\",\"semilla\",\"senda\",\"sensor\",\"señal\",\"señor\",\"separar\",\"sepia\",\"sequía\",\"ser\",\"serie\",\"sermón\",\"servir\",\"sesenta\",\"sesión\",\"seta\",\"setenta\",\"severo\",\"sexo\",\"sexto\",\"sidra\",\"siesta\",\"siete\",\"siglo\",\"signo\",\"sílaba\",\"silbar\",\"silencio\",\"silla\",\"símbolo\",\"simio\",\"sirena\",\"sistema\",\"sitio\",\"situar\",\"sobre\",\"socio\",\"sodio\",\"sol\",\"solapa\",\"soldado\",\"soledad\",\"sólido\",\"soltar\",\"solución\",\"sombra\",\"sondeo\",\"sonido\",\"sonoro\",\"sonrisa\",\"sopa\",\"soplar\",\"soporte\",\"sordo\",\"sorpresa\",\"sorteo\",\"sostén\",\"sótano\",\"suave\",\"subir\",\"suceso\",\"sudor\",\"suegra\",\"suelo\",\"sueño\",\"suerte\",\"sufrir\",\"sujeto\",\"sultán\",\"sumar\",\"superar\",\"suplir\",\"suponer\",\"supremo\",\"sur\",\"surco\",\"sureño\",\"surgir\",\"susto\",\"sutil\",\"tabaco\",\"tabique\",\"tabla\",\"tabú\",\"taco\",\"tacto\",\"tajo\",\"talar\",\"talco\",\"talento\",\"talla\",\"talón\",\"tamaño\",\"tambor\",\"tango\",\"tanque\",\"tapa\",\"tapete\",\"tapia\",\"tapón\",\"taquilla\",\"tarde\",\"tarea\",\"tarifa\",\"tarjeta\",\"tarot\",\"tarro\",\"tarta\",\"tatuaje\",\"tauro\",\"taza\",\"tazón\",\"teatro\",\"techo\",\"tecla\",\"técnica\",\"tejado\",\"tejer\",\"tejido\",\"tela\",\"teléfono\",\"tema\",\"temor\",\"templo\",\"tenaz\",\"tender\",\"tener\",\"tenis\",\"tenso\",\"teoría\",\"terapia\",\"terco\",\"término\",\"ternura\",\"terror\",\"tesis\",\"tesoro\",\"testigo\",\"tetera\",\"texto\",\"tez\",\"tibio\",\"tiburón\",\"tiempo\",\"tienda\",\"tierra\",\"tieso\",\"tigre\",\"tijera\",\"tilde\",\"timbre\",\"tímido\",\"timo\",\"tinta\",\"tío\",\"típico\",\"tipo\",\"tira\",\"tirón\",\"titán\",\"títere\",\"título\",\"tiza\",\"toalla\",\"tobillo\",\"tocar\",\"tocino\",\"todo\",\"toga\",\"toldo\",\"tomar\",\"tono\",\"tonto\",\"topar\",\"tope\",\"toque\",\"tórax\",\"torero\",\"tormenta\",\"torneo\",\"toro\",\"torpedo\",\"torre\",\"torso\",\"tortuga\",\"tos\",\"tosco\",\"toser\",\"tóxico\",\"trabajo\",\"tractor\",\"traer\",\"tráfico\",\"trago\",\"traje\",\"tramo\",\"trance\",\"trato\",\"trauma\",\"trazar\",\"trébol\",\"tregua\",\"treinta\",\"tren\",\"trepar\",\"tres\",\"tribu\",\"trigo\",\"tripa\",\"triste\",\"triunfo\",\"trofeo\",\"trompa\",\"tronco\",\"tropa\",\"trote\",\"trozo\",\"truco\",\"trueno\",\"trufa\",\"tubería\",\"tubo\",\"tuerto\",\"tumba\",\"tumor\",\"túnel\",\"túnica\",\"turbina\",\"turismo\",\"turno\",\"tutor\",\"ubicar\",\"úlcera\",\"umbral\",\"unidad\",\"unir\",\"universo\",\"uno\",\"untar\",\"uña\",\"urbano\",\"urbe\",\"urgente\",\"urna\",\"usar\",\"usuario\",\"útil\",\"utopía\",\"uva\",\"vaca\",\"vacío\",\"vacuna\",\"vagar\",\"vago\",\"vaina\",\"vajilla\",\"vale\",\"válido\",\"valle\",\"valor\",\"válvula\",\"vampiro\",\"vara\",\"variar\",\"varón\",\"vaso\",\"vecino\",\"vector\",\"vehículo\",\"veinte\",\"vejez\",\"vela\",\"velero\",\"veloz\",\"vena\",\"vencer\",\"venda\",\"veneno\",\"vengar\",\"venir\",\"venta\",\"venus\",\"ver\",\"verano\",\"verbo\",\"verde\",\"vereda\",\"verja\",\"verso\",\"verter\",\"vía\",\"viaje\",\"vibrar\",\"vicio\",\"víctima\",\"vida\",\"vídeo\",\"vidrio\",\"viejo\",\"viernes\",\"vigor\",\"vil\",\"villa\",\"vinagre\",\"vino\",\"viñedo\",\"violín\",\"viral\",\"virgo\",\"virtud\",\"visor\",\"víspera\",\"vista\",\"vitamina\",\"viudo\",\"vivaz\",\"vivero\",\"vivir\",\"vivo\",\"volcán\",\"volumen\",\"volver\",\"voraz\",\"votar\",\"voto\",\"voz\",\"vuelo\",\"vulgar\",\"yacer\",\"yate\",\"yegua\",\"yema\",\"yerno\",\"yeso\",\"yodo\",\"yoga\",\"yogur\",\"zafiro\",\"zanja\",\"zapato\",\"zarza\",\"zona\",\"zorro\",\"zumo\",\"zurdo\"]");

const require$$7 = /* #__PURE__ */ JSON.parse("[\"あいこくしん\",\"あいさつ\",\"あいだ\",\"あおぞら\",\"あかちゃん\",\"あきる\",\"あけがた\",\"あける\",\"あこがれる\",\"あさい\",\"あさひ\",\"あしあと\",\"あじわう\",\"あずかる\",\"あずき\",\"あそぶ\",\"あたえる\",\"あたためる\",\"あたりまえ\",\"あたる\",\"あつい\",\"あつかう\",\"あっしゅく\",\"あつまり\",\"あつめる\",\"あてな\",\"あてはまる\",\"あひる\",\"あぶら\",\"あぶる\",\"あふれる\",\"あまい\",\"あまど\",\"あまやかす\",\"あまり\",\"あみもの\",\"あめりか\",\"あやまる\",\"あゆむ\",\"あらいぐま\",\"あらし\",\"あらすじ\",\"あらためる\",\"あらゆる\",\"あらわす\",\"ありがとう\",\"あわせる\",\"あわてる\",\"あんい\",\"あんがい\",\"あんこ\",\"あんぜん\",\"あんてい\",\"あんない\",\"あんまり\",\"いいだす\",\"いおん\",\"いがい\",\"いがく\",\"いきおい\",\"いきなり\",\"いきもの\",\"いきる\",\"いくじ\",\"いくぶん\",\"いけばな\",\"いけん\",\"いこう\",\"いこく\",\"いこつ\",\"いさましい\",\"いさん\",\"いしき\",\"いじゅう\",\"いじょう\",\"いじわる\",\"いずみ\",\"いずれ\",\"いせい\",\"いせえび\",\"いせかい\",\"いせき\",\"いぜん\",\"いそうろう\",\"いそがしい\",\"いだい\",\"いだく\",\"いたずら\",\"いたみ\",\"いたりあ\",\"いちおう\",\"いちじ\",\"いちど\",\"いちば\",\"いちぶ\",\"いちりゅう\",\"いつか\",\"いっしゅん\",\"いっせい\",\"いっそう\",\"いったん\",\"いっち\",\"いってい\",\"いっぽう\",\"いてざ\",\"いてん\",\"いどう\",\"いとこ\",\"いない\",\"いなか\",\"いねむり\",\"いのち\",\"いのる\",\"いはつ\",\"いばる\",\"いはん\",\"いびき\",\"いひん\",\"いふく\",\"いへん\",\"いほう\",\"いみん\",\"いもうと\",\"いもたれ\",\"いもり\",\"いやがる\",\"いやす\",\"いよかん\",\"いよく\",\"いらい\",\"いらすと\",\"いりぐち\",\"いりょう\",\"いれい\",\"いれもの\",\"いれる\",\"いろえんぴつ\",\"いわい\",\"いわう\",\"いわかん\",\"いわば\",\"いわゆる\",\"いんげんまめ\",\"いんさつ\",\"いんしょう\",\"いんよう\",\"うえき\",\"うえる\",\"うおざ\",\"うがい\",\"うかぶ\",\"うかべる\",\"うきわ\",\"うくらいな\",\"うくれれ\",\"うけたまわる\",\"うけつけ\",\"うけとる\",\"うけもつ\",\"うける\",\"うごかす\",\"うごく\",\"うこん\",\"うさぎ\",\"うしなう\",\"うしろがみ\",\"うすい\",\"うすぎ\",\"うすぐらい\",\"うすめる\",\"うせつ\",\"うちあわせ\",\"うちがわ\",\"うちき\",\"うちゅう\",\"うっかり\",\"うつくしい\",\"うったえる\",\"うつる\",\"うどん\",\"うなぎ\",\"うなじ\",\"うなずく\",\"うなる\",\"うねる\",\"うのう\",\"うぶげ\",\"うぶごえ\",\"うまれる\",\"うめる\",\"うもう\",\"うやまう\",\"うよく\",\"うらがえす\",\"うらぐち\",\"うらない\",\"うりあげ\",\"うりきれ\",\"うるさい\",\"うれしい\",\"うれゆき\",\"うれる\",\"うろこ\",\"うわき\",\"うわさ\",\"うんこう\",\"うんちん\",\"うんてん\",\"うんどう\",\"えいえん\",\"えいが\",\"えいきょう\",\"えいご\",\"えいせい\",\"えいぶん\",\"えいよう\",\"えいわ\",\"えおり\",\"えがお\",\"えがく\",\"えきたい\",\"えくせる\",\"えしゃく\",\"えすて\",\"えつらん\",\"えのぐ\",\"えほうまき\",\"えほん\",\"えまき\",\"えもじ\",\"えもの\",\"えらい\",\"えらぶ\",\"えりあ\",\"えんえん\",\"えんかい\",\"えんぎ\",\"えんげき\",\"えんしゅう\",\"えんぜつ\",\"えんそく\",\"えんちょう\",\"えんとつ\",\"おいかける\",\"おいこす\",\"おいしい\",\"おいつく\",\"おうえん\",\"おうさま\",\"おうじ\",\"おうせつ\",\"おうたい\",\"おうふく\",\"おうべい\",\"おうよう\",\"おえる\",\"おおい\",\"おおう\",\"おおどおり\",\"おおや\",\"おおよそ\",\"おかえり\",\"おかず\",\"おがむ\",\"おかわり\",\"おぎなう\",\"おきる\",\"おくさま\",\"おくじょう\",\"おくりがな\",\"おくる\",\"おくれる\",\"おこす\",\"おこなう\",\"おこる\",\"おさえる\",\"おさない\",\"おさめる\",\"おしいれ\",\"おしえる\",\"おじぎ\",\"おじさん\",\"おしゃれ\",\"おそらく\",\"おそわる\",\"おたがい\",\"おたく\",\"おだやか\",\"おちつく\",\"おっと\",\"おつり\",\"おでかけ\",\"おとしもの\",\"おとなしい\",\"おどり\",\"おどろかす\",\"おばさん\",\"おまいり\",\"おめでとう\",\"おもいで\",\"おもう\",\"おもたい\",\"おもちゃ\",\"おやつ\",\"おやゆび\",\"およぼす\",\"おらんだ\",\"おろす\",\"おんがく\",\"おんけい\",\"おんしゃ\",\"おんせん\",\"おんだん\",\"おんちゅう\",\"おんどけい\",\"かあつ\",\"かいが\",\"がいき\",\"がいけん\",\"がいこう\",\"かいさつ\",\"かいしゃ\",\"かいすいよく\",\"かいぜん\",\"かいぞうど\",\"かいつう\",\"かいてん\",\"かいとう\",\"かいふく\",\"がいへき\",\"かいほう\",\"かいよう\",\"がいらい\",\"かいわ\",\"かえる\",\"かおり\",\"かかえる\",\"かがく\",\"かがし\",\"かがみ\",\"かくご\",\"かくとく\",\"かざる\",\"がぞう\",\"かたい\",\"かたち\",\"がちょう\",\"がっきゅう\",\"がっこう\",\"がっさん\",\"がっしょう\",\"かなざわし\",\"かのう\",\"がはく\",\"かぶか\",\"かほう\",\"かほご\",\"かまう\",\"かまぼこ\",\"かめれおん\",\"かゆい\",\"かようび\",\"からい\",\"かるい\",\"かろう\",\"かわく\",\"かわら\",\"がんか\",\"かんけい\",\"かんこう\",\"かんしゃ\",\"かんそう\",\"かんたん\",\"かんち\",\"がんばる\",\"きあい\",\"きあつ\",\"きいろ\",\"ぎいん\",\"きうい\",\"きうん\",\"きえる\",\"きおう\",\"きおく\",\"きおち\",\"きおん\",\"きかい\",\"きかく\",\"きかんしゃ\",\"ききて\",\"きくばり\",\"きくらげ\",\"きけんせい\",\"きこう\",\"きこえる\",\"きこく\",\"きさい\",\"きさく\",\"きさま\",\"きさらぎ\",\"ぎじかがく\",\"ぎしき\",\"ぎじたいけん\",\"ぎじにってい\",\"ぎじゅつしゃ\",\"きすう\",\"きせい\",\"きせき\",\"きせつ\",\"きそう\",\"きぞく\",\"きぞん\",\"きたえる\",\"きちょう\",\"きつえん\",\"ぎっちり\",\"きつつき\",\"きつね\",\"きてい\",\"きどう\",\"きどく\",\"きない\",\"きなが\",\"きなこ\",\"きぬごし\",\"きねん\",\"きのう\",\"きのした\",\"きはく\",\"きびしい\",\"きひん\",\"きふく\",\"きぶん\",\"きぼう\",\"きほん\",\"きまる\",\"きみつ\",\"きむずかしい\",\"きめる\",\"きもだめし\",\"きもち\",\"きもの\",\"きゃく\",\"きやく\",\"ぎゅうにく\",\"きよう\",\"きょうりゅう\",\"きらい\",\"きらく\",\"きりん\",\"きれい\",\"きれつ\",\"きろく\",\"ぎろん\",\"きわめる\",\"ぎんいろ\",\"きんかくじ\",\"きんじょ\",\"きんようび\",\"ぐあい\",\"くいず\",\"くうかん\",\"くうき\",\"くうぐん\",\"くうこう\",\"ぐうせい\",\"くうそう\",\"ぐうたら\",\"くうふく\",\"くうぼ\",\"くかん\",\"くきょう\",\"くげん\",\"ぐこう\",\"くさい\",\"くさき\",\"くさばな\",\"くさる\",\"くしゃみ\",\"くしょう\",\"くすのき\",\"くすりゆび\",\"くせげ\",\"くせん\",\"ぐたいてき\",\"くださる\",\"くたびれる\",\"くちこみ\",\"くちさき\",\"くつした\",\"ぐっすり\",\"くつろぐ\",\"くとうてん\",\"くどく\",\"くなん\",\"くねくね\",\"くのう\",\"くふう\",\"くみあわせ\",\"くみたてる\",\"くめる\",\"くやくしょ\",\"くらす\",\"くらべる\",\"くるま\",\"くれる\",\"くろう\",\"くわしい\",\"ぐんかん\",\"ぐんしょく\",\"ぐんたい\",\"ぐんて\",\"けあな\",\"けいかく\",\"けいけん\",\"けいこ\",\"けいさつ\",\"げいじゅつ\",\"けいたい\",\"げいのうじん\",\"けいれき\",\"けいろ\",\"けおとす\",\"けおりもの\",\"げきか\",\"げきげん\",\"げきだん\",\"げきちん\",\"げきとつ\",\"げきは\",\"げきやく\",\"げこう\",\"げこくじょう\",\"げざい\",\"けさき\",\"げざん\",\"けしき\",\"けしごむ\",\"けしょう\",\"げすと\",\"けたば\",\"けちゃっぷ\",\"けちらす\",\"けつあつ\",\"けつい\",\"けつえき\",\"けっこん\",\"けつじょ\",\"けっせき\",\"けってい\",\"けつまつ\",\"げつようび\",\"げつれい\",\"けつろん\",\"げどく\",\"けとばす\",\"けとる\",\"けなげ\",\"けなす\",\"けなみ\",\"けぬき\",\"げねつ\",\"けねん\",\"けはい\",\"げひん\",\"けぶかい\",\"げぼく\",\"けまり\",\"けみかる\",\"けむし\",\"けむり\",\"けもの\",\"けらい\",\"けろけろ\",\"けわしい\",\"けんい\",\"けんえつ\",\"けんお\",\"けんか\",\"げんき\",\"けんげん\",\"けんこう\",\"けんさく\",\"けんしゅう\",\"けんすう\",\"げんそう\",\"けんちく\",\"けんてい\",\"けんとう\",\"けんない\",\"けんにん\",\"げんぶつ\",\"けんま\",\"けんみん\",\"けんめい\",\"けんらん\",\"けんり\",\"こあくま\",\"こいぬ\",\"こいびと\",\"ごうい\",\"こうえん\",\"こうおん\",\"こうかん\",\"ごうきゅう\",\"ごうけい\",\"こうこう\",\"こうさい\",\"こうじ\",\"こうすい\",\"ごうせい\",\"こうそく\",\"こうたい\",\"こうちゃ\",\"こうつう\",\"こうてい\",\"こうどう\",\"こうない\",\"こうはい\",\"ごうほう\",\"ごうまん\",\"こうもく\",\"こうりつ\",\"こえる\",\"こおり\",\"ごかい\",\"ごがつ\",\"ごかん\",\"こくご\",\"こくさい\",\"こくとう\",\"こくない\",\"こくはく\",\"こぐま\",\"こけい\",\"こける\",\"ここのか\",\"こころ\",\"こさめ\",\"こしつ\",\"こすう\",\"こせい\",\"こせき\",\"こぜん\",\"こそだて\",\"こたい\",\"こたえる\",\"こたつ\",\"こちょう\",\"こっか\",\"こつこつ\",\"こつばん\",\"こつぶ\",\"こてい\",\"こてん\",\"ことがら\",\"ことし\",\"ことば\",\"ことり\",\"こなごな\",\"こねこね\",\"このまま\",\"このみ\",\"このよ\",\"ごはん\",\"こひつじ\",\"こふう\",\"こふん\",\"こぼれる\",\"ごまあぶら\",\"こまかい\",\"ごますり\",\"こまつな\",\"こまる\",\"こむぎこ\",\"こもじ\",\"こもち\",\"こもの\",\"こもん\",\"こやく\",\"こやま\",\"こゆう\",\"こゆび\",\"こよい\",\"こよう\",\"こりる\",\"これくしょん\",\"ころっけ\",\"こわもて\",\"こわれる\",\"こんいん\",\"こんかい\",\"こんき\",\"こんしゅう\",\"こんすい\",\"こんだて\",\"こんとん\",\"こんなん\",\"こんびに\",\"こんぽん\",\"こんまけ\",\"こんや\",\"こんれい\",\"こんわく\",\"ざいえき\",\"さいかい\",\"さいきん\",\"ざいげん\",\"ざいこ\",\"さいしょ\",\"さいせい\",\"ざいたく\",\"ざいちゅう\",\"さいてき\",\"ざいりょう\",\"さうな\",\"さかいし\",\"さがす\",\"さかな\",\"さかみち\",\"さがる\",\"さぎょう\",\"さくし\",\"さくひん\",\"さくら\",\"さこく\",\"さこつ\",\"さずかる\",\"ざせき\",\"さたん\",\"さつえい\",\"ざつおん\",\"ざっか\",\"ざつがく\",\"さっきょく\",\"ざっし\",\"さつじん\",\"ざっそう\",\"さつたば\",\"さつまいも\",\"さてい\",\"さといも\",\"さとう\",\"さとおや\",\"さとし\",\"さとる\",\"さのう\",\"さばく\",\"さびしい\",\"さべつ\",\"さほう\",\"さほど\",\"さます\",\"さみしい\",\"さみだれ\",\"さむけ\",\"さめる\",\"さやえんどう\",\"さゆう\",\"さよう\",\"さよく\",\"さらだ\",\"ざるそば\",\"さわやか\",\"さわる\",\"さんいん\",\"さんか\",\"さんきゃく\",\"さんこう\",\"さんさい\",\"ざんしょ\",\"さんすう\",\"さんせい\",\"さんそ\",\"さんち\",\"さんま\",\"さんみ\",\"さんらん\",\"しあい\",\"しあげ\",\"しあさって\",\"しあわせ\",\"しいく\",\"しいん\",\"しうち\",\"しえい\",\"しおけ\",\"しかい\",\"しかく\",\"じかん\",\"しごと\",\"しすう\",\"じだい\",\"したうけ\",\"したぎ\",\"したて\",\"したみ\",\"しちょう\",\"しちりん\",\"しっかり\",\"しつじ\",\"しつもん\",\"してい\",\"してき\",\"してつ\",\"じてん\",\"じどう\",\"しなぎれ\",\"しなもの\",\"しなん\",\"しねま\",\"しねん\",\"しのぐ\",\"しのぶ\",\"しはい\",\"しばかり\",\"しはつ\",\"しはらい\",\"しはん\",\"しひょう\",\"しふく\",\"じぶん\",\"しへい\",\"しほう\",\"しほん\",\"しまう\",\"しまる\",\"しみん\",\"しむける\",\"じむしょ\",\"しめい\",\"しめる\",\"しもん\",\"しゃいん\",\"しゃうん\",\"しゃおん\",\"じゃがいも\",\"しやくしょ\",\"しゃくほう\",\"しゃけん\",\"しゃこ\",\"しゃざい\",\"しゃしん\",\"しゃせん\",\"しゃそう\",\"しゃたい\",\"しゃちょう\",\"しゃっきん\",\"じゃま\",\"しゃりん\",\"しゃれい\",\"じゆう\",\"じゅうしょ\",\"しゅくはく\",\"じゅしん\",\"しゅっせき\",\"しゅみ\",\"しゅらば\",\"じゅんばん\",\"しょうかい\",\"しょくたく\",\"しょっけん\",\"しょどう\",\"しょもつ\",\"しらせる\",\"しらべる\",\"しんか\",\"しんこう\",\"じんじゃ\",\"しんせいじ\",\"しんちく\",\"しんりん\",\"すあげ\",\"すあし\",\"すあな\",\"ずあん\",\"すいえい\",\"すいか\",\"すいとう\",\"ずいぶん\",\"すいようび\",\"すうがく\",\"すうじつ\",\"すうせん\",\"すおどり\",\"すきま\",\"すくう\",\"すくない\",\"すける\",\"すごい\",\"すこし\",\"ずさん\",\"すずしい\",\"すすむ\",\"すすめる\",\"すっかり\",\"ずっしり\",\"ずっと\",\"すてき\",\"すてる\",\"すねる\",\"すのこ\",\"すはだ\",\"すばらしい\",\"ずひょう\",\"ずぶぬれ\",\"すぶり\",\"すふれ\",\"すべて\",\"すべる\",\"ずほう\",\"すぼん\",\"すまい\",\"すめし\",\"すもう\",\"すやき\",\"すらすら\",\"するめ\",\"すれちがう\",\"すろっと\",\"すわる\",\"すんぜん\",\"すんぽう\",\"せあぶら\",\"せいかつ\",\"せいげん\",\"せいじ\",\"せいよう\",\"せおう\",\"せかいかん\",\"せきにん\",\"せきむ\",\"せきゆ\",\"せきらんうん\",\"せけん\",\"せこう\",\"せすじ\",\"せたい\",\"せたけ\",\"せっかく\",\"せっきゃく\",\"ぜっく\",\"せっけん\",\"せっこつ\",\"せっさたくま\",\"せつぞく\",\"せつだん\",\"せつでん\",\"せっぱん\",\"せつび\",\"せつぶん\",\"せつめい\",\"せつりつ\",\"せなか\",\"せのび\",\"せはば\",\"せびろ\",\"せぼね\",\"せまい\",\"せまる\",\"せめる\",\"せもたれ\",\"せりふ\",\"ぜんあく\",\"せんい\",\"せんえい\",\"せんか\",\"せんきょ\",\"せんく\",\"せんげん\",\"ぜんご\",\"せんさい\",\"せんしゅ\",\"せんすい\",\"せんせい\",\"せんぞ\",\"せんたく\",\"せんちょう\",\"せんてい\",\"せんとう\",\"せんぬき\",\"せんねん\",\"せんぱい\",\"ぜんぶ\",\"ぜんぽう\",\"せんむ\",\"せんめんじょ\",\"せんもん\",\"せんやく\",\"せんゆう\",\"せんよう\",\"ぜんら\",\"ぜんりゃく\",\"せんれい\",\"せんろ\",\"そあく\",\"そいとげる\",\"そいね\",\"そうがんきょう\",\"そうき\",\"そうご\",\"そうしん\",\"そうだん\",\"そうなん\",\"そうび\",\"そうめん\",\"そうり\",\"そえもの\",\"そえん\",\"そがい\",\"そげき\",\"そこう\",\"そこそこ\",\"そざい\",\"そしな\",\"そせい\",\"そせん\",\"そそぐ\",\"そだてる\",\"そつう\",\"そつえん\",\"そっかん\",\"そつぎょう\",\"そっけつ\",\"そっこう\",\"そっせん\",\"そっと\",\"そとがわ\",\"そとづら\",\"そなえる\",\"そなた\",\"そふぼ\",\"そぼく\",\"そぼろ\",\"そまつ\",\"そまる\",\"そむく\",\"そむりえ\",\"そめる\",\"そもそも\",\"そよかぜ\",\"そらまめ\",\"そろう\",\"そんかい\",\"そんけい\",\"そんざい\",\"そんしつ\",\"そんぞく\",\"そんちょう\",\"ぞんび\",\"ぞんぶん\",\"そんみん\",\"たあい\",\"たいいん\",\"たいうん\",\"たいえき\",\"たいおう\",\"だいがく\",\"たいき\",\"たいぐう\",\"たいけん\",\"たいこ\",\"たいざい\",\"だいじょうぶ\",\"だいすき\",\"たいせつ\",\"たいそう\",\"だいたい\",\"たいちょう\",\"たいてい\",\"だいどころ\",\"たいない\",\"たいねつ\",\"たいのう\",\"たいはん\",\"だいひょう\",\"たいふう\",\"たいへん\",\"たいほ\",\"たいまつばな\",\"たいみんぐ\",\"たいむ\",\"たいめん\",\"たいやき\",\"たいよう\",\"たいら\",\"たいりょく\",\"たいる\",\"たいわん\",\"たうえ\",\"たえる\",\"たおす\",\"たおる\",\"たおれる\",\"たかい\",\"たかね\",\"たきび\",\"たくさん\",\"たこく\",\"たこやき\",\"たさい\",\"たしざん\",\"だじゃれ\",\"たすける\",\"たずさわる\",\"たそがれ\",\"たたかう\",\"たたく\",\"ただしい\",\"たたみ\",\"たちばな\",\"だっかい\",\"だっきゃく\",\"だっこ\",\"だっしゅつ\",\"だったい\",\"たてる\",\"たとえる\",\"たなばた\",\"たにん\",\"たぬき\",\"たのしみ\",\"たはつ\",\"たぶん\",\"たべる\",\"たぼう\",\"たまご\",\"たまる\",\"だむる\",\"ためいき\",\"ためす\",\"ためる\",\"たもつ\",\"たやすい\",\"たよる\",\"たらす\",\"たりきほんがん\",\"たりょう\",\"たりる\",\"たると\",\"たれる\",\"たれんと\",\"たろっと\",\"たわむれる\",\"だんあつ\",\"たんい\",\"たんおん\",\"たんか\",\"たんき\",\"たんけん\",\"たんご\",\"たんさん\",\"たんじょうび\",\"だんせい\",\"たんそく\",\"たんたい\",\"だんち\",\"たんてい\",\"たんとう\",\"だんな\",\"たんにん\",\"だんねつ\",\"たんのう\",\"たんぴん\",\"だんぼう\",\"たんまつ\",\"たんめい\",\"だんれつ\",\"だんろ\",\"だんわ\",\"ちあい\",\"ちあん\",\"ちいき\",\"ちいさい\",\"ちえん\",\"ちかい\",\"ちから\",\"ちきゅう\",\"ちきん\",\"ちけいず\",\"ちけん\",\"ちこく\",\"ちさい\",\"ちしき\",\"ちしりょう\",\"ちせい\",\"ちそう\",\"ちたい\",\"ちたん\",\"ちちおや\",\"ちつじょ\",\"ちてき\",\"ちてん\",\"ちぬき\",\"ちぬり\",\"ちのう\",\"ちひょう\",\"ちへいせん\",\"ちほう\",\"ちまた\",\"ちみつ\",\"ちみどろ\",\"ちめいど\",\"ちゃんこなべ\",\"ちゅうい\",\"ちゆりょく\",\"ちょうし\",\"ちょさくけん\",\"ちらし\",\"ちらみ\",\"ちりがみ\",\"ちりょう\",\"ちるど\",\"ちわわ\",\"ちんたい\",\"ちんもく\",\"ついか\",\"ついたち\",\"つうか\",\"つうじょう\",\"つうはん\",\"つうわ\",\"つかう\",\"つかれる\",\"つくね\",\"つくる\",\"つけね\",\"つける\",\"つごう\",\"つたえる\",\"つづく\",\"つつじ\",\"つつむ\",\"つとめる\",\"つながる\",\"つなみ\",\"つねづね\",\"つのる\",\"つぶす\",\"つまらない\",\"つまる\",\"つみき\",\"つめたい\",\"つもり\",\"つもる\",\"つよい\",\"つるぼ\",\"つるみく\",\"つわもの\",\"つわり\",\"てあし\",\"てあて\",\"てあみ\",\"ていおん\",\"ていか\",\"ていき\",\"ていけい\",\"ていこく\",\"ていさつ\",\"ていし\",\"ていせい\",\"ていたい\",\"ていど\",\"ていねい\",\"ていひょう\",\"ていへん\",\"ていぼう\",\"てうち\",\"ておくれ\",\"てきとう\",\"てくび\",\"でこぼこ\",\"てさぎょう\",\"てさげ\",\"てすり\",\"てそう\",\"てちがい\",\"てちょう\",\"てつがく\",\"てつづき\",\"でっぱ\",\"てつぼう\",\"てつや\",\"でぬかえ\",\"てぬき\",\"てぬぐい\",\"てのひら\",\"てはい\",\"てぶくろ\",\"てふだ\",\"てほどき\",\"てほん\",\"てまえ\",\"てまきずし\",\"てみじか\",\"てみやげ\",\"てらす\",\"てれび\",\"てわけ\",\"てわたし\",\"でんあつ\",\"てんいん\",\"てんかい\",\"てんき\",\"てんぐ\",\"てんけん\",\"てんごく\",\"てんさい\",\"てんし\",\"てんすう\",\"でんち\",\"てんてき\",\"てんとう\",\"てんない\",\"てんぷら\",\"てんぼうだい\",\"てんめつ\",\"てんらんかい\",\"でんりょく\",\"でんわ\",\"どあい\",\"といれ\",\"どうかん\",\"とうきゅう\",\"どうぐ\",\"とうし\",\"とうむぎ\",\"とおい\",\"とおか\",\"とおく\",\"とおす\",\"とおる\",\"とかい\",\"とかす\",\"ときおり\",\"ときどき\",\"とくい\",\"とくしゅう\",\"とくてん\",\"とくに\",\"とくべつ\",\"とけい\",\"とける\",\"とこや\",\"とさか\",\"としょかん\",\"とそう\",\"とたん\",\"とちゅう\",\"とっきゅう\",\"とっくん\",\"とつぜん\",\"とつにゅう\",\"とどける\",\"ととのえる\",\"とない\",\"となえる\",\"となり\",\"とのさま\",\"とばす\",\"どぶがわ\",\"とほう\",\"とまる\",\"とめる\",\"ともだち\",\"ともる\",\"どようび\",\"とらえる\",\"とんかつ\",\"どんぶり\",\"ないかく\",\"ないこう\",\"ないしょ\",\"ないす\",\"ないせん\",\"ないそう\",\"なおす\",\"ながい\",\"なくす\",\"なげる\",\"なこうど\",\"なさけ\",\"なたでここ\",\"なっとう\",\"なつやすみ\",\"ななおし\",\"なにごと\",\"なにもの\",\"なにわ\",\"なのか\",\"なふだ\",\"なまいき\",\"なまえ\",\"なまみ\",\"なみだ\",\"なめらか\",\"なめる\",\"なやむ\",\"ならう\",\"ならび\",\"ならぶ\",\"なれる\",\"なわとび\",\"なわばり\",\"にあう\",\"にいがた\",\"にうけ\",\"におい\",\"にかい\",\"にがて\",\"にきび\",\"にくしみ\",\"にくまん\",\"にげる\",\"にさんかたんそ\",\"にしき\",\"にせもの\",\"にちじょう\",\"にちようび\",\"にっか\",\"にっき\",\"にっけい\",\"にっこう\",\"にっさん\",\"にっしょく\",\"にっすう\",\"にっせき\",\"にってい\",\"になう\",\"にほん\",\"にまめ\",\"にもつ\",\"にやり\",\"にゅういん\",\"にりんしゃ\",\"にわとり\",\"にんい\",\"にんか\",\"にんき\",\"にんげん\",\"にんしき\",\"にんずう\",\"にんそう\",\"にんたい\",\"にんち\",\"にんてい\",\"にんにく\",\"にんぷ\",\"にんまり\",\"にんむ\",\"にんめい\",\"にんよう\",\"ぬいくぎ\",\"ぬかす\",\"ぬぐいとる\",\"ぬぐう\",\"ぬくもり\",\"ぬすむ\",\"ぬまえび\",\"ぬめり\",\"ぬらす\",\"ぬんちゃく\",\"ねあげ\",\"ねいき\",\"ねいる\",\"ねいろ\",\"ねぐせ\",\"ねくたい\",\"ねくら\",\"ねこぜ\",\"ねこむ\",\"ねさげ\",\"ねすごす\",\"ねそべる\",\"ねだん\",\"ねつい\",\"ねっしん\",\"ねつぞう\",\"ねったいぎょ\",\"ねぶそく\",\"ねふだ\",\"ねぼう\",\"ねほりはほり\",\"ねまき\",\"ねまわし\",\"ねみみ\",\"ねむい\",\"ねむたい\",\"ねもと\",\"ねらう\",\"ねわざ\",\"ねんいり\",\"ねんおし\",\"ねんかん\",\"ねんきん\",\"ねんぐ\",\"ねんざ\",\"ねんし\",\"ねんちゃく\",\"ねんど\",\"ねんぴ\",\"ねんぶつ\",\"ねんまつ\",\"ねんりょう\",\"ねんれい\",\"のいず\",\"のおづま\",\"のがす\",\"のきなみ\",\"のこぎり\",\"のこす\",\"のこる\",\"のせる\",\"のぞく\",\"のぞむ\",\"のたまう\",\"のちほど\",\"のっく\",\"のばす\",\"のはら\",\"のべる\",\"のぼる\",\"のみもの\",\"のやま\",\"のらいぬ\",\"のらねこ\",\"のりもの\",\"のりゆき\",\"のれん\",\"のんき\",\"ばあい\",\"はあく\",\"ばあさん\",\"ばいか\",\"ばいく\",\"はいけん\",\"はいご\",\"はいしん\",\"はいすい\",\"はいせん\",\"はいそう\",\"はいち\",\"ばいばい\",\"はいれつ\",\"はえる\",\"はおる\",\"はかい\",\"ばかり\",\"はかる\",\"はくしゅ\",\"はけん\",\"はこぶ\",\"はさみ\",\"はさん\",\"はしご\",\"ばしょ\",\"はしる\",\"はせる\",\"ぱそこん\",\"はそん\",\"はたん\",\"はちみつ\",\"はつおん\",\"はっかく\",\"はづき\",\"はっきり\",\"はっくつ\",\"はっけん\",\"はっこう\",\"はっさん\",\"はっしん\",\"はったつ\",\"はっちゅう\",\"はってん\",\"はっぴょう\",\"はっぽう\",\"はなす\",\"はなび\",\"はにかむ\",\"はぶらし\",\"はみがき\",\"はむかう\",\"はめつ\",\"はやい\",\"はやし\",\"はらう\",\"はろうぃん\",\"はわい\",\"はんい\",\"はんえい\",\"はんおん\",\"はんかく\",\"はんきょう\",\"ばんぐみ\",\"はんこ\",\"はんしゃ\",\"はんすう\",\"はんだん\",\"ぱんち\",\"ぱんつ\",\"はんてい\",\"はんとし\",\"はんのう\",\"はんぱ\",\"はんぶん\",\"はんぺん\",\"はんぼうき\",\"はんめい\",\"はんらん\",\"はんろん\",\"ひいき\",\"ひうん\",\"ひえる\",\"ひかく\",\"ひかり\",\"ひかる\",\"ひかん\",\"ひくい\",\"ひけつ\",\"ひこうき\",\"ひこく\",\"ひさい\",\"ひさしぶり\",\"ひさん\",\"びじゅつかん\",\"ひしょ\",\"ひそか\",\"ひそむ\",\"ひたむき\",\"ひだり\",\"ひたる\",\"ひつぎ\",\"ひっこし\",\"ひっし\",\"ひつじゅひん\",\"ひっす\",\"ひつぜん\",\"ぴったり\",\"ぴっちり\",\"ひつよう\",\"ひてい\",\"ひとごみ\",\"ひなまつり\",\"ひなん\",\"ひねる\",\"ひはん\",\"ひびく\",\"ひひょう\",\"ひほう\",\"ひまわり\",\"ひまん\",\"ひみつ\",\"ひめい\",\"ひめじし\",\"ひやけ\",\"ひやす\",\"ひよう\",\"びょうき\",\"ひらがな\",\"ひらく\",\"ひりつ\",\"ひりょう\",\"ひるま\",\"ひるやすみ\",\"ひれい\",\"ひろい\",\"ひろう\",\"ひろき\",\"ひろゆき\",\"ひんかく\",\"ひんけつ\",\"ひんこん\",\"ひんしゅ\",\"ひんそう\",\"ぴんち\",\"ひんぱん\",\"びんぼう\",\"ふあん\",\"ふいうち\",\"ふうけい\",\"ふうせん\",\"ぷうたろう\",\"ふうとう\",\"ふうふ\",\"ふえる\",\"ふおん\",\"ふかい\",\"ふきん\",\"ふくざつ\",\"ふくぶくろ\",\"ふこう\",\"ふさい\",\"ふしぎ\",\"ふじみ\",\"ふすま\",\"ふせい\",\"ふせぐ\",\"ふそく\",\"ぶたにく\",\"ふたん\",\"ふちょう\",\"ふつう\",\"ふつか\",\"ふっかつ\",\"ふっき\",\"ふっこく\",\"ぶどう\",\"ふとる\",\"ふとん\",\"ふのう\",\"ふはい\",\"ふひょう\",\"ふへん\",\"ふまん\",\"ふみん\",\"ふめつ\",\"ふめん\",\"ふよう\",\"ふりこ\",\"ふりる\",\"ふるい\",\"ふんいき\",\"ぶんがく\",\"ぶんぐ\",\"ふんしつ\",\"ぶんせき\",\"ふんそう\",\"ぶんぽう\",\"へいあん\",\"へいおん\",\"へいがい\",\"へいき\",\"へいげん\",\"へいこう\",\"へいさ\",\"へいしゃ\",\"へいせつ\",\"へいそ\",\"へいたく\",\"へいてん\",\"へいねつ\",\"へいわ\",\"へきが\",\"へこむ\",\"べにいろ\",\"べにしょうが\",\"へらす\",\"へんかん\",\"べんきょう\",\"べんごし\",\"へんさい\",\"へんたい\",\"べんり\",\"ほあん\",\"ほいく\",\"ぼうぎょ\",\"ほうこく\",\"ほうそう\",\"ほうほう\",\"ほうもん\",\"ほうりつ\",\"ほえる\",\"ほおん\",\"ほかん\",\"ほきょう\",\"ぼきん\",\"ほくろ\",\"ほけつ\",\"ほけん\",\"ほこう\",\"ほこる\",\"ほしい\",\"ほしつ\",\"ほしゅ\",\"ほしょう\",\"ほせい\",\"ほそい\",\"ほそく\",\"ほたて\",\"ほたる\",\"ぽちぶくろ\",\"ほっきょく\",\"ほっさ\",\"ほったん\",\"ほとんど\",\"ほめる\",\"ほんい\",\"ほんき\",\"ほんけ\",\"ほんしつ\",\"ほんやく\",\"まいにち\",\"まかい\",\"まかせる\",\"まがる\",\"まける\",\"まこと\",\"まさつ\",\"まじめ\",\"ますく\",\"まぜる\",\"まつり\",\"まとめ\",\"まなぶ\",\"まぬけ\",\"まねく\",\"まほう\",\"まもる\",\"まゆげ\",\"まよう\",\"まろやか\",\"まわす\",\"まわり\",\"まわる\",\"まんが\",\"まんきつ\",\"まんぞく\",\"まんなか\",\"みいら\",\"みうち\",\"みえる\",\"みがく\",\"みかた\",\"みかん\",\"みけん\",\"みこん\",\"みじかい\",\"みすい\",\"みすえる\",\"みせる\",\"みっか\",\"みつかる\",\"みつける\",\"みてい\",\"みとめる\",\"みなと\",\"みなみかさい\",\"みねらる\",\"みのう\",\"みのがす\",\"みほん\",\"みもと\",\"みやげ\",\"みらい\",\"みりょく\",\"みわく\",\"みんか\",\"みんぞく\",\"むいか\",\"むえき\",\"むえん\",\"むかい\",\"むかう\",\"むかえ\",\"むかし\",\"むぎちゃ\",\"むける\",\"むげん\",\"むさぼる\",\"むしあつい\",\"むしば\",\"むじゅん\",\"むしろ\",\"むすう\",\"むすこ\",\"むすぶ\",\"むすめ\",\"むせる\",\"むせん\",\"むちゅう\",\"むなしい\",\"むのう\",\"むやみ\",\"むよう\",\"むらさき\",\"むりょう\",\"むろん\",\"めいあん\",\"めいうん\",\"めいえん\",\"めいかく\",\"めいきょく\",\"めいさい\",\"めいし\",\"めいそう\",\"めいぶつ\",\"めいれい\",\"めいわく\",\"めぐまれる\",\"めざす\",\"めした\",\"めずらしい\",\"めだつ\",\"めまい\",\"めやす\",\"めんきょ\",\"めんせき\",\"めんどう\",\"もうしあげる\",\"もうどうけん\",\"もえる\",\"もくし\",\"もくてき\",\"もくようび\",\"もちろん\",\"もどる\",\"もらう\",\"もんく\",\"もんだい\",\"やおや\",\"やける\",\"やさい\",\"やさしい\",\"やすい\",\"やすたろう\",\"やすみ\",\"やせる\",\"やそう\",\"やたい\",\"やちん\",\"やっと\",\"やっぱり\",\"やぶる\",\"やめる\",\"ややこしい\",\"やよい\",\"やわらかい\",\"ゆうき\",\"ゆうびんきょく\",\"ゆうべ\",\"ゆうめい\",\"ゆけつ\",\"ゆしゅつ\",\"ゆせん\",\"ゆそう\",\"ゆたか\",\"ゆちゃく\",\"ゆでる\",\"ゆにゅう\",\"ゆびわ\",\"ゆらい\",\"ゆれる\",\"ようい\",\"ようか\",\"ようきゅう\",\"ようじ\",\"ようす\",\"ようちえん\",\"よかぜ\",\"よかん\",\"よきん\",\"よくせい\",\"よくぼう\",\"よけい\",\"よごれる\",\"よさん\",\"よしゅう\",\"よそう\",\"よそく\",\"よっか\",\"よてい\",\"よどがわく\",\"よねつ\",\"よやく\",\"よゆう\",\"よろこぶ\",\"よろしい\",\"らいう\",\"らくがき\",\"らくご\",\"らくさつ\",\"らくだ\",\"らしんばん\",\"らせん\",\"らぞく\",\"らたい\",\"らっか\",\"られつ\",\"りえき\",\"りかい\",\"りきさく\",\"りきせつ\",\"りくぐん\",\"りくつ\",\"りけん\",\"りこう\",\"りせい\",\"りそう\",\"りそく\",\"りてん\",\"りねん\",\"りゆう\",\"りゅうがく\",\"りよう\",\"りょうり\",\"りょかん\",\"りょくちゃ\",\"りょこう\",\"りりく\",\"りれき\",\"りろん\",\"りんご\",\"るいけい\",\"るいさい\",\"るいじ\",\"るいせき\",\"るすばん\",\"るりがわら\",\"れいかん\",\"れいぎ\",\"れいせい\",\"れいぞうこ\",\"れいとう\",\"れいぼう\",\"れきし\",\"れきだい\",\"れんあい\",\"れんけい\",\"れんこん\",\"れんさい\",\"れんしゅう\",\"れんぞく\",\"れんらく\",\"ろうか\",\"ろうご\",\"ろうじん\",\"ろうそく\",\"ろくが\",\"ろこつ\",\"ろじうら\",\"ろしゅつ\",\"ろせん\",\"ろてん\",\"ろめん\",\"ろれつ\",\"ろんぎ\",\"ろんぱ\",\"ろんぶん\",\"ろんり\",\"わかす\",\"わかめ\",\"わかやま\",\"わかれる\",\"わしつ\",\"わじまし\",\"わすれもの\",\"わらう\",\"われる\"]");

const require$$8 = /* #__PURE__ */ JSON.parse("[\"abacate\",\"abaixo\",\"abalar\",\"abater\",\"abduzir\",\"abelha\",\"aberto\",\"abismo\",\"abotoar\",\"abranger\",\"abreviar\",\"abrigar\",\"abrupto\",\"absinto\",\"absoluto\",\"absurdo\",\"abutre\",\"acabado\",\"acalmar\",\"acampar\",\"acanhar\",\"acaso\",\"aceitar\",\"acelerar\",\"acenar\",\"acervo\",\"acessar\",\"acetona\",\"achatar\",\"acidez\",\"acima\",\"acionado\",\"acirrar\",\"aclamar\",\"aclive\",\"acolhida\",\"acomodar\",\"acoplar\",\"acordar\",\"acumular\",\"acusador\",\"adaptar\",\"adega\",\"adentro\",\"adepto\",\"adequar\",\"aderente\",\"adesivo\",\"adeus\",\"adiante\",\"aditivo\",\"adjetivo\",\"adjunto\",\"admirar\",\"adorar\",\"adquirir\",\"adubo\",\"adverso\",\"advogado\",\"aeronave\",\"afastar\",\"aferir\",\"afetivo\",\"afinador\",\"afivelar\",\"aflito\",\"afluente\",\"afrontar\",\"agachar\",\"agarrar\",\"agasalho\",\"agenciar\",\"agilizar\",\"agiota\",\"agitado\",\"agora\",\"agradar\",\"agreste\",\"agrupar\",\"aguardar\",\"agulha\",\"ajoelhar\",\"ajudar\",\"ajustar\",\"alameda\",\"alarme\",\"alastrar\",\"alavanca\",\"albergue\",\"albino\",\"alcatra\",\"aldeia\",\"alecrim\",\"alegria\",\"alertar\",\"alface\",\"alfinete\",\"algum\",\"alheio\",\"aliar\",\"alicate\",\"alienar\",\"alinhar\",\"aliviar\",\"almofada\",\"alocar\",\"alpiste\",\"alterar\",\"altitude\",\"alucinar\",\"alugar\",\"aluno\",\"alusivo\",\"alvo\",\"amaciar\",\"amador\",\"amarelo\",\"amassar\",\"ambas\",\"ambiente\",\"ameixa\",\"amenizar\",\"amido\",\"amistoso\",\"amizade\",\"amolador\",\"amontoar\",\"amoroso\",\"amostra\",\"amparar\",\"ampliar\",\"ampola\",\"anagrama\",\"analisar\",\"anarquia\",\"anatomia\",\"andaime\",\"anel\",\"anexo\",\"angular\",\"animar\",\"anjo\",\"anomalia\",\"anotado\",\"ansioso\",\"anterior\",\"anuidade\",\"anunciar\",\"anzol\",\"apagador\",\"apalpar\",\"apanhado\",\"apego\",\"apelido\",\"apertada\",\"apesar\",\"apetite\",\"apito\",\"aplauso\",\"aplicada\",\"apoio\",\"apontar\",\"aposta\",\"aprendiz\",\"aprovar\",\"aquecer\",\"arame\",\"aranha\",\"arara\",\"arcada\",\"ardente\",\"areia\",\"arejar\",\"arenito\",\"aresta\",\"argiloso\",\"argola\",\"arma\",\"arquivo\",\"arraial\",\"arrebate\",\"arriscar\",\"arroba\",\"arrumar\",\"arsenal\",\"arterial\",\"artigo\",\"arvoredo\",\"asfaltar\",\"asilado\",\"aspirar\",\"assador\",\"assinar\",\"assoalho\",\"assunto\",\"astral\",\"atacado\",\"atadura\",\"atalho\",\"atarefar\",\"atear\",\"atender\",\"aterro\",\"ateu\",\"atingir\",\"atirador\",\"ativo\",\"atoleiro\",\"atracar\",\"atrevido\",\"atriz\",\"atual\",\"atum\",\"auditor\",\"aumentar\",\"aura\",\"aurora\",\"autismo\",\"autoria\",\"autuar\",\"avaliar\",\"avante\",\"avaria\",\"avental\",\"avesso\",\"aviador\",\"avisar\",\"avulso\",\"axila\",\"azarar\",\"azedo\",\"azeite\",\"azulejo\",\"babar\",\"babosa\",\"bacalhau\",\"bacharel\",\"bacia\",\"bagagem\",\"baiano\",\"bailar\",\"baioneta\",\"bairro\",\"baixista\",\"bajular\",\"baleia\",\"baliza\",\"balsa\",\"banal\",\"bandeira\",\"banho\",\"banir\",\"banquete\",\"barato\",\"barbado\",\"baronesa\",\"barraca\",\"barulho\",\"baseado\",\"bastante\",\"batata\",\"batedor\",\"batida\",\"batom\",\"batucar\",\"baunilha\",\"beber\",\"beijo\",\"beirada\",\"beisebol\",\"beldade\",\"beleza\",\"belga\",\"beliscar\",\"bendito\",\"bengala\",\"benzer\",\"berimbau\",\"berlinda\",\"berro\",\"besouro\",\"bexiga\",\"bezerro\",\"bico\",\"bicudo\",\"bienal\",\"bifocal\",\"bifurcar\",\"bigorna\",\"bilhete\",\"bimestre\",\"bimotor\",\"biologia\",\"biombo\",\"biosfera\",\"bipolar\",\"birrento\",\"biscoito\",\"bisneto\",\"bispo\",\"bissexto\",\"bitola\",\"bizarro\",\"blindado\",\"bloco\",\"bloquear\",\"boato\",\"bobagem\",\"bocado\",\"bocejo\",\"bochecha\",\"boicotar\",\"bolada\",\"boletim\",\"bolha\",\"bolo\",\"bombeiro\",\"bonde\",\"boneco\",\"bonita\",\"borbulha\",\"borda\",\"boreal\",\"borracha\",\"bovino\",\"boxeador\",\"branco\",\"brasa\",\"braveza\",\"breu\",\"briga\",\"brilho\",\"brincar\",\"broa\",\"brochura\",\"bronzear\",\"broto\",\"bruxo\",\"bucha\",\"budismo\",\"bufar\",\"bule\",\"buraco\",\"busca\",\"busto\",\"buzina\",\"cabana\",\"cabelo\",\"cabide\",\"cabo\",\"cabrito\",\"cacau\",\"cacetada\",\"cachorro\",\"cacique\",\"cadastro\",\"cadeado\",\"cafezal\",\"caiaque\",\"caipira\",\"caixote\",\"cajado\",\"caju\",\"calafrio\",\"calcular\",\"caldeira\",\"calibrar\",\"calmante\",\"calota\",\"camada\",\"cambista\",\"camisa\",\"camomila\",\"campanha\",\"camuflar\",\"canavial\",\"cancelar\",\"caneta\",\"canguru\",\"canhoto\",\"canivete\",\"canoa\",\"cansado\",\"cantar\",\"canudo\",\"capacho\",\"capela\",\"capinar\",\"capotar\",\"capricho\",\"captador\",\"capuz\",\"caracol\",\"carbono\",\"cardeal\",\"careca\",\"carimbar\",\"carneiro\",\"carpete\",\"carreira\",\"cartaz\",\"carvalho\",\"casaco\",\"casca\",\"casebre\",\"castelo\",\"casulo\",\"catarata\",\"cativar\",\"caule\",\"causador\",\"cautelar\",\"cavalo\",\"caverna\",\"cebola\",\"cedilha\",\"cegonha\",\"celebrar\",\"celular\",\"cenoura\",\"censo\",\"centeio\",\"cercar\",\"cerrado\",\"certeiro\",\"cerveja\",\"cetim\",\"cevada\",\"chacota\",\"chaleira\",\"chamado\",\"chapada\",\"charme\",\"chatice\",\"chave\",\"chefe\",\"chegada\",\"cheiro\",\"cheque\",\"chicote\",\"chifre\",\"chinelo\",\"chocalho\",\"chover\",\"chumbo\",\"chutar\",\"chuva\",\"cicatriz\",\"ciclone\",\"cidade\",\"cidreira\",\"ciente\",\"cigana\",\"cimento\",\"cinto\",\"cinza\",\"ciranda\",\"circuito\",\"cirurgia\",\"citar\",\"clareza\",\"clero\",\"clicar\",\"clone\",\"clube\",\"coado\",\"coagir\",\"cobaia\",\"cobertor\",\"cobrar\",\"cocada\",\"coelho\",\"coentro\",\"coeso\",\"cogumelo\",\"coibir\",\"coifa\",\"coiote\",\"colar\",\"coleira\",\"colher\",\"colidir\",\"colmeia\",\"colono\",\"coluna\",\"comando\",\"combinar\",\"comentar\",\"comitiva\",\"comover\",\"complexo\",\"comum\",\"concha\",\"condor\",\"conectar\",\"confuso\",\"congelar\",\"conhecer\",\"conjugar\",\"consumir\",\"contrato\",\"convite\",\"cooperar\",\"copeiro\",\"copiador\",\"copo\",\"coquetel\",\"coragem\",\"cordial\",\"corneta\",\"coronha\",\"corporal\",\"correio\",\"cortejo\",\"coruja\",\"corvo\",\"cosseno\",\"costela\",\"cotonete\",\"couro\",\"couve\",\"covil\",\"cozinha\",\"cratera\",\"cravo\",\"creche\",\"credor\",\"creme\",\"crer\",\"crespo\",\"criada\",\"criminal\",\"crioulo\",\"crise\",\"criticar\",\"crosta\",\"crua\",\"cruzeiro\",\"cubano\",\"cueca\",\"cuidado\",\"cujo\",\"culatra\",\"culminar\",\"culpar\",\"cultura\",\"cumprir\",\"cunhado\",\"cupido\",\"curativo\",\"curral\",\"cursar\",\"curto\",\"cuspir\",\"custear\",\"cutelo\",\"damasco\",\"datar\",\"debater\",\"debitar\",\"deboche\",\"debulhar\",\"decalque\",\"decimal\",\"declive\",\"decote\",\"decretar\",\"dedal\",\"dedicado\",\"deduzir\",\"defesa\",\"defumar\",\"degelo\",\"degrau\",\"degustar\",\"deitado\",\"deixar\",\"delator\",\"delegado\",\"delinear\",\"delonga\",\"demanda\",\"demitir\",\"demolido\",\"dentista\",\"depenado\",\"depilar\",\"depois\",\"depressa\",\"depurar\",\"deriva\",\"derramar\",\"desafio\",\"desbotar\",\"descanso\",\"desenho\",\"desfiado\",\"desgaste\",\"desigual\",\"deslize\",\"desmamar\",\"desova\",\"despesa\",\"destaque\",\"desviar\",\"detalhar\",\"detentor\",\"detonar\",\"detrito\",\"deusa\",\"dever\",\"devido\",\"devotado\",\"dezena\",\"diagrama\",\"dialeto\",\"didata\",\"difuso\",\"digitar\",\"dilatado\",\"diluente\",\"diminuir\",\"dinastia\",\"dinheiro\",\"diocese\",\"direto\",\"discreta\",\"disfarce\",\"disparo\",\"disquete\",\"dissipar\",\"distante\",\"ditador\",\"diurno\",\"diverso\",\"divisor\",\"divulgar\",\"dizer\",\"dobrador\",\"dolorido\",\"domador\",\"dominado\",\"donativo\",\"donzela\",\"dormente\",\"dorsal\",\"dosagem\",\"dourado\",\"doutor\",\"drenagem\",\"drible\",\"drogaria\",\"duelar\",\"duende\",\"dueto\",\"duplo\",\"duquesa\",\"durante\",\"duvidoso\",\"eclodir\",\"ecoar\",\"ecologia\",\"edificar\",\"edital\",\"educado\",\"efeito\",\"efetivar\",\"ejetar\",\"elaborar\",\"eleger\",\"eleitor\",\"elenco\",\"elevador\",\"eliminar\",\"elogiar\",\"embargo\",\"embolado\",\"embrulho\",\"embutido\",\"emenda\",\"emergir\",\"emissor\",\"empatia\",\"empenho\",\"empinado\",\"empolgar\",\"emprego\",\"empurrar\",\"emulador\",\"encaixe\",\"encenado\",\"enchente\",\"encontro\",\"endeusar\",\"endossar\",\"enfaixar\",\"enfeite\",\"enfim\",\"engajado\",\"engenho\",\"englobar\",\"engomado\",\"engraxar\",\"enguia\",\"enjoar\",\"enlatar\",\"enquanto\",\"enraizar\",\"enrolado\",\"enrugar\",\"ensaio\",\"enseada\",\"ensino\",\"ensopado\",\"entanto\",\"enteado\",\"entidade\",\"entortar\",\"entrada\",\"entulho\",\"envergar\",\"enviado\",\"envolver\",\"enxame\",\"enxerto\",\"enxofre\",\"enxuto\",\"epiderme\",\"equipar\",\"ereto\",\"erguido\",\"errata\",\"erva\",\"ervilha\",\"esbanjar\",\"esbelto\",\"escama\",\"escola\",\"escrita\",\"escuta\",\"esfinge\",\"esfolar\",\"esfregar\",\"esfumado\",\"esgrima\",\"esmalte\",\"espanto\",\"espelho\",\"espiga\",\"esponja\",\"espreita\",\"espumar\",\"esquerda\",\"estaca\",\"esteira\",\"esticar\",\"estofado\",\"estrela\",\"estudo\",\"esvaziar\",\"etanol\",\"etiqueta\",\"euforia\",\"europeu\",\"evacuar\",\"evaporar\",\"evasivo\",\"eventual\",\"evidente\",\"evoluir\",\"exagero\",\"exalar\",\"examinar\",\"exato\",\"exausto\",\"excesso\",\"excitar\",\"exclamar\",\"executar\",\"exemplo\",\"exibir\",\"exigente\",\"exonerar\",\"expandir\",\"expelir\",\"expirar\",\"explanar\",\"exposto\",\"expresso\",\"expulsar\",\"externo\",\"extinto\",\"extrato\",\"fabricar\",\"fabuloso\",\"faceta\",\"facial\",\"fada\",\"fadiga\",\"faixa\",\"falar\",\"falta\",\"familiar\",\"fandango\",\"fanfarra\",\"fantoche\",\"fardado\",\"farelo\",\"farinha\",\"farofa\",\"farpa\",\"fartura\",\"fatia\",\"fator\",\"favorita\",\"faxina\",\"fazenda\",\"fechado\",\"feijoada\",\"feirante\",\"felino\",\"feminino\",\"fenda\",\"feno\",\"fera\",\"feriado\",\"ferrugem\",\"ferver\",\"festejar\",\"fetal\",\"feudal\",\"fiapo\",\"fibrose\",\"ficar\",\"ficheiro\",\"figurado\",\"fileira\",\"filho\",\"filme\",\"filtrar\",\"firmeza\",\"fisgada\",\"fissura\",\"fita\",\"fivela\",\"fixador\",\"fixo\",\"flacidez\",\"flamingo\",\"flanela\",\"flechada\",\"flora\",\"flutuar\",\"fluxo\",\"focal\",\"focinho\",\"fofocar\",\"fogo\",\"foguete\",\"foice\",\"folgado\",\"folheto\",\"forjar\",\"formiga\",\"forno\",\"forte\",\"fosco\",\"fossa\",\"fragata\",\"fralda\",\"frango\",\"frasco\",\"fraterno\",\"freira\",\"frente\",\"fretar\",\"frieza\",\"friso\",\"fritura\",\"fronha\",\"frustrar\",\"fruteira\",\"fugir\",\"fulano\",\"fuligem\",\"fundar\",\"fungo\",\"funil\",\"furador\",\"furioso\",\"futebol\",\"gabarito\",\"gabinete\",\"gado\",\"gaiato\",\"gaiola\",\"gaivota\",\"galega\",\"galho\",\"galinha\",\"galocha\",\"ganhar\",\"garagem\",\"garfo\",\"gargalo\",\"garimpo\",\"garoupa\",\"garrafa\",\"gasoduto\",\"gasto\",\"gata\",\"gatilho\",\"gaveta\",\"gazela\",\"gelado\",\"geleia\",\"gelo\",\"gemada\",\"gemer\",\"gemido\",\"generoso\",\"gengiva\",\"genial\",\"genoma\",\"genro\",\"geologia\",\"gerador\",\"germinar\",\"gesso\",\"gestor\",\"ginasta\",\"gincana\",\"gingado\",\"girafa\",\"girino\",\"glacial\",\"glicose\",\"global\",\"glorioso\",\"goela\",\"goiaba\",\"golfe\",\"golpear\",\"gordura\",\"gorjeta\",\"gorro\",\"gostoso\",\"goteira\",\"governar\",\"gracejo\",\"gradual\",\"grafite\",\"gralha\",\"grampo\",\"granada\",\"gratuito\",\"graveto\",\"graxa\",\"grego\",\"grelhar\",\"greve\",\"grilo\",\"grisalho\",\"gritaria\",\"grosso\",\"grotesco\",\"grudado\",\"grunhido\",\"gruta\",\"guache\",\"guarani\",\"guaxinim\",\"guerrear\",\"guiar\",\"guincho\",\"guisado\",\"gula\",\"guloso\",\"guru\",\"habitar\",\"harmonia\",\"haste\",\"haver\",\"hectare\",\"herdar\",\"heresia\",\"hesitar\",\"hiato\",\"hibernar\",\"hidratar\",\"hiena\",\"hino\",\"hipismo\",\"hipnose\",\"hipoteca\",\"hoje\",\"holofote\",\"homem\",\"honesto\",\"honrado\",\"hormonal\",\"hospedar\",\"humorado\",\"iate\",\"ideia\",\"idoso\",\"ignorado\",\"igreja\",\"iguana\",\"ileso\",\"ilha\",\"iludido\",\"iluminar\",\"ilustrar\",\"imagem\",\"imediato\",\"imenso\",\"imersivo\",\"iminente\",\"imitador\",\"imortal\",\"impacto\",\"impedir\",\"implante\",\"impor\",\"imprensa\",\"impune\",\"imunizar\",\"inalador\",\"inapto\",\"inativo\",\"incenso\",\"inchar\",\"incidir\",\"incluir\",\"incolor\",\"indeciso\",\"indireto\",\"indutor\",\"ineficaz\",\"inerente\",\"infantil\",\"infestar\",\"infinito\",\"inflamar\",\"informal\",\"infrator\",\"ingerir\",\"inibido\",\"inicial\",\"inimigo\",\"injetar\",\"inocente\",\"inodoro\",\"inovador\",\"inox\",\"inquieto\",\"inscrito\",\"inseto\",\"insistir\",\"inspetor\",\"instalar\",\"insulto\",\"intacto\",\"integral\",\"intimar\",\"intocado\",\"intriga\",\"invasor\",\"inverno\",\"invicto\",\"invocar\",\"iogurte\",\"iraniano\",\"ironizar\",\"irreal\",\"irritado\",\"isca\",\"isento\",\"isolado\",\"isqueiro\",\"italiano\",\"janeiro\",\"jangada\",\"janta\",\"jararaca\",\"jardim\",\"jarro\",\"jasmim\",\"jato\",\"javali\",\"jazida\",\"jejum\",\"joaninha\",\"joelhada\",\"jogador\",\"joia\",\"jornal\",\"jorrar\",\"jovem\",\"juba\",\"judeu\",\"judoca\",\"juiz\",\"julgador\",\"julho\",\"jurado\",\"jurista\",\"juro\",\"justa\",\"labareda\",\"laboral\",\"lacre\",\"lactante\",\"ladrilho\",\"lagarta\",\"lagoa\",\"laje\",\"lamber\",\"lamentar\",\"laminar\",\"lampejo\",\"lanche\",\"lapidar\",\"lapso\",\"laranja\",\"lareira\",\"largura\",\"lasanha\",\"lastro\",\"lateral\",\"latido\",\"lavanda\",\"lavoura\",\"lavrador\",\"laxante\",\"lazer\",\"lealdade\",\"lebre\",\"legado\",\"legendar\",\"legista\",\"leigo\",\"leiloar\",\"leitura\",\"lembrete\",\"leme\",\"lenhador\",\"lentilha\",\"leoa\",\"lesma\",\"leste\",\"letivo\",\"letreiro\",\"levar\",\"leveza\",\"levitar\",\"liberal\",\"libido\",\"liderar\",\"ligar\",\"ligeiro\",\"limitar\",\"limoeiro\",\"limpador\",\"linda\",\"linear\",\"linhagem\",\"liquidez\",\"listagem\",\"lisura\",\"litoral\",\"livro\",\"lixa\",\"lixeira\",\"locador\",\"locutor\",\"lojista\",\"lombo\",\"lona\",\"longe\",\"lontra\",\"lorde\",\"lotado\",\"loteria\",\"loucura\",\"lousa\",\"louvar\",\"luar\",\"lucidez\",\"lucro\",\"luneta\",\"lustre\",\"lutador\",\"luva\",\"macaco\",\"macete\",\"machado\",\"macio\",\"madeira\",\"madrinha\",\"magnata\",\"magreza\",\"maior\",\"mais\",\"malandro\",\"malha\",\"malote\",\"maluco\",\"mamilo\",\"mamoeiro\",\"mamute\",\"manada\",\"mancha\",\"mandato\",\"manequim\",\"manhoso\",\"manivela\",\"manobrar\",\"mansa\",\"manter\",\"manusear\",\"mapeado\",\"maquinar\",\"marcador\",\"maresia\",\"marfim\",\"margem\",\"marinho\",\"marmita\",\"maroto\",\"marquise\",\"marreco\",\"martelo\",\"marujo\",\"mascote\",\"masmorra\",\"massagem\",\"mastigar\",\"matagal\",\"materno\",\"matinal\",\"matutar\",\"maxilar\",\"medalha\",\"medida\",\"medusa\",\"megafone\",\"meiga\",\"melancia\",\"melhor\",\"membro\",\"memorial\",\"menino\",\"menos\",\"mensagem\",\"mental\",\"merecer\",\"mergulho\",\"mesada\",\"mesclar\",\"mesmo\",\"mesquita\",\"mestre\",\"metade\",\"meteoro\",\"metragem\",\"mexer\",\"mexicano\",\"micro\",\"migalha\",\"migrar\",\"milagre\",\"milenar\",\"milhar\",\"mimado\",\"minerar\",\"minhoca\",\"ministro\",\"minoria\",\"miolo\",\"mirante\",\"mirtilo\",\"misturar\",\"mocidade\",\"moderno\",\"modular\",\"moeda\",\"moer\",\"moinho\",\"moita\",\"moldura\",\"moleza\",\"molho\",\"molinete\",\"molusco\",\"montanha\",\"moqueca\",\"morango\",\"morcego\",\"mordomo\",\"morena\",\"mosaico\",\"mosquete\",\"mostarda\",\"motel\",\"motim\",\"moto\",\"motriz\",\"muda\",\"muito\",\"mulata\",\"mulher\",\"multar\",\"mundial\",\"munido\",\"muralha\",\"murcho\",\"muscular\",\"museu\",\"musical\",\"nacional\",\"nadador\",\"naja\",\"namoro\",\"narina\",\"narrado\",\"nascer\",\"nativa\",\"natureza\",\"navalha\",\"navegar\",\"navio\",\"neblina\",\"nebuloso\",\"negativa\",\"negociar\",\"negrito\",\"nervoso\",\"neta\",\"neural\",\"nevasca\",\"nevoeiro\",\"ninar\",\"ninho\",\"nitidez\",\"nivelar\",\"nobreza\",\"noite\",\"noiva\",\"nomear\",\"nominal\",\"nordeste\",\"nortear\",\"notar\",\"noticiar\",\"noturno\",\"novelo\",\"novilho\",\"novo\",\"nublado\",\"nudez\",\"numeral\",\"nupcial\",\"nutrir\",\"nuvem\",\"obcecado\",\"obedecer\",\"objetivo\",\"obrigado\",\"obscuro\",\"obstetra\",\"obter\",\"obturar\",\"ocidente\",\"ocioso\",\"ocorrer\",\"oculista\",\"ocupado\",\"ofegante\",\"ofensiva\",\"oferenda\",\"oficina\",\"ofuscado\",\"ogiva\",\"olaria\",\"oleoso\",\"olhar\",\"oliveira\",\"ombro\",\"omelete\",\"omisso\",\"omitir\",\"ondulado\",\"oneroso\",\"ontem\",\"opcional\",\"operador\",\"oponente\",\"oportuno\",\"oposto\",\"orar\",\"orbitar\",\"ordem\",\"ordinal\",\"orfanato\",\"orgasmo\",\"orgulho\",\"oriental\",\"origem\",\"oriundo\",\"orla\",\"ortodoxo\",\"orvalho\",\"oscilar\",\"ossada\",\"osso\",\"ostentar\",\"otimismo\",\"ousadia\",\"outono\",\"outubro\",\"ouvido\",\"ovelha\",\"ovular\",\"oxidar\",\"oxigenar\",\"pacato\",\"paciente\",\"pacote\",\"pactuar\",\"padaria\",\"padrinho\",\"pagar\",\"pagode\",\"painel\",\"pairar\",\"paisagem\",\"palavra\",\"palestra\",\"palheta\",\"palito\",\"palmada\",\"palpitar\",\"pancada\",\"panela\",\"panfleto\",\"panqueca\",\"pantanal\",\"papagaio\",\"papelada\",\"papiro\",\"parafina\",\"parcial\",\"pardal\",\"parede\",\"partida\",\"pasmo\",\"passado\",\"pastel\",\"patamar\",\"patente\",\"patinar\",\"patrono\",\"paulada\",\"pausar\",\"peculiar\",\"pedalar\",\"pedestre\",\"pediatra\",\"pedra\",\"pegada\",\"peitoral\",\"peixe\",\"pele\",\"pelicano\",\"penca\",\"pendurar\",\"peneira\",\"penhasco\",\"pensador\",\"pente\",\"perceber\",\"perfeito\",\"pergunta\",\"perito\",\"permitir\",\"perna\",\"perplexo\",\"persiana\",\"pertence\",\"peruca\",\"pescado\",\"pesquisa\",\"pessoa\",\"petiscar\",\"piada\",\"picado\",\"piedade\",\"pigmento\",\"pilastra\",\"pilhado\",\"pilotar\",\"pimenta\",\"pincel\",\"pinguim\",\"pinha\",\"pinote\",\"pintar\",\"pioneiro\",\"pipoca\",\"piquete\",\"piranha\",\"pires\",\"pirueta\",\"piscar\",\"pistola\",\"pitanga\",\"pivete\",\"planta\",\"plaqueta\",\"platina\",\"plebeu\",\"plumagem\",\"pluvial\",\"pneu\",\"poda\",\"poeira\",\"poetisa\",\"polegada\",\"policiar\",\"poluente\",\"polvilho\",\"pomar\",\"pomba\",\"ponderar\",\"pontaria\",\"populoso\",\"porta\",\"possuir\",\"postal\",\"pote\",\"poupar\",\"pouso\",\"povoar\",\"praia\",\"prancha\",\"prato\",\"praxe\",\"prece\",\"predador\",\"prefeito\",\"premiar\",\"prensar\",\"preparar\",\"presilha\",\"pretexto\",\"prevenir\",\"prezar\",\"primata\",\"princesa\",\"prisma\",\"privado\",\"processo\",\"produto\",\"profeta\",\"proibido\",\"projeto\",\"prometer\",\"propagar\",\"prosa\",\"protetor\",\"provador\",\"publicar\",\"pudim\",\"pular\",\"pulmonar\",\"pulseira\",\"punhal\",\"punir\",\"pupilo\",\"pureza\",\"puxador\",\"quadra\",\"quantia\",\"quarto\",\"quase\",\"quebrar\",\"queda\",\"queijo\",\"quente\",\"querido\",\"quimono\",\"quina\",\"quiosque\",\"rabanada\",\"rabisco\",\"rachar\",\"racionar\",\"radial\",\"raiar\",\"rainha\",\"raio\",\"raiva\",\"rajada\",\"ralado\",\"ramal\",\"ranger\",\"ranhura\",\"rapadura\",\"rapel\",\"rapidez\",\"raposa\",\"raquete\",\"raridade\",\"rasante\",\"rascunho\",\"rasgar\",\"raspador\",\"rasteira\",\"rasurar\",\"ratazana\",\"ratoeira\",\"realeza\",\"reanimar\",\"reaver\",\"rebaixar\",\"rebelde\",\"rebolar\",\"recado\",\"recente\",\"recheio\",\"recibo\",\"recordar\",\"recrutar\",\"recuar\",\"rede\",\"redimir\",\"redonda\",\"reduzida\",\"reenvio\",\"refinar\",\"refletir\",\"refogar\",\"refresco\",\"refugiar\",\"regalia\",\"regime\",\"regra\",\"reinado\",\"reitor\",\"rejeitar\",\"relativo\",\"remador\",\"remendo\",\"remorso\",\"renovado\",\"reparo\",\"repelir\",\"repleto\",\"repolho\",\"represa\",\"repudiar\",\"requerer\",\"resenha\",\"resfriar\",\"resgatar\",\"residir\",\"resolver\",\"respeito\",\"ressaca\",\"restante\",\"resumir\",\"retalho\",\"reter\",\"retirar\",\"retomada\",\"retratar\",\"revelar\",\"revisor\",\"revolta\",\"riacho\",\"rica\",\"rigidez\",\"rigoroso\",\"rimar\",\"ringue\",\"risada\",\"risco\",\"risonho\",\"robalo\",\"rochedo\",\"rodada\",\"rodeio\",\"rodovia\",\"roedor\",\"roleta\",\"romano\",\"roncar\",\"rosado\",\"roseira\",\"rosto\",\"rota\",\"roteiro\",\"rotina\",\"rotular\",\"rouco\",\"roupa\",\"roxo\",\"rubro\",\"rugido\",\"rugoso\",\"ruivo\",\"rumo\",\"rupestre\",\"russo\",\"sabor\",\"saciar\",\"sacola\",\"sacudir\",\"sadio\",\"safira\",\"saga\",\"sagrada\",\"saibro\",\"salada\",\"saleiro\",\"salgado\",\"saliva\",\"salpicar\",\"salsicha\",\"saltar\",\"salvador\",\"sambar\",\"samurai\",\"sanar\",\"sanfona\",\"sangue\",\"sanidade\",\"sapato\",\"sarda\",\"sargento\",\"sarjeta\",\"saturar\",\"saudade\",\"saxofone\",\"sazonal\",\"secar\",\"secular\",\"seda\",\"sedento\",\"sediado\",\"sedoso\",\"sedutor\",\"segmento\",\"segredo\",\"segundo\",\"seiva\",\"seleto\",\"selvagem\",\"semanal\",\"semente\",\"senador\",\"senhor\",\"sensual\",\"sentado\",\"separado\",\"sereia\",\"seringa\",\"serra\",\"servo\",\"setembro\",\"setor\",\"sigilo\",\"silhueta\",\"silicone\",\"simetria\",\"simpatia\",\"simular\",\"sinal\",\"sincero\",\"singular\",\"sinopse\",\"sintonia\",\"sirene\",\"siri\",\"situado\",\"soberano\",\"sobra\",\"socorro\",\"sogro\",\"soja\",\"solda\",\"soletrar\",\"solteiro\",\"sombrio\",\"sonata\",\"sondar\",\"sonegar\",\"sonhador\",\"sono\",\"soprano\",\"soquete\",\"sorrir\",\"sorteio\",\"sossego\",\"sotaque\",\"soterrar\",\"sovado\",\"sozinho\",\"suavizar\",\"subida\",\"submerso\",\"subsolo\",\"subtrair\",\"sucata\",\"sucesso\",\"suco\",\"sudeste\",\"sufixo\",\"sugador\",\"sugerir\",\"sujeito\",\"sulfato\",\"sumir\",\"suor\",\"superior\",\"suplicar\",\"suposto\",\"suprimir\",\"surdina\",\"surfista\",\"surpresa\",\"surreal\",\"surtir\",\"suspiro\",\"sustento\",\"tabela\",\"tablete\",\"tabuada\",\"tacho\",\"tagarela\",\"talher\",\"talo\",\"talvez\",\"tamanho\",\"tamborim\",\"tampa\",\"tangente\",\"tanto\",\"tapar\",\"tapioca\",\"tardio\",\"tarefa\",\"tarja\",\"tarraxa\",\"tatuagem\",\"taurino\",\"taxativo\",\"taxista\",\"teatral\",\"tecer\",\"tecido\",\"teclado\",\"tedioso\",\"teia\",\"teimar\",\"telefone\",\"telhado\",\"tempero\",\"tenente\",\"tensor\",\"tentar\",\"termal\",\"terno\",\"terreno\",\"tese\",\"tesoura\",\"testado\",\"teto\",\"textura\",\"texugo\",\"tiara\",\"tigela\",\"tijolo\",\"timbrar\",\"timidez\",\"tingido\",\"tinteiro\",\"tiragem\",\"titular\",\"toalha\",\"tocha\",\"tolerar\",\"tolice\",\"tomada\",\"tomilho\",\"tonel\",\"tontura\",\"topete\",\"tora\",\"torcido\",\"torneio\",\"torque\",\"torrada\",\"torto\",\"tostar\",\"touca\",\"toupeira\",\"toxina\",\"trabalho\",\"tracejar\",\"tradutor\",\"trafegar\",\"trajeto\",\"trama\",\"trancar\",\"trapo\",\"traseiro\",\"tratador\",\"travar\",\"treino\",\"tremer\",\"trepidar\",\"trevo\",\"triagem\",\"tribo\",\"triciclo\",\"tridente\",\"trilogia\",\"trindade\",\"triplo\",\"triturar\",\"triunfal\",\"trocar\",\"trombeta\",\"trova\",\"trunfo\",\"truque\",\"tubular\",\"tucano\",\"tudo\",\"tulipa\",\"tupi\",\"turbo\",\"turma\",\"turquesa\",\"tutelar\",\"tutorial\",\"uivar\",\"umbigo\",\"unha\",\"unidade\",\"uniforme\",\"urologia\",\"urso\",\"urtiga\",\"urubu\",\"usado\",\"usina\",\"usufruir\",\"vacina\",\"vadiar\",\"vagaroso\",\"vaidoso\",\"vala\",\"valente\",\"validade\",\"valores\",\"vantagem\",\"vaqueiro\",\"varanda\",\"vareta\",\"varrer\",\"vascular\",\"vasilha\",\"vassoura\",\"vazar\",\"vazio\",\"veado\",\"vedar\",\"vegetar\",\"veicular\",\"veleiro\",\"velhice\",\"veludo\",\"vencedor\",\"vendaval\",\"venerar\",\"ventre\",\"verbal\",\"verdade\",\"vereador\",\"vergonha\",\"vermelho\",\"verniz\",\"versar\",\"vertente\",\"vespa\",\"vestido\",\"vetorial\",\"viaduto\",\"viagem\",\"viajar\",\"viatura\",\"vibrador\",\"videira\",\"vidraria\",\"viela\",\"viga\",\"vigente\",\"vigiar\",\"vigorar\",\"vilarejo\",\"vinco\",\"vinheta\",\"vinil\",\"violeta\",\"virada\",\"virtude\",\"visitar\",\"visto\",\"vitral\",\"viveiro\",\"vizinho\",\"voador\",\"voar\",\"vogal\",\"volante\",\"voleibol\",\"voltagem\",\"volumoso\",\"vontade\",\"vulto\",\"vuvuzela\",\"xadrez\",\"xarope\",\"xeque\",\"xeretar\",\"xerife\",\"xingar\",\"zangado\",\"zarpar\",\"zebu\",\"zelador\",\"zombar\",\"zoologia\",\"zumbido\"]");

const require$$9 = /* #__PURE__ */ JSON.parse("[\"abandon\",\"ability\",\"able\",\"about\",\"above\",\"absent\",\"absorb\",\"abstract\",\"absurd\",\"abuse\",\"access\",\"accident\",\"account\",\"accuse\",\"achieve\",\"acid\",\"acoustic\",\"acquire\",\"across\",\"act\",\"action\",\"actor\",\"actress\",\"actual\",\"adapt\",\"add\",\"addict\",\"address\",\"adjust\",\"admit\",\"adult\",\"advance\",\"advice\",\"aerobic\",\"affair\",\"afford\",\"afraid\",\"again\",\"age\",\"agent\",\"agree\",\"ahead\",\"aim\",\"air\",\"airport\",\"aisle\",\"alarm\",\"album\",\"alcohol\",\"alert\",\"alien\",\"all\",\"alley\",\"allow\",\"almost\",\"alone\",\"alpha\",\"already\",\"also\",\"alter\",\"always\",\"amateur\",\"amazing\",\"among\",\"amount\",\"amused\",\"analyst\",\"anchor\",\"ancient\",\"anger\",\"angle\",\"angry\",\"animal\",\"ankle\",\"announce\",\"annual\",\"another\",\"answer\",\"antenna\",\"antique\",\"anxiety\",\"any\",\"apart\",\"apology\",\"appear\",\"apple\",\"approve\",\"april\",\"arch\",\"arctic\",\"area\",\"arena\",\"argue\",\"arm\",\"armed\",\"armor\",\"army\",\"around\",\"arrange\",\"arrest\",\"arrive\",\"arrow\",\"art\",\"artefact\",\"artist\",\"artwork\",\"ask\",\"aspect\",\"assault\",\"asset\",\"assist\",\"assume\",\"asthma\",\"athlete\",\"atom\",\"attack\",\"attend\",\"attitude\",\"attract\",\"auction\",\"audit\",\"august\",\"aunt\",\"author\",\"auto\",\"autumn\",\"average\",\"avocado\",\"avoid\",\"awake\",\"aware\",\"away\",\"awesome\",\"awful\",\"awkward\",\"axis\",\"baby\",\"bachelor\",\"bacon\",\"badge\",\"bag\",\"balance\",\"balcony\",\"ball\",\"bamboo\",\"banana\",\"banner\",\"bar\",\"barely\",\"bargain\",\"barrel\",\"base\",\"basic\",\"basket\",\"battle\",\"beach\",\"bean\",\"beauty\",\"because\",\"become\",\"beef\",\"before\",\"begin\",\"behave\",\"behind\",\"believe\",\"below\",\"belt\",\"bench\",\"benefit\",\"best\",\"betray\",\"better\",\"between\",\"beyond\",\"bicycle\",\"bid\",\"bike\",\"bind\",\"biology\",\"bird\",\"birth\",\"bitter\",\"black\",\"blade\",\"blame\",\"blanket\",\"blast\",\"bleak\",\"bless\",\"blind\",\"blood\",\"blossom\",\"blouse\",\"blue\",\"blur\",\"blush\",\"board\",\"boat\",\"body\",\"boil\",\"bomb\",\"bone\",\"bonus\",\"book\",\"boost\",\"border\",\"boring\",\"borrow\",\"boss\",\"bottom\",\"bounce\",\"box\",\"boy\",\"bracket\",\"brain\",\"brand\",\"brass\",\"brave\",\"bread\",\"breeze\",\"brick\",\"bridge\",\"brief\",\"bright\",\"bring\",\"brisk\",\"broccoli\",\"broken\",\"bronze\",\"broom\",\"brother\",\"brown\",\"brush\",\"bubble\",\"buddy\",\"budget\",\"buffalo\",\"build\",\"bulb\",\"bulk\",\"bullet\",\"bundle\",\"bunker\",\"burden\",\"burger\",\"burst\",\"bus\",\"business\",\"busy\",\"butter\",\"buyer\",\"buzz\",\"cabbage\",\"cabin\",\"cable\",\"cactus\",\"cage\",\"cake\",\"call\",\"calm\",\"camera\",\"camp\",\"can\",\"canal\",\"cancel\",\"candy\",\"cannon\",\"canoe\",\"canvas\",\"canyon\",\"capable\",\"capital\",\"captain\",\"car\",\"carbon\",\"card\",\"cargo\",\"carpet\",\"carry\",\"cart\",\"case\",\"cash\",\"casino\",\"castle\",\"casual\",\"cat\",\"catalog\",\"catch\",\"category\",\"cattle\",\"caught\",\"cause\",\"caution\",\"cave\",\"ceiling\",\"celery\",\"cement\",\"census\",\"century\",\"cereal\",\"certain\",\"chair\",\"chalk\",\"champion\",\"change\",\"chaos\",\"chapter\",\"charge\",\"chase\",\"chat\",\"cheap\",\"check\",\"cheese\",\"chef\",\"cherry\",\"chest\",\"chicken\",\"chief\",\"child\",\"chimney\",\"choice\",\"choose\",\"chronic\",\"chuckle\",\"chunk\",\"churn\",\"cigar\",\"cinnamon\",\"circle\",\"citizen\",\"city\",\"civil\",\"claim\",\"clap\",\"clarify\",\"claw\",\"clay\",\"clean\",\"clerk\",\"clever\",\"click\",\"client\",\"cliff\",\"climb\",\"clinic\",\"clip\",\"clock\",\"clog\",\"close\",\"cloth\",\"cloud\",\"clown\",\"club\",\"clump\",\"cluster\",\"clutch\",\"coach\",\"coast\",\"coconut\",\"code\",\"coffee\",\"coil\",\"coin\",\"collect\",\"color\",\"column\",\"combine\",\"come\",\"comfort\",\"comic\",\"common\",\"company\",\"concert\",\"conduct\",\"confirm\",\"congress\",\"connect\",\"consider\",\"control\",\"convince\",\"cook\",\"cool\",\"copper\",\"copy\",\"coral\",\"core\",\"corn\",\"correct\",\"cost\",\"cotton\",\"couch\",\"country\",\"couple\",\"course\",\"cousin\",\"cover\",\"coyote\",\"crack\",\"cradle\",\"craft\",\"cram\",\"crane\",\"crash\",\"crater\",\"crawl\",\"crazy\",\"cream\",\"credit\",\"creek\",\"crew\",\"cricket\",\"crime\",\"crisp\",\"critic\",\"crop\",\"cross\",\"crouch\",\"crowd\",\"crucial\",\"cruel\",\"cruise\",\"crumble\",\"crunch\",\"crush\",\"cry\",\"crystal\",\"cube\",\"culture\",\"cup\",\"cupboard\",\"curious\",\"current\",\"curtain\",\"curve\",\"cushion\",\"custom\",\"cute\",\"cycle\",\"dad\",\"damage\",\"damp\",\"dance\",\"danger\",\"daring\",\"dash\",\"daughter\",\"dawn\",\"day\",\"deal\",\"debate\",\"debris\",\"decade\",\"december\",\"decide\",\"decline\",\"decorate\",\"decrease\",\"deer\",\"defense\",\"define\",\"defy\",\"degree\",\"delay\",\"deliver\",\"demand\",\"demise\",\"denial\",\"dentist\",\"deny\",\"depart\",\"depend\",\"deposit\",\"depth\",\"deputy\",\"derive\",\"describe\",\"desert\",\"design\",\"desk\",\"despair\",\"destroy\",\"detail\",\"detect\",\"develop\",\"device\",\"devote\",\"diagram\",\"dial\",\"diamond\",\"diary\",\"dice\",\"diesel\",\"diet\",\"differ\",\"digital\",\"dignity\",\"dilemma\",\"dinner\",\"dinosaur\",\"direct\",\"dirt\",\"disagree\",\"discover\",\"disease\",\"dish\",\"dismiss\",\"disorder\",\"display\",\"distance\",\"divert\",\"divide\",\"divorce\",\"dizzy\",\"doctor\",\"document\",\"dog\",\"doll\",\"dolphin\",\"domain\",\"donate\",\"donkey\",\"donor\",\"door\",\"dose\",\"double\",\"dove\",\"draft\",\"dragon\",\"drama\",\"drastic\",\"draw\",\"dream\",\"dress\",\"drift\",\"drill\",\"drink\",\"drip\",\"drive\",\"drop\",\"drum\",\"dry\",\"duck\",\"dumb\",\"dune\",\"during\",\"dust\",\"dutch\",\"duty\",\"dwarf\",\"dynamic\",\"eager\",\"eagle\",\"early\",\"earn\",\"earth\",\"easily\",\"east\",\"easy\",\"echo\",\"ecology\",\"economy\",\"edge\",\"edit\",\"educate\",\"effort\",\"egg\",\"eight\",\"either\",\"elbow\",\"elder\",\"electric\",\"elegant\",\"element\",\"elephant\",\"elevator\",\"elite\",\"else\",\"embark\",\"embody\",\"embrace\",\"emerge\",\"emotion\",\"employ\",\"empower\",\"empty\",\"enable\",\"enact\",\"end\",\"endless\",\"endorse\",\"enemy\",\"energy\",\"enforce\",\"engage\",\"engine\",\"enhance\",\"enjoy\",\"enlist\",\"enough\",\"enrich\",\"enroll\",\"ensure\",\"enter\",\"entire\",\"entry\",\"envelope\",\"episode\",\"equal\",\"equip\",\"era\",\"erase\",\"erode\",\"erosion\",\"error\",\"erupt\",\"escape\",\"essay\",\"essence\",\"estate\",\"eternal\",\"ethics\",\"evidence\",\"evil\",\"evoke\",\"evolve\",\"exact\",\"example\",\"excess\",\"exchange\",\"excite\",\"exclude\",\"excuse\",\"execute\",\"exercise\",\"exhaust\",\"exhibit\",\"exile\",\"exist\",\"exit\",\"exotic\",\"expand\",\"expect\",\"expire\",\"explain\",\"expose\",\"express\",\"extend\",\"extra\",\"eye\",\"eyebrow\",\"fabric\",\"face\",\"faculty\",\"fade\",\"faint\",\"faith\",\"fall\",\"false\",\"fame\",\"family\",\"famous\",\"fan\",\"fancy\",\"fantasy\",\"farm\",\"fashion\",\"fat\",\"fatal\",\"father\",\"fatigue\",\"fault\",\"favorite\",\"feature\",\"february\",\"federal\",\"fee\",\"feed\",\"feel\",\"female\",\"fence\",\"festival\",\"fetch\",\"fever\",\"few\",\"fiber\",\"fiction\",\"field\",\"figure\",\"file\",\"film\",\"filter\",\"final\",\"find\",\"fine\",\"finger\",\"finish\",\"fire\",\"firm\",\"first\",\"fiscal\",\"fish\",\"fit\",\"fitness\",\"fix\",\"flag\",\"flame\",\"flash\",\"flat\",\"flavor\",\"flee\",\"flight\",\"flip\",\"float\",\"flock\",\"floor\",\"flower\",\"fluid\",\"flush\",\"fly\",\"foam\",\"focus\",\"fog\",\"foil\",\"fold\",\"follow\",\"food\",\"foot\",\"force\",\"forest\",\"forget\",\"fork\",\"fortune\",\"forum\",\"forward\",\"fossil\",\"foster\",\"found\",\"fox\",\"fragile\",\"frame\",\"frequent\",\"fresh\",\"friend\",\"fringe\",\"frog\",\"front\",\"frost\",\"frown\",\"frozen\",\"fruit\",\"fuel\",\"fun\",\"funny\",\"furnace\",\"fury\",\"future\",\"gadget\",\"gain\",\"galaxy\",\"gallery\",\"game\",\"gap\",\"garage\",\"garbage\",\"garden\",\"garlic\",\"garment\",\"gas\",\"gasp\",\"gate\",\"gather\",\"gauge\",\"gaze\",\"general\",\"genius\",\"genre\",\"gentle\",\"genuine\",\"gesture\",\"ghost\",\"giant\",\"gift\",\"giggle\",\"ginger\",\"giraffe\",\"girl\",\"give\",\"glad\",\"glance\",\"glare\",\"glass\",\"glide\",\"glimpse\",\"globe\",\"gloom\",\"glory\",\"glove\",\"glow\",\"glue\",\"goat\",\"goddess\",\"gold\",\"good\",\"goose\",\"gorilla\",\"gospel\",\"gossip\",\"govern\",\"gown\",\"grab\",\"grace\",\"grain\",\"grant\",\"grape\",\"grass\",\"gravity\",\"great\",\"green\",\"grid\",\"grief\",\"grit\",\"grocery\",\"group\",\"grow\",\"grunt\",\"guard\",\"guess\",\"guide\",\"guilt\",\"guitar\",\"gun\",\"gym\",\"habit\",\"hair\",\"half\",\"hammer\",\"hamster\",\"hand\",\"happy\",\"harbor\",\"hard\",\"harsh\",\"harvest\",\"hat\",\"have\",\"hawk\",\"hazard\",\"head\",\"health\",\"heart\",\"heavy\",\"hedgehog\",\"height\",\"hello\",\"helmet\",\"help\",\"hen\",\"hero\",\"hidden\",\"high\",\"hill\",\"hint\",\"hip\",\"hire\",\"history\",\"hobby\",\"hockey\",\"hold\",\"hole\",\"holiday\",\"hollow\",\"home\",\"honey\",\"hood\",\"hope\",\"horn\",\"horror\",\"horse\",\"hospital\",\"host\",\"hotel\",\"hour\",\"hover\",\"hub\",\"huge\",\"human\",\"humble\",\"humor\",\"hundred\",\"hungry\",\"hunt\",\"hurdle\",\"hurry\",\"hurt\",\"husband\",\"hybrid\",\"ice\",\"icon\",\"idea\",\"identify\",\"idle\",\"ignore\",\"ill\",\"illegal\",\"illness\",\"image\",\"imitate\",\"immense\",\"immune\",\"impact\",\"impose\",\"improve\",\"impulse\",\"inch\",\"include\",\"income\",\"increase\",\"index\",\"indicate\",\"indoor\",\"industry\",\"infant\",\"inflict\",\"inform\",\"inhale\",\"inherit\",\"initial\",\"inject\",\"injury\",\"inmate\",\"inner\",\"innocent\",\"input\",\"inquiry\",\"insane\",\"insect\",\"inside\",\"inspire\",\"install\",\"intact\",\"interest\",\"into\",\"invest\",\"invite\",\"involve\",\"iron\",\"island\",\"isolate\",\"issue\",\"item\",\"ivory\",\"jacket\",\"jaguar\",\"jar\",\"jazz\",\"jealous\",\"jeans\",\"jelly\",\"jewel\",\"job\",\"join\",\"joke\",\"journey\",\"joy\",\"judge\",\"juice\",\"jump\",\"jungle\",\"junior\",\"junk\",\"just\",\"kangaroo\",\"keen\",\"keep\",\"ketchup\",\"key\",\"kick\",\"kid\",\"kidney\",\"kind\",\"kingdom\",\"kiss\",\"kit\",\"kitchen\",\"kite\",\"kitten\",\"kiwi\",\"knee\",\"knife\",\"knock\",\"know\",\"lab\",\"label\",\"labor\",\"ladder\",\"lady\",\"lake\",\"lamp\",\"language\",\"laptop\",\"large\",\"later\",\"latin\",\"laugh\",\"laundry\",\"lava\",\"law\",\"lawn\",\"lawsuit\",\"layer\",\"lazy\",\"leader\",\"leaf\",\"learn\",\"leave\",\"lecture\",\"left\",\"leg\",\"legal\",\"legend\",\"leisure\",\"lemon\",\"lend\",\"length\",\"lens\",\"leopard\",\"lesson\",\"letter\",\"level\",\"liar\",\"liberty\",\"library\",\"license\",\"life\",\"lift\",\"light\",\"like\",\"limb\",\"limit\",\"link\",\"lion\",\"liquid\",\"list\",\"little\",\"live\",\"lizard\",\"load\",\"loan\",\"lobster\",\"local\",\"lock\",\"logic\",\"lonely\",\"long\",\"loop\",\"lottery\",\"loud\",\"lounge\",\"love\",\"loyal\",\"lucky\",\"luggage\",\"lumber\",\"lunar\",\"lunch\",\"luxury\",\"lyrics\",\"machine\",\"mad\",\"magic\",\"magnet\",\"maid\",\"mail\",\"main\",\"major\",\"make\",\"mammal\",\"man\",\"manage\",\"mandate\",\"mango\",\"mansion\",\"manual\",\"maple\",\"marble\",\"march\",\"margin\",\"marine\",\"market\",\"marriage\",\"mask\",\"mass\",\"master\",\"match\",\"material\",\"math\",\"matrix\",\"matter\",\"maximum\",\"maze\",\"meadow\",\"mean\",\"measure\",\"meat\",\"mechanic\",\"medal\",\"media\",\"melody\",\"melt\",\"member\",\"memory\",\"mention\",\"menu\",\"mercy\",\"merge\",\"merit\",\"merry\",\"mesh\",\"message\",\"metal\",\"method\",\"middle\",\"midnight\",\"milk\",\"million\",\"mimic\",\"mind\",\"minimum\",\"minor\",\"minute\",\"miracle\",\"mirror\",\"misery\",\"miss\",\"mistake\",\"mix\",\"mixed\",\"mixture\",\"mobile\",\"model\",\"modify\",\"mom\",\"moment\",\"monitor\",\"monkey\",\"monster\",\"month\",\"moon\",\"moral\",\"more\",\"morning\",\"mosquito\",\"mother\",\"motion\",\"motor\",\"mountain\",\"mouse\",\"move\",\"movie\",\"much\",\"muffin\",\"mule\",\"multiply\",\"muscle\",\"museum\",\"mushroom\",\"music\",\"must\",\"mutual\",\"myself\",\"mystery\",\"myth\",\"naive\",\"name\",\"napkin\",\"narrow\",\"nasty\",\"nation\",\"nature\",\"near\",\"neck\",\"need\",\"negative\",\"neglect\",\"neither\",\"nephew\",\"nerve\",\"nest\",\"net\",\"network\",\"neutral\",\"never\",\"news\",\"next\",\"nice\",\"night\",\"noble\",\"noise\",\"nominee\",\"noodle\",\"normal\",\"north\",\"nose\",\"notable\",\"note\",\"nothing\",\"notice\",\"novel\",\"now\",\"nuclear\",\"number\",\"nurse\",\"nut\",\"oak\",\"obey\",\"object\",\"oblige\",\"obscure\",\"observe\",\"obtain\",\"obvious\",\"occur\",\"ocean\",\"october\",\"odor\",\"off\",\"offer\",\"office\",\"often\",\"oil\",\"okay\",\"old\",\"olive\",\"olympic\",\"omit\",\"once\",\"one\",\"onion\",\"online\",\"only\",\"open\",\"opera\",\"opinion\",\"oppose\",\"option\",\"orange\",\"orbit\",\"orchard\",\"order\",\"ordinary\",\"organ\",\"orient\",\"original\",\"orphan\",\"ostrich\",\"other\",\"outdoor\",\"outer\",\"output\",\"outside\",\"oval\",\"oven\",\"over\",\"own\",\"owner\",\"oxygen\",\"oyster\",\"ozone\",\"pact\",\"paddle\",\"page\",\"pair\",\"palace\",\"palm\",\"panda\",\"panel\",\"panic\",\"panther\",\"paper\",\"parade\",\"parent\",\"park\",\"parrot\",\"party\",\"pass\",\"patch\",\"path\",\"patient\",\"patrol\",\"pattern\",\"pause\",\"pave\",\"payment\",\"peace\",\"peanut\",\"pear\",\"peasant\",\"pelican\",\"pen\",\"penalty\",\"pencil\",\"people\",\"pepper\",\"perfect\",\"permit\",\"person\",\"pet\",\"phone\",\"photo\",\"phrase\",\"physical\",\"piano\",\"picnic\",\"picture\",\"piece\",\"pig\",\"pigeon\",\"pill\",\"pilot\",\"pink\",\"pioneer\",\"pipe\",\"pistol\",\"pitch\",\"pizza\",\"place\",\"planet\",\"plastic\",\"plate\",\"play\",\"please\",\"pledge\",\"pluck\",\"plug\",\"plunge\",\"poem\",\"poet\",\"point\",\"polar\",\"pole\",\"police\",\"pond\",\"pony\",\"pool\",\"popular\",\"portion\",\"position\",\"possible\",\"post\",\"potato\",\"pottery\",\"poverty\",\"powder\",\"power\",\"practice\",\"praise\",\"predict\",\"prefer\",\"prepare\",\"present\",\"pretty\",\"prevent\",\"price\",\"pride\",\"primary\",\"print\",\"priority\",\"prison\",\"private\",\"prize\",\"problem\",\"process\",\"produce\",\"profit\",\"program\",\"project\",\"promote\",\"proof\",\"property\",\"prosper\",\"protect\",\"proud\",\"provide\",\"public\",\"pudding\",\"pull\",\"pulp\",\"pulse\",\"pumpkin\",\"punch\",\"pupil\",\"puppy\",\"purchase\",\"purity\",\"purpose\",\"purse\",\"push\",\"put\",\"puzzle\",\"pyramid\",\"quality\",\"quantum\",\"quarter\",\"question\",\"quick\",\"quit\",\"quiz\",\"quote\",\"rabbit\",\"raccoon\",\"race\",\"rack\",\"radar\",\"radio\",\"rail\",\"rain\",\"raise\",\"rally\",\"ramp\",\"ranch\",\"random\",\"range\",\"rapid\",\"rare\",\"rate\",\"rather\",\"raven\",\"raw\",\"razor\",\"ready\",\"real\",\"reason\",\"rebel\",\"rebuild\",\"recall\",\"receive\",\"recipe\",\"record\",\"recycle\",\"reduce\",\"reflect\",\"reform\",\"refuse\",\"region\",\"regret\",\"regular\",\"reject\",\"relax\",\"release\",\"relief\",\"rely\",\"remain\",\"remember\",\"remind\",\"remove\",\"render\",\"renew\",\"rent\",\"reopen\",\"repair\",\"repeat\",\"replace\",\"report\",\"require\",\"rescue\",\"resemble\",\"resist\",\"resource\",\"response\",\"result\",\"retire\",\"retreat\",\"return\",\"reunion\",\"reveal\",\"review\",\"reward\",\"rhythm\",\"rib\",\"ribbon\",\"rice\",\"rich\",\"ride\",\"ridge\",\"rifle\",\"right\",\"rigid\",\"ring\",\"riot\",\"ripple\",\"risk\",\"ritual\",\"rival\",\"river\",\"road\",\"roast\",\"robot\",\"robust\",\"rocket\",\"romance\",\"roof\",\"rookie\",\"room\",\"rose\",\"rotate\",\"rough\",\"round\",\"route\",\"royal\",\"rubber\",\"rude\",\"rug\",\"rule\",\"run\",\"runway\",\"rural\",\"sad\",\"saddle\",\"sadness\",\"safe\",\"sail\",\"salad\",\"salmon\",\"salon\",\"salt\",\"salute\",\"same\",\"sample\",\"sand\",\"satisfy\",\"satoshi\",\"sauce\",\"sausage\",\"save\",\"say\",\"scale\",\"scan\",\"scare\",\"scatter\",\"scene\",\"scheme\",\"school\",\"science\",\"scissors\",\"scorpion\",\"scout\",\"scrap\",\"screen\",\"script\",\"scrub\",\"sea\",\"search\",\"season\",\"seat\",\"second\",\"secret\",\"section\",\"security\",\"seed\",\"seek\",\"segment\",\"select\",\"sell\",\"seminar\",\"senior\",\"sense\",\"sentence\",\"series\",\"service\",\"session\",\"settle\",\"setup\",\"seven\",\"shadow\",\"shaft\",\"shallow\",\"share\",\"shed\",\"shell\",\"sheriff\",\"shield\",\"shift\",\"shine\",\"ship\",\"shiver\",\"shock\",\"shoe\",\"shoot\",\"shop\",\"short\",\"shoulder\",\"shove\",\"shrimp\",\"shrug\",\"shuffle\",\"shy\",\"sibling\",\"sick\",\"side\",\"siege\",\"sight\",\"sign\",\"silent\",\"silk\",\"silly\",\"silver\",\"similar\",\"simple\",\"since\",\"sing\",\"siren\",\"sister\",\"situate\",\"six\",\"size\",\"skate\",\"sketch\",\"ski\",\"skill\",\"skin\",\"skirt\",\"skull\",\"slab\",\"slam\",\"sleep\",\"slender\",\"slice\",\"slide\",\"slight\",\"slim\",\"slogan\",\"slot\",\"slow\",\"slush\",\"small\",\"smart\",\"smile\",\"smoke\",\"smooth\",\"snack\",\"snake\",\"snap\",\"sniff\",\"snow\",\"soap\",\"soccer\",\"social\",\"sock\",\"soda\",\"soft\",\"solar\",\"soldier\",\"solid\",\"solution\",\"solve\",\"someone\",\"song\",\"soon\",\"sorry\",\"sort\",\"soul\",\"sound\",\"soup\",\"source\",\"south\",\"space\",\"spare\",\"spatial\",\"spawn\",\"speak\",\"special\",\"speed\",\"spell\",\"spend\",\"sphere\",\"spice\",\"spider\",\"spike\",\"spin\",\"spirit\",\"split\",\"spoil\",\"sponsor\",\"spoon\",\"sport\",\"spot\",\"spray\",\"spread\",\"spring\",\"spy\",\"square\",\"squeeze\",\"squirrel\",\"stable\",\"stadium\",\"staff\",\"stage\",\"stairs\",\"stamp\",\"stand\",\"start\",\"state\",\"stay\",\"steak\",\"steel\",\"stem\",\"step\",\"stereo\",\"stick\",\"still\",\"sting\",\"stock\",\"stomach\",\"stone\",\"stool\",\"story\",\"stove\",\"strategy\",\"street\",\"strike\",\"strong\",\"struggle\",\"student\",\"stuff\",\"stumble\",\"style\",\"subject\",\"submit\",\"subway\",\"success\",\"such\",\"sudden\",\"suffer\",\"sugar\",\"suggest\",\"suit\",\"summer\",\"sun\",\"sunny\",\"sunset\",\"super\",\"supply\",\"supreme\",\"sure\",\"surface\",\"surge\",\"surprise\",\"surround\",\"survey\",\"suspect\",\"sustain\",\"swallow\",\"swamp\",\"swap\",\"swarm\",\"swear\",\"sweet\",\"swift\",\"swim\",\"swing\",\"switch\",\"sword\",\"symbol\",\"symptom\",\"syrup\",\"system\",\"table\",\"tackle\",\"tag\",\"tail\",\"talent\",\"talk\",\"tank\",\"tape\",\"target\",\"task\",\"taste\",\"tattoo\",\"taxi\",\"teach\",\"team\",\"tell\",\"ten\",\"tenant\",\"tennis\",\"tent\",\"term\",\"test\",\"text\",\"thank\",\"that\",\"theme\",\"then\",\"theory\",\"there\",\"they\",\"thing\",\"this\",\"thought\",\"three\",\"thrive\",\"throw\",\"thumb\",\"thunder\",\"ticket\",\"tide\",\"tiger\",\"tilt\",\"timber\",\"time\",\"tiny\",\"tip\",\"tired\",\"tissue\",\"title\",\"toast\",\"tobacco\",\"today\",\"toddler\",\"toe\",\"together\",\"toilet\",\"token\",\"tomato\",\"tomorrow\",\"tone\",\"tongue\",\"tonight\",\"tool\",\"tooth\",\"top\",\"topic\",\"topple\",\"torch\",\"tornado\",\"tortoise\",\"toss\",\"total\",\"tourist\",\"toward\",\"tower\",\"town\",\"toy\",\"track\",\"trade\",\"traffic\",\"tragic\",\"train\",\"transfer\",\"trap\",\"trash\",\"travel\",\"tray\",\"treat\",\"tree\",\"trend\",\"trial\",\"tribe\",\"trick\",\"trigger\",\"trim\",\"trip\",\"trophy\",\"trouble\",\"truck\",\"true\",\"truly\",\"trumpet\",\"trust\",\"truth\",\"try\",\"tube\",\"tuition\",\"tumble\",\"tuna\",\"tunnel\",\"turkey\",\"turn\",\"turtle\",\"twelve\",\"twenty\",\"twice\",\"twin\",\"twist\",\"two\",\"type\",\"typical\",\"ugly\",\"umbrella\",\"unable\",\"unaware\",\"uncle\",\"uncover\",\"under\",\"undo\",\"unfair\",\"unfold\",\"unhappy\",\"uniform\",\"unique\",\"unit\",\"universe\",\"unknown\",\"unlock\",\"until\",\"unusual\",\"unveil\",\"update\",\"upgrade\",\"uphold\",\"upon\",\"upper\",\"upset\",\"urban\",\"urge\",\"usage\",\"use\",\"used\",\"useful\",\"useless\",\"usual\",\"utility\",\"vacant\",\"vacuum\",\"vague\",\"valid\",\"valley\",\"valve\",\"van\",\"vanish\",\"vapor\",\"various\",\"vast\",\"vault\",\"vehicle\",\"velvet\",\"vendor\",\"venture\",\"venue\",\"verb\",\"verify\",\"version\",\"very\",\"vessel\",\"veteran\",\"viable\",\"vibrant\",\"vicious\",\"victory\",\"video\",\"view\",\"village\",\"vintage\",\"violin\",\"virtual\",\"virus\",\"visa\",\"visit\",\"visual\",\"vital\",\"vivid\",\"vocal\",\"voice\",\"void\",\"volcano\",\"volume\",\"vote\",\"voyage\",\"wage\",\"wagon\",\"wait\",\"walk\",\"wall\",\"walnut\",\"want\",\"warfare\",\"warm\",\"warrior\",\"wash\",\"wasp\",\"waste\",\"water\",\"wave\",\"way\",\"wealth\",\"weapon\",\"wear\",\"weasel\",\"weather\",\"web\",\"wedding\",\"weekend\",\"weird\",\"welcome\",\"west\",\"wet\",\"whale\",\"what\",\"wheat\",\"wheel\",\"when\",\"where\",\"whip\",\"whisper\",\"wide\",\"width\",\"wife\",\"wild\",\"will\",\"win\",\"window\",\"wine\",\"wing\",\"wink\",\"winner\",\"winter\",\"wire\",\"wisdom\",\"wise\",\"wish\",\"witness\",\"wolf\",\"woman\",\"wonder\",\"wood\",\"wool\",\"word\",\"work\",\"world\",\"worry\",\"worth\",\"wrap\",\"wreck\",\"wrestle\",\"wrist\",\"write\",\"wrong\",\"yard\",\"year\",\"yellow\",\"you\",\"young\",\"youth\",\"zebra\",\"zero\",\"zone\",\"zoo\"]");

var hasRequired_wordlists;

function require_wordlists () {
	if (hasRequired_wordlists) return _wordlists;
	hasRequired_wordlists = 1;
	Object.defineProperty(_wordlists, "__esModule", { value: true });
	// browserify by default only pulls in files that are hard coded in requires
	// In order of last to first in this file, the default wordlist will be chosen
	// based on what is present. (Bundles may remove wordlists they don't need)
	const wordlists = {};
	_wordlists.wordlists = wordlists;
	let _default;
	_wordlists._default = _default;
	try {
	    _wordlists._default = _default = require$$0;
	    wordlists.czech = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$1;
	    wordlists.chinese_simplified = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$2;
	    wordlists.chinese_traditional = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$3;
	    wordlists.korean = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$4;
	    wordlists.french = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$5;
	    wordlists.italian = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$6;
	    wordlists.spanish = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$7;
	    wordlists.japanese = _default;
	    wordlists.JA = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$8;
	    wordlists.portuguese = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$9;
	    wordlists.english = _default;
	    wordlists.EN = _default;
	}
	catch (err) { }
	return _wordlists;
}

var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src;
	hasRequiredSrc = 1;
	Object.defineProperty(src, "__esModule", { value: true });
	const sha256_1 = /*@__PURE__*/ requireSha256();
	const sha512_1 = /*@__PURE__*/ requireSha512();
	const pbkdf2_1 = /*@__PURE__*/ requirePbkdf2();
	const utils_1 = /*@__PURE__*/ requireUtils();
	const _wordlists_1 = require_wordlists();
	let DEFAULT_WORDLIST = _wordlists_1._default;
	const INVALID_MNEMONIC = 'Invalid mnemonic';
	const INVALID_ENTROPY = 'Invalid entropy';
	const INVALID_CHECKSUM = 'Invalid mnemonic checksum';
	const WORDLIST_REQUIRED = 'A wordlist is required but a default could not be found.\n' +
	    'Please pass a 2048 word array explicitly.';
	function normalize(str) {
	    return (str || '').normalize('NFKD');
	}
	function lpad(str, padString, length) {
	    while (str.length < length) {
	        str = padString + str;
	    }
	    return str;
	}
	function binaryToByte(bin) {
	    return parseInt(bin, 2);
	}
	function bytesToBinary(bytes) {
	    return bytes.map((x) => lpad(x.toString(2), '0', 8)).join('');
	}
	function deriveChecksumBits(entropyBuffer) {
	    const ENT = entropyBuffer.length * 8;
	    const CS = ENT / 32;
	    const hash = sha256_1.sha256(Uint8Array.from(entropyBuffer));
	    return bytesToBinary(Array.from(hash)).slice(0, CS);
	}
	function salt(password) {
	    return 'mnemonic' + (password || '');
	}
	function mnemonicToSeedSync(mnemonic, password) {
	    const mnemonicBuffer = Uint8Array.from(Buffer$1.from(normalize(mnemonic), 'utf8'));
	    const saltBuffer = Uint8Array.from(Buffer$1.from(salt(normalize(password)), 'utf8'));
	    const res = pbkdf2_1.pbkdf2(sha512_1.sha512, mnemonicBuffer, saltBuffer, {
	        c: 2048,
	        dkLen: 64,
	    });
	    return Buffer$1.from(res);
	}
	src.mnemonicToSeedSync = mnemonicToSeedSync;
	function mnemonicToSeed(mnemonic, password) {
	    const mnemonicBuffer = Uint8Array.from(Buffer$1.from(normalize(mnemonic), 'utf8'));
	    const saltBuffer = Uint8Array.from(Buffer$1.from(salt(normalize(password)), 'utf8'));
	    return pbkdf2_1.pbkdf2Async(sha512_1.sha512, mnemonicBuffer, saltBuffer, {
	        c: 2048,
	        dkLen: 64,
	    }).then((res) => Buffer$1.from(res));
	}
	src.mnemonicToSeed = mnemonicToSeed;
	function mnemonicToEntropy(mnemonic, wordlist) {
	    wordlist = wordlist || DEFAULT_WORDLIST;
	    if (!wordlist) {
	        throw new Error(WORDLIST_REQUIRED);
	    }
	    const words = normalize(mnemonic).split(' ');
	    if (words.length % 3 !== 0) {
	        throw new Error(INVALID_MNEMONIC);
	    }
	    // convert word indices to 11 bit binary strings
	    const bits = words
	        .map((word) => {
	        const index = wordlist.indexOf(word);
	        if (index === -1) {
	            throw new Error(INVALID_MNEMONIC);
	        }
	        return lpad(index.toString(2), '0', 11);
	    })
	        .join('');
	    // split the binary string into ENT/CS
	    const dividerIndex = Math.floor(bits.length / 33) * 32;
	    const entropyBits = bits.slice(0, dividerIndex);
	    const checksumBits = bits.slice(dividerIndex);
	    // calculate the checksum and compare
	    const entropyBytes = entropyBits.match(/(.{1,8})/g).map(binaryToByte);
	    if (entropyBytes.length < 16) {
	        throw new Error(INVALID_ENTROPY);
	    }
	    if (entropyBytes.length > 32) {
	        throw new Error(INVALID_ENTROPY);
	    }
	    if (entropyBytes.length % 4 !== 0) {
	        throw new Error(INVALID_ENTROPY);
	    }
	    const entropy = Buffer$1.from(entropyBytes);
	    const newChecksum = deriveChecksumBits(entropy);
	    if (newChecksum !== checksumBits) {
	        throw new Error(INVALID_CHECKSUM);
	    }
	    return entropy.toString('hex');
	}
	src.mnemonicToEntropy = mnemonicToEntropy;
	function entropyToMnemonic(entropy, wordlist) {
	    if (!Buffer$1.isBuffer(entropy)) {
	        entropy = Buffer$1.from(entropy, 'hex');
	    }
	    wordlist = wordlist || DEFAULT_WORDLIST;
	    if (!wordlist) {
	        throw new Error(WORDLIST_REQUIRED);
	    }
	    // 128 <= ENT <= 256
	    if (entropy.length < 16) {
	        throw new TypeError(INVALID_ENTROPY);
	    }
	    if (entropy.length > 32) {
	        throw new TypeError(INVALID_ENTROPY);
	    }
	    if (entropy.length % 4 !== 0) {
	        throw new TypeError(INVALID_ENTROPY);
	    }
	    const entropyBits = bytesToBinary(Array.from(entropy));
	    const checksumBits = deriveChecksumBits(entropy);
	    const bits = entropyBits + checksumBits;
	    const chunks = bits.match(/(.{1,11})/g);
	    const words = chunks.map((binary) => {
	        const index = binaryToByte(binary);
	        return wordlist[index];
	    });
	    return wordlist[0] === '\u3042\u3044\u3053\u304f\u3057\u3093' // Japanese wordlist
	        ? words.join('\u3000')
	        : words.join(' ');
	}
	src.entropyToMnemonic = entropyToMnemonic;
	function generateMnemonic(strength, rng, wordlist) {
	    strength = strength || 128;
	    if (strength % 32 !== 0) {
	        throw new TypeError(INVALID_ENTROPY);
	    }
	    rng = rng || ((size) => Buffer$1.from(utils_1.randomBytes(size)));
	    return entropyToMnemonic(rng(strength / 8), wordlist);
	}
	src.generateMnemonic = generateMnemonic;
	function validateMnemonic(mnemonic, wordlist) {
	    try {
	        mnemonicToEntropy(mnemonic, wordlist);
	    }
	    catch (e) {
	        return false;
	    }
	    return true;
	}
	src.validateMnemonic = validateMnemonic;
	function setDefaultWordlist(language) {
	    const result = _wordlists_1.wordlists[language];
	    if (result) {
	        DEFAULT_WORDLIST = result;
	    }
	    else {
	        throw new Error('Could not find wordlist for language "' + language + '"');
	    }
	}
	src.setDefaultWordlist = setDefaultWordlist;
	function getDefaultWordlist() {
	    if (!DEFAULT_WORDLIST) {
	        throw new Error('No Default Wordlist set');
	    }
	    return Object.keys(_wordlists_1.wordlists).filter((lang) => {
	        if (lang === 'JA' || lang === 'EN') {
	            return false;
	        }
	        return _wordlists_1.wordlists[lang].every((word, index) => word === DEFAULT_WORDLIST[index]);
	    })[0];
	}
	src.getDefaultWordlist = getDefaultWordlist;
	var _wordlists_2 = require_wordlists();
	src.wordlists = _wordlists_2.wordlists;
	return src;
}

var srcExports = requireSrc();

const createPrvKeyRoot = (mnemonic) => {
  const mnemonicBuffer = toHexBuffer(srcExports.mnemonicToEntropy(mnemonic));
  const passwordBuffer = toHexBuffer("");
  const cslPrvKey = Bip32PrivateKey.from_bip39_entropy(mnemonicBuffer, passwordBuffer);
  const prvKeyBech32 = cslPrvKey.to_bech32();
  safeFreeCSLObject(cslPrvKey);
  return prvKeyBech32;
};

const generateRootKey = (mnemonic, password) => {
  const prv = createPrvKeyRoot(mnemonic);
  return createIRootKey(getPubKeyFromPrvKey(prv), encryptText(prv, password));
};
const updateRootKey = (walletData, mnemonic, password) => {
  walletData.wallet.rootKey = generateRootKey(mnemonic, password);
  return true;
};
const updateSpendingPassword$1 = (walletData, oldPassword, newPassword) => {
  let prv = walletData.wallet.rootKey?.prv;
  if (prv) {
    try {
      const decryptedPrv = decryptText(prv, oldPassword, walletData.wallet.rootKey?.v ?? "");
      prv = encryptText(decryptedPrv, newPassword);
      walletData.wallet.rootKey.prv = prv;
      walletData.wallet.rootKey.v = "2";
    } catch (err) {
      return false;
    }
  }
  return true;
};

const updateSpendingPassword = (appWallet, oldPassword, password) => {
  const success = updateSpendingPassword$1(appWallet.data, oldPassword, password);
  if (success) {
    return saveWallet(appWallet);
  }
  return false;
};
const setSpendingPassword = (appWallet, mnemonic, password) => {
  updateRootKey(appWallet.data, mnemonic, password);
  {
    return saveWallet(appWallet);
  }
};

const adaHandle = "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a";

ref({});
const swapAssetInfoMap = ref({});
ref(-1);
computed(() => {
  let cnt = 0;
  for (const list of Object.values(swapAssetInfoMap.value)) {
    cnt += list.length;
  }
  return cnt;
});

const _textDecoder = new TextDecoder("utf-8", { fatal: true });
const getSortedAssetNames = (ma) => {
  if (!ma) {
    return [];
  }
  const sortedAssetDetailsList = [];
  for (const policyId of Object.keys(ma)) {
    const assetList = Object.entries(ma[policyId]);
    for (const asset of assetList) {
      const assetName = asset[0];
      const quantity = asset[1];
      const ai = getAssetInfoCheck(policyId, assetName);
      const assetDetails = createIAssetListItemDetails(policyId, assetName, quantity);
      if (ai) {
        assetDetails.ai = ai;
      } else {
        scheduleSetAssetInfo(assetDetails);
      }
      sortedAssetDetailsList.push(assetDetails);
    }
  }
  return sortedAssetDetailsList;
};
const getSortedAssetDetailsList = async (ma) => {
  if (!ma) {
    return [];
  }
  const sortedAssetDetailsList = getSortedAssetNames(ma);
  await scheduleSetAssetInfoList(sortedAssetDetailsList);
  sortedAssetDetailsList.sort((a, b) => {
    if (compare(a.a ?? "0", "<=", b.a ?? "0")) {
      return -1;
    }
    if (a.p !== b.p) {
      return a.p.localeCompare(a.p, "en-US");
    }
    return a.n.localeCompare(b.n, "en-US");
  });
  return sortedAssetDetailsList;
};
const cacheUpdateList = /* @__PURE__ */ new Map();
const cachePromises = /* @__PURE__ */ new Map();
const scheduleSetAssetInfo = (assetDetails) => {
  const key = assetDetails.p + assetDetails.t.a;
  let promise = cachePromises.get(key);
  if (promise) {
    let list = cacheUpdateList.get(key) ?? [];
    if (!list.includes(assetDetails)) {
      list.push(assetDetails);
      cacheUpdateList.set(key, list);
    }
    return promise;
  }
  promise = new Promise(async (resolve) => {
    const ai = await getAssetInfo(assetDetails.p, assetDetails.t.a) ?? void 0;
    if (ai) {
      assetDetails.ai = ai;
      assetDetails.n = getAssetName(assetDetails.n, ai, (ai.ts ?? "1") !== "1");
      let list = cacheUpdateList.get(key) ?? [];
      for (const item of list) {
        item.ai = ai;
        item.n = getAssetName(item.n, ai, (ai.ts ?? "1") !== "1");
      }
    } else {
      await dispatchSignal(doLoadTxAssetMetadata, { [assetDetails.p]: { [assetDetails.t.a]: 1 } });
    }
    cachePromises.delete(key);
    cacheUpdateList.delete(key);
    resolve();
  });
  cachePromises.set(key, promise);
  return promise;
};
const scheduleSetAssetInfoList = async (assetDetailsList) => {
  if (assetDetailsList.length === 1) {
    return scheduleSetAssetInfo(assetDetailsList[0]);
  }
  const aiList = await getAssetInfoList(assetDetailsList) ?? void 0;
  if (!aiList) {
    return;
  }
  for (const assetDetails of assetDetailsList) {
    const ai = aiList.get(assetDetails.p)?.get(assetDetails.t.a);
    if (ai) {
      assetDetails.ai = ai;
      assetDetails.n = getAssetName(assetDetails.n, ai, (ai.ts ?? "1") !== "1");
    } else {
      await dispatchSignal(doLoadTxAssetMetadata, { [assetDetails.p]: { [assetDetails.t.a]: 1 } });
    }
  }
};
const createIAssetListItemDetails = (policyId, assetName, quantity) => {
  return reactive({
    p: policyId,
    t: {
      a: assetName,
      q: quantity
    },
    a: "0",
    n: formatAssetName(assetName),
    f: getAssetIdBech32(policyId, assetName)
  });
};
const getAssetName = (assetName, data, preferTicker = false) => {
  if (data?.tr) {
    if (preferTicker) {
      const ticker = data.tr.t;
      if (ticker) {
        return ticker;
      }
    }
    return data.n ?? data.tr.n;
  }
  return data?.n ?? assetName;
};
const formatAssetName = (assetName) => {
  if (!assetName) {
    return "";
  }
  try {
    return _textDecoder.decode(toHexArray(assetName));
  } catch (e) {
  }
  return assetName;
};

const cache = [];
const isAdaHandle = (value) => !!value && value.startsWith("$") && value.replace("$", "").trim() !== "";
const getCachedHandle = (adaHandle) => {
  if (!isAdaHandle(adaHandle)) {
    return null;
  }
  const cachedEntry = cache.find((entry) => entry.name === adaHandle);
  if (cachedEntry && (cachedEntry?.cachedAt ?? 0) + 5 * 60 * 1e3 > Date.now()) {
    return cachedEntry.handle;
  }
  return null;
};
const resolveAdaHandle = async (networkId, adaHandle) => {
  if (!isAdaHandle(adaHandle)) {
    console.error("resolveAdaHandle: AdaHandleError.invalidAdaHandle", networkId, adaHandle);
    throw AdaHandleError.invalidAdaHandle;
  }
  const cachedHandle = getCachedHandle(adaHandle);
  if (cachedHandle) {
    return cachedHandle;
  }
  const url = `/${networkId}/v2/misc/adahandle`;
  const res = await api.post(url, {
    assetName: adaHandle.slice(1).toLowerCase()
  }).catch((err) => {
    console.warn("Error: ADA Handle: failed", networkId, err);
  });
  const addr = res?.data?.address;
  if (addr && res?.data?.fingerprint) {
    if (!isValidSendAddress(networkId, addr)) {
      throw AdaHandleError.invalidAddress;
    }
    const tmp = {
      address: res.data.address,
      fingerprint: res.data.fingerprint
    };
    if (adaHandle) {
      for (let i = cache.length - 1; i >= 0; i--) {
        if (cache[i].name === adaHandle) {
          cache.splice(i, 1);
        }
      }
      cache.push({
        name: adaHandle,
        cachedAt: Date.now(),
        handle: tmp
      });
    }
    return tmp;
  }
  throw AdaHandleError.adaHandleNotResolved;
};

const getImageB64 = (image) => {
  let type = "data:image/png;base64,";
  const buffer = Buffer$1.from(image);
  if (image.toString().match('^<svg.+xmlns=".+')) {
    type = "data:image/svg+xml;base64,";
  }
  return type + buffer.toString("base64");
};

const _assetCDNMap = /* @__PURE__ */ new Map();
const _promiseMap = /* @__PURE__ */ new Map();
const getAssetCDNImage = async (fingerprint, mediaSize, forceUpdate = false) => {
  const assetCDN = await getAssetCDN(fingerprint, mediaSize, forceUpdate);
  if (!assetCDN) {
    return void 0;
  }
  if (mediaSize === MediaSize.LOW && assetCDN.i) {
    return getImageB64(assetCDN.i);
  }
  const arrayBuffer = await fetchAssetCDNImage(networkId$9.value, assetCDN, mediaSize);
  if (arrayBuffer) {
    if (mediaSize === MediaSize.LOW) {
      assetCDN.i = arrayBuffer;
      addAssetCDNToMap(fingerprint, assetCDN);
      await saveAssetCDNToDB(assetCDN);
    }
    return getImageB64(arrayBuffer);
  }
};
const getAssetCDNFromDB = async (fingerprint) => {
  const assetImage = await AssetDB$1.getCDNImage(networkId$9.value, fingerprint);
  addAssetCDNToMap(fingerprint, assetImage);
  return assetImage;
};
const getAssetCDN = async (fingerprint, mediaSize, forceUpdate = false) => {
  const _now = now() / 1e3;
  let memAssetCDN = !forceUpdate ? _assetCDNMap.get(fingerprint) : void 0;
  if (memAssetCDN && memAssetCDN.e < _now) {
    forceUpdate = true;
  }
  if (!forceUpdate) {
    if (memAssetCDN) {
      return memAssetCDN;
    }
  }
  const dbAssetCDN = await getAssetCDNFromDB(fingerprint);
  if (!forceUpdate) {
    if (dbAssetCDN) {
      return dbAssetCDN;
    }
  }
  let assetCDNPromise = _promiseMap.get(fingerprint);
  if (!assetCDNPromise) {
    assetCDNPromise = loadAssetCDN(fingerprint);
    _promiseMap.set(fingerprint, assetCDNPromise);
  }
  const loadedAssetCDN = await assetCDNPromise;
  return loadedAssetCDN ?? dbAssetCDN ?? memAssetCDN;
};
const loadAssetCDN = async (fingerprint) => {
  const assetCDNList = await fetchAssetCDN(networkId$9.value, [fingerprint]);
  if (assetCDNList.length !== 1) {
    return void 0;
  }
  const assetCDN = assetCDNList[0];
  addAssetCDNToMap(assetCDN.f, assetCDN);
  _promiseMap.delete(assetCDN.f);
  await saveAssetCDNToDB(assetCDN);
  return assetCDN;
};
const saveAssetCDNToDB = (assetCDN) => {
  return AssetDB$1.putCDNImage(networkId$9.value, assetCDN);
};
const addAssetCDNToMap = (fingerprint, assetImage) => {
  if (!assetImage) {
    return;
  }
  _assetCDNMap.set(fingerprint, assetImage);
};

const useAdaHandle = (asset) => {
  const _assetDetails = ref(void 0);
  const isLoading = ref(false);
  const isResolved = ref(false);
  const address = ref();
  const image = ref("");
  const _name = ref("");
  const _hexName = ref("");
  const reset = () => {
    _assetDetails.value = void 0;
    isLoading.value = false;
    isResolved.value = false;
    address.value = void 0;
    image.value = "";
  };
  watch(_assetDetails, () => {
    _name.value = _assetDetails.value?.n.substr(1);
    _hexName.value = _assetDetails.value?.t.a;
  }, { deep: true });
  const loadAssetList = async () => {
    if (!asset.value) {
      reset();
      return;
    }
    isLoading.value = true;
    const list = await getSortedAssetDetailsList(asset.value);
    if (list.length > 0) {
      _assetDetails.value = list[0];
      _name.value = _assetDetails.value?.n.substr(1);
      _hexName.value = _assetDetails.value?.t.a;
      await doResolve(_assetDetails.value.n).catch((err) => console.error(err));
    }
    isLoading.value = false;
  };
  const resolveImage = async (fingerprint) => {
    const assetCDN = await getAssetCDNImage(fingerprint, MediaSize.HIGH);
    if (assetCDN) {
      return assetCDN;
    }
  };
  const doResolve = async (name) => {
    try {
      const handle = await resolveAdaHandle(networkId$9.value, name);
      if (handle) {
        isResolved.value = true;
        address.value = {
          bech32: handle.address,
          used: true,
          pathInfo: "",
          searchablePath: ""
        };
        const _tmp = await resolveImage(handle.fingerprint);
        if (_tmp) {
          image.value = _tmp;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getHexName = (_adaHandleAsset) => {
    if (!_adaHandleAsset) {
      return void 0;
    }
    return Object.keys(_adaHandleAsset[adaHandle])[0] ?? void 0;
  };
  watch(asset, (newValue) => {
    loadAssetList();
  }, { immediate: true, deep: true });
  return {
    adaHandle: asset,
    isLoadingAdaHandle: isLoading,
    isResolvedAdaHandle: isResolved,
    adaHandleAddress: address,
    adaHandleImage: image,
    adaHandleName: _name,
    adaHandleHexName: _hexName,
    getHexName
  };
};

class PoolDataDB extends Dexie {
  pooldata;
  constructor(networkId) {
    super("eternl-" + networkId + "-pooldata");
    this.version(2).stores({
      pooldata: "pb, ra"
    });
  }
}
const dbMap = networkIdList.reduce((o, n) => {
  o[n] = null;
  return o;
}, {});
const getDB = async (networkId) => {
  let db = dbMap[networkId];
  if (!db) {
    db = new PoolDataDB(networkId);
    dbMap[networkId] = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const bulkPutPoolData = (networkId, list) => {
  return getDB(networkId).then((db) => {
    return db.transaction("rw", [db.pooldata], async (tx) => {
      await db.pooldata.bulkPut(list);
      return true;
    });
  }).catch((error) => {
    return false;
  });
};
const getPoolDataList = (networkId) => {
  return getDB(networkId).then((db) => db.pooldata.orderBy("ra").toArray()).catch((error) => {
    return [];
  });
};
const PoolDataDB$1 = {
  bulkPutPoolData,
  getPoolDataList
};

const doLoadPoolData = "doLoadPoolData";
const onPoolDataUpdated = "onPoolDataUpdated";

const storeId$3 = "poolDataStore";
const poolDataList = ref([]);
const filteredPoolDataList = ref([]);
const groupPoolDataList = ref([]);
const featuredPoolDataList = ref([]);
const avgROS = ref(0);
const medianROS = ref(0);
const numPoolsROS = ref(0);
let _searchValue = "";
let groupCounter = {};
const featuredPoolList = [
  "pool19pyfv4xnln8x4l7auw0n0skk3hd97shun707hrw5d4s553ys74x",
  // CCW (former TITAN #2)
  "pool1qqq6qqa0hpzvumv5p87ynczfmdj557xuwlc3289ke42g72z7f74",
  // [AHL] AHLNET #1 🇸🇪
  // 'pool1qqq6qpcq3tvnqzy7r03dush0qk9vrr88v85d6fj3ws9h5zj0h8w',   // [AHL] AHLNET #2 🇸🇪
  "pool1qqqqpanw9zc0rzh0yp247nzf2s35uvnsm7aaesfl2nnejaev0uc"
  // [TITAN] TITANstaking
  // 'pool19pyfv4xnln8x4l7auw0n0skk3hd97shun707hrw5d4s553ys74x'    // [TITAN] TITANstaking #2
];
const updatePoolData = async () => {
  const dbEntries = await PoolDataDB$1.getPoolDataList(networkId$9.value);
  poolDataList.value.splice(0, poolDataList.value.length, ...dbEntries);
  updateROS();
  updateGroupList();
  updateFilteredPools(_searchValue);
  return true;
};
const getPoolInfo = (poolBech32) => {
  if (!poolBech32) {
    return null;
  }
  return poolDataList.value.find((p) => p.pb === poolBech32) ?? null;
};
const updateROS = () => {
  const localPoolData = poolDataList.value.filter((pool) => pool.stl > 0.1);
  localPoolData.sort((a, b) => b.mr12 - a.mr12);
  const epochParams = checkEpochParams(networkId$9.value);
  if (!epochParams) {
    avgROS.value = 0;
    medianROS.value = 0;
    numPoolsROS.value = 0;
    return;
  }
  let k = Math.min(epochParams.stakePoolTargetNum, localPoolData.length);
  let kHalf = Math.floor(k / 2);
  let _sumROS = 0;
  let _numPools = 0;
  let _medianROS = 0;
  for (let i = 0; i < k; i++) {
    const pool = localPoolData[i];
    if (pool.ma > 0.1) {
      kHalf++;
      continue;
    }
    if (pool.mr12 === 0) {
      kHalf++;
      continue;
    }
    _sumROS += pool.mr12;
    _numPools += 1;
    if (_numPools === kHalf) {
      _medianROS = pool.mr12;
    }
  }
  avgROS.value = _sumROS / _numPools;
  if (_medianROS === 0) {
    _medianROS = avgROS.value;
  }
  medianROS.value = _medianROS;
  numPoolsROS.value = _numPools;
};
const updateGroupList = () => {
  groupCounter = {};
  if (poolDataList.value.length === 0) return;
  groupPoolDataList.value.splice(0, groupPoolDataList.value.length, ...poolDataList.value.filter(poolGroupFilter));
  featuredPoolDataList.value.splice(0, featuredPoolDataList.value.length, ...poolDataList.value.filter(poolFeatureFilter));
};
const poolSearchFilter = (item) => {
  if (_searchValue.length > 2) {
    if (item?.md?.ticker) {
      if (item.md.ticker.toLowerCase().startsWith(_searchValue) || item.md.name?.toLowerCase().includes(_searchValue) || item.md.description?.toLowerCase().includes(_searchValue)) {
        return true;
      }
    }
    return item.pb.includes(_searchValue) || item.ph.includes(_searchValue);
  }
  return true;
};
const poolGroupFilter = (item) => {
  if (item.gn !== null) {
    if (groupCounter.hasOwnProperty(item.gn)) {
      groupCounter[item.gn] += 1;
    } else {
      groupCounter[item.gn] = 1;
    }
    const count = groupCounter[item.gn];
    if (count > 2) {
      return false;
    }
  }
  return true;
};
const poolFeatureFilter = (item) => featuredPoolList.includes(item.pb);
const updateFilteredPools = (searchStr) => {
  _searchValue = searchStr?.toLowerCase() ?? "";
  if (_searchValue.length > 2) {
    const filteredList = poolDataList.value.filter(poolSearchFilter);
    filteredList.sort((a, b) => {
      const tickerA = a.md?.ticker?.toLowerCase() ?? null;
      const tickerB = b.md?.ticker?.toLowerCase() ?? null;
      if (tickerA === _searchValue) {
        return -1;
      }
      if (tickerB === _searchValue) {
        return 1;
      }
      const tickerAStart = tickerA?.startsWith(_searchValue) ?? false;
      const tickerBStart = tickerB?.startsWith(_searchValue) ?? false;
      if (tickerAStart && !tickerBStart) {
        return -1;
      } else if (!tickerAStart && tickerBStart) {
        return 1;
      } else if (tickerAStart && tickerBStart) {
        if (a.ra < b.ra) return -1;
        return 1;
      }
      const tickerAIncludes = tickerA?.includes(_searchValue) ?? false;
      const tickerBIncludes = tickerB?.includes(_searchValue) ?? false;
      if (tickerAIncludes && !tickerBIncludes) {
        return -1;
      } else if (!tickerAIncludes && tickerBIncludes) {
        return 1;
      } else if (tickerAIncludes && tickerBIncludes) {
        if (a.ra < b.ra) return -1;
        return 1;
      }
      const nameA = a.md?.name?.toLowerCase() ?? null;
      const nameB = b.md?.name?.toLowerCase() ?? null;
      if (nameA === _searchValue) return -1;
      if (nameB === _searchValue) return 1;
      const nameAStart = nameA?.startsWith(_searchValue) ?? false;
      const nameBStart = nameB?.startsWith(_searchValue) ?? false;
      if (nameAStart && !nameBStart) {
        return -1;
      } else if (!nameAStart && nameBStart) {
        return 1;
      } else if (nameAStart && nameBStart) {
        if (a.ra < b.ra) return -1;
        return 1;
      }
      const nameAIncludes = nameA?.includes(_searchValue) ?? false;
      const nameBIncludes = nameB?.includes(_searchValue) ?? false;
      if (nameAIncludes && !nameBIncludes) {
        return -1;
      } else if (!nameAIncludes && nameBIncludes) {
        return 1;
      } else if (nameAIncludes && nameBIncludes) {
        if (a.ra < b.ra) return -1;
        return 1;
      }
      if (a.ra < b.ra) return -1;
      return 1;
    });
    filteredPoolDataList.value.splice(0, filteredPoolDataList.value.length, ...filteredList);
  } else {
    filteredPoolDataList.value.splice(0, filteredPoolDataList.value.length, ...poolDataList.value);
  }
  dispatchSignalSync(onPoolDataUpdated);
};
const load = async () => {
  await dispatchSignal(doLoadPoolData);
  if (poolDataList.value.length === 0) {
    await updatePoolData();
  }
};
addSignalListener(doInitApp, storeId$3, load);

const saving$1 = ref(false);
const updateAppAccountSetting = async (appAccount, obj) => {
  saving$1.value = true;
  let success = false;
  if (appAccount) {
    updateIAccountSettingsPartial(appAccount.data.settings, {
      id: appAccount.id,
      networkId: appAccount.data.settings.networkId,
      ...obj
    });
    try {
      success = await saveAccountSettings(appAccount);
    } catch (err) {
      console.error(err);
    }
  }
  saving$1.value = false;
  return success;
};
function useAccountSettings(appAccountRef) {
  const accountData = computed(() => appAccountRef.value?.data ?? null);
  const accountUtxoMap = computed(() => appAccountRef.value?.utxoMap ?? null);
  const accountSyncInfo = computed(() => appAccountRef.value?.syncInfo ?? null);
  const account = computed(() => accountData.value?.account ?? null);
  const accountSettings = computed(() => accountData.value?.settings ?? null);
  const accountPath = computed(() => getDerivationPath(account.value?.path ?? []));
  const accountNetworkId = computed(() => accountData.value?.state.networkId ?? "mainnet");
  const accountSyncState = computed(() => accountSyncInfo.value?.state ?? SyncState.idle);
  const isAccountSyncing = computed(() => accountSyncState.value === SyncState.syncing || accountSyncState.value === SyncState.initializing || accountSyncState.value === SyncState.queued);
  const _adahandle = computed(() => accountSettings.value?.adahandle);
  const isAumEnabled = computed(() => accountSettings.value?.aum.enabled ?? false);
  const isAwEnabled = computed(() => accountSettings.value?.aw.enabled ?? false);
  const isCollateralEnabled = computed(() => accountSettings.value?.collateral.enabled ?? false);
  const useEternlCollateral = computed(() => accountSettings.value?.collateral.eternl !== false);
  const isTfEnabled = computed(() => accountSettings.value?.tf.enabled ?? false);
  const tfBundleSize = computed(() => {
    if (accountSettings.value) {
      return accountSettings.value.tf.bundleSize;
    }
    return 0;
  });
  const isSamEnabled = computed(() => accountSettings.value?.sam.enabled ?? true);
  const samAddr = computed(() => {
    if (accountSettings.value) {
      return accountSettings.value.sam.addr;
    }
    return "";
  });
  const isManualSyncEnabled = computed(() => accountSettings.value?.manualSync.enabled ?? false);
  const isHistorySyncEnabled = computed(() => accountSettings.value?.historySync.enabled ?? false);
  const isSendAllEnabled = computed(
    () => true
    /* accountSettings.value?.sendAll.enabled        ?? false */
  );
  const isFavorite = computed(() => accountSettings.value?.favorite?.enabled ?? false);
  const hasCatalystData = computed(() => accountSettings.value?.catalyst_cip15.encryptedKey && (accountSettings.value.catalyst_cip15.minVersion ?? 0) >= 10);
  const catalystData = computed(() => accountSettings.value?.catalyst_cip15.encryptedKey ?? null);
  const accountBalance = computed(() => accountData.value?.balance ?? null);
  const accountTotal = computed(() => accountBalance.value?.total ?? "0");
  const accountLovelace = computed(() => accountBalance.value?.coin ?? "0");
  const accountRewards = computed(() => accountBalance.value?.rewards ?? "0");
  const accountAssets = computed(() => accountBalance.value?.multiasset ?? null);
  const adaHandleList = computed(() => {
    const multiasset = accountAssets.value;
    if (!multiasset) {
      return void 0;
    }
    const policy = multiasset[adaHandle];
    if (!policy) {
      return void 0;
    }
    const keys = Object.keys(policy);
    keys.sort((a, b) => {
      if (a.length > b.length) return 1;
      if (a.length < b.length) return -1;
      return a.localeCompare(b, "en-US");
    });
    const list = [];
    for (const key in policy) {
      list.push({ [adaHandle]: { [key]: policy[key] } });
    }
    return list;
  });
  const _selectedAdaHandle = computed(() => {
    const _adaHandleList = adaHandleList.value;
    if (_adahandle.value === null) {
      return void 0;
    }
    if (!_adaHandleList) {
      return void 0;
    }
    if (_adaHandleList.length === 0) {
      return void 0;
    }
    let handle = _adaHandleList[0];
    for (const _handle of _adaHandleList) {
      if (Object.keys(_handle[adaHandle])[0] === _adahandle.value) {
        handle = _handle;
        break;
      }
    }
    return handle ?? void 0;
  });
  computed(() => {
    if (!_selectedAdaHandle.value) {
      return void 0;
    }
    return Object.keys(_selectedAdaHandle.value[adaHandle])[0] ?? void 0;
  });
  const rewardInfo = computed(() => accountData.value?.rewardInfoList[0] ?? null);
  const isRegistered = computed(() => rewardInfo.value?.registered ?? false);
  const hasStakeHistory = computed(() => (rewardInfo.value?.rewardList.length ?? 0) > 0);
  const stakeKey = computed(() => !!accountData.value && accountData.value.keys.stake.length > 0 ? accountData.value.keys.stake[0] : null);
  const stakeKeyPath = computed(() => stakeKey.value?.path ? getDerivationPath(stakeKey.value.path) : "");
  const hasUTxOs = computed(() => compare(accountLovelace.value, ">", 0));
  const hasRewards = computed(() => compare(accountRewards.value, ">", 0));
  const updateSAMAddress = (addr) => updateAppAccountSetting(appAccountRef.value, { sam: { addr } });
  const free = [];
  const changeAddress = computed(() => {
    if (!accountData.value) {
      return null;
    }
    if (accountData.value.keys.payment.length === 0) {
      return null;
    }
    !!samAddr.value || isSamEnabled.value;
    freeCSLObjects(free);
    try {
      return getChangeAddress(accountData.value, false, false, false, false, free);
    } catch (err) {
      if (err === AccountError.wrongCustomAddress) {
        updateSAMAddress(null);
      }
    }
    return null;
  });
  const receiveAddress = computed(() => {
    if (!accountData.value) {
      return null;
    }
    if (accountData.value.keys.payment.length === 0) {
      return null;
    }
    !!samAddr.value || isSamEnabled.value;
    try {
      return getReceiveAddress(accountData.value);
    } catch (err) {
      if (err === AccountError.wrongCustomAddress) {
        updateSAMAddress(null);
      }
    }
    return null;
  });
  const forcedUnusedAddress = computed(() => {
    if (!accountData.value) {
      return null;
    }
    if (accountData.value.keys.payment.length === 0) {
      return null;
    }
    !!samAddr.value || isSamEnabled.value;
    try {
      return getForcedUnusedAddress(accountData.value);
    } catch (err) {
    }
    return null;
  });
  const stakeAddress = computed(() => {
    if (!accountData.value) {
      return null;
    }
    if (accountData.value.keys.stake.length === 0) {
      return null;
    }
    !!samAddr.value || isSamEnabled.value;
    return getStakeAddress(accountData.value);
  });
  const _adaHandle = useAdaHandle(_selectedAdaHandle);
  const stakedPool = computed(() => {
    if (!rewardInfo.value) {
      return null;
    }
    if (!poolDataList.value) {
      return null;
    }
    if (!rewardInfo.value.registered) {
      return null;
    }
    const delegationList = rewardInfo.value?.delegationList;
    if (!delegationList) {
      return null;
    }
    const delegationListLength = delegationList.length - 1;
    const latestDelegation = delegationList[delegationListLength];
    return poolDataList.value.find((pool) => pool.pb === latestDelegation?.poolHash?.bech32);
  });
  const rewardHistory = computed(() => {
    const items = [];
    const rewardList = rewardInfo.value?.rewardList;
    if (!rewardList) {
      return items;
    }
    for (const rewards of rewardList) {
      const poolItem = JSON.parse(JSON.stringify(getPoolInfo(rewards.poolHash.bech32) ?? {}));
      poolItem.epoch = rewards.epochEarned;
      poolItem.amount = rewards.amount;
      poolItem.ada = divide(rewards.amount, getNetworkDecimals(accountNetworkId.value));
      items.push(poolItem);
    }
    items.pop();
    items.reverse();
    return items;
  });
  const isNameSet = computed(() => {
    const data = accountData.value;
    if (!!data && isMultiSigAccountPath(data?.account)) {
      return true;
    } else if (data?.settings.name) {
      return true;
    }
    return false;
  });
  const name = computed(() => {
    const data = accountData.value;
    if (!!data && isMultiSigAccountPath(data?.account)) {
      return "Multi-Sig";
    } else if (data?.settings.name) {
      return data?.settings.name;
    }
    return "Account #" + (data?.keys.index ?? "0");
  });
  const nameShort = computed(() => {
    const data = accountData.value;
    return "#" + (data?.keys.index ?? "0");
  });
  return {
    saving: saving$1,
    data: accountData,
    utxoMap: accountUtxoMap,
    rewardInfo,
    isRegistered,
    hasStakeHistory,
    stakeKey,
    stakeKeyPath,
    stakedPool,
    rewardHistory,
    accountNetworkId,
    path: accountPath,
    isSyncing: isAccountSyncing,
    accountSyncInfo,
    isAumEnabled,
    isAwEnabled,
    isCollateralEnabled,
    useEternlCollateral,
    isTfEnabled,
    tfBundleSize,
    isSamEnabled,
    samAddr,
    isManualSyncEnabled,
    isHistorySyncEnabled,
    isSendAllEnabled,
    isFavorite,
    hasCatalystData,
    catalystData,
    isNameSet,
    name,
    nameShort,
    balance: accountBalance,
    total: accountTotal,
    lovelace: accountLovelace,
    rewards: accountRewards,
    assets: accountAssets,
    adaHandle: _adaHandle,
    adaHandleList,
    hasUTxOs,
    hasRewards,
    changeAddress,
    receiveAddress,
    forcedUnusedAddress,
    stakeAddress,
    toggleAUM: () => updateAppAccountSetting(appAccountRef.value, { aum: { enabled: !isAumEnabled.value } }),
    toggleAW: () => updateAppAccountSetting(appAccountRef.value, { aw: { enabled: !isAwEnabled.value } }),
    toggleCollateral: () => updateAppAccountSetting(appAccountRef.value, { collateral: { enabled: !isCollateralEnabled.value } }),
    toggleEternlCollateral: () => updateAppAccountSetting(appAccountRef.value, { collateral: { eternl: !useEternlCollateral.value } }),
    toggleManualSync: () => updateAppAccountSetting(appAccountRef.value, { manualSync: { enabled: !isManualSyncEnabled.value } }),
    toggleHistorySync: () => updateAppAccountSetting(appAccountRef.value, { historySync: { enabled: !isHistorySyncEnabled.value } }),
    enableHistorySync: () => updateAppAccountSetting(appAccountRef.value, { historySync: { enabled: true } }),
    disableHistorySync: () => updateAppAccountSetting(appAccountRef.value, { historySync: { enabled: false } }),
    toggleSendAll: () => updateAppAccountSetting(appAccountRef.value, { sendAll: { enabled: !isSendAllEnabled.value } }),
    toggleFavorite: () => updateAppAccountSetting(appAccountRef.value, { favorite: { enabled: !isFavorite.value } }),
    toggleTF: () => updateAppAccountSetting(appAccountRef.value, { tf: { enabled: !isTfEnabled.value } }),
    toggleSAM: () => updateAppAccountSetting(appAccountRef.value, { sam: { enabled: !isSamEnabled.value } }),
    updateTFBundleSize: (bundleSize) => updateAppAccountSetting(appAccountRef.value, { tf: { enabled: true, bundleSize } }),
    updateSAMAddress,
    updateAccountName: (name2) => updateAppAccountSetting(appAccountRef.value, { name: name2 }),
    updateSelectedAdaHandle: (hexName) => updateAppAccountSetting(appAccountRef.value, { adahandle: hexName }),
    setCatalystCIP15Key: (key) => updateAppAccountSetting(appAccountRef.value, { catalyst_cip15: { encryptedKey: key, minVersion: 10 } })
  };
}

const saving = ref(false);
const updateAppWalletSetting = async (appWallet, obj) => {
  saving.value = true;
  let success = false;
  if (appWallet) {
    updateIWalletSettingsPartial(appWallet.data.settings, {
      id: appWallet.id,
      networkId: appWallet.data.settings.networkId,
      ...obj
    });
    try {
      success = await saveWalletSettings(appWallet);
      dispatchSignalSync(onWalletSettingsUpdated, appWallet.id);
    } catch (err) {
      console.error(err);
    }
  }
  saving.value = false;
  return success;
};
const _walletPlate = createIUIPlate();
const _walletBackground = {
  policy: null,
  name: null,
  opacity: 100
};
function useWalletSettings(appWalletRef) {
  const walletData = computed(() => appWalletRef.value?.data ?? null);
  const walletSyncInfo = computed(() => appWalletRef.value?.syncInfo ?? null);
  const walletSettings = computed(() => walletData.value?.settings ?? null);
  const walletAccountId = computed(() => {
    if (!walletData.value) {
      return null;
    }
    const accountId = getSelectedWalletAccountId(networkId$9.value, walletData.value?.wallet.id ?? "notset").value;
    if (accountId && accountId.length > 6) {
      return accountId;
    }
    return walletData.value?.wallet.accountList?.[0].id ?? null;
  });
  const walletName = computed(() => walletSettings.value?.name ?? "Wallet");
  const walletGroupName = computed(() => walletSettings.value?.groupName ?? DEFAULT_WALLET_GROUP_NAME);
  const walletDescription = computed(() => walletSettings.value?.description ?? "");
  const walletPlate = computed(() => walletSettings.value?.plate ?? _walletPlate);
  const walletBackground = computed(() => walletSettings.value?.background ?? _walletBackground);
  const enabledBiometrics = computed(() => walletSettings.value?.useBiometrics ?? false);
  const walletBalance = computed(() => walletData.value?.balance ?? null);
  const walletSyncState = computed(() => walletSyncInfo.value?.state ?? SyncState.idle);
  const isWalletSyncing = computed(() => walletSyncState.value === SyncState.syncing || walletSyncState.value === SyncState.initializing || walletSyncState.value === SyncState.queued);
  return {
    saving,
    data: walletData,
    name: walletName,
    groupName: walletGroupName,
    description: walletDescription,
    plate: walletPlate,
    background: walletBackground,
    balance: walletBalance,
    isSyncing: isWalletSyncing,
    isWalletSyncing,
    walletSyncInfo,
    walletAccountId,
    enabledBiometrics,
    // setAUM:                   (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { aum:            { enabled } }),
    // setAW:                    (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { aw:             { enabled } }),
    // setCollateral:            (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { collateral:     { enabled } }),
    // setManualSync:            (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { manualSync:     { enabled } }),
    // setHistorySync:           (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { historySync:    { enabled } }),
    // setSendAll:               (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { sendAll:        { enabled } }),
    // setTF:                    (enabled: boolean, bundleSize: number)  => updateSettingForAllAppAccounts(appWalletRef.value, { tf:             { enabled, bundleSize } }),
    // setSAM:                   (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { sam:            { enabled } }),
    // setUseBiometrics:         (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { useBio:         { enabled } }),
    updateName: (payload) => updateAppWalletSetting(appWalletRef.value, { name: payload.walletName, groupName: payload.groupName ?? null, description: payload.description ?? null }),
    setUseBiometrics: (enable) => updateAppWalletSetting(appWalletRef.value, { useBiometrics: enable, name: "test name" }),
    // updateBackground:         (bg: IUIBackground)  => updateAppWalletSetting(appWalletRef.value, { background: bg }),
    updatePlate: (plate) => updateAppWalletSetting(appWalletRef.value, { plate }),
    updateSpendingPassword: async (oldPassword, newPassword) => {
      saving.value = true;
      let success = false;
      if (appWalletRef.value) {
        success = await updateSpendingPassword(appWalletRef.value, oldPassword, newPassword);
      }
      saving.value = false;
      return success;
    },
    updateRootKey: async (mnemonic, newPassword) => {
      saving.value = true;
      let success = false;
      if (appWalletRef.value) {
        success = await setSpendingPassword(appWalletRef.value, mnemonic, newPassword);
      }
      saving.value = false;
      return success;
    },
    getWalletNameList
  };
}

function useAppAccountBalances(appAccountRef) {
  const balancesRef = ref(null);
  const updateRefs = () => {
    if (appAccountRef.value) {
      balancesRef.value = getIAccountBalances(appAccountRef.value.id);
    } else {
      balancesRef.value = null;
    }
  };
  watch(appAccountRef, () => {
    updateRefs();
  }, { immediate: true });
  return balancesRef;
}

const appWallet = useAppWallet(buildWalletId);
const walletSettings = useWalletSettings(appWallet);
const walletData = walletSettings.data;
const appAccount = useAppAccount(appWallet, buildAccountId);
const appAccountBalances = useAppAccountBalances(appAccount);
const accountSettings$1 = useAccountSettings(appAccount);
const accountData$1 = accountSettings$1.data;
const accountBalance = computed(() => accountData$1.value?.balance);
const utxoMap = accountSettings$1.utxoMap;
function useBuildAccount() {
  return {
    buildAccountId,
    buildWalletId,
    isBuildAccountSet,
    buildWallet: appWallet,
    buildAccount: appAccount,
    walletData,
    walletSettings,
    accountData: accountData$1,
    accountSettings: accountSettings$1,
    accountBalance,
    accountBalances: appAccountBalances,
    utxoMap
  };
}

const doShowUiNotification = "doShowUiNotification";

const doMonsterAwake = "doMonsterAwake";
const doMonsterWaiting = "doMonsterWaiting";
const doMonsterHappy = "doMonsterHappy";
const doMonsterAngry = "doMonsterAngry";

let _notifications;
const eternlSwapTimeout = 1e4;
const {
  accountData,
  buildAccount,
  accountSettings,
  accountBalances
} = useBuildAccount();
const doLog$1 = false;
const isLoadingOpenOrders = ref(false);
const isWaitingForEstimate = ref(false);
const isWaitingForMarkSubmit = ref(false);
const isWaitingForBuild = ref(false);
const fetchSwapConfig = async (networkId2) => {
  if (networkId2 !== "mainnet") {
    return void 0;
  }
  const url = `${getSwapURL()}/${networkId2}/v2/swap/config`;
  try {
    const res = await api.get(url, void 0, eternlSwapTimeout);
    if (res?.data) {
      if (doLog$1) ;
      return res.data;
    }
  } catch (err) {
    handleError(err, "Could not fetch swap config.", false);
  }
  return void 0;
};
const fetchTokenList = async (networkId2) => {
  if (networkId2 !== "mainnet") {
    return [];
  }
  const url = `${getSwapURL()}/${networkId2}/v2/swap/tokenlist`;
  try {
    const res = await api.get(url, void 0, eternlSwapTimeout);
    if (res?.data && Array.isArray(res.data)) {
      if (doLog$1) ;
      addToAssetFingerprintMap(res.data);
      return res.data;
    }
  } catch (err) {
    console.error(err);
    console.warn("Error: Could not fetch token list.", err?.responseText ?? err);
  }
  return [];
};
const fetchSwapEstimate = async (networkId2, swapData) => {
  if (networkId2 !== "mainnet") {
    return null;
  }
  const url = `${getSwapURL()}/${networkId2}/v2/swap/estimate`;
  try {
    isWaitingForEstimate.value = true;
    dispatchSignal(doMonsterWaiting);
    const res = await api.post(url, swapData, eternlSwapTimeout + 2e3);
    isWaitingForEstimate.value = false;
    if (res?.data) {
      if (doLog$1) ;
      return res.data;
    }
  } catch (err) {
    isWaitingForEstimate.value = false;
    handleError(err, "Could not fetch swap estimate.");
  }
  return null;
};
const fetchSwapTransaction = async (networkId2, swapData) => {
  if (isWaitingForBuild.value) {
    const msg = "Already building swap transaction.";
    console.warn(msg);
    _notifications?.showWarning(msg);
    return null;
  }
  if (networkId2 !== "mainnet") {
    return null;
  }
  const url = `${getSwapURL()}/${networkId2}/v2/swap/build`;
  try {
    isWaitingForBuild.value = true;
    const res = await api.post(url, swapData, eternlSwapTimeout + 2e3);
    console.log("fetchSwapTransaction response:", res);
    isWaitingForBuild.value = false;
    if (res?.data) {
      if (doLog$1) ;
      return res.data;
    }
  } catch (req) {
    isWaitingForBuild.value = false;
    console.error(req);
    console.warn("Error: Could not fetch swap transaction.", req);
    const res = req.response || req.responseText || "";
    if (res !== "") {
      try {
        const errData = JSON.parse(res);
        const msg = errData?.msg ?? errData;
        _notifications?.showError("Could not fetch swap transaction: " + msg);
        dispatchSignal(doMonsterAngry);
        return null;
      } catch (e) {
        console.error("Error parsing swap transaction error response:", e);
      }
    }
  }
  return null;
};
const fetchOpenOrders = async (networkId2, addressList) => {
  if (!addressList || addressList.length === 0) {
    return [];
  }
  if (networkId2 !== "mainnet") {
    return [];
  }
  const url = `${getSwapURL()}/${networkId2}/v2/swap/pending`;
  try {
    isLoadingOpenOrders.value = true;
    const res = await api.post(url, { addressList }, eternlSwapTimeout);
    isLoadingOpenOrders.value = false;
    if (res?.data) {
      if (doLog$1) ;
      return res.data;
    }
  } catch (err) {
    isLoadingOpenOrders.value = false;
    handleError(err, "Could not fetch open orders.");
  }
  return [];
};
const handleError = (err, prefix, showNotification = true) => {
  console.error(err);
  console.warn("Error: " + prefix, err);
  if (!showNotification) {
    return;
  }
  const msg = err?.data?.msg ?? err?.data ?? err?.msg ?? err;
  if (typeof msg === "object") {
    _notifications?.showError(prefix);
    return;
  }
  _notifications?.showError(prefix + msg);
};
const DefaultADAToken = {
  "ticker": "ADA",
  "name": "Cardano",
  "policyId": LOVELACE,
  "hexName": "",
  "decimals": 6
  // TODO: use network decimals
};
const inputToken = ref(DefaultADAToken);
const outputToken = ref();
const inputAmount = ref();
const outputAmount = ref();
const openOrders = ref([]);
const isTfEnabled = accountSettings.isTfEnabled;
const inputAmountFull = computed(() => {
  return multiply(inputAmount.value ?? 0, Math.pow(10, inputToken.value?.decimals ?? 0));
});
const outputAmountFull = computed(() => {
  return multiply(outputAmount.value ?? 0, Math.pow(10, outputToken.value?.decimals ?? 0));
});
const _lockedAvailable = computed(() => {
  if (isTfEnabled.value) {
    let total = subtract(
      accountBalances.value?.lockedAvailableTF.total ?? "0",
      accountBalances.value?.txFees.total ?? "0"
    );
    total = subtract(total, accountBalances.value?.locked.total ?? "0");
    return subtract(total, 2e7);
  } else {
    let total = subtract(
      accountBalances.value?.lockedAvailable.total ?? "0",
      accountBalances.value?.txFees.total ?? "0"
    );
    total = subtract(total, accountBalances.value?.locked.total ?? "0");
    return subtract(total, 2e7);
  }
});
const inputTokenBalance = computed(() => {
  if (inputToken.value.policyId === DefaultADAToken.policyId) {
    return _lockedAvailable.value;
  }
  return accountData.value?.balance?.multiasset?.[inputToken.value?.policyId ?? ""]?.[inputToken.value?.hexName ?? ""] ?? "0";
});
const outputTokenBalance = computed(() => {
  if (outputToken.value?.policyId === DefaultADAToken.policyId) {
    return _lockedAvailable.value;
  }
  return accountData.value?.balance?.multiasset?.[outputToken.value?.policyId ?? ""]?.[outputToken.value?.hexName ?? ""] ?? "0";
});
const inputType = ref("in");
const swapEstimate = ref();
const builtSwap = ref();
const swapConfig = ref();
const tokenList = ref([]);
ref([]);
const slippage = getSlippage();
const blockList = getDEXBlocklist();
const disabledAggregatorList = getAggBlocklist();
let lastUpdated = ref(0);
const useMonsterSwapAPI = () => {
  const cancelOrder = async (networkId2, cancelTxs, aggregator) => {
    const url = `${getSwapURL()}/${networkId2}/v2/swap/cancel`;
    if (!buildAccount.value) {
      return null;
    }
    let collateral = getUtxoCborList(buildAccount.value.utxoMap.collateral)[0];
    const changeAddress = cip30_getChangeAddress(buildAccount.value);
    if (!buildAccount) {
      return null;
    }
    if (!changeAddress) {
      return null;
    }
    if (!collateral && aggregator !== "SteelSwap") {
      return null;
    }
    let cancelOrders = {
      change_address: changeAddress,
      collateral_utxo: collateral,
      ttl: 300,
      tx_list: cancelTxs,
      utxos: await cip30_getUtxos(buildAccount.value, null, cip30_getPaginate([])),
      aggregator,
      order_id: aggregator === "DexHunter" ? cancelTxs[0].order_id : void 0
    };
    const res = await api.post(url, cancelOrders).catch((err) => {
      handleError(err, "Could not cancel order.");
    });
    if (res?.data) {
      let _preparedTxs = [];
      for (const _txCbor of res.data) {
        _preparedTxs.push({ cbor: _txCbor, partialSign: false });
      }
      await parseTxSignRequest(buildAccount.value, "cc", _preparedTxs, "monsterswap-cancel");
    }
    return null;
  };
  return {
    fetchSwapConfig,
    fetchTokenList,
    fetchSwapEstimate,
    fetchSwapTransaction,
    fetchOpenOrders,
    cancelOrder,
    isLoadingOpenOrders
  };
};
const useMonsterSwapData = () => {
  const showMessage = async (msg) => {
    await dispatchSignal(doShowUiNotification, msg);
  };
  _notifications = {
    showError: (msg) => {
      showMessage({
        type: "error",
        message: msg
      });
    },
    showWarning: (msg) => {
      showMessage({
        type: "warning",
        message: msg
      });
    }
  };
  const {
    fetchSwapEstimate: fetchSwapEstimate2,
    fetchSwapTransaction: fetchSwapTransaction2,
    fetchOpenOrders: fetchOpenOrders2
  } = useMonsterSwapAPI();
  const resetSwapInput = () => {
    inputToken.value = DefaultADAToken;
    outputToken.value = void 0;
    inputAmount.value = void 0;
    outputAmount.value = void 0;
    swapEstimate.value = void 0;
    dispatchSignal(doMonsterAngry);
  };
  const lastEstimateExec = ref(0);
  const tryUpdateEstimate = useDebounceFn(async () => {
    if (!inputToken.value || !outputToken.value) {
      return null;
    }
    if (isGreaterThanZero(inputAmount.value ?? 0)) {
      if (Date.now() - lastEstimateExec.value < 500) {
        return null;
      }
      lastEstimateExec.value = Date.now();
      return updateEstimate();
    } else {
      swapEstimate.value = void 0;
      outputAmount.value = void 0;
      lastUpdated.value = Date.now();
    }
    return null;
  }, 300);
  const updateEstimate = async () => {
    try {
      const _inputToken = JSON.parse(JSON.stringify(inputToken.value));
      const _outputToken = JSON.parse(JSON.stringify(outputToken.value));
      const _inputAmount = JSON.parse(JSON.stringify(inputAmount.value));
      const res = await fetchSwapEstimate2(networkId$9.value, {
        quantity: inputType.value === "in" ? inputAmountFull.value : outputAmountFull.value,
        token_in: inputToken.value?.policyId + inputToken.value?.hexName,
        token_out: outputToken.value?.policyId + outputToken.value?.hexName,
        type: inputType.value,
        slippage: 0,
        discountAssets: [],
        blocklist: blockList.value,
        aggBlocklist: disabledAggregatorList.value
      });
      if (!res || res.aggregator === "NONE") {
        swapEstimate.value = void 0;
        outputAmount.value = void 0;
        lastUpdated.value = Date.now();
        return null;
      }
      if (_inputToken.ticker !== inputToken.value.ticker || _outputToken.ticker !== outputToken.value?.ticker || _inputAmount !== inputAmount.value) {
        console.error("Failed");
        return null;
      }
      swapEstimate.value = res;
      lastUpdated.value = Date.now();
      if (inputType.value === "in") {
        outputAmount.value = Number(divide(res?.quantity_out ?? 0, Math.pow(10, outputToken.value?.decimals ?? 0)));
      } else {
        inputAmount.value = Number(divide(res?.quantity_in ?? 0, Math.pow(10, inputToken.value?.decimals ?? 0)));
      }
      dispatchSignal(doMonsterAwake);
      return res;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const buildSwap = async () => {
    const receiveAddress = accountSettings.receiveAddress.value?.bech32;
    const changeAddress = accountSettings.changeAddress.value?.addr?.bech32;
    if (!receiveAddress) {
      return null;
    }
    if (!changeAddress) {
      return null;
    }
    if (!swapEstimate.value) {
      return null;
    }
    if (!outputToken.value) {
      return null;
    }
    if (!buildAccount.value) {
      return null;
    }
    const res = await fetchSwapTransaction2(networkId$9.value, {
      address: receiveAddress,
      aggregator: swapEstimate.value.aggregator,
      change_address: changeAddress,
      quantity: inputType.value === "in" ? inputAmountFull.value : outputAmountFull.value,
      slippage: Number(slippage.value),
      //default: 3%
      token_in: inputToken.value.policyId + inputToken.value.hexName,
      token_out: outputToken.value.policyId + outputToken.value.hexName,
      ttl: 900,
      blocklist: blockList.value,
      type: inputType.value,
      utxos: await cip30_getUtxos(buildAccount.value, null, cip30_getPaginate([])),
      uuid: swapEstimate.value.uuid
    });
    if (!res) {
      return null;
    }
    await dispatchSignal(doMonsterHappy);
    builtSwap.value = res;
    await parseTxSignRequest(buildAccount.value, "cc", [{ cbor: res.tx_cbor, partialSign: res.partial_sign }], "monsterswap", swapEstimate.value.uuid);
    return res;
  };
  const getOpenOrders = async (_selectedAccountId) => {
    if (!buildAccount.value) {
      return [];
    }
    const addrCborList = cip30_getUsedAddresses(buildAccount.value, { page: 0, limit: 9999 });
    if (!addrCborList) {
      return [];
    }
    openOrders.value = await fetchOpenOrders2(networkId$9.value, addrCborList);
    if (_selectedAccountId !== accountData.value?.account.id) {
      return [];
    }
    return openOrders.value;
  };
  const markAsSubmitted = async (networkId2, swapData) => {
    if (networkId2 !== "mainnet") {
      return null;
    }
    const url = `${getSwapURL()}/${networkId2}/v2/swap/mark-submitted`;
    try {
      isWaitingForMarkSubmit.value = true;
      const res = await api.post(url, swapData, eternlSwapTimeout + 2e3);
      isWaitingForMarkSubmit.value = false;
      if (res?.data) {
        if (doLog$1) ;
        return res.data;
      }
    } catch (err) {
      isWaitingForEstimate.value = false;
      console.warn("Error: Could not mark as submitted.", err);
      const msg = err?.data?.msg ?? err?.data ?? err?.msg ?? err;
      _notifications?.showError(msg);
    }
    return null;
  };
  const toggleProtocolOnBlocklist = (protocol) => {
    if (blockList.value.includes(protocol)) {
      const protocolData = swapConfig.value?.DEXs.find((_protocol) => _protocol.label === protocol);
      if (protocolData) {
        for (const version of protocolData.versions) {
          blockList.value = blockList.value.filter((_version) => _version !== version.label);
        }
      }
      blockList.value = blockList.value.filter((_protocol) => _protocol !== protocol);
    } else {
      blockList.value.push(protocol);
    }
    setDEXBlocklist(blockList.value);
    return true;
  };
  const toggleAggregatorOnBlocklist = (aggregator) => {
    if (disabledAggregatorList.value.includes(aggregator)) {
      disabledAggregatorList.value = disabledAggregatorList.value.filter((_aggregator) => _aggregator !== aggregator);
    } else {
      disabledAggregatorList.value.push(aggregator);
    }
    setAggBlocklist(disabledAggregatorList.value);
    return true;
  };
  const switchInputAndOutput = async () => {
    inputAmount.value = 0;
    outputAmount.value = 0;
    if (!inputToken.value || !outputToken.value) return;
    let _inputToken = inputToken.value;
    let _outputToken = outputToken.value;
    inputToken.value = _outputToken;
    outputToken.value = _inputToken;
  };
  return {
    slippage,
    inputToken,
    outputToken,
    inputAmount,
    outputAmount,
    tokenList,
    swapEstimate,
    builtSwap,
    inputType,
    lastUpdated,
    swapConfig,
    blockList,
    toggleProtocolOnBlocklist,
    disabledAggregatorList,
    toggleAggregatorOnBlocklist,
    inputTokenBalance,
    outputTokenBalance,
    switchInputAndOutput,
    DefaultADAToken,
    getOpenOrders,
    openOrders,
    isLoadingOpenOrders,
    resetSwapInput,
    tryUpdateEstimate,
    isWaitingForEstimate,
    isWaitingForBuild,
    buildSwap,
    spendableLovelace: _lockedAvailable,
    markAsSubmitted
  };
};

const submitTx = async (networkId, txCbor, tx) => {
  try {
    const uuid = Array.isArray(tx) ? tx[0].trackingUuid : tx.trackingUuid;
    const resCode = await sendTransaction(networkId, txCbor, "cc", uuid);
    if (resCode >= 200 && resCode <= 299) {
      const txList = Array.isArray(tx) ? [...tx] : [tx];
      await dispatchSignal(doProcessSubmittedTxList, [...txList], []);
      await dispatchSignal(onTxSubmitted, txList);
      return {
        status: resCode
      };
    } else {
      return {
        status: resCode,
        error: ErrorSubmitTx.failed
      };
    }
  } catch (err) {
    console.error("submitTx:", err);
    if (typeof err === "object") {
      const data = err?.data;
      let okList = [];
      let failedList = [];
      if (data && data.okList && Array.isArray(data.okList)) {
        if (Array.isArray(tx)) {
          okList = tx.filter((t) => data.okList.includes(t.hash));
        } else if (data.okList.includes(tx.hash)) {
          okList = [tx];
        }
      }
      if (data && data.failedList && Array.isArray(data.failedList)) {
        if (Array.isArray(tx)) {
          failedList = tx.filter((t) => data.failedList.includes(t.hash));
        } else if (data.failedList.includes(tx.hash)) {
          failedList = [tx];
        }
      }
      await dispatchSignal(doProcessSubmittedTxList, okList, failedList);
    }
    return {
      error: ErrorSubmitTx.failed + "." + (typeof err === "string" ? err : err?.errorMsg ?? JSON.stringify(err)),
      errorList: err?.errors
    };
  }
};
const sendTransaction = async (networkId, serializedTx, type, trackingUuid) => {
  let url = "/" + networkId + "/v1/wallet/send/tx";
  let payload;
  let customApiURL = getSubmitApiEndpoint(networkId).value;
  if (customApiURL !== DEFAULT_ETERNL_ENDPOINT) {
    if (typeof serializedTx === "string") {
      serializedTx = [serializedTx];
    }
    if (!customApiURL) {
      throw "No custom submit API URL set.";
    } else if (!customApiURL.startsWith("http")) {
      throw "Wrong format; custom submit API URL (must start with http).";
    }
    const okList = [];
    const failedList = [];
    const errors = [];
    for (const tx of serializedTx) {
      const txHash = getTransactionHashFromCbor(tx);
      if (!txHash) {
        throw "Could not get tx hash from CBOR.";
      }
      try {
        let res = await api.postCbor(customApiURL, tx);
        const resCode = res.status;
        if (resCode >= 200 && resCode <= 299) {
          okList.push(txHash);
        } else {
          failedList.push(txHash);
          let data = { status: resCode };
          try {
            data.error = JSON.parse(res.responseText);
          } catch (e) {
            data.error = res.responseText;
          }
          errors.push({ message: "Failed to submit tx: " + txHash, data: res.data, code: res.status });
        }
      } catch (req) {
        failedList.push(txHash);
        if (req?.response && (req.responseType === "" || req.responseType === "text")) {
          let data = { status: req.status };
          try {
            data.error = JSON.parse(req.responseText);
          } catch (e) {
            data.error = req.responseText;
          }
          errors.push({ message: "Failed to submit tx: " + txHash, data });
        } else {
          errors.push({ message: "Failed to submit tx: " + txHash, data: "Could not connect to custom API endpoint. Please make sure your custom endpoint has set the correct CORS header." });
        }
      }
    }
    let str = "";
    if (failedList.length > 0) {
      if (okList && okList.length > 0) {
        str += "\nsubmitted:\n";
        for (const txHash of okList) {
          str += txHash + "\n";
        }
        str += "\n";
      }
      if (failedList && failedList.length > 0) {
        str += "\n";
        str += "\n";
        for (let i = 0; i < failedList.length; i++) {
          if (errors && i < errors.length) {
            const txError = errors[i];
            str += txError.message + "\n";
            if (txError.data) {
              str += "Data: " + JSON.stringify(txError.data) + "\n";
            }
          }
        }
      }
      throw {
        errorMsg: str,
        errors,
        data: { okList, failedList }
      };
    }
    return 200;
  } else {
    payload = {
      txHash: serializedTx,
      type
    };
    try {
      let res = await api.post(url, payload);
      if (res.status >= 200 && res.status <= 299) {
        if (trackingUuid) {
          const { markAsSubmitted } = useMonsterSwapData();
          if ("okList" in res.data && Array.isArray(res.data.okList)) {
            await markAsSubmitted(networkId, {
              buildRequestUuid: trackingUuid,
              transactionId: res.data.okList[0]
            });
          }
        }
      }
      return res.status;
    } catch (req) {
      let res;
      try {
        res = JSON.parse(req.responseText);
      } catch (e) {
        res = req.responseText;
      }
      if (typeof res === "object" && res?.data) {
        const data = res.data ?? {};
        let str = "";
        const okList = data.okList;
        const failedList = data.failedList;
        const errors = data.errors;
        if (okList && okList.length > 0) {
          str += "\nsubmitted:\n";
          for (const txHash of okList) {
            str += txHash + "\n";
          }
          str += "\n";
        }
        if (failedList && failedList.length > 0) {
          for (let i = failedList.length - 1; i >= 0; i--) {
            try {
              const txHash = getTransactionHashFromCbor(failedList[i]);
              if (txHash) {
                failedList[i] = txHash;
              }
            } catch (e) {
            }
          }
          str += "failed:\n";
          for (let i = 0; i < failedList.length; i++) {
            const txHash = failedList[i];
            str += txHash + "\n";
            if (errors && i < errors.length) {
              const txError = errors[i];
              str += txError.message + "\n";
              if (txError.data) {
                str += "Data: " + JSON.stringify(txError.data) + "\n";
              }
            }
          }
        }
        if (res.status) {
          str = "(" + res.status + ")" + (str ? "\n" + str : "");
        }
        throw {
          errorMsg: str,
          errors,
          data: res.data
        };
      }
      throw "Unknown error: " + (typeof res === "object" ? JSON.stringify(res) : res);
    }
  }
};
const useSubmitTx = () => {
  return {
    doAutoSubmit: getAutoSubmitTx(),
    submitTx
  };
};

const eternlCollateralMap = networkIdList.reduce((o, n) => {
  o[n] = null;
  return o;
}, {});
function useCollateral() {
  const _eternlCollateral = async (networkId) => {
    let eternlCollateral = eternlCollateralMap[networkId];
    if (!eternlCollateral || Date.now() > eternlCollateral.lastUpdate + ETERNL_COLLATERAL_EXP_MS) {
      const res = await api.get("/" + networkId + "/v2/misc/collateral/fetch", void 0, 3e3);
      if (res?.data?.utxo) {
        const _collateralList = [];
        await loadUnknownUtxos(networkId, _collateralList, [res.data.utxo]);
        if (_collateralList.length > 0) {
          const collateralCborList = getUtxoCborList(_collateralList);
          eternlCollateral = {
            cbor: collateralCborList[0],
            lastUpdate: Date.now()
          };
          eternlCollateralMap[networkId] = eternlCollateral;
        }
      }
    }
    return eternlCollateral?.cbor ?? null;
  };
  return {
    getEternlCollateral: _eternlCollateral
  };
}

const { getEternlCollateral } = useCollateral();
const cip30_getPaginate = (args, index = 0) => {
  const paginate = { page: DEFAULT_PAGINATE.page, limit: DEFAULT_PAGINATE.limit };
  if (args && args.length > index && !!args[index]) {
    const arg = args[index];
    const page = Number(arg.page);
    const limit = Number(arg.limit);
    if (!Number.isNaN(page) && !Number.isNaN(limit)) {
      paginate.page = page >= 0 ? page : DEFAULT_PAGINATE.page;
      paginate.limit = limit >= 1 ? limit : DEFAULT_PAGINATE.limit;
    }
  }
  return paginate;
};
const cip30_getAmount = (args, index = 0) => {
  if (args && args.length > index && !!args[index] && typeof args[index] === "string") {
    return args[index];
  }
  return null;
};
const cip30_getTx = (args, index = 0) => {
  if (args && args.length > index && !!args[index] && typeof args[index] === "string") {
    return args[index];
  }
  return null;
};
const cip30_enable = (extensions) => {
  const unsupportedExtensionList = [];
  if (!extensions || !Array.isArray(extensions)) {
    extensions = [extCip30];
  }
  for (const extension of extensions) {
    if (!extension.hasOwnProperty("cip") || Number.isNaN(parseInt(extension.cip))) {
      return void 0;
    }
    if (!supportedExtensions.some((e) => e.cip === extension.cip)) {
      if (unsupportedExtensionList.some((e) => e.cip === extension.cip)) {
        continue;
      }
      unsupportedExtensionList.push(extension);
    }
  }
  return unsupportedExtensionList.length === 0 ? null : unsupportedExtensionList;
};
const cip30_getNetworkId = (networkId) => {
  let respNetworkId = void 0;
  try {
    respNetworkId = getNetworkId(networkId);
  } catch (e) {
  }
  return respNetworkId;
};
const cip30_getChangeAddress = (appAccount) => {
  const changeAddr = getChangeAddress(appAccount.data);
  if (changeAddr) {
    const addrCbor = toHexString(changeAddr.csl.to_bytes());
    safeFreeCSLObject(changeAddr.csl);
    return addrCbor;
  }
  return null;
};
const cip30_getUnusedAddresses = (appAccount) => {
  const accountData = appAccount.data;
  const changeAddr = getChangeAddress(accountData, true);
  if (changeAddr) {
    const addrCbor = toHexString(changeAddr.csl.to_bytes());
    safeFreeCSLObject(changeAddr.csl);
    return [addrCbor];
  }
  const addrList = [];
  const {
    isPayScript,
    isStakeScript
  } = getScriptState(accountData, true, true);
  if (accountData.keys.payment.length > 0) {
    const stakeCred = accountData.keys.stake.length > 0 ? accountData.keys.stake[0].cred : null;
    for (const key of accountData.keys.payment) {
      if (!key.used) {
        const addrCbor = getAddressCbor(
          stakeCred ? getBaseAddressFromCred(key.cred, stakeCred, accountData.state.networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(key.cred, accountData.state.networkId, isPayScript)
        );
        if (addrCbor) {
          addrList.push(addrCbor);
          if (addrList.length >= 20) {
            break;
          }
        }
      }
    }
  }
  return addrList;
};
const _getForcedUnusedAddresses = (appAccount) => {
  const accountData = appAccount.data;
  const addrList = [];
  const {
    isPayScript,
    isStakeScript
  } = getScriptState(accountData, true, true);
  if (accountData.keys.payment.length > 0) {
    const stakeCred = accountData.keys.stake.length > 0 ? accountData.keys.stake[0].cred : null;
    for (const key of accountData.keys.payment) {
      if (!key.used) {
        const addr = stakeCred ? getBaseAddressFromCred(key.cred, stakeCred, accountData.state.networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(key.cred, accountData.state.networkId, isPayScript);
        if (addr) {
          addrList.push(addr);
          if (addrList.length >= 1) {
            break;
          }
        }
      }
    }
    if (addrList.length === 0) {
      const addr = stakeCred ? getBaseAddressFromCred(accountData.keys.payment[0].cred, stakeCred, accountData.state.networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(accountData.keys.payment[0].cred, accountData.state.networkId, isPayScript);
      if (addr) {
        addrList.push(addr);
      }
    }
  }
  return addrList;
};
const cip30_getForcedUnusedAddresses = (appAccount) => {
  const addrList = _getForcedUnusedAddresses(appAccount);
  for (let i = 0; i < addrList.length; i++) {
    const addrCbor = getAddressCbor(addrList[i]);
    if (addrCbor) {
      addrList[i] = addrCbor;
    }
  }
  return addrList;
};
const cip30_getUsedAddresses = (appAccount, paginate) => {
  let addrList = [];
  const accountData = appAccount.data;
  const usedAddresses = getAllUsedAddresses(accountData);
  const customAddrBech32 = accountData.settings.sam.addr ?? null;
  if (customAddrBech32) {
    const index = usedAddresses.indexOf(customAddrBech32);
    if (index !== -1) {
      usedAddresses.splice(index, 1);
    }
    usedAddresses.unshift(customAddrBech32);
  }
  for (const addrBech32 of usedAddresses) {
    const addrCbor = getAddressCbor(addrBech32);
    if (addrCbor) {
      addrList.push(addrCbor);
    }
  }
  if (paginate.limit <= addrList.length) {
    const numPages = Math.ceil(addrList.length / paginate.limit);
    if (paginate.page < numPages) {
      const startIndex = paginate.page * paginate.limit;
      const endIndex = startIndex + paginate.limit;
      addrList = addrList.filter((value, index) => index >= startIndex && index < endIndex);
    } else {
      throw errorPaginateRange(numPages);
    }
  }
  return addrList;
};
const cip30_getRewardAddresses = (appAccount) => {
  const accountData = appAccount.data;
  let addrList = [];
  if (accountData.keys.stake.length > 0) {
    const { isStakeScript } = getScriptState(accountData, false, true);
    for (const key of accountData.keys.stake) {
      const addr = getRewardAddressFromCred(key.cred, accountData.state.networkId, isStakeScript);
      const addrCbor = getAddressCbor(addr);
      if (addrCbor) {
        addrList.push(addrCbor);
      }
    }
  }
  return addrList;
};
const cip30_getRewardAddress = (appAccount) => {
  const accountData = appAccount.data;
  if (accountData.keys.stake.length > 0) {
    const { isStakeScript } = getScriptState(accountData, false, true);
    for (const key of accountData.keys.stake) {
      const addr = getRewardAddressFromCred(key.cred, accountData.state.networkId, isStakeScript);
      const addrCbor = getAddressCbor(addr);
      if (addrCbor) {
        return addrCbor;
      }
    }
  }
  return null;
};
const cip30_getBalance = async (appAccount) => {
  const accountData = appAccount.data;
  setRewardsLocked(accountData.account.id, true);
  const balances = updateBalances(appAccount);
  const balance = createIBalance();
  addToBalance(balance, balances.lockedAvailable, true, true);
  addToBalance(balance, balances.lockedByTokens, true, true);
  decreaseBalance(balance, balances.locked, true, true);
  if (!appAccount.data.settings.collateral.eternl) {
    decreaseBalance(balance, balances.collateral, true, true);
  }
  if (isLessThanZero(balance.coin)) {
    balance.coin = "0";
    if (balance.multiasset) {
      delete balance.multiasset;
    }
  }
  const balanceCbor = getBalanceCbor(balance);
  return balanceCbor;
};
const cip30_getUtxos = async (appAccount, amount, paginate) => {
  const filterCollateral = !appAccount.data.settings.collateral.eternl;
  const { utxoList } = getFilteredUtxoList(appAccount, filterCollateral, true, true, false);
  let _utxoList = [];
  if (amount) {
    let step = 0;
    try {
      const accountData = appAccount.data;
      const wantedAmount = createTransactionOutputJSON();
      wantedAmount.address = getDonationAddress(appAccount.data.state.networkId);
      wantedAmount.amount = getValueJSONFromCbor(amount);
      step = 1;
      const userOutputList = [wantedAmount];
      const txConfig = generateTxConfig(appAccount, checkEpochParams(accountData.state.networkId), 0, 0);
      const {
        chosenInputList
      } = await selectForAmount(userOutputList, txConfig, appAccount);
      _utxoList.push(...getUtxoCborList(chosenInputList));
    } catch (e) {
      console.error(e);
      if (step === 0) {
        throw errorInvalidInputAmount(e);
      } else {
        throw errorInvalidAmount(e);
      }
    }
  } else {
    _utxoList.push(...getUtxoCborList(utxoList));
  }
  if (paginate.limit <= _utxoList.length) {
    const numPages = Math.ceil(_utxoList.length / paginate.limit);
    if (paginate.page < numPages) {
      const startIndex = paginate.page * paginate.limit;
      const endIndex = startIndex + paginate.limit;
      _utxoList = _utxoList.filter((value, index) => index >= startIndex && index < endIndex);
    } else {
      throw errorPaginateRange(numPages);
    }
  }
  return _utxoList;
};
const cip30_getCollateral = async (appAccount) => {
  let collateralList;
  if (appAccount.data.settings.collateral.eternl) {
    try {
      const networkId = appAccount.data.state.networkId;
      const eternlCollateral = await getEternlCollateral(networkId);
      if (eternlCollateral) {
        collateralList = [eternlCollateral];
      }
    } catch (err) {
      console.error("cip30_getCollateral:", getErrorMsg(err));
    }
  }
  if (!collateralList) {
    collateralList = getUtxoCborList(appAccount.utxoMap.collateral);
  }
  return collateralList;
};
const cip30_getLockedUtxos = async (appAccount) => {
  const utxoList = getLockedUtxos(appAccount);
  const lockedList = getUtxoCborList(utxoList);
  return lockedList;
};
const cip30_submitTx = async (networkId, txCbor) => {
  if (txCbor === null) {
    throw errorNoSubmitTx();
  }
  const free = [];
  const res = getTransactionFromCbor(networkId, txCbor, 0, free);
  if (!res.builtTx) {
    throw errorNoSubmitTx();
  }
  const resSubmit = await useSubmitTx().submitTx(networkId, txCbor, res.builtTx);
  freeCSLObjects(free);
  if (resSubmit.error) {
    console.log("submitTx: resSubmit:", typeof resSubmit.error, resSubmit.error);
    let error = resSubmit.error;
    if (typeof error === "string" && error.startsWith(ErrorSubmitTx.failed + ".")) {
      let errorArr = error.split(".");
      errorArr.shift();
      errorArr.shift();
      error = errorArr.join(".");
    }
    throw errorSubmitTxFailed(error);
  }
  if (resSubmit.status && resSubmit.status >= 200 && resSubmit.status <= 299) {
    return res.txHash;
  } else {
    throw errorSubmitTxFailed(resSubmit.status + "?");
  }
};
const cip30_getConnectedNetworkId = (networkId) => {
  let respNetworkId = void 0;
  try {
    respNetworkId = networkId;
  } catch (e) {
  }
  return respNetworkId;
};

let doLogAll = false;
const enableLogs = (enable) => {
  doLogAll = enable;
};

const checkEnable = (req, appAccountId) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("checkEnable"), sl("req"), req, origin);
  }
  let wantedExtensionList = req.payload.extensions;
  if (!wantedExtensionList || !Array.isArray(wantedExtensionList)) {
    wantedExtensionList = [extCip30];
  }
  const unsupportedExtensions = cip30_enable(wantedExtensionList);
  if (unsupportedExtensions === void 0) {
    req.response = errorInvalidArgument();
  } else if (unsupportedExtensions) {
    req.response = errorUnsupportedExtensions(unsupportedExtensions);
  }
  if (req.response) {
    if (doLogAll) {
      console.error(el("checkEnable"), sl("error"), req.response);
    }
    return req;
  }
  if (wantedExtensionList.some((e1) => autoGrantWithCIP30List.some((e2) => e2.cip === e1.cip)) && !wantedExtensionList.some((e) => e.cip === extCip30.cip)) {
    wantedExtensionList.push(extCip30);
  }
  for (let i = wantedExtensionList.length - 1; i >= 0; i--) {
    const ext = wantedExtensionList[i];
    if (autoGrantWithCIP30List.some((e) => e.cip === ext.cip)) {
      wantedExtensionList.splice(i, 1);
    }
  }
  const grantExtensionList = isConnectedOrigin(origin, wantedExtensionList);
  if (grantExtensionList === void 0) {
    req.response = errorInvalidArgument();
    return req;
  }
  const isConnected = !grantExtensionList;
  if (doLogAll) {
    console.log(el("checkEnable"), "isConnected", isConnected, origin, req);
  }
  if (isConnected) {
    if (appAccountId) {
      req.response = {
        success: true,
        isEnabled: isOriginEnabledAccount(appAccountId, origin, req.payload.domId, req.api === METHOD.enable)
      };
    } else {
      req.response = errorNoAccount();
    }
    if (doLogAll) {
      console.warn(el("checkEnable"), sl("isConnected"), req);
    }
    return req;
  }
  req.payload.extensions = grantExtensionList ?? wantedExtensionList;
  return req;
};
const handleIsEnabled = (req) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleIsEnabled"), sl("req"), req, origin);
  }
  req.response = {
    success: true,
    isEnabled: isConnectedOrigin(origin, []) === null
  };
  if (doLogAll) {
    console.warn(el("handleIsEnabled"), sl("response"), req.response);
  }
  return req;
};
const handleGetExtensions = async (req) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetExtensions"), sl("req"), req, origin);
  }
  const extensions = getConnectedExtensions(origin);
  req.response = { success: true, extensions };
  if (doLogAll) {
    console.warn(el("handleGetExtensions"), sl("response"), req);
  }
  return req;
};
const handleGetNetworkId = async (req) => {
  const resNetworkId = cip30_getNetworkId(networkId$9.value);
  if (resNetworkId !== void 0) {
    req.response = { success: true, networkId: resNetworkId };
  } else {
    req.response = errorNoNetworkId();
  }
  if (doLogAll) {
    console.warn(el("handleGetNetworkId"), sl("req"), req);
  }
  return req;
};
const handleGetChangeAddress = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetChangeAddress"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    const addr = cip30_getChangeAddress(appAccount);
    if (!addr) {
      req.response = errorNoChangeAddr();
    } else {
      req.response = { success: true, changeAddr: addr };
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetChangeAddress"), sl("response"), req);
  }
  return req;
};
const handleGetUnusedAddresses = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetUnusedAddresses"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    if (origin?.startsWith("https://") && origin?.endsWith(".midnight.gd")) {
      const addrList = cip30_getForcedUnusedAddresses(appAccount);
      req.response = { success: true, unusedAddrList: addrList };
    } else {
      const addrList = cip30_getUnusedAddresses(appAccount);
      req.response = { success: true, unusedAddrList: addrList };
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetUnusedAddresses"), sl("response"), req);
  }
  return req;
};
const handleGetForcedUnusedAddresses = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetForcedUnusedAddresses"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    const addrList = cip30_getForcedUnusedAddresses(appAccount);
    req.response = { success: true, unusedAddrList: addrList };
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetForcedUnusedAddresses"), sl("response"), req);
  }
  return req;
};
const handleGetUsedAddresses = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetUsedAddresses"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      const addrList = cip30_getUsedAddresses(appAccount, cip30_getPaginate([req.payload.paginate]));
      req.response = { success: true, usedAddrList: addrList };
    } catch (err) {
      req.response = err;
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetUsedAddresses"), sl("response"), req);
  }
  return req;
};
const handleGetRewardAddresses = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetRewardAddresses"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      const addrList = cip30_getRewardAddresses(appAccount);
      req.response = { success: true, rewardAddrList: addrList };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetRewardAddresses"), sl("response"), req);
  }
  return req;
};
const handleGetRewardAddress = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetRewardAddress"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      const addr = cip30_getRewardAddress(appAccount);
      if (!addr) {
        req.response = errorNoRewardAddr();
      } else {
        req.response = { success: true, rewardAddr: addr };
      }
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetRewardAddress"), sl("response"), req);
  }
  return req;
};
const handleGetBalance = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetBalance"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      await maybeReloadAccount(appAccount);
      req.response = { success: true, balanceCbor: await cip30_getBalance(appAccount) };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetBalance"), sl("response"), req);
  }
  return req;
};
const handleGetUtxos = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetUtxos"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      const args = [req.payload.amount, req.payload.paginate];
      await maybeReloadAccount(appAccount);
      req.response = {
        success: true,
        utxoList: await cip30_getUtxos(
          appAccount,
          cip30_getAmount(args),
          cip30_getPaginate(args, 1)
        )
      };
    } catch (err) {
      req.response = err;
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetUtxos"), sl("response"), req);
  }
  return req;
};
const handleGetCollateral = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetCollateral"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      await maybeReloadAccount(appAccount);
      req.response = { success: true, collateralList: await cip30_getCollateral(appAccount) };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetCollateral"), sl("response"), req);
  }
  return req;
};
const handleGetLockedUtxos = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetLockedUtxos"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      await maybeReloadAccount(appAccount);
      req.response = { success: true, lockedUtxoList: await cip30_getLockedUtxos(appAccount) };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetLockedUtxos"), sl("response"), req);
  }
  return req;
};
const handleSubmitTx = async (req) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleSubmitTx"), sl("req"), req, origin);
  }
  try {
    req.response = { success: true, txHash: await cip30_submitTx(networkId$9.value, cip30_getTx([req.payload.tx])) };
  } catch (err) {
    req.response = err;
  }
  if (doLogAll) {
    console.warn(el("handleSubmitTx"), sl("response"), req);
  }
  return req;
};
const handleSyncAccount = async (req) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleSyncAccount"), sl("req"), req, origin);
  }
  try {
    dispatchSignalSync(doForceSyncImportantAccounts);
    req.response = { success: true };
  } catch (err) {
    req.response = errorInternal(err);
  }
  if (doLogAll) {
    console.warn(el("handleSyncAccount"), sl("response"), req);
  }
  return req;
};
const handleGetConnectedNetworkId = async (req) => {
  const resNetworkId = cip30_getConnectedNetworkId(networkId$9.value);
  if (resNetworkId !== void 0) {
    req.response = { success: true, connectedNetworkId: resNetworkId };
  } else {
    req.response = errorNoNetworkId();
  }
  if (doLogAll) {
    console.warn(el("handleGetConnectedNetworkId"), sl("req"), req);
  }
  return req;
};
let _lastTimeReloadAccount = 0;
const maybeReloadAccount = async (appAccount) => {
  if (doLogAll) {
    console.warn(el("maybeReloadAccount"), sl("isSyncLeader"), isSyncLeader());
  }
  if (isSyncLeader()) {
    return;
  }
  if (appAccount && Date.now() - _lastTimeReloadAccount > 2e3) {
    if (doLogAll) {
      console.warn(el("maybeReloadAccount"), sl("reload"), "start");
    }
    _lastTimeReloadAccount = Date.now();
    await dispatchSignal(doReloadAccount, appAccount);
    if (doLogAll) {
      console.warn(el("maybeReloadAccount"), sl("reload"), "done");
    }
  } else {
    if (doLogAll) {
      console.warn(el("maybeReloadAccount"), sl("skip"));
    }
  }
};

const cip95_GetStakePubKeys = (api, appAccount) => {
  const pubStakeKeyList = [];
  const credList = [];
  for (const rewardInfo of appAccount.data.rewardInfoList) {
    if ((api === METHOD.getRegisteredPubStakeKeys || api === "cip95.getRegisteredPubStakeKeys") && rewardInfo.registered || (api === METHOD.getUnregisteredPubStakeKeys || api === "cip95.getUnregisteredPubStakeKeys") && !rewardInfo.registered) {
      credList.push(rewardInfo.cred);
    }
  }
  const pendingTxList = getPendingTxList(true);
  for (const tx of pendingTxList.value) {
    if (tx.body.certs) {
      for (const cert of tx.body.certs) {
        if ((api === METHOD.getRegisteredPubStakeKeys || api === "cip95.getRegisteredPubStakeKeys") && (cert.hasOwnProperty("StakeRegistration") || cert.hasOwnProperty("StakeRegistrationAndDelegation") || cert.hasOwnProperty("StakeVoteRegistrationAndDelegation") || cert.hasOwnProperty("VoteRegistrationAndDelegation")) || (api === METHOD.getUnregisteredPubStakeKeys || api === "cip95.getUnregisteredPubStakeKeys") && cert.hasOwnProperty("StakeDeregistration")) {
          const cred = Object.values(Object.values(cert)[0].stake_credential)[0];
          if (!credList.includes(cred)) {
            credList.push(cred);
          }
        }
      }
    }
  }
  for (const cred of credList) {
    const ownCred = getOwnedCred([appAccount.data.keys], cred, "stake");
    if (!ownCred || ownCred.path.length !== 5) {
      continue;
    }
    pubStakeKeyList.push(getPubKeyStake(appAccount.data.account.pub, ownCred.path[4]));
  }
  return pubStakeKeyList;
};

const handleGetDRepPub = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetDRepPub"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      req.response = { success: true, drepPubKey: getPubKeyDRep(appAccount.data.account.pub, 0) };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetDRepPub"), sl("response"), req);
  }
  return req;
};
const handleGetStakePubKeys = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetStakePubKeys"), sl("req"), req, origin);
  }
  if (appAccount) {
    try {
      req.response = { success: true, pubStakeKeyList: cip95_GetStakePubKeys(req.api, appAccount) };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetStakePubKeys"), sl("response"), req);
  }
  return req;
};

const handleGetAccountPub = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetAccountPub"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      req.response = { success: true, accountPub: generatePlateHex(appAccount.data.account.pub) };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetAccountPub"), sl("response"), req);
  }
  return req;
};

const cip142_getNetworkMagic = (networkId) => {
  return getNetworkMagic(networkId);
};

const handleGetNetworkMagic = async (req) => {
  const resNetworkMagic = cip142_getNetworkMagic(networkId$9.value);
  if (resNetworkMagic !== void 0) {
    req.response = { success: true, networkMagic: resNetworkMagic };
  } else {
    req.response = errorNoNetworkMagic();
  }
  if (doLogAll) {
    console.warn(el("handleGetNetworkMagic"), sl("req"), req);
  }
  return req;
};

const _req$2 = ref(null);
const _appAccount$2 = ref(null);
const openModalEnableCIP30 = (req, appAccount) => {
  setApiRequest(req, "enable");
  _appAccount$2.value = appAccount;
  _req$2.value = req;
};
const closeModalEnableCIP30 = () => {
  if (_req$2.value && !_req$2.value.response) {
    _req$2.value.response = errorConnectionRefused();
  }
  _req$2.value = null;
  _appAccount$2.value = null;
  setApiRequest(null, "enable");
  return false;
};
const useModalEnableCIP30 = () => {
  return {
    req: _req$2,
    appAccount: _appAccount$2,
    showModalEnableCIP30: computed(() => !!_req$2.value),
    // Caller will add a watcher for the req.response property.
    openModalEnableCIP30,
    closeModalEnableCIP30
  };
};

const _req$1 = ref(null);
const _appAccount$1 = ref(null);
const openModalSignTxCIP30 = (req, appAccount) => {
  setApiRequest(req, "signTx");
  _appAccount$1.value = appAccount;
  _req$1.value = req;
};
const closeModalSignTxCIP30 = () => {
  if (_req$1.value && !_req$1.value.response) {
    _req$1.value.response = errorTxUserDeclined();
  }
  _req$1.value = null;
  _appAccount$1.value = null;
  setApiRequest(null, "signTx");
};
const useModalSignTxCIP30 = () => {
  return {
    req: _req$1,
    appAccount: _appAccount$1,
    showModalSignTxCIP30: computed(() => !!_req$1.value),
    // Caller will add a watcher for the req.response property.
    openModalSignTxCIP30,
    closeModalSignTxCIP30
  };
};

const _req = ref(null);
const _appAccount = ref(null);
const openModalSignDataCIP30 = (req, appAccount) => {
  setApiRequest(req, "signData");
  _appAccount.value = appAccount;
  _req.value = req;
};
const closeModalSignDataCIP30 = () => {
  if (_req.value && !_req.value.response) {
    _req.value.response = errorDataUserDeclined();
  }
  _req.value = null;
  _appAccount.value = null;
  setApiRequest(null, "signData");
};
const useModalSignDataCIP30 = () => {
  return {
    req: _req,
    appAccount: _appAccount,
    showModalSignDataCIP30: computed(() => !!_req.value),
    // Caller will add a watcher for the req.response property.
    openModalSignDataCIP30,
    closeModalSignDataCIP30
  };
};

const doLog = false;
const storeId$2 = "handleApiRequest";
const handleApiRequest = async (req, appAccount, canOpenUserRequests, needsIsEnabledCheck = true) => {
  if (doLogAll || doLog) {
    console.warn(el(storeId$2), sl("req"), req);
  }
  if (doLogAll || doLog) {
    console.warn(el(storeId$2), sl("api"), req.api);
  }
  if (req.api === METHOD.enableLogs) {
    enableLogs(req.payload.enable);
    req.response = { success: true };
    return req;
  }
  if (doLogAll || doLog) {
    console.warn(el(storeId$2), sl("appAccount"), appAccount);
  }
  switch (req.api) {
    case METHOD.enable:
      if (appAccount) {
        checkEnable(req, appAccount.id);
        if (doLogAll || doLog) {
          console.warn(el(storeId$2), sl("connected"), req.response);
        }
        if (req.response) {
          return req;
        }
        const { openModalEnableCIP30 } = useModalEnableCIP30();
        await openModal("enable", req, appAccount, errorConnectionRefused(), openModalEnableCIP30);
        delete req.payload.resolve;
        return req;
      }
      break;
    // This is a global list. It will add entry for each origin from SERVICEWORKER, DappBrowser, CardanoConnect, WalletConnect.
    case METHOD.isEnabled:
      return handleIsEnabled(req);
    case METHOD.getNetworkId:
      return handleGetNetworkId(req);
    case METHOD.getExtensions:
      return handleGetExtensions(req);
    case METHOD.getConnectedNetworkId:
      return handleGetConnectedNetworkId(req);
    // CIP-142
    case METHOD.getNetworkMagic:
    case "cip142.getNetworkMagic":
      return handleGetNetworkMagic(req);
  }
  if (!appAccount) {
    if (doLogAll || doLog) {
      console.warn(el(storeId$2), sl("notConnected"), "errorNoAccount", req.api);
    }
    req.response = errorNoAccount();
    return req;
  }
  if (needsIsEnabledCheck) {
    const origin = req.payload.origin ?? null;
    const domId = req.payload.domId ?? "";
    const extensions = req.payload.extensions ?? null;
    if (!origin) {
      if (doLogAll || doLog) {
        console.warn(el(storeId$2), sl("notConnected"), "errorNoOrigin", req.api);
      }
      req.response = errorNoOrigin();
      return req;
    }
    if (isConnectedOrigin(origin, extensions)) {
      if (doLogAll || doLog) {
        console.warn(el(storeId$2), sl("notConnected"), "errorNotConnected", req.api);
      }
      req.response = errorNotConnected();
      return req;
    }
    if (!isOriginEnabledAccount(appAccount.id, origin, domId, req.api === METHOD.enable)) {
      if (doLogAll || doLog) {
        console.warn(el(storeId$2), sl("notConnected"), "errorAccountChanged", req.api);
      }
      req.response = errorAccountChanged();
      return req;
    }
  }
  if (doLogAll || doLog) {
    console.warn(el(storeId$2), sl("connected"), req.api);
  }
  switch (req.api) {
    // submitTx needs a connected wallet, so dapps cannot spam.
    case METHOD.submitTx:
      return handleSubmitTx(req);
    case METHOD.getBalance:
      return handleGetBalance(req, appAccount);
    case METHOD.getUsedAddresses:
      return handleGetUsedAddresses(req, appAccount);
    case METHOD.getUnusedAddresses:
      return handleGetUnusedAddresses(req, appAccount);
    case METHOD.getRewardAddresses:
      return handleGetRewardAddresses(req, appAccount);
    case METHOD.getRewardAddress:
      return handleGetRewardAddress(req, appAccount);
    case METHOD.getChangeAddress:
      return handleGetChangeAddress(req, appAccount);
    case METHOD.getUtxos:
      return handleGetUtxos(req, appAccount);
    case METHOD.getCollateral:
      return handleGetCollateral(req, appAccount);
    case METHOD.getLockedUtxos:
      return handleGetLockedUtxos(req, appAccount);
    // CIP-95
    case METHOD.getPubDRepKey:
    case "cip95.getPubDRepKey":
      return handleGetDRepPub(req, appAccount);
    case METHOD.getRegisteredPubStakeKeys:
    case "cip95.getRegisteredPubStakeKeys":
    case METHOD.getUnregisteredPubStakeKeys:
    case "cip95.getUnregisteredPubStakeKeys":
      return handleGetStakePubKeys(req, appAccount);
    // CIP-104
    case METHOD.getAccountPub:
    case "cip104.getAccountPub":
      return handleGetAccountPub(req, appAccount);
    // experimental
    case METHOD.syncAccount:
      return handleSyncAccount(req);
    case METHOD.getForcedUnusedAddresses:
      return handleGetForcedUnusedAddresses(req, appAccount);
  }
  if (doLogAll || doLog) {
    console.warn(el(storeId$2), sl("handleApiRequest:connected:open"), req.api);
  }
  switch (req.api) {
    // Already handled above.
    // case METHOD.enable:
    case METHOD.signTxs:
    case "cip103.signTxs":
    case METHOD.signTx:
    case "cip95.signTx":
      const { openModalSignTxCIP30 } = useModalSignTxCIP30();
      await openModal("signTx", req, appAccount, errorTxUserDeclined(), openModalSignTxCIP30);
      break;
    case METHOD.signData:
    case "cip95.signData":
      const { openModalSignDataCIP30 } = useModalSignDataCIP30();
      await openModal("signData", req, appAccount, errorTxUserDeclined(), openModalSignDataCIP30);
      break;
  }
  delete req.payload.resolve;
  return req;
};
const openModal = async (callerId, req, appAccount, error, handleFunc) => {
  if (doLogAll || doLog) {
    console.warn(el(storeId$2), sl("openModal"), callerId, req.api, appAccount);
  }
  const lastReqRef = getApiRequest(callerId);
  if (lastReqRef && lastReqRef.reqId !== req.reqId) {
    lastReqRef.response = error;
    setApiRequest(null, callerId);
  }
  await nextTick();
  return new Promise(async (resolve) => {
    if (doLogAll || doLog) {
      console.log(el(storeId$2), sl("openModal"), req);
    }
    if (req.response) {
      return resolve(true);
    }
    req.payload.resolve = resolve;
    handleFunc(req, appAccount);
  });
};

const DEFAULT_LIFE = 5e3;
let _$toast;
let listenerAttached = false;
const storeId$1 = "useNotifications";
const useNotifications = ($toast) => {
  if ($toast) {
    _$toast = $toast;
  }
  const {
    add,
    remove,
    removeGroup,
    removeAllGroups
  } = _$toast;
  const mapPosition = (position) => {
    switch (position) {
      case "top":
        return "top-center";
      case "bottom":
        return "bottom-center";
      case "top-right":
        return "top-right";
      case "top-left":
        return "top-left";
      case "bottom-right":
        return "bottom-right";
      case "bottom-left":
        return "bottom-left";
      case "bottom-center":
        return "bottom-center";
      default:
        return "top-right";
    }
  };
  const mapSeverity = (type) => {
    switch (type) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "info":
        return "info";
      case "warning":
        return "warn";
      default:
        return "info";
    }
  };
  const show = (payload) => {
    return add({
      summary: payload.message,
      severity: "custom",
      type: mapSeverity(payload.type),
      life: payload.options?.duration ?? DEFAULT_LIFE,
      position: mapPosition(payload.options?.position),
      group: "toasts"
    });
  };
  const showLoading = (message) => {
    return add({
      group: "toasts",
      summary: message.message,
      type: mapSeverity(message.type),
      position: mapPosition(message.options?.position),
      life: DEFAULT_LIFE
    });
  };
  const dismiss = (message) => {
    remove(message);
  };
  const showSuccess = (message) => {
    add({
      severity: "custom",
      group: "toasts",
      type: "success",
      summary: message,
      life: DEFAULT_LIFE
    });
  };
  const showError = (message) => {
    console.error(message);
    add({
      severity: "custom",
      type: "error",
      group: "toasts",
      summary: message,
      life: DEFAULT_LIFE
    });
  };
  const showInfo = (message) => {
    add({
      severity: "custom",
      type: "info",
      group: "toasts",
      summary: message,
      life: DEFAULT_LIFE
    });
  };
  const showWarning = (message) => {
    add({
      severity: "custom",
      type: "warn",
      summary: message,
      group: "toasts",
      life: DEFAULT_LIFE
    });
  };
  const showCopied = (message) => {
    add({
      severity: "custom",
      group: "copied",
      summary: message,
      life: DEFAULT_LIFE
    });
  };
  if (!listenerAttached) {
    addSignalListener(doShowUiNotification, storeId$1, (message) => {
      return show(message);
    });
    listenerAttached = true;
  }
  return {
    show,
    dismiss,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showCopied,
    showLoading
  };
};

const storeId = "portPopup";
const sendResponse = (req, channel = ApiChannel.popupToBg) => {
  if (doLogAll) {
    console.warn(el(storeId), sl("sendResponse"), json(req));
  }
  if (!req) {
    return;
  }
  req.channel = channel;
  chrome.runtime.sendMessage(req, () => {
    if (chrome.runtime.lastError) {
      console.error(el(storeId), sl("handleMessage"), "lastError", json(req), chrome.runtime.lastError);
    }
  });
};
const openUI = (deeplink, channel = ApiChannel.popupToBg) => {
  if (doLogAll) {
    console.warn(el(storeId), sl("openUI"));
  }
  const req = {
    reqId: "0",
    api: "openUI",
    channel,
    payload: {
      origin: storeId,
      deeplink
    }
  };
  sendResponse(req);
};

const _hoisted_1$p = ["src"];
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "EternlLogoLayout",
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const {
      isSmallerThanLG,
      isSmallerThanSM
    } = useScreenSize();
    const {
      isDesktopMenuCollapsed
    } = useDesktopMenuCollapsed();
    const { isDarkMode } = useDarkMode();
    const versionPosition = computed(() => {
      if (isSmallerThanSM.value) {
        return "left-1/2 -translate-x-1/2 -bottom-3.5! text-[0.5rem]";
      } else if (isSmallerThanLG.value) {
        return "left-0 bottom-0";
      } else if (isDesktopMenuCollapsed.value && !isSmallerThanLG.value) {
        return "left-1/2 -translate-x-1/2 -bottom-1!";
      }
      return "";
    });
    const logoUrl = computed(() => {
      if (isSmallerThanSM.value || isDesktopMenuCollapsed.value) {
        return "/icons/favicon-128x128.png";
      } else if (!isDarkMode.value) {
        if (isBetaApp()) {
          return "/images/eternl-logo-text-beta-black-440x128.png";
        }
        return "/images/eternl-logo-text-prod-black-440x128.png";
      } else {
        if (isBetaApp()) {
          return "/images/eternl-logo-text-beta-white-440x128.png";
        }
        return "/images/eternl-logo-text-prod-white-440x128.png";
      }
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Button, {
          text: "",
          class: normalizeClass(["relative px-2 -mx-2 py-2 -my-2 md:px-4 md:-mx-4 md:py-2 md:-my-2 hover:bg-transparent", unref(isDesktopMenuCollapsed) && !unref(isSmallerThanLG) ? "translate-x-4" : unref(isSmallerThanLG) ? "" : ""]),
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
        }, {
          default: withCtx(() => [
            createBaseVNode("img", {
              src: logoUrl.value,
              alt: "Eternl logo",
              class: "h-8 block"
            }, null, 8, _hoisted_1$p)
          ]),
          _: 1
        }, 8, ["class"]),
        createBaseVNode("span", {
          class: normalizeClass(["absolute bottom-0 text-2xs text-txt-blind", versionPosition.value])
        }, toDisplayString(unref(WALLET_VERSION_BETA)), 3)
      ], 64);
    };
  }
});

const _hoisted_1$o = { class: "main-layout relative w-full h-full max-h-full flex flex-col et-js-ic" };
const _hoisted_2$a = { class: "grow w-full flex flex-row et-jc-ic overflow-hidden" };
const _hoisted_3$6 = { class: "main-layout-content relative grow w-full flex flex-col overflow-x-hidden overflow-y-hidden" };
const _hoisted_4$6 = { class: "relative h-full flex flex-col scroll-anchor mr-1 sm:mr-2 lg:mr-0 pr-0 sm:pr-1 pt-5 sm:pt-5 lg:pt-7 overflow-x-hidden overflow-y-scroll content-scroll et-scrollbar" };
const _hoisted_5$5 = { class: "w-full flex et-js" };
const _hoisted_6$4 = { class: "w-full et-max-width-layout-content" };
const _hoisted_7$3 = { class: "absolute top-0 left-0 right-0 flex flex-col et-js-is bg-black/20 backdrop-blur-modal" };
const _hoisted_8$3 = { class: "main-layout-header w-full flex flex-row et-jc-is" };
const _hoisted_9$1 = { class: "shrink-0 grow h-full flex flex-row et-jb-ic et-gap-sm pl-1" };
const _hoisted_10$1 = {
  key: 0,
  class: "main-layout-header-center shrink-0 grow h-full flex flex-row et-js-ic"
};
const _hoisted_11$1 = {
  key: 1,
  class: "main-layout-header-right shrink-0 h-full flex flex-row et-js-ic et-gap-xs"
};
const _hoisted_12$1 = { class: "main-layout-progress-bar w-full" };
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "LayoutMainPopup",
  props: {
    logoFunc: { type: Function, required: false }
  },
  setup(__props) {
    const slots = useSlots();
    useScreenSize();
    const hasSlotHeaderCenter = computed(() => slots.hasOwnProperty("header-center"));
    const hasSlotHeaderRight = computed(() => slots.hasOwnProperty("header-right"));
    const hasFavoriteAccounts = ref(false);
    const isDesktopMenuCollapsed = ref(false);
    const content = ref(null);
    const { width, height } = useElementSize(content);
    useScreenSize(void 0, width, height);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$o, [
        createBaseVNode("div", _hoisted_2$a, [
          createBaseVNode("div", {
            class: normalizeClass(["main-layout-page relative shrink-0 w-full h-full pl-3 xs:pl-3 sm:pl-5 lg:pl-6 lg:pr-2 transition-all flex flex-col lg:flex lg:flex-row gap-x-4 sm:gap-x-6 et-max-width-global overflow-hidden", isDesktopMenuCollapsed.value ? "lg:gap-x-6" : "lg:gap-x-10"])
          }, [
            createBaseVNode("div", _hoisted_3$6, [
              createBaseVNode("main", _hoisted_4$6, [
                createBaseVNode("div", {
                  ref_key: "content",
                  ref: content,
                  class: normalizeClass(["pb-18 lg:pb-4 pt-16 sm:pt-24 pl-1 pr-1", hasFavoriteAccounts.value ? "mb-19" : ""])
                }, [
                  createBaseVNode("div", _hoisted_5$5, [
                    createBaseVNode("div", _hoisted_6$4, [
                      renderSlot(_ctx.$slots, "content", {}, void 0, true)
                    ])
                  ])
                ], 2)
              ])
            ])
          ], 2)
        ]),
        createBaseVNode("div", _hoisted_7$3, [
          createBaseVNode("header", _hoisted_8$3, [
            createBaseVNode("div", {
              class: normalizeClass(["main-layout-header-left flex flex-row et-jb-ic w-full et-header et-header-p gap-x-4 sm:gap-x-6 et-max-width-global", isDesktopMenuCollapsed.value ? "lg:gap-x-6" : "lg:gap-x-10"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["relative shrink-0 grow-0 flex flex-col et-jc-is lg:w-full lg:grow h-full transition-all", isDesktopMenuCollapsed.value ? "max-w-16" : "lg:et-max-width-menu"])
              }, [
                createVNode(_sfc_main$w, {
                  onClick: _cache[0] || (_cache[0] = ($event) => __props.logoFunc?.())
                })
              ], 2),
              createBaseVNode("div", _hoisted_9$1, [
                hasSlotHeaderCenter.value ? (openBlock(), createElementBlock("div", _hoisted_10$1, [
                  renderSlot(_ctx.$slots, "header-center", {}, void 0, true)
                ])) : createCommentVNode("", true),
                hasSlotHeaderRight.value ? (openBlock(), createElementBlock("div", _hoisted_11$1, [
                  renderSlot(_ctx.$slots, "header-right", {}, void 0, true)
                ])) : createCommentVNode("", true)
              ])
            ], 2)
          ]),
          createBaseVNode("div", _hoisted_12$1, [
            renderSlot(_ctx.$slots, "progress-bar", {}, void 0, true)
          ])
        ])
      ]);
    };
  }
});

const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-6166ce63"]]);

const createIChainTip = (networkId) => {
  return {
    networkId,
    network: networkId,
    blockNo: 0,
    slotNo: 0,
    epochNo: 0,
    epochSlot: 0,
    epochSlots: 0,
    epochPercent: 0,
    syncProgress: 0,
    onTip: false,
    serverTime: 0
  };
};

const createChainTip = (networkId2) => {
  const chainTip2 = createIChainTip(networkId2);
  updateChainTip(networkId2, chainTip2, chainTip2);
  chainTip2.onTip = false;
  return chainTip2;
};
const _chainTip = ref(getChainTip(networkId$9.value, createChainTip(networkId$9.value)).value);
const chainTip = computed(() => _chainTip.value);
ref(false);

const calcSlotInEpoch = computed(() => getCalculatedEpochSlot(networkId$9.value));
const calcSlotsInEpoch = computed(() => getEpochLength(networkId$9.value ?? "mainnet"));
const epochPercent = computed(() => calcSlotInEpoch.value / calcSlotsInEpoch.value);
const slotInEpoch = computed(() => {
  const _slotsInEpoch = chainTip.value.epochSlots.toString();
  let _slotInEpoch = chainTip.value.epochSlot.toString() ?? "0";
  while (_slotInEpoch.length < _slotsInEpoch.length) {
    _slotInEpoch = "0" + _slotInEpoch;
  }
  return _slotInEpoch;
});
const remainingTimeShort = ref("");
const remainingTimeFull = ref("");
function calculateRemainingTime(slotsRemaining) {
  const minutes = Math.floor(slotsRemaining / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  let value = "";
  let valueFull = "";
  if (days > 0) {
    value += days + "d";
    valueFull += days + " days, ";
  }
  let tmpHours = hours % 24;
  value += " " + (tmpHours < 10 ? "0" + tmpHours : tmpHours) + ":";
  valueFull += " " + (tmpHours < 10 ? "0" + tmpHours : tmpHours) + " hours, ";
  let tmpMinutes = minutes % 60;
  value += (tmpMinutes < 10 ? "0" + tmpMinutes : tmpMinutes) + ":";
  valueFull += (tmpMinutes < 10 ? "0" + tmpMinutes : tmpMinutes) + " min";
  let tmpSeconds = slotsRemaining % 60;
  value += tmpSeconds < 10 ? "0" + tmpSeconds : tmpSeconds;
  if (days < 0 || hours < 0 || tmpMinutes < 0 || tmpSeconds < 0) {
    remainingTimeShort.value = "";
    return;
  }
  remainingTimeShort.value = " ~" + value;
  remainingTimeFull.value = valueFull;
}
watchEffect(() => {
  calculateRemainingTime(chainTip.value.epochSlots - chainTip.value.epochSlot);
});
const useChainProgress = () => {
  return {
    calcSlotInEpoch,
    calcSlotsInEpoch,
    epochPercent,
    slotInEpoch,
    remainingTimeShort,
    remainingTimeFull
  };
};

const _hoisted_1$n = { class: "shrink-0 epoch-progress-bar w-full h-1 bg-blue overflow-hidden" };
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "EpochProgressBar",
  setup(__props) {
    const { epochPercent } = useChainProgress();
    const progress = computed(() => epochPercent.value * 100);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$n, [
        createVNode(GradientBar2, {
          progress: progress.value,
          class: "fixed"
        }, null, 8, ["progress"])
      ]);
    };
  }
});

const _sfc_main$t = {  };

const _hoisted_1$m = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$c(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$m, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M5.322 9.683c2.413-4.271 3.62-6.406 5.276-6.956a4.45 4.45 0 0 1 2.804 0c1.656.55 2.863 2.685 5.276 6.956c2.414 4.27 3.62 6.406 3.259 8.146c-.2.958-.69 1.826-1.402 2.48C19.241 21.5 16.827 21.5 12 21.5s-7.241 0-8.535-1.19a4.66 4.66 0 0 1-1.402-2.48c-.362-1.74.845-3.876 3.259-8.147M11.992 16h.009M12 13V9",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconAlert02 = /*#__PURE__*/_export_sfc(_sfc_main$t, [['render',_sfc_render$c]]);

const _hoisted_1$l = { class: "et-text-md font-semibold text-txt-warning cap-first" };
const _hoisted_2$9 = { class: "w-full flex flex-col et-js-is et-gap-md" };
const _hoisted_3$5 = {
  key: 0,
  class: "w-full text-txt-warning break-words whitespace-pre-wrap"
};
const _hoisted_4$5 = {
  key: 1,
  class: "w-full"
};
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "BannerWarning",
  props: {
    headline: { type: String },
    caption: { type: String }
  },
  setup(__props) {
    const panel = ref();
    const onToggleCollapsed = () => {
      panel.value?.toggle();
    };
    return (_ctx, _cache) => {
      const _component_Panel = resolveComponent("Panel");
      return openBlock(), createBlock(_component_Panel, {
        ref_key: "panel",
        ref: panel,
        class: "w-full bg-bg-warning rounded-2xl!",
        pt: {
          pctogglebutton: {
            root: "bg-bg-warning hover:bg-bg-app/20 text-txt-warning outline-txt-warning"
          },
          content: __props.caption ? "" : "py-0"
        },
        toggleable: !!__props.caption && __props.caption.length > 0
      }, {
        header: withCtx(() => [
          createBaseVNode("div", {
            class: "w-full flex et-ic et-gap-sme cursor-pointer",
            onClick: onToggleCollapsed
          }, [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              createVNode(IconAlert02, { class: "shrink-0 grow-0 w-5 sm:w-6 fill-none text-txt-warning" })
            ]),
            createBaseVNode("span", _hoisted_1$l, toDisplayString(__props.headline), 1)
          ])
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_2$9, [
            __props.caption ? (openBlock(), createElementBlock("div", _hoisted_3$5, toDisplayString(__props.caption), 1)) : createCommentVNode("", true),
            _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_4$5, [
              renderSlot(_ctx.$slots, "default")
            ])) : createCommentVNode("", true)
          ])
        ]),
        _: 3
      }, 8, ["pt", "toggleable"]);
    };
  }
});

const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "LayoutAppPopup",
  setup(__props) {
    const openUIWelcome = () => {
      openUI("/");
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(MainLayout, { "logo-func": openUIWelcome }, {
        "header-center": withCtx(() => [..._cache[0] || (_cache[0] = [
          createBaseVNode("div", null, null, -1)
        ])]),
        "header-right": withCtx(() => [..._cache[1] || (_cache[1] = [])]),
        "progress-bar": withCtx(() => [
          createVNode(_sfc_main$u)
        ]),
        content: withCtx(() => [
          !unref(appAccount$1) ? (openBlock(), createBlock(_sfc_main$s, {
            key: 0,
            class: "w-full",
            headline: _ctx.$t("dapps-enable:noAccount.title"),
            caption: _ctx.$t("dapps-enable:noAccount.caption"),
            toggleable: ""
          }, null, 8, ["headline", "caption"])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});

const _imports_0 = "/images/eternl-guard-512.png";

function useWalletAccount(walletId, accountId) {
  const appWallet = useAppWallet(walletId);
  const walletSettings = useWalletSettings(appWallet);
  const walletData = walletSettings.data;
  const walletAccountId = walletSettings.walletAccountId;
  const _accountId = computed(() => !!accountId.value ? accountId.value : walletAccountId.value);
  const appAccount = useAppAccount(appWallet, _accountId);
  const appAccountBalances = useAppAccountBalances(appAccount);
  const accountSettings = useAccountSettings(appAccount);
  const accountData = accountSettings.data;
  const utxoMap = accountSettings.utxoMap;
  const accountList = computed(() => {
    if (!walletData.value) {
      return [];
    }
    return walletData.value.wallet.accountList.filter((account) => isHDAccount(account.path)).sort((a, b) => a.path[2] - b.path[2]);
  });
  const hasAccount = computed(() => accountList.value.length > 0);
  const forceSyncAccount = () => {
    if (appAccount.value) {
      dispatchSignalSyncTo(appAccount.value.id, doForceSyncAccount);
    }
  };
  return {
    walletId,
    accountId,
    appWallet,
    appAccount,
    walletData,
    walletSettings,
    accountData,
    accountList,
    hasAccount,
    accountSettings,
    accountBalances: appAccountBalances,
    utxoMap,
    forceSyncAccount
  };
}

const _hoisted_1$k = ["src", "alt"];
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "IconHardwareWallet",
  props: {
    signType: { type: String, required: true }
  },
  setup(__props) {
    const { isDarkMode } = useDarkMode();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("img", {
        src: "/images/pair/" + (unref(isDarkMode) ? "dark/" : "light/") + __props.signType + ".svg",
        alt: "logo-" + __props.signType
      }, null, 8, _hoisted_1$k);
    };
  }
});

const _sfc_main$p = {  };

const _hoisted_1$j = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$b(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$j, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M20.3541 3.64593C18.5085 1.8004 13.2722 4.04455 8.65837 8.65837C4.04455 13.2722 1.8004 18.5085 3.64593 20.3541C5.49146 22.1996 10.7278 19.9555 15.3416 15.3416C19.9555 10.7278 22.1996 5.49146 20.3541 3.64593Z",
      stroke: "url(#gradient_icon_gold_orange_1)",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M3.64593 3.64593C1.8004 5.49146 4.04455 10.7278 8.65837 15.3416C13.2722 19.9555 18.5085 22.1996 20.3541 20.3541C22.1996 18.5085 19.9555 13.2722 15.3416 8.65837C10.7278 4.04455 5.49146 1.8004 3.64593 3.64593Z",
      stroke: "url(#gradient_icon_gold_orange_1)",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M12.009 12H12",
      stroke: "url(#gradient_icon_gold_orange_1)",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const MultiSigGradient = /*#__PURE__*/_export_sfc(_sfc_main$p, [['render',_sfc_render$b]]);

const _sfc_main$o = {  };

const _hoisted_1$i = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$a(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$i, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<path stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"none\" d=\"M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12105 13.2453 4 14.3624 4 15.5C4 16.6376 4.12105 17.7547 4.26781 18.8447Z\"></path><path stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" color=\"currentColor\" fill=\"none\" d=\"M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9\"></path><path stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" color=\"currentColor\" fill=\"none\" d=\"M16 15.49V15.5\"></path><path stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" color=\"currentColor\" fill=\"none\" d=\"M12 15.49V15.5\"></path><path stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" color=\"currentColor\" fill=\"none\" d=\"M8 15.49V15.5\"></path>", 5)
  ]))]))
}
const IconLockEnabled = /*#__PURE__*/_export_sfc(_sfc_main$o, [['render',_sfc_render$a]]);

const _sfc_main$n = {  };

const _hoisted_1$h = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$9(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$h, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      color: "currentColor"
    }, [
      createBaseVNode("path", { d: "M14 2h-4c-3.28 0-4.919 0-6.081.814a4.5 4.5 0 0 0-1.105 1.105C2 5.08 2 6.72 2 10s0 4.919.814 6.081a4.5 4.5 0 0 0 1.105 1.105C5.08 18 6.72 18 10 18h4c3.28 0 4.919 0 6.081-.814a4.5 4.5 0 0 0 1.105-1.105C22 14.92 22 13.28 22 10s0-4.919-.814-6.081a4.5 4.5 0 0 0-1.105-1.105C18.92 2 17.28 2 14 2" }),
      createBaseVNode("path", { d: "m16 8l1.227 1.057c.515.445.773.667.773.943s-.258.498-.773.943L16 12M8 8L6.773 9.057C6.258 9.502 6 9.724 6 10s.258.498.773.943L8 12m5-5l-2 6m3.656 9l-.42-.419a3.1 3.1 0 0 1-.58-3.581M9 22l.42-.419A3.1 3.1 0 0 0 10 18m-3 4h10" })
    ], -1)
  ]))]))
}
const IconComputerProgramming01 = /*#__PURE__*/_export_sfc(_sfc_main$n, [['render',_sfc_render$9]]);

// This file is autogenerated. It's used to publish ESM to npm.
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

var trimLeft = /^\s+/;
var trimRight = /\s+$/;
function tinycolor(color, opts) {
  color = color ? color : "";
  opts = opts || {};

  // If input is already a tinycolor, return itself
  if (color instanceof tinycolor) {
    return color;
  }
  // If we are called as a function, call using new instead
  if (!(this instanceof tinycolor)) {
    return new tinycolor(color, opts);
  }
  var rgb = inputToRGB(color);
  this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = Math.round(100 * this._a) / 100, this._format = opts.format || rgb.format;
  this._gradientType = opts.gradientType;

  // Don't let the range of [0,255] come back in [0,1].
  // Potentially lose a little bit of precision here, but will fix issues where
  // .5 gets interpreted as half of the total, instead of half of 1
  // If it was supposed to be 128, this was already taken care of by `inputToRgb`
  if (this._r < 1) this._r = Math.round(this._r);
  if (this._g < 1) this._g = Math.round(this._g);
  if (this._b < 1) this._b = Math.round(this._b);
  this._ok = rgb.ok;
}
tinycolor.prototype = {
  isDark: function isDark() {
    return this.getBrightness() < 128;
  },
  isLight: function isLight() {
    return !this.isDark();
  },
  isValid: function isValid() {
    return this._ok;
  },
  getOriginalInput: function getOriginalInput() {
    return this._originalInput;
  },
  getFormat: function getFormat() {
    return this._format;
  },
  getAlpha: function getAlpha() {
    return this._a;
  },
  getBrightness: function getBrightness() {
    //http://www.w3.org/TR/AERT#color-contrast
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  },
  getLuminance: function getLuminance() {
    //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    var rgb = this.toRgb();
    var RsRGB, GsRGB, BsRGB, R, G, B;
    RsRGB = rgb.r / 255;
    GsRGB = rgb.g / 255;
    BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928) R = RsRGB / 12.92;else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    if (GsRGB <= 0.03928) G = GsRGB / 12.92;else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    if (BsRGB <= 0.03928) B = BsRGB / 12.92;else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  },
  setAlpha: function setAlpha(value) {
    this._a = boundAlpha(value);
    this._roundA = Math.round(100 * this._a) / 100;
    return this;
  },
  toHsv: function toHsv() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v,
      a: this._a
    };
  },
  toHsvString: function toHsvString() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    var h = Math.round(hsv.h * 360),
      s = Math.round(hsv.s * 100),
      v = Math.round(hsv.v * 100);
    return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
  },
  toHsl: function toHsl() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    return {
      h: hsl.h * 360,
      s: hsl.s,
      l: hsl.l,
      a: this._a
    };
  },
  toHslString: function toHslString() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    var h = Math.round(hsl.h * 360),
      s = Math.round(hsl.s * 100),
      l = Math.round(hsl.l * 100);
    return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
  },
  toHex: function toHex(allow3Char) {
    return rgbToHex(this._r, this._g, this._b, allow3Char);
  },
  toHexString: function toHexString(allow3Char) {
    return "#" + this.toHex(allow3Char);
  },
  toHex8: function toHex8(allow4Char) {
    return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
  },
  toHex8String: function toHex8String(allow4Char) {
    return "#" + this.toHex8(allow4Char);
  },
  toRgb: function toRgb() {
    return {
      r: Math.round(this._r),
      g: Math.round(this._g),
      b: Math.round(this._b),
      a: this._a
    };
  },
  toRgbString: function toRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
  },
  toPercentageRgb: function toPercentageRgb() {
    return {
      r: Math.round(bound01(this._r, 255) * 100) + "%",
      g: Math.round(bound01(this._g, 255) * 100) + "%",
      b: Math.round(bound01(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function toPercentageRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function toName() {
    if (this._a === 0) {
      return "transparent";
    }
    if (this._a < 1) {
      return false;
    }
    return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
  },
  toFilter: function toFilter(secondColor) {
    var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
    var secondHex8String = hex8String;
    var gradientType = this._gradientType ? "GradientType = 1, " : "";
    if (secondColor) {
      var s = tinycolor(secondColor);
      secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
  },
  toString: function toString(format) {
    var formatSet = !!format;
    format = format || this._format;
    var formattedString = false;
    var hasAlpha = this._a < 1 && this._a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
    if (needsAlphaFormat) {
      // Special case for "transparent", all other non-alpha formats
      // will return rgba when there is transparency.
      if (format === "name" && this._a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format === "prgb") {
      formattedString = this.toPercentageRgbString();
    }
    if (format === "hex" || format === "hex6") {
      formattedString = this.toHexString();
    }
    if (format === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format === "hex8") {
      formattedString = this.toHex8String();
    }
    if (format === "name") {
      formattedString = this.toName();
    }
    if (format === "hsl") {
      formattedString = this.toHslString();
    }
    if (format === "hsv") {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  },
  clone: function clone() {
    return tinycolor(this.toString());
  },
  _applyModification: function _applyModification(fn, args) {
    var color = fn.apply(null, [this].concat([].slice.call(args)));
    this._r = color._r;
    this._g = color._g;
    this._b = color._b;
    this.setAlpha(color._a);
    return this;
  },
  lighten: function lighten() {
    return this._applyModification(_lighten, arguments);
  },
  brighten: function brighten() {
    return this._applyModification(_brighten, arguments);
  },
  darken: function darken() {
    return this._applyModification(_darken, arguments);
  },
  desaturate: function desaturate() {
    return this._applyModification(_desaturate, arguments);
  },
  saturate: function saturate() {
    return this._applyModification(_saturate, arguments);
  },
  greyscale: function greyscale() {
    return this._applyModification(_greyscale, arguments);
  },
  spin: function spin() {
    return this._applyModification(_spin, arguments);
  },
  _applyCombination: function _applyCombination(fn, args) {
    return fn.apply(null, [this].concat([].slice.call(args)));
  },
  analogous: function analogous() {
    return this._applyCombination(_analogous, arguments);
  },
  complement: function complement() {
    return this._applyCombination(_complement, arguments);
  },
  monochromatic: function monochromatic() {
    return this._applyCombination(_monochromatic, arguments);
  },
  splitcomplement: function splitcomplement() {
    return this._applyCombination(_splitcomplement, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function triad() {
    return this._applyCombination(polyad, [3]);
  },
  tetrad: function tetrad() {
    return this._applyCombination(polyad, [4]);
  }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function (color, opts) {
  if (_typeof(color) == "object") {
    var newColor = {};
    for (var i in color) {
      if (color.hasOwnProperty(i)) {
        if (i === "a") {
          newColor[i] = color[i];
        } else {
          newColor[i] = convertToPercentage(color[i]);
        }
      }
    }
    color = newColor;
  }
  return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {
  var rgb = {
    r: 0,
    g: 0,
    b: 0
  };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color == "string") {
    color = stringInputToObject(color);
  }
  if (_typeof(color) == "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (color.hasOwnProperty("a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok: ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a: a
  };
}

// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: h,
    s: s,
    l: l
  };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
  var r, g, b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    v = max;
  var d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: h,
    s: s,
    v: v
  };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h),
    f = h - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s),
    mod = i % 6,
    r = [v, q, p, p, t, v][mod],
    g = [t, v, v, q, p, p][mod],
    b = [p, p, t, v, v, q][mod];
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];

  // Return a 3 character hex if possible
  if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16)), pad2(convertDecimalToHex(a))];

  // Return a 4 character hex if possible
  if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {
  var hex = [pad2(convertDecimalToHex(a)), pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
  if (!color1 || !color2) return false;
  return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};
tinycolor.random = function () {
  return tinycolor.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};

// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function _desaturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s -= amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function _saturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s += amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function _greyscale(color) {
  return tinycolor(color).desaturate(100);
}
function _lighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l += amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}
function _brighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var rgb = tinycolor(color).toRgb();
  rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
  rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
  rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
  return tinycolor(rgb);
}
function _darken(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l -= amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function _spin(color, amount) {
  var hsl = tinycolor(color).toHsl();
  var hue = (hsl.h + amount) % 360;
  hsl.h = hue < 0 ? 360 + hue : hue;
  return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function _complement(color) {
  var hsl = tinycolor(color).toHsl();
  hsl.h = (hsl.h + 180) % 360;
  return tinycolor(hsl);
}
function polyad(color, number) {
  if (isNaN(number) || number <= 0) {
    throw new Error("Argument to polyad must be a positive number");
  }
  var hsl = tinycolor(color).toHsl();
  var result = [tinycolor(color)];
  var step = 360 / number;
  for (var i = 1; i < number; i++) {
    result.push(tinycolor({
      h: (hsl.h + i * step) % 360,
      s: hsl.s,
      l: hsl.l
    }));
  }
  return result;
}
function _splitcomplement(color) {
  var hsl = tinycolor(color).toHsl();
  var h = hsl.h;
  return [tinycolor(color), tinycolor({
    h: (h + 72) % 360,
    s: hsl.s,
    l: hsl.l
  }), tinycolor({
    h: (h + 216) % 360,
    s: hsl.s,
    l: hsl.l
  })];
}
function _analogous(color, results, slices) {
  results = results || 6;
  slices = slices || 30;
  var hsl = tinycolor(color).toHsl();
  var part = 360 / slices;
  var ret = [tinycolor(color)];
  for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
    hsl.h = (hsl.h + part) % 360;
    ret.push(tinycolor(hsl));
  }
  return ret;
}
function _monochromatic(color, results) {
  results = results || 6;
  var hsv = tinycolor(color).toHsv();
  var h = hsv.h,
    s = hsv.s,
    v = hsv.v;
  var ret = [];
  var modification = 1 / results;
  while (results--) {
    ret.push(tinycolor({
      h: h,
      s: s,
      v: v
    }));
    v = (v + modification) % 1;
  }
  return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function (color1, color2, amount) {
  amount = amount === 0 ? 0 : amount || 50;
  var rgb1 = tinycolor(color1).toRgb();
  var rgb2 = tinycolor(color2).toRgb();
  var p = amount / 100;
  var rgba = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
    a: (rgb2.a - rgb1.a) * p + rgb1.a
  };
  return tinycolor(rgba);
};

// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function (color1, color2) {
  var c1 = tinycolor(color1);
  var c2 = tinycolor(color2);
  return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function (color1, color2, wcag2) {
  var readability = tinycolor.readability(color1, color2);
  var wcag2Parms, out;
  out = false;
  wcag2Parms = validateWCAG2Parms(wcag2);
  switch (wcag2Parms.level + wcag2Parms.size) {
    case "AAsmall":
    case "AAAlarge":
      out = readability >= 4.5;
      break;
    case "AAlarge":
      out = readability >= 3;
      break;
    case "AAAsmall":
      out = readability >= 7;
      break;
  }
  return out;
};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function (baseColor, colorList, args) {
  var bestColor = null;
  var bestScore = 0;
  var readability;
  var includeFallbackColors, level, size;
  args = args || {};
  includeFallbackColors = args.includeFallbackColors;
  level = args.level;
  size = args.size;
  for (var i = 0; i < colorList.length; i++) {
    readability = tinycolor.readability(baseColor, colorList[i]);
    if (readability > bestScore) {
      bestScore = readability;
      bestColor = tinycolor(colorList[i]);
    }
  }
  if (tinycolor.isReadable(baseColor, bestColor, {
    level: level,
    size: size
  }) || !includeFallbackColors) {
    return bestColor;
  } else {
    args.includeFallbackColors = false;
    return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
  }
};

// Big List of Colors
// ------------------
// <https://www.w3.org/TR/css-color-4/#named-colors>
var names = tinycolor.names = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);

// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
  var flipped = {};
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      flipped[o[i]] = i;
    }
  }
  return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
  if (isOnePointZero(n)) n = "100%";
  var processPercent = isPercentage(n);
  n = Math.min(max, Math.max(0, parseFloat(n)));

  // Automatically convert percentage into number
  if (processPercent) {
    n = parseInt(n * max, 10) / 100;
  }

  // Handle floating point rounding errors
  if (Math.abs(n - max) < 0.000001) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return n % max / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
  return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
  return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
  return c.length == 1 ? "0" + c : "" + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
  if (n <= 1) {
    n = n * 100 + "%";
  }
  return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
var matchers = function () {
  // <http://www.w3.org/TR/css3-values/#integers>
  var CSS_INTEGER = "[-\\+]?\\d+%?";

  // <http://www.w3.org/TR/css3-values/#number-value>
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

  // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
  var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

  // Actual matching.
  // Parentheses and commas are optional, but not required.
  // Whitespace can take the place of commas or opening paren
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
}();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
  return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {
  color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color == "transparent") {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
  }

  // Try to match string input using regular expressions.
  // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
  // Just return an object and let the conversion functions handle that.
  // This way the result will be the same whether the tinycolor is initialized with string or object.
  var match;
  if (match = matchers.rgb.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3]
    };
  }
  if (match = matchers.rgba.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsl.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3]
    };
  }
  if (match = matchers.hsla.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsv.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3]
    };
  }
  if (match = matchers.hsva.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hex8.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex6.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  if (match = matchers.hex4.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      a: convertHexToDecimal(match[4] + "" + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex3.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function validateWCAG2Parms(parms) {
  // return valid WCAG2 parms for isReadable.
  // If input parms are invalid, return {"level":"AA", "size":"small"}
  var level, size;
  parms = parms || {
    level: "AA",
    size: "small"
  };
  level = (parms.level || "AA").toUpperCase();
  size = (parms.size || "small").toLowerCase();
  if (level !== "AA" && level !== "AAA") {
    level = "AA";
  }
  if (size !== "small" && size !== "large") {
    size = "small";
  }
  return {
    level: level,
    size: size
  };
}

const randseed = new Array(4);
const rand = () => {
  const t = randseed[0] ^ randseed[0] << 11;
  randseed[0] = randseed[1];
  randseed[1] = randseed[2];
  randseed[2] = randseed[3];
  randseed[3] = randseed[3] ^ randseed[3] >> 19 ^ t ^ t >> 8;
  return (randseed[3] >>> 0) / (1 << 31 >>> 0);
};
const seedrand = (seed) => {
  for (let i = 0; i < randseed.length; i++) {
    randseed[i] = 0;
  }
  for (let i = 0; i < seed.length; i++) {
    randseed[i % 4] = (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
  }
};
const createColor = () => {
  const h = Math.floor(rand() * 360);
  const s = rand() * 60 + 40 + "%";
  const l = (rand() + rand() + rand() + rand()) * 25 + "%";
  return "hsl(" + h + "," + s + "," + l + ")";
};
const buildOpts = (opts) => {
  const newOpts = { bgcolor: "", color: "", scale: 0, seed: "", size: 0, spotcolor: "" };
  newOpts.seed = opts.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16);
  seedrand(newOpts.seed);
  newOpts.size = opts.size || 8;
  newOpts.scale = opts.scale || 4;
  newOpts.color = opts.color || createColor();
  newOpts.bgcolor = opts.bgcolor || createColor();
  newOpts.spotcolor = opts.spotcolor || createColor();
  return newOpts;
};
const createImageData = (size) => {
  const width = size;
  const height = size;
  const dataWidth = Math.ceil(width / 2);
  const mirrorWidth = width - dataWidth;
  const data = [];
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < dataWidth; x++) {
      row[x] = Math.floor(rand() * 2.3);
    }
    const r = row.slice(0, mirrorWidth);
    r.reverse();
    row = row.concat(r);
    for (let i = 0; i < row.length; i++) {
      data.push(row[i]);
    }
  }
  return data;
};
const renderBlocky = (opts, canvas) => {
  opts = buildOpts(opts || {});
  const imageData = createImageData(opts.size);
  const width = Math.sqrt(imageData.length);
  canvas.width = canvas.height = opts.size * opts.scale;
  const cc = canvas.getContext("2d");
  if (!cc) return canvas;
  cc.fillStyle = opts.bgcolor;
  cc.fillRect(0, 0, canvas.width, canvas.height);
  cc.fillStyle = opts.color;
  for (let i = 0; i < imageData.length; i++) {
    if (imageData[i]) {
      const row = Math.floor(i / width);
      const col = i % width;
      cc.fillStyle = imageData[i] === 1 ? opts.color : opts.spotcolor;
      cc.fillRect(col * opts.scale, row * opts.scale, opts.scale, opts.scale);
    }
  }
  return canvas;
};
const createBlocky = async (opts, canvas) => {
  if (!canvas) {
    throw new Error("createBlocky: canvas missing.");
  }
  renderBlocky(opts, canvas);
};

const _hoisted_1$g = { class: "relative" };
const _hoisted_2$8 = ["src"];
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "WalletIcon",
  props: {
    iconSeed: { type: String, required: false, default: "" },
    iconData: { type: String, required: false, default: null },
    scalePx: { type: Number, required: false, default: 5 },
    saturationFactor: { type: Number, required: false, default: 0 },
    rounded: { type: String, required: false, default: "rounded-md" }
  },
  setup(__props) {
    const props = __props;
    const canvasRef = ref(null);
    const showBlocky = computed(() => !props.iconData);
    const uncompressedData = ref(null);
    const createIBlockColor = (primary, secondary, spots) => ({ primary, secondary, spots });
    const COLOR_INACTIVE = createIBlockColor("#727272", "#727272", "#727272");
    const COLORS = [
      createIBlockColor("#E1F2FF", "#17D1AA", "#A80B32"),
      createIBlockColor("#E1F2FF", "#FA5380", "#0833B2"),
      createIBlockColor("#E1F2FF", "#F06EF5", "#0804F7"),
      createIBlockColor("#E1F2FF", "#EBB687", "#852D62"),
      createIBlockColor("#E1F2FF", "#F59F9A", "#085F48")
    ];
    const saturation = (color, factor = 0) => {
      if (factor < -100 || factor > 100) {
        throw Error("Expected factor between -100 and 100 (default 0)");
      }
      let tcol = tinycolor(color);
      for (let i = 0; i < Math.abs(factor); i++) {
        tcol = factor < 0 ? tcol.desaturate() : tcol.saturate();
      }
      return tcol.toHexString();
    };
    const generateBlocky = async () => {
      if (!canvasRef.value) return;
      const colorIdx = Buffer$1.from(props.iconSeed, "hex")[0] % COLORS.length;
      const color = props.iconSeed === "" ? COLOR_INACTIVE : COLORS[colorIdx];
      const opts = {
        seed: props.iconSeed,
        size: 7,
        scale: props.scalePx,
        bgcolor: saturation(color.primary, props.saturationFactor),
        color: saturation(color.secondary, props.saturationFactor),
        spotcolor: saturation(color.spots, props.saturationFactor)
      };
      await createBlocky(opts, canvasRef.value);
    };
    const uncompressImage = () => {
      if (props.iconData?.startsWith(Plate_V2_Prefix)) {
        uncompressedData.value = props.iconData?.slice(Plate_V2_Prefix.length);
      } else {
        uncompressedData.value = LZString.decompress(props.iconData);
      }
    };
    onMounted(() => {
      generateBlocky();
      uncompressImage();
    });
    watchEffect(() => {
      if (canvasRef.value) {
        generateBlocky();
      } else {
        uncompressImage();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$g, [
        createBaseVNode("div", {
          class: normalizeClass([__props.rounded, "overflow-hidden"])
        }, [
          showBlocky.value ? (openBlock(), createElementBlock("canvas", {
            key: 0,
            class: "w-full h-full aspect-square",
            ref_key: "canvasRef",
            ref: canvasRef,
            width: "20",
            height: "20"
          }, null, 512)) : (openBlock(), createElementBlock("img", {
            key: 1,
            class: "w-full h-full aspect-square",
            alt: "wallet icon",
            width: "40",
            height: "40",
            src: uncompressedData.value ?? ""
          }, null, 8, _hoisted_2$8))
        ], 2),
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});

const _hoisted_1$f = {
  key: 0,
  class: "absolute -bottom-2 -right-2 w-6 h-6 rounded-sm bg-bg-app p-0.5"
};
const _hoisted_2$7 = {
  key: 0,
  class: "w-full flex flex-row et-js-ic et-gap-sm"
};
const _hoisted_3$4 = { class: "h-full flex flex-col grow et-jc-is" };
const _hoisted_4$4 = { class: "text-left break-all" };
const _hoisted_5$4 = { class: "p-card-footer-compact px-3 py-1.5 flex et-js-ic et-gap-sm" };
const _hoisted_6$3 = { class: "" };
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "AccountSignItemCard",
  props: {
    walletId: { type: String, required: true },
    accountId: { type: String, required: true },
    disabled: { type: Boolean, required: false, default: false },
    isSigned: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: false, default: false },
    isConnecting: { type: Boolean, required: false, default: false },
    isCollapsed: { type: Boolean, required: false, default: false },
    compact: { type: Boolean, required: false, default: false },
    hideHighlight: { type: Boolean, required: false, default: false },
    hideSignState: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const _walletId = computed(() => props.walletId);
    const _accountId = computed(() => props.accountId);
    const {
      walletSettings,
      accountSettings,
      appWallet,
      appAccount
    } = useWalletAccount(_walletId, _accountId);
    const walletName = walletSettings.name;
    const accountName = accountSettings.nameShort;
    const signState = computed(() => {
      if (props.isConnecting) {
        return {
          label: $t("sign-tx:account.status.connecting"),
          color: "bg-yellow"
        };
      }
      if (props.isSigned) {
        return {
          label: $t("sign-tx:account.status.signed"),
          color: "bg-green"
        };
      } else {
        if (props.isActive) {
          return {
            label: $t("sign-tx:account.status.unsignedActive"),
            color: "bg-yellow"
          };
        } else {
          return {
            label: $t("sign-tx:account.status.unsigned"),
            color: "bg-red"
          };
        }
      }
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return unref(appAccount) ? (openBlock(), createBlock(_component_Card, {
        key: 0,
        class: normalizeClass(__props.isActive ? __props.hideHighlight ? "" : "border border-border-highlight" : ""),
        pt: {
          body: "p-card-body-compact h-full",
          content: "grow"
        }
      }, createSlots({
        content: withCtx(() => [
          createVNode(_component_Button, {
            class: normalizeClass(["relative p-card-content-compact h-full flex flex-row et-jc-ic et-gap-md border-0 border-b-1 border-bg-1", (__props.compact ? "p-2 sm:p-3 " : "p-3 sm:p-3.5 ") + (__props.isCollapsed ? "et-js-ic p-3!" : "et-js-ic")]),
            "data-ui": __props.isCollapsed ? "compact" : "",
            disabled: __props.disabled,
            severity: "secondary",
            text: ""
          }, {
            default: withCtx(() => [
              createVNode(_sfc_main$m, {
                class: normalizeClass(["shrink-0 aspect-square cursor-pointer", __props.compact ? "w-9" : __props.isCollapsed ? "w-10" : "w-10 sm:w-12"]),
                "icon-seed": unref(appWallet)?.data.settings.plate.image ?? void 0,
                "icon-data": unref(appWallet)?.data.settings.plate.data ?? void 0
              }, {
                default: withCtx(() => [
                  unref(appWallet) && !unref(appWallet).isMnemonic ? (openBlock(), createElementBlock("div", _hoisted_1$f, [
                    unref(appWallet).isHardware ? (openBlock(), createBlock(_sfc_main$q, {
                      key: 0,
                      class: "w-full h-full",
                      "sign-type": unref(appWallet)?.data.wallet.signType
                    }, null, 8, ["sign-type"])) : unref(appWallet).isMultiSig ? (openBlock(), createBlock(MultiSigGradient, {
                      key: 1,
                      class: "w-full h-full"
                    })) : unref(appWallet).isReadOnly ? (openBlock(), createBlock(IconLockEnabled, {
                      key: 2,
                      class: "w-full h-full"
                    })) : unref(appWallet).isCLI ? (openBlock(), createBlock(IconComputerProgramming01, {
                      key: 3,
                      class: "w-full h-full"
                    })) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["class", "icon-seed", "icon-data"]),
              !__props.isCollapsed ? (openBlock(), createElementBlock("div", _hoisted_2$7, [
                createBaseVNode("div", _hoisted_3$4, [
                  createBaseVNode("div", _hoisted_4$4, [
                    createTextVNode(toDisplayString(unref(walletName)) + " ", 1),
                    createBaseVNode("span", null, "(" + toDisplayString(unref(accountName)) + ")", 1)
                  ])
                ])
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["class", "data-ui", "disabled"])
        ]),
        _: 2
      }, [
        !__props.hideSignState ? {
          name: "footer",
          fn: withCtx(() => [
            createBaseVNode("div", _hoisted_5$4, [
              createBaseVNode("div", {
                class: normalizeClass(["h-3.5 w-3.5 rounded-full", signState.value.color])
              }, null, 2),
              createBaseVNode("div", _hoisted_6$3, toDisplayString(signState.value.label), 1)
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["class"])) : createCommentVNode("", true);
    };
  }
});

const _sfc_main$k = {  };

const _hoisted_1$e = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$8(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$e, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M4.513 19.487c2.512 2.392 5.503 1.435 6.7.466c.618-.501.897-.825 1.136-1.065c.837-.777.784-1.555.24-2.177c-.219-.249-1.616-1.591-2.956-2.967c-.694-.694-1.172-1.184-1.582-1.58c-.547-.546-1.026-1.172-1.744-1.154c-.658 0-1.136.58-1.735 1.179c-.688.688-1.196 1.555-1.375 2.333c-.539 2.273.299 3.888 1.316 4.965m0 0L2 21.999M19.487 4.515c-2.513-2.394-5.494-1.42-6.69-.45c-.62.502-.898.826-1.138 1.066c-.837.778-.784 1.556-.239 2.178c.078.09.31.32.635.644m7.432-3.438c1.017 1.077 1.866 2.71 1.327 4.985c-.18.778-.688 1.645-1.376 2.334c-.598.598-1.077 1.179-1.735 1.179c-.718.018-1.09-.502-1.639-1.048m3.423-7.45L22 2m-5.936 9.964c-.41-.395-.994-.993-1.688-1.687c-.858-.882-1.74-1.75-2.321-2.325m4.009 4.012l-1.562 1.524m-3.99-3.983l1.543-1.553",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconConnect = /*#__PURE__*/_export_sfc(_sfc_main$k, [['render',_sfc_render$8]]);

const _sfc_main$j = {  };

const _hoisted_1$d = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$7(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$d, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      color: "currentColor"
    }, [
      createBaseVNode("path", { d: "m18 18.5l.278-1.386c.146-.733.538-1.41.678-2.144q.045-.229.044-.47a2.5 2.5 0 1 0-4.956.47c.14.735.532 1.41.679 2.144L15 18.5m3 0h-3m3 0l2.497.666A1.92 1.92 0 0 1 22 21.04c0 .53-.43.96-.96.96h-9.08a.96.96 0 0 1-.96-.96c0-.9.625-1.679 1.503-1.874L15 18.5M17 9V8c0-2.828 0-4.243-.879-5.121C15.243 2 13.828 2 11 2H8c-2.828 0-4.243 0-5.121.879C2 3.757 2 5.172 2 8v8c0 2.828 0 4.243.879 5.121C3.757 22 5.172 22 8 22" }),
      createBaseVNode("path", { d: "M7 8.667s.625 0 1.25 1.333c0 0 1.985-3.333 3.75-4m-6 8h4m-4 3h4" })
    ], -1)
  ]))]))
}
const IconValidationApproval = /*#__PURE__*/_export_sfc(_sfc_main$j, [['render',_sfc_render$7]]);

const _sizeMap = {
  tiny: "h-6",
  thin: "h-8",
  normal: "",
  thick: "h-16"
};
const getButtonSize = (buttonSize) => {
  return _sizeMap[buttonSize];
};

const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "ButtonGradient",
  props: {
    size: { type: String, required: false, default: "normal" }
  },
  setup(__props) {
    const props = __props;
    const _size = computed(() => getButtonSize(props.size));
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, mergeProps(_ctx.$attrs, {
        class: ["et-btn et-bg-highlight et-bg-highlight-hover disabled:grayscale", _size.value],
        rounded: "",
        pt: { label: "whitespace-nowrap" }
      }), createSlots({ _: 2 }, [
        renderList(_ctx.$slots, (_, name) => {
          return {
            name,
            fn: withCtx((slotProps) => [
              renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotProps || {})))
            ])
          };
        })
      ]), 1040, ["class"]);
    };
  }
});

const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "ButtonGradientCountdown",
  props: {
    label: { type: String },
    duration: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const secondsLeft = ref(props.duration);
    const countDownFinished = computed(() => secondsLeft.value <= 0);
    const id = setInterval(() => {
      secondsLeft.value -= 1;
      if (secondsLeft.value < 1) {
        secondsLeft.value = 0;
        clearInterval(id);
      }
    }, 1e3);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$i, {
        label: __props.label + (secondsLeft.value > 0 ? " (" + secondsLeft.value + ")" : ""),
        disabled: __props.disabled || !countDownFinished.value
      }, {
        icon: withCtx(() => [
          renderSlot(_ctx.$slots, "icon")
        ]),
        _: 3
      }, 8, ["label", "disabled"]);
    };
  }
});

const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "ButtonOutline",
  props: {
    size2: { type: String, required: false, default: "normal" }
  },
  setup(__props) {
    const props = __props;
    const _size = computed(() => getButtonSize(props.size2));
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, mergeProps(_ctx.$attrs, {
        class: ["", _size.value],
        severity: "secondary",
        rounded: "",
        outlined: "",
        pt: { label: "whitespace-nowrap" }
      }), createSlots({ _: 2 }, [
        renderList(_ctx.$slots, (_, name) => {
          return {
            name,
            fn: withCtx((slotProps) => [
              renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotProps || {})))
            ])
          };
        })
      ]), 1040, ["class"]);
    };
  }
});

const _hoisted_1$c = {
  ref: "bg2",
  class: "relative w-full h-full"
};
const _hoisted_2$6 = { key: 2 };
const _hoisted_3$3 = {
  key: 3,
  class: "modal-header px-4 sm:px-6 base-10 shrink-0 w-full flex flex-col et-js-is gap-0"
};
const _hoisted_4$3 = { class: "w-full relative flex flex-row et-jb-is et-gap-md" };
const _hoisted_5$3 = {
  key: 0,
  class: "w-full"
};
const _hoisted_6$2 = {
  key: 0,
  class: "modal-content grow w-full flex flex-col et-js-is pl-3 sm:pl-5 pr-1 sm:pr-2 overflow-hidden"
};
const _hoisted_7$2 = {
  key: 4,
  class: "modal-footer relative px-4 sm:px-6 base-10 shrink-0 w-full"
};
const _hoisted_8$2 = {
  key: 0,
  class: "w-full"
};
const d = 0.2;
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  props: {
    modalContainer: { type: String, required: false, default: "#eternl-modal" },
    modalName: { type: String, required: false, default: "" },
    tabGroup: { type: String, required: false, default: "default" },
    explicitWidth: { type: String, required: false, default: "" },
    bgBlack: { type: String, required: false, default: "bg-black/50" },
    bgBlur: { type: String, required: false, default: "backdrop-blur-modal" },
    shadow: { type: String, required: false, default: "" },
    wide: { type: Boolean, required: false, default: false },
    halfWide: { type: Boolean, required: false, default: false },
    halfHeight: { type: Boolean, required: false, default: false },
    fullHeight: { type: Boolean, required: false, default: false },
    narrow: { type: Boolean, required: false, default: false },
    fullWidthOnMobile: { type: Boolean, required: false, default: false },
    almostFullHeightOnMobile: { type: Boolean, required: false, default: false },
    fullHeightOnMobile: { type: Boolean, required: false, default: false },
    stickyNoJump: { type: Boolean, required: false, default: false },
    cssWidth: { type: String, required: false, default: "" },
    cssTopGradient: { type: String, required: false, default: "et-bg-highlight" },
    noBackground: { type: Boolean, required: false, default: false },
    isDappBrowser: { type: Boolean, required: false, default: false },
    blurBackground: { type: Boolean, required: false, default: true },
    customBackground: { type: String, required: false, default: "" },
    persistent: { type: Boolean, required: false, default: false },
    attachToBottom: { type: Boolean, required: false, default: false },
    tweenUp: { type: Boolean, required: false, default: false },
    attachToRight: { type: Boolean, required: false, default: false },
    showHeaderDivider: { type: Boolean, required: false, default: false },
    showFooterDivider: { type: Boolean, required: false, default: false },
    hideHighlight: { type: Boolean, required: false, default: false },
    showHeaderBanner: { type: Boolean, required: false, default: false },
    showInvisible: { type: Boolean, required: false, default: false }
  },
  emits: ["preClose", "close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { modalHeaderBanner } = useTheme();
    const showBlurBgs = useLocalStorage("showBlurBgs", true, { listenToStorageChanges: true });
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const {
      height,
      isSmallerThanLG
    } = useScreenSize();
    const { currentDirection } = useRtlHelper();
    const bgBlack = computed(() => {
      const bg2 = props.bgBlack;
      if (bg2 !== "bg-black/50") {
        return bg2;
      }
      return showBlurBgs.value ? props.bgBlack : "bg-black/95";
    });
    const bgBlur = computed(() => {
      const bg2 = props.bgBlur;
      if (bg2 !== "backdrop-blur-modal") {
        return bg2;
      }
      return showBlurBgs.value ? props.bgBlur : "";
    });
    const isRightAttachment = computed(() => props.attachToRight && currentDirection.value === "ltr");
    const isLeftAttachment = computed(() => props.attachToRight && currentDirection.value === "rtl");
    const hasSlotHeader = computed(() => slots.hasOwnProperty("header"));
    const hasSlotHeaderDivider = computed(() => slots.hasOwnProperty("header-divider"));
    const hasSlotContent = computed(() => slots.hasOwnProperty("content"));
    const hasSlotFooter = computed(() => slots.hasOwnProperty("footer"));
    const hasSlotFooterDivider = computed(() => slots.hasOwnProperty("footer-divider"));
    const stickyAnchor = computed(() => {
      const h = height.value * 0.2;
      if (h < 0) {
        return 0;
      }
      if (h > 200) {
        return 200;
      }
      return Math.floor(h);
    });
    const bg = ref();
    const modal = ref();
    const modalFocus = ref();
    const _in = ref(false);
    const handleESC = () => !props.persistent && handleClose();
    const handleClose = () => {
      emit("preClose");
      _in.value = true;
      tweenOut();
    };
    const tweenIn = () => {
      if (_in.value) {
        return;
      }
      _in.value = true;
      const b = bg.value;
      const m = modal.value;
      const ease = "sine.inOut";
      const duration = d;
      const opacity = 1;
      if (!m) {
        return;
      }
      if (b) {
        gsapWithCSS.set(b, { opacity: 0, y: 0 });
        gsapWithCSS.to(b, { opacity, duration, ease });
      }
      const customTween = props.attachToBottom || props.attachToRight;
      if (props.attachToBottom) {
        gsapWithCSS.set(m, { y: "70%", opacity: 0 });
        gsapWithCSS.to(m, { y: 0, opacity, duration, ease });
      }
      if (props.attachToRight) {
        if (currentDirection.value === "rtl") {
          gsapWithCSS.set(m, { x: "-70%", opacity: 0 });
          gsapWithCSS.to(m, { x: 0, opacity, duration, ease });
        } else {
          gsapWithCSS.set(m, { x: "70%", opacity: 0 });
          gsapWithCSS.to(m, { x: 0, opacity, duration, ease });
        }
      }
      if (!customTween) {
        gsapWithCSS.set(m, { scale: props.tweenUp ? 1.15 : 0.85, opacity: 0 });
        gsapWithCSS.to(m, { scale: 1, opacity, duration, ease });
      }
      if (modalFocus.value && !props.persistent) {
        modalFocus.value.focus();
      } else if (modal.value) {
        modal.value.focus();
      }
    };
    const tweenOut = (instant = false) => {
      if (!_in.value) {
        return;
      }
      _in.value = false;
      const b = bg.value;
      const m = modal.value;
      if (!m) {
        return;
      }
      const customTween = props.attachToBottom || props.attachToRight || props.isDappBrowser;
      const duration = instant ? 0 : d;
      const delay = instant ? 0 : d - 0.15;
      const ease = "sine.inOut";
      const opacity = 0;
      if (b) {
        gsapWithCSS.to(b, { opacity, duration, delay });
      }
      if (!customTween) {
        gsapWithCSS.to(m, { scale: props.tweenUp ? 1.15 : 0.85, opacity, duration, ease, onComplete: () => {
          emit("close");
        } });
      }
      if (props.attachToBottom) {
        gsapWithCSS.to(m, { y: "100%", duration, onComplete: () => {
          emit("close");
        } });
      }
      if (props.attachToRight) {
        if (currentDirection.value === "rtl") {
          gsapWithCSS.to(m, { x: "-100%", duration, ease, onComplete: () => {
            emit("close");
          } });
        } else {
          gsapWithCSS.to(m, { x: "100%", duration, ease, onComplete: () => {
            emit("close");
          } });
        }
      }
    };
    watch(() => props.tweenUp, () => {
      if (props.tweenUp) tweenOut();
    });
    onMounted(() => {
      if (!props.isDappBrowser) {
        return tweenIn();
      } else {
        _in.value = true;
        return tweenOut(true);
      }
    });
    const getBorderRounded = () => {
      if (props.attachToBottom) {
        return props.fullWidthOnMobile ? "lg:rounded-t-2xl" : "rounded-t-2xl";
      }
      if (isRightAttachment.value) {
        return props.fullWidthOnMobile ? "lg:rounded-none" : "rounded-l-2xl";
      }
      if (isLeftAttachment.value) {
        return props.fullWidthOnMobile ? "lg:rounded-none" : "rounded-r-2xl";
      }
      return props.fullWidthOnMobile ? "sm:rounded-2xl" : "rounded-2xl";
    };
    const modalHeight = computed(() => {
      let height2 = "";
      if (props.halfHeight) {
        height2 += "max-h-2xl ";
      } else {
        height2 += "max-h-full ";
      }
      if (props.fullHeight) {
        height2 += "h-full ";
      } else {
        if (props.almostFullHeightOnMobile) {
          height2 += "max-h-[90%] sm:h-auto ";
        } else if (props.fullHeightOnMobile) {
          height2 += "h-full  sm:h-auto ";
        } else {
          height2 += "h-auto ";
        }
      }
      return height2;
    });
    const getModalPadding = computed(() => {
      let pt = "pt-2";
      let pb = "pb-2";
      let px = "px-4 sm:px-10 lg:px-20";
      let rest = "";
      if (isSmallerThanLG.value) {
        pt = "pt-0";
        pb = "pb-0";
      }
      if (props.fullWidthOnMobile && props.wide) {
        px = "lg:px-4";
      } else if (props.fullWidthOnMobile) {
        px = "lg:px-20";
      }
      if (props.attachToBottom) {
        pb = "pb-0";
        rest = "justify-end!";
      }
      if (isRightAttachment.value) {
        pt = "pt-0";
        pb = "pb-0";
        px = "px-0";
        rest = "items-end!";
      }
      if (isLeftAttachment.value) {
        pt = "pt-0";
        pb = "pb-0";
        px = "px-0";
        rest = "items-start!";
      }
      return px + " " + pt + " " + pb + " " + rest;
    });
    __expose({ handleClose, tweenIn, tweenOut });
    return (_ctx, _cache) => {
      const _directive_focustrap = resolveDirective("focustrap");
      return openBlock(), createBlock(Teleport, {
        defer: "",
        to: __props.modalContainer
      }, [
        createBaseVNode("div", {
          class: normalizeClass((__props.showInvisible ? "opacity-0" : "") + __props.modalName + " modal absolute block min-h-modal " + (!__props.noBackground ? "inset-0 w-full h-full overflow-hidden" : __props.attachToBottom ? "bottom-0 inset-x-0 w-full" : isRightAttachment.value ? "right-0 inset-y-0 h-full" : isLeftAttachment.value ? "left-0 inset-y-0 h-full" : "") + " " + __props.cssWidth + " " + (__props.isDappBrowser && !_in.value || !_in.value ? "pointer-events-none!" : "") + " " + (_in.value ? "pointer-events-auto" : "pointer-events-none!"))
        }, [
          createBaseVNode("div", _hoisted_1$c, [
            !__props.noBackground ? (openBlock(), createElementBlock("div", {
              key: 0,
              ref_key: "bg",
              ref: bg,
              class: normalizeClass([
                "absolute block inset-0 w-full h-full",
                (!__props.noBackground && (!__props.isDappBrowser || __props.isDappBrowser && _in.value) ? bgBlack.value : "") + " " + (__props.blurBackground && (!__props.isDappBrowser || __props.isDappBrowser && _in.value) ? bgBlur.value : "") + " "
              ])
            }, null, 2)) : createCommentVNode("", true),
            withDirectives((openBlock(), createElementBlock("div", {
              class: normalizeClass(["relative w-full h-full flex flex-col outline-transparent", getModalPadding.value + " " + (__props.stickyNoJump ? "et-js-ic" : "et-jc-ic")]),
              style: normalizeStyle(__props.stickyNoJump ? "padding-top:" + stickyAnchor.value + "px;" : "")
            }, [
              !__props.noBackground ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "modalFocus",
                ref: modalFocus,
                class: normalizeClass(["absolute block inset-0 w-full h-full outline-transparent", __props.persistent ? "" : "cursor-pointer"]),
                tabindex: "0",
                onKeydown: [
                  withKeys(handleESC, ["esc"]),
                  withKeys(handleESC, ["space"]),
                  withKeys(handleESC, ["enter"])
                ],
                onClick: withModifiers(handleESC, ["stop", "prevent"])
              }, null, 34)) : createCommentVNode("", true),
              withDirectives((openBlock(), createElementBlock("div", {
                ref_key: "modal",
                ref: modal,
                role: "dialog",
                "aria-modal": "true",
                class: normalizeClass(["relative modal-inner w-full flex flex-col outline-transparent et-jc-ic et-min-width-app bg-bg-app", (__props.explicitWidth ? __props.explicitWidth : __props.wide ? "max-w-full" : __props.narrow ? " sm:max-w-(--breakpoint-sm)!" : __props.halfWide ? " max-w-4xl" : " max-w-7xl") + " " + (_in.value ? "pointer-events-auto" : "pointer-events-none") + " " + modalHeight.value + " " + (__props.isDappBrowser ? "" : "pb-4 sm:pb-5") + " " + (__props.showHeaderDivider ? "" : "et-gap-sme sm:et-gap-mde") + " " + (__props.showHeaderBanner && unref(modalHeaderBanner) ? "" : "pt-4 sm:pt-5") + " " + (__props.customBackground ? __props.customBackground : "") + " " + (__props.shadow ? __props.shadow : isRightAttachment.value ? "shadow-modal-right" : isLeftAttachment.value ? "shadow-modal-left" : "shadow-modal-center") + " " + getBorderRounded()])
              }, [
                !__props.hideHighlight && (!__props.showHeaderBanner || !unref(modalHeaderBanner)) ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["w-full h-8 absolute top-0 overflow-hidden", __props.attachToRight ? "" : "lg:rounded-2xl"])
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-full h-1.5 absolute top-0", __props.cssTopGradient])
                  }, null, 2)
                ], 2)) : createCommentVNode("", true),
                __props.showHeaderBanner && (unref(modalHeaderBanner) || _ctx.$slots["modal-header-banner"]) ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  id: "modal-header-banner",
                  class: normalizeClass(["absolute w-full h-20 top-0", getBorderRounded() + " rounded-b-none!"])
                }, [
                  _ctx.$slots["modal-header-banner"] ? renderSlot(_ctx.$slots, "modal-header-banner", { key: 0 }) : (openBlock(), createBlock(resolveDynamicComponent(unref(modalHeaderBanner)), { key: 1 }))
                ], 2)) : createCommentVNode("", true),
                __props.showHeaderBanner && (unref(modalHeaderBanner) || _ctx.$slots["modal-header-banner"]) ? (openBlock(), createElementBlock("div", _hoisted_2$6)) : createCommentVNode("", true),
                hasSlotHeader.value ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
                  createBaseVNode("div", _hoisted_4$3, [
                    renderSlot(_ctx.$slots, "header", { handleClose })
                  ]),
                  __props.showHeaderDivider && hasSlotHeaderDivider.value ? (openBlock(), createElementBlock("div", _hoisted_5$3, [
                    renderSlot(_ctx.$slots, "header-divider")
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "contentRoot", { handleClose }, () => [
                  hasSlotContent.value ? (openBlock(), createElementBlock("div", _hoisted_6$2, [
                    createBaseVNode("div", {
                      class: normalizeClass(["relative grow flex w-full pl-1 pt-1 pr-1 sm:pr-2 et-scrollbar scroll-anchor overflow-y-scroll", __props.attachToBottom ? "pb-0" : "pb-1"])
                    }, [
                      renderSlot(_ctx.$slots, "content", { handleClose })
                    ], 2)
                  ])) : createCommentVNode("", true)
                ]),
                hasSlotFooter.value ? (openBlock(), createElementBlock("div", _hoisted_7$2, [
                  __props.showFooterDivider && hasSlotFooterDivider.value ? (openBlock(), createElementBlock("div", _hoisted_8$2, [
                    renderSlot(_ctx.$slots, "footer-divider")
                  ])) : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "footer", { handleClose })
                ])) : createCommentVNode("", true)
              ], 2)), [
                [_directive_focustrap, __props.persistent]
              ])
            ], 6)), [
              [_directive_focustrap, !__props.persistent]
            ])
          ], 512)
        ], 2)
      ], 8, ["to"]);
    };
  }
});

const _sfc_main$e = {  };

const _hoisted_1$b = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$6(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$b, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M15 6s-6 4.419-6 6s6 6 6 6",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconChevronLeft = /*#__PURE__*/_export_sfc(_sfc_main$e, [['render',_sfc_render$6]]);

const _sfc_main$d = {  };

const _hoisted_1$a = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$5(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$a, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",
      fill: "none",
      color: "currentColor",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconChevronRight = /*#__PURE__*/_export_sfc(_sfc_main$d, [['render',_sfc_render$5]]);

const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "ButtonHeaderBack",
  props: {
    showRight: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg backdrop-blur-xs",
        severity: "secondary",
        rounded: "",
        outlined: ""
      }, {
        icon: withCtx(() => [
          !__props.showRight ? (openBlock(), createBlock(IconChevronLeft, {
            key: 0,
            class: "w-5 h-5 sm:w-6 sm:h-6 -ml-0.5"
          })) : (openBlock(), createBlock(IconChevronRight, {
            key: 1,
            class: "w-5 h-5 sm:w-6 sm:h-6 -mr-0.5"
          }))
        ]),
        _: 1
      });
    };
  }
});

const _sfc_main$b = {  };

const _hoisted_1$9 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$9, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      color: "currentColor"
    }, [
      createBaseVNode("path", { d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10" }),
      createBaseVNode("path", { d: "M12.242 17v-5c0-.471 0-.707-.146-.854c-.147-.146-.382-.146-.854-.146m.75-3h.009" })
    ], -1)
  ]))]))
}
const IconInformationCircle = /*#__PURE__*/_export_sfc(_sfc_main$b, [['render',_sfc_render$4]]);

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "ButtonInfo",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg backdrop-blur-xs",
        severity: "secondary",
        rounded: "",
        outlined: ""
      }, {
        icon: withCtx(() => [
          createVNode(IconInformationCircle, { class: "w-4 h-4 sm:w-5 sm:h-5" })
        ]),
        _: 1
      });
    };
  }
});

const _sfc_main$9 = {  };

const _hoisted_1$8 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$8, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M19 5L5 19M5 5l14 14",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconCancel01 = /*#__PURE__*/_export_sfc(_sfc_main$9, [['render',_sfc_render$3]]);

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ButtonClose",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg backdrop-blur-xs",
        severity: "secondary",
        rounded: "",
        outlined: ""
      }, {
        icon: withCtx(() => [
          createVNode(IconCancel01, { class: "w-4 h-4 sm:w-5 sm:h-5" })
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$7 = { class: "w-full flex flex-col mt-2" };
const _hoisted_2$5 = { class: "relative w-full flex flex-row et-gap-sm md:et-gap-md et-jb-ic" };
const _hoisted_3$2 = {
  key: 0,
  class: "w-12 absolute top-0 left-0"
};
const _hoisted_4$2 = {
  key: 1,
  class: "absolute top-0 left-0 flex flex-row et-js-is et-gap-sm"
};
const _hoisted_5$2 = { class: "cap-first" };
const _hoisted_6$1 = { class: "text-txt-muted whitespace-pre-line cap-first" };
const _hoisted_7$1 = {
  key: 2,
  class: "absolute top-0 right-0 flex flex-row et-js-ie et-gap-sm"
};
const _hoisted_8$1 = {
  key: 3,
  class: "w-12 absolute top-0 right-0"
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ModalHeader",
  props: {
    headline: { type: String, required: false, default: "" },
    caption: { type: String, required: false, default: "" },
    hideBack: { type: Boolean, required: false, default: false },
    hideInfo: { type: Boolean, required: false, default: false },
    showClose: { type: Boolean, required: false, default: false },
    textLeft: { type: Boolean, required: false, default: false },
    showRight: { type: Boolean, required: false, default: false }
  },
  emits: ["back", "info", "close"],
  setup(__props) {
    const { isRtl } = useRtlHelper();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createBaseVNode("div", _hoisted_2$5, [
          !unref(isRtl) ? (openBlock(), createElementBlock("div", _hoisted_3$2, [
            renderSlot(_ctx.$slots, "icon"),
            !__props.hideBack ? (openBlock(), createBlock(_sfc_main$c, {
              key: 0,
              "show-right": __props.showRight,
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("back"))
            }, null, 8, ["show-right"])) : createCommentVNode("", true)
          ])) : (openBlock(), createElementBlock("div", _hoisted_4$2, [
            renderSlot(_ctx.$slots, "pre-info"),
            !__props.hideInfo ? (openBlock(), createBlock(_sfc_main$a, {
              key: 0,
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("info"))
            })) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "pre-close"),
            __props.showClose ? (openBlock(), createBlock(_sfc_main$8, {
              key: 1,
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("close"))
            })) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "info")
          ])),
          createBaseVNode("div", {
            class: normalizeClass(["w-full flex flex-col et-gap-sm sm:et-gap-md", __props.textLeft ? "et-jc-is" : "et-jc-ic"])
          }, [
            createBaseVNode("div", {
              class: normalizeClass([
                (__props.textLeft ? "et-js-ic text-left" : "px-14 et-jc-ic text-center") + " " + (__props.hideBack ? "" : unref(isRtl) ? "pr-16! " : "pl-16! "),
                "w-full min-h-12 flex et-text-xl font-semibold"
              ])
            }, [
              createBaseVNode("span", _hoisted_5$2, toDisplayString(__props.headline), 1),
              renderSlot(_ctx.$slots, "headline")
            ], 2),
            __props.caption ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass([__props.textLeft ? "text-left" : "text-center", "flex flex-row et-js-ic et-gap-sm"])
            }, [
              renderSlot(_ctx.$slots, "pre-caption"),
              createBaseVNode("span", _hoisted_6$1, toDisplayString(__props.caption), 1),
              renderSlot(_ctx.$slots, "post-caption")
            ], 2)) : createCommentVNode("", true)
          ], 2),
          !unref(isRtl) ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
            renderSlot(_ctx.$slots, "pre-info"),
            !__props.hideInfo ? (openBlock(), createBlock(_sfc_main$a, {
              key: 0,
              onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("info"))
            })) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "pre-close"),
            __props.showClose ? (openBlock(), createBlock(_sfc_main$8, {
              key: 1,
              onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("close"))
            })) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "info")
          ])) : (openBlock(), createElementBlock("div", _hoisted_8$1, [
            renderSlot(_ctx.$slots, "icon"),
            !__props.hideBack ? (openBlock(), createBlock(_sfc_main$c, {
              key: 0,
              "show-right": !__props.showRight,
              onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("back"))
            }, null, 8, ["show-right"])) : createCommentVNode("", true)
          ]))
        ])
      ]);
    };
  }
});

const _sfc_main$6 = {  };

const _hoisted_1$6 = { class: "modal-content-card relative grow min-h-full max-w-full flex flex-col et-js-is et-gap-md" };

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("div", _hoisted_1$6, [
    renderSlot(_ctx.$slots, "default")
  ]))
}
const ModalContentCard = /*#__PURE__*/_export_sfc(_sfc_main$6, [['render',_sfc_render$2]]);

const _sfc_main$5 = {  };

const _hoisted_1$5 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$5, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      color: "currentColor"
    }, [
      createBaseVNode("path", { d: "M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" }),
      createBaseVNode("path", { d: "m8 12.5l2.5 2.5L16 9" })
    ], -1)
  ]))]))
}
const IconCheckmarkSquare02 = /*#__PURE__*/_export_sfc(_sfc_main$5, [['render',_sfc_render$1]]);

const _hoisted_1$4 = { class: "et-text-md font-semibold text-txt-positive cap-first" };
const _hoisted_2$4 = {
  key: 0,
  class: "text-txt-positive break-words whitespace-pre-wrap"
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "BannerPositive",
  props: {
    headline: { type: String },
    caption: { type: String }
  },
  setup(__props) {
    const panel = ref();
    const onToggleCollapsed = () => {
      panel.value?.toggle();
    };
    return (_ctx, _cache) => {
      const _component_Panel = resolveComponent("Panel");
      return openBlock(), createBlock(_component_Panel, {
        ref_key: "panel",
        ref: panel,
        class: "w-full bg-bg-positive rounded-2xl!",
        pt: {
          pctogglebutton: {
            root: "bg-bg-positive hover:bg-bg-app/20 text-txt-positive outline-txt-positive"
          },
          content: __props.caption ? "" : "py-0"
        },
        toggleable: !!__props.caption && __props.caption.length > 0
      }, {
        header: withCtx(() => [
          createBaseVNode("div", {
            class: "w-full flex et-ic et-gap-sme cursor-pointer",
            onClick: onToggleCollapsed
          }, [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              createVNode(IconCheckmarkSquare02, { class: "shrink-0 grow-0 w-5 sm:w-6 fill-none text-txt-positive" })
            ]),
            createBaseVNode("span", _hoisted_1$4, toDisplayString(__props.headline), 1)
          ])
        ]),
        default: withCtx(() => [
          __props.caption ? (openBlock(), createElementBlock("span", _hoisted_2$4, toDisplayString(__props.caption), 1)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["pt", "toggleable"]);
    };
  }
});

const _hoisted_1$3 = { class: "et-text-md font-semibold text-txt-reduced cap-first" };
const _hoisted_2$3 = {
  key: 1,
  class: "text-txt-muted break-words whitespace-pre-wrap"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BannerNeutral",
  props: {
    headline: { type: String },
    caption: { type: String }
  },
  setup(__props) {
    const panel = ref();
    const onToggleCollapsed = () => {
      panel.value?.toggle();
    };
    return (_ctx, _cache) => {
      const _component_Panel = resolveComponent("Panel");
      return openBlock(), createBlock(_component_Panel, {
        ref_key: "panel",
        ref: panel,
        class: "w-full rounded-2xl! border-1 border-gray/25",
        pt: {
          pctogglebutton: {
            root: "hover:bg-bg-app/20 outline-txt-1"
          }
        },
        toggleable: !!__props.caption && __props.caption.length > 0
      }, {
        header: withCtx(() => [
          createBaseVNode("div", {
            class: "w-full flex et-ic et-gap-sme cursor-pointer",
            onClick: onToggleCollapsed
          }, [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              createVNode(IconInformationCircle, { class: "shrink-0 grow-0 w-5 sm:w-6 fill-none text-txt-reduced" })
            ]),
            createBaseVNode("span", _hoisted_1$3, toDisplayString(__props.headline), 1)
          ])
        ]),
        default: withCtx(() => [
          _ctx.$slots.caption ? renderSlot(_ctx.$slots, "caption", { key: 0 }) : __props.caption ? (openBlock(), createElementBlock("span", _hoisted_2$3, toDisplayString(__props.caption), 1)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["toggleable"]);
    };
  }
});

const _sfc_main$2 = {  };

const _hoisted_1$2 = { class: "w-full flex flex-row et-jb-ic et-gap-sm my-0" };
const _hoisted_2$2 = {
  key: 0,
  class: "shrink-0 grow-0"
};

function _sfc_render(_ctx, _cache) {
  const _component_Divider = resolveComponent("Divider", true);

  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createVNode(_component_Divider, { class: "w-full my-0" }),
    (_ctx.$slots.default)
      ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
          renderSlot(_ctx.$slots, "default")
        ]))
      : createCommentVNode("", true),
    (_ctx.$slots.default)
      ? (openBlock(), createBlock(_component_Divider, {
          key: 1,
          class: "w-full my-0"
        }))
      : createCommentVNode("", true)
  ]))
}
const Divider = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render]]);

const _hoisted_1$1 = { class: "break-all" };
const _hoisted_2$1 = { class: "enable-layout relative w-full flex flex-col et-jb et-gap-sm bg-bg-app" };
const _hoisted_3$1 = { class: "w-full h-full flex flex-wrap et-gap-md" };
const _hoisted_4$1 = { class: "" };
const _hoisted_5$1 = {
  key: 5,
  class: "w-full p-4 et-bg-hazard-border rounded-lg"
};
const _hoisted_6 = { class: "w-full h-full flex flex-col et-jc-ic p-8 et-gap-md rounded-lg et-card-bg-0" };
const _hoisted_7 = {
  key: 0,
  class: "flex et-gap-sm text-txt-negative"
};
const _hoisted_8 = { class: "" };
const _hoisted_9 = {
  key: 0,
  class: "absolute inset-0 p-4 min-h-96 et-bg-hazard-border rounded-lg"
};
const _hoisted_10 = { class: "w-full h-full flex flex-col et-jc-ic p-8 et-gap-md rounded-lg et-card-bg-0" };
const _hoisted_11 = { class: "text-txt-negative" };
const _hoisted_12 = { class: "" };
const _hoisted_13 = ["innerHTML"];
const _hoisted_14 = {
  key: 0,
  class: ""
};
const _hoisted_15 = {
  key: 0,
  class: "shrink-0 grow-0 w-full flex flex-wrap et-je-ic et-gap-sm"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ModalEnableCIP30",
  setup(__props) {
    const $t = useTranslation().t;
    const { showError } = useNotifications();
    const {
      req,
      appAccount,
      showModalEnableCIP30,
      closeModalEnableCIP30
    } = useModalEnableCIP30();
    const modal = ref();
    const { isDomainOnBlockList } = useGuard();
    const isAccountSet = computed(() => !!appAccount.value);
    const dappOrigin = computed(() => req.value?.payload.origin ?? "");
    const extensionRequest = computed(() => req.value?.payload.extensions ?? []);
    const isHTTPS = computed(() => dappOrigin.value?.startsWith("https") ?? false);
    const hasCIP30 = computed(() => extensionRequest.value.some((ext) => ext.cip === 30));
    const hasCIP95 = computed(() => extensionRequest.value.some((ext) => ext.cip === 95));
    const hasCIP104 = computed(() => extensionRequest.value.some((ext) => ext.cip === 104));
    const isScam = ref(false);
    const ackScam = ref(true);
    const updateIsScam = async () => {
      isScam.value = await isDomainOnBlockList(dappOrigin.value);
      ackScam.value = !isScam.value;
    };
    watch(dappOrigin, () => {
      if (dappOrigin.value) {
        updateIsScam();
      }
    }, { immediate: true });
    const onCancel = () => {
      onClose(req.value, errorConnectionRefused());
      if (req.value) {
        req.value.response = errorConnectionRefused();
        req.value.payload?.resolve(true);
      }
    };
    const onConnect = () => onClose(req.value, { success: true, isEnabled: true });
    const onErrorTx = (code, info = "") => onClose(req.value, { success: false, error: { code, info } });
    const onClose = (req2, responseOrError) => {
      console.error("##### onClose", req2, responseOrError);
      if (req2 && responseOrError) {
        req2.response = responseOrError;
        if (req2.response?.success && req2.response?.isEnabled) {
          console.error("##### onClose !!!!", req2.payload.origin, req2.payload.extensions);
          addConnectedOrigin(req2.payload.origin, req2.payload.extensions);
          setOriginAccount(appAccount.value?.id ?? "", req2.payload.origin, req2.payload.domId, true);
        }
      }
      if (modal.value) {
        modal.value.handleClose();
      } else {
        closeModalEnableCIP30();
      }
    };
    const handleRequest = async (_req) => {
      const _appAccount = appAccount.value;
      if (!_req) {
        return onClose();
      }
      if (!_appAccount) {
        return onClose(_req, errorNoAccount());
      }
      try {
        if (_req.response) {
          onClose(_req);
        }
      } catch (err) {
        console.error("handleRequest", err);
        showError("enable: " + (err?.message ?? JSON.stringify(err)));
        onErrorTx(ApiErrorCode.InternalError, err?.message ?? JSON.stringify(err));
      }
    };
    onMounted(() => {
      watch(req, (req2) => {
        if (req2) {
          handleRequest(req2);
        } else {
          onClose();
        }
      });
    });
    return (_ctx, _cache) => {
      return unref(showModalEnableCIP30) ? (openBlock(), createBlock(_sfc_main$f, {
        key: 0,
        ref_key: "modal",
        ref: modal,
        "modal-container": "#eternl-enable",
        narrow: "",
        "full-width-on-mobile": "",
        "attach-to-bottom": "",
        onClose: _cache[4] || (_cache[4] = ($event) => unref(closeModalEnableCIP30)())
      }, {
        header: withCtx(() => [
          createVNode(_sfc_main$7, {
            caption: unref($t)("dapps-enable:caption"),
            "hide-info": "",
            "hide-back": "",
            "show-close": "",
            onClose: onCancel
          }, {
            headline: withCtx(() => [
              createBaseVNode("span", _hoisted_1$1, toDisplayString(unref($t)("dapps-enable:title")) + toDisplayString(dappOrigin.value), 1)
            ]),
            _: 1
          }, 8, ["caption"])
        ]),
        content: withCtx(() => [
          createVNode(ModalContentCard, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_2$1, [
                createBaseVNode("div", _hoisted_3$1, [
                  !isAccountSet.value ? (openBlock(), createBlock(_sfc_main$s, {
                    key: 0,
                    class: "w-full",
                    headline: unref($t)("dapps-enable:noAccount.title"),
                    caption: unref($t)("dapps-enable:noAccount.caption"),
                    toggleable: ""
                  }, null, 8, ["headline", "caption"])) : createCommentVNode("", true),
                  unref(appAccount) ? (openBlock(), createBlock(_sfc_main$l, {
                    key: 1,
                    class: "w-full",
                    "wallet-id": unref(appAccount).walletId,
                    "account-id": unref(appAccount).id,
                    "is-connecting": ""
                  }, null, 8, ["wallet-id", "account-id"])) : createCommentVNode("", true),
                  createVNode(Divider, null, {
                    default: withCtx(() => [
                      createBaseVNode("span", _hoisted_4$1, toDisplayString(unref($t)("dapps-enable:access.url")), 1)
                    ]),
                    _: 1
                  }),
                  isAccountSet.value && isScam.value ? (openBlock(), createBlock(_sfc_main$3, {
                    key: 2,
                    class: "w-full",
                    headline: dappOrigin.value + " (" + unref($t)("dapps-enable:label.possibleScam") + ")",
                    collapsed: ""
                  }, null, 8, ["headline"])) : isAccountSet.value && !isHTTPS.value ? (openBlock(), createBlock(_sfc_main$s, {
                    key: 3,
                    class: "w-full",
                    headline: dappOrigin.value + " (" + unref($t)("dapps-enable:label.notSecure") + ")",
                    collapsed: ""
                  }, null, 8, ["headline"])) : isAccountSet.value && isHTTPS.value ? (openBlock(), createBlock(_sfc_main$4, {
                    key: 4,
                    class: "w-full",
                    headline: dappOrigin.value,
                    collapsed: ""
                  }, null, 8, ["headline"])) : createCommentVNode("", true),
                  isScam.value && ackScam.value ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
                    createBaseVNode("div", _hoisted_6, [
                      _cache[5] || (_cache[5] = createBaseVNode("img", {
                        width: "128",
                        height: "128",
                        src: _imports_0,
                        alt: "Eternl logo"
                      }, null, -1)),
                      ackScam.value ? (openBlock(), createElementBlock("div", _hoisted_7, [
                        createVNode(IconAlert02, { class: "shrink-0 grow-0 w-5 sm:w-6 fill-none text-bg-negative" }),
                        createTextVNode(" " + toDisplayString(unref($t)("guard:app.ownRisk")), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true),
                  isAccountSet.value ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
                    createVNode(Divider, null, {
                      default: withCtx(() => [
                        createBaseVNode("span", _hoisted_8, toDisplayString(unref($t)("dapps-enable:access.features")), 1)
                      ]),
                      _: 1
                    }),
                    hasCIP30.value ? (openBlock(), createBlock(_sfc_main$3, {
                      key: 0,
                      class: "w-full",
                      headline: unref($t)("dapps-enable:cip30.title"),
                      caption: unref($t)("dapps-enable:cip30.caption"),
                      toggleable: "",
                      collapsed: ""
                    }, {
                      icon: withCtx(() => [
                        createVNode(IconConnect, { class: "shrink-0 grow-0 w-5 sm:w-6 fill-none" })
                      ]),
                      _: 1
                    }, 8, ["headline", "caption"])) : createCommentVNode("", true),
                    hasCIP95.value ? (openBlock(), createBlock(_sfc_main$3, {
                      key: 1,
                      class: "w-full",
                      headline: unref($t)("dapps-enable:cip95.title"),
                      caption: unref($t)("dapps-enable:cip95.caption"),
                      toggleable: "",
                      collapsed: ""
                    }, {
                      icon: withCtx(() => [
                        createVNode(IconValidationApproval, { class: "shrink-0 grow-0 w-5 sm:w-6 fill-none" })
                      ]),
                      _: 1
                    }, 8, ["headline", "caption"])) : createCommentVNode("", true),
                    hasCIP104.value ? (openBlock(), createBlock(_sfc_main$3, {
                      key: 2,
                      class: "w-full",
                      headline: unref($t)("dapps-enable:cip104.title"),
                      caption: unref($t)("dapps-enable:cip104.caption"),
                      toggleable: "",
                      collapsed: ""
                    }, {
                      icon: withCtx(() => [
                        createVNode(IconConnect, { class: "shrink-0 grow-0 w-5 sm:w-6 fill-none" })
                      ]),
                      _: 1
                    }, 8, ["headline", "caption"])) : createCommentVNode("", true)
                  ], 64)) : createCommentVNode("", true)
                ])
              ]),
              isScam.value && !ackScam.value ? (openBlock(), createElementBlock("div", _hoisted_9, [
                createBaseVNode("div", _hoisted_10, [
                  _cache[6] || (_cache[6] = createBaseVNode("img", {
                    width: "128",
                    height: "128",
                    src: _imports_0,
                    alt: "Eternl logo"
                  }, null, -1)),
                  createBaseVNode("div", _hoisted_11, toDisplayString(unref($t)("guard:warning")), 1),
                  createBaseVNode("div", _hoisted_12, toDisplayString(unref($t)("guard:app.description")), 1),
                  createBaseVNode("span", {
                    class: "w-full",
                    innerHTML: unref($t)("guard:app.description2")
                  }, null, 8, _hoisted_13),
                  ackScam.value ? (openBlock(), createElementBlock("div", _hoisted_14, toDisplayString(unref($t)("guard:app.ownRisk")), 1)) : createCommentVNode("", true),
                  !ackScam.value ? (openBlock(), createBlock(_sfc_main$h, {
                    key: 1,
                    class: "shrink-0 grow-0 px-8 py-2 h-12",
                    label: unref($t)("dapps-enable:label.confirmRisk"),
                    duration: 10,
                    onClick: _cache[0] || (_cache[0] = ($event) => ackScam.value = true)
                  }, null, 8, ["label"])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        footer: withCtx(() => [
          ackScam.value ? (openBlock(), createElementBlock("div", _hoisted_15, [
            createVNode(_sfc_main$g, {
              class: "grow sm:grow-0",
              label: unref($t)("common:cancel"),
              onClick: _cache[1] || (_cache[1] = ($event) => onCancel())
            }, null, 8, ["label"]),
            isScam.value ? (openBlock(), createBlock(_sfc_main$h, {
              key: 0,
              class: "grow sm:grow-0",
              label: unref($t)("dapps-enable:label.grantAccess"),
              disabled: !isAccountSet.value,
              duration: 10,
              onClick: _cache[2] || (_cache[2] = ($event) => onConnect())
            }, null, 8, ["label", "disabled"])) : (openBlock(), createBlock(_sfc_main$i, {
              key: 1,
              class: "grow sm:grow-0",
              label: unref($t)("dapps-enable:label.grantAccess"),
              disabled: !isAccountSet.value,
              onClick: _cache[3] || (_cache[3] = ($event) => onConnect())
            }, null, 8, ["label", "disabled"]))
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 512)) : createCommentVNode("", true);
    };
  }
});

const enableRequest = "enableRequest";
const signTxRequest = "signTxRequest";
const signDataRequest = "signDataRequest";
const _enableRequest = ref(null);
const _signTxRequest = ref(null);
const _signDataRequest = ref(null);
const enableApiRequest = computed(() => _enableRequest.value);
computed(() => _signTxRequest.value);
computed(() => _signDataRequest.value);
const initRequestStorage = () => {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace !== "local") {
      return;
    }
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (key === enableRequest) {
        _enableRequest.value = newValue;
      } else if (key === signTxRequest) {
        _signTxRequest.value = newValue;
      } else if (key === signDataRequest) {
        _signDataRequest.value = newValue;
      }
    }
  });
  const calls = [];
  calls.push(chrome.storage.local.get(enableRequest).then((res) => {
    _enableRequest.value = res.enableRequest;
  }));
  calls.push(chrome.storage.local.get(signTxRequest).then((res) => {
    _signTxRequest.value = res.signTxRequest;
  }));
  calls.push(chrome.storage.local.get(signDataRequest).then((res) => {
    _signDataRequest.value = res.signDataRequest;
  }));
  return Promise.allSettled(calls);
};

const _hoisted_1 = { class: "fixed w-0 h-0" };
const _hoisted_2 = {
  x1: "17.5",
  y1: "-36.875",
  x2: "26.3744",
  y2: "29.4977",
  id: "gradient_icon_gold_orange_0",
  gradientUnits: "userSpaceOnUse"
};
const _hoisted_3 = {
  x1: "12.5",
  y1: "-78.125",
  x2: "77.2907",
  y2: "99.1629",
  id: "gradient_icon_gold_orange_1",
  gradientUnits: "userSpaceOnUse"
};
const _hoisted_4 = {
  id: "bg-overlay",
  class: "absolute inset-0 w-full h-full pointer-events-none"
};
const _hoisted_5 = { class: "modal-container absolute inset-0 w-full h-full et-min-size-app overflow-hidden pointer-events-none z-100" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    gsapWithCSS.registerPlugin(MotionPathPlugin);
    useTranslation().t;
    const {
      bgOverlay,
      initThemeComponentList
    } = useTheme();
    const {
      gradientBlue,
      gradientViolet,
      gradientRed,
      gradientOrange,
      gradientPurple
    } = useTheme();
    const {
      showNarrowTxViewer,
      showWideTxViewer,
      isTweeningOut
    } = useScreenSize();
    const instance = getCurrentInstance();
    const $toast = instance?.appContext.config.globalProperties.$toast;
    useNotifications($toast);
    initThemeComponentList();
    initRequestStorage();
    const checkPendingApiRequests = () => {
      if (enableApiRequest.value && appAccount$1.value) {
        handleMessage();
      } else if (!appAccount$1.value) ; else if (!enableApiRequest.value) ;
    };
    const handleMessage = async () => {
      const req = enableApiRequest.value;
      if (!req) {
        return;
      }
      if (req.channel !== ApiChannel.bgToEnable && req.channel !== ApiChannel.csToBg) {
        return;
      }
      if (req.api !== METHOD.enable) {
        return;
      }
      const _currentReq = getApiRequest("enable");
      if (_currentReq && _currentReq.reqId === req.reqId) {
        return;
      }
      return new Promise((resolve, reject) => {
        handleApiRequest(req, appAccount$1.value, true, false).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      }).then(() => {
        sendResponse(req);
      }).catch((err) => {
      });
    };
    const width = computed(() => {
      return "transition-all delay-75! " + (showNarrowTxViewer.value && !isTweeningOut.value ? "et-max-width-layout-show-narrow-tx" : showWideTxViewer.value && !isTweeningOut.value ? "et-max-width-layout-show-wide-tx" : "w-full");
    });
    watch([appAccount$1, enableApiRequest], () => checkPendingApiRequests(), { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        (openBlock(), createElementBlock("svg", _hoisted_1, [
          createBaseVNode("defs", null, [
            createBaseVNode("linearGradient", _hoisted_2, [
              createBaseVNode("stop", {
                style: normalizeStyle("stop-color:" + unref(gradientBlue))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "0.21875",
                style: normalizeStyle("stop-color:" + unref(gradientViolet))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "0.473958",
                style: normalizeStyle("stop-color:" + unref(gradientRed))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "0.739583",
                style: normalizeStyle("stop-color:" + unref(gradientOrange))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "1",
                style: normalizeStyle("stop-color:" + unref(gradientPurple))
              }, null, 4)
            ]),
            createBaseVNode("linearGradient", _hoisted_3, [
              createBaseVNode("stop", {
                style: normalizeStyle("stop-color:" + unref(gradientBlue))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "0.21875",
                style: normalizeStyle("stop-color:" + unref(gradientViolet))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "0.473958",
                style: normalizeStyle("stop-color:" + unref(gradientRed))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "0.739583",
                style: normalizeStyle("stop-color:" + unref(gradientOrange))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "1",
                style: normalizeStyle("stop-color:" + unref(gradientPurple))
              }, null, 4)
            ])
          ])
        ])),
        createBaseVNode("div", _hoisted_4, [
          (openBlock(), createBlock(resolveDynamicComponent(unref(bgOverlay))))
        ]),
        createVNode(_sfc_main$1),
        createVNode(_sfc_main$r),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-enable"
          }, null, 2)
        ])
      ], 64);
    };
  }
});

export { _sfc_main as default };
