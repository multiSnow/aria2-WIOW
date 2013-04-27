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

function pausecanvas(node){
    var icon=node.getContext('2d');
    node.width=16;
    node.height=16;
    icon.fillStyle='#ffff00';
    icon.fillRect(0,0,6.5,16);
    icon.fillRect(9.5,0,16,16);
    return 0;
};

function unpausecanvas(node){
    var icon=node.getContext('2d')
    node.width=16;
    node.height=16;
    icon.fillStyle='#00ff00';
    icon.beginPath();
    icon.moveTo(1,1);
    icon.lineTo(1,15);
    icon.lineTo(15,8);
    icon.closePath();
    icon.fill();
    return 0;
};

function removecanvas(node){
    var icon=node.getContext('2d');
    node.width=16;
    node.height=16;
    icon.fillStyle='#ff0000';
    icon.setTransform(1,1,-1,1,8,-8);
    icon.fillRect(0,6,16,4);
    icon.fillRect(6,0,4,16);
    return 0;
};

function optioncanvas(node){
    var icon=node.getContext('2d');
    node.width=16;
    node.height=16;
    icon.fillStyle='#a0a0a0';
    icon.fillStyle='#ff0000';
    icon.fillStyle='#a0a0a0';
    icon.translate(8,8);
    icon.beginPath();
    icon.arc(0,0,6,0,2*Math.PI);
    icon.fill();
    for(var i=0;i<12;i++){
        icon.rotate(Math.PI/6);
        icon.fillRect(0,-1,8,2);
    };
    icon.beginPath();
    icon.globalCompositeOperation='destination-out';
    icon.arc(0,0,3,0,2*Math.PI);
    icon.fill();
    return 0;
};
