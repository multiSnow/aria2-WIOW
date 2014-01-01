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

function testapi(){
    document.getElementById('javascript_support').style.display='block';
    document.getElementById('javascript_support').style.color='#00ff00';
    document.getElementById('javascript_support').innerHTML='External JavaScript is supported.';
    document.getElementById('websocket_support').style.display='block';
    if(window.WebSocket){
        document.getElementById('websocket_support').style.color='#00ff00';
        document.getElementById('websocket_support').innerHTML='WebSocket is supported.';
    }else{
        return 1;
    };
    document.getElementById('json_support').style.display='block';
    if(window.JSON){
        document.getElementById('json_support').style.color='#00ff00';
        document.getElementById('json_support').innerHTML='Native JSON is supported.';
    }else{
        return 1;
    };
    document.getElementById('filereader_support').style.display='block';
    if(window.FileReader){
        document.getElementById('filereader_support').style.color='#00ff00';
        document.getElementById('filereader_support').innerHTML='FileReader is supported.';
    };
};

function testtag(){
    document.getElementById('progress_tag').style.display='block';
    document.getElementById('progress_tag').style.color='#f0f0f0';
}
