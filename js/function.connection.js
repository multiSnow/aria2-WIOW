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
        message_process();
        close_process();
        document.getElementById('sidetags').style.display='block';
        document.getElementById('shutdown_button').style.display='block';
        document.getElementById('main').style.display='block';
        topage('start');default_option();
        document.getElementById('disconnect').style.display='block';
        document.getElementById('ws_address').style.display='none';
        document.getElementById('connect').style.display='none';
        var json=new Object(),methodName=new Array();
        json.jsonrpc='2.0';
        json.id='0';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.getVersion';
        methodName[1]='aria2.getGlobalStat';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
        };
        sendmessage(json);
	return 0;
    };
    return 0;
};

function disconnect(){
    ws.close();
    return 0;
};

function sendmessage(json){
    if(ws.readyState!==1){
        alert('Connection lost or not yet open!');
        return 1;
    };
    ws.send(JSON.stringify(json));
    return 0;
};

function close_process(){
    ws.onclose=function(message){
        document.getElementById('sideinfo').innerHTML='Disconnected!';
        document.getElementById('sidetags').style.display='none';
        document.getElementById('main').style.display='none';
        document.getElementById('shutdown_button').style.display='none';
        document.getElementById('disconnect').style.display='none';
        document.getElementById('ws_address').style.display='block';
        document.getElementById('connect').style.display='block';
        document.title='aria2 WIOW';
        if(message.code!==1005){
            alert(message.code+' '+message.reason+' '+message.wasClean);
        };
        return 0;
    };
};
