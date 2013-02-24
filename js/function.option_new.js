//pattern:
//{'option-name':[function_to_show_the_type_of_value,
//                function_to_cache_the_type_of_value,
//                boolean(used_in_add),
//                boolean(used_in_single),
//                boolean(used_in_single_basic),
//                boolean(used_in_single_bt),
//                boolean(used_in_global)]}

function option_name_process(input_string){
    return input_string.split('_')
};

function func_show_boolean(name,value,place){
    document.getElementById([place,name].join('_')).checked=value.valueOf()
    return 0;
};

function func_cache_boolean(element){
    var [method,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById(method).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById(method).innerHTML);
    json_option_cache[option]=element.checked.toString();
    document.getElementById(method).innerHTML=JSON.stringify(json_option_cache);
    return 0;
};

function func_show_str(name,value,place){
    document.getElementById([place,name].join('_')).value=value;
    return 0;
};

function func_cache_str(element){
    var [method,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById(method).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById(method).innerHTML);
    json_option_cache[option]=(element.value==='')?undefined:element.value;
    document.getElementById(method).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_show_int(name,value,place){
    document.getElementById([place,name].join('_')).value=value;
    return 0;
};

function func_cache_int(element){
    var [method,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById(method).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById(method).innerHTML);
    json_option_cache[option]=(element.value==='')?undefined:element.value;
    document.getElementById(method).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_show_sel(name,value,place){
    document.getElementById([place,name].join('_')).value=value;
    return 0;
};

function func_cache_sel(element){
    var [method,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById(method).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById(method).innerHTML);
    json_option_cache[option]=(element.value==='')?undefined:element.value;
    document.getElementById(method).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_show_speed(name,value,place){
    document.getElementById([place,name].join('_')).value=value
    return 0;
};

function func_cache_speed(element){
    var [method,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById(method).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById(method).innerHTML);
    json_option_cache[option]=(element.value==='')?undefined:element.value;
    document.getElementById(method).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_show_size(name,value,place){
    document.getElementById([place,name].join('_')).value=value
    return 0;
};

function func_cache_size(element){
    var [method,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById(method).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById(method).innerHTML);
    json_option_cache[option]=(element.value==='')?undefined:element.value;
    document.getElementById(method).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_show_checksum(name,value,place){
    [type_value,digest_value]=value.split('_');
    document.getElementById([place,name,'type'].join('_')).value=type_value;
    document.getElementById([place,name,'digest'].join('_')).value=digest_value;
    return 0;
};

function func_cache_checksum(element){
    var [method,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    var type_element=document.getElementById([method,option,'type'].join('_'));
    var digest_element=document.getElementById([method,option,'digest'].join('_'));
    json_option_cache=(document.getElementById(method).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById(method).innerHTML);
    json_option_cache[option]=(digest_element.value==='')?undefined:[type_element.value,digest_element.value].join('=');
    document.getElementById(method).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_show_header(name,value,place){
    document.getElementById([place,name].join('_')).value=value;
    return 0;
};

function func_cache_header(element){
    var [method,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    var header_count=Number(document.getElementById([method,option].join('_')).value);
    var header_list_element=document.getElementById([method,option,'list'].join('_'));
    var header_exist=header_list_element.childNodes.length;
    json_option_cache=(document.getElementById(method).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById(method).innerHTML);
    if(header_count===0){
        json_option_cache[option]=undefined;
    }else{
        if(header_exist>header_count){
            for(var i=header_count;i<header_exist;i++){
                header_list_element.removeChild(header_list_element.childNodes[header_count]);
            };
        }else{
            for(var i=header_exist;i<header_count;i++){
                var new_node=document.createElement('li');
                var new_input_node=document.createElement('input');
                new_input_node.id=[method,option,'string'].join('_');
                new_input_node.setAttribute('onchange',"option_dict[this.id.split('_')[1]][1](this)");
                new_input_node.setAttribute('type','text');
                new_node.appendChild(new_input_node)
                header_list_element.appendChild(new_node);
            };
        };
        var header_value=new Array();
        for(var i=0;i<header_list_element.childNodes.length;i++){
            if(header_list_element.childNodes[i].childNodes[0].value!=''){
                header_value.push(header_list_element.childNodes[i].childNodes[0].value);
            };
        };
        json_option_cache[option]=(header_value.length===0)?undefined:header_value;
    };
    document.getElementById(method).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_show_select_file(name,value,place){
    document.getElementById([place,name].join('_')).value=value;
    return 0
};

function func_cache_select_file(element){
    var [method,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    json_option_cache=(document.getElementById(method).innerHTML==='')?JSON.parse('{}'):JSON.parse(document.getElementById(method).innerHTML);
    json_option_cache[option]=(element.value==='')?undefined:element.value;
    document.getElementById(method).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_show_bt_prioritize_piece(name,value,place){
    value_list=value.split(',')
    for(var i=0;i<value_list.length;i++){
        if(str.match(/^head=/)){
            document.getElementById([place,name,'head'].join('_')).value=value_list[i].replace(/^head=/,'');
            break;
        };
        if(str.match(/^tail=/)){
            document.getElementById([place,name,'tail'].join('_')).value=value_list[i].replace(/^tail=/,'');
            break;
        };
    };
    return 0
};

function func_cache_bt_prioritize_piece(element){
    var [method,option]=option_name_process(element.id);
    var json_option_cache=new Object();
    var bpp_value=new Array();
    var bpp_head_element=document.getElementById([method,option,'head'].join('_'));
    var bpp_tail_element=document.getElementById([method,option,'tail'].join('_'));
    if(bpp_head_element.value!=''){bpp_value.push(['head',bpp_head_element.value].join('='));};
    if(bpp_tail_element.value!=''){bpp_value.push(['tail',bpp_tail_element.value].join('='));};
    json_option_cache[option]=(bpp_value.length===0)?undefined:bpp_value.join(',');
    document.getElementById(method).innerHTML=JSON.stringify(json_option_cache);
    return 0
};

function func_show_index_out(name,value,place){
    document.getElementById([place,name].join('_')).value=value;
    return 0;
};

function func_cache_index_out(element){
    alert('Function to add this option is not complete yet.')
    return 0
};

option_dict={"dir":[func_show_str,func_cache_str,true,true,false,false,true],
             "check-integrity":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "continue":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "all-proxy":[func_show_str,func_cache_str,true,true,false,false,true],
             "all-proxy-user":[func_show_str,func_cache_str,true,true,false,false,true],
             "all-proxy-passwd":[func_show_str,func_cache_str,true,true,false,false,true],
             "checksum":[func_show_checksum,func_cache_checksum,true,true,false,false,false],
             "connect-timeout":[func_show_int,func_cache_int,true,true,false,false,true],
             "dry-run":[func_show_boolean,func_cache_boolean,true,false,false,false,true],
             "lowest-speed-limit":[func_show_speed,func_cache_speed,true,true,false,false,true],
             "max-connection-per-server":[func_show_int,func_cache_int,true,true,false,false,true],
             "max-file-not-found":[func_show_int,func_cache_int,true,true,false,false,true],
             "max-tries":[func_show_int,func_cache_int,true,true,false,false,true],
             "min-split-size":[func_show_size,func_cache_size,true,true,false,false,true],
             "no-netrc":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "no-proxy":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "out":[func_show_str,func_cache_str,true,true,false,false,false],
             "proxy-method":[func_show_sel,func_cache_sel,true,true,false,false,true],
             "remote-time":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "reuse-uri":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "retry-wait":[func_show_int,func_cache_int,true,true,false,false,true],
             "split":[func_show_int,func_cache_int,true,true,false,false,true],
             "stream-piece-selector":[func_show_sel,func_cache_sel,true,true,false,false,true],
             "timeout":[func_show_int,func_cache_int,true,true,false,false,true],
             "uri-selector":[func_show_sel,func_cache_sel,true,true,false,false,true],
             "http-accept-gzip":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "http-auth-challenge":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "http-no-cache":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "http-user":[func_show_str,func_cache_str,true,true,false,false,true],
             "http-passwd":[func_show_str,func_cache_str,true,true,false,false,true],
             "http-proxy":[func_show_str,func_cache_str,true,true,false,false,true],
             "http-proxy-user":[func_show_str,func_cache_str,true,true,false,false,true],
             "http-proxy-passwd":[func_show_str,func_cache_str,true,true,false,false,true],
             "https-proxy":[func_show_str,func_cache_str,true,true,false,false,true],
             "https-proxy-user":[func_show_str,func_cache_str,true,true,false,false,true],
             "https-proxy-passwd":[func_show_str,func_cache_str,true,true,false,false,true],
             "referer":[func_show_str,func_cache_str,true,true,false,false,true],
             "enable-http-keep-alive":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "enable-http-pipelining":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "header":[func_show_header,func_cache_header,true,true,false,false,true],
             "use-head":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "user-agent":[func_show_str,func_cache_str,true,true,false,false,true],
             "ftp-user":[func_show_str,func_cache_str,true,true,false,false,true],
             "ftp-passwd":[func_show_str,func_cache_str,true,true,false,false,true],
             "ftp-pasv":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "ftp-proxy":[func_show_str,func_cache_str,true,true,false,false,true],
             "ftp-proxy-user":[func_show_str,func_cache_str,true,true,false,false,true],
             "ftp-proxy-passwd":[func_show_str,func_cache_str,true,true,false,false,true],
             "ftp-type":[func_show_sel,func_cache_sel,true,true,false,false,true],
             "ftp-reuse-connection":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "select-file":[func_show_select_file,func_cache_select_file,true,true,false,false,false],
             "bt-enable-lpd":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "bt-exclude-tracker":[func_show_str,func_cache_str,true,true,false,false,true],
             "bt-external-ip":[func_show_str,func_cache_str,true,true,false,false,true],
             "bt-hash-check-seed":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "bt-max-open-files":[func_show_int,func_cache_int,true,true,false,false,true],
             "bt-max-peers":[func_show_int,func_cache_int,true,false,false,true,true],
             "bt-metadata-only":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "bt-min-crypto-level":[func_show_sel,func_cache_sel,true,true,false,false,true],
             "bt-prioritize-piece":[func_show_bt_prioritize_piece,func_cache_bt_prioritize_piece,true,true,false,false,true],
             "bt-remove-unselected-file":[func_show_boolean,func_cache_boolean,true,false,false,true,true],
             "bt-request-peer-speed-limit":[func_show_speed,func_cache_speed,true,false,false,true,true],
             "bt-require-crypto":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "bt-save-metadata":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "bt-seed-unverified":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "bt-stop-timeout":[func_show_int,func_cache_int,true,true,false,false,true],
             "bt-tracker":[func_show_str,func_cache_str,true,true,false,false,true],
             "bt-tracker-connect-timeout":[func_show_int,func_cache_int,true,true,false,false,true],
             "bt-tracker-interval":[func_show_int,func_cache_int,true,true,false,false,true],
             "bt-tracker-timeout":[func_show_int,func_cache_int,,true,true,false,false,true],
             "enable-peer-exchange":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "follow-torrent":[func_show_sel,func_cache_sel,true,true,false,false,true],
             "index-out":[func_show_index_out,func_cache_index_out,true,true,false,false,false],
             "max-upload-limit":[func_show_size,func_cache_size,true,false,true,false,true],
             "seed-ratio":[func_show_int,func_cache_int,true,true,false,false,true],
             "seed-time":[func_show_int,func_cache_int,true,true,false,false,true],
             "follow-metalink":[func_show_sel,func_cache_sel,true,true,false,false,true],
             "metalink-base-uri":[func_show_str,func_cache_str,true,false,false,false,true],
             "metalink-language":[func_show_str,func_cache_str,true,true,false,false,true],
             "metalink-location":[func_show_str,func_cache_str,true,true,false,false,true],
             "metalink-os":[func_show_str,func_cache_str,true,true,false,false,true],
             "metalink-version":[func_show_str,func_cache_str,true,true,false,false,true],
             "metalink-preferred-protocol":[func_show_sel,func_cache_sel,true,true,false,false,true],
             "metalink-enable-unique-protocol":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "pause":[func_show_boolean,func_cache_boolean,true,false,false,false,false],
             "allow-overwrite":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "allow-piece-length-change":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "always-resume":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "async-dns":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "auto-file-renaming":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "conditional-get":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "enable-async-dns6":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "enable-mmap":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "file-allocation":[func_show_sel,func_cache_sel,true,true,false,false,true],
             "hash-check-only":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "max-resume-failure-tries":[func_show_int,func_cache_int,true,true,false,false,true],
             "no-file-allocation-limit":[func_show_size,func_cache_size,true,true,false,false,true],
             "piece-length":[func_show_size,func_cache_size,true,false,false,false,true],
             "max-download-limit":[func_show_speed,func_cache_speed,true,false,true,false,true],
             "parameterized-uri":[func_show_boolean,func_cache_boolean,true,false,false,false,true],
             "realtime-chunk-checksum":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "remove-control-file":[func_show_boolean,func_cache_boolean,true,true,false,false,true],
             "log":[func_show_str,func_cache_str,false,false,false,false,true],
             "max-concurrent-downloads":[func_show_int,func_cache_int,false,false,false,false,true],
             "server-stat-of":[func_show_str,func_cache_str,false,false,false,false,true],
             "save-cookies":[func_show_str,func_cache_str,false,false,false,false,true],
             "max-overall-upload-limit":[func_show_speed,func_cache_speed,false,false,false,false,true],
             "download-result":[func_show_sel,func_cache_sel,false,false,false,false,true],
             "max-download-result":[func_show_int,func_cache_int,false,false,false,false,true],
             "log-level":[func_show_sel,func_cache_sel,false,false,false,false,true],
             "max-overall-download-limit":[func_show_speed,func_cache_speed,false,false,false,false,true],
             "save-session":[func_show_str,func_cache_str,false,false,false,false,true],
             "save-session-interval":[func_show_int,func_cache_int,false,false,false,false,true]}

function global_show_option(input_data){
    for(var name in option_dict){
        if(input_data[name]===undefined){
            continue;
        };
        if(option_dict[name][6]){
            option_dict[name][0](name,input_data[name],'globalcache')
        };
    };
    return 0;
};

function add_show_option(input_data){
    for(var name in option_dict){
        if(input_data[name]===undefined){
            continue;
        };
        if(option_dict[name][2]){
            option_dict[name][0](name,input_data[name],'addcache')
        };
    };
    return 0;
};
