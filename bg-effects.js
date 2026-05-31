/**
 * bg-effects.js — Animated background effects
 * Handles: Soft orbs (canvas), twinkling stars, sakura petals, pulse rings
 *
 * Auth page needs:  <canvas id="authBg">  + <div id="petals"> + <div id="stars">
 * App page  needs:  <canvas id="meshBg">
 *
 * Usage: <script src="js/bg-effects.js"></script>
 */

(function () {

  /* ══════════════════════════════════
     AUTH PAGE — soft orbs on canvas
     ══════════════════════════════════ */
  var authCanvas = document.getElementById('authBg');
  if (authCanvas) {
    var ctx = authCanvas.getContext('2d');
    var W, H;

    var ORBS = [
      { x: .15, y: .20, h: 245, r: .38, sx: .22, sy: .18, px: 0,   py: 0,   a: .22 },
      { x: .80, y: .75, h: 320, r: .32, sx: .18, sy: .25, px: 1.1, py: .7,  a: .18 },
      { x: .55, y: .10, h: 195, r: .28, sx: .28, sy: .20, px: 2.3, py: 1.4, a: .14 },
      { x: .20, y: .80, h: 270, r: .25, sx: .15, sy: .22, px: .5,  py: 2.1, a: .12 },
      { x: .85, y: .35, h: 210, r: .22, sx: .20, sy: .16, px: 3.1, py: .3,  a: .10 },
    ];
    var t = 0;

    function resizeAuth() {
      W = authCanvas.width  = window.innerWidth;
      H = authCanvas.height = window.innerHeight;
    }
    resizeAuth();
    window.addEventListener('resize', resizeAuth);

    (function drawAuth() {
      ctx.clearRect(0, 0, W, H);
      ORBS.forEach(function (p) {
        var ox  = Math.sin(t * p.sx + p.px) * .10;
        var oy  = Math.cos(t * p.sy + p.py) * .08;
        var px  = (p.x + ox) * W;
        var py  = (p.y + oy) * H;
        var r   = p.r * Math.max(W, H);
        var hue = p.h + Math.sin(t * .15 + p.px) * 12;
        var g   = ctx.createRadialGradient(px, py, 0, px, py, r);
        g.addColorStop(0,   'hsla(' + hue + ',65%,55%,' + p.a + ')');
        g.addColorStop(.5,  'hsla(' + hue + ',60%,48%,' + (p.a * .4) + ')');
        g.addColorStop(1,   'hsla(' + hue + ',55%,40%,0)');
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      t += .006;
      requestAnimationFrame(drawAuth);
    })();
  }


  /* ══════════════════════════════════
     APP PAGE — mesh gradient canvas
     ══════════════════════════════════ */
  var meshCanvas = document.getElementById('meshBg');
  if (meshCanvas) {
    var mctx = meshCanvas.getContext('2d');
    var mW, mH;

    var P = [
      { x: .08, y: .15, h: 245, r: .55, sx: .28, sy: .22, px: 0,   py: 0   },
      { x: .55, y: .08, h: 270, r: .50, sx: .20, sy: .35, px: 1.1, py: .7  },
      { x: .92, y: .22, h: 300, r: .52, sx: .33, sy: .18, px: 2.3, py: 1.4 },
      { x: .18, y: .82, h: 220, r: .50, sx: .25, sy: .28, px: .5,  py: 2.1 },
      { x: .72, y: .75, h: 255, r: .55, sx: .30, sy: .24, px: 3.1, py: .3  },
      { x: .50, y: .50, h: 285, r: .48, sx: .18, sy: .32, px: 1.7, py: 1.9 },
      { x: .85, y: .55, h: 235, r: .45, sx: .22, sy: .20, px: 4.0, py: 2.8 },
      { x: .25, y: .45, h: 310, r: .45, sx: .26, sy: .30, px: 2.6, py: .9  },
    ];
    var mt = 0;

    function resizeMesh() {
      mW = meshCanvas.width  = window.innerWidth;
      mH = meshCanvas.height = window.innerHeight;
    }
    resizeMesh();
    window.addEventListener('resize', resizeMesh);

    (function drawMesh() {
      mctx.clearRect(0, 0, mW, mH);
      P.forEach(function (p) {
        var ox  = Math.sin(mt * p.sx + p.px) * .13;
        var oy  = Math.cos(mt * p.sy + p.py) * .10;
        var px  = (p.x + ox) * mW;
        var py  = (p.y + oy) * mH;
        var r   = p.r * Math.max(mW, mH);
        var hue = p.h + Math.sin(mt * .18 + p.px) * 18;
        var g   = mctx.createRadialGradient(px, py, 0, px, py, r);
        g.addColorStop(0,   'hsla(' + hue + ',72%,52%,.26)');
        g.addColorStop(.45, 'hsla(' + hue + ',65%,45%,.10)');
        g.addColorStop(1,   'hsla(' + hue + ',60%,38%,0)');
        mctx.beginPath();
        mctx.arc(px, py, r, 0, Math.PI * 2);
        mctx.fillStyle = g;
        mctx.fill();
      });
      mt += .008;
      requestAnimationFrame(drawMesh);
    })();
  }


  /* ══════════════════════════════════
     AUTH PAGE — twinkling stars
     ══════════════════════════════════ */
  var starsWrap = document.getElementById('stars');
  if (starsWrap) {
    for (var i = 0; i < 60; i++) {
      var s  = document.createElement('div');
      var sz = Math.random() < .25 ? 3 : 2;
      s.style.cssText =
        'position:fixed;width:' + sz + 'px;height:' + sz + 'px;background:#fff;border-radius:50%;' +
        'top:'  + (Math.random() * 100).toFixed(1) + '%;' +
        'left:' + (Math.random() * 100).toFixed(1) + '%;' +
        'animation:twinkle ' + (2 + Math.random() * 4).toFixed(1) + 's ' +
          (Math.random() * 4).toFixed(1) + 's ease-in-out infinite;' +
        'pointer-events:none;z-index:2';
      starsWrap.appendChild(s);
    }
  }


  /* ══════════════════════════════════
     AUTH PAGE — sakura petals
     ══════════════════════════════════ */
  var petalsWrap = document.getElementById('petals');
  if (petalsWrap) {
    var colors = ['#f9a8d4','#fda4af','#f472b6','#fb7185','#e879f9','#c084fc','#f0abfc','#fcd5b0'];
    for (var j = 0; j < 10; j++) {
      var p   = document.createElement('div');
      var sz2 = 7 + Math.random() * 5;
      var dur = 6 + Math.random() * 6;
      p.style.cssText =
        'position:fixed;top:-20px;' +
        'left:' + (Math.random() * 100).toFixed(1) + '%;' +
        'width:' + sz2.toFixed(0) + 'px;height:' + (sz2 * 1.3).toFixed(0) + 'px;' +
        'border-radius:50% 0 50% 0;' +
        'background:' + colors[j % colors.length] + ';' +
        'opacity:.7;pointer-events:none;z-index:2;' +
        'animation:sakura-fall ' + dur.toFixed(1) + 's ' +
          (Math.random() * 6).toFixed(1) + 's linear infinite';
      petalsWrap.appendChild(p);
    }
  }

})();
