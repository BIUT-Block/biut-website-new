$(function () {
  $("#submitEmail").click(function () {
    $(".toastCnt").slideDown()
    setTimeout(function () {
      $(".toastCnt").slideUp()
    }, 3000)
  })

  $("#submitEmail").click(function () {
    $(".toast-content").slideDown()
    setTimeout(function () {
      $(".toast-content").slideUp()
    }, 3000)
  })

  //更多项目
  $("#projectMore").click(function(){
    location.href='./pages/about.html';
  })

  //更多新闻
  $("#newsMore").click(function(){
    location.href='/pages/dynamic.html';
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
  // $("#idPeak").html("33118")
  $("#idxHeight1").html("-")
  $("#idxHeight2").html("-")
  $("#idxAffairs1").html("-")
  $("#idxAffairs2").html("-")

  let currentTsp = rd(10, 30);
  $("#idxCurrent").html(currentTsp);

  /**获取节点信息 */
  $.ajax({
    url: 'https://scan.biut.io/nodeinfoapi',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      $('#idxNetwork').html(result.length)
    }
  });

  /**获取全网交易数量 */
  $.ajax({
    url: 'https://scan.biut.io/alltx',
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
    url: 'https://scan.biut.io/blockheight',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      $("#idxHeight1").html(result.secblockheight)
      $("#idxHeight2").html(result.senblockheight)
    }
  });
  getEth()
  getBtc()
  //获取当前系统时间
  $("#indexTime").html(systemTime())

  setInterval(function () {
    getEth()
    getBtc()
    $("#indexTime").html(systemTime())
  }, 40000)

  getPriceHistory("sec_eth", function (data) {
    //console.log(data)
  })

  getPriceHistory("sec_btc", function (data) {
    //console.log(data)
  })

  // getPriceHistory("sec_usdt", function (data) {
  //   let titls = []
  //   let titlss = []
  //   let color = '#59DCB4'
  //   for (var i = 0;i < data.length;i++) {
  //     titls.push(data[i].timestamp)
  //     titlss.push(data[i].price)
  //   }
  //   generateChart(titls, titlss, color)
  // })
});

$(document).ready(function () {
  var mTop = []
  $('.scrollContent').each(function () {
    mTop.push($(this).offset().top)
  });
  
  $('#downLoad').click(function () {
    $("html,body").stop().animate({
      scrollTop: mTop[index] + 1
    }, 600);
  })
  var index = 0
  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop()
    index = getIndex(mTop, scrollTop)
  })

  function getIndex(arr, num) {
    var idx = 0;
    var len = arr.length - 1
    if (num > arr[len]) {
      return len
    }
    for (var index in arr) {
      if (arr[index] > num) {
        idx = index;
        //console.log(mTop[idx],$('.scrollContent').eq(idx).offset().top);
        break;
      }
    }
    return idx;
  }
})

function generateChart(param1, param2, colors) {
  //基于准备好的DOM，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main'));
  //指定图表的配置项和数据
  myChart.clear();
  var option = {
    title: {
      text: ''
    },
    //提示框组件
    tooltip: {
      trigger: 'item',
      //show: true,   //default true
      showDelay: 0,
      hideDelay: 50,
      transitionDuration: 0,
      backgroundColor: colors,
      padding: [4, 8], // [5, 10, 15, 20]
      position: function (p) {
        // 位置回调
        // console.log && console.log(p);
        return [p[0] - 22, p[1] + 15];
      },
      textStyle: {
        color: '#fff',
        fontSize: '12px',
        fontFamily: ''
      },
      formatter: function (param) {
        return '<di> ' + param.value + "<br>" + param.name + '</div>';
      }
    },
    //图例
    legend: {
      data: ['']
    },
    //横轴
    xAxis: {
      data: param1,
      splitLine: {
        show: false
      },
      "axisTick": {
        "show": false
      },
      axisLabel: {
        color: '#fff'
      },
      show: false,
    },
    //纵轴
    yAxis: {
      splitLine: {
        show: false
      }, //y轴刻网格
      "axisTick": {
        "show": false
      }, //y轴刻度线
      "axisLine": {
        "show": false
      }, //隐藏y轴
      show: false
    },
    //系列列表。每个系列通过type决定自己的图表类型
    series: [{
      name: '',
      //折线图
      type: 'line',
      data: param2, //处理小数点数据
      symbolSize: 6,
      lineStyle: {
        color: colors,
        width: '5'
      },
      itemStyle: {
        normal: {
          color: colors, //拐点颜色
          borderColor: colors, //拐点边框颜色
        },

      }
    }]
  };
  //使用刚指定的配置项和数据显示图表
  myChart.setOption(option);
}

/**获取sec btc的信息 */
function getBtc() {
  $.ajax({
    url: 'https://scan.biut.io/market/ticker?symbol=sec_btc',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      var btc_sec = result.data.filter(function (coin) {
        return coin.symbol === 'sec_btc';
      })
      $('#btcPrice').html(btc_sec[0].price);
      $('.btcRiseFalls').html(btc_sec[0].chg.replace('-', '') + '%');
      if (Number(btc_sec[0].chg) < 0) {
        $('.btcRiseFall').html('- ' + Math.abs(btc_sec[0].chg) + '%');
        $('#btcPrice,.btcRiseFall').addClass('price-txt-color1').removeClass('price-txt-color2')
        $('.btcRiseFalls').addClass('failure-bg').removeClass('success-bg')
        $('#btcBgImg').attr("src", '../images/index/price-bg1.png')
      } else {
        $('.btcRiseFall').html('+ ' + Math.abs(btc_sec[0].chg) + '%');
        $('#btcPrice,.btcRiseFall').addClass('price-txt-color2').removeClass('price-txt-color1')
        $('.btcRiseFalls').addClass('success-bg').removeClass('failure-bg')
        $('#btcBgImg').attr("src", '../images/index/price-bg2.png')
      }
    }
  });
}

/**获取sec eth的信息 */
function getEth() {
  $.ajax({
    url: 'https://scan.biut.io/market/ticker?symbol=sec_eth',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      var eth_sec = result.data.filter(function (coin) {
        return coin.symbol === 'sec_eth';
      })
      $('#ethPrice').html(eth_sec[0].price);
      $('.ethRiseFalls').html(eth_sec[0].chg.replace('-', '') + '%');
      if (Number(eth_sec[0].chg) < 0) {
        $('.ethRiseFall').html('- ' + Math.abs(eth_sec[0].chg) + '%');
        $('#ethPrice,.ethRiseFall').addClass('price-txt-color1').removeClass('price-txt-color2')
        $('.ethRiseFalls').addClass('failure-bg').removeClass('success-bg')
        $('#ethBgImg').attr("src", '../images/index/price-bg1.png')
      } else {
        $('.ethRiseFall').html('+ ' + Math.abs(eth_sec[0].chg) + '%');
        $('#ethPrice,.ethRiseFall').addClass('price-txt-color2').removeClass('price-txt-color1')
        $('.ethRiseFalls').addClass('success-bg').removeClass('failure-bg')
        $('#ethBgImg').attr("src", '../images/index/price-bg2.png')
      }
    }
  });

  /**获取sec usdt的信息 */
  $.ajax({
    url: 'https://scan.biut.io/market/ticker?symbol=sec_usdt',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      var data = result.data[0];
      var deltaPrice = Number(data.close) - Number(data.open);
      var chg = (deltaPrice / Number(data.open) * 100).toFixed(2);
      $('#usdtPrice').html(data.close);
      $('.usdTRiseFalls').html(chg.replace('-', '') + '%');
      if (Number(chg) < 0) {
        $('.usdTRiseFall').html('- ' + Math.abs(chg) + '%');
        $('#usdtPrice,.usdTRiseFall').addClass('price-txt-color1').removeClass('price-txt-color2')
        $('.usdTRiseFalls').addClass('failure-bg').removeClass('success-bg')
        $('#usdtBgImg').attr("src", '../images/index/price-bg1.png')
      } else {
        $('.usdTRiseFall').html('+ ' + Math.abs(chg) + '%');
        $('#usdtPrice,.usdTRiseFall').addClass('price-txt-color2').removeClass('price-txt-color1')
        $('.usdTRiseFalls').addClass('success-bg').removeClass('failure-bg')
        $('#usdtBgImg').attr("src", '../images/index/price-bg2.png')
      }
    }
  })

}

/**
 * 获取价格历史信息
 * @param {*} symbol
 * sec_btc 对比特币历史信息
 * sec_eth 对以太币历史信息
 * sec_usdt 对美元历史信息
 * @param {callback} fnAfterGetPrice
 */
function getPriceHistory(symbol, fnAfterGetPrice) {
  let url = 'https://scan.biut.io/market/history?symbol=' + symbol
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function (result) {
      let times = result.t
      let closePrices = result.c
      let prices = []
      for (var i = 4; i < times.length; i++) {
        prices.push({
          timestamp: getDateTime(times[i] * 1000),
          price: closePrices[i].replace(/(?:\.0*|(\.\d+?)0+)$/, '$1')
        })
      }
      fnAfterGetPrice(prices)
    }
  })
}

function getDateTime(time) {
  var oDate = new Date(time),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth() + 1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSen = oDate.getSeconds(),

    //oTime = oYear + '-' + getConnection(oMonth) + '-' + getConnection(oDay) 
    oTime = getConnection(oMonth) + '-' + getConnection(oDay)
  //oTime = oYear + '-' + getConnection(oMonth) + '-' + getConnection(oDay) + ' ' + getConnection(oHour) + ':' + getConnection(oMin) + ':' + getConnection(oSen);
  //oTime = getConnection(oHour) + ':' + getConnection(oMin) + ':' + getConnection(oSen);
  return oTime;
}

function getConnection(num) {
  if (parseInt(num) < 10) {
    num = '0' + num;
  }
  return num;
}

//获取系统时间
function systemTime() {
  var now = new Date()
  let year = now.getFullYear()
  let mounth = now.getMonth() + 1
  let date = now.getDate()
  let day = now.getDay()
  let hours = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  var x = year + "/" + getNow(mounth) + "/" + getNow(date) + " " + getNow(hours) + ":" + getNow(minutes) + ":" + getNow(seconds)
  return x
}

function getNow(s) {
  return s < 10 ? '0' + s : s;
}

function onOpen(ws) {

}

function rd(n, m) {
  var c = m - n + 1;
  return Math.floor(Math.random() * c + n);
}

function heartPackage(ws) {

}