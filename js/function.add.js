function adduri(){
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='10';
    json.method='aria2.addUri'
    json.params=[[]];
    json.params[0][0]=document.getElementById('adduri').value;
    //document.getElementById('send').innerHTML+=JSON.stringify(json)+'<br/>';
    ws.send(JSON.stringify(json));
    message_process();
    return 0;
};
function addtorrent(){
    var filter=/^(?:application\/x-bittorrent)$/i;
    var reader=new FileReader();
    if(document.getElementById('addtorrent').files.length===0)
    {
        return 0;
    }
    var file=document.getElementById("addtorrent").files[0];
    if(!filter.test(file.type))
    {
        alert("You must select a valid torrent file!");
        return 0;
    }
    reader.readAsDataURL(file);
    reader.onload=function(file_event){
        var json=new Object();
        json.jsonrpc='2.0';
        json.id='11';
        json.method='aria2.addTorrent';
        json.params=[];
        json.params[0]=file_event.target.result.replace('data:application/x-bittorrent;base64,','');
        //document.getElementById('send').innerHTML+=JSON.stringify(json)+'<br/>';
        ws.send(JSON.stringify(json));
	message_process();
	return 0;
    };
    return 0;
};

function addmetalink(){
    var filter=/^(?:application\/metalink\+xml|application\/metalink4\+xml)$/i;
    var reader=new FileReader();
    if(document.getElementById('addmetalink').files.length===0)
    {
        return 0;
    }
    var file=document.getElementById("addmetalink").files[0];
    if(!filter.test(file.type))
    {
        alert("You must select a valid metalink file!");
        return 0;
    }
    reader.readAsDataURL(file);
    reader.onload=function(file_event){
        var json=new Object();
        json.jsonrpc='2.0';
        json.id='aria2_rpc';
        json.method='aria2.addMetalink';
        json.params=[];
        json.params[0]=file_event.target.result.replace('data:application/metalink+xml;base64,','').replace('data:application/metalink4+xml;base64,','');
        //document.getElementById('send').innerHTML+=JSON.stringify(json)+'<br/>';
        ws.send(JSON.stringify(json));
	message_process();
	return 0;
    };
    return 0;
};
