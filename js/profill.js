//ready 方法
(function() {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function() { for (var i = 0; i < fn.length; i++) fn[i](); };
    var d = document;
    d.ready = function(f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function() {
                try { d.documentElement.doScroll('left');
                    run(); } catch (err) { setTimeout(arguments.callee, 0); }
            })();
        else if (wk)
            var t = setInterval(function() {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0);
    };
})();

//事件监听
function addEvent(dom,type,handle){
  if(document.addEventListener){
     dom.addEventListener(type,handle)
  }else{
     type="on"+type;
     dom[type]=handle;
  }
}

//获取类
function getClassNames(classStr){  
      if (document.getElementsByClassName) {  
            return document.getElementsByClassName(classStr)  
      }else {  
          var ret = [];
          var targetNodes = document.getElementsByTagName('*')
          for(var i =0;i<targetNodes.length;i++){
            if(hasClass(targetNodes[i],classStr)){
              ret.push(targetNodes[i])
            }
          }
          return ret;
       }  
}

//hasclass //自己写的
function hasClass(el,classname){

  var targetClassname = el.className;
  var reg = new RegExp("(^|\\s)"+classname+"(\\s|$)","g");
  if(reg.test(targetClassname)){
    return true;
  }else{
    return false;
  }
}

//添加类
function addClass(el,classname){
   if(hasClass(el,classname)){
    return
   }else{
     var targetClassname = el.className;
     var classNames = targetClassname.split(' ');
     classNames.push(classname);
     el.className = classNames.join(' ');
   }
}

//移除类
function removeClass(el,classname){

   if(!hasClass(el,classname)){
     return
   }else{
     var targetClassname = el.className;
     var classNames = targetClassname.split(' ');

     for(var i = 0;i<classNames.length;i++){
        if(classNames[i]===classname){
            classNames.splice(i, 1);
        }
     }
     el.className = classNames.join(' ');
   }
}

//判断ie
function isIE(){
    var Reg =/Micro/gi;
    var browsername = navigator.appName;
    var result = browsername.search(Reg)>-1?true:false;
    return result
}


//判断是否具有css3一些特性
//chrome和ie支持document.body，但是Firefox不支持，Firefox支持document.documentElement，对于没有doctype声明的ie又不支持document.documentElement。
function cssProperty( attr ){
        var prefix = [ 'O', 'ms', 'Moz', 'Webkit' ],
            length = prefix.length,
            style = document.createElement( 'i' ).style;
        cssProperty =  function( attr ){
            if( attr in style ){
                return true;
            }
            attr = attr.replace( /^[a-z]/, function( val ){
                return val.toUpperCase();
            });
            var len = length;
            while( len-- ){
                if( prefix[ len ] + attr in style ){
                   return true;
                }
            }
            return false;
        };
        return cssProperty( attr );
    }



//知乎的
//将getClassName()方法定义在Object原型上，只要是对象皆可以用此方法；

// Object.prototype.getElementsByClassName=function(cla){
//   if(document.getElementsByClassName){
//     console.log('d')

//        return document.getElementsByClassName(cla);  //如果浏览器支持getElementsByClassName()方法，直接用该方法，返回一个数组对象；
//   }else{
//     console.log('dv')
//        var elements=document.getElementsByTagName("*");  //取出document中所有的元素；（感觉性能很低）
//        var reg=/\s+/g;   //匹配一个或多个空格，避免一个元素中有多个类名而导致查找不准确的问题；
//        var trim=/(^\s*)|(\s*$)/g;   //匹配字符串中的首尾空格
//        var result=[];
//        for(var i=0;i<elements.length;i++){
//            var claNames=elements[i].className.replace(trim,"").spilt(req);  //将元素的className(会返回字符串)
//            var claNamesLength=claNames.length;             //先去除首尾空格，然后以一个或多个空格分割成数组；去除首尾空格的原因是如果类名是"  abc  "                    
//            var currentCla=cla.replace(trim,"").spilt(req); //这样的话会分割成数组长度为3，加大后面的运算；
//            var currentClaLength=currentCla.length;          
//            if(claNamesLength<currentClaLength){         //这一步的if...else..主要是因为想实现getElementsByClassName()中传递多个类名的功能
//               return;                                   //通过将参数分割成数组即可与文档中的元素类名数组比较，就是比较两个数组是否子集关系；
//            }else{                                       
//               for(var j=0;j<currentClaLength;j++){       
//                  if(claNames.indexOf(currentCla[j])==-1){   
//                      return;
//                  }else{
//                      result.push(elements[i]);
//                  }
//               }
//            }
//         }
//         return result;
//      }
//  };