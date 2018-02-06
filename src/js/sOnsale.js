/*
* @Author: steven
* @Date:   2018-02-06 10:53:12
* @Last Modified by:   steven
* @Last Modified time: 2018-02-06 18:14:08
*/

// 获取列表
function getGoods (obj){
	getAjax('/community/sailling', obj, function(res) {
	      console.log(res)
	      cityList(res.item_city);
	      goodList(res.data)
	 })
}


function cityList (data) {
	$(".city-click").remove();
	var newSpan = data.map(function(elem, index) {
		if (elem !== "" || elem !== null) {
			return "<span key='index' class='city-click'>"+elem+"</span>";
		}
	})

	$(".city").after(newSpan)
	$(".city-click").eq(0).addClass('city-clicked');

	$(".city-click").on('click', function(event) {	
		if (!$(this).hasClass('city-clicked')) {
			$(".city-click").removeClass("city-clicked");
			$(this).addClass('city-clicked');
			console.log($(this).text())
			var objs = {
				page:1,
				address:$(this).text()
			}
			getGoods(objs)
		}
	});
}

function goodList (data) {
	console.log(data)
	$(".s-goods").empty();
	var newDiv = data.map(function(item, index) {
		return `<div key=`+index+` class="item">
					<img src=`+item.img+` alt="goodsimg" class="part-img" onerror='nofind(this);'>
					<div class="part-id">`+item.pid+`</div>
					<div class="part-annotation">`+item.label+`</div>
					<div>
						<div class="part-company">`+item.supplier+`</div>
						<div class="part-address">`+item.address+`</div>
					</div>
					<div>
						<div class="part-price">`+item.prices_sale+`</div>
						<div class="part-carriage">`+item.carriage+`</div>
					</div>
					<button class="cart-handle">加入购物车</button>
				</div>`;
	})

	$(".s-goods").append(newDiv)
}

function nofind(img){ 
    img.src="http://yhcqp.youfan.pub/static/img/no_img.png"; 
    img.onerror=null; //如果错误图片也不存在就会死循环一直跳，所以要设置成null，也可以不加
} 

!function (){
	getUserInfo(function(data){
		// full_name
		if (data !== "wrongmsg") {
			$(".head-username").text(data)
		}
	})
	getGoods({})
}()