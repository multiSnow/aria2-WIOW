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

function testapi(){
    let green='#00ff00';
    let reg='#ff0000';
    let javascript_support=document.getElementById('javascript_support');
    javascript_support.style.display='block';
    javascript_support.style.color='#00ff00';
    javascript_support.innerHTML='External JavaScript is supported.';
    let websocket_support=document.getElementById('websocket_support');
    websocket_support.style.display='block';
    if(window.WebSocket){
        websocket_support.style.color=green;
        websocket_support.innerHTML='WebSocket is supported.';
    }else{
        websocket_support.style.color=red;
        websocket_support.innerHTML='WebSocket is not supported.';
    };
    let json_support=document.getElementById('json_support')
    json_support.style.display='block';
    if(window.JSON){
        json_support.style.color=green;
        json_support.innerHTML='Native JSON is supported.';
    }else{
        json_support.style.color=red;
        json_support.innerHTML='Native JSON is not supported.';
    };
    let filereader_support=document.getElementById('filereader_support');
    filereader_support.style.display='block';
    if(window.FileReader){
        filereader_support.style.color=green;
        filereader_support.innerHTML='FileReader is supported.';
    }else{
        filereader_support.style.color=red;
        filereader_support.innerHTML='FileReader is not supported.';
    };
};

function testtag(){
    let node=document.getElementById('progress_tag');
    node.style.display='block';
    node.style.color='#f0f0f0';
}
