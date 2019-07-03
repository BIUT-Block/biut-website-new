$(function(){
  $("#downClient").click(function(){
    let flg = $("#downApp").is(":visible")
    if (flg) {
      $("#downApp").fadeOut(1200)
    } else {
      $("#downApp").fadeIn(1200)
    }
  })
})