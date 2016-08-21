define(function(require,exports,module){
    var $=require("jquery");
    var ValidateForm= require("./validateForm");

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
        wrap: '#myform',
        rules: {
            myname: {
                required: true,
                reg:"chrName"
            },
            phone: {
                required: true,
                reg:/^1[3-9][0-9]\d{8}$/
            },
            email: {
                required: true,
                reg: "email"
            },
            password: {
                required: true,
                reg: "password"
            },
            confirm_password:{
                required: true,
                reg: "password"
            },
            experience:{
                required: true,
                reg: function(v){
                    if(v.length>5){
                        return true;
                    }else{
                        return false;
                    }
                }
            },
            gender:{
                required: true
            },
            hobby: {
                required: true,
                minLength:2,
                maxLength:3
            },
            city:{
                required: true
            }
        },
        msg: {
            myname: {
                required: "用户名不能为空",
                reg:"用户名格式不对"
            },
            phone: {
                required: "手机号不能为空",
                reg:"手机号格式不正确"
            },
            email: {
                required: "邮箱不能为空",
                reg: "邮箱格式不正确",
                sucCb:function(value,ele){
                    var $parent=$(ele).parents("p");
                    var $icon=$parent.find(".icon");
                    if($icon.length<1){
                        $icon=$('<span class="icon"></span>');
                        $parent.append($icon);
                    }
                    $icon.html("v").css({"color":"green"});
                },
                failCb:function(str,ele){
                    var $parent=$(ele).parents("p");
                    var $icon=$parent.find(".icon");
                    if($icon.length<1){
                        $icon=$('<span class="icon"></span>');
                        $parent.append($icon);
                    }
                    $icon.html("x").css({"color":"red"});
                }
            },
            password: {
                required: "密码不能为空",
                reg: "密码格式不正确"
            },
            confirm_password:{
                required: "密码不能为空",
                reg: "密码格式不正确"
            },
            gender:{
                required: "性别不能为空",
                sucCb:function(value,ele){
                    console.log(value);
                },
                failCb:function(){
                    console.log("请选择性别");
                }
            },
            experience:{
                required: "工作经历不能为空",
                reg: "工作经历不能少于5个字"
            },
            hobby: {
                required:"爱好不能为空",
                minLength:"不能少于2个",
                maxLength:"不能多于3个"
            },
            city:{
                required: "城市不能为空"

            }

        },
        validFieldSuc:function(value,ele){
            var $parent=$(ele).parents("p");
            var $tip=$parent.find(".tip");
            if($tip.length<1){
                $tip=$('<span class="tip"></span>');
                $parent.append($tip);
            }
            $tip.html("验证通过").css({"color":"green"});

        },
        validFieldFail:function(str,ele){
            var $parent=$(ele).parents("p");
            var $tip=$parent.find(".tip");
            if($tip.length<1){
                $tip=$('<span class="tip"></span>');
                $parent.append($tip);
            }
            $tip.html(str).css({"color":"red"});
        }
    });

    $(".submitbtn").on("click",function(e){
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        myform.valid({
            ignore:"experience",
            cb:function (result) {
                if(result.status){
                    console.log("表单验证通过",result.data);
                }else{
                    console.log("表单验证失败",result.msg);
                }
            }
        })



    })


})