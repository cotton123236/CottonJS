$(function() {
  const cursor = new Cotton('#arrow-cursor', {
    speed: 1,
    models: '[data-cursor-model]',
    on: {
      modelEnter: function(cursor, model) {
        const color = $(model).attr('data-cursor-color');
        if (color) $(cursor).addClass(color);
      },
      modelLeave: function(cursor, model) {
        const color = $(model).attr('data-cursor-color');
        if (color) $(cursor).removeClass(color);
      },
    }
  });
  
  const h1 = new Cotton('h1', {
    airMode: {
      resistance: 1
    }
  });
  const h1Shadow = new Cotton('.h1-shadow', {
    airMode: {
      resistance: 1
    }
  })
  hljs.highlightAll();

  gradientText();
});



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

function gradientText() {
  if (isBrowser() === 'IE' || isBrowser() === 'safari' || isBrowser() === 'opera') return;
  $('h1').addClass('textGradient');
  $('.h1-shadow').addClass('textGradient');
}