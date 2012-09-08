function testapi(){
    document.getElementById('javascript_support').style.display='block';
    document.getElementById('javascript_support').style.color='#00ff00';
    document.getElementById('javascript_support').innerHTML='External JavaScript is supported.';
    document.getElementById('websocket_support').style.display='block';
    if(window.WebSocket){
        document.getElementById('websocket_support').style.color='#00ff00';
        document.getElementById('websocket_support').innerHTML='WebSocket is supported.';
    }else{
        return 1;
    };
    document.getElementById('filereader_support').style.display='block';
    if(window.FileReader){
        document.getElementById('filereader_support').style.color='#00ff00';
        document.getElementById('filereader_support').innerHTML='FileReader is supported.';
    };
};
function testtag(){
    document.getElementById('progress_tag').style.display='block';
    document.getElementById('progress_tag').style.color='#f0f0f0';
}
