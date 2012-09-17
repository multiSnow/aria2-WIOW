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
    for(var all_page in {start:'',active:'',stopped:'',waiting:'',info:''})
    {
	document.getElementById('main'+all_page).style.display='none';
	document.getElementById(all_page).className='sidetag';
    };
    document.getElementById('main'+page).style.display='block';
    document.getElementById(page).className='sidetag side_clicked';
    return 0;
};
function clearadd(add){
    document.getElementById(add).value='';
    return 0;
};
function clear_option_cache(option){
    document.getElementById(option).innerHTML='';
    return 0;
};
function spendtime(speed,completedsize,totalsize){
    if(Number(completedsize)>=Number(totalsize)||Number(speed)<=0)
    {
	return -1;
    }
    else
    {
	var time_raw=((Number(totalsize)-Number(completedsize))/Number(speed)).toFixed(0);
    };
    if(time_raw<60)
    {
	var flag=0;
    }
    else if(time_raw<3600)
    {
	var flag=1;
    }
    else if(time_raw<86400)
    {
	var flag=2;
    }
    else if(time_raw<604300)
    {
	var flag=3;
    }
    else
    {
	var flag=4;
    }
    switch(flag)
    {
    case 0:return time_raw+'sec';
    case 1:return Math.floor(time_raw/60)+'min'+time_raw%60+'sec';
    case 2:return Math.floor(time_raw/3600)+'hour'+Math.floor((time_raw%3600)/60)+'min';
    case 3:return Math.floor(time_raw/86400)+'day'+Math.floor((time_raw%86400)/3600)+'hour';
    case 4:return Math.floor(time_raw/604300)+'week'+Math.floor((time_raw%604300)/86400)+'day';
    default:return -1;
    };
};	
function human_read(num){
    switch(type_unit)
    {
    case 0:var unit=Math.pow(2,10);break;
    default:var unit=Math.pow(10,3);break;
    };
    switch(num.valueOf().length)
    {
    case 1:
    case 2:
    case 3:return num.valueOf();
    case 4:
    case 5:
    case 6:return (num/unit).toFixed(2).valueOf()+'K';
    case 7:
    case 8:
    case 9:return (num/Math.pow(unit,2)).toFixed(2).valueOf()+'M';
    case 10:
    case 11:
    case 12:return (num/Math.pow(unit,3)).toFixed(2).valueOf()+'G';
    default:return (num/Math.pow(unit,4)).toFixed(2).valueOf()+'T';
    };
};
