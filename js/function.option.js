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
//integer type
//1 boolean
//2 string
//3 number
//4 selection
//5 speed
//6 size
//9 special

g_option={"dir":2,//Basic
          "log":2,
          "max-concurrent-downloads":3,
          "check-integrity":1,
          "continue":1,
          "all-proxy":2,//HTTP(S)/FTP
          "all-proxy-user":2,
          "all-proxy-passwd":2,
          "connect-timeout":3,
          "dry-run":1,
          "lowest-speed-limit":5,
          "max-connection-per-server":3,
          "max-file-not-found":3,
          "max-tries":3,
          "min-split-size":6,
          "no-netrc":1,
          "no-proxy":2,
          "proxy-method":4,
          "remote-time":1,
          "reuse-uri":1,
          "retry-wait":3,
          "server-stat-of":2,
          "split":3,
          "stream-piece-selector":4,
          "timeout":3,
          "uri-selector":4,
          "http-accept-gzip":1,//HTTP(S)
          "http-auth-challenge":1,
          "http-no-cache":1,
          "http-user":2,
          "http-passwd":2,
          "http-proxy":2,
          "http-proxy-user":2,
          "http-proxy-passwd":2,
          "https-proxy":2,
          "https-proxy-user":2,
          "https-proxy-passwd":2,
          "referer":2,
          "enable-http-keep-alive":1,
          "enable-http-pipelining":1,
          "header":2,
          "save-cookies":2,
          "use-head":1,
          "user-agent":2,
          "ftp-user":2,//FTP
          "ftp-passwd":2,
          "ftp-pasv":1,
          "ftp-proxy":2,
          "ftp-proxy-user":2,
          "ftp-proxy-passwd":2,
          "ftp-type":4,
          "ftp-reuse-connection":1,
          "bt-enable-lpd":1,//BitTorrent
          "bt-exclude-tracker":2,
          "bt-external-ip":2,
          "bt-hash-check-seed":1,
          "bt-max-open-files":3,
          "bt-max-peers":3,
          "bt-metadata-only":1,
          "bt-min-crypto-level":4,
          "bt-prioritize-piece":9,
          "bt-remove-unselected-file":1,
          "bt-request-peer-speed-limit":5,
          "bt-require-crypto":1,
          "bt-save-metadata":1,
          "bt-seed-unverified":1,
          "bt-stop-timeout":3,
          "bt-tracker":2,
          "bt-tracker-connect-timeout":3,
          "bt-tracker-interval":3,
          "bt-tracker-timeout":3,
          "enable-peer-exchange":1,
          "follow-torrent":4,
          "max-overall-upload-limit":5,
          "max-upload-limit":5,
          "seed-ratio":3,
          "seed-time":3,
          "follow-metalink":4,//Metalink
          "metalink-base-uri":2,
          "metalink-language":2,
          "metalink-location":2,
          "metalink-os":2,
          "metalink-version":2,
          "metalink-preferred-protocol":4,
          "metalink-enable-unique-protocol":1,
          "allow-overwrite":1,//Advanced
          "allow-piece-length-change":1,
          "always-resume":1,
          "async-dns":1,
          "auto-file-renaming":1,
          "conditional-get":1,
          "enable-async-dns6":1,
          "enable-mmap":1,
          "file-allocation":4,
          "hash-check-only":1,
          "max-download-result":3,
          "max-resume-failure-tries":3,
          "log-level":4,
          "no-file-allocation-limit":6,
          "piece-length":2,
          "max-overall-download-limit":5,
          "max-download-limit":5,
          "parameterized-uri":1,
          "realtime-chunk-checksum":1,
          "remove-control-file":1,
          "save-session":2,
          "save-session-interval":3
         };
s_option={"dir":2,//Basic
          "check-integrity":1,
          "continue":1,
          "all-proxy":2,//HTTP(S)/FTP
          "all-proxy-user":2,
          "all-proxy-passwd":2,
          "checksum":9,
          "connect-timeout":3,
          "lowest-speed-limit":5,
          "max-connection-per-server":3,
          "max-file-not-found":3,
          "max-tries":3,
          "min-split-size":6,
          "no-netrc":1,
          "no-proxy":2,
          "out":2,
          "proxy-method":4,
          "remote-time":1,
          "reuse-uri":1,
          "retry-wait":3,
          "split":3,
          "stream-piece-selector":4,
          "timeout":3,
          "uri-selector":4,
          "http-accept-gzip":1,//HTTP(S)
          "http-auth-challenge":1,
          "http-no-cache":1,
          "http-user":2,
          "http-passwd":2,
          "http-proxy":2,
          "http-proxy-passwd":2,
          "http-proxy-user":2,
          "https-proxy":2,
          "https-proxy-passwd":2,
          "https-proxy-user":2,
          "referer":2,
          "enable-http-keep-alive":1,
          "enable-http-pipelining":1,
          "header":2,
          "use-head":1,
          "user-agent":2,
          "ftp-user":2,//FTP
          "ftp-passwd":2,
          "ftp-pasv":1,
          "ftp-proxy":2,
          "ftp-proxy-passwd":2,
          "ftp-proxy-user":2,
          "ftp-type":4,
          "ftp-reuse-connection":1,
          "select-file":9,//BitTorrent/Metalink
          "bt-enable-lpd":1,//BitTorrent
          "bt-exclude-tracker":2,
          "bt-external-ip":2,
          "bt-hash-check-seed":1,
          "bt-max-open-files":3,
          "bt-metadata-only":1,
          "bt-min-crypto-level":4,
          "bt-prioritize-piece":9,
          "bt-require-crypto":1,
          "bt-save-metadata":1,
          "bt-seed-unverified":1,
          "bt-stop-timeout":3,
          "bt-tracker":2,
          "bt-tracker-connect-timeout":3,
          "bt-tracker-interval":3,
          "bt-tracker-timeout":3,
          "enable-peer-exchange":1,
          "follow-torrent":4,
          "index-out":9,
          "seed-ratio":3,
          "seed-time":3,
          "follow-metalink":4,//Metalink
          "metalink-language":2,
          "metalink-location":2,
          "metalink-os":2,
          "metalink-version":2,
          "metalink-preferred-protocol":4,
          "metalink-enable-unique-protocol":1,
          "allow-overwrite":1,//Advanced
          "allow-piece-length-change":1,
          "always-resume":1,
          "async-dns":1,
          "auto-file-renaming":1,
          "conditional-get":1,
          "enable-async-dns6":1,
          "enable-mmap":1,
          "file-allocation":4,
          "hash-check-only":1,
          "max-resume-failure-tries":3,
          "no-file-allocation-limit":6,
          "realtime-chunk-checksum":1,
          "remove-control-file":1,
         };

sa_option_basic={"max-download-limit":5,
                 "max-upload-limit":5,
                };

sa_option_bittorrent={"bt-max-peers":3,
                      "bt-request-peer-speed-limit":5,
                      "bt-remove-unselected-file":1,
                     };

function change_global_option(){
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='41';
    json.method='aria2.changeGlobalOption';
    json.params=[];
    json.params[0]=JSON.parse(document.getElementById('globalcache').innerHTML);
    //document.getElementById('cgo_echo').innerHTML=JSON.stringify(json);
    ws.send(JSON.stringify(json));
    message_process();
    return 0;
};

function single_option_process(type,msg_result){
    var i,j,color,amChoking,peerChoking,completedLength,totalLength,selected,uris_all='',name=new String();
    document.getElementById('showoption_status_gid').innerHTML=msg_result[0][0].gid;
    document.getElementById('showoption_status_dir').innerHTML=msg_result[0][0].dir;
    document.getElementById('showoption_status_status').innerHTML=msg_result[0][0].status;
    document.getElementById('showoption_status_progress').value=msg_result[0][0].completedLength;
    document.getElementById('showoption_status_progress').max=msg_result[0][0].totalLength;
    document.getElementById('showoption_status_completedlength').innerHTML=human_read(msg_result[0][0].completedLength);
    document.getElementById('showoption_status_totallength').innerHTML=human_read(msg_result[0][0].totalLength);
    document.getElementById('showoption_status_connections').innerHTML=msg_result[0][0].connections;
    document.getElementById('showoption_statue_file').innerHTML='';
    for(i=0;i<=Number(msg_result[0][0].files.length)-1;i+=1){
        for(j=0;j<=Number(msg_result[0][0].files[i].uris.length)-1;j+=1){
            color=(msg_result[0][0].files[i].uris[i].status==='used')?'#40ff40':'#ffff00';
            uris_all+='<div style="color:'+color+'">'+msg_result[0][0].files[i].uris[i].uri+'</div><br/>';
        };
        completedLength=msg_result[0][0].files[i].completedLength;
        totalLength=msg_result[0][0].files[i].length;
        selected=(msg_result[0][0].files[i].selected==='true')?'Yes':'No';
        document.getElementById('showoption_statue_file').innerHTML
            +='<div class="files"><div class="files_index_path">'
            +msg_result[0][0].files[i].index+' '+msg_result[0][0].files[i].path.replace(msg_result[0][0].dir+'/','')
            +'</div><progress value="'+completedLength+'" max="'+totalLength+'"></progress>'
            +(completedLength/totalLength*100).toFixed(2)+'% of '+human_read(totalLength)+'b<br/>'
            +'<div class="selected">'+selected
            +'</div><div>Download from: <blockquote class="files_uris">'+uris_all+'</blockquote></div></div>';
    };

    for(name in sa_option_basic){
        //if(msg_result[2][0][name===undefined){continue;};
        switch(sa_option_basic[name]){
        case 1:
            document.getElementById('so_'+name).checked=(msg_result[1][0][name]=='true')?1:0;
            break;
        case 2:
            document.getElementById('so_'+name).defaultValue=(msg_result[1][0][name]===undefined)?'':msg_result[1][0][name];
            document.getElementById('so_'+name).value=(msg_result[1][0][name]===undefined)?'':msg_result[1][0][name];
            break;
        case 3:
            document.getElementById('so_'+name).defaultValue=msg_result[1][0][name];
            document.getElementById('so_'+name).value=msg_result[1][0][name];
            break;
        case 4:
            document.getElementById('so_'+name).defaultValue=msg_result[1][0][name];
            document.getElementById('so_'+name).value=msg_result[1][0][name];
            break;
        case 5:
            document.getElementById('so_'+name).defaultValue=human_read(msg_result[1][0][name]);
            document.getElementById('so_'+name).value=human_read(msg_result[1][0][name]);
            break;
        case 6:
            document.getElementById('so_'+name).defaultValue=human_read(msg_result[1][0][name]);
            document.getElementById('so_'+name).value=human_read(msg_result[1][0][name]);
            break;
        case 9:
            switch(name){
            case 'bt-prioritize-piece':
                document.getElementById('so_'+name).defaultValue=(msg_result[1][0][name]===undefined)?'head=0,tail=0':msg_result[1][0][name];
                document.getElementById('so_'+name).value=(msg_result[1][0][name]===undefined)?'head=0,tail=0':msg_result[1][0][name];
                break;
            default:
                document.getElementById('so_'+name).defaultValue=msg_result[1][0][name];
                document.getElementById('so_'+name).value=msg_result[1][0][name];
                break;
            };
            break;
        default:
            document.getElementById('showoption_option').innerHTML+=name+' is unrecognized option.<br/>';
            document.getElementById('showoption_option').innerHTML+=msg_result[1][0][name];
            break;
        };
    };

    for(name in sa_option_bittorrent){
        //if(msg_result[1][0][name]===undefined){continue;};
        switch(sa_option_bittorrent[name]){
        case 1:
            document.getElementById('so_'+name).checked=(msg_result[1][0][name]=='true')?1:0;
            break;
        case 2:
            document.getElementById('so_'+name).defaultValue=(msg_result[1][0][name]===undefined)?'':msg_result[1][0][name];
            document.getElementById('so_'+name).value=(msg_result[1][0][name]===undefined)?'':msg_result[1][0][name];
            break;
        case 3:
            document.getElementById('so_'+name).defaultValue=msg_result[1][0][name];
            document.getElementById('so_'+name).value=msg_result[1][0][name];
            break;
        case 4:
            document.getElementById('so_'+name).defaultValue=msg_result[1][0][name];
            document.getElementById('so_'+name).value=msg_result[1][0][name];
            break;
        case 5:
            document.getElementById('so_'+name).defaultValue=human_read(msg_result[1][0][name]);
            document.getElementById('so_'+name).value=human_read(msg_result[1][0][name]);
            break;
        case 6:
            document.getElementById('so_'+name).defaultValue=human_read(msg_result[1][0][name]);
            document.getElementById('so_'+name).value=human_read(msg_result[1][0][name]);
            break;
        case 9:
            switch(name){
            case 'bt-prioritize-piece':
                document.getElementById('so_'+name).defaultValue=(msg_result[1][0][name]===undefined)?'head=0,tail=0':msg_result[1][0][name];
                document.getElementById('so_'+name).value=(msg_result[1][0][name]===undefined)?'head=0,tail=0':msg_result[1][0][name];
                break;
            default:
                document.getElementById('so_'+name).defaultValue=msg_result[1][0][name];
                document.getElementById('so_'+name).value=msg_result[1][0][name];
                break;
            };
            break;
        default:
            document.getElementById('showoption_option').innerHTML+=name+' is unrecognized option.<br/>';
            document.getElementById('showoption_option').innerHTML+=msg_result[1][0][name];
            break;
        };
    };

    for(name in s_option){
        //if(msg_result[1][0][name]===undefined){continue;};
        switch(s_option[name]){
        case 1:
            document.getElementById('so_'+name).checked=(msg_result[1][0][name]=='true')?1:0;
            break;
        case 2:
            document.getElementById('so_'+name).defaultValue=(msg_result[1][0][name]===undefined)?'':msg_result[1][0][name];
            document.getElementById('so_'+name).value=(msg_result[1][0][name]===undefined)?'':msg_result[1][0][name];
            break;
        case 3:
            document.getElementById('so_'+name).defaultValue=msg_result[1][0][name];
            document.getElementById('so_'+name).value=msg_result[1][0][name];
            break;
        case 4:
            document.getElementById('so_'+name).defaultValue=msg_result[1][0][name];
            document.getElementById('so_'+name).value=msg_result[1][0][name];
            break;
        case 5:
            document.getElementById('so_'+name).defaultValue=human_read(msg_result[1][0][name]);
            document.getElementById('so_'+name).value=human_read(msg_result[1][0][name]);
            break;
        case 6:
            document.getElementById('so_'+name).defaultValue=human_read(msg_result[1][0][name]);
            document.getElementById('so_'+name).value=human_read(msg_result[1][0][name]);
            break;
        case 9:
            switch(name){
            case 'bt-prioritize-piece':
                document.getElementById('so_'+name).defaultValue=(msg_result[1][0][name]===undefined)?'head=0,tail=0':msg_result[1][0][name];
                document.getElementById('so_'+name).value=(msg_result[1][0][name]===undefined)?'head=0,tail=0':msg_result[1][0][name];
                break;
            default:
                document.getElementById('so_'+name).defaultValue=msg_result[1][0][name];
                document.getElementById('so_'+name).value=msg_result[1][0][name];
                break;
            };
            break;
        default:
            document.getElementById('showoption_option').innerHTML+=name+' is unrecognized option.<br/>';
            document.getElementById('showoption_option').innerHTML+=msg_result[1][0][name];
            break;
        };
    };

    document.getElementById('s_o_c').style.display='block';
    switch(type){
    case '33':
        document.getElementById('showoption_status_basic').style.display='block';
        document.getElementById('showoption_status_bittorrent').style.display='none';
        document.getElementById('showoption_statue_file').style.display='block';
        document.getElementById('showoption_option_basic').style.display='block';
        document.getElementById('showoption_option_bittorrent').style.display='none';
        document.getElementById('showoption_option_all').style.display='block';
        for(name in sa_option_bittorrent){
            document.getElementById('so_'+name).readOnly=true;
        };
        for(name in s_option){
            document.getElementById('so_'+name).readOnly=true;
        };
        return 0;
    case '34':
        document.getElementById('showoption_status_basic').style.display='block';
        document.getElementById('showoption_status_bittorrent').style.display='block';
        document.getElementById('showoption_statue_file').style.display='block';
        document.getElementById('showoption_statue_peers').style.display='block';
        document.getElementById('showoption_option_basic').style.display='block';
        document.getElementById('showoption_option_bittorrent').style.display='block';
        document.getElementById('showoption_option_all').style.display='block';
        document.getElementById('showoption_status_announcelist').innerHTML='';
        document.getElementById('showoption_statue_peers').innerHTML='';
        document.getElementById('showoption_status_infohash').innerHTML=msg_result[0][0].infoHash;
        document.getElementById('showoption_status_numseeders').innerHTML=msg_result[0][0].numSeeders;
        for(i=0;i<=Number(msg_result[0][0].bittorrent.announceList.length)-1;i+=1){
            for(j=0;j<=Number(msg_result[0][0].bittorrent.announceList[i].length)-1;j+=1){
                document.getElementById('showoption_status_announcelist').innerHTML+=msg_result[0][0].bittorrent.announceList[i][j]+'<br/>';
            };
        };
        for(i=0;i<=Number(msg_result[2][0].length)-1;i+=1){
            amChoking=(msg_result[2][0][i].amChoking==='true')?'<div>amChoking</div>':'';
            peerChoking=(msg_result[2][0][i].peerChoking==='true')?'<div>peerChoking</div>':'';
            color=(msg_result[2][0][i].seeder==='true')?'#40ff40':'#ffff00';
            document.getElementById('showoption_statue_peers').innerHTML
                +='<div class="peer"><div class="peer_addr" style="color:'+color+'">'+unescape(msg_result[2][0][i].peerId)
                +' ['+msg_result[2][0][i].ip+']:'+msg_result[2][0][i].port
                +amChoking+peerChoking+'</div><div class="peer_spd">'
                +'D: '+human_read(msg_result[2][0][i].downloadSpeed)+'b/s<br/>'
                +'U: '+human_read(msg_result[2][0][i].uploadSpeed)+'b/s<br/>'
                +'</div></div>';
        };
        for(name in s_option){
            document.getElementById('so_'+name).readOnly=true;
        };
        return 0;
    case '36':
        document.getElementById('showoption_status_basic').style.display='block';
        document.getElementById('showoption_status_bittorrent').style.display='none';
        document.getElementById('showoption_statue_file').style.display='block';
        document.getElementById('showoption_option_basic').style.display='block';
        document.getElementById('showoption_option_bittorrent').style.display='none';
        document.getElementById('showoption_option_all').style.display='block';
        return 0;
    case '37':
        document.getElementById('showoption_status_basic').style.display='block';
        document.getElementById('showoption_status_bittorrent').style.display='block';
        document.getElementById('showoption_statue_file').style.display='block';
        document.getElementById('showoption_statue_peers').style.display='block';
        document.getElementById('showoption_option_basic').style.display='block';
        document.getElementById('showoption_option_bittorrent').style.display='block';
        document.getElementById('showoption_option_all').style.display='block';
        document.getElementById('showoption_status_announcelist').innerHTML='';
        document.getElementById('showoption_statue_peers').innerHTML='';
        document.getElementById('showoption_status_infohash').innerHTML=msg_result[0][0].infoHash;
        document.getElementById('showoption_status_numseeders').innerHTML=msg_result[0][0].numSeeders;
        for(i=0;i<=Number(msg_result[0][0].bittorrent.announceList.length)-1;i+=1){
            for(j=0;j<=Number(msg_result[0][0].bittorrent.announceList[i].length)-1;j+=1){
                document.getElementById('showoption_status_announcelist').innerHTML+=msg_result[0][0].bittorrent.announceList[i][j]+'<br/>';
            };
        };
        return 0;
    default:
        document.getElementById('showoption_area').innerHTML=JSON.stringify(msg_result[0][0])+JSON.stringify(msg_result[1][0])+JSON.stringify(msg_result[2][0]);
        return 0;
    };
    return 0;
};

function single_option_cache(id,type){
    var json_option_cache=new Object();
    //document.getElementById('cso_echo').innerHTML=document.getElementById('s_option_changed').innerHTML;
    json_option_cache=(document.getElementById('s_option_changed').innerHTML=='')?JSON.parse('{}'):JSON.parse(document.getElementById('s_option_changed').innerHTML);
    var true_id=id.replace(/^so_/,'');
    switch(type){
    case 1:
        switch(sa_option_basic[true_id]){
        case 1:json_option_cache[true_id]=String(document.getElementById(id).checked);break;
        case 2:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 3:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 4:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 5:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 6:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 9:json_option_cache[true_id]=document.getElementById(id).value;break;
        default:break;
        };
        break;
    case 2:
        switch(sa_option_bittorrent[true_id]){
        case 1:json_option_cache[true_id]=String(document.getElementById(id).checked);break;
        case 2:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 3:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 4:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 5:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 6:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 9:json_option_cache[true_id]=document.getElementById(id).value;break;
        default:break;
        };
        break;
    case 3:
        switch(s_option[true_id]){
        case 1:json_option_cache[true_id]=String(document.getElementById(id).checked);break;
        case 2:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 3:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 4:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 5:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 6:json_option_cache[true_id]=document.getElementById(id).value;break;
        case 9:json_option_cache[true_id]=document.getElementById(id).value;break;
        default:break;
        };
        break;
    default:break;
    };
    document.getElementById('s_option_changed').innerHTML=JSON.stringify(json_option_cache);
    return 0;
};

function change_single_option(){
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='42';
    json.method='aria2.changeOption';
    json.params=[];
    json.params[0]=document.getElementById('showoption_status_gid').innerHTML;
    json.params[1]=JSON.parse(document.getElementById('s_option_changed').innerHTML);
    //document.getElementById('cso_echo').innerHTML=JSON.stringify(json);
    ws.send(JSON.stringify(json));
    message_process();
    return 0;
};
function stopped_status_process(msg_result){
    var i,j,color,amChoking,peerChoking,completedLength,totalLength,selected,uris_all='',name=new String();
    document.getElementById('showoption_option_basic').style.display='none';
    document.getElementById('showoption_option_bittorrent').style.display='none';
    document.getElementById('showoption_option_all').style.display='none';
    document.getElementById('showoption_status_bittorrent').style.display='none';
    document.getElementById('s_o_c').style.display='none';
    document.getElementById('showoption_status_gid').innerHTML=msg_result.gid;
    document.getElementById('showoption_status_dir').innerHTML=msg_result.dir;
    document.getElementById('showoption_status_status').innerHTML=msg_result.status;
    document.getElementById('showoption_status_progress').value=msg_result.completedLength;
    document.getElementById('showoption_status_progress').max=msg_result.totalLength;
    document.getElementById('showoption_status_completedlength').innerHTML=human_read(msg_result.completedLength);
    document.getElementById('showoption_status_totallength').innerHTML=human_read(msg_result.totalLength);
    document.getElementById('showoption_status_connections').innerHTML=msg_result.connections;
    document.getElementById('showoption_statue_file').innerHTML='';
    for(i=0;i<=Number(msg_result.files.length)-1;i+=1){
        for(j=0;j<=Number(msg_result.files[i].uris.length)-1;j+=1){
            color=(msg_result.files[i].uris[i].status==='used')?'#40ff40':'#ffff00';
            uris_all+='<div style="color:'+color+'">'+msg_result.files[i].uris[i].uri+'</div><br/>';
        };
        completedLength=msg_result.files[i].completedLength;
        totalLength=msg_result.files[i].length;
        selected=(msg_result.files[i].selected==='true')?'Yes':'No';
        document.getElementById('showoption_statue_file').innerHTML
            +='<div class="files"><div class="files_index_path">'
            +msg_result.files[i].index+' '+msg_result.files[i].path.replace(msg_result.dir+'/','')
            +'</div><progress value="'+completedLength+'" max="'+totalLength+'"></progress>'
            +(completedLength/totalLength*100).toFixed(2)+'% of '+human_read(totalLength)+'b<br/>'
            +'<div class="selected">'+selected
            +'</div><div>Download from: <blockquote class="files_uris">'+uris_all+'</blockquote></div></div>';
    };
    //document.getElementById('showoption_area').innerHTML=JSON.stringify(msg_result);
    return 0;
};
