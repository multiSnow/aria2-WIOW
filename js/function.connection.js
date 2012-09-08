function connect(){
    document.getElementById('sideinfo').innerHTML='Connecting...<br/>';
    var url='ws://'+document.getElementById('wshost').value+':'+document.getElementById('wsport').value+'/jsonrpc';
    ws=new WebSocket(url);
    ws.onopen=function(){
        document.getElementById('shutdown_button').style.display='block';
        document.getElementById('add').style.display='block';
        document.getElementById('disconnect').style.display='block';
        document.getElementById('ws_address').style.display='none';
        document.getElementById('connect').style.display='none';
        var  i=0,json=new Object(),methodName=new Array();
        json.jsonrpc='2.0';
        json.id='0';
        json.params=[[]];
        json.method='system.multicall';
        methodName[0]='aria2.getVersion';
        methodName[1]='aria2.getGlobalStat';
        while(i<=1)
        {
            json.params[0][i]={};
            json.params[0][i].methodName=methodName[i];
            i+=1;
        };
        //document.getElementById('send').innerHTML+=JSON.stringify(json)+'<br/>';
        ws.send(JSON.stringify(json));
	message_process();
	return 0;
    };
    return 0;
};
function disconnect(){
    ws.close();
    ws.onclose=function(){
        document.getElementById('sideinfo').innerHTML='Disconnected!';
        document.getElementById('shutdown_button').style.display='none';
        document.getElementById('add').style.display='none';
        document.getElementById('disconnect').style.display='none';
        document.getElementById('ws_address').style.display='block';
        document.getElementById('connect').style.display='block';
        document.title='aria2 WIOW';
    };
    return 0;
};
