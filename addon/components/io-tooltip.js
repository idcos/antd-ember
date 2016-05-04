import Ember from 'ember';

/**
 * Alert Component
 ```html
 ``` 
 */

export default Ember.Component.extend({
	/**
	 * [tagName description]
	 */
	tagName: 'div',
	attributeBindings: ['disabled', 'role'],
	classNames: 'io-tooltip',
	classNamePrefix: 'io-tooltip-',
	classNameBindings: ['typeClass','displayClass','activeClass','getXY'],
	/**
	 * @attribute triggerEvent
	 * @type {String [mosueover | click]}
	 */
	triggerEvent: 'mouseover',
	_hidden: true,
	showTips:true,
	getXY:function(){
		if (!this.get('_hidden')) {
			//Ember.$('.io-tooltip').css({'padding':'0px',"width":"132px"});
			var dw = this.$('.io-tooltip-title').width();
			var dh = this.$('.io-tooltip-title').height();
			var tw = this.$('.io-tooltip-content').width();
			var th = this.$('.io-tooltip-content').height();
			console.log("dw:"+dw+" dh:"+dh);
			var topY    = -10-th;
			var bottomY = dh+10;
			var leftX   = -5-tw;
			var rightX  = dw+20;

			var topLeft =  (dw/2-tw-10)/2;
			var topCenter = (dw-tw-10)/2;
			var topRight  = (dw/2+dw-tw+10)/2;

			var bottomLeft  = (dw/2-tw-10)/2;
			var bottomCenter  = (dw-tw-10)/2;
			var bottomRight  = (dw/2+dw-tw+10)/2;

			var leftTop    = (dh/2-th-10)/2;
			var leftCenter = (dh-th-10)/2;
			var leftBottom = (dh/2+dh-th-10)/2;

			var rightTop     = (dh/2-th-10)/2;
			var rightCenter  = (dh-th-10)/2;
			var rightBottom  = (dh/2+dh-th-10)/2;

			// console.log("元素定位(x:"+rx+",y:"+ry+")";
			// console.log("元素左上角坐标(相对于屏幕)   x坐标:"+x+"   y坐标:"+y);
			// console.log("元素左上角坐标(相对于父级元素)   rx:"+rx+"     ry:"+ry);
			// console.log("元素宽度:"+domWidth);//获取元素宽度
			// console.log("元素高度:"+domHeight);//获取元素高度

			var type=this.get('type');
			console.log("type:"+type);
			if(type=="top"){
				this.$(".io-tooltip-content").css({'left':topCenter+'px','top':topY+'px'});//上 left (文字宽度-提示宽度)/2    top  -提示高度（另外加上间距5px）
			}else if(type=="right"){
				this.$(".io-tooltip-content").css({'left':rightX+'px','top':rightCenter+'px'});//右 left (文字宽度+间距)         top （文字高度-提示高度-提示边框)/2
			}else if(type=="bottom"){
				this.$(".io-tooltip-content").css({'left':bottomCenter+'px','top':bottomY+'px'});//下 left (文字宽度-提示宽度)/2    top  文字高度  (外加间距5px);
			}else if(type=="left"){
				this.$(".io-tooltip-content").css({'left':leftX+'px','top':leftCenter+'px'});//左 left (提示宽度+间距)         top  (文字高度-提示高度-提示边框)/2
			}else if(type=="leftTop"){
				this.$(".io-tooltip-content").css({'left':leftX+'px','top':leftTop+'px'});//左上 left (提示宽度+间距)         top  (文字高度-提示高度-提示边框)/2                                                                                                                                                                                                                                                                          domHeight+'px'});
			}else if(type=="leftBottom"){
				this.$(".io-tooltip-content").css({'left':leftX+'px','top':leftBottom+'px'});//左下  
			}else if(type=="topLeft"){
				this.$(".io-tooltip-content").css({'left':topLeft+'px','top':topY+'px'});//上左
			}else if(type=="topRight"){
				this.$(".io-tooltip-content").css({'left':topRight+'px','top':topY+'px'});//上右
			}else if(type=="rightTop"){
				this.$(".io-tooltip-content").css({'left':rightX+'px','top':rightTop+'px'});//右上 left (提示宽度+间距)         top  (文字高度-提示高度-提示边框)/2                                                                                                                                                                                                                                                                          domHeight+'px'});
			}else if(type=="rightBottom"){
				this.$(".io-tooltip-content").css({'left':rightX+'px','top':rightBottom+'px'});//右下  
			}else if(type=="bottomLeft"){
				this.$(".io-tooltip-content").css({'left':bottomLeft+'px','top':bottomY+'px'});//下左
			}else if(type=="bottomRight"){
				this.$(".io-tooltip-content").css({'left':bottomRight+'px','top':bottomY+'px'});//下右
			}

			// var dom =Ember.$('.io-tooltip');
			// var x=dom.offset().left;
			// var y=dom.offset().top;
			// var rx=dom.position().left;
			// var ry=dom.position().top;
			// var domWidth=dom.width();
			// var domHeight=dom.height();

			// console.log("元素左上角坐标(相对于屏幕)   x坐标:"+x+"   y坐标:"+y);
			// console.log("元素左上角坐标(相对于父级元素)   rx:"+rx+"     ry:"+ry);
			// console.log("元素宽度:"+domWidth);//获取元素宽度
			// console.log("元素高度:"+domHeight);//获取元素高度
			
			// var tipWidth =Ember.$('.io-tooltip-content').width();
			// var tipHeight =Ember.$('.io-tooltip-content').height();
			// console.log(domHeight-tipHeight);
			// console.log("tipWidth:"+tipWidth+"    tipHeight:"+tipHeight);
			// var type=this.get('type');
			// console.log("type:"+type);
			// if(type=="top"){
			// 	this.$(".io-tooltip-content").css({"left":(domWidth/2-tipWidth/2)+'px','top':-(tipHeight+5)+'px'});    //上 left (文字宽度-提示宽度)/2    top  -提示高度（另外加上间距5px）
			// }else if(type=="right"){
			// 	this.$(".io-tooltip-content").css({"left":(domWidth+20)+'px','top':(domHeight-tipHeight-10)/2+'px'});     //右 left (文字宽度+间距)         top （文字高度-提示高度-提示边框)/2
			// }else if(type=="bottom"){
			// 	this.$(".io-tooltip-content").css({"left":(domWidth/2-tipWidth/2)+'px','top':(domHeight+5)+'px'});        //下 left (文字宽度-提示宽度)/2    top  文字高度  (外加间距5px);
			// }else if(type=="left"){
			// 	this.$(".io-tooltip-content").css({"left":-tipWidth+'px','top':(domHeight-tipHeight-10)/2+'px'}); //左 left (提示宽度+间距)         top  (文字高度-提示高度-提示边框)/2
			// }else if(type=="leftTop"){
			// 	this.$(".io-tooltip-content").css({"left":-tipWidth+'px','top':(domHeight-tipHeight)+'px'}); //左上 left (提示宽度+间距)         top  (文字高度-提示高度-提示边框)/2                                                                                                                                                                                                                                                                          domHeight+'px'});
			// }else if(type=="leftBottom"){
			// 	this.$(".io-tooltip-content").css({"left":-tipWidth+'px','top':'0px'});//左下  
			// }else if(type=="topLeft"){
			// 	this.$(".io-tooltip-content").css({"left":'0px','top':-(tipHeight+5)+'px'});//上左
			// }else if(type=="topRight"){
			// 	this.$(".io-tooltip-content").css({"left":(domWidth-tipWidth)+'px','top':-(tipHeight+5)+'px'});//上右
			// }else if(type=="rightTop"){
			// 	this.$(".io-tooltip-content").css({"left":(domWidth+20)+'px','top':-(tipHeight-domHeight)+'px'}); //右上 left (提示宽度+间距)         top  (文字高度-提示高度-提示边框)/2                                                                                                                                                                                                                                                                          domHeight+'px'});
			// }else if(type=="rightBottom"){
			// 	this.$(".io-tooltip-content").css({"left":(domWidth+20)+'px','top':'0px'});//右下  
			// }else if(type=="bottomLeft"){
			// 	this.$(".io-tooltip-content").css({"left":'0px','top':(domHeight+5)+'px'});  //下左
			// }else if(type=="bottomRight"){
			// 	this.$(".io-tooltip-content").css({"left":(domWidth-tipWidth)+'px','top':(domHeight+5)+'px'});//下右
			// }
			
		}
	}.property('_hidden'),
	type:"top",
	/**
	 * classNameBindings
	 * @return {[type]} [description]
	 */
	typeClass: function() {
			return this.get('classNamePrefix') + "placement-" +this.get('type');
	}.property('type'),
	displayClass: function() {
		if (this.get('_hidden')) {
			return this.get('classNamePrefix') + 'hidden';
		} 
		return '';
	}.property('_hidden'),
	activeClass: function() {
		if (!this.get('_hidden')) {
			return this.get('classNamePrefix') + 'active';
		} else {
			return '';
		}
	}.property('_hidden'),
	/**
	 * mosueover event description
	 * @type {[type]}
	 */
	t: null,
	_mouseover: false,
	mouseEnter() {
		console.log("悬浮");
		if (this.get('triggerEvent') !== 'mouseover') {
			return
		}
		clearTimeout(this.get('t'));
		this.set('_mouseover', true);
		this.set('_hidden', false);
		this.set('showTips',true);
	},
	mouseLeave() {
		console.log("远离");
		if (this.get('triggerEvent') !== 'mouseover') {
			return
		}
		const t = setTimeout(function() {
			this.set('_mouseover', false);
			this.set('_hidden', true);
			this.set('showTips',false);
		}.bind(this), 200);
		this.set('t', t);
	},
});