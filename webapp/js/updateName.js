//定义全局变量 -- 验证码
code = ""

$(function() {
  $("#submitFrom").click(function(){
    updateName()
  })

  $("#getCode").click(function(){
    getCode()
  })

  $("#goLogin").click(function(){
    $("#phoneError").css("display","none")
    $(".phone-list").removeClass('errorBorder')
    $("#codeError").css("display","none")
    $(".code-list").removeClass('errorBorder')

    $(".name-success").css("display","none")
    $(".pass-content").css("display","block")
    $("#code").val("")
    $("#phone").val("")
  })
})

//找回用户名
function updateName () {
  let phone = $("#phone").val().trim()
  let codes = $("#code").val().trim()
  if (phone == "") {
    $("#phoneError").css("display","block")
    $(".phone-list").addClass('errorBorder')
  } else if (phone != 123456) {
    alert("手机号码不对")
  } else if (codes == "") {
    $("#codeError").css("display","block")
    $(".code-list").addClass('errorBorder')
  } else if (codes != code) {
    alert("验证码不对")
  } else {
    $("#phoneError").css("display","none")
    $(".phone-list").removeClass('errorBorder')
    $("#codeError").css("display","none")
    $(".code-list").removeClass('errorBorder')

    $(".name-success").css("display","block")
    $(".pass-content").css("display","none")
    $("#code").val("")
    $("#phone").val("")

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