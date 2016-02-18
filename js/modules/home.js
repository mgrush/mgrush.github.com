/** 瀑布流排版实现参数 **/
var columnWidth	= 0;
var columnGap	= 0;	
var remUnit		= 0;
var columnCount	= 0;
var offsetLeft	= 0;
var modelArr	= [];

/** 获取每一个pin的宽度 **/
function getColumnWidth(){
	return 30; // rem;
}

/** 获取pin之间的间隔 **/
function getColumnGap(){
	return 1; // rem;
}

/** 获取body的rem大小 **/
function getContentWidth(){
	return Math.min(document.body.clientWidth, $(".m-posts").width()) / getRemUnit(); // rem
}

/** 计算rem的单位大小**/
function getRemUnit(){
	return parseInt(document.defaultView.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize);	
}

/** 计算排版列数 **/
function getColumnCount(){
	return Math.floor((getContentWidth() - getColumnGap()) / getColumnWidth());
}

/** 计算左侧开始位置 **/
function getOffsetLeft() {
	return (getContentWidth() - (columnWidth * columnCount + columnGap * (columnCount - 1))) / 2;
}

/** 初始化参数值 **/
function initColumnParams(){
	columnWidth	= getColumnWidth();
	columnGap	= getColumnGap();
	remUnit		= getRemUnit();
	columnCount	= getColumnCount();
	offsetLeft	= getOffsetLeft();
	modelArr	= new Array(columnCount + 1).join("0").split("");
}

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
			return offsetLeft + index * (columnWidth + columnGap); // 单位：rem
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
	initColumnParams();
	WaterFall.init($(".m-posts"));
});

$(window).on("resize", function(){
	// 更新排版
	initColumnParams();
	WaterFall.init($(".m-posts"));
});
