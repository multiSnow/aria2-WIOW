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

function sideinfo(){
    var json=new Object(),methodName=new Array();
    json.jsonrpc='2.0';
    json.id='0';
    json.params=new Array(new Array());
    json.method='system.multicall';
    methodName[0]='aria2.getVersion';
    methodName[1]='aria2.getGlobalStat';
    for(var i in methodName){
        json.params[0][i]=new Object({'methodName':methodName[i]});
    };
    sendmessage(json);
    return 0;
};

function default_option(){
    if(document.getElementById('add_with_option').checked){
        document.getElementById('add_option').style.display='inline';
        document.getElementById('addcache').innerHTML='{}';
        var json=new Object();
        json.jsonrpc='2.0';
        json.id='19';
        json.method='aria2.getGlobalOption';
        sendmessage(json);
    }else{
        document.getElementById('add_option').style.display='none';
        document.getElementById('addcache').innerHTML='';
    };
    return 0;
};

function showactive(){
    document.getElementById('mainactive').innerHTML='';
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='30';
    json.method='aria2.tellActive';
    sendmessage(json);
    return 0;
};

function showstopped(){
    document.getElementById('mainstopped').innerHTML='';
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='31';
    json.method='aria2.tellStopped';
    json.params=new Array(0,Math.pow(2,62));
    sendmessage(json);
    return 0;
};

function showwaiting(){
    document.getElementById('mainwaiting').innerHTML='';
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='32';
    json.method='aria2.tellWaiting';
    json.params=new Array(0,Math.pow(2,62));
    sendmessage(json);
    return 0;
};

function globaloption(){
    document.getElementById('globalcache').innerHTML='';
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='40';
    json.method='aria2.getGlobalOption';
    sendmessage(json);
    return 0;
};

function showoption(gid,type,status){
    document.getElementById('showoption').style.display='block';
    document.getElementById('singlecache').innerHTML='';
    var json=new Object(),methodName=new Array();
    json.jsonrpc='2.0';
    switch(type+status){
    case 10:
        json.id='33';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.tellStatus';
        methodName[1]='aria2.getOption';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
            json.params[0][i].params=new Array(String(gid));
        };
        break;
    case 11:
        json.id='34';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.tellStatus';
        methodName[1]='aria2.getOption';
        methodName[2]='aria2.getPeers';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
            json.params[0][i].params=new Array(String(gid));
        };
        break;
    case 12:
        json.id='34';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.tellStatus';
        methodName[1]='aria2.getOption';
        methodName[2]='aria2.getPeers';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
            json.params[0][i].params=new Array(String(gid));
        };
        break;
    case 20:
        json.id='35';
        json.method='aria2.tellStatus';
        json.params=new Array(String(gid));
        break;
    case 30:
        json.id='36';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.tellStatus';
        methodName[1]='aria2.getOption';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
            json.params[0][i].params=new Array(String(gid));
        };
        break;
    case 31:
        json.id='37';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.tellStatus';
        methodName[1]='aria2.getOption';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
            json.params[0][i].params=new Array(String(gid));
        };
        break;
    case 32:
        json.id='37';
        json.params=new Array(new Array());
        json.method='system.multicall';
        methodName[0]='aria2.tellStatus';
        methodName[1]='aria2.getOption';
        for(var i in methodName){
            json.params[0][i]=new Object({'methodName':methodName[i]});
            json.params[0][i].params=new Array(String(gid));
        };
        break;
    default:break;
    };
    sendmessage(json);
    return 0;
};

function hideoption(){
    document.getElementById('showoption').style.display='none';
    return 0;
};

function start_autorefresh(){
    return setInterval(function(){sideinfo()},500);
};
