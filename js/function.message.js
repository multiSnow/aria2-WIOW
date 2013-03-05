/*Project aria2-WIOW
 *
 * Copyright (c) 2012, multiSnow <infinity.blick.winkel@gmail.com>
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
//0 connect & sideinfo
//10 adduri
//11 addtorrent
//12 addmetalink
//19 default_option
//20 pause
//21 remove
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
    return 0;
};    

function receive_connect(input_data){
    var sideinfo,node;
    sideinfo=document.getElementById('sideinfo');
    document.title='aria2 WIOW '+input_data.result[0][0].version;
    sideinfo.innerHTML='Connected!'
    sideinfo.appendChild(document.createElement('br'));
    sideinfo.appendChild(document.createTextNode('aria2'));
    node=document.createElement('sup');
    node.appendChild(document.createTextNode(input_data.result[0][0].version));
    sideinfo.appendChild(node);
    sideinfo.appendChild(document.createElement('br'));
    sideinfo.appendChild(document.createTextNode(input_data.result[1][0].numActive+' Active'));
    sideinfo.appendChild(document.createElement('br'));
    sideinfo.appendChild(document.createTextNode(input_data.result[1][0].numStopped+' Stopped'));
    sideinfo.appendChild(document.createElement('br'));
    sideinfo.appendChild(document.createTextNode(input_data.result[1][0].numWaiting+' Waiting'));
    sideinfo.appendChild(document.createElement('br'));
    sideinfo.appendChild(document.createTextNode('D: spdb/s'.replace('spd',human_read(input_data.result[1][0].downloadSpeed))));
    sideinfo.appendChild(document.createElement('br'));
    sideinfo.appendChild(document.createTextNode('U: spdb/s'.replace('spd',human_read(input_data.result[1][0].uploadSpeed))));
    sideinfo.appendChild(document.createElement('br'));
    return 0;
};

function receive_active(input_data){
    var downloadSpeed,uploadSpeed,gid,completedLength,totalLength,connections,type_bittorrent=-1,infohash,name,color;
    var node,item_title,item_button,pause_icon,remove_icon,option_icon,item_summery,progress_bar;
    for(var i in input_data.result){
        node=document.createElement('div');
        node.id='active_'+String(i);
        node.className='item';
        document.getElementById('mainactive').appendChild(node);
    };

    for(var i in input_data.result){
        active_element=document.getElementById('active_'+String(i));
        downloadSpeed=input_data.result[i].downloadSpeed;
        uploadSpeed=input_data.result[i].uploadSpeed;
        gid=input_data.result[i].gid;
        completedLength=input_data.result[i].completedLength;
        totalLength=input_data.result[i].totalLength;
        connections=input_data.result[i].connections;
        if(input_data.result[i].bittorrent===undefined){
            type_bittorrent=0;
            name=input_data.result[i].files[0].path;
            color='#0080ff';
        }else if(input_data.result[i].bittorrent.info===undefined||input_data.result[i].bittorrent.info.name===undefined){
            type_bittorrent=2;
            name=input_data.result[i].files[0].path;
            color='#ffff00';
        }else{
            type_bittorrent=1;
            name=input_data.result[i].bittorrent.info.name;
            color='#40ff40';
        };
        infohash=(type_bittorrent==1)?input_data.result[i].infoHash:'';

        item_title=document.createElement('div');
        item_button=document.createElement('div');
        pause_icon=document.createElement('div');
        remove_icon=document.createElement('div');
        option_icon=document.createElement('div');
        item_summery=document.createElement('div');
        progress_bar=document.createElement('progress');

        item_title.className='item_title';
        item_title.style.color=color;
        item_title.appendChild(document.createTextNode(gid+' '+name));
        item_button.className='item_button';
        pause_icon.id='pause_icon';
        pause_icon.appendChild(document.createTextNode('pause'));
        pause_icon.setAttribute('onclick',"pause('gid')".replace('gid',gid));
        remove_icon.id='remove_icon';
        remove_icon.appendChild(document.createTextNode('remove'));
        remove_icon.setAttribute('onclick',"remove('gid')".replace('gid',gid));
        option_icon.id='option_icon'
        option_icon.appendChild(document.createTextNode('status&option'));
        option_icon.setAttribute('onclick',"showoption('"+gid+"',"+type_bittorrent+",10)");
        item_summery.className='item_summery';
        progress_bar.value=completedLength;
        progress_bar.max=totalLength;

        item_button.appendChild(pause_icon);
        item_button.appendChild(remove_icon);
        item_button.appendChild(option_icon);
        item_summery.appendChild(document.createTextNode(infohash));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(progress_bar);
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode((completedLength/totalLength*100).toFixed(2)+'% of '+human_read(totalLength)+'b'));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('D: spdb/s'.replace('spd',human_read(downloadSpeed))));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('U: spdb/s'.replace('spd',human_read(uploadSpeed))));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('ETA: '+spendtime(downloadSpeed,completedLength,totalLength)));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('download from num connection.'.replace('num',connections)));

        active_element.appendChild(item_title);
        active_element.appendChild(item_button);
        active_element.appendChild(item_summery);
    };
    return 0;
};

function receive_stopped(input_data){
    var gid,totalLength,name;
    var node,item_title,item_button,remove_icon,option_icon,item_summery,progress_bar,purge_button;
    var num=Number(input_data.result.length)-1;
    for(var i=0;i<=num;i++){
        node=document.createElement('div');
        node.id='stopped_'+String(i);
        node.className='item';
        document.getElementById('mainstopped').appendChild(node);
    };
    for(var i=0;i<=num;i++){
        gid=input_data.result[i].gid;
        completedLength=input_data.result[i].completedLength;
        totalLength=input_data.result[i].totalLength;
        name=input_data.result[i].files[0].path;

        item_title=document.createElement('div');
        item_button=document.createElement('div');
        remove_icon=document.createElement('div');
        option_icon=document.createElement('div');
        item_summery=document.createElement('div');
        progress_bar=document.createElement('progress');

        item_title.className='item_title';
        item_title.appendChild(document.createTextNode(gid+' '+name));
        item_button.className='item_button';
        remove_icon.id='remove_icon';
        remove_icon.appendChild(document.createTextNode('remove'));
        remove_icon.setAttribute('onclick',"remove('gid')".replace('gid',gid));
        option_icon.id='option_icon'
        option_icon.appendChild(document.createTextNode('status&option'));
        option_icon.setAttribute('onclick',"showoption('gid',0,20)".replace('gid',gid));
        item_summery.className='item_summery';
        progress_bar.value=completedLength;
        progress_bar.max=totalLength;

        item_button.appendChild(remove_icon);
        item_button.appendChild(option_icon);
        item_summery.appendChild(progress_bar);
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode((completedLength/totalLength*100).toFixed(2)+'% of '+human_read(totalLength)+'b'));

        document.getElementById('stopped_'+String(i)).appendChild(item_title);
        document.getElementById('stopped_'+String(i)).appendChild(item_button);
        document.getElementById('stopped_'+String(i)).appendChild(item_summery);
    };
    if(i>=1){
        purge_button=document.createElement('button');
        purge_button.type='button'
        purge_button.onclick=function(){purgestopped();};
        purge_button.appendChild(document.createTextNode('Purge Stopped'));
        document.getElementById('mainstopped').appendChild(purge_button);
    };
    return 0;
};

function receive_waiting(input_data){
    var downloadSpeed,uploadSpeed,gid,completedLength,totalLength,connections,type_bittorrent=-1,infohash,name,color;
    var node,item_title,item_button,unpause_icon,remove_icon,option_icon,item_summery,progress_bar;
    var num=Number(input_data.result.length)-1;
    for(var i=0;i<=num;i++){
        node=document.createElement('div');
        node.id='waiting_'+String(i);
        node.className='item';
        document.getElementById('mainwaiting').appendChild(node);
    };
    for(var i=0;i<=num;i++){
        downloadSpeed=input_data.result[i].downloadSpeed;
        uploadSpeed=input_data.result[i].uploadSpeed;
        gid=input_data.result[i].gid;
        completedLength=input_data.result[i].completedLength;
        totalLength=input_data.result[i].totalLength;
        connections=input_data.result[i].connections;
        if(input_data.result[i].bittorrent===undefined){
            type_bittorrent=0;
            name=input_data.result[i].files[0].path;
            color='#0080ff';
        }else if(input_data.result[i].bittorrent.info===undefined||input_data.result[i].bittorrent.info.name===undefined){
            type_bittorrent=2;
            name=input_data.result[i].files[0].path;
            color='#ffff00';
        }else{
            type_bittorrent=1;
            name=input_data.result[i].bittorrent.info.name;
            color='#40ff40';
        };
        infohash=(type_bittorrent==1)?input_data.result[i].infoHash:'';

        item_title=document.createElement('div');
        item_button=document.createElement('div');
        unpause_icon=document.createElement('div');
        remove_icon=document.createElement('div');
        option_icon=document.createElement('div');
        item_summery=document.createElement('div');
        progress_bar=document.createElement('progress');

        item_title.className='item_title';
        item_title.style.color=color;
        item_title.appendChild(document.createTextNode(gid+' '+name));
        item_button.className='item_button';
        unpause_icon.id='unpause_icon';
        unpause_icon.appendChild(document.createTextNode('unpause'));
        unpause_icon.setAttribute('onclick',"unpause('gid')".replace('gid',gid));
        remove_icon.id='remove_icon';
        remove_icon.appendChild(document.createTextNode('remove'));
        remove_icon.setAttribute('onclick',"remove('gid')".replace('gid',gid));
        option_icon.id='option_icon'
        option_icon.appendChild(document.createTextNode('status&option'));
        option_icon.setAttribute('onclick',"showoption('"+gid+"',"+type_bittorrent+"+,30)");
        item_summery.className='item_summery';
        progress_bar.value=completedLength;
        progress_bar.max=totalLength;

        item_button.appendChild(unpause_icon);
        item_button.appendChild(remove_icon);
        item_button.appendChild(option_icon);
        item_summery.appendChild(document.createTextNode(infohash));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(progress_bar);
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode((completedLength/totalLength*100).toFixed(2)+'% of '+human_read(totalLength)+'b'));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('D: spdb/s'.replace('spd',human_read(downloadSpeed))));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('U: spdb/s'.replace('spd',human_read(uploadSpeed))));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('ETA: '+spendtime(downloadSpeed,completedLength,totalLength)));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('download from num connection.'.replace('num',connections)));

        document.getElementById('waiting_'+String(i)).appendChild(item_title);
        document.getElementById('waiting_'+String(i)).appendChild(item_button);
        document.getElementById('waiting_'+String(i)).appendChild(item_summery);
    };
    return 0;
};

function receive_singleoption(input_data){
    var status_result=input_data.result[0][0],option_result=input_data.result[1][0],type=input_data.id;
    var completedLength,totalLength;
    var files,files_index_path,progress_bar,selected,size,selected;

    single_show_option(option_result)

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
        selected.appendChild(document.createTextNode('Selected: '+(status_result.files[i].selected==='true')?'Yes':'No'));
        files.appendChild(files_index_path);
        files.appendChild(progress_bar);
        files.appendChild(size);
        files.appendChild(selected);

        if(type==='33'){
            var download_from,files_uris
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
        selected.appendChild(document.createTextNode('Selected: '+(input_data.result.files[i].selected==='true')?'Yes':'No'));
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
    note.type=type_dict[input_data.method];
    if(note.type==255){
        note.data=JSON.stringify(input_data);
    }else{
        note.gid=input_data.params[0].gid;
    };
    notification(note);
    return 0;
};

var func={'0':receive_connect,
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

function message_process(){
    ws.onmessage=function(message){
        msg_data=JSON.parse(message.data)
        if(msg_data.id===undefined){
            if(func[msg_data.method]===undefined){
                ws_notify(255);
            }else{
                returncode=func[msg_data.method](msg_data);
            };
        }else{
            if(func[msg_data.id]===undefined){
                notification(msg_data);
            }else{
                returncode=func[msg_data.id](msg_data);
            };
        };
        return returncode;
    };
};
