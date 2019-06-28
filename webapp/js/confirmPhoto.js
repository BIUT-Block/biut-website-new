$(function () {
  /**
   * 缓存中获取对应的数据
   * 
   * 用户名、绑定手机号码、注册时间
   */
  $("#name").html("TEST123456")
  $("#phone").html("139234567835")
  $("#rgTime").html("2019-01-22")
  /**
   * 身份证正面上传
   */
  $("#uploadBtn1").change(function (e) {
    uploadImg("uploadBtn1", "uploadText1", "uploadImg1", "defaultImg1", e)
  });

  /**
   * 身份证反面上传
   */
  $("#uploadBtn2").change(function (e) {
    uploadImg("uploadBtn2", "uploadText2", "uploadImg2", "defaultImg2", e)
  });


  /**
   * 提交表单
   */
  $("#submitForm").click(function(){
    let ipt1 = $("#uploadBtn1").val().trim()
    let ipt2 = $("#uploadBtn2").val().trim()
    let userName = $("#userName").val().trim()
    let userCard = $("#userCard").val().trim()
    if (userName == "") {
      alert("用户名不能为空")
    } else if (userCard == "") {
      alert("身份证不能为空")
    } else if (ipt1 == "") {
      alert("请上传身份证正面")
    } else if (ipt2 == "") {
      alert("请上传身份证反面")
    }
  })
})

function uploadImg(id, txt, img1, img2, params) {
  if (params.target.files.length == 1) {
    let file = params.target.files[0] || params.dataTransfer.files[0];
    let imgName = document.getElementById(id).files[0].name
    let ext = file.type.split('/')[1]
    let size = file.size/1024
    if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
      alert("请上传正确的图片类型")
    } else if (size > 2048) {
      alert("上传的图片大小不能大于2M")
    } else {
      $("#" +txt+ "").html("已选择图片" + imgName)
      if (file) {
        var reader = new FileReader();
        reader.onload = function () {
          $("#" +img1+ "").css("display", "block").attr("src", this.result);
          $("#" +img2+ "").css("display", "none")
        }
        reader.readAsDataURL(file);
      }
    }
  } else {
    $("#" +img1+ "").css("display", "none").attr("src", "");
    $("#" +img2+ "").css("display", "block")
    $("#" +txt+ "").html("未选择图片")
  }
}
