function pausecanvas(){
    var pause_icon=document.getElementById('pause_icon').getContext('2d');
    pause_icon.fillStyle="#FF0000";
    pause_icon.fillRect(0,0,7,16);
    pause_icon.fillRect(9,0,16,16);
};

function showcanvas(){
    pausecanvas()
    return 0;
}
