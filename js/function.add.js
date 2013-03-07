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

function adduri(){
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='10';
    json.method='aria2.addUri'
    var uri_list=new Array();
    var uri_raw_list=document.getElementById('adduri').value.split('\n');
    for(var uri_val in uri_raw_list){
        if(uri_raw_list[uri_val]!==''){
            if(uri_raw_list[uri_val].match(/(^https?:\/\/|^ftp:\/\/)/i)||uri_raw_list[uri_val].match(/^magnet:/)){
                uri_list.push(uri_raw_list[uri_val]);
            }else{
                alert('Invalid uri: "url", skip it.'.replace('url',uri_raw_list[uri_val]));
            };
        };
    };
    json.params=new Array(uri_list);
    if(document.getElementById('add_with_option').checked==true){
        json.params[1]=JSON.parse(document.getElementById('addcache').innerHTML);
    };
    sendmessage(json);
    return 0;
};

function addtorrent(){
    var filter=/^(?:application\/x-bittorrent)$/i;
    var reader=new FileReader();
    if(document.getElementById('addtorrent').files.length===0){
        return 0;
    };
    var file=document.getElementById("addtorrent").files[0];
    if(!filter.test(file.type)){
        alert("You must select a valid torrent file!");
        return 0;
    };
    reader.readAsDataURL(file);
    reader.onload=function(file_event){
        var json=new Object();
        json.jsonrpc='2.0';
        json.id='11';
        json.method='aria2.addTorrent';
        json.params=new Array();
        json.params[0]=file_event.target.result.replace('data:application/x-bittorrent;base64,','');
        json.params[1]=[]; // Here should be used for web-seeding.
        if(document.getElementById('add_with_option').checked==true){
            json.params[2]=JSON.parse(document.getElementById('addcache').innerHTML);
        };
        sendmessage(json);
        return 0;
    };
    return 0;
};

function addmetalink(){
    var filter=/^(?:application\/metalink\+xml|application\/metalink4\+xml)$/i;
    var reader=new FileReader();
    if(document.getElementById('addmetalink').files.length===0){
        return 0;
    };
    var file=document.getElementById("addmetalink").files[0];
    if(!filter.test(file.type)){
        alert("You must select a valid metalink file!");
        return 0;
    };
    reader.readAsDataURL(file);
    reader.onload=function(file_event){
        var json=new Object();
        json.jsonrpc='2.0';
        json.id='aria2_rpc';
        json.method='aria2.addMetalink';
        json.params=new Array();
        json.params[0]=file_event.target.result.replace('data:application/metalink+xml;base64,','').replace('data:application/metalink4+xml;base64,','');
        if(document.getElementById('add_with_option').checked==true){
            json.params[1]=JSON.parse(document.getElementById('addcache').innerHTML);
        };
        sendmessage(json);
        return 0;
    };
    return 0;
};

var add_type_func={'adduri':adduri,
                   'addtorrent':addtorrent,
                   'addmetalink':addmetalink}
