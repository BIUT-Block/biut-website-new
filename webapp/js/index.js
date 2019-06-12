$(function () {
  //获取当前系统时间
  $("#indexTime").html(systemTime())

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
  $("#btcPrice").html("0.00006970")
  $(".btnRiseFall").html("+ " + "5.7" + '%') //需要传递参数判断涨跌  + 涨  - 跌
  $(".btnRiseFalls").html("5.7" + '%')

  $("#ethPrice").html("0.00006970")
  $(".ethRiseFall").html("+ " + "5.7" + '%') //需要传递参数判断涨跌  + 涨  - 跌
  $(".ethRiseFalls").html("5.7" + '%')

  $("#usdtPrice").html("0.00006970")
  $(".useTRiseFall").html("+ " + "5.7" + '%') //需要传递参数判断涨跌  + 涨  - 跌
  $(".useTRiseFalls").html("5.7" + '%')
  
  //默认所有的数据为0
  $("#idxNetwork").html("0")
  $("#idxAccount").html("0")
  $("#idxCurrent").html("0")
  $("#idPeak").html("33118")
  $("#idxHeight1").html("0")
  $("#idxHeight2").html("0")
  $("#idxAffairs1").html("0")
  $("#idxAffairs2").html("0")

  let currentTsp = rd(10, 30);
  $("#idxCurrent").html(currentTsp);

  /**获取sec btc的信息 */
  $.ajax({
    url: 'http://scan.biut.io/forwarding?url=https://trade.coinegg.com/web/symbol/ticker?right_coin=btc',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      console.log("1")
      console.log(result)
      var btc_sec = result.data.filter(function (coin) {
        return coin.symbol === 'sec_btc';
      })
      $('#btcPrice').html(btc_sec[0].price);
      $('.btnRiseFall').html('+ ' + btc_sec[0].chg + '%');
      if (Number(btc_sec[0].chg) < 0) {
        $('.btnRiseFall').html('- ' + Math.abs(btc_sec[0].chg) + '%');
      } else {
        $('.btnRiseFall').html('+ ' + Math.abs(btc_sec[0].chg) + '%');
      }
    },
    error (e) {
      console.log(e)
    }
  });

  /**获取sec eth的信息 */
  $.ajax({
    url: 'http://scan.biut.io/forwarding?url=https://trade.coinegg.com/web/symbol/ticker?right_coin=eth',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      var eth_sec = result.data.filter(function (coin) {
        return coin.symbol === 'sec_eth';
      })
      $('#ethPrice').html(eth_sec[0].price);
      $('.ethRiseFall').html('+ ' + eth_sec[0].chg + '%');
      if (Number(eth_sec[0].chg) < 0) {
        $('.ethRiseFall').html('- ' + Math.abs(eth_sec[0].chg) + '%');
      } else {
        $('.ethRiseFall').html('+ ' + Math.abs(eth_sec[0].chg) + '%');
      }
      getEthPrice(eth_sec[0].price, eth_sec[0].chg);
    }
  });

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
});

function getEthPrice (price, chg) {
  $.ajax({
    url: 'https://market.coinegg.com/market/ticker?symbol=eth_usdt',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      var currentUSDT = Number(price) * Number(result.data[0].close);
      $('#usdtPrice').html(currentUSDT.toFixed(2));
      if (Number(chg) < 0) {
        $('.useTRiseFall').html('- ' + Math.abs(chg) + '%');
      } else {
        $('.useTRiseFall').html('+ ' + Math.abs(chg) + '%');
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