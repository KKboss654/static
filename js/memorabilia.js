/**
 * Created by yishaoyun on 2017/10/10.
 */
function getEle(sExp, oParent) {
  var aResult = [];
  var i = 0;

  oParent || (oParent = document);

  if (oParent instanceof Array) {
    for (i = 0; i < oParent.length; i++) aResult = aResult.concat(getEle(sExp, oParent[i]));
  }
  else if (typeof sExp == 'object') {
    if (sExp instanceof Array) {
      return sExp;
    }
    else {
      return [sExp];
    }
  }
  else {
    //xxx, xxx, xxx
    if (/,/.test(sExp)) {
      var arr = sExp.split(/,+/);
      for (i = 0; i < arr.length; i++) aResult = aResult.concat(getEle(arr[i], oParent));
    }
    //xxx xxx xxx 或者 xxx>xxx>xxx
    else if (/[ >]/.test(sExp)) {
      var aParent = [];
      var aChild = [];

      var arr = sExp.split(/[ >]+/);

      aChild = [oParent];

      for (i = 0; i < arr.length; i++) {
        aParent = aChild;
        aChild = [];
        for (j = 0; j < aParent.length; j++) {
          aChild = aChild.concat(getEle(arr[i], aParent[j]));
        }
      }

      aResult = aChild;
    }
    //#xxx .xxx xxx
    else {
      switch (sExp.charAt(0)) {
        case '#':
          return [document.getElementById(sExp.substring(1))];
        case '.':
          return getByClass(oParent, sExp.substring(1));
        default:
          return [].append(oParent.getElementsByTagName(sExp));
      }
    }
  }

  return aResult;
}
function getByClass(oParent, sClass) {
  var aEle = oParent.getElementsByTagName('*');
  var re = new RegExp('\\b' + sClass + '\\b', 'i');
  var aResult = [];

  for (var i = 0; i < aEle.length; i++) {
    if (re.test(aEle[i].className)) {
      aResult.push(aEle[i]);
    }
  }

  return aResult;
}
function getPos(obj) {
  var res = { l: 0, t: 0 };

  while (obj) {
    res.l += obj.offsetLeft || 0;
    res.t += obj.offsetTop || 0;

    obj = obj.offsetParent;
  }

  return res;
}

function bindEvent(obj, ev, fn) {
  obj.addEventListener ? obj.addEventListener(ev, fn, false) : obj.attachEvent('on' + ev, fn);
}
function buffer(obj, cur, target, fnDo, fnEnd, fs) {
  if (!fs) fs = 6;
  var now = {};
  var x = 0;
  var v = 0;

  if (!obj.__last_timer) obj.__last_timer = 0;
  var t = new Date().getTime();
  if (t - obj.__last_timer > 20) {
    fnMove();
    obj.__last_timer = t;
  }

  clearInterval(obj.timer);
  obj.timer = setInterval(fnMove, 20);
  function fnMove() {
    v = Math.ceil((100 - x) / fs);

    x += v;

    for (var i in cur) {
      now[i] = (target[i] - cur[i]) * x / 100 + cur[i];
    }


    if (fnDo) fnDo.call(obj, now);

    if (Math.abs(v) < 1 && Math.abs(100 - x) < 1) {
      clearInterval(obj.timer);
      if (fnEnd) fnEnd.call(obj, target);
    }
  }
}
function memorabilia() {
  var oUl = getEle('.memorabiliaUl')[0];
  for (var i = 0; i < oUl.children.length; i++) {
    oUl.children[i].style.height = oUl.children[i].offsetHeight + 'px';
  }

  var aLeft = getEle('.date');
  var aRight = getEle('.represent');

  var aPos = [];
  var aTop = [];

  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var scrollBottom = scrollTop + document.documentElement.clientHeight;

  for (var i = 0; i < aLeft.length; i++) {
    if (scrollBottom <= document.documentElement.clientHeight) {
      aLeft[i].style.left = '-200px';
      aRight[i].style.left = '60px';
    } else {
      aLeft[i].style.left = '-1000px';
      aRight[i].style.left = '2000px';
    }
    aRight[i].style.width = aRight[i].offsetWidth + 'px';

    aTop[i] = getPos(oUl.children[i]).t;
    aPos[i] = [-1000, 2000];

    aRight[i].style.position = aLeft[i].style.position = 'absolute';
    aRight[i].style.opacity ="1";
    aLeft[i].style.opacity = "1";
  }

  function fnScroll() {
    var dis = 100;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollBottom = scrollTop + document.documentElement.clientHeight;

    for (var i = 0; i < aLeft.length; i++) {

      if (aTop[i] < scrollBottom - dis) {
        (function (index) {
          buffer(aLeft[i], {l: aPos[i][0], l2: aPos[i][1]}, {l: -200, l2: 60}, function (now) {
            aLeft[index].style.left = now.l + 'px';
            aRight[index].style.left = now.l2 + 'px';

            aPos[index][0] = now.l;
            aPos[index][1] = now.l2;
          }, null, 10);
        })(i);
      }
      else {
        (function (index) {
          buffer(aLeft[i], {l: aPos[i][0], l2: aPos[i][1]}, {l: -1000, l2: 2000}, function (now) {
            aLeft[index].style.left = now.l + 'px';
            aRight[index].style.left = now.l2 + 'px';

            aPos[index][0] = now.l;
            aPos[index][1] = now.l2;
          }, null, 20);
        })(i);
      }
    }
  }

  bindEvent(window, 'scroll', fnScroll);
}
