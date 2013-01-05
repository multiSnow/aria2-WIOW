==========

aria2-WIOW

==========

Aria2 Web Interface Over WebSocket. All in html, css and javascript so it counld be used in local file system or visited from a HTTP(S) server (Use WebSocket Secure connection in HTTPS protocol, since a normal WebSocket connection in HTTPS is insecure).

Required:
* aria2 higher than 1.16.0, build with WebSocket support, running with `--enable-rpc=true` option. (See `man aria2c` for more infomation.)
* a web browser that support JavaScript, WebSocket, FileReader and some HTML5/CSS3 (the more, the better). (view testapi.html to test the browser.)


This project is mostly working now.


Tested browser:
* Firefox 14.0.1 on linux, amd64 (mostly working);
* Firefox latest trunk on WindowsXP SP3, i386 (mostly working);
* Chromium 22.0.1229.94 on linux, amd64 (mostly working, but need additional code for authentication);
* luakit 2012.03.25-156-g16063c5 on linux, amd64 (mostly working, but also need additional code for authentication);
* Opera Mobile 12.00.ADR-1207201848 on Android 2.3.7, armv6l (mostly ***NOT*** working, although it should. I've no idea about it.);

Please test aria2-WIOW on your browser, and tell me if it is working mostly, partly or totally not. But note that it's possible that your browser will never be supported, because I could not take too much compatibility into consideration.
