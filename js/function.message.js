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
    let sideinfo=document.getElementById('sideinfo_static');
    let node1=document.createElement('div');
    let node2=document.createElement('div');
    let node3=document.createElement('div');
    let node4=document.createElement('sup');
    sideinfo.innerHTML='';
    node1.textContent='Connected';
    node2.textContent=ws.url.replace(/^wss?:\/\/(.*)\/jsonrpc$/,'$1');
    node3.textContent='aria2';
    node3.appendChild(node4);
    node4.textContent=input_data.result.version;
    sideinfo.appendChild(node1);
    sideinfo.appendChild(node2);
    sideinfo.appendChild(node3);
    return 0;
};

function receive_stat(input_data){
    let sideinfo=document.getElementById('sideinfo');
    let dspd=human_read(input_data.result.downloadSpeed)+'/s';
    let uspd=human_read(input_data.result.uploadSpeed)+'/s';
    document.title='⬇'+dspd+' ⬆'+uspd;
    setattr(sideinfo,'data-numstopped',input_data.result.numStopped);
    setattr(sideinfo,'data-numwaiting',input_data.result.numWaiting);
    document.getElementById('gloactive').innerHTML=input_data.result.numActive;
    document.getElementById('glostopped').innerHTML=input_data.result.numStopped;
    document.getElementById('glowaiting').innerHTML=input_data.result.numWaiting;
    document.getElementById('glodspd').innerHTML=dspd;
    document.getElementById('glouspd').innerHTML=uspd;
    return 0;
};

function receive_active(input_data){
    input_data.result.forEach(function(result,i){
        let dict=new Object();
        dict['downloadSpeed']=result.downloadSpeed;
        dict['uploadSpeed']=result.uploadSpeed;
        dict['completedLength']=result.completedLength;
        dict['totalLength']=result.totalLength;
        dict['connections']=result.connections;
        if(result.bittorrent===undefined){
            dict['type_bittorrent']=0;
            dict['name']=result.files[0].path;
            dict['color']='#0080ff';
        }else if(result.bittorrent.info===undefined||result.bittorrent.info.name===undefined){
            dict['type_bittorrent']=2;
            dict['name']=result.files[0].path;
            dict['color']='#ffff00';
        }else{
            dict['type_bittorrent']=1;
            dict['name']=result.bittorrent.info.name;
            dict['color']='#40ff40';
        };
        dict['infohash']=(dict['type_bittorrent']==1)?result.infoHash:'';
        dict['i']=i;
        opr_active(result.gid,dict);
    });
};

function receive_stopped(input_data){
    input_data.result.forEach(function(result,i){
        let dict=new Object();
        dict['completedLength']=result.completedLength;
        dict['totalLength']=result.totalLength;
        dict['name']=result.files[0].path;
        dict['i']=i;
        opr_stopped(result.gid,dict);
    });
    let purge_button=document.getElementById('purge_button');
    if(input_data.result&&input_data.result.length>0&&purge_button){
    }else if(input_data.result&&input_data.result.length>0){
        purge_button=document.createElement('button');
        purge_button.id='purge_button';
        purge_button.type='button';
        setattr(purge_button,'onclick','purgestopped();');
        purge_button.appendChild(document.createTextNode('Purge Stopped'));
        document.getElementById('mainstopped').appendChild(purge_button);
    }else if(purge_button){
        purge_button.parentNode.removeChild(purge_button);
    };
    return 0;
};

function receive_waiting(input_data){
    input_data.result.forEach(function(result,i){
        let dict=new Object();
        dict['downloadSpeed']=result.downloadSpeed;
        dict['uploadSpeed']=result.uploadSpeed;
        dict['completedLength']=result.completedLength;
        dict['totalLength']=result.totalLength;
        dict['connections']=result.connections;
        if(result.bittorrent===undefined){
            dict['type_bittorrent']=0;
            dict['name']=result.files[0].path;
            dict['color']='#0080ff';
        }else if(result.bittorrent.info===undefined||result.bittorrent.info.name===undefined){
            dict['type_bittorrent']=2;
            dict['name']=result.files[0].path;
            dict['color']='#ffff00';
        }else{
            dict['type_bittorrent']=1;
            dict['name']=result.bittorrent.info.name;
            dict['color']='#40ff40';
        };
        dict['infohash']=(dict['type_bittorrent']==1)?result.infoHash:'';
        dict['i']=i;
        opr_waiting(result.gid,dict);
    });
    return 0;
};

function receive_singlestat(input_data){
    let result=input_data.result;
    let type=input_data.id.split('_')[1];
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

    for(let file of result.files){
        let files=document.createElement('div');
        let files_index_path=document.createElement('div');
        let progress_bar=document.createElement('progress');
        let selected=document.createElement('div');
        let completedLength=file.completedLength;
        let totalLength=file.length;
        let size=document.createTextNode((completedLength/totalLength*100).toFixed(2)+'%('+human_read(completedLength)+'/'+human_read(totalLength)+')');

        files.className='files';
        files_index_path.className='files_index_path';
        files_index_path.appendChild(document.createTextNode(file.index+' '+file.path.replace(result.dir+'/','')))
        progress_bar.value=completedLength;
        progress_bar.max=totalLength;
        selected.style.color=(file.selected==='true')?'#40ff40':'#808080';

        selected.appendChild(document.createTextNode((file.selected==='true')?'selected':'unselected'));
        files.appendChild(files_index_path);
        files.appendChild(progress_bar);
        files.appendChild(size);
        files.appendChild(selected);

        if(type==='ahttp'){
            let download_from=document.createElement('div');
            let files_uris=document.createElement('blockquote');
            files_uris.className='files_uris'
            for(let uri of file.uris){
                let files_uris_single=document.createElement('div');
                files_uris_single.style.color=(uri.status==='used')?'#40ff40':'#ffff00';
                files_uris_single.appendChild(document.createTextNode(uri.uri));
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
        for(let anon of result.bittorrent.announceList){
            for(let url of anon){
                let announceurl=document.createElement('div');
                announceurl.appendChild(document.createTextNode(url));
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
    for(let result of input_data.result){
        let peer=document.createElement('div');
        let peer_id_addr=document.createElement('div');
        let peer_spd=document.createElement('div');
        let peer_addr=(result.ip.match(':')?' from [_]:':' from _:').replace('_',result.ip)+result.port;

        peer.className='peer';
        peer_id_addr.className='peer_addr';
        peer_spd.className='peer_spd'
        peer_id_addr.style.color=(result.seeder==='true')?'#40ff40':'#ffff00';
        peer_id_addr.appendChild(document.createTextNode(unescape(result.peerId)));
        peer_id_addr.appendChild(document.createTextNode(peer_addr));
        peer_spd.appendChild(document.createTextNode('D: '+human_read(result.downloadSpeed)+'/s'));
        peer_spd.appendChild(document.createElement('br'));
        peer_spd.appendChild(document.createTextNode('U: '+human_read(result.uploadSpeed)+'/s'));

        peer.appendChild(peer_id_addr);
        peer.appendChild(peer_spd);

        if(result.amChoking==='true'){
            let amChoking=document.createElement('div');
            amChoking.appendChild(document.createTextNode('amChoking'));
            peer.appendChild(amChoking);
        };
        if(result.peerChoking==='true'){
            let peerChoking=document.createElement('div');
            peerChoking.appendChild(document.createTextNode('peerChoking'));
            peer.appendChild(peerChoking);
        };
        let peers_node=document.getElementById('showoption_statue_peers');
        if(result.seeder==='true'){
            peers_node.insertBefore(peer,peers_node.firstElementChild);
        }else{
            peers_node.appendChild(peer);
        };
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

    for(let file of input_data.result.files){
        let files=document.createElement('div');
        let files_index_path=document.createElement('div');
        let progress_bar=document.createElement('progress');
        let selected=document.createElement('div');
        let download_from=document.createElement('div');
        let files_uris=document.createElement('blockquote');
        let completedLength=file.completedLength;
        let totalLength=file.length;
        let size=document.createTextNode((completedLength/totalLength*100).toFixed(2)+'%('+human_read(completedLength)+'/'+human_read(totalLength)+')');

        files.className='files';
        files_index_path.className='files_index_path';
        files_index_path.appendChild(document.createTextNode(file.index+' '+file.path.replace(input_data.result.dir+'/','')))
        progress_bar.value=completedLength;
        progress_bar.max=totalLength;
        selected.style.color=(file.selected==='true')?'#40ff40':'#808080';
        selected.appendChild(document.createTextNode((file.selected==='true')?'selected':'unselected'));
        files_uris.className='files_uris'
        for(let uri of file.uris){
            let files_uris_single=document.createElement('div');
            files_uris_single.style.color=(uri.status==='used')?'#40ff40':'#ffff00';
            files_uris_single.appendChild(document.createTextNode(uri.uri));
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
