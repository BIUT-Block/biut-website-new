$(function(){
  $("#downClient").click(function(){
    let flg = $("#downApp").is(":visible")
    if (flg) {
      $("#downApp").fadeOut(1200)
    } else {
      $("#downApp").fadeIn(1200)
    }
  })

  $.get('https://api.github.com/repositories/158717489/releases', (res) => {
    if (res) {
      if (res[0].assets[0].name.substring(res[0].assets[0].name.length - 3, res[0].assets[0].name.length) === 'exe') {
        $('#download-win').attr('href', res[0].assets[0].browser_download_url)
        $('#download-mac').attr('href', res[0].assets[1].browser_download_url)
      } else {
        $('#download-win').attr('href', res[0].assets[1].browser_download_url)
        $('#download-mac').attr('href', res[0].assets[0].browser_download_url)
      }
    }
  })
})