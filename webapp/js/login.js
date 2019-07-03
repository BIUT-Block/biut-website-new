//定义全局变量 -- 验证码
code = ""

$(function () {
  //默认登录
  $("#submitLogin").click(function () {
    login()
  })

  //手机号码登录下一步
  $("#nextLogin").click(function () {
    nextLogin()
  })

  //验证码验证码过后登录
  $("#loginFrom").click(function(){
    codeLogin()
  })

  //获取验证码
  $("#getCode").click(function () {
    getCode()
  })

  //用户名登录
  $("#confirmLogin").click(function(){
    nameLogin ()
  })
})

//登录
function login() {
  let ipt = $("#loginIpt").val().trim()
  if (ipt == "") {
    $("#loginError,#loginError").css("display", "block")
    $(".input-error").addClass("errorBorder")
  } else {
    /**
     * 如果输入成功接口判断返回的是 电话号码登录 还是 用户名登录
     * 
     * 123456 电话号码登录  2 用户名登录
     * 
     */
    $("#loginError,#loginError").css("display", "none")
    $(".input-error").removeClass("errorBorder")
    if (ipt == 123456) {
      $(".login-content").css("display", "none")
      $(".phone-content").css("display", "block")
      $("#confirmPhone").val(ipt)

      $(".error-content").css("display", "none")
    } else {
      $(".login-content").css("display", "none")
      $(".name-content").css("display", "block")

      $("#loginName").text(ipt)
    }
  }
}

//电话号码登录继续下一步
function nextLogin() {
  let val = $("#confirmPhone").val().trim()
  if (val == "" || val != 123456) {
    $(".error-content,#phoneErrorImg").css("display", "block")
    $(".phone-list").addClass("errorBorder")
  } else {
    $(".error-content,#phoneErrorImg,.login-content,.phone-content").css("display", "none")
    $(".code-content").css("display", "block")
    $(".phone-list").removeClass("errorBorder")
    //window.location.href = '../index.html'
  }
}

//验证码登录
function codeLogin() {
  let codes = $("#code").val().trim()
  if (codes == "") {
    $(".code-list").addClass('errorBorder')
    $("#codeError").css("display","block")
  } else if (codes != code) {
    alert("验证码不正确")
    $(".code-list").addClass('errorBorder')
  } else {
    $(".code-list").removeClass('errorBorder')
    $("#codeError,.send,.code-content").css("display","none")
    $(".login-content").css("display", "block")
    window.location.href = '../index.html'
    sessionStorage.setItem("status", '1');
  }
}

//获取验证码
function getCode() {
  let phone = $("#confirmPhone").val().trim()
  /** 
   * 注册发送验证码成功之后，button内容跳转倒计时
   * 
  */
  $(".send").css("display","block")
  var times = 60, timer = null;
  timer = setInterval(function () {
    times--;
    if (times <= 0) {
      $("#getCode").text('点击获取');
      clearInterval(timer);
      $("#getCode").attr('disabled', false);
      times = 60;
    } else {
      $("#getCode").text('重新获取（' + times + '）');
      $("#getCode").attr('disabled', true);
    }
  }, 1000);

  code = 123456
  // $.ajax({
  //   type: "POST",
  //   contentType: "application/json; charset=utf-8",
  //   dataType: "json",
  //   url: "",
  //   data: "phone=" + phone,
  //   success: function (data) {
  //     console.log(data)
  //     //赋值给 code
  //   },
  //   error: function (e) {
  //     console.log(e)
  //   }
  // });
}

//用户名登录
function nameLogin() {
  let pass = $("#pass").val().trim()
  if (pass == "") {
    $("#passError").css("display","block")
    $("#pass").addClass('errorBorder')
  } else if (pass != 123456) {
    alert("密码格式不正确")
  } else {
    $("#pass").removeClass('errorBorder')
    $(".name-content,#passError").css("display","none")
    $(".login-content").css("display", "block")
    window.location.href = '../index.html'

    /**
     * 登录成功之后需要缓存用户的登录状态 或者缓存token  进入相关界面通过token去获取对应的状态
     * 
     * status  登录状态  userPhone    电话号码 
     * userName 用户姓名 userNickName 用户昵称
     * kyc 认证状态 
     * 
     */
    sessionStorage.setItem("status", '1');
  }
}