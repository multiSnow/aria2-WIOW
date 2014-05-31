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

function getversion(){
    if(!document.getElementById('rpctoken').disabled){
        var json=new Object();
        json.jsonrpc='2.0';
        json.id='version';
        json.method='aria2.getVersion';
        sendmessage(json);
    };
    return 0;
};

function getstat(){
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='globalstat';
    json.method='aria2.getGlobalStat';
    sendmessage(json);
    return 0;
};

function default_option(){
    if(document.getElementById('add_with_option').checked){
        document.getElementById('add_option').style.display='inline';
        document.getElementById('addcache').innerHTML='{}';
        var json=new Object();
        json.jsonrpc='2.0';
        json.id='default_option';
        json.method='aria2.getGlobalOption';
        sendmessage(json);
    }else{
        document.getElementById('add_option').style.display='none';
        document.getElementById('addcache').innerHTML='';
    };
    return 0;
};

function showactive(){
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='showactive';
    json.method='aria2.tellActive';
    json.params=new Array(['gid','status','totalLength','completedLength','uploadLength',
                           'downloadSpeed','uploadSpeed','infoHash','numSeeders','pieceLength',
                           'numPieces','connections','errorCode','files','bittorrent']);
    sendmessage(json);
    return 0;
};

function showstopped(){
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='showstopped';
    json.method='aria2.tellStopped';
    json.params=new Array(0,parseInt(document.getElementById('sideinfo').getAttribute('numstopped')),
                          ['gid','status','totalLength','completedLength','uploadLength',
                           'downloadSpeed','uploadSpeed','infoHash','numSeeders','pieceLength',
                           'numPieces','connections','errorCode','files','bittorrent']);
    sendmessage(json);
    return 0;
};

function showwaiting(){
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='showwaiting';
    json.method='aria2.tellWaiting';
    json.params=new Array(0,parseInt(document.getElementById('sideinfo').getAttribute('numwaiting')),
                          ['gid','status','totalLength','completedLength','uploadLength',
                           'downloadSpeed','uploadSpeed','infoHash','numSeeders','pieceLength',
                           'numPieces','connections','errorCode','files','bittorrent']);
    sendmessage(json);
    return 0;
};

function globaloption(){
    document.getElementById('globalcache').innerHTML='';
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='globaloption';
    json.method='aria2.getGlobalOption';
    sendmessage(json);
    return 0;
};

function showoption(gid,type,status){
    document.getElementById('showoption').style.display='block';
    document.getElementById('singlecache').innerHTML='';
    var json=new Object(),methodName=new Array();
    json.jsonrpc='2.0';
    switch(type+status){
    case 10:
        json.id='showoption_ahttp';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.tellStatus';
        methodName[1]='aria2.getOption';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
            json.params[0][i].params=new Array(String(gid));
        };
        break;
    case 11:
        json.id='showoption_abtml';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.tellStatus';
        methodName[1]='aria2.getOption';
        methodName[2]='aria2.getPeers';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
            json.params[0][i].params=new Array(String(gid));
        };
        break;
    case 12:
        json.id='showoption_abtml';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.tellStatus';
        methodName[1]='aria2.getOption';
        methodName[2]='aria2.getPeers';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
            json.params[0][i].params=new Array(String(gid));
        };
        break;
    case 20:
        json.id='showoption_stop';
        json.method='aria2.tellStatus';
        json.params=new Array(String(gid));
        break;
    case 30:
        json.id='showoption_whttp';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.tellStatus';
        methodName[1]='aria2.getOption';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
            json.params[0][i].params=new Array(String(gid));
        };
        break;
    case 31:
        json.id='showoption_wbtml';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.tellStatus';
        methodName[1]='aria2.getOption';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
            json.params[0][i].params=new Array(String(gid));
        };
        break;
    case 32:
        json.id='showoption_wbtml';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.tellStatus';
        methodName[1]='aria2.getOption';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
            json.params[0][i].params=new Array(String(gid));
        };
        break;
    default:break;
    };
    sendmessage(json);
    return 0;
};

function hideoption(){
    document.getElementById('showoption').style.display='none';
    return 0;
};

function start_autorefresh(){
    var idfunc_dict={'mainactive':showactive,'mainstopped':showstopped,'mainwaiting':showwaiting};
    return setInterval(function(){
        getversion();getstat();
        if(document.getElementById('autorefresh').checked
           &&document.getElementById('sidetags').hasAttribute('crtshow')){
            if(document.getElementById('sidetags').getAttribute('crtshow') in idfunc_dict){
                idfunc_dict[document.getElementById('sidetags').getAttribute('crtshow')]();
            };
        };
    },500);
};
