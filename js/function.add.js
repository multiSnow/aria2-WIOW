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

function adduri(){
    let ul=new Array();
    let rl=document.getElementById('adduri').value.match(/[^\n\r]+/g);
    for(let i=0;i<rl.length;i++){
        if(rl[i].match(/(^https?:\/\/|^ftp:\/\/)/i)||rl[i].match(/^magnet:/)){
            ul.push(rl[i]);
        }else if(rl[i]){
            alert('skip invalid uri: '+rl[i]);
        };
    };
    if(!ul.length){
        alert('no uri is added.');
        return 0;
    };
    let sendurl=function(ul){
        let params=new Array(ul);
        if(document.getElementById('add_with_option').checked){
            params.push(JSON.parse(document.getElementById('addcache').innerHTML));
        };
        return wsreq('adduri','aria2.addUri',params);
    };
    if(document.getElementById('forceseq').checked){
        for(let i=0;i<ul.length;i++){
            sendurl(new Array(ul[i]));
        };
    }else{
        sendurl(ul);
    };
    return 0;
};

function addtorrent(){
    if(!document.getElementById('addtorrent').files.length){
        alert('no file is selected.');
        return 0;
    };
    let sendbt=function(file){
        let reader=new FileReader();
        reader.onload=function(file_event){
            let params=new Array(file_event.target.result.replace(/^data:application\/.*;base64,/,''),[]);// 2nd element should be used for web-seeding.
            if(document.getElementById('add_with_option').checked==true){
                params.push(JSON.parse(document.getElementById('addcache').innerHTML));
            };
            return wsreq('addtorrent','aria2.addTorrent',params);
        };
        reader.readAsDataURL(file);
    };
    let fl=document.getElementById('addtorrent').files;
    for(let i=0;i<fl.length;i++){
        sendbt(fl[i]);
    };
    return 0;
};

function addmetalink(){
    if(!document.getElementById('addmetalink').files.length){
        alert('no file is selected.');
        return 0;
    };
    let sendml=function(file){
        let reader=new FileReader();
        reader.onload=function(file_event){
            let params=new Array(file_event.target.result.replace(/data:application\/.*;base64,/,''));
            if(document.getElementById('add_with_option').checked==true){
                json.params[1]=JSON.parse(document.getElementById('addcache').innerHTML);
            };
            return wsreq('addmetalink','aria2.addMetalink',params);
        };
        reader.readAsDataURL(file);
    };
    let fl=document.getElementById('addmetalink').files;
    for(let i=0;i<fl.length;i++){
        sendml(fl[i]);
    };
    return 0;
};

var add_type_func={'adduri':adduri,
                   'addtorrent':addtorrent,
                   'addmetalink':addmetalink}
