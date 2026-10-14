import { D as getRef, E as forceSetLS, G as getLanguageTag, H as getTimezone, I as getUseUtc, J as getFormatTag, w as watch, y as computed, K as languageTags, L as defaultTimezone, r as ref, M as addSignalListener, N as el, O as sl, t as getDefaultExportFromCjs$1, P as Buffer$1, Q as __values, R as __spreadArray, S as __read, U as __extends, V as __asyncGenerator, X as __generator, Y as __await, Z as __awaiter, $ as __asyncValues, a0 as getLedgerTransport, d as defineComponent, a1 as useLocalStorage, a2 as useSlots, a3 as useScreenSize, a4 as useRtlHelper, o as onMounted, a5 as resolveDirective, c as createBlock, e as openBlock, a6 as Teleport, k as createBaseVNode, g as createElementBlock, h as createCommentVNode, a7 as withDirectives, j as normalizeClass, a8 as normalizeStyle, a9 as withModifiers, aa as withKeys, u as unref, m as useTheme, ab as renderSlot, ac as resolveDynamicComponent, B as resolveComponent, f as withCtx, p as createVNode, C as toDisplayString, v as useTranslation, ad as getEpochParams, ae as networkId$9, af as onNetworkIdUpdated, ag as getChainTip, ah as watchEffect, x as useDarkMode, ai as useDesktopMenuCollapsed, aj as isBetaApp, F as Fragment, W as WALLET_VERSION_BETA, ak as useElementSize, al as getCurrentInstance } from './permissions.js';
import { g as gsapWithCSS, _ as _export_sfc, G as GradientBar2 } from './AppPermissions.js';

let _offsetFromServer = 0;
const now = () => Date.now() - _offsetFromServer;

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

const getFixPermission = () => getRef("fixPermission", "none");
const setFixPermission = (permission) => {
  const _ref = getFixPermission();
  _ref.value = permission;
  forceSetLS("fixPermission", permission);
};
const getFixPermissionResult = () => getRef("fixPermissionResult", "none");
const setFixPermissionResult = (permission) => {
  const _ref = getFixPermissionResult();
  _ref.value = permission;
  forceSetLS("fixPermissionResult", permission);
};

/*
 *  big.js v7.0.1
 *  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
 *  Copyright (c) 2025 Michael Mclaughlin
 *  https://github.com/MikeMcl/big.js/LICENCE.md
 */


/************************************** EDITABLE DEFAULTS *****************************************/


  // The default values below must be integers within the stated ranges.

  /*
   * The maximum number of decimal places (DP) of the results of operations involving division:
   * div and sqrt, and pow with negative exponents.
   */
var // The maximum value of DP and Big.DP.
  MAX_DP = 1E6,       // 0 to 1000000

  // The maximum magnitude of the exponent argument to the pow method.
  MAX_POWER = 1E6,    // 1 to 1000000

  /**************************************************************************************************/


  // Error messages.
  NAME = '[big.js] ',
  INVALID = NAME + 'Invalid ',
  INVALID_DP = INVALID + 'decimal places',
  INVALID_RM = INVALID + 'rounding mode',
  DIV_BY_ZERO = NAME + 'Division by zero',

  // The shared prototype object.
  P = {},
  UNDEFINED = void 0;


/*
 * Round Big x to a maximum of sd significant digits using rounding mode rm.
 *
 * x {Big} The Big to round.
 * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.
 * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 * [more] {boolean} Whether the result of division was truncated.
 */
function round(x, sd, rm, more) {
  var xc = x.c;

  if (rm === UNDEFINED) rm = x.constructor.RM;
  if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) {
    throw Error(INVALID_RM);
  }

  if (sd < 1) {
    more =
      rm === 3 && (more || !!xc[0]) || sd === 0 && (
      rm === 1 && xc[0] >= 5 ||
      rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED))
    );

    xc.length = 1;

    if (more) {

      // 1, 0.1, 0.01, 0.001, 0.0001 etc.
      x.e = x.e - sd + 1;
      xc[0] = 1;
    } else {

      // Zero.
      xc[0] = x.e = 0;
    }
  } else if (sd < xc.length) {

    // xc[sd] is the digit after the digit that may be rounded up.
    more =
      rm === 1 && xc[sd] >= 5 ||
      rm === 2 && (xc[sd] > 5 || xc[sd] === 5 &&
        (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) ||
      rm === 3 && (more || !!xc[0]);

    // Remove any digits after the required precision.
    xc.length = sd;

    // Round up?
    if (more) {

      // Rounding up may mean the previous digit has to be rounded up.
      for (; ++xc[--sd] > 9;) {
        xc[sd] = 0;
        if (sd === 0) {
          ++x.e;
          xc.unshift(1);
          break;
        }
      }
    }

    // Remove trailing zeros.
    for (sd = xc.length; !xc[--sd];) xc.pop();
  }

  return x;
}


/*
 * Return a string representing the value of Big x in normal or exponential notation.
 * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
 */
function stringify(x, doExponential, isNonzero) {
  var e = x.e,
    s = x.c.join(''),
    n = s.length;

  // Exponential notation?
  if (doExponential) {
    s = s.charAt(0) + (n > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e;

  // Normal notation.
  } else if (e < 0) {
    for (; ++e;) s = '0' + s;
    s = '0.' + s;
  } else if (e > 0) {
    if (++e > n) {
      for (e -= n; e--;) s += '0';
    } else if (e < n) {
      s = s.slice(0, e) + '.' + s.slice(e);
    }
  } else if (n > 1) {
    s = s.charAt(0) + '.' + s.slice(1);
  }

  return x.s < 0 && isNonzero ? '-' + s : s;
}


// Prototype/instance methods


/*
 * Return a new Big whose value is the absolute value of this Big.
 */
P.abs = function () {
  var x = new this.constructor(this);
  x.s = 1;
  return x;
};


/*
 * Return 1 if the value of this Big is greater than the value of Big y,
 *       -1 if the value of this Big is less than the value of Big y, or
 *        0 if they have the same value.
 */
P.cmp = function (y) {
  var isneg,
    x = this,
    xc = x.c,
    yc = (y = new x.constructor(y)).c,
    i = x.s,
    j = y.s,
    k = x.e,
    l = y.e;

  // Either zero?
  if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;

  // Signs differ?
  if (i != j) return i;

  isneg = i < 0;

  // Compare exponents.
  if (k != l) return k > l ^ isneg ? 1 : -1;

  j = (k = xc.length) < (l = yc.length) ? k : l;

  // Compare digit by digit.
  for (i = -1; ++i < j;) {
    if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
  }

  // Compare lengths.
  return k == l ? 0 : k > l ^ isneg ? 1 : -1;
};


/*
 * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
 * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
 */
P.div = function (y) {
  var x = this,
    Big = x.constructor,
    a = x.c,                  // dividend
    b = (y = new Big(y)).c,   // divisor
    k = x.s == y.s ? 1 : -1,
    dp = Big.DP;

  if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
    throw Error(INVALID_DP);
  }

  // Divisor is zero?
  if (!b[0]) {
    throw Error(DIV_BY_ZERO);
  }

  // Dividend is 0? Return +-0.
  if (!a[0]) {
    y.s = k;
    y.c = [y.e = 0];
    return y;
  }

  var bl, bt, n, cmp, ri,
    bz = b.slice(),
    ai = bl = b.length,
    al = a.length,
    r = a.slice(0, bl),   // remainder
    rl = r.length,
    q = y,                // quotient
    qc = q.c = [],
    qi = 0,
    p = dp + (q.e = x.e - y.e) + 1;    // precision of the result

  q.s = k;
  k = p < 0 ? 0 : p;

  // Create version of divisor with leading zero.
  bz.unshift(0);

  // Add zeros to make remainder as long as divisor.
  for (; rl++ < bl;) r.push(0);

  do {

    // n is how many times the divisor goes into current remainder.
    for (n = 0; n < 10; n++) {

      // Compare divisor and remainder.
      if (bl != (rl = r.length)) {
        cmp = bl > rl ? 1 : -1;
      } else {
        for (ri = -1, cmp = 0; ++ri < bl;) {
          if (b[ri] != r[ri]) {
            cmp = b[ri] > r[ri] ? 1 : -1;
            break;
          }
        }
      }

      // If divisor < remainder, subtract divisor from remainder.
      if (cmp < 0) {

        // Remainder can't be more than 1 digit longer than divisor.
        // Equalise lengths using divisor with extra leading zero?
        for (bt = rl == bl ? b : bz; rl;) {
          if (r[--rl] < bt[rl]) {
            ri = rl;
            for (; ri && !r[--ri];) r[ri] = 9;
            --r[ri];
            r[rl] += 10;
          }
          r[rl] -= bt[rl];
        }

        for (; !r[0];) r.shift();
      } else {
        break;
      }
    }

    // Add the digit n to the result array.
    qc[qi++] = cmp ? n : ++n;

    // Update the remainder.
    if (r[0] && cmp) r[rl] = a[ai] || 0;
    else r = [a[ai]];

  } while ((ai++ < al || r[0] !== UNDEFINED) && k--);

  // Leading zero? Do not remove if result is simply zero (qi == 1).
  if (!qc[0] && qi != 1) {

    // There can't be more than one zero.
    qc.shift();
    q.e--;
    p--;
  }

  // Round?
  if (qi > p) round(q, p, Big.RM, r[0] !== UNDEFINED);

  return q;
};


/*
 * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
 */
P.eq = function (y) {
  return this.cmp(y) === 0;
};


/*
 * Return true if the value of this Big is greater than the value of Big y, otherwise return
 * false.
 */
P.gt = function (y) {
  return this.cmp(y) > 0;
};


/*
 * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
 * return false.
 */
P.gte = function (y) {
  return this.cmp(y) > -1;
};


/*
 * Return true if the value of this Big is less than the value of Big y, otherwise return false.
 */
P.lt = function (y) {
  return this.cmp(y) < 0;
};


/*
 * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
 * return false.
 */
P.lte = function (y) {
  return this.cmp(y) < 1;
};


/*
 * Return a new Big whose value is the value of this Big minus the value of Big y.
 */
P.minus = P.sub = function (y) {
  var i, j, t, xlty,
    x = this,
    Big = x.constructor,
    a = x.s,
    b = (y = new Big(y)).s;

  // Signs differ?
  if (a != b) {
    y.s = -b;
    return x.plus(y);
  }

  var xc = x.c.slice(),
    xe = x.e,
    yc = y.c,
    ye = y.e;

  // Either zero?
  if (!xc[0] || !yc[0]) {
    if (yc[0]) {
      y.s = -b;
    } else if (xc[0]) {
      y = new Big(x);
    } else {
      y.s = 1;
    }
    return y;
  }

  // Determine which is the bigger number. Prepend zeros to equalise exponents.
  if (a = xe - ye) {

    if (xlty = a < 0) {
      a = -a;
      t = xc;
    } else {
      ye = xe;
      t = yc;
    }

    t.reverse();
    for (b = a; b--;) t.push(0);
    t.reverse();
  } else {

    // Exponents equal. Check digit by digit.
    j = ((xlty = xc.length < yc.length) ? xc : yc).length;

    for (a = b = 0; b < j; b++) {
      if (xc[b] != yc[b]) {
        xlty = xc[b] < yc[b];
        break;
      }
    }
  }

  // x < y? Point xc to the array of the bigger number.
  if (xlty) {
    t = xc;
    xc = yc;
    yc = t;
    y.s = -y.s;
  }

  /*
   * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
   * needs to start at yc.length.
   */
  if ((b = (j = yc.length) - (i = xc.length)) > 0) for (; b--;) xc[i++] = 0;

  // Subtract yc from xc.
  for (b = i; j > a;) {
    if (xc[--j] < yc[j]) {
      for (i = j; i && !xc[--i];) xc[i] = 9;
      --xc[i];
      xc[j] += 10;
    }

    xc[j] -= yc[j];
  }

  // Remove trailing zeros.
  for (; xc[--b] === 0;) xc.pop();

  // Remove leading zeros and adjust exponent accordingly.
  for (; xc[0] === 0;) {
    xc.shift();
    --ye;
  }

  if (!xc[0]) {

    // n - n = +0
    y.s = 1;

    // Result must be zero.
    xc = [ye = 0];
  }

  y.c = xc;
  y.e = ye;

  return y;
};


/*
 * Return a new Big whose value is the value of this Big modulo the value of Big y.
 */
P.mod = function (y) {
  var ygtx,
    x = this,
    Big = x.constructor,
    a = x.s,
    b = (y = new Big(y)).s;

  if (!y.c[0]) {
    throw Error(DIV_BY_ZERO);
  }

  x.s = y.s = 1;
  ygtx = y.cmp(x) == 1;
  x.s = a;
  y.s = b;

  if (ygtx) return new Big(x);

  a = Big.DP;
  b = Big.RM;
  Big.DP = Big.RM = 0;
  x = x.div(y);
  Big.DP = a;
  Big.RM = b;

  return this.minus(x.times(y));
};


/*
 * Return a new Big whose value is the value of this Big negated.
 */
P.neg = function () {
  var x = new this.constructor(this);
  x.s = -x.s;
  return x;
};


/*
 * Return a new Big whose value is the value of this Big plus the value of Big y.
 */
P.plus = P.add = function (y) {
  var e, k, t,
    x = this,
    Big = x.constructor;

  y = new Big(y);

  // Signs differ?
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }

  var xe = x.e,
    xc = x.c,
    ye = y.e,
    yc = y.c;

  // Either zero?
  if (!xc[0] || !yc[0]) {
    if (!yc[0]) {
      if (xc[0]) {
        y = new Big(x);
      } else {
        y.s = x.s;
      }
    }
    return y;
  }

  xc = xc.slice();

  // Prepend zeros to equalise exponents.
  // Note: reverse faster than unshifts.
  if (e = xe - ye) {
    if (e > 0) {
      ye = xe;
      t = yc;
    } else {
      e = -e;
      t = xc;
    }

    t.reverse();
    for (; e--;) t.push(0);
    t.reverse();
  }

  // Point xc to the longer array.
  if (xc.length - yc.length < 0) {
    t = yc;
    yc = xc;
    xc = t;
  }

  e = yc.length;

  // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
  for (k = 0; e; xc[e] %= 10) k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;

  // No need to check for zero, as +x + +y != 0 && -x + -y != 0

  if (k) {
    xc.unshift(k);
    ++ye;
  }

  // Remove trailing zeros.
  for (e = xc.length; xc[--e] === 0;) xc.pop();

  y.c = xc;
  y.e = ye;

  return y;
};


/*
 * Return a Big whose value is the value of this Big raised to the power n.
 * If n is negative, round to a maximum of Big.DP decimal places using rounding
 * mode Big.RM.
 *
 * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
 */
P.pow = function (n) {
  var x = this,
    one = new x.constructor('1'),
    y = one,
    isneg = n < 0;

  if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
    throw Error(INVALID + 'exponent');
  }

  if (isneg) n = -n;

  for (;;) {
    if (n & 1) y = y.times(x);
    n >>= 1;
    if (!n) break;
    x = x.times(x);
  }

  return isneg ? one.div(y) : y;
};


/*
 * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
 * significant digits using rounding mode rm, or Big.RM if rm is not specified.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.prec = function (sd, rm) {
  if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
    throw Error(INVALID + 'precision');
  }
  return round(new this.constructor(this), sd, rm);
};


/*
 * Return a new Big whose value is the value of this Big rounded to a maximum of dp decimal places
 * using rounding mode rm, or Big.RM if rm is not specified.
 * If dp is negative, round to an integer which is a multiple of 10**-dp.
 * If dp is not specified, round to 0 decimal places.
 *
 * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.round = function (dp, rm) {
  if (dp === UNDEFINED) dp = 0;
  else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) {
    throw Error(INVALID_DP);
  }
  return round(new this.constructor(this), dp + this.e + 1, rm);
};


/*
 * Return a new Big whose value is the square root of the value of this Big, rounded, if
 * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
 */
P.sqrt = function () {
  var r, c, t,
    x = this,
    Big = x.constructor,
    s = x.s,
    e = x.e,
    half = new Big('0.5');

  // Zero?
  if (!x.c[0]) return new Big(x);

  // Negative?
  if (s < 0) {
    throw Error(NAME + 'No square root');
  }

  // Estimate.
  s = Math.sqrt(+stringify(x, true, true));

  // Math.sqrt underflow/overflow?
  // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
  if (s === 0 || s === 1 / 0) {
    c = x.c.join('');
    if (!(c.length + e & 1)) c += '0';
    s = Math.sqrt(c);
    e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
    r = new Big((s == 1 / 0 ? '5e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e);
  } else {
    r = new Big(s + '');
  }

  e = r.e + (Big.DP += 4);

  // Newton-Raphson iteration.
  do {
    t = r;
    r = half.times(t.plus(x.div(t)));
  } while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''));

  return round(r, (Big.DP -= 4) + r.e + 1, Big.RM);
};


/*
 * Return a new Big whose value is the value of this Big times the value of Big y.
 */
P.times = P.mul = function (y) {
  var c,
    x = this,
    Big = x.constructor,
    xc = x.c,
    yc = (y = new Big(y)).c,
    a = xc.length,
    b = yc.length,
    i = x.e,
    j = y.e;

  // Determine sign of result.
  y.s = x.s == y.s ? 1 : -1;

  // Return signed 0 if either 0.
  if (!xc[0] || !yc[0]) {
    y.c = [y.e = 0];
    return y;
  }

  // Initialise exponent of result as x.e + y.e.
  y.e = i + j;

  // If array xc has fewer digits than yc, swap xc and yc, and lengths.
  if (a < b) {
    c = xc;
    xc = yc;
    yc = c;
    j = a;
    a = b;
    b = j;
  }

  // Initialise coefficient array of result with zeros.
  for (c = new Array(j = a + b); j--;) c[j] = 0;

  // Multiply.

  // i is initially xc.length.
  for (i = b; i--;) {
    b = 0;

    // a is yc.length.
    for (j = a + i; j > i;) {

      // Current sum of products at this digit position, plus carry.
      b = c[j] + yc[i] * xc[j - i - 1] + b;
      c[j--] = b % 10;

      // carry
      b = b / 10 | 0;
    }

    c[j] = b;
  }

  // Increment result exponent if there is a final carry, otherwise remove leading zero.
  if (b) ++y.e;
  else c.shift();

  // Remove trailing zeros.
  for (i = c.length; !c[--i];) c.pop();
  y.c = c;

  return y;
};


/*
 * Return a string representing the value of this Big in exponential notation rounded to dp fixed
 * decimal places using rounding mode rm, or Big.RM if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.toExponential = function (dp, rm) {
  var x = this,
    n = x.c[0];

  if (dp !== UNDEFINED) {
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    x = round(new x.constructor(x), ++dp, rm);
    for (; x.c.length < dp;) x.c.push(0);
  }

  return stringify(x, true, !!n);
};


/*
 * Return a string representing the value of this Big in normal notation rounded to dp fixed
 * decimal places using rounding mode rm, or Big.RM if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 *
 * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
 * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
 */
P.toFixed = function (dp, rm) {
  var x = this,
    n = x.c[0];

  if (dp !== UNDEFINED) {
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    x = round(new x.constructor(x), dp + x.e + 1, rm);

    // x.e may have changed if the value is rounded up.
    for (dp = dp + x.e + 1; x.c.length < dp;) x.c.push(0);
  }

  return stringify(x, false, !!n);
};


/*
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * Big.PE, or a negative exponent equal to or less than Big.NE.
 * Omit the sign for negative zero.
 */
P.toJSON = P.toString = function () {
  var x = this,
    Big = x.constructor;
  return stringify(x, x.e <= Big.NE || x.e >= Big.PE, !!x.c[0]);
};

if (typeof Symbol !== "undefined") {
  P[Symbol.for('nodejs.util.inspect.custom')] = P.toJSON;
}


/*
 * Return the value of this Big as a primitive number.
 */
P.toNumber = function () {
  var n = +stringify(this, true, true);
  if (this.constructor.strict === true && !this.eq(n.toString())) {
    throw Error(NAME + 'Imprecise conversion');
  }
  return n;
};


/*
 * Return a string representing the value of this Big rounded to sd significant digits using
 * rounding mode rm, or Big.RM if rm is not specified.
 * Use exponential notation if sd is less than the number of digits necessary to represent
 * the integer part of the value in normal notation.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.toPrecision = function (sd, rm) {
  var x = this,
    Big = x.constructor,
    n = x.c[0];

  if (sd !== UNDEFINED) {
    if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
      throw Error(INVALID + 'precision');
    }
    x = round(new Big(x), sd, rm);
    for (; x.c.length < sd;) x.c.push(0);
  }

  return stringify(x, sd <= x.e || x.e <= Big.NE || x.e >= Big.PE, !!n);
};


/*
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * Big.PE, or a negative exponent equal to or less than Big.NE.
 * Include the sign for negative zero.
 */
P.valueOf = function () {
  var x = this,
    Big = x.constructor;
  if (Big.strict === true) {
    throw Error(NAME + 'valueOf disallowed');
  }
  return stringify(x, x.e <= Big.NE || x.e >= Big.PE, true);
};

const _appLanguageTag = getLanguageTag("en-US");
const _appTimezone = getTimezone(defaultTimezone);
const _appUseUtc = getUseUtc();
const _appFormatTag = getFormatTag();
watch(_appLanguageTag, () => {
});
const appLanguageTag = computed(() => _appLanguageTag.value);
computed(() => _appTimezone.value);
computed(() => _appUseUtc.value);
const appFormatTag = computed(() => _appFormatTag.value);
computed(
  () => languageTags.find((item) => item.languageTag === appLanguageTag.value) ?? languageTags.find((item) => item.languageTag === "en-US")
);
computed(
  () => languageTags.find((item) => item.languageTag === appFormatTag.value) ?? languageTags.find((item) => item.languageTag === "en-US")
);

ref({});
ref({});

const doShowUiNotification = "doShowUiNotification";

const DEFAULT_LIFE = 5e3;
let _$toast;
let listenerAttached = false;
const storeId$3 = "useNotifications";
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
    addSignalListener(doShowUiNotification, storeId$3, (message) => {
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

const storeId$2 = "portPermissions";
const sendResponse = (req) => {
  if (!req) {
    return;
  }
  req.channel = ApiChannel.permissionsToBg;
  chrome.runtime.sendMessage(req, () => {
    if (chrome.runtime.lastError) {
      console.error(el(storeId$2), sl("handleMessage"), "lastError", req, chrome.runtime.lastError);
    }
  });
};
const closePermissionUI = () => {
  const req = {
    reqId: "0",
    api: "closePermissionUI",
    channel: ApiChannel.permissionsToBg,
    payload: {
      origin: storeId$2
    }
  };
  sendResponse(req);
};

var events = {exports: {}};

var hasRequiredEvents;

function requireEvents () {
	if (hasRequiredEvents) return events.exports;
	hasRequiredEvents = 1;

	var R = typeof Reflect === 'object' ? Reflect : null;
	var ReflectApply = R && typeof R.apply === 'function'
	  ? R.apply
	  : function ReflectApply(target, receiver, args) {
	    return Function.prototype.apply.call(target, receiver, args);
	  };

	var ReflectOwnKeys;
	if (R && typeof R.ownKeys === 'function') {
	  ReflectOwnKeys = R.ownKeys;
	} else if (Object.getOwnPropertySymbols) {
	  ReflectOwnKeys = function ReflectOwnKeys(target) {
	    return Object.getOwnPropertyNames(target)
	      .concat(Object.getOwnPropertySymbols(target));
	  };
	} else {
	  ReflectOwnKeys = function ReflectOwnKeys(target) {
	    return Object.getOwnPropertyNames(target);
	  };
	}

	function ProcessEmitWarning(warning) {
	  if (console && console.warn) console.warn(warning);
	}

	var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
	  return value !== value;
	};

	function EventEmitter() {
	  EventEmitter.init.call(this);
	}
	events.exports = EventEmitter;
	events.exports.once = once;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._eventsCount = 0;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	var defaultMaxListeners = 10;

	function checkListener(listener) {
	  if (typeof listener !== 'function') {
	    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
	  }
	}

	Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
	  enumerable: true,
	  get: function() {
	    return defaultMaxListeners;
	  },
	  set: function(arg) {
	    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
	      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
	    }
	    defaultMaxListeners = arg;
	  }
	});

	EventEmitter.init = function() {

	  if (this._events === undefined ||
	      this._events === Object.getPrototypeOf(this)._events) {
	    this._events = Object.create(null);
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
	    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
	  }
	  this._maxListeners = n;
	  return this;
	};

	function _getMaxListeners(that) {
	  if (that._maxListeners === undefined)
	    return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return _getMaxListeners(this);
	};

	EventEmitter.prototype.emit = function emit(type) {
	  var args = [];
	  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
	  var doError = (type === 'error');

	  var events = this._events;
	  if (events !== undefined)
	    doError = (doError && events.error === undefined);
	  else if (!doError)
	    return false;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    var er;
	    if (args.length > 0)
	      er = args[0];
	    if (er instanceof Error) {
	      // Note: The comments on the `throw` lines are intentional, they show
	      // up in Node's output if this results in an unhandled exception.
	      throw er; // Unhandled 'error' event
	    }
	    // At least give some kind of context to the user
	    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
	    err.context = er;
	    throw err; // Unhandled 'error' event
	  }

	  var handler = events[type];

	  if (handler === undefined)
	    return false;

	  if (typeof handler === 'function') {
	    ReflectApply(handler, this, args);
	  } else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      ReflectApply(listeners[i], this, args);
	  }

	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;

	  checkListener(listener);

	  events = target._events;
	  if (events === undefined) {
	    events = target._events = Object.create(null);
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener !== undefined) {
	      target.emit('newListener', type,
	                  listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object
	      events = target._events;
	    }
	    existing = events[type];
	  }

	  if (existing === undefined) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] =
	        prepend ? [listener, existing] : [existing, listener];
	      // If we've already got an array, just append.
	    } else if (prepend) {
	      existing.unshift(listener);
	    } else {
	      existing.push(listener);
	    }

	    // Check for listener leak
	    m = _getMaxListeners(target);
	    if (m > 0 && existing.length > m && !existing.warned) {
	      existing.warned = true;
	      // No error code for this since it is a Warning
	      // eslint-disable-next-line no-restricted-syntax
	      var w = new Error('Possible EventEmitter memory leak detected. ' +
	                          existing.length + ' ' + String(type) + ' listeners ' +
	                          'added. Use emitter.setMaxListeners() to ' +
	                          'increase limit');
	      w.name = 'MaxListenersExceededWarning';
	      w.emitter = target;
	      w.type = type;
	      w.count = existing.length;
	      ProcessEmitWarning(w);
	    }
	  }

	  return target;
	}

	EventEmitter.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.prependListener =
	    function prependListener(type, listener) {
	      return _addListener(this, type, listener, true);
	    };

	function onceWrapper() {
	  if (!this.fired) {
	    this.target.removeListener(this.type, this.wrapFn);
	    this.fired = true;
	    if (arguments.length === 0)
	      return this.listener.call(this.target);
	    return this.listener.apply(this.target, arguments);
	  }
	}

	function _onceWrap(target, type, listener) {
	  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
	  var wrapped = onceWrapper.bind(state);
	  wrapped.listener = listener;
	  state.wrapFn = wrapped;
	  return wrapped;
	}

	EventEmitter.prototype.once = function once(type, listener) {
	  checkListener(listener);
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter.prototype.prependOnceListener =
	    function prependOnceListener(type, listener) {
	      checkListener(listener);
	      this.prependListener(type, _onceWrap(this, type, listener));
	      return this;
	    };

	// Emits a 'removeListener' event if and only if the listener was removed.
	EventEmitter.prototype.removeListener =
	    function removeListener(type, listener) {
	      var list, events, position, i, originalListener;

	      checkListener(listener);

	      events = this._events;
	      if (events === undefined)
	        return this;

	      list = events[type];
	      if (list === undefined)
	        return this;

	      if (list === listener || list.listener === listener) {
	        if (--this._eventsCount === 0)
	          this._events = Object.create(null);
	        else {
	          delete events[type];
	          if (events.removeListener)
	            this.emit('removeListener', type, list.listener || listener);
	        }
	      } else if (typeof list !== 'function') {
	        position = -1;

	        for (i = list.length - 1; i >= 0; i--) {
	          if (list[i] === listener || list[i].listener === listener) {
	            originalListener = list[i].listener;
	            position = i;
	            break;
	          }
	        }

	        if (position < 0)
	          return this;

	        if (position === 0)
	          list.shift();
	        else {
	          spliceOne(list, position);
	        }

	        if (list.length === 1)
	          events[type] = list[0];

	        if (events.removeListener !== undefined)
	          this.emit('removeListener', type, originalListener || listener);
	      }

	      return this;
	    };

	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

	EventEmitter.prototype.removeAllListeners =
	    function removeAllListeners(type) {
	      var listeners, events, i;

	      events = this._events;
	      if (events === undefined)
	        return this;

	      // not listening for removeListener, no need to emit
	      if (events.removeListener === undefined) {
	        if (arguments.length === 0) {
	          this._events = Object.create(null);
	          this._eventsCount = 0;
	        } else if (events[type] !== undefined) {
	          if (--this._eventsCount === 0)
	            this._events = Object.create(null);
	          else
	            delete events[type];
	        }
	        return this;
	      }

	      // emit removeListener for all listeners on all events
	      if (arguments.length === 0) {
	        var keys = Object.keys(events);
	        var key;
	        for (i = 0; i < keys.length; ++i) {
	          key = keys[i];
	          if (key === 'removeListener') continue;
	          this.removeAllListeners(key);
	        }
	        this.removeAllListeners('removeListener');
	        this._events = Object.create(null);
	        this._eventsCount = 0;
	        return this;
	      }

	      listeners = events[type];

	      if (typeof listeners === 'function') {
	        this.removeListener(type, listeners);
	      } else if (listeners !== undefined) {
	        // LIFO order
	        for (i = listeners.length - 1; i >= 0; i--) {
	          this.removeListener(type, listeners[i]);
	        }
	      }

	      return this;
	    };

	function _listeners(target, type, unwrap) {
	  var events = target._events;

	  if (events === undefined)
	    return [];

	  var evlistener = events[type];
	  if (evlistener === undefined)
	    return [];

	  if (typeof evlistener === 'function')
	    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

	  return unwrap ?
	    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
	}

	EventEmitter.prototype.listeners = function listeners(type) {
	  return _listeners(this, type, true);
	};

	EventEmitter.prototype.rawListeners = function rawListeners(type) {
	  return _listeners(this, type, false);
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount.call(emitter, type);
	  }
	};

	EventEmitter.prototype.listenerCount = listenerCount;
	function listenerCount(type) {
	  var events = this._events;

	  if (events !== undefined) {
	    var evlistener = events[type];

	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener !== undefined) {
	      return evlistener.length;
	    }
	  }

	  return 0;
	}

	EventEmitter.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
	};

	function arrayClone(arr, n) {
	  var copy = new Array(n);
	  for (var i = 0; i < n; ++i)
	    copy[i] = arr[i];
	  return copy;
	}

	function spliceOne(list, index) {
	  for (; index + 1 < list.length; index++)
	    list[index] = list[index + 1];
	  list.pop();
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}

	function once(emitter, name) {
	  return new Promise(function (resolve, reject) {
	    function errorListener(err) {
	      emitter.removeListener(name, resolver);
	      reject(err);
	    }

	    function resolver() {
	      if (typeof emitter.removeListener === 'function') {
	        emitter.removeListener('error', errorListener);
	      }
	      resolve([].slice.call(arguments));
	    }
	    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
	    if (name !== 'error') {
	      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
	    }
	  });
	}

	function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
	  if (typeof emitter.on === 'function') {
	    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
	  }
	}

	function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
	  if (typeof emitter.on === 'function') {
	    if (flags.once) {
	      emitter.once(name, listener);
	    } else {
	      emitter.on(name, listener);
	    }
	  } else if (typeof emitter.addEventListener === 'function') {
	    // EventTarget does not have `error` event semantics like Node
	    // EventEmitters, we do not listen for `error` events here.
	    emitter.addEventListener(name, function wrapListener(arg) {
	      // IE does not have builtin `{ once: true }` support so we
	      // have to do it manually.
	      if (flags.once) {
	        emitter.removeEventListener(name, wrapListener);
	      }
	      listener(arg);
	    });
	  } else {
	    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
	  }
	}
	return events.exports;
}

var eventsExports = requireEvents();
const EventEmitter = /*@__PURE__*/getDefaultExportFromCjs$1(eventsExports);

/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
const deserializers = {};
const addCustomErrorDeserializer = (name, deserializer) => {
    deserializers[name] = deserializer;
};
const createCustomErrorClass = (name) => {
    class CustomErrorClass extends Error {
        cause;
        constructor(message, fields, options) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            super(message || name, options);
            // Set the prototype explicitly. See https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(this, CustomErrorClass.prototype);
            this.name = name;
            if (fields) {
                for (const k in fields) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this[k] = fields[k];
                }
            }
            if (options && isObject(options) && "cause" in options && !this.cause) {
                // .cause was specified but the superconstructor
                // did not create an instance property.
                const cause = options.cause;
                this.cause = cause;
                if ("stack" in cause) {
                    this.stack = this.stack + "\nCAUSE: " + cause.stack;
                }
            }
        }
    }
    return CustomErrorClass;
};
function isObject(value) {
    return typeof value === "object";
}

const DisconnectedDevice = createCustomErrorClass("DisconnectedDevice");
const DisconnectedDeviceDuringOperation = createCustomErrorClass("DisconnectedDeviceDuringOperation");
const TransportOpenUserCancelled = createCustomErrorClass("TransportOpenUserCancelled");
const TransportInterfaceNotAvailable = createCustomErrorClass("TransportInterfaceNotAvailable");
const TransportRaceCondition = createCustomErrorClass("TransportRaceCondition");
const TransportWebUSBGestureRequired = createCustomErrorClass("TransportWebUSBGestureRequired");
/**
 * Type of a Transport error used to represent all equivalent errors coming from all possible implementation of Transport
 */
var HwTransportErrorType;
(function (HwTransportErrorType) {
    HwTransportErrorType["Unknown"] = "Unknown";
    HwTransportErrorType["LocationServicesDisabled"] = "LocationServicesDisabled";
    HwTransportErrorType["LocationServicesUnauthorized"] = "LocationServicesUnauthorized";
    HwTransportErrorType["BluetoothScanStartFailed"] = "BluetoothScanStartFailed";
})(HwTransportErrorType || (HwTransportErrorType = {}));
/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
 */
class TransportError extends Error {
    id;
    constructor(message, id) {
        const name = "TransportError";
        super(message || name);
        this.name = name;
        this.message = message;
        this.stack = new Error(message).stack;
        this.id = id;
    }
}
addCustomErrorDeserializer("TransportError", e => new TransportError(e.message, e.id));
const StatusCodes = {
    ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
    ALGORITHM_NOT_SUPPORTED: 0x9484,
    CLA_NOT_SUPPORTED: 0x6e00,
    CODE_BLOCKED: 0x9840,
    CODE_NOT_INITIALIZED: 0x9802,
    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
    CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
    CONTRADICTION_INVALIDATION: 0x9810,
    CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
    DEVICE_IN_RECOVERY_MODE: 0x662f,
    CUSTOM_IMAGE_EMPTY: 0x662e,
    FILE_ALREADY_EXISTS: 0x6a89,
    FILE_NOT_FOUND: 0x9404,
    GP_AUTH_FAILED: 0x6300,
    HALTED: 0x6faa,
    INCONSISTENT_FILE: 0x9408,
    INCORRECT_DATA: 0x6a80,
    INCORRECT_LENGTH: 0x6700,
    INCORRECT_P1_P2: 0x6b00,
    INS_NOT_SUPPORTED: 0x6d00,
    DEVICE_NOT_ONBOARDED: 0x6d07,
    DEVICE_NOT_ONBOARDED_2: 0x6611,
    INVALID_KCV: 0x9485,
    INVALID_OFFSET: 0x9402,
    LICENSING: 0x6f42,
    LOCKED_DEVICE: 0x5515,
    MAX_VALUE_REACHED: 0x9850,
    MEMORY_PROBLEM: 0x9240,
    MISSING_CRITICAL_PARAMETER: 0x6800,
    NO_EF_SELECTED: 0x9400,
    NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
    OK: 0x9000,
    PIN_REMAINING_ATTEMPTS: 0x63c0,
    REFERENCED_DATA_NOT_FOUND: 0x6a88,
    SECURITY_STATUS_NOT_SATISFIED: 0x6982,
    TECHNICAL_PROBLEM: 0x6f00,
    UNKNOWN_APDU: 0x6d02,
    USER_REFUSED_ON_DEVICE: 0x5501,
    NOT_ENOUGH_SPACE: 0x5102,
    APP_NOT_FOUND_OR_INVALID_CONTEXT: 0x5123,
    INVALID_APP_NAME_LENGTH: 0x670a,
    GEN_AES_KEY_FAILED: 0x5419,
    INTERNAL_CRYPTO_OPERATION_FAILED: 0x541a,
    INTERNAL_COMPUTE_AES_CMAC_FAILED: 0x541b,
    ENCRYPT_APP_STORAGE_FAILED: 0x541c,
    INVALID_BACKUP_STATE: 0x6642,
    PIN_NOT_SET: 0x5502,
    INVALID_BACKUP_LENGTH: 0x6733,
    INVALID_RESTORE_STATE: 0x6643,
    INVALID_CHUNK_LENGTH: 0x6734,
    INVALID_BACKUP_HEADER: 0x684a,
    // Not documented:
    TRUSTCHAIN_WRONG_SEED: 0xb007,
};
function getAltStatusMessage(code) {
    switch (code) {
        // improve text of most common errors
        case 0x6700:
            return "Incorrect length";
        case 0x6800:
            return "Missing critical parameter";
        case 0x6982:
            return "Security not satisfied (dongle locked or have invalid access rights)";
        case 0x6985:
            return "Condition of use not satisfied (denied by the user?)";
        case 0x6a80:
            return "Invalid data received";
        case 0x6b00:
            return "Invalid parameter received";
        case 0x5515:
            return "Locked device";
    }
    if (0x6f00 <= code && code <= 0x6fff) {
        return "Internal error, please report";
    }
}
/**
 * Error thrown when a device returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
class TransportStatusError extends Error {
    statusCode;
    statusText;
    /**
     * @param statusCode The error status code coming from a Transport implementation
     * @param options containing:
     *  - canBeMappedToChildError: enable the mapping of TransportStatusError to an error extending/inheriting from it
     *  . Ex: LockedDeviceError. Default to true.
     */
    constructor(statusCode, { canBeMappedToChildError = true } = {}) {
        const statusText = Object.keys(StatusCodes).find(k => StatusCodes[k] === statusCode) || "UNKNOWN_ERROR";
        const smsg = getAltStatusMessage(statusCode) || statusText;
        const statusCodeStr = statusCode.toString(16);
        const message = `Ledger device: ${smsg} (0x${statusCodeStr})`;
        super(message);
        this.name = "TransportStatusError";
        this.statusCode = statusCode;
        this.statusText = statusText;
        Object.setPrototypeOf(this, TransportStatusError.prototype);
        // Maps to a LockedDeviceError
        if (canBeMappedToChildError && statusCode === StatusCodes.LOCKED_DEVICE) {
            return new LockedDeviceError(message);
        }
    }
}
class LockedDeviceError extends TransportStatusError {
    constructor(message) {
        super(StatusCodes.LOCKED_DEVICE, { canBeMappedToChildError: false });
        if (message) {
            this.message = message;
        }
        this.name = "LockedDeviceError";
        Object.setPrototypeOf(this, LockedDeviceError.prototype);
    }
}
addCustomErrorDeserializer("TransportStatusError", e => new TransportStatusError(e.statusCode));

let id = 0;
const subscribers = [];
/**
 * Logs something
 *
 * @param type a namespaced identifier of the log (it is not a level like "debug", "error" but more like "apdu-in", "apdu-out", etc...)
 * @param message a clear message of the log associated to the type
 */
const log = (type, message, data) => {
    const obj = {
        type,
        id: String(++id),
        date: new Date(),
    };
    if (message)
        obj.message = message;
    dispatch(obj);
};
/**
 * A simple tracer function, only expanding the existing log function
 *
 * Its goal is to capture more context than a log function.
 * This is simple for now, but can be improved later.
 *
 * @param context Anything representing the context where the log occurred
 */
const trace = ({ type, message, data, context, }) => {
    const obj = {
        type,
        id: String(++id),
        date: new Date(),
    };
    if (message)
        obj.message = message;
    if (data)
        obj.data = data;
    if (context)
        obj.context = context;
    dispatch(obj);
};
/**
 * A simple tracer class, that can be used to avoid repetition when using the `trace` function
 *
 * Its goal is to capture more context than a log function.
 * This is simple for now, but can be improved later.
 *
 * @param type A given type (not level) for the current local tracer ("hw", "withDevice", etc.)
 * @param context Anything representing the context where the log occurred
 */
class LocalTracer {
    type;
    context;
    constructor(type, context) {
        this.type = type;
        this.context = context;
    }
    trace(message, data) {
        trace({
            type: this.type,
            message,
            data,
            context: this.context,
        });
    }
    getContext() {
        return this.context;
    }
    setContext(context) {
        this.context = context;
    }
    updateContext(contextToAdd) {
        this.context = { ...this.context, ...contextToAdd };
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    /**
     * Create a new instance of the LocalTracer with an updated `type`
     *
     * It does not mutate the calling instance, but returns a new LocalTracer,
     * following a simple builder pattern.
     */
    withType(type) {
        return new LocalTracer(type, this.context);
    }
    /**
     * Create a new instance of the LocalTracer with a new `context`
     *
     * It does not mutate the calling instance, but returns a new LocalTracer,
     * following a simple builder pattern.
     *
     * @param context A TraceContext, that can undefined to reset the context
     */
    withContext(context) {
        return new LocalTracer(this.type, context);
    }
    /**
     * Create a new instance of the LocalTracer with an updated `context`,
     * on which an additional context is merged with the existing one.
     *
     * It does not mutate the calling instance, but returns a new LocalTracer,
     * following a simple builder pattern.
     */
    withUpdatedContext(contextToAdd) {
        return new LocalTracer(this.type, { ...this.context, ...contextToAdd });
    }
}
/**
 * Adds a subscribers to the emitted logs.
 *
 * @param cb that is called for each future log() with the Log object
 * @return a function that can be called to unsubscribe the listener
 */
const listen = (cb) => {
    subscribers.push(cb);
    return () => {
        const i = subscribers.indexOf(cb);
        if (i !== -1) {
            // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
            subscribers[i] = subscribers[subscribers.length - 1];
            subscribers.pop();
        }
    };
};
function dispatch(log) {
    for (let i = 0; i < subscribers.length; i++) {
        try {
            subscribers[i](log);
        }
        catch (e) {
            console.error(e);
        }
    }
}
if (typeof window !== "undefined") {
    window.__ledgerLogsListen = listen;
}

const DEFAULT_LOG_TYPE = "transport";
/**
 * The Transport class defines a generic interface for communicating with a Ledger hardware wallet.
 * There are different kind of transports based on the technology (channels like U2F, HID, Bluetooth, Webusb) and environment (Node, Web,...).
 * It is an abstract class that needs to be implemented.
 */
class Transport {
    exchangeTimeout = 30000;
    unresponsiveTimeout = 15000;
    deviceModel = null;
    tracer;
    constructor({ context, logType } = {}) {
        this.tracer = new LocalTracer(logType ?? DEFAULT_LOG_TYPE, context);
    }
    /**
     * Check if the transport is supported on the current platform/browser.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating support.
     */
    static isSupported;
    /**
     * List all available descriptors for the transport.
     * For a better granularity, checkout `listen()`.
     *
     * @returns {Promise<Array<any>>} A promise that resolves with an array of descriptors.
     * @example
     * TransportFoo.list().then(descriptors => ...)
     */
    static list;
    /**
     * Listen for device events for the transport. The method takes an observer of DescriptorEvent and returns a Subscription.
     * A DescriptorEvent is an object containing a "descriptor" and a "type" field. The "type" field can be "add" or "remove", and the "descriptor" field can be passed to the "open" method.
     * The "listen" method will first emit all currently connected devices and then will emit events as they occur, such as when a USB device is plugged in or a Bluetooth device becomes discoverable.
     * @param {Observer<DescriptorEvent<any>>} observer - An object with "next", "error", and "complete" functions, following the observer pattern.
     * @returns {Subscription} A Subscription object on which you can call ".unsubscribe()" to stop listening to descriptors.
     * @example
    const sub = TransportFoo.listen({
    next: e => {
      if (e.type==="add") {
        sub.unsubscribe();
        const transport = await TransportFoo.open(e.descriptor);
        ...
      }
    },
    error: error => {},
    complete: () => {}
    })
     */
    static listen;
    /**
     * Attempt to create a Transport instance with a specific descriptor.
     * @param {any} descriptor - The descriptor to open the transport with.
     * @param {number} timeout - An optional timeout for the transport connection.
     * @param {TraceContext} context Optional tracing/log context
     * @returns {Promise<Transport>} A promise that resolves with a Transport instance.
     * @example
    TransportFoo.open(descriptor).then(transport => ...)
     */
    static open;
    /**
     * Send data to the device using a low level API.
     * It's recommended to use the "send" method for a higher level API.
     * @param {Buffer} apdu - The data to send.
     * @param {Object} options - Contains optional options for the exchange function
     *  - abortTimeoutMs: stop the exchange after a given timeout. Another timeout exists
     *    to detect unresponsive device (see `unresponsiveTimeout`). This timeout aborts the exchange.
     * @returns {Promise<Buffer>} A promise that resolves with the response data from the device.
     */
    exchange(_apdu, { abortTimeoutMs: _abortTimeoutMs } = {}) {
        throw new Error("exchange not implemented");
    }
    /**
     * Send apdus in batch to the device using a low level API.
     * The default implementation is to call exchange for each apdu.
     * @param {Array<Buffer>} apdus - array of apdus to send.
     * @param {Observer<Buffer>} observer - an observer that will receive the response of each apdu.
     * @returns {Subscription} A Subscription object on which you can call ".unsubscribe()" to stop sending apdus.
     */
    exchangeBulk(apdus, observer) {
        let unsubscribed = false;
        const unsubscribe = () => {
            unsubscribed = true;
        };
        const main = async () => {
            if (unsubscribed)
                return;
            for (const apdu of apdus) {
                const r = await this.exchange(apdu);
                if (unsubscribed)
                    return;
                const status = r.readUInt16BE(r.length - 2);
                if (status !== StatusCodes.OK) {
                    throw new TransportStatusError(status);
                }
                observer.next(r);
            }
        };
        main().then(() => !unsubscribed && observer.complete(), e => !unsubscribed && observer.error(e));
        return { unsubscribe };
    }
    /**
     * Set the "scramble key" for the next data exchanges with the device.
     * Each app can have a different scramble key and it is set internally during instantiation.
     * @param {string} key - The scramble key to set.
     * deprecated This method is no longer needed for modern transports and should be migrated away from.
     * no @ before deprecated as it breaks documentationjs on version 14.0.2
     * https://github.com/documentationjs/documentation/issues/1596
     */
    setScrambleKey(_key) { }
    /**
     * Close the connection with the device.
     *
     * Note: for certain transports (hw-transport-node-hid-singleton for ex), once the promise resolved,
     * the transport instance is actually still cached, and the device is disconnected only after a defined timeout.
     * But for the consumer of the Transport, this does not matter and it can consider the transport to be closed.
     *
     * @returns {Promise<void>} A promise that resolves when the transport is closed.
     */
    close() {
        return Promise.resolve();
    }
    _events = new EventEmitter();
    /**
     * Listen for an event on the transport instance.
     * Transport implementations may have specific events. Common events include:
     * "disconnect" : triggered when the transport is disconnected.
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: Array<any>) => any} cb - The callback function to be invoked when the event occurs.
     */
    on(eventName, cb) {
        this._events.on(eventName, cb);
    }
    /**
     * Stop listening to an event on an instance of transport.
     */
    off(eventName, cb) {
        this._events.removeListener(eventName, cb);
    }
    emit(event, ...args) {
        this._events.emit(event, ...args);
    }
    /**
     * Enable or not logs of the binary exchange
     */
    setDebugMode() {
        console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
    }
    /**
     * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
     */
    setExchangeTimeout(exchangeTimeout) {
        this.exchangeTimeout = exchangeTimeout;
    }
    /**
     * Define the delay before emitting "unresponsive" on an exchange that does not respond
     */
    setExchangeUnresponsiveTimeout(unresponsiveTimeout) {
        this.unresponsiveTimeout = unresponsiveTimeout;
    }
    /**
     * Send data to the device using the higher level API.
     *
     * @param {number} cla - The instruction class for the command.
     * @param {number} ins - The instruction code for the command.
     * @param {number} p1 - The first parameter for the instruction.
     * @param {number} p2 - The second parameter for the instruction.
     * @param {Buffer} data - The data to be sent. Defaults to an empty buffer.
     * @param {Array<number>} statusList - A list of acceptable status codes for the response. Defaults to [StatusCodes.OK].
     * @param {Object} options - Contains optional options for the exchange function
     *  - abortTimeoutMs: stop the send after a given timeout. Another timeout exists
     *    to detect unresponsive device (see `unresponsiveTimeout`). This timeout aborts the exchange.
     * @returns {Promise<Buffer>} A promise that resolves with the response data from the device.
     */
    send = async (cla, ins, p1, p2, data = Buffer$1.alloc(0), statusList = [StatusCodes.OK], { abortTimeoutMs } = {}) => {
        const tracer = this.tracer.withUpdatedContext({ function: "send" });
        if (data.length >= 256) {
            tracer.trace("data.length exceeded 256 bytes limit", { dataLength: data.length });
            throw new TransportError("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
        }
        tracer.trace("Starting an exchange", { abortTimeoutMs });
        const response = await this.exchange(
        // The size of the data is added in 1 byte just before `data`
        Buffer$1.concat([Buffer$1.from([cla, ins, p1, p2]), Buffer$1.from([data.length]), data]), { abortTimeoutMs });
        tracer.trace("Received response from exchange");
        const sw = response.readUInt16BE(response.length - 2);
        if (!statusList.some(s => s === sw)) {
            throw new TransportStatusError(sw);
        }
        return response;
    };
    /**
     * create() allows to open the first descriptor available or
     * throw if there is none or if timeout is reached.
     * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
     * @example
    TransportFoo.create().then(transport => ...)
     */
    static create(openTimeout = 3000, listenTimeout) {
        return new Promise((resolve, reject) => {
            let found = false;
            const sub = this.listen({
                next: e => {
                    found = true;
                    if (sub)
                        sub.unsubscribe();
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    this.open(e.descriptor, openTimeout).then(resolve, reject);
                },
                error: e => {
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    reject(e);
                },
                complete: () => {
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    if (!found) {
                        reject(new TransportError(this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
                    }
                },
            });
            const listenTimeoutId = listenTimeout
                ? setTimeout(() => {
                    sub.unsubscribe();
                    reject(new TransportError(this.ErrorMessage_ListenTimeout, "ListenTimeout"));
                }, listenTimeout)
                : null;
        });
    }
    // Blocks other exchange to happen concurrently
    exchangeBusyPromise;
    /**
     * Wrapper to make an exchange "atomic" (blocking any other exchange)
     *
     * It also handles "unresponsiveness" by emitting "unresponsive" and "responsive" events.
     *
     * @param f The exchange job, using the transport to run
     * @returns a Promise resolving with the output of the given job
     */
    async exchangeAtomicImpl(f) {
        const tracer = this.tracer.withUpdatedContext({
            function: "exchangeAtomicImpl",
            unresponsiveTimeout: this.unresponsiveTimeout,
        });
        if (this.exchangeBusyPromise) {
            tracer.trace("Atomic exchange is already busy");
            throw new TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
        }
        // Sets the atomic guard
        let resolveBusy;
        const busyPromise = new Promise(r => {
            resolveBusy = r;
        });
        this.exchangeBusyPromise = busyPromise;
        // The device unresponsiveness handler
        let unresponsiveReached = false;
        const timeout = setTimeout(() => {
            tracer.trace(`Timeout reached, emitting Transport event "unresponsive"`, {
                unresponsiveTimeout: this.unresponsiveTimeout,
            });
            unresponsiveReached = true;
            this.emit("unresponsive");
        }, this.unresponsiveTimeout);
        try {
            const res = await f();
            if (unresponsiveReached) {
                tracer.trace("Device was unresponsive, emitting responsive");
                this.emit("responsive");
            }
            return res;
        }
        finally {
            tracer.trace("Finalize, clearing busy guard");
            clearTimeout(timeout);
            if (resolveBusy)
                resolveBusy();
            this.exchangeBusyPromise = null;
        }
    }
    decorateAppAPIMethods(self, methods, scrambleKey) {
        for (const methodName of methods) {
            self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
        }
    }
    _appAPIlock = null;
    decorateAppAPIMethod(methodName, f, ctx, scrambleKey) {
        return async (...args) => {
            const { _appAPIlock } = this;
            if (_appAPIlock) {
                return Promise.reject(new TransportError("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"));
            }
            try {
                this._appAPIlock = methodName;
                this.setScrambleKey(scrambleKey);
                return await f.apply(ctx, args);
            }
            finally {
                this._appAPIlock = null;
            }
        };
    }
    /**
     * Sets the context used by the logging/tracing mechanism
     *
     * Useful when re-using (cached) the same Transport instance,
     * but with a new tracing context.
     *
     * @param context A TraceContext, that can undefined to reset the context
     */
    setTraceContext(context) {
        this.tracer = this.tracer.withContext(context);
    }
    /**
     * Updates the context used by the logging/tracing mechanism
     *
     * The update only overrides the key-value that are already defined in the current context.
     *
     * @param contextToAdd A TraceContext that will be added to the current context
     */
    updateTraceContext(contextToAdd) {
        this.tracer.updateContext(contextToAdd);
    }
    /**
     * Gets the tracing context of the transport instance
     */
    getTraceContext() {
        return this.tracer.getContext();
    }
    static ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
    static ErrorMessage_NoDeviceFound = "No Ledger device found";
}

const Tag = 0x05;
function asUInt16BE(value) {
    const b = Buffer$1.alloc(2);
    b.writeUInt16BE(value, 0);
    return b;
}
const initialAcc = {
    data: Buffer$1.alloc(0),
    dataLength: 0,
    sequence: 0,
};
/**
 * Object to handle HID frames (encoding and decoding)
 *
 * @param channel
 * @param packetSize The HID protocol packet size in bytes (usually 64)
 */
const createHIDframing = (channel, packetSize) => {
    return {
        /**
         * Frames/encodes an APDU message into HID USB packets/frames
         *
         * @param apdu The APDU message to send, in a Buffer containing [cla, ins, p1, p2, data length, data(if not empty)]
         * @returns an array of HID USB frames ready to be sent
         */
        makeBlocks(apdu) {
            // Encodes the APDU length in 2 bytes before the APDU itself.
            // The length is measured as the number of bytes.
            // As the size of the APDU `data` should have been added in 1 byte just before `data`,
            // the minimum size of an APDU is 5 bytes.
            let data = Buffer$1.concat([asUInt16BE(apdu.length), apdu]);
            const blockSize = packetSize - 5;
            const nbBlocks = Math.ceil(data.length / blockSize);
            // Fills data with 0-padding
            data = Buffer$1.concat([data, Buffer$1.alloc(nbBlocks * blockSize - data.length + 1).fill(0)]);
            const blocks = [];
            for (let i = 0; i < nbBlocks; i++) {
                const head = Buffer$1.alloc(5);
                head.writeUInt16BE(channel, 0);
                head.writeUInt8(Tag, 2);
                head.writeUInt16BE(i, 3);
                // `slice` and not `subarray`: this might not be a Node Buffer, but probably only a Uint8Array
                const chunk = data.slice(i * blockSize, (i + 1) * blockSize);
                blocks.push(Buffer$1.concat([head, chunk]));
            }
            return blocks;
        },
        /**
         * Reduces HID USB packets/frames to one response.
         *
         * @param acc The value resulting from (accumulating) the previous call of reduceResponse.
         *   On first call initialized to `initialAcc`. The accumulator enables handling multi-frames messages.
         * @param chunk Current chunk to reduce into accumulator
         * @returns An accumulator value updated with the current chunk
         */
        reduceResponse(acc, chunk) {
            let { data, dataLength, sequence } = acc || initialAcc;
            if (chunk.readUInt16BE(0) !== channel) {
                throw new TransportError("Invalid channel", "InvalidChannel");
            }
            if (chunk.readUInt8(2) !== Tag) {
                throw new TransportError("Invalid tag", "InvalidTag");
            }
            if (chunk.readUInt16BE(3) !== sequence) {
                throw new TransportError("Invalid sequence", "InvalidSequence");
            }
            // Gets the total length of the response from the 1st frame
            if (!acc) {
                dataLength = chunk.readUInt16BE(5);
            }
            sequence++;
            // The total length on the 1st frame takes 2 more bytes
            const chunkData = chunk.slice(acc ? 5 : 7);
            data = Buffer$1.concat([data, chunkData]);
            // Removes any 0 padding
            if (data.length > dataLength) {
                data = data.slice(0, dataLength);
            }
            return {
                data,
                dataLength,
                sequence,
            };
        },
        /**
         * Returns the response message that has been reduced from the HID USB frames
         *
         * @param acc The accumulator
         * @returns A Buffer containing the cleaned response message, or null if no response message, or undefined if the
         *   accumulator is incorrect (message length is not valid)
         */
        getReducedResult(acc) {
            if (acc && acc.dataLength === acc.data.length) {
                return acc.data;
            }
        },
    };
};

var re = {exports: {}};

var constants$1;
var hasRequiredConstants$1;

function requireConstants$1 () {
	if (hasRequiredConstants$1) return constants$1;
	hasRequiredConstants$1 = 1;

	// Note: this is the semver.org version of the spec that it implements
	// Not necessarily the package version of this code.
	const SEMVER_SPEC_VERSION = '2.0.0';

	const MAX_LENGTH = 256;
	const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
	/* istanbul ignore next */ 9007199254740991;

	// Max safe segment length for coercion.
	const MAX_SAFE_COMPONENT_LENGTH = 16;

	// Max safe length for a build identifier. The max length minus 6 characters for
	// the shortest version with a build 0.0.0+BUILD.
	const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;

	const RELEASE_TYPES = [
	  'major',
	  'premajor',
	  'minor',
	  'preminor',
	  'patch',
	  'prepatch',
	  'prerelease',
	];

	constants$1 = {
	  MAX_LENGTH,
	  MAX_SAFE_COMPONENT_LENGTH,
	  MAX_SAFE_BUILD_LENGTH,
	  MAX_SAFE_INTEGER,
	  RELEASE_TYPES,
	  SEMVER_SPEC_VERSION,
	  FLAG_INCLUDE_PRERELEASE: 0b001,
	  FLAG_LOOSE: 0b010,
	};
	return constants$1;
}

function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var browser = { exports: {} };
var process$1 = browser.exports = {};
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    if (typeof setTimeout === "function") {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === "function") {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e2) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e2) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process$1.nextTick = function(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function() {
  this.fun.apply(null, this.array);
};
process$1.title = "browser";
process$1.browser = true;
process$1.env = {};
process$1.argv = [];
process$1.version = "";
process$1.versions = {};
function noop$1() {
}
process$1.on = noop$1;
process$1.addListener = noop$1;
process$1.once = noop$1;
process$1.off = noop$1;
process$1.removeListener = noop$1;
process$1.removeAllListeners = noop$1;
process$1.emit = noop$1;
process$1.prependListener = noop$1;
process$1.prependOnceListener = noop$1;
process$1.listeners = function(name) {
  return [];
};
process$1.binding = function(name) {
  throw new Error("process.binding is not supported");
};
process$1.cwd = function() {
  return "/";
};
process$1.chdir = function(dir) {
  throw new Error("process.chdir is not supported");
};
process$1.umask = function() {
  return 0;
};
var browserExports = browser.exports;
const process$1$1 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);

var debug_1;
var hasRequiredDebug;

function requireDebug () {
	if (hasRequiredDebug) return debug_1;
	hasRequiredDebug = 1;
	var define_process_env_default = {};
	const debug = typeof process$1$1 === "object" && define_process_env_default && define_process_env_default.NODE_DEBUG && /\bsemver\b/i.test(define_process_env_default.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
	};
	debug_1 = debug;
	return debug_1;
}

var hasRequiredRe;

function requireRe () {
	if (hasRequiredRe) return re.exports;
	hasRequiredRe = 1;
	(function (module, exports) {

		const {
		  MAX_SAFE_COMPONENT_LENGTH,
		  MAX_SAFE_BUILD_LENGTH,
		  MAX_LENGTH,
		} = requireConstants$1();
		const debug = requireDebug();
		exports = module.exports = {};

		// The actual regexps go on exports.re
		const re = exports.re = [];
		const safeRe = exports.safeRe = [];
		const src = exports.src = [];
		const safeSrc = exports.safeSrc = [];
		const t = exports.t = {};
		let R = 0;

		const LETTERDASHNUMBER = '[a-zA-Z0-9-]';

		// Replace some greedy regex tokens to prevent regex dos issues. These regex are
		// used internally via the safeRe object since all inputs in this library get
		// normalized first to trim and collapse all extra whitespace. The original
		// regexes are exported for userland consumption and lower level usage. A
		// future breaking change could export the safer regex only with a note that
		// all input should have extra whitespace removed.
		const safeRegexReplacements = [
		  ['\\s', 1],
		  ['\\d', MAX_LENGTH],
		  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
		];

		const makeSafeRegex = (value) => {
		  for (const [token, max] of safeRegexReplacements) {
		    value = value
		      .split(`${token}*`).join(`${token}{0,${max}}`)
		      .split(`${token}+`).join(`${token}{1,${max}}`);
		  }
		  return value
		};

		const createToken = (name, value, isGlobal) => {
		  const safe = makeSafeRegex(value);
		  const index = R++;
		  debug(name, index, value);
		  t[name] = index;
		  src[index] = value;
		  safeSrc[index] = safe;
		  re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
		  safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined);
		};

		// The following Regular Expressions can be used for tokenizing,
		// validating, and parsing SemVer version strings.

		// ## Numeric Identifier
		// A single `0`, or a non-zero digit followed by zero or more digits.

		createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
		createToken('NUMERICIDENTIFIERLOOSE', '\\d+');

		// ## Non-numeric Identifier
		// Zero or more digits, followed by a letter or hyphen, and then zero or
		// more letters, digits, or hyphens.

		createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);

		// ## Main Version
		// Three dot-separated numeric identifiers.

		createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
		                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
		                   `(${src[t.NUMERICIDENTIFIER]})`);

		createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
		                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
		                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`);

		// ## Pre-release Version Identifier
		// A numeric identifier, or a non-numeric identifier.
		// Non-numberic identifiers include numberic identifiers but can be longer.
		// Therefore non-numberic identifiers must go first.

		createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NONNUMERICIDENTIFIER]
		}|${src[t.NUMERICIDENTIFIER]})`);

		createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NONNUMERICIDENTIFIER]
		}|${src[t.NUMERICIDENTIFIERLOOSE]})`);

		// ## Pre-release Version
		// Hyphen, followed by one or more dot-separated pre-release version
		// identifiers.

		createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
		}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);

		createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
		}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);

		// ## Build Metadata Identifier
		// Any combination of digits, letters, or hyphens.

		createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`);

		// ## Build Metadata
		// Plus sign, followed by one or more period-separated build metadata
		// identifiers.

		createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
		}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);

		// ## Full Version String
		// A main version, followed optionally by a pre-release version and
		// build metadata.

		// Note that the only major, minor, patch, and pre-release sections of
		// the version string are capturing groups.  The build metadata is not a
		// capturing group, because it should not ever be used in version
		// comparison.

		createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
		}${src[t.PRERELEASE]}?${
		  src[t.BUILD]}?`);

		createToken('FULL', `^${src[t.FULLPLAIN]}$`);

		// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
		// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
		// common in the npm registry.
		createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
		}${src[t.PRERELEASELOOSE]}?${
		  src[t.BUILD]}?`);

		createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);

		createToken('GTLT', '((?:<|>)?=?)');

		// Something like "2.*" or "1.2.x".
		// Note that "x.x" is a valid xRange identifer, meaning "any version"
		// Only the first item is strictly required.
		createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
		createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);

		createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:${src[t.PRERELEASE]})?${
		                     src[t.BUILD]}?` +
		                   `)?)?`);

		createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:${src[t.PRERELEASELOOSE]})?${
		                          src[t.BUILD]}?` +
		                        `)?)?`);

		createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
		createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);

		// Coercion.
		// Extract anything that could conceivably be a part of a valid semver
		createToken('COERCEPLAIN', `${'(^|[^\\d])' +
		              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
		              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
		              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
		createToken('COERCE', `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
		createToken('COERCEFULL', src[t.COERCEPLAIN] +
		              `(?:${src[t.PRERELEASE]})?` +
		              `(?:${src[t.BUILD]})?` +
		              `(?:$|[^\\d])`);
		createToken('COERCERTL', src[t.COERCE], true);
		createToken('COERCERTLFULL', src[t.COERCEFULL], true);

		// Tilde ranges.
		// Meaning is "reasonably at or greater than"
		createToken('LONETILDE', '(?:~>?)');

		createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
		exports.tildeTrimReplace = '$1~';

		createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
		createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);

		// Caret ranges.
		// Meaning is "at least and backwards compatible with"
		createToken('LONECARET', '(?:\\^)');

		createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
		exports.caretTrimReplace = '$1^';

		createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
		createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);

		// A simple gt/lt/eq thing, or just "" to indicate "any version"
		createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
		createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);

		// An expression to strip any whitespace between the gtlt and the thing
		// it modifies, so that `> 1.2.3` ==> `>1.2.3`
		createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
		}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
		exports.comparatorTrimReplace = '$1$2$3';

		// Something like `1.2.3 - 1.2.4`
		// Note that these all use the loose form, because they'll be
		// checked against either the strict or loose comparator form
		// later.
		createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
		                   `\\s+-\\s+` +
		                   `(${src[t.XRANGEPLAIN]})` +
		                   `\\s*$`);

		createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
		                        `\\s+-\\s+` +
		                        `(${src[t.XRANGEPLAINLOOSE]})` +
		                        `\\s*$`);

		// Star ranges basically just allow anything at all.
		createToken('STAR', '(<|>)?=?\\s*\\*');
		// >=0.0.0 is like a star
		createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
		createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$'); 
	} (re, re.exports));
	return re.exports;
}

var parseOptions_1;
var hasRequiredParseOptions;

function requireParseOptions () {
	if (hasRequiredParseOptions) return parseOptions_1;
	hasRequiredParseOptions = 1;

	// parse out just the options we care about
	const looseOption = Object.freeze({ loose: true });
	const emptyOpts = Object.freeze({ });
	const parseOptions = options => {
	  if (!options) {
	    return emptyOpts
	  }

	  if (typeof options !== 'object') {
	    return looseOption
	  }

	  return options
	};
	parseOptions_1 = parseOptions;
	return parseOptions_1;
}

var identifiers;
var hasRequiredIdentifiers;

function requireIdentifiers () {
	if (hasRequiredIdentifiers) return identifiers;
	hasRequiredIdentifiers = 1;

	const numeric = /^[0-9]+$/;
	const compareIdentifiers = (a, b) => {
	  const anum = numeric.test(a);
	  const bnum = numeric.test(b);

	  if (anum && bnum) {
	    a = +a;
	    b = +b;
	  }

	  return a === b ? 0
	    : (anum && !bnum) ? -1
	    : (bnum && !anum) ? 1
	    : a < b ? -1
	    : 1
	};

	const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);

	identifiers = {
	  compareIdentifiers,
	  rcompareIdentifiers,
	};
	return identifiers;
}

var semver$2;
var hasRequiredSemver$1;

function requireSemver$1 () {
	if (hasRequiredSemver$1) return semver$2;
	hasRequiredSemver$1 = 1;

	const debug = requireDebug();
	const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants$1();
	const { safeRe: re, t } = requireRe();

	const parseOptions = requireParseOptions();
	const { compareIdentifiers } = requireIdentifiers();
	class SemVer {
	  constructor (version, options) {
	    options = parseOptions(options);

	    if (version instanceof SemVer) {
	      if (version.loose === !!options.loose &&
	        version.includePrerelease === !!options.includePrerelease) {
	        return version
	      } else {
	        version = version.version;
	      }
	    } else if (typeof version !== 'string') {
	      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`)
	    }

	    if (version.length > MAX_LENGTH) {
	      throw new TypeError(
	        `version is longer than ${MAX_LENGTH} characters`
	      )
	    }

	    debug('SemVer', version, options);
	    this.options = options;
	    this.loose = !!options.loose;
	    // this isn't actually relevant for versions, but keep it so that we
	    // don't run into trouble passing this.options around.
	    this.includePrerelease = !!options.includePrerelease;

	    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);

	    if (!m) {
	      throw new TypeError(`Invalid Version: ${version}`)
	    }

	    this.raw = version;

	    // these are actually numbers
	    this.major = +m[1];
	    this.minor = +m[2];
	    this.patch = +m[3];

	    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
	      throw new TypeError('Invalid major version')
	    }

	    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
	      throw new TypeError('Invalid minor version')
	    }

	    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
	      throw new TypeError('Invalid patch version')
	    }

	    // numberify any prerelease numeric ids
	    if (!m[4]) {
	      this.prerelease = [];
	    } else {
	      this.prerelease = m[4].split('.').map((id) => {
	        if (/^[0-9]+$/.test(id)) {
	          const num = +id;
	          if (num >= 0 && num < MAX_SAFE_INTEGER) {
	            return num
	          }
	        }
	        return id
	      });
	    }

	    this.build = m[5] ? m[5].split('.') : [];
	    this.format();
	  }

	  format () {
	    this.version = `${this.major}.${this.minor}.${this.patch}`;
	    if (this.prerelease.length) {
	      this.version += `-${this.prerelease.join('.')}`;
	    }
	    return this.version
	  }

	  toString () {
	    return this.version
	  }

	  compare (other) {
	    debug('SemVer.compare', this.version, this.options, other);
	    if (!(other instanceof SemVer)) {
	      if (typeof other === 'string' && other === this.version) {
	        return 0
	      }
	      other = new SemVer(other, this.options);
	    }

	    if (other.version === this.version) {
	      return 0
	    }

	    return this.compareMain(other) || this.comparePre(other)
	  }

	  compareMain (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }

	    return (
	      compareIdentifiers(this.major, other.major) ||
	      compareIdentifiers(this.minor, other.minor) ||
	      compareIdentifiers(this.patch, other.patch)
	    )
	  }

	  comparePre (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }

	    // NOT having a prerelease is > having one
	    if (this.prerelease.length && !other.prerelease.length) {
	      return -1
	    } else if (!this.prerelease.length && other.prerelease.length) {
	      return 1
	    } else if (!this.prerelease.length && !other.prerelease.length) {
	      return 0
	    }

	    let i = 0;
	    do {
	      const a = this.prerelease[i];
	      const b = other.prerelease[i];
	      debug('prerelease compare', i, a, b);
	      if (a === undefined && b === undefined) {
	        return 0
	      } else if (b === undefined) {
	        return 1
	      } else if (a === undefined) {
	        return -1
	      } else if (a === b) {
	        continue
	      } else {
	        return compareIdentifiers(a, b)
	      }
	    } while (++i)
	  }

	  compareBuild (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }

	    let i = 0;
	    do {
	      const a = this.build[i];
	      const b = other.build[i];
	      debug('build compare', i, a, b);
	      if (a === undefined && b === undefined) {
	        return 0
	      } else if (b === undefined) {
	        return 1
	      } else if (a === undefined) {
	        return -1
	      } else if (a === b) {
	        continue
	      } else {
	        return compareIdentifiers(a, b)
	      }
	    } while (++i)
	  }

	  // preminor will bump the version up to the next minor release, and immediately
	  // down to pre-release. premajor and prepatch work the same way.
	  inc (release, identifier, identifierBase) {
	    if (release.startsWith('pre')) {
	      if (!identifier && identifierBase === false) {
	        throw new Error('invalid increment argument: identifier is empty')
	      }
	      // Avoid an invalid semver results
	      if (identifier) {
	        const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
	        if (!match || match[1] !== identifier) {
	          throw new Error(`invalid identifier: ${identifier}`)
	        }
	      }
	    }

	    switch (release) {
	      case 'premajor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor = 0;
	        this.major++;
	        this.inc('pre', identifier, identifierBase);
	        break
	      case 'preminor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor++;
	        this.inc('pre', identifier, identifierBase);
	        break
	      case 'prepatch':
	        // If this is already a prerelease, it will bump to the next version
	        // drop any prereleases that might already exist, since they are not
	        // relevant at this point.
	        this.prerelease.length = 0;
	        this.inc('patch', identifier, identifierBase);
	        this.inc('pre', identifier, identifierBase);
	        break
	      // If the input is a non-prerelease version, this acts the same as
	      // prepatch.
	      case 'prerelease':
	        if (this.prerelease.length === 0) {
	          this.inc('patch', identifier, identifierBase);
	        }
	        this.inc('pre', identifier, identifierBase);
	        break
	      case 'release':
	        if (this.prerelease.length === 0) {
	          throw new Error(`version ${this.raw} is not a prerelease`)
	        }
	        this.prerelease.length = 0;
	        break

	      case 'major':
	        // If this is a pre-major version, bump up to the same major version.
	        // Otherwise increment major.
	        // 1.0.0-5 bumps to 1.0.0
	        // 1.1.0 bumps to 2.0.0
	        if (
	          this.minor !== 0 ||
	          this.patch !== 0 ||
	          this.prerelease.length === 0
	        ) {
	          this.major++;
	        }
	        this.minor = 0;
	        this.patch = 0;
	        this.prerelease = [];
	        break
	      case 'minor':
	        // If this is a pre-minor version, bump up to the same minor version.
	        // Otherwise increment minor.
	        // 1.2.0-5 bumps to 1.2.0
	        // 1.2.1 bumps to 1.3.0
	        if (this.patch !== 0 || this.prerelease.length === 0) {
	          this.minor++;
	        }
	        this.patch = 0;
	        this.prerelease = [];
	        break
	      case 'patch':
	        // If this is not a pre-release version, it will increment the patch.
	        // If it is a pre-release it will bump up to the same patch version.
	        // 1.2.0-5 patches to 1.2.0
	        // 1.2.0 patches to 1.2.1
	        if (this.prerelease.length === 0) {
	          this.patch++;
	        }
	        this.prerelease = [];
	        break
	      // This probably shouldn't be used publicly.
	      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
	      case 'pre': {
	        const base = Number(identifierBase) ? 1 : 0;

	        if (this.prerelease.length === 0) {
	          this.prerelease = [base];
	        } else {
	          let i = this.prerelease.length;
	          while (--i >= 0) {
	            if (typeof this.prerelease[i] === 'number') {
	              this.prerelease[i]++;
	              i = -2;
	            }
	          }
	          if (i === -1) {
	            // didn't increment anything
	            if (identifier === this.prerelease.join('.') && identifierBase === false) {
	              throw new Error('invalid increment argument: identifier already exists')
	            }
	            this.prerelease.push(base);
	          }
	        }
	        if (identifier) {
	          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
	          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
	          let prerelease = [identifier, base];
	          if (identifierBase === false) {
	            prerelease = [identifier];
	          }
	          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
	            if (isNaN(this.prerelease[1])) {
	              this.prerelease = prerelease;
	            }
	          } else {
	            this.prerelease = prerelease;
	          }
	        }
	        break
	      }
	      default:
	        throw new Error(`invalid increment argument: ${release}`)
	    }
	    this.raw = this.format();
	    if (this.build.length) {
	      this.raw += `+${this.build.join('.')}`;
	    }
	    return this
	  }
	}

	semver$2 = SemVer;
	return semver$2;
}

var parse_1;
var hasRequiredParse$1;

function requireParse$1 () {
	if (hasRequiredParse$1) return parse_1;
	hasRequiredParse$1 = 1;

	const SemVer = requireSemver$1();
	const parse = (version, options, throwErrors = false) => {
	  if (version instanceof SemVer) {
	    return version
	  }
	  try {
	    return new SemVer(version, options)
	  } catch (er) {
	    if (!throwErrors) {
	      return null
	    }
	    throw er
	  }
	};

	parse_1 = parse;
	return parse_1;
}

var valid_1;
var hasRequiredValid$1;

function requireValid$1 () {
	if (hasRequiredValid$1) return valid_1;
	hasRequiredValid$1 = 1;

	const parse = requireParse$1();
	const valid = (version, options) => {
	  const v = parse(version, options);
	  return v ? v.version : null
	};
	valid_1 = valid;
	return valid_1;
}

var clean_1;
var hasRequiredClean;

function requireClean () {
	if (hasRequiredClean) return clean_1;
	hasRequiredClean = 1;

	const parse = requireParse$1();
	const clean = (version, options) => {
	  const s = parse(version.trim().replace(/^[=v]+/, ''), options);
	  return s ? s.version : null
	};
	clean_1 = clean;
	return clean_1;
}

var inc_1;
var hasRequiredInc;

function requireInc () {
	if (hasRequiredInc) return inc_1;
	hasRequiredInc = 1;

	const SemVer = requireSemver$1();

	const inc = (version, release, options, identifier, identifierBase) => {
	  if (typeof (options) === 'string') {
	    identifierBase = identifier;
	    identifier = options;
	    options = undefined;
	  }

	  try {
	    return new SemVer(
	      version instanceof SemVer ? version.version : version,
	      options
	    ).inc(release, identifier, identifierBase).version
	  } catch (er) {
	    return null
	  }
	};
	inc_1 = inc;
	return inc_1;
}

var diff_1;
var hasRequiredDiff;

function requireDiff () {
	if (hasRequiredDiff) return diff_1;
	hasRequiredDiff = 1;

	const parse = requireParse$1();

	const diff = (version1, version2) => {
	  const v1 = parse(version1, null, true);
	  const v2 = parse(version2, null, true);
	  const comparison = v1.compare(v2);

	  if (comparison === 0) {
	    return null
	  }

	  const v1Higher = comparison > 0;
	  const highVersion = v1Higher ? v1 : v2;
	  const lowVersion = v1Higher ? v2 : v1;
	  const highHasPre = !!highVersion.prerelease.length;
	  const lowHasPre = !!lowVersion.prerelease.length;

	  if (lowHasPre && !highHasPre) {
	    // Going from prerelease -> no prerelease requires some special casing

	    // If the low version has only a major, then it will always be a major
	    // Some examples:
	    // 1.0.0-1 -> 1.0.0
	    // 1.0.0-1 -> 1.1.1
	    // 1.0.0-1 -> 2.0.0
	    if (!lowVersion.patch && !lowVersion.minor) {
	      return 'major'
	    }

	    // If the main part has no difference
	    if (lowVersion.compareMain(highVersion) === 0) {
	      if (lowVersion.minor && !lowVersion.patch) {
	        return 'minor'
	      }
	      return 'patch'
	    }
	  }

	  // add the `pre` prefix if we are going to a prerelease version
	  const prefix = highHasPre ? 'pre' : '';

	  if (v1.major !== v2.major) {
	    return prefix + 'major'
	  }

	  if (v1.minor !== v2.minor) {
	    return prefix + 'minor'
	  }

	  if (v1.patch !== v2.patch) {
	    return prefix + 'patch'
	  }

	  // high and low are preleases
	  return 'prerelease'
	};

	diff_1 = diff;
	return diff_1;
}

var major_1;
var hasRequiredMajor;

function requireMajor () {
	if (hasRequiredMajor) return major_1;
	hasRequiredMajor = 1;

	const SemVer = requireSemver$1();
	const major = (a, loose) => new SemVer(a, loose).major;
	major_1 = major;
	return major_1;
}

var minor_1;
var hasRequiredMinor;

function requireMinor () {
	if (hasRequiredMinor) return minor_1;
	hasRequiredMinor = 1;

	const SemVer = requireSemver$1();
	const minor = (a, loose) => new SemVer(a, loose).minor;
	minor_1 = minor;
	return minor_1;
}

var patch_1;
var hasRequiredPatch;

function requirePatch () {
	if (hasRequiredPatch) return patch_1;
	hasRequiredPatch = 1;

	const SemVer = requireSemver$1();
	const patch = (a, loose) => new SemVer(a, loose).patch;
	patch_1 = patch;
	return patch_1;
}

var prerelease_1;
var hasRequiredPrerelease;

function requirePrerelease () {
	if (hasRequiredPrerelease) return prerelease_1;
	hasRequiredPrerelease = 1;

	const parse = requireParse$1();
	const prerelease = (version, options) => {
	  const parsed = parse(version, options);
	  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
	};
	prerelease_1 = prerelease;
	return prerelease_1;
}

var compare_1;
var hasRequiredCompare;

function requireCompare () {
	if (hasRequiredCompare) return compare_1;
	hasRequiredCompare = 1;

	const SemVer = requireSemver$1();
	const compare = (a, b, loose) =>
	  new SemVer(a, loose).compare(new SemVer(b, loose));

	compare_1 = compare;
	return compare_1;
}

var rcompare_1;
var hasRequiredRcompare;

function requireRcompare () {
	if (hasRequiredRcompare) return rcompare_1;
	hasRequiredRcompare = 1;

	const compare = requireCompare();
	const rcompare = (a, b, loose) => compare(b, a, loose);
	rcompare_1 = rcompare;
	return rcompare_1;
}

var compareLoose_1;
var hasRequiredCompareLoose;

function requireCompareLoose () {
	if (hasRequiredCompareLoose) return compareLoose_1;
	hasRequiredCompareLoose = 1;

	const compare = requireCompare();
	const compareLoose = (a, b) => compare(a, b, true);
	compareLoose_1 = compareLoose;
	return compareLoose_1;
}

var compareBuild_1;
var hasRequiredCompareBuild;

function requireCompareBuild () {
	if (hasRequiredCompareBuild) return compareBuild_1;
	hasRequiredCompareBuild = 1;

	const SemVer = requireSemver$1();
	const compareBuild = (a, b, loose) => {
	  const versionA = new SemVer(a, loose);
	  const versionB = new SemVer(b, loose);
	  return versionA.compare(versionB) || versionA.compareBuild(versionB)
	};
	compareBuild_1 = compareBuild;
	return compareBuild_1;
}

var sort_1;
var hasRequiredSort;

function requireSort () {
	if (hasRequiredSort) return sort_1;
	hasRequiredSort = 1;

	const compareBuild = requireCompareBuild();
	const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
	sort_1 = sort;
	return sort_1;
}

var rsort_1;
var hasRequiredRsort;

function requireRsort () {
	if (hasRequiredRsort) return rsort_1;
	hasRequiredRsort = 1;

	const compareBuild = requireCompareBuild();
	const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
	rsort_1 = rsort;
	return rsort_1;
}

var gt_1;
var hasRequiredGt;

function requireGt () {
	if (hasRequiredGt) return gt_1;
	hasRequiredGt = 1;

	const compare = requireCompare();
	const gt = (a, b, loose) => compare(a, b, loose) > 0;
	gt_1 = gt;
	return gt_1;
}

var lt_1;
var hasRequiredLt;

function requireLt () {
	if (hasRequiredLt) return lt_1;
	hasRequiredLt = 1;

	const compare = requireCompare();
	const lt = (a, b, loose) => compare(a, b, loose) < 0;
	lt_1 = lt;
	return lt_1;
}

var eq_1;
var hasRequiredEq;

function requireEq () {
	if (hasRequiredEq) return eq_1;
	hasRequiredEq = 1;

	const compare = requireCompare();
	const eq = (a, b, loose) => compare(a, b, loose) === 0;
	eq_1 = eq;
	return eq_1;
}

var neq_1;
var hasRequiredNeq;

function requireNeq () {
	if (hasRequiredNeq) return neq_1;
	hasRequiredNeq = 1;

	const compare = requireCompare();
	const neq = (a, b, loose) => compare(a, b, loose) !== 0;
	neq_1 = neq;
	return neq_1;
}

var gte_1;
var hasRequiredGte;

function requireGte () {
	if (hasRequiredGte) return gte_1;
	hasRequiredGte = 1;

	const compare = requireCompare();
	const gte = (a, b, loose) => compare(a, b, loose) >= 0;
	gte_1 = gte;
	return gte_1;
}

var lte_1;
var hasRequiredLte;

function requireLte () {
	if (hasRequiredLte) return lte_1;
	hasRequiredLte = 1;

	const compare = requireCompare();
	const lte = (a, b, loose) => compare(a, b, loose) <= 0;
	lte_1 = lte;
	return lte_1;
}

var cmp_1;
var hasRequiredCmp;

function requireCmp () {
	if (hasRequiredCmp) return cmp_1;
	hasRequiredCmp = 1;

	const eq = requireEq();
	const neq = requireNeq();
	const gt = requireGt();
	const gte = requireGte();
	const lt = requireLt();
	const lte = requireLte();

	const cmp = (a, op, b, loose) => {
	  switch (op) {
	    case '===':
	      if (typeof a === 'object') {
	        a = a.version;
	      }
	      if (typeof b === 'object') {
	        b = b.version;
	      }
	      return a === b

	    case '!==':
	      if (typeof a === 'object') {
	        a = a.version;
	      }
	      if (typeof b === 'object') {
	        b = b.version;
	      }
	      return a !== b

	    case '':
	    case '=':
	    case '==':
	      return eq(a, b, loose)

	    case '!=':
	      return neq(a, b, loose)

	    case '>':
	      return gt(a, b, loose)

	    case '>=':
	      return gte(a, b, loose)

	    case '<':
	      return lt(a, b, loose)

	    case '<=':
	      return lte(a, b, loose)

	    default:
	      throw new TypeError(`Invalid operator: ${op}`)
	  }
	};
	cmp_1 = cmp;
	return cmp_1;
}

var coerce_1;
var hasRequiredCoerce;

function requireCoerce () {
	if (hasRequiredCoerce) return coerce_1;
	hasRequiredCoerce = 1;

	const SemVer = requireSemver$1();
	const parse = requireParse$1();
	const { safeRe: re, t } = requireRe();

	const coerce = (version, options) => {
	  if (version instanceof SemVer) {
	    return version
	  }

	  if (typeof version === 'number') {
	    version = String(version);
	  }

	  if (typeof version !== 'string') {
	    return null
	  }

	  options = options || {};

	  let match = null;
	  if (!options.rtl) {
	    match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
	  } else {
	    // Find the right-most coercible string that does not share
	    // a terminus with a more left-ward coercible string.
	    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
	    // With includePrerelease option set, '1.2.3.4-rc' wants to coerce '2.3.4-rc', not '2.3.4'
	    //
	    // Walk through the string checking with a /g regexp
	    // Manually set the index so as to pick up overlapping matches.
	    // Stop when we get a match that ends at the string end, since no
	    // coercible string can be more right-ward without the same terminus.
	    const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
	    let next;
	    while ((next = coerceRtlRegex.exec(version)) &&
	        (!match || match.index + match[0].length !== version.length)
	    ) {
	      if (!match ||
	            next.index + next[0].length !== match.index + match[0].length) {
	        match = next;
	      }
	      coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
	    }
	    // leave it in a clean state
	    coerceRtlRegex.lastIndex = -1;
	  }

	  if (match === null) {
	    return null
	  }

	  const major = match[2];
	  const minor = match[3] || '0';
	  const patch = match[4] || '0';
	  const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : '';
	  const build = options.includePrerelease && match[6] ? `+${match[6]}` : '';

	  return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options)
	};
	coerce_1 = coerce;
	return coerce_1;
}

var lrucache;
var hasRequiredLrucache;

function requireLrucache () {
	if (hasRequiredLrucache) return lrucache;
	hasRequiredLrucache = 1;

	class LRUCache {
	  constructor () {
	    this.max = 1000;
	    this.map = new Map();
	  }

	  get (key) {
	    const value = this.map.get(key);
	    if (value === undefined) {
	      return undefined
	    } else {
	      // Remove the key from the map and add it to the end
	      this.map.delete(key);
	      this.map.set(key, value);
	      return value
	    }
	  }

	  delete (key) {
	    return this.map.delete(key)
	  }

	  set (key, value) {
	    const deleted = this.delete(key);

	    if (!deleted && value !== undefined) {
	      // If cache is full, delete the least recently used item
	      if (this.map.size >= this.max) {
	        const firstKey = this.map.keys().next().value;
	        this.delete(firstKey);
	      }

	      this.map.set(key, value);
	    }

	    return this
	  }
	}

	lrucache = LRUCache;
	return lrucache;
}

var range;
var hasRequiredRange;

function requireRange () {
	if (hasRequiredRange) return range;
	hasRequiredRange = 1;

	const SPACE_CHARACTERS = /\s+/g;

	// hoisted class for cyclic dependency
	class Range {
	  constructor (range, options) {
	    options = parseOptions(options);

	    if (range instanceof Range) {
	      if (
	        range.loose === !!options.loose &&
	        range.includePrerelease === !!options.includePrerelease
	      ) {
	        return range
	      } else {
	        return new Range(range.raw, options)
	      }
	    }

	    if (range instanceof Comparator) {
	      // just put it in the set and return
	      this.raw = range.value;
	      this.set = [[range]];
	      this.formatted = undefined;
	      return this
	    }

	    this.options = options;
	    this.loose = !!options.loose;
	    this.includePrerelease = !!options.includePrerelease;

	    // First reduce all whitespace as much as possible so we do not have to rely
	    // on potentially slow regexes like \s*. This is then stored and used for
	    // future error messages as well.
	    this.raw = range.trim().replace(SPACE_CHARACTERS, ' ');

	    // First, split on ||
	    this.set = this.raw
	      .split('||')
	      // map the range to a 2d array of comparators
	      .map(r => this.parseRange(r.trim()))
	      // throw out any comparator lists that are empty
	      // this generally means that it was not a valid range, which is allowed
	      // in loose mode, but will still throw if the WHOLE range is invalid.
	      .filter(c => c.length);

	    if (!this.set.length) {
	      throw new TypeError(`Invalid SemVer Range: ${this.raw}`)
	    }

	    // if we have any that are not the null set, throw out null sets.
	    if (this.set.length > 1) {
	      // keep the first one, in case they're all null sets
	      const first = this.set[0];
	      this.set = this.set.filter(c => !isNullSet(c[0]));
	      if (this.set.length === 0) {
	        this.set = [first];
	      } else if (this.set.length > 1) {
	        // if we have any that are *, then the range is just *
	        for (const c of this.set) {
	          if (c.length === 1 && isAny(c[0])) {
	            this.set = [c];
	            break
	          }
	        }
	      }
	    }

	    this.formatted = undefined;
	  }

	  get range () {
	    if (this.formatted === undefined) {
	      this.formatted = '';
	      for (let i = 0; i < this.set.length; i++) {
	        if (i > 0) {
	          this.formatted += '||';
	        }
	        const comps = this.set[i];
	        for (let k = 0; k < comps.length; k++) {
	          if (k > 0) {
	            this.formatted += ' ';
	          }
	          this.formatted += comps[k].toString().trim();
	        }
	      }
	    }
	    return this.formatted
	  }

	  format () {
	    return this.range
	  }

	  toString () {
	    return this.range
	  }

	  parseRange (range) {
	    // memoize range parsing for performance.
	    // this is a very hot path, and fully deterministic.
	    const memoOpts =
	      (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) |
	      (this.options.loose && FLAG_LOOSE);
	    const memoKey = memoOpts + ':' + range;
	    const cached = cache.get(memoKey);
	    if (cached) {
	      return cached
	    }

	    const loose = this.options.loose;
	    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
	    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
	    range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
	    debug('hyphen replace', range);

	    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
	    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
	    debug('comparator trim', range);

	    // `~ 1.2.3` => `~1.2.3`
	    range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
	    debug('tilde trim', range);

	    // `^ 1.2.3` => `^1.2.3`
	    range = range.replace(re[t.CARETTRIM], caretTrimReplace);
	    debug('caret trim', range);

	    // At this point, the range is completely trimmed and
	    // ready to be split into comparators.

	    let rangeList = range
	      .split(' ')
	      .map(comp => parseComparator(comp, this.options))
	      .join(' ')
	      .split(/\s+/)
	      // >=0.0.0 is equivalent to *
	      .map(comp => replaceGTE0(comp, this.options));

	    if (loose) {
	      // in loose mode, throw out any that are not valid comparators
	      rangeList = rangeList.filter(comp => {
	        debug('loose invalid filter', comp, this.options);
	        return !!comp.match(re[t.COMPARATORLOOSE])
	      });
	    }
	    debug('range list', rangeList);

	    // if any comparators are the null set, then replace with JUST null set
	    // if more than one comparator, remove any * comparators
	    // also, don't include the same comparator more than once
	    const rangeMap = new Map();
	    const comparators = rangeList.map(comp => new Comparator(comp, this.options));
	    for (const comp of comparators) {
	      if (isNullSet(comp)) {
	        return [comp]
	      }
	      rangeMap.set(comp.value, comp);
	    }
	    if (rangeMap.size > 1 && rangeMap.has('')) {
	      rangeMap.delete('');
	    }

	    const result = [...rangeMap.values()];
	    cache.set(memoKey, result);
	    return result
	  }

	  intersects (range, options) {
	    if (!(range instanceof Range)) {
	      throw new TypeError('a Range is required')
	    }

	    return this.set.some((thisComparators) => {
	      return (
	        isSatisfiable(thisComparators, options) &&
	        range.set.some((rangeComparators) => {
	          return (
	            isSatisfiable(rangeComparators, options) &&
	            thisComparators.every((thisComparator) => {
	              return rangeComparators.every((rangeComparator) => {
	                return thisComparator.intersects(rangeComparator, options)
	              })
	            })
	          )
	        })
	      )
	    })
	  }

	  // if ANY of the sets match ALL of its comparators, then pass
	  test (version) {
	    if (!version) {
	      return false
	    }

	    if (typeof version === 'string') {
	      try {
	        version = new SemVer(version, this.options);
	      } catch (er) {
	        return false
	      }
	    }

	    for (let i = 0; i < this.set.length; i++) {
	      if (testSet(this.set[i], version, this.options)) {
	        return true
	      }
	    }
	    return false
	  }
	}

	range = Range;

	const LRU = requireLrucache();
	const cache = new LRU();

	const parseOptions = requireParseOptions();
	const Comparator = requireComparator();
	const debug = requireDebug();
	const SemVer = requireSemver$1();
	const {
	  safeRe: re,
	  t,
	  comparatorTrimReplace,
	  tildeTrimReplace,
	  caretTrimReplace,
	} = requireRe();
	const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = requireConstants$1();

	const isNullSet = c => c.value === '<0.0.0-0';
	const isAny = c => c.value === '';

	// take a set of comparators and determine whether there
	// exists a version which can satisfy it
	const isSatisfiable = (comparators, options) => {
	  let result = true;
	  const remainingComparators = comparators.slice();
	  let testComparator = remainingComparators.pop();

	  while (result && remainingComparators.length) {
	    result = remainingComparators.every((otherComparator) => {
	      return testComparator.intersects(otherComparator, options)
	    });

	    testComparator = remainingComparators.pop();
	  }

	  return result
	};

	// comprised of xranges, tildes, stars, and gtlt's at this point.
	// already replaced the hyphen ranges
	// turn into a set of JUST comparators.
	const parseComparator = (comp, options) => {
	  debug('comp', comp, options);
	  comp = replaceCarets(comp, options);
	  debug('caret', comp);
	  comp = replaceTildes(comp, options);
	  debug('tildes', comp);
	  comp = replaceXRanges(comp, options);
	  debug('xrange', comp);
	  comp = replaceStars(comp, options);
	  debug('stars', comp);
	  return comp
	};

	const isX = id => !id || id.toLowerCase() === 'x' || id === '*';

	// ~, ~> --> * (any, kinda silly)
	// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
	// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
	// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
	// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
	// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
	// ~0.0.1 --> >=0.0.1 <0.1.0-0
	const replaceTildes = (comp, options) => {
	  return comp
	    .trim()
	    .split(/\s+/)
	    .map((c) => replaceTilde(c, options))
	    .join(' ')
	};

	const replaceTilde = (comp, options) => {
	  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
	  return comp.replace(r, (_, M, m, p, pr) => {
	    debug('tilde', comp, _, M, m, p, pr);
	    let ret;

	    if (isX(M)) {
	      ret = '';
	    } else if (isX(m)) {
	      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
	    } else if (isX(p)) {
	      // ~1.2 == >=1.2.0 <1.3.0-0
	      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
	    } else if (pr) {
	      debug('replaceTilde pr', pr);
	      ret = `>=${M}.${m}.${p}-${pr
	      } <${M}.${+m + 1}.0-0`;
	    } else {
	      // ~1.2.3 == >=1.2.3 <1.3.0-0
	      ret = `>=${M}.${m}.${p
	      } <${M}.${+m + 1}.0-0`;
	    }

	    debug('tilde return', ret);
	    return ret
	  })
	};

	// ^ --> * (any, kinda silly)
	// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
	// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
	// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
	// ^1.2.3 --> >=1.2.3 <2.0.0-0
	// ^1.2.0 --> >=1.2.0 <2.0.0-0
	// ^0.0.1 --> >=0.0.1 <0.0.2-0
	// ^0.1.0 --> >=0.1.0 <0.2.0-0
	const replaceCarets = (comp, options) => {
	  return comp
	    .trim()
	    .split(/\s+/)
	    .map((c) => replaceCaret(c, options))
	    .join(' ')
	};

	const replaceCaret = (comp, options) => {
	  debug('caret', comp, options);
	  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
	  const z = options.includePrerelease ? '-0' : '';
	  return comp.replace(r, (_, M, m, p, pr) => {
	    debug('caret', comp, _, M, m, p, pr);
	    let ret;

	    if (isX(M)) {
	      ret = '';
	    } else if (isX(m)) {
	      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
	    } else if (isX(p)) {
	      if (M === '0') {
	        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
	      } else {
	        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
	      }
	    } else if (pr) {
	      debug('replaceCaret pr', pr);
	      if (M === '0') {
	        if (m === '0') {
	          ret = `>=${M}.${m}.${p}-${pr
	          } <${M}.${m}.${+p + 1}-0`;
	        } else {
	          ret = `>=${M}.${m}.${p}-${pr
	          } <${M}.${+m + 1}.0-0`;
	        }
	      } else {
	        ret = `>=${M}.${m}.${p}-${pr
	        } <${+M + 1}.0.0-0`;
	      }
	    } else {
	      debug('no pr');
	      if (M === '0') {
	        if (m === '0') {
	          ret = `>=${M}.${m}.${p
	          }${z} <${M}.${m}.${+p + 1}-0`;
	        } else {
	          ret = `>=${M}.${m}.${p
	          }${z} <${M}.${+m + 1}.0-0`;
	        }
	      } else {
	        ret = `>=${M}.${m}.${p
	        } <${+M + 1}.0.0-0`;
	      }
	    }

	    debug('caret return', ret);
	    return ret
	  })
	};

	const replaceXRanges = (comp, options) => {
	  debug('replaceXRanges', comp, options);
	  return comp
	    .split(/\s+/)
	    .map((c) => replaceXRange(c, options))
	    .join(' ')
	};

	const replaceXRange = (comp, options) => {
	  comp = comp.trim();
	  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
	  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
	    debug('xRange', comp, ret, gtlt, M, m, p, pr);
	    const xM = isX(M);
	    const xm = xM || isX(m);
	    const xp = xm || isX(p);
	    const anyX = xp;

	    if (gtlt === '=' && anyX) {
	      gtlt = '';
	    }

	    // if we're including prereleases in the match, then we need
	    // to fix this to -0, the lowest possible prerelease value
	    pr = options.includePrerelease ? '-0' : '';

	    if (xM) {
	      if (gtlt === '>' || gtlt === '<') {
	        // nothing is allowed
	        ret = '<0.0.0-0';
	      } else {
	        // nothing is forbidden
	        ret = '*';
	      }
	    } else if (gtlt && anyX) {
	      // we know patch is an x, because we have any x at all.
	      // replace X with 0
	      if (xm) {
	        m = 0;
	      }
	      p = 0;

	      if (gtlt === '>') {
	        // >1 => >=2.0.0
	        // >1.2 => >=1.3.0
	        gtlt = '>=';
	        if (xm) {
	          M = +M + 1;
	          m = 0;
	          p = 0;
	        } else {
	          m = +m + 1;
	          p = 0;
	        }
	      } else if (gtlt === '<=') {
	        // <=0.7.x is actually <0.8.0, since any 0.7.x should
	        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
	        gtlt = '<';
	        if (xm) {
	          M = +M + 1;
	        } else {
	          m = +m + 1;
	        }
	      }

	      if (gtlt === '<') {
	        pr = '-0';
	      }

	      ret = `${gtlt + M}.${m}.${p}${pr}`;
	    } else if (xm) {
	      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
	    } else if (xp) {
	      ret = `>=${M}.${m}.0${pr
	      } <${M}.${+m + 1}.0-0`;
	    }

	    debug('xRange return', ret);

	    return ret
	  })
	};

	// Because * is AND-ed with everything else in the comparator,
	// and '' means "any version", just remove the *s entirely.
	const replaceStars = (comp, options) => {
	  debug('replaceStars', comp, options);
	  // Looseness is ignored here.  star is always as loose as it gets!
	  return comp
	    .trim()
	    .replace(re[t.STAR], '')
	};

	const replaceGTE0 = (comp, options) => {
	  debug('replaceGTE0', comp, options);
	  return comp
	    .trim()
	    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
	};

	// This function is passed to string.replace(re[t.HYPHENRANGE])
	// M, m, patch, prerelease, build
	// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
	// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
	// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
	// TODO build?
	const hyphenReplace = incPr => ($0,
	  from, fM, fm, fp, fpr, fb,
	  to, tM, tm, tp, tpr) => {
	  if (isX(fM)) {
	    from = '';
	  } else if (isX(fm)) {
	    from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
	  } else if (isX(fp)) {
	    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
	  } else if (fpr) {
	    from = `>=${from}`;
	  } else {
	    from = `>=${from}${incPr ? '-0' : ''}`;
	  }

	  if (isX(tM)) {
	    to = '';
	  } else if (isX(tm)) {
	    to = `<${+tM + 1}.0.0-0`;
	  } else if (isX(tp)) {
	    to = `<${tM}.${+tm + 1}.0-0`;
	  } else if (tpr) {
	    to = `<=${tM}.${tm}.${tp}-${tpr}`;
	  } else if (incPr) {
	    to = `<${tM}.${tm}.${+tp + 1}-0`;
	  } else {
	    to = `<=${to}`;
	  }

	  return `${from} ${to}`.trim()
	};

	const testSet = (set, version, options) => {
	  for (let i = 0; i < set.length; i++) {
	    if (!set[i].test(version)) {
	      return false
	    }
	  }

	  if (version.prerelease.length && !options.includePrerelease) {
	    // Find the set of versions that are allowed to have prereleases
	    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
	    // That should allow `1.2.3-pr.2` to pass.
	    // However, `1.2.4-alpha.notready` should NOT be allowed,
	    // even though it's within the range set by the comparators.
	    for (let i = 0; i < set.length; i++) {
	      debug(set[i].semver);
	      if (set[i].semver === Comparator.ANY) {
	        continue
	      }

	      if (set[i].semver.prerelease.length > 0) {
	        const allowed = set[i].semver;
	        if (allowed.major === version.major &&
	            allowed.minor === version.minor &&
	            allowed.patch === version.patch) {
	          return true
	        }
	      }
	    }

	    // Version has a -pre, but it's not one of the ones we like.
	    return false
	  }

	  return true
	};
	return range;
}

var comparator;
var hasRequiredComparator;

function requireComparator () {
	if (hasRequiredComparator) return comparator;
	hasRequiredComparator = 1;

	const ANY = Symbol('SemVer ANY');
	// hoisted class for cyclic dependency
	class Comparator {
	  static get ANY () {
	    return ANY
	  }

	  constructor (comp, options) {
	    options = parseOptions(options);

	    if (comp instanceof Comparator) {
	      if (comp.loose === !!options.loose) {
	        return comp
	      } else {
	        comp = comp.value;
	      }
	    }

	    comp = comp.trim().split(/\s+/).join(' ');
	    debug('comparator', comp, options);
	    this.options = options;
	    this.loose = !!options.loose;
	    this.parse(comp);

	    if (this.semver === ANY) {
	      this.value = '';
	    } else {
	      this.value = this.operator + this.semver.version;
	    }

	    debug('comp', this);
	  }

	  parse (comp) {
	    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
	    const m = comp.match(r);

	    if (!m) {
	      throw new TypeError(`Invalid comparator: ${comp}`)
	    }

	    this.operator = m[1] !== undefined ? m[1] : '';
	    if (this.operator === '=') {
	      this.operator = '';
	    }

	    // if it literally is just '>' or '' then allow anything.
	    if (!m[2]) {
	      this.semver = ANY;
	    } else {
	      this.semver = new SemVer(m[2], this.options.loose);
	    }
	  }

	  toString () {
	    return this.value
	  }

	  test (version) {
	    debug('Comparator.test', version, this.options.loose);

	    if (this.semver === ANY || version === ANY) {
	      return true
	    }

	    if (typeof version === 'string') {
	      try {
	        version = new SemVer(version, this.options);
	      } catch (er) {
	        return false
	      }
	    }

	    return cmp(version, this.operator, this.semver, this.options)
	  }

	  intersects (comp, options) {
	    if (!(comp instanceof Comparator)) {
	      throw new TypeError('a Comparator is required')
	    }

	    if (this.operator === '') {
	      if (this.value === '') {
	        return true
	      }
	      return new Range(comp.value, options).test(this.value)
	    } else if (comp.operator === '') {
	      if (comp.value === '') {
	        return true
	      }
	      return new Range(this.value, options).test(comp.semver)
	    }

	    options = parseOptions(options);

	    // Special cases where nothing can possibly be lower
	    if (options.includePrerelease &&
	      (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
	      return false
	    }
	    if (!options.includePrerelease &&
	      (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
	      return false
	    }

	    // Same direction increasing (> or >=)
	    if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
	      return true
	    }
	    // Same direction decreasing (< or <=)
	    if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
	      return true
	    }
	    // same SemVer and both sides are inclusive (<= or >=)
	    if (
	      (this.semver.version === comp.semver.version) &&
	      this.operator.includes('=') && comp.operator.includes('=')) {
	      return true
	    }
	    // opposite directions less than
	    if (cmp(this.semver, '<', comp.semver, options) &&
	      this.operator.startsWith('>') && comp.operator.startsWith('<')) {
	      return true
	    }
	    // opposite directions greater than
	    if (cmp(this.semver, '>', comp.semver, options) &&
	      this.operator.startsWith('<') && comp.operator.startsWith('>')) {
	      return true
	    }
	    return false
	  }
	}

	comparator = Comparator;

	const parseOptions = requireParseOptions();
	const { safeRe: re, t } = requireRe();
	const cmp = requireCmp();
	const debug = requireDebug();
	const SemVer = requireSemver$1();
	const Range = requireRange();
	return comparator;
}

var satisfies_1;
var hasRequiredSatisfies;

function requireSatisfies () {
	if (hasRequiredSatisfies) return satisfies_1;
	hasRequiredSatisfies = 1;

	const Range = requireRange();
	const satisfies = (version, range, options) => {
	  try {
	    range = new Range(range, options);
	  } catch (er) {
	    return false
	  }
	  return range.test(version)
	};
	satisfies_1 = satisfies;
	return satisfies_1;
}

var toComparators_1;
var hasRequiredToComparators;

function requireToComparators () {
	if (hasRequiredToComparators) return toComparators_1;
	hasRequiredToComparators = 1;

	const Range = requireRange();

	// Mostly just for testing and legacy API reasons
	const toComparators = (range, options) =>
	  new Range(range, options).set
	    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '));

	toComparators_1 = toComparators;
	return toComparators_1;
}

var maxSatisfying_1;
var hasRequiredMaxSatisfying;

function requireMaxSatisfying () {
	if (hasRequiredMaxSatisfying) return maxSatisfying_1;
	hasRequiredMaxSatisfying = 1;

	const SemVer = requireSemver$1();
	const Range = requireRange();

	const maxSatisfying = (versions, range, options) => {
	  let max = null;
	  let maxSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      // satisfies(v, range, options)
	      if (!max || maxSV.compare(v) === -1) {
	        // compare(max, v, true)
	        max = v;
	        maxSV = new SemVer(max, options);
	      }
	    }
	  });
	  return max
	};
	maxSatisfying_1 = maxSatisfying;
	return maxSatisfying_1;
}

var minSatisfying_1;
var hasRequiredMinSatisfying;

function requireMinSatisfying () {
	if (hasRequiredMinSatisfying) return minSatisfying_1;
	hasRequiredMinSatisfying = 1;

	const SemVer = requireSemver$1();
	const Range = requireRange();
	const minSatisfying = (versions, range, options) => {
	  let min = null;
	  let minSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      // satisfies(v, range, options)
	      if (!min || minSV.compare(v) === 1) {
	        // compare(min, v, true)
	        min = v;
	        minSV = new SemVer(min, options);
	      }
	    }
	  });
	  return min
	};
	minSatisfying_1 = minSatisfying;
	return minSatisfying_1;
}

var minVersion_1;
var hasRequiredMinVersion;

function requireMinVersion () {
	if (hasRequiredMinVersion) return minVersion_1;
	hasRequiredMinVersion = 1;

	const SemVer = requireSemver$1();
	const Range = requireRange();
	const gt = requireGt();

	const minVersion = (range, loose) => {
	  range = new Range(range, loose);

	  let minver = new SemVer('0.0.0');
	  if (range.test(minver)) {
	    return minver
	  }

	  minver = new SemVer('0.0.0-0');
	  if (range.test(minver)) {
	    return minver
	  }

	  minver = null;
	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];

	    let setMin = null;
	    comparators.forEach((comparator) => {
	      // Clone to avoid manipulating the comparator's semver object.
	      const compver = new SemVer(comparator.semver.version);
	      switch (comparator.operator) {
	        case '>':
	          if (compver.prerelease.length === 0) {
	            compver.patch++;
	          } else {
	            compver.prerelease.push(0);
	          }
	          compver.raw = compver.format();
	          /* fallthrough */
	        case '':
	        case '>=':
	          if (!setMin || gt(compver, setMin)) {
	            setMin = compver;
	          }
	          break
	        case '<':
	        case '<=':
	          /* Ignore maximum versions */
	          break
	        /* istanbul ignore next */
	        default:
	          throw new Error(`Unexpected operation: ${comparator.operator}`)
	      }
	    });
	    if (setMin && (!minver || gt(minver, setMin))) {
	      minver = setMin;
	    }
	  }

	  if (minver && range.test(minver)) {
	    return minver
	  }

	  return null
	};
	minVersion_1 = minVersion;
	return minVersion_1;
}

var valid;
var hasRequiredValid;

function requireValid () {
	if (hasRequiredValid) return valid;
	hasRequiredValid = 1;

	const Range = requireRange();
	const validRange = (range, options) => {
	  try {
	    // Return '*' instead of '' so that truthiness works.
	    // This will throw if it's invalid anyway
	    return new Range(range, options).range || '*'
	  } catch (er) {
	    return null
	  }
	};
	valid = validRange;
	return valid;
}

var outside_1;
var hasRequiredOutside;

function requireOutside () {
	if (hasRequiredOutside) return outside_1;
	hasRequiredOutside = 1;

	const SemVer = requireSemver$1();
	const Comparator = requireComparator();
	const { ANY } = Comparator;
	const Range = requireRange();
	const satisfies = requireSatisfies();
	const gt = requireGt();
	const lt = requireLt();
	const lte = requireLte();
	const gte = requireGte();

	const outside = (version, range, hilo, options) => {
	  version = new SemVer(version, options);
	  range = new Range(range, options);

	  let gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
	    case '>':
	      gtfn = gt;
	      ltefn = lte;
	      ltfn = lt;
	      comp = '>';
	      ecomp = '>=';
	      break
	    case '<':
	      gtfn = lt;
	      ltefn = gte;
	      ltfn = gt;
	      comp = '<';
	      ecomp = '<=';
	      break
	    default:
	      throw new TypeError('Must provide a hilo val of "<" or ">"')
	  }

	  // If it satisfies the range it is not outside
	  if (satisfies(version, range, options)) {
	    return false
	  }

	  // From now on, variable terms are as if we're in "gtr" mode.
	  // but note that everything is flipped for the "ltr" function.

	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];

	    let high = null;
	    let low = null;

	    comparators.forEach((comparator) => {
	      if (comparator.semver === ANY) {
	        comparator = new Comparator('>=0.0.0');
	      }
	      high = high || comparator;
	      low = low || comparator;
	      if (gtfn(comparator.semver, high.semver, options)) {
	        high = comparator;
	      } else if (ltfn(comparator.semver, low.semver, options)) {
	        low = comparator;
	      }
	    });

	    // If the edge version comparator has a operator then our version
	    // isn't outside it
	    if (high.operator === comp || high.operator === ecomp) {
	      return false
	    }

	    // If the lowest version comparator has an operator and our version
	    // is less than it then it isn't higher than the range
	    if ((!low.operator || low.operator === comp) &&
	        ltefn(version, low.semver)) {
	      return false
	    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
	      return false
	    }
	  }
	  return true
	};

	outside_1 = outside;
	return outside_1;
}

var gtr_1;
var hasRequiredGtr;

function requireGtr () {
	if (hasRequiredGtr) return gtr_1;
	hasRequiredGtr = 1;

	// Determine if version is greater than all the versions possible in the range.
	const outside = requireOutside();
	const gtr = (version, range, options) => outside(version, range, '>', options);
	gtr_1 = gtr;
	return gtr_1;
}

var ltr_1;
var hasRequiredLtr;

function requireLtr () {
	if (hasRequiredLtr) return ltr_1;
	hasRequiredLtr = 1;

	const outside = requireOutside();
	// Determine if version is less than all the versions possible in the range
	const ltr = (version, range, options) => outside(version, range, '<', options);
	ltr_1 = ltr;
	return ltr_1;
}

var intersects_1;
var hasRequiredIntersects;

function requireIntersects () {
	if (hasRequiredIntersects) return intersects_1;
	hasRequiredIntersects = 1;

	const Range = requireRange();
	const intersects = (r1, r2, options) => {
	  r1 = new Range(r1, options);
	  r2 = new Range(r2, options);
	  return r1.intersects(r2, options)
	};
	intersects_1 = intersects;
	return intersects_1;
}

var simplify;
var hasRequiredSimplify;

function requireSimplify () {
	if (hasRequiredSimplify) return simplify;
	hasRequiredSimplify = 1;

	// given a set of versions and a range, create a "simplified" range
	// that includes the same versions that the original range does
	// If the original range is shorter than the simplified one, return that.
	const satisfies = requireSatisfies();
	const compare = requireCompare();
	simplify = (versions, range, options) => {
	  const set = [];
	  let first = null;
	  let prev = null;
	  const v = versions.sort((a, b) => compare(a, b, options));
	  for (const version of v) {
	    const included = satisfies(version, range, options);
	    if (included) {
	      prev = version;
	      if (!first) {
	        first = version;
	      }
	    } else {
	      if (prev) {
	        set.push([first, prev]);
	      }
	      prev = null;
	      first = null;
	    }
	  }
	  if (first) {
	    set.push([first, null]);
	  }

	  const ranges = [];
	  for (const [min, max] of set) {
	    if (min === max) {
	      ranges.push(min);
	    } else if (!max && min === v[0]) {
	      ranges.push('*');
	    } else if (!max) {
	      ranges.push(`>=${min}`);
	    } else if (min === v[0]) {
	      ranges.push(`<=${max}`);
	    } else {
	      ranges.push(`${min} - ${max}`);
	    }
	  }
	  const simplified = ranges.join(' || ');
	  const original = typeof range.raw === 'string' ? range.raw : String(range);
	  return simplified.length < original.length ? simplified : range
	};
	return simplify;
}

var subset_1;
var hasRequiredSubset;

function requireSubset () {
	if (hasRequiredSubset) return subset_1;
	hasRequiredSubset = 1;

	const Range = requireRange();
	const Comparator = requireComparator();
	const { ANY } = Comparator;
	const satisfies = requireSatisfies();
	const compare = requireCompare();

	// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
	// - Every simple range `r1, r2, ...` is a null set, OR
	// - Every simple range `r1, r2, ...` which is not a null set is a subset of
	//   some `R1, R2, ...`
	//
	// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
	// - If c is only the ANY comparator
	//   - If C is only the ANY comparator, return true
	//   - Else if in prerelease mode, return false
	//   - else replace c with `[>=0.0.0]`
	// - If C is only the ANY comparator
	//   - if in prerelease mode, return true
	//   - else replace C with `[>=0.0.0]`
	// - Let EQ be the set of = comparators in c
	// - If EQ is more than one, return true (null set)
	// - Let GT be the highest > or >= comparator in c
	// - Let LT be the lowest < or <= comparator in c
	// - If GT and LT, and GT.semver > LT.semver, return true (null set)
	// - If any C is a = range, and GT or LT are set, return false
	// - If EQ
	//   - If GT, and EQ does not satisfy GT, return true (null set)
	//   - If LT, and EQ does not satisfy LT, return true (null set)
	//   - If EQ satisfies every C, return true
	//   - Else return false
	// - If GT
	//   - If GT.semver is lower than any > or >= comp in C, return false
	//   - If GT is >=, and GT.semver does not satisfy every C, return false
	//   - If GT.semver has a prerelease, and not in prerelease mode
	//     - If no C has a prerelease and the GT.semver tuple, return false
	// - If LT
	//   - If LT.semver is greater than any < or <= comp in C, return false
	//   - If LT is <=, and LT.semver does not satisfy every C, return false
	//   - If GT.semver has a prerelease, and not in prerelease mode
	//     - If no C has a prerelease and the LT.semver tuple, return false
	// - Else return true

	const subset = (sub, dom, options = {}) => {
	  if (sub === dom) {
	    return true
	  }

	  sub = new Range(sub, options);
	  dom = new Range(dom, options);
	  let sawNonNull = false;

	  OUTER: for (const simpleSub of sub.set) {
	    for (const simpleDom of dom.set) {
	      const isSub = simpleSubset(simpleSub, simpleDom, options);
	      sawNonNull = sawNonNull || isSub !== null;
	      if (isSub) {
	        continue OUTER
	      }
	    }
	    // the null set is a subset of everything, but null simple ranges in
	    // a complex range should be ignored.  so if we saw a non-null range,
	    // then we know this isn't a subset, but if EVERY simple range was null,
	    // then it is a subset.
	    if (sawNonNull) {
	      return false
	    }
	  }
	  return true
	};

	const minimumVersionWithPreRelease = [new Comparator('>=0.0.0-0')];
	const minimumVersion = [new Comparator('>=0.0.0')];

	const simpleSubset = (sub, dom, options) => {
	  if (sub === dom) {
	    return true
	  }

	  if (sub.length === 1 && sub[0].semver === ANY) {
	    if (dom.length === 1 && dom[0].semver === ANY) {
	      return true
	    } else if (options.includePrerelease) {
	      sub = minimumVersionWithPreRelease;
	    } else {
	      sub = minimumVersion;
	    }
	  }

	  if (dom.length === 1 && dom[0].semver === ANY) {
	    if (options.includePrerelease) {
	      return true
	    } else {
	      dom = minimumVersion;
	    }
	  }

	  const eqSet = new Set();
	  let gt, lt;
	  for (const c of sub) {
	    if (c.operator === '>' || c.operator === '>=') {
	      gt = higherGT(gt, c, options);
	    } else if (c.operator === '<' || c.operator === '<=') {
	      lt = lowerLT(lt, c, options);
	    } else {
	      eqSet.add(c.semver);
	    }
	  }

	  if (eqSet.size > 1) {
	    return null
	  }

	  let gtltComp;
	  if (gt && lt) {
	    gtltComp = compare(gt.semver, lt.semver, options);
	    if (gtltComp > 0) {
	      return null
	    } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
	      return null
	    }
	  }

	  // will iterate one or zero times
	  for (const eq of eqSet) {
	    if (gt && !satisfies(eq, String(gt), options)) {
	      return null
	    }

	    if (lt && !satisfies(eq, String(lt), options)) {
	      return null
	    }

	    for (const c of dom) {
	      if (!satisfies(eq, String(c), options)) {
	        return false
	      }
	    }

	    return true
	  }

	  let higher, lower;
	  let hasDomLT, hasDomGT;
	  // if the subset has a prerelease, we need a comparator in the superset
	  // with the same tuple and a prerelease, or it's not a subset
	  let needDomLTPre = lt &&
	    !options.includePrerelease &&
	    lt.semver.prerelease.length ? lt.semver : false;
	  let needDomGTPre = gt &&
	    !options.includePrerelease &&
	    gt.semver.prerelease.length ? gt.semver : false;
	  // exception: <1.2.3-0 is the same as <1.2.3
	  if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
	      lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
	    needDomLTPre = false;
	  }

	  for (const c of dom) {
	    hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
	    hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';
	    if (gt) {
	      if (needDomGTPre) {
	        if (c.semver.prerelease && c.semver.prerelease.length &&
	            c.semver.major === needDomGTPre.major &&
	            c.semver.minor === needDomGTPre.minor &&
	            c.semver.patch === needDomGTPre.patch) {
	          needDomGTPre = false;
	        }
	      }
	      if (c.operator === '>' || c.operator === '>=') {
	        higher = higherGT(gt, c, options);
	        if (higher === c && higher !== gt) {
	          return false
	        }
	      } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) {
	        return false
	      }
	    }
	    if (lt) {
	      if (needDomLTPre) {
	        if (c.semver.prerelease && c.semver.prerelease.length &&
	            c.semver.major === needDomLTPre.major &&
	            c.semver.minor === needDomLTPre.minor &&
	            c.semver.patch === needDomLTPre.patch) {
	          needDomLTPre = false;
	        }
	      }
	      if (c.operator === '<' || c.operator === '<=') {
	        lower = lowerLT(lt, c, options);
	        if (lower === c && lower !== lt) {
	          return false
	        }
	      } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) {
	        return false
	      }
	    }
	    if (!c.operator && (lt || gt) && gtltComp !== 0) {
	      return false
	    }
	  }

	  // if there was a < or >, and nothing in the dom, then must be false
	  // UNLESS it was limited by another range in the other direction.
	  // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
	  if (gt && hasDomLT && !lt && gtltComp !== 0) {
	    return false
	  }

	  if (lt && hasDomGT && !gt && gtltComp !== 0) {
	    return false
	  }

	  // we needed a prerelease range in a specific tuple, but didn't get one
	  // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
	  // because it includes prereleases in the 1.2.3 tuple
	  if (needDomGTPre || needDomLTPre) {
	    return false
	  }

	  return true
	};

	// >=1.2.3 is lower than >1.2.3
	const higherGT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare(a.semver, b.semver, options);
	  return comp > 0 ? a
	    : comp < 0 ? b
	    : b.operator === '>' && a.operator === '>=' ? b
	    : a
	};

	// <=1.2.3 is higher than <1.2.3
	const lowerLT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare(a.semver, b.semver, options);
	  return comp < 0 ? a
	    : comp > 0 ? b
	    : b.operator === '<' && a.operator === '<=' ? b
	    : a
	};

	subset_1 = subset;
	return subset_1;
}

var semver$1;
var hasRequiredSemver;

function requireSemver () {
	if (hasRequiredSemver) return semver$1;
	hasRequiredSemver = 1;

	// just pre-load all the stuff that index.js lazily exports
	const internalRe = requireRe();
	const constants = requireConstants$1();
	const SemVer = requireSemver$1();
	const identifiers = requireIdentifiers();
	const parse = requireParse$1();
	const valid = requireValid$1();
	const clean = requireClean();
	const inc = requireInc();
	const diff = requireDiff();
	const major = requireMajor();
	const minor = requireMinor();
	const patch = requirePatch();
	const prerelease = requirePrerelease();
	const compare = requireCompare();
	const rcompare = requireRcompare();
	const compareLoose = requireCompareLoose();
	const compareBuild = requireCompareBuild();
	const sort = requireSort();
	const rsort = requireRsort();
	const gt = requireGt();
	const lt = requireLt();
	const eq = requireEq();
	const neq = requireNeq();
	const gte = requireGte();
	const lte = requireLte();
	const cmp = requireCmp();
	const coerce = requireCoerce();
	const Comparator = requireComparator();
	const Range = requireRange();
	const satisfies = requireSatisfies();
	const toComparators = requireToComparators();
	const maxSatisfying = requireMaxSatisfying();
	const minSatisfying = requireMinSatisfying();
	const minVersion = requireMinVersion();
	const validRange = requireValid();
	const outside = requireOutside();
	const gtr = requireGtr();
	const ltr = requireLtr();
	const intersects = requireIntersects();
	const simplifyRange = requireSimplify();
	const subset = requireSubset();
	semver$1 = {
	  parse,
	  valid,
	  clean,
	  inc,
	  diff,
	  major,
	  minor,
	  patch,
	  prerelease,
	  compare,
	  rcompare,
	  compareLoose,
	  compareBuild,
	  sort,
	  rsort,
	  gt,
	  lt,
	  eq,
	  neq,
	  gte,
	  lte,
	  cmp,
	  coerce,
	  Comparator,
	  Range,
	  satisfies,
	  toComparators,
	  maxSatisfying,
	  minSatisfying,
	  minVersion,
	  validRange,
	  outside,
	  gtr,
	  ltr,
	  intersects,
	  simplifyRange,
	  subset,
	  SemVer,
	  re: internalRe.re,
	  src: internalRe.src,
	  tokens: internalRe.t,
	  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
	  RELEASE_TYPES: constants.RELEASE_TYPES,
	  compareIdentifiers: identifiers.compareIdentifiers,
	  rcompareIdentifiers: identifiers.rcompareIdentifiers,
	};
	return semver$1;
}

var semverExports = requireSemver();
const semver = /*@__PURE__*/getDefaultExportFromCjs$1(semverExports);

var DeviceModelId;
(function (DeviceModelId) {
    /** Ledger Blue */
    DeviceModelId["blue"] = "blue";
    /** Ledger Nano S */
    DeviceModelId["nanoS"] = "nanoS";
    /** Ledger Nano S Plus */
    DeviceModelId["nanoSP"] = "nanoSP";
    /** Ledger Nano X */
    DeviceModelId["nanoX"] = "nanoX";
    /** Ledger Stax */
    DeviceModelId["stax"] = "stax";
    /** Ledger Flex ("europa" is the internal name) */
    DeviceModelId["europa"] = "europa";
    /** Apex */
    DeviceModelId["apex"] = "apex";
})(DeviceModelId || (DeviceModelId = {}));
const devices = {
    [DeviceModelId.blue]: {
        id: DeviceModelId.blue,
        productName: "Ledger Blue",
        productIdMM: 0x00,
        legacyUsbProductId: 0x0000,
        usbOnly: true,
        memorySize: 480 * 1024,
        masks: [0x31000000, 0x31010000],
        getBlockSize: (_firwareVersion) => 4 * 1024,
    },
    [DeviceModelId.nanoS]: {
        id: DeviceModelId.nanoS,
        productName: "Ledger Nano S",
        productIdMM: 0x10,
        legacyUsbProductId: 0x0001,
        usbOnly: true,
        memorySize: 320 * 1024,
        masks: [0x31100000],
        getBlockSize: (firmwareVersion) => semver.lt(semver.coerce(firmwareVersion) ?? "", "2.0.0") ? 4 * 1024 : 2 * 1024,
    },
    [DeviceModelId.nanoX]: {
        id: DeviceModelId.nanoX,
        productName: "Ledger Nano X",
        productIdMM: 0x40,
        legacyUsbProductId: 0x0004,
        usbOnly: false,
        memorySize: 2 * 1024 * 1024,
        masks: [0x33000000],
        getBlockSize: (_firwareVersion) => 4 * 1024,
        bluetoothSpec: [
            {
                serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
                notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
                writeUuid: "13d63400-2c97-0004-0002-4c6564676572",
                writeCmdUuid: "13d63400-2c97-0004-0003-4c6564676572",
            },
        ],
    },
    [DeviceModelId.nanoSP]: {
        id: DeviceModelId.nanoSP,
        productName: "Ledger Nano S Plus",
        productIdMM: 0x50,
        legacyUsbProductId: 0x0005,
        usbOnly: true,
        memorySize: 1533 * 1024,
        masks: [0x33100000],
        getBlockSize: (_firmwareVersion) => 32,
    },
    [DeviceModelId.apex]: {
        id: DeviceModelId.apex,
        productName: "Ledger Apex",
        productIdMM: 0x80,
        legacyUsbProductId: 0x0008,
        usbOnly: false,
        memorySize: 1533 * 1024,
        masks: [0x33400000],
        getBlockSize: (_firmwareVersion) => 32,
        bluetoothSpec: [
            /**
             * 13D63400-2C97-6004-0001-4C6564676572, 13D63400-2C97-6004-0002-4C6564676572, and 13D63400-2C97-6004-0003-4C6564676572 Characteristics for Service 13D63400-2C97-6004-0000-4C6564676572
             */
            {
                serviceUuid: "13d63400-2c97-6004-0000-4c6564676572", // WILL CHANGE, for now same as Stax
                notifyUuid: "13d63400-2c97-6004-0001-4c6564676572", // WILL CHANGE, for now same as Stax
                writeUuid: "13d63400-2c97-6004-0002-4c6564676572", // WILL CHANGE, for now same as Stax
                writeCmdUuid: "13d63400-2c97-6004-0003-4c6564676572", // WILL CHANGE, for now same as Stax
            },
        ],
    },
    [DeviceModelId.stax]: {
        id: DeviceModelId.stax,
        productName: "Ledger Stax",
        productIdMM: 0x60,
        legacyUsbProductId: 0x0006,
        usbOnly: false,
        memorySize: 1533 * 1024,
        masks: [0x33200000],
        getBlockSize: (_firmwareVersion) => 32,
        bluetoothSpec: [
            {
                serviceUuid: "13d63400-2c97-6004-0000-4c6564676572",
                notifyUuid: "13d63400-2c97-6004-0001-4c6564676572",
                writeUuid: "13d63400-2c97-6004-0002-4c6564676572",
                writeCmdUuid: "13d63400-2c97-6004-0003-4c6564676572",
            },
        ],
    },
    [DeviceModelId.europa]: {
        id: DeviceModelId.europa,
        productName: "Ledger Flex",
        productIdMM: 0x70,
        legacyUsbProductId: 0x0007,
        usbOnly: false,
        memorySize: 1533 * 1024,
        masks: [0x33300000],
        getBlockSize: (_firmwareVersion) => 32,
        bluetoothSpec: [
            {
                serviceUuid: "13d63400-2c97-3004-0000-4c6564676572",
                notifyUuid: "13d63400-2c97-3004-0001-4c6564676572",
                writeUuid: "13d63400-2c97-3004-0002-4c6564676572",
                writeCmdUuid: "13d63400-2c97-3004-0003-4c6564676572",
            },
        ],
    },
};
({
    Blue: DeviceModelId.blue,
    "Nano S": DeviceModelId.nanoS,
    "Nano S Plus": DeviceModelId.nanoSP,
    "Nano X": DeviceModelId.nanoX,
    Stax: DeviceModelId.stax,
    Europa: DeviceModelId.europa,
});
const devicesList = Object.values(devices);
/**
 *
 */
const ledgerUSBVendorId = 0x2c97;
/**
 * From a given USB product id, return the deviceModel associated to it.
 *
 * The mapping from the product id is only based on the 2 most significant bytes.
 * For example, Stax is defined with a product id of 0x60ii, a product id 0x6011 would be mapped to it.
 */
const identifyUSBProductId = (usbProductId) => {
    const legacy = devicesList.find(d => d.legacyUsbProductId === usbProductId);
    if (legacy)
        return legacy;
    const mm = usbProductId >> 8;
    const deviceModel = devicesList.find(d => d.productIdMM === mm);
    return deviceModel;
};
const bluetoothServices = [];
const serviceUuidToInfos = {};
for (const id in devices) {
    const deviceModel = devices[id];
    const { bluetoothSpec } = deviceModel;
    if (bluetoothSpec) {
        for (let i = 0; i < bluetoothSpec.length; i++) {
            const spec = bluetoothSpec[i];
            bluetoothServices.push(spec.serviceUuid);
            serviceUuidToInfos[spec.serviceUuid] = serviceUuidToInfos[spec.serviceUuid.replace(/-/g, "")] = {
                deviceModel,
                ...spec,
            };
        }
    }
}
/**
 *
 */
const getBluetoothServiceUuids = () => bluetoothServices;
/**
 *
 */
const getInfosForServiceUuid = (uuid) => serviceUuidToInfos[uuid.toLowerCase()];

const ledgerDevices$1 = [
    {
        vendorId: ledgerUSBVendorId,
    },
];
async function requestLedgerDevice() {
    const device = await navigator.usb.requestDevice({
        filters: ledgerDevices$1,
    });
    return device;
}
async function getLedgerDevices$1() {
    const devices = await navigator.usb.getDevices();
    return devices.filter(d => d.vendorId === ledgerUSBVendorId);
}
async function getFirstLedgerDevice$1() {
    const existingDevices = await getLedgerDevices$1();
    if (existingDevices.length > 0)
        return existingDevices[0];
    return requestLedgerDevice();
}
const isSupported$1 = () => Promise.resolve(!!navigator && !!navigator.usb && typeof navigator.usb.getDevices === "function");

const configurationValue = 1;
const endpointNumber = 3;
/**
 * WebUSB Transport implementation
 * @example
 * import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
 * ...
 * TransportWebUSB.create().then(transport => ...)
 */
class TransportWebUSB extends Transport {
    device;
    deviceModel;
    channel = Math.floor(Math.random() * 0xffff);
    packetSize = 64;
    interfaceNumber;
    constructor(device, interfaceNumber) {
        super();
        this.device = device;
        this.interfaceNumber = interfaceNumber;
        this.deviceModel = identifyUSBProductId(device.productId);
    }
    /**
     * Check if WebUSB transport is supported.
     */
    static isSupported = isSupported$1;
    /**
     * List the WebUSB devices that was previously authorized by the user.
     */
    static list = getLedgerDevices$1;
    /**
     * Actively listen to WebUSB devices and emit ONE device
     * that was either accepted before, if not it will trigger the native permission UI.
     *
     * Important: it must be called in the context of a UI click!
     */
    static listen = (observer) => {
        let unsubscribed = false;
        getFirstLedgerDevice$1().then(device => {
            if (!unsubscribed) {
                const deviceModel = identifyUSBProductId(device.productId);
                observer.next({
                    type: "add",
                    descriptor: device,
                    deviceModel,
                });
                observer.complete();
            }
        }, error => {
            if (window.DOMException && error instanceof window.DOMException && error.code === 18) {
                observer.error(new TransportWebUSBGestureRequired(error.message));
            }
            else {
                observer.error(new TransportOpenUserCancelled(error.message));
            }
        });
        function unsubscribe() {
            unsubscribed = true;
        }
        return {
            unsubscribe,
        };
    };
    /**
     * Similar to create() except it will always display the device permission (even if some devices are already accepted).
     */
    static async request() {
        const device = await requestLedgerDevice();
        return TransportWebUSB.open(device);
    }
    /**
     * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
     */
    static async openConnected() {
        const devices = await getLedgerDevices$1();
        if (devices.length === 0)
            return null;
        return TransportWebUSB.open(devices[0]);
    }
    /**
     * Create a Ledger transport with a USBDevice
     */
    static async open(device) {
        await device.open();
        if (device.configuration === null) {
            await device.selectConfiguration(configurationValue);
        }
        await gracefullyResetDevice(device);
        const iface = device.configurations[0].interfaces.find(({ alternates }) => alternates.some(a => a.interfaceClass === 255));
        if (!iface) {
            throw new TransportInterfaceNotAvailable("No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.");
        }
        const interfaceNumber = iface.interfaceNumber;
        try {
            await device.claimInterface(interfaceNumber);
        }
        catch (e) {
            await device.close();
            throw new TransportInterfaceNotAvailable(e.message);
        }
        const transport = new TransportWebUSB(device, interfaceNumber);
        const onDisconnect = e => {
            if (device === e.device) {
                // $FlowFixMe
                navigator.usb.removeEventListener("disconnect", onDisconnect);
                transport._emitDisconnect(new DisconnectedDevice());
            }
        };
        // $FlowFixMe
        navigator.usb.addEventListener("disconnect", onDisconnect);
        return transport;
    }
    _disconnectEmitted = false;
    _emitDisconnect = (e) => {
        if (this._disconnectEmitted)
            return;
        this._disconnectEmitted = true;
        this.emit("disconnect", e);
    };
    /**
     * Release the transport device
     */
    async close() {
        await this.exchangeBusyPromise;
        await this.device.releaseInterface(this.interfaceNumber);
        await gracefullyResetDevice(this.device);
        await this.device.close();
    }
    /**
     * Exchange with the device using APDU protocol.
     * @param apdu
     * @returns a promise of apdu response
     */
    async exchange(apdu) {
        const b = await this.exchangeAtomicImpl(async () => {
            const { channel, packetSize } = this;
            log("apdu", "=> " + apdu.toString("hex"));
            const framing = createHIDframing(channel, packetSize);
            // Write...
            const blocks = framing.makeBlocks(apdu);
            for (let i = 0; i < blocks.length; i++) {
                await this.device.transferOut(endpointNumber, blocks[i]);
            }
            // Read...
            let result;
            let acc;
            while (!(result = framing.getReducedResult(acc))) {
                const r = await this.device.transferIn(endpointNumber, packetSize);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const buffer = Buffer$1.from(r.data.buffer);
                acc = framing.reduceResponse(acc, buffer);
            }
            log("apdu", "<= " + result.toString("hex"));
            return result;
        }).catch(e => {
            if (e && e.message && e.message.includes("disconnected")) {
                this._emitDisconnect(e);
                throw new DisconnectedDeviceDuringOperation(e.message);
            }
            throw e;
        });
        return b;
    }
    setScrambleKey() { }
}
async function gracefullyResetDevice(device) {
    try {
        await device.reset();
    }
    catch (err) {
        console.warn(err);
    }
}

const ledgerDevices = [
    {
        vendorId: ledgerUSBVendorId,
    },
];
const isSupported = () => Promise.resolve(!!(window.navigator && window.navigator.hid));
const getHID = () => {
    // $FlowFixMe
    const { hid } = navigator;
    if (!hid)
        throw new TransportError("navigator.hid is not supported", "HIDNotSupported");
    return hid;
};
async function requestLedgerDevices() {
    const device = await getHID().requestDevice({
        filters: ledgerDevices,
    });
    if (Array.isArray(device))
        return device;
    return [device];
}
async function getLedgerDevices() {
    const devices = await getHID().getDevices();
    return devices.filter(d => d.vendorId === ledgerUSBVendorId);
}
async function getFirstLedgerDevice() {
    const existingDevices = await getLedgerDevices();
    if (existingDevices.length > 0)
        return existingDevices[0];
    const devices = await requestLedgerDevices();
    return devices[0];
}
/**
 * WebHID Transport implementation
 * @example
 * import TransportWebHID from "@ledgerhq/hw-transport-webhid";
 * ...
 * TransportWebHID.create().then(transport => ...)
 */
class TransportWebHID extends Transport {
    device;
    deviceModel;
    channel = Math.floor(Math.random() * 0xffff);
    packetSize = 64;
    constructor(device) {
        super();
        this.device = device;
        this.deviceModel =
            typeof device.productId === "number" ? identifyUSBProductId(device.productId) : undefined;
        device.addEventListener("inputreport", this.onInputReport);
    }
    inputs = [];
    inputCallback;
    read = () => {
        if (this.inputs.length) {
            return Promise.resolve(this.inputs.shift());
        }
        return new Promise(success => {
            this.inputCallback = success;
        });
    };
    onInputReport = (e) => {
        const buffer = Buffer$1.from(e.data.buffer);
        if (this.inputCallback) {
            this.inputCallback(buffer);
            this.inputCallback = null;
        }
        else {
            this.inputs.push(buffer);
        }
    };
    /**
     * Check if WebUSB transport is supported.
     */
    static isSupported = isSupported;
    /**
     * List the WebUSB devices that was previously authorized by the user.
     */
    static list = getLedgerDevices;
    /**
     * Actively listen to WebUSB devices and emit ONE device
     * that was either accepted before, if not it will trigger the native permission UI.
     *
     * Important: it must be called in the context of a UI click!
     */
    static listen = (observer) => {
        let unsubscribed = false;
        getFirstLedgerDevice().then(device => {
            if (!device) {
                observer.error(new TransportOpenUserCancelled("Access denied to use Ledger device"));
            }
            else if (!unsubscribed) {
                const deviceModel = typeof device.productId === "number"
                    ? identifyUSBProductId(device.productId)
                    : undefined;
                observer.next({
                    type: "add",
                    descriptor: device,
                    deviceModel,
                });
                observer.complete();
            }
        }, error => {
            observer.error(new TransportOpenUserCancelled(error.message));
        });
        function unsubscribe() {
            unsubscribed = true;
        }
        return {
            unsubscribe,
        };
    };
    /**
     * Similar to create() except it will always display the device permission (even if some devices are already accepted).
     */
    static async request() {
        const [device] = await requestLedgerDevices();
        return TransportWebHID.open(device);
    }
    /**
     * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
     */
    static async openConnected() {
        const devices = await getLedgerDevices();
        if (devices.length === 0)
            return null;
        return TransportWebHID.open(devices[0]);
    }
    /**
     * Create a Ledger transport with a HIDDevice
     */
    static async open(device) {
        await device.open();
        const transport = new TransportWebHID(device);
        const onDisconnect = e => {
            if (device === e.device) {
                getHID().removeEventListener("disconnect", onDisconnect);
                transport._emitDisconnect(new DisconnectedDevice());
            }
        };
        getHID().addEventListener("disconnect", onDisconnect);
        return transport;
    }
    _disconnectEmitted = false;
    _emitDisconnect = (e) => {
        if (this._disconnectEmitted)
            return;
        this._disconnectEmitted = true;
        this.emit("disconnect", e);
    };
    /**
     * Release the transport device
     */
    async close() {
        await this.exchangeBusyPromise;
        this.device.removeEventListener("inputreport", this.onInputReport);
        await this.device.close();
    }
    /**
     * Exchange with the device using APDU protocol.
     * @param apdu
     * @returns a promise of apdu response
     */
    exchange = async (apdu) => {
        const b = await this.exchangeAtomicImpl(async () => {
            const { channel, packetSize } = this;
            log("apdu", "=> " + apdu.toString("hex"));
            const framing = createHIDframing(channel, packetSize);
            // Write...
            const blocks = framing.makeBlocks(apdu);
            for (let i = 0; i < blocks.length; i++) {
                await this.device.sendReport(0, blocks[i]);
            }
            // Read...
            let result;
            let acc;
            while (!(result = framing.getReducedResult(acc))) {
                try {
                    const buffer = await this.read();
                    acc = framing.reduceResponse(acc, buffer);
                }
                catch (e) {
                    if (e instanceof TransportError && e.id === "InvalidChannel") {
                        // this can happen if the device is connected
                        // on a different channel (like another app)
                        // in this case we just filter out the event
                        continue;
                    }
                    throw e;
                }
            }
            log("apdu", "<= " + result.toString("hex"));
            return result;
        }).catch(e => {
            if (e && e.message && e.message.includes("write")) {
                this._emitDisconnect(e);
                throw new DisconnectedDeviceDuringOperation(e.message);
            }
            throw e;
        });
        return b;
    };
    setScrambleKey() { }
}

function isFunction(value) {
    return typeof value === 'function';
}

function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}

var UnsubscriptionError = createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});

function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}

var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if (isFunction(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && arrRemove(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}

var config = {
    Promise: undefined};

var timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function (handle) {
        return (clearTimeout)(handle);
    },
    delegate: undefined,
};

function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function () {
        {
            throw err;
        }
    });
}

function noop() { }

function errorContext(cb) {
    {
        cb();
    }
}

var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) ;
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription));
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if (isFunction(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));
function handleUnhandledError(error) {
    {
        reportUnhandledError(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
};

var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

function identity(x) {
    return x;
}

function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}

var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
        errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
}

function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}

function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(Subscriber));

var ObjectUnsubscribedError = createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});

var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        errorContext(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                if (!_this.currentObservers) {
                    _this.currentObservers = Array.from(_this.observers);
                }
                try {
                    for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var observer = _c.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
            return EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new Subscription(function () {
            _this.currentObservers = null;
            arrRemove(observers, subscriber);
        });
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable));
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));

var dateTimestampProvider = {
    now: function () {
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};

var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) { _bufferSize = Infinity; }
        if (_windowTime === void 0) { _windowTime = Infinity; }
        if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider; }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
            _buffer.push(value);
            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
            subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
    };
    ReplaySubject.prototype._trimBuffer = function () {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
            var now = _timestampProvider.now();
            var last = 0;
            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                last = i;
            }
            last && _buffer.splice(0, last + 1);
        }
    };
    return ReplaySubject;
}(Subject));

var EMPTY = new Observable(function (subscriber) { return subscriber.complete(); });

function isScheduler(value) {
    return value && isFunction(value.schedule);
}

function last(arr) {
    return arr[arr.length - 1];
}
function popScheduler(args) {
    return isScheduler(last(args)) ? args.pop() : undefined;
}
function popNumber(args, defaultValue) {
    return typeof last(args) === 'number' ? args.pop() : defaultValue;
}

var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

function isInteropObservable(input) {
    return isFunction(input[observable]);
}

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}

function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();

function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

function innerFrom(input) {
    if (input instanceof Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
    return new Observable(function (subscriber) {
        var obs = obj[observable]();
        if (isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}

function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}

function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}

function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}

function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

function scheduleArray(input, scheduler) {
    return new Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}

function scheduleIterable(input, scheduler) {
    return new Observable(function (subscriber) {
        var iterator$1;
        executeSchedule(subscriber, scheduler, function () {
            iterator$1 = input[iterator]();
            executeSchedule(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator$1.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return(); };
    });
}

function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable(function (subscriber) {
        executeSchedule(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            executeSchedule(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}

function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}

function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable(input)) {
            return scheduleObservable(input, scheduler);
        }
        if (isArrayLike(input)) {
            return scheduleArray(input, scheduler);
        }
        if (isPromise(input)) {
            return schedulePromise(input, scheduler);
        }
        if (isAsyncIterable(input)) {
            return scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable(input)) {
            return scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike(input)) {
            return scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw createInvalidObservableTypeError(input);
}

function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}

var EmptyError = createErrorClass(function (_super) {
    return function EmptyErrorImpl() {
        _super(this);
        this.name = 'EmptyError';
        this.message = 'no elements in sequence';
    };
});

function firstValueFrom(source, config) {
    return new Promise(function (resolve, reject) {
        var subscriber = new SafeSubscriber({
            next: function (value) {
                resolve(value);
                subscriber.unsubscribe();
            },
            error: reject,
            complete: function () {
                {
                    reject(new EmptyError());
                }
            },
        });
        source.subscribe(subscriber);
    });
}

function map(project, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}

function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        active++;
        var innerComplete = false;
        innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function (innerValue) {
            {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        if (innerSubScheduler) ;
                        else {
                            doInnerSub(bufferedValue);
                        }
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe(createOperatorSubscriber(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
    };
}

function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction(resultSelector)) {
        return mergeMap(function (a, i) { return map(function (b, ii) { return resultSelector(a, b, i, ii); })(innerFrom(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return operate(function (source, subscriber) { return mergeInternals(source, subscriber, project, concurrent); });
}

function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return mergeMap(identity, concurrent);
}

function defer(observableFactory) {
    return new Observable(function (subscriber) {
        innerFrom(observableFactory()).subscribe(subscriber);
    });
}

function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var concurrent = popNumber(args, Infinity);
    var sources = args;
    return !sources.length
        ?
            EMPTY
        : sources.length === 1
            ?
                innerFrom(sources[0])
            :
                mergeAll(concurrent)(from(sources, scheduler));
}

function filter(predicate, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}

function defaultIfEmpty(defaultValue) {
    return operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () {
            if (!hasValue) {
                subscriber.next(defaultValue);
            }
            subscriber.complete();
        }));
    });
}

function take(count) {
    return count <= 0
        ?
            function () { return EMPTY; }
        : operate(function (source, subscriber) {
            var seen = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                if (++seen <= count) {
                    subscriber.next(value);
                    if (count <= seen) {
                        subscriber.complete();
                    }
                }
            }));
        });
}

function ignoreElements() {
    return operate(function (source, subscriber) {
        source.subscribe(createOperatorSubscriber(subscriber, noop));
    });
}

function throwIfEmpty(errorFactory) {
    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
    return operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () { return (hasValue ? subscriber.complete() : subscriber.error(errorFactory())); }));
    });
}
function defaultErrorFactory() {
    return new EmptyError();
}

function first(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); }));
    };
}

function share(options) {
    if (options === void 0) { options = {}; }
    var _a = options.connector, connector = _a === void 0 ? function () { return new Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function (wrapperSource) {
        var connection;
        var resetConnection;
        var subject;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function () {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = undefined;
        };
        var reset = function () {
            cancelReset();
            connection = subject = undefined;
            hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function () {
            var conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return operate(function (source, subscriber) {
            refCount++;
            if (!hasErrored && !hasCompleted) {
                cancelReset();
            }
            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
            subscriber.add(function () {
                refCount--;
                if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                }
            });
            dest.subscribe(subscriber);
            if (!connection &&
                refCount > 0) {
                connection = new SafeSubscriber({
                    next: function (value) { return dest.next(value); },
                    error: function (err) {
                        hasErrored = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnError, err);
                        dest.error(err);
                    },
                    complete: function () {
                        hasCompleted = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnComplete);
                        dest.complete();
                    },
                });
                innerFrom(source).subscribe(connection);
            }
        })(wrapperSource);
    };
}
function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (on === true) {
        reset();
        return;
    }
    if (on === false) {
        return;
    }
    var onSubscriber = new SafeSubscriber({
        next: function () {
            onSubscriber.unsubscribe();
            reset();
        },
    });
    return innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
}

function takeUntil(notifier) {
    return operate(function (source, subscriber) {
        innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function () { return subscriber.complete(); }, noop));
        !subscriber.closed && source.subscribe(subscriber);
    });
}

function tap(observerOrNext, error, complete) {
    var tapObserver = isFunction(observerOrNext) || error || complete
        ?
            { next: observerOrNext, error: error, complete: complete }
        : observerOrNext;
    return tapObserver
        ? operate(function (source, subscriber) {
            var _a;
            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
            var isUnsub = true;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var _a;
                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                subscriber.next(value);
            }, function () {
                var _a;
                isUnsub = false;
                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                subscriber.complete();
            }, function (err) {
                var _a;
                isUnsub = false;
                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                subscriber.error(err);
            }, function () {
                var _a, _b;
                if (isUnsub) {
                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                }
                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
            }));
        })
        :
            identity;
}

const TagId$1 = 0x05;
/**
 * Creates a list of chunked buffer from one buffer
 *
 * If this is using a Node buffer: the chunked buffers reference to the same memory as the original buffer.
 * If this is using a Uint8Array: each part of the original buffer is copied into the chunked buffers
 *
 * @param buffer a Node Buffer, or a Uint8Array
 * @param sizeForIndex A function that takes an index (on the buffer) and returns the size of the chunk at that index
 * @returns a list of chunked buffers
 */
function createChunkedBuffers(buffer, sizeForIndex) {
    const chunks = [];
    for (let i = 0, size = sizeForIndex(0); i < buffer.length; i += size, size = sizeForIndex(i)) {
        // If this is a Node buffer: this chunked buffer points to the same memory but with cropped starting and ending indices
        // `slice` and not `subarray`: this might not be a Node Buffer, but probably only a Uint8Array.
        chunks.push(buffer.slice(i, i + size));
    }
    return chunks;
}
/**
 * Sends an APDU by encoding it into chunks and sending the chunks using the given `write` function
 *
 * @param write The function to send each chunk to the device
 * @param apdu
 * @param mtuSize The negotiated maximum size of the data to be sent in one chunk
 * @param options Optional options containing:
 *   - context An optional context object for log/tracing strategy
 * @returns An observable that will only emit if an error occurred, otherwise it will complete
 */
const sendAPDU = (write, apdu, mtuSize, { context } = {}) => {
    // Prepares the data to be sent in chunks, by adding a header to chunked of the APDU
    // The first chunk will contain the total length of the APDU, which reduces the size of the data written in the first chunk.
    // The total length of the APDU is encoded in 2 bytes (so 5 bytes for the header with the tag id and the chunk index).
    const chunks = createChunkedBuffers(apdu, i => mtuSize - (i === 0 ? 5 : 3)).map((buffer, i) => {
        const head = Buffer$1.alloc(i === 0 ? 5 : 3);
        head.writeUInt8(TagId$1, 0);
        // Index of the chunk as the 2 next bytes
        head.writeUInt16BE(i, 1);
        // The total length of the APDU is written on the first chunk
        if (i === 0) {
            head.writeUInt16BE(apdu.length, 3);
        }
        // No 0-padding is needed
        return Buffer$1.concat([head, buffer]);
    });
    return new Observable(o => {
        let terminated = false;
        async function main() {
            for (const chunk of chunks) {
                if (terminated)
                    return;
                await write(chunk);
            }
        }
        main().then(() => {
            terminated = true;
            o.complete();
        }, error => {
            terminated = true;
            trace({
                type: "ble-error",
                message: `sendAPDU failure: ${error}`,
                data: { error },
                context,
            });
            o.error(error);
        });
        const unsubscribe = () => {
            if (!terminated) {
                trace({
                    type: "ble-error",
                    message: "sendAPDU interruption",
                    context,
                });
                terminated = true;
            }
        };
        return unsubscribe;
    });
};

const TagId = 0x05;
/**
 * Parses a raw stream coming from a BLE communication into an APDU response
 *
 * @param rawStream An observable containing the raw stream as emitted buffers
 * @param options Optional options containing:
 *   - context An optional context object for log/tracing strategy
 * @returns An observable containing the APDU response as one emitted buffer
 */
const receiveAPDU = (rawStream, { context } = {}) => new Observable(o => {
    let notifiedIndex = 0;
    let notifiedDataLength = 0;
    let notifiedData = Buffer$1.alloc(0);
    const subscriptionCleaner = new ReplaySubject();
    // The raw stream is listened/subscribed to until a full message (that can be made of several frames) is received
    rawStream.pipe(takeUntil(subscriptionCleaner)).subscribe({
        complete: () => {
            o.error(new DisconnectedDevice());
        },
        error: error => {
            trace({
                type: "ble-error",
                message: `Error in receiveAPDU: ${error}`,
                data: { error },
                context,
            });
            o.error(error);
        },
        next: value => {
            // Silences emitted errors in next
            if (value instanceof Error) {
                trace({
                    type: "ble-error",
                    message: `Error emitted to receiveAPDU next: ${value}`,
                    data: { error: value },
                    context,
                });
                return;
            }
            const tag = value.readUInt8(0);
            const chunkIndex = value.readUInt16BE(1);
            // `slice` and not `subarray`: this is not a Node Buffer, but probably only a Uint8Array.
            let chunkData = value.slice(3);
            if (tag !== TagId) {
                o.error(new TransportError("Invalid tag " + tag.toString(16), "InvalidTag"));
                return;
            }
            // A chunk was probably missed
            if (notifiedIndex !== chunkIndex) {
                o.error(new TransportError(`BLE: Invalid sequence number. discontinued chunk. Received ${chunkIndex} but expected ${notifiedIndex}`, "InvalidSequence"));
                return;
            }
            // The total length of the response is located on the next 2 bytes on the 1st chunk
            if (chunkIndex === 0) {
                notifiedDataLength = chunkData.readUInt16BE(0);
                // `slice` and not `subarray`: this is not a Node Buffer, but probably only a Uint8Array.
                chunkData = chunkData.slice(2);
            }
            notifiedIndex++;
            // The cost of creating a new buffer for each received chunk is low because the response is often contained in 1 chunk.
            // Allocating `notifiedData` buffer with the received total length and mutating it will probably not improve any performance.
            notifiedData = Buffer$1.concat([notifiedData, chunkData]);
            if (notifiedData.length > notifiedDataLength) {
                o.error(new TransportError(`BLE: received too much data. discontinued chunk. Received ${notifiedData.length} but expected ${notifiedDataLength}`, "BLETooMuchData"));
                return;
            }
            if (notifiedData.length === notifiedDataLength) {
                o.next(notifiedData);
                o.complete();
                // Tries to unsubscribe from the raw stream as soon as we complete the parent observer
                subscriptionCleaner.next();
            }
        },
    });
    return () => {
        subscriptionCleaner.next();
    };
});

const monitorCharacteristic = (characteristic) => Observable.create(o => {
    log("ble-verbose", "start monitor " + characteristic.uuid);
    function onCharacteristicValueChanged(event) {
        const characteristic = event.target;
        if (characteristic.value) {
            o.next(Buffer$1.from(characteristic.value.buffer));
        }
    }
    characteristic.startNotifications().then(() => {
        characteristic.addEventListener("characteristicvaluechanged", onCharacteristicValueChanged);
    });
    return () => {
        log("ble-verbose", "end monitor " + characteristic.uuid);
        characteristic.stopNotifications();
    };
});

const requiresBluetooth = () => {
    // $FlowFixMe
    const { bluetooth } = navigator;
    if (typeof bluetooth === "undefined") {
        throw new Error("web bluetooth not supported");
    }
    return bluetooth;
};
const availability = () => Observable.create(observer => {
    const bluetooth = requiresBluetooth();
    const onAvailabilityChanged = e => {
        observer.next(e.value);
    };
    bluetooth.addEventListener("availabilitychanged", onAvailabilityChanged);
    let unsubscribed = false;
    bluetooth.getAvailability().then(available => {
        if (!unsubscribed) {
            observer.next(available);
        }
    });
    return () => {
        unsubscribed = true;
        bluetooth.removeEventListener("availabilitychanged", onAvailabilityChanged);
    };
});
const transportsCache = {};
const requestDeviceParam = () => ({
    filters: getBluetoothServiceUuids().map(uuid => ({
        services: [uuid],
    })),
});
const retrieveService = async (device) => {
    if (!device.gatt)
        throw new Error("bluetooth gatt not found");
    const [service] = await device.gatt.getPrimaryServices();
    if (!service)
        throw new Error("bluetooth service not found");
    const infos = getInfosForServiceUuid(service.uuid);
    if (!infos)
        throw new Error("bluetooth service infos not found");
    return [service, infos];
};
async function open(deviceOrId, needsReconnect) {
    let device;
    if (typeof deviceOrId === "string") {
        if (transportsCache[deviceOrId]) {
            log("ble-verbose", "Transport in cache, using that.");
            return transportsCache[deviceOrId];
        }
        const bluetooth = requiresBluetooth();
        // TODO instead we should "query" the device by its ID
        device = await bluetooth.requestDevice(requestDeviceParam());
    }
    else {
        device = deviceOrId;
    }
    if (!device.gatt.connected) {
        log("ble-verbose", "not connected. connecting...");
        await device.gatt.connect();
    }
    const [service, infos] = await retrieveService(device);
    const { deviceModel, writeUuid, notifyUuid } = infos;
    const [writeC, notifyC] = await Promise.all([
        service.getCharacteristic(writeUuid),
        service.getCharacteristic(notifyUuid),
    ]);
    const notifyObservable = monitorCharacteristic(notifyC).pipe(tap(value => {
        log("ble-frame", "<= " + value.toString("hex"));
    }), share());
    const notif = notifyObservable.subscribe();
    const transport = new BluetoothTransport(device, writeC, notifyObservable, deviceModel);
    if (!device.gatt.connected) {
        throw new DisconnectedDevice();
    }
    // eslint-disable-next-line require-atomic-updates
    transportsCache[transport.id] = transport;
    const onDisconnect = e => {
        console.log("onDisconnect!", e);
        delete transportsCache[transport.id];
        transport.notYetDisconnected = false;
        notif.unsubscribe();
        device.removeEventListener("gattserverdisconnected", onDisconnect);
        log("ble-verbose", `BleTransport(${transport.id}) disconnected`);
        transport.emit("disconnect", e);
    };
    device.addEventListener("gattserverdisconnected", onDisconnect);
    const beforeMTUTime = Date.now();
    try {
        await transport.inferMTU();
    }
    finally {
        const afterMTUTime = Date.now();
        // workaround for #279: we need to open() again if we come the first time here,
        // to make sure we do a disconnect() after the first pairing time
        // because of a firmware bug
        if (afterMTUTime - beforeMTUTime < 1000) {
            needsReconnect = false; // (optim) there is likely no new pairing done because mtu answer was fast.
        }
        if (needsReconnect) {
            await device.gatt.disconnect();
            // necessary time for the bonding workaround
            await new Promise(s => setTimeout(s, 4000));
        }
    }
    if (needsReconnect) {
        return open(device, false);
    }
    return transport;
}
/**
 * react-native bluetooth BLE implementation
 * @example
 * import BluetoothTransport from "@ledgerhq/hw-transport-web-ble";
 */
class BluetoothTransport extends Transport {
    static isSupported = () => Promise.resolve()
        .then(requiresBluetooth)
        .then(() => true, () => false);
    /**
     * observe event with { available: bool, type: string }
     * (available is generic, type is specific)
     * an event is emit once and then each time it changes
     */
    static observeAvailability = (observer) => availability().subscribe(observer);
    static list = () => Promise.resolve([]);
    /**
     * Scan for Ledger Bluetooth devices.
     * On this web implementation, it only emits ONE device, the one that was selected in the UI (if any).
     */
    static listen(observer) {
        log("ble-verbose", "listen...");
        let unsubscribed;
        const bluetooth = requiresBluetooth();
        bluetooth.requestDevice(requestDeviceParam()).then(device => {
            if (!unsubscribed) {
                observer.next({
                    type: "add",
                    descriptor: device,
                });
                observer.complete();
            }
        }, error => {
            observer.error(new TransportOpenUserCancelled(error.message));
        });
        function unsubscribe() {
            unsubscribed = true;
        }
        return {
            unsubscribe,
        };
    }
    /**
     * open a bluetooth device.
     */
    static async open(deviceOrId) {
        return open(deviceOrId, true);
    }
    /**
     * globally disconnect a bluetooth device by its id.
     */
    static disconnect = async (id) => {
        log("ble-verbose", `user disconnect(${id})`);
        const transport = transportsCache[id];
        if (transport) {
            transport.device.gatt.disconnect();
        }
    };
    id;
    device;
    mtuSize = 20;
    writeCharacteristic;
    notifyObservable;
    notYetDisconnected = true;
    deviceModel;
    constructor(device, writeCharacteristic, notifyObservable, deviceModel) {
        super();
        this.id = device.id;
        this.device = device;
        this.writeCharacteristic = writeCharacteristic;
        this.notifyObservable = notifyObservable;
        this.deviceModel = deviceModel;
        log("ble-verbose", `BleTransport(${String(this.id)}) new instance`);
    }
    async inferMTU() {
        let mtu = 23;
        await this.exchangeAtomicImpl(async () => {
            try {
                mtu =
                    (await firstValueFrom(merge(this.notifyObservable.pipe(first(buffer => buffer.readUInt8(0) === 0x08), map(buffer => buffer.readUInt8(5))), defer(() => from(this.write(Buffer$1.from([0x08, 0, 0, 0, 0])))).pipe(ignoreElements())))) + 3;
            }
            catch (e) {
                log("ble-error", "inferMTU got " + String(e));
                this.device.gatt.disconnect();
                throw e;
            }
        });
        if (mtu > 23) {
            const mtuSize = mtu - 3;
            log("ble-verbose", `BleTransport(${String(this.id)}) mtu set to ${String(mtuSize)}`);
            this.mtuSize = mtuSize;
        }
        return this.mtuSize;
    }
    /**
     * Exchange with the device using APDU protocol.
     * @param apdu
     * @returns a promise of apdu response
     */
    async exchange(apdu) {
        const b = await this.exchangeAtomicImpl(async () => {
            try {
                const msgIn = apdu.toString("hex");
                log("apdu", `=> ${msgIn}`);
                const data = await firstValueFrom(merge(this.notifyObservable.pipe(receiveAPDU), sendAPDU(this.write, apdu, this.mtuSize)));
                const msgOut = data.toString("hex");
                log("apdu", `<= ${msgOut}`);
                return data;
            }
            catch (e) {
                log("ble-error", "exchange got " + String(e));
                if (this.notYetDisconnected) {
                    // in such case we will always disconnect because something is bad.
                    this.device.gatt.disconnect();
                }
                throw e;
            }
        });
        return b;
    }
    setScrambleKey() { }
    write = async (buffer) => {
        log("ble-frame", "=> " + buffer.toString("hex"));
        await this.writeCharacteristic.writeValue(buffer);
    };
    async close() {
        if (this.exchangeBusyPromise) {
            await this.exchangeBusyPromise;
        }
    }
}

var Ada = {};

var errors = {};

var errorBase = {};

var hasRequiredErrorBase;

function requireErrorBase () {
	if (hasRequiredErrorBase) return errorBase;
	hasRequiredErrorBase = 1;
	Object.defineProperty(errorBase, "__esModule", { value: true });
	errorBase.ErrorBase = void 0;
	class ErrorBase extends Error {
	    constructor(message) {
	        super(message);
	        this.name = this.constructor.name;
	    }
	}
	errorBase.ErrorBase = ErrorBase;
	
	return errorBase;
}

var invalidData = {};

var hasRequiredInvalidData;

function requireInvalidData () {
	if (hasRequiredInvalidData) return invalidData;
	hasRequiredInvalidData = 1;
	Object.defineProperty(invalidData, "__esModule", { value: true });
	invalidData.InvalidData = void 0;
	const errorBase_1 = requireErrorBase();
	class InvalidData extends errorBase_1.ErrorBase {
	    constructor(reason) {
	        super(reason);
	    }
	}
	invalidData.InvalidData = InvalidData;
	
	return invalidData;
}

var deviceUnsupported = {};

var hasRequiredDeviceUnsupported;

function requireDeviceUnsupported () {
	if (hasRequiredDeviceUnsupported) return deviceUnsupported;
	hasRequiredDeviceUnsupported = 1;
	Object.defineProperty(deviceUnsupported, "__esModule", { value: true });
	deviceUnsupported.DeviceVersionUnsupported = void 0;
	const errorBase_1 = requireErrorBase();
	class DeviceVersionUnsupported extends errorBase_1.ErrorBase {
	}
	deviceUnsupported.DeviceVersionUnsupported = DeviceVersionUnsupported;
	
	return deviceUnsupported;
}

var deviceStatusError = {};

var hasRequiredDeviceStatusError;

function requireDeviceStatusError () {
	if (hasRequiredDeviceStatusError) return deviceStatusError;
	hasRequiredDeviceStatusError = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.DeviceStatusError = exports.DeviceStatusMessages = exports.DeviceStatusCodes = void 0;
		const errorBase_1 = requireErrorBase();
		exports.DeviceStatusCodes = {
		    ERR_STILL_IN_CALL: 0x6e04,
		    ERR_INVALID_DATA: 0x6e07,
		    ERR_INVALID_BIP_PATH: 0x6e08,
		    ERR_REJECTED_BY_USER: 0x6e09,
		    ERR_REJECTED_BY_POLICY: 0x6e10,
		    ERR_DEVICE_LOCKED: 0x6e11,
		    ERR_UNSUPPORTED_ADDRESS_TYPE: 0x6e12,
		    ERR_CLA_NOT_SUPPORTED: 0x6e00,
		};
		exports.DeviceStatusMessages = {
		    [exports.DeviceStatusCodes.ERR_INVALID_DATA]: 'Invalid data supplied to Ledger',
		    [exports.DeviceStatusCodes.ERR_INVALID_BIP_PATH]: 'Invalid derivation path supplied to Ledger',
		    [exports.DeviceStatusCodes.ERR_REJECTED_BY_USER]: 'Action rejected by user',
		    [exports.DeviceStatusCodes.ERR_REJECTED_BY_POLICY]: "Action rejected by Ledger's security policy",
		    [exports.DeviceStatusCodes.ERR_DEVICE_LOCKED]: 'Device is locked',
		    [exports.DeviceStatusCodes.ERR_CLA_NOT_SUPPORTED]: 'Wrong Ledger app',
		    [exports.DeviceStatusCodes.ERR_UNSUPPORTED_ADDRESS_TYPE]: 'Unsupported address type',
		};
		const GH_DEVICE_ERRORS_LINK = 'https://github.com/cardano-foundation/ledger-app-cardano/blob/master/src/errors.h';
		const getDeviceErrorDescription = (statusCode) => {
		    var _a;
		    const statusCodeHex = `0x${statusCode.toString(16)}`;
		    const defaultMsg = `General error ${statusCodeHex}. Please consult ${GH_DEVICE_ERRORS_LINK}`;
		    return (_a = exports.DeviceStatusMessages[statusCode]) !== null && _a !== void 0 ? _a : defaultMsg;
		};
		class DeviceStatusError extends errorBase_1.ErrorBase {
		    constructor(code) {
		        super(getDeviceErrorDescription(code));
		        this.code = code;
		    }
		}
		exports.DeviceStatusError = DeviceStatusError;
		
	} (deviceStatusError));
	return deviceStatusError;
}

var invalidDataReason = {};

var hasRequiredInvalidDataReason;

function requireInvalidDataReason () {
	if (hasRequiredInvalidDataReason) return invalidDataReason;
	hasRequiredInvalidDataReason = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.InvalidDataReason = void 0;
		(function (InvalidDataReason) {
		    InvalidDataReason["GET_EXT_PUB_KEY_PATHS_NOT_ARRAY"] = "ext pub key paths not an array";
		    InvalidDataReason["INVALID_PATH"] = "invalid path";
		    InvalidDataReason["NETWORK_INVALID_PROTOCOL_MAGIC"] = "invalid protocol magic";
		    InvalidDataReason["NETWORK_INVALID_NETWORK_ID"] = "invalid network id";
		    InvalidDataReason["NETWORK_ID_INCLUDE_INVALID"] = "invalid value for includeNetworkId";
		    InvalidDataReason["INPUTS_NOT_ARRAY"] = "inputs not an array";
		    InvalidDataReason["INPUT_INVALID_TX_HASH"] = "invalid tx hash in an input";
		    InvalidDataReason["INPUT_INVALID_PATH"] = "invalid input path";
		    InvalidDataReason["INPUT_INVALID_UTXO_INDEX"] = "invalid input utxo index";
		    InvalidDataReason["OUTPUTS_NOT_ARRAY"] = "outputs not an array";
		    InvalidDataReason["OUTPUT_INVALID_FORMAT"] = "invalid output format";
		    InvalidDataReason["OUTPUT_INVALID_AMOUNT"] = "invalid amount in an output";
		    InvalidDataReason["OUTPUT_INVALID_ADDRESS"] = "invalid address in an output";
		    InvalidDataReason["OUTPUT_INVALID_ADDRESS_PARAMS"] = "change address must have path as payment part";
		    InvalidDataReason["OUTPUT_INVALID_DATUM_HASH"] = "invalid datum hash";
		    InvalidDataReason["OUTPUT_INVALID_INLINE_DATUM"] = "invalid inline datum";
		    InvalidDataReason["OUTPUT_INVALID_REFERENCE_SCRIPT_HEX"] = "invalid script hex";
		    InvalidDataReason["OUTPUT_INCONSISTENT_DATUM"] = "datum is not consistent with output type";
		    InvalidDataReason["OUTPUT_INCONSISTENT_REFERENCE_SCRIPT"] = "reference script is not consistent with output type";
		    InvalidDataReason["MULTIASSET_INVALID_POLICY_NAME"] = "invalid policy id in a multiasset token bundle";
		    InvalidDataReason["MULTIASSET_INVALID_TOKEN_BUNDLE_NOT_ARRAY"] = "invalid multiasset token bundle - asset groups not an array";
		    InvalidDataReason["MULTIASSET_INVALID_TOKEN_BUNDLE_TOO_LARGE"] = "invalid multiasset token bundle - too many asset groups";
		    InvalidDataReason["MULTIASSET_INVALID_TOKEN_BUNDLE_ORDERING"] = "invalid multiasset token bundle - incorrect ordering of asset groups";
		    InvalidDataReason["MULTIASSET_INVALID_TOKEN_BUNDLE_NOT_UNIQUE"] = "invalid multiasset token bundle - policyIds not unique";
		    InvalidDataReason["MULTIASSET_INVALID_TOKEN_BUNDLE_EMPTY"] = "invalid multiasset token bundle - token bundle is not allowed to be empty";
		    InvalidDataReason["MULTIASSET_INVALID_TOKEN_AMOUNT"] = "invalid token amount in an asset group in a multiasset token bundle";
		    InvalidDataReason["MULTIASSET_INVALID_ASSET_NAME"] = "invalid asset name in an asset group in a multiasset token bundle";
		    InvalidDataReason["MULTIASSET_INVALID_ASSET_GROUP_NOT_ARRAY"] = "invalid asset group in multiasset token bundle - tokens not an array";
		    InvalidDataReason["MULTIASSET_INVALID_ASSET_GROUP_TOO_LARGE"] = "invalid asset group in multiasset token bundle - too many tokens";
		    InvalidDataReason["MULTIASSET_INVALID_ASSET_GROUP_EMPTY"] = "invalid asset group in multiasset token bundle - zero tokens";
		    InvalidDataReason["MULTIASSET_INVALID_ASSET_GROUP_ORDERING"] = "invalid asset group in multiasset token bundle - incorrect ordering of tokens";
		    InvalidDataReason["MULTIASSET_INVALID_ASSET_GROUP_NOT_UNIQUE"] = "invalid asset group in multiasset token bundle - token names not unique";
		    InvalidDataReason["ADDRESS_UNKNOWN_TYPE"] = "unknown address type";
		    InvalidDataReason["ADDRESS_INVALID_SPENDING_INFO"] = "invalid address spending information";
		    InvalidDataReason["ADDRESS_INVALID_SPENDING_KEY_PATH"] = "invalid address spending key path";
		    InvalidDataReason["ADDRESS_INVALID_SPENDING_SCRIPT_HASH"] = "invalid address spending script hash";
		    InvalidDataReason["ADDRESS_INVALID_BLOCKCHAIN_POINTER"] = "invalid address blockchain pointer";
		    InvalidDataReason["ADDRESS_INVALID_STAKING_KEY_PATH"] = "invalid address staking key path";
		    InvalidDataReason["ADDRESS_INVALID_STAKING_KEY_HASH"] = "invalid address staking key hash";
		    InvalidDataReason["ADDRESS_INVALID_STAKING_SCRIPT_HASH"] = "invalid address staking script hash";
		    InvalidDataReason["ADDRESS_INVALID_STAKING_INFO"] = "Invalid staking info in an output";
		    InvalidDataReason["ADDRESS_INVALID_REWARD_ADDRESS"] = "invalid reward address for this version of ledger";
		    InvalidDataReason["FEE_INVALID"] = "invalid fee";
		    InvalidDataReason["TTL_INVALID"] = "invalid ttl";
		    InvalidDataReason["CERTIFICATES_NOT_ARRAY"] = "certificates not an array";
		    InvalidDataReason["CERTIFICATE_INVALID_TYPE"] = "invalid certificate type";
		    InvalidDataReason["CERTIFICATE_INVALID_PATH"] = "one of the certificates contains an invalid path";
		    InvalidDataReason["CERTIFICATE_INVALID_STAKE_CREDENTIAL"] = "one of the certificates contains an invalid stake credential";
		    InvalidDataReason["CERTIFICATE_INVALID_COMMITTEE_CREDENTIAL"] = "one of the certificates contains invalid constitutional committee credential";
		    InvalidDataReason["CERTIFICATE_INVALID_DREP_CREDENTIAL"] = "one of the certificates contains an invalid DRep credential";
		    InvalidDataReason["CERTIFICATE_INVALID_POOL_KEY_HASH"] = "one of the certificates contains an invalid pool key hash";
		    InvalidDataReason["CERTIFICATE_SUPERFLUOUS_POOL_KEY_HASH"] = "superfluous pool key hash in a certificate";
		    InvalidDataReason["CERTIFICATE_INVALID_DEPOSIT"] = "one of the certificates contains an invalid deposit";
		    InvalidDataReason["CERTIFICATE_INVALID_DREP"] = "one of the certificates contains an invalid DRep";
		    InvalidDataReason["ANCHOR_INVALID_URL"] = "anchor with an invalid URL";
		    InvalidDataReason["ANCHOR_INVALID_HASH"] = "anchor with an invalid data hash";
		    InvalidDataReason["POOL_REGISTRATION_INVALID_VRF_KEY_HASH"] = "invalid vrf key hash in a pool registration certificate";
		    InvalidDataReason["POOL_REGISTRATION_INVALID_PLEDGE"] = "invalid pledge in a pool registration certificate";
		    InvalidDataReason["POOL_REGISTRATION_INVALID_COST"] = "invalid cost in a pool registration certificate";
		    InvalidDataReason["POOL_REGISTRATION_INVALID_MARGIN"] = "invalid margin in a pool registration certificate";
		    InvalidDataReason["POOL_REGISTRATION_INVALID_MARGIN_DENOMINATOR"] = "pool margin denominator must be a value between 1 and 10^15";
		    InvalidDataReason["POOL_REGISTRATION_OWNERS_TOO_MANY"] = "too many owners in a pool registration certificate";
		    InvalidDataReason["POOL_KEY_INVALID_TYPE"] = "invalid pool key type";
		    InvalidDataReason["POOL_KEY_INVALID_PATH"] = "invalid pool key path in a pool registration certificate";
		    InvalidDataReason["POOL_KEY_INVALID_KEY_HASH"] = "invalid pool key hash in a pool registration certificate";
		    InvalidDataReason["POOL_OWNER_INVALID_TYPE"] = "invalid owner type";
		    InvalidDataReason["POOL_OWNER_INVALID_PATH"] = "invalid owner path in a pool registration certificate";
		    InvalidDataReason["POOL_OWNER_INVALID_KEY_HASH"] = "invalid owner key hash in a pool registration certificate";
		    InvalidDataReason["POOL_REGISTRATION_RELAYS_TOO_MANY"] = "too many pool relays in a pool registration certificate";
		    InvalidDataReason["POOL_REWARD_ACCOUNT_INVALID_TYPE"] = "invalid pool reward account type";
		    InvalidDataReason["POOL_REWARD_ACCOUNT_INVALID_PATH"] = "invalid pool reward account key path in a pool registration certificate";
		    InvalidDataReason["POOL_REWARD_ACCOUNT_INVALID_HEX"] = "invalid pool reward account hex in a pool registration certificate";
		    InvalidDataReason["POOL_RETIREMENT_INVALID_RETIREMENT_EPOCH"] = "invalid pool retirement epoch";
		    InvalidDataReason["RELAY_INVALID_TYPE"] = "invalid type of a relay in a pool registration certificate";
		    InvalidDataReason["RELAY_INVALID_PORT"] = "invalid port in a relay in a pool registration certificate";
		    InvalidDataReason["RELAY_INVALID_IPV4"] = "invalid ipv4 in a relay in a pool registration certificate";
		    InvalidDataReason["RELAY_INVALID_IPV6"] = "invalid ipv6 in a relay in a pool registration certificate";
		    InvalidDataReason["RELAY_INVALID_DNS"] = "invalid dns record in a relay in a pool registration certificate";
		    InvalidDataReason["POOL_REGISTRATION_METADATA_INVALID_URL"] = "invalid metadata in a pool registration certificate= invalid url";
		    InvalidDataReason["POOL_REGISTRATION_METADATA_INVALID_HASH"] = "invalid metadata in a pool registration certificate= invalid hash";
		    InvalidDataReason["WITHDRAWALS_NOT_ARRAY"] = "withdrawals not an array";
		    InvalidDataReason["WITHDRAWAL_INVALID_AMOUNT"] = "invalid withdrawal amount";
		    InvalidDataReason["WITHDRAWAL_INVALID_PATH"] = "invalid withdrawal path";
		    InvalidDataReason["WITHDRAWAL_INVALID_STAKE_CREDENTIAL"] = "withdrawal stake credential contains both a path and a scripthash or neither";
		    InvalidDataReason["AUXILIARY_DATA_UNKNOWN_TYPE"] = "unknown auxiliary data type";
		    InvalidDataReason["AUXILIARY_DATA_INVALID_HASH"] = "invalid auxiliary data hash";
		    InvalidDataReason["METADATA_UNKNOWN_TYPE"] = "unknown metadata type";
		    InvalidDataReason["CVOTE_REGISTRATION_INCONSISTENT_WITH_CIP15"] = "CIP36 registration params inconsistent with CIP-15";
		    InvalidDataReason["CVOTE_REGISTRATION_INCONSISTENT_WITH_CIP36"] = "CIP36 registration params inconsistent with CIP-36";
		    InvalidDataReason["CVOTE_REGISTRATION_BOTH_KEY_AND_PATH"] = "CIP36 vote key given both as a key and as a derivation path";
		    InvalidDataReason["CVOTE_REGISTRATION_MISSING_VOTE_KEY"] = "CIP36 vote key missing";
		    InvalidDataReason["CVOTE_REGISTRATION_INVALID_VOTE_KEY"] = "invalid CIP36 registration vote key";
		    InvalidDataReason["CVOTE_REGISTRATION_INVALID_VOTE_KEY_PATH"] = "invalid CIP36 registration vote key path";
		    InvalidDataReason["CVOTE_REGISTRATION_INVALID_STAKING_KEY_PATH"] = "invalid CIP36 registration staking key path";
		    InvalidDataReason["CVOTE_REGISTRATION_INVALID_NONCE"] = "invalid CIP36 registration nonce";
		    InvalidDataReason["CVOTE_REGISTRATION_INVALID_VOTING_PURPOSE"] = "invalid CIP36 registration voting purpose";
		    InvalidDataReason["CVOTE_REGISTRATION_DELEGATIONS_NOT_ARRAY"] = "CIP36 registration delegations not an array";
		    InvalidDataReason["CVOTE_DELEGATION_UNKNOWN_FORMAT"] = "invalid CIP36 delegation format";
		    InvalidDataReason["CVOTE_DELEGATION_UNKNOWN_DELEGATION_TYPE"] = "invalid CIP36 delegation type";
		    InvalidDataReason["CVOTE_DELEGATION_INVALID_WEIGHT"] = "invalid CIP36 delegation weight";
		    InvalidDataReason["CVOTE_DELEGATION_INVALID_PATH"] = "invalid CIP36 delegation path";
		    InvalidDataReason["CVOTE_DELEGATION_INVALID_KEY"] = "invalid CIP36 delegation key";
		    InvalidDataReason["VALIDITY_INTERVAL_START_INVALID"] = "invalid validity interval start";
		    InvalidDataReason["SCRIPT_DATA_HASH_WRONG_LENGTH"] = "script data hash not 32 bytes long";
		    InvalidDataReason["COLLATERAL_INPUTS_NOT_ARRAY"] = "collateral inputs not an array";
		    InvalidDataReason["REQUIRED_SIGNERS_NOT_ARRAY"] = "required signers not an array";
		    InvalidDataReason["VKEY_HASH_WRONG_LENGTH"] = "vkey hash not 28 bytes long";
		    InvalidDataReason["UNKNOWN_REQUIRED_SIGNER_TYPE"] = "unknown required signer type";
		    InvalidDataReason["REQUIRED_SIGNER_INVALID_PATH"] = "invalid path for required signer";
		    InvalidDataReason["COLLATERAL_INPUT_CONTAINS_DATUM"] = "collateral return output contains datum";
		    InvalidDataReason["COLLATERAL_INPUT_CONTAINS_REFERENCE_SCRIPT"] = "collateral return output contains reference script";
		    InvalidDataReason["TOTAL_COLLATERAL_NOT_VALID"] = "total collateral not valid";
		    InvalidDataReason["REFERENCE_INPUTS_NOT_ARRAY"] = "reference inputs not an array";
		    InvalidDataReason["VOTING_PROCEDURES_NOT_ARRAY"] = "voting procedures not an array";
		    InvalidDataReason["VOTER_VOTES_NOT_ARRAY"] = "voter's votes not an array";
		    InvalidDataReason["VOTER_INVALID"] = "invalid voter in voting procedures";
		    InvalidDataReason["GOV_ACTION_ID_INVALID_TX_HASH"] = "invalid governance action id tx hash";
		    InvalidDataReason["GOV_ACTION_ID_INVALID_INDEX"] = "invalid governance action id index";
		    InvalidDataReason["VOTING_PROCEDURES_INVALID_NUMBER_OF_VOTERS"] = "there must be exactly 1 voter in voting procedures";
		    InvalidDataReason["VOTING_PROCEDURES_INVALID_NUMBER_OF_VOTES"] = "there must be exactly 1 voting procedure per voter";
		    InvalidDataReason["TREASURY_NOT_VALID"] = "treasury amount not valid";
		    InvalidDataReason["DONATION_NOT_VALID"] = "treasury donation not valid";
		    InvalidDataReason["SIGN_MODE_UNKNOWN"] = "unknown signing mode";
		    InvalidDataReason["SIGN_MODE_ORDINARY__POOL_REGISTRATION_NOT_ALLOWED"] = "pool registration not allowed in TransactionSigningMode.ORDINARY_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_ORDINARY__CERTIFICATE_STAKE_CREDENTIAL_ONLY_AS_PATH"] = "certificate stake credential must be given as a staking path in TransactionSigningMode.ORDINARY_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_ORDINARY__CERTIFICATE_COMMITTEE_COLD_CREDENTIAL_ONLY_AS_PATH"] = "certificate constitutional committee cold credential must be given as a path in TransactionSigningMode.ORDINARY_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_ORDINARY__CERTIFICATE_DREP_CREDENTIAL_ONLY_AS_PATH"] = "certificate DRep credential must be given as a path in TransactionSigningMode.ORDINARY_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_ORDINARY__WITHDRAWAL_ONLY_AS_PATH"] = "withdrawal must be given as a path in TransactionSigningMode.ORDINARY_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_ORDINARY__COLLATERAL_INPUTS_NOT_ALLOWED"] = "collateral inputs not allowed in TransactionSigningMode.ORDINARY_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_ORDINARY__COLLATERAL_OUTPUT_NOT_ALLOWED"] = "collateral output not allowed in TransactionSigningMode.ORDINARY_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_ORDINARY__TOTAL_COLLATERAL_NOT_ALLOWED"] = "total collateral not allowed in TransactionSigningMode.ORDINARY_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_ORDINARY__REFERENCE_INPUTS_NOT_ALLOWED"] = "reference inputs not allowed in TransactionSigningMode.ORDINARY_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_ORDINARY__VOTER_ONLY_AS_PATH"] = "voter credential in voting procedures must be given as a path in TransactionSigningMode.ORDINARY_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_MULTISIG__POOL_REGISTRATION_NOT_ALLOWED"] = "pool registration not allowed in TransactionSigningMode.MULTISIG_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_MULTISIG__POOL_RETIREMENT_NOT_ALLOWED"] = "pool retirement not allowed in TransactionSigningMode.MULTISIG_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_MULTISIG__DEVICE_OWNED_ADDRESS_NOT_ALLOWED"] = "outputs given by path not allowed in TransactionSigningMode.MULTISIG_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_MULTISIG__CERTIFICATE_CREDENTIAL_ONLY_AS_SCRIPT"] = "certificate credential must be a script hash in TransactionSigningMode.MULTISIG_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_MULTISIG__WITHDRAWAL_ONLY_AS_SCRIPT"] = "withdrawal must be a script hash in TransactionSigningMode.MULTISIG_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_MULTISIG__COLLATERAL_INPUTS_NOT_ALLOWED"] = "collateral inputs not allowed in TransactionSigningMode.MULTISIG_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_MULTISIG__COLLATERAL_OUTPUT_NOT_ALLOWED"] = "collateral output not allowed in TransactionSigningMode.MULTISIG_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_MULTISIG__TOTAL_COLLATERAL_NOT_ALLOWED"] = "total collateral not allowed in TransactionSigningMode.MULTISIG_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_MULTISIG__REFERENCE_INPUTS_NOT_ALLOWED"] = "reference inputs not allowed in TransactionSigningMode.MULTISIG_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_MULTISIG__VOTER_ONLY_AS_SCRIPT"] = "voter credential in voting procedures must be a script hash in TransactionSigningMode.MULTISIG_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__INPUT_WITH_PATH_NOT_ALLOWED"] = "inputs with path not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__DEVICE_OWNED_ADDRESS_NOT_ALLOWED"] = "outputs given by path are not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__DATUM_NOT_ALLOWED"] = "datum in outputs not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__REFERENCE_SCRIPT_NOT_ALLOWED"] = "reference script in outputs not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__SINGLE_POOL_REG_CERTIFICATE_REQUIRED"] = "single pool registration certificate is expected in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__THIRD_PARTY_POOL_KEY_REQUIRED"] = "third party pool key is required in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__SINGLE_DEVICE_OWNER_REQUIRED"] = "single device-owned pool owner is expected in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__WITHDRAWALS_NOT_ALLOWED"] = "withdrawals not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__MINT_NOT_ALLOWED"] = "mint not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__SCRIPT_DATA_HASH_NOT_ALLOWED"] = "script data hash not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__COLLATERAL_INPUTS_NOT_ALLOWED"] = "collateral inputs not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__COLLATERAL_OUTPUT_NOT_ALLOWED"] = "reference inputs not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__TOTAL_COLLATERAL_NOT_ALLOWED"] = "total collateral not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__REQUIRED_SIGNERS_NOT_ALLOWED"] = "required signers not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__REFERENCE_INPUTS_NOT_ALLOWED"] = "reference inputs not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__VOTING_PROCEDURES_NOT_ALLOWED"] = "voting procedures not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__TREASURY_NOT_ALLOWED"] = "treasury amount not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OWNER__DONATION_NOT_ALLOWED"] = "treasury donation not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OWNER";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__DATUM_NOT_ALLOWED"] = "datum in outputs not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__REFERENCE_SCRIPT_NOT_ALLOWED"] = "reference script in outputs not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__SINGLE_POOL_REG_CERTIFICATE_REQUIRED"] = "single pool registration certificate is expected in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__DEVICE_OWNED_POOL_KEY_REQUIRED"] = "device owned pool key is required in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__DEVICE_OWNED_POOL_OWNER_NOT_ALLOWED"] = "device-owned pool owner not expected in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__WITHDRAWALS_NOT_ALLOWED"] = "withdrawals not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__MINT_NOT_ALLOWED"] = "mint not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__SCRIPT_DATA_HASH_NOT_ALLOWED"] = "script data hash not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__COLLATERAL_INPUTS_NOT_ALLOWED"] = "collateral inputs not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__COLLATERAL_OUTPUT_NOT_ALLOWED"] = "collateral output not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__TOTAL_COLLATERAL_NOT_ALLOWED"] = "total collateral not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__REQUIRED_SIGNERS_NOT_ALLOWED"] = "required signers not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__REFERENCE_INPUTS_NOT_ALLOWED"] = "reference inputs not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__VOTING_PROCEDURES_NOT_ALLOWED"] = "voting procedures not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__TREASURY_NOT_ALLOWED"] = "treasury amount not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_POOL_OPERATOR__DONATION_NOT_ALLOWED"] = "treasury donation not allowed in TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR";
		    InvalidDataReason["SIGN_MODE_PLUTUS__DEVICE_OWNED_ADDRESS_NOT_ALLOWED"] = "outputs given by path not allowed in TransactionSigningMode.PLUTUS_TRANSACTION";
		    InvalidDataReason["SIGN_MODE_PLUTUS__POOL_REGISTRATION_NOT_ALLOWED"] = "pool registration not allowed in TransactionSigningMode.PLUTUS_TRANSACTION";
		    InvalidDataReason["ADDITIONAL_WITNESSES_NOT_ARRAY"] = "additional witnesses not an array";
		    InvalidDataReason["OPERATIONAL_CERTIFICATE_INVALID_KES_KEY"] = "invalid operational certificate kes key";
		    InvalidDataReason["OPERATIONAL_CERTIFICATE_INVALID_KES_PERIOD"] = "invalid operational certificate kes period";
		    InvalidDataReason["OPERATIONAL_CERTIFICATE_INVALID_ISSUE_COUNTER"] = "invalid operational certificate issue counter";
		    InvalidDataReason["OPERATIONAL_CERTIFICATE_INVALID_COLD_KEY_PATH"] = "invalid operational certificate cold key path";
		    InvalidDataReason["MESSAGE_DATA_INVALID_WITNESS_PATH"] = "CIP-8 message signing: invalid witness path";
		    InvalidDataReason["MESSAGE_DATA_INVALID_MESSAGE_HEX"] = "CIP-8 message signing: invalid message hex string";
		    InvalidDataReason["MESSAGE_DATA_LONG_NON_HASHED_MSG"] = "CIP-8 message signing: non-hashed message too long";
		    InvalidDataReason["CVOTE_INVALID_VOTECAST_DATA"] = "invalid votecast data for CIP36 vote";
		    InvalidDataReason["CVOTE_INVALID_WITNESS"] = "invalid witness for CIP36 vote";
		    InvalidDataReason["DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA"] = "invalid native script input";
		    InvalidDataReason["DERIVE_NATIVE_SCRIPT_HASH_INVALID_KEY_PATH"] = "invalid key path param";
		    InvalidDataReason["DERIVE_NATIVE_SCRIPT_HASH_INVALID_KEY_HASH"] = "invalid key hash param";
		    InvalidDataReason["DERIVE_NATIVE_SCRIPT_HASH_SCRIPTS_NOT_AN_ARRAY"] = "invalid scripts - scripts is not an array";
		    InvalidDataReason["DERIVE_NATIVE_SCRIPT_HASH_INVALID_REQUIRED_COUNT"] = "invalid required count";
		    InvalidDataReason["DERIVE_NATIVE_SCRIPT_HASH_INVALID_TOKEN_LOCKING_SLOT"] = "invalid token locking slot";
		    InvalidDataReason["DERIVE_NATIVE_SCRIPT_HASH_REQUIRED_COUNT_HIGHER_THAN_NUMBER_OF_SCRIPTS"] = "invalid required count - higher than number of total scripts";
		    InvalidDataReason["DERIVE_NATIVE_SCRIPT_HASH_UNKNOWN_TYPE"] = "unknown script type";
		    InvalidDataReason["DERIVE_NATIVE_SCRIPT_HASH_INVALID_DISPLAY_FORMAT"] = "invalid native script hash display format";
		    InvalidDataReason["LEDGER_POLICY"] = "Action rejected by Ledger's security policy";
		    InvalidDataReason["INVALID_DATA_SUPPLIED_TO_LEDGER"] = "Invalid data supplied to Ledger";
		    InvalidDataReason["INVALID_B2_HASH"] = "invalid blake2 hashing";
		})(exports.InvalidDataReason || (exports.InvalidDataReason = {}));
		
	} (invalidDataReason));
	return invalidDataReason;
}

var hasRequiredErrors;

function requireErrors () {
	if (hasRequiredErrors) return errors;
	hasRequiredErrors = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.InvalidDataReason = exports.DeviceStatusMessages = exports.DeviceStatusError = exports.DeviceStatusCodes = exports.DeviceVersionUnsupported = exports.InvalidData = exports.ErrorBase = void 0;
		var errorBase_1 = requireErrorBase();
		Object.defineProperty(exports, "ErrorBase", { enumerable: true, get: function () { return errorBase_1.ErrorBase; } });
		var invalidData_1 = requireInvalidData();
		Object.defineProperty(exports, "InvalidData", { enumerable: true, get: function () { return invalidData_1.InvalidData; } });
		var deviceUnsupported_1 = requireDeviceUnsupported();
		Object.defineProperty(exports, "DeviceVersionUnsupported", { enumerable: true, get: function () { return deviceUnsupported_1.DeviceVersionUnsupported; } });
		var deviceStatusError_1 = requireDeviceStatusError();
		Object.defineProperty(exports, "DeviceStatusCodes", { enumerable: true, get: function () { return deviceStatusError_1.DeviceStatusCodes; } });
		Object.defineProperty(exports, "DeviceStatusError", { enumerable: true, get: function () { return deviceStatusError_1.DeviceStatusError; } });
		Object.defineProperty(exports, "DeviceStatusMessages", { enumerable: true, get: function () { return deviceStatusError_1.DeviceStatusMessages; } });
		var invalidDataReason_1 = requireInvalidDataReason();
		Object.defineProperty(exports, "InvalidDataReason", { enumerable: true, get: function () { return invalidDataReason_1.InvalidDataReason; } });
		
	} (errors));
	return errors;
}

var deriveAddress = {};

var utils = {};

var address$1 = {};

var safeBuffer = {exports: {}};

var dist = {};

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	(function (exports) {

		Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

		var buffer = {};

		var base64Js = {};

		base64Js.byteLength = byteLength;
		base64Js.toByteArray = toByteArray;
		base64Js.fromByteArray = fromByteArray;

		var lookup = [];
		var revLookup = [];
		var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

		var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		for (var i = 0, len = code.length; i < len; ++i) {
		  lookup[i] = code[i];
		  revLookup[code.charCodeAt(i)] = i;
		}

		// Support decoding URL-safe base64 strings, as Node.js does.
		// See: https://en.wikipedia.org/wiki/Base64#URL_applications
		revLookup['-'.charCodeAt(0)] = 62;
		revLookup['_'.charCodeAt(0)] = 63;

		function getLens (b64) {
		  var len = b64.length;

		  if (len % 4 > 0) {
		    throw new Error('Invalid string. Length must be a multiple of 4')
		  }

		  // Trim off extra bytes after placeholder bytes are found
		  // See: https://github.com/beatgammit/base64-js/issues/42
		  var validLen = b64.indexOf('=');
		  if (validLen === -1) validLen = len;

		  var placeHoldersLen = validLen === len
		    ? 0
		    : 4 - (validLen % 4);

		  return [validLen, placeHoldersLen]
		}

		// base64 is 4/3 + up to two characters of the original data
		function byteLength (b64) {
		  var lens = getLens(b64);
		  var validLen = lens[0];
		  var placeHoldersLen = lens[1];
		  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
		}

		function _byteLength (b64, validLen, placeHoldersLen) {
		  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
		}

		function toByteArray (b64) {
		  var tmp;
		  var lens = getLens(b64);
		  var validLen = lens[0];
		  var placeHoldersLen = lens[1];

		  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

		  var curByte = 0;

		  // if there are placeholders, only get up to the last complete 4 chars
		  var len = placeHoldersLen > 0
		    ? validLen - 4
		    : validLen;

		  var i;
		  for (i = 0; i < len; i += 4) {
		    tmp =
		      (revLookup[b64.charCodeAt(i)] << 18) |
		      (revLookup[b64.charCodeAt(i + 1)] << 12) |
		      (revLookup[b64.charCodeAt(i + 2)] << 6) |
		      revLookup[b64.charCodeAt(i + 3)];
		    arr[curByte++] = (tmp >> 16) & 0xFF;
		    arr[curByte++] = (tmp >> 8) & 0xFF;
		    arr[curByte++] = tmp & 0xFF;
		  }

		  if (placeHoldersLen === 2) {
		    tmp =
		      (revLookup[b64.charCodeAt(i)] << 2) |
		      (revLookup[b64.charCodeAt(i + 1)] >> 4);
		    arr[curByte++] = tmp & 0xFF;
		  }

		  if (placeHoldersLen === 1) {
		    tmp =
		      (revLookup[b64.charCodeAt(i)] << 10) |
		      (revLookup[b64.charCodeAt(i + 1)] << 4) |
		      (revLookup[b64.charCodeAt(i + 2)] >> 2);
		    arr[curByte++] = (tmp >> 8) & 0xFF;
		    arr[curByte++] = tmp & 0xFF;
		  }

		  return arr
		}

		function tripletToBase64 (num) {
		  return lookup[num >> 18 & 0x3F] +
		    lookup[num >> 12 & 0x3F] +
		    lookup[num >> 6 & 0x3F] +
		    lookup[num & 0x3F]
		}

		function encodeChunk (uint8, start, end) {
		  var tmp;
		  var output = [];
		  for (var i = start; i < end; i += 3) {
		    tmp =
		      ((uint8[i] << 16) & 0xFF0000) +
		      ((uint8[i + 1] << 8) & 0xFF00) +
		      (uint8[i + 2] & 0xFF);
		    output.push(tripletToBase64(tmp));
		  }
		  return output.join('')
		}

		function fromByteArray (uint8) {
		  var tmp;
		  var len = uint8.length;
		  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
		  var parts = [];
		  var maxChunkLength = 16383; // must be multiple of 3

		  // go through the array every three bytes, we'll deal with trailing stuff later
		  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
		    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
		  }

		  // pad the end with zeros, but make sure to not forget the extra bytes
		  if (extraBytes === 1) {
		    tmp = uint8[len - 1];
		    parts.push(
		      lookup[tmp >> 2] +
		      lookup[(tmp << 4) & 0x3F] +
		      '=='
		    );
		  } else if (extraBytes === 2) {
		    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
		    parts.push(
		      lookup[tmp >> 10] +
		      lookup[(tmp >> 4) & 0x3F] +
		      lookup[(tmp << 2) & 0x3F] +
		      '='
		    );
		  }

		  return parts.join('')
		}

		var ieee754 = {};

		/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */

		ieee754.read = function (buffer, offset, isLE, mLen, nBytes) {
		  var e, m;
		  var eLen = (nBytes * 8) - mLen - 1;
		  var eMax = (1 << eLen) - 1;
		  var eBias = eMax >> 1;
		  var nBits = -7;
		  var i = isLE ? (nBytes - 1) : 0;
		  var d = isLE ? -1 : 1;
		  var s = buffer[offset + i];

		  i += d;

		  e = s & ((1 << (-nBits)) - 1);
		  s >>= (-nBits);
		  nBits += eLen;
		  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

		  m = e & ((1 << (-nBits)) - 1);
		  e >>= (-nBits);
		  nBits += mLen;
		  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

		  if (e === 0) {
		    e = 1 - eBias;
		  } else if (e === eMax) {
		    return m ? NaN : ((s ? -1 : 1) * Infinity)
		  } else {
		    m = m + Math.pow(2, mLen);
		    e = e - eBias;
		  }
		  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
		};

		ieee754.write = function (buffer, value, offset, isLE, mLen, nBytes) {
		  var e, m, c;
		  var eLen = (nBytes * 8) - mLen - 1;
		  var eMax = (1 << eLen) - 1;
		  var eBias = eMax >> 1;
		  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
		  var i = isLE ? 0 : (nBytes - 1);
		  var d = isLE ? 1 : -1;
		  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

		  value = Math.abs(value);

		  if (isNaN(value) || value === Infinity) {
		    m = isNaN(value) ? 1 : 0;
		    e = eMax;
		  } else {
		    e = Math.floor(Math.log(value) / Math.LN2);
		    if (value * (c = Math.pow(2, -e)) < 1) {
		      e--;
		      c *= 2;
		    }
		    if (e + eBias >= 1) {
		      value += rt / c;
		    } else {
		      value += rt * Math.pow(2, 1 - eBias);
		    }
		    if (value * c >= 2) {
		      e++;
		      c /= 2;
		    }

		    if (e + eBias >= eMax) {
		      m = 0;
		      e = eMax;
		    } else if (e + eBias >= 1) {
		      m = ((value * c) - 1) * Math.pow(2, mLen);
		      e = e + eBias;
		    } else {
		      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
		      e = 0;
		    }
		  }

		  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

		  e = (e << mLen) | m;
		  eLen += mLen;
		  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

		  buffer[offset + i - d] |= s * 128;
		};

		/*!
		 * The buffer module from node.js, for the browser.
		 *
		 * @author   Feross Aboukhadijeh <https://feross.org>
		 * @license  MIT
		 */

		(function (exports) {

			const base64 = base64Js;
			const ieee754$1 = ieee754;
			const customInspectSymbol =
			  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
			    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
			    : null;

			exports.Buffer = Buffer;
			exports.SlowBuffer = SlowBuffer;
			exports.INSPECT_MAX_BYTES = 50;

			const K_MAX_LENGTH = 0x7fffffff;
			exports.kMaxLength = K_MAX_LENGTH;
			const { Uint8Array: GlobalUint8Array, ArrayBuffer: GlobalArrayBuffer, SharedArrayBuffer: GlobalSharedArrayBuffer } = globalThis;

			/**
			 * If `Buffer.TYPED_ARRAY_SUPPORT`:
			 *   === true    Use Uint8Array implementation (fastest)
			 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
			 *               implementation (most compatible, even IE6)
			 *
			 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
			 * Opera 11.6+, iOS 4.2+.
			 *
			 * We report that the browser does not support typed arrays if the are not subclassable
			 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
			 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
			 * for __proto__ and has a buggy typed array implementation.
			 */
			Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

			if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
			    typeof console.error === 'function') {
			  console.error(
			    'This browser lacks typed array (Uint8Array) support which is required by ' +
			    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
			  );
			}

			function typedArraySupport () {
			  // Can typed array instances can be augmented?
			  try {
			    const arr = new GlobalUint8Array(1);
			    const proto = { foo: function () { return 42 } };
			    Object.setPrototypeOf(proto, GlobalUint8Array.prototype);
			    Object.setPrototypeOf(arr, proto);
			    return arr.foo() === 42
			  } catch (e) {
			    return false
			  }
			}

			Object.defineProperty(Buffer.prototype, 'parent', {
			  enumerable: true,
			  get: function () {
			    if (!Buffer.isBuffer(this)) return undefined
			    return this.buffer
			  }
			});

			Object.defineProperty(Buffer.prototype, 'offset', {
			  enumerable: true,
			  get: function () {
			    if (!Buffer.isBuffer(this)) return undefined
			    return this.byteOffset
			  }
			});

			function createBuffer (length) {
			  if (length > K_MAX_LENGTH) {
			    throw new RangeError('The value "' + length + '" is invalid for option "size"')
			  }
			  // Return an augmented `Uint8Array` instance
			  const buf = new GlobalUint8Array(length);
			  Object.setPrototypeOf(buf, Buffer.prototype);
			  return buf
			}

			/**
			 * The Buffer constructor returns instances of `Uint8Array` that have their
			 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
			 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
			 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
			 * returns a single octet.
			 *
			 * The `Uint8Array` prototype remains unmodified.
			 */

			function Buffer (arg, encodingOrOffset, length) {
			  // Common case.
			  if (typeof arg === 'number') {
			    if (typeof encodingOrOffset === 'string') {
			      throw new TypeError(
			        'The "string" argument must be of type string. Received type number'
			      )
			    }
			    return allocUnsafe(arg)
			  }
			  return from(arg, encodingOrOffset, length)
			}

			Buffer.poolSize = 8192; // not used by this implementation

			function from (value, encodingOrOffset, length) {
			  if (typeof value === 'string') {
			    return fromString(value, encodingOrOffset)
			  }

			  if (GlobalArrayBuffer.isView(value)) {
			    return fromArrayView(value)
			  }

			  if (value == null) {
			    throw new TypeError(
			      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
			      'or Array-like Object. Received type ' + (typeof value)
			    )
			  }

			  if (isInstance(value, GlobalArrayBuffer) ||
			      (value && isInstance(value.buffer, GlobalArrayBuffer))) {
			    return fromArrayBuffer(value, encodingOrOffset, length)
			  }

			  if (typeof GlobalSharedArrayBuffer !== 'undefined' &&
			      (isInstance(value, GlobalSharedArrayBuffer) ||
			      (value && isInstance(value.buffer, GlobalSharedArrayBuffer)))) {
			    return fromArrayBuffer(value, encodingOrOffset, length)
			  }

			  if (typeof value === 'number') {
			    throw new TypeError(
			      'The "value" argument must not be of type number. Received type number'
			    )
			  }

			  const valueOf = value.valueOf && value.valueOf();
			  if (valueOf != null && valueOf !== value) {
			    return Buffer.from(valueOf, encodingOrOffset, length)
			  }

			  const b = fromObject(value);
			  if (b) return b

			  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
			      typeof value[Symbol.toPrimitive] === 'function') {
			    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
			  }

			  throw new TypeError(
			    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
			    'or Array-like Object. Received type ' + (typeof value)
			  )
			}

			/**
			 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
			 * if value is a number.
			 * Buffer.from(str[, encoding])
			 * Buffer.from(array)
			 * Buffer.from(buffer)
			 * Buffer.from(arrayBuffer[, byteOffset[, length]])
			 **/
			Buffer.from = function (value, encodingOrOffset, length) {
			  return from(value, encodingOrOffset, length)
			};

			// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
			// https://github.com/feross/buffer/pull/148
			Object.setPrototypeOf(Buffer.prototype, GlobalUint8Array.prototype);
			Object.setPrototypeOf(Buffer, GlobalUint8Array);

			function assertSize (size) {
			  if (typeof size !== 'number') {
			    throw new TypeError('"size" argument must be of type number')
			  } else if (size < 0) {
			    throw new RangeError('The value "' + size + '" is invalid for option "size"')
			  }
			}

			function alloc (size, fill, encoding) {
			  assertSize(size);
			  if (size <= 0) {
			    return createBuffer(size)
			  }
			  if (fill !== undefined) {
			    // Only pay attention to encoding if it's a string. This
			    // prevents accidentally sending in a number that would
			    // be interpreted as a start offset.
			    return typeof encoding === 'string'
			      ? createBuffer(size).fill(fill, encoding)
			      : createBuffer(size).fill(fill)
			  }
			  return createBuffer(size)
			}

			/**
			 * Creates a new filled Buffer instance.
			 * alloc(size[, fill[, encoding]])
			 **/
			Buffer.alloc = function (size, fill, encoding) {
			  return alloc(size, fill, encoding)
			};

			function allocUnsafe (size) {
			  assertSize(size);
			  return createBuffer(size < 0 ? 0 : checked(size) | 0)
			}

			/**
			 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
			 * */
			Buffer.allocUnsafe = function (size) {
			  return allocUnsafe(size)
			};
			/**
			 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
			 */
			Buffer.allocUnsafeSlow = function (size) {
			  return allocUnsafe(size)
			};

			function fromString (string, encoding) {
			  if (typeof encoding !== 'string' || encoding === '') {
			    encoding = 'utf8';
			  }

			  if (!Buffer.isEncoding(encoding)) {
			    throw new TypeError('Unknown encoding: ' + encoding)
			  }

			  const length = byteLength(string, encoding) | 0;
			  let buf = createBuffer(length);

			  const actual = buf.write(string, encoding);

			  if (actual !== length) {
			    // Writing a hex string, for example, that contains invalid characters will
			    // cause everything after the first invalid character to be ignored. (e.g.
			    // 'abxxcd' will be treated as 'ab')
			    buf = buf.slice(0, actual);
			  }

			  return buf
			}

			function fromArrayLike (array) {
			  const length = array.length < 0 ? 0 : checked(array.length) | 0;
			  const buf = createBuffer(length);
			  for (let i = 0; i < length; i += 1) {
			    buf[i] = array[i] & 255;
			  }
			  return buf
			}

			function fromArrayView (arrayView) {
			  if (isInstance(arrayView, GlobalUint8Array)) {
			    const copy = new GlobalUint8Array(arrayView);
			    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
			  }
			  return fromArrayLike(arrayView)
			}

			function fromArrayBuffer (array, byteOffset, length) {
			  if (byteOffset < 0 || array.byteLength < byteOffset) {
			    throw new RangeError('"offset" is outside of buffer bounds')
			  }

			  if (array.byteLength < byteOffset + (length || 0)) {
			    throw new RangeError('"length" is outside of buffer bounds')
			  }

			  let buf;
			  if (byteOffset === undefined && length === undefined) {
			    buf = new GlobalUint8Array(array);
			  } else if (length === undefined) {
			    buf = new GlobalUint8Array(array, byteOffset);
			  } else {
			    buf = new GlobalUint8Array(array, byteOffset, length);
			  }

			  // Return an augmented `Uint8Array` instance
			  Object.setPrototypeOf(buf, Buffer.prototype);

			  return buf
			}

			function fromObject (obj) {
			  if (Buffer.isBuffer(obj)) {
			    const len = checked(obj.length) | 0;
			    const buf = createBuffer(len);

			    if (buf.length === 0) {
			      return buf
			    }

			    obj.copy(buf, 0, 0, len);
			    return buf
			  }

			  if (obj.length !== undefined) {
			    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
			      return createBuffer(0)
			    }
			    return fromArrayLike(obj)
			  }

			  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
			    return fromArrayLike(obj.data)
			  }
			}

			function checked (length) {
			  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
			  // length is NaN (which is otherwise coerced to zero.)
			  if (length >= K_MAX_LENGTH) {
			    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
			                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
			  }
			  return length | 0
			}

			function SlowBuffer (length) {
			  if (+length != length) { // eslint-disable-line eqeqeq
			    length = 0;
			  }
			  return Buffer.alloc(+length)
			}

			Buffer.isBuffer = function isBuffer (b) {
			  return b != null && b._isBuffer === true &&
			    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
			};

			Buffer.compare = function compare (a, b) {
			  if (isInstance(a, GlobalUint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
			  if (isInstance(b, GlobalUint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
			  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
			    throw new TypeError(
			      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
			    )
			  }

			  if (a === b) return 0

			  let x = a.length;
			  let y = b.length;

			  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
			    if (a[i] !== b[i]) {
			      x = a[i];
			      y = b[i];
			      break
			    }
			  }

			  if (x < y) return -1
			  if (y < x) return 1
			  return 0
			};

			Buffer.isEncoding = function isEncoding (encoding) {
			  switch (String(encoding).toLowerCase()) {
			    case 'hex':
			    case 'utf8':
			    case 'utf-8':
			    case 'ascii':
			    case 'latin1':
			    case 'binary':
			    case 'base64':
			    case 'ucs2':
			    case 'ucs-2':
			    case 'utf16le':
			    case 'utf-16le':
			      return true
			    default:
			      return false
			  }
			};

			Buffer.concat = function concat (list, length) {
			  if (!Array.isArray(list)) {
			    throw new TypeError('"list" argument must be an Array of Buffers')
			  }

			  if (list.length === 0) {
			    return Buffer.alloc(0)
			  }

			  let i;
			  if (length === undefined) {
			    length = 0;
			    for (i = 0; i < list.length; ++i) {
			      length += list[i].length;
			    }
			  }

			  const buffer = Buffer.allocUnsafe(length);
			  let pos = 0;
			  for (i = 0; i < list.length; ++i) {
			    let buf = list[i];
			    if (isInstance(buf, GlobalUint8Array)) {
			      if (pos + buf.length > buffer.length) {
			        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
			        buf.copy(buffer, pos);
			      } else {
			        GlobalUint8Array.prototype.set.call(
			          buffer,
			          buf,
			          pos
			        );
			      }
			    } else if (!Buffer.isBuffer(buf)) {
			      throw new TypeError('"list" argument must be an Array of Buffers')
			    } else {
			      buf.copy(buffer, pos);
			    }
			    pos += buf.length;
			  }
			  return buffer
			};

			function byteLength (string, encoding) {
			  if (Buffer.isBuffer(string)) {
			    return string.length
			  }
			  if (GlobalArrayBuffer.isView(string) || isInstance(string, GlobalArrayBuffer)) {
			    return string.byteLength
			  }
			  if (typeof string !== 'string') {
			    throw new TypeError(
			      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
			      'Received type ' + typeof string
			    )
			  }

			  const len = string.length;
			  const mustMatch = (arguments.length > 2 && arguments[2] === true);
			  if (!mustMatch && len === 0) return 0

			  // Use a for loop to avoid recursion
			  let loweredCase = false;
			  for (;;) {
			    switch (encoding) {
			      case 'ascii':
			      case 'latin1':
			      case 'binary':
			        return len
			      case 'utf8':
			      case 'utf-8':
			        return utf8ToBytes(string).length
			      case 'ucs2':
			      case 'ucs-2':
			      case 'utf16le':
			      case 'utf-16le':
			        return len * 2
			      case 'hex':
			        return len >>> 1
			      case 'base64':
			        return base64ToBytes(string).length
			      default:
			        if (loweredCase) {
			          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
			        }
			        encoding = ('' + encoding).toLowerCase();
			        loweredCase = true;
			    }
			  }
			}
			Buffer.byteLength = byteLength;

			function slowToString (encoding, start, end) {
			  let loweredCase = false;

			  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
			  // property of a typed array.

			  // This behaves neither like String nor Uint8Array in that we set start/end
			  // to their upper/lower bounds if the value passed is out of range.
			  // undefined is handled specially as per ECMA-262 6th Edition,
			  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
			  if (start === undefined || start < 0) {
			    start = 0;
			  }
			  // Return early if start > this.length. Done here to prevent potential uint32
			  // coercion fail below.
			  if (start > this.length) {
			    return ''
			  }

			  if (end === undefined || end > this.length) {
			    end = this.length;
			  }

			  if (end <= 0) {
			    return ''
			  }

			  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
			  end >>>= 0;
			  start >>>= 0;

			  if (end <= start) {
			    return ''
			  }

			  if (!encoding) encoding = 'utf8';

			  while (true) {
			    switch (encoding) {
			      case 'hex':
			        return hexSlice(this, start, end)

			      case 'utf8':
			      case 'utf-8':
			        return utf8Slice(this, start, end)

			      case 'ascii':
			        return asciiSlice(this, start, end)

			      case 'latin1':
			      case 'binary':
			        return latin1Slice(this, start, end)

			      case 'base64':
			        return base64Slice(this, start, end)

			      case 'ucs2':
			      case 'ucs-2':
			      case 'utf16le':
			      case 'utf-16le':
			        return utf16leSlice(this, start, end)

			      default:
			        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
			        encoding = (encoding + '').toLowerCase();
			        loweredCase = true;
			    }
			  }
			}

			// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
			// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
			// reliably in a browserify context because there could be multiple different
			// copies of the 'buffer' package in use. This method works even for Buffer
			// instances that were created from another copy of the `buffer` package.
			// See: https://github.com/feross/buffer/issues/154
			Buffer.prototype._isBuffer = true;

			function swap (b, n, m) {
			  const i = b[n];
			  b[n] = b[m];
			  b[m] = i;
			}

			Buffer.prototype.swap16 = function swap16 () {
			  const len = this.length;
			  if (len % 2 !== 0) {
			    throw new RangeError('Buffer size must be a multiple of 16-bits')
			  }
			  for (let i = 0; i < len; i += 2) {
			    swap(this, i, i + 1);
			  }
			  return this
			};

			Buffer.prototype.swap32 = function swap32 () {
			  const len = this.length;
			  if (len % 4 !== 0) {
			    throw new RangeError('Buffer size must be a multiple of 32-bits')
			  }
			  for (let i = 0; i < len; i += 4) {
			    swap(this, i, i + 3);
			    swap(this, i + 1, i + 2);
			  }
			  return this
			};

			Buffer.prototype.swap64 = function swap64 () {
			  const len = this.length;
			  if (len % 8 !== 0) {
			    throw new RangeError('Buffer size must be a multiple of 64-bits')
			  }
			  for (let i = 0; i < len; i += 8) {
			    swap(this, i, i + 7);
			    swap(this, i + 1, i + 6);
			    swap(this, i + 2, i + 5);
			    swap(this, i + 3, i + 4);
			  }
			  return this
			};

			Buffer.prototype.toString = function toString () {
			  const length = this.length;
			  if (length === 0) return ''
			  if (arguments.length === 0) return utf8Slice(this, 0, length)
			  return slowToString.apply(this, arguments)
			};

			Buffer.prototype.toLocaleString = Buffer.prototype.toString;

			Buffer.prototype.equals = function equals (b) {
			  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
			  if (this === b) return true
			  return Buffer.compare(this, b) === 0
			};

			Buffer.prototype.inspect = function inspect () {
			  let str = '';
			  const max = exports.INSPECT_MAX_BYTES;
			  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
			  if (this.length > max) str += ' ... ';
			  return '<Buffer ' + str + '>'
			};
			if (customInspectSymbol) {
			  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
			}

			Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
			  if (isInstance(target, GlobalUint8Array)) {
			    target = Buffer.from(target, target.offset, target.byteLength);
			  }
			  if (!Buffer.isBuffer(target)) {
			    throw new TypeError(
			      'The "target" argument must be one of type Buffer or Uint8Array. ' +
			      'Received type ' + (typeof target)
			    )
			  }

			  if (start === undefined) {
			    start = 0;
			  }
			  if (end === undefined) {
			    end = target ? target.length : 0;
			  }
			  if (thisStart === undefined) {
			    thisStart = 0;
			  }
			  if (thisEnd === undefined) {
			    thisEnd = this.length;
			  }

			  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
			    throw new RangeError('out of range index')
			  }

			  if (thisStart >= thisEnd && start >= end) {
			    return 0
			  }
			  if (thisStart >= thisEnd) {
			    return -1
			  }
			  if (start >= end) {
			    return 1
			  }

			  start >>>= 0;
			  end >>>= 0;
			  thisStart >>>= 0;
			  thisEnd >>>= 0;

			  if (this === target) return 0

			  let x = thisEnd - thisStart;
			  let y = end - start;
			  const len = Math.min(x, y);

			  const thisCopy = this.slice(thisStart, thisEnd);
			  const targetCopy = target.slice(start, end);

			  for (let i = 0; i < len; ++i) {
			    if (thisCopy[i] !== targetCopy[i]) {
			      x = thisCopy[i];
			      y = targetCopy[i];
			      break
			    }
			  }

			  if (x < y) return -1
			  if (y < x) return 1
			  return 0
			};

			// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
			// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
			//
			// Arguments:
			// - buffer - a Buffer to search
			// - val - a string, Buffer, or number
			// - byteOffset - an index into `buffer`; will be clamped to an int32
			// - encoding - an optional encoding, relevant is val is a string
			// - dir - true for indexOf, false for lastIndexOf
			function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
			  // Empty buffer means no match
			  if (buffer.length === 0) return -1

			  // Normalize byteOffset
			  if (typeof byteOffset === 'string') {
			    encoding = byteOffset;
			    byteOffset = 0;
			  } else if (byteOffset > 0x7fffffff) {
			    byteOffset = 0x7fffffff;
			  } else if (byteOffset < -2147483648) {
			    byteOffset = -2147483648;
			  }
			  byteOffset = +byteOffset; // Coerce to Number.
			  if (numberIsNaN(byteOffset)) {
			    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
			    byteOffset = dir ? 0 : (buffer.length - 1);
			  }

			  // Normalize byteOffset: negative offsets start from the end of the buffer
			  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
			  if (byteOffset >= buffer.length) {
			    if (dir) return -1
			    else byteOffset = buffer.length - 1;
			  } else if (byteOffset < 0) {
			    if (dir) byteOffset = 0;
			    else return -1
			  }

			  // Normalize val
			  if (typeof val === 'string') {
			    val = Buffer.from(val, encoding);
			  }

			  // Finally, search either indexOf (if dir is true) or lastIndexOf
			  if (Buffer.isBuffer(val)) {
			    // Special case: looking for empty string/buffer always fails
			    if (val.length === 0) {
			      return -1
			    }
			    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
			  } else if (typeof val === 'number') {
			    val = val & 0xFF; // Search for a byte value [0-255]
			    if (typeof GlobalUint8Array.prototype.indexOf === 'function') {
			      if (dir) {
			        return GlobalUint8Array.prototype.indexOf.call(buffer, val, byteOffset)
			      } else {
			        return GlobalUint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
			      }
			    }
			    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
			  }

			  throw new TypeError('val must be string, number or Buffer')
			}

			function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
			  let indexSize = 1;
			  let arrLength = arr.length;
			  let valLength = val.length;

			  if (encoding !== undefined) {
			    encoding = String(encoding).toLowerCase();
			    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
			        encoding === 'utf16le' || encoding === 'utf-16le') {
			      if (arr.length < 2 || val.length < 2) {
			        return -1
			      }
			      indexSize = 2;
			      arrLength /= 2;
			      valLength /= 2;
			      byteOffset /= 2;
			    }
			  }

			  function read (buf, i) {
			    if (indexSize === 1) {
			      return buf[i]
			    } else {
			      return buf.readUInt16BE(i * indexSize)
			    }
			  }

			  let i;
			  if (dir) {
			    let foundIndex = -1;
			    for (i = byteOffset; i < arrLength; i++) {
			      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
			        if (foundIndex === -1) foundIndex = i;
			        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
			      } else {
			        if (foundIndex !== -1) i -= i - foundIndex;
			        foundIndex = -1;
			      }
			    }
			  } else {
			    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
			    for (i = byteOffset; i >= 0; i--) {
			      let found = true;
			      for (let j = 0; j < valLength; j++) {
			        if (read(arr, i + j) !== read(val, j)) {
			          found = false;
			          break
			        }
			      }
			      if (found) return i
			    }
			  }

			  return -1
			}

			Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
			  return this.indexOf(val, byteOffset, encoding) !== -1
			};

			Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
			  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
			};

			Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
			  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
			};

			function hexWrite (buf, string, offset, length) {
			  offset = Number(offset) || 0;
			  const remaining = buf.length - offset;
			  if (!length) {
			    length = remaining;
			  } else {
			    length = Number(length);
			    if (length > remaining) {
			      length = remaining;
			    }
			  }

			  const strLen = string.length;

			  if (length > strLen / 2) {
			    length = strLen / 2;
			  }
			  let i;
			  for (i = 0; i < length; ++i) {
			    const parsed = parseInt(string.substr(i * 2, 2), 16);
			    if (numberIsNaN(parsed)) return i
			    buf[offset + i] = parsed;
			  }
			  return i
			}

			function utf8Write (buf, string, offset, length) {
			  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
			}

			function asciiWrite (buf, string, offset, length) {
			  return blitBuffer(asciiToBytes(string), buf, offset, length)
			}

			function base64Write (buf, string, offset, length) {
			  return blitBuffer(base64ToBytes(string), buf, offset, length)
			}

			function ucs2Write (buf, string, offset, length) {
			  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
			}

			Buffer.prototype.write = function write (string, offset, length, encoding) {
			  // Buffer#write(string)
			  if (offset === undefined) {
			    encoding = 'utf8';
			    length = this.length;
			    offset = 0;
			  // Buffer#write(string, encoding)
			  } else if (length === undefined && typeof offset === 'string') {
			    encoding = offset;
			    length = this.length;
			    offset = 0;
			  // Buffer#write(string, offset[, length][, encoding])
			  } else if (isFinite(offset)) {
			    offset = offset >>> 0;
			    if (isFinite(length)) {
			      length = length >>> 0;
			      if (encoding === undefined) encoding = 'utf8';
			    } else {
			      encoding = length;
			      length = undefined;
			    }
			  } else {
			    throw new Error(
			      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
			    )
			  }

			  const remaining = this.length - offset;
			  if (length === undefined || length > remaining) length = remaining;

			  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
			    throw new RangeError('Attempt to write outside buffer bounds')
			  }

			  if (!encoding) encoding = 'utf8';

			  let loweredCase = false;
			  for (;;) {
			    switch (encoding) {
			      case 'hex':
			        return hexWrite(this, string, offset, length)

			      case 'utf8':
			      case 'utf-8':
			        return utf8Write(this, string, offset, length)

			      case 'ascii':
			      case 'latin1':
			      case 'binary':
			        return asciiWrite(this, string, offset, length)

			      case 'base64':
			        // Warning: maxLength not taken into account in base64Write
			        return base64Write(this, string, offset, length)

			      case 'ucs2':
			      case 'ucs-2':
			      case 'utf16le':
			      case 'utf-16le':
			        return ucs2Write(this, string, offset, length)

			      default:
			        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
			        encoding = ('' + encoding).toLowerCase();
			        loweredCase = true;
			    }
			  }
			};

			Buffer.prototype.toJSON = function toJSON () {
			  return {
			    type: 'Buffer',
			    data: Array.prototype.slice.call(this._arr || this, 0)
			  }
			};

			function base64Slice (buf, start, end) {
			  if (start === 0 && end === buf.length) {
			    return base64.fromByteArray(buf)
			  } else {
			    return base64.fromByteArray(buf.slice(start, end))
			  }
			}

			function utf8Slice (buf, start, end) {
			  end = Math.min(buf.length, end);
			  const res = [];

			  let i = start;
			  while (i < end) {
			    const firstByte = buf[i];
			    let codePoint = null;
			    let bytesPerSequence = (firstByte > 0xEF)
			      ? 4
			      : (firstByte > 0xDF)
			          ? 3
			          : (firstByte > 0xBF)
			              ? 2
			              : 1;

			    if (i + bytesPerSequence <= end) {
			      let secondByte, thirdByte, fourthByte, tempCodePoint;

			      switch (bytesPerSequence) {
			        case 1:
			          if (firstByte < 0x80) {
			            codePoint = firstByte;
			          }
			          break
			        case 2:
			          secondByte = buf[i + 1];
			          if ((secondByte & 0xC0) === 0x80) {
			            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
			            if (tempCodePoint > 0x7F) {
			              codePoint = tempCodePoint;
			            }
			          }
			          break
			        case 3:
			          secondByte = buf[i + 1];
			          thirdByte = buf[i + 2];
			          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
			            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
			            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
			              codePoint = tempCodePoint;
			            }
			          }
			          break
			        case 4:
			          secondByte = buf[i + 1];
			          thirdByte = buf[i + 2];
			          fourthByte = buf[i + 3];
			          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
			            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
			            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
			              codePoint = tempCodePoint;
			            }
			          }
			      }
			    }

			    if (codePoint === null) {
			      // we did not generate a valid codePoint so insert a
			      // replacement char (U+FFFD) and advance only 1 byte
			      codePoint = 0xFFFD;
			      bytesPerSequence = 1;
			    } else if (codePoint > 0xFFFF) {
			      // encode to utf16 (surrogate pair dance)
			      codePoint -= 0x10000;
			      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
			      codePoint = 0xDC00 | codePoint & 0x3FF;
			    }

			    res.push(codePoint);
			    i += bytesPerSequence;
			  }

			  return decodeCodePointsArray(res)
			}

			// Based on http://stackoverflow.com/a/22747272/680742, the browser with
			// the lowest limit is Chrome, with 0x10000 args.
			// We go 1 magnitude less, for safety
			const MAX_ARGUMENTS_LENGTH = 0x1000;

			function decodeCodePointsArray (codePoints) {
			  const len = codePoints.length;
			  if (len <= MAX_ARGUMENTS_LENGTH) {
			    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
			  }

			  // Decode in chunks to avoid "call stack size exceeded".
			  let res = '';
			  let i = 0;
			  while (i < len) {
			    res += String.fromCharCode.apply(
			      String,
			      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
			    );
			  }
			  return res
			}

			function asciiSlice (buf, start, end) {
			  let ret = '';
			  end = Math.min(buf.length, end);

			  for (let i = start; i < end; ++i) {
			    ret += String.fromCharCode(buf[i] & 0x7F);
			  }
			  return ret
			}

			function latin1Slice (buf, start, end) {
			  let ret = '';
			  end = Math.min(buf.length, end);

			  for (let i = start; i < end; ++i) {
			    ret += String.fromCharCode(buf[i]);
			  }
			  return ret
			}

			function hexSlice (buf, start, end) {
			  const len = buf.length;

			  if (!start || start < 0) start = 0;
			  if (!end || end < 0 || end > len) end = len;

			  let out = '';
			  for (let i = start; i < end; ++i) {
			    out += hexSliceLookupTable[buf[i]];
			  }
			  return out
			}

			function utf16leSlice (buf, start, end) {
			  const bytes = buf.slice(start, end);
			  let res = '';
			  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
			  for (let i = 0; i < bytes.length - 1; i += 2) {
			    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256));
			  }
			  return res
			}

			Buffer.prototype.slice = function slice (start, end) {
			  const len = this.length;
			  start = ~~start;
			  end = end === undefined ? len : ~~end;

			  if (start < 0) {
			    start += len;
			    if (start < 0) start = 0;
			  } else if (start > len) {
			    start = len;
			  }

			  if (end < 0) {
			    end += len;
			    if (end < 0) end = 0;
			  } else if (end > len) {
			    end = len;
			  }

			  if (end < start) end = start;

			  const newBuf = this.subarray(start, end);
			  // Return an augmented `Uint8Array` instance
			  Object.setPrototypeOf(newBuf, Buffer.prototype);

			  return newBuf
			};

			/*
			 * Need to make sure that buffer isn't trying to write out of bounds.
			 */
			function checkOffset (offset, ext, length) {
			  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
			  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
			}

			Buffer.prototype.readUintLE =
			Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
			  offset = offset >>> 0;
			  byteLength = byteLength >>> 0;
			  if (!noAssert) checkOffset(offset, byteLength, this.length);

			  let val = this[offset];
			  let mul = 1;
			  let i = 0;
			  while (++i < byteLength && (mul *= 0x100)) {
			    val += this[offset + i] * mul;
			  }

			  return val
			};

			Buffer.prototype.readUintBE =
			Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
			  offset = offset >>> 0;
			  byteLength = byteLength >>> 0;
			  if (!noAssert) {
			    checkOffset(offset, byteLength, this.length);
			  }

			  let val = this[offset + --byteLength];
			  let mul = 1;
			  while (byteLength > 0 && (mul *= 0x100)) {
			    val += this[offset + --byteLength] * mul;
			  }

			  return val
			};

			Buffer.prototype.readUint8 =
			Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 1, this.length);
			  return this[offset]
			};

			Buffer.prototype.readUint16LE =
			Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 2, this.length);
			  return this[offset] | (this[offset + 1] << 8)
			};

			Buffer.prototype.readUint16BE =
			Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 2, this.length);
			  return (this[offset] << 8) | this[offset + 1]
			};

			Buffer.prototype.readUint32LE =
			Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 4, this.length);

			  return ((this[offset]) |
			      (this[offset + 1] << 8) |
			      (this[offset + 2] << 16)) +
			      (this[offset + 3] * 0x1000000)
			};

			Buffer.prototype.readUint32BE =
			Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 4, this.length);

			  return (this[offset] * 0x1000000) +
			    ((this[offset + 1] << 16) |
			    (this[offset + 2] << 8) |
			    this[offset + 3])
			};

			Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
			  offset = offset >>> 0;
			  validateNumber(offset, 'offset');
			  const first = this[offset];
			  const last = this[offset + 7];
			  if (first === undefined || last === undefined) {
			    boundsError(offset, this.length - 8);
			  }

			  const lo = first +
			    this[++offset] * 2 ** 8 +
			    this[++offset] * 2 ** 16 +
			    this[++offset] * 2 ** 24;

			  const hi = this[++offset] +
			    this[++offset] * 2 ** 8 +
			    this[++offset] * 2 ** 16 +
			    last * 2 ** 24;

			  return BigInt(lo) + (BigInt(hi) << BigInt(32))
			});

			Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
			  offset = offset >>> 0;
			  validateNumber(offset, 'offset');
			  const first = this[offset];
			  const last = this[offset + 7];
			  if (first === undefined || last === undefined) {
			    boundsError(offset, this.length - 8);
			  }

			  const hi = first * 2 ** 24 +
			    this[++offset] * 2 ** 16 +
			    this[++offset] * 2 ** 8 +
			    this[++offset];

			  const lo = this[++offset] * 2 ** 24 +
			    this[++offset] * 2 ** 16 +
			    this[++offset] * 2 ** 8 +
			    last;

			  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
			});

			Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
			  offset = offset >>> 0;
			  byteLength = byteLength >>> 0;
			  if (!noAssert) checkOffset(offset, byteLength, this.length);

			  let val = this[offset];
			  let mul = 1;
			  let i = 0;
			  while (++i < byteLength && (mul *= 0x100)) {
			    val += this[offset + i] * mul;
			  }
			  mul *= 0x80;

			  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

			  return val
			};

			Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
			  offset = offset >>> 0;
			  byteLength = byteLength >>> 0;
			  if (!noAssert) checkOffset(offset, byteLength, this.length);

			  let i = byteLength;
			  let mul = 1;
			  let val = this[offset + --i];
			  while (i > 0 && (mul *= 0x100)) {
			    val += this[offset + --i] * mul;
			  }
			  mul *= 0x80;

			  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

			  return val
			};

			Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 1, this.length);
			  if (!(this[offset] & 0x80)) return (this[offset])
			  return ((0xff - this[offset] + 1) * -1)
			};

			Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 2, this.length);
			  const val = this[offset] | (this[offset + 1] << 8);
			  return (val & 0x8000) ? val | 0xFFFF0000 : val
			};

			Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 2, this.length);
			  const val = this[offset + 1] | (this[offset] << 8);
			  return (val & 0x8000) ? val | 0xFFFF0000 : val
			};

			Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 4, this.length);

			  return (this[offset]) |
			    (this[offset + 1] << 8) |
			    (this[offset + 2] << 16) |
			    (this[offset + 3] << 24)
			};

			Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 4, this.length);

			  return (this[offset] << 24) |
			    (this[offset + 1] << 16) |
			    (this[offset + 2] << 8) |
			    (this[offset + 3])
			};

			Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
			  offset = offset >>> 0;
			  validateNumber(offset, 'offset');
			  const first = this[offset];
			  const last = this[offset + 7];
			  if (first === undefined || last === undefined) {
			    boundsError(offset, this.length - 8);
			  }

			  const val = this[offset + 4] +
			    this[offset + 5] * 2 ** 8 +
			    this[offset + 6] * 2 ** 16 +
			    (last << 24); // Overflow

			  return (BigInt(val) << BigInt(32)) +
			    BigInt(first +
			    this[++offset] * 2 ** 8 +
			    this[++offset] * 2 ** 16 +
			    this[++offset] * 2 ** 24)
			});

			Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
			  offset = offset >>> 0;
			  validateNumber(offset, 'offset');
			  const first = this[offset];
			  const last = this[offset + 7];
			  if (first === undefined || last === undefined) {
			    boundsError(offset, this.length - 8);
			  }

			  const val = (first << 24) + // Overflow
			    this[++offset] * 2 ** 16 +
			    this[++offset] * 2 ** 8 +
			    this[++offset];

			  return (BigInt(val) << BigInt(32)) +
			    BigInt(this[++offset] * 2 ** 24 +
			    this[++offset] * 2 ** 16 +
			    this[++offset] * 2 ** 8 +
			    last)
			});

			Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 4, this.length);
			  return ieee754$1.read(this, offset, true, 23, 4)
			};

			Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 4, this.length);
			  return ieee754$1.read(this, offset, false, 23, 4)
			};

			Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 8, this.length);
			  return ieee754$1.read(this, offset, true, 52, 8)
			};

			Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
			  offset = offset >>> 0;
			  if (!noAssert) checkOffset(offset, 8, this.length);
			  return ieee754$1.read(this, offset, false, 52, 8)
			};

			function checkInt (buf, value, offset, ext, max, min) {
			  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
			  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
			  if (offset + ext > buf.length) throw new RangeError('Index out of range')
			}

			Buffer.prototype.writeUintLE =
			Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  byteLength = byteLength >>> 0;
			  if (!noAssert) {
			    const maxBytes = Math.pow(2, 8 * byteLength) - 1;
			    checkInt(this, value, offset, byteLength, maxBytes, 0);
			  }

			  let mul = 1;
			  let i = 0;
			  this[offset] = value & 0xFF;
			  while (++i < byteLength && (mul *= 0x100)) {
			    this[offset + i] = (value / mul) & 0xFF;
			  }

			  return offset + byteLength
			};

			Buffer.prototype.writeUintBE =
			Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  byteLength = byteLength >>> 0;
			  if (!noAssert) {
			    const maxBytes = Math.pow(2, 8 * byteLength) - 1;
			    checkInt(this, value, offset, byteLength, maxBytes, 0);
			  }

			  let i = byteLength - 1;
			  let mul = 1;
			  this[offset + i] = value & 0xFF;
			  while (--i >= 0 && (mul *= 0x100)) {
			    this[offset + i] = (value / mul) & 0xFF;
			  }

			  return offset + byteLength
			};

			Buffer.prototype.writeUint8 =
			Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
			  this[offset] = (value & 0xff);
			  return offset + 1
			};

			Buffer.prototype.writeUint16LE =
			Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
			  this[offset] = (value & 0xff);
			  this[offset + 1] = (value >>> 8);
			  return offset + 2
			};

			Buffer.prototype.writeUint16BE =
			Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
			  this[offset] = (value >>> 8);
			  this[offset + 1] = (value & 0xff);
			  return offset + 2
			};

			Buffer.prototype.writeUint32LE =
			Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
			  this[offset + 3] = (value >>> 24);
			  this[offset + 2] = (value >>> 16);
			  this[offset + 1] = (value >>> 8);
			  this[offset] = (value & 0xff);
			  return offset + 4
			};

			Buffer.prototype.writeUint32BE =
			Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
			  this[offset] = (value >>> 24);
			  this[offset + 1] = (value >>> 16);
			  this[offset + 2] = (value >>> 8);
			  this[offset + 3] = (value & 0xff);
			  return offset + 4
			};

			function wrtBigUInt64LE (buf, value, offset, min, max) {
			  checkIntBI(value, min, max, buf, offset, 7);

			  let lo = Number(value & BigInt(0xffffffff));
			  buf[offset++] = lo;
			  lo = lo >> 8;
			  buf[offset++] = lo;
			  lo = lo >> 8;
			  buf[offset++] = lo;
			  lo = lo >> 8;
			  buf[offset++] = lo;
			  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
			  buf[offset++] = hi;
			  hi = hi >> 8;
			  buf[offset++] = hi;
			  hi = hi >> 8;
			  buf[offset++] = hi;
			  hi = hi >> 8;
			  buf[offset++] = hi;
			  return offset
			}

			function wrtBigUInt64BE (buf, value, offset, min, max) {
			  checkIntBI(value, min, max, buf, offset, 7);

			  let lo = Number(value & BigInt(0xffffffff));
			  buf[offset + 7] = lo;
			  lo = lo >> 8;
			  buf[offset + 6] = lo;
			  lo = lo >> 8;
			  buf[offset + 5] = lo;
			  lo = lo >> 8;
			  buf[offset + 4] = lo;
			  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
			  buf[offset + 3] = hi;
			  hi = hi >> 8;
			  buf[offset + 2] = hi;
			  hi = hi >> 8;
			  buf[offset + 1] = hi;
			  hi = hi >> 8;
			  buf[offset] = hi;
			  return offset + 8
			}

			Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
			  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
			});

			Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
			  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
			});

			Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) {
			    const limit = Math.pow(2, (8 * byteLength) - 1);

			    checkInt(this, value, offset, byteLength, limit - 1, -limit);
			  }

			  let i = 0;
			  let mul = 1;
			  let sub = 0;
			  this[offset] = value & 0xFF;
			  while (++i < byteLength && (mul *= 0x100)) {
			    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
			      sub = 1;
			    }
			    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
			  }

			  return offset + byteLength
			};

			Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) {
			    const limit = Math.pow(2, (8 * byteLength) - 1);

			    checkInt(this, value, offset, byteLength, limit - 1, -limit);
			  }

			  let i = byteLength - 1;
			  let mul = 1;
			  let sub = 0;
			  this[offset + i] = value & 0xFF;
			  while (--i >= 0 && (mul *= 0x100)) {
			    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
			      sub = 1;
			    }
			    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
			  }

			  return offset + byteLength
			};

			Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -128);
			  if (value < 0) value = 0xff + value + 1;
			  this[offset] = (value & 0xff);
			  return offset + 1
			};

			Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
			  this[offset] = (value & 0xff);
			  this[offset + 1] = (value >>> 8);
			  return offset + 2
			};

			Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
			  this[offset] = (value >>> 8);
			  this[offset + 1] = (value & 0xff);
			  return offset + 2
			};

			Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
			  this[offset] = (value & 0xff);
			  this[offset + 1] = (value >>> 8);
			  this[offset + 2] = (value >>> 16);
			  this[offset + 3] = (value >>> 24);
			  return offset + 4
			};

			Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
			  if (value < 0) value = 0xffffffff + value + 1;
			  this[offset] = (value >>> 24);
			  this[offset + 1] = (value >>> 16);
			  this[offset + 2] = (value >>> 8);
			  this[offset + 3] = (value & 0xff);
			  return offset + 4
			};

			Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
			  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
			});

			Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
			  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
			});

			function checkIEEE754 (buf, value, offset, ext, max, min) {
			  if (offset + ext > buf.length) throw new RangeError('Index out of range')
			  if (offset < 0) throw new RangeError('Index out of range')
			}

			function writeFloat (buf, value, offset, littleEndian, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) {
			    checkIEEE754(buf, value, offset, 4);
			  }
			  ieee754$1.write(buf, value, offset, littleEndian, 23, 4);
			  return offset + 4
			}

			Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
			  return writeFloat(this, value, offset, true, noAssert)
			};

			Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
			  return writeFloat(this, value, offset, false, noAssert)
			};

			function writeDouble (buf, value, offset, littleEndian, noAssert) {
			  value = +value;
			  offset = offset >>> 0;
			  if (!noAssert) {
			    checkIEEE754(buf, value, offset, 8);
			  }
			  ieee754$1.write(buf, value, offset, littleEndian, 52, 8);
			  return offset + 8
			}

			Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
			  return writeDouble(this, value, offset, true, noAssert)
			};

			Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
			  return writeDouble(this, value, offset, false, noAssert)
			};

			// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
			Buffer.prototype.copy = function copy (target, targetStart, start, end) {
			  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
			  if (!start) start = 0;
			  if (!end && end !== 0) end = this.length;
			  if (targetStart >= target.length) targetStart = target.length;
			  if (!targetStart) targetStart = 0;
			  if (end > 0 && end < start) end = start;

			  // Copy 0 bytes; we're done
			  if (end === start) return 0
			  if (target.length === 0 || this.length === 0) return 0

			  // Fatal error conditions
			  if (targetStart < 0) {
			    throw new RangeError('targetStart out of bounds')
			  }
			  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
			  if (end < 0) throw new RangeError('sourceEnd out of bounds')

			  // Are we oob?
			  if (end > this.length) end = this.length;
			  if (target.length - targetStart < end - start) {
			    end = target.length - targetStart + start;
			  }

			  const len = end - start;

			  if (this === target && typeof GlobalUint8Array.prototype.copyWithin === 'function') {
			    // Use built-in when available, missing from IE11
			    this.copyWithin(targetStart, start, end);
			  } else {
			    GlobalUint8Array.prototype.set.call(
			      target,
			      this.subarray(start, end),
			      targetStart
			    );
			  }

			  return len
			};

			// Usage:
			//    buffer.fill(number[, offset[, end]])
			//    buffer.fill(buffer[, offset[, end]])
			//    buffer.fill(string[, offset[, end]][, encoding])
			Buffer.prototype.fill = function fill (val, start, end, encoding) {
			  // Handle string cases:
			  if (typeof val === 'string') {
			    if (typeof start === 'string') {
			      encoding = start;
			      start = 0;
			      end = this.length;
			    } else if (typeof end === 'string') {
			      encoding = end;
			      end = this.length;
			    }
			    if (encoding !== undefined && typeof encoding !== 'string') {
			      throw new TypeError('encoding must be a string')
			    }
			    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
			      throw new TypeError('Unknown encoding: ' + encoding)
			    }
			    if (val.length === 1) {
			      const code = val.charCodeAt(0);
			      if ((encoding === 'utf8' && code < 128) ||
			          encoding === 'latin1') {
			        // Fast path: If `val` fits into a single byte, use that numeric value.
			        val = code;
			      }
			    }
			  } else if (typeof val === 'number') {
			    val = val & 255;
			  } else if (typeof val === 'boolean') {
			    val = Number(val);
			  }

			  // Invalid ranges are not set to a default, so can range check early.
			  if (start < 0 || this.length < start || this.length < end) {
			    throw new RangeError('Out of range index')
			  }

			  if (end <= start) {
			    return this
			  }

			  start = start >>> 0;
			  end = end === undefined ? this.length : end >>> 0;

			  if (!val) val = 0;

			  let i;
			  if (typeof val === 'number') {
			    for (i = start; i < end; ++i) {
			      this[i] = val;
			    }
			  } else {
			    const bytes = Buffer.isBuffer(val)
			      ? val
			      : Buffer.from(val, encoding);
			    const len = bytes.length;
			    if (len === 0) {
			      throw new TypeError('The value "' + val +
			        '" is invalid for argument "value"')
			    }
			    for (i = 0; i < end - start; ++i) {
			      this[i + start] = bytes[i % len];
			    }
			  }

			  return this
			};

			// CUSTOM ERRORS
			// =============

			// Simplified versions from Node, changed for Buffer-only usage
			const errors = {};
			function E (sym, getMessage, Base) {
			  errors[sym] = class NodeError extends Base {
			    constructor () {
			      super();

			      Object.defineProperty(this, 'message', {
			        value: getMessage.apply(this, arguments),
			        writable: true,
			        configurable: true
			      });

			      // Add the error code to the name to include it in the stack trace.
			      this.name = `${this.name} [${sym}]`;
			      // Access the stack to generate the error message including the error code
			      // from the name.
			      this.stack; // eslint-disable-line no-unused-expressions
			      // Reset the name to the actual name.
			      delete this.name;
			    }

			    get code () {
			      return sym
			    }

			    set code (value) {
			      Object.defineProperty(this, 'code', {
			        configurable: true,
			        enumerable: true,
			        value,
			        writable: true
			      });
			    }

			    toString () {
			      return `${this.name} [${sym}]: ${this.message}`
			    }
			  };
			}

			E('ERR_BUFFER_OUT_OF_BOUNDS',
			  function (name) {
			    if (name) {
			      return `${name} is outside of buffer bounds`
			    }

			    return 'Attempt to access memory outside buffer bounds'
			  }, RangeError);
			E('ERR_INVALID_ARG_TYPE',
			  function (name, actual) {
			    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
			  }, TypeError);
			E('ERR_OUT_OF_RANGE',
			  function (str, range, input) {
			    let msg = `The value of "${str}" is out of range.`;
			    let received = input;
			    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
			      received = addNumericalSeparator(String(input));
			    } else if (typeof input === 'bigint') {
			      received = String(input);
			      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
			        received = addNumericalSeparator(received);
			      }
			      received += 'n';
			    }
			    msg += ` It must be ${range}. Received ${received}`;
			    return msg
			  }, RangeError);

			function addNumericalSeparator (val) {
			  let res = '';
			  let i = val.length;
			  const start = val[0] === '-' ? 1 : 0;
			  for (; i >= start + 4; i -= 3) {
			    res = `_${val.slice(i - 3, i)}${res}`;
			  }
			  return `${val.slice(0, i)}${res}`
			}

			// CHECK FUNCTIONS
			// ===============

			function checkBounds (buf, offset, byteLength) {
			  validateNumber(offset, 'offset');
			  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
			    boundsError(offset, buf.length - (byteLength + 1));
			  }
			}

			function checkIntBI (value, min, max, buf, offset, byteLength) {
			  if (value > max || value < min) {
			    const n = typeof min === 'bigint' ? 'n' : '';
			    let range;
			    {
			      if (min === 0 || min === BigInt(0)) {
			        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
			      } else {
			        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
			                `${(byteLength + 1) * 8 - 1}${n}`;
			      }
			    }
			    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
			  }
			  checkBounds(buf, offset, byteLength);
			}

			function validateNumber (value, name) {
			  if (typeof value !== 'number') {
			    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
			  }
			}

			function boundsError (value, length, type) {
			  if (Math.floor(value) !== value) {
			    validateNumber(value, type);
			    throw new errors.ERR_OUT_OF_RANGE('offset', 'an integer', value)
			  }

			  if (length < 0) {
			    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
			  }

			  throw new errors.ERR_OUT_OF_RANGE('offset',
			                                    `>= ${0} and <= ${length}`,
			                                    value)
			}

			// HELPER FUNCTIONS
			// ================

			const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

			function base64clean (str) {
			  // Node takes equal signs as end of the Base64 encoding
			  str = str.split('=')[0];
			  // Node strips out invalid characters like \n and \t from the string, base64-js does not
			  str = str.trim().replace(INVALID_BASE64_RE, '');
			  // Node converts strings with length < 2 to ''
			  if (str.length < 2) return ''
			  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
			  while (str.length % 4 !== 0) {
			    str = str + '=';
			  }
			  return str
			}

			function utf8ToBytes (string, units) {
			  units = units || Infinity;
			  let codePoint;
			  const length = string.length;
			  let leadSurrogate = null;
			  const bytes = [];

			  for (let i = 0; i < length; ++i) {
			    codePoint = string.charCodeAt(i);

			    // is surrogate component
			    if (codePoint > 0xD7FF && codePoint < 0xE000) {
			      // last char was a lead
			      if (!leadSurrogate) {
			        // no lead yet
			        if (codePoint > 0xDBFF) {
			          // unexpected trail
			          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
			          continue
			        } else if (i + 1 === length) {
			          // unpaired lead
			          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
			          continue
			        }

			        // valid lead
			        leadSurrogate = codePoint;

			        continue
			      }

			      // 2 leads in a row
			      if (codePoint < 0xDC00) {
			        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
			        leadSurrogate = codePoint;
			        continue
			      }

			      // valid surrogate pair
			      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
			    } else if (leadSurrogate) {
			      // valid bmp char, but last char was a lead
			      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
			    }

			    leadSurrogate = null;

			    // encode utf8
			    if (codePoint < 0x80) {
			      if ((units -= 1) < 0) break
			      bytes.push(codePoint);
			    } else if (codePoint < 0x800) {
			      if ((units -= 2) < 0) break
			      bytes.push(
			        codePoint >> 0x6 | 0xC0,
			        codePoint & 0x3F | 0x80
			      );
			    } else if (codePoint < 0x10000) {
			      if ((units -= 3) < 0) break
			      bytes.push(
			        codePoint >> 0xC | 0xE0,
			        codePoint >> 0x6 & 0x3F | 0x80,
			        codePoint & 0x3F | 0x80
			      );
			    } else if (codePoint < 0x110000) {
			      if ((units -= 4) < 0) break
			      bytes.push(
			        codePoint >> 0x12 | 0xF0,
			        codePoint >> 0xC & 0x3F | 0x80,
			        codePoint >> 0x6 & 0x3F | 0x80,
			        codePoint & 0x3F | 0x80
			      );
			    } else {
			      throw new Error('Invalid code point')
			    }
			  }

			  return bytes
			}

			function asciiToBytes (str) {
			  const byteArray = [];
			  for (let i = 0; i < str.length; ++i) {
			    // Node's code seems to be doing this and not & 0x7F..
			    byteArray.push(str.charCodeAt(i) & 0xFF);
			  }
			  return byteArray
			}

			function utf16leToBytes (str, units) {
			  let c, hi, lo;
			  const byteArray = [];
			  for (let i = 0; i < str.length; ++i) {
			    if ((units -= 2) < 0) break

			    c = str.charCodeAt(i);
			    hi = c >> 8;
			    lo = c % 256;
			    byteArray.push(lo);
			    byteArray.push(hi);
			  }

			  return byteArray
			}

			function base64ToBytes (str) {
			  return base64.toByteArray(base64clean(str))
			}

			function blitBuffer (src, dst, offset, length) {
			  let i;
			  for (i = 0; i < length; ++i) {
			    if ((i + offset >= dst.length) || (i >= src.length)) break
			    dst[i + offset] = src[i];
			  }
			  return i
			}

			// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
			// the `instanceof` check but they should be treated as of that type.
			// See: https://github.com/feross/buffer/issues/166
			function isInstance (obj, type) {
			  return obj instanceof type ||
			    (obj != null && obj.constructor != null && obj.constructor.name != null &&
			      obj.constructor.name === type.name)
			}
			function numberIsNaN (obj) {
			  // For IE11 support
			  return obj !== obj // eslint-disable-line no-self-compare
			}

			// Create lookup table for `toString('hex')`
			// See: https://github.com/feross/buffer/issues/219
			const hexSliceLookupTable = (function () {
			  const alphabet = '0123456789abcdef';
			  const table = new Array(256);
			  for (let i = 0; i < 16; ++i) {
			    const i16 = i * 16;
			    for (let j = 0; j < 16; ++j) {
			      table[i16 + j] = alphabet[i] + alphabet[j];
			    }
			  }
			  return table
			})();

			// Return not function with Error if BigInt not supported
			function defineBigIntMethod (fn) {
			  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
			}

			function BufferBigIntNotDefined () {
			  throw new Error('BigInt not supported')
			} 
		} (buffer));

		const Buffer = buffer.Buffer;

		exports.Blob = buffer.Blob;
		exports.BlobOptions = buffer.BlobOptions;
		exports.Buffer = buffer.Buffer;
		exports.File = buffer.File;
		exports.FileOptions = buffer.FileOptions;
		exports.INSPECT_MAX_BYTES = buffer.INSPECT_MAX_BYTES;
		exports.SlowBuffer = buffer.SlowBuffer;
		exports.TranscodeEncoding = buffer.TranscodeEncoding;
		exports.atob = buffer.atob;
		exports.btoa = buffer.btoa;
		exports.constants = buffer.constants;
		exports.default = Buffer;
		exports.isAscii = buffer.isAscii;
		exports.isUtf8 = buffer.isUtf8;
		exports.kMaxLength = buffer.kMaxLength;
		exports.kStringMaxLength = buffer.kStringMaxLength;
		exports.resolveObjectURL = buffer.resolveObjectURL;
		exports.transcode = buffer.transcode;
		
	} (dist));
	return dist;
}

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

var hasRequiredSafeBuffer;

function requireSafeBuffer () {
	if (hasRequiredSafeBuffer) return safeBuffer.exports;
	hasRequiredSafeBuffer = 1;
	(function (module, exports) {
		/* eslint-disable node/no-deprecated-api */
		var buffer = requireDist();
		var Buffer = buffer.Buffer;

		// alternative to using Object.keys for old browsers
		function copyProps (src, dst) {
		  for (var key in src) {
		    dst[key] = src[key];
		  }
		}
		if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
		  module.exports = buffer;
		} else {
		  // Copy properties from require('buffer')
		  copyProps(buffer, exports);
		  exports.Buffer = SafeBuffer;
		}

		function SafeBuffer (arg, encodingOrOffset, length) {
		  return Buffer(arg, encodingOrOffset, length)
		}

		SafeBuffer.prototype = Object.create(Buffer.prototype);

		// Copy static methods from Buffer
		copyProps(Buffer, SafeBuffer);

		SafeBuffer.from = function (arg, encodingOrOffset, length) {
		  if (typeof arg === 'number') {
		    throw new TypeError('Argument must not be a number')
		  }
		  return Buffer(arg, encodingOrOffset, length)
		};

		SafeBuffer.alloc = function (size, fill, encoding) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  var buf = Buffer(size);
		  if (fill !== undefined) {
		    if (typeof encoding === 'string') {
		      buf.fill(fill, encoding);
		    } else {
		      buf.fill(fill);
		    }
		  } else {
		    buf.fill(0);
		  }
		  return buf
		};

		SafeBuffer.allocUnsafe = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return Buffer(size)
		};

		SafeBuffer.allocUnsafeSlow = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return buffer.SlowBuffer(size)
		}; 
	} (safeBuffer, safeBuffer.exports));
	return safeBuffer.exports;
}

var src;
var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src;
	hasRequiredSrc = 1;
	// base-x encoding / decoding
	// Copyright (c) 2018 base-x contributors
	// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
	// Distributed under the MIT software license, see the accompanying
	// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
	// @ts-ignore
	var _Buffer = requireSafeBuffer().Buffer;
	function base (ALPHABET) {
	  if (ALPHABET.length >= 255) { throw new TypeError('Alphabet too long') }
	  var BASE_MAP = new Uint8Array(256);
	  for (var j = 0; j < BASE_MAP.length; j++) {
	    BASE_MAP[j] = 255;
	  }
	  for (var i = 0; i < ALPHABET.length; i++) {
	    var x = ALPHABET.charAt(i);
	    var xc = x.charCodeAt(0);
	    if (BASE_MAP[xc] !== 255) { throw new TypeError(x + ' is ambiguous') }
	    BASE_MAP[xc] = i;
	  }
	  var BASE = ALPHABET.length;
	  var LEADER = ALPHABET.charAt(0);
	  var FACTOR = Math.log(BASE) / Math.log(256); // log(BASE) / log(256), rounded up
	  var iFACTOR = Math.log(256) / Math.log(BASE); // log(256) / log(BASE), rounded up
	  function encode (source) {
	    if (Array.isArray(source) || source instanceof Uint8Array) { source = _Buffer.from(source); }
	    if (!_Buffer.isBuffer(source)) { throw new TypeError('Expected Buffer') }
	    if (source.length === 0) { return '' }
	        // Skip & count leading zeroes.
	    var zeroes = 0;
	    var length = 0;
	    var pbegin = 0;
	    var pend = source.length;
	    while (pbegin !== pend && source[pbegin] === 0) {
	      pbegin++;
	      zeroes++;
	    }
	        // Allocate enough space in big-endian base58 representation.
	    var size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
	    var b58 = new Uint8Array(size);
	        // Process the bytes.
	    while (pbegin !== pend) {
	      var carry = source[pbegin];
	            // Apply "b58 = b58 * 256 + ch".
	      var i = 0;
	      for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
	        carry += (256 * b58[it1]) >>> 0;
	        b58[it1] = (carry % BASE) >>> 0;
	        carry = (carry / BASE) >>> 0;
	      }
	      if (carry !== 0) { throw new Error('Non-zero carry') }
	      length = i;
	      pbegin++;
	    }
	        // Skip leading zeroes in base58 result.
	    var it2 = size - length;
	    while (it2 !== size && b58[it2] === 0) {
	      it2++;
	    }
	        // Translate the result into a string.
	    var str = LEADER.repeat(zeroes);
	    for (; it2 < size; ++it2) { str += ALPHABET.charAt(b58[it2]); }
	    return str
	  }
	  function decodeUnsafe (source) {
	    if (typeof source !== 'string') { throw new TypeError('Expected String') }
	    if (source.length === 0) { return _Buffer.alloc(0) }
	    var psz = 0;
	        // Skip and count leading '1's.
	    var zeroes = 0;
	    var length = 0;
	    while (source[psz] === LEADER) {
	      zeroes++;
	      psz++;
	    }
	        // Allocate enough space in big-endian base256 representation.
	    var size = (((source.length - psz) * FACTOR) + 1) >>> 0; // log(58) / log(256), rounded up.
	    var b256 = new Uint8Array(size);
	        // Process the characters.
	    while (psz < source.length) {
	            // Find code of next character
	      var charCode = source.charCodeAt(psz);
	            // Base map can not be indexed using char code
	      if (charCode > 255) { return }
	            // Decode character
	      var carry = BASE_MAP[charCode];
	            // Invalid character
	      if (carry === 255) { return }
	      var i = 0;
	      for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
	        carry += (BASE * b256[it3]) >>> 0;
	        b256[it3] = (carry % 256) >>> 0;
	        carry = (carry / 256) >>> 0;
	      }
	      if (carry !== 0) { throw new Error('Non-zero carry') }
	      length = i;
	      psz++;
	    }
	        // Skip leading zeroes in b256.
	    var it4 = size - length;
	    while (it4 !== size && b256[it4] === 0) {
	      it4++;
	    }
	    var vch = _Buffer.allocUnsafe(zeroes + (size - it4));
	    vch.fill(0x00, 0, zeroes);
	    var j = zeroes;
	    while (it4 !== size) {
	      vch[j++] = b256[it4++];
	    }
	    return vch
	  }
	  function decode (string) {
	    var buffer = decodeUnsafe(string);
	    if (buffer) { return buffer }
	    throw new Error('Non-base' + BASE + ' character')
	  }
	  return {
	    encode: encode,
	    decodeUnsafe: decodeUnsafe,
	    decode: decode
	  }
	}
	src = base;
	return src;
}

var bech32;
var hasRequiredBech32;

function requireBech32 () {
	if (hasRequiredBech32) return bech32;
	hasRequiredBech32 = 1;
	var ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

	// pre-compute lookup table
	var ALPHABET_MAP = {};
	for (var z = 0; z < ALPHABET.length; z++) {
	  var x = ALPHABET.charAt(z);

	  if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
	  ALPHABET_MAP[x] = z;
	}

	function polymodStep (pre) {
	  var b = pre >> 25;
	  return ((pre & 0x1FFFFFF) << 5) ^
	    (-((b >> 0) & 1) & 0x3b6a57b2) ^
	    (-((b >> 1) & 1) & 0x26508e6d) ^
	    (-((b >> 2) & 1) & 0x1ea119fa) ^
	    (-((b >> 3) & 1) & 0x3d4233dd) ^
	    (-((b >> 4) & 1) & 0x2a1462b3)
	}

	function prefixChk (prefix) {
	  var chk = 1;
	  for (var i = 0; i < prefix.length; ++i) {
	    var c = prefix.charCodeAt(i);
	    if (c < 33 || c > 126) return 'Invalid prefix (' + prefix + ')'

	    chk = polymodStep(chk) ^ (c >> 5);
	  }
	  chk = polymodStep(chk);

	  for (i = 0; i < prefix.length; ++i) {
	    var v = prefix.charCodeAt(i);
	    chk = polymodStep(chk) ^ (v & 0x1f);
	  }
	  return chk
	}

	function encode (prefix, words, LIMIT) {
	  LIMIT = LIMIT || 90;
	  if ((prefix.length + 7 + words.length) > LIMIT) throw new TypeError('Exceeds length limit')

	  prefix = prefix.toLowerCase();

	  // determine chk mod
	  var chk = prefixChk(prefix);
	  if (typeof chk === 'string') throw new Error(chk)

	  var result = prefix + '1';
	  for (var i = 0; i < words.length; ++i) {
	    var x = words[i];
	    if ((x >> 5) !== 0) throw new Error('Non 5-bit word')

	    chk = polymodStep(chk) ^ x;
	    result += ALPHABET.charAt(x);
	  }

	  for (i = 0; i < 6; ++i) {
	    chk = polymodStep(chk);
	  }
	  chk ^= 1;

	  for (i = 0; i < 6; ++i) {
	    var v = (chk >> ((5 - i) * 5)) & 0x1f;
	    result += ALPHABET.charAt(v);
	  }

	  return result
	}

	function __decode (str, LIMIT) {
	  LIMIT = LIMIT || 90;
	  if (str.length < 8) return str + ' too short'
	  if (str.length > LIMIT) return 'Exceeds length limit'

	  // don't allow mixed case
	  var lowered = str.toLowerCase();
	  var uppered = str.toUpperCase();
	  if (str !== lowered && str !== uppered) return 'Mixed-case string ' + str
	  str = lowered;

	  var split = str.lastIndexOf('1');
	  if (split === -1) return 'No separator character for ' + str
	  if (split === 0) return 'Missing prefix for ' + str

	  var prefix = str.slice(0, split);
	  var wordChars = str.slice(split + 1);
	  if (wordChars.length < 6) return 'Data too short'

	  var chk = prefixChk(prefix);
	  if (typeof chk === 'string') return chk

	  var words = [];
	  for (var i = 0; i < wordChars.length; ++i) {
	    var c = wordChars.charAt(i);
	    var v = ALPHABET_MAP[c];
	    if (v === undefined) return 'Unknown character ' + c
	    chk = polymodStep(chk) ^ v;

	    // not in the checksum?
	    if (i + 6 >= wordChars.length) continue
	    words.push(v);
	  }

	  if (chk !== 1) return 'Invalid checksum for ' + str
	  return { prefix: prefix, words: words }
	}

	function decodeUnsafe () {
	  var res = __decode.apply(null, arguments);
	  if (typeof res === 'object') return res
	}

	function decode (str) {
	  var res = __decode.apply(null, arguments);
	  if (typeof res === 'object') return res

	  throw new Error(res)
	}

	function convert (data, inBits, outBits, pad) {
	  var value = 0;
	  var bits = 0;
	  var maxV = (1 << outBits) - 1;

	  var result = [];
	  for (var i = 0; i < data.length; ++i) {
	    value = (value << inBits) | data[i];
	    bits += inBits;

	    while (bits >= outBits) {
	      bits -= outBits;
	      result.push((value >> bits) & maxV);
	    }
	  }

	  if (pad) {
	    if (bits > 0) {
	      result.push((value << (outBits - bits)) & maxV);
	    }
	  } else {
	    if (bits >= inBits) return 'Excess padding'
	    if ((value << (outBits - bits)) & maxV) return 'Non-zero padding'
	  }

	  return result
	}

	function toWordsUnsafe (bytes) {
	  var res = convert(bytes, 8, 5, true);
	  if (Array.isArray(res)) return res
	}

	function toWords (bytes) {
	  var res = convert(bytes, 8, 5, true);
	  if (Array.isArray(res)) return res

	  throw new Error(res)
	}

	function fromWordsUnsafe (words) {
	  var res = convert(words, 5, 8, false);
	  if (Array.isArray(res)) return res
	}

	function fromWords (words) {
	  var res = convert(words, 5, 8, false);
	  if (Array.isArray(res)) return res

	  throw new Error(res)
	}

	bech32 = {
	  decodeUnsafe: decodeUnsafe,
	  decode: decode,
	  encode: encode,
	  toWordsUnsafe: toWordsUnsafe,
	  toWords: toWords,
	  fromWordsUnsafe: fromWordsUnsafe,
	  fromWords: fromWords
	};
	return bech32;
}

var _public = {};

var hasRequired_public;

function require_public () {
	if (hasRequired_public) return _public;
	hasRequired_public = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.NativeScriptHashDisplayFormat = exports.NativeScriptType = exports.TransactionSigningMode = exports.VoteOption = exports.VoterType = exports.TxRequiredSignerType = exports.CIP36VoteDelegationType = exports.CIP36VoteRegistrationFormat = exports.TxAuxiliaryDataType = exports.TxAuxiliaryDataSupplementType = exports.DRepParamsType = exports.CredentialParamsType = exports.PoolRewardAccountType = exports.PoolOwnerType = exports.PoolKeyType = exports.TxOutputDestinationType = exports.TxOutputFormat = exports.DatumType = exports.MessageAddressFieldType = exports.HARDENED = exports.CertificateType = exports.AddressType = void 0;
		(function (AddressType) {
		    AddressType[AddressType["BASE_PAYMENT_KEY_STAKE_KEY"] = 0] = "BASE_PAYMENT_KEY_STAKE_KEY";
		    AddressType[AddressType["BASE_PAYMENT_SCRIPT_STAKE_KEY"] = 1] = "BASE_PAYMENT_SCRIPT_STAKE_KEY";
		    AddressType[AddressType["BASE_PAYMENT_KEY_STAKE_SCRIPT"] = 2] = "BASE_PAYMENT_KEY_STAKE_SCRIPT";
		    AddressType[AddressType["BASE_PAYMENT_SCRIPT_STAKE_SCRIPT"] = 3] = "BASE_PAYMENT_SCRIPT_STAKE_SCRIPT";
		    AddressType[AddressType["POINTER_KEY"] = 4] = "POINTER_KEY";
		    AddressType[AddressType["POINTER_SCRIPT"] = 5] = "POINTER_SCRIPT";
		    AddressType[AddressType["ENTERPRISE_KEY"] = 6] = "ENTERPRISE_KEY";
		    AddressType[AddressType["ENTERPRISE_SCRIPT"] = 7] = "ENTERPRISE_SCRIPT";
		    AddressType[AddressType["BYRON"] = 8] = "BYRON";
		    AddressType[AddressType["REWARD_KEY"] = 14] = "REWARD_KEY";
		    AddressType[AddressType["REWARD_SCRIPT"] = 15] = "REWARD_SCRIPT";
		})(exports.AddressType || (exports.AddressType = {}));
		(function (CertificateType) {
		    CertificateType[CertificateType["STAKE_REGISTRATION"] = 0] = "STAKE_REGISTRATION";
		    CertificateType[CertificateType["STAKE_DEREGISTRATION"] = 1] = "STAKE_DEREGISTRATION";
		    CertificateType[CertificateType["STAKE_DELEGATION"] = 2] = "STAKE_DELEGATION";
		    CertificateType[CertificateType["STAKE_POOL_REGISTRATION"] = 3] = "STAKE_POOL_REGISTRATION";
		    CertificateType[CertificateType["STAKE_POOL_RETIREMENT"] = 4] = "STAKE_POOL_RETIREMENT";
		    CertificateType[CertificateType["STAKE_REGISTRATION_CONWAY"] = 7] = "STAKE_REGISTRATION_CONWAY";
		    CertificateType[CertificateType["STAKE_DEREGISTRATION_CONWAY"] = 8] = "STAKE_DEREGISTRATION_CONWAY";
		    CertificateType[CertificateType["VOTE_DELEGATION"] = 9] = "VOTE_DELEGATION";
		    CertificateType[CertificateType["AUTHORIZE_COMMITTEE_HOT"] = 14] = "AUTHORIZE_COMMITTEE_HOT";
		    CertificateType[CertificateType["RESIGN_COMMITTEE_COLD"] = 15] = "RESIGN_COMMITTEE_COLD";
		    CertificateType[CertificateType["DREP_REGISTRATION"] = 16] = "DREP_REGISTRATION";
		    CertificateType[CertificateType["DREP_DEREGISTRATION"] = 17] = "DREP_DEREGISTRATION";
		    CertificateType[CertificateType["DREP_UPDATE"] = 18] = "DREP_UPDATE";
		})(exports.CertificateType || (exports.CertificateType = {}));
		exports.HARDENED = 0x80000000;
		(function (MessageAddressFieldType) {
		    MessageAddressFieldType["ADDRESS"] = "address";
		    MessageAddressFieldType["KEY_HASH"] = "key_hash";
		})(exports.MessageAddressFieldType || (exports.MessageAddressFieldType = {}));
		(function (DatumType) {
		    DatumType[DatumType["HASH"] = 0] = "HASH";
		    DatumType[DatumType["INLINE"] = 1] = "INLINE";
		})(exports.DatumType || (exports.DatumType = {}));
		(function (TxOutputFormat) {
		    TxOutputFormat[TxOutputFormat["ARRAY_LEGACY"] = 0] = "ARRAY_LEGACY";
		    TxOutputFormat[TxOutputFormat["MAP_BABBAGE"] = 1] = "MAP_BABBAGE";
		})(exports.TxOutputFormat || (exports.TxOutputFormat = {}));
		(function (TxOutputDestinationType) {
		    TxOutputDestinationType["THIRD_PARTY"] = "third_party";
		    TxOutputDestinationType["DEVICE_OWNED"] = "device_owned";
		})(exports.TxOutputDestinationType || (exports.TxOutputDestinationType = {}));
		(function (PoolKeyType) {
		    PoolKeyType["THIRD_PARTY"] = "third_party";
		    PoolKeyType["DEVICE_OWNED"] = "device_owned";
		})(exports.PoolKeyType || (exports.PoolKeyType = {}));
		(function (PoolOwnerType) {
		    PoolOwnerType["THIRD_PARTY"] = "third_party";
		    PoolOwnerType["DEVICE_OWNED"] = "device_owned";
		})(exports.PoolOwnerType || (exports.PoolOwnerType = {}));
		(function (PoolRewardAccountType) {
		    PoolRewardAccountType["THIRD_PARTY"] = "third_party";
		    PoolRewardAccountType["DEVICE_OWNED"] = "device_owned";
		})(exports.PoolRewardAccountType || (exports.PoolRewardAccountType = {}));
		(function (CredentialParamsType) {
		    CredentialParamsType[CredentialParamsType["KEY_PATH"] = 0] = "KEY_PATH";
		    CredentialParamsType[CredentialParamsType["KEY_HASH"] = 1] = "KEY_HASH";
		    CredentialParamsType[CredentialParamsType["SCRIPT_HASH"] = 2] = "SCRIPT_HASH";
		})(exports.CredentialParamsType || (exports.CredentialParamsType = {}));
		(function (DRepParamsType) {
		    DRepParamsType[DRepParamsType["KEY_PATH"] = 0] = "KEY_PATH";
		    DRepParamsType[DRepParamsType["KEY_HASH"] = 1] = "KEY_HASH";
		    DRepParamsType[DRepParamsType["SCRIPT_HASH"] = 2] = "SCRIPT_HASH";
		    DRepParamsType[DRepParamsType["ABSTAIN"] = 3] = "ABSTAIN";
		    DRepParamsType[DRepParamsType["NO_CONFIDENCE"] = 4] = "NO_CONFIDENCE";
		})(exports.DRepParamsType || (exports.DRepParamsType = {}));
		(function (TxAuxiliaryDataSupplementType) {
		    TxAuxiliaryDataSupplementType["CIP36_REGISTRATION"] = "cip36_voting_registration";
		})(exports.TxAuxiliaryDataSupplementType || (exports.TxAuxiliaryDataSupplementType = {}));
		(function (TxAuxiliaryDataType) {
		    TxAuxiliaryDataType["ARBITRARY_HASH"] = "arbitrary_hash";
		    TxAuxiliaryDataType["CIP36_REGISTRATION"] = "cip36_registration";
		})(exports.TxAuxiliaryDataType || (exports.TxAuxiliaryDataType = {}));
		(function (CIP36VoteRegistrationFormat) {
		    CIP36VoteRegistrationFormat["CIP_15"] = "cip_15";
		    CIP36VoteRegistrationFormat["CIP_36"] = "cip_36";
		})(exports.CIP36VoteRegistrationFormat || (exports.CIP36VoteRegistrationFormat = {}));
		(function (CIP36VoteDelegationType) {
		    CIP36VoteDelegationType["PATH"] = "cip36_vote_key_path";
		    CIP36VoteDelegationType["KEY"] = "cip36_vote_key_keyHex";
		})(exports.CIP36VoteDelegationType || (exports.CIP36VoteDelegationType = {}));
		(function (TxRequiredSignerType) {
		    TxRequiredSignerType["PATH"] = "required_signer_path";
		    TxRequiredSignerType["HASH"] = "required_signer_hash";
		})(exports.TxRequiredSignerType || (exports.TxRequiredSignerType = {}));
		(function (VoterType) {
		    VoterType[VoterType["COMMITTEE_KEY_HASH"] = 0] = "COMMITTEE_KEY_HASH";
		    VoterType[VoterType["COMMITTEE_KEY_PATH"] = 100] = "COMMITTEE_KEY_PATH";
		    VoterType[VoterType["COMMITTEE_SCRIPT_HASH"] = 1] = "COMMITTEE_SCRIPT_HASH";
		    VoterType[VoterType["DREP_KEY_HASH"] = 2] = "DREP_KEY_HASH";
		    VoterType[VoterType["DREP_KEY_PATH"] = 102] = "DREP_KEY_PATH";
		    VoterType[VoterType["DREP_SCRIPT_HASH"] = 3] = "DREP_SCRIPT_HASH";
		    VoterType[VoterType["STAKE_POOL_KEY_HASH"] = 4] = "STAKE_POOL_KEY_HASH";
		    VoterType[VoterType["STAKE_POOL_KEY_PATH"] = 104] = "STAKE_POOL_KEY_PATH";
		})(exports.VoterType || (exports.VoterType = {}));
		(function (VoteOption) {
		    VoteOption[VoteOption["NO"] = 0] = "NO";
		    VoteOption[VoteOption["YES"] = 1] = "YES";
		    VoteOption[VoteOption["ABSTAIN"] = 2] = "ABSTAIN";
		})(exports.VoteOption || (exports.VoteOption = {}));
		(function (TransactionSigningMode) {
		    TransactionSigningMode["ORDINARY_TRANSACTION"] = "ordinary_transaction";
		    TransactionSigningMode["MULTISIG_TRANSACTION"] = "multisig_transaction";
		    TransactionSigningMode["POOL_REGISTRATION_AS_OWNER"] = "pool_registration_as_owner";
		    TransactionSigningMode["POOL_REGISTRATION_AS_OPERATOR"] = "pool_registration_as_operator";
		    TransactionSigningMode["PLUTUS_TRANSACTION"] = "plutus_transaction";
		})(exports.TransactionSigningMode || (exports.TransactionSigningMode = {}));
		(function (NativeScriptType) {
		    NativeScriptType["PUBKEY_DEVICE_OWNED"] = "pubkey_device_owned";
		    NativeScriptType["PUBKEY_THIRD_PARTY"] = "pubkey_third_party";
		    NativeScriptType["ALL"] = "all";
		    NativeScriptType["ANY"] = "any";
		    NativeScriptType["N_OF_K"] = "n_of_k";
		    NativeScriptType["INVALID_BEFORE"] = "invalid_before";
		    NativeScriptType["INVALID_HEREAFTER"] = "invalid_hereafter";
		})(exports.NativeScriptType || (exports.NativeScriptType = {}));
		(function (NativeScriptHashDisplayFormat) {
		    NativeScriptHashDisplayFormat["BECH32"] = "bech32";
		    NativeScriptHashDisplayFormat["POLICY_ID"] = "policyId";
		})(exports.NativeScriptHashDisplayFormat || (exports.NativeScriptHashDisplayFormat = {}));
		
	} (_public));
	return _public;
}

var assert = {};

var hasRequiredAssert;

function requireAssert () {
	if (hasRequiredAssert) return assert;
	hasRequiredAssert = 1;
	Object.defineProperty(assert, "__esModule", { value: true });
	assert.unreachable = assert.assert = void 0;
	const errorBase_1 = requireErrorBase();
	function assert$1(cond, errMsg) {
	    const msg = errMsg ? `: ${errMsg}` : '';
	    if (!cond)
	        throw new errorBase_1.ErrorBase(`Assertion failed${msg}`);
	}
	assert.assert = assert$1;
	function unreachable(_val) {
	    assert$1(false, 'Unreachable code hit');
	}
	assert.unreachable = unreachable;
	
	return assert;
}

var parse = {};

var constants = {};

var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;
	Object.defineProperty(constants, "__esModule", { value: true });
	constants.TOKENS_IN_GROUP_MAX = constants.ASSET_GROUPS_MAX = constants.POOL_REGISTRATION_RELAYS_MAX = constants.POOL_REGISTRATION_OWNERS_MAX = constants.MAX_LOVELACE_SUPPLY_STR = void 0;
	constants.MAX_LOVELACE_SUPPLY_STR = '45 000 000 000.000000'.replace(/[ .]/, '');
	constants.POOL_REGISTRATION_OWNERS_MAX = 1000;
	constants.POOL_REGISTRATION_RELAYS_MAX = 1000;
	constants.ASSET_GROUPS_MAX = 1000;
	constants.TOKENS_IN_GROUP_MAX = 1000;
	
	return constants;
}

var internal = {};

var hasRequiredInternal;

function requireInternal () {
	if (hasRequiredInternal) return internal;
	hasRequiredInternal = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.NATIVE_SCRIPT_HASH_LENGTH = exports.ASSET_NAME_LENGTH_MAX = exports.CVOTE_PUBLIC_KEY_LENGTH = exports.TOKEN_POLICY_LENGTH = exports.MAX_DNS_NAME_LENGTH = exports.MAX_URL_LENGTH = exports.ANCHOR_HASH_LENGTH = exports.DATUM_HASH_LENGTH = exports.SCRIPT_DATA_HASH_LENGTH = exports.ED25519_SIGNATURE_LENGTH = exports.REWARD_ACCOUNT_HEX_LENGTH = exports.VRF_KEY_HASH_LENGTH = exports.KES_PUBLIC_KEY_LENGTH = exports.AUXILIARY_DATA_HASH_LENGTH = exports.TX_HASH_LENGTH = exports.SCRIPT_HASH_LENGTH = exports.KEY_HASH_LENGTH = exports.PUBLIC_KEY_LENGTH = exports.EXTENDED_PUBLIC_KEY_LENGTH = exports.NativeScriptHashDisplayFormat = exports.TxOutputFormat = exports.TxOutputDestinationType = exports.CIP36VoteDelegationType = exports.TxAuxiliaryDataType = exports.TransactionSigningMode = exports.PoolRewardAccountType = exports.PoolOwnerType = exports.PoolKeyType = exports.NativeScriptType = exports.DatumType = exports.CertificateType = exports.AddressType = void 0;
		const public_1 = require_public();
		Object.defineProperty(exports, "AddressType", { enumerable: true, get: function () { return public_1.AddressType; } });
		Object.defineProperty(exports, "CertificateType", { enumerable: true, get: function () { return public_1.CertificateType; } });
		Object.defineProperty(exports, "CIP36VoteDelegationType", { enumerable: true, get: function () { return public_1.CIP36VoteDelegationType; } });
		Object.defineProperty(exports, "DatumType", { enumerable: true, get: function () { return public_1.DatumType; } });
		Object.defineProperty(exports, "NativeScriptType", { enumerable: true, get: function () { return public_1.NativeScriptType; } });
		Object.defineProperty(exports, "PoolKeyType", { enumerable: true, get: function () { return public_1.PoolKeyType; } });
		Object.defineProperty(exports, "PoolOwnerType", { enumerable: true, get: function () { return public_1.PoolOwnerType; } });
		Object.defineProperty(exports, "PoolRewardAccountType", { enumerable: true, get: function () { return public_1.PoolRewardAccountType; } });
		Object.defineProperty(exports, "TransactionSigningMode", { enumerable: true, get: function () { return public_1.TransactionSigningMode; } });
		Object.defineProperty(exports, "TxAuxiliaryDataType", { enumerable: true, get: function () { return public_1.TxAuxiliaryDataType; } });
		Object.defineProperty(exports, "TxOutputDestinationType", { enumerable: true, get: function () { return public_1.TxOutputDestinationType; } });
		Object.defineProperty(exports, "TxOutputFormat", { enumerable: true, get: function () { return public_1.TxOutputFormat; } });
		var public_2 = require_public();
		Object.defineProperty(exports, "NativeScriptHashDisplayFormat", { enumerable: true, get: function () { return public_2.NativeScriptHashDisplayFormat; } });
		exports.EXTENDED_PUBLIC_KEY_LENGTH = 64;
		exports.PUBLIC_KEY_LENGTH = 32;
		exports.KEY_HASH_LENGTH = 28;
		exports.SCRIPT_HASH_LENGTH = 28;
		exports.TX_HASH_LENGTH = 32;
		exports.AUXILIARY_DATA_HASH_LENGTH = 32;
		exports.KES_PUBLIC_KEY_LENGTH = 32;
		exports.VRF_KEY_HASH_LENGTH = 32;
		exports.REWARD_ACCOUNT_HEX_LENGTH = 29;
		exports.ED25519_SIGNATURE_LENGTH = 64;
		exports.SCRIPT_DATA_HASH_LENGTH = 32;
		exports.DATUM_HASH_LENGTH = 32;
		exports.ANCHOR_HASH_LENGTH = 32;
		exports.MAX_URL_LENGTH = 128;
		exports.MAX_DNS_NAME_LENGTH = 128;
		exports.TOKEN_POLICY_LENGTH = 28;
		exports.CVOTE_PUBLIC_KEY_LENGTH = 32;
		exports.ASSET_NAME_LENGTH_MAX = 32;
		exports.NATIVE_SCRIPT_HASH_LENGTH = 28;
		
	} (internal));
	return internal;
}

var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse;
	hasRequiredParse = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.parseAnchor = exports.parseCredential = exports.parseCoin = exports.parseIntFromStr = exports.parseBIP32Path = exports.parseUint8_t = exports.parseUint16_t = exports.parseUint32_t = exports.parseUint64_str = exports.parseInt64_str = exports.parseHexStringOfLength = exports.parseHexString = exports.parseAscii = exports.validate = exports.isInt64Bigint = exports.isInt64Number = exports.isInt64str = exports.isIntStr = exports.isUint64Bigint = exports.isUint64Number = exports.isUint64str = exports.isUintStr = exports.isValidPath = exports.isHexStringOfLength = exports.isHexString = exports.isUint8 = exports.isUint16 = exports.isUint32 = exports.isBuffer = exports.isArray = exports.isInteger = exports.isString = exports.MAX_INT_64_STR = exports.MIN_INT_64_STR = exports.MAX_UINT_64_STR = void 0;
		const constants_1 = requireConstants();
		const index_1 = requireErrors();
		const internal_1 = requireInternal();
		const public_1 = require_public();
		const assert_1 = requireAssert();
		exports.MAX_UINT_64_STR = '18446744073709551615';
		exports.MIN_INT_64_STR = '-9223372036854775808';
		exports.MAX_INT_64_STR = '9223372036854775807';
		const isString = (data) => typeof data === 'string';
		exports.isString = isString;
		const isInteger = (data) => Number.isInteger(data);
		exports.isInteger = isInteger;
		const isArray = (data) => Array.isArray(data);
		exports.isArray = isArray;
		const isBuffer = (data) => Buffer$1.isBuffer(data);
		exports.isBuffer = isBuffer;
		const isUint32 = (data) => (0, exports.isInteger)(data) && data >= 0 && data <= 4294967295;
		exports.isUint32 = isUint32;
		const isUint16 = (data) => (0, exports.isInteger)(data) && data >= 0 && data <= 65535;
		exports.isUint16 = isUint16;
		const isUint8 = (data) => (0, exports.isInteger)(data) && data >= 0 && data <= 255;
		exports.isUint8 = isUint8;
		const isHexString = (data) => (0, exports.isString)(data) && data.length % 2 === 0 && /^[0-9a-fA-F]*$/.test(data);
		exports.isHexString = isHexString;
		const isHexStringOfLength = (data, expectedByteLength) => (0, exports.isHexString)(data) && data.length === expectedByteLength * 2;
		exports.isHexStringOfLength = isHexStringOfLength;
		const isValidPath = (data) => (0, exports.isArray)(data) && data.every((x) => (0, exports.isUint32)(x)) && data.length <= 5;
		exports.isValidPath = isValidPath;
		const isUintStr = (data, constraints) => {
		    var _a, _b;
		    const min = (_a = constraints.min) !== null && _a !== void 0 ? _a : '0';
		    const max = (_b = constraints.max) !== null && _b !== void 0 ? _b : exports.MAX_UINT_64_STR;
		    return ((0, exports.isString)(data) &&
		        /^[0-9]*$/.test(data) &&
		        data.length > 0 &&
		        data.length <= max.length &&
		        (data.length === 1 || data[0] !== '0') &&
		        (data.length < max.length ||
		            data <= max) &&
		        (data.length > min.length ||
		            data >= min));
		};
		exports.isUintStr = isUintStr;
		const isUint64str = (data) => (0, exports.isUintStr)(data, {});
		exports.isUint64str = isUint64str;
		const isUint64Number = (data) => (0, exports.isInteger)(data) && data >= 0 && data <= Number.MAX_SAFE_INTEGER;
		exports.isUint64Number = isUint64Number;
		const isUint64Bigint = (data) => typeof data === 'bigint' && (0, exports.isUint64str)(data.toString());
		exports.isUint64Bigint = isUint64Bigint;
		const isIntStr = (data, constraints) => {
		    var _a, _b;
		    const min = (_a = constraints.min) !== null && _a !== void 0 ? _a : exports.MIN_INT_64_STR;
		    const max = (_b = constraints.max) !== null && _b !== void 0 ? _b : exports.MAX_INT_64_STR;
		    const hasValidFormat = (0, exports.isString)(data) &&
		        /^-?[0-9]*$/.test(data) &&
		        data.length > 0;
		    const isValidNegativeNumber = (0, exports.isString)(data) &&
		        data.startsWith('-') &&
		        (data.length === 2 || data[1] !== '0') &&
		        (data.length < min.length || data <= min);
		    const isValidPositiveNumber = (0, exports.isString)(data) &&
		        !data.startsWith('-') &&
		        (data.length === 1 || data[0] !== '0') &&
		        (data.length < max.length || data <= max);
		    return hasValidFormat && (isValidNegativeNumber || isValidPositiveNumber);
		};
		exports.isIntStr = isIntStr;
		const isInt64str = (data) => (0, exports.isIntStr)(data, {});
		exports.isInt64str = isInt64str;
		const isInt64Number = (data) => (0, exports.isInteger)(data) &&
		    data >= Number.MIN_SAFE_INTEGER &&
		    data <= Number.MAX_SAFE_INTEGER;
		exports.isInt64Number = isInt64Number;
		const isInt64Bigint = (data) => typeof data === 'bigint' && (0, exports.isInt64str)(data.toString());
		exports.isInt64Bigint = isInt64Bigint;
		function validate(cond, errMsg) {
		    if (!cond)
		        throw new index_1.InvalidData(errMsg);
		}
		exports.validate = validate;
		function parseAscii(str, errMsg) {
		    validate((0, exports.isString)(str), errMsg);
		    validate(str.split('').every((c) => c.charCodeAt(0) >= 32 && c.charCodeAt(0) <= 126), errMsg);
		    return str;
		}
		exports.parseAscii = parseAscii;
		function parseHexString(str, errMsg) {
		    validate((0, exports.isHexString)(str), errMsg);
		    return str;
		}
		exports.parseHexString = parseHexString;
		function parseHexStringOfLength(str, length, errMsg) {
		    validate((0, exports.isHexStringOfLength)(str, length), errMsg);
		    return str;
		}
		exports.parseHexStringOfLength = parseHexStringOfLength;
		function parseInt64_str(val, constraints, errMsg) {
		    switch (typeof val) {
		        case 'string':
		            validate((0, exports.isInt64str)(val) && (0, exports.isIntStr)(val, constraints), errMsg);
		            return val;
		        case 'number':
		            validate((0, exports.isInt64Number)(val) && (0, exports.isIntStr)(val.toString(), constraints), errMsg);
		            return val.toString();
		        case 'bigint':
		            validate((0, exports.isInt64Bigint)(val) && (0, exports.isIntStr)(val.toString(), constraints), errMsg);
		            return val.toString();
		        default:
		            validate(false, errMsg);
		    }
		}
		exports.parseInt64_str = parseInt64_str;
		function parseUint64_str(val, constraints, errMsg) {
		    switch (typeof val) {
		        case 'string':
		            validate((0, exports.isUint64str)(val) && (0, exports.isUintStr)(val, constraints), errMsg);
		            return val;
		        case 'number':
		            validate((0, exports.isUint64Number)(val) && (0, exports.isUintStr)(val.toString(), constraints), errMsg);
		            return val.toString();
		        case 'bigint':
		            validate((0, exports.isUint64Bigint)(val) && (0, exports.isUintStr)(val.toString(), constraints), errMsg);
		            return val.toString();
		        default:
		            validate(false, errMsg);
		    }
		}
		exports.parseUint64_str = parseUint64_str;
		function parseUint32_t(value, errMsg) {
		    validate((0, exports.isUint32)(value), errMsg);
		    return value;
		}
		exports.parseUint32_t = parseUint32_t;
		function parseUint16_t(value, errMsg) {
		    validate((0, exports.isUint16)(value), errMsg);
		    return value;
		}
		exports.parseUint16_t = parseUint16_t;
		function parseUint8_t(value, errMsg) {
		    validate((0, exports.isUint8)(value), errMsg);
		    return value;
		}
		exports.parseUint8_t = parseUint8_t;
		function parseBIP32Path(value, errMsg) {
		    validate((0, exports.isValidPath)(value), errMsg);
		    return value;
		}
		exports.parseBIP32Path = parseBIP32Path;
		function parseIntFromStr(str, errMsg) {
		    validate((0, exports.isString)(str), errMsg);
		    const i = parseInt(str, 10);
		    validate(`${i}` === str, errMsg);
		    validate(!isNaN(i), errMsg);
		    validate((0, exports.isInteger)(i), errMsg);
		    return i;
		}
		exports.parseIntFromStr = parseIntFromStr;
		function parseCoin(coin, errMsg) {
		    return parseUint64_str(coin, { max: constants_1.MAX_LOVELACE_SUPPLY_STR }, errMsg);
		}
		exports.parseCoin = parseCoin;
		function parseCredential(credential, errMsg) {
		    switch (credential.type) {
		        case public_1.CredentialParamsType.KEY_PATH:
		            return {
		                type: 0,
		                path: parseBIP32Path(credential.keyPath, errMsg),
		            };
		        case public_1.CredentialParamsType.KEY_HASH:
		            return {
		                type: 2,
		                keyHashHex: parseHexStringOfLength(credential.keyHashHex, internal_1.KEY_HASH_LENGTH, errMsg),
		            };
		        case public_1.CredentialParamsType.SCRIPT_HASH:
		            return {
		                type: 1,
		                scriptHashHex: parseHexStringOfLength(credential.scriptHashHex, internal_1.SCRIPT_HASH_LENGTH, errMsg),
		            };
		        default:
		            (0, assert_1.unreachable)(credential);
		    }
		}
		exports.parseCredential = parseCredential;
		function parseAnchor(params) {
		    const url = parseAscii(params.url, index_1.InvalidDataReason.ANCHOR_INVALID_URL);
		    validate(url.length <= internal_1.MAX_URL_LENGTH, index_1.InvalidDataReason.ANCHOR_INVALID_URL);
		    const hashHex = parseHexStringOfLength(params.hashHex, internal_1.ANCHOR_HASH_LENGTH, index_1.InvalidDataReason.ANCHOR_INVALID_HASH);
		    return {
		        url,
		        hashHex,
		        __brand: 'anchor',
		    };
		}
		exports.parseAnchor = parseAnchor;
		
	} (parse));
	return parse;
}

var hasRequiredAddress$1;

function requireAddress$1 () {
	if (hasRequiredAddress$1) return address$1;
	hasRequiredAddress$1 = 1;
	var __importDefault = (address$1 && address$1.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(address$1, "__esModule", { value: true });
	address$1.bech32_decodeAddress = address$1.bech32_encodeAddress = address$1.base58_decode = address$1.base58_encode = address$1.str_to_path = void 0;
	const base_x_1 = __importDefault(requireSrc());
	const bech32_1 = __importDefault(requireBech32());
	const errors_1 = requireErrors();
	const public_1 = require_public();
	const assert_1 = requireAssert();
	const parse_1 = requireParse();
	const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
	const bs58 = (0, base_x_1.default)(BASE58_ALPHABET);
	const TESTNET_NETWORK_ID = 0x00;
	function parseBIP32Index(str, errMsg) {
	    let base = 0;
	    if (str.endsWith("'")) {
	        str = str.slice(0, -1);
	        base = public_1.HARDENED;
	    }
	    const i = (0, parse_1.parseIntFromStr)(str, errMsg);
	    (0, parse_1.validate)(i >= 0, errMsg);
	    (0, parse_1.validate)(i < public_1.HARDENED, errMsg);
	    return base + i;
	}
	function str_to_path(data) {
	    const errMsg = errors_1.InvalidDataReason.INVALID_PATH;
	    (0, parse_1.validate)((0, parse_1.isString)(data), errMsg);
	    (0, parse_1.validate)(data.length > 0, errMsg);
	    return data.split('/').map((x) => {
	        return parseBIP32Index(x, errMsg);
	    });
	}
	address$1.str_to_path = str_to_path;
	function base58_encode(data) {
	    (0, assert_1.assert)((0, parse_1.isBuffer)(data), 'invalid buffer');
	    return bs58.encode(data);
	}
	address$1.base58_encode = base58_encode;
	const isValidBase58 = (data) => (0, parse_1.isString)(data) && [...data].every((c) => BASE58_ALPHABET.includes(c));
	function base58_decode(data) {
	    (0, assert_1.assert)(isValidBase58(data), 'invalid base58 string');
	    return bs58.decode(data);
	}
	address$1.base58_decode = base58_decode;
	function getShelleyAddressPrefix(data) {
	    let result = '';
	    const addressType = (data[0] & 0b11110000) >> 4;
	    switch (addressType) {
	        case public_1.AddressType.REWARD_KEY:
	        case public_1.AddressType.REWARD_SCRIPT:
	            result = 'stake';
	            break;
	        default:
	            result = 'addr';
	    }
	    const networkId = data[0] & 0b00001111;
	    if (networkId === TESTNET_NETWORK_ID) {
	        result += '_test';
	    }
	    return result;
	}
	function bech32_encodeAddress(data) {
	    (0, assert_1.assert)((0, parse_1.isBuffer)(data), 'invalid buffer');
	    const data5bit = bech32_1.default.toWords(data);
	    const MAX_HUMAN_ADDRESS_LENGTH = 150;
	    return bech32_1.default.encode(getShelleyAddressPrefix(data), data5bit, MAX_HUMAN_ADDRESS_LENGTH);
	}
	address$1.bech32_encodeAddress = bech32_encodeAddress;
	function bech32_decodeAddress(data) {
	    const { words } = bech32_1.default.decode(data, 1000);
	    return Buffer$1.from(bech32_1.default.fromWords(words));
	}
	address$1.bech32_decodeAddress = bech32_decodeAddress;
	
	return address$1;
}

var serialize = {};

var int64Buffer = {};

var hasRequiredInt64Buffer;

function requireInt64Buffer () {
	if (hasRequiredInt64Buffer) return int64Buffer;
	hasRequiredInt64Buffer = 1;
	(function (exports) {

		!function(exports) {
		  // constants

		  var UNDEFINED = "undefined";
		  var BUFFER = (UNDEFINED !== typeof Buffer$1) && Buffer$1;
		  var UINT8ARRAY = (UNDEFINED !== typeof Uint8Array) && Uint8Array;
		  var ARRAYBUFFER = (UNDEFINED !== typeof ArrayBuffer) && ArrayBuffer;
		  var ZERO = [0, 0, 0, 0, 0, 0, 0, 0];
		  var isArray = Array.isArray || _isArray;
		  var BIT32 = 4294967296;
		  var BIT24 = 16777216;

		  // storage class

		  var storage; // Array;

		  // generate classes

		  factory("Uint64BE", true, true);
		  factory("Int64BE", true, false);
		  factory("Uint64LE", false, true);
		  factory("Int64LE", false, false);

		  // class factory

		  function factory(name, bigendian, unsigned) {
		    var posH = bigendian ? 0 : 4;
		    var posL = bigendian ? 4 : 0;
		    var pos0 = bigendian ? 0 : 3;
		    var pos1 = bigendian ? 1 : 2;
		    var pos2 = bigendian ? 2 : 1;
		    var pos3 = bigendian ? 3 : 0;
		    var fromPositive = bigendian ? fromPositiveBE : fromPositiveLE;
		    var fromNegative = bigendian ? fromNegativeBE : fromNegativeLE;
		    var proto = Int64.prototype;
		    var isName = "is" + name;
		    var _isInt64 = "_" + isName;

		    // properties
		    proto.buffer = void 0;
		    proto.offset = 0;
		    proto[_isInt64] = true;

		    // methods
		    proto.toNumber = toNumber;
		    proto.toString = toString;
		    proto.toJSON = toNumber;
		    proto.toArray = toArray;

		    // add .toBuffer() method only when Buffer available
		    if (BUFFER) proto.toBuffer = toBuffer;

		    // add .toArrayBuffer() method only when Uint8Array available
		    if (UINT8ARRAY) proto.toArrayBuffer = toArrayBuffer;

		    // isUint64BE, isInt64BE
		    Int64[isName] = isInt64;

		    // CommonJS
		    exports[name] = Int64;

		    return Int64;

		    // constructor
		    function Int64(buffer, offset, value, raddix) {
		      if (!(this instanceof Int64)) return new Int64(buffer, offset, value, raddix);
		      return init(this, buffer, offset, value, raddix);
		    }

		    // isUint64BE, isInt64BE
		    function isInt64(b) {
		      return !!(b && b[_isInt64]);
		    }

		    // initializer
		    function init(that, buffer, offset, value, raddix) {
		      if (UINT8ARRAY && ARRAYBUFFER) {
		        if (buffer instanceof ARRAYBUFFER) buffer = new UINT8ARRAY(buffer);
		        if (value instanceof ARRAYBUFFER) value = new UINT8ARRAY(value);
		      }

		      // Int64BE() style
		      if (!buffer && !offset && !value && !storage) {
		        // shortcut to initialize with zero
		        that.buffer = newArray(ZERO, 0);
		        return;
		      }

		      // Int64BE(value, raddix) style
		      if (!isValidBuffer(buffer, offset)) {
		        var _storage = storage || Array;
		        raddix = offset;
		        value = buffer;
		        offset = 0;
		        buffer = (storage === BUFFER) ? BUFFER.alloc(8) : new _storage(8);
		      }

		      that.buffer = buffer;
		      that.offset = offset |= 0;

		      // Int64BE(buffer, offset) style
		      if (UNDEFINED === typeof value) return;

		      // Int64BE(buffer, offset, value, raddix) style
		      if ("string" === typeof value) {
		        fromString(buffer, offset, value, raddix || 10);
		      } else if (isValidBuffer(value, raddix)) {
		        fromArray(buffer, offset, value, raddix);
		      } else if ("number" === typeof raddix) {
		        writeInt32(buffer, offset + posH, value); // high
		        writeInt32(buffer, offset + posL, raddix); // low
		      } else if (value > 0) {
		        fromPositive(buffer, offset, value); // positive
		      } else if (value < 0) {
		        fromNegative(buffer, offset, value); // negative
		      } else {
		        fromArray(buffer, offset, ZERO, 0); // zero, NaN and others
		      }
		    }

		    function fromString(buffer, offset, str, raddix) {
		      var pos = 0;
		      var len = str.length;
		      var high = 0;
		      var low = 0;
		      if (str[0] === "-") pos++;
		      var sign = pos;
		      while (pos < len) {
		        var chr = parseInt(str[pos++], raddix);
		        if (!(chr >= 0)) break; // NaN
		        low = low * raddix + chr;
		        high = high * raddix + Math.floor(low / BIT32);
		        low %= BIT32;
		      }
		      if (sign) {
		        high = ~high;
		        if (low) {
		          low = BIT32 - low;
		        } else {
		          high++;
		        }
		      }
		      writeInt32(buffer, offset + posH, high);
		      writeInt32(buffer, offset + posL, low);
		    }

		    function toNumber() {
		      var buffer = this.buffer;
		      var offset = this.offset;
		      var high = readInt32(buffer, offset + posH);
		      var low = readInt32(buffer, offset + posL);
		      if (!unsigned) high |= 0; // a trick to get signed
		      return high ? (high * BIT32 + low) : low;
		    }

		    function toString(radix) {
		      var buffer = this.buffer;
		      var offset = this.offset;
		      var high = readInt32(buffer, offset + posH);
		      var low = readInt32(buffer, offset + posL);
		      var str = "";
		      var sign = !unsigned && (high & 0x80000000);
		      if (sign) {
		        high = ~high;
		        low = BIT32 - low;
		      }
		      radix = radix || 10;
		      while (1) {
		        var mod = (high % radix) * BIT32 + low;
		        high = Math.floor(high / radix);
		        low = Math.floor(mod / radix);
		        str = (mod % radix).toString(radix) + str;
		        if (!high && !low) break;
		      }
		      if (sign) {
		        str = "-" + str;
		      }
		      return str;
		    }

		    function writeInt32(buffer, offset, value) {
		      buffer[offset + pos3] = value & 255;
		      value = value >> 8;
		      buffer[offset + pos2] = value & 255;
		      value = value >> 8;
		      buffer[offset + pos1] = value & 255;
		      value = value >> 8;
		      buffer[offset + pos0] = value & 255;
		    }

		    function readInt32(buffer, offset) {
		      return (buffer[offset + pos0] * BIT24) +
		        (buffer[offset + pos1] << 16) +
		        (buffer[offset + pos2] << 8) +
		        buffer[offset + pos3];
		    }
		  }

		  function toArray(raw) {
		    var buffer = this.buffer;
		    var offset = this.offset;
		    storage = null; // Array

		    if (raw !== false && isArray(buffer)) {
		      return (buffer.length === 8) ? buffer : buffer.slice(offset, offset + 8);
		    }

		    return newArray(buffer, offset);
		  }

		  function toBuffer(raw) {
		    var buffer = this.buffer;
		    var offset = this.offset;
		    storage = BUFFER;

		    if (raw !== false && BUFFER.isBuffer(buffer)) {
		      return (buffer.length === 8) ? buffer : buffer.slice(offset, offset + 8);
		    }

		    // Buffer.from(arraybuffer) available since Node v4.5.0
		    // https://nodejs.org/en/blog/release/v4.5.0/
		    return BUFFER.from(toArrayBuffer.call(this, raw));
		  }

		  function toArrayBuffer(raw) {
		    var buffer = this.buffer;
		    var offset = this.offset;
		    var arrbuf = buffer.buffer;
		    storage = UINT8ARRAY;

		    // arrbuf.slice() ignores buffer.offset until Node v8.0.0
		    if (raw !== false && !buffer.offset && (arrbuf instanceof ARRAYBUFFER)) {
		      return (arrbuf.byteLength === 8) ? arrbuf : arrbuf.slice(offset, offset + 8);
		    }

		    var dest = new UINT8ARRAY(8);
		    fromArray(dest, 0, buffer, offset);
		    return dest.buffer;
		  }

		  function isValidBuffer(buffer, offset) {
		    var len = buffer && buffer.length;
		    offset |= 0;
		    return len && (offset + 8 <= len) && ("string" !== typeof buffer[offset]);
		  }

		  function fromArray(destbuf, destoff, srcbuf, srcoff) {
		    destoff |= 0;
		    srcoff |= 0;
		    for (var i = 0; i < 8; i++) {
		      destbuf[destoff++] = srcbuf[srcoff++] & 255;
		    }
		  }

		  function newArray(buffer, offset) {
		    return Array.prototype.slice.call(buffer, offset, offset + 8);
		  }

		  function fromPositiveBE(buffer, offset, value) {
		    var pos = offset + 8;
		    while (pos > offset) {
		      buffer[--pos] = value & 255;
		      value /= 256;
		    }
		  }

		  function fromNegativeBE(buffer, offset, value) {
		    var pos = offset + 8;
		    value++;
		    while (pos > offset) {
		      buffer[--pos] = ((-value) & 255) ^ 255;
		      value /= 256;
		    }
		  }

		  function fromPositiveLE(buffer, offset, value) {
		    var end = offset + 8;
		    while (offset < end) {
		      buffer[offset++] = value & 255;
		      value /= 256;
		    }
		  }

		  function fromNegativeLE(buffer, offset, value) {
		    var end = offset + 8;
		    value++;
		    while (offset < end) {
		      buffer[offset++] = ((-value) & 255) ^ 255;
		      value /= 256;
		    }
		  }

		  // https://github.com/retrofox/is-array
		  function _isArray(val) {
		    return !!val && "[object Array]" == Object.prototype.toString.call(val);
		  }

		}(typeof exports.nodeName !== 'string' ? exports : (int64Buffer || {})); 
	} (int64Buffer));
	return int64Buffer;
}

var hasRequiredSerialize;

function requireSerialize () {
	if (hasRequiredSerialize) return serialize;
	hasRequiredSerialize = 1;
	Object.defineProperty(serialize, "__esModule", { value: true });
	serialize.serializeAnchor = serialize.serializeCredential = serialize.serializeCoin = serialize.serializeOptionFlag = serialize.path_to_buf = serialize.buf_to_hex = serialize.hex_to_buf = serialize.int64_to_buf = serialize.uint64_to_buf = serialize.buf_to_uint32 = serialize.uint32_to_buf = serialize.buf_to_uint16 = serialize.uint16_to_buf = serialize.uint8_to_buf = void 0;
	const int64_buffer_1 = requireInt64Buffer();
	const assert_1 = requireAssert();
	const parse_1 = requireParse();
	function uint8_to_buf(value) {
	    (0, assert_1.assert)((0, parse_1.isUint8)(value), 'invalid uint8');
	    const data = Buffer$1.alloc(1);
	    data.writeUInt8(value, 0);
	    return data;
	}
	serialize.uint8_to_buf = uint8_to_buf;
	function uint16_to_buf(value) {
	    (0, assert_1.assert)((0, parse_1.isUint16)(value), 'invalid uint16');
	    const data = Buffer$1.alloc(2);
	    data.writeUInt16BE(value, 0);
	    return data;
	}
	serialize.uint16_to_buf = uint16_to_buf;
	function buf_to_uint16(data) {
	    (0, assert_1.assert)(data.length === 2, 'invalid uint16 buffer');
	    return data.readUIntBE(0, 2);
	}
	serialize.buf_to_uint16 = buf_to_uint16;
	function uint32_to_buf(value) {
	    (0, assert_1.assert)((0, parse_1.isUint32)(value), 'invalid uint32');
	    const data = Buffer$1.alloc(4);
	    data.writeUInt32BE(value, 0);
	    return data;
	}
	serialize.uint32_to_buf = uint32_to_buf;
	function buf_to_uint32(data) {
	    (0, assert_1.assert)(data.length === 4, 'invalid uint32 buffer');
	    return data.readUIntBE(0, 4);
	}
	serialize.buf_to_uint32 = buf_to_uint32;
	function uint64_to_buf(value) {
	    (0, assert_1.assert)((0, parse_1.isUint64str)(value), 'invalid uint64_str');
	    const data = new int64_buffer_1.Uint64BE(value, 10).toBuffer();
	    (0, assert_1.assert)(data.length === 8, 'invalid data length');
	    return data;
	}
	serialize.uint64_to_buf = uint64_to_buf;
	function int64_to_buf(value) {
	    (0, assert_1.assert)((0, parse_1.isInt64str)(value), 'invalid int64_str');
	    const data = new int64_buffer_1.Int64BE(value, 10).toBuffer();
	    (0, assert_1.assert)(data.length === 8, 'invalid data length');
	    return data;
	}
	serialize.int64_to_buf = int64_to_buf;
	function hex_to_buf(data) {
	    (0, assert_1.assert)((0, parse_1.isHexString)(data), 'invalid hex string');
	    return Buffer$1.from(data, 'hex');
	}
	serialize.hex_to_buf = hex_to_buf;
	function buf_to_hex(data) {
	    return data.toString('hex');
	}
	serialize.buf_to_hex = buf_to_hex;
	function path_to_buf(path) {
	    (0, assert_1.assert)((0, parse_1.isValidPath)(path), 'invalid bip32 path');
	    const data = Buffer$1.alloc(1 + 4 * path.length);
	    data.writeUInt8(path.length, 0);
	    for (let i = 0; i < path.length; i++) {
	        data.writeUInt32BE(path[i], 1 + i * 4);
	    }
	    return data;
	}
	serialize.path_to_buf = path_to_buf;
	function serializeOptionFlag(included) {
	    const SignTxIncluded = {
	        NO: 1,
	        YES: 2,
	    };
	    const value = included ? SignTxIncluded.YES : SignTxIncluded.NO;
	    return uint8_to_buf(value);
	}
	serialize.serializeOptionFlag = serializeOptionFlag;
	function serializeCoin(coin) {
	    return Buffer$1.concat([uint64_to_buf(coin)]);
	}
	serialize.serializeCoin = serializeCoin;
	function serializeCredential(credential) {
	    switch (credential.type) {
	        case 0:
	            return Buffer$1.concat([
	                uint8_to_buf(credential.type),
	                path_to_buf(credential.path),
	            ]);
	        case 2:
	            return Buffer$1.concat([
	                uint8_to_buf(credential.type),
	                hex_to_buf(credential.keyHashHex),
	            ]);
	        case 1:
	            return Buffer$1.concat([
	                uint8_to_buf(credential.type),
	                hex_to_buf(credential.scriptHashHex),
	            ]);
	        default:
	            (0, assert_1.unreachable)(credential);
	    }
	}
	serialize.serializeCredential = serializeCredential;
	function serializeAnchor(anchor) {
	    if (anchor == null) {
	        return Buffer$1.concat([serializeOptionFlag(false)]);
	    }
	    else {
	        return Buffer$1.concat([
	            serializeOptionFlag(true),
	            hex_to_buf(anchor.hashHex),
	            Buffer$1.from(anchor.url, 'ascii'),
	        ]);
	    }
	}
	serialize.serializeAnchor = serializeAnchor;
	
	return serialize;
}

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	Object.defineProperty(utils, "__esModule", { value: true });
	utils.getVersionString = utils.stripRetcodeFromResponse = utils.chunkBy = void 0;
	const address_1 = requireAddress$1();
	const assert_1 = requireAssert();
	const parse_1 = requireParse();
	const serialize_1 = requireSerialize();
	const sum = (arr) => arr.reduce((x, y) => x + y, 0);
	function chunkBy(data, chunkLengths) {
	    (0, assert_1.assert)((0, parse_1.isBuffer)(data), 'invalid buffer');
	    (0, assert_1.assert)((0, parse_1.isArray)(chunkLengths), 'invalid chunks');
	    for (const len of chunkLengths) {
	        (0, assert_1.assert)((0, parse_1.isInteger)(len), 'bad chunk length');
	        (0, assert_1.assert)(len > 0, 'bad chunk length');
	    }
	    (0, assert_1.assert)(data.length <= sum(chunkLengths), 'data too short');
	    let offset = 0;
	    const result = [];
	    const restLength = data.length - sum(chunkLengths);
	    for (const c of [...chunkLengths, restLength]) {
	        result.push(data.slice(offset, offset + c));
	        offset += c;
	    }
	    return result;
	}
	utils.chunkBy = chunkBy;
	function stripRetcodeFromResponse(response) {
	    (0, assert_1.assert)((0, parse_1.isBuffer)(response), 'invalid buffer');
	    (0, assert_1.assert)(response.length >= 2, 'response too short');
	    const L = response.length - 2;
	    const retcode = (0, serialize_1.buf_to_uint16)(response.slice(L, L + 2));
	    (0, assert_1.assert)(retcode === 0x9000, `Invalid retcode ${retcode}`);
	    return response.slice(0, L);
	}
	utils.stripRetcodeFromResponse = stripRetcodeFromResponse;
	utils.default = {
	    hex_to_buf: serialize_1.hex_to_buf,
	    buf_to_hex: serialize_1.buf_to_hex,
	    assert: assert_1.assert,
	    base58_encode: address_1.base58_encode,
	    bech32_encodeAddress: address_1.bech32_encodeAddress,
	    bech32_decodeAddress: address_1.bech32_decodeAddress,
	    chunkBy,
	    stripRetcodeFromResponse,
	};
	function getVersionString(version) {
	    const xs = version.flags.isAppXS ? '-NanoS' : '';
	    return `${version.major}.${version.minor}.${version.patch}${xs}`;
	}
	utils.getVersionString = getVersionString;
	
	return utils;
}

var getVersion = {};

var hasRequiredGetVersion;

function requireGetVersion () {
	if (hasRequiredGetVersion) return getVersion;
	hasRequiredGetVersion = 1;
	Object.defineProperty(getVersion, "__esModule", { value: true });
	getVersion.ensureLedgerAppVersionCompatible = getVersion.getCompatibility = getVersion.isLedgerAppVersionAtMost = getVersion.isLedgerAppVersionAtLeast = getVersion.getVersion = void 0;
	const errors_1 = requireErrors();
	const utils_1 = requireUtils();
	const send = (params) => (Object.assign({ ins: 0 }, params));
	function* getVersion$1() {
	    const P1_UNUSED = 0x00;
	    const P2_UNUSED = 0x00;
	    const response = yield send({
	        p1: P1_UNUSED,
	        p2: P2_UNUSED,
	        data: Buffer$1.alloc(0),
	        expectedResponseLength: 4,
	    });
	    const [major, minor, patch, flags_value] = response;
	    const FLAG_IS_DEBUG = 1;
	    const FLAG_IS_APP_XS = 4;
	    const flags = {
	        isDebug: (flags_value & FLAG_IS_DEBUG) === FLAG_IS_DEBUG,
	        isAppXS: (flags_value & FLAG_IS_APP_XS) === FLAG_IS_APP_XS,
	    };
	    return { major, minor, patch, flags };
	}
	getVersion.getVersion = getVersion$1;
	function isLedgerAppVersionAtLeast(version, minMajor, minMinor) {
	    const { major, minor } = version;
	    return major > minMajor || (major === minMajor && minor >= minMinor);
	}
	getVersion.isLedgerAppVersionAtLeast = isLedgerAppVersionAtLeast;
	function isLedgerAppVersionAtMost(version, maxMajor, maxMinor) {
	    const { major, minor } = version;
	    return major < maxMajor || (major === maxMajor && minor <= maxMinor);
	}
	getVersion.isLedgerAppVersionAtMost = isLedgerAppVersionAtMost;
	function getCompatibility(version) {
	    const v2_2 = isLedgerAppVersionAtLeast(version, 2, 2) &&
	        isLedgerAppVersionAtMost(version, 7, Infinity);
	    const v2_3 = isLedgerAppVersionAtLeast(version, 2, 3) &&
	        isLedgerAppVersionAtMost(version, 7, Infinity);
	    const v2_4 = isLedgerAppVersionAtLeast(version, 2, 4) &&
	        isLedgerAppVersionAtMost(version, 7, Infinity);
	    const v3_0 = isLedgerAppVersionAtLeast(version, 3, 0) &&
	        isLedgerAppVersionAtMost(version, 7, Infinity);
	    const v4_0 = isLedgerAppVersionAtLeast(version, 4, 0) &&
	        isLedgerAppVersionAtMost(version, 7, Infinity);
	    const v4_1 = isLedgerAppVersionAtLeast(version, 4, 1) &&
	        isLedgerAppVersionAtMost(version, 7, Infinity);
	    const v5_0 = isLedgerAppVersionAtLeast(version, 5, 0) &&
	        isLedgerAppVersionAtMost(version, 7, Infinity);
	    const v6_0 = isLedgerAppVersionAtLeast(version, 6, 0) &&
	        isLedgerAppVersionAtMost(version, 7, Infinity);
	    const v7_0 = isLedgerAppVersionAtLeast(version, 7, 0) &&
	        isLedgerAppVersionAtMost(version, 7, Infinity);
	    const v7_1 = isLedgerAppVersionAtLeast(version, 7, 1) &&
	        isLedgerAppVersionAtMost(version, 7, Infinity);
	    const isAppXS = version.flags.isAppXS;
	    return {
	        isCompatible: v2_2,
	        recommendedVersion: v2_2 ? null : '7.0',
	        supportsByronAddressDerivation: v2_2 && !isAppXS,
	        supportsMary: v2_2,
	        supportsCatalystRegistration: v2_3,
	        supportsCIP36: v6_0,
	        supportsZeroTtl: v2_3,
	        supportsPoolRegistrationAsOwner: v2_2 && !isAppXS,
	        supportsPoolRegistrationAsOperator: v2_4 && !isAppXS,
	        supportsPoolRetirement: v2_4 && !isAppXS,
	        supportsNativeScriptHashDerivation: v3_0 && !isAppXS,
	        supportsMultisigTransaction: v3_0,
	        supportsMint: v3_0,
	        supportsAlonzo: v4_0,
	        supportsReqSignersInOrdinaryTx: v4_1,
	        supportsBabbage: v5_0,
	        supportsCIP36Vote: v6_0,
	        supportsConway: v7_0,
	        supportsMessageSigning: v7_1,
	    };
	}
	getVersion.getCompatibility = getCompatibility;
	function ensureLedgerAppVersionCompatible(version) {
	    const { isCompatible, recommendedVersion } = getCompatibility(version);
	    if (!isCompatible) {
	        throw new errors_1.DeviceVersionUnsupported(`Device app version ${(0, utils_1.getVersionString)(version)} unsupported, recommended version is ${recommendedVersion}.`);
	    }
	}
	getVersion.ensureLedgerAppVersionCompatible = ensureLedgerAppVersionCompatible;
	
	return getVersion;
}

var addressParams = {};

var hasRequiredAddressParams;

function requireAddressParams () {
	if (hasRequiredAddressParams) return addressParams;
	hasRequiredAddressParams = 1;
	Object.defineProperty(addressParams, "__esModule", { value: true });
	addressParams.serializeAddressParams = void 0;
	const errors_1 = requireErrors();
	const invalidDataReason_1 = requireInvalidDataReason();
	const internal_1 = requireInternal();
	const utils_1 = requireUtils();
	const assert_1 = requireAssert();
	const serialize_1 = requireSerialize();
	const getVersion_1 = requireGetVersion();
	function serializeSpendingDataSource(dataSource) {
	    switch (dataSource.type) {
	        case "spending_path":
	            return (0, serialize_1.path_to_buf)(dataSource.path);
	        case "spending_script_hash":
	            return (0, serialize_1.hex_to_buf)(dataSource.scriptHashHex);
	        case "no_spending":
	            return Buffer$1.alloc(0);
	        default:
	            (0, assert_1.unreachable)(dataSource);
	    }
	}
	function serializeStakingDataSource(dataSource) {
	    const stakingChoicesEncoding = {
	        ["no_staking"]: 0x11,
	        ["staking_key_path"]: 0x22,
	        ["staking_key_hash"]: 0x33,
	        ["blockchain_pointer"]: 0x44,
	        ["staking_script_hash"]: 0x55,
	    };
	    switch (dataSource.type) {
	        case "no_staking": {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(stakingChoicesEncoding[dataSource.type]),
	            ]);
	        }
	        case "staking_key_hash": {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(stakingChoicesEncoding[dataSource.type]),
	                (0, serialize_1.hex_to_buf)(dataSource.keyHashHex),
	            ]);
	        }
	        case "staking_script_hash": {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(stakingChoicesEncoding[dataSource.type]),
	                (0, serialize_1.hex_to_buf)(dataSource.scriptHashHex),
	            ]);
	        }
	        case "staking_key_path": {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(stakingChoicesEncoding[dataSource.type]),
	                (0, serialize_1.path_to_buf)(dataSource.path),
	            ]);
	        }
	        case "blockchain_pointer": {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(stakingChoicesEncoding[dataSource.type]),
	                (0, serialize_1.uint32_to_buf)(dataSource.pointer.blockIndex),
	                (0, serialize_1.uint32_to_buf)(dataSource.pointer.txIndex),
	                (0, serialize_1.uint32_to_buf)(dataSource.pointer.certificateIndex),
	            ]);
	        }
	        default:
	            (0, assert_1.unreachable)(dataSource);
	    }
	}
	function serializeAddressParams(params, version) {
	    let spending = params.spendingDataSource;
	    let staking = params.stakingDataSource;
	    if (!(0, getVersion_1.getCompatibility)(version).supportsMultisigTransaction) {
	        if (params.type === internal_1.AddressType.REWARD_KEY) {
	            (0, assert_1.assert)(staking.type === "staking_key_path", invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	            spending = {
	                type: "spending_path",
	                path: staking.path,
	            };
	            staking = {
	                type: "no_staking",
	            };
	        }
	        else if (params.type === internal_1.AddressType.REWARD_SCRIPT) {
	            throw new errors_1.DeviceVersionUnsupported(`Scripthash based address derivation not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	        }
	    }
	    return Buffer$1.concat([
	        (0, serialize_1.uint8_to_buf)(params.type),
	        params.type === internal_1.AddressType.BYRON
	            ? (0, serialize_1.uint32_to_buf)(params.protocolMagic)
	            : (0, serialize_1.uint8_to_buf)(params.networkId),
	        serializeSpendingDataSource(spending),
	        serializeStakingDataSource(staking),
	    ]);
	}
	addressParams.serializeAddressParams = serializeAddressParams;
	
	return addressParams;
}

var hasRequiredDeriveAddress;

function requireDeriveAddress () {
	if (hasRequiredDeriveAddress) return deriveAddress;
	hasRequiredDeriveAddress = 1;
	Object.defineProperty(deriveAddress, "__esModule", { value: true });
	deriveAddress.deriveAddress = deriveAddress.ensureAddressDerivationSupportedByAppVersion = void 0;
	const errors_1 = requireErrors();
	const utils_1 = requireUtils();
	const public_1 = require_public();
	const getVersion_1 = requireGetVersion();
	const addressParams_1 = requireAddressParams();
	const send = (params) => (Object.assign({ ins: 17 }, params));
	function ensureAddressDerivationSupportedByAppVersion(version, addressParams) {
	    (0, getVersion_1.ensureLedgerAppVersionCompatible)(version);
	    if (addressParams.type === public_1.AddressType.BYRON &&
	        !(0, getVersion_1.getCompatibility)(version).supportsByronAddressDerivation) {
	        throw new errors_1.DeviceVersionUnsupported(`Byron address parameters not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	}
	deriveAddress.ensureAddressDerivationSupportedByAppVersion = ensureAddressDerivationSupportedByAppVersion;
	function* deriveAddress$1(version, addressParams) {
	    ensureAddressDerivationSupportedByAppVersion(version, addressParams);
	    const P1_RETURN = 0x01;
	    const P2_UNUSED = 0x00;
	    const response = yield send({
	        p1: P1_RETURN,
	        p2: P2_UNUSED,
	        data: (0, addressParams_1.serializeAddressParams)(addressParams, version),
	    });
	    return {
	        addressHex: response.toString('hex'),
	    };
	}
	deriveAddress.deriveAddress = deriveAddress$1;
	
	return deriveAddress;
}

var deriveNativeScriptHash = {};

var nativeScript$1 = {};

var hasRequiredNativeScript$1;

function requireNativeScript$1 () {
	if (hasRequiredNativeScript$1) return nativeScript$1;
	hasRequiredNativeScript$1 = 1;
	Object.defineProperty(nativeScript$1, "__esModule", { value: true });
	nativeScript$1.serializeWholeNativeScriptFinish = nativeScript$1.serializeSimpleNativeScript = nativeScript$1.serializeComplexNativeScriptStart = void 0;
	const internal_1 = requireInternal();
	const assert_1 = requireAssert();
	const serialize_1 = requireSerialize();
	const TYPE_ENCODING = {
	    [internal_1.NativeScriptType.PUBKEY_DEVICE_OWNED]: 0,
	    [internal_1.NativeScriptType.PUBKEY_THIRD_PARTY]: 0,
	    [internal_1.NativeScriptType.ALL]: 1,
	    [internal_1.NativeScriptType.ANY]: 2,
	    [internal_1.NativeScriptType.N_OF_K]: 3,
	    [internal_1.NativeScriptType.INVALID_BEFORE]: 4,
	    [internal_1.NativeScriptType.INVALID_HEREAFTER]: 5,
	};
	const PUBKEY_TYPE_ENCODING = {
	    [internal_1.NativeScriptType.PUBKEY_DEVICE_OWNED]: 1,
	    [internal_1.NativeScriptType.PUBKEY_THIRD_PARTY]: 2,
	};
	const DISPLAY_FORMAT_ENCODING = {
	    [internal_1.NativeScriptHashDisplayFormat.BECH32]: 1,
	    [internal_1.NativeScriptHashDisplayFormat.POLICY_ID]: 2,
	};
	function serializeComplexNativeScriptStart(script) {
	    switch (script.type) {
	        case internal_1.NativeScriptType.ALL:
	        case internal_1.NativeScriptType.ANY:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(TYPE_ENCODING[script.type]),
	                (0, serialize_1.uint32_to_buf)(script.params.scripts.length),
	            ]);
	        case internal_1.NativeScriptType.N_OF_K:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(TYPE_ENCODING[script.type]),
	                (0, serialize_1.uint32_to_buf)(script.params.scripts.length),
	                (0, serialize_1.uint32_to_buf)(script.params.requiredCount),
	            ]);
	        default:
	            (0, assert_1.unreachable)(script);
	    }
	}
	nativeScript$1.serializeComplexNativeScriptStart = serializeComplexNativeScriptStart;
	function serializeSimpleNativeScript(script) {
	    switch (script.type) {
	        case internal_1.NativeScriptType.PUBKEY_DEVICE_OWNED:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(TYPE_ENCODING[script.type]),
	                (0, serialize_1.uint8_to_buf)(PUBKEY_TYPE_ENCODING[script.type]),
	                (0, serialize_1.path_to_buf)(script.params.path),
	            ]);
	        case internal_1.NativeScriptType.PUBKEY_THIRD_PARTY:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(TYPE_ENCODING[script.type]),
	                (0, serialize_1.uint8_to_buf)(PUBKEY_TYPE_ENCODING[script.type]),
	                (0, serialize_1.hex_to_buf)(script.params.keyHashHex),
	            ]);
	        case internal_1.NativeScriptType.INVALID_BEFORE:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(TYPE_ENCODING[script.type]),
	                (0, serialize_1.uint64_to_buf)(script.params.slot),
	            ]);
	        case internal_1.NativeScriptType.INVALID_HEREAFTER:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(TYPE_ENCODING[script.type]),
	                (0, serialize_1.uint64_to_buf)(script.params.slot),
	            ]);
	        default:
	            (0, assert_1.unreachable)(script);
	    }
	}
	nativeScript$1.serializeSimpleNativeScript = serializeSimpleNativeScript;
	function serializeWholeNativeScriptFinish(displayFormat) {
	    return Buffer$1.concat([(0, serialize_1.uint8_to_buf)(DISPLAY_FORMAT_ENCODING[displayFormat])]);
	}
	nativeScript$1.serializeWholeNativeScriptFinish = serializeWholeNativeScriptFinish;
	
	return nativeScript$1;
}

var hasRequiredDeriveNativeScriptHash;

function requireDeriveNativeScriptHash () {
	if (hasRequiredDeriveNativeScriptHash) return deriveNativeScriptHash;
	hasRequiredDeriveNativeScriptHash = 1;
	Object.defineProperty(deriveNativeScriptHash, "__esModule", { value: true });
	deriveNativeScriptHash.deriveNativeScriptHash = void 0;
	const errors_1 = requireErrors();
	const internal_1 = requireInternal();
	const public_1 = require_public();
	const utils_1 = requireUtils();
	const getVersion_1 = requireGetVersion();
	const nativeScript_1 = requireNativeScript$1();
	const send = (params) => (Object.assign({ ins: 18 }, params));
	function* deriveScriptHash_startComplexScript(script) {
	    yield send({
	        p1: 1,
	        p2: 0,
	        data: (0, nativeScript_1.serializeComplexNativeScriptStart)(script),
	        expectedResponseLength: 0,
	    });
	}
	function* deriveNativeScriptHash_addSimpleScript(script) {
	    yield send({
	        p1: 2,
	        p2: 0,
	        data: (0, nativeScript_1.serializeSimpleNativeScript)(script),
	        expectedResponseLength: 0,
	    });
	}
	function isComplexScript(script) {
	    switch (script.type) {
	        case public_1.NativeScriptType.ALL:
	        case public_1.NativeScriptType.ANY:
	        case public_1.NativeScriptType.N_OF_K:
	            return true;
	        default:
	            return false;
	    }
	}
	function* deriveNativeScriptHash_addScript(script) {
	    if (isComplexScript(script)) {
	        yield* deriveScriptHash_startComplexScript(script);
	        for (const subscript of script.params.scripts) {
	            yield* deriveNativeScriptHash_addScript(subscript);
	        }
	    }
	    else {
	        return yield* deriveNativeScriptHash_addSimpleScript(script);
	    }
	}
	function* deriveNativeScriptHash_finishWholeNativeScript(displayFormat) {
	    const response = yield send({
	        p1: 3,
	        p2: 0,
	        data: (0, nativeScript_1.serializeWholeNativeScriptFinish)(displayFormat),
	        expectedResponseLength: internal_1.NATIVE_SCRIPT_HASH_LENGTH,
	    });
	    return {
	        scriptHashHex: response.toString('hex'),
	    };
	}
	function ensureScriptHashDerivationSupportedByAppVersion(version) {
	    if (!(0, getVersion_1.getCompatibility)(version).supportsNativeScriptHashDerivation) {
	        throw new errors_1.DeviceVersionUnsupported(`Native script hash derivation not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	}
	function* deriveNativeScriptHash$1(version, script, displayFormat) {
	    (0, getVersion_1.ensureLedgerAppVersionCompatible)(version);
	    ensureScriptHashDerivationSupportedByAppVersion(version);
	    yield* deriveNativeScriptHash_addScript(script);
	    const { scriptHashHex } = yield* deriveNativeScriptHash_finishWholeNativeScript(displayFormat);
	    return {
	        scriptHashHex,
	    };
	}
	deriveNativeScriptHash.deriveNativeScriptHash = deriveNativeScriptHash$1;
	
	return deriveNativeScriptHash;
}

var getExtendedPublicKeys = {};

var hasRequiredGetExtendedPublicKeys;

function requireGetExtendedPublicKeys () {
	if (hasRequiredGetExtendedPublicKeys) return getExtendedPublicKeys;
	hasRequiredGetExtendedPublicKeys = 1;
	Object.defineProperty(getExtendedPublicKeys, "__esModule", { value: true });
	getExtendedPublicKeys.getExtendedPublicKeys = void 0;
	const errors_1 = requireErrors();
	const internal_1 = requireInternal();
	const public_1 = require_public();
	const utils_1 = requireUtils();
	const assert_1 = requireAssert();
	const serialize_1 = requireSerialize();
	const getVersion_1 = requireGetVersion();
	function ensureLedgerAppVersionCompatibleForPaths(version, paths) {
	    const voteKeysPresent = paths.some((path) => path[0] === 1694 + public_1.HARDENED);
	    if (voteKeysPresent && !(0, getVersion_1.getCompatibility)(version).supportsCIP36Vote) {
	        throw new errors_1.DeviceVersionUnsupported(`CIP36 vote keys not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	}
	const send = (params) => (Object.assign({ ins: 16 }, params));
	function* getExtendedPublicKeys$1(version, paths) {
	    (0, getVersion_1.ensureLedgerAppVersionCompatible)(version);
	    ensureLedgerAppVersionCompatibleForPaths(version, paths);
	    const result = [];
	    for (let i = 0; i < paths.length; i++) {
	        const pathData = Buffer$1.concat([(0, serialize_1.path_to_buf)(paths[i])]);
	        let response;
	        if (i === 0) {
	            const remainingKeysData = paths.length > 1
	                ? (0, serialize_1.uint32_to_buf)((paths.length - 1))
	                : Buffer$1.from([]);
	            response = yield send({
	                p1: 0,
	                p2: 0,
	                data: Buffer$1.concat([pathData, remainingKeysData]),
	                expectedResponseLength: internal_1.EXTENDED_PUBLIC_KEY_LENGTH,
	            });
	        }
	        else {
	            response = yield send({
	                p1: 1,
	                p2: 0,
	                data: pathData,
	                expectedResponseLength: internal_1.EXTENDED_PUBLIC_KEY_LENGTH,
	            });
	        }
	        const VKEY_LENGTH = 32;
	        const CHAINCODE_LENGTH = 32;
	        const [publicKey, chainCode, rest] = (0, utils_1.chunkBy)(response, [
	            VKEY_LENGTH,
	            CHAINCODE_LENGTH,
	        ]);
	        (0, assert_1.assert)(rest.length === 0, 'invalid response length');
	        result.push({
	            publicKeyHex: publicKey.toString('hex'),
	            chainCodeHex: chainCode.toString('hex'),
	        });
	    }
	    return result;
	}
	getExtendedPublicKeys.getExtendedPublicKeys = getExtendedPublicKeys$1;
	
	return getExtendedPublicKeys;
}

var getSerial = {};

var hasRequiredGetSerial;

function requireGetSerial () {
	if (hasRequiredGetSerial) return getSerial;
	hasRequiredGetSerial = 1;
	var __importDefault = (getSerial && getSerial.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(getSerial, "__esModule", { value: true });
	getSerial.getSerial = void 0;
	const utils_1 = __importDefault(requireUtils());
	const getVersion_1 = requireGetVersion();
	const send = (params) => (Object.assign({ ins: 1 }, params));
	function* getSerial$1(version) {
	    (0, getVersion_1.ensureLedgerAppVersionCompatible)(version);
	    const P1_UNUSED = 0x00;
	    const P2_UNUSED = 0x00;
	    const response = yield send({
	        p1: P1_UNUSED,
	        p2: P2_UNUSED,
	        data: Buffer$1.alloc(0),
	        expectedResponseLength: 7,
	    });
	    const serialHex = utils_1.default.buf_to_hex(response);
	    return { serialHex };
	}
	getSerial.getSerial = getSerial$1;
	
	return getSerial;
}

var runTests = {};

var hasRequiredRunTests;

function requireRunTests () {
	if (hasRequiredRunTests) return runTests;
	hasRequiredRunTests = 1;
	Object.defineProperty(runTests, "__esModule", { value: true });
	runTests.runTests = void 0;
	const send = (params) => (Object.assign({ ins: 240 }, params));
	function* runTests$1(_version) {
	    yield send({
	        p1: 0x00,
	        p2: 0x00,
	        data: Buffer$1.alloc(0),
	        expectedResponseLength: 0,
	    });
	}
	runTests.runTests = runTests$1;
	
	return runTests;
}

var showAddress = {};

var hasRequiredShowAddress;

function requireShowAddress () {
	if (hasRequiredShowAddress) return showAddress;
	hasRequiredShowAddress = 1;
	Object.defineProperty(showAddress, "__esModule", { value: true });
	showAddress.showAddress = void 0;
	const addressParams_1 = requireAddressParams();
	const deriveAddress_1 = requireDeriveAddress();
	const send = (params) => (Object.assign({ ins: 17 }, params));
	function* showAddress$1(version, addressParams) {
	    (0, deriveAddress_1.ensureAddressDerivationSupportedByAppVersion)(version, addressParams);
	    const P1_DISPLAY = 0x02;
	    const P2_UNUSED = 0x00;
	    yield send({
	        p1: P1_DISPLAY,
	        p2: P2_UNUSED,
	        data: (0, addressParams_1.serializeAddressParams)(addressParams, version),
	        expectedResponseLength: 0,
	    });
	}
	showAddress.showAddress = showAddress$1;
	
	return showAddress;
}

var signCVote = {};

var hasRequiredSignCVote;

function requireSignCVote () {
	if (hasRequiredSignCVote) return signCVote;
	hasRequiredSignCVote = 1;
	Object.defineProperty(signCVote, "__esModule", { value: true });
	signCVote.signCVote = void 0;
	const errors_1 = requireErrors();
	const internal_1 = requireInternal();
	const utils_1 = requireUtils();
	const serialize_1 = requireSerialize();
	const getVersion_1 = requireGetVersion();
	const send = (params) => (Object.assign({ ins: 35 }, params));
	function* signCVote$1(version, cVote) {
	    if (!(0, getVersion_1.getCompatibility)(version).supportsCIP36Vote) {
	        throw new errors_1.DeviceVersionUnsupported(`CIP36 voting not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    const MAX_VOTECAST_CHUNK_SIZE = 240;
	    const votecastBytes = (0, serialize_1.hex_to_buf)(cVote.voteCastDataHex);
	    let start = 0;
	    let end = Math.min(votecastBytes.length, start + MAX_VOTECAST_CHUNK_SIZE);
	    const initDataBuffer = Buffer$1.concat([
	        (0, serialize_1.uint32_to_buf)(votecastBytes.length),
	        votecastBytes.slice(start, end),
	    ]);
	    yield send({
	        p1: 1,
	        p2: 0,
	        data: initDataBuffer,
	        expectedResponseLength: 0,
	    });
	    start = end;
	    while (start < votecastBytes.length) {
	        end = Math.min(votecastBytes.length, start + MAX_VOTECAST_CHUNK_SIZE);
	        yield send({
	            p1: 2,
	            p2: 0,
	            data: votecastBytes.slice(start, end),
	            expectedResponseLength: 0,
	        });
	        start = end;
	    }
	    const VOTECAST_HASH_LENGTH = 32;
	    const confirmResponse = yield send({
	        p1: 3,
	        p2: 0,
	        data: Buffer$1.concat([]),
	        expectedResponseLength: VOTECAST_HASH_LENGTH,
	    });
	    const witnessResponse = yield send({
	        p1: 4,
	        p2: 0,
	        data: (0, serialize_1.path_to_buf)(cVote.witnessPath),
	        expectedResponseLength: internal_1.ED25519_SIGNATURE_LENGTH,
	    });
	    return {
	        dataHashHex: confirmResponse.toString('hex'),
	        witnessPath: cVote.witnessPath,
	        witnessSignatureHex: witnessResponse.toString('hex'),
	    };
	}
	signCVote.signCVote = signCVote$1;
	
	return signCVote;
}

var signOperationalCertificate = {};

var operationalCertificate$1 = {};

var hasRequiredOperationalCertificate$1;

function requireOperationalCertificate$1 () {
	if (hasRequiredOperationalCertificate$1) return operationalCertificate$1;
	hasRequiredOperationalCertificate$1 = 1;
	Object.defineProperty(operationalCertificate$1, "__esModule", { value: true });
	operationalCertificate$1.serializeOperationalCertificate = void 0;
	const serialize_1 = requireSerialize();
	function serializeOperationalCertificate({ kesPublicKeyHex, kesPeriod, issueCounter, coldKeyPath, }) {
	    return Buffer$1.concat([
	        (0, serialize_1.hex_to_buf)(kesPublicKeyHex),
	        (0, serialize_1.uint64_to_buf)(kesPeriod),
	        (0, serialize_1.uint64_to_buf)(issueCounter),
	        (0, serialize_1.path_to_buf)(coldKeyPath),
	    ]);
	}
	operationalCertificate$1.serializeOperationalCertificate = serializeOperationalCertificate;
	
	return operationalCertificate$1;
}

var hasRequiredSignOperationalCertificate;

function requireSignOperationalCertificate () {
	if (hasRequiredSignOperationalCertificate) return signOperationalCertificate;
	hasRequiredSignOperationalCertificate = 1;
	Object.defineProperty(signOperationalCertificate, "__esModule", { value: true });
	signOperationalCertificate.signOperationalCertificate = void 0;
	const errors_1 = requireErrors();
	const internal_1 = requireInternal();
	const utils_1 = requireUtils();
	const getVersion_1 = requireGetVersion();
	const operationalCertificate_1 = requireOperationalCertificate$1();
	const send = (params) => (Object.assign({ ins: 34 }, params));
	function* signOperationalCertificate$1(version, operationalCertificate) {
	    if (!(0, getVersion_1.getCompatibility)(version).supportsPoolRegistrationAsOperator) {
	        throw new errors_1.DeviceVersionUnsupported(`Operational certificate signing not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    const P1_UNUSED = 0x00;
	    const P2_UNUSED = 0x00;
	    const response = yield send({
	        p1: P1_UNUSED,
	        p2: P2_UNUSED,
	        data: (0, operationalCertificate_1.serializeOperationalCertificate)(operationalCertificate),
	        expectedResponseLength: internal_1.ED25519_SIGNATURE_LENGTH,
	    });
	    return {
	        signatureHex: response.toString('hex'),
	    };
	}
	signOperationalCertificate.signOperationalCertificate = signOperationalCertificate$1;
	
	return signOperationalCertificate;
}

var signMessage = {};

var messageData$1 = {};

var hasRequiredMessageData$1;

function requireMessageData$1 () {
	if (hasRequiredMessageData$1) return messageData$1;
	hasRequiredMessageData$1 = 1;
	Object.defineProperty(messageData$1, "__esModule", { value: true });
	messageData$1.serializeMessageDataInit = void 0;
	const public_1 = require_public();
	const serialize_1 = requireSerialize();
	const addressParams_1 = requireAddressParams();
	function serializeMessageDataInit(version, msgData) {
	    const msgLengthBuffer = (0, serialize_1.uint32_to_buf)((msgData.messageHex.length / 2));
	    const hashPayloadBuffer = msgData.hashPayload
	        ? (0, serialize_1.uint8_to_buf)(1)
	        : (0, serialize_1.uint8_to_buf)(0);
	    const isAsciiBuffer = msgData.isAscii
	        ? (0, serialize_1.uint8_to_buf)(1)
	        : (0, serialize_1.uint8_to_buf)(0);
	    const addressFieldTypeEncoding = {
	        [public_1.MessageAddressFieldType.ADDRESS]: 0x01,
	        [public_1.MessageAddressFieldType.KEY_HASH]: 0x02,
	    };
	    const addressFieldTypeBuffer = (0, serialize_1.uint8_to_buf)(addressFieldTypeEncoding[msgData.addressFieldType]);
	    const addressBuffer = msgData.addressFieldType === public_1.MessageAddressFieldType.ADDRESS
	        ? (0, addressParams_1.serializeAddressParams)(msgData.address, version)
	        : Buffer$1.concat([]);
	    return Buffer$1.concat([
	        msgLengthBuffer,
	        (0, serialize_1.path_to_buf)(msgData.signingPath),
	        hashPayloadBuffer,
	        isAsciiBuffer,
	        addressFieldTypeBuffer,
	        addressBuffer,
	    ]);
	}
	messageData$1.serializeMessageDataInit = serializeMessageDataInit;
	
	return messageData$1;
}

var hasRequiredSignMessage;

function requireSignMessage () {
	if (hasRequiredSignMessage) return signMessage;
	hasRequiredSignMessage = 1;
	Object.defineProperty(signMessage, "__esModule", { value: true });
	signMessage.signMessage = void 0;
	const serialize_1 = requireSerialize();
	const errors_1 = requireErrors();
	const internal_1 = requireInternal();
	const utils_1 = requireUtils();
	const getVersion_1 = requireGetVersion();
	const messageData_1 = requireMessageData$1();
	const parse_1 = requireParse();
	const send = (params) => (Object.assign({ ins: 36 }, params));
	function* signMessage$1(version, msgData) {
	    if (!(0, getVersion_1.getCompatibility)(version).supportsMessageSigning) {
	        throw new errors_1.DeviceVersionUnsupported(`CIP-8 message signing not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    yield send({
	        p1: 1,
	        p2: 0,
	        data: (0, messageData_1.serializeMessageDataInit)(version, msgData),
	        expectedResponseLength: 0,
	    });
	    const MAX_CIP8_MSG_FIRST_CHUNK_ASCII_SIZE = 198;
	    const MAX_CIP8_MSG_FIRST_CHUNK_HEX_SIZE = 99;
	    const MAX_CIP8_MSG_HIDDEN_CHUNK_SIZE = 250;
	    const msgBytes = (0, serialize_1.hex_to_buf)(msgData.messageHex);
	    const getChunkData = (start, end) => {
	        const chunk = msgBytes.slice(start, end);
	        return Buffer$1.concat([(0, serialize_1.uint32_to_buf)(chunk.length), chunk]);
	    };
	    const firstChunkSize = msgData.isAscii
	        ? MAX_CIP8_MSG_FIRST_CHUNK_ASCII_SIZE
	        : MAX_CIP8_MSG_FIRST_CHUNK_HEX_SIZE;
	    let start = 0;
	    let end = Math.min(msgBytes.length, firstChunkSize);
	    yield send({
	        p1: 2,
	        p2: 0,
	        data: getChunkData(start, end),
	        expectedResponseLength: 0,
	    });
	    start = end;
	    if (start < msgBytes.length) {
	        (0, parse_1.validate)(msgData.hashPayload, errors_1.InvalidDataReason.MESSAGE_DATA_LONG_NON_HASHED_MSG);
	    }
	    while (start < msgBytes.length) {
	        end = Math.min(msgBytes.length, start + MAX_CIP8_MSG_HIDDEN_CHUNK_SIZE);
	        yield send({
	            p1: 2,
	            p2: 0,
	            data: getChunkData(start, end),
	            expectedResponseLength: 0,
	        });
	        start = end;
	    }
	    const MAX_ADDRESS_SIZE = 128;
	    const confirmResponse = yield send({
	        p1: 3,
	        p2: 0,
	        data: Buffer$1.concat([]),
	        expectedResponseLength: internal_1.ED25519_SIGNATURE_LENGTH + internal_1.PUBLIC_KEY_LENGTH + 4 + MAX_ADDRESS_SIZE,
	    });
	    let s = 0;
	    const signatureHex = confirmResponse
	        .slice(s, s + internal_1.ED25519_SIGNATURE_LENGTH)
	        .toString('hex');
	    s += internal_1.ED25519_SIGNATURE_LENGTH;
	    const signingPublicKeyHex = confirmResponse
	        .slice(s, s + internal_1.PUBLIC_KEY_LENGTH)
	        .toString('hex');
	    s += internal_1.PUBLIC_KEY_LENGTH;
	    const addressFieldSizeBuf = confirmResponse.slice(s, s + 4);
	    s += 4;
	    const addressFieldSize = (0, serialize_1.buf_to_uint32)(addressFieldSizeBuf);
	    const addressFieldHex = confirmResponse
	        .slice(s, s + addressFieldSize)
	        .toString('hex');
	    return {
	        signatureHex,
	        signingPublicKeyHex,
	        addressFieldHex,
	    };
	}
	signMessage.signMessage = signMessage$1;
	
	return signMessage;
}

var messageData = {};

var address = {};

var network = {};

var hasRequiredNetwork;

function requireNetwork () {
	if (hasRequiredNetwork) return network;
	hasRequiredNetwork = 1;
	Object.defineProperty(network, "__esModule", { value: true });
	network.parseNetwork = void 0;
	const invalidDataReason_1 = requireInvalidDataReason();
	const parse_1 = requireParse();
	function parseNetwork(network) {
	    const parsed = {
	        protocolMagic: (0, parse_1.parseUint32_t)(network.protocolMagic, invalidDataReason_1.InvalidDataReason.NETWORK_INVALID_PROTOCOL_MAGIC),
	        networkId: (0, parse_1.parseUint8_t)(network.networkId, invalidDataReason_1.InvalidDataReason.NETWORK_INVALID_NETWORK_ID),
	    };
	    (0, parse_1.validate)(parsed.networkId <= 0b00001111, invalidDataReason_1.InvalidDataReason.NETWORK_INVALID_NETWORK_ID);
	    return parsed;
	}
	network.parseNetwork = parseNetwork;
	
	return network;
}

var hasRequiredAddress;

function requireAddress () {
	if (hasRequiredAddress) return address;
	hasRequiredAddress = 1;
	Object.defineProperty(address, "__esModule", { value: true });
	address.parseAddress = void 0;
	const errors_1 = requireErrors();
	const invalidDataReason_1 = requireInvalidDataReason();
	const internal_1 = requireInternal();
	const parse_1 = requireParse();
	const network_1 = requireNetwork();
	function extractSpendingDataSource(spendingPath, spendingScriptHash) {
	    if (null != spendingPath) {
	        (0, parse_1.validate)(spendingScriptHash == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_SPENDING_SCRIPT_HASH);
	        return {
	            type: "spending_path",
	            path: (0, parse_1.parseBIP32Path)(spendingPath, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_SPENDING_KEY_PATH),
	        };
	    }
	    if (null != spendingScriptHash) {
	        (0, parse_1.validate)(spendingPath == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_SPENDING_KEY_PATH);
	        return {
	            type: "spending_script_hash",
	            scriptHashHex: (0, parse_1.parseHexStringOfLength)(spendingScriptHash, internal_1.SCRIPT_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_SPENDING_SCRIPT_HASH),
	        };
	    }
	    return {
	        type: "no_spending",
	    };
	}
	function extractStakingDataSource(stakingPath, stakingKeyHashHex, stakingBlockchainPointer, stakingScriptHashHex) {
	    if (null != stakingPath) {
	        (0, parse_1.validate)(stakingKeyHashHex == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	        (0, parse_1.validate)(stakingBlockchainPointer == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	        (0, parse_1.validate)(stakingScriptHashHex == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	        const codedStakingPath = (0, parse_1.parseBIP32Path)(stakingPath, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_SPENDING_KEY_PATH);
	        return {
	            type: "staking_key_path",
	            path: codedStakingPath,
	        };
	    }
	    if (null != stakingKeyHashHex) {
	        (0, parse_1.validate)(stakingPath == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	        (0, parse_1.validate)(stakingBlockchainPointer == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	        (0, parse_1.validate)(stakingScriptHashHex == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	        const hashHex = (0, parse_1.parseHexStringOfLength)(stakingKeyHashHex, internal_1.KEY_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_KEY_HASH);
	        return {
	            type: "staking_key_hash",
	            keyHashHex: hashHex,
	        };
	    }
	    if (null != stakingBlockchainPointer) {
	        (0, parse_1.validate)(stakingPath == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	        (0, parse_1.validate)(stakingKeyHashHex == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	        (0, parse_1.validate)(stakingScriptHashHex == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	        const pointer = stakingBlockchainPointer;
	        return {
	            type: "blockchain_pointer",
	            pointer: {
	                blockIndex: (0, parse_1.parseUint32_t)(pointer.blockIndex, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_BLOCKCHAIN_POINTER),
	                txIndex: (0, parse_1.parseUint32_t)(pointer.txIndex, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_BLOCKCHAIN_POINTER),
	                certificateIndex: (0, parse_1.parseUint32_t)(pointer.certificateIndex, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_BLOCKCHAIN_POINTER),
	            },
	        };
	    }
	    if (null != stakingScriptHashHex) {
	        (0, parse_1.validate)(stakingPath == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	        (0, parse_1.validate)(stakingKeyHashHex == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	        (0, parse_1.validate)(stakingBlockchainPointer == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	        const stakingHash = (0, parse_1.parseHexStringOfLength)(stakingScriptHashHex, internal_1.SCRIPT_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_SCRIPT_HASH);
	        return {
	            type: "staking_script_hash",
	            scriptHashHex: stakingHash,
	        };
	    }
	    return {
	        type: "no_staking",
	    };
	}
	function validateSpendingDataSource(addressType, spending) {
	    switch (addressType) {
	        case internal_1.AddressType.BASE_PAYMENT_KEY_STAKE_KEY:
	        case internal_1.AddressType.BASE_PAYMENT_KEY_STAKE_SCRIPT:
	        case internal_1.AddressType.POINTER_KEY:
	        case internal_1.AddressType.ENTERPRISE_KEY:
	        case internal_1.AddressType.BYRON:
	            (0, parse_1.validate)(spending.type === "spending_path", invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_SPENDING_INFO);
	            break;
	        case internal_1.AddressType.BASE_PAYMENT_SCRIPT_STAKE_KEY:
	        case internal_1.AddressType.BASE_PAYMENT_SCRIPT_STAKE_SCRIPT:
	        case internal_1.AddressType.POINTER_SCRIPT:
	        case internal_1.AddressType.ENTERPRISE_SCRIPT:
	            (0, parse_1.validate)(spending.type === "spending_script_hash", invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_SPENDING_INFO);
	            break;
	        case internal_1.AddressType.REWARD_KEY:
	        case internal_1.AddressType.REWARD_SCRIPT:
	            (0, parse_1.validate)(spending.type === "no_spending", invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_SPENDING_INFO);
	            break;
	        default:
	            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.ADDRESS_UNKNOWN_TYPE);
	    }
	}
	function validateStakingDataSource(addressType, staking) {
	    switch (addressType) {
	        case internal_1.AddressType.BASE_PAYMENT_KEY_STAKE_KEY:
	        case internal_1.AddressType.BASE_PAYMENT_SCRIPT_STAKE_KEY:
	        case internal_1.AddressType.REWARD_KEY:
	            (0, parse_1.validate)(staking.type === "staking_key_path" ||
	                staking.type === "staking_key_hash", invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	            break;
	        case internal_1.AddressType.BASE_PAYMENT_SCRIPT_STAKE_SCRIPT:
	        case internal_1.AddressType.BASE_PAYMENT_KEY_STAKE_SCRIPT:
	        case internal_1.AddressType.REWARD_SCRIPT:
	            (0, parse_1.validate)(staking.type === "staking_script_hash", invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	            break;
	        case internal_1.AddressType.POINTER_KEY:
	        case internal_1.AddressType.POINTER_SCRIPT:
	            (0, parse_1.validate)(staking.type === "blockchain_pointer", invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	            break;
	        case internal_1.AddressType.BYRON:
	        case internal_1.AddressType.ENTERPRISE_KEY:
	        case internal_1.AddressType.ENTERPRISE_SCRIPT:
	            (0, parse_1.validate)(staking.type === "no_staking", invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
	            break;
	        default:
	            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.ADDRESS_UNKNOWN_TYPE);
	    }
	}
	function parseAddress(network, address) {
	    const parsedNetwork = (0, network_1.parseNetwork)(network);
	    const params = address.params;
	    const spendingDataSource = extractSpendingDataSource(params.spendingPath, params.spendingScriptHashHex);
	    const stakingDataSource = extractStakingDataSource(params.stakingPath, params.stakingKeyHashHex, params.stakingBlockchainPointer, params.stakingScriptHashHex);
	    validateSpendingDataSource(address.type, spendingDataSource);
	    validateStakingDataSource(address.type, stakingDataSource);
	    if (address.type === internal_1.AddressType.BYRON) {
	        return {
	            type: address.type,
	            protocolMagic: parsedNetwork.protocolMagic,
	            spendingDataSource: spendingDataSource,
	            stakingDataSource: stakingDataSource,
	        };
	    }
	    else {
	        const networkId = parsedNetwork.networkId;
	        return {
	            type: address.type,
	            networkId,
	            spendingDataSource: spendingDataSource,
	            stakingDataSource: stakingDataSource,
	        };
	    }
	}
	address.parseAddress = parseAddress;
	
	return address;
}

var hasRequiredMessageData;

function requireMessageData () {
	if (hasRequiredMessageData) return messageData;
	hasRequiredMessageData = 1;
	Object.defineProperty(messageData, "__esModule", { value: true });
	messageData.parseMessageData = void 0;
	const assert_1 = requireAssert();
	const invalidDataReason_1 = requireInvalidDataReason();
	const public_1 = require_public();
	const parse_1 = requireParse();
	const address_1 = requireAddress();
	function isPrintableAscii(buffer) {
	    for (let i = 0; i < buffer.length; i++) {
	        if (buffer[i] > 126)
	            return false;
	        if (buffer[i] < 32)
	            return false;
	    }
	    return true;
	}
	function isAscii(msg) {
	    const buffer = Buffer$1.from(msg, 'hex');
	    if (buffer.length === 0)
	        return false;
	    if (!isPrintableAscii(buffer))
	        return false;
	    const space = ' '.charCodeAt(0);
	    if (buffer[0] === space)
	        return false;
	    if (buffer[buffer.length - 1] === space)
	        return false;
	    for (let i = 0; i + 1 < buffer.length; i++) {
	        if (buffer[i] === space && buffer[i + 1] === space)
	            return false;
	    }
	    return true;
	}
	function parseMessageData(data) {
	    const preferHexDisplay = data.preferHexDisplay || false;
	    const common = {
	        signingPath: (0, parse_1.parseBIP32Path)(data.signingPath, invalidDataReason_1.InvalidDataReason.MESSAGE_DATA_INVALID_WITNESS_PATH),
	        isAscii: isAscii(data.messageHex) && !preferHexDisplay,
	        hashPayload: data.hashPayload,
	        messageHex: (0, parse_1.parseHexString)(data.messageHex, invalidDataReason_1.InvalidDataReason.MESSAGE_DATA_INVALID_MESSAGE_HEX),
	    };
	    switch (data.addressFieldType) {
	        case public_1.MessageAddressFieldType.ADDRESS:
	            return Object.assign(Object.assign({}, common), { addressFieldType: public_1.MessageAddressFieldType.ADDRESS, address: (0, address_1.parseAddress)(data.network, data.address) });
	        case public_1.MessageAddressFieldType.KEY_HASH:
	            return Object.assign(Object.assign({}, common), { addressFieldType: public_1.MessageAddressFieldType.KEY_HASH });
	        default:
	            (0, assert_1.unreachable)(data);
	    }
	}
	messageData.parseMessageData = parseMessageData;
	
	return messageData;
}

var signTx = {};

var cVoteRegistration = {};

var txOutput = {};

var hasRequiredTxOutput;

function requireTxOutput () {
	if (hasRequiredTxOutput) return txOutput;
	hasRequiredTxOutput = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.serializeTxOutputRefScript = exports.serializeTxOutputDatum = exports.serializeTxOutputBasicParams = exports.serializeTxOutputDestination = exports.MAX_CHUNK_SIZE = void 0;
		const internal_1 = requireInternal();
		const public_1 = require_public();
		const assert_1 = requireAssert();
		const serialize_1 = requireSerialize();
		const getVersion_1 = requireGetVersion();
		const addressParams_1 = requireAddressParams();
		exports.MAX_CHUNK_SIZE = 240;
		function serializeTxOutputDestination(destination, version) {
		    const typeEncoding = {
		        [internal_1.TxOutputDestinationType.THIRD_PARTY]: 1,
		        [internal_1.TxOutputDestinationType.DEVICE_OWNED]: 2,
		    };
		    switch (destination.type) {
		        case internal_1.TxOutputDestinationType.THIRD_PARTY:
		            return Buffer$1.concat([
		                (0, serialize_1.uint8_to_buf)(typeEncoding[destination.type]),
		                (0, serialize_1.uint32_to_buf)((destination.addressHex.length / 2)),
		                (0, serialize_1.hex_to_buf)(destination.addressHex),
		            ]);
		        case internal_1.TxOutputDestinationType.DEVICE_OWNED:
		            return Buffer$1.concat([
		                (0, serialize_1.uint8_to_buf)(typeEncoding[destination.type]),
		                (0, addressParams_1.serializeAddressParams)(destination.addressParams, version),
		            ]);
		        default:
		            (0, assert_1.unreachable)(destination);
		    }
		}
		exports.serializeTxOutputDestination = serializeTxOutputDestination;
		function serializeTxOutputBasicParams(output, version) {
		    const serializationFormatBuffer = (0, getVersion_1.getCompatibility)(version).supportsBabbage
		        ? (0, serialize_1.uint8_to_buf)(output.format)
		        : Buffer$1.from([]);
		    const includeDatumBuffer = (0, getVersion_1.getCompatibility)(version).supportsAlonzo
		        ? (0, serialize_1.serializeOptionFlag)(output.datum != null)
		        : Buffer$1.from([]);
		    const includeScriptBuffer = (0, getVersion_1.getCompatibility)(version).supportsBabbage
		        ? (0, serialize_1.serializeOptionFlag)(output.referenceScriptHex != null)
		        : Buffer$1.from([]);
		    return Buffer$1.concat([
		        serializationFormatBuffer,
		        serializeTxOutputDestination(output.destination, version),
		        (0, serialize_1.serializeCoin)(output.amount),
		        (0, serialize_1.uint32_to_buf)(output.tokenBundle.length),
		        includeDatumBuffer,
		        includeScriptBuffer,
		    ]);
		}
		exports.serializeTxOutputBasicParams = serializeTxOutputBasicParams;
		function serializeTxOutputDatum(datum, version) {
		    switch (datum.type) {
		        case public_1.DatumType.HASH: {
		            const datumHashBuffer = (0, getVersion_1.getCompatibility)(version).supportsBabbage
		                ? (0, serialize_1.uint8_to_buf)(public_1.DatumType.HASH)
		                : Buffer$1.concat([]);
		            return Buffer$1.concat([datumHashBuffer, (0, serialize_1.hex_to_buf)(datum.datumHashHex)]);
		        }
		        case public_1.DatumType.INLINE: {
		            const totalDatumSize = datum.datumHex.length / 2;
		            let chunkHex;
		            if (totalDatumSize > exports.MAX_CHUNK_SIZE) {
		                chunkHex = datum.datumHex.substring(0, exports.MAX_CHUNK_SIZE * 2);
		            }
		            else {
		                chunkHex = datum.datumHex;
		            }
		            const chunkSize = chunkHex.length / 2;
		            return Buffer$1.concat([
		                (0, serialize_1.uint8_to_buf)(public_1.DatumType.INLINE),
		                (0, serialize_1.uint32_to_buf)(totalDatumSize),
		                (0, serialize_1.uint32_to_buf)(chunkSize),
		                (0, serialize_1.hex_to_buf)(chunkHex),
		            ]);
		        }
		        default:
		            return (0, assert_1.unreachable)(datum);
		    }
		}
		exports.serializeTxOutputDatum = serializeTxOutputDatum;
		function serializeTxOutputRefScript(referenceScriptHex) {
		    const totalScriptSize = referenceScriptHex.length / 2;
		    let chunkHex;
		    if (totalScriptSize > exports.MAX_CHUNK_SIZE) {
		        chunkHex = referenceScriptHex.substring(0, exports.MAX_CHUNK_SIZE * 2);
		    }
		    else {
		        chunkHex = referenceScriptHex;
		    }
		    const chunkSize = chunkHex.length / 2;
		    return Buffer$1.concat([
		        (0, serialize_1.uint32_to_buf)(totalScriptSize),
		        (0, serialize_1.uint32_to_buf)(chunkSize),
		        (0, serialize_1.hex_to_buf)(chunkHex),
		    ]);
		}
		exports.serializeTxOutputRefScript = serializeTxOutputRefScript;
		
	} (txOutput));
	return txOutput;
}

var hasRequiredCVoteRegistration;

function requireCVoteRegistration () {
	if (hasRequiredCVoteRegistration) return cVoteRegistration;
	hasRequiredCVoteRegistration = 1;
	Object.defineProperty(cVoteRegistration, "__esModule", { value: true });
	cVoteRegistration.serializeCVoteRegistrationVotingPurpose = cVoteRegistration.serializeCVoteRegistrationNonce = cVoteRegistration.serializeCVoteRegistrationPaymentDestination = cVoteRegistration.serializeCVoteRegistrationStakingPath = cVoteRegistration.serializeCVoteRegistrationDelegation = cVoteRegistration.serializeCVoteRegistrationVoteKey = cVoteRegistration.serializeCVoteRegistrationInit = void 0;
	const getVersion_1 = requireGetVersion();
	const public_1 = require_public();
	const assert_1 = requireAssert();
	const serialize_1 = requireSerialize();
	const addressParams_1 = requireAddressParams();
	const txOutput_1 = requireTxOutput();
	function serializeCVoteRegistrationInit(params) {
	    const registrationFormatEncoding = {
	        [public_1.CIP36VoteRegistrationFormat.CIP_15]: 0x01,
	        [public_1.CIP36VoteRegistrationFormat.CIP_36]: 0x02,
	    };
	    const formatBuffer = (0, serialize_1.uint8_to_buf)(registrationFormatEncoding[params.format]);
	    const numDelegations = params.delegations != null ? params.delegations.length : 0;
	    const numDelegationsBuffer = (0, serialize_1.uint32_to_buf)(numDelegations);
	    return Buffer$1.concat([
	        formatBuffer,
	        numDelegationsBuffer,
	    ]);
	}
	cVoteRegistration.serializeCVoteRegistrationInit = serializeCVoteRegistrationInit;
	function serializeDelegationType(type) {
	    const delegationTypeEncoding = {
	        [public_1.CIP36VoteDelegationType.KEY]: 0x01,
	        [public_1.CIP36VoteDelegationType.PATH]: 0x02,
	    };
	    return (0, serialize_1.uint8_to_buf)(delegationTypeEncoding[type]);
	}
	function serializeCVoteRegistrationVoteKey(votePublicKey, votePublicKeyPath, version) {
	    if (votePublicKey != null) {
	        (0, assert_1.assert)(votePublicKeyPath == null, 'redundant vote key path');
	        const delegationTypeBuffer = (0, getVersion_1.getCompatibility)(version).supportsCIP36
	            ? serializeDelegationType(public_1.CIP36VoteDelegationType.KEY)
	            : Buffer$1.from([]);
	        return Buffer$1.concat([delegationTypeBuffer, (0, serialize_1.hex_to_buf)(votePublicKey)]);
	    }
	    else {
	        (0, assert_1.assert)(votePublicKeyPath != null, 'missing vote key');
	        (0, assert_1.assert)((0, getVersion_1.getCompatibility)(version).supportsCIP36Vote, 'key derivation path for vote keys not supported by the device');
	        return Buffer$1.concat([
	            serializeDelegationType(public_1.CIP36VoteDelegationType.PATH),
	            (0, serialize_1.path_to_buf)(votePublicKeyPath),
	        ]);
	    }
	}
	cVoteRegistration.serializeCVoteRegistrationVoteKey = serializeCVoteRegistrationVoteKey;
	function serializeCVoteRegistrationDelegation(delegation) {
	    const typeBuffer = serializeDelegationType(delegation.type);
	    const weightBuffer = (0, serialize_1.uint32_to_buf)(delegation.weight);
	    switch (delegation.type) {
	        case public_1.CIP36VoteDelegationType.KEY:
	            return Buffer$1.concat([
	                typeBuffer,
	                (0, serialize_1.hex_to_buf)(delegation.voteKey),
	                weightBuffer,
	            ]);
	        case public_1.CIP36VoteDelegationType.PATH:
	            return Buffer$1.concat([
	                typeBuffer,
	                (0, serialize_1.path_to_buf)(delegation.voteKeyPath),
	                weightBuffer,
	            ]);
	        default:
	            (0, assert_1.unreachable)(delegation);
	    }
	}
	cVoteRegistration.serializeCVoteRegistrationDelegation = serializeCVoteRegistrationDelegation;
	function serializeCVoteRegistrationStakingPath(stakingPath) {
	    return Buffer$1.concat([(0, serialize_1.path_to_buf)(stakingPath)]);
	}
	cVoteRegistration.serializeCVoteRegistrationStakingPath = serializeCVoteRegistrationStakingPath;
	function serializeCVoteRegistrationPaymentDestination(paymentDestination, version) {
	    if ((0, getVersion_1.getCompatibility)(version).supportsCIP36) {
	        return (0, txOutput_1.serializeTxOutputDestination)(paymentDestination, version);
	    }
	    else {
	        (0, assert_1.assert)(paymentDestination.type === public_1.TxOutputDestinationType.DEVICE_OWNED, 'wrong destination for payment address in Catalyst');
	        return (0, addressParams_1.serializeAddressParams)(paymentDestination.addressParams, version);
	    }
	}
	cVoteRegistration.serializeCVoteRegistrationPaymentDestination = serializeCVoteRegistrationPaymentDestination;
	function serializeCVoteRegistrationNonce(nonce) {
	    return Buffer$1.concat([(0, serialize_1.uint64_to_buf)(nonce)]);
	}
	cVoteRegistration.serializeCVoteRegistrationNonce = serializeCVoteRegistrationNonce;
	function serializeCVoteRegistrationVotingPurpose(votingPurpose) {
	    const includeVotingPurposeBuffer = (0, serialize_1.serializeOptionFlag)(votingPurpose != null);
	    const votingPurposeBuffer = votingPurpose != null ? (0, serialize_1.uint64_to_buf)(votingPurpose) : Buffer$1.from([]);
	    return Buffer$1.concat([
	        includeVotingPurposeBuffer,
	        votingPurposeBuffer,
	    ]);
	}
	cVoteRegistration.serializeCVoteRegistrationVotingPurpose = serializeCVoteRegistrationVotingPurpose;
	
	return cVoteRegistration;
}

var poolRegistrationCertificate = {};

var hasRequiredPoolRegistrationCertificate;

function requirePoolRegistrationCertificate () {
	if (hasRequiredPoolRegistrationCertificate) return poolRegistrationCertificate;
	hasRequiredPoolRegistrationCertificate = 1;
	Object.defineProperty(poolRegistrationCertificate, "__esModule", { value: true });
	poolRegistrationCertificate.serializePoolMetadata = poolRegistrationCertificate.serializePoolRelay = poolRegistrationCertificate.serializePoolRewardAccountLegacy = poolRegistrationCertificate.serializePoolRewardAccount = poolRegistrationCertificate.serializePoolOwner = poolRegistrationCertificate.serializePoolKeyLegacy = poolRegistrationCertificate.serializePoolKey = poolRegistrationCertificate.serializeFinancials = poolRegistrationCertificate.serializePoolInitialParamsLegacy = poolRegistrationCertificate.serializePoolInitialParams = void 0;
	const internal_1 = requireInternal();
	const assert_1 = requireAssert();
	const serialize_1 = requireSerialize();
	const SignTxIncluded = Object.freeze({
	    SIGN_TX_INCLUDED_NO: 1,
	    SIGN_TX_INCLUDED_YES: 2,
	});
	function serializePoolInitialParams(pool) {
	    return Buffer$1.concat([
	        (0, serialize_1.uint32_to_buf)(pool.owners.length),
	        (0, serialize_1.uint32_to_buf)(pool.relays.length),
	    ]);
	}
	poolRegistrationCertificate.serializePoolInitialParams = serializePoolInitialParams;
	function serializePoolInitialParamsLegacy(pool) {
	    return Buffer$1.concat([
	        serializePoolKeyLegacy(pool.poolKey),
	        (0, serialize_1.hex_to_buf)(pool.vrfHashHex),
	        (0, serialize_1.serializeCoin)(pool.pledge),
	        (0, serialize_1.serializeCoin)(pool.cost),
	        (0, serialize_1.uint64_to_buf)(pool.margin.numerator),
	        (0, serialize_1.uint64_to_buf)(pool.margin.denominator),
	        serializePoolRewardAccountLegacy(pool.rewardAccount),
	        (0, serialize_1.uint32_to_buf)(pool.owners.length),
	        (0, serialize_1.uint32_to_buf)(pool.relays.length),
	    ]);
	}
	poolRegistrationCertificate.serializePoolInitialParamsLegacy = serializePoolInitialParamsLegacy;
	function serializeFinancials(pool) {
	    return Buffer$1.concat([
	        (0, serialize_1.serializeCoin)(pool.pledge),
	        (0, serialize_1.serializeCoin)(pool.cost),
	        (0, serialize_1.uint64_to_buf)(pool.margin.numerator),
	        (0, serialize_1.uint64_to_buf)(pool.margin.denominator),
	    ]);
	}
	poolRegistrationCertificate.serializeFinancials = serializeFinancials;
	function serializePoolKey(key) {
	    const typeHeader = {
	        [internal_1.PoolKeyType.DEVICE_OWNED]: 1,
	        [internal_1.PoolKeyType.THIRD_PARTY]: 2,
	    };
	    switch (key.type) {
	        case internal_1.PoolKeyType.DEVICE_OWNED: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(typeHeader[key.type]),
	                (0, serialize_1.path_to_buf)(key.path),
	            ]);
	        }
	        case internal_1.PoolKeyType.THIRD_PARTY: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(typeHeader[key.type]),
	                (0, serialize_1.hex_to_buf)(key.hashHex),
	            ]);
	        }
	        default:
	            (0, assert_1.unreachable)(key);
	    }
	}
	poolRegistrationCertificate.serializePoolKey = serializePoolKey;
	function serializePoolKeyLegacy(key) {
	    (0, assert_1.assert)(key.type === internal_1.PoolKeyType.THIRD_PARTY, 'invalid pool key type for legacy Ledger version');
	    return (0, serialize_1.hex_to_buf)(key.hashHex);
	}
	poolRegistrationCertificate.serializePoolKeyLegacy = serializePoolKeyLegacy;
	function serializePoolOwner(owner) {
	    const typeHeader = {
	        [internal_1.PoolOwnerType.DEVICE_OWNED]: 1,
	        [internal_1.PoolOwnerType.THIRD_PARTY]: 2,
	    };
	    switch (owner.type) {
	        case internal_1.PoolOwnerType.DEVICE_OWNED: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(typeHeader[owner.type]),
	                (0, serialize_1.path_to_buf)(owner.path),
	            ]);
	        }
	        case internal_1.PoolOwnerType.THIRD_PARTY: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(typeHeader[owner.type]),
	                (0, serialize_1.hex_to_buf)(owner.hashHex),
	            ]);
	        }
	        default:
	            (0, assert_1.unreachable)(owner);
	    }
	}
	poolRegistrationCertificate.serializePoolOwner = serializePoolOwner;
	function serializePoolRewardAccount(rewardAccount) {
	    const typeHeader = {
	        [internal_1.PoolRewardAccountType.DEVICE_OWNED]: 1,
	        [internal_1.PoolRewardAccountType.THIRD_PARTY]: 2,
	    };
	    switch (rewardAccount.type) {
	        case internal_1.PoolRewardAccountType.DEVICE_OWNED: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(typeHeader[rewardAccount.type]),
	                (0, serialize_1.path_to_buf)(rewardAccount.path),
	            ]);
	        }
	        case internal_1.PoolRewardAccountType.THIRD_PARTY: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(typeHeader[rewardAccount.type]),
	                (0, serialize_1.hex_to_buf)(rewardAccount.rewardAccountHex),
	            ]);
	        }
	        default:
	            (0, assert_1.unreachable)(rewardAccount);
	    }
	}
	poolRegistrationCertificate.serializePoolRewardAccount = serializePoolRewardAccount;
	function serializePoolRewardAccountLegacy(rewardAccount) {
	    (0, assert_1.assert)(rewardAccount.type === internal_1.PoolRewardAccountType.THIRD_PARTY, 'invalid pool reward account type for legacy Ledger version');
	    return (0, serialize_1.hex_to_buf)(rewardAccount.rewardAccountHex);
	}
	poolRegistrationCertificate.serializePoolRewardAccountLegacy = serializePoolRewardAccountLegacy;
	function serializePoolRelay(relay) {
	    function serializeOptional(x, cb) {
	        if (x == null) {
	            return Buffer$1.concat([(0, serialize_1.uint8_to_buf)(1)]);
	        }
	        else {
	            return Buffer$1.concat([(0, serialize_1.uint8_to_buf)(2), cb(x)]);
	        }
	    }
	    switch (relay.type) {
	        case 0: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(relay.type),
	                serializeOptional(relay.port, (port) => (0, serialize_1.uint16_to_buf)(port)),
	                serializeOptional(relay.ipv4, (ipv4) => ipv4),
	                serializeOptional(relay.ipv6, (ipv6) => ipv6),
	            ]);
	        }
	        case 1: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(relay.type),
	                serializeOptional(relay.port, (port) => (0, serialize_1.uint16_to_buf)(port)),
	                Buffer$1.from(relay.dnsName, 'ascii'),
	            ]);
	        }
	        case 2: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(relay.type),
	                Buffer$1.from(relay.dnsName, 'ascii'),
	            ]);
	        }
	        default:
	            (0, assert_1.unreachable)(relay);
	    }
	}
	poolRegistrationCertificate.serializePoolRelay = serializePoolRelay;
	function serializePoolMetadata(metadata) {
	    if (metadata == null) {
	        return Buffer$1.concat([
	            (0, serialize_1.uint8_to_buf)(SignTxIncluded.SIGN_TX_INCLUDED_NO),
	        ]);
	    }
	    else {
	        return Buffer$1.concat([
	            (0, serialize_1.uint8_to_buf)(SignTxIncluded.SIGN_TX_INCLUDED_YES),
	            (0, serialize_1.hex_to_buf)(metadata.hashHex),
	            Buffer$1.from(metadata.url, 'ascii'),
	        ]);
	    }
	}
	poolRegistrationCertificate.serializePoolMetadata = serializePoolMetadata;
	
	return poolRegistrationCertificate;
}

var txAuxiliaryData$1 = {};

var hasRequiredTxAuxiliaryData$1;

function requireTxAuxiliaryData$1 () {
	if (hasRequiredTxAuxiliaryData$1) return txAuxiliaryData$1;
	hasRequiredTxAuxiliaryData$1 = 1;
	Object.defineProperty(txAuxiliaryData$1, "__esModule", { value: true });
	txAuxiliaryData$1.serializeTxAuxiliaryData = void 0;
	const internal_1 = requireInternal();
	const assert_1 = requireAssert();
	const serialize_1 = requireSerialize();
	function serializeTxAuxiliaryData(auxiliaryData) {
	    const auxiliaryDataTypesEncoding = {
	        [internal_1.TxAuxiliaryDataType.ARBITRARY_HASH]: 0x00,
	        [internal_1.TxAuxiliaryDataType.CIP36_REGISTRATION]: 0x01,
	    };
	    switch (auxiliaryData.type) {
	        case internal_1.TxAuxiliaryDataType.ARBITRARY_HASH: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(auxiliaryDataTypesEncoding[auxiliaryData.type]),
	                (0, serialize_1.hex_to_buf)(auxiliaryData.hashHex),
	            ]);
	        }
	        case internal_1.TxAuxiliaryDataType.CIP36_REGISTRATION: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(auxiliaryDataTypesEncoding[auxiliaryData.type]),
	            ]);
	        }
	        default:
	            (0, assert_1.unreachable)(auxiliaryData);
	    }
	}
	txAuxiliaryData$1.serializeTxAuxiliaryData = serializeTxAuxiliaryData;
	
	return txAuxiliaryData$1;
}

var txCertificate = {};

var hasRequiredTxCertificate;

function requireTxCertificate () {
	if (hasRequiredTxCertificate) return txCertificate;
	hasRequiredTxCertificate = 1;
	Object.defineProperty(txCertificate, "__esModule", { value: true });
	txCertificate.serializeTxCertificate = txCertificate.serializeTxCertificatePreMultisig = txCertificate.serializeDRep = void 0;
	const internal_1 = requireInternal();
	const assert_1 = requireAssert();
	const serialize_1 = requireSerialize();
	const getVersion_1 = requireGetVersion();
	function serializeDRep(dRep) {
	    switch (dRep.type) {
	        case 100:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(dRep.type),
	                (0, serialize_1.path_to_buf)(dRep.path),
	            ]);
	        case 0:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(dRep.type),
	                (0, serialize_1.hex_to_buf)(dRep.keyHashHex),
	            ]);
	        case 1:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(dRep.type),
	                (0, serialize_1.hex_to_buf)(dRep.scriptHashHex),
	            ]);
	        case 2:
	        case 3:
	            return Buffer$1.concat([(0, serialize_1.uint8_to_buf)(dRep.type)]);
	        default:
	            (0, assert_1.unreachable)(dRep);
	    }
	}
	txCertificate.serializeDRep = serializeDRep;
	function serializeTxCertificatePreMultisig(certificate) {
	    switch (certificate.type) {
	        case internal_1.CertificateType.STAKE_REGISTRATION:
	        case internal_1.CertificateType.STAKE_DEREGISTRATION: {
	            (0, assert_1.assert)(certificate.stakeCredential.type === 0, 'invalid stake credential');
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.path_to_buf)(certificate.stakeCredential.path),
	            ]);
	        }
	        case internal_1.CertificateType.STAKE_DELEGATION: {
	            (0, assert_1.assert)(certificate.stakeCredential.type === 0, 'invalid stake credential');
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.path_to_buf)(certificate.stakeCredential.path),
	                (0, serialize_1.hex_to_buf)(certificate.poolKeyHashHex),
	            ]);
	        }
	        case internal_1.CertificateType.STAKE_POOL_REGISTRATION: {
	            return Buffer$1.concat([(0, serialize_1.uint8_to_buf)(certificate.type)]);
	        }
	        case internal_1.CertificateType.STAKE_POOL_RETIREMENT: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.path_to_buf)(certificate.path),
	                (0, serialize_1.uint64_to_buf)(certificate.retirementEpoch),
	            ]);
	        }
	        case internal_1.CertificateType.STAKE_REGISTRATION_CONWAY:
	        case internal_1.CertificateType.STAKE_DEREGISTRATION_CONWAY:
	        case internal_1.CertificateType.VOTE_DELEGATION:
	        case internal_1.CertificateType.AUTHORIZE_COMMITTEE_HOT:
	        case internal_1.CertificateType.RESIGN_COMMITTEE_COLD:
	        case internal_1.CertificateType.DREP_REGISTRATION:
	        case internal_1.CertificateType.DREP_DEREGISTRATION:
	        case internal_1.CertificateType.DREP_UPDATE: {
	            (0, assert_1.assert)(false, 'Conway certificates in pre-multisig serialization');
	            break;
	        }
	        default:
	            (0, assert_1.unreachable)(certificate);
	    }
	}
	txCertificate.serializeTxCertificatePreMultisig = serializeTxCertificatePreMultisig;
	function serializeTxCertificate(certificate, version) {
	    if (!(0, getVersion_1.getCompatibility)(version).supportsMultisigTransaction) {
	        return serializeTxCertificatePreMultisig(certificate);
	    }
	    switch (certificate.type) {
	        case internal_1.CertificateType.STAKE_REGISTRATION:
	        case internal_1.CertificateType.STAKE_DEREGISTRATION: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.serializeCredential)(certificate.stakeCredential),
	            ]);
	        }
	        case internal_1.CertificateType.STAKE_REGISTRATION_CONWAY:
	        case internal_1.CertificateType.STAKE_DEREGISTRATION_CONWAY: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.serializeCredential)(certificate.stakeCredential),
	                (0, serialize_1.serializeCoin)(certificate.deposit),
	            ]);
	        }
	        case internal_1.CertificateType.STAKE_DELEGATION: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.serializeCredential)(certificate.stakeCredential),
	                (0, serialize_1.hex_to_buf)(certificate.poolKeyHashHex),
	            ]);
	        }
	        case internal_1.CertificateType.VOTE_DELEGATION: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.serializeCredential)(certificate.stakeCredential),
	                serializeDRep(certificate.dRep),
	            ]);
	        }
	        case internal_1.CertificateType.AUTHORIZE_COMMITTEE_HOT: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.serializeCredential)(certificate.coldCredential),
	                (0, serialize_1.serializeCredential)(certificate.hotCredential),
	            ]);
	        }
	        case internal_1.CertificateType.RESIGN_COMMITTEE_COLD: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.serializeCredential)(certificate.coldCredential),
	                (0, serialize_1.serializeAnchor)(certificate.anchor),
	            ]);
	        }
	        case internal_1.CertificateType.DREP_REGISTRATION: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.serializeCredential)(certificate.dRepCredential),
	                (0, serialize_1.serializeCoin)(certificate.deposit),
	                (0, serialize_1.serializeAnchor)(certificate.anchor),
	            ]);
	        }
	        case internal_1.CertificateType.DREP_DEREGISTRATION: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.serializeCredential)(certificate.dRepCredential),
	                (0, serialize_1.serializeCoin)(certificate.deposit),
	            ]);
	        }
	        case internal_1.CertificateType.DREP_UPDATE: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.serializeCredential)(certificate.dRepCredential),
	                (0, serialize_1.serializeAnchor)(certificate.anchor),
	            ]);
	        }
	        case internal_1.CertificateType.STAKE_POOL_REGISTRATION: {
	            return Buffer$1.concat([(0, serialize_1.uint8_to_buf)(certificate.type)]);
	        }
	        case internal_1.CertificateType.STAKE_POOL_RETIREMENT: {
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(certificate.type),
	                (0, serialize_1.path_to_buf)(certificate.path),
	                (0, serialize_1.uint64_to_buf)(certificate.retirementEpoch),
	            ]);
	        }
	        default:
	            (0, assert_1.unreachable)(certificate);
	    }
	}
	txCertificate.serializeTxCertificate = serializeTxCertificate;
	
	return txCertificate;
}

var txInit = {};

var hasRequiredTxInit;

function requireTxInit () {
	if (hasRequiredTxInit) return txInit;
	hasRequiredTxInit = 1;
	Object.defineProperty(txInit, "__esModule", { value: true });
	txInit.serializeTxInit = void 0;
	const internal_1 = requireInternal();
	const assert_1 = requireAssert();
	const serialize_1 = requireSerialize();
	const getVersion_1 = requireGetVersion();
	const _serializeSigningMode = (mode) => {
	    const value = {
	        [internal_1.TransactionSigningMode.ORDINARY_TRANSACTION]: 3,
	        [internal_1.TransactionSigningMode.POOL_REGISTRATION_AS_OWNER]: 4,
	        [internal_1.TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR]: 5,
	        [internal_1.TransactionSigningMode.MULTISIG_TRANSACTION]: 6,
	        [internal_1.TransactionSigningMode.PLUTUS_TRANSACTION]: 7,
	    }[mode];
	    (0, assert_1.assert)(value !== undefined, 'Invalid signing mode');
	    return (0, serialize_1.uint8_to_buf)(value);
	};
	function serializeTxOptions(options) {
	    let optionFlags = 0;
	    if (options.tagCborSets) {
	        optionFlags += 1;
	    }
	    return (0, serialize_1.uint64_to_buf)(optionFlags.toString());
	}
	function serializeTxInit(tx, signingMode, numWitnesses, options, version) {
	    const optionsBuffer = (0, getVersion_1.getCompatibility)(version).supportsConway
	        ? serializeTxOptions(options)
	        : Buffer$1.from([]);
	    const appAwareOfMint = (0, getVersion_1.getCompatibility)(version).supportsMint || version.flags.isAppXS;
	    const mintBuffer = appAwareOfMint
	        ? (0, serialize_1.serializeOptionFlag)(tx.mint != null)
	        : Buffer$1.from([]);
	    const scriptDataHashBuffer = (0, getVersion_1.getCompatibility)(version).supportsAlonzo
	        ? (0, serialize_1.serializeOptionFlag)(tx.scriptDataHashHex != null)
	        : Buffer$1.from([]);
	    const collateralInputsBuffer = (0, getVersion_1.getCompatibility)(version).supportsAlonzo
	        ? (0, serialize_1.uint32_to_buf)(tx.collateralInputs.length)
	        : Buffer$1.from([]);
	    const requiredSignersBuffer = (0, getVersion_1.getCompatibility)(version).supportsAlonzo
	        ? (0, serialize_1.uint32_to_buf)(tx.requiredSigners.length)
	        : Buffer$1.from([]);
	    const includeNetworkIdBuffer = (0, getVersion_1.getCompatibility)(version).supportsAlonzo
	        ? (0, serialize_1.serializeOptionFlag)(tx.includeNetworkId)
	        : Buffer$1.from([]);
	    const includeCollateralOutputBuffer = (0, getVersion_1.getCompatibility)(version)
	        .supportsBabbage
	        ? (0, serialize_1.serializeOptionFlag)(tx.collateralOutput != null)
	        : Buffer$1.from([]);
	    const includeTotalCollateralBuffer = (0, getVersion_1.getCompatibility)(version).supportsBabbage
	        ? (0, serialize_1.serializeOptionFlag)(tx.totalCollateral != null)
	        : Buffer$1.from([]);
	    const referenceInputsBuffer = (0, getVersion_1.getCompatibility)(version).supportsBabbage
	        ? (0, serialize_1.uint32_to_buf)(tx.referenceInputs.length)
	        : Buffer$1.from([]);
	    const votingProceduresBuffer = (0, getVersion_1.getCompatibility)(version).supportsConway
	        ? (0, serialize_1.uint32_to_buf)(tx.votingProcedures.length)
	        : Buffer$1.from([]);
	    const includeTreasuryBuffer = (0, getVersion_1.getCompatibility)(version).supportsConway
	        ? (0, serialize_1.serializeOptionFlag)(tx.treasury != null)
	        : Buffer$1.from([]);
	    const includeDonationBuffer = (0, getVersion_1.getCompatibility)(version).supportsConway
	        ? (0, serialize_1.serializeOptionFlag)(tx.donation != null)
	        : Buffer$1.from([]);
	    const witnessBufferLegacy = (0, getVersion_1.getCompatibility)(version).supportsBabbage
	        ? Buffer$1.from([])
	        : (0, serialize_1.uint32_to_buf)(numWitnesses);
	    const witnessBufferBabbage = (0, getVersion_1.getCompatibility)(version).supportsBabbage
	        ? (0, serialize_1.uint32_to_buf)(numWitnesses)
	        : Buffer$1.from([]);
	    return Buffer$1.concat([
	        optionsBuffer,
	        (0, serialize_1.uint8_to_buf)(tx.network.networkId),
	        (0, serialize_1.uint32_to_buf)(tx.network.protocolMagic),
	        (0, serialize_1.serializeOptionFlag)(tx.ttl != null),
	        (0, serialize_1.serializeOptionFlag)(tx.auxiliaryData != null),
	        (0, serialize_1.serializeOptionFlag)(tx.validityIntervalStart != null),
	        mintBuffer,
	        scriptDataHashBuffer,
	        includeNetworkIdBuffer,
	        includeCollateralOutputBuffer,
	        includeTotalCollateralBuffer,
	        includeTreasuryBuffer,
	        includeDonationBuffer,
	        _serializeSigningMode(signingMode),
	        (0, serialize_1.uint32_to_buf)(tx.inputs.length),
	        (0, serialize_1.uint32_to_buf)(tx.outputs.length),
	        (0, serialize_1.uint32_to_buf)(tx.certificates.length),
	        (0, serialize_1.uint32_to_buf)(tx.withdrawals.length),
	        witnessBufferLegacy,
	        collateralInputsBuffer,
	        requiredSignersBuffer,
	        referenceInputsBuffer,
	        votingProceduresBuffer,
	        witnessBufferBabbage,
	    ]);
	}
	txInit.serializeTxInit = serializeTxInit;
	
	return txInit;
}

var txOther = {};

var hasRequiredTxOther;

function requireTxOther () {
	if (hasRequiredTxOther) return txOther;
	hasRequiredTxOther = 1;
	Object.defineProperty(txOther, "__esModule", { value: true });
	txOther.serializeVoterVotes = txOther.serializeRequiredSigner = txOther.serializeMintBasicParams = txOther.serializeToken = txOther.serializeAssetGroup = txOther.serializeTxWitnessRequest = txOther.serializeTxValidityStart = txOther.serializeTxTtl = txOther.serializeTxWithdrawal = txOther.serializeTxInput = void 0;
	const public_1 = require_public();
	const invalidDataReason_1 = requireInvalidDataReason();
	const assert_1 = requireAssert();
	const serialize_1 = requireSerialize();
	const getVersion_1 = requireGetVersion();
	function serializeTxInput(input) {
	    return Buffer$1.concat([
	        (0, serialize_1.hex_to_buf)(input.txHashHex),
	        (0, serialize_1.uint32_to_buf)(input.outputIndex),
	    ]);
	}
	txOther.serializeTxInput = serializeTxInput;
	function serializeTxWithdrawal(withdrawal, version) {
	    if ((0, getVersion_1.getCompatibility)(version).supportsMultisigTransaction) {
	        return Buffer$1.concat([
	            (0, serialize_1.serializeCoin)(withdrawal.amount),
	            (0, serialize_1.serializeCredential)(withdrawal.stakeCredential),
	        ]);
	    }
	    else {
	        (0, assert_1.assert)(withdrawal.stakeCredential.type === 0, invalidDataReason_1.InvalidDataReason.WITHDRAWAL_INVALID_STAKE_CREDENTIAL);
	        return Buffer$1.concat([
	            (0, serialize_1.serializeCoin)(withdrawal.amount),
	            (0, serialize_1.path_to_buf)(withdrawal.stakeCredential.path),
	        ]);
	    }
	}
	txOther.serializeTxWithdrawal = serializeTxWithdrawal;
	function serializeTxTtl(ttl) {
	    return Buffer$1.concat([(0, serialize_1.uint64_to_buf)(ttl)]);
	}
	txOther.serializeTxTtl = serializeTxTtl;
	function serializeTxValidityStart(validityIntervalStart) {
	    return Buffer$1.concat([(0, serialize_1.uint64_to_buf)(validityIntervalStart)]);
	}
	txOther.serializeTxValidityStart = serializeTxValidityStart;
	function serializeTxWitnessRequest(path) {
	    return Buffer$1.concat([(0, serialize_1.path_to_buf)(path)]);
	}
	txOther.serializeTxWitnessRequest = serializeTxWitnessRequest;
	function serializeAssetGroup(assetGroup) {
	    return Buffer$1.concat([
	        (0, serialize_1.hex_to_buf)(assetGroup.policyIdHex),
	        (0, serialize_1.uint32_to_buf)(assetGroup.tokens.length),
	    ]);
	}
	txOther.serializeAssetGroup = serializeAssetGroup;
	function serializeToken(token, serializeTokenAmountFn) {
	    return Buffer$1.concat([
	        (0, serialize_1.uint32_to_buf)((token.assetNameHex.length / 2)),
	        (0, serialize_1.hex_to_buf)(token.assetNameHex),
	        serializeTokenAmountFn(token.amount),
	    ]);
	}
	txOther.serializeToken = serializeToken;
	function serializeMintBasicParams(mint) {
	    return Buffer$1.concat([(0, serialize_1.uint32_to_buf)(mint.length)]);
	}
	txOther.serializeMintBasicParams = serializeMintBasicParams;
	function serializeRequiredSigner(requiredSigner) {
	    switch (requiredSigner.type) {
	        case 0:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(requiredSigner.type),
	                (0, serialize_1.path_to_buf)(requiredSigner.path),
	            ]);
	        case 1:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(requiredSigner.type),
	                (0, serialize_1.hex_to_buf)(requiredSigner.hashHex),
	            ]);
	        default:
	            (0, assert_1.unreachable)(requiredSigner);
	    }
	}
	txOther.serializeRequiredSigner = serializeRequiredSigner;
	function serializeVoter(voter) {
	    switch (voter.type) {
	        case public_1.VoterType.COMMITTEE_KEY_HASH:
	        case public_1.VoterType.DREP_KEY_HASH:
	        case public_1.VoterType.STAKE_POOL_KEY_HASH:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(voter.type),
	                (0, serialize_1.hex_to_buf)(voter.keyHashHex),
	            ]);
	        case public_1.VoterType.COMMITTEE_KEY_PATH:
	        case public_1.VoterType.DREP_KEY_PATH:
	        case public_1.VoterType.STAKE_POOL_KEY_PATH:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(voter.type),
	                (0, serialize_1.path_to_buf)(voter.keyPath),
	            ]);
	        case public_1.VoterType.COMMITTEE_SCRIPT_HASH:
	        case public_1.VoterType.DREP_SCRIPT_HASH:
	            return Buffer$1.concat([
	                (0, serialize_1.uint8_to_buf)(voter.type),
	                (0, serialize_1.hex_to_buf)(voter.scriptHashHex),
	            ]);
	        default:
	            (0, assert_1.unreachable)(voter);
	    }
	}
	function serializeVoterVotes(voterVotes) {
	    (0, assert_1.assert)(voterVotes.votes.length === 1, 'too few / too many votes');
	    const vote = voterVotes.votes[0];
	    return Buffer$1.concat([
	        serializeVoter(voterVotes.voter),
	        Buffer$1.concat([
	            (0, serialize_1.hex_to_buf)(vote.govActionId.txHashHex),
	            (0, serialize_1.uint32_to_buf)(vote.govActionId.govActionIndex),
	        ]),
	        Buffer$1.concat([
	            (0, serialize_1.uint8_to_buf)(vote.votingProcedure.vote),
	            (0, serialize_1.serializeAnchor)(vote.votingProcedure.anchor),
	        ]),
	    ]);
	}
	txOther.serializeVoterVotes = serializeVoterVotes;
	
	return txOther;
}

var hasRequiredSignTx;

function requireSignTx () {
	if (hasRequiredSignTx) return signTx;
	hasRequiredSignTx = 1;
	Object.defineProperty(signTx, "__esModule", { value: true });
	signTx.signTransaction = void 0;
	const errors_1 = requireErrors();
	const internal_1 = requireInternal();
	const public_1 = require_public();
	const utils_1 = requireUtils();
	const assert_1 = requireAssert();
	const serialize_1 = requireSerialize();
	const getVersion_1 = requireGetVersion();
	const cVoteRegistration_1 = requireCVoteRegistration();
	const poolRegistrationCertificate_1 = requirePoolRegistrationCertificate();
	const txAuxiliaryData_1 = requireTxAuxiliaryData$1();
	const txCertificate_1 = requireTxCertificate();
	const txInit_1 = requireTxInit();
	const txOther_1 = requireTxOther();
	const txOutput_1 = requireTxOutput();
	const send = (params) => (Object.assign({ ins: 33 }, params));
	function* signTx_init(tx, signingMode, witnessPaths, options, version) {
	    yield send({
	        p1: 1,
	        p2: 0,
	        data: (0, txInit_1.serializeTxInit)(tx, signingMode, witnessPaths.length, options, version),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_addInput(input) {
	    yield send({
	        p1: 2,
	        p2: 0,
	        data: (0, txOther_1.serializeTxInput)(input),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_addOutput_sendChunks(hex, p2) {
	    let start = txOutput_1.MAX_CHUNK_SIZE * 2;
	    let end = start;
	    while (start < hex.length) {
	        end = Math.min(hex.length, start + txOutput_1.MAX_CHUNK_SIZE * 2);
	        const chunk = hex.substring(start, end);
	        yield send({
	            p1: 3,
	            p2,
	            data: Buffer$1.concat([
	                (0, serialize_1.uint32_to_buf)((chunk.length / 2)),
	                (0, serialize_1.hex_to_buf)(chunk),
	            ]),
	            expectedResponseLength: 0,
	        });
	        start = end;
	    }
	}
	function* signTx_addTokenBundle(tokenBundle, p1, serializeTokenAmountFn) {
	    for (const assetGroup of tokenBundle) {
	        yield send({
	            p1,
	            p2: 49,
	            data: (0, txOther_1.serializeAssetGroup)(assetGroup),
	            expectedResponseLength: 0,
	        });
	        for (const token of assetGroup.tokens) {
	            yield send({
	                p1,
	                p2: 50,
	                data: (0, txOther_1.serializeToken)(token, serializeTokenAmountFn),
	                expectedResponseLength: 0,
	            });
	        }
	    }
	}
	function* signTx_addOutput(output, version) {
	    yield send({
	        p1: 3,
	        p2: 48,
	        data: (0, txOutput_1.serializeTxOutputBasicParams)(output, version),
	        expectedResponseLength: 0,
	    });
	    yield* signTx_addTokenBundle(output.tokenBundle, 3, serialize_1.uint64_to_buf);
	    if (output.datum) {
	        yield send({
	            p1: 3,
	            p2: 52,
	            data: (0, txOutput_1.serializeTxOutputDatum)(output.datum, version),
	            expectedResponseLength: 0,
	        });
	        if (output.datum.type === public_1.DatumType.INLINE) {
	            const additionalChunksNeeded = output.datum.datumHex.length / 2 > txOutput_1.MAX_CHUNK_SIZE;
	            if (additionalChunksNeeded) {
	                yield* signTx_addOutput_sendChunks(output.datum.datumHex, 53);
	            }
	        }
	    }
	    if (output.referenceScriptHex) {
	        yield send({
	            p1: 3,
	            p2: 54,
	            data: (0, txOutput_1.serializeTxOutputRefScript)(output.referenceScriptHex),
	            expectedResponseLength: 0,
	        });
	        if (output.referenceScriptHex.length / 2 > txOutput_1.MAX_CHUNK_SIZE) {
	            yield* signTx_addOutput_sendChunks(output.referenceScriptHex, 55);
	        }
	    }
	    yield send({
	        p1: 3,
	        p2: 51,
	        data: Buffer$1.concat([]),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_addStakePoolRegistrationCertificate(certificate) {
	    (0, assert_1.assert)(certificate.type === internal_1.CertificateType.STAKE_POOL_REGISTRATION, 'invalid certificate type');
	    const pool = certificate.pool;
	    yield send({
	        p1: 6,
	        p2: 48,
	        data: (0, poolRegistrationCertificate_1.serializePoolInitialParams)(pool),
	        expectedResponseLength: 0,
	    });
	    yield send({
	        p1: 6,
	        p2: 49,
	        data: (0, poolRegistrationCertificate_1.serializePoolKey)(pool.poolKey),
	        expectedResponseLength: 0,
	    });
	    yield send({
	        p1: 6,
	        p2: 50,
	        data: (0, serialize_1.hex_to_buf)(pool.vrfHashHex),
	        expectedResponseLength: 0,
	    });
	    yield send({
	        p1: 6,
	        p2: 51,
	        data: (0, poolRegistrationCertificate_1.serializeFinancials)(pool),
	        expectedResponseLength: 0,
	    });
	    yield send({
	        p1: 6,
	        p2: 52,
	        data: (0, poolRegistrationCertificate_1.serializePoolRewardAccount)(pool.rewardAccount),
	        expectedResponseLength: 0,
	    });
	    for (const owner of pool.owners) {
	        yield send({
	            p1: 6,
	            p2: 53,
	            data: (0, poolRegistrationCertificate_1.serializePoolOwner)(owner),
	            expectedResponseLength: 0,
	        });
	    }
	    for (const relay of pool.relays) {
	        yield send({
	            p1: 6,
	            p2: 54,
	            data: (0, poolRegistrationCertificate_1.serializePoolRelay)(relay),
	            expectedResponseLength: 0,
	        });
	    }
	    yield send({
	        p1: 6,
	        p2: 55,
	        data: (0, poolRegistrationCertificate_1.serializePoolMetadata)(pool.metadata),
	        expectedResponseLength: 0,
	    });
	    yield send({
	        p1: 6,
	        p2: 56,
	        data: Buffer$1.alloc(0),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_addStakePoolRegistrationCertificateLegacy(certificate) {
	    (0, assert_1.assert)(certificate.type === internal_1.CertificateType.STAKE_POOL_REGISTRATION, 'invalid certificate type');
	    const pool = certificate.pool;
	    yield send({
	        p1: 6,
	        p2: 48,
	        data: (0, poolRegistrationCertificate_1.serializePoolInitialParamsLegacy)(pool),
	        expectedResponseLength: 0,
	    });
	    for (const owner of pool.owners) {
	        yield send({
	            p1: 6,
	            p2: 49,
	            data: (0, poolRegistrationCertificate_1.serializePoolOwner)(owner),
	            expectedResponseLength: 0,
	        });
	    }
	    for (const relay of pool.relays) {
	        yield send({
	            p1: 6,
	            p2: 50,
	            data: (0, poolRegistrationCertificate_1.serializePoolRelay)(relay),
	            expectedResponseLength: 0,
	        });
	    }
	    yield send({
	        p1: 6,
	        p2: 51,
	        data: (0, poolRegistrationCertificate_1.serializePoolMetadata)(pool.metadata),
	        expectedResponseLength: 0,
	    });
	    yield send({
	        p1: 6,
	        p2: 52,
	        data: Buffer$1.alloc(0),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_addCertificate(certificate, version) {
	    yield send({
	        p1: 6,
	        p2: 0,
	        data: (0, txCertificate_1.serializeTxCertificate)(certificate, version),
	        expectedResponseLength: 0,
	    });
	    if (certificate.type === internal_1.CertificateType.STAKE_POOL_REGISTRATION) {
	        if ((0, getVersion_1.getCompatibility)(version).supportsPoolRegistrationAsOperator) {
	            yield* signTx_addStakePoolRegistrationCertificate(certificate);
	        }
	        else {
	            yield* signTx_addStakePoolRegistrationCertificateLegacy(certificate);
	        }
	    }
	}
	function* signTx_addWithdrawal(withdrawal, version) {
	    yield send({
	        p1: 7,
	        p2: 0,
	        data: (0, txOther_1.serializeTxWithdrawal)(withdrawal, version),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_setFee(fee) {
	    yield send({
	        p1: 4,
	        p2: 0,
	        data: (0, serialize_1.serializeCoin)(fee),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_setTtl(ttl) {
	    yield send({
	        p1: 5,
	        p2: 0,
	        data: (0, txOther_1.serializeTxTtl)(ttl),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_setAuxiliaryData(auxiliaryData, version) {
	    const supportedAuxiliaryDataTypes = [
	        public_1.TxAuxiliaryDataType.ARBITRARY_HASH,
	        public_1.TxAuxiliaryDataType.CIP36_REGISTRATION,
	    ];
	    (0, assert_1.assert)(supportedAuxiliaryDataTypes.includes(auxiliaryData.type), 'Auxiliary data type not implemented');
	    yield send({
	        p1: 8,
	        p2: 0,
	        data: (0, txAuxiliaryData_1.serializeTxAuxiliaryData)(auxiliaryData),
	        expectedResponseLength: 0,
	    });
	    if (auxiliaryData.type === public_1.TxAuxiliaryDataType.CIP36_REGISTRATION) {
	        const params = auxiliaryData.params;
	        if ((0, getVersion_1.getCompatibility)(version).supportsCIP36) {
	            yield send({
	                p1: 8,
	                p2: 54,
	                data: (0, cVoteRegistration_1.serializeCVoteRegistrationInit)(auxiliaryData.params),
	                expectedResponseLength: 0,
	            });
	        }
	        if (params.votePublicKey || params.votePublicKeyPath) {
	            yield send({
	                p1: 8,
	                p2: 48,
	                data: (0, cVoteRegistration_1.serializeCVoteRegistrationVoteKey)(params.votePublicKey, params.votePublicKeyPath, version),
	                expectedResponseLength: 0,
	            });
	        }
	        else if (params.delegations) {
	            for (const delegation of params.delegations) {
	                yield send({
	                    p1: 8,
	                    p2: 55,
	                    data: (0, cVoteRegistration_1.serializeCVoteRegistrationDelegation)(delegation),
	                    expectedResponseLength: 0,
	                });
	            }
	        }
	        else {
	            throw Error('wrong CIP36 registration params');
	        }
	        yield send({
	            p1: 8,
	            p2: 49,
	            data: (0, cVoteRegistration_1.serializeCVoteRegistrationStakingPath)(params.stakingPath),
	            expectedResponseLength: 0,
	        });
	        yield send({
	            p1: 8,
	            p2: 50,
	            data: (0, cVoteRegistration_1.serializeCVoteRegistrationPaymentDestination)(params.paymentDestination, version),
	            expectedResponseLength: 0,
	        });
	        yield send({
	            p1: 8,
	            p2: 51,
	            data: (0, cVoteRegistration_1.serializeCVoteRegistrationNonce)(params.nonce),
	            expectedResponseLength: 0,
	        });
	        if ((0, getVersion_1.getCompatibility)(version).supportsCIP36) {
	            yield send({
	                p1: 8,
	                p2: 53,
	                data: (0, cVoteRegistration_1.serializeCVoteRegistrationVotingPurpose)(params.votingPurpose),
	                expectedResponseLength: 0,
	            });
	        }
	        const ED25519_SIGNATURE_LENGTH = 64;
	        const response = yield send({
	            p1: 8,
	            p2: 52,
	            data: Buffer$1.alloc(0),
	            expectedResponseLength: internal_1.AUXILIARY_DATA_HASH_LENGTH + ED25519_SIGNATURE_LENGTH,
	        });
	        const auxDataHash = response.slice(0, internal_1.AUXILIARY_DATA_HASH_LENGTH);
	        const signature = response.slice(internal_1.AUXILIARY_DATA_HASH_LENGTH, internal_1.AUXILIARY_DATA_HASH_LENGTH + ED25519_SIGNATURE_LENGTH);
	        return {
	            type: public_1.TxAuxiliaryDataSupplementType.CIP36_REGISTRATION,
	            auxiliaryDataHashHex: auxDataHash.toString('hex'),
	            cip36VoteRegistrationSignatureHex: signature.toString('hex'),
	        };
	    }
	    return null;
	}
	function* signTx_setAuxiliaryData_before_v2_3(auxiliaryData) {
	    (0, assert_1.assert)(auxiliaryData.type === public_1.TxAuxiliaryDataType.ARBITRARY_HASH, 'Auxiliary data type not implemented');
	    yield send({
	        p1: 8,
	        p2: 0,
	        data: (0, serialize_1.hex_to_buf)(auxiliaryData.hashHex),
	        expectedResponseLength: 0,
	    });
	    return null;
	}
	function* signTx_setValidityIntervalStart(validityIntervalStartStr) {
	    yield send({
	        p1: 9,
	        p2: 0,
	        data: (0, txOther_1.serializeTxValidityStart)(validityIntervalStartStr),
	    });
	}
	function* signTx_setMint(mint) {
	    yield send({
	        p1: 11,
	        p2: 48,
	        data: (0, txOther_1.serializeMintBasicParams)(mint),
	        expectedResponseLength: 0,
	    });
	    yield* signTx_addTokenBundle(mint, 11, serialize_1.int64_to_buf);
	    yield send({
	        p1: 11,
	        p2: 51,
	        data: Buffer$1.alloc(0),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_setScriptDataHash(scriptDataHash) {
	    yield send({
	        p1: 12,
	        p2: 0,
	        data: (0, serialize_1.hex_to_buf)(scriptDataHash),
	    });
	}
	function* signTx_addCollateralInput(collateralInput) {
	    yield send({
	        p1: 13,
	        p2: 0,
	        data: (0, txOther_1.serializeTxInput)(collateralInput),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_addRequiredSigner(requiredSigner) {
	    yield send({
	        p1: 14,
	        p2: 0,
	        data: (0, txOther_1.serializeRequiredSigner)(requiredSigner),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_addCollateralOutput(collateralOutput, version) {
	    yield send({
	        p1: 18,
	        p2: 48,
	        data: (0, txOutput_1.serializeTxOutputBasicParams)(collateralOutput, version),
	        expectedResponseLength: 0,
	    });
	    yield* signTx_addTokenBundle(collateralOutput.tokenBundle, 18, serialize_1.uint64_to_buf);
	    yield send({
	        p1: 18,
	        p2: 51,
	        data: Buffer$1.concat([]),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_addTotalCollateral(totalCollateral) {
	    yield send({
	        p1: 16,
	        p2: 0,
	        data: (0, serialize_1.serializeCoin)(totalCollateral),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_addReferenceInput(referenceInput) {
	    yield send({
	        p1: 17,
	        p2: 0,
	        data: (0, txOther_1.serializeTxInput)(referenceInput),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_addVoterVotes(voterVotes) {
	    yield send({
	        p1: 19,
	        p2: 0,
	        data: (0, txOther_1.serializeVoterVotes)(voterVotes),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_addTreasury(treasury) {
	    yield send({
	        p1: 21,
	        p2: 0,
	        data: (0, serialize_1.serializeCoin)(treasury),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_addDonation(donation) {
	    yield send({
	        p1: 22,
	        p2: 0,
	        data: (0, serialize_1.serializeCoin)(donation),
	        expectedResponseLength: 0,
	    });
	}
	function* signTx_awaitConfirm() {
	    const response = yield send({
	        p1: 10,
	        p2: 0,
	        data: Buffer$1.alloc(0),
	        expectedResponseLength: internal_1.TX_HASH_LENGTH,
	    });
	    return {
	        txHashHex: response.toString('hex'),
	    };
	}
	function* signTx_getWitness(path) {
	    const response = yield send({
	        p1: 15,
	        p2: 0,
	        data: (0, txOther_1.serializeTxWitnessRequest)(path),
	        expectedResponseLength: internal_1.ED25519_SIGNATURE_LENGTH,
	    });
	    return {
	        path,
	        witnessSignatureHex: (0, serialize_1.buf_to_hex)(response),
	    };
	}
	function uniquify(witnessPaths) {
	    const uniquifier = {};
	    witnessPaths.forEach((p) => {
	        uniquifier[JSON.stringify(p)] = p;
	    });
	    return Object.values(uniquifier);
	}
	function gatherWitnessPaths(request) {
	    const { tx, signingMode, additionalWitnessPaths } = request;
	    const witnessPaths = [];
	    if (signingMode !== public_1.TransactionSigningMode.MULTISIG_TRANSACTION) {
	        for (const input of tx.inputs) {
	            if (input.path != null) {
	                witnessPaths.push(input.path);
	            }
	        }
	        for (const cert of tx.certificates) {
	            switch (cert.type) {
	                case internal_1.CertificateType.STAKE_REGISTRATION_CONWAY:
	                case internal_1.CertificateType.STAKE_DEREGISTRATION:
	                case internal_1.CertificateType.STAKE_DEREGISTRATION_CONWAY:
	                case internal_1.CertificateType.STAKE_DELEGATION:
	                case internal_1.CertificateType.VOTE_DELEGATION:
	                    if (cert.stakeCredential.type === 0) {
	                        witnessPaths.push(cert.stakeCredential.path);
	                    }
	                    break;
	                case internal_1.CertificateType.AUTHORIZE_COMMITTEE_HOT:
	                case internal_1.CertificateType.RESIGN_COMMITTEE_COLD:
	                    if (cert.coldCredential.type === 0) {
	                        witnessPaths.push(cert.coldCredential.path);
	                    }
	                    break;
	                case internal_1.CertificateType.DREP_REGISTRATION:
	                case internal_1.CertificateType.DREP_DEREGISTRATION:
	                case internal_1.CertificateType.DREP_UPDATE:
	                    if (cert.dRepCredential.type === 0) {
	                        witnessPaths.push(cert.dRepCredential.path);
	                    }
	                    break;
	                case internal_1.CertificateType.STAKE_POOL_REGISTRATION:
	                    cert.pool.owners.forEach((owner) => {
	                        if (owner.type === internal_1.PoolOwnerType.DEVICE_OWNED) {
	                            witnessPaths.push(owner.path);
	                        }
	                    });
	                    if (cert.pool.poolKey.type === public_1.PoolKeyType.DEVICE_OWNED) {
	                        witnessPaths.push(cert.pool.poolKey.path);
	                    }
	                    break;
	                case internal_1.CertificateType.STAKE_POOL_RETIREMENT:
	                    witnessPaths.push(cert.path);
	                    break;
	            }
	        }
	        for (const withdrawal of tx.withdrawals) {
	            if (withdrawal.stakeCredential.type === 0) {
	                witnessPaths.push(withdrawal.stakeCredential.path);
	            }
	        }
	        for (const signer of tx.requiredSigners) {
	            switch (signer.type) {
	                case 0:
	                    witnessPaths.push(signer.path);
	                    break;
	            }
	        }
	        for (const collateral of tx.collateralInputs) {
	            if (collateral.path != null) {
	                witnessPaths.push(collateral.path);
	            }
	        }
	        for (const voterVotes of tx.votingProcedures) {
	            switch (voterVotes.voter.type) {
	                case public_1.VoterType.COMMITTEE_KEY_PATH:
	                case public_1.VoterType.DREP_KEY_PATH:
	                case public_1.VoterType.STAKE_POOL_KEY_PATH:
	                    witnessPaths.push(voterVotes.voter.keyPath);
	                    break;
	            }
	        }
	    }
	    additionalWitnessPaths.forEach((path) => witnessPaths.push(path));
	    return uniquify(witnessPaths);
	}
	function hasCredentialInCertificatesPreConway(tx, credentialType) {
	    return tx.certificates.some((c) => (c.type === internal_1.CertificateType.STAKE_DELEGATION ||
	        c.type === internal_1.CertificateType.STAKE_REGISTRATION ||
	        c.type === internal_1.CertificateType.STAKE_DEREGISTRATION) &&
	        c.stakeCredential.type === credentialType);
	}
	function hasCredentialInWithdrawals(tx, stakeCredentialType) {
	    return tx.withdrawals.some((w) => w.stakeCredential.type === stakeCredentialType);
	}
	function hasScriptHashInAddressParams(tx) {
	    const scriptAddressTypes = [
	        public_1.AddressType.BASE_PAYMENT_KEY_STAKE_SCRIPT,
	        public_1.AddressType.BASE_PAYMENT_SCRIPT_STAKE_KEY,
	        public_1.AddressType.BASE_PAYMENT_SCRIPT_STAKE_SCRIPT,
	        public_1.AddressType.ENTERPRISE_SCRIPT,
	        public_1.AddressType.POINTER_SCRIPT,
	        public_1.AddressType.REWARD_SCRIPT,
	    ];
	    return tx.outputs.some((o) => o.destination.type === public_1.TxOutputDestinationType.DEVICE_OWNED &&
	        scriptAddressTypes.includes(o.destination.addressParams.type));
	}
	function ensureRequestSupportedByAppVersion(version, request) {
	    var _a, _b, _c;
	    if (request.signingMode === public_1.TransactionSigningMode.POOL_REGISTRATION_AS_OWNER &&
	        !(0, getVersion_1.getCompatibility)(version).supportsPoolRegistrationAsOwner) {
	        throw new errors_1.DeviceVersionUnsupported(`Pool registration as owner not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.signingMode ===
	        public_1.TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR &&
	        !(0, getVersion_1.getCompatibility)(version).supportsPoolRegistrationAsOperator) {
	        throw new errors_1.DeviceVersionUnsupported(`Pool registration as operator not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.signingMode === public_1.TransactionSigningMode.MULTISIG_TRANSACTION &&
	        !(0, getVersion_1.getCompatibility)(version).supportsMultisigTransaction) {
	        throw new errors_1.DeviceVersionUnsupported(`Multisig transactions not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.signingMode === public_1.TransactionSigningMode.PLUTUS_TRANSACTION &&
	        !(0, getVersion_1.getCompatibility)(version).supportsAlonzo) {
	        throw new errors_1.DeviceVersionUnsupported(`Plutus transactions not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    const isOutputByron = (o) => o != null &&
	        o.destination.type === public_1.TxOutputDestinationType.DEVICE_OWNED &&
	        o.destination.addressParams.type === public_1.AddressType.BYRON;
	    const hasByronAddressParam = request.tx.outputs.some(isOutputByron) ||
	        isOutputByron(request.tx.collateralOutput);
	    if (hasByronAddressParam &&
	        !(0, getVersion_1.getCompatibility)(version).supportsByronAddressDerivation) {
	        throw new errors_1.DeviceVersionUnsupported(`Byron address parameters not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (hasScriptHashInAddressParams(request.tx) &&
	        !(0, getVersion_1.getCompatibility)(version).supportsMultisigTransaction) {
	        throw new errors_1.DeviceVersionUnsupported(`Script hash in address parameters in output not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    const hasDatumInOutputs = request.tx.outputs.some((o) => o.datum != null);
	    if (hasDatumInOutputs && !(0, getVersion_1.getCompatibility)(version).supportsAlonzo) {
	        throw new errors_1.DeviceVersionUnsupported(`Datum in output not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    const hasMapFormatInOutputs = request.tx.outputs.some((o) => o.format === public_1.TxOutputFormat.MAP_BABBAGE);
	    if (hasMapFormatInOutputs && !(0, getVersion_1.getCompatibility)(version).supportsBabbage) {
	        throw new errors_1.DeviceVersionUnsupported(`Outputs with map format not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (((_a = request.tx) === null || _a === void 0 ? void 0 : _a.ttl) === '0' && !(0, getVersion_1.getCompatibility)(version).supportsZeroTtl) {
	        throw new errors_1.DeviceVersionUnsupported(`Zero TTL not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    const hasPoolRegistration = request.tx.certificates.some((c) => c.type === internal_1.CertificateType.STAKE_POOL_REGISTRATION);
	    const supportsPoolRegistration = (0, getVersion_1.getCompatibility)(version).supportsPoolRegistrationAsOwner ||
	        (0, getVersion_1.getCompatibility)(version).supportsPoolRegistrationAsOperator;
	    if (hasPoolRegistration && !supportsPoolRegistration) {
	        throw new errors_1.DeviceVersionUnsupported(`Pool registration certificate not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    const hasPoolRetirement = request.tx.certificates.some((c) => c.type === internal_1.CertificateType.STAKE_POOL_RETIREMENT);
	    if (hasPoolRetirement && !(0, getVersion_1.getCompatibility)(version).supportsPoolRetirement) {
	        throw new errors_1.DeviceVersionUnsupported(`Pool retirement certificate not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    const conwayCertificateTypes = [
	        internal_1.CertificateType.STAKE_REGISTRATION_CONWAY,
	        internal_1.CertificateType.STAKE_DEREGISTRATION_CONWAY,
	        internal_1.CertificateType.VOTE_DELEGATION,
	        internal_1.CertificateType.AUTHORIZE_COMMITTEE_HOT,
	        internal_1.CertificateType.RESIGN_COMMITTEE_COLD,
	        internal_1.CertificateType.DREP_REGISTRATION,
	        internal_1.CertificateType.DREP_DEREGISTRATION,
	        internal_1.CertificateType.DREP_UPDATE,
	    ];
	    const hasConwayCertificates = request.tx.certificates.some((c) => conwayCertificateTypes.includes(c.type));
	    if (hasConwayCertificates && !(0, getVersion_1.getCompatibility)(version).supportsConway) {
	        throw new errors_1.DeviceVersionUnsupported(`Conway era certificates not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (hasCredentialInCertificatesPreConway(request.tx, 1) &&
	        !(0, getVersion_1.getCompatibility)(version).supportsMultisigTransaction) {
	        throw new errors_1.DeviceVersionUnsupported(`Script hash in certificate stake credential not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (hasCredentialInCertificatesPreConway(request.tx, 2) &&
	        !(0, getVersion_1.getCompatibility)(version).supportsAlonzo) {
	        throw new errors_1.DeviceVersionUnsupported(`Key hash in certificate stake credential not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (hasCredentialInWithdrawals(request.tx, 1) &&
	        !(0, getVersion_1.getCompatibility)(version).supportsMultisigTransaction) {
	        throw new errors_1.DeviceVersionUnsupported(`Script hash in withdrawal not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (hasCredentialInWithdrawals(request.tx, 2) &&
	        !(0, getVersion_1.getCompatibility)(version).supportsAlonzo) {
	        throw new errors_1.DeviceVersionUnsupported(`Key hash in withdrawal not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (((_b = request.tx) === null || _b === void 0 ? void 0 : _b.mint) !== null && !(0, getVersion_1.getCompatibility)(version).supportsMint) {
	        throw new errors_1.DeviceVersionUnsupported(`Mint not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.tx.validityIntervalStart !== null &&
	        !(0, getVersion_1.getCompatibility)(version).supportsMary) {
	        throw new errors_1.DeviceVersionUnsupported(`Validity interval start not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.tx.scriptDataHashHex !== null &&
	        !(0, getVersion_1.getCompatibility)(version).supportsAlonzo) {
	        throw new errors_1.DeviceVersionUnsupported(`Script data hash not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.tx.collateralInputs.length > 0 &&
	        !(0, getVersion_1.getCompatibility)(version).supportsAlonzo) {
	        throw new errors_1.DeviceVersionUnsupported(`Collateral inputs not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.tx.requiredSigners.length > 0) {
	        if (!(0, getVersion_1.getCompatibility)(version).supportsAlonzo) {
	            throw new errors_1.DeviceVersionUnsupported(`Required signers not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	        }
	        if (!(0, getVersion_1.getCompatibility)(version).supportsReqSignersInOrdinaryTx) {
	            switch (request.signingMode) {
	                case public_1.TransactionSigningMode.ORDINARY_TRANSACTION:
	                    throw new errors_1.DeviceVersionUnsupported(`Required signers in ordinary transaction not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	                case public_1.TransactionSigningMode.MULTISIG_TRANSACTION:
	                    throw new errors_1.DeviceVersionUnsupported(`Required signers in multisig transaction not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	            }
	        }
	    }
	    if (request.tx.includeNetworkId !== null &&
	        !(0, getVersion_1.getCompatibility)(version).supportsAlonzo) {
	        throw new errors_1.DeviceVersionUnsupported(`Network id in tx body not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.tx.collateralOutput !== null &&
	        !(0, getVersion_1.getCompatibility)(version).supportsBabbage) {
	        throw new errors_1.DeviceVersionUnsupported(`Collateral output not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.tx.totalCollateral !== null &&
	        !(0, getVersion_1.getCompatibility)(version).supportsBabbage) {
	        throw new errors_1.DeviceVersionUnsupported(`Total collateral not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.tx.referenceInputs.length > 0 &&
	        !(0, getVersion_1.getCompatibility)(version).supportsBabbage) {
	        throw new errors_1.DeviceVersionUnsupported(`Reference inputs not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.tx.votingProcedures.length > 0 &&
	        !(0, getVersion_1.getCompatibility)(version).supportsConway) {
	        throw new errors_1.DeviceVersionUnsupported(`Voting procedures not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.tx.treasury !== null &&
	        !(0, getVersion_1.getCompatibility)(version).supportsConway) {
	        throw new errors_1.DeviceVersionUnsupported(`Treasury amount not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    if (request.tx.donation !== null &&
	        !(0, getVersion_1.getCompatibility)(version).supportsConway) {
	        throw new errors_1.DeviceVersionUnsupported(`Treasury donation not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    const auxiliaryData = (_c = request.tx) === null || _c === void 0 ? void 0 : _c.auxiliaryData;
	    const hasCIP15Registration = (auxiliaryData === null || auxiliaryData === void 0 ? void 0 : auxiliaryData.type) === public_1.TxAuxiliaryDataType.CIP36_REGISTRATION &&
	        auxiliaryData.params.format === public_1.CIP36VoteRegistrationFormat.CIP_15;
	    if (hasCIP15Registration &&
	        !(0, getVersion_1.getCompatibility)(version).supportsCatalystRegistration) {
	        throw new errors_1.DeviceVersionUnsupported(`Catalyst registration not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    const hasCIP36Registration = (auxiliaryData === null || auxiliaryData === void 0 ? void 0 : auxiliaryData.type) === public_1.TxAuxiliaryDataType.CIP36_REGISTRATION &&
	        auxiliaryData.params.format === public_1.CIP36VoteRegistrationFormat.CIP_36;
	    if (hasCIP36Registration && !(0, getVersion_1.getCompatibility)(version).supportsCIP36) {
	        throw new errors_1.DeviceVersionUnsupported(`CIP36 registration not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    const hasKeyPath = (auxiliaryData === null || auxiliaryData === void 0 ? void 0 : auxiliaryData.type) === public_1.TxAuxiliaryDataType.CIP36_REGISTRATION &&
	        auxiliaryData.params.votePublicKeyPath != null;
	    if (hasKeyPath && !(0, getVersion_1.getCompatibility)(version).supportsCIP36Vote) {
	        throw new errors_1.DeviceVersionUnsupported(`Vote key derivation path in CIP15/CIP36 registration not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	    const thirdPartyPayment = (auxiliaryData === null || auxiliaryData === void 0 ? void 0 : auxiliaryData.type) === public_1.TxAuxiliaryDataType.CIP36_REGISTRATION &&
	        auxiliaryData.params.paymentDestination.type !==
	            public_1.TxOutputDestinationType.DEVICE_OWNED;
	    if (thirdPartyPayment && !(0, getVersion_1.getCompatibility)(version).supportsCIP36) {
	        throw new errors_1.DeviceVersionUnsupported(`CIP36 payment addresses not owned by the device not supported by Ledger app version ${(0, utils_1.getVersionString)(version)}.`);
	    }
	}
	function* signTransaction(version, request) {
	    (0, getVersion_1.ensureLedgerAppVersionCompatible)(version);
	    ensureRequestSupportedByAppVersion(version, request);
	    const auxDataBeforeTxBody = (0, getVersion_1.getCompatibility)(version).supportsCatalystRegistration ||
	        (0, getVersion_1.getCompatibility)(version).supportsCIP36;
	    const { tx, signingMode } = request;
	    const witnessPaths = gatherWitnessPaths(request);
	    yield* signTx_init(tx, signingMode, witnessPaths, request.options, version);
	    let auxiliaryDataSupplement = null;
	    if (auxDataBeforeTxBody && tx.auxiliaryData != null) {
	        auxiliaryDataSupplement = yield* signTx_setAuxiliaryData(tx.auxiliaryData, version);
	    }
	    for (const input of tx.inputs) {
	        yield* signTx_addInput(input);
	    }
	    for (const output of tx.outputs) {
	        yield* signTx_addOutput(output, version);
	    }
	    yield* signTx_setFee(tx.fee);
	    if (tx.ttl != null) {
	        yield* signTx_setTtl(tx.ttl);
	    }
	    for (const certificate of tx.certificates) {
	        yield* signTx_addCertificate(certificate, version);
	    }
	    for (const withdrawal of tx.withdrawals) {
	        yield* signTx_addWithdrawal(withdrawal, version);
	    }
	    if (!auxDataBeforeTxBody && tx.auxiliaryData != null) {
	        auxiliaryDataSupplement = yield* signTx_setAuxiliaryData_before_v2_3(tx.auxiliaryData);
	    }
	    if (tx.validityIntervalStart != null) {
	        yield* signTx_setValidityIntervalStart(tx.validityIntervalStart);
	    }
	    if (tx.mint != null) {
	        yield* signTx_setMint(tx.mint);
	    }
	    if (tx.scriptDataHashHex != null) {
	        yield* signTx_setScriptDataHash(tx.scriptDataHashHex);
	    }
	    for (const input of tx.collateralInputs) {
	        yield* signTx_addCollateralInput(input);
	    }
	    for (const input of tx.requiredSigners) {
	        yield* signTx_addRequiredSigner(input);
	    }
	    if (tx.collateralOutput != null) {
	        yield* signTx_addCollateralOutput(tx.collateralOutput, version);
	    }
	    if (tx.totalCollateral != null) {
	        yield* signTx_addTotalCollateral(tx.totalCollateral);
	    }
	    for (const referenceInput of tx.referenceInputs) {
	        yield* signTx_addReferenceInput(referenceInput);
	    }
	    for (const voterVotes of tx.votingProcedures) {
	        yield* signTx_addVoterVotes(voterVotes);
	    }
	    if (tx.treasury != null) {
	        yield* signTx_addTreasury(tx.treasury);
	    }
	    if (tx.donation != null) {
	        yield* signTx_addDonation(tx.donation);
	    }
	    const { txHashHex } = yield* signTx_awaitConfirm();
	    const witnesses = [];
	    for (const path of witnessPaths) {
	        const witness = yield* signTx_getWitness(path);
	        witnesses.push(witness);
	    }
	    return {
	        txHashHex,
	        witnesses,
	        auxiliaryDataSupplement,
	    };
	}
	signTx.signTransaction = signTransaction;
	
	return signTx;
}

var cVote = {};

var hasRequiredCVote;

function requireCVote () {
	if (hasRequiredCVote) return cVote;
	hasRequiredCVote = 1;
	Object.defineProperty(cVote, "__esModule", { value: true });
	cVote.parseCVote = void 0;
	const invalidDataReason_1 = requireInvalidDataReason();
	const parse_1 = requireParse();
	function parseCVote(cVote) {
	    const voteCastDataHex = (0, parse_1.parseHexString)(cVote.voteCastDataHex, invalidDataReason_1.InvalidDataReason.CVOTE_INVALID_VOTECAST_DATA);
	    const MIN_VOTECAST_LENGTH = 32 + 1 + 1 + 1;
	    (0, parse_1.validate)(voteCastDataHex.length >= 2 * MIN_VOTECAST_LENGTH, invalidDataReason_1.InvalidDataReason.CVOTE_INVALID_VOTECAST_DATA);
	    const witnessPath = (0, parse_1.parseBIP32Path)(cVote.witnessPath, invalidDataReason_1.InvalidDataReason.CVOTE_INVALID_WITNESS);
	    return {
	        voteCastDataHex,
	        witnessPath,
	    };
	}
	cVote.parseCVote = parseCVote;
	
	return cVote;
}

var nativeScript = {};

var hasRequiredNativeScript;

function requireNativeScript () {
	if (hasRequiredNativeScript) return nativeScript;
	hasRequiredNativeScript = 1;
	Object.defineProperty(nativeScript, "__esModule", { value: true });
	nativeScript.parseNativeScriptHashDisplayFormat = nativeScript.parseNativeScript = void 0;
	const errors_1 = requireErrors();
	const internal_1 = requireInternal();
	const public_1 = require_public();
	const parse_1 = requireParse();
	function parseNativeScript(script) {
	    const params = script.params;
	    switch (script.type) {
	        case public_1.NativeScriptType.PUBKEY_DEVICE_OWNED: {
	            (0, parse_1.validate)(params.keyHashHex == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.requiredCount == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.slot == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.scripts == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            return {
	                type: script.type,
	                params: {
	                    path: (0, parse_1.parseBIP32Path)(params.path, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_KEY_PATH),
	                },
	            };
	        }
	        case public_1.NativeScriptType.PUBKEY_THIRD_PARTY: {
	            (0, parse_1.validate)(params.path == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.requiredCount == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.slot == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.scripts == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            return {
	                type: script.type,
	                params: {
	                    keyHashHex: (0, parse_1.parseHexStringOfLength)(params.keyHashHex, internal_1.KEY_HASH_LENGTH, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_KEY_HASH),
	                },
	            };
	        }
	        case public_1.NativeScriptType.ALL:
	        case public_1.NativeScriptType.ANY: {
	            (0, parse_1.validate)(params.path == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.keyHashHex == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.requiredCount == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.slot == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)((0, parse_1.isArray)(params.scripts), errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_SCRIPTS_NOT_AN_ARRAY);
	            return {
	                type: script.type,
	                params: {
	                    scripts: params.scripts.map(parseNativeScript),
	                },
	            };
	        }
	        case public_1.NativeScriptType.N_OF_K: {
	            (0, parse_1.validate)(params.path == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.keyHashHex == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.slot == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)((0, parse_1.isArray)(params.scripts), errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_SCRIPTS_NOT_AN_ARRAY);
	            const requiredCount = (0, parse_1.parseUint32_t)(params.requiredCount, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_REQUIRED_COUNT);
	            (0, parse_1.validate)(requiredCount <= params.scripts.length, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_REQUIRED_COUNT_HIGHER_THAN_NUMBER_OF_SCRIPTS);
	            return {
	                type: script.type,
	                params: {
	                    requiredCount,
	                    scripts: params.scripts.map(parseNativeScript),
	                },
	            };
	        }
	        case public_1.NativeScriptType.INVALID_BEFORE:
	        case public_1.NativeScriptType.INVALID_HEREAFTER: {
	            (0, parse_1.validate)(params.path == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.keyHashHex == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.requiredCount == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            (0, parse_1.validate)(params.scripts == null, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DATA);
	            return {
	                type: script.type,
	                params: {
	                    slot: (0, parse_1.parseUint64_str)(params.slot, {}, errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_TOKEN_LOCKING_SLOT),
	                },
	            };
	        }
	        default:
	            throw new errors_1.InvalidData(errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_UNKNOWN_TYPE);
	    }
	}
	nativeScript.parseNativeScript = parseNativeScript;
	function parseNativeScriptHashDisplayFormat(displayFormat) {
	    switch (displayFormat) {
	        case public_1.NativeScriptHashDisplayFormat.BECH32:
	        case public_1.NativeScriptHashDisplayFormat.POLICY_ID:
	            break;
	        default:
	            throw new errors_1.InvalidData(errors_1.InvalidDataReason.DERIVE_NATIVE_SCRIPT_HASH_INVALID_DISPLAY_FORMAT);
	    }
	    return displayFormat;
	}
	nativeScript.parseNativeScriptHashDisplayFormat = parseNativeScriptHashDisplayFormat;
	
	return nativeScript;
}

var operationalCertificate = {};

var hasRequiredOperationalCertificate;

function requireOperationalCertificate () {
	if (hasRequiredOperationalCertificate) return operationalCertificate;
	hasRequiredOperationalCertificate = 1;
	Object.defineProperty(operationalCertificate, "__esModule", { value: true });
	operationalCertificate.parseOperationalCertificate = void 0;
	const invalidDataReason_1 = requireInvalidDataReason();
	const internal_1 = requireInternal();
	const parse_1 = requireParse();
	function parseOperationalCertificate(operationalCertificate) {
	    return {
	        kesPublicKeyHex: (0, parse_1.parseHexStringOfLength)(operationalCertificate.kesPublicKeyHex, internal_1.KES_PUBLIC_KEY_LENGTH, invalidDataReason_1.InvalidDataReason.OPERATIONAL_CERTIFICATE_INVALID_KES_KEY),
	        kesPeriod: (0, parse_1.parseUint64_str)(operationalCertificate.kesPeriod, {}, invalidDataReason_1.InvalidDataReason.OPERATIONAL_CERTIFICATE_INVALID_KES_PERIOD),
	        issueCounter: (0, parse_1.parseUint64_str)(operationalCertificate.issueCounter, {}, invalidDataReason_1.InvalidDataReason.OPERATIONAL_CERTIFICATE_INVALID_ISSUE_COUNTER),
	        coldKeyPath: (0, parse_1.parseBIP32Path)(operationalCertificate.coldKeyPath, invalidDataReason_1.InvalidDataReason.OPERATIONAL_CERTIFICATE_INVALID_COLD_KEY_PATH),
	    };
	}
	operationalCertificate.parseOperationalCertificate = parseOperationalCertificate;
	
	return operationalCertificate;
}

var transaction = {};

var certificate = {};

var poolRegistration = {};

var hasRequiredPoolRegistration;

function requirePoolRegistration () {
	if (hasRequiredPoolRegistration) return poolRegistration;
	hasRequiredPoolRegistration = 1;
	Object.defineProperty(poolRegistration, "__esModule", { value: true });
	poolRegistration.parsePoolParams = void 0;
	const errors_1 = requireErrors();
	const invalidDataReason_1 = requireInvalidDataReason();
	const internal_1 = requireInternal();
	const public_1 = require_public();
	const parse_1 = requireParse();
	const serialize_1 = requireSerialize();
	const constants_1 = requireConstants();
	function parseMargin(params) {
	    const POOL_MARGIN_DENOMINATOR_MAX_STR = '1 000 000 000 000 000 000'.replace(/[ ]/, '');
	    const marginDenominator = (0, parse_1.parseUint64_str)(params.denominator, { max: POOL_MARGIN_DENOMINATOR_MAX_STR }, invalidDataReason_1.InvalidDataReason.POOL_REGISTRATION_INVALID_MARGIN_DENOMINATOR);
	    const marginNumerator = (0, parse_1.parseUint64_str)(params.numerator, { max: marginDenominator }, invalidDataReason_1.InvalidDataReason.POOL_REGISTRATION_INVALID_MARGIN);
	    return {
	        numerator: marginNumerator,
	        denominator: marginDenominator,
	    };
	}
	function parsePoolKey(poolKey) {
	    switch (poolKey.type) {
	        case public_1.PoolKeyType.DEVICE_OWNED: {
	            const params = poolKey.params;
	            const path = (0, parse_1.parseBIP32Path)(params.path, invalidDataReason_1.InvalidDataReason.POOL_KEY_INVALID_PATH);
	            return {
	                type: public_1.PoolKeyType.DEVICE_OWNED,
	                path,
	            };
	        }
	        case public_1.PoolKeyType.THIRD_PARTY: {
	            const params = poolKey.params;
	            const hashHex = (0, parse_1.parseHexStringOfLength)(params.keyHashHex, internal_1.KEY_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.POOL_KEY_INVALID_KEY_HASH);
	            return {
	                type: public_1.PoolKeyType.THIRD_PARTY,
	                hashHex,
	            };
	        }
	        default:
	            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.POOL_KEY_INVALID_TYPE);
	    }
	}
	function parsePoolOwnerParams(poolOwner) {
	    switch (poolOwner.type) {
	        case public_1.PoolOwnerType.DEVICE_OWNED: {
	            const params = poolOwner.params;
	            const path = (0, parse_1.parseBIP32Path)(params.stakingPath, invalidDataReason_1.InvalidDataReason.POOL_OWNER_INVALID_PATH);
	            return {
	                type: public_1.PoolOwnerType.DEVICE_OWNED,
	                path,
	            };
	        }
	        case public_1.PoolOwnerType.THIRD_PARTY: {
	            const params = poolOwner.params;
	            const hashHex = (0, parse_1.parseHexStringOfLength)(params.stakingKeyHashHex, internal_1.KEY_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.POOL_OWNER_INVALID_KEY_HASH);
	            return {
	                type: public_1.PoolOwnerType.THIRD_PARTY,
	                hashHex,
	            };
	        }
	        default:
	            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.POOL_OWNER_INVALID_TYPE);
	    }
	}
	function parseRewardAccount(poolRewardAccount) {
	    switch (poolRewardAccount.type) {
	        case public_1.PoolRewardAccountType.DEVICE_OWNED: {
	            const params = poolRewardAccount.params;
	            const path = (0, parse_1.parseBIP32Path)(params.path, invalidDataReason_1.InvalidDataReason.POOL_REWARD_ACCOUNT_INVALID_PATH);
	            return {
	                type: public_1.PoolRewardAccountType.DEVICE_OWNED,
	                path,
	            };
	        }
	        case public_1.PoolRewardAccountType.THIRD_PARTY: {
	            const params = poolRewardAccount.params;
	            const rewardAccountHex = (0, parse_1.parseHexStringOfLength)(params.rewardAccountHex, internal_1.REWARD_ACCOUNT_HEX_LENGTH, invalidDataReason_1.InvalidDataReason.POOL_REWARD_ACCOUNT_INVALID_HEX);
	            return {
	                type: public_1.PoolRewardAccountType.THIRD_PARTY,
	                rewardAccountHex,
	            };
	        }
	        default:
	            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.POOL_REWARD_ACCOUNT_INVALID_TYPE);
	    }
	}
	function parsePort(portNumber, errMsg) {
	    (0, parse_1.validate)((0, parse_1.isUint16)(portNumber), errMsg);
	    return portNumber;
	}
	function parseIPv4(ipv4, errMsg) {
	    (0, parse_1.validate)((0, parse_1.isString)(ipv4), errMsg);
	    const ipParts = ipv4.split('.');
	    (0, parse_1.validate)(ipParts.length === 4, errMsg);
	    const ipBytes = Buffer$1.alloc(4);
	    for (let i = 0; i < 4; i++) {
	        const ipPart = (0, parse_1.parseIntFromStr)(ipParts[i], invalidDataReason_1.InvalidDataReason.RELAY_INVALID_IPV4);
	        (0, parse_1.validate)((0, parse_1.isUint8)(ipPart), errMsg);
	        ipBytes.writeUInt8(ipPart, i);
	    }
	    return ipBytes;
	}
	function parseIPv6(ipv6, errMsg) {
	    (0, parse_1.validate)((0, parse_1.isString)(ipv6), errMsg);
	    const ipHex = ipv6.split(':').join('');
	    (0, parse_1.validate)((0, parse_1.isHexStringOfLength)(ipHex, 16), errMsg);
	    return (0, serialize_1.hex_to_buf)(ipHex);
	}
	function parseDnsName(dnsName, errMsg) {
	    (0, parse_1.validate)((0, parse_1.isString)(dnsName), errMsg);
	    (0, parse_1.validate)(dnsName.length <= internal_1.MAX_DNS_NAME_LENGTH, errMsg);
	    (0, parse_1.validate)(dnsName.length > 0, errMsg);
	    (0, parse_1.validate)(/^[\x00-\x7F]*$/.test(dnsName), errMsg);
	    (0, parse_1.validate)(dnsName
	        .split('')
	        .every((c) => c.charCodeAt(0) >= 32 && c.charCodeAt(0) <= 126), errMsg);
	    return dnsName;
	}
	function parsePoolRelayParams(relayParams) {
	    switch (relayParams.type) {
	        case 0: {
	            const params = relayParams.params;
	            return {
	                type: 0,
	                port: 'portNumber' in params && params.portNumber != null
	                    ? parsePort(params.portNumber, invalidDataReason_1.InvalidDataReason.RELAY_INVALID_PORT)
	                    : null,
	                ipv4: 'ipv4' in params && params.ipv4 != null
	                    ? parseIPv4(params.ipv4, invalidDataReason_1.InvalidDataReason.RELAY_INVALID_IPV4)
	                    : null,
	                ipv6: 'ipv6' in params && params.ipv6 != null
	                    ? parseIPv6(params.ipv6, invalidDataReason_1.InvalidDataReason.RELAY_INVALID_IPV6)
	                    : null,
	            };
	        }
	        case 1: {
	            const params = relayParams.params;
	            return {
	                type: 1,
	                port: 'portNumber' in params && params.portNumber != null
	                    ? parsePort(params.portNumber, invalidDataReason_1.InvalidDataReason.RELAY_INVALID_PORT)
	                    : null,
	                dnsName: parseDnsName(params.dnsName, invalidDataReason_1.InvalidDataReason.RELAY_INVALID_DNS),
	            };
	        }
	        case 2: {
	            const params = relayParams.params;
	            return {
	                type: 2,
	                dnsName: parseDnsName(params.dnsName, invalidDataReason_1.InvalidDataReason.RELAY_INVALID_DNS),
	            };
	        }
	        default:
	            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.RELAY_INVALID_TYPE);
	    }
	}
	function parsePoolMetadataParams(params) {
	    const url = (0, parse_1.parseAscii)(params.metadataUrl, invalidDataReason_1.InvalidDataReason.POOL_REGISTRATION_METADATA_INVALID_URL);
	    (0, parse_1.validate)(url.length <= internal_1.MAX_URL_LENGTH, invalidDataReason_1.InvalidDataReason.POOL_REGISTRATION_METADATA_INVALID_URL);
	    const hashHex = (0, parse_1.parseHexStringOfLength)(params.metadataHashHex, internal_1.AUXILIARY_DATA_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.POOL_REGISTRATION_METADATA_INVALID_HASH);
	    return {
	        url,
	        hashHex,
	        __brand: 'pool_metadata',
	    };
	}
	function parsePoolParams(params) {
	    const poolKey = parsePoolKey(params.poolKey);
	    const vrfHashHex = (0, parse_1.parseHexStringOfLength)(params.vrfKeyHashHex, internal_1.VRF_KEY_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.POOL_REGISTRATION_INVALID_VRF_KEY_HASH);
	    const pledge = (0, parse_1.parseCoin)(params.pledge, invalidDataReason_1.InvalidDataReason.POOL_REGISTRATION_INVALID_PLEDGE);
	    const cost = (0, parse_1.parseCoin)(params.cost, invalidDataReason_1.InvalidDataReason.POOL_REGISTRATION_INVALID_COST);
	    const margin = parseMargin(params.margin);
	    const rewardAccount = parseRewardAccount(params.rewardAccount);
	    const owners = params.poolOwners.map((owner) => parsePoolOwnerParams(owner));
	    const relays = params.relays.map((relay) => parsePoolRelayParams(relay));
	    const metadata = params.metadata == null ? null : parsePoolMetadataParams(params.metadata);
	    (0, parse_1.validate)(owners.length <= constants_1.POOL_REGISTRATION_OWNERS_MAX, invalidDataReason_1.InvalidDataReason.POOL_REGISTRATION_OWNERS_TOO_MANY);
	    (0, parse_1.validate)(relays.length <= constants_1.POOL_REGISTRATION_RELAYS_MAX, invalidDataReason_1.InvalidDataReason.POOL_REGISTRATION_RELAYS_TOO_MANY);
	    return {
	        poolKey,
	        vrfHashHex,
	        pledge,
	        cost,
	        margin,
	        rewardAccount,
	        owners,
	        relays,
	        metadata,
	    };
	}
	poolRegistration.parsePoolParams = parsePoolParams;
	
	return poolRegistration;
}

var hasRequiredCertificate;

function requireCertificate () {
	if (hasRequiredCertificate) return certificate;
	hasRequiredCertificate = 1;
	Object.defineProperty(certificate, "__esModule", { value: true });
	certificate.parseCertificate = void 0;
	const assert_1 = requireAssert();
	const errors_1 = requireErrors();
	const invalidDataReason_1 = requireInvalidDataReason();
	const internal_1 = requireInternal();
	const public_1 = require_public();
	const parse_1 = requireParse();
	const poolRegistration_1 = requirePoolRegistration();
	function parseDRep(dRep, errMsg) {
	    switch (dRep.type) {
	        case public_1.DRepParamsType.KEY_PATH:
	            return {
	                type: 100,
	                path: (0, parse_1.parseBIP32Path)(dRep.keyPath, errMsg),
	            };
	        case public_1.DRepParamsType.KEY_HASH:
	            return {
	                type: 0,
	                keyHashHex: (0, parse_1.parseHexStringOfLength)(dRep.keyHashHex, internal_1.KEY_HASH_LENGTH, errMsg),
	            };
	        case public_1.DRepParamsType.SCRIPT_HASH:
	            return {
	                type: 1,
	                scriptHashHex: (0, parse_1.parseHexStringOfLength)(dRep.scriptHashHex, internal_1.SCRIPT_HASH_LENGTH, errMsg),
	            };
	        case public_1.DRepParamsType.ABSTAIN:
	            return {
	                type: 2,
	            };
	        case public_1.DRepParamsType.NO_CONFIDENCE:
	            return {
	                type: 3,
	            };
	        default:
	            (0, assert_1.unreachable)(dRep);
	    }
	}
	function parseDeposit(deposit) {
	    return (0, parse_1.parseCoin)(deposit, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_DEPOSIT);
	}
	function parseCertificate(cert) {
	    switch (cert.type) {
	        case internal_1.CertificateType.STAKE_REGISTRATION:
	        case internal_1.CertificateType.STAKE_DEREGISTRATION: {
	            return {
	                type: cert.type,
	                stakeCredential: (0, parse_1.parseCredential)(cert.params.stakeCredential, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_STAKE_CREDENTIAL),
	            };
	        }
	        case internal_1.CertificateType.STAKE_REGISTRATION_CONWAY:
	        case internal_1.CertificateType.STAKE_DEREGISTRATION_CONWAY: {
	            return {
	                type: cert.type,
	                stakeCredential: (0, parse_1.parseCredential)(cert.params.stakeCredential, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_STAKE_CREDENTIAL),
	                deposit: parseDeposit(cert.params.deposit),
	            };
	        }
	        case internal_1.CertificateType.STAKE_DELEGATION: {
	            return {
	                type: cert.type,
	                stakeCredential: (0, parse_1.parseCredential)(cert.params.stakeCredential, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_STAKE_CREDENTIAL),
	                poolKeyHashHex: (0, parse_1.parseHexStringOfLength)(cert.params.poolKeyHashHex, internal_1.KEY_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_POOL_KEY_HASH),
	            };
	        }
	        case internal_1.CertificateType.VOTE_DELEGATION: {
	            return {
	                type: cert.type,
	                stakeCredential: (0, parse_1.parseCredential)(cert.params.stakeCredential, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_STAKE_CREDENTIAL),
	                dRep: parseDRep(cert.params.dRep, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_DREP),
	            };
	        }
	        case internal_1.CertificateType.AUTHORIZE_COMMITTEE_HOT: {
	            return {
	                type: cert.type,
	                coldCredential: (0, parse_1.parseCredential)(cert.params.coldCredential, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_COMMITTEE_CREDENTIAL),
	                hotCredential: (0, parse_1.parseCredential)(cert.params.hotCredential, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_COMMITTEE_CREDENTIAL),
	            };
	        }
	        case internal_1.CertificateType.RESIGN_COMMITTEE_COLD: {
	            return {
	                type: cert.type,
	                coldCredential: (0, parse_1.parseCredential)(cert.params.coldCredential, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_COMMITTEE_CREDENTIAL),
	                anchor: cert.params.anchor == null ? null : (0, parse_1.parseAnchor)(cert.params.anchor),
	            };
	        }
	        case internal_1.CertificateType.DREP_REGISTRATION: {
	            return {
	                type: cert.type,
	                dRepCredential: (0, parse_1.parseCredential)(cert.params.dRepCredential, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_DREP_CREDENTIAL),
	                deposit: parseDeposit(cert.params.deposit),
	                anchor: cert.params.anchor == null ? null : (0, parse_1.parseAnchor)(cert.params.anchor),
	            };
	        }
	        case internal_1.CertificateType.DREP_DEREGISTRATION: {
	            return {
	                type: cert.type,
	                dRepCredential: (0, parse_1.parseCredential)(cert.params.dRepCredential, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_DREP_CREDENTIAL),
	                deposit: parseDeposit(cert.params.deposit),
	            };
	        }
	        case internal_1.CertificateType.DREP_UPDATE: {
	            return {
	                type: cert.type,
	                dRepCredential: (0, parse_1.parseCredential)(cert.params.dRepCredential, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_DREP_CREDENTIAL),
	                anchor: cert.params.anchor == null ? null : (0, parse_1.parseAnchor)(cert.params.anchor),
	            };
	        }
	        case internal_1.CertificateType.STAKE_POOL_REGISTRATION: {
	            return {
	                type: cert.type,
	                pool: (0, poolRegistration_1.parsePoolParams)(cert.params),
	            };
	        }
	        case internal_1.CertificateType.STAKE_POOL_RETIREMENT: {
	            return {
	                type: cert.type,
	                path: (0, parse_1.parseBIP32Path)(cert.params.poolKeyPath, invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_PATH),
	                retirementEpoch: (0, parse_1.parseUint64_str)(cert.params.retirementEpoch, {}, invalidDataReason_1.InvalidDataReason.POOL_RETIREMENT_INVALID_RETIREMENT_EPOCH),
	            };
	        }
	        default:
	            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_TYPE);
	    }
	}
	certificate.parseCertificate = parseCertificate;
	
	return certificate;
}

var output = {};

var hasRequiredOutput;

function requireOutput () {
	if (hasRequiredOutput) return output;
	hasRequiredOutput = 1;
	Object.defineProperty(output, "__esModule", { value: true });
	output.parseTxOutput = output.parseTxDestination = output.parseTokenBundle = void 0;
	const errors_1 = requireErrors();
	const invalidDataReason_1 = requireInvalidDataReason();
	const internal_1 = requireInternal();
	const public_1 = require_public();
	const parse_1 = requireParse();
	const address_1 = requireAddress();
	const constants_1 = requireConstants();
	function parseToken(token, parseTokenAmountFn) {
	    const assetNameHex = (0, parse_1.parseHexString)(token.assetNameHex, invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_ASSET_NAME);
	    (0, parse_1.validate)(token.assetNameHex.length <= internal_1.ASSET_NAME_LENGTH_MAX * 2, invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_ASSET_NAME);
	    const amount = parseTokenAmountFn(token.amount, {}, invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_TOKEN_AMOUNT);
	    return {
	        assetNameHex,
	        amount,
	    };
	}
	function parseAssetGroup(assetGroup, parseTokenAmountFn) {
	    (0, parse_1.validate)((0, parse_1.isArray)(assetGroup.tokens), invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_ASSET_GROUP_NOT_ARRAY);
	    (0, parse_1.validate)(assetGroup.tokens.length <= constants_1.TOKENS_IN_GROUP_MAX, invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_ASSET_GROUP_TOO_LARGE);
	    (0, parse_1.validate)(assetGroup.tokens.length > 0, invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_ASSET_GROUP_EMPTY);
	    const parsedAssetGroup = {
	        policyIdHex: (0, parse_1.parseHexStringOfLength)(assetGroup.policyIdHex, internal_1.TOKEN_POLICY_LENGTH, invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_POLICY_NAME),
	        tokens: assetGroup.tokens.map((t) => parseToken(t, parseTokenAmountFn)),
	    };
	    const assetNamesHex = parsedAssetGroup.tokens.map((t) => t.assetNameHex);
	    (0, parse_1.validate)(assetNamesHex.length === new Set(assetNamesHex).size, invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_ASSET_GROUP_NOT_UNIQUE);
	    const sortedAssetNames = [...assetNamesHex].sort((n1, n2) => {
	        if (n1.length === n2.length)
	            return n1.localeCompare(n2);
	        else
	            return n1.length - n2.length;
	    });
	    (0, parse_1.validate)(JSON.stringify(assetNamesHex) === JSON.stringify(sortedAssetNames), invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_ASSET_GROUP_ORDERING);
	    return parsedAssetGroup;
	}
	function parseTokenBundle(tokenBundle, emptyTokenBundleAllowed, parseTokenAmountFn) {
	    (0, parse_1.validate)((0, parse_1.isArray)(tokenBundle), invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_TOKEN_BUNDLE_NOT_ARRAY);
	    (0, parse_1.validate)(tokenBundle.length <= constants_1.ASSET_GROUPS_MAX, invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_TOKEN_BUNDLE_TOO_LARGE);
	    (0, parse_1.validate)(emptyTokenBundleAllowed || tokenBundle.length > 0, invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_TOKEN_BUNDLE_EMPTY);
	    const parsedTokenBundle = tokenBundle.map((ag) => parseAssetGroup(ag, parseTokenAmountFn));
	    const policyIds = parsedTokenBundle.map((ag) => ag.policyIdHex);
	    (0, parse_1.validate)(policyIds.length === new Set(policyIds).size, invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_TOKEN_BUNDLE_NOT_UNIQUE);
	    const sortedPolicyIds = [...policyIds].sort();
	    (0, parse_1.validate)(JSON.stringify(policyIds) === JSON.stringify(sortedPolicyIds), invalidDataReason_1.InvalidDataReason.MULTIASSET_INVALID_TOKEN_BUNDLE_ORDERING);
	    return parsedTokenBundle;
	}
	output.parseTokenBundle = parseTokenBundle;
	function parseDatumHash(datumHashHex) {
	    return {
	        type: public_1.DatumType.HASH,
	        datumHashHex: (0, parse_1.parseHexStringOfLength)(datumHashHex, internal_1.DATUM_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_DATUM_HASH),
	    };
	}
	function parseDatum(output) {
	    var _a, _b;
	    if (output.format === public_1.TxOutputFormat.MAP_BABBAGE) {
	        switch ((_a = output.datum) === null || _a === void 0 ? void 0 : _a.type) {
	            case public_1.DatumType.HASH:
	                return parseDatumHash((_b = output.datum) === null || _b === void 0 ? void 0 : _b.datumHashHex);
	            case public_1.DatumType.INLINE:
	                return {
	                    type: public_1.DatumType.INLINE,
	                    datumHex: (0, parse_1.parseHexString)(output.datum.datumHex, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_INLINE_DATUM),
	                };
	            default:
	                return null;
	        }
	    }
	    else {
	        return output.datumHashHex == null
	            ? null
	            : parseDatumHash(output.datumHashHex);
	    }
	}
	function parseTxDestination(network, destination, validateAsTxOutput) {
	    switch (destination.type) {
	        case public_1.TxOutputDestinationType.THIRD_PARTY: {
	            const params = destination.params;
	            const addressHex = (0, parse_1.parseHexString)(params.addressHex, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_ADDRESS);
	            (0, parse_1.validate)(params.addressHex.length <= 128 * 2, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_ADDRESS);
	            return {
	                type: public_1.TxOutputDestinationType.THIRD_PARTY,
	                addressHex,
	            };
	        }
	        case public_1.TxOutputDestinationType.DEVICE_OWNED: {
	            const params = destination.params;
	            const addressParams = (0, address_1.parseAddress)(network, params);
	            if (validateAsTxOutput) {
	                (0, parse_1.validate)(addressParams.spendingDataSource.type === "spending_path", invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_ADDRESS_PARAMS);
	            }
	            return {
	                type: public_1.TxOutputDestinationType.DEVICE_OWNED,
	                addressParams,
	            };
	        }
	        default:
	            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.ADDRESS_UNKNOWN_TYPE);
	    }
	}
	output.parseTxDestination = parseTxDestination;
	function parseTxOutput(output, network) {
	    var _a;
	    const format = output.format === public_1.TxOutputFormat.MAP_BABBAGE
	        ? public_1.TxOutputFormat.MAP_BABBAGE
	        : public_1.TxOutputFormat.ARRAY_LEGACY;
	    const amount = (0, parse_1.parseCoin)(output.amount, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_AMOUNT);
	    const tokenBundle = parseTokenBundle((_a = output.tokenBundle) !== null && _a !== void 0 ? _a : [], true, parse_1.parseUint64_str);
	    const destination = parseTxDestination(network, output.destination, true);
	    const datum = parseDatum(output);
	    if ((datum === null || datum === void 0 ? void 0 : datum.type) === public_1.DatumType.INLINE) {
	        (0, parse_1.validate)(output.format === public_1.TxOutputFormat.MAP_BABBAGE, invalidDataReason_1.InvalidDataReason.OUTPUT_INCONSISTENT_DATUM);
	    }
	    const referenceScriptHex = output.format === public_1.TxOutputFormat.MAP_BABBAGE && output.referenceScriptHex
	        ? (0, parse_1.parseHexString)(output.referenceScriptHex, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_REFERENCE_SCRIPT_HEX)
	        : null;
	    if (referenceScriptHex != null) {
	        (0, parse_1.validate)(output.format === public_1.TxOutputFormat.MAP_BABBAGE, invalidDataReason_1.InvalidDataReason.OUTPUT_INCONSISTENT_REFERENCE_SCRIPT);
	    }
	    return {
	        format,
	        amount,
	        tokenBundle,
	        destination,
	        datum,
	        referenceScriptHex,
	    };
	}
	output.parseTxOutput = parseTxOutput;
	
	return output;
}

var txAuxiliaryData = {};

var hasRequiredTxAuxiliaryData;

function requireTxAuxiliaryData () {
	if (hasRequiredTxAuxiliaryData) return txAuxiliaryData;
	hasRequiredTxAuxiliaryData = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.parseTxAuxiliaryData = exports.CVOTE_VKEY_LENGTH = void 0;
		const errors_1 = requireErrors();
		const invalidDataReason_1 = requireInvalidDataReason();
		const internal_1 = requireInternal();
		const public_1 = require_public();
		const parse_1 = requireParse();
		const output_1 = requireOutput();
		exports.CVOTE_VKEY_LENGTH = 32;
		function parseCVoteDelegation(delegation) {
		    const weight = (0, parse_1.parseUint32_t)(delegation.weight, invalidDataReason_1.InvalidDataReason.CVOTE_DELEGATION_INVALID_WEIGHT);
		    switch (delegation.type) {
		        case public_1.CIP36VoteDelegationType.KEY:
		            return {
		                type: delegation.type,
		                voteKey: (0, parse_1.parseHexStringOfLength)(delegation.voteKeyHex, internal_1.CVOTE_PUBLIC_KEY_LENGTH, invalidDataReason_1.InvalidDataReason.CVOTE_DELEGATION_INVALID_KEY),
		                weight,
		            };
		        case public_1.CIP36VoteDelegationType.PATH:
		            return {
		                type: delegation.type,
		                voteKeyPath: (0, parse_1.parseBIP32Path)(delegation.voteKeyPath, invalidDataReason_1.InvalidDataReason.CVOTE_DELEGATION_INVALID_PATH),
		                weight,
		            };
		        default:
		            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.CVOTE_DELEGATION_UNKNOWN_DELEGATION_TYPE);
		    }
		}
		function parseCVoteDelegations(delegations) {
		    (0, parse_1.validate)((0, parse_1.isArray)(delegations), invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_DELEGATIONS_NOT_ARRAY);
		    return delegations.map((d) => parseCVoteDelegation(d));
		}
		function parseCVoteRegistrationParams(network, params) {
		    switch (params.format) {
		        case public_1.CIP36VoteRegistrationFormat.CIP_15:
		            (0, parse_1.validate)(params.delegations == null, invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_INCONSISTENT_WITH_CIP15);
		            (0, parse_1.validate)(params.voteKeyHex != null, invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_INCONSISTENT_WITH_CIP15);
		            (0, parse_1.validate)(params.votingPurpose == null, invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_INCONSISTENT_WITH_CIP15);
		            break;
		        case public_1.CIP36VoteRegistrationFormat.CIP_36:
		            if (params.delegations != null) {
		                (0, parse_1.validate)(params.voteKeyHex == null && params.voteKeyPath == null, invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_INCONSISTENT_WITH_CIP36);
		            }
		            else {
		                (0, parse_1.validate)(params.delegations == null, invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_INCONSISTENT_WITH_CIP36);
		                (0, parse_1.validate)(params.voteKeyHex == null || params.voteKeyPath == null, invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_BOTH_KEY_AND_PATH);
		                (0, parse_1.validate)(params.voteKeyHex != null || params.voteKeyPath != null, invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_MISSING_VOTE_KEY);
		            }
		            break;
		        default:
		            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.CVOTE_DELEGATION_UNKNOWN_FORMAT);
		    }
		    const voteKey = params.voteKeyHex == null
		        ? null
		        : (0, parse_1.parseHexStringOfLength)(params.voteKeyHex, exports.CVOTE_VKEY_LENGTH, invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_INVALID_VOTE_KEY);
		    const voteKeyPath = params.voteKeyPath == null
		        ? null
		        : (0, parse_1.parseBIP32Path)(params.voteKeyPath, invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_INVALID_VOTE_KEY_PATH);
		    const delegations = params.delegations == null
		        ? null
		        : parseCVoteDelegations(params.delegations);
		    const votingPurpose = params.votingPurpose == null
		        ? null
		        : (0, parse_1.parseUint64_str)(params.votingPurpose, {}, invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_INVALID_VOTING_PURPOSE);
		    return {
		        format: params.format,
		        votePublicKey: voteKey,
		        votePublicKeyPath: voteKeyPath,
		        delegations,
		        stakingPath: (0, parse_1.parseBIP32Path)(params.stakingPath, invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_INVALID_STAKING_KEY_PATH),
		        paymentDestination: (0, output_1.parseTxDestination)(network, params.paymentDestination, false),
		        nonce: (0, parse_1.parseUint64_str)(params.nonce, {}, invalidDataReason_1.InvalidDataReason.CVOTE_REGISTRATION_INVALID_NONCE),
		        votingPurpose,
		    };
		}
		function parseTxAuxiliaryData(network, auxiliaryData) {
		    switch (auxiliaryData.type) {
		        case public_1.TxAuxiliaryDataType.ARBITRARY_HASH: {
		            return {
		                type: public_1.TxAuxiliaryDataType.ARBITRARY_HASH,
		                hashHex: (0, parse_1.parseHexStringOfLength)(auxiliaryData.params.hashHex, internal_1.AUXILIARY_DATA_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.AUXILIARY_DATA_INVALID_HASH),
		            };
		        }
		        case public_1.TxAuxiliaryDataType.CIP36_REGISTRATION: {
		            return {
		                type: public_1.TxAuxiliaryDataType.CIP36_REGISTRATION,
		                params: parseCVoteRegistrationParams(network, auxiliaryData.params),
		            };
		        }
		        default:
		            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.AUXILIARY_DATA_UNKNOWN_TYPE);
		    }
		}
		exports.parseTxAuxiliaryData = parseTxAuxiliaryData;
		
	} (txAuxiliaryData));
	return txAuxiliaryData;
}

var hasRequiredTransaction;

function requireTransaction () {
	if (hasRequiredTransaction) return transaction;
	hasRequiredTransaction = 1;
	Object.defineProperty(transaction, "__esModule", { value: true });
	transaction.parseSignTransactionRequest = transaction.parseTransaction = transaction.parseSigningMode = void 0;
	const errors_1 = requireErrors();
	const invalidDataReason_1 = requireInvalidDataReason();
	const internal_1 = requireInternal();
	const public_1 = require_public();
	const assert_1 = requireAssert();
	const parse_1 = requireParse();
	const certificate_1 = requireCertificate();
	const constants_1 = requireConstants();
	const network_1 = requireNetwork();
	const output_1 = requireOutput();
	const txAuxiliaryData_1 = requireTxAuxiliaryData();
	function parseCertificates(certificates) {
	    (0, parse_1.validate)((0, parse_1.isArray)(certificates), invalidDataReason_1.InvalidDataReason.CERTIFICATES_NOT_ARRAY);
	    const parsed = certificates.map((cert) => (0, certificate_1.parseCertificate)(cert));
	    return parsed;
	}
	function parseBoolean(value, errorMsg) {
	    (0, parse_1.validate)(typeof value === 'boolean', errorMsg);
	    return value;
	}
	function parseTxInput(input) {
	    const txHashHex = (0, parse_1.parseHexStringOfLength)(input.txHashHex, internal_1.TX_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.INPUT_INVALID_TX_HASH);
	    const outputIndex = (0, parse_1.parseUint32_t)(input.outputIndex, invalidDataReason_1.InvalidDataReason.INPUT_INVALID_UTXO_INDEX);
	    return {
	        txHashHex,
	        outputIndex,
	        path: input.path != null
	            ? (0, parse_1.parseBIP32Path)(input.path, invalidDataReason_1.InvalidDataReason.INPUT_INVALID_PATH)
	            : null,
	    };
	}
	function parseWithdrawal(params) {
	    return {
	        amount: (0, parse_1.parseCoin)(params.amount, invalidDataReason_1.InvalidDataReason.WITHDRAWAL_INVALID_AMOUNT),
	        stakeCredential: (0, parse_1.parseCredential)(params.stakeCredential, invalidDataReason_1.InvalidDataReason.WITHDRAWAL_INVALID_STAKE_CREDENTIAL),
	    };
	}
	function parseRequiredSigner(requiredSigner) {
	    switch (requiredSigner.type) {
	        case public_1.TxRequiredSignerType.PATH:
	            return {
	                type: 0,
	                path: (0, parse_1.parseBIP32Path)(requiredSigner.path, invalidDataReason_1.InvalidDataReason.REQUIRED_SIGNER_INVALID_PATH),
	            };
	        case public_1.TxRequiredSignerType.HASH:
	            return {
	                type: 1,
	                hashHex: (0, parse_1.parseHexStringOfLength)(requiredSigner.hashHex, internal_1.KEY_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.VKEY_HASH_WRONG_LENGTH),
	            };
	        default:
	            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.UNKNOWN_REQUIRED_SIGNER_TYPE);
	    }
	}
	function parseVoter(voter) {
	    const errMsg = invalidDataReason_1.InvalidDataReason.VOTER_INVALID;
	    switch (voter.type) {
	        case public_1.VoterType.COMMITTEE_KEY_HASH:
	        case public_1.VoterType.DREP_KEY_HASH:
	        case public_1.VoterType.STAKE_POOL_KEY_HASH:
	            return {
	                type: voter.type,
	                keyHashHex: (0, parse_1.parseHexStringOfLength)(voter.keyHashHex, internal_1.KEY_HASH_LENGTH, errMsg),
	            };
	        case public_1.VoterType.COMMITTEE_KEY_PATH:
	        case public_1.VoterType.DREP_KEY_PATH:
	        case public_1.VoterType.STAKE_POOL_KEY_PATH:
	            return {
	                type: voter.type,
	                keyPath: (0, parse_1.parseBIP32Path)(voter.keyPath, errMsg),
	            };
	        case public_1.VoterType.DREP_SCRIPT_HASH:
	        case public_1.VoterType.COMMITTEE_SCRIPT_HASH:
	            return {
	                type: voter.type,
	                scriptHashHex: (0, parse_1.parseHexStringOfLength)(voter.scriptHashHex, internal_1.SCRIPT_HASH_LENGTH, errMsg),
	            };
	        default:
	            (0, assert_1.unreachable)(voter);
	    }
	}
	function parseVote(vote) {
	    return {
	        govActionId: {
	            txHashHex: (0, parse_1.parseHexStringOfLength)(vote.govActionId.txHashHex, internal_1.TX_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.GOV_ACTION_ID_INVALID_TX_HASH),
	            govActionIndex: (0, parse_1.parseUint32_t)(vote.govActionId.govActionIndex, invalidDataReason_1.InvalidDataReason.GOV_ACTION_ID_INVALID_INDEX),
	        },
	        votingProcedure: {
	            vote: vote.votingProcedure.vote,
	            anchor: vote.votingProcedure.anchor == null
	                ? null
	                : (0, parse_1.parseAnchor)(vote.votingProcedure.anchor),
	        },
	    };
	}
	function parseVoterVotes(voterVotes) {
	    (0, parse_1.validate)((0, parse_1.isArray)(voterVotes.votes), invalidDataReason_1.InvalidDataReason.VOTER_VOTES_NOT_ARRAY);
	    return {
	        voter: parseVoter(voterVotes.voter),
	        votes: voterVotes.votes.map((v) => parseVote(v)),
	    };
	}
	function parseSigningMode(mode) {
	    switch (mode) {
	        case public_1.TransactionSigningMode.ORDINARY_TRANSACTION:
	        case public_1.TransactionSigningMode.POOL_REGISTRATION_AS_OWNER:
	        case public_1.TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR:
	        case public_1.TransactionSigningMode.MULTISIG_TRANSACTION:
	        case public_1.TransactionSigningMode.PLUTUS_TRANSACTION:
	            return mode;
	        default:
	            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.SIGN_MODE_UNKNOWN);
	    }
	}
	transaction.parseSigningMode = parseSigningMode;
	function parseTransaction(tx) {
	    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
	    const network = (0, network_1.parseNetwork)(tx.network);
	    (0, parse_1.validate)((0, parse_1.isArray)(tx.inputs), invalidDataReason_1.InvalidDataReason.INPUTS_NOT_ARRAY);
	    const inputs = tx.inputs.map((inp) => parseTxInput(inp));
	    (0, parse_1.validate)((0, parse_1.isArray)(tx.outputs), invalidDataReason_1.InvalidDataReason.OUTPUTS_NOT_ARRAY);
	    const outputs = tx.outputs.map((o) => (0, output_1.parseTxOutput)(o, tx.network));
	    const fee = (0, parse_1.parseCoin)(tx.fee, invalidDataReason_1.InvalidDataReason.FEE_INVALID);
	    const ttl = tx.ttl == null
	        ? null
	        : (0, parse_1.parseUint64_str)(tx.ttl, {}, invalidDataReason_1.InvalidDataReason.TTL_INVALID);
	    (0, parse_1.validate)((0, parse_1.isArray)((_a = tx.certificates) !== null && _a !== void 0 ? _a : []), invalidDataReason_1.InvalidDataReason.CERTIFICATES_NOT_ARRAY);
	    const certificates = parseCertificates((_b = tx.certificates) !== null && _b !== void 0 ? _b : []);
	    (0, parse_1.validate)((0, parse_1.isArray)((_c = tx.withdrawals) !== null && _c !== void 0 ? _c : []), invalidDataReason_1.InvalidDataReason.WITHDRAWALS_NOT_ARRAY);
	    const withdrawals = ((_d = tx.withdrawals) !== null && _d !== void 0 ? _d : []).map((w) => parseWithdrawal(w));
	    const auxiliaryData = tx.auxiliaryData == null
	        ? null
	        : (0, txAuxiliaryData_1.parseTxAuxiliaryData)(network, tx.auxiliaryData);
	    const validityIntervalStart = tx.validityIntervalStart == null
	        ? null
	        : (0, parse_1.parseUint64_str)(tx.validityIntervalStart, {}, invalidDataReason_1.InvalidDataReason.VALIDITY_INTERVAL_START_INVALID);
	    const mint = tx.mint == null ? null : (0, output_1.parseTokenBundle)(tx.mint, false, parse_1.parseInt64_str);
	    const scriptDataHashHex = tx.scriptDataHashHex == null
	        ? null
	        : (0, parse_1.parseHexStringOfLength)(tx.scriptDataHashHex, internal_1.SCRIPT_DATA_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.SCRIPT_DATA_HASH_WRONG_LENGTH);
	    (0, parse_1.validate)((0, parse_1.isArray)((_e = tx.collateralInputs) !== null && _e !== void 0 ? _e : []), invalidDataReason_1.InvalidDataReason.COLLATERAL_INPUTS_NOT_ARRAY);
	    const collateralInputs = ((_f = tx.collateralInputs) !== null && _f !== void 0 ? _f : []).map((inp) => parseTxInput(inp));
	    (0, parse_1.validate)((0, parse_1.isArray)((_g = tx.requiredSigners) !== null && _g !== void 0 ? _g : []), invalidDataReason_1.InvalidDataReason.REQUIRED_SIGNERS_NOT_ARRAY);
	    const requiredSigners = ((_h = tx.requiredSigners) !== null && _h !== void 0 ? _h : []).map((rs) => parseRequiredSigner(rs));
	    const includeNetworkId = tx.includeNetworkId == null
	        ? false
	        : parseBoolean(tx.includeNetworkId, invalidDataReason_1.InvalidDataReason.NETWORK_ID_INCLUDE_INVALID);
	    const collateralOutput = tx.collateralOutput == null
	        ? null
	        : (0, output_1.parseTxOutput)(tx.collateralOutput, tx.network);
	    (0, parse_1.validate)((collateralOutput === null || collateralOutput === void 0 ? void 0 : collateralOutput.datum) == null, invalidDataReason_1.InvalidDataReason.COLLATERAL_INPUT_CONTAINS_DATUM);
	    (0, parse_1.validate)((collateralOutput === null || collateralOutput === void 0 ? void 0 : collateralOutput.referenceScriptHex) == null, invalidDataReason_1.InvalidDataReason.COLLATERAL_INPUT_CONTAINS_REFERENCE_SCRIPT);
	    const totalCollateral = tx.totalCollateral == null
	        ? null
	        : (0, parse_1.parseCoin)(tx.totalCollateral, invalidDataReason_1.InvalidDataReason.TOTAL_COLLATERAL_NOT_VALID);
	    (0, parse_1.validate)((0, parse_1.isArray)((_j = tx.referenceInputs) !== null && _j !== void 0 ? _j : []), invalidDataReason_1.InvalidDataReason.REFERENCE_INPUTS_NOT_ARRAY);
	    const referenceInputs = ((_k = tx.referenceInputs) !== null && _k !== void 0 ? _k : []).map((ri) => parseTxInput(ri));
	    (0, parse_1.validate)((0, parse_1.isArray)((_l = tx.votingProcedures) !== null && _l !== void 0 ? _l : []), invalidDataReason_1.InvalidDataReason.VOTING_PROCEDURES_NOT_ARRAY);
	    const votingProcedures = ((_m = tx.votingProcedures) !== null && _m !== void 0 ? _m : []).map((x) => parseVoterVotes(x));
	    (0, parse_1.validate)(votingProcedures.length <= 1, invalidDataReason_1.InvalidDataReason.VOTING_PROCEDURES_INVALID_NUMBER_OF_VOTERS);
	    for (const voterVotes of votingProcedures) {
	        (0, parse_1.validate)(voterVotes.votes.length === 1, invalidDataReason_1.InvalidDataReason.VOTING_PROCEDURES_INVALID_NUMBER_OF_VOTES);
	    }
	    const treasury = tx.treasury == null
	        ? null
	        : (0, parse_1.parseCoin)(tx.treasury, invalidDataReason_1.InvalidDataReason.TREASURY_NOT_VALID);
	    const donation = tx.donation == null
	        ? null
	        : (0, parse_1.parseUint64_str)(tx.donation, { min: '1', max: constants_1.MAX_LOVELACE_SUPPLY_STR }, invalidDataReason_1.InvalidDataReason.DONATION_NOT_VALID);
	    return {
	        network,
	        inputs,
	        outputs,
	        ttl,
	        auxiliaryData,
	        validityIntervalStart,
	        withdrawals,
	        certificates,
	        fee,
	        mint,
	        scriptDataHashHex,
	        collateralInputs,
	        requiredSigners,
	        includeNetworkId,
	        collateralOutput,
	        totalCollateral,
	        referenceInputs,
	        votingProcedures,
	        treasury,
	        donation,
	    };
	}
	transaction.parseTransaction = parseTransaction;
	function parseTxOptions(options) {
	    return {
	        tagCborSets: (options === null || options === void 0 ? void 0 : options.tagCborSets) || false,
	    };
	}
	function parseSignTransactionRequest(request) {
	    var _a, _b;
	    const tx = parseTransaction(request.tx);
	    const signingMode = parseSigningMode(request.signingMode);
	    const options = parseTxOptions(request.options);
	    (0, parse_1.validate)((0, parse_1.isArray)((_a = request.additionalWitnessPaths) !== null && _a !== void 0 ? _a : []), invalidDataReason_1.InvalidDataReason.ADDITIONAL_WITNESSES_NOT_ARRAY);
	    const additionalWitnessPaths = ((_b = request.additionalWitnessPaths) !== null && _b !== void 0 ? _b : []).map((path) => (0, parse_1.parseBIP32Path)(path, invalidDataReason_1.InvalidDataReason.INVALID_PATH));
	    switch (signingMode) {
	        case public_1.TransactionSigningMode.ORDINARY_TRANSACTION: {
	            (0, parse_1.validate)(tx.certificates.every((certificate) => certificate.type !== internal_1.CertificateType.STAKE_POOL_REGISTRATION), invalidDataReason_1.InvalidDataReason.SIGN_MODE_ORDINARY__POOL_REGISTRATION_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.certificates.every((certificate) => {
	                switch (certificate.type) {
	                    case internal_1.CertificateType.STAKE_REGISTRATION:
	                    case internal_1.CertificateType.STAKE_REGISTRATION_CONWAY:
	                    case internal_1.CertificateType.STAKE_DEREGISTRATION:
	                    case internal_1.CertificateType.STAKE_DEREGISTRATION_CONWAY:
	                    case internal_1.CertificateType.STAKE_DELEGATION:
	                    case internal_1.CertificateType.VOTE_DELEGATION:
	                        return (certificate.stakeCredential.type === 0);
	                    default:
	                        return true;
	                }
	            }), invalidDataReason_1.InvalidDataReason.SIGN_MODE_ORDINARY__CERTIFICATE_STAKE_CREDENTIAL_ONLY_AS_PATH);
	            (0, parse_1.validate)(tx.certificates.every((certificate) => {
	                switch (certificate.type) {
	                    case internal_1.CertificateType.AUTHORIZE_COMMITTEE_HOT:
	                    case internal_1.CertificateType.RESIGN_COMMITTEE_COLD:
	                        return certificate.coldCredential.type === 0;
	                    default:
	                        return true;
	                }
	            }), invalidDataReason_1.InvalidDataReason.SIGN_MODE_ORDINARY__CERTIFICATE_COMMITTEE_COLD_CREDENTIAL_ONLY_AS_PATH);
	            (0, parse_1.validate)(tx.certificates.every((certificate) => {
	                switch (certificate.type) {
	                    case internal_1.CertificateType.DREP_REGISTRATION:
	                    case internal_1.CertificateType.DREP_DEREGISTRATION:
	                    case internal_1.CertificateType.DREP_UPDATE:
	                        return certificate.dRepCredential.type === 0;
	                    default:
	                        return true;
	                }
	            }), invalidDataReason_1.InvalidDataReason.SIGN_MODE_ORDINARY__CERTIFICATE_DREP_CREDENTIAL_ONLY_AS_PATH);
	            (0, parse_1.validate)(tx.withdrawals.every((withdrawal) => withdrawal.stakeCredential.type === 0), invalidDataReason_1.InvalidDataReason.SIGN_MODE_ORDINARY__WITHDRAWAL_ONLY_AS_PATH);
	            (0, parse_1.validate)(tx.collateralInputs.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_ORDINARY__COLLATERAL_INPUTS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.collateralOutput == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_ORDINARY__COLLATERAL_OUTPUT_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.totalCollateral == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_ORDINARY__TOTAL_COLLATERAL_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.referenceInputs.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_ORDINARY__REFERENCE_INPUTS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.votingProcedures.every((voterVotes) => {
	                switch (voterVotes.voter.type) {
	                    case public_1.VoterType.COMMITTEE_KEY_PATH:
	                    case public_1.VoterType.DREP_KEY_PATH:
	                    case public_1.VoterType.STAKE_POOL_KEY_PATH:
	                        return true;
	                    default:
	                        return false;
	                }
	            }), invalidDataReason_1.InvalidDataReason.SIGN_MODE_ORDINARY__VOTER_ONLY_AS_PATH);
	            break;
	        }
	        case public_1.TransactionSigningMode.MULTISIG_TRANSACTION: {
	            (0, parse_1.validate)(tx.outputs.every((output) => output.destination.type === public_1.TxOutputDestinationType.THIRD_PARTY), invalidDataReason_1.InvalidDataReason.SIGN_MODE_MULTISIG__DEVICE_OWNED_ADDRESS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.certificates.every((certificate) => certificate.type !== internal_1.CertificateType.STAKE_POOL_REGISTRATION), invalidDataReason_1.InvalidDataReason.SIGN_MODE_MULTISIG__POOL_REGISTRATION_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.certificates.every((certificate) => certificate.type !== internal_1.CertificateType.STAKE_POOL_RETIREMENT), invalidDataReason_1.InvalidDataReason.SIGN_MODE_MULTISIG__POOL_RETIREMENT_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.certificates.every((certificate) => {
	                switch (certificate.type) {
	                    case internal_1.CertificateType.STAKE_REGISTRATION:
	                    case internal_1.CertificateType.STAKE_REGISTRATION_CONWAY:
	                    case internal_1.CertificateType.STAKE_DEREGISTRATION:
	                    case internal_1.CertificateType.STAKE_DEREGISTRATION_CONWAY:
	                    case internal_1.CertificateType.STAKE_DELEGATION:
	                    case internal_1.CertificateType.VOTE_DELEGATION:
	                        return (certificate.stakeCredential.type === 1);
	                    case internal_1.CertificateType.AUTHORIZE_COMMITTEE_HOT:
	                    case internal_1.CertificateType.RESIGN_COMMITTEE_COLD:
	                        return (certificate.coldCredential.type === 1);
	                    case internal_1.CertificateType.DREP_REGISTRATION:
	                    case internal_1.CertificateType.DREP_DEREGISTRATION:
	                    case internal_1.CertificateType.DREP_UPDATE:
	                        return (certificate.dRepCredential.type === 1);
	                    default:
	                        return true;
	                }
	            }), invalidDataReason_1.InvalidDataReason.SIGN_MODE_MULTISIG__CERTIFICATE_CREDENTIAL_ONLY_AS_SCRIPT);
	            (0, parse_1.validate)(tx.withdrawals.every((withdrawal) => withdrawal.stakeCredential.type === 1), invalidDataReason_1.InvalidDataReason.SIGN_MODE_MULTISIG__WITHDRAWAL_ONLY_AS_SCRIPT);
	            (0, parse_1.validate)(tx.collateralInputs.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_MULTISIG__COLLATERAL_INPUTS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.collateralOutput == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_MULTISIG__COLLATERAL_OUTPUT_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.totalCollateral == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_MULTISIG__TOTAL_COLLATERAL_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.referenceInputs.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_MULTISIG__REFERENCE_INPUTS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.votingProcedures.every((voterVotes) => {
	                switch (voterVotes.voter.type) {
	                    case public_1.VoterType.COMMITTEE_SCRIPT_HASH:
	                    case public_1.VoterType.DREP_SCRIPT_HASH:
	                        return true;
	                    default:
	                        return false;
	                }
	            }), invalidDataReason_1.InvalidDataReason.SIGN_MODE_MULTISIG__VOTER_ONLY_AS_SCRIPT);
	            break;
	        }
	        case public_1.TransactionSigningMode.POOL_REGISTRATION_AS_OWNER: {
	            (0, parse_1.validate)(tx.inputs.every((inp) => inp.path == null), invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__INPUT_WITH_PATH_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.outputs.every((out) => out.destination.type === public_1.TxOutputDestinationType.THIRD_PARTY), invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__DEVICE_OWNED_ADDRESS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.outputs.every((out) => out.datum == null), invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__DATUM_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.outputs.every((out) => out.referenceScriptHex == null), invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__REFERENCE_SCRIPT_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.certificates.length === 1, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__SINGLE_POOL_REG_CERTIFICATE_REQUIRED);
	            tx.certificates.forEach((certificate) => {
	                (0, parse_1.validate)(certificate.type === internal_1.CertificateType.STAKE_POOL_REGISTRATION, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__SINGLE_POOL_REG_CERTIFICATE_REQUIRED);
	                (0, parse_1.validate)(certificate.pool.poolKey.type === public_1.PoolKeyType.THIRD_PARTY, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__THIRD_PARTY_POOL_KEY_REQUIRED);
	                (0, parse_1.validate)(certificate.pool.owners.filter((o) => o.type === public_1.PoolOwnerType.DEVICE_OWNED).length === 1, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__SINGLE_DEVICE_OWNER_REQUIRED);
	            });
	            (0, parse_1.validate)(tx.withdrawals.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__WITHDRAWALS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.mint == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__MINT_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.scriptDataHashHex == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__SCRIPT_DATA_HASH_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.collateralInputs.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__COLLATERAL_INPUTS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.requiredSigners.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__REQUIRED_SIGNERS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.collateralOutput == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__COLLATERAL_OUTPUT_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.totalCollateral == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__TOTAL_COLLATERAL_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.referenceInputs.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__REFERENCE_INPUTS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.votingProcedures.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__VOTING_PROCEDURES_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.treasury == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__TREASURY_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.donation == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__DONATION_NOT_ALLOWED);
	            break;
	        }
	        case public_1.TransactionSigningMode.POOL_REGISTRATION_AS_OPERATOR: {
	            (0, parse_1.validate)(tx.outputs.every((out) => out.datum == null), invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__DATUM_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.outputs.every((out) => out.referenceScriptHex == null), invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__REFERENCE_SCRIPT_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.certificates.length === 1, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__SINGLE_POOL_REG_CERTIFICATE_REQUIRED);
	            tx.certificates.forEach((certificate) => {
	                (0, parse_1.validate)(certificate.type === internal_1.CertificateType.STAKE_POOL_REGISTRATION, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__SINGLE_POOL_REG_CERTIFICATE_REQUIRED);
	                (0, parse_1.validate)(certificate.pool.poolKey.type === public_1.PoolKeyType.DEVICE_OWNED, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__DEVICE_OWNED_POOL_KEY_REQUIRED);
	                (0, parse_1.validate)(certificate.pool.owners.filter((o) => o.type === public_1.PoolOwnerType.DEVICE_OWNED).length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__DEVICE_OWNED_POOL_OWNER_NOT_ALLOWED);
	            });
	            (0, parse_1.validate)(tx.withdrawals.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__WITHDRAWALS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.mint == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__MINT_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.scriptDataHashHex == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__SCRIPT_DATA_HASH_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.collateralInputs.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__COLLATERAL_INPUTS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.requiredSigners.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__REQUIRED_SIGNERS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.collateralOutput == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__COLLATERAL_OUTPUT_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.totalCollateral == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__TOTAL_COLLATERAL_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.referenceInputs.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__REFERENCE_INPUTS_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.votingProcedures.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__VOTING_PROCEDURES_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.treasury == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__TREASURY_NOT_ALLOWED);
	            (0, parse_1.validate)(tx.donation == null, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OPERATOR__DONATION_NOT_ALLOWED);
	            break;
	        }
	        case public_1.TransactionSigningMode.PLUTUS_TRANSACTION: {
	            (0, parse_1.validate)(tx.certificates.every((certificate) => certificate.type !== internal_1.CertificateType.STAKE_POOL_REGISTRATION), invalidDataReason_1.InvalidDataReason.SIGN_MODE_PLUTUS__POOL_REGISTRATION_NOT_ALLOWED);
	            break;
	        }
	        default:
	            (0, assert_1.unreachable)(signingMode);
	    }
	    return { tx, signingMode, additionalWitnessPaths, options };
	}
	transaction.parseSignTransactionRequest = parseSignTransactionRequest;
	
	return transaction;
}

var hasRequiredAda;

function requireAda () {
	if (hasRequiredAda) return Ada;
	hasRequiredAda = 1;
	(function (exports) {
		var __createBinding = (Ada && Ada.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (Ada && Ada.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		var __awaiter = (Ada && Ada.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		var __importDefault = (Ada && Ada.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Networks = exports.utils = exports.Ada = void 0;
		const errors_1 = requireErrors();
		const invalidDataReason_1 = requireInvalidDataReason();
		const deriveAddress_1 = requireDeriveAddress();
		const deriveNativeScriptHash_1 = requireDeriveNativeScriptHash();
		const getExtendedPublicKeys_1 = requireGetExtendedPublicKeys();
		const getSerial_1 = requireGetSerial();
		const getVersion_1 = requireGetVersion();
		const runTests_1 = requireRunTests();
		const showAddress_1 = requireShowAddress();
		const signCVote_1 = requireSignCVote();
		const signOperationalCertificate_1 = requireSignOperationalCertificate();
		const signMessage_1 = requireSignMessage();
		const messageData_1 = requireMessageData();
		const signTx_1 = requireSignTx();
		const address_1 = requireAddress();
		const cVote_1 = requireCVote();
		const nativeScript_1 = requireNativeScript();
		const operationalCertificate_1 = requireOperationalCertificate();
		const transaction_1 = requireTransaction();
		const utils_1 = __importDefault(requireUtils());
		exports.utils = utils_1.default;
		const assert_1 = requireAssert();
		const parse_1 = requireParse();
		__exportStar(requireErrors(), exports);
		__exportStar(require_public(), exports);
		const CLA = 0xd7;
		function wrapConvertDeviceStatusError(fn) {
		    return (...args) => __awaiter(this, void 0, void 0, function* () {
		        try {
		            return yield fn(...args);
		        }
		        catch (e) {
		            if (e &&
		                typeof e === 'object' &&
		                'statusCode' in e &&
		                typeof e.statusCode === 'number') {
		                throw new errors_1.DeviceStatusError(e.statusCode);
		            }
		            throw e;
		        }
		    });
		}
		function wrapRetryStillInCall(fn) {
		    return (...args) => __awaiter(this, void 0, void 0, function* () {
		        try {
		            return yield fn(...args);
		        }
		        catch (e) {
		            if (e &&
		                e.statusCode &&
		                e.statusCode === errors_1.DeviceStatusCodes.ERR_STILL_IN_CALL) {
		                return yield fn(...args);
		            }
		            throw e;
		        }
		    });
		}
		function interact(interaction, send) {
		    return __awaiter(this, void 0, void 0, function* () {
		        let cursor = interaction.next();
		        let first = true;
		        while (!cursor.done) {
		            const apdu = cursor.value;
		            const res = first
		                ? yield wrapRetryStillInCall(send)(apdu)
		                : yield send(apdu);
		            first = false;
		            cursor = interaction.next(res);
		        }
		        return cursor.value;
		    });
		}
		let Ada$1 = class Ada {
		    constructor(transport, scrambleKey = 'ADA') {
		        this.transport = transport;
		        const methods = [
		            'getVersion',
		            'getSerial',
		            'getExtendedPublicKeys',
		            'signTransaction',
		            'deriveAddress',
		            'showAddress',
		            'deriveNativeScriptHash',
		        ];
		        this.transport.decorateAppAPIMethods(this, methods, scrambleKey);
		        this._send = (params) => __awaiter(this, void 0, void 0, function* () {
		            if (params.data.length > 255) {
		                throw new Error('APDU too large, likely a bug');
		            }
		            let response = yield wrapConvertDeviceStatusError(this.transport.send)(CLA, params.ins, params.p1, params.p2, params.data);
		            response = utils_1.default.stripRetcodeFromResponse(response);
		            if (params.expectedResponseLength != null) {
		                (0, assert_1.assert)(response.length === params.expectedResponseLength, `unexpected response length: ${response.length} instead of ${params.expectedResponseLength}`);
		            }
		            return response;
		        });
		    }
		    getVersion() {
		        return __awaiter(this, void 0, void 0, function* () {
		            const version = yield interact(this._getVersion(), this._send);
		            return { version, compatibility: (0, getVersion_1.getCompatibility)(version) };
		        });
		    }
		    *_getVersion() {
		        return yield* (0, getVersion_1.getVersion)();
		    }
		    getSerial() {
		        return __awaiter(this, void 0, void 0, function* () {
		            return interact(this._getSerial(), this._send);
		        });
		    }
		    *_getSerial() {
		        const version = yield* (0, getVersion_1.getVersion)();
		        return yield* (0, getSerial_1.getSerial)(version);
		    }
		    runTests() {
		        return __awaiter(this, void 0, void 0, function* () {
		            return interact(this._runTests(), this._send);
		        });
		    }
		    *_runTests() {
		        const version = yield* (0, getVersion_1.getVersion)();
		        return yield* (0, runTests_1.runTests)(version);
		    }
		    getExtendedPublicKeys({ paths, }) {
		        return __awaiter(this, void 0, void 0, function* () {
		            (0, parse_1.validate)((0, parse_1.isArray)(paths), invalidDataReason_1.InvalidDataReason.GET_EXT_PUB_KEY_PATHS_NOT_ARRAY);
		            const parsed = paths.map((path) => (0, parse_1.parseBIP32Path)(path, invalidDataReason_1.InvalidDataReason.INVALID_PATH));
		            return interact(this._getExtendedPublicKeys(parsed), this._send);
		        });
		    }
		    *_getExtendedPublicKeys(paths) {
		        const version = yield* (0, getVersion_1.getVersion)();
		        return yield* (0, getExtendedPublicKeys_1.getExtendedPublicKeys)(version, paths);
		    }
		    getExtendedPublicKey({ path, }) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return (yield this.getExtendedPublicKeys({ paths: [path] }))[0];
		        });
		    }
		    deriveAddress({ network, address, }) {
		        return __awaiter(this, void 0, void 0, function* () {
		            const parsedParams = (0, address_1.parseAddress)(network, address);
		            return interact(this._deriveAddress(parsedParams), this._send);
		        });
		    }
		    *_deriveAddress(addressParams) {
		        const version = yield* (0, getVersion_1.getVersion)();
		        return yield* (0, deriveAddress_1.deriveAddress)(version, addressParams);
		    }
		    showAddress({ network, address }) {
		        return __awaiter(this, void 0, void 0, function* () {
		            const parsedParams = (0, address_1.parseAddress)(network, address);
		            return interact(this._showAddress(parsedParams), this._send);
		        });
		    }
		    *_showAddress(addressParams) {
		        const version = yield* (0, getVersion_1.getVersion)();
		        return yield* (0, showAddress_1.showAddress)(version, addressParams);
		    }
		    signTransaction(request) {
		        return __awaiter(this, void 0, void 0, function* () {
		            const parsedRequest = (0, transaction_1.parseSignTransactionRequest)(request);
		            return interact(this._signTx(parsedRequest), this._send);
		        });
		    }
		    *_signTx(request) {
		        const version = yield* (0, getVersion_1.getVersion)();
		        return yield* (0, signTx_1.signTransaction)(version, request);
		    }
		    signOperationalCertificate(request) {
		        return __awaiter(this, void 0, void 0, function* () {
		            const parsedOperationalCertificate = (0, operationalCertificate_1.parseOperationalCertificate)(request);
		            return interact(this._signOperationalCertificate(parsedOperationalCertificate), this._send);
		        });
		    }
		    *_signOperationalCertificate(request) {
		        const version = yield* (0, getVersion_1.getVersion)();
		        return yield* (0, signOperationalCertificate_1.signOperationalCertificate)(version, request);
		    }
		    signMessage(request) {
		        return __awaiter(this, void 0, void 0, function* () {
		            const parsedMsgData = (0, messageData_1.parseMessageData)(request);
		            return interact(this._signMessage(parsedMsgData), this._send);
		        });
		    }
		    *_signMessage(request) {
		        const version = yield* (0, getVersion_1.getVersion)();
		        return yield* (0, signMessage_1.signMessage)(version, request);
		    }
		    signCIP36Vote(request) {
		        return __awaiter(this, void 0, void 0, function* () {
		            const parsedCVote = (0, cVote_1.parseCVote)(request);
		            return interact(this._signCIP36Vote(parsedCVote), this._send);
		        });
		    }
		    *_signCIP36Vote(request) {
		        const version = yield* (0, getVersion_1.getVersion)();
		        return yield* (0, signCVote_1.signCVote)(version, request);
		    }
		    deriveNativeScriptHash({ script, displayFormat, }) {
		        return __awaiter(this, void 0, void 0, function* () {
		            const parsedScript = (0, nativeScript_1.parseNativeScript)(script);
		            const parsedDisplayFormat = (0, nativeScript_1.parseNativeScriptHashDisplayFormat)(displayFormat);
		            return interact(this._deriveNativeScriptHash(parsedScript, parsedDisplayFormat), this._send);
		        });
		    }
		    *_deriveNativeScriptHash(script, displayFormat) {
		        const version = yield* (0, getVersion_1.getVersion)();
		        return yield* (0, deriveNativeScriptHash_1.deriveNativeScriptHash)(version, script, displayFormat);
		    }
		};
		exports.Ada = Ada$1;
		exports.default = Ada$1;
		exports.Networks = {
		    Mainnet: {
		        networkId: 0x01,
		        protocolMagic: 764824073,
		    },
		    Testnet: {
		        networkId: 0x00,
		        protocolMagic: 1097911063,
		    },
		};
		
	} (Ada));
	return Ada;
}

var AdaExports = requireAda();

const doLog = false;
const storeId$1 = "useLedgerDevicePermissions";
const isWebUSBSupported = async () => {
  return await TransportWebUSB.isSupported();
};
const isWebHIDSupported = async () => {
  return await TransportWebHID.isSupported();
};
const isWebBLESupported = async () => {
  return await BluetoothTransport.isSupported();
};
let _transportType = null;
let _transport = null;
let _transportClose = null;
let _ledger = null;
let _version = null;
const ledgerTransport = getLedgerTransport();
const setActiveTransport = (transport, type) => {
  _transportClose = null;
  _transport = transport;
  _transportType = type;
  if (!_transport && _ledger) {
    _ledger = null;
  }
};
async function closeTransport() {
  try {
    if (!_transport) {
      return;
    }
    if (doLog) ;
    _transportClose = _transport.close();
    await _transportClose;
    if (doLog) ;
    setActiveTransport(null, null);
  } catch (e) {
    console.error(e);
  }
}
const tryHidTransport = async () => {
  const isSupported = await isWebHIDSupported();
  if (isSupported) {
    try {
      if (_transportClose) {
        await _transportClose;
      }
      if (_transport && _transportType === "WebHID") {
        return _transport;
      }
      let transport = await TransportWebHID.create();
      transport.on("disconnect", () => {
        if (doLog) ;
        setActiveTransport(null, null);
      });
      if (doLog) ;
      setActiveTransport(transport, "WebHID");
      return transport;
    } catch (e) {
      console.error(e);
      throw e;
    }
  } else {
    throw new Error("WebHID not supported. Please check USB connection and/or choose another connection method.");
  }
};
const tryUsbTransport = async () => {
  const isSupported = await isWebUSBSupported();
  if (isSupported) {
    if (_transportClose) {
      await _transportClose;
    }
    if (_transport && _transportType === "WebUSB") {
      return _transport;
    }
    let transport = await TransportWebUSB.create();
    transport.on("disconnect", () => {
      setActiveTransport(null, null);
    });
    setActiveTransport(transport, "WebUSB");
    return transport;
  } else {
    throw new Error("WebUSB not supported. Please check USB connection and/or choose another connection method.");
  }
};
const tryBluetoothTransport = async () => {
  const isSupported = await isWebBLESupported();
  if (isSupported) {
    if (_transportClose) {
      await _transportClose;
    }
    if (_transport && _transportType === "WebBLE") {
      return _transport;
    }
    let transport = await BluetoothTransport.create(12e3);
    transport.on("disconnect", () => {
      setActiveTransport(null, null);
    });
    setActiveTransport(transport, "WebBLE");
    return transport;
  } else {
    throw new Error("Bluetooth not supported by Ledger device or platform. Please check bluetooth connection and/or choose another connection method in wallet settings.");
  }
};
async function _getLedgerTransport(type) {
  type = type ?? (ledgerTransport.value === "USB" ? "WebHID" : "WebBLE");
  let transport;
  try {
    switch (type) {
      case "WebHID":
        transport = await tryHidTransport();
        break;
      case "WebUSB":
        transport = await tryUsbTransport();
        break;
      case "WebBLE":
        transport = await tryBluetoothTransport();
        break;
    }
  } catch (err) {
    console.error("Ledger transport:", err, { name: err.name, message: err.message });
    throw err;
  }
  return transport;
}
async function initiateLedger(type, signingMode = null, timeout) {
  try {
    const transport = await _getLedgerTransport(type);
    if (timeout) ;
    const ledger = new AdaExports.Ada(transport);
    const version = await ledger.getVersion();
    console.log("ledger version", version.version);
    console.log("ledger compatibility", version.compatibility);
    _version = version;
    if (signingMode === AdaExports.TransactionSigningMode.PLUTUS_TRANSACTION) {
      if (!version.compatibility.supportsAlonzo) throw new Error("Alonzo: Ledger app version too old, please update firmware and Cardano app version on your Ledger device.");
    } else if (signingMode === AdaExports.TransactionSigningMode.MULTISIG_TRANSACTION) {
      if (!version.compatibility.supportsMultisigTransaction) throw new Error("Multi-Sig: Ledger app version too old, please update firmware and Cardano app version on your Ledger device.");
    } else {
      if (!version.compatibility.supportsMary) throw new Error("Mary: Ledger app version too old, please update firmware and Cardano app version on your Ledger device.");
    }
    _ledger = ledger;
    return ledger;
  } catch (error) {
    if (!type || type === "WebHID") {
      try {
        return initiateLedger("WebUSB", signingMode, timeout);
      } catch (e) {
      }
    }
    let errMsg = error.message ?? error;
    if (errMsg.includes("0x6e01") || errMsg.includes("0x5515")) {
      errMsg = "Please unlock and open the Cardano app on your Ledger device before proceeding.";
    }
    throw new Error(errMsg);
  }
}
async function tryLedgerConnection() {
  const type = ledgerTransport.value === "USB" ? "WebHID" : "WebBLE";
  const ledger = await initiateLedger(type);
  if (!ledger) {
    return false;
  }
  const { serialHex } = await ledger.getSerial();
  closeTransport().catch((e) => console.error(e));
  return !!serialHex;
}
function useLedgerDevice() {
  return {
    tryLedgerConnection
  };
}

const fixPermission = getFixPermission();
const fixPermissionResult = getFixPermissionResult();
let _openUICallback = null;
const addOpenUICallback = (callback) => {
  _openUICallback = callback;
};
const openFixPermissionsUI = (permission) => {
  setFixPermission(permission);
  if (_openUICallback) {
    _openUICallback(permission);
  }
};
const useFixPermission = () => {
  return {
    fixPermission,
    fixPermissionResult,
    setFixPermission,
    setFixPermissionResult,
    addOpenUICallback,
    openFixPermissionsUI
  };
};

const _hoisted_1$b = {
  ref: "bg2",
  class: "relative w-full h-full"
};
const _hoisted_2$4 = { key: 2 };
const _hoisted_3$4 = {
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
          createBaseVNode("div", _hoisted_1$b, [
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
                __props.showHeaderBanner && (unref(modalHeaderBanner) || _ctx.$slots["modal-header-banner"]) ? (openBlock(), createElementBlock("div", _hoisted_2$4)) : createCommentVNode("", true),
                hasSlotHeader.value ? (openBlock(), createElementBlock("div", _hoisted_3$4, [
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

const _hoisted_1$a = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$a, [...(_cache[0] || (_cache[0] = [
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
const IconChevronLeft = /*#__PURE__*/_export_sfc(_sfc_main$e, [['render',_sfc_render$4]]);

const _sfc_main$d = {  };

const _hoisted_1$9 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$9, [...(_cache[0] || (_cache[0] = [
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
const IconChevronRight = /*#__PURE__*/_export_sfc(_sfc_main$d, [['render',_sfc_render$3]]);

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

const _hoisted_1$8 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$8, [...(_cache[0] || (_cache[0] = [
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
const IconInformationCircle = /*#__PURE__*/_export_sfc(_sfc_main$b, [['render',_sfc_render$2]]);

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

const _hoisted_1$7 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$7, [...(_cache[0] || (_cache[0] = [
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
const IconCancel01 = /*#__PURE__*/_export_sfc(_sfc_main$9, [['render',_sfc_render$1]]);

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

const _hoisted_1$6 = { class: "w-full flex flex-col mt-2" };
const _hoisted_2$3 = { class: "relative w-full flex flex-row et-gap-sm md:et-gap-md et-jb-ic" };
const _hoisted_3$3 = {
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
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", _hoisted_2$3, [
          !unref(isRtl) ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
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

const _hoisted_1$5 = { class: "modal-content-card relative grow min-h-full max-w-full flex flex-col et-js-is et-gap-md" };

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("div", _hoisted_1$5, [
    renderSlot(_ctx.$slots, "default")
  ]))
}
const ModalContentCard = /*#__PURE__*/_export_sfc(_sfc_main$6, [['render',_sfc_render]]);

const _hoisted_1$4 = { class: "w-full text-center text-txt-muted" };
const _hoisted_2$2 = {
  key: 0,
  class: "w-full text-center text-txt-red"
};
const _hoisted_3$2 = { class: "w-full flex et-jc" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ModalFixPermission",
  setup(__props) {
    const {
      fixPermission,
      setFixPermission,
      setFixPermissionResult
    } = useFixPermission();
    const $t = useTranslation().t;
    const { tryLedgerConnection } = useLedgerDevice();
    const {
      showSuccess,
      showError
    } = useNotifications();
    const isLoading = ref(false);
    const error = ref("");
    const showModal = computed(() => fixPermission.value !== "none");
    const initLedger = async () => {
      isLoading.value = true;
      try {
        error.value = "";
        const success = await tryLedgerConnection();
        if (success) {
          showSuccess($t("permissions:" + fixPermission.value + ".success"));
          setFixPermissionResult(fixPermission.value);
          onClose();
        } else {
          setFixPermissionResult("none");
          showError($t("permissions:" + fixPermission.value + ".error"));
        }
        isLoading.value = false;
      } catch (err) {
        setFixPermissionResult("none");
        error.value = err;
      }
      isLoading.value = false;
    };
    const initCamera = async () => {
      isLoading.value = true;
      try {
        error.value = "";
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (stream) {
          showSuccess($t("permissions:" + fixPermission.value + ".success"));
          setFixPermissionResult(fixPermission.value);
          onClose();
        } else {
          setFixPermissionResult("none");
          showError($t("permissions:" + fixPermission.value + ".error"));
        }
      } catch (err) {
        setFixPermissionResult("none");
        error.value = err;
      }
      isLoading.value = false;
    };
    const doFixPermission = () => {
      if (fixPermission.value === "usb" || fixPermission.value === "ble") {
        return initLedger();
      } else if (fixPermission.value === "camera") {
        return initCamera();
      }
      return false;
    };
    const onClose = () => {
      setFixPermission("none");
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return showModal.value ? (openBlock(), createBlock(_sfc_main$f, {
        key: 0,
        narrow: "",
        onClose
      }, {
        header: withCtx(({ handleClose }) => [
          createVNode(_sfc_main$7, {
            headline: unref($t)("permissions:headline"),
            caption: unref($t)("permissions:" + unref(fixPermission) + ".caption"),
            "hide-info": "",
            "hide-back": "",
            "show-close": "",
            onClose: handleClose
          }, null, 8, ["headline", "caption", "onClose"])
        ]),
        content: withCtx(() => [
          createVNode(ModalContentCard, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$4, toDisplayString(unref($t)("permissions:" + unref(fixPermission) + ".text")), 1),
              error.value ? (openBlock(), createElementBlock("span", _hoisted_2$2, toDisplayString(error.value), 1)) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        footer: withCtx(() => [
          createBaseVNode("div", _hoisted_3$2, [
            createVNode(_component_Button, {
              label: unref($t)("permissions:" + unref(fixPermission) + ".button"),
              rounded: "",
              onClick: withModifiers(doFixPermission, ["stop"])
            }, null, 8, ["label"])
          ])
        ]),
        _: 1
      })) : createCommentVNode("", true);
    };
  }
});

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

const createIEpochParameterStore = (networkId) => {
  return {
    networkId,
    network: networkId,
    epochNo: 0,
    totals: createITotals(),
    isAtLeastBabbageEra: false,
    isAtLeastConwayEra: false,
    isAtLeastConwayEra2: false,
    txFeePerByte: 0,
    minUTxOValue: 0,
    stakePoolDeposit: 0,
    utxoCostPerSize: 0,
    utxoCostPerWord: 0,
    decentralization: 0,
    poolRetireMaxEpoch: 0,
    extraPraosEntropy: null,
    collateralPercentage: 0,
    stakePoolTargetNum: 0,
    maxBlockBodySize: 0,
    maxTxSize: 0,
    treasuryCut: 0,
    minPoolCost: 0,
    maxCollateralInputs: 0,
    maxValueSize: 0,
    maxBlockExecutionUnits: {
      memory: 0,
      steps: 0
    },
    maxBlockHeaderSize: 0,
    costModels: {},
    maxTxExecutionUnits: {
      memory: 0,
      steps: 0
    },
    protocolVersion: {
      minor: 0,
      major: 0
    },
    txFeeFixed: 0,
    stakeAddressDeposit: 0,
    monetaryExpansion: 0,
    poolPledgeInfluence: 0,
    executionUnitPrices: {
      memory: 0,
      steps: 0
    },
    costModelId: 0,
    nonce: "",
    pvt: {
      motionNoConfidence: 0,
      committeeNormal: 0,
      committeeNoConfidence: 0,
      hardForkInitiation: 0,
      PPSecurityGroup: 0
    },
    dvt: {
      motionNoConfidence: 0,
      committeeNormal: 0,
      committeeNoConfidence: 0,
      hardForkInitiation: 0,
      updateToConstitution: 0,
      PPNetworkGroup: 0,
      PPEconomicGroup: 0,
      PPTechnicalGroup: 0,
      PPGovGroup: 0,
      TreasuryWithdrawal: 0
    },
    committee: {
      minSize: 0,
      maxTermLength: 0
    },
    govAction: {
      lifeTime: 0,
      deposit: 0
    },
    drep: {
      deposit: 0,
      activity: 0
    }
  };
};
const createITotals = () => {
  return {
    circulation: "0",
    treasury: "0",
    rewards: "0",
    supply: "0",
    reserves: "0",
    reservesDepletion: "0",
    blockLossFactor: 1
  };
};

const storeId = "epochParamsStore";
const _epochParams = ref(getEpochParams(networkId$9.value, createIEpochParameterStore(networkId$9.value)).value);
computed(() => _epochParams.value);
const _reloadEpochParams = () => {
  _epochParams.value = getEpochParams(networkId$9.value, createIEpochParameterStore(networkId$9.value)).value;
};
addSignalListener(onNetworkIdUpdated, storeId, () => {
  _reloadEpochParams();
});

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

const _hoisted_1$3 = { class: "shrink-0 epoch-progress-bar w-full h-1 bg-blue overflow-hidden" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "EpochProgressBar",
  setup(__props) {
    const { epochPercent } = useChainProgress();
    const progress = computed(() => epochPercent.value * 100);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createVNode(GradientBar2, {
          progress: progress.value,
          class: "fixed"
        }, null, 8, ["progress"])
      ]);
    };
  }
});

const _hoisted_1$2 = ["src"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
            }, null, 8, _hoisted_1$2)
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

const _hoisted_1$1 = { class: "main-layout relative w-full h-full max-h-full flex flex-col et-js-ic" };
const _hoisted_2$1 = { class: "grow w-full flex flex-row et-jc-ic overflow-hidden" };
const _hoisted_3$1 = { class: "main-layout-content relative grow w-full flex flex-col overflow-x-hidden overflow-y-hidden" };
const _hoisted_4$1 = { class: "relative h-full flex flex-col scroll-anchor mr-1 sm:mr-2 lg:mr-0 pr-0 sm:pr-1 pt-5 sm:pt-5 lg:pt-7 overflow-x-hidden overflow-y-scroll content-scroll et-scrollbar" };
const _hoisted_5$1 = { class: "w-full flex et-js" };
const _hoisted_6 = { class: "w-full et-max-width-layout-content" };
const _hoisted_7 = { class: "absolute top-0 left-0 right-0 flex flex-col et-js-is bg-black/20 backdrop-blur-modal" };
const _hoisted_8 = { class: "main-layout-header w-full flex flex-row et-jc-is" };
const _hoisted_9 = { class: "shrink-0 grow h-full flex flex-row et-jb-ic et-gap-sm pl-1" };
const _hoisted_10 = {
  key: 0,
  class: "main-layout-header-center shrink-0 grow h-full flex flex-row et-js-ic"
};
const _hoisted_11 = {
  key: 1,
  class: "main-layout-header-right shrink-0 h-full flex flex-row et-js-ic et-gap-xs"
};
const _hoisted_12 = { class: "main-layout-progress-bar w-full" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", {
            class: normalizeClass(["main-layout-page relative shrink-0 w-full h-full pl-3 xs:pl-3 sm:pl-5 lg:pl-6 lg:pr-2 transition-all flex flex-col lg:flex lg:flex-row gap-x-4 sm:gap-x-6 et-max-width-global overflow-hidden", isDesktopMenuCollapsed.value ? "lg:gap-x-6" : "lg:gap-x-10"])
          }, [
            createBaseVNode("div", _hoisted_3$1, [
              createBaseVNode("main", _hoisted_4$1, [
                createBaseVNode("div", {
                  ref_key: "content",
                  ref: content,
                  class: normalizeClass(["pb-18 lg:pb-4 pt-16 sm:pt-24 pl-1 pr-1", hasFavoriteAccounts.value ? "mb-19" : ""])
                }, [
                  createBaseVNode("div", _hoisted_5$1, [
                    createBaseVNode("div", _hoisted_6, [
                      renderSlot(_ctx.$slots, "content", {}, void 0, true)
                    ])
                  ])
                ], 2)
              ])
            ])
          ], 2)
        ]),
        createBaseVNode("div", _hoisted_7, [
          createBaseVNode("header", _hoisted_8, [
            createBaseVNode("div", {
              class: normalizeClass(["main-layout-header-left flex flex-row et-jb-ic w-full et-header et-header-p gap-x-4 sm:gap-x-6 et-max-width-global", isDesktopMenuCollapsed.value ? "lg:gap-x-6" : "lg:gap-x-10"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["relative shrink-0 grow-0 flex flex-col et-jc-is lg:w-full lg:grow h-full transition-all", isDesktopMenuCollapsed.value ? "max-w-16" : "lg:et-max-width-menu"])
              }, [
                createVNode(_sfc_main$3, {
                  onClick: _cache[0] || (_cache[0] = ($event) => __props.logoFunc?.())
                })
              ], 2),
              createBaseVNode("div", _hoisted_9, [
                hasSlotHeaderCenter.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
                  renderSlot(_ctx.$slots, "header-center", {}, void 0, true)
                ])) : createCommentVNode("", true),
                hasSlotHeaderRight.value ? (openBlock(), createElementBlock("div", _hoisted_11, [
                  renderSlot(_ctx.$slots, "header-right", {}, void 0, true)
                ])) : createCommentVNode("", true)
              ])
            ], 2)
          ]),
          createBaseVNode("div", _hoisted_12, [
            renderSlot(_ctx.$slots, "progress-bar", {}, void 0, true)
          ])
        ])
      ]);
    };
  }
});

const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-6166ce63"]]);

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LayoutAppPermissions",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(MainLayout, null, {
        "header-center": withCtx(() => [..._cache[0] || (_cache[0] = [
          createBaseVNode("div", null, null, -1)
        ])]),
        "header-right": withCtx(() => [..._cache[1] || (_cache[1] = [])]),
        "progress-bar": withCtx(() => [
          createVNode(_sfc_main$4)
        ]),
        content: withCtx(() => [..._cache[2] || (_cache[2] = [])]),
        _: 1
      });
    };
  }
});

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
      initThemeComponentList,
      bgOverlay
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
    onMounted(() => {
      watch(getFixPermission(), (permission) => {
        if (permission === "none") {
          closePermissionUI();
        }
      });
    });
    const width = computed(() => {
      return "transition-all delay-75! " + (showNarrowTxViewer.value && !isTweeningOut.value ? "et-max-width-layout-show-narrow-tx" : showWideTxViewer.value && !isTweeningOut.value ? "et-max-width-layout-show-wide-tx" : "w-full");
    });
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
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-modal"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-dapp-store-iframe"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-dapp-store-sign"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-settings"
          }, null, 2),
          _cache[0] || (_cache[0] = createBaseVNode("div", {
            class: "absolute inset-0",
            id: "modal-tx-viewer-2"
          }, null, -1)),
          _cache[1] || (_cache[1] = createBaseVNode("div", {
            class: "absolute inset-0",
            id: "modal-setting-component"
          }, null, -1)),
          _cache[2] || (_cache[2] = createBaseVNode("div", {
            class: "absolute inset-0",
            id: "modal-import-address-book"
          }, null, -1)),
          _cache[3] || (_cache[3] = createBaseVNode("div", {
            class: "absolute inset-0",
            id: "modal-network-select"
          }, null, -1)),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-ms-discovery-viewer"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-add-addressbook"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-select-account"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-receive-address"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-add-assets"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-add-message"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-passwords"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-sign-tx"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-sign-data"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-sign-derivation"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-enable"
          }, null, 2),
          _cache[4] || (_cache[4] = createBaseVNode("div", {
            class: "absolute inset-0",
            id: "modal-tx-viewer"
          }, null, -1)),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-asset-details"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "scan-qr"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-image"
          }, null, 2)
        ]),
        createVNode(_sfc_main$5)
      ], 64);
    };
  }
});

export { _sfc_main as default };
