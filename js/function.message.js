/*Project aria2-WIOW
 *
 * Copyright (c) 2014 - 2022, multiSnow <https://github.com/multiSnow>
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
    clearnode(sideinfo);
    let node1=newtag('div',sideinfo);
    let node2=newtag('div',sideinfo);
    let node3=newtag('div',sideinfo);
    node1.textContent='Connected';
    node2.textContent=ws.url.replace(/^wss?:\/\/(.*)\/jsonrpc$/,'$1');
    node3.textContent='aria2';
    let node4=newtag('sup',node3);
    node4.textContent=input_data.result.version;
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
    let result=input_data.result;
    result.forEach(function(result,i){
        let dict=new Object();
        dict['completedLength']=result.completedLength;
        dict['totalLength']=result.totalLength;
        dict['name']=result.files[0].path;
        dict['i']=i;
        opr_stopped(result.gid,dict);
    });
    let purge_button=document.getElementById('purge_button');
    if(result&&result.length>0){
        if(!purge_button){
            purge_button=newtag('button',document.getElementById('mainstopped'));
            purge_button.id='purge_button';
            purge_button.type='button';
            setattr(purge_button,'onclick','purgestopped();');
            newtxt('Purge Stopped',purge_button);
        }
    }else if(purge_button){
        purge_button.remove();
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
    document.getElementById('showoption_status_completedlength').innerHTML=human_read(result.completedLength);
    document.getElementById('showoption_status_totallength').innerHTML=human_read(result.totalLength);
    document.getElementById('showoption_status_connections').innerHTML=result.connections;
    document.getElementById('showoption_status_basic').style.display='block';

    let progress=document.getElementById('showoption_status_progress');
    progress.value=result.completedLength;
    progress.max=result.totalLength;

    let file_node=document.getElementById('showoption_statue_file');
    clearnode(file_node);
    file_node.style.display='block';

    for(let file of result.files){
        let files=newtag('div',file_node);
        let files_index_path=newtag('div',files);
        let progress_bar=newtag('progress',files);
        let completedLength=file.completedLength;
        let totalLength=file.length;
        let size=newtxt(
            [`${(completedLength/totalLength*100).toFixed(2)}%`,
             `(${human_read(completedLength)}/${human_read(totalLength)})`].join(''),
            files
        );
        let selected=newtag('div',files);

        files.className='files';
        files_index_path.className='files_index_path';
        let path=file.path.replace(`${result.dir}/`,'');
        newtxt(`${file.index} ${path}`,files_index_path);
        progress_bar.value=completedLength;
        progress_bar.max=totalLength;
        selected.style.color=(file.selected==='true')?'#40ff40':'#808080';

        newtxt((file.selected==='true')?'selected':'unselected',selected);

        if(type==='ahttp'){
            let download_from=newtag('div',files);
            let files_uris=newtag('blockquote',download_from);
            files_uris.className='files_uris'
            for(let uri of file.uris){
                let files_uris_single=newtag('div',files_uris);
                files_uris_single.style.color=(uri.status==='used')?'#40ff40':'#ffff00';
                newtxt(uri.uri,files_uris_single);
            };
        };
    };

    if(type.substring(1)=='http'){
        document.getElementById('showoption_status_bittorrent').style.display='none';
    }else{
        document.getElementById('showoption_status_bittorrent').style.display='block';
        document.getElementById('showoption_statue_peers').style.display='block';
        document.getElementById('showoption_status_infohash').innerHTML=result.infoHash;
        document.getElementById('showoption_status_numseeders').innerHTML=result.numSeeders;
        let announcelist=document.getElementById('showoption_status_announcelist');
        clearnode(announcelist);
        clearnode(document.getElementById('showoption_statue_peers'));
        for(let anon of result.bittorrent.announceList){
            let announcegroup=newtag('div',announcelist);
            for(let url of anon){
                let announceurl=newtag('div',announcegroup);
                newtxt(url,announceurl);
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
    let peers_node=document.getElementById('showoption_statue_peers');
    for(let result of input_data.result){
        let peer=newtag('div');
        let peer_id_addr=newtag('div',peer);
        let peer_spd=newtag('div',peer);
        let ipaddr=result.ip.match(':')?`[${result.ip}]`:`${result.ip}`;
        let peer_addr=` from ${ipaddr}:${result.port}`;

        peer.className='peer';
        peer_id_addr.className='peer_addr';
        peer_spd.className='peer_spd';
        peer_id_addr.style.color=(result.seeder==='true')?'#40ff40':'#ffff00';
        newtxt(unescape(result.peerId),peer_id_addr);
        newtxt(peer_addr,peer_id_addr);
        newtxt(`D: ${human_read(result.downloadSpeed)}/s`,peer_spd);
        newtag('br',peer_spd);
        newtxt(`U: ${human_read(result.uploadSpeed)}/s`,peer_spd);

        if(result.amChoking==='true'){
            let amChoking=newtag('div',peer);
            newtxt('amChoking',amChoking);
        };
        if(result.peerChoking==='true'){
            let peerChoking=newtag('div',peer);
            newtxt('peerChoking',peerChoking);
        };
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
    let result=input_data.result;
    document.getElementById('showoption_option_basic').style.display='none';
    document.getElementById('showoption_option_bittorrent').style.display='none';
    document.getElementById('showoption_option_all').style.display='none';
    document.getElementById('showoption_status_bittorrent').style.display='none';
    document.getElementById('s_o_c').style.display='none';
    document.getElementById('showoption_status_gid').innerHTML=result.gid;
    document.getElementById('showoption_status_dir').innerHTML=result.dir;
    document.getElementById('showoption_status_status').innerHTML=result.status;
    document.getElementById('showoption_status_completedlength').innerHTML=human_read(result.completedLength);
    document.getElementById('showoption_status_totallength').innerHTML=human_read(result.totalLength);
    document.getElementById('showoption_status_connections').innerHTML=result.connections;

    let progress=document.getElementById('showoption_status_progress');
    progress.value=result.completedLength;
    progress.max=result.totalLength;

    let file_node=document.getElementById('showoption_statue_file');
    clearnode(file_node);

    for(let file of result.files){
        let files=newtag('div',file_node);
        let files_index_path=newtag('div',files);
        let progress_bar=newtag('progress',files);
        let completedLength=file.completedLength;
        let totalLength=file.length;
        let size=newtxt(
            [`${(completedLength/totalLength*100).toFixed(2)}%`,
             `(${human_read(completedLength)}/${human_read(totalLength)})`].join(''),
            files
        );
        let selected=newtag('div',files);
        let download_from=newtag('div',files);
        let files_uris=newtag('blockquote',download_from);

        files.className='files';
        files_index_path.className='files_index_path';
        let path=file.path.replace(`${result.dir}/`,'');
        newtxt(`${file.index} ${path}`,files_index_path);
        progress_bar.value=completedLength;
        progress_bar.max=totalLength;
        selected.style.color=(file.selected==='true')?'#40ff40':'#808080';
        newtxt((file.selected==='true')?'selected':'unselected',selected);
        files_uris.className='files_uris'
        for(let uri of file.uris){
            let files_uris_single=newtag('div',files_uris);
            files_uris_single.style.color=(uri.status==='used')?'#40ff40':'#ffff00';
            newtxt(uri.uri,files_uris_single);
        };
    };
    return 0;
};

function ws_notify(input_data){
    opr_pop(input_data.params[0].gid);
    return notification(input_data);
};

var func={
    'version':receive_version,
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
    'aria2.onBtDownloadComplete':ws_notify
}
