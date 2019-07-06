$(function(){
  $("#editTxt").click(function(){
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

  $(".kyc-error").css("display","block")


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
  $("#resetApply").click(function(){
    window.location.href = 'confirmPhoto.html'
  })

  //去官网查看
  $("#successLook").click(function(){
    window.location.href = 'about.html?hash=1'
  })

  //取消申请
  $("#cancelApply").click(function(){
    alert("点击了取消申请")
  })

  $("#dataNavList li").click(function(){
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

    } else if (idx == 2) {

    } else if (idx == 3) {
      // 进入榜上有名的界面 根据条件判断显示 什么信息
      $("#noApply").css("display","block")
      $("#centerBasis").css("display","none")
    } else {
      $("#noApply").css("display","none")
      $("#centerBasis").css("display","block")
    }
    
  })
})