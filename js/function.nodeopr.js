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

function opr_pop(gid){
    let node=document.getElementById(gid);
    if(node){
        node.parentNode.removeChild(node);
    };
    return 0;
};

function opr_active(gid,dict){
    let root=document.getElementById('mainactive');
    let node=document.getElementById(gid);
    let dictmap={'item_gid':gid,
                 'item_title':dict['name'],
                 'infohash':dict['infohash'],
                 'progress_text':(dict['completedLength']/dict['totalLength']*100).toFixed(2)+'% of '+human_read(dict['totalLength']),
                 'dspd':'D: '+human_read(dict['downloadSpeed'])+'/s',
                 'uspd':'U: '+human_read(dict['uploadSpeed'])+'/s',
                 'eta':'ETA: '+spendtime(dict['downloadSpeed'],dict['completedLength'],dict['totalLength']),
                 'connection':'download from '+dict['connections']+' connection.'};
    if(node===null){
        node=document.createElement('div');
        node.id=gid;
        node.className='item';
        setattr(node,'data-artype',(dict['type_bittorrent'])?'abtml':'ahttp');
        root.insertBefore(node,root.childNodes[dict['i']]);

        let item_gid=document.createElement('div');
        let item_title=document.createElement('div');
        let item_button=document.createElement('div');
        let pause_icon=document.createElement('canvas');
        let remove_icon=document.createElement('canvas');
        let option_icon=document.createElement('canvas');
        let item_summery=document.createElement('div');
        let infohash_div=document.createElement('div');
        let progress_bar=document.createElement('progress');
        let progress=document.createElement('div');
        let dspd=document.createElement('div');
        let uspd=document.createElement('div');
        let eta=document.createElement('div');
        let connection=document.createElement('div');

        item_gid.id='item_gid';
        item_gid.className='item_gid';
        item_gid.style.color=dict['color'];
        item_title.id='item_title';
        item_title.className='item_title';
        item_title.style.color=dict['color'];
        item_button.className='item_button';
        pause_icon.id='pause_icon';
        pause_icon.textContent='pause';
        setattr(pause_icon,'onclick',"pause('"+gid+"')");
        remove_icon.id='remove_icon';
        remove_icon.textContent='remove';
        setattr(remove_icon,'onclick',"remove_active('"+gid+"')");
        option_icon.id='option_icon';
        option_icon.textContent='status&option';
        setattr(option_icon,'onclick',"showoption('"+gid+"')");
        item_summery.className='item_summery';
        infohash_div.id='infohash';
        infohash_div.className='infohash';
        progress_bar.className='mainprogress';
        progress.id='progress_text';
        dspd.id='dspd';
        uspd.id='uspd';
        eta.id='eta';
        connection.id='connection';

        pausecanvas(pause_icon);
        removecanvas(remove_icon);
        optioncanvas(option_icon);

        item_button.appendChild(pause_icon);
        item_button.appendChild(remove_icon);
        item_button.appendChild(option_icon);
        item_summery.appendChild(infohash_div);
        item_summery.appendChild(progress_bar);
        item_summery.appendChild(progress);
        item_summery.appendChild(dspd);
        item_summery.appendChild(uspd);
        item_summery.appendChild(eta);
        item_summery.appendChild(connection);

        node.appendChild(item_gid);
        node.appendChild(item_title);
        node.appendChild(item_button);
        node.appendChild(item_summery);
    };
    for(let n of node.getElementsByTagName('div')){
        if(n.id in dictmap){
            n.textContent=dictmap[n.id];
        };
    };
    let progress_bar=node.getElementsByTagName('progress')[0];
    progress_bar.value=dict['completedLength'];
    progress_bar.max=dict['totalLength'];
    return 0;
};

function opr_stopped(gid,dict){
    let root=document.getElementById('mainstopped');
    let node=document.getElementById(gid);
    let dictmap={'item_gid':gid,
                 'item_title':dict['name'],
                 'progress_text':(dict['completedLength']/dict['totalLength']*100).toFixed(2)+'% of '+human_read(dict['totalLength'])}
    if(node===null){
        node=document.createElement('div');
        node.id=gid;
        node.className='item';
        setattr(node,'data-artype','stop');
        root.insertBefore(node,root.childNodes[dict['i']]);

        let item_gid=document.createElement('div');
        let item_title=document.createElement('div');
        let item_button=document.createElement('div');
        let remove_icon=document.createElement('canvas');
        let option_icon=document.createElement('canvas');
        let item_summery=document.createElement('div');
        let progress_bar=document.createElement('progress');
        let progress=document.createElement('div');

        item_gid.id='item_gid';
        item_gid.className='item_gid';
        item_title.id='item_title';
        item_title.className='item_title';
        item_button.className='item_button';
        remove_icon.id='remove_icon';
        remove_icon.textContent='remove';
        setattr(remove_icon,'onclick',"remove_active('"+gid+"')");
        option_icon.id='option_icon'
        option_icon.appendChild(document.createTextNode('status&option'));
        setattr(option_icon,'onclick',"showoption('"+gid+"')");
        item_summery.className='item_summery';
        progress_bar.className='mainprogress';
        progress.id='progress_text';

        removecanvas(remove_icon);
        optioncanvas(option_icon);

        item_button.appendChild(remove_icon);
        item_button.appendChild(option_icon);
        item_summery.appendChild(progress_bar);
        item_summery.appendChild(progress);

        node.appendChild(item_gid);
        node.appendChild(item_title);
        node.appendChild(item_button);
        node.appendChild(item_summery);
    };
    for(let n of node.getElementsByTagName('div')){
        if(n.id in dictmap){
            n.textContent=dictmap[n.id];
        };
    };
    let progress_bar=node.getElementsByTagName('progress')[0];
    progress_bar.value=dict['completedLength'];
    progress_bar.max=dict['totalLength'];
    return 0;
};

function opr_waiting(gid,dict){
    let root=document.getElementById('mainwaiting');
    let node=document.getElementById(gid);
    let dictmap={'item_gid':gid,
                 'item_title':dict['name'],
                 'infohash':dict['infohash'],
                 'progress_text':(dict['completedLength']/dict['totalLength']*100).toFixed(2)+'% of '+human_read(dict['totalLength']),
                 'dspd':'D: '+human_read(dict['downloadSpeed'])+'/s',
                 'uspd':'U: '+human_read(dict['uploadSpeed'])+'/s',
                 'eta':'ETA: '+spendtime(dict['downloadSpeed'],dict['completedLength'],dict['totalLength']),
                 'connection':'download from '+dict['connections']+' connection.'};
    if(node===null){
        node=document.createElement('div');
        node.id=gid;
        node.className='item';
        setattr(node,'data-artype',(dict['type_bittorrent'])?'wbtml':'whttp');
        root.insertBefore(node,root.childNodes[dict['i']]);

        let item_gid=document.createElement('div');
        let item_title=document.createElement('div');
        let item_button=document.createElement('div');
        let unpause_icon=document.createElement('canvas');
        let remove_icon=document.createElement('canvas');
        let option_icon=document.createElement('canvas');
        let item_summery=document.createElement('div');
        let infohash_div=document.createElement('div');
        let progress_bar=document.createElement('progress');
        let progress=document.createElement('div');
        let dspd=document.createElement('div');
        let uspd=document.createElement('div');
        let eta=document.createElement('div');
        let connection=document.createElement('div');

        item_gid.id='item_gid';
        item_gid.className='item_gid';
        item_gid.style.color=dict['color'];
        item_title.id='item_title';
        item_title.className='item_title';
        item_title.style.color=dict['color'];
        item_button.className='item_button';
        unpause_icon.id='pause_icon';
        unpause_icon.textContent='pause';
        setattr(unpause_icon,'onclick',"unpause('"+gid+"')");
        remove_icon.id='remove_icon';
        remove_icon.textContent='remove';
        setattr(remove_icon,'onclick',"remove_active('"+gid+"')");
        option_icon.id='option_icon';
        option_icon.textContent='status&option';
        setattr(option_icon,'onclick',"showoption('"+gid+"')");
        item_summery.className='item_summery';
        infohash_div.id='infohash';
        infohash_div.className='infohash';
        progress_bar.className='mainprogress';
        progress.id='progress_text';
        dspd.id='dspd';
        uspd.id='uspd';
        eta.id='eta';
        connection.id='connection';

        unpausecanvas(unpause_icon);
        removecanvas(remove_icon);
        optioncanvas(option_icon);

        item_button.appendChild(unpause_icon);
        item_button.appendChild(remove_icon);
        item_button.appendChild(option_icon);
        item_summery.appendChild(infohash_div);
        item_summery.appendChild(progress_bar);
        item_summery.appendChild(progress);
        item_summery.appendChild(dspd);
        item_summery.appendChild(uspd);
        item_summery.appendChild(eta);
        item_summery.appendChild(connection);

        node.appendChild(item_gid);
        node.appendChild(item_title);
        node.appendChild(item_button);
        node.appendChild(item_summery);
    };
    for(let n of node.getElementsByTagName('div')){
        if(n.id in dictmap){
            n.textContent=dictmap[n.id];
        };
    };
    let progress_bar=node.getElementsByTagName('progress')[0];
    progress_bar.value=dict['completedLength'];
    progress_bar.max=dict['totalLength'];
    return 0;
};
