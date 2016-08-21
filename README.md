> # 表单验证组件
>

表单验证组件

## 基本用法

html代码

```
<form id="myform" method="post">
    <p>
        <label for="email">E-Mail：</label>
        <input id="email" name="email" />
    </p>
    <p>
        <input class="submitbtn" type="submit" value="立即注册" />
    </p>
</form>

<script src="http://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
<script src="dist/validateForm.js"></script>
```

js代码

```
$(function(){
	//创建实例
    var myform = new ValidateForm({
        wrap: '#myform',
        rules:{
            email:{
                required: true,
                reg: "email"
            }
        },
        msg: {
            email: {
                required: "邮箱不能为空",
                reg: "邮箱格式不正确"
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
    })

    $(".submitbtn").on("click",function(e){
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        //调用表单验证方法，参数是一个对象，在cb上可自定义表单验证的回调函数
        myform.valid({
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
```

## 创建实例的option选项

* wrap : form表单的外部容器，值为css 选择器

* rules : 表单验证规则，值为对象，对象的属性是表单元素的name值，对象属性的值还是一个对象
  + required:该表单元素是否为必填项，值为布尔值

  + reg:该表单字段的验证规则，值可为字符串、正则、自定义函数
    + 字符串:

      1. 内置校验规则：该组件内置的验证规有chinaChar（是否是汉字）、cardId（身份证验证）、phone（固定电话）、mobile（手机）、password（用户名）、email（邮箱）、num（是否为数字）、qq（qq号）、weixin（微信号）、empty（是否为空）可以直接使用

         ```
         <p>
           <label for="email">E-Mail：</label>
           <input id="email" name="email" />
         </p>

          rules:{
            email:{
              required: true,
              reg: "email"
            }
          }
         ```

         ​

      2. 添加自定义校验规则: 调用函数的addRule方法，来扩充校验规则，addRule方法的第一参数是新的校验规则名称，第二个参数是函数，函数的参数是表单元素的值，返回值为true或者false

         ```
         <p>
           <label for="myname">用户名：</label>
           <input id="myname" name="myname" />
         </p>
         //添加新的校验规则，用户名已chr开头
          ValidateForm.addRule("chrName",function(v){
            if(!v)return false;
              var reg=/^chr/;
              if(reg.test(v)){
              return true;
            }else{
            	return false;
            }
          });
          
          rules: {
            myname: {
              required: true,
              reg:"chrName"
            }
          }
         ```

    + 正则：值可以为正则表达式

      ```
       <p>
         <label for="phone">手机号：</label>
         <input id="phone" name="phone" />
       </p>
       
       rules:{
          phone: {
           required: true,
           reg:/^1[3-9][0-9]\d{8}$/
         }
       }
      ```

    + 自定义函数:可自定义函数验证表单元素,函数的一个参数是当前表单元素的值,函数的返回值为true后者false

      ```
      <p>
        <label for="experience">工作经历：</label>
        <textarea name="experience" id="experience" cols="30" rows="10"></textarea>
      </p>

      rules:{
        experience:{
          required: true,
          reg: function(v){
            if(v.length>5){
            	return true;
            }else{
            	return false;
            }
          }
        }
      }
      ```

  + minLength: 当表单元素为复选框时，可设置最少选择个数 

  + maxLength:当表单元素为复选框时，可设置最多选择个数

    ```
    <p>
      <span>爱好：</span>
      <label for="hobby_read">读书</label>
      <input type="checkbox" id="hobby_read" value="read" name="hobby"/>
      <label for="hobby_write">写作</label>
      <input type="checkbox" id="hobby_write" value="write" name="hobby" />
      <label for="hobby_sing">唱歌</label>
      <input type="checkbox" id="hobby_sing" value="sing" name="hobby" />
      <label for="hobby_dance">唱歌</label>
      <input type="checkbox" id="hobby_dance" value="sing" name="hobby" />
    </p>

    //最少选择两个，最多选择3个
    rules:{
      hobby: {
        required: true,
        minLength:2,
        maxLength:3
      }
    }

    ```

* msg:配置表单元素验证结果的提示文案和回调函数，值为对象，对象的属性是表单元素的name值，对象属性的值还是一个对象

  + required:该表单元素值为空的提示文案，值为字符串

  + reg:该表单元素正则校验失败的提示文案

  + sucCb:该表单元素校验成功的回调，第一个参数为值，第二个参数为当前元素

  + failCb:该表单元素校验失败的回调，第一个参数为失败原因，第二个参数为当元素

    ```
    msg:{
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
      }
    }
    ```

    ​

* validFieldSuc:通用表单元素校验成功回调，第一个参数为值，第二个参数为当前元素

* validfieldfail:通用表单元素校验失败回调，第一个参数为失败原因，第二个参数为当前元素

* onblur:是否为表单元素添加blur事件，值为true或者 false,默认为true

* onkeyup:是否为元素点击keyup事件，值为true后者 false,默认为false



## 方法

1. 实例方法

   + valid(opt)

     表单提交之前，校验所有表单元素的值是否合法，opt是个对象

     + cb:表单校验结束的回调，参数是对象

       ```
       {
         status:true,//值为true/false 校验成功或者失败
         data:{email:"1182661260@qq.com",name:"lilanlan"},//校验成功，表单提交的数据
         msg:"邮箱格式不正确"//校验失败，失败的原因
       }
       ```

     + ignore:忽略校验的元素，值为忽略校验元素name的值

     ```
      var myform = new ValidateForm({...});
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
     ```

   + checkEle(ele)

     校验当个输入框的值是否合法，参数为表单元素的css选择器,返回值 是个对象

     ````
     {
      status:true,//值为true/false 校验成功或者失败
      value:"我是一名前端开发人员",//校验成功，当前输入框的值
      msg:"不能少于5个值"，//校验失败，失败的原因
     }
     ````

     ```
     var myform = new ValidateForm({...});
     myform.checkEle("#experience");
     ```

   + checkRadioCheckbox(name)

     校验单选按钮或者多选框是否合法，参数为表单元素name的值，返回值是对象,同上

     ```
     var myform = new ValidateForm({...});
     console.log(myform.checkRadioCheckbox("hobby"))

     //输出的值为
     {
     	status:true,//校验是否成功
     	value:['sing','dance']//校验成功，元素的值
     }
     ```

     ​

2. 函数方法

+ ValidateForm.addRule(name,fn)

  添加自定义校验规则,第一参数是新的校验规则名称，第二个参数是函数，函数的参数是表单元素的值，返回值为true或者false

  ```
  //添加新的校验规则，用户名已chr开头
   ValidateForm.addRule("chrName",function(v){
     if(!v)return false;
       var reg=/^chr/;
       if(reg.test(v)){
       return true;
     }else{
     	return false;
     }
   });
  ```

  ​




## demo示例

+ [普通页面](https://smilelanlan.github.io/validateForm/normal.html)
+ [cmd页面](https://smilelanlan.github.io/validateForm/cmd.html)
+ [amd页面](https://smilelanlan.github.io/validateForm/amd.html)

