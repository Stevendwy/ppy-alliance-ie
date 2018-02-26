/*
* @Author: steven
* @Date:   2018-02-06 10:53:12
* @Last Modified by:   steven
* @Last Modified time: 2018-02-26 16:50:49
*/
function shopCar (){
	getAjax("/community/spcart/list", {}, function (res){
		shopList(res);
	});
}

function shopList (data){
	$(".shop-head").empty();
	$(".shop-ul").remove();
	if (data.order_data.length < 1) {return} ;

	var shopheadlist = ['全选', '零件号', '注释', '单价(元)', '数量', '金额(元)', ''];
	var shophead = shopheadlist.map(function(elem, index) {
		if (index === 0) {
			return `<div class="shop-li-span" key=`+index+`><input type="checkbox" name="" class="shop-filter-checkall">`+elem+`</div>`
		} else {
			return `<div class="shop-li-span"><span key=`+index+`>`+elem+`</span></div>`;
		}
	 });
	var shopData = data.order_data.map(function(elem, index) {
		var ulchild = '';
		var shopul = elem.items.map(function(item, chindindex) {			
			var keymap = ["", "pid", "label", "price", "quantity", "money" ,"delete"];
			var children = '';
			var shopli = keymap.forEach(function(selfitem, selfindex) {
				var tureelem = null;
				if (selfindex === 0) {
					tureelem = `<input type="checkbox" name="" class="shop-filter-li" value="`+item.money+`">`;
				} else if(selfindex === 4){
					tureelem = `<span class="btn-reduce">-</span><input type="text" value=`+ item[selfitem]+ ` /><span class="btn-add">+</span>`
				}else if(selfindex === 6){
					tureelem = `<span>删除</span>`
				}else{
					tureelem = `<span>`+item[selfitem]+`</span>`;
				}
				children += `<div class="shop-li-span" key=`+selfindex+`>`+tureelem+`</div>`
			})
			ulchild += `<div class="shop-li" key=`+chindindex+`>`+children+`</div>`;
		})

		return `<div class="shop-ul" key=`+index+` value="`+elem+`">
					<div class="shop-li-head">
						<input type="checkbox" name="" class="shop-filter-ul">`+elem.title+`
					</div>
					`+ulchild+`
				</div>`
	})
	$(".shop-head").append(shophead);
	$(".shop-head").after(shopData);

	$(".btn-add").on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		var addVlaue = $(this).prev().val();
		addVlaue++;
		$(this).prev().val(addVlaue);

		var addprice = $(this).parent().prev().find("span").text() ;
		var addnewprice = (addprice * addVlaue).toFixed(2);
		$(this).parent().next().find("span").text(addnewprice);
		$(this).parent().parent().find(".shop-li-checkbox").value(addnewprice);
	});

	$(".btn-reduce").on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		var reduceVlaue = $(this).next().val();
		if (reduceVlaue >= 2) {
			reduceVlaue--
		} else {
			reduceVlaue = 1
		}		
		$(this).next().val(reduceVlaue);
		var reduceprice = $(this).parent().prev().find("span").text() ;
		var reducenewprice = (reduceprice * reduceVlaue).toFixed(2);
		$(this).parent().next().find("span").text(reducenewprice);
		$(this).parent().parent().find(".shop-li-checkbox").value(addnewprice);
	});

	// server business check
	$(".shop-filter-ul").on('click', function(event) {
		if ($(this).is(":checked")) {
			$(this).parent().nextAll().find('.shop-filter-li').prop('checked', true);
		}else{
			$(this).parent().nextAll().find('.shop-filter-li').prop('checked', false);
		}
		// 总计 checkPrice()
		checkPrice();
	});

	$(".shop-filter-li").on('click', function(event) {
		// 总计 checkPrice()
		checkPrice();
	});

	//创建生成底部过滤
	shopFilter();
}

function shopFilter () {
	$(".shop-filter-left").empty();
	$(".shop-filter-rifht").empty();

	var filterlist = ["全选", "删除", "已选", "0", "合计：", "0.00元", "结算"];
	var filterleft = "";
	var filterright = "";
	var filterdiv = filterlist.map(function(filteritem, filterindex) {
		var filterbody = null;
		if (filterindex === 0) {
			filterbody = `<input type="checkbox" name="" class="shop-filter-checkall">` + filteritem;
		}else if (filterindex === 3) {
			filterbody = `<span class="shop-filter-account">`+ filteritem +`</span>`;
		} else if (filterindex === 5) {
			filterbody = `<span class="shop-filter-accountprice">`+ filteritem +`</span>`;
		}else if(filterindex === 6){
			filterbody = `<button class="shop-filter-btn">` + filteritem + `</button>`
		}else{
			filterbody = `<span>`+ filteritem +`</span>`;
		}
		if (filterindex < 2) {
			filterleft += `<div class="shop-filter-li" key=`+filterindex+`>`+filterbody+`</div>`;
		} else {
			filterright += `<div class="shop-filter-li" key=`+filterindex+`>`+filterbody+`</div>`;
		}
		
	 });
	$(".shop-filter-left").append(filterleft);
	$(".shop-filter-rifht").append(filterright);

	$(".shop-filter-checkall").on('click',  function(event) {
		if ($(this).is(":checked")) {
			checkAll(true);
		}else{
			checkAll(false);
		}
		// 总计 checkPrice()
		checkPrice();
	});

	$(".shop-filter-btn").on('click', function(event) {
		$(".shop-car").css("display","none");
		$(".shop-order").css("display","block");
		// 订单列表
		orderList();		
	});
}

// 全选反选
function checkAll (types){
	// shop-filter-ul
	$(".shop-filter-checkall").each(function(){
		if (types) {
			$(this).prop('checked', true);
		}else{
			$(this).prop('checked', false);
		}
	})

	$(".shop-filter-ul").each(function(){
		if (types) {
			$(this).prop('checked', true);
		}else{
			$(this).prop('checked', false);
		}
	})

	$(".shop-filter-li").each(function(){
		if (types) {
			$(this).prop('checked', true);
		}else{
			$(this).prop('checked', false);
		}
	});
}

function checkPrice (){
	var selectamount = 0;
	var selectprice = 0;
	$(".shop-filter-li").each(function(){
		if ($(this).is(":checked")) {
			selectamount++;
			selectprice += Math.abs($(this).attr("value"));
		}
	})
	var selectPricefixed = selectprice.toFixed(2) + "元";
	$(".shop-filter-account").text(selectamount);
	$(".shop-filter-accountprice").text(selectPricefixed);
}


function orderList (){
	getAjax("/community/order/submit", {}, function (res){
		console.log(res);
		orderListData(res);
	});
}

function orderListData (data){
	$(".shop-order-ul").empty();
	var orderUl = data.order_data.map(function(items, index) {
		var orderbottom = `<div class="shop-order-ul-bottom">
								<span class="shop-order-bottom-word"></span>
								<input type="text" name="" class="shop-order-bottom-input">
								<div class="shop-order-bottom-right">
									<span>运费共计:<span class="shop-order-bottom-redword">不含运费</span></span>
									<span>货品总金额:<span class="shop-order-bottom-redword">￥`+items.total+`</span></span>
								</div>
							</div>`;
		
		var listHead = "";
		var orderlisthead = ["零件号", "注释", "单价(元)", "数量", "金额(元)", "运费(元)"];
		var creatListHead = orderlisthead.map(function(head, index) {
			listHead += `<div class="shop-order-li-child" key="`+index+`">`+head+`</div>`;
		})
		
		var liChild = "";
		var listChild = "";
		var orderlistkey = ["pid", "label", "price", "quantity", "money"];
		var orderLichild = items.items.map(function(child, index) {
			var listkey = orderlistkey.map(function(likey, indexs) {
				listChild += `<div class="shop-order-li-child" key="`+indexs+`">`+child[likey]+`</div>`;
			})
			liChild += `<div class="shop-order-li-list" key="`+index+`">`+listChild+`</div>`;
		})					

		var orderLi = `<div class="shop-order-ul-li">
							<div class="shop-order-li-head">`+listHead+`</div>
							`+liChild+`
						</div>`;
		return `<div class="shop-order-ul">
					<div class="shop-order-ul-color"></div>
					`+orderLi+`
					`+orderbottom+`
				</div>`
	})
	$(".shop-order-ul").append(orderUl);
}
// 购物车页面初始化
function shopcarInit (){
	shopCar();
	orderList();
}