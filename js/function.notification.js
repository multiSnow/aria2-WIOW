//default unexpected message
//1 onDownloadStart
//2 onDownloadPause
//3 onDownloadStop
//4 onDownloadComplete
//5 onDownloadError
//6 onBtDownloadComplete
//10 adduri
//11 addtorrent
//12 addmetalink
//20 pause
//21 remove
//22 remove_stopped
//23 unpause
//24 shutdown
//25 purgestopped
//41 change_global_option
//42 change_single_option
//255 unexpected websocket notification

//these should not appear
//0 connect & sideinfo
//30 showactive
//31 showstopped
//32 showwaiting
//33 showoption (active http)
//34 showoption (active bittorrent/metalink)
//35 showoption (stopped)
//36 showoption (waiting)
//40 globaloption

//meaning of urgency
//0 cheer
//1 light infomation
//2 normal notification
//3 warning and error

function notification(input_json){
    var i,urgency,summary,text;
    document.getElementById('notification').style.display='block';
    switch(input_json.type)
    {
    case 1:
        urgency=2;
        summary='Mission Start';
        text='Mission start as GID "'+input_json.gid+'".';
        break;
    case 2:
        urgency=2;
        summary='Mission Paused';
        text='GID "'+input_json.gid+'" has been paused.';
        break;
    case 3:
        urgency=2;
        summary='Mission Stopped';
        text='GID "'+input_json.gid+'" has been stopped.';
        break;
    case 4:
        urgency=0;
        summary='Mission Complete';
        text='GID "'+input_json.gid+'" has been completed';
        break;
    case 5:
        urgency=3;
        summary='Mission Error!';
        text='GID "'+input_json.gid+'" has been stopped due to error.';
        break;
    case 6:
        urgency=0;
        summary='BitTorrent Download Complete';
        text='GID "'+input_json.gid+'" downloading has been completed, and will continue to seed.';
        break;
    case 10:
        urgency=1;
        summary='Add Download Required';
        text='Apply downloading via link and should start in GID "'+input_json.gid+'".';
        break;
    case 11:
        urgency=1;
        summary='Add Download Required';
        text='Apply downloading via torrent file and should start in GID "'+input_json.gid+'".';
        break;
    case 12:
        urgency=1;
        summary='Add Download Required';
        text='Apply downloading via metalink file and should start in GID';
        i=0;
        while(i<=Number(input_json.gid.length)-1)
        {
            text+=' "'+input_json.gid[i]+'"';
            i+=1
        };
        text+='.';
        break;
    case 20:
        urgency=1;
        summary='Pause Download Required';
        text='Apply pause downloading GID "'+input_json.gid+'".';
        break;
    case 21:
        urgency=1;
        summary='Remove Download Required';
        text='Apply remove downloading GID "'+input_json.gid+'".';
        break;
    case 22:
        if(input_json.status==='OK')
        {
            urgency=1;
            summary='Clear Download Result'
            text='Selected download result has been removed.';
        }
        else
        {
            //!!!UGLY CODE!!!
            //Since I'm not sure whether there will be any other result, I can only treat it as an unexpected message.
            var ugly={};
            ugly.error_id=22;
            ugly.error_status=JSON.stringify(input_json);
            notification(ugly);
            return 1;
        };
        break;
    case 23:
        urgency=1;
        summary='Continue Download Required';
        text='Apply continue downloading GID "'+input_json.gid+'".';
        break;
    case 24:
        if(input_json.status==='OK')
        {
            urgency=1;
            summary='Shutdown aria2'
            text='Aria2 will shutdown after any necessary actions finished.';
        }
        else
        {
            //!!!UGLY CODE!!!
            //Since I'm not sure whether there will be any other result, I can only treat it as an unexpected message.
            var ugly={};
            ugly.error_id=24;
            ugly.error_status=JSON.stringify(input_json);
            notification(ugly);
            return 1;
        };
        break;
    case 25:
        if(input_json.status==='OK')
        {
            urgency=1;
            summary='Clear Any Download Result'
            text='Any completed/error/removed download result has been removed.';
        }
        else
        {
            //!!!UGLY CODE!!!
            //Since I'm not sure whether there will be any other result, I can only treat it as an unexpected message.
            var ugly={};
            ugly.error_id=25;
            ugly.error_status=JSON.stringify(input_json);
            notification(ugly);
            return 1;
        };
        break;
    case 41:
        if(input_json.status==='OK')
        {
            urgency=1;
            summary='Option Changed'
            text='Specified global option has been changed';
        }
        else
        {
            //!!!UGLY CODE!!!
            //Since I'm not sure whether there will be any other result, I can only treat it as an unexpected message.
            var ugly={};
            ugly.error_id=41;
            ugly.error_status=JSON.stringify(input_json);
            notification(ugly);
            return 1;
        };
        break;
    case 42:
        if(input_json.status==='OK')
        {
            urgency=1;
            summary='Option Changed'
            text='Specified option of selected download has been changed';
        }
        else
        {
            //!!!UGLY CODE!!!
            //Since I'm not sure whether there will be any other result, I can only treat it as an unexpected message.
            var ugly={};
            ugly.error_id=42;
            ugly.error_status=JSON.stringify(input_json);
            notification(ugly);
            return 1;
        };
        break;
    case 255:
        urgency=3;
        summary='aria2 send an unexpected notification.';
        text=JSON.stringify(input_json);
        break;
    default:
        urgency=3;
        summary='aria2 returns an unknown result.';
        text=JSON.stringify(input_json);
        break;
    };
    document.getElementById('notification').innerHTML='<div>'+urgency+'<br/>'+summary+'<br/>'+text+'</div>'+document.getElementById('notification').innerHTML;
    return 0;
};
