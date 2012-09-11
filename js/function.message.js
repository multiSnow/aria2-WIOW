//id type
//0 connect & sideinfo
//10 adduri
//11 addtorrent
//12 addmetalink
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
//36 showoption (waiting)
//40 globaloption
//41 change_global_option
//42 change_single_option

function message_process(){
    var i=0,num,downloadSpeed,uploadSpeed,gid,completedLength,totalLength,connections,type_bittorrent=-1,infohash,name,color,note={};
    ws.onmessage=function(message){
        msg_data=JSON.parse(message.data)
        switch(msg_data.id)
        {
        case '0':
            document.title='aria2 WIOW '+msg_data.result[0][0].version;
            document.getElementById('sideinfo').innerHTML
                ='Connected!<br/>aria2<sup>'+msg_data.result[0][0].version+'</sup><br/>'
                +msg_data.result[1][0].numActive+' Active<br/>'
                +msg_data.result[1][0].numStopped+' Stopped<br/>'
                +msg_data.result[1][0].numWaiting+' Waiting<br/>'
                +'D: '+human_read(msg_data.result[1][0].downloadSpeed)+'b<br/>'
                +'U: '+human_read(msg_data.result[1][0].uploadSpeed)+'b<br/>';
            return 0;
        case '10':
            note.type=10;
            note.gid=msg_data.result;
            notification(note);
            return 0;
        case '11':
            note.type=11;
            note.gid=msg_data.result;
            notification(note);
            return 0;
        case '12':
            note.type=12;
            note.gid=msg_data.result;
            notification(note);
            return 0;
        case '20':
            note.type=20;
            note.gid=msg_data.result;
            notification(note);
            return 0;
        case '21':
            note.type=21;
            note.gid=msg_data.result;
            notification(note);
            return 0;
        case '22':
            note.type=22;
            note.gid=msg_data.result;
            notification(note);
            return 0;
        case '23':
            note.type=23;
            note.gid=msg_data.result;
            notification(note);
            return 0;
        case '24':
            note.type=24;
            note.gid=msg_data.result;
            notification(note);
            return 0;
        case '25':
            note.type=25;
            note.gid=msg_data.result;
            notification(note);
            return 0;
        case '30':
            num=Number(msg_data.result.length)-1;
            while(i<=num)
            {
                downloadSpeed=msg_data.result[i].downloadSpeed;
                uploadSpeed=msg_data.result[i].uploadSpeed;
                gid=msg_data.result[i].gid;
                completedLength=msg_data.result[i].completedLength;
                totalLength=msg_data.result[i].totalLength;
                connections=msg_data.result[i].connections;
                if(msg_data.result[i].bittorrent===undefined)
                {
                    type_bittorrent=0;
                }
                else if(msg_data.result[i].bittorrent.info===undefined||msg_data.result[i].bittorrent.info.name===undefined)
                {
                    type_bittorrent=2;
                }
                else
                {
                    type_bittorrent=1;
                };
                infohash=(type_bittorrent==1)?msg_data.result[i].infoHash+'<br/>':'';
                switch(type_bittorrent)
                {
                case 2:
                    name=msg_data.result[i].files[0].path;
                    color='#ffff00';
                    break;
                case 1:
                    name=msg_data.result[i].bittorrent.info.name;
                    color='#40ff40';
                    break;
                case 0:
                    name=msg_data.result[i].files[0].path;
                    color='#0080ff';
                    break;
                default:
                    name='error';
                    color='#ff0000';
                    break;
                };
                document.getElementById('mainactive').innerHTML
                    +='<div class="item"><div class="item_title" style="color:'+color+'">'
                    +gid+' '+name
                    +'</div><div class="item_button"><div id="pause_icon" onclick="pause('+gid+');">pause</div>'
                    +'<div id="remove_icon" onclick="remove('+gid+');">remove</div>'
                    +'<div id="option_icon" onclick="showoption('+gid+','+type_bittorrent+',10);">status&option</div></div><div class="item_summery">'
                    +infohash
                    +'<progress value="'+completedLength+'" max="'+totalLength+'"></progress>'
                    +(completedLength/totalLength*100).toFixed(2)+'% of '+human_read(totalLength)+'b<br/>'
                    +'D: '+human_read(downloadSpeed)+'b/s<br/>'
                    +'U: '+human_read(uploadSpeed)+'b/s<br/>'
                    +'ETA: '+spendtime(downloadSpeed,completedLength,totalLength)+'<br/>'
                    +'download from '+connections+' connection.'+'<br/>'
                    +'</div></div><br/>';
                i+=1
            };
            return 0;
        case '31':
            num=Number(msg_data.result.length)-1;
            while(i<=num)
            {
                gid=msg_data.result[i].gid;
                completedLength=msg_data.result[i].completedLength;
                totalLength=msg_data.result[i].totalLength;
                name=msg_data.result[i].files[0].path;
                document.getElementById('mainstopped').innerHTML
                    +='<div class="item"><div class="item_title">'
                    +gid+' '+name
                    +'</div><div class="item_button"><div id="remove_icon" onclick="remove_stopped('+gid+');showstopped();">remove</div>'
                    +'<div id="option_icon" onclick="showoption('+gid+',0,20);">status</div></div><div class="item_summery">'
                    +'<progress value="'+completedLength+'" max="'+totalLength+'"></progress><br/>'
                    +(completedLength/totalLength*100).toFixed(2)+'% of '+human_read(totalLength)+'b<br/>'
                    +'</div></div><br/>';
                i+=1
            };
            if(i>=1)
            {
                document.getElementById('mainstopped').innerHTML+='<button type="button" onclick="purgestopped()">Purge Stopped</button>';
            };
            return 0;
        case '32':
            num=Number(msg_data.result.length)-1;
            while(i<=num)
            {
                downloadSpeed=msg_data.result[i].downloadSpeed;
                uploadSpeed=msg_data.result[i].uploadSpeed;
                gid=msg_data.result[i].gid;
                completedLength=msg_data.result[i].completedLength;
                totalLength=msg_data.result[i].totalLength;
                connections=msg_data.result[i].connections;
                if(msg_data.result[i].bittorrent===undefined)
                {
                    type_bittorrent=0;
                }
                else if(msg_data.result[i].bittorrent.info===undefined||msg_data.result[i].bittorrent.info.name===undefined)
                {
                    type_bittorrent=2;
                }
                else
                {
                    type_bittorrent=1;
                };
                infohash=(type_bittorrent==1)?msg_data.result[i].infoHash+'<br/>':'';
                switch(type_bittorrent)
                {
                case 2:
                    name=msg_data.result[i].files[0].path;
                    color='#ffff00';
                    break;
                case 1:
                    name=msg_data.result[i].bittorrent.info.name;
                    color='#40ff40';
                    break;
                case 0:
                    name=msg_data.result[i].files[0].path;
                    color='#0080ff';
                    break;
                default:
                    name='error';
                    color='#ff0000';
                    break;
                };
                document.getElementById('mainwaiting').innerHTML
                    +='<div class="item"><div class="item_title" style="color:'+color+'">'
                    +gid+' '+name
                    +'</div><div class="item_button"><div id="pause_icon" onclick="unpause('+gid+');">unpause</div>'
                    +'<div id="remove_icon" onclick="remove('+gid+');">remove</div>'
                    +'<div id="option_icon" onclick="showoption('+gid+','+type_bittorrent+',30);">status&option</div></div><div class="item_summery">'
                    +infohash
                    +'<progress value="'+completedLength+'" max="'+totalLength+'"></progress>'
                    +(completedLength/totalLength*100).toFixed(2)+'% of '+human_read(totalLength)+'b<br/>'
                    +'D: '+human_read(downloadSpeed)+'b/s<br/>'
                    +'U: '+human_read(uploadSpeed)+'b/s<br/>'
                    +'ETA: '+spendtime(downloadSpeed,completedLength,totalLength)+'<br/>'
                    +'download from '+connections+' connection.'+'<br/>'
                    +'</div></div><br/>';
                i+=1
            };
            return 0;
        case '33':
            single_option_process(33,msg_data.result);
            return 0;
        case '34':
            single_option_process(34,msg_data.result);
            return 0;
        case '35':
            stopped_status_process(msg_data.result);
            return 0;
        case '36':
            document.getElementById('showoption_area').innerHTML+=msg_data;
            return 0;
        case '40':
            global_option_process(msg_data.result);
            return 0;
        case '41':
            note.type=41;
            note.gid=msg_data.result;
            notification(note);
            return 0;
        case '42':
            note.type=42;
            note.gid=msg_data.result;
            notification(note);
            return 0;
        case undefined:
            switch(msg_data.method)
            {
            case 'aria2.onDownloadStart':
                note.type=1;
                note.gid=msg_data.params[0].gid;
                break;
            case 'aria2.onDownloadPause':
                note.type=2;
                note.gid=msg_data.params[0].gid;
                break;
            case 'aria2.onDownloadStop':
                note.type=3;
                note.gid=msg_data.params[0].gid;
                break;
            case 'aria2.onDownloadComplete':
                note.type=4;
                note.gid=msg_data.params[0].gid;
                break;
            case 'aria2.onDownloadError':
                note.type=5;
                note.gid=msg_data.params[0].gid;
                break;
            case 'aria2.onBtDownloadComplete':
                note.type=6;
                note.gid=msg_data.params[0].gid;
                break;
            default:
                note.type=-1;
                note.data=JSON.stringify(msg_data);
                break;
            };
            notification(note);
            return 0;
        default:
            notification(msg_data);
            return 0;
        };
    };
};
