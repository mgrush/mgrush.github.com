---
layout: default
date: 2016-01-11
author: mgrush
poster: /assets/sea-side.jpg
experpt: "简单的canvas绘图技巧。"
---

### Html5_canvas图形绘制

#### 1. 绘制基本的图形：矩形
	//首先获取页面canvas元素
	var canvas	= document.getElementById('canvasId');
	if(null === canvas) {
		return false;
	}
	
	//获取context对象
	var context	= canvas.getContext('2d');
	
	//绘制基本的图形
	context.fillStyle	= 'red';
	context.strokeStyle	= 'green';
	context.lineWidth	= 1;
	context.fillRect	= (0, 0, 400, 300);
	context.strokeRect	= (0, 0, 400, 300);
	
#### 2. 基本的图形绘制方法
	- 矩形
		context.fillRect(startX, startY, width, height);
		context.strokeRect(startX, startY, width, height);
		
	- (半)圆形
		context.arc(startX, startY, radis, startAngle, endAngle, anticlockwise/*是否按顺时针计算*/);			
		
	- 直线
		绘制直线一般使用moveTo和lineTo两个方法配合使用
		context.moveTo(startX, startY);
		context.lineTo(endX, endY);
		
#### 3. 使用路径绘制图形
	使用路径绘制图形包含以下几个步骤：
	- 开始创建路径 (context.beginPath)
	- 创建图形的路径 (context.arc)
	- 路径创建完成，关闭路径 (context.closePath)
	- 设定绘制样式，调用绘制方法，绘制路径 (context.fill)
	
	基本的路径绘制样例：
	//获取canvas对象
	var canvas	= document.getElementById('canvasId');
	if(null === canvas) {
		return false;
	}
	
	//获取context对象
	var context	= canvas.getContext('2d');
	
	context.fillStyle	= 'rgba(255, 0, 0, .3)';
	
	for(var index = 1; index <= 10; index++) {
		context.beginPath();
		context.arc(index * 25, index * 25, index * 10, Math.PI * 2, true);
		context.closePath();
		context.fill();
	}
	
#### 4. 绘制渐变图形
##### 4.1 线性渐变
	//创建线性渐变对象，并且设置渐变颜色
	var gradient	= context.createLinearGradient(startX, startY, endX, endY);
	gradient.addColorStop(offset1, color1);
	gradient.addColorStop(offset2, color2);
	
	//将渐变对象设置为填充的颜色
	context.fillStyle	= gradient;
	context.fillRect(0, 0, 300, 400);
	
##### 4.2 径向渐变
	//创建径向渐变对象， 并且设置颜色
	var gradient	= context.createRadialGradient(startX, startY, startRadius, endX, endY, endRadius);
	gradient.addColorStop(offset1, color1);
	gradient.addColorStop(offset2, color2);
	
	//将渐变对象设置为填充的颜色
	context.fillStyle	= gradient;
	context.fillRect(0, 0, 300, 400);
	
#### 5. 绘制变形图形
##### 5.1 坐标变换操作
	- 平移：context.translate(x, y) 将上下文对象的坐标轴原点按照给定的数值在对应的坐标方向上进行移动。
	
	- 扩大：context.scale(x, y) 将上线问对象按照给定的x，y进行对应坐标方向的放大或者缩小操作。
	
	- 旋转：context.rotate(angle) 按照给定的旋转角度以顺时针对上下文对象进行旋转。
	
##### 5.2 矩阵变换操作
