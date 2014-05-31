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

function warning_dialog(string){
    return 0;
};

function topage(page){
    var all_page={'start':'mainstart','active':'mainactive','stopped':'mainstopped','waiting':'mainwaiting','info':'maininfo'}
    for(var name in all_page){
	document.getElementById(all_page[name]).style.display='none';
	document.getElementById(name).className='sidetag';
    };
    document.getElementById(all_page[page]).style.display='block';
    document.getElementById(page).className='sidetag side_clicked';
    document.getElementById('sidetags').setAttribute('crtshow',all_page[page]);
    return 0;
};

function switch_add_type(input_value){
    var all_type={'uri':'adduri',
                  'torrent':'addtorrent',
                  'metalink':'addmetalink'}
    for(var type in all_type){
        document.getElementById(all_type[type]).style.display='none';
        document.getElementById(all_type[type]).value='';
    };
    document.getElementById('reset_add').setAttribute('onclick',"clearadd('new_type')".replace('new_type',all_type[input_value]));
    document.getElementById('start_add').setAttribute('onclick',"add_type_func['new_type']()".replace('new_type',all_type[input_value]));
    document.getElementById(all_type[input_value]).style.display='block';
    return 0;
}

function clearadd(add){
    document.getElementById(add).value='';
    return 0;
};

function toggle_adduri(uris_ck){
    var parentnode=document.getElementById('chose_add_type');
    parentnode.removeChild(document.getElementById('adduri'))
    if(uris_ck.checked===true){
        var node=document.createElement('textarea');
        node.rows=1;
    }else{
        var node=document.createElement('input');
        node.type='url';
    };
    node.id='adduri';
    parentnode.appendChild(node);
    return 0;
};

function clear_option_cache(option){
    document.getElementById(option).innerHTML='';
    return 0;
};

function spendtime(speed,completedsize,totalsize){
    var speed=parseFloat(speed);
    var completedsize=parseFloat(completedsize);
    var totalsize=parseFloat(totalsize);
    var floor=Math.floor;
    var dtlist=[1,'sec',60,'min',3600,'hour',86400,'day',604300,'week']
    var i=0;
    if(completedsize>=totalsize||speed<=0){
	return '∞';
    }else{
	var time_raw=((totalsize-completedsize)/speed).toFixed(0);
    };
    while(i<dtlist.length-2){
        if(time_raw<dtlist[i+2]){
            break;
        }else{
            i+=2;
        };
    };
    return floor(time_raw/dtlist[i])+dtlist[i+1]+((i>1)?floor((time_raw%dtlist[i])/dtlist[i-2])+dtlist[i-1]:'');
};

function human_read(num){
    var num=parseFloat(num);
    var pow=Math.pow;
    var unit=(document.getElementById('type_unit_ice').checked==true)?1024:1000;
    var suffixlist=['','K','M','G','T'];
    var i=0;
    while(i<suffixlist.length-1){
        if(num<pow(unit,i+1)){
            break;
        }else{
            i++;
        };
    };
    return (num/pow(unit,i)).toFixed(2).valueOf()+suffixlist[i];
};

function getqsv(k){
    var qsl=location.search.substring(1).split('&');
    for(var i in qsl){
        var pl=qsl[i].split('=');
        if(pl[0]==k){
            return pl.slice(1,pl.length).join('=');
        };
    };
    return '';
};

function onloadfunction(){
    var w=window.innerWidth;
    var h=window.innerHeight;
    var stl=document.querySelectorAll('.sidetag');
    var main=document.getElementById('main');
    var side=document.getElementById('side');
    var wss_scheme=document.getElementById('wss_scheme');
    close_option(document.getElementById('close_option'));
    document.getElementById('wshost').value=(location.hostname===''?'127.0.0.1':location.hostname);
    document.getElementById('wsport').value='6800';
    document.getElementById('rpctoken').value=getqsv('aria2_token');
    wss_scheme.checked=(location.protocol==='https:');
    wss_scheme.disabled=(location.protocol==='https:');
    if(w>h){
        main.style.marginLeft='161px';
        main.style.marginBottom='0';
        side.style.width='160px';
        side.style.cssFloat='left';
        side.style.bottom='auto';
        for(var i=0;i<stl.length;i++){
            stl[i].style.display='inherit';
        };
    }else{
        main.style.marginLeft='0';
        main.style.marginBottom='280px';
        side.style.width='auto';
        side.style.cssFloat='none';
        side.style.bottom='0';
        for(var i=0;i<stl.length;i++){
            stl[i].style.display='inline';
        };
    };
    return 0;
};
