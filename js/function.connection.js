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
    ws.onerror=function(message){
        alert('Failed to open '+ws.url)
        return 0;
    };

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

    ws.onmessage=function(message){
        msg_data=JSON.parse(message.data)
        if(msg_data.id===undefined){
            if(func[msg_data.method]===undefined){
                ws_notify(255);
            }else{
                returncode=func[msg_data.method](msg_data);
            };
        }else{
            if(func[msg_data.id]===undefined){
                notification(msg_data);
            }else{
                returncode=func[msg_data.id](msg_data);
            };
        };
        return returncode;
    };

    ws.onopen=function(message){
        document.getElementById('sidetags').style.display='block';
        document.getElementById('shutdown_button').style.display='block';
        document.getElementById('main').style.display='block';
        topage('start');default_option();
        document.getElementById('disconnect').style.display='block';
        document.getElementById('ws_address').style.display='none';
        document.getElementById('connect').style.display='none';
        var autorefrehs_sideinfo=setInterval(function(){sideinfo()},500);
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
