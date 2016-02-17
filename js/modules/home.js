/** 博客首页 **/

/** 瀑布流排版实现 **/
var columnCount	= 4;
var columnWidth	= 30;	// rem
var columnGap	= 1;	// rem
var modelArr	= new Array(columnCount + 1).join("0").split("");	// 根据columnCount计算出来的默认值为0的数组
var remUnit		= parseInt(document.defaultView.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize);	// rem的大小设置

var WaterFall = {
	// 记录每列的高度
	columnHeights	: [],	
	
	// 记录每列的left位置
	columnLefts : [],

	// 所有需要重新排列的pin列表
	pinList	: [],

	// 初始化一些必要的设置
	init : function($container){
		this.container	= $container;
		this.pinList	= $container.find(".pin");
		
		this.container.css({"position": "relative"});
		this.pinList.css({"position": "absolute"});

		this.columnHeights	= modelArr.map(function(item, index){
			return 0;	// 单位：rem
		});

		this.columnLefts	= modelArr.map(function(item, index){
			return index * (columnWidth + columnGap); // 单位：rem
		});

		this.render();
	},

	// 针对列表重新排列位置
	render : function(pinList){
		var self	= this;
		var pinList	= pinList || this.pinList;

		pinList.each(function(index, pin){
			var minHeight	= Math.min.apply(null, self.columnHeights);
			var minIndex	= self.columnHeights.indexOf(minHeight);
			var left		= self.columnLefts[minIndex];
			var top			= minHeight;

			self.columnHeights[minIndex] = minHeight + columnGap + $(pin).outerHeight() / remUnit;

			$(pin).css({ "top": top + "rem", "left": left + "rem", "display": "block" });
			$(pin).parent().css({"height" : Math.max.apply(null, self.columnHeights) + columnGap + "rem"});
		});
	}
};

$(function(){
	// 确保在只有少数post的情况下，footer能够置底显示
	$(".m-content").css({
		"min-height" : (window.screen.height / remUnit) - (6 + 20) + "rem"
	});

	// 初始化排版
	WaterFall.init($(".m-posts"));
});
