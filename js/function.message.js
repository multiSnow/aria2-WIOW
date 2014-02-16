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
//id type
//0.1 version
//0.2 globalstat
//10 adduri
//11 addtorrent
//12 addmetalink
//19 default_option
//20 pause
//21 remove_active
//22 remove_stopped
//23 unpause
//24 shutdown
//25 purgestopped
//30 showactive
//31 showstopped
//32 showwaiting
//33 showoption (active http)
//34 showoption (active bittorrent/metalink)
//35 showoption (stopped)
//36 showoption (waiting http)
//37 showoption (waiting bittorrent/metalink)
//40 globaloption
//41 change_global_option
//42 change_single_option

function receive_common(input_data){
    var note=new Object();
    note.type=input_data.id;
    note.gid=input_data.result;
    note.data=input_data;
    notification(note);
    if(note.type==='25'){
        document.getElementById('mainstopped').innerHTML='';
    };
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

function receive_singleoption(input_data){
    var status_result=input_data.result[0][0],option_result=input_data.result[1][0],type=input_data.id;
    var completedLength,totalLength;
    var files,files_index_path,progress_bar,selected,size,selected;

    single_show_option(option_result);

    document.getElementById('showoption_status_gid').innerHTML=status_result.gid;
    document.getElementById('showoption_status_dir').innerHTML=status_result.dir;
    document.getElementById('showoption_status_status').innerHTML=status_result.status;
    document.getElementById('showoption_status_progress').value=status_result.completedLength;
    document.getElementById('showoption_status_progress').max=status_result.totalLength;
    document.getElementById('showoption_status_completedlength').innerHTML=human_read(status_result.completedLength);
    document.getElementById('showoption_status_totallength').innerHTML=human_read(status_result.totalLength);
    document.getElementById('showoption_status_connections').innerHTML=status_result.connections;
    document.getElementById('showoption_statue_file').innerHTML='';

    for(var i in status_result.files){
        files=document.createElement('div');
        files_index_path=document.createElement('div');
        progress_bar=document.createElement('progress');
        selected=document.createElement('div');

        files.className='files';
        files_index_path.className='files_index_path';
        files_index_path.appendChild(document.createTextNode(status_result.files[i].index+' '+status_result.files[i].path.replace(status_result.dir+'/','')))
        completedLength=status_result.files[i].completedLength;
        totalLength=status_result.files[i].length;
        progress_bar.value=completedLength;
        progress_bar.max=totalLength;
        size=document.createTextNode((completedLength/totalLength*100).toFixed(2)+'%('+human_read(completedLength)+'b in '+human_read(totalLength)+'b)');
        selected.style.color=(status_result.files[i].selected==='true')?'#40ff40':'#808080';
        selected.appendChild(document.createTextNode((status_result.files[i].selected==='true')?'selected':'unselected'));
        files.appendChild(files_index_path);
        files.appendChild(progress_bar);
        files.appendChild(size);
        files.appendChild(selected);

        if(type==='33'){
            var download_from,files_uris;
            download_from=document.createElement('div');
            files_uris=document.createElement('blockquote');
            files_uris.className='files_uris'
            for(var j in status_result.files[i].uris){
                var files_uris_single=document.createElement('div');
                files_uris_single.style.color=(status_result.files[i].uris[i].status==='used')?'#40ff40':'#ffff00';
                files_uris_single.appendChild(document.createTextNode(status_result.files[i].uris[j].uri));
                files_uris.appendChild(files_uris_single);
            };
            download_from.appendChild(files_uris);
            files.appendChild(download_from);
        };
        document.getElementById('showoption_statue_file').appendChild(files);
    };

    document.getElementById('s_o_c').style.display='block';
    document.getElementById('showoption_status_basic').style.display='block';
    document.getElementById('showoption_statue_file').style.display='block';
    document.getElementById('showoption_option_basic').style.display='block';
    document.getElementById('showoption_option_all').style.display='block';

    if(type==='33'||type==='36'){
        document.getElementById('showoption_status_bittorrent').style.display='none';
        document.getElementById('showoption_option_bittorrent').style.display='none';
        return 0;
    }else{
        document.getElementById('showoption_status_bittorrent').style.display='block';
        document.getElementById('showoption_statue_peers').style.display='block';
        document.getElementById('showoption_option_bittorrent').style.display='block';
        document.getElementById('showoption_status_announcelist').innerHTML='';
        document.getElementById('showoption_statue_peers').innerHTML='';
        document.getElementById('showoption_status_infohash').innerHTML=status_result.infoHash;
        document.getElementById('showoption_status_numseeders').innerHTML=status_result.numSeeders;

        for(var i in status_result.bittorrent.announceList){
            for(var j in status_result.bittorrent.announceList[i]){
                announceurl=document.createElement('div');
                announceurl.appendChild(document.createTextNode(status_result.bittorrent.announceList[i][j]));
                document.getElementById('showoption_status_announcelist').appendChild(announceurl);
            };
        };

        if(type==='34'){
            var peer_result=input_data.result[2][0];
            var peer,peer_id_addr,peer_spd;
            for(var i in peer_result){
                peer=document.createElement('div');
                peer_id_addr=document.createElement('div');
                peer_spd=document.createElement('div');

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
    };
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
    var note=new Object();
    var type_dict={'aria2.onDownloadStart':1,
                   'aria2.onDownloadPause':2,
                   'aria2.onDownloadStop':3,
                   'aria2.onDownloadComplete':4,
                   'aria2.onDownloadError':5,
                   'aria2.onBtDownloadComplete':6}
    if(input_data.method in type_dict){
        note.gid=input_data.params[0].gid;
        note.type=type_dict[input_data.method];
        opr_pop(note.gid);
    }else{
        note.data=JSON.stringify(input_data);
    };
    notification(note);
    return 0;
};

var func={'0.1':receive_version,
          '0.2':receive_stat,
          '10':receive_common,
          '11':receive_common,
          '12':receive_common,
          '19':receive_defaultoption,
          '20':receive_common,
          '21':receive_common,
          '22':receive_common,
          '23':receive_common,
          '24':receive_common,
          '25':receive_common,
          '30':receive_active,
          '31':receive_stopped,
          '32':receive_waiting,
          '33':receive_singleoption,
          '34':receive_singleoption,
          '35':receive_stoppedstatus,
          '36':receive_singleoption,
          '37':receive_singleoption,
          '40':receive_globaloption,
          '41':receive_common,
          '42':receive_common,
          'aria2.onDownloadStart':ws_notify,
          'aria2.onDownloadPause':ws_notify,
          'aria2.onDownloadStop':ws_notify,
          'aria2.onDownloadComplete':ws_notify,
          'aria2.onDownloadError':ws_notify,
          'aria2.onBtDownloadComplete':ws_notify}
