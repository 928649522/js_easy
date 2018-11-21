



var $hao = (function(win,doc){
    /*
    * param:
    *     Fuc结尾的参数为函数
    *
    * TODO explain: 基本的业务共同  主要包含html5特性
    * */
    let methods = {
        superTest:superTest, //测试
        //打开窗口
        createWindow: createWindow,
        //关闭窗口
        closeFun:closeFun,
        //异步文件上传处理
        fileUpload:fileUpload,
        //异步提交表单数据
        syncSubmitForm:syncSubmitForm,
        //表单验证html5  参数：当前控件 和 验证错误提示消息
        h5MsgVd:h5MsgVd,
        //判断文件类型
        getFileType:getFileType,
        // 获得文件的URL 参数为file input ID
        getFileURL,getFileURL,
        getFileURLByFile:getFileURLByFile,
        //简化ajax默认post
        ajax:ajax,
        //取得form里面的数据
        getFormData:getFormData,
        //简单的confirm
        confirm:confirm,
        //dom选择器 根据Id OR class OR name返回jqueryDom
        getDom:getDom
    }
    function superTest(){
        alert('superTest');
    }
    let FILE_TYPE = {
        IMG:'img',
    }
    /**
     * Example:  <input type="text" name="email" required oninvalid="$hao.h5MsgVd(this,'请输入有效邮箱地址')" placeholder="请输入有效邮箱地址"  onfocus="this.placeholder=''" onblur="this.placeholder='请输入有效邮箱地址'">
     * */
    function h5MsgVd(dom,errMsg) {
        //对悬浮窗的设置
        if(dom.validity.patternMismatch){
            dom.setCustomValidity(errMsg);
            //错误后就清空，不过执行顺序有点问题就不要了//
            //if(confirm("输入有误,是否清空此项？")){
              //             inputelement.value="";
            //             }
             }else{
            dom.setCustomValidity("");
            return true;
        }
    }
    function getFileURLByFile(file) {
        let imgURL;
        try {
            //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
            try {
                //Firefox7.0
                imgURL = file.getAsDataURL();
                //alert("//Firefox7.0"+imgRUL);
            } catch (e) {
                //Firefox8.0以上
                imgURL = window.URL.createObjectURL(file);
                //alert("//Firefox8.0以上"+imgRUL);
            }
        } catch (e) {      //这里不知道怎么处理了，如果是遨游的话会报这个异常
            //支持html5的浏览器,比如高版本的firefox、chrome、ie10
            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    imgURL = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
        return imgURL;
    }
    function getFileURL(domId) {
        let node = doc.getElementById(domId);
        var imgURL = "";
        try {
            var file = null;
            if (node.files && node.files[0]) {
                file = node.files[0];
            } else if (node.files && node.files.item(0)) {
                file = node.files.item(0);
            }
            //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
            try {
                //Firefox7.0
                imgURL = file.getAsDataURL();
                //alert("//Firefox7.0"+imgRUL);
            } catch (e) {
                //Firefox8.0以上
                imgURL = window.URL.createObjectURL(file);
                //alert("//Firefox8.0以上"+imgRUL);
            }
        } catch (e) {      //这里不知道怎么处理了，如果是遨游的话会报这个异常
            //支持html5的浏览器,比如高版本的firefox、chrome、ie10
            if (node.files && node.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    imgURL = e.target.result;
                };
                reader.readAsDataURL(node.files[0]);
            }
        }
        return imgURL;
    }

    function getDom(domFlag) {
        let clsDom ="."+domFlag,
            idDom  = "#"+domFlag;
            nameDom = 'input[name=\''+domFlag+'\'] '
        if($(idDom).length>0){
            return $(idDom);
        }
        if($(clsDom).length>0){
            return $(clsDom);
        }
        if($(nameDom).length>0){
            return $(clsDom);
        }
        return null;
    }
    function getFormData(formId){
            var obj = {};
            var t = $('#'+formId).serializeArray();
            $.each(t, function() {
                obj[this.name] = this.value;
            });
        console.log(obj);
            return obj;

    }
    function closeFun() {
        $("#formWindow").window('close');
    }
    function createWindow(titles,url,rowData,width,height,onLoad) {
        let window = $("#formWindow"); //依赖页面<div id="formWindow"></div>
        window.window({
            width:width,//窗体的宽
            height:ShrgForm.getFormHeight(height),//窗体的高
            modal: true,//是否模态化
            minimizable: false,//是否能最小化
            maximizable:false,//是否能最大化
            collapsible:false,//弹框的收缩
            href:url,
            resizable:false,
            loadingMessage: '<div id="loadingDiv" style="position:absolute;left:0;width:'+width+'px;height:' +ShrgForm.getFormHeight(height)+ 'px;top:0px;background:#fff;z-index:10000;"><div style="position: absolute;left:'+(width-175)/2+'px; top:'+(ShrgForm.getFormHeight(height)-175)/2+'px; width:175px;height:175px; background: #fff url('+Loadimagerul+') no-repeat;"></div></div>',
            title: titles, //标题
            onLoad: onLoad
        });
    }

    function syncSubmitForm(url,formData,successFuc) {
        console.log('ds'+url);
        $.ajax({
            url:url,
            type:"post",
            dataType:'json',
            data:formData,
            cache : false,
            processData:false,
            contentType:false,
            async:true,
            success:successFuc
            ,error(){

            }
        });
    }

    function fileUpload(url,formData,successFuc) {
        console.log('ds'+url);
        $.ajax({
            url:url,
            type:"post",
            dataType:'json',
            data:formData,
            cache : false,
            processData:false,
            contentType:false,
            async:true,
            xhr(){
                let xhr = $.ajaxSettings.xhr();
                /*
                if( modelVue.onprogress && xhr.upload) {
                    xhr.upload.addEventListener("progress" , modelVue.onprogress, false);
                    return xhr;
                }*/
                return xhr;
            },
            success:successFuc
            ,error(){

            }
        });
    }

    function getFileType(fileName) {
        let seat=fileName.lastIndexOf(".");
        //返回位于String对象中指定位置的子字符串并转换为小写.
        let extension=fileName.substring(seat).toLowerCase();
        let imgList=[".jpg",".gif",".png",".jpeg"];
        for(let i=0;i<imgList.length;i++){ //是否为图片类型
            if((imgList[i]==extension)){
                return FILE_TYPE.IMG;
            }
        }
        return null;
    }

    function ajax(url,data,successFuc) {
        $.ajax({
            url:url,
            type:'post',
            dataType:'json',
            data:data,
            success:successFuc,
            error(){

            }
        });
    }

    function confirm(trueFuc,falseFuc,title,text) {
        if(!title){
            title = "操作提示";
        }
        if(!text){
            text = "您确定要执行操作吗;"
        }
        $.messager.confirm(title,text , function (data) {
            if (data) {
                if(trueFuc){
                    trueFuc();
                }
            }else {
                if(falseFuc){
                    FalseFuc();
                }
            }
        });
    }


    /**
     *
     * SHRG_SERVICE
     * TODO explain:封装耦合过同事的代码
     *
     * */
    let etc = (function (win,doc) {
        let shrgBusinessService = {
            /**
             * explain:easyUI datagrid的常量
             * */
            datagrideConstant:datagrideConstant(),
            initDatagrid:initDatagrid

        }
        function datagrideConstant(){
            return{
                pageSize: 10, //每页显示的记录条数
                pageList:[15,30,45,60] //可以设置每页记录条数的列表
            };
        }


        function initDatagrid(RESTFulApi,initDomId,onLoadSuccess,onDblClickRow) {
            /**
             * 回调函数的参数如下
             * onLoadSuccess: function (msg) { //加载成功,检查异常
                    if(ShrgShowBox.resultValidate(msg,null)){

                    }
                },
             onDblClickRow:function(rowIndex, rowData){
                    // addTips('UPDATE');
                }
             *
             * */
            if(!initDomId){
                initDomId = '#tableShow';
            }
            $("#"+initDomId).datagrid({
                url:RESTFulApi,
                pageSize: this.datagrideConstant.pageSize,//每页显示的记录条数
                pageList: this.datagrideConstant.pageList,//可以设置每页记录条数的列表
                width: datagridWidth,
                height: datagridHeight,
                border: true,
                fit: false,//以内容自动大小
                nowrap : true,//true，则在同一行中显示数据
                striped : true,// 设置为true将交替显示行背景。
                loadMsg : '',
                scrollbarSize:0,
                singleSelect:true,//是否单选
                fitColumns : true,// 允许表格自动缩放，以适应父容器,出现水平滚动条
                pagination : true,// 分页控件
                rownumbers:true,//行号
                remoteSort : false, // 允许服务器排序   //加载成功,检查异常
                onLoadSuccess:onLoadSuccess,
                onDblClickRow:onDblClickRow
            });
        }
        return shrgBusinessService;
    }(win,doc));

   /**
    *
    * TODO explain:浏览器控制
    *
    * */
    let browser = (function(){
        let browser = {
            browserSize:browserSize(),
            //浏览器可视高度
            browserShowWidth:browserSize()().width,
            browserShowHeigth: browserSize()().height
        };
        function browserSize() {
           if(window.innerHeight !== undefined) {
              return  function() {
                   return {
                       width: win.innerWidth,
                       height: win.innerHeight
                   }
               }
           } else if(doc.compatMode === "CSS1Compat") {
               return function() {
                   return {
                       width: doc.documentElement.clientWidth,
                       height: doc.documentElement.clientHeight
                   }
               }

           } else {
               return function() {
                   return {
                       width: doc.body.clientWidth,
                       height: doc.body.clientHeight
                   }
               }

           }
       };

        return browser;
   }());




    /**
     *
     *TODO explain: 客户端app 代码共通
     *
     * */
    (function ($hao) {
        //shrg  ResultBean 消息验证
        $hao.msgVd =msgVd;
        $hao.alert = alert;


        function alert(msg) {
            swal({
                type: 'info',
                text: msg,
                timer: 3000
            });
        }
        function msgVd(data) {
            if(data.shrgStatus){
                if(data.shrgStatus==='L'){
                    window.location.href="./login.jsp";
                }else if(data.shrgStatus==='E'){
                    if(!data.shrgMsg){
                        data.shrgMsg= '返回的数据有异常';
                    }
                    swal({
                        type: 'warning',
                        text: data.shrgMsg,
                        timer: 5000
                    });
                } else if(data.shrgStatus==='S'){
                    let count = 0;
                    $.each(data,function (i) {
                        count++
                    });
                    if(count==3){
                        swal({
                            type: 'info',
                            text: '操作成功',
                            timer: 5000
                        });
                    }
                    }
            }

           return true;
        }

    }(methods));











    /**
     * 将browser参数合并到etc中
     * */
    for(let methodKey in browser){
        etc[methodKey]=browser[methodKey]
    }

    /**
     * 将etc合并到methods
     * */
    for(let methodKey in etc){
        methods[methodKey]=etc[methodKey]
    }
    //console.log(JSON.stringify(methods.browserShowWidth));
    return methods;
}(window,document));









/**
 *
 *
 *
 * TODO 以下为js内置对象扩展方法
 *
 *
 *
 *
 * */




/**
 *
 * Array ++++》remove
 * dx数组下标
 * */
Array.prototype.remove=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
}

/**
 * Date   ++++》format
 * example: Date.dateToStr(new Date())
 * */
Date.dateToStr = function (date) {
    return date.getFullYear()+"-"
    +(date.getMonth()+1)
    +"-"+date.getDay()
    +" "+date.getHours()
    +":"+date.getMinutes()
    +":"+date.getSeconds();
}
/**
 * Date  +++++》
 * example:Date.strToDate('2018-03-05 17:59:00')
 * */
Date.strToDate = function (str) {
    str = str.substring(0,str.length);
    str = str.replace(/-/g,'/');
    return new Date(str);
}

Date.strToDate2 = function (str) {
    let arr = str.split('-');
    console.log(arr);
   let target =  new Date();
   console.log(parseInt(arr[2]));
    target.setFullYear(parseInt(arr[0]),parseInt(arr[1])-1,parseInt(arr[2]));
    return target;
}
console.log();

/**
 * 以下是
 * jquery 扩展方法
 *
 * */
(function ($) {
    $.fn.setform = function (jsonValue) {
        var obj = this;
        $.each(jsonValue, function (name, ival) {
            var $oinput = obj.find("input[name='" + name + "']");
            if ($oinput.attr("type")== "radio" || $oinput.attr("type")== "checkbox") {
                $oinput.each(function(){
                    if($(this).val()==ival)
                        $(this).attr("checked", "checked");
                });
            }
            else
            {
                obj.find("[name="+name+"]").val(ival);
            }
        });
    }
})(jQuery)

