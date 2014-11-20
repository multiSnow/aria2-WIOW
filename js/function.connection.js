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
        document.getElementById('rpctoken').style.display='inline';
        alert('Failed to open '+ws.url)
        return 0;
    };

    ws.onclose=function(message){
        clearInterval(autorefresh);
        var nsidetags=document.getElementById('sidetags');
        var nmain=document.getElementById('main')
        var idl=['mainactive','mainstopped','mainwaiting'];
        for(var n in idl){
            document.getElementById(idl[n]).innerHTML='';
        };
        document.getElementById(nsidetags.getAttribute('crtshow')).style.display='none';
        nsidetags.removeAttribute('crtshow');
        nsidetags.style.display='none';
        nmain.style.display='none';
        document.getElementById('sideinfo_static').innerHTML='Disconnected!';
        document.getElementById('sideinfo_dynamic').style.display='none';
        document.getElementById('shutdown_button').style.display='none';
        document.getElementById('disconnect').style.display='none';
        document.getElementById('ws_address').style.display='block';
        document.getElementById('connect').style.display='block';
        document.title='aria2 WIOW';
        document.getElementById('rpctoken').style.display='inline';
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
                document.getElementById('rpctoken').style.display='inline';
            }else{
                document.getElementById('rpctoken').style.display='none';
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

function wsreq(id,method,params){
    if(ws.readyState!==1){
        alert('Connection lost or not yet open!');
        return 1;
    };
    var json={jsonrpc:'2.0',
              id:id,
              method:method,
              params:(typeof params===typeof undefined)?[]:params};
    if(document.getElementById('rpctoken').value){
        json.params.unshift('token:'+document.getElementById('rpctoken').value);
    };
    ws.send(JSON.stringify(json));
    return 0;
};
