# newfullpage
用于快速简单的创建全屏滚动页面<br>

普通属性<br>
data-scrollingspeed	滚动转换的速度（以毫秒为单位）	700<br>
data-sectionscolor	为每个 section 定义 CSS background-color 属性	['#4A6FB1', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff']<br>
data-anchors	定义要在每个 section 的 URL 上显示的锚链接	['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage']<br>
data-looptop	（定义首尾链接滚动方式(首向上) 默认为 false	false/true<br>
data-loopbottom	定义首尾链接滚动方式(尾向下) 默认为 false	false/true<br>
data-loophrizontal	定义水平滑块是否在到达上一张或下一张后循环。 默认为 true	false/true<br>
data-scrollbar	确定是否使用站点的滚动条 默认 false	false/true<br>
data-navigation	显示一个由小圆圈组成的导航栏	false/true<br>
data-navigationposition	定义导航栏显示的位置 值为left和right	left/right<br>
data-slidesnavigation	会显示一个导航栏，该导航栏由站点上每个横向滑块的小圆圈组成。	false/true<br>
data-slidesnavposition	定义滑块的横向导航栏的位置 值为 top 和 bottom	top/bottom<br>
data-normalscrollelements	如果页面中某个元素需要添加滚动条则设置页面中滚动当前元素的class名或者id名称；如#test,.test(如果多个可以用逗号分开)	#test,.test<br>
控制属性<br>
data--pagerebuild	通过变量设置为true，则元素会从新加载，通常使用在动态修改数据时使用，默认为false，注意false/true为字符串格式	false/true<br>
输出属性<br>
data-x-nextonleaveindex	是滚动到的“页面”的序号，从1开始计算；	1<br>
data-x-onleaveindex	是离开的“页面”的序号，从1开始计算；	2<br>
data-x-afterload	是section正屏的索引，从1开始计算,是竖向滚动后显示的当前页面index	2<br>
data-x-nextonslideleaveindex	是横向滚动到的“页面”的序号，从1开始计算；	2<br>
data-x-onslideleaveindex	是横向离开的“页面”的序号，从1开始计算；	2<br>
data-x-afterslideload	横向滚动后显示的当前页面index 从0开始	2<br>
# 注意事项
<img src="http://www.wware.org/img/quangun3.png?_9b54" width="800px"><br>
判断往上滚动还是往下滚动，值是 directionup 或 directiondown。<br>
往上滚动的事件名称  directionup<br>
往下滚动的事件名称  directiondown<br>
判断往坐滚动还是往右滚动，值是 directionleft 或 directionright。<br>
往上滚动的事件名称  directionleft<br>
往下滚动的事件名称  directionright<br>
按钮点击事件名称，页面可以添加两个按钮 id分别为 moveSectionUp 和 moveSectionDown<br>
往上滚动的事件名称   moveSectionUp<br>
往下滚动的事件名称   moveSectionDown<br>
