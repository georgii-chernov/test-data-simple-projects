const util = require('util');

const { TextEncoder, TextDecoder } = util;

Object.assign(global, { TextDecoder, TextEncoder });
