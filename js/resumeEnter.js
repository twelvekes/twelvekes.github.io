
$(function () {

  document.onmousedown=function () {
    document.onmousemove=function () {
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }
  }
  document.onmouseup=function () {
    document.onmousemove = null;
  }


  var $container = $('.portfolio-items');
  
  if(document.body.offsetWidth < 768){
    $container.css({
      display: 'flex',
      width: '100%',
      overflowX: 'scroll',
      overflowY: 'hidden'
    })
    $('.portfolio-items div').removeClass('col-sm-6 col-md-4 col-lg-4').css({
      width: '75vw',
      display: 'inline-block',
      float: 'left',
      margin: '0 15px 0 5px'
    })
  } else {  
    setTimeout(function () {
      $container.isotope({
        itemSelector : '.portfolio-items > div',
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: true
        }
      });
    },1000)
  }

  project_info();




  $('#resume').fullpage({
      sectionsColor: ['transparent', 'transparent', '#e4e4e4', 'transparent', 'transparent'],

      scrollingSpeed: 700,
      // 是否首尾相接
      // continuousVertical: true,
      normalScrollElementTouchThreshold: 5,
      // 导航条显示
      navigation: true,

      // 内容超出后是否出现滚动条
      scrollOverflow: false,
      // // 左右滑块循环
      loopHorizontal: false,
      // 左右滑块颜色
      controlArrowColor:'#16BA9D',
      // 导航栏设置
      anchors: ['page1', 'page2', 'page3', 'page5', 'page6'],
      menu: '#menu',
      easing: 'easeInOut',

      // 页面渲染后回调
      afterRender: function () {
        // page4 透明背景

        $('item-4').css('background', 'rgba(255, 255, 255, .1)');
        //侧边导航事件
        var Tooltips = ['介绍', '公司概况', '主营业务', '产品展示', '联系方式'];
        $("#fp-nav ul li").each(function (index) {
          this.dataset['toggle'] = 'tooltip';
          this.dataset['placement'] = 'left';
          $(this).attr('title', Tooltips[index])
        })
        $('[data-toggle="tooltip"]').tooltip();


        // 顶部导航栏自动会拉事件
        if ($('.navbar-toggle').css('display') == 'block') {
          $('.navbar-collapse li').on('click', function () {
            $('.navbar-toggle').trigger('click');
          });
        }


        $('#fp-nav').addClass('hidden-xs');

        $('.item-1 .next-page').on('click', function () {
          $.fn.fullpage.moveSectionDown();
        });
        setTimeout(function () {
          $('.item-1 .corner').show();
          $('.resume-hide').show();
        }, 500);
      },

      // 滚动触发后结束前回调
      onLeave: function (index, nextIndex, direction) {

        if(nextIndex==4){
          $('.sky').hide();
        }

        if(nextIndex==6){
          $('.pure').show();
          $('.sky').hide();
        }else {
            $('.item-6 .top').animate({'height': '50%'},400);
            $('.item-6 .foot').animate({'height': '50%'},400);
        }


        switch (index) {
          case 1:
            $('.item-1 .corner').hide();
            $('.resume-hide').hide();
            $('.navbar').removeClass('black');

            break;

          case 2:
            if (direction == 'down') {
              $('.item-2 .icon-infomation').addClass('zoomOutUp');
              setTimeout(function () {
                $('.item-2 .icon-infomation').removeClass('zoomOutUp');
                $('.item-2 .container').hide();
              }, 500);
            } else {
              $('.item-2 .container').hide();
            }
            break;

          case 3:
            $('.item-3 .container').hide();
            $('.navbar').removeClass('blue');
            break;

          case 4:
            $('.item-4 .container').hide();
            break;
        }
      },

      // 滚动结束后回调
      afterLoad: function (anchorLink, index) {
      if(index==6)
        $('.pure').show();
        switch (anchorLink) {
          case 'page1':
            $('.item-1 .corner').show();
            $('.resume-hide').show();
            $('.navbar').addClass('black');
            break;
          case 'page2':
            $('.item-2 .container').show();
            break;
          case 'page3':
            $('.navbar').addClass('blue');
            $('.item-3 .container').show();

            break;
          case 'page4':
            $('.item-4 .container').hide();
            break;

          case 'page5':
            $('.pure').show();
            break;

          case 'page6':
            setTimeout(function () {
              $('.pure').show();
              $('.item-6 .top').animate({'height': '20%'},400);
              $('.item-6 .foot').animate({'height': '20%'},400);
            },500)

            break;
        }
      },

    // 水平滑块回调
      onSlideLeave: function (anchorLink,index,slideIndex,direction) {
          // if(slideIndex==0){
            project_info();
          // }
      },

      // 水平滑块回调
      afterSlideLoad: function (anchorLink,index,slideIndex) {
      }
    }
  )


})


