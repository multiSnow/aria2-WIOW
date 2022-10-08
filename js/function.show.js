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
    return wsreq('version','aria2.getVersion');
};

function getstat(){
    return wsreq('globalstat','aria2.getGlobalStat');
};

function default_option(){
    if(document.getElementById('add_with_option').checked){
        document.getElementById('add_option').style.display='flex';
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
                 new Array(0,parseInt(getattr(document.getElementById('sideinfo'),'data-numstopped')),
                           ['gid','status','totalLength','completedLength','uploadLength',
                            'downloadSpeed','uploadSpeed','infoHash','numSeeders','pieceLength',
                            'numPieces','connections','errorCode','files','bittorrent']));
};

function showwaiting(){
    return wsreq('showwaiting','aria2.tellWaiting',
                 new Array(0,parseInt(getattr(document.getElementById('sideinfo'),'data-numwaiting')),
                           ['gid','status','totalLength','completedLength','uploadLength',
                            'downloadSpeed','uploadSpeed','infoHash','numSeeders','pieceLength',
                            'numPieces','connections','errorCode','files','bittorrent']))
};

function globaloption(){
    return wsreq('globaloption','aria2.getGlobalOption');
};

function showoption(gid){
    let artype=getattr(document.getElementById(gid),'data-artype');
    if(artype=='stop'){
        wsreq('showoption_stop','aria2.tellStatus',new Array(String(gid)));
    }else{
        wsreq('showoption_'+artype+'_stat','aria2.tellStatus',new Array(String(gid)));
        wsreq('showoption_'+artype+'_opt','aria2.getOption',new Array(String(gid)));
        if(artype=='abtml'){
            wsreq('showoption_'+artype+'_peer','aria2.getPeers',new Array(String(gid)));
        };
    };
    document.getElementById('showoption').style.display='block';
    document.getElementById('singlecache').innerHTML='';
    return 0;
};

function hideoption(){
    document.getElementById('showoption').style.display='none';
    return 0;
};

function start_autorefresh(){
    let idfunc_dict={'mainactive':showactive,'mainstopped':showstopped,'mainwaiting':showwaiting};
    return setInterval(function(){
        let showtagname=getattr(document.getElementById('sidetags'),'data-crtshow');
        getstat();
        if(document.getElementById('autorefresh').checked){
            if(showtagname in idfunc_dict){
                idfunc_dict[showtagname]();
            };
        };
    },500);
};
