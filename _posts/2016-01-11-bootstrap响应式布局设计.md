---
layout: default
date: 2016-01-11
author: mgrush
poster: /assets/sea-side.jpg
experpt: 了解bootstrap是如何通过media query实现响应式布局设计的。

---

### Bootstrap响应式布局设计

原理：bootstrap使用css的媒体查询（css media query）来检测浏览器的窗体高度和宽度，然后根据条件加载和应用调整页面布局的样式表，根据浏览器视口的宽度，Bootstrap可以按照纵横比或宽度的范围来优化布局，但最主要还是使用min-width和max-width属性。

比如，我们常用的媒体查询是根据窗体的大小进行查询，如下代码所示：
	
	/* 大屏幕 */
	@media (min-width: 1200px) { ... }

	/* 平板竖屏到横屏到常规屏幕 */
	@media (min-width: 768px) and (max-width: 979px) { ... }

	/* 手机横屏到平板竖屏 */
	@media (max-width: 767px) { ... }

	/* 手机横屏及更小屏幕 */
	@media (max-width: 480px) { ... }
	

对于要正确使用bootstrap响应式设计，首先需要加入以下两行代码：

	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="assets/css/bootstrap-responsive.css" rel="stylesheet">
	
除此之外，我们还可以根据媒体的宽度来选择需要加载的css文件，如下所示：
	
	<link rel="stylesheet" media="(min-width: 1200px)" href="large.css" />

	<link rel="stylesheet" media="(min-width: 768px) and (max-width: 979px)" href="tablet.css" />
	
另外，bootstrap提供了响应式设计css的辅助类，如下：
	
	.visible-phone，在宽度为 767px 及以下的手机上可见，在 979px 到 768px 的平板上隐藏不可见，在桌面上隐藏不可见，这是默认的。

	.visible-tablet，在宽度为 767px 及以下的手机上隐藏不可见，在 979px 到 768px 的平板上可见，在桌面上隐藏不可见，这是默认的。

	.visible-desktop，在宽度为 767px 及以下的手机上隐藏不可见，在 979px 到 768px 的平板上隐藏不可见，在桌面上可见，这是默认的。

	.hidden-phone，在宽度为 767px 及以下的手机上隐藏不可见，在 979px 到 768px 的平板上可见，在桌面上可见，这是默认的。

	.hidden-tablet，在宽度为 767px 及以下的手机上可见，在 979px 到 768px 的平板上隐藏不可见，在桌面上可见，这是默认的。

	.hidden-desktop，在宽度为 767px 及以下的手机上可见，在 979px 到 768px 的平板上可见，在桌面上隐藏不可见，这是默认的。
