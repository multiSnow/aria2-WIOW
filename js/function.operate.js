/*Project aria2-WIOW
 *
 * Copyright (c) 2014, multiSnow <infinity.blick.winkel@gmail.com>
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

function pause(gid){
    if(confirm('Are you sure to pause it?')==false){
        return 0;
    };
    if(confirm('Really?')==false){
        return 0;
    };
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='pause';
    json.method='aria2.pause';
    json.params=new Array();
    json.params[0]=String(gid);
    sendmessage(json);
    return 0;
};

function remove_active(gid){
    if(confirm('Are you sure to remove it?')==false){
        return 0;
    };
    if(confirm('Really?')==false){
        return 0;
    };
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='remove_active';
    json.method='aria2.remove';
    json.params=new Array();
    json.params[0]=String(gid);
    sendmessage(json);
    return 0;
};

function remove_stopped(gid){
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='remove_stopped';
    json.method='aria2.removeDownloadResult';
    json.params=new Array();
    json.params[0]=String(gid);
    sendmessage(json);
    return 0;
};

function unpause(gid){
    if(confirm('Are you sure to start it?')==false){
        return 0;
    };
    if(confirm('Really?')==false){
        return 0;
    };
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='unpause';
    json.method='aria2.unpause';
    json.params=new Array();
    json.params[0]=String(gid);
    sendmessage(json);
    return 0;
};

function shutdown(){
    if(confirm('Are you sure to shutdown aria2?')==false){
        return 0;
    };
    if(confirm('Really?')==false){
        return 0;
    };
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='shutdown';
    json.method='aria2.shutdown';
    sendmessage(json);
    return 0;
};

function purgestopped(){
    if(confirm('Are you sure to remove all stopped download?')==false){
        return 0;
    };
    if(confirm('Really?')==false){
        return 0;
    };
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='purgestopped';
    json.method='aria2.purgeDownloadResult';
    sendmessage(json);
    return 0;
};

function change_global_option(){
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='change_global_option';
    json.method='aria2.changeGlobalOption';
    json.params=new Array();
    json.params[0]=JSON.parse(document.getElementById('globalcache').innerHTML);
    sendmessage(json);
    return 0;
};

function change_single_option(){
    var json=new Object();
    json.jsonrpc='2.0';
    json.id='change_single_option';
    json.method='aria2.changeOption';
    json.params=new Array();
    json.params[0]=document.getElementById('showoption_status_gid').innerHTML;
    json.params[1]=JSON.parse(document.getElementById('singlecache').innerHTML);
    sendmessage(json);
    return 0;
};
