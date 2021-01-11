$('body').ready(function () {
  setTimeout(function () {
    $('.MouseTrail').append(
      '<i class="fa fa-angle-left" aria-hidden="true"></i><i class="fa fa-angle-right" aria-hidden="true"></i>'
    );
  }, 2000);

  $('.menu-navigation .slider-item').hover(
    function () {
      $('.MouseTrail i').css({ display: 'block' });
      $('.MouseTrail').css({
        transition: '0.2s',
        opacity: '0.8',
        transform: 'scale(1.3)',
      });
      $('body').addClass('drag-cur');
    },
    function () {
      $('.MouseTrail i').css('display', 'none');
      $('.MouseTrail').css({ transition: '0s', transform: 'scale(1)' });
      $('body').removeClass('drag-cur');
    }
  );



  var mouse_down = false;

  $(function () {
    var isDragging = false;
    $('.nav-box')
      .mousedown(function () {
        mouse_down = true;
        isDragging = false;
        // $('.menu-main').css('transform','skew(5deg)');

        var bodyElement = document.querySelector('.menu-navigation');
        bodyElement.addEventListener('mousemove', getMouseDirection, false);

        var oldX = 0;
        var oldY = 0;

        function getMouseDirection(e) {
          //deal with the horizontal case
          if (mouse_down) {
            if (oldX < e.pageX) {
              $('.menu-main')
                .addClass('right-drag')
                .removeClass('left-drag remove-drag');
            } else {
              $('.menu-main')
                .addClass('left-drag')
                .removeClass('right-drag remove-drag');
            }

            oldX = e.pageX;
            oldY = e.pageY;
          }
        }
      })

      .mousemove(function () {
        isDragging = true;
      })
      .mouseup(function () {
        mouse_down = false;
        $('.menu-main').addClass('remove-drag').removeClass('right-drag left-drag');
        var wasDragging = isDragging;
        isDragging = false;
        if (!wasDragging) {
          $('.main-body-content').addClass('dis-none').removeClass('dis-block');
          var idname = $(this).attr('id');
          // alert(idname);
          $('.' + idname)
            .removeClass('bounceOut trans-close dis-none')
            .addClass('trans-open dis-block bounceIn');

          $('.menu-navigation').fadeOut('slow').removeClass('visi');
          $('.open-s').show();
          $('.close-s').hide();
          $('.dot-s').removeClass('big-s');
        }
      });
  });

  var dots = [],
    mouse = {
      x: 0,
      y: 0,
    };

  var Dot = function () {
    this.x = 0;
    this.y = 0;
    this.node = (function () {
      var n = document.createElement('div');
      n.className = 'MouseTrail';
      document.body.appendChild(n);
      return n;
    })();
  };

  Dot.prototype.draw = function () {
    this.node.style.left = this.x + 'px';
    this.node.style.top = this.y + 'px';
  };

  for (var i = 0; i < 1; i++) {
    var d = new Dot();
    dots.push(d);
  }

  function draw() {
    var x = mouse.x,
      y = mouse.y;

    dots.forEach(function (dot, index, dots) {
      var nextDot = dots[index + 1] || dots[0];

      dot.x = x;
      dot.y = y;
      dot.draw();
      x += (nextDot.x - dot.x) * 0.6;
      y += (nextDot.y - dot.y) * 0.6;
    });
  }

  addEventListener('mousemove', function (event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
  });

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  animate();

  // hover cursor
  $('.open-close button').hover(
    function () {
      $('.MouseTrail').css({ transition: '0.2s', transform: 'scale(2)' });
    },
    function () {
      $('.MouseTrail').css({ transition: '0s', transform: 'scale(1)' });
    }
  );

  // hoverable movement
  var docWidth = $('body').width(),
    slidesWidth = $('.container').width(),
    rangeX = slidesWidth - docWidth,
    $images = $('.container');

  $(window).on('resize', function () {
    var docWidth = $('body').width(),
      slidesWidth = $('.container').width(),
      rangeX = slidesWidth - docWidth;
  });

  $(document).on('mousemove', function (e) {
    var mouseX = e.pageX,
      percentMouse = (mouseX * 100) / docWidth,
      offset =
        (percentMouse / 100) * slidesWidth - (percentMouse / 100) * docWidth;

    $images.css({
      '-webkit-transform':
        'translate3d(' +
        offset / 20 +
        'px,0,0) rotateY(' +
        offset / 100 +
        'deg)',
      transform:
        'translate3d(' +
        offset / 20 +
        'px,0,0) rotateY(' +
        offset / 100 +
        'deg)',
    });
  });

  // slick slider js start
  const slider = $('.slider-item');
  slider.slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 1000,
    draggable: true,
    centerMode: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    cssEase: 'linear',
    rows: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });

  slider.on('wheel', function (e) {
    e.preventDefault();

    if (e.originalEvent.deltaY < 0) {
      $(this).slick('slickNext');
    } else {
      $(this).slick('slickPrev');
    }
  });
  // slick slider js start

  // animate js start
  var wow = new WOW({
    boxClass: 'wow', // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: true, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    callback: function (box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null, // optional scroll container selector, otherwise use window,
    resetAnimation: true, // reset animation on end (default is true)
  });

  wow.init();
  // animate js end

  $('.open-s').on('click', function () {
    $('.dot-s').addClass('big-s');
    $('.main-body-content')
      .addClass('bounceOut animated')
      .removeClass('trans-open bounceIn');

    setTimeout(function () {
      $('.main-body-content').addClass('trans-close animated');
      $('.menu-navigation').addClass('zoomIn').addClass('visi');

      // $(".slick-slider .slick-track").css("transform", "translate3d(400px, 0px, 0px)");
    }, 2000);

    $('.close-s').show();
    $(this).hide();
  });

  $('.close-s').on('click', function () {
    $('.dot-s').removeClass('big-s');
    setTimeout(function () {
      $('.main-body-content')
        .removeClass('bounceOut trans-close ')
        .addClass('trans-open animated');
    }, 100);
    $('.menu-navigation').fadeOut('slow').removeClass('visi');
    $('.open-s').show();
    $(this).hide();
  });

  // var textWrapper = document.querySelector('.main-head .letters');
  // textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  $('.main-head .leter').html(function (index, html) {
    return html.replace(/\S/g, '<span>$&</span>');
  });
});

window.onload = function () {
  // $(".main-body-content").fadeIn("slow").addClass("trans-open").removeClass("trans-close");
};
