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

//pattern:
//{'option-name':[function_to_show_the_type_of_value,
//                function_to_cache_the_type_of_value,
//                function_to_clean_the_type_of_value,
//                boolean(used_in_add),
//                boolean(used_in_single),
//                boolean(used_in_single_basic),
//                boolean(used_in_single_bt),
//                boolean(used_in_global)]}

function cache_update(method,option,value){
    try{
        var json_option_cache=JSON.parse(document.getElementById(method).innerHTML);
    }catch(e){
        var json_option_cache=new Object();
    };
    json_option_cache[option]=value;
    document.getElementById(method).innerHTML=JSON.stringify(json_option_cache);
};

function func_show_boolean(name,value,place){
    document.getElementById([place,name].join('_')).checked=value.valueOf();
    return 0;
};

function func_cache_boolean(element){
    return (function(v){cache_update(v[0],v[1],element.checked.toString());})(element.id.split('_'));
};

function func_clean_boolean(name,place){
    document.getElementById([place,name].join('_')).checked='false';
    return 0;
};

function func_show_str(name,value,place){
    document.getElementById([place,name].join('_')).value=value;
    return 0;
};

function func_cache_str(element){
    return (function(v){cache_update(v[0],v[1],(element.value==='')?undefined:element.value);})(element.id.split('_'));
};

function func_clean_str(name,place){
    document.getElementById([place,name].join('_')).value='';
    return 0;
};

function func_show_int(name,value,place){
    document.getElementById([place,name].join('_')).value=value;
    return 0;
};

function func_cache_int(element){
    return (function(v){cache_update(v[0],v[1],(element.value==='')?undefined:element.value);})(element.id.split('_'));
};

function func_clean_int(name,place){
    document.getElementById([place,name].join('_')).value='';
    return 0;
};

function func_show_sel(name,value,place){
    document.getElementById([place,name].join('_')).value=value;
    return 0;
};

function func_cache_sel(element){
    return (function(v){cache_update(v[0],v[1],(element.value==='')?undefined:element.value);})(element.id.split('_'));
};

function func_clean_sel(name,place){
    document.getElementById([place,name].join('_')).value='';
    return 0;
};

function func_show_speed(name,value,place){
    document.getElementById([place,name].join('_')).value=value;
    return 0;
};

function func_cache_speed(element){
    return (function(v){cache_update(v[0],v[1],(element.value==='')?undefined:element.value);})(element.id.split('_'));
};

function func_clean_speed(name,place){
    document.getElementById([place,name].join('_')).value='';
    return 0;
};

function func_show_size(name,value,place){
    document.getElementById([place,name].join('_')).value=value;
    return 0;
};

function func_cache_size(element){
    return (function(v){cache_update(v[0],v[1],(element.value==='')?undefined:element.value);})(element.id.split('_'));
};

function func_clean_size(name,place){
    document.getElementById([place,name].join('_')).value='';
    return 0;
};

function func_show_checksum(name,value,place){
    (function(v){
        document.getElementById([place,name,'type'].join('_')).value=v[0];
        document.getElementById([place,name,'digest'].join('_')).value=v[1];
    })(value.split('_'));
};

function func_cache_checksum(element){
    var method,option;
    (function(v){method=v[0];option=v[1];})(element.id.split('_'));
    var type=document.getElementById([method,option,'type'].join('_')).value;
    var digest=document.getElementById([method,option,'digest'].join('_')).value;
    return cache_update(method,option,(digest==='')?undefined:[type,digest].join('='));
};

function func_clean_checksum(name,place){
    document.getElementById([place,name,'type'].join('_')).value='';
    document.getElementById([place,name,'digest'].join('_')).value='';
    return 0;
};

function func_show_header(name,value,place){
    var header_list=new Array();
    var header_raw_list=value.split('\n');
    for(let header of header_raw_list){
        if(header){
            header_list.push(header)
        };
    };
    var header_list_element=document.getElementById([place,name,'list'].join('_'));
    document.getElementById([place,name].join('_')).value=header_list.length;
    for(let header of header_list){
        var new_node=document.createElement('li');
        var new_input_node=document.createElement('input');
        new_input_node.id=[place,name,'string'].join('_');
        setattr(new_input_node,'onchange',"option_dict[this.id.split('_')[1]][1](this)");
        setattr(new_input_node,'oninput',"autoinputsize(this)");
        setattr(new_input_node,'type','text');
        new_input_node.value=header;
        new_node.appendChild(new_input_node)
        header_list_element.appendChild(new_node);
    };
    return 0;
};

function func_cache_header(element){
    var method,option;
    (function(v){method=v[0];option=v[1];})(element.id.split('_'));
    var header_count=Number(document.getElementById([method,option].join('_')).value);
    var header_list_element=document.getElementById([method,option,'list'].join('_'));
    var header_exist=header_list_element.childNodes.length;
    if(header_count===0){
        header_list_element.innerHTML='';
        return cache_update(method,option,undefined);
    }else{
        if(header_exist>header_count){
            for(let i=header_count;i<header_exist;i++){
                header_list_element.removeChild(header_list_element.childNodes[header_count]);
            };
        }else{
            for(let i=header_exist;i<header_count;i++){
                var new_node=document.createElement('li');
                var new_input_node=document.createElement('input');
                new_input_node.id=[method,option,'string'].join('_');
                setattr(new_input_node,'onchange',"option_dict[this.id.split('_')[1]][1](this)");
                setattr(new_input_node,'oninput',"autoinputsize(this)");
                setattr(new_input_node,'type','text');
                new_node.appendChild(new_input_node)
                header_list_element.appendChild(new_node);
            };
        };
        var header_value=new Array();
        for(let i=0;i<header_list_element.childNodes.length;i++){
            if(header_list_element.childNodes[i].childNodes[0].value!=''){
                header_value.push(header_list_element.childNodes[i].childNodes[0].value);
            };
        };
        return cache_update(method,option,(header_value.length===0)?undefined:header_value);
    };
};

function func_clean_header(name,place){
    document.getElementById([place,name].join('_')).innerHTML='0';
    document.getElementById([place,name,'list'].join('_')).innerHTML='';
    return 0;
};

function func_show_select_file(name,value,place){
    document.getElementById([place,name].join('_')).value=value;
    return 0
};

function func_cache_select_file(element){
    return (function(v){cache_update(v[0],v[1],(element.value==='')?undefined:element.value);})(element.id.split('_'));
};

function func_clean_select_file(name,place){
    document.getElementById([place,name].join('_')).value='';
    return 0
};

function func_show_bt_prioritize_piece(name,value,place){
    var value_list=value.split(',')
    for(let i=0;i<value_list.length;i++){
        if(str.match(/^head=/)){
            document.getElementById([place,name,'head'].join('_')).value=value_list[i].replace(/^head=/,'');
        }else if(str.match(/^tail=/)){
            document.getElementById([place,name,'tail'].join('_')).value=value_list[i].replace(/^tail=/,'');
        };
    };
    return 0
};

function func_cache_bt_prioritize_piece(element){
    var method,option;
    (function(v){method=v[0];option=v[1];})(element.id.split('_'));
    var bpp_value=new Array();
    var bpp_head=document.getElementById([method,option,'head'].join('_')).value;
    var bpp_tail=document.getElementById([method,option,'tail'].join('_')).value;
    if(bpp_head!=''){bpp_value.push(['head',bpp_head].join('='));};
    if(bpp_tail!=''){bpp_value.push(['tail',bpp_tail].join('='));};
    return cache_update(method,option,(bpp_value.length===0)?undefined:bpp_value.join(','));
};

function func_clean_bt_prioritize_piece(name,place){
    document.getElementById([place,name,'head'].join('_')).value='';
    document.getElementById([place,name,'tail'].join('_')).value='';
    return 0
};

function func_show_index_out(name,value,place){
    var indexout_list=new Array();
    var indexout_raw_list=value.split('\n');
    for(let indexout of indexout_raw_list){
        if(indexout){
            indexout_list.push(indexout)
        };
    };
    var indexout_list_element=document.getElementById([place,name,'list'].join('_'));
    document.getElementById([place,name].join('_')).value=indexout_list.length;
    for(let indexout of indexout_list){
        var new_node=document.createElement('li');
        var new_node_index=document.createElement('input');
        var new_node_out=document.createElement('input');
        (function(v){
            new_node_index.value=v[0];
            new_node_out.value=v[1];
        })(indexout.split('='));
        new_node_index.id=[place,name,'index'].join('_');
        setattr(new_node_index,'onchange',"option_dict[this.id.split('_')[1]][1](this)");
        setattr(new_node_index,'oninput',"autoinputsize(this)");
        setattr(new_node_index,'type','number');
        new_node_out.id=[place,name,'out'].join('_');
        setattr(new_node_out,'onchange',"option_dict[this.id.split('_')[1]][1](this)");
        setattr(new_node_out,'oninput',"autoinputsize(this)");
        setattr(new_node_out,'type','text');
        new_node.appendChild(new_node_index);
        new_node.appendChild(document.createTextNode('='));
        new_node.appendChild(new_node_out);
        indexout_list_element.appendChild(new_node);
    };
    return 0;
};

function func_cache_index_out(element){
    var method,option;
    (function(v){method=v[0];option=v[1];})(element.id.split('_'));
    var indexout_count=Number(document.getElementById([method,option].join('_')).value);
    var indexout_list_element=document.getElementById([method,option,'list'].join('_'));
    var indexout_exist=indexout_list_element.childNodes.length;
    if(indexout_count===0){
        indexout_list_element.innerHTML='';
        return cache_update(method,option,undefined);
    }else{
        if(indexout_exist>indexout_count){
            for(let i=indexout_count;i<indexout_exist;i++){
                indexout_list_element.removeChild(indexout_list_element.childNodes[indexout_count]);
            };
        }else{
            for(let i=indexout_exist;i<indexout_count;i++){
                var new_node=document.createElement('li');
                var new_node_index=document.createElement('input');
                var new_node_out=document.createElement('input');
                new_node_index.id=[method,option,'index'].join('_');
                setattr(new_node_index,'onchange',"option_dict[this.id.split('_')[1]][1](this)");
                setattr(new_node_index,'oninput',"autoinputsize(this)");
                setattr(new_node_index,'type','number');
                new_node_out.id=[method,option,'out'].join('_');
                setattr(new_node_out,'onchange',"option_dict[this.id.split('_')[1]][1](this)");
                setattr(new_node_out,'oninput',"autoinputsize(this)");
                setattr(new_node_out,'type','text');
                new_node.appendChild(new_node_index);
                new_node.appendChild(document.createTextNode('='));
                new_node.appendChild(new_node_out);
                indexout_list_element.appendChild(new_node);
            };
        };
        var indexout_value=new Array();
        for(let i=0;i<indexout_list_element.childNodes.length;i++){
            if(indexout_list_element.childNodes[i].childNodes[0].value!=''&&indexout_list_element.childNodes[i].childNodes[2].value!=''){
                indexout_value.push(indexout_list_element.childNodes[i].childNodes[0].value+'='+indexout_list_element.childNodes[i].childNodes[2].value);
            };
        };
        return cache_update(method,option,(indexout_value.length===0)?undefined:indexout_value)
    };
};

function func_clean_index_out(name,place){
    document.getElementById([place,name].join('_')).innerHTML='0';
    document.getElementById([place,name,'list'].join('_')).innerHTML='';
    return 0;
};

option_dict={"dir":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "check-integrity":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "continue":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "all-proxy":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "all-proxy-user":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "all-proxy-passwd":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "checksum":
             [func_show_checksum,
              func_cache_checksum,
              func_clean_checksum,
              true,
              true,
              false,
              false,
              false],
             "connect-timeout":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "dry-run":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              false,
              false,
              false,
              true],
             "lowest-speed-limit":
             [func_show_speed,
              func_cache_speed,
              func_clean_speed,
              true,
              true,
              false,
              false,
              true],
             "max-connection-per-server":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "max-file-not-found":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "max-tries":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "min-split-size":
             [func_show_size,
              func_cache_size,
              func_clean_size,
              true,
              true,
              false,
              false,
              true],
             "no-netrc":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "no-proxy":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "out":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              false],
             "proxy-method":
             [func_show_sel,
              func_cache_sel,
              func_clean_sel,
              true,
              true,
              false,
              false,
              true],
             "remote-time":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "reuse-uri":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "retry-wait":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "split":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "stream-piece-selector":
             [func_show_sel,
              func_cache_sel,
              func_clean_sel,
              true,
              true,
              false,
              false,
              true],
             "timeout":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "uri-selector":
             [func_show_sel,
              func_cache_sel,
              func_clean_sel,
              true,
              true,
              false,
              false,
              true],
             "http-accept-gzip":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "http-auth-challenge":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "http-no-cache":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "http-user":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "http-passwd":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "http-proxy":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "http-proxy-user":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "http-proxy-passwd":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "https-proxy":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "https-proxy-user":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "https-proxy-passwd":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "referer":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "enable-http-keep-alive":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "enable-http-pipelining":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "header":
             [func_show_header,
              func_cache_header,
              func_clean_header,
              true,
              true,
              false,
              false,
              true],
             "use-head":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "user-agent":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "ftp-user":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "ftp-passwd":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "ftp-pasv":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "ftp-proxy":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "ftp-proxy-user":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "ftp-proxy-passwd":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "ftp-type":
             [func_show_sel,
              func_cache_sel,
              func_clean_sel,
              true,
              true,
              false,
              false,
              true],
             "ftp-reuse-connection":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "select-file":
             [func_show_select_file,
              func_cache_sel,
              func_clean_select_file,
              true,
              true,
              false,
              false,
              false],
             "bt-detach-seed-only":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "bt-enable-lpd":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "bt-exclude-tracker":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "bt-external-ip":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "bt-hash-check-seed":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "bt-max-open-files":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "bt-max-peers":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              false,
              false,
              true,
              true],
             "bt-metadata-only":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "bt-min-crypto-level":
             [func_show_sel,
              func_cache_sel,
              func_clean_sel,
              true,
              true,
              false,
              false,
              true],
             "bt-prioritize-piece":
             [func_show_bt_prioritize_piece,
              func_cache_bt_prioritize_piece,
              func_clean_bt_prioritize_piece,
              true,
              true,
              false,
              false,
              true],
             "bt-remove-unselected-file":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              false,
              false,
              true,
              true],
             "bt-request-peer-speed-limit":
             [func_show_speed,
              func_cache_speed,
              func_clean_speed,
              true,
              false,
              false,
              true,
              true],
             "bt-require-crypto":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "bt-save-metadata":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "bt-seed-unverified":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "bt-stop-timeout":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "bt-tracker":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "bt-tracker-connect-timeout":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "bt-tracker-interval":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "bt-tracker-timeout":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              ,
              true,
              true,
              false,
              false,
              true],
             "enable-peer-exchange":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "follow-torrent":
             [func_show_sel,
              func_cache_sel,
              func_clean_sel,
              true,
              true,
              false,
              false,
              true],
             "index-out":
             [func_show_index_out,
              func_cache_index_out,
              func_clean_index_out,
              true,
              true,
              false,
              false,
              false],
             "max-upload-limit":
             [func_show_size,
              func_cache_size,
              func_clean_size,
              true,
              false,
              true,
              false,
              true],
             "seed-ratio":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "seed-time":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "follow-metalink":
             [func_show_sel,
              func_cache_sel,
              func_clean_sel,
              true,
              true,
              false,
              false,
              true],
             "metalink-base-uri":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              false,
              false,
              false,
              true],
             "metalink-language":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "metalink-location":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "metalink-os":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "metalink-version":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              true,
              true,
              false,
              false,
              true],
             "metalink-preferred-protocol":
             [func_show_sel,
              func_cache_sel,
              func_clean_sel,
              true,
              true,
              false,
              false,
              true],
             "metalink-enable-unique-protocol":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "pause":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              false,
              false,
              false,
              false],
             "allow-overwrite":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "allow-piece-length-change":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "always-resume":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "async-dns":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "auto-file-renaming":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "conditional-get":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "enable-async-dns6":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "enable-mmap":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "file-allocation":
             [func_show_sel,
              func_cache_sel,
              func_clean_sel,
              true,
              true,
              false,
              false,
              true],
             "hash-check-only":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "max-resume-failure-tries":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              true,
              true,
              false,
              false,
              true],
             "no-file-allocation-limit":
             [func_show_size,
              func_cache_size,
              func_clean_size,
              true,
              true,
              false,
              false,
              true],
             "piece-length":
             [func_show_size,
              func_cache_size,
              func_clean_size,
              true,
              false,
              false,
              false,
              true],
             "max-download-limit":
             [func_show_speed,
              func_cache_speed,
              func_clean_speed,
              true,
              false,
              true,
              false,
              true],
             "parameterized-uri":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              false,
              false,
              false,
              true],
             "realtime-chunk-checksum":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "remove-control-file":
             [func_show_boolean,
              func_cache_boolean,
              func_clean_boolean,
              true,
              true,
              false,
              false,
              true],
             "log":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              false,
              false,
              false,
              false,
              true],
             "max-concurrent-downloads":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              false,
              false,
              false,
              false,
              true],
             "server-stat-of":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              false,
              false,
              false,
              false,
              true],
             "save-cookies":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              false,
              false,
              false,
              false,
              true],
             "max-overall-upload-limit":
             [func_show_speed,
              func_cache_speed,
              func_clean_speed,
              false,
              false,
              false,
              false,
              true],
             "download-result":
             [func_show_sel,
              func_cache_sel,
              func_clean_sel,
              false,
              false,
              false,
              false,
              true],
             "max-download-result":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              false,
              false,
              false,
              false,
              true],
             "min-tls-version":
             [func_show_sel,
              func_cache_sel,
              func_clean_sel,
              false,
              false,
              false,
              false,
              true],
             "log-level":
             [func_show_sel,
              func_cache_sel,
              func_clean_sel,
              false,
              false,
              false,
              false,
              true],
             "max-overall-download-limit":
             [func_show_speed,
              func_cache_speed,
              func_clean_speed,
              false,
              false,
              false,
              false,
              true],
             "save-session":
             [func_show_str,
              func_cache_str,
              func_clean_str,
              false,
              false,
              false,
              false,
              true],
             "save-session-interval":
             [func_show_int,
              func_cache_int,
              func_clean_int,
              false,
              false,
              false,
              false,
              true]}

function global_show_option(input_data){
    for(let name in option_dict){
        if(option_dict[name][7]){
            option_dict[name][2](name,'globalcache');
            if(input_data[name]!==undefined){
                option_dict[name][0](name,input_data[name],'globalcache');
            };
        };
    };
    return 0;
};

function add_show_option(input_data){
    for(let name in option_dict){
        if(option_dict[name][3]){
            option_dict[name][2](name,'addcache');
            if(input_data[name]!==undefined){
                option_dict[name][0](name,input_data[name],'addcache');
            };
        };
    };
    return 0;
};

function single_show_option(input_data){
    for(let name in option_dict){
        if(option_dict[name][4]||option_dict[name][5]||option_dict[name][6]){
            option_dict[name][2](name,'singlecache');
            if(input_data[name]!==undefined){
                option_dict[name][0](name,input_data[name],'singlecache');
            };
        };
    };
    return 0;
};
