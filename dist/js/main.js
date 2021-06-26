$(function() {
  // cotton
  const arrow = document.querySelector('#arrow-cursor');
  const arrowModels = document.querySelectorAll('[data-cursor-model]');
  new Cotton(arrow, {
    speed: 1,
    models: arrowModels,
    on: {
      enterModel(cursor, model, e) {
        const color = $(model).attr('data-cursor-color');
        if (color) $(cursor).addClass(color);
      },
      leaveModel(cursor, model, e) {
        const color = $(model).attr('data-cursor-color');
        if (color) $(cursor).removeClass(color);
      }
    }
  });
  
  new Cotton('h1', {
    airMode: {
      resistance: 30
    },
  });
  new Cotton('.h1-shadow', {
    airMode: {
      resistance: 20
    },
  });

  // highlightAll
  hljs.highlightAll();

  // gradientText
  gradientText();

  // sidebarActive
  sidebarActive();

  //
  tabSwitch();
});




// detect broswer
function isBrowser() {
  const userAgent = navigator.userAgent;

  let browser = {};

  browser['firefox'] = typeof InstallTrigger !== 'undefined';
  browser['opera'] = (!!window.opr && !!opr.addons) || !!window.opera || userAgent.indexOf(' OPR/') >= 0;
  browser['IE'] = /*@cc_on!@*/false || !!document.documentMode;
  browser['edge'] = !browser['isIE'] && !!window.StyleMedia;
  browser['edgeChromium'] = (/\sedg\//i.test(userAgent) || /edg([ea]|ios)/i.test(userAgent));
  browser['safari'] = !/chrome|crios|crmo/i.test(userAgent) && /safari/i.test(userAgent);
  browser['chrome'] = (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) || /chrome|crios|crmo/i.test(userAgent);

  for (let i = 0; i < Object.keys(browser).length; i ++) {
    if (browser[Object.keys(browser)[i]]) return Object.keys(browser)[i]
  }
}

// gradientText
function gradientText() {
  if (isBrowser() === 'IE' || isBrowser() === 'safari' || isBrowser() === 'opera') return;
  $('h1').addClass('textGradient');
  $('.h1-shadow').addClass('textGradient');
}

// sidebarActive
function sidebarActive() {
  const ids = $('[data-ids]');
  let sm = $(window).scrollTop() + $(window).innerHeight() / 2;

  function detectPos(sm) {
    ids.each(function(i, el) {
      const thisTop = $(el).parent().offset().top,
            thisBot = $(el).parent().offset().top + $(el).parent().innerHeight();
      if (sm > thisTop && sm < thisBot) {
        const idName = el.id;
        $(`.sidebar a[href="#${idName}"]`).addClass('active');
        $('.sidebar a').not(`.sidebar a[href="#${idName}"]`).removeClass('active');
      }
    });
  }

  detectPos(sm);
  $(window).on('scroll', function() {
    sm = $(window).scrollTop() + $(window).innerHeight() / 2;
    detectPos(sm)
  });
}

function tabSwitch() {
  const tabBtn = $('.tabs a');

  tabBtn.on('click', function() {
    const page = $(this).attr('data-tab-for');
    $(this).addClass('active').removeAttr('data-cursor-color').siblings().removeClass('active').attr('data-cursor-color', 'white');
    $('#arrow-cursor').removeClass('white');
    $(this).parent().siblings('.views').find(`.${page}`).addClass('show').siblings().removeClass('show');
  });
}