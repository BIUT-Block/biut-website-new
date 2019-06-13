$(function () {
  //获取当前系统时间
  $("#indexTime").html(systemTime())

  $("#downLoad").click(function () {
    $("html,body").animate({
      scrollTop: $("#aboutProject").offset().top
    }, 1500);
  })

  $("#submitEmail").click(function(){
    $(".toastCnt").slideDown()
    setTimeout(function(){ 
      $(".toastCnt").slideUp()
    }, 3000)
  })

  //微信图片hover效果
  $('#biutWx').hover(function(){
    $('#biutWxActiveImg').slideDown();
    $('#biutWxImg').attr('src', '../images/index/weixins.png')
  },function(){
    $('#biutWxActiveImg').slideUp();
    $('#biutWxImg').attr('src', '../images/index/weixin.png')
  })
  //微博图片hover效果
  $('#biutWb').mouseover(function () {
    $('#biutWbImg').attr('src', '../images/index/weibos.png')
  })
  $('#biutWb').mouseout(function () {
    $('#biutWbImg').attr('src', '../images/index/weibo.png')
  })

  //推特图片hover效果
  $('#biutTw').mouseover(function () {
    $('#biutTwImg').attr('src', '../images/index/twiters.png')
  })
  $('#biutTw').mouseout(function () {
    $('#biutTwImg').attr('src', '../images/index/twiter.png')
  })

  //plan图片hover效果
  $('#biutPl').mouseover(function () {
    $('#biutPlImg').attr('src', '../images/index/planes.png')
  })
  $('#biutPl').mouseout(function () {
    $('#biutPlImg').attr('src', '../images/index/plane.png')
  })

  //facebooks图片hover效果
  $('#biutFb').mouseover(function () {
    $('#biutFbImg').attr('src', '../images/index/facebooks.png')
  })
  $('#biutFb').mouseout(function () {
    $('#biutFbImg').attr('src', '../images/index/facebook.png')
  })

  //monkey图片hover效果
  $('#biutMk').mouseover(function () {
    $('#biutMkImg').attr('src', '../images/index/monkeys.png')
  })
  $('#biutMk').mouseout(function () {
    $('#biutMkImg').attr('src', '../images/index/monkey.png')
  })

  //价格数据
  $("#btcPrice").html("-")
  $(".btcRiseFall").html("-" + '%') //需要传递参数判断涨跌  + 涨  - 跌
  $(".btcRiseFalls").html("-" + '%')

  $("#ethPrice").html("-")
  $(".ethRiseFall").html("-" + '%') //需要传递参数判断涨跌  + 涨  - 跌
  $(".ethRiseFalls").html("-" + '%')

  $("#usdtPrice").html("-")
  $(".usdTRiseFall").html("-" + '%') //需要传递参数判断涨跌  + 涨  - 跌
  $(".usdTRiseFalls").html("-" + '%')
  
  //默认所有的数据为0
  $("#idxNetwork").html("-")
  $("#idxAccount").html("-")
  $("#idxCurrent").html("-")
  $("#idPeak").html("33118")
  $("#idxHeight1").html("-")
  $("#idxHeight2").html("-")
  $("#idxAffairs1").html("-")
  $("#idxAffairs2").html("-")

  let currentTsp = rd(10, 30);
  $("#idxCurrent").html(currentTsp);

  /**获取节点信息 */
  $.ajax({
    url: 'http://scan.biut.io/nodeinfoapi',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      $('#idxNetwork').html(result.length)
    }
  });

  /**获取全网交易数量 */
  $.ajax({
    url: 'http://scan.biut.io/alltx',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      var totalUsers = []
      $('#idxAffairs1').html(result.sectx.length);
      $("#idxAffairs2").html(result.sentx.length);
      
      for (var i = 0; i < result.sectx.length; i++) {
        if (totalUsers.indexOf(result.sectx[i].TxFrom) === -1) {
          totalUsers.push(result.sectx[i].TxFrom);
        }
        if (totalUsers.indexOf(result.sectx[i].TxTo) === -1) {
          totalUsers.push(result.sectx[i].TxTo);
        }
      }
      for (var j = 0; j < result.sentx.length; j++) {
        if (totalUsers.indexOf(result.sentx[j].TxFrom) === -1) {
          totalUsers.push(result.sentx[i].TxFrom);
        }
        if (totalUsers.indexOf(result.sentx[j].TxTo) === -1) {
          totalUsers.push(result.sentx[i].TxTo);
        }
      }
      $('#idxAccount').html(totalUsers.length)
    }
  })

  /**获取区块高度 */
  $.ajax({
    url: 'http://scan.biut.io/blockchain',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      $("#idxHeight1").html(result.secblockchain.length - 1)
      $("#idxHeight2").html(result.senblockchain.length - 1)
    }
  });
  getEth()
  getBtc()

  setInterval(function(){
    getEth()
    getBtc()
  }, 40000)
});

/**获取sec btc的信息 */
function getBtc() {
  $.ajax({
    url: 'http://scan.biut.io/market/ticker?symbol=sec_btc',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      var btc_sec = result.data.filter(function (coin) {
        return coin.symbol === 'sec_btc';
      })
      $('#btcPrice').html(btc_sec[0].price);
      $('.btcRiseFalls').html(btc_sec[0].chg.replace('-','') + '%');
      if (Number(btc_sec[0].chg) < 0) {
        $('.btcRiseFall').html('- ' + Math.abs(btc_sec[0].chg) + '%');
        $('#btcPrice,.btcRiseFall').addClass('price-txt-color1').removeClass('price-txt-color2')
        $('.btcRiseFalls').addClass('failure-bg').removeClass('success-bg')
        $('#btcBgImg').attr("src",'../images/index/price-bg1.png')
      } else {
        $('.btcRiseFall').html('+ ' + Math.abs(btc_sec[0].chg) + '%');
        $('#btcPrice,.btcRiseFall').addClass('price-txt-color2').removeClass('price-txt-color1')
        $('.btcRiseFalls').addClass('success-bg').removeClass('failure-bg')
        $('#btcBgImg').attr("src",'../images/index/price-bg2.png')
      }
    }
  });
}


 /**获取sec eth的信息 */
 function getEth() {
  $.ajax({
    url: 'http://scan.biut.io/market/ticker?symbol=sec_eth',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      var eth_sec = result.data.filter(function (coin) {
        return coin.symbol === 'sec_eth';
      })
      $('#ethPrice').html(eth_sec[0].price);
      $('.ethRiseFalls').html(eth_sec[0].chg.replace('-','') + '%');
      if (Number(eth_sec[0].chg) < 0) {
        $('.ethRiseFall').html('- ' + Math.abs(eth_sec[0].chg) + '%');
        $('#ethPrice,.ethRiseFall').addClass('price-txt-color1').removeClass('price-txt-color2')
        $('.ethRiseFalls').addClass('failure-bg').removeClass('success-bg')
        $('#ethBgImg').attr("src",'../images/index/price-bg1.png')
      } else {
        $('.ethRiseFall').html('+ ' + Math.abs(eth_sec[0].chg) + '%');
        $('#ethPrice,.ethRiseFall').addClass('price-txt-color2').removeClass('price-txt-color1')
        $('.ethRiseFalls').addClass('success-bg').removeClass('failure-bg')
        $('#ethBgImg').attr("src",'../images/index/price-bg2.png')
      }
      getEthPrice(eth_sec[0].price, eth_sec[0].chg);
    }
  });
}

/** 获取usdt */
function getEthPrice (price, chg) {
  $.ajax({
    url: 'http://scan.biut.io/market/ticker?symbol=eth_usdt',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      var currentUSDT = Number(price) * Number(result.data[0].close);
      $('#usdtPrice').html(currentUSDT.toFixed(2));
      $('.usdTRiseFalls').html(chg.replace('-','') + '%');
      if (Number(chg) < 0) {
        $('.usdTRiseFall').html('- ' + Math.abs(chg) + '%');
        $('#usdtPrice,.usdTRiseFall').addClass('price-txt-color1').removeClass('price-txt-color2')
        $('.usdTRiseFalls').addClass('failure-bg').removeClass('success-bg')
        $('#usdtBgImg').attr("src",'../images/index/price-bg1.png')
      } else {
        $('.usdTRiseFall').html('+ ' + Math.abs(chg) + '%');
        $('#usdtPrice,.usdTRiseFall').addClass('price-txt-color2').removeClass('price-txt-color1')
        $('.usdTRiseFalls').addClass('success-bg').removeClass('failure-bg')
        $('#usdtBgImg').attr("src",'../images/index/price-bg2.png')
      }
    }
  })
}

//获取系统时间
function systemTime () {
  var now = new Date()
	let year = now.getFullYear()
	let mounth = now.getMonth() + 1
	let date = now.getDate()
	let day =	now.getDay()
	let hours =	now.getHours()
	let minutes =	now.getMinutes()
  let seconds =	now.getSeconds()
  var x = year + "/" +getNow(mounth) + "/" +getNow(date) + " " + getNow(hours) + ":" +getNow(minutes) + ":" +getNow(seconds)
  return x
}

function getNow(s) {
  return s < 10 ? '0' + s: s;
}

function onOpen (ws) {
  
}

function rd(n,m){
  var c = m-n+1;  
  return Math.floor(Math.random() * c + n);
}

function heartPackage (ws) {

}