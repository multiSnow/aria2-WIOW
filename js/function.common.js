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

type_unit=0;//integer value 1 to "SI", any other value to "IEC"

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
    speed=parseFloat(speed);
    completedsize=parseFloat(completedsize);
    totalsize=parseFloat(totalsize);
    var floor=Math.floor;
    if(completedsize>=totalsize||speed<=0){
	return '∞';
    }else{
	var time_raw=((totalsize-completedsize)/speed).toFixed(0);
    };
    if(time_raw<60){
        return time_raw+'sec';
    }else if(time_raw<3600){
        return floor(time_raw/60)+'min'+time_raw%60+'sec';
    }else if(time_raw<86400){
        return floor(time_raw/3600)+'hour'+floor((time_raw%3600)/60)+'min';
    }else if(time_raw<604300){
        return floor(time_raw/86400)+'day'+floor((time_raw%86400)/3600)+'hour';
    }else{
        return floor(time_raw/604300)+'week'+floor((time_raw%604300)/86400)+'day';
    };
};

function human_read(num){
    num=parseFloat(num);
    var pow=Math.pow;
    if(type_unit==0){
        var unit=1024;
    }else{
        var unit=1000;
    };
    if(num<unit){
        return num;
    }else if(num<pow(unit,2)){
        return (num/unit).toFixed(2).valueOf()+'K';
    }else if(num<pow(unit,3)){
        return (num/pow(unit,2)).toFixed(2).valueOf()+'M';
    }else if(num<pow(unit,4)){
        return (num/pow(unit,3)).toFixed(2).valueOf()+'G';
    }else{
        return (num/pow(unit,4)).toFixed(2).valueOf()+'T';
    };
};
