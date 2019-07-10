//定义全局变量 -- 验证码
phoneReg = /^1[3456789]\d{9}$/
codeReg = /^\d{6}$/	
code = ""

phoneErrorTxt = 'Incorrect phone number format'
codeErrorsTxt = 'The verification code is incorrect'
getBtn = 'click get'
resetBtn = 'Reacquire'

$(function() {
  $("#submitFrom").click(function(){
    updateName()
  })

  $("#getCode").click(function(){
    getCode()
  })

  $(".goLogin").click(function(){
    window.location.href = 'login.html'
  })

  let langS = sessionStorage.getItem("lang")
  if (langS == "zh") {
    phoneErrorTxt = '手机号码格式不正确'
    codeErrorsTxt = '验证码不正确'
    getBtn = '点击获取'
    resetBtn = '重新获取'
  }
})

//找回用户名
function updateName () {
  let phone = $("#phone").val().trim()
  let codes = $("#code").val().trim()
  if (phone == "") {
    $("#phoneError").css("display","block")
    $(".phone-list").addClass('errorBorder')
  } else if (!phoneReg.test(phone)) {
    $("#phoneError").css("display","block").text(phoneErrorTxt)
    $(".phone-list").addClass('errorBorder')
  } else if (codes == "") {
    $("#codeError").css("display","block")
    $(".code-list").addClass('errorBorder')
  } else if (codes != code) {
    $("#codeError").css("display","block").text(codeErrorsTxt)
    $(".code-list").addClass('errorBorder')
  } else {
    $("#phoneError,#codeError,.pass-content").css("display","none")
    $(".phone-list,.code-list").removeClass('errorBorder')

    $(".name-success").css("display","block")
    $("#code,#phone").val("")

    // $.ajax({
    //   type: "POST",
    //   contentType: "application/json; charset=utf-8",
    //   dataType: "json",
    //   url: "",
    //   data: "{}",
    //   success: function (data) {
    //     console.log(data)
    //   },
    //   error: function (e) {
    //     console.log(e)
    //   }
    // });

    /**
     * 手机号码、验证码验证完成过后  ajax 获取用户名赋值
     * 
     */
    $("#userPhone").text(phone)
    $("#userName").text("123456")
  }
}

//获取验证码
function getCode() {
  let phone = $("#phone").val().trim()
  if (phone == "") {
    $("#phoneError").css("display","block")
    $(".phone-list").addClass('errorBorder')
    $("#phone").focus()
    return
  } else if (!phoneReg.test(phone)) {
    $("#phoneError").css("display","block").text(phoneErrorTxt)
    $(".phone-list").addClass('errorBorder')
    $("#phone").focus()
    return
  }
  /** 
   * 注册发送验证码成功之后，button内容跳转倒计时
   * 
  */
  var times = 60, timer = null;
  timer = setInterval(function () {
    times--;
    if (times <= 0) {
      $("#getCode").text(getBtn);
      clearInterval(timer);
      $("#getCode").attr('disabled', false);
      times = 60;
    } else {
      $("#getCode").text(resetBtn + '（' + times + '）');
      $("#getCode").attr('disabled', true);
    }
  }, 1000);

  code = 123456
  // $.ajax({
  //   type: "POST",
  //   contentType: "application/json; charset=utf-8",
  //   dataType: "json",
  //   url: "",
  //   data: "phone=" + regPhone,
  //   success: function (data) {
  //     console.log(data)
  //     //赋值给 code
  //   },
  //   error: function (e) {
  //     console.log(e)
  //   }
  // });
}

//电话号码
$("#phone").on("input propertychange", debounce(function(){
  let ipt = $(this).val().replace(/[^\d]/g,'')
  $(this).val(ipt)
  if (phoneReg.test(ipt)  && ipt.length == 11 || ipt.length == 0) {
    $("#phoneError").css("display","none")
    $(".phone-list").removeClass('errorBorder')
  } else {
    $("#phoneError").css("display", "block").text(phoneErrorTxt)
    $(".phone-list").addClass('errorBorder')
  }
}, 300))

//验证码
$("#code").on("input propertychange", debounce(function() {
  let ipt = $(this).val().replace(/[^\d]/g,'')
  $(this).val(ipt)
  if(code != ipt) {
    $("#codeError").css("display","block").text(codeErrorsTxt)
    $(".code-list").addClass('errorBorder')
  }
  if (codeReg.test(ipt) && code == ipt) {
    $("#codeError").css("display","none")
    $(".code-list").removeClass('errorBorder')
  }
}, 300))

function debounce(func,wait){
  var timeout;
  return function(){
      var context=this;//用来保存this的正确指向
      var args=arguments;//用来保存触发的事件类型，例如keyboard event
      clearTimeout(timeout);//每次都重新开始计时
      timeout=setTimeout(function(){
          func.apply(context,args);
      },wait);
  }
}