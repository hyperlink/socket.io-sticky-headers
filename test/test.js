/* eslint-env node, mocha */

'use strict'

const stickyHeaders = require('../')
const assert = require('assert')

describe('sticky-headers', function () {
  describe('verify patching', function () {
    it('should throw exception if passing in undefined XHR polling', function () {
      assert.throws(function () {
        stickyHeaders()
      }, Error)
    })

    it('should throw exception if passing in null XHR polling', function () {
      assert.throws(function () {
        stickyHeaders(null)
      }, Error)
    })

    it('should throw exception if missing prototype methods to patch', function () {
      assert.throws(function () {
        stickyHeaders(function () {})
      }, Error)
    })
  })
})
