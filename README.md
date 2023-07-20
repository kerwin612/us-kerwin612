
**import**
```
// @require https://openuserjs.org/src/libs/kerwin612/Kerwin612.js
// @grant   GM.getValue
// @grant   GM.setValue
// @grant   GM_getValue
// @grant   GM_setValue
```

**usage**
```
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
