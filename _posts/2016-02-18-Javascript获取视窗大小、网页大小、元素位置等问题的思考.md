---
layout: default
date: 2016-02-19
author: mgrush
poster: /assets/sea-side.jpg
tags: 盒模型 clientHeight cilentWidth compactMode height
experpt: 在日常的开发过程中，我们通常会遇到需要获取屏幕大小、窗口可视区域大小、文档大小等数据的需求，本文主要总结一些通用的获取此类数据的方法，以及相关的一些知识概念，如：compatMode、documentElement、盒模型、getComputedStyle等概念；

---

##  用Javascript获取视窗大小、网页大小、元素位置等数据

<br/>

在日常的开发过程中，我们通常会遇到需要获取屏幕大小、窗口可视区域大小、文档大小等数据的需求，本文主要总结一些通用的获取此类数据的方法，以及相关的一些知识概念，如：compatMode、documentElement、盒模型、getComputedStyle等概念；

### 一、盒模型

按照W3C的说法，页面中的所有元素都是按照盒模型（Box-Model）的标准来进行渲染的。
盒模型将页面元素由外而内分别划分为：``外边距``(margin)、``边框``(border)、``内边距``(padding)、``内容区域``(content)，如下图所示（图形来自[W3CSchool CSS 框模型概述](http://www.w3school.com.cn/css/css_boxmodel.asp)）：

![盒模型]({{ site.baseurl }}/assets/ct_boxmodel.gif)

目前关于盒模型的使用方法有两种：标准的W3C制定的盒模型、IE标准使用的盒模型(IE5、IE6种的怪异模式)，这两者的区别主要在于对height（width）的计算方式不一致：

**标准盒模型**：元素的高度完全由css中设定的height决定，也就是说下面的代码实现导致最终的元素占据的高度为140px + 上下各10px的外边距。

```
.box {
	height: 100px;
	padding: 10px;
	margin: 10px;
	border: 10px solid #ccc;	
}
```

**IE盒模型**：元素的高度包含了``内容区域`` + ``内边距`` + ``边框`` 的高度总和，也就是说我们在css中设置的height: 100px 会被这三者平分，如下面的视线，最终元素所占据的高度就是 100px ＋ 上下各10px的外边距。

```
.box {
	height: 100px;
	padding: 10px;
	margin: 10px;
	border: 10px solid #ccc;
}
```

**PS**：由于W3C标准盒模型在设置了height之后，元素具体在页面中占据的高度还需要通过加上``边框``、``内边距``来计算，导致在编写CSS的时候需要不断的计算元素边框盒的实际大小，所以通常在开发的时候都通过设置box-sizing样式属性，来统一强制页面按照非标准盒模型来进行渲染（参考[W3CSchool box-sizing 属性](http://www.w3school.com.cn/cssref/pr_box-sizing.asp)）：

```
* {
	box-sizing: border-box;
}

```

### 二、关于height、clientHeight、scrollHeight、offsetHeight的区别

首先，为了更好的解释相关的属性概念，我们可以在页面上搭建如下的demo页面：

<pre>
// 页面dom结构
&lt;div id="nav" style="height: 10.0rem;">&lt;/div>

// 对应的样式设置
html {
	font-size: 10px;
}

#nav {
	height: 20.0rem;
	padding: 2.0rem;
	margin: 2.0rem;
	border: 1.0rem solid #ccc;
}
</pre>

**height**： 开发过程中我们可能通过原生的javascript或者jquery来获取元素的属性，分别如下：

1. 使用原生的javascript获取元素的高度：

	```
	function getElemHeight( elem ){
		var computedStyle	= document.defaultView.getComputedStyle( elem );
		var contentHeight	= parseInt( computedStyle.height ); // 100px
		var paddingTop		= parseInt( computedStyle.paddingTop ); // 20px
		var paddingBottom	= parseInt( computedStyle.paddingBottom ); // 20px
		var borderTop		= parseInt( computedStyle.borderTopWidth ); // 10px
		var borderBottom	= parseInt( computedStyle.borderBottomWidth ); // 10px
		
		return contentHeight + paddingTop + paddingBottom + borderTop + borderBottom;
	}
	
	console.log( getElemHeight( document.getElementById( "nav" ) ) );  // 实际占据的高度为160px
	```
	
	在上面的代码中，我们通过``document.defaultView.getComputedStyle``获取计算后的内容区域的高度，而不是通过 ``document.getElementById( "nav" ).style.height``，因为在上面的demo中后者返回的结果是``10rem``，这绝对不是我们想要的。
	
2. 使用jquery来获取元素的高度：

	```
	var contentHeight	= $("#nav").height(); // 100px
	var innerHeight		= $("#nav").innerHeight(); // 140px
	var outerHeight		= $("#nav").outerHeight(); // 160px
	
	```
	
	jQuery在获取元素的高度的时候存在三种不同的方法：
	
	* height() : 获取元素的``内容区域``的高度
	* innerHeight() : 获取元素的``内容区域 ＋ 内边距``的高度
	* outerHeight() : 获取元素的``边框 ＋ 内边距 ＋ 内容区域``的高度，与（1）中的``getElemHeight``等效

**clientHeight**：浏览器窗口的可视区域的高度（单位：像素，不包括浏览器的菜单栏、工具栏等），IE 不支持这些属性，但是有替代属性。


**scrollHeight**：


**offsetHeight**：
