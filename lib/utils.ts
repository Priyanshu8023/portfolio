// Auto-SRE Polyfill for AbortController
if (typeof AbortController === 'undefined') {
  try {
    const { AbortController: Polyfill } = require('abort-controller');
    global.AbortController = Polyfill;
  } catch (e) {
    console.warn('AbortController polyfill failed to load');
  }
}

// Created by AutoSRE
