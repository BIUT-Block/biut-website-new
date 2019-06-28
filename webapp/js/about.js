$(function () {
  /** 
   * 查看更多历史记录
   */
  $("#lookTime").click(function () {
    location.href = 'about-history.html';
  });

  /**
   * 多行文本框输入监听文字长度
   */
  $("#iptReason").bind("input propertychange", function (event) {
    let ipt = $(this).val()
    $("#iptLength").text(ipt.length)
  });

  /**
   * 点击切换一批
   */
  $("#membersTab").click(function () {
    alert("点击了换一换")
  })

  /**
   * 我要榜上有名
   * 
   * maskHead 头像  maskName 用户名昵称
   * 
   * 如果没有登陆信息就需要先登陆
   */
  $("#openMask").click(function () {
    $("#aboutMask").css("display", "block")
    //$("#maskHead").attr("src",``)
    //$("#maskName").text("")
    $("body").addClass('ov-h')
  })

  /**
   * 提交榜上有名
   */
  $("#maskSubmit").click(function () {
    let ipt = $("#iptReason").val().trim()
    if (ipt == "") {
      alert("请输入榜上有名的理由")
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
})

function closeMask() {
  $("#aboutMask").css("display", "none")
  $("body").removeClass('ov-h')
}