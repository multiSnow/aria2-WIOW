function pause(gid){
    if(confirm('Are you sure to pause it?')==false)
    {
        return 0;
    };
    if(confirm('Really?')==false)
    {
        return 0;
    };
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='20';
    json.method='aria2.pause';
    json.params=[];
    json.params[0]=String(gid);
    ws.send(JSON.stringify(json));
    message_process();
    return 0;
};
function remove(gid){
    if(confirm('Are you sure to remove it?')==false)
    {
        return 0;
    };
    if(confirm('Really?')==false)
    {
        return 0;
    };
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='21';
    json.method='aria2.remove';
    json.params=[];
    json.params[0]=String(gid);
    ws.send(JSON.stringify(json));
    message_process();
    return 0;
};
function remove_stopped(gid){
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='22';
    json.method='aria2.removeDownloadResult';
    json.params=[];
    json.params[0]=String(gid);
    ws.send(JSON.stringify(json));
    message_process();
    return 0;
};
function unpause(gid){
    if(confirm('Are you sure to start it?')==false)
    {
        return 0;
    };
    if(confirm('Really?')==false)
    {
        return 0;
    };
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='23';
    json.method='aria2.unpause';
    json.params=[];
    json.params[0]=String(gid);
    ws.send(JSON.stringify(json));
    message_process();
    return 0;
};

function shutdown(){
    if(confirm('Are you sure to shutdown aria2?')==false)
    {
        return 0;
    };
    if(confirm('Really?')==false)
    {
        return 0;
    };
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='24';
    json.method='aria2.shutdown';
    ws.send(JSON.stringify(json));
    message_process();
    return 0;
};
function purgestopped(){
    if(confirm('Are you sure to remove all stopped download?')==false)
    {
        return 0;
    };
    if(confirm('Really?')==false)
    {
        return 0;
    };
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='25';
    json.method='aria2.purgeDownloadResult';
    ws.send(JSON.stringify(json));
    message_process();
    return 0;
};
