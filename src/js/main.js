/*
* @Author: steven
* @Date:   2018-02-08 16:53:04
* @Last Modified by:   steven
* @Last Modified time: 2018-02-10 13:41:58
*/
// nav 点击处理
$('.nav').on('click',  function(event) {
	event.preventDefault();
	/* Act on the event */
	if (!$(this).hasClass("nav-clicked")) {
		$('.nav').removeClass("nav-clicked");
		$(this).addClass("nav-clicked");

		var clidkIndex = $(this).index();
		// 对应内容部分加载
		$(".s-list").css("display","none")
		$(".s-list").eq(clidkIndex).css("display","block");
		if (clidkIndex === 0) {
			// 特卖会
			onsaleInit();
		} else if (clidkIndex === 1) {
			// 零件搜索

		} else if (clidkIndex === 2) {
			// 购物车
			shopcarInit();
		} else if (clidkIndex === 3) {
			// 已买到货物
		} else {
			// 个人中心
		}
	}
});

$(".head-self").on('click',  function(event) {
	event.preventDefault();
	event.stopPropagation();
	/* Act on the event */
	console.log("aaa");

});

$(".head-exit").on('click',  function(event) {
	event.preventDefault();
	event.stopPropagation();
	/* Act on the event */
	console.log("bbb");
	location.href = "../login.html";
});