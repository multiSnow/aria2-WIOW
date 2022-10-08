/*Project aria2-WIOW
 *
 * Copyright (c) 2014 - 2022, multiSnow <https://github.com/multiSnow>
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
    if(confirm('Are you sure to pause it?')&&confirm('Really?')){
        return wsreq('pause','aria2.pause',new Array(String(gid)));
    };
};

function remove_active(gid){
    if(confirm('Are you sure to remove it?')&&confirm('Really?')){
        return wsreq('remove_active','aria2.remove',new Array(String(gid)));
    };
};

function remove_stopped(gid){
    return wsreq('remove_stopped','aria2.removeDownloadResult',new Array(String(gid)));
};

function unpause(gid){
    if(confirm('Are you sure to start it?')&&confirm('Really?')){
        return wsreq('unpause','aria2.unpause',new Array(String(gid)));
    };
};

function shutdown(){
    if(confirm('Are you sure to shutdown aria2?')&&confirm('Really?')){
        return wsreq('shutdown','aria2.shutdown');
    };
};

function purgestopped(){
    if(confirm('Are you sure to remove all stopped download?')&&confirm('Really?')){
        return wsreq('purgestopped','aria2.purgeDownloadResult');
    };
};

function change_global_option(){
    return wsreq('change_global_option','aria2.changeGlobalOption',
                 new Array(JSON.parse(document.getElementById('globalcache').innerHTML)));
};

function change_single_option(){
    return wsreq('change_single_option','aria2.changeOption',
                 new Array(document.getElementById('showoption_status_gid').innerHTML,
                           JSON.parse(document.getElementById('singlecache').innerHTML)));
};
