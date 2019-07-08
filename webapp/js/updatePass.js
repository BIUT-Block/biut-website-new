$(function(){
  $("#getCode").click(function(){
    getCode()
  })
})

//获取验证码
function getCode() {
  let phone = $("#phone").val().trim()
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