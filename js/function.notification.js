function notification(input_json){
    document.getElementById('notification').style.display='block';
    document.getElementById('notification').innerHTML=JSON.stringify(input_json)+'<br/>'+document.getElementById('notification').innerHTML;
    return 0;
};
