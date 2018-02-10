/*
* @Author: steven
* @Date:   2018-02-06 10:53:12
* @Last Modified by:   steven
* @Last Modified time: 2018-02-10 15:52:13
*/
function shopCar (){
	getAjax("/community/spcart/list", {}, function (res){
		// console.log(res);
		shopList(res);
	});
}

function shopList (data){
	$(".shop-head").empty();
	$(".shop-ul").remove();
	if (data.order_data.length < 1) {return} ;

	var shopheadlist = ['全选', '零件号', '注释', '单价(元)', '数量', '金额(元)', '运费(元)'];
	var shophead = shopheadlist.map(function(elem, index) {
		if (index === 0) {
			return `<div class="shop-li-span" key=`+index+`><input type="checkbox" name="">`+elem+`</div>`
		} else {
			return `<div class="shop-li-span"><span key=`+index+`>`+elem+`</span></div>`;
		}
	 });
	var shopData = data.order_data.map(function(elem, index) {
		var shopul = elem.items.map(function(item, chindindex) {
			
			var keymap = ["", "pid", "label", "price", "quantity", "money" ,"delete"];
			var children = ''
			var shopli = keymap.forEach(function(selfitem, selfindex) {
				var tureelem = null;
				if (selfindex === 0) {
					tureelem = `<input type="checkbox" name="">`;
				} else if(selfindex === 6){
					tureelem = `<span>删除</span>`
				}else{
					tureelem = `<span>`+item[selfitem]+`</span>`;
				}
				children += `<div class="shop-li-span" key=`+selfindex+`>`+tureelem+`</div>`
			})
			return `<div class="shop-li" key=`+chindindex+`>`+children+`</div>`;
		})

		return `<div class="shop-ul" key=`+index+`>
					<div class="shop-li-head">
						<input type="checkbox" name="">`+elem.title+`
					</div>
					`+shopul+`
				</div>`
	})
	$(".shop-head").append(shophead);
	$(".shop-head").after(shopData);
}


// 购物车页面初始化
function shopcarInit (){
	shopCar();
}