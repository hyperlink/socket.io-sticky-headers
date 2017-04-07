'use strict'

const debug = require('debug')('engine.io-sticky-headers')

let initialized = false

function initialize (XHR, stickyHeader) {
  if (initialized) return

  if (stickyHeader == null) {
    stickyHeader = 'Session-Id'
  }

  if (XHR == null || typeof XHR !== 'function') {
    throw new Error('Please provide XHR function constructor ie require("engine.io-client/lib/transports/polling-xhr"')
  }

  const Request = XHR.Request

  const originalXHRRequest = XHR.prototype.request
  if (originalXHRRequest == null) {
    throw new Error('XHR.prototype.request is not set')
  }

  const originalOnLoad = Request.prototype.onLoad

  if (originalOnLoad == null) {
    throw new Error('Request.prototype.onLoad is not set')
  }

  Request.prototype.onLoad = function () {
    this.emit('onLoad')
    originalOnLoad.call(this)
  }

  XHR.prototype.request = function (opts) {
    let request = originalXHRRequest.call(this, opts)
    request.once('onLoad', createStickyUpdater(this))
    return request
  }

  // Update sticky header after every successful request
  function createStickyUpdater (xhr) {
    return function updateSticky () {
      let newStickyValue = this.xhr.getResponseHeader(stickyHeader)
      if (newStickyValue != null) {
        debug('setting header %s to %s', stickyHeader, newStickyValue)
        if (xhr.extraHeaders == null) {
          xhr.extraHeaders = {}
        }
        xhr.extraHeaders[stickyHeader] = newStickyValue
      }
    }
  }

  initialized = true
}

module.exports = initialize
