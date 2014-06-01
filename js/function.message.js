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

function receive_common(input_data){
    return notification(input_data);
};

function receive_purgestopped(input_data){
    document.getElementById('mainstopped').innerHTML='';
    return 0;
};

function receive_version(input_data){
    var sideinfo=document.getElementById('sideinfo_static');
    var node=document.createElement('sup');
    sideinfo.textContent='Connected to '+ws.url.replace(/^wss?:\/\/(.*)\/jsonrpc$/,'$1');
    sideinfo.appendChild(document.createElement('br'));
    sideinfo.appendChild(document.createTextNode('aria2'));
    sideinfo.appendChild(node);
    node.textContent=input_data.result.version;
    return 0;
};

function receive_stat(input_data){
    var sideinfo=document.getElementById('sideinfo');
    var dspd=human_read(input_data.result.downloadSpeed)+'b/s';
    var uspd=human_read(input_data.result.uploadSpeed)+'b/s';
    document.title='⬇'+dspd+' ⬆'+uspd;
    sideinfo.setAttribute('numstopped',input_data.result.numStopped);
    sideinfo.setAttribute('numwaiting',input_data.result.numWaiting);
    document.getElementById('gloactive').innerHTML=input_data.result.numActive;
    document.getElementById('glostopped').innerHTML=input_data.result.numStopped;
    document.getElementById('glowaiting').innerHTML=input_data.result.numWaiting;
    document.getElementById('glodspd').innerHTML=dspd;
    document.getElementById('glouspd').innerHTML=uspd;
    return 0;
};

function receive_active(input_data){
    for(var i in input_data.result){
        var dict=new Object();
        dict['downloadSpeed']=input_data.result[i].downloadSpeed;
        dict['uploadSpeed']=input_data.result[i].uploadSpeed;
        dict['completedLength']=input_data.result[i].completedLength;
        dict['totalLength']=input_data.result[i].totalLength;
        dict['connections']=input_data.result[i].connections;
        if(input_data.result[i].bittorrent===undefined){
            dict['type_bittorrent']=0;
            dict['name']=input_data.result[i].files[0].path;
            dict['color']='#0080ff';
        }else if(input_data.result[i].bittorrent.info===undefined||input_data.result[i].bittorrent.info.name===undefined){
            dict['type_bittorrent']=2;
            dict['name']=input_data.result[i].files[0].path;
            dict['color']='#ffff00';
        }else{
            dict['type_bittorrent']=1;
            dict['name']=input_data.result[i].bittorrent.info.name;
            dict['color']='#40ff40';
        };
        dict['infohash']=(dict['type_bittorrent']==1)?input_data.result[i].infoHash:'';
        dict['i']=i;
        opr_active(input_data.result[i].gid,dict);
    };
    return 0;
};

function receive_stopped(input_data){
    for(var i in input_data.result){
        var dict=new Object();
        dict['completedLength']=input_data.result[i].completedLength;
        dict['totalLength']=input_data.result[i].totalLength;
        dict['name']=input_data.result[i].files[0].path;
        dict['i']=i;
        opr_stopped(input_data.result[i].gid,dict);
    };
    var purge_button=document.getElementById('purge_button');
    if(input_data.result&&input_data.result.length>0&&purge_button){
    }else if(input_data.result&&input_data.result.length>0){
        purge_button=document.createElement('button');
        purge_button.id='purge_button';
        purge_button.type='button';
        purge_button.setAttribute('onclick','purgestopped();');
        purge_button.appendChild(document.createTextNode('Purge Stopped'));
        document.getElementById('mainstopped').appendChild(purge_button);
    }else if(purge_button){
        purge_button.parentNode.removeChild(purge_button);
    };
    return 0;
};

function receive_waiting(input_data){
    for(var i in input_data.result){
        var dict=new Object();
        dict['downloadSpeed']=input_data.result[i].downloadSpeed;
        dict['uploadSpeed']=input_data.result[i].uploadSpeed;
        dict['completedLength']=input_data.result[i].completedLength;
        dict['totalLength']=input_data.result[i].totalLength;
        dict['connections']=input_data.result[i].connections;
        if(input_data.result[i].bittorrent===undefined){
            dict['type_bittorrent']=0;
            dict['name']=input_data.result[i].files[0].path;
            dict['color']='#0080ff';
        }else if(input_data.result[i].bittorrent.info===undefined||input_data.result[i].bittorrent.info.name===undefined){
            dict['type_bittorrent']=2;
            dict['name']=input_data.result[i].files[0].path;
            dict['color']='#ffff00';
        }else{
            dict['type_bittorrent']=1;
            dict['name']=input_data.result[i].bittorrent.info.name;
            dict['color']='#40ff40';
        };
        dict['infohash']=(dict['type_bittorrent']==1)?input_data.result[i].infoHash:'';
        dict['i']=i;
        opr_waiting(input_data.result[i].gid,dict);
    };
    return 0;
};

function receive_singlestat(input_data){
    var result=input_data.result,type=input_data.id.split('_')[1];
    document.getElementById('showoption_status_gid').innerHTML=result.gid;
    document.getElementById('showoption_status_dir').innerHTML=result.dir;
    document.getElementById('showoption_status_status').innerHTML=result.status;
    document.getElementById('showoption_status_progress').value=result.completedLength;
    document.getElementById('showoption_status_progress').max=result.totalLength;
    document.getElementById('showoption_status_completedlength').innerHTML=human_read(result.completedLength);
    document.getElementById('showoption_status_totallength').innerHTML=human_read(result.totalLength);
    document.getElementById('showoption_status_connections').innerHTML=result.connections;
    document.getElementById('showoption_statue_file').innerHTML='';
    document.getElementById('showoption_status_basic').style.display='block';
    document.getElementById('showoption_statue_file').style.display='block';

    for(var i in result.files){
        var files=document.createElement('div');
        var files_index_path=document.createElement('div');
        var progress_bar=document.createElement('progress');
        var selected=document.createElement('div');
        var completedLength=result.files[i].completedLength;
        var totalLength=result.files[i].length;
        var size=document.createTextNode((completedLength/totalLength*100).toFixed(2)+'%('+human_read(completedLength)+'b in '+human_read(totalLength)+'b)');

        files.className='files';
        files_index_path.className='files_index_path';
        files_index_path.appendChild(document.createTextNode(result.files[i].index+' '+result.files[i].path.replace(result.dir+'/','')))
        progress_bar.value=completedLength;
        progress_bar.max=totalLength;
        selected.style.color=(result.files[i].selected==='true')?'#40ff40':'#808080';

        selected.appendChild(document.createTextNode((result.files[i].selected==='true')?'selected':'unselected'));
        files.appendChild(files_index_path);
        files.appendChild(progress_bar);
        files.appendChild(size);
        files.appendChild(selected);

        if(type==='ahttp'){
            var download_from=document.createElement('div');
            var files_uris=document.createElement('blockquote');
            files_uris.className='files_uris'
            for(var j in result.files[i].uris){
                var files_uris_single=document.createElement('div');
                files_uris_single.style.color=(result.files[i].uris[i].status==='used')?'#40ff40':'#ffff00';
                files_uris_single.appendChild(document.createTextNode(result.files[i].uris[j].uri));
                files_uris.appendChild(files_uris_single);
            };
            download_from.appendChild(files_uris);
            files.appendChild(download_from);
        };
        document.getElementById('showoption_statue_file').appendChild(files);
    };

    if(type.substring(1)=='http'){
        document.getElementById('showoption_status_bittorrent').style.display='none';
    }else{
        document.getElementById('showoption_status_bittorrent').style.display='block';
        document.getElementById('showoption_statue_peers').style.display='block';
        document.getElementById('showoption_status_announcelist').innerHTML='';
        document.getElementById('showoption_statue_peers').innerHTML='';
        document.getElementById('showoption_status_infohash').innerHTML=result.infoHash;
        document.getElementById('showoption_status_numseeders').innerHTML=result.numSeeders;
        for(var i in result.bittorrent.announceList){
            for(var j in result.bittorrent.announceList[i]){
                var announceurl=document.createElement('div');
                announceurl.appendChild(document.createTextNode(result.bittorrent.announceList[i][j]));
                document.getElementById('showoption_status_announcelist').appendChild(announceurl);
            };
        };
    };
    return 0;
};

function receive_singleopt(input_data){
    single_show_option(input_data.result);
    document.getElementById('s_o_c').style.display='block';
    document.getElementById('showoption_option_basic').style.display='block';
    document.getElementById('showoption_option_all').style.display='block';
    if(input_data.id.split('_')[1].substring(1)=='http'){
        document.getElementById('showoption_option_bittorrent').style.display='none';
    }else{
        document.getElementById('showoption_option_bittorrent').style.display='block';
    };
    return 0;
};

function receive_singlepeer(input_data){
    var peer_result=input_data.result;
    for(var i in peer_result){
        var peer=document.createElement('div');
        var peer_id_addr=document.createElement('div');
        var peer_spd=document.createElement('div');

        peer.className='peer';
        peer_id_addr.className='peer_addr';
        peer_spd.className='peer_spd'
        peer_id_addr.style.color=(peer_result[i].seeder==='true')?'#40ff40':'#ffff00';
        peer_id_addr.appendChild(document.createTextNode(unescape(peer_result[i].peerId)));
        if(peer_result[i].ip.match(':')){
            peer_id_addr.appendChild(document.createTextNode(' from ['+peer_result[i].ip+']:'+peer_result[i].port));
        }else{
            peer_id_addr.appendChild(document.createTextNode(' from '+peer_result[i].ip+':'+peer_result[i].port));
        };
        peer_spd.appendChild(document.createTextNode('D: spdb/s'.replace('spd',human_read(peer_result[i].downloadSpeed))));
        peer_spd.appendChild(document.createElement('br'));
        peer_spd.appendChild(document.createTextNode('U: spdb/s'.replace('spd',human_read(peer_result[i].uploadSpeed))));

        peer.appendChild(peer_id_addr);
        peer.appendChild(peer_spd);

        if(peer_result[i].amChoking==='true'){
            var amChoking=document.createElement('div');
            amChoking.appendChild(document.createTextNode('amChoking'));
            peer.appendChild(amChoking);
        };
        if(peer_result[i].peerChoking==='true'){
            var peerChoking=document.createElement('div');
            peerChoking.appendChild(document.createTextNode('peerChoking'));
            peer.appendChild(peerChoking);
        };
        document.getElementById('showoption_statue_peers').appendChild(peer);
    };
    return 0;
};

function receive_globaloption(input_data){
    global_show_option(input_data.result);
    return 0;
};

function receive_defaultoption(input_data){
    add_show_option(input_data.result);
    return 0;
};

function receive_stoppedstatus(input_data){
    var completedLength,totalLength;
    var files,files_index_path,progress_bar,selected,size,selected,download_from,files_uris;

    document.getElementById('showoption_option_basic').style.display='none';
    document.getElementById('showoption_option_bittorrent').style.display='none';
    document.getElementById('showoption_option_all').style.display='none';
    document.getElementById('showoption_status_bittorrent').style.display='none';
    document.getElementById('s_o_c').style.display='none';
    document.getElementById('showoption_status_gid').innerHTML=input_data.result.gid;
    document.getElementById('showoption_status_dir').innerHTML=input_data.result.dir;
    document.getElementById('showoption_status_status').innerHTML=input_data.result.status;
    document.getElementById('showoption_status_progress').value=input_data.result.completedLength;
    document.getElementById('showoption_status_progress').max=input_data.result.totalLength;
    document.getElementById('showoption_status_completedlength').innerHTML=human_read(input_data.result.completedLength);
    document.getElementById('showoption_status_totallength').innerHTML=human_read(input_data.result.totalLength);
    document.getElementById('showoption_status_connections').innerHTML=input_data.result.connections;
    document.getElementById('showoption_statue_file').innerHTML='';

    for(var i in input_data.result.files){
        files=document.createElement('div');
        files_index_path=document.createElement('div');
        progress_bar=document.createElement('progress');
        selected=document.createElement('div');
        download_from=document.createElement('div');
        files_uris=document.createElement('blockquote');

        files.className='files';
        files_index_path.className='files_index_path';
        files_index_path.appendChild(document.createTextNode(input_data.result.files[i].index+' '+input_data.result.files[i].path.replace(input_data.result.dir+'/','')))
        completedLength=input_data.result.files[i].completedLength;
        totalLength=input_data.result.files[i].length;
        progress_bar.value=completedLength;
        progress_bar.max=totalLength;
        size=document.createTextNode((completedLength/totalLength*100).toFixed(2)+'%('+human_read(completedLength)+'b in '+human_read(totalLength)+'b)');
        selected.style.color=(input_data.result.files[i].selected==='true')?'#40ff40':'#808080';
        selected.appendChild(document.createTextNode((input_data.result.files[i].selected==='true')?'selected':'unselected'));
        files_uris.className='files_uris'
        for(var j in input_data.result.files[i].uris){
            var files_uris_single=document.createElement('div');
            files_uris_single.style.color=(input_data.result.files[i].uris[i].status==='used')?'#40ff40':'#ffff00';
            files_uris_single.appendChild(document.createTextNode(input_data.result.files[i].uris[j].uri));
            files_uris.appendChild(files_uris_single);
        };
        download_from.appendChild(files_uris);

        files.appendChild(files_index_path);
        files.appendChild(progress_bar);
        files.appendChild(size);
        files.appendChild(selected);
        files.appendChild(download_from);

        document.getElementById('showoption_statue_file').appendChild(files);
    };
    return 0;
};

function ws_notify(input_data){
    opr_pop(input_data.params[0].gid);
    return notification(input_data);
};

var func={'version':receive_version,
          'globalstat':receive_stat,
          'adduri':receive_common,
          'addtorrent':receive_common,
          'addmetalink':receive_common,
          'default_option':receive_defaultoption,
          'pause':receive_common,
          'remove_active':receive_common,
          'remove_stopped':receive_common,
          'unpause':receive_common,
          'shutdown':receive_common,
          'purgestopped':receive_purgestopped,
          'showactive':receive_active,
          'showstopped':receive_stopped,
          'showwaiting':receive_waiting,
          'showoption_stop':receive_stoppedstatus,
          'showoption_ahttp_stat':receive_singlestat,
          'showoption_abtml_stat':receive_singlestat,
          'showoption_whttp_stat':receive_singlestat,
          'showoption_wbtml_stat':receive_singlestat,
          'showoption_ahttp_opt':receive_singleopt,
          'showoption_abtml_opt':receive_singleopt,
          'showoption_whttp_opt':receive_singleopt,
          'showoption_wbtml_opt':receive_singleopt,
          'showoption_abtml_peer':receive_singlepeer,
          'globaloption':receive_globaloption,
          'change_global_option':receive_common,
          'change_single_option':receive_common,
          'aria2.onDownloadStart':ws_notify,
          'aria2.onDownloadPause':ws_notify,
          'aria2.onDownloadStop':ws_notify,
          'aria2.onDownloadComplete':ws_notify,
          'aria2.onDownloadError':ws_notify,
          'aria2.onBtDownloadComplete':ws_notify}
