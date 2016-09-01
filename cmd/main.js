define(function(require,exports,module){
    var $=require("jquery");
    var ValidateForm= require("./validateForm");
    require("./regs");

    function validFieldSuc(value,ele,type){
        var $parent=$(ele).parents("p");
        var $tip=$parent.find(".tip");
        if($tip.length<1){
            $tip=$('<span class="tip"></span>');
            $parent.append($tip);
        }
        if(type=="confirm"){
            var passport=$("#password").val();
            if(passport!=value){
                $tip.html("两次输入的密码不一致").css({"color":"red"});
            }else{
                $tip.html("验证通过").css({"color":"green"});
            }
        }else{
            $tip.html("验证通过").css({"color":"green"});
        }

    }

    function validFieldFail(str,ele){
        var $parent=$(ele).parents("p");
        var $tip=$parent.find(".tip");
        if($tip.length<1){
            $tip=$('<span class="tip"></span>');
            $parent.append($tip);
        }
        $tip.html(str).css({"color":"red"});
    }

    ValidateForm.addRule("chrName",function(v){
        if(!v)return false;
        var reg=/^chr/;
        if(reg.test(v)){
            return true;
        }else{
            return false;
        }
    });


    var myform = new ValidateForm({
        wrap:'#myform',
        fields:{
            myname:{
                required: true,
                shortcutRule:'email',
                emptyTip:'用户名不能为空',
                errorTip:'用户名请以chr开头',
                rule:'chrName',
                onBlur:function(){
                    myform.checkField(this);
                },
                onKeyup:function(){
                    myform.checkField(this);
                },
                onFocus:function(){
                    console.log("focus");
                },
                onSuccess:function(value,ele){
                    validFieldSuc(value,ele);
                },
                onFailed:function(str,ele){
                    validFieldFail(str,ele);
                }
            },
            phone: {
                required: true,
                shortcutRule:"mobile",
                emptyTip:'手机号不能为空',
                errorTip:'手机号格式不正确',
                onBlur:function(){
                    myform.checkField(this);
                },
                onSuccess:function(value,ele){
                    validFieldSuc(value,ele);
                },
                onFailed:function(str,ele){
                    validFieldFail(str,ele);
                }
            },
            email: {
                required: true,
                shortcutRule: "email",
                emptyTip:'邮箱不能为空',
                errorTip:'邮箱格式不正确',
                onBlur:function(){
                    myform.checkField(this);
                },
                onSuccess:function(value,ele){
                    validFieldSuc(value,ele);
                },
                onFailed:function(str,ele){
                    validFieldFail(str,ele);
                }
            },
            password: {
                required: true,
                shortcutRule: "password",
                emptyTip:'密码不能为空',
                errorTip:'密码不能少于6位',
                onBlur:function(){
                    myform.checkField(this);
                },
                onSuccess:function(value,ele){
                    validFieldSuc(value,ele);
                },
                onFailed:function(str,ele){
                    validFieldFail(str,ele);
                }
            },
            confirm_password:{
                required: true,
                shortcutRule: "password",
                emptyTip:'密码不能为空',
                errorTip:'密码不能少于6位',
                onBlur:function(){
                    myform.checkField(this);
                },
                onSuccess:function(value,ele){
                    validFieldSuc(value,ele,"confirm");
                },
                onFailed:function(str,ele){
                    validFieldFail(str,ele);
                }
            },
            gender:{
                required: true,
                fieldType:"radio",
                emptyTip:'性别不能为空',
                onSuccess:function(value,ele){
                    validFieldSuc(value,ele);
                },
                onFailed:function(str,ele){
                    validFieldFail(str,ele);
                }
            },
            hobby: {
                required: true,
                fieldType:"checkbox",
                emptyTip:'爱好不能为空',
                errorTip:'至少选择两个，最多3个',
                rule:function(value){
                    if(value.length>=2&&value.length<=3){
                        return true;
                    }else{
                        return false;
                    }
                },
                onSuccess:function(value,ele){
                    validFieldSuc(value,ele);
                },
                onFailed:function(str,ele){
                    validFieldFail(str,ele);
                }
            },
            experience:{
                required: true,
                rule: function(v){
                    if(v.length>5){
                        return true;
                    }else{
                        return false;
                    }
                },
                emptyTip:'工作经历不能为空',
                errorTip:'工作经历不能少于5个字',
                onSuccess:function(value,ele){
                    validFieldSuc(value,ele);
                },
                onFailed:function(str,ele){
                    validFieldFail(str,ele);
                }
            }

        }
    })


    $(".submitbtn").on("click",function(e){
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        var result= myform.valid({ignore:"experience"});
        if(result){
            alert("表单验证成功");
        }else{
            console.log("表单验证失败");
        }
    })


})