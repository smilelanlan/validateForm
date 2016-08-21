;(function(window){


    function factory($){
        var regs= {
            //校验手机
            name:function(v){
                if(!v)return false;
                var reg=/^[\u4E00-\u9FA5A-Za-z0-9]{2,50}$/g;
                return this.run(v,reg);
            },
            name1:function(v){
                if(!v)return false;
                var reg=/^[a-zA-Z0-9\u4e00-\u9fa5]+$/g;
                return this.run(v,reg);
            },
            contactCom:function(v){
                if(!v)return false;
                var reg=/^[a-zA-Z\u4e00-\u9fa5\s?]+$/g;
                return this.run(v,reg);
            },
            contact:function(v){
                if(!v)return false;
                var reg=/^[a-zA-Z\u4e00-\u9fa5]+$/g;
                return this.run(v,reg);
            },
            // 是否是汉字
            chinaChar:function(v){
                if(!v)return false;
                var reg=/^[\u4e00-\u9fa5]+$/g;
                return this.run(v,reg);
            },
            // 身份证号验证
            cardId:function(v){
                if(!v)return false;
                var reg=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
                return this.run(v,reg);
            },
            //校验固定电话
            phone:function(v){
                if(!v)return false;
                // var reg = /0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}/;
                var reg = /^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})+(\-?[0-9]{1,5})?$/;  //3-4位区号，7-8位直播号码，1－5位分机号
                return this.run(v,reg);
            },
            //校验工作地区ID  格式：34,398,1001
            workPlaceId:function(v){
                if(!v)return false;
                var reg = /\d{2}[,，]\d{3}[,，]\d{4}/;
                return this.run(v,reg);
            },
            //校验发布地区ID  格式：34,398
            payPlaceId:function(v){
                if(!v)return false;
                var reg = /\d{2}[,，]\d{3}/;
                return this.run(v,reg);
            },
            //校验特殊字符
            punctuation:function(v){
                if(!v)return false;
                var reg = /^[\u4e00-\u9fa5a-z0-9]+$/i;
                return this.run(v,reg);
            },
            mobile:function(v){
                if(!v)return false;
                var _emp=/^\s*|\s*$/g;
                v=v.replace(_emp,"");
                var _d=/^1[3-9][0-9]\d{8}$/g;
                if(_d.test(v)){
                    return true;
                }
                return false;
            },
            mobileAndEmail:function(v){
                if(!v)return false;
                var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w{2,}/;
                var reg2=/^1[3-9][0-9]\d{8}$/g
                if(reg.test(v)||reg2.test(v)){
                    return true;
                }else{
                    return false;
                }
            },
            userName:function(v){
                if(!v)return false;
                //var reg=/(?!.*0x.*|^\d{6,20}$)^[a-zA-Z0-9_@.]{6,20}$/g;
                var reg=/(?!^\d{6,20}$)^[a-zA-Z0-9_@.]{6,20}$/g;
                return this.run(v,reg);
            },
            account:function(v){
                if(!v)return false;
                var reg=/^[a-zA-Z0-9_@.]{6,20}$/;
                return this.run(v,reg);
            },
            //校验密码
            password:function(v){
                if(!v)return false;
                var reg = /^([a-zA-Z0-9]|[*_#^@%$&\-=\+~!():;',.\]\[\{\}]){6,20}$/;
                return this.run(v,reg);
            },
            //校验邮箱
            email:function(v){
                if(!v)return false;
                var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w{2,}/;
                return this.run(v,reg);
            },
            sms:function(v){
                if(!v)return false;
                var reg = /^\d{4}$/;
                return this.run(v,reg);
            },
            sms6:function(v){
                if(!v)return false;
                var reg = /^\d{6}$/;
                return this.run(v,reg);
            },
            captch:function(v){
                if(!v)return false;
                var reg = /^[a-z0-9]{4}$/i;
                return this.run(v,reg);
            },
            num:function(v){
                if(!v)return false;
                var reg = /^\d+$/;
                return this.run(v,reg);
            },
            qq:function(v){
                if(!v)return false;
                var reg = /^[0-9]{5,10}$/;
                return this.run(v,reg);
            },
            weixin:function(v){
                if(!v)return false;
                var reg = /^[a-zA-Z\d_]{5,}$/;
                return this.run(v,reg);
            },
            //执行匹配
            run:function(v,reg){
                if(!v || !reg){return false;}
                if(reg.test(v)){
                    return true;
                }
                return false;
            },
            trim:function(v) {
                v += "";
                return v.replace(/(^\s+)|(\s+$)/g, "");
            },
            empty:function(v){
                var reg=/^\s*$/g;
                if(reg.test(v)){
                    return true;
                }
                return false;
            },
            encnCut:function(str,len){
                var char_length = 0;
                for (var i = 0; i < str.length; i++){
                    var son_str = str.charAt(i);
                    encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
                    if (char_length >= len){
                        var sub_len = char_length == len ? i+1 : i;
                        return str.substr(0, sub_len);
                        break;
                    }
                }
            },
            encnLen:function(s){
                var char_length = 0;
                for (var i = 0; i < s.length; i++){
                    var son_char = s.charAt(i);
                    encodeURI(son_char).length > 2 ? char_length += 1 : char_length += 0.5;
                }
                return char_length;
            },
            //自动按长度截取
            autocut:function(txt,length,type){
                if(!length) return txt;
                if(type!="ench"){
                    return (txt.length <= length)? txt : txt.substring(0,length)
                }else{
                    var len = this.encnLen(txt)
                    if(len <= length){
                        return txt;
                    }else{
                        return this.encnCut(txt,length);
                    }
                }
            },
            xss:function(v){
                if(!v)return false;
                var reg = /<script[^>]*>[\s\S]*?<\/[^>]*script>/gi;
                return this.run(v,reg);
            },
            xssCheck:function(list){
                var flag=false;
                var self=this;
                $.each(list,function(k,v){
                    flag=self.xss(v);
                    if(flag){
                        return false;
                    }

                })
                return flag;
            },
            xssDomCheck:function(wrap){
                var self=this;
                wrap=wrap||$("body");
                var flag=false;
                var textE=wrap.find("input[type=text]");
                var textareaE=wrap.find("textarea");
                var list=[].concat.call(textareaE,textE);
                //console.log(list);
                $.each(list,function(k,v){
                    flag=self.xss(v.val());
                    if(flag){
                        return false;
                    }
                })
                return flag;
            }
        };

        function isRegExp(o) {
            return Object.prototype.toString.call(o) === '[object RegExp]';
        }
        function isFunction(o) {
            return Object.prototype.toString.call(o) === '[object Function]';
        }
        var ValidateForm=function(opt){
            this.opt={
                wrap:'',
                rules:null,
                msg:null,
                onblur:true,
                onkeyup:false
            };
            $.extend(true,this.opt,opt);
            this.wrap=$(this.opt.wrap);

            this.init();
        }
        ValidateForm.prototype={
            init:function(){
                this.getEles();
                this.bindEvent();
            },
            bindEvent:function(){
                var self=this;
                var $eles=this.eles;
                if(this.opt.onblur){
                    $eles.on("blur",function(){
                        self.checkEle($(this));
                    })
                }
                if(this.opt.onkeyup){
                    $eles.on("keyup",function(){
                        self.checkEle($(this));
                    })
                }
            },
            getEles:function(){
                this.eles=this.wrap.find('input,textarea').not('[type=radio],[type=checkbox],[type=submit],[type=button]');
               // console.log(this.eles);
                this.radios=this.getFieldName(this.wrap.find('input[type=radio]'));
                this.checkboxs=this.getFieldName(this.wrap.find('input[type=checkbox]'));
                return this.eles;
            },
            getFieldName:function(eles){
                var self=this;
                var names=[];
                for(var i=0;i<eles.length;i++){
                    var item=eles[i];
                    if(!self.contains(names,$(item).attr("name"))){
                        names.push($(item).attr("name"));
                    }
                }
                return names;

            },
            contains:function(arry,value){
                for(var i=0;i<arry.length;i++){
                    if(arry[i]==value){
                        return true;
                    }
                }
                return false;
            },
            valid:function(opt){
                var cb=opt.cb||function(){};
                var ignore=opt.ignore||null;
                var result=this.checkForm(ignore);
                if(result.status){
                    result.data=this.getFormJson(this.opt.wrap);
                    cb(result);
                }else{
                    cb(result);
                }
            },
            checkForm:function(ignore){
                function getEles(eles,ignore){
                    if(ignore){
                        var newEles=eles.filter(function() {
                            return $(this).attr("name") != ignore;
                        })
                        return newEles;
                    }else{
                        return eles;
                    }

                }
                function getRadioCheckbox(arry,ignore){
                    if(ignore){
                        var temArray=[];
                        for(var i=0;i<arry.length;i++){
                            if(arry[i]!=ignore){
                                temArray.push(arry[i]);
                            }
                        }
                        return temArray;
                    }else{
                        return arry;
                    }

                }

                var eles=getEles(this.eles,ignore);
                var flag=true;
                for(var i=0,length=eles.length;i<length;i++){
                    var result=this.checkEle(eles[i]);
                    if(!result.status){
                        return result;
                    }
                }
                var radios=getRadioCheckbox(this.radios,ignore);
                for(var i=0,length=radios.length;i<length;i++){
                    var result=this.checkRadioCheckbox(radios[i]);
                    if(!result.status){
                        return result;
                    }
                }
                var checkboxs=getRadioCheckbox(this.checkboxs,ignore);
                for(var i=0,length=checkboxs.length;i<length;i++){
                    var result=this.checkRadioCheckbox(checkboxs[i]);
                    if(!result.status){
                        return result;
                    }
                }
                return {status:true};


            },
            checkRadioCheckbox:function(field){
                var self=this;
                var rule=this.opt.rules[field];
                var msg=this.opt.msg[field];
                var checkedRadio=this.wrap.find('input[name='+field+']:checked');
                var ele=this.wrap.find('input[name='+field+']')[0];
                var sucCb=msg&&msg.sucCb?msg.sucCb:null;
                var failCb=msg&&msg.failCb?msg.failCb:null;
                if(!rule) return {status:true};
                var minLength=rule.minLength?rule.minLength:null;
                var maxLength=rule.maxLength?rule.maxLength:null;

                if(rule["required"]){
                    if( checkedRadio.length<1){
                        self.showError(msg["required"],ele,failCb);
                        return {status:false,msg:msg["required"]};
                    }
                }
                if(minLength&&checkedRadio.length<minLength){
                    self.showError(msg["minLength"],ele,failCb);
                    return {status:false,msg:msg["minLength"]};
                }
                if(maxLength&&checkedRadio.length>maxLength){
                    self.showError(msg["maxLength"],ele,failCb);
                    return {status:false,msg:msg["maxLength"]};
                }
                var value=null;
                if($(ele).attr("type")=="radio"){
                    value=checkedRadio.val();
                }else{
                    value=[];
                    checkedRadio.each(function(){
                        value.push($(this).val());
                    })
                }
                this.hideError(value,ele,sucCb);
                return {status:true,value:value};
            },
            checkEle:function(ele,notip){
                var flag=true;
                var error="";
                var $ele=$(ele);
                var self=this;
                var field=$ele.attr("name");
                var rule=this.opt.rules[field];
                var msg=this.opt.msg[field];
                var sucCb=msg&&msg.sucCb?msg.sucCb:null;
                var failCb=msg&&msg.failCb?msg.failCb:null;
                var value=$ele.val();
                if(!rule) return {status:true};
                if(regs.empty(value)){
                    if(rule["required"]&&msg["required"]){
                        //不能为空
                        if(!notip){
                            self.showError(msg["required"],ele,failCb);
                        }
                        error=msg["required"];
                        flag=false;
                    }else{
                        flag=true;
                        this.hideError($ele.val(),ele,sucCb);
                    }
                }else{
                    if(rule["reg"]){
                        if(typeof rule["reg"] == "string"){
                            if(!regs[rule["reg"]](value)){
                                //正则不匹配
                                if(msg['reg']){
                                    if(!notip){
                                        self.showError(msg['reg'],ele,failCb);
                                    }
                                    error=msg['reg'];
                                    flag=false;
                                }
                            }else{
                                flag=true;
                                this.hideError($ele.val(),ele,sucCb);
                            }
                        }else if(isRegExp(rule["reg"])){
                            if(!regs.run(value,rule["reg"])){
                                //正则不匹配
                                if(msg['reg']){
                                    if(!notip){
                                        self.showError(msg['reg'],ele,failCb);
                                    }
                                    error=msg['reg'];
                                   flag=false;
                                }
                            }else{
                                flag=true;
                                this.hideError($ele.val(),ele,sucCb);
                            }
                        }else if(isFunction(rule["reg"])){
                            if(!rule["reg"](value)){
                                //正则不匹配
                                if(msg['reg']){
                                    if(!notip){
                                        self.showError(msg['reg'],ele,failCb);
                                    }
                                    error=msg['reg'];
                                    flag=false;
                                }
                            }else{
                                flag=true;
                                this.hideError($ele.val(),ele,sucCb);
                            }
                        }else{
                            flag=false;
                            error="暂无此校验方法";
                            self.showError("暂无此校验方法",ele,failCb);
                        }

                    }else{
                       flag=true;
                        this.hideError($ele.val(),ele,sucCb);
                    }
                }


                return {
                    status:flag,
                    value:$ele.val(),
                    msg:error
                }

            },
            removeRule:function(field){
                if(this.opt.rules[field]){
                    this.opt.rules[field]=null;
                }
            },
            showError:function(str,ele,sucCb){
                this.opt.validFieldFail&&this.opt.validFieldFail(str,ele);
                /*this.popover.setMsg({str:str,ele:ele});*/
                sucCb&&sucCb(str,ele);
            },
            hideError:function(val,ele,failCb){
                this.opt.validFieldSuc&&this.opt.validFieldSuc(val,ele);
                failCb&&failCb(val,ele);
               /* this.popover.hide();*/
            },
            getFormJson:function(form){
                var obj={};
                var arr =$(form).serializeArray();

                $.each(arr,function(index,item){
                    var key=item.name;
                    var value=item.value;
                    if(obj[key]){
                        if(!obj[key].push){
                            obj[key]=[obj[key]];
                        }
                        obj[key].push(value||'');
                    }else{
                        obj[key]= value || '';
                    }
                })
                return obj;
            }


        }

        ValidateForm.addRule=function(name,fn){
            if(!regs[name]) {
                regs[name] = fn;
            }
        }

        return ValidateForm;
    }



    if (typeof define === 'function' && define.amd){
        // support amd
        define( ["jquery"], factory);
    }else if (typeof define === 'function' && define.cmd){
        // support cmd
        define(function(require,exports,module) {
            var $ = require('jquery');
            return factory($);
        });

    } else if (typeof exports !== 'undefined') {
        //suport node
        module.exports = factory($);
    } else {
        this.ValidateForm = factory($);
    }

})(window);

