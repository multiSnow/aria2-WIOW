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
    var nsidetags=document.getElementById('sidetags');
    var nwsaddr=document.getElementById('ws_address');
    var nwshost=document.getElementById('wshost');
    var nwsport=document.getElementById('wsport');
    var nrpctoken=document.getElementById('rpctoken');

    var nsideinfodyn=document.getElementById('sideinfo_dynamic');
    var nmain=document.getElementById('main');

    var wss_scheme=document.getElementById('wss_scheme').checked===true?'wss://':'ws://';
    var url=[wss_scheme,nwshost.value,':',nwsport.value,'/jsonrpc'].join('');

    ws=new WebSocket(url);
    ws.onerror=function(message){
        alert('Failed to open '+ws.url)
        return 0;
    };

    ws.onclose=function(message){
        clearInterval(autorefresh);
        var idl=['mainactive','mainstopped','mainwaiting'];
        for(var n in idl){
            document.getElementById(idl[n]).innerHTML='';
        };
        nwshost.value=nwsaddr.getAttribute('data-wshost');
        nwsport.value=nwsaddr.getAttribute('data-wsport');
        nrpctoken.value=nwsaddr.getAttribute('data-rpctoken');
        nwsaddr.removeAttribute('data-wshost');
        nwsaddr.removeAttribute('data-wsport');
        nwsaddr.removeAttribute('data-rpctoken');
        nwshost.disabled=false;
        nwsport.disabled=false;
        nrpctoken.disabled=false;
        document.getElementById(nsidetags.getAttribute('crtshow')).style.display='none';
        document.getElementById(nsidetags.getAttribute('tagshow')).classList.remove('side_clicked');
        nsidetags.removeAttribute('crtshow');
        nsidetags.removeAttribute('tagshow');
        nsidetags.style.display='none';
        nmain.style.display='none';
        document.getElementById('sideinfo_static').innerHTML='Disconnected!';
        nsideinfodyn.style.display='none';
        document.getElementById('shutdown_button').style.display='none';
        document.getElementById('disconnect').style.display='none';
        nwsaddr.style.display='block';
        document.getElementById('connect').style.display='block';
        document.title='aria2 WIOW';
        if(message.code!==1005){
            alert(message.code+' '+message.reason+' '+message.wasClean);
        };
        return 0;
    };

    ws.onmessage=function(message){
        var idfunc_dict={'mainactive':showactive,'mainstopped':showstopped,'mainwaiting':showwaiting};
        var msg_data=JSON.parse(message.data);
        if('id' in msg_data){
            if(!('error' in msg_data)){
                try{
                    func[msg_data.id](msg_data);
                }catch(e){
                    console.log(msg_data.id);
                };
            };
        }else{
            if(msg_data.method in func){
                func[msg_data.method](msg_data);
                if(nsidetags.getAttribute('crtshow') in idfunc_dict){
                    idfunc_dict[nsidetags.getAttribute('crtshow')]();
                };
            };
        };
        return 0;
    };

    ws.onopen=function(message){
        nwshost.disabled=true;
        nwsport.disabled=true;
        nrpctoken.disabled=true;
        nwsaddr.setAttribute('data-wshost',nwshost.value);
        nwsaddr.setAttribute('data-wsport',nwsport.value);
        nwsaddr.setAttribute('data-rpctoken',nrpctoken.value);
        location.hash='',
        nsideinfodyn.style.display='inline';
        nsidetags.style.display='block';
        document.getElementById('shutdown_button').style.display='block';
        nmain.style.display='block';
        getversion();topage('start');default_option();
        document.getElementById('disconnect').style.display='block';
        nwsaddr.style.display='none';
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
    var rpctoken=document.getElementById('ws_address').getAttribute('data-rpctoken');
    if(rpctoken){
        json.params.unshift('token:'+rpctoken);
    };
    ws.send(JSON.stringify(json));
    return 0;
};
