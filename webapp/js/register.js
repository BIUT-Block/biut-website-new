//定义全局变量 -- 验证码
code = ""
phoneReg = /^1[3456789]\d{9}$/
passReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,30}$/
codeReg = /^\d{6}$/

phoneErrorTxt = 'Incorrect phone number format'
codeErrorsTxt = 'The verification code is incorrect'
passErrorTxt = 'Incorrect password format'
getBtn = 'click get'
resetBtn = 'Reacquire'

$(function () {
  $("#submitReg").click(function () {
    register()
  })

  $("#getCode").click(function () {
    getCode()
  })

  $("#goLogin").click(function(){
    $(".register-success").css("display","none")
    $(".register-content").css("display","block")
    window.location.href = 'login.html'
  })

  let langS = sessionStorage.getItem("lang")
  if (langS == "zh") {
    phoneErrorTxt = '手机号码格式不正确'
    codeErrorsTxt = '验证码不正确'
    passErrorTxt = '密码格式不正确'
    getBtn = '点击获取'
    resetBtn = '重新获取'
  }
})

//注册
function register() {
  let regPhone = $("#regPhone").val().trim()
  let regCode = $("#regCode").val().trim()
  let regName = $("#regName").val().trim()
  let regPass = $("#regPass").val().trim()
  if (regPhone == "") {
    $("#phoneError").css("display","block")
    $(".phone-list").addClass('errorBorder')
  } else if (!phoneReg.test(regPhone)) {
    $("#phoneError").css("display","block").text(phoneErrorTxt)
    $(".phone-list").addClass('errorBorder')
  } else if (regCode == "") {
    $("#codeError").css("display","block")
    $(".code-list").addClass('errorBorder')
  } else if (regCode != code) {
    $("#codeError").css("display","block").text(codeErrorsTxt)
    $(".code-list").addClass('errorBorder')
  } else if (regName == "") {
    $("#nameError").css("display","block")
    $("#regName").addClass('errorBorder')
  } else if (regPass == "") {
    $("#passError").css("display","block")
    $("#regPass").addClass('errorBorder')
  } else if (!passReg.test(regPass)) {
    $("#passError").css("display","block").text(passErrorTxt)
    $("#regPass").addClass('errorBorder')
  } else {
    $("#phoneError,#codeError,#nameError,#passError,.register-content").css("display","none")
    
    $("#regPass,#regName").removeClass('errorBorder').val("")
    $(".code-list,.phone-list").removeClass('errorBorder')
    $("#regCode,#regPhone").val("")

    
    $(".register-success").css("display","block")

    $("#regAccount").html("123456")
  }
}

//获取验证码
function getCode() {
  let regPhone = $("#regPhone").val().trim()
  if (regPhone == "") {
    $("#phoneError").css("display","block")
    $(".phone-list").addClass('errorBorder')
    $("#regPhone").focus()
    return
  } else if (!phoneReg.test(regPhone)) {
    $("#phoneError").css("display","block").text(phoneErrorTxt)
    $(".phone-list").addClass('errorBorder')
    $("#regPhone").focus()
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
$("#regPhone").on("input propertychange", debounce(function(){
  let ipt = $(this).val().replace(/[^\d]/g,'')
  $(this).val(ipt)
  if (phoneReg.test(ipt) && ipt.length == 11 || ipt.length == 0) {
    $("#phoneError").css("display", "none")
    $(".phone-list").removeClass('errorBorder')
  } else {
    $("#phoneError").css("display", "block").text(phoneErrorTxt)
    $(".phone-list").addClass('errorBorder')
  }
}, 300))

//验证码
$("#regCode").on("input propertychange", debounce(function() {
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

//密码
$("#regPass").on("input propertychange",debounce(function() {
  let ipt = $(this).val().replace(/[\u4E00-\u9FA5]/g, '').replace(/\s+/g, '')
  $(this).val(ipt)
  if (passReg.test(ipt)) {
    $("#passError").css("display","none")
    $(this).removeClass('errorBorder')
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

