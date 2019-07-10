svg4everybody();

(function () {
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

  var stickFooter = function () {
    var FOOTER = document.querySelector('footer');
    var MAIN = document.querySelector('main');
    var BODY = document.querySelector('body');
    var footerHeight = FOOTER.offsetHeight;
    BODY.style.position = 'relative';
    MAIN.style.marginBottom = footerHeight + 'px';
    FOOTER.style.position = 'absolute';
    FOOTER.style.bottom = '0';
    FOOTER.style.left = '0';
    FOOTER.style.width = '100%';
  };

  if (isIE11) {
    stickFooter();
    window.addEventListener('resize', stickFooter);
  }
})();

var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if (isIE11) {

  var checkoutLabel = document.querySelectorAll('.checkout-form__box label');
  for (var i = 0; i < checkoutLabel.length; i++) {
    checkoutLabel[i].style.display = 'none';
  }

  document.querySelector('.angle').style.display = 'none';
}

// брейкпоиты разрешения экрана
var sizeXl = 1200,
  sizeLg = 992,
  sizeMd = 768,
  sizeSm = 576;

// высота скролла при которой появляется меню на главной странице
var scroll = 80;


// по скроллу задает главному меню position: fixed
$(document).scroll(function () {
  if ($(document).scrollTop() >= scroll && $(window).width() > sizeMd) {
    $('.js-header').addClass('header_medium');
  } else if ($(document).scrollTop() < scroll) {
    $('.js-header').removeClass('header_medium');
  }
});

// убирает класс из js-lang-header при разрешении меньше sizeMd
$(window).resize(function () {
  removeThemeLang();
});

removeThemeLang();

function removeThemeLang() {
  if ($('.js-lang-header') && $(window).outerWidth() <= sizeMd) {
    $('.js-lang-header').removeClass('header_theme_lang');
  } else {
    $('.js-lang-header').addClass('header_theme_lang');
  }
}


// скрывает и показывает элементы при нажатии на кнопку поиск
$(window).resize(function () {
  if ($(window).width() <= sizeMd) {
    $('.js-header-logo').removeClass('hidden');
    $('.js-nav-box').removeClass('hidden');
    $('.header-search-btn').removeClass('hidden');
    $('.js-header-form-box').removeClass('visible-flex');
    $('.hamburger').removeClass('hidden');
  };
});

$('.header-search-btn').click(function () {
  $('.js-header-logo').addClass('hidden');
  // $('.js-nav-box').addClass('hidden');

  if ($(window).width() > sizeMd) {
    $('.header-search-btn').addClass('hidden');
    $('.js-header-form-box').addClass('visible-flex');
    $('.js-nav-box').addClass('hidden');
    $('.js-header-form__input').focus();
  };

  if ($(window).width() <= sizeMd && ($('.hamburger').css('display') == 'block')) {
    $('.hamburger').addClass('hidden');
    $('.js-header-form-box').addClass('visible-flex');
    $('.js-header-form__input').focus();
  } else if ($(window).width() <= sizeMd) {
    $('.hamburger').removeClass('hidden');
    $('.js-header-logo').removeClass('hidden');
    $('.js-header-form-box').removeClass('visible-flex');
  };

});


// закрывает форму на десктопе
$('.header-form-box__btn-close').click(function () {
  $('.js-header-logo').removeClass('hidden');
  $('.js-nav-box').removeClass('hidden');
  $('.js-header-form-box').removeClass('visible-flex');
  $('.header-search-btn').removeClass('hidden');
});


// гамбургер меню
$(window).resize(function () {
  $('.overlay').removeClass('overlay_active');
  $('.nav-box').removeClass('nav-box_mobile-active');
  $('body').css('overflow-y', 'scroll');
});

$('.hamburger').click(function () {
  $('.overlay').addClass('overlay_active');
  $('.nav-box').addClass('nav-box_mobile-active');
  $('body').css('overflow-y', 'hidden');
});

$('.nav-box__mobile-hamburger').click(function () {
  $('.overlay').removeClass('overlay_active');
  $('.nav-box').removeClass('nav-box_mobile-active');
  $('body').css('overflow-y', 'scroll');
});

$('.overlay').click(function () {
  $('.overlay').removeClass('overlay_active');
  $('.nav-box').removeClass('nav-box_mobile-active');
  $('body').css('overflow-y', 'scroll');
});


// центрирует второстепенное меню в зависимости от колличества пунктов
var menuItem = $('.header-menu__item');

switch (menuItem.length) {
  case 6:
    $('.header-menu').addClass('header-menu_item_6');
    break;
  case 5:
    $('.header-menu').addClass('header-menu_item_5');
    break;
  case 4:
    $('.header-menu').addClass('header-menu_item_4');
    break;
  case 3:
    $('.header-menu').addClass('header-menu_item_3');
    break;
}


// настройка высоты первого высокого блока
$(window).resize(function () {
  langHight();
});


setTimeout(function () {
  langHight();
}, 200);

function langHight() {
  var languageItemHeight = Math.floor($('.language__item:nth-child(2)').outerHeight());
  var languageItemMarginBottom = $('.language__item:nth-child(2)').css('margin-bottom');
  var languageHeight = parseFloat(languageItemHeight) * 2 + parseFloat(languageItemMarginBottom);
  $('.language__item_height').css('height', languageHeight + 'px');
};


// popup
$('.banner-content__btn').click(function () {
  $('.popup-overlay').fadeToggle(200);
  $('body').css('overflow', 'hidden');
});

$('.popup__btn').click(function () {
  $('.popup-overlay').fadeToggle(200);
  $('body').css('overflow', 'visible');
});


// mini-course-popup__close (на продакшене настройки появления попапа перененсены в инлайн)
// так как из-за плагина не срабатывал клик
$('.mini-course__info').click(function () {
  $('.mini-course-popup-overlay').fadeIn(200);
});

// $('.mini-course-popup-overlay').click(function() {
//   $('.mini-course-popup-overlay').fadeOut(200);
// });

$('.mini-course-popup__close').click(function () {
  $('.mini-course-popup-overlay').fadeOut(200);
});

$('.mini-course-popup__btn').click(function () {
  $('.mini-course-popup-overlay').fadeOut(200);
});


// кнопка наверх
$('.js-footer-top__btn').click(function () {
  $('body,html').animate({
    scrollTop: '0'
  }, 600);
});

//slick
$('.blog-list').slick({
  slidesToShow: 4,
  accessibility: false,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  arrows: false,
  // centerPadding: '30px',
  responsive: [{
      breakpoint: 992,
      settings: {
        centerMode: true,
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        centerMode: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 576,
      settings: {
        centerMode: true,
        slidesToShow: 1
      }
    }
  ]
});


$('.pp-carousel__list').slick({
  centerMode: true,
  focusOnSelect: true,
  accessibility: false,
  // edgeFriction: '0',
  // centerPadding: '120px',
  slidesToShow: 7,
  infinite: true,
  speed: 300,
  // autoplay: true,
  autoplaySpeed: 2000,
  prevArrow: '<button class="gallery__list-arrow gallery__list-arrow_prev" type="button"><svg><use xlink:href="/themes/demo/assets/images/sprite/svg/symbol/sprite.svg#arrow-pointing-down"></svg></button>',
  nextArrow: '<button class="gallery__list-arrow gallery__list-arrow_next" type="button"><svg><use xlink:href="/themes/demo/assets/images/sprite/svg/symbol/sprite.svg#arrow-pointing-down"></svg</button>',
  responsive: [{
      breakpoint: 1150,
      settings: {
        slidesToShow: 5
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 576,
      settings: {
        centerPadding: '160px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 500,
      settings: {
        centerPadding: '140px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 450,
      settings: {
        centerPadding: '110px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 400,
      settings: {
        centerPadding: '70px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 350,
      settings: {
        centerPadding: '50px',
        slidesToShow: 1
      }
    }
  ]
});

$(".pp-carousel__list").on("init", function (event, slick) {
  if (slick.currentSlide + 1 < 10) {
    $(".gallery__current-item").text('0' + parseInt(slick.currentSlide + 1));
  } else {
    $(".gallery__current-item").text(parseInt(slick.currentSlide + 1));
  };
  if (slick.slideCount < 10) {
    $(".gallery__all-items").text('0' + parseInt(slick.slideCount));
  } else {
    $(".gallery__all-items").text(parseInt(slick.slideCount));
  };
});

$(".pp-carousel__list").on("afterChange", function (event, slick, currentSlide) {
  if (slick.currentSlide + 1 < 10) {
    $(".gallery__current-item").text('0' + parseInt(slick.currentSlide + 1));
  } else {
    $(".gallery__current-item").text(parseInt(slick.currentSlide + 1));
  };
  if (slick.slideCount < 10) {
    $(".gallery__all-items").text('0' + parseInt(slick.slideCount));
  } else {
    $(".gallery__all-items").text(parseInt(slick.slideCount));
  };
});



// таблицы

// наложение тени на фиксированную колонку таблицы
$(".table3").clone(true).appendTo('#table3-box').addClass('table-clone');


try {
  var div = document.getElementById('table3-wrap');

  tableScroll();

  $(window).resize(function () {
    tableScroll();
  });
} catch (err) {}

function tableScroll() {

  if (div.scrollWidth > div.clientWidth) {
    $('.table-clone td:first-child').addClass('fixed-td_active');
  } else {
    $('.table-clone td:first-child').removeClass('fixed-td_active');
  };
};


// flipping
(function () {
  var initFlipping = function (blockClass, headerClass, footerClass) {
    var angle = document.querySelector(blockClass);
    var flag = document.querySelector('.angle__flag');
    var header = document.querySelector(headerClass);
    var footer = document.querySelector(footerClass);

    var onAngleMousedown = function (evt) {
      evt.preventDefault();
      var maxSize = {};
      var footClientRect = footer.getBoundingClientRect();
      var footSize = Math.round(footClientRect.top);
      maxSize.height = innerHeight - (header.offsetHeight + 68 + (innerHeight - footSize));
      flag.style.height = maxSize.height + 'px';
      maxSize.width = flag.offsetWidth;

      var startCoordinate = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onAngleMousemove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoordinate.x - moveEvt.clientX,
          y: startCoordinate.y - moveEvt.clientY,
        };

        startCoordinate = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var scaleBlock = {
          width: angle.offsetWidth + shift.x,
          height: angle.offsetHeight + shift.y
        }

        if (scaleBlock.width <= maxSize.width && scaleBlock.width > 100) {
          angle.style.width = scaleBlock.width + 'px';
        }

        if (scaleBlock.height <= maxSize.height && scaleBlock.height > 100) {
          angle.style.height = scaleBlock.height + 'px';
        }
      };

      var onAngleMouseup = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onAngleMousemove);
        document.removeEventListener('mouseup', onAngleMouseup);
        angle.style.width = '';
        angle.style.height = '';
      };

      document.addEventListener('mousemove', onAngleMousemove);
      document.addEventListener('mouseup', onAngleMouseup);
    };

    if (angle) {
      angle.addEventListener('mousedown', onAngleMousedown);
    }
  };

  initFlipping('.angle', 'header', 'footer');
})();


// selectric стилизация select

$('.checkout-form__select').selectric();
$('.checkout-form__select2').selectric();
$('.mblog-categ-select').selectric();

$(".checkout-form__select").change(function () {
  if ($(".checkout-form__select").val() != '') {
    $('.selectric-checkout-form__select.selectric-below .label').css({
      'color': '#173857',
      'font-size': '14px'
    });
  }
});

$(".checkout-form__select2").change(function () {
  if ($(".checkout-form__select2").val() != '') {
    $('.selectric-checkout-form__select2.selectric-below .label').css({
      'color': '#173857',
      'font-size': '14px'
    });
  }
});


// валидация форм
var productCheckoutForm = document.querySelector('#product-checkout-form');

try {
  productCheckoutForm.addEventListener('submit', function (e) {
    var nameCard = document.querySelector('#name-card'),
      stateProvince = document.querySelector('#state-province'),
      address = document.querySelector('#address'),
      city = document.querySelector('#city'),
      zipCode = document.querySelector('#zip-code'),
      eMail = document.querySelector('#e-mail'),
      cardNumber = document.querySelector('#card-number'),
      securityCode = document.querySelector('#security-code'),
      expirationDate = document.querySelector('#expiration-date'),
      country = document.querySelector('#country'),
      cardType = document.querySelector('#card-type');

    var productCheckoutFormFields = [
      nameCard,
      stateProvince,
      address,
      city,
      zipCode,
      eMail,
      cardNumber,
      securityCode,
      expirationDate
    ];

    var productCheckoutFormSelect = [
      country,
      cardType
    ];

    for (var i = 0; i < productCheckoutFormFields.length; i++) {
      if (!productCheckoutFormFields[i].value) {
        e.preventDefault();
        productCheckoutFormFields[i].classList.add('error');
        productCheckoutFormFields[i].addEventListener('input', function (event) {
          event.target.classList.remove('error');
        })
      }
    };

    for (var y = 0; y < productCheckoutFormSelect.length; y++) {
      if (productCheckoutFormSelect[y].value == '') {
        e.preventDefault();

        var checkoutFormSelectClass = '.' + productCheckoutFormSelect[y].parentNode.parentNode.parentNode.classList[0];
        var selectric = document.querySelector(checkoutFormSelectClass + " " + ".selectric");

        selectric.classList.add('error');
        productCheckoutFormSelect[y].addEventListener('change', function () {
          productCheckoutFormSelect[y].classList.remove('error');
        })
      }
    };
  });
} catch (err) {}




var productCheckoutForm1 = document.querySelector('#product-checkout-form1');

try {
  productCheckoutForm1.addEventListener('submit', function (e) {
    var name1 = document.querySelector('#name1'),
      eMail1 = document.querySelector('#e-mail1'),
      message1 = document.querySelector('#message1');

    var productCheckoutFormFields = [
      name1,
      eMail1,
      message1
    ];

    for (var i = 0; i < productCheckoutFormFields.length; i++) {
      if (!productCheckoutFormFields[i].value) {
        e.preventDefault();
        productCheckoutFormFields[i].classList.add('error');
        productCheckoutFormFields[i].addEventListener('input', function (event) {
          event.target.classList.remove('error');
        })
      }
    };
  });
} catch (err) {}


var productCheckoutForm2 = document.querySelector('#product-checkout-form2');

try {
  productCheckoutForm2.addEventListener('submit', function (e) {
    var name1 = document.querySelector('#name2'),
      eMail1 = document.querySelector('#e-mail2'),
      message1 = document.querySelector('#message2');

    var productCheckoutFormFields = [
      name1,
      eMail1,
      message1
    ];

    for (var i = 0; i < productCheckoutFormFields.length; i++) {
      if (!productCheckoutFormFields[i].value) {
        e.preventDefault();
        productCheckoutFormFields[i].classList.add('error');
        productCheckoutFormFields[i].addEventListener('input', function (event) {
          event.target.classList.remove('error');
        })
      }
    };
  });
} catch (err) {}