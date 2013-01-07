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
    sideinfo.appendChild(document.createTextNode('D: '+human_read(input_data.result[1][0].downloadSpeed)+'b'));
    sideinfo.appendChild(document.createElement('br'));
    sideinfo.appendChild(document.createTextNode('U: '+human_read(input_data.result[1][0].uploadSpeed)+'b'));
    sideinfo.appendChild(document.createElement('br'));
    return 0;
};

function receive_active(input_data){
    var downloadSpeed,uploadSpeed,gid,completedLength,totalLength,connections,type_bittorrent=-1,infohash,name,color;
    var node,item_title,item_button,pause_icon,remove_icon,option_icon,item_summery,progress_bar;
    var num=Number(input_data.result.length)-1;
    for(var i=0;i<=num;i++)
    {
        node=document.createElement('div');
        node.id='active_'+String(i);
        node.className='item';
        document.getElementById('mainactive').appendChild(node);
    };
    for(var i=0;i<=num;i++)
    {
        active_element=document.getElementById('active_'+String(i));
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
        infohash=(type_bittorrent==1)?input_data.result[i].infoHash:'';
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
        //.replace().replace()
        //It's stupid, but should be better than str+str+str+...
        option_icon.setAttribute('onclick',"showoption('gid',type_bittorrent,10)".replace('gid',gid).replace('type_bittorrent',type_bittorrent));
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
        item_summery.appendChild(document.createTextNode('D: '+human_read(downloadSpeed)+'b/s'));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('U: '+human_read(uploadSpeed)+'b/s'));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('ETA: '+spendtime(downloadSpeed,completedLength,totalLength)));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('download from '+connections+' connection.'));

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
    for(var i=0;i<=num;i++)
    {
        node=document.createElement('div');
        node.id='stopped_'+String(i);
        node.className='item';
        document.getElementById('mainstopped').appendChild(node);
    };
    for(var i=0;i<=num;i++)
    {
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
    if(i>=1)
    {
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
    for(var i=0;i<=num;i++)
    {
        node=document.createElement('div');
        node.id='waiting_'+String(i);
        node.className='item';
        document.getElementById('mainwaiting').appendChild(node);
    };
    for(var i=0;i<=num;i++)
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
        infohash=(type_bittorrent==1)?input_data.result[i].infoHash:'';
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
        option_icon.setAttribute('onclick',"showoption('gid',type_bittorrent,30)".replace('gid',gid).replace('type_bittorrent',type_bittorrent));
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
        item_summery.appendChild(document.createTextNode('D: '+human_read(downloadSpeed)+'b/s'));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('U: '+human_read(uploadSpeed)+'b/s'));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('ETA: '+spendtime(downloadSpeed,completedLength,totalLength)));
        item_summery.appendChild(document.createElement('br'));
        item_summery.appendChild(document.createTextNode('download from '+connections+' connection.'));

        document.getElementById('waiting_'+String(i)).appendChild(item_title);
        document.getElementById('waiting_'+String(i)).appendChild(item_button);
        document.getElementById('waiting_'+String(i)).appendChild(item_summery);
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


