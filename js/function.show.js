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
        return wsreq('version','aria2.getVersion');
    };
};

function getstat(){
    return wsreq('globalstat','aria2.getGlobalStat');
};

function default_option(){
    if(document.getElementById('add_with_option').checked){
        document.getElementById('add_option').style.display='inline';
        document.getElementById('addcache').innerHTML='{}';
        return wsreq('default_option','aria2.getGlobalOption');
    }else{
        document.getElementById('add_option').style.display='none';
        document.getElementById('addcache').innerHTML='';
    };
};

function showactive(){
    return wsreq('showactive','aria2.tellActive',
                 new Array(['gid','status','totalLength','completedLength','uploadLength',
                            'downloadSpeed','uploadSpeed','infoHash','numSeeders','pieceLength',
                            'numPieces','connections','errorCode','files','bittorrent']));
};

function showstopped(){
    return wsreq('showstopped','aria2.tellStopped',
                 new Array(0,parseInt(document.getElementById('sideinfo').getAttribute('numstopped')),
                           ['gid','status','totalLength','completedLength','uploadLength',
                            'downloadSpeed','uploadSpeed','infoHash','numSeeders','pieceLength',
                            'numPieces','connections','errorCode','files','bittorrent']));
};

function showwaiting(){
    return wsreq('showwaiting','aria2.tellWaiting',
                 new Array(0,parseInt(document.getElementById('sideinfo').getAttribute('numwaiting')),
                           ['gid','status','totalLength','completedLength','uploadLength',
                            'downloadSpeed','uploadSpeed','infoHash','numSeeders','pieceLength',
                            'numPieces','connections','errorCode','files','bittorrent']))
};

function globaloption(){
    return wsreq('globaloption','aria2.getGlobalOption');
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
