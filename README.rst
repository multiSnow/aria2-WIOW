==========
aria2-WIOW
==========
Aria2 Web Interface Over WebSocket. All in html, css and javascript so it counld be used in local file system or visited from a HTTP(S) server (Use WebSocket Secure connection in HTTPS protocol, since a normal WebSocket connection in HTTPS is insecure).

Required:

- aria2 higher than 1.16.0, build with WebSocket support, running with `--enable-rpc=true` option. (See `man aria2c` for more infomation.)

  (Note: `RPC authorization secret token` support is incompleted, and only working with aria2 git verion after `855dfa0e2f`_)
- a web browser that support JavaScript, WebSocket, FileReader and some HTML5/CSS3 (the more, the better). (view testapi.html to test the browser.)

This project is mostly working now.

Tested browser:

- Firefox 18.0.2 on linux, amd64 (mostly working);
- Chromium 25.0.1364.152 on linux, amd64 (mostly working, does not handle authentication, see `issue 123862 of chromium project in GoogleCode`_ );

Please test aria2-WIOW on your browser, and tell me if it is working mostly, partly or totally not. But note that it's possible that your browser will never be supported, because I could not take too much compatibility into consideration.

.. _issue 123862 of chromium project in GoogleCode: https://code.google.com/p/chromium/issues/detail?id=123862
.. _855dfa0e2f: https://github.com/tatsuhiro-t/aria2/commit/855dfa0e2f8ca7869d28d2afc21fed2e3790549a
