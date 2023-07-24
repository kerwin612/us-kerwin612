/**

// Source code can be found at https://github.com/kerwin612/us-kerwin612

```
...
// @require https://openuserjs.org/src/libs/kerwin612/Kerwin612.js
// @grant   GM.getValue
// @grant   GM.setValue
// @grant   GM_getValue
// @grant   GM_setValue
...


//默认配置，如有配置项，将按照以下格式定义配置
//The default configuration, if there are configuration items, the configuration will be defined in the following format
k_cs.configKey = configVal

//开始运行
//Start now
kStart((kFunc) => {
    //方法模板，按以下格式定义方法
    //Method template, define the method in the following format
    kFunc(
        //startup: url匹配上时就会执行的方法，无须返回值，仅执行一次 / The method that will be executed when the url matches, no return value, only executed once
        (ctx) => {
        },
        //ready: url匹配上时就会执行的方法，返回bool类型的值，每30ms执行一次，直至此方法返回true后就不再执行 / The method that will be executed when the url matches, returns a bool type value, executed every 30ms, and no longer executes until this method returns true
        (ctx) => {
            return true;
        },
        //run: url匹配上且以上的ready方法返回true后执行的方法，无须返回值，仅执行一次 / The method that is executed after the url matches and the ready method above returns true, no return value is required, only executed once
        (ctx) => {
        },
        //URL匹配项，可定义多个；当URL匹配时才执行上面的方法；当URL为空或未定义时，上述方法为默认执行的方法 / Multiple URL matching items can be defined; the above method is executed when the URL matches; when the URL is empty or undefined, the above method is the default method
        'url1','url2','url3'
    );
});

//动态配置
//Dynamic configuration
kSetValue(key, value);

//获取配置
//Get Configuration
kGetValue(key, value);
```

*/

// ==UserScript==
// @namespace     github.com/kerwin612
// @exclude       *

// ==UserLibrary==
// @name          Kerwin612
// @description   The basis of the user script includes the function of reading the configuration; with this script, the user can ignore the configuration-related code; directly define the function;
// @copyright     2020, kerwin612 (github.com/kerwin612)
// @license       MIT
// @version       1.2

// ==/UserScript==

// ==/UserLibrary==

// ==OpenUserJS==
// @author kerwin612
// ==/OpenUserJS==


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Kerwin612's UserScript CORE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

var k_fs = {};

//默认配置信息
var k_cs = {
    run: (() => {
        //在此配置主方法，读完配置后会执行此方法
        var key = 'default';
        var url = window.location.href;

        for (let [k, v] of Object.entries(k_fs)) {
            if ((url === k || url.startsWith(k) || new RegExp(k).test(url))) {
                key = k;
                break;
            }
        }

        var obj = k_fs[key];
        if (!obj) return;
        obj.startup(obj.ctx);
        obj.readyInterval = setInterval((function(){
            if (!!this.ready(this.ctx)) {
                clearInterval(this.readyInterval);
                this.run(this.ctx);
            }
        }).bind(obj), 30);
    }).bind(this)
};

async function kSetValue(key, value) {
    if (typeof(GM.setValue) !== undefined) {
        return await GM.setValue(key, value);
    } else if (typeof(GM_setValue) !== undefined) {
        return await GM_setValue(key, value);
    } else {
        return await value;
    }
}

async function kGetValue(key, defaultValue) {
    if (typeof(GM.getValue) !== undefined) {
        return await GM.getValue(key, defaultValue);
    } else if (typeof(GM_getValue) !== undefined) {
        return await GM_getValue(key, defaultValue);
    } else {
        return defaultValue;
    }
}

function kConfig(config, keys, index) {
    index = index || 0;
    var key = keys[index++];
    var value = config[key];
    return new Promise((resolve) => {
        try {
            kGetValue(key, value).then(cv => {
                if (key === 'config') {
                    config = Object.assign(config, cv);
                } else {
                    config[key] = (typeof config[key]) === 'object' ? Object.assign(config[key], cv) : cv;
                }
                if (index > keys.length - 1) {
                    resolve(config);
                } else {
                    kConfig(config, keys, index).then((c) => {resolve(c)});
                }
            });
        } catch(error) {
            resolve(config);
        }
    });
}

/*
kFunc(
    () => {},    //启动方法
    () => {},    //判断页面是否准备好
    () => {},    //主方法
    string..,    //URL匹配项
);
*/
function kStart(kFuncs) {
    var run = (do_run) => {
        (kFuncs || (()=>{}))(function() {
            //arguments is an array-like object, but not an array
            var as = [].filter.call(arguments, a => (typeof(a) === 'string' && !!(a.trim())) || a);
            if (as.length < 3)    return;
            var obj = {};
            obj.startup = as[0].bind(obj);
            obj.ready = as[1].bind(obj);
            obj.run = as[2].bind(obj);
            obj.ctx = {};
            if (as.length === 3) {
                k_fs['default'] = obj;
                return;
            }
            [].forEach.call(as, function(value, index) {
                if (index < 3 || !value) return;
                k_fs[value] = obj;
            });
        });
        do_run();
    };
    kConfig(k_cs, ['config'].concat(Object.keys(k_cs))).then((c) => {
        k_cs = Object.assign(k_cs, c);
        run(() => {k_cs.run();});
    });
};

////默认配置，将此模板copy到>>>>>Kerwin612's UserScript CORE>>>>>以下
//k_cs.configKey = configVal
//
////开始运行，将此模板copy到>>>>>Kerwin612's UserScript CORE>>>>>以下
//kStart((kFunc) => {
//    kFunc(
//        //startup: url匹配上时就会执行的方法，无须返回值，仅执行一次
//        (ctx) => {
//        },
//        //ready: url匹配上时就会执行的方法，返回bool类型的值，每30ms执行一次，直至此方法返回true后就不再执行
//        (ctx) => {
//            return true;
//        },
//        //run: url匹配上且以上的ready方法返回true后执行的方法，无须返回值，仅执行一次
//        (ctx) => {
//        },
//        //URL匹配项，可定义多个；当URL匹配时才执行上面的方法；当URL为空或未定义时，上述方法为默认执行的方法
//        'url1','url2','url3'
//    );
//});
//
////动态配置，可在自定义函数内随时随地调用此函数
//kSetValue(key, value);
//
////获取配置，可在自定义函数内随时随地调用此函数
//kGetValue(key, value);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Kerwin612's UserScript CORE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
