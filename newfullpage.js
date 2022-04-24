(function (root, factory) {
  /* CommonJS */
  if (typeof exports == "object") module.exports = factory();
  /* AMD module */
  else if (typeof define == "function" && define.amd) define(factory);

  /* 修改: 将 wwclassName 改为元素标识 */
  else root.wwclassName = factory();
}(this, function () {
  "use strict";

  /* 修改: 将 wwclassName 改为元素标识 */
  var wwclassName = /*INSBEGIN:WWCLSNAME*/
    "newfullpage"
    /*INSEND:WWCLSNAME*/
    ;

  // BEGIN: 加载依赖部分
  // 无依赖资源请使用本函数
  function loadDependence(fncallback) {
    if (typeof fncallback === "function") {
      fncallback();
    }
  }

  // 有依赖资源使用本函数
  // 使用方式:
  //  - 将"插件名"设置为具体插件标识, 通常就是插件名称, 不可为中文. 如: swiper
  //  - 如libs中无该插件, 则申请添加该插件
  //  - 将"插件路径"设置为具体插件路径, 通常为js文件, 省略路径中, 开头的"/"和结尾的".js". 如: "/libs/qrcodejs/qrcode.js" 应写为 "libs/qrcodejs/qrcode"
  //  - require 函数第一个参数, 传入依赖资源数组. 通常为config中配置的`插件名`. 可能还包括css文件
  //   - css文件的格式, 以"css!"开头, 省略路径开头的"/"和路径结尾的".css". 如: "/libs/noty/lib/noty.css" 应写为 ""css!libs/noty/lib/noty""
  //  - require 函数第二个参数是个回调函数, 该函数可能会传入参数. 参数与前面数组位置对应. 如不清楚, 自行查阅 (requirejs)[http://requirejs.org/] 文档

  var loadDependence = function (fncallback) {
    // 本模板只支持一个依赖库，如果需要多个依赖库，需要改进。
    if (!window.wwload.newfullpage) {
      window.wwload.newfullpage = "wait";
      // requirejs.config({
      //   paths: {
      //     "插件名": "插件路径" // 示例: libs/qrcodejs/qrcode
      //   }
      // });
      require(["css!libs/newfullpage/css/fullpage.min", "https://alvarotrigo.com/fullPage/vendors/scrolloverflow.js", "libs/newfullpage/js/fullpage.min"], function (myFullpage) {
        window.wwload.newfullpage = true;
        window.myFullpage = myFullpage;
        replace();
        fncallback();
      });
    } else if (window.wwload.newfullpage === "wait") {
      setTimeout(function () {
        loadDependence(fncallback);
      }, 100);
    } else {
      replace();
      fncallback();
    }

    function replace() {
      loadDependence = function (fncallback) {
        fncallback();
      };
    }
  };

  // END: 加载依赖部分

  /*
  //*/


  // BEGIN: 元素处理类初始化。下方函数只在依赖被加载完毕后，执行一次。后续无论处理多少个元素，不再调用本函数。
  var init = function () {
    // 重写初始化函数
    init = function () {
      return true;
    };
    $.wwclass.addEvtinHandler(wwclassName, evtInHandler);

    /*如果是逻辑元素，需要监听所有新加元素的时间，请打开下方注释。与process的区别是： process传入的参数一定有wwclass，而checker是更低级的事件处理，如果依赖wwclass，则事件在这里被处理，在process也会被处理。相当于被调用了两次，因此，checker处理的内容，不要包括wwclass，实际上，你可以利用checker构建一个wwclass体系。
     简单来说： 不用wwclass又希望有代码附加在某类(使用特定样式类，特定属性，特定标签等等)元素上，就使用本机制。
    //$newRootElement是新加入的元素。includeSelf指示是否包含$container自身
    function checker($newRootElement, includeSelf){
      //每次有新元素加入时，无论其类型，都会调用本方法。页面的根container($(".container[-fluid]"))
     //下文的例子，用来示例如何探测所有新加入的input并加以处理，类似的可以处理图片等等。
     var $inputElement = includeSelf ? $newRootElement.find("input[data-xxx]").addBack("input") : $newRootElement.find("[input]");
     if($inputElement.length > 0){ //新加入的元素有input。
     }
    }
    $.wwclass.getwwchecker().push(checker);
    //*/

    // 如有初始化动作, 请在下方添加
  };
  // END: 元素首次初始化处理


  /*
   * @description 元素平滑:
   * 1. 页面显示元素时,如果元素出现明显的闪现现象,需要做如下处理:
   *  1. 编辑器: 添加设置项:`禁用平滑加载`.对应属性`data-disabled-smooth`.该属性只允许设置值为true,否则元素删除该属性
   *  2. 编译期: 添加处理:当属性`data-disabled-smooth`值为`非true`时,元素添加平滑处理.平滑处理目的是使得页面元素的加载更加自然.例如swiper1:将图片添加类hide隐藏,只显示第一张图片,去除元素加载闪现现象
   *  3. 运行期: 添加处理:元素初始化完毕之后,即属性`data-x-inited`属性值为true时,平滑处理的相关元素恢复.例如swiper1:将图片hide类删除,恢复图片正常显示
   *  4. 示例元素可查看轮播图(swiper1)元素
   *  5. 类似imagefill等,平滑处理后,只遗留一个空壳,此时添加处理类`转圈`.加载完毕之后,去掉该类.
  //*/
  /*
   * @description 元素加载状态:
   * 页面显示元素时,如果元素出现明显的有无到有现象,需要做如下处理:
   *  1. 编辑器: 添加设置项:`禁用自动添加加载状态`.对应属性`data-noblock`.该属性只允许设置值为true,否则元素删除该属性
   *  2. 编译期: 添加处理:当属性`data-noblock`值为`非true`时,元素添加加载状态.即设置`data-block="true"`
   *  3. 运行期: 添加处理:元素初始化完毕之后,即属性`data-x-inited`属性值为true时,元素放开加载状态.即设置`data-block="false"`
   *  4. 需要处理的元素，类似view、imagefill、qrcode等元素效果
  //*/
  /* @description 错误信息输出格式:
   *   $.wwclass.syslog(message,category,severity,from,opt);
   * 参数解释：
   *   message; // 必填: 日志信息
   *   from // 选填: 日志来源. 默认值为: 当前页地址
   *   category // 选填: category,日志类型(日志分类标识). 默认值为: fe,即 front end
   *   severity //  选填: severity,日志级别. 默认值为: debug.可选值为:emergency,alert,critical,error,warning,notice,info,debug
   *   opt //选填：参数为json格式的字符串
  //*/
  /*
   * @description 初始化每个元素
   * @param {jQuery object} $ele - 需要初始化的元素
   */
  function newfullpage($ele) {

    var scrollingSpeed = eval($ele.attr("data-scrollingspeed") || 700);    //滚动转换的速度（以毫秒为单位）
    var sectionsColor = eval($ele.attr("data-sectionscolor") || []);  //为每个 section 定义 CSS background-color 属性
    var anchors = eval($ele.attr("data-anchors") || []);    //定义要在每个 section 的 URL 上显示的锚链接
    var loopTop = eval($ele.attr("data-looptop"));   //定义首尾链接滚动方式(首向上) 默认为 false
    var loopBottom = eval($ele.attr("data-loopbottom")); //定义首尾链接滚动方式(尾向下) 默认为 false
    var loopHorizontal = eval($ele.attr("data-loophrizontal"));   //定义水平滑块是否在到达上一张或下一张后循环。 默认为 true
    var scrollBar = eval($ele.attr("data-scrollbar"));    //确定是否使用站点的滚动条 默认 false
    var navigation = eval($ele.attr("data-navigation")); //显示一个由小圆圈组成的导航栏
    var navigationPosition = $ele.attr("data-navigationposition"); //定义导航栏显示的位置 值为left和right
    var slidesNavigation = eval($ele.attr("data-slidesnavigation")); //会显示一个导航栏，该导航栏由站点上每个横向滑块的小圆圈组成。
    var slidesNavPosition = $ele.attr("data-slidesnavposition"); //定义滑块的横向导航栏的位置 值为 top 和 bottom
    var setSection = $ele.attr("data-setsection");               //设置是否使用公共方法点击按钮上下滑动
    var pagerebuild = $ele.attr("data--pagerebuild") || "false";
    var normalScrollElements = $ele.attr("data-normalscrollelements");   //设置滚动class名或者id名 如：#test，.test

    var myFullpage = new fullpage('.fullpage', {

      scrollingSpeed: scrollingSpeed,
      sectionsColor: sectionsColor,
      anchors: anchors,
      loopTop: loopTop,
      loopBottom: loopBottom,
      loopHorizontal: loopHorizontal,
      scrollBar: scrollBar,
      navigation: navigation,
      navigationPosition: navigationPosition,
      slidesNavigation: slidesNavigation,
      slidesNavPosition: slidesNavPosition,
      scrollOverflow: true,
      autoScrolling: true,

      normalScrollElements: normalScrollElements,
      //事件
      onLeave: function (origin, destination, direction) {   //一旦用户离开 section ，过渡到新 section ，就会触发此回调

        $.wwclass.helper.updateProp($ele, "data-x-onleaveindex", origin.index);   //是离开的“页面”的序号，从1开始计算；
        $.wwclass.helper.updateProp($ele, "data-x-nextonleaveindex", destination.index);  //是滚动到的“页面”的序号，从1开始计算； 
        if (direction == "down") {        //判断往上滚动还是往下滚动，值是 up 或 down。
          $.wwclass.helper.anijsTrigger($ele, "directiondown");
        } else if (direction == "up") {
          $.wwclass.helper.anijsTrigger($ele, "directionup");
        }
      },
      afterLoad: function (origin, destination, direction) {  //滚动结束之后，一旦加载了 section ，就会触发回调
        $.wwclass.helper.updateProp($ele, "data-x-afterload", destination.index);    //是竖向滚动后显示的当前页面index
      },
      afterRender: function () { },
      afterResize: function (width, height) { },
      afterReBuild: function () { },
      afterResponsive: function (isResponsive) { },
      afterSlideLoad: function (section, origin, destination, direction) {
        $.wwclass.helper.updateProp($ele, "data-x-afterslideload", destination.index);  //横向滚动后显示的当前页面index  从0开始
      },
      onSlideLeave: function (section, origin, destination, direction) {
        $.wwclass.helper.updateProp($ele, "data-x-onslideleaveindex", origin.index);   //是横向离开的“页面”的序号，从1开始计算；
        $.wwclass.helper.updateProp($ele, "data-x-nextonslideleaveindex", destination.index);  //是横向滚动到的“页面”的序号，从1开始计算；
        if (direction == "left") {        //判断往左滚动还是往右滚动，值是 left 或 right。
          $.wwclass.helper.anijsTrigger($ele, "directionleft");     //横向向左发生的事件
        } else if (direction == "right") {
          $.wwclass.helper.anijsTrigger($ele, "directionright");     //横向滚动向右发生的事件
        }
      }
    });


    //pc端弹出框滚动，后面的页面不动
    $(document).on('shown.bs.modal', function (e) {//赋值
      fullpage_api.setAllowScrolling(false);
      fullpage_api.setKeyboardScrolling(false);
    });
    $(document).on('hidden.bs.modal', function (e) {
      fullpage_api.setAllowScrolling(true);
      fullpage_api.setKeyboardScrolling(true);
    });

    //关于移动设备上的操作
    // function fixbootstrapScroll(value) {
    //     var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
    //     //alert(isTouchDevice);

    //     if (isTouchDevice) {
    //         if (value) {
    //          fullpage_api.setAllowScrolling(false); 
    //          fullpage_api.setKeyboardScrolling(false);
    //         } else {
    //          fullpage_api.setAllowScrolling(true);
    //          fullpage_api.setKeyboardScrolling(true);
    //         }
    //     }
    // }

    // $(document).on('shown.bs.modal', '#myModal',function (e) {//赋值
    //     $('#myModal').modal('handleUpdate');
    //     fixbootstrapScroll(true); 


    // });
    // $(document).on('hidden.bs.modal', '#myModal',function (e) {
    //     fixbootstrapScroll(false);
    // });




    //公共方法
    if (setSection == "true") {
      document.querySelector('#moveSectionUp').addEventListener('click', function (e) {    //向上滚动一个 section
        e.preventDefault();
        fullpage_api.moveSectionUp();
        $.wwclass.helper.anijsTrigger($ele, "moveSectionUp");     //向上发生的事件
      });

      document.querySelector('#moveSectionDown').addEventListener('click', function (e) {    //向下滚动一个 section
        e.preventDefault();
        fullpage_api.moveSectionDown();
        $.wwclass.helper.anijsTrigger($ele, "moveSectionDown");    //向下发生的事件
      });
    }

  }


  function processElement($ele) {
    /* 如果本元素废弃, 请解开此处注释, 并完成代码
    console.error("扩展元素(" + $ele.attr("data--wwclass") + ")已废弃, 找对应产品更换为xxx实现本功能", $ele);
    //*/
    // 对 $ele 元素做对应处理
    /* @TODO:重要提示:在元素初始化完毕时，需要更新属性`data-x-inited`的值为true，初始值(默认)为false，并同时发出事件wwinited
    $.wwclass.helper.updateProp($ele, "data-x-inited", true);
    $.wwclass.helper.anijsTrigger($ele, "wwinited");
    //*/
    /* @TODO:所有正式发布的元素，请认真排查代码:不要带测试输出，只有出现异常，才允许输出错误.需要输出时，请解开此处注释，并完成代码。函数说明请查看上方
    $.wwclass.syslog(message,category,severity,from,opt);
    //*/
    //当需要使用依赖插件时，使用下方代码来获取。主文件只加载最小插件集合。此时，把同步风格的后续代码，改为函数，因此，依赖越多，函数越多。多到一定程度(独立依赖单元大于10)，可以引入when,bluebird等promise库(不推荐)。
    //loadDependence_XXXX(fnCallback);


    setTimeout(function () {
      newfullpage($ele);
      $.wwclass.helper.updateProp($ele, "data-x-inited", true);
      //图片隐藏取消
      //   $ele.find(".section").removeClass("hidden");
    }, 1000);

  }

  /*
   * @description 析构每个元素, 也就是该元素该删除时的处理代码
   * @param {jQuery object} $ele - 需要处理的元素
   */
  function finalizeElement($ele) {
    // 对 $ele 元素做对应处理
    /*
    @TODO: 销毁元素，destroy
    @TODO: 存入$ele.data()中的值清空。
    $ele.data("存入的键","");
    //*/
  }

  // BEGIN: 监听属性处理
  /*
   * @description 监听函数, 元素的控制属性(data--)改变时处理
   * @param {jQuery object} $ele - 控制属性改变的元素
   * @param {string} attribute - 控制属性的名称
   * @param {string} value - 控制属性改变为何值
   */
  var evtInHandler = function ($ele, attribute, value) {
    switch (attribute) {
      case "data--pagerebuild":
        // 处理动作
        if (value == "true") {
          fullpage_api.destroy('all');
          fullpage_api.reBuild();
          newfullpage($ele);
          setTimeout(function () {
            $ele.attr("data--pagerebuild", "false");
          }, 1000);
        }
        break;
      case "finalize":
        finalizeElement($ele);
        break;
      default:
        console.info("监听到 \"" + $ele.attr("data-wwclass") + "\" 元素的 \"" + attribute + "\" 属性值改变为 \"" + value + "\", 但是无对应处理动作.");
    }
  };
  // END: 监听属性处理

  // 以下部分不需要修改
  if (!$.wwclass) {
    console.error("Can not use without wwclass.js");
    return false;
  }

  var ret = /*INSBEGIN:WWCLSHANDLER*/
    function (set) {
      if (set.length > 0) {
        loadDependence(function () {
          init();
          $(set).each(function (index, targetDom) {
            processElement($(targetDom));
          });
        });
      }
    }
    /*INSEND:WWCLSHANDLER*/
    ;

  return ret;

}));
