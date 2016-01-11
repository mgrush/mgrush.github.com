---
layout: default
---

### Html5_worker多线程机制

worker技术是html5中新增的，用于在web应用程序中实现后台处理的一项技术，主要用于解决耗时操作对页面用户操作流畅性的问题.
	
#### 1. 基本的线程处理以及消息通信机制

对于前台只要声明新建worker处理文件的路径以及消息处理函数即可：

<pre>
//新建worker线程类
var worker	= new Worker('worker.js');

//定义消息接收机制
worker.onmessage	= function(event){
	//event.data包含所有线程中返回的数据
	console.log(event.data);
}
//向线程发送数据	
worker.postMessage(num);
</pre>

对于后台线程处理文件，则声明onmessage属性即可：

<pre>
//定义后台线程处理方法
onmessage	= function(event){
	var num	= event.data;
	
	postMessage(num + 1);
	
	//如果当前线程不再使用，最好才用close方法关闭当前线程
	//close();
}
</pre>

#### 2. 线程嵌套

线程嵌套与基本的线程创建方式相同
	
#### 3. 多个子线程数据通信

多个子线程之间的通信依靠主线程的接收和发送消息功能作为中介来完成。
	
#### 4. 线程中可用的变量和函数

postMessage, onmessage, importScripts(urls), sessionStorage/localStorage, xmlHttpRequest, setTimeout/setInterval, object, websockets

#### 5. Worker的局限性

* worker线程之间的传递只支持最简单的数字、字符串的传递，连基本的Object、Function都不行，所以很大程度上限制了worker的使用灵活性；
	
