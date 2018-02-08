/*
* @Author: steven
* @Date:   2018-02-06 10:53:12
* @Last Modified by:   steven
* @Last Modified time: 2018-02-08 17:06:46
*/

var transmitlabel = "";
$("#s-search-btn").on('click', function(event) {
	event.preventDefault();
	/* Act on the event */
	var searchValue = $(".s-input-input").val();
	if ($.trim(searchValue).length == 0 || searchValue === "请输入奥迪零件编号" ) {		
		alert("内容不能为空");
	}else{
		partSearch(searchValue);
	}
	
});

function partSearch (value){
	var searchObj = {
		"parts": value,
        "brand": "audi",
        "code": "audi",
        "page": 1
	}
	// var url = '/community/parts_search?parts='+ value +'&brand=audi&code=audi&page=1'
	postAjax('/community/parts_search', searchObj, function(res) {
	      if (res.data.length == 0) {
	      	$(".s-search-without").siblings().css('display',"none");
			$(".s-search-without").css("display",'block');
	      }else if (res.data.length == 1) {
	      	partList(res.data);
	      	getDetail(res.data[0].pid);

			transmitlabel = res.data[0].label;

	      }else if (res.data.length > 1) {
	      	partList(res.data);
	      }else {
	      	$(".s-search-without").siblings().css('display',"none");
			$(".s-search-without").css("display",'block');
	      }
	 })
}

function partList (data){
	$(".s-search-ul").siblings().css('display',"none");
	$(".s-search-ul").css("display",'block');

	$(".s-search-ul-li").remove();
	var newDiv = data.map(function(elem, index) {
		if (elem !== "" || elem !== null) {
			return `<div key=`+index+` class="s-search-ul-li">
						<div></div>
						<div>`+elem.s_pid+`</div>
						<div>`+elem.label+`</div>
					</div>`;
		}
	})

	$(".s-search-ul-lifirst").after(newDiv);
	$(".s-search-ul-li").on('click', function(event) {	
		var _pid = $(this).children().eq(1).text();
		var _label = $(this).children().eq(2).text();
		transmitlabel = _label;
		getDetail(_pid)
	});

}

// 返回 商品 详情过滤
$(".s-backBtn").on('click',  function(event) {
	event.preventDefault();
	/* Act on the event */
	$(".s-search-ul").siblings().css('display',"none");
	$(".s-search-ul").css("display",'block');
});

$(".s-head-filter").on('click',  function(event) {
	if (!$(this).hasClass('filted')) {
		$(".s-head-filter").removeClass('filted');
		$(this).addClass('filted');
		var filterIndex = $(this).index();
		if (filterIndex === 2) {
			$(".s-search-detail-goods").hide();
			$(".s-search-detail-detail").show();
		}else{
			$(".s-search-detail-detail").hide();
			$(".s-search-detail-goods").show();
		}
	}
});

function getDetail (data) {
	var getDetailObj = {
  		"pid":data,
		"brand":"audi"
  	}

	getAjax('/community/partsitems',getDetailObj, function (res){
		partDetail(res.data);
	})
	partBasis(data);
}

function partBasis (data) {
	var getPartDetail = {
  		"part":data,
		"brand":"audi"
  	}

	getAjax('/ppys/partssearchs',getPartDetail, function (ress){
		$(".s-search-detail-detail-libasis").remove();
		if (ress.partdetail.length > 0) {
			var newhead = {
				"key":"基础信息",
				"value":""
			}
			ress.partdetail.unshift(newhead);
			var detailbasis = ress.partdetail.map(function(elem, index) {
				return `<div key=`+index+` class="s-search-detail-detail-libasis">
							<div>`+elem.key+`</div>
							<div>`+elem.value+`</div>
						</div>`;
			})
			$(".s-search-detail-detail").prepend(detailbasis);
		}
	})

	getAjax('/ppys/partcars',getPartDetail, function (resss){
		$(".s-search-detail-detail-ul").empty();
		if (resss.data.length > 0) {
			var carDeatilHead =  `<div class="s-search-detail-detail-li">
									<div><span></span></div>
									<div><span>车型</span></div>
									<div><span>市场</span></div>
									<div><span>年份</span></div>
									<div><span>零件组</span></div>
								</div>`;
			var carDetailUl = resss.data.map(function(elem, index) {
				var carDetailLi = elem.map(function (item, ind){
					return `<div key=`+ind+` class="s-search-detail-detail-li">
									<div><span></span></div>
									<div><span>`+item.cars_model+`</span></div>
									<div><span>`+item.market+`</span></div>
									<div><span>`+item.year+`</span></div>
									<div><span>`+item.group_name+`</span></div>
								</div>`;
				})
				$(".s-search-detail-detail-ul").append(carDetailLi);
			})
			$(".s-search-detail-detail-ul").prepend(carDeatilHead);
		}
	})
}


function partDetail (data){
	$(".s-search-detail").siblings().css('display',"none");
	$(".s-search-detail").css("display",'block');
	
	$(".goods-title-pid").empty();
	$(".s-search-detail-goods-lifirst").empty();
	$(".goods-title-brand-second").remove();
	$(".goods-title-city-second").remove();
	$(".s-search-detail-goods-li").empty();

	var pidlabel = `<span>`+data[0].pid+`</span><span>`+transmitlabel+`</span>`;
	$(".goods-title-pid").append(pidlabel);

	var headTitle = ["零件号", "品牌", "库存", "销售价", "城市", "仓库", "服务商", "购物车"];
	var newfirstli = headTitle.map(function(elem, index) {
		return `<div key=`+index+` class="goods-lifirst-child">`+elem+`</div>`;
	})
	$(".s-search-detail-goods-lifirst").append(newfirstli);
	
	var newgoodsli = data.map(function(elem, index) {
		if (elem !== "" || elem !== null) {
			var brandlist =  `<span key=`+index+` class="goods-title-brand-second">`+elem.mill+`(1)</span>`;
			var citylist = 	`<span key=`+index+` class="goods-title-city-second">`+elem.address+`(1)</span>`;
			var detaillist = `<div key=`+index+` class="goods-li-child">
								<div><span>`+elem.pid+`</span></div>
								<div><span>`+elem.mill+`</span></div>
								<div><span>`+elem.amount+`</span></div>
								<div><span>`+elem.prices+`</span></div>
								<div><span>`+elem.address+`</span></div>
								<div><span>`+elem.location+`</span></div>
								<div><span>`+elem.supplier+`</span></div>
								<div><span>`+elem.in_spcarts+`</span></div>
							</div>`;
			$(".goods-title-brand-first").after(brandlist);
			$(".goods-title-city-first").after(citylist);

			$(".s-search-detail-goods-li").append(detaillist);
		}
	})
	
	

}

