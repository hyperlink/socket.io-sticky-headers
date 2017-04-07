# socket.io-sticky-headers

Use custom header to maintain sticky sessions with socket.io

## Problem

For cluster of socket.io servers Socket.io connections made by the client requires a handshake process that involves sending several XHR requests. If any of those requests fail to connect to the same instance the handshake will fail and socket.io will be in a reconnect loop (failing with 401 errors).

Sticky sessions are need to successfully connect to a cluster of socket.io servers. Usually this can be managed with a Cookie. However browsers such as Safari has very strict third party cookie rules which could prevent this from working. An example could be a chat client placed on a customers site.

This module patches the engine.io XHR polling to capture a custom http header response of your choosing. Any future requests made will use the same http header. Future requests will update the header if that header ever changed.

## Install

```bash
npm install socket.io-sticky-headers --save
```

## Usage

### Socket.io

```javascript
require('socket.io-sticky-headers')(require('socket.io-client/node_modules/engine.io-client/lib/transports/polling-xhr'), 'My-Session-Id');
```

### Engine.io

```javascript
require('socket.io-sticky-headers')(require('engine.io-client/lib/transports/polling-xhr'), 'My-Session-Id');
```
