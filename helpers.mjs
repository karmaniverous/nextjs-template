import _ from 'lodash';
import dateformat from 'dateformat';
import Web3 from './web3/web3.mjs';

export const asyncFind = async (arr, predicates) => {
  if (!Array.isArray(arr)) arr = [arr];
  if (!Array.isArray(predicates)) predicates = [predicates];

  for (let e of arr) {
    let f = e;

    for (let p of predicates)
      try {
        f = await p(f);
        if (f) continue;
        else break;
      } catch {
        f = undefined;
        break;
      }

    if (f) return [e, f];
  }

  return [undefined, undefined];
};

// For now, just tests to validate that URL contains no replacement tokens.
export const testUrl = async (url) => !/{[^}]+}/.test(url);

// replacements is an array pf the form [[pattern <string|regex>, replacement <string|regex>], ... ]
export const chainReplace = (input, replacements) => {
  if (!replacements) return input;

  if (!Array.isArray(replacements))
    throw new Error(
      'replacements should be an array of arrays of the form [pattern <string|regex>, replacement <string|regex>]'
    );

  if (replacements.length > 0 && !Array.isArray(replacements[0]))
    replacements = [replacements];

  return replacements.reduce(
    (o, [pattern, replacement]) =>
      replacement ? o.replace(pattern, replacement) : o,
    input
  );
};

export const findFirstValidUrl = async (urls, tests, replacements) => {
  if (!urls) urls = [];
  if (!Array.isArray(urls)) urls = [urls];

  return (
    await asyncFind(
      urls.map((url) => chainReplace(url, replacements)),
      tests
    )
  )[0];
};

// callbacks is an array of arrays of the form [trigger <string>, callback <func>]
// callbacks will be invoked as input[invoker](...callbacks[0])[invoker](...callbacks[1])...
export const callbackChain = (input, invoker, callbacks = []) =>
  callbacks.reduce((r, c) => r[invoker](...c), input);

export const truncObj = (obj, length) => {
  const trunc = (o) => {
    if (typeof o === 'string' || o instanceof String)
      o = o.substring(0, length) + (o.length > length ? '...' : '');
    else if (typeof o === 'object' || Array.isArray(o))
      for (let p in o) o[p] = trunc(o[p]);

    return o;
  };

  return trunc(obj);
};

export const sendToParentProcess = (message) => {
  if (process.send) process.send(message);
  else if (message.log) console.log(message.log);
};

export const blockRefresh = (a, b, options = {}) => {
  const { path, log, refreshUndefined } = options;

  const aComp = path ? _.get(a, path) : a;
  const bComp = path ? _.get(b, path) : b;

  const result =
    (aComp !== undefined && bComp !== undefined && _.isEqual(aComp, bComp)) ||
    (aComp === undefined && bComp === undefined && !refreshUndefined);

  if (!result && log) console.log(log, { a: aComp, b: bComp });

  return result;
};

export const wei2str = (wei) =>
  _.isNil(wei) ? '' : Web3.utils.fromWei(wei.toString(), 'ether');

export const str2wei = (str) =>
  str ? BigInt(Web3.utils.toWei(str, 'ether')) : null;

export const timecode2str = (timecode, format) => {
  const str = _.isNil(timecode)
    ? ''
    : dateformat(new Date(timecode * 1000), format, true);
  // console.log('timecode2str:', timecode, '->', str);
  return str;
};
export const str2timecode = (str) => {
  const timecode = str
    ? Math.trunc(
        new Date(
          (/^\d{1,2}:\d{1,2}$/.test(str) ? '1970-01-01T' : '') + str + 'Z'
        ).getTime() / 1000
      )
    : null;
  // console.log('str2timecode:', str, '->', timecode);
  return timecode;
};
export const rate2pctstr = (rate, ratePrecision) =>
  _.isNil(rate) || _.isNil(ratePrecision)
    ? ''
    : ((rate / ratePrecision) * 100).toString();

export const pctstr2rate = (pctstr, ratePrecision) =>
  _.isNil(ratePrecision)
    ? null
    : Math.trunc((Number(pctstr) / 100) * ratePrecision);

export const num2str = (num) => num?.toString() ?? '';

export const str2num = (str) => Number(str);

export const hasAdminAccess = (permissions) => {
  const { isOwner, isAdmin, isParty, isInsider } = permissions ?? {};
  return isOwner || isAdmin || isParty || isInsider;
};
