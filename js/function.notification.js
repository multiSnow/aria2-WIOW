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
//default unexpected message
//1 onDownloadStart
//2 onDownloadPause
//3 onDownloadStop
//4 onDownloadComplete
//5 onDownloadError
//6 onBtDownloadComplete
//255 unexpected websocket notification

//these should not appear
//0 connect & sideinfo
//30 showactive
//31 showstopped
//32 showwaiting
//33 showoption (active http)
//34 showoption (active bittorrent/metalink)
//35 showoption (stopped)
//36 showoption (waiting)
//40 globaloption

//meaning of urgency
//0 cheer
//1 light infomation
//2 normal notification
//3 warning and error

var msgdict={'aria2.onDownloadStart':['nor','Download Start'],
             'aria2.onDownloadPause':['nor','Download Paused'],
             'aria2.onDownloadStop':['nor','Download Stopped'],
             'aria2.onDownloadComplete':['chr','Download Complete'],
             'aria2.onDownloadError':['war','Download Error'],
             'aria2.onBtDownloadComplete':['chr','BitTorrent Download Complete'],
             'adduri':['lgt','Add Download via uri'],
             'addtorrent':['lgt','Add Download via torrent file'],
             'addmetalink':['lgt','Add Download via metalink file'],
             'pause':['lgt','Pause Download Required'],
             'remove_active':['lgt','Remove Download Required'],
             'remove_stopped':['lgt','Clear Download Result'],
             'unpause':['lgt','Continue Download Required'],
             'shutdown':['lgt','Shutdown aria2'],
             'purgestopped':['lgt','Clear All Download Result'],
             'change_global_option':['lgt','Global Option Changed'],
             'change_single_option':['lgt','Option Changed']}

function notification(input_json){
    let rnode=document.getElementById('notification');
    let nnode=document.createElement('div');
    if('method' in input_json){
        nnode.className='note_'+msgdict[input_json.method][0];
        nnode.appendChild(document.createTextNode(new Date().toLocaleString()));
        nnode.appendChild(document.createElement('br'));
        nnode.appendChild(document.createTextNode(msgdict[input_json.method][1]));
        nnode.appendChild(document.createElement('br'));
        nnode.appendChild(document.createTextNode(input_json.params[0].gid));
    }else if('id' in input_json){
        nnode.className='note_'+msgdict[input_json.id][0];
        nnode.appendChild(document.createTextNode(new Date().toLocaleString()));
        nnode.appendChild(document.createElement('br'));
        nnode.appendChild(document.createTextNode(msgdict[input_json.id][1]));
        nnode.appendChild(document.createElement('br'));
        nnode.appendChild(document.createTextNode((typeof input_json.result===typeof [])?input_json.result.join():input_json.result));
    }else{
        return 1;
    };
    rnode.insertBefore(nnode,rnode.firstChild)
    rnode.style.display='block';
    return 0;
};

function clearnotif(node){
    node.style.display='none';
    while(node.lastChild){
        node.removeChild(node.lastChild)
    };
};
