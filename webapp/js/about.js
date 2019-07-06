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
    let sts = sessionStorage.getItem("status")
    if (sts == 1) {
      $("#aboutMask").css("display", "block")
      $("body").addClass('ov-h')
      //$("#maskHead").attr("src",``)
      $("#maskName").text("张智超")
    } else {
      alert("请先登录")
    }
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

  var str = decodeURI(GetQueryString("hash"))
  if (str == 1) {
    $("html,body").animate({
      scrollTop: $("#member").offset().top
    }, 2000);
  }
})

function closeMask() {
  $("#aboutMask").css("display", "none")
  $("body").removeClass('ov-h')
  $("#iptReason").val("")
  $("#iptLength").text('0')
}

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]); return null;
}