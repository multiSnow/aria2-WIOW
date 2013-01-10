//pattern:
//{'option-name':[function_to_due_with_the_type_of_value,
//                boolean(used_in_add),
//                boolean(used_in_single),
//                boolean(used_in_single_basic),
//                boolean(used_in_single_bt),
//                boolean(used_in_global)]}

function option_name_process(input_string){
    return input_string.split('_')
};

function func_boolean(element){
    var [method,place,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById([method,place].join('_')).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById([method,place].join('_')).innerHTML);
    json_option_cache[option]=String(element.checked);
    document.getElementById([method,place].join('_')).innerHTML=JSON.stringify(json_option_cache);
    return 0;
};

function func_str(element){
    var [method,place,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById([method,place].join('_')).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById([method,place].join('_')).innerHTML);
    json_option_cache[option]=(element.value==='')?undefined:element.value;
    document.getElementById([method,place].join('_')).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_int(element){
    var [method,place,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById([method,place].join('_')).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById([method,place].join('_')).innerHTML);
    json_option_cache[option]=(element.value==='')?undefined:element.value;
    document.getElementById([method,place].join('_')).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_sel(element){
    var [method,place,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById([method,place].join('_')).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById([method,place].join('_')).innerHTML);
    json_option_cache[option]=(element.value==='')?undefined:element.value;
    document.getElementById([method,place].join('_')).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_speed(element){
    var [method,place,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById([method,place].join('_')).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById([method,place].join('_')).innerHTML);
    json_option_cache[option]=(element.value==='')?undefined:element.value;
    document.getElementById([method,place].join('_')).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_size(element){
    var [method,place,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById([method,place].join('_')).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById([method,place].join('_')).innerHTML);
    json_option_cache[option]=(element.value==='')?undefined:element.value;
    document.getElementById([method,place].join('_')).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_checksum(element){
    var [method,place,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    var type_element=document.getElementById([method,place,option,'type'].join('_'));
    var digest_element=document.getElementById([method,place,option,'digest'].join('_'));
    json_option_cache=(document.getElementById([method,place].join('_')).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById([method,place].join('_')).innerHTML);
    json_option_cache[option]=(digest_element.value==='')?undefined:[type_element.value,digest_element.value].join('=');
    document.getElementById([method,place].join('_')).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_header(element){
    var [method,place,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    var header_count=Number(document.getElementById([method,place,option].join('_')).value);
    var header_list_element=document.getElementById([method,place,option,'list'].join('_'));
    var header_exist=header_list_element.childNodes.length;
    json_option_cache=(document.getElementById([method,place].join('_')).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById([method,place].join('_')).innerHTML);
    if(header_count===0){
        json_option_cache[option]=undefined;
    }
    else{
        if(header_exist>header_count){
            for(var i=header_count;i<header_exist;i++){
                header_list_element.removeChild(header_list_element.childNodes[header_count]);
            };}
        else{
            for(var i=header_exist;i<header_count;i++){
                var new_node=document.createElement('li');
                var new_input_node=document.createElement('input');
                new_input_node.id=[method,place,option,'string'].join('_');
                new_input_node.setAttribute('onchange',"option_dict[this.id.split('_')[2]][0](this)");
                new_input_node.setAttribute('type','text');
                new_node.appendChild(new_input_node)
                header_list_element.appendChild(new_node);
            };};
        var header_value=new Array();
        for(var i=0;i<header_list_element.childNodes.length;i++){
            if(header_list_element.childNodes[i].childNodes[0].value!=''){
                header_value.push(header_list_element.childNodes[i].childNodes[0].value);
            };};
        json_option_cache[option]=(header_value.length===0)?undefined:header_value;
    };
    document.getElementById([method,place].join('_')).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_select_file(element){
    var [method,place,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById([method,place].join('_')).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById([method,place].join('_')).innerHTML);
    json_option_cache[option]=(element.value==='')?undefined:element.value;
    document.getElementById([method,place].join('_')).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_bt_prioritize_piece(element){
    var [method,place,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    var bpp_value=new Array();
    var bpp_head_element=document.getElementById([method,place,option,'head'].join('_'));
    var bpp_tail_element=document.getElementById([method,place,option,'tail'].join('_'));
    if(bpp_head_element.value!=''){bpp_value.push(['head',bpp_head_element.value].join('='));};
    if(bpp_tail_element.value!=''){bpp_value.push(['tail',bpp_tail_element.value].join('='));};
    json_option_cache[option]=(bpp_value.length===0)?undefined:bpp_value.join(',');
    document.getElementById([method,place].join('_')).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_index_out(element){
    alert('Function to add this option is not complete yet.')
    return 0
};

option_dict={"dir":[func_str,true,true,false,false,true],
             "check-integrity":[func_boolean,true,true,false,false,true],
             "continue":[func_boolean,true,true,false,false,true],
             "all-proxy":[func_str,true,true,false,false,true],
             "all-proxy-user":[func_str,true,true,false,false,true],
             "all-proxy-passwd":[func_str,true,true,false,false,true],
             "checksum":[func_checksum,true,true,false,false,false],
             "connect-timeout":[func_int,true,true,false,false,true],
             "dry-run":[func_boolean,true,false,false,false,true],
             "lowest-speed-limit":[func_speed,true,true,false,false,true],
             "max-connection-per-server":[func_int,true,true,false,false,true],
             "max-file-not-found":[func_int,true,true,false,false,true],
             "max-tries":[func_int,true,true,false,false,true],
             "min-split-size":[func_size,true,true,false,false,true],
             "no-netrc":[func_boolean,true,true,false,false,true],
             "no-proxy":[func_boolean,true,true,false,false,true],
             "out":[func_str,true,true,false,false,false],
             "proxy-method":[func_sel,true,true,false,false,true],
             "remote-time":[func_boolean,true,true,false,false,true],
             "reuse-uri":[func_boolean,true,true,false,false,true],
             "retry-wait":[func_int,true,true,false,false,true],
             "split":[func_int,true,true,false,false,true],
             "stream-piece-selector":[func_sel,true,true,false,false,true],
             "timeout":[func_int,true,true,false,false,true],
             "uri-selector":[func_sel,true,true,false,false,true],
             "http-accept-gzip":[func_boolean,true,true,false,false,true],
             "http-auth-challenge":[func_boolean,true,true,false,false,true],
             "http-no-cache":[func_boolean,true,true,false,false,true],
             "http-user":[func_str,true,true,false,false,true],
             "http-passwd":[func_str,true,true,false,false,true],
             "http-proxy":[func_str,true,true,false,false,true],
             "http-proxy-user":[func_str,true,true,false,false,true],
             "http-proxy-passwd":[func_str,true,true,false,false,true],
             "https-proxy":[func_str,true,true,false,false,true],
             "https-proxy-user":[func_str,true,true,false,false,true],
             "https-proxy-passwd":[func_str,true,true,false,false,true],
             "referer":[func_str,true,true,false,false,true],
             "enable-http-keep-alive":[func_boolean,true,true,false,false,true],
             "enable-http-pipelining":[func_boolean,true,true,false,false,true],
             "header":[func_header,true,true,false,false,true],
             "use-head":[func_boolean,true,true,false,false,true],
             "user-agent":[func_str,true,true,false,false,true],
             "ftp-user":[func_str,true,true,false,false,true],
             "ftp-passwd":[func_str,true,true,false,false,true],
             "ftp-pasv":[func_boolean,true,true,false,false,true],
             "ftp-proxy":[func_str,true,true,false,false,true],
             "ftp-proxy-user":[func_str,true,true,false,false,true],
             "ftp-proxy-passwd":[func_str,true,true,false,false,true],
             "ftp-type":[func_sel,true,true,false,false,true],
             "ftp-reuse-connection":[func_boolean,true,true,false,false,true],
             "select-file":[func_select_file,true,true,false,false,false],
             "bt-enable-lpd":[func_boolean,true,true,false,false,true],
             "bt-exclude-tracker":[func_str,true,true,false,false,true],
             "bt-external-ip":[func_str,true,true,false,false,true],
             "bt-hash-check-seed":[func_boolean,true,true,false,false,true],
             "bt-max-open-files":[func_int,true,true,false,false,true],
             "bt-max-peers":[func_int,true,false,false,true,true],
             "bt-metadata-only":[func_boolean,true,true,false,false,true],
             "bt-min-crypto-level":[func_sel,true,true,false,false,true],
             "bt-prioritize-piece":[func_bt_prioritize_piece,true,true,false,false,true],
             "bt-remove-unselected-file":[func_boolean,true,false,false,true,true],
             "bt-request-peer-speed-limit":[func_speed,true,false,false,true,true],
             "bt-require-crypto":[func_boolean,true,true,false,false,true],
             "bt-save-metadata":[func_boolean,true,true,false,false,true],
             "bt-seed-unverified":[func_boolean,true,true,false,false,true],
             "bt-stop-timeout":[func_int,true,true,false,false,true],
             "bt-tracker":[func_str,true,true,false,false,true],
             "bt-tracker-connect-timeout":[func_int,true,true,false,false,true],
             "bt-tracker-interval":[func_int,true,true,false,false,true],
             "bt-tracker-timeout":[func_int,,true,true,false,false,true],
             "enable-peer-exchange":[func_boolean,true,true,false,false,true],
             "follow-torrent":[func_sel,true,true,false,false,true],
             "index-out":[func_index_out,true,true,false,false,false],
             "max-upload-limit":[func_size,true,false,true,false,true],
             "seed-ratio":[func_int,true,true,false,false,true],
             "seed-time":[func_int,true,true,false,false,true],
             "follow-metalink":[func_sel,true,true,false,false,true],
             "metalink-base-uri":[func_str,true,false,false,false,true],
             "metalink-language":[func_str,true,true,false,false,true],
             "metalink-location":[func_str,true,true,false,false,true],
             "metalink-os":[func_str,true,true,false,false,true],
             "metalink-version":[func_str,true,true,false,false,true],
             "metalink-preferred-protocol":[func_sel,true,true,false,false,true],
             "metalink-enable-unique-protocol":[func_boolean,true,true,false,false,true],
             "pause":[func_boolean,true,false,false,false,false],
             "allow-overwrite":[func_boolean,true,true,false,false,true],
             "allow-piece-length-change":[func_boolean,true,true,false,false,true],
             "always-resume":[func_boolean,true,true,false,false,true],
             "async-dns":[func_boolean,true,true,false,false,true],
             "auto-file-renaming":[func_boolean,true,true,false,false,true],
             "conditional-get":[func_boolean,true,true,false,false,true],
             "enable-async-dns6":[func_boolean,true,true,false,false,true],
             "enable-mmap":[func_boolean,true,true,false,false,true],
             "file-allocation":[func_sel,true,true,false,false,true],
             "hash-check-only":[func_boolean,true,true,false,false,true],
             "max-resume-failure-tries":[func_int,true,true,false,false,true],
             "no-file-allocation-limit":[func_size,true,true,false,false,true],
             "piece-length":[func_size,true,false,false,false,true],
             "max-download-limit":[func_speed,true,false,true,false,true],
             "parameterized-uri":[func_boolean,true,false,false,false,true],
             "realtime-chunk-checksum":[func_boolean,true,true,false,false,true],
             "remove-control-file":[func_boolean,true,true,false,false,true],
             "log":[func_str,false,false,false,false,true],
             "max-concurrent-downloads":[func_int,false,false,false,false,true],
             "server-stat-of":[func_str,false,false,false,false,true],
             "save-cookies":[func_str,false,false,false,false,true],
             "max-overall-upload-limit":[func_speed,false,false,false,false,true],
             "download-result":[func_sel,false,false,false,false,true],
             "max-download-result":[func_int,false,false,false,false,true],
             "log-level":[func_sel,false,false,false,false,true],
             "max-overall-download-limit":[func_speed,false,false,false,false,true],
             "save-session":[func_str,false,false,false,false,true]}
