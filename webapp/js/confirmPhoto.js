cardReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))((\d{4})|\d{3}[Xx])$)$/

$(function () {
  /**
   * 根据id显示kyc认证的标题
   * 
   * 4 校验完成
   * 3 未校验 
   * 2 校验中 
   * 1 校验失败 
   * 
   */
  let pageId = GetQueryString("id")
  console.log(pageId)
  
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
    let ipt1 = $("#uploadBtn1").val()
    let ipt2 = $("#uploadBtn2").val()
    let userName = $("#userName").val().trim()
    let userCard = $("#userCard").val().trim()
    if (userName == "") {
      $("#userName").addClass("errorBorder")
      $("#nameError").css("display","block")
    } else if (userCard == "") {
      $("#userCard").addClass("errorBorder") 
      $("#cardError").css("display","block")
    } else if (!cardReg.test(userCard)) {
      $("#userCard").addClass("errorBorder") 
      $("#cardError").css("display","block").text("身份证号码格式不正确")
    } else if (ipt1 == "") {
      alert("请上传身份证正面")
    } else if (ipt2 == "") {
      alert("请上传身份证反面")
    } else {
      alert("提交校验成功")
    }
  })
})

//图片上传
function uploadImg(id, txt, img1, img2, params) {
  if (params.target.files.length == 1) {
    let file = params.target.files[0] || params.dataTransfer.files[0];
    let imgName = document.getElementById(id).files[0].name
    let ext = file.type.split('/')[1]
    let size = file.size/1024
    if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
      alert("请上传正确的图片类型")
    } else if (size > 4096) {
      alert("上传的图片大小不能大于4M")
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
    $("#" +txt+ "").html("未选择图片 ...")
  }
}

//姓名
$("#userName").on("input propertychange",debounce(function() {
  let ipt = $(this).val().replace(/\s+/g, '')
  $(this).val(ipt)
  if (ipt.length > 0) {
    $("#nameError").css("display","none")
    $(this).removeClass('errorBorder')
  }
}, 300))


//身份证
$("#userCard").on("input propertychange",debounce(function() {
  let ipt = $(this).val().replace(/[\u4E00-\u9FA5]/g, '').replace(/\s+/g, '')
  $(this).val(ipt)
  if (cardReg.test(ipt)) {
    $("#cardError").css("display","none")
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

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]); return null;
}