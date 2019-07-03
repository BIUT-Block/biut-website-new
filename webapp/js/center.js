$(function(){
  $("#editTxt").click(function(){
    $("#editContent").removeAttr("readonly").focus()
  })

  $("#dataNavList li").click(function(){
    /**
     * centerUpdate  修改头像
     * noApply       没有申请
     * 
     * applyFailure  申请失败、申请中
     * 
     * applySuccess  申请成功
     * 
     * centerBasis   基础信息
     */
    console.log($(this).index())
  })
})