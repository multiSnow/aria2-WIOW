/*Project aria2-WIOW
 *
 * Copyright (c) 2012, multiSnow <infinity.blick.winkel@gmail.com>
 *
 *Permission to use, copy, modify, and/or distribute this software for
 *any purpose with or without fee is hereby granted, provided that the
 *above copyright notice and this permission notice appear in all
 *copies.
 *
 *THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL
 *WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
 *WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
 *AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL
 *DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
 *PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
 *TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *PERFORMANCE OF THIS SOFTWARE.
 */
function connect(){
    document.getElementById('sideinfo').innerHTML='Connecting...<br/>';
    var url=(document.getElementById('wss_scheme').checked===true?'wss://':'ws://')
        +document.getElementById('wshost').value
        +':'+document.getElementById('wsport').value+'/jsonrpc';
    ws=new WebSocket(url);
    ws.onopen=function(){
        document.getElementById('sidetags').style.display='block';
        document.getElementById('shutdown_button').style.display='block';
        document.getElementById('main').style.display='block';
        //document.getElementById('add').style.display='block';
        topage('start');
        document.getElementById('disconnect').style.display='block';
        document.getElementById('ws_address').style.display='none';
        document.getElementById('connect').style.display='none';
        var  i=0,json=new Object(),methodName=new Array();
        json.jsonrpc='2.0';
        json.id='0';
        json.params=[[]];
        json.method='system.multicall';
        methodName[0]='aria2.getVersion';
        methodName[1]='aria2.getGlobalStat';
        while(i<=1)
        {
            json.params[0][i]={};
            json.params[0][i].methodName=methodName[i];
            i+=1;
        };
        //document.getElementById('send').innerHTML+=JSON.stringify(json)+'<br/>';
        ws.send(JSON.stringify(json));
	message_process();
	return 0;
    };
    return 0;
};
function disconnect(){
    ws.close();
    ws.onclose=function(){
        document.getElementById('sideinfo').innerHTML='Disconnected!';
        document.getElementById('sidetags').style.display='none';
        document.getElementById('main').style.display='none';
        document.getElementById('shutdown_button').style.display='none';
        document.getElementById('disconnect').style.display='none';
        document.getElementById('ws_address').style.display='block';
        document.getElementById('connect').style.display='block';
        document.title='aria2 WIOW';
    };
    return 0;
};
