$(function () {
  $("#editTxt").click(function () {
    $("#editContent").removeAttr("readonly").focus()
  })

  /**
   * 通过token或者缓存查看数据
   * 
   * kycUserName 用户名 TEST123456
   * 
   * kycName 昵称 张志超
   * 
   * kycRegTime 注册时间 2019-01-22
   * 
   * kycPhone 绑定手机号 139234567835
   * 
   * kyc认证状态
   * 
   * kyc-success    认证成功
   * kyc-error      认证失败
   * kyc-go         认证中
   * kyc-no         未认证
   */
  $("#kycUserName").text("TEST123456")
  $(".kycName").text("张志超")
  $("#kycRegTime").text("2019-01-22")
  $(".kycPhone").text("139234567835")

  $(".kyc-error").css("display", "block")


  /**
   * 申请失败信息
   * 
   * 申请时间  kycApplyTime 2019/02/11 15:27:30
   * 申请结束时间 kycApplyEndTime 2019/02/11 15:27:30
   * 
   *  */
  $(".kycApplyTime").text("2019/02/11 15:27:30")
  $(".kycApplyEndTime").text("2019/02/11 15:27:30")

  /**
   * 申请成功信息
   * 
   * 上榜理由 editContent
   * 排名 kycSuccessRank 10
   * 时间 kycSuccessTime  2019/02/11 15:27:30
   * 
   *  */
  $("#kycSuccessRank").text("10")
  $("#kycSuccessTime").text("2019/02/11 15:27:30")
  $("#editContent").text("1、是的三大")

  /**
   * 申请中
   * 
   * 上榜理由 reason 
   *  */
  $("#reason").text("1、是的三大")

  // 重新申请
  $("#resetApply").click(function () {
    window.location.href = 'confirmPhoto.html'
  })

  //去官网查看
  $("#successLook").click(function () {
    window.location.href = 'about.html?hash=1'
  })

  //取消申请
  $("#cancelApply").click(function () {
    alert("点击了取消申请")
  })

  $("#dataNavList li").click(function () {
    /**
     * centerUpdate  修改头像
     * 
     * noApply       没有申请
     * 
     * applyFailure  申请失败
     * 
     * application   申请中
     * 
     * applySuccess  申请成功
     * 
     * centerBasis   基础信息
     */
    $(this).addClass("active-list").siblings().removeClass("active-list")
    let idx = $(this).index()
    if (idx == 1) {
      $("#noApply").css("display", "none")
      $("#centerBasis").css("display", "block")
    } else {
      // 进入榜上有名的界面 根据条件判断显示 什么信息
      $("#noApply").css("display", "block")
      $("#centerBasis").css("display", "none")
    }

  })

  /**
   * 多行文本框输入监听文字长度
   */
  $("#iptReason").bind("input propertychange", function (event) {
    let ipt = $(this).val()
    if (ipt > 0) {
      $("#reasonError").css("display", "none")
    }
    $("#iptLength").text(ipt.length)
  });

  $("#openMask").click(function () {
    $("#aboutMask").css("display", "block")
    $("body").addClass('ov-h')
    //$("#maskHead").attr("src",``)
    $("#maskName").text("张智超")
  })

  /**
   * 提交榜上有名
   */
  $("#maskSubmit").click(function () {
    let ipt = $("#iptReason").val().trim()
    if (ipt == "") {
      $("#reasonError").css("display","block")
    } else {
      closeMask()
    }
  })

  /**
   * 关闭弹窗
   */
  $("#closeMask").click(function () {
    closeMask()
  })

  //头像列表选择
  $("#recommendList li").click(function(){
    $(this).addClass('active-img').siblings().removeClass("active-img")
  })

  //重新上传头像
  $("#resetImg").click(function(){
    alert("点击了重新上传头像")
  })

  //上传头像
  $("#uploadBtn").change(function(e){
    uploadImg(e)
  })

  //确定修改头像
  $("#saveHead").click(function(){
    alert("点击了保存头像")
  })

  //修改名称
  $("#updateName").click(function(){
    alert("点击了修改名称")
  })
})

//图片上传
function uploadImg(params) {
  if (params.target.files.length == 1) {
    let file = params.target.files[0] || params.dataTransfer.files[0];
    let ext = file.type.split('/')[1]
    let size = file.size / 1024
    if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
      alert("请上传正确的图片格式")
    } else if (size > 4096) {
      alert("图片不能大于4M")
    } else {
      if (file) {
        var reader = new FileReader();
        reader.onload = function () {
          $("#uploadImg").css("display", "block").attr("src", this.result);
        }
        reader.readAsDataURL(file);
      }
    }
  } else {
    $("#uploadImg").css("display", "none").attr("src", "");
  }
}

//关闭弹窗
function closeMask() {
  $("#aboutMask").css("display", "none")
  $("body").removeClass('ov-h')
  $("#iptReason").val("")
  $("#iptLength").text('0')
}