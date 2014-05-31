/*Project aria2-WIOW
 *
 * Copyright (c) 2014, multiSnow <infinity.blick.winkel@gmail.com>
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
    var url=(document.getElementById('wss_scheme').checked===true?'wss://':'ws://')
        +document.getElementById('wshost').value
        +':'+document.getElementById('wsport').value+'/jsonrpc';
    ws=new WebSocket(url);
    ws.onerror=function(message){
        document.getElementById('rpctoken').disabled=false;
        alert('Failed to open '+ws.url)
        return 0;
    };

    ws.onclose=function(message){
        document.getElementById('sideinfo_static').innerHTML='Disconnected!';
        document.getElementById('sideinfo_dynamic').style.display='none';
        document.getElementById('sidetags').removeAttribute('crtshow');
        document.getElementById('sidetags').style.display='none';
        document.getElementById('main').style.display='none';
        document.getElementById('shutdown_button').style.display='none';
        document.getElementById('disconnect').style.display='none';
        document.getElementById('ws_address').style.display='block';
        document.getElementById('connect').style.display='block';
        document.title='aria2 WIOW';
        document.getElementById('rpctoken').disabled=false;
        clearInterval(autorefresh);
        if(message.code!==1005){
            alert(message.code+' '+message.reason+' '+message.wasClean);
        };
        return 0;
    };

    ws.onmessage=function(message){
        var idfunc_dict={'mainactive':showactive,'mainstopped':showstopped,'mainwaiting':showwaiting};
        var msg_data=JSON.parse(message.data);
        if('id' in msg_data){
            if('error' in msg_data){
                document.getElementById('rpctoken').disabled=false;
            }else{
                document.getElementById('rpctoken').disabled=true;
                try{
                    func[msg_data.id](msg_data);
                }catch(e){
                    console.log(msg_data.id);
                };
            };
        }else{
            if(msg_data.method in func){
                func[msg_data.method](msg_data);
                if(document.getElementById('sidetags').getAttribute('crtshow') in idfunc_dict){
                    idfunc_dict[document.getElementById('sidetags').getAttribute('crtshow')]();
                };
            };
        };
        return 0;
    };

    ws.onopen=function(message){
        document.getElementById('sideinfo_dynamic').style.display='inline';
        document.getElementById('sidetags').style.display='block';
        document.getElementById('shutdown_button').style.display='block';
        document.getElementById('main').style.display='block';
        getversion();topage('start');default_option();
        document.getElementById('disconnect').style.display='block';
        document.getElementById('ws_address').style.display='none';
        document.getElementById('connect').style.display='none';
        autorefresh=start_autorefresh()
	return 0;
    };
    return 0;
};

function disconnect(){
    ws.close();
    return 0;
};

function signtoken(json){
    if('params' in json){
        json.params.unshift('token:'+document.getElementById('rpctoken').value);
    }else{
        json.params=new Array('token:'+document.getElementById('rpctoken').value);
    };
};

function sendmessage(json){
    if(ws.readyState!==1){
        alert('Connection lost or not yet open!');
        return 1;
    };
    //for backword compatibility
    if(document.getElementById('rpctoken').value){
        if(json.method=='system.multicall'){
            for(var i in json.params[0]){
                signtoken(json.params[0][i])
            };
        }else{
            signtoken(json);
        };
    };
    ws.send(JSON.stringify(json));
    return 0;
};
