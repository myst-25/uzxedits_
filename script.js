// Small interactions for the portfolio
document.addEventListener('DOMContentLoaded',function(){
  // set current year in footer
  var y = new Date().getFullYear();
  var el = document.getElementById('year');
  if(el) el.textContent = y;

  // simple contact form handler (no backend)
  var form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      alert('Thanks! This is a demo form — integrate a backend to receive messages.');
      form.reset();
    });
  }
  // responsive nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var siteHeader = document.querySelector('.site-header');
  if(navToggle && siteHeader){
    navToggle.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      siteHeader.classList.toggle('open');
    });
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = this.getAttribute('href');
      if(href.length>1){
        var t = document.querySelector(href);
        if(t){
          e.preventDefault();
          t.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
    });
  });

  // iOS Safari: ensure scroll snaps after touchend (small polyfill)
  var main = document.querySelector('main');
  if(main){
    var isTouching = false;
    main.addEventListener('touchstart', function(){ isTouching = true; }, {passive:true});
    main.addEventListener('touchend', function(){
      isTouching = false;
      // trigger a small inertial nudge to make snap align on some iOS versions
      window.requestAnimationFrame(function(){
        main.scrollTop = Math.max(0, main.scrollTop - 0);
      });
    }, {passive:true});
  }
});
