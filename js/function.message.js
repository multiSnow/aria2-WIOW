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
    document.title='aria2 WIOW '+input_data.result[0][0].version;
    document.getElementById('sideinfo').innerHTML
        ='Connected!<br/>aria2<sup>'+input_data.result[0][0].version+'</sup><br/>'
        +input_data.result[1][0].numActive+' Active<br/>'
        +input_data.result[1][0].numStopped+' Stopped<br/>'
        +input_data.result[1][0].numWaiting+' Waiting<br/>'
        +'D: '+human_read(input_data.result[1][0].downloadSpeed)+'b<br/>'
        +'U: '+human_read(input_data.result[1][0].uploadSpeed)+'b<br/>';
    return 0;
};

function receive_active(input_data){
    var i=0,num,downloadSpeed,uploadSpeed,gid,completedLength,totalLength,connections,type_bittorrent=-1,infohash,name,color;
    num=Number(input_data.result.length)-1;
    while(i<=num)
    {
        downloadSpeed=input_data.result[i].downloadSpeed;
        uploadSpeed=input_data.result[i].uploadSpeed;
        gid=input_data.result[i].gid;
        completedLength=input_data.result[i].completedLength;
        totalLength=input_data.result[i].totalLength;
        connections=input_data.result[i].connections;
        if(input_data.result[i].bittorrent===undefined)
        {
            type_bittorrent=0;
        }
        else if(input_data.result[i].bittorrent.info===undefined||input_data.result[i].bittorrent.info.name===undefined)
        {
            type_bittorrent=2;
        }
        else
        {
            type_bittorrent=1;
        };
        infohash=(type_bittorrent==1)?input_data.result[i].infoHash+'<br/>':'';
        switch(type_bittorrent)
        {
        case 2:
            name=input_data.result[i].files[0].path;
            color='#ffff00';
            break;
        case 1:
            name=input_data.result[i].bittorrent.info.name;
            color='#40ff40';
            break;
        case 0:
            name=input_data.result[i].files[0].path;
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
            +'</div><div class="item_button"><div id="pause_icon" onclick="pause(\''+gid+'\');">pause</div>'
            +'<div id="remove_icon" onclick="remove(\''+gid+'\');">remove</div>'
            +'<div id="option_icon" onclick="showoption(\''+gid+'\','+type_bittorrent+',10);">status&option</div></div><div class="item_summery">'
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
};

function receive_stopped(input_data){
    var i=0,num,gid,totalLength,name;
    num=Number(input_data.result.length)-1;
    while(i<=num)
    {
        gid=input_data.result[i].gid;
        completedLength=input_data.result[i].completedLength;
        totalLength=input_data.result[i].totalLength;
        name=input_data.result[i].files[0].path;
        document.getElementById('mainstopped').innerHTML
            +='<div class="item"><div class="item_title">'
            +gid+' '+name
            +'</div><div class="item_button"><div id="remove_icon" onclick="remove_stopped(\''+gid+'\');showstopped();">remove</div>'
            +'<div id="option_icon" onclick="showoption(\''+gid+'\',0,20);">status</div></div><div class="item_summery">'
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
};

function receive_waiting(input_data){
    var i=0,num,downloadSpeed,uploadSpeed,gid,completedLength,totalLength,connections,type_bittorrent=-1,infohash,name,color;
    num=Number(input_data.result.length)-1;
    while(i<=num)
    {
        downloadSpeed=input_data.result[i].downloadSpeed;
        uploadSpeed=input_data.result[i].uploadSpeed;
        gid=input_data.result[i].gid;
        completedLength=input_data.result[i].completedLength;
        totalLength=input_data.result[i].totalLength;
        connections=input_data.result[i].connections;
        if(input_data.result[i].bittorrent===undefined)
        {
            type_bittorrent=0;
        }
        else if(input_data.result[i].bittorrent.info===undefined||input_data.result[i].bittorrent.info.name===undefined)
        {
            type_bittorrent=2;
        }
        else
        {
            type_bittorrent=1;
        };
        infohash=(type_bittorrent==1)?input_data.result[i].infoHash+'<br/>':'';
        switch(type_bittorrent)
        {
        case 2:
            name=input_data.result[i].files[0].path;
            color='#ffff00';
            break;
        case 1:
            name=input_data.result[i].bittorrent.info.name;
            color='#40ff40';
            break;
        case 0:
            name=input_data.result[i].files[0].path;
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
            +'</div><div class="item_button"><div id="pause_icon" onclick="unpause(\''+gid+'\');">unpause</div>'
            +'<div id="remove_icon" onclick="remove(\''+gid+'\');">remove</div>'
            +'<div id="option_icon" onclick="showoption(\''+gid+'\','+type_bittorrent+',30);">status&option</div></div><div class="item_summery">'
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
};

function receive_singleoption(input_data){
    single_option_process(input_data.id,input_data.result);
    return 0;
};

function receive_globaloption(input_data){
    global_option_process(input_data.result);
    return 0;
};

function receive_stoppedstatus(input_data){
    stopped_status_process(input_data.result);
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
    if(note.type==255)
    {
        note.data=JSON.stringify(input_data);
    }
    else
    {
        note.gid=input_data.params[0].gid;
    }
    notification(note);
    return 0;
};

var func={'0':receive_connect,
          '10':receive_common,
          '11':receive_common,
          '12':receive_common,
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
        if(msg_data.id===undefined)
        {
            if(func[msg_data.method]===undefined)
            {ws_notify(255);}
            else
            {returncode=func[msg_data.method](msg_data);};
        }
        else
        {
            if(func[msg_data.id]===undefined)
            {notification(msg_data);}
            else
            {returncode=func[msg_data.id](msg_data);};
        };
        return returncode;
    };
};


