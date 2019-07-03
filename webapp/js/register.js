//定义全局变量 -- 验证码
code = ""

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
  } else if (regPhone != 123456) {
    alert("电话号码格式不对")
  } else if (regCode == "") {
    $("#codeError").css("display","block")
    $(".code-list").addClass('errorBorder')
  } else if (regCode != code) {
    alert("验证码不对")
  } else if (regName == "") {
    $("#nameError").css("display","block")
    $("#regName").addClass('errorBorder')
  } else if (regPass == "") {
    $("#passError").css("display","block")
    $("#regPass").addClass('errorBorder')
  } else {
    $("#phoneError").css("display","none")
    $("#codeError").css("display","none")
    $("#nameError").css("display","none")
    $("#passError").css("display","none")
    $("#regPass").removeClass('errorBorder').val("")
    $("#regName").removeClass('errorBorder').val("")
    $(".code-list").removeClass('errorBorder')
    $(".phone-list").removeClass('errorBorder')
    $("#regCode").val("")
    $("#regPhone").val("")

    $("#regAccount").html("123456")

    $(".register-success").css("display","block")
    $(".register-content").css("display","none")
  }
}

//获取验证码
function getCode() {
  let regPhone = $("#regPhone").val().trim()
  if (regPhone == "") {
    alert("请输入电话号码")
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