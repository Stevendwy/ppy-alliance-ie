/*
* @Author: steven
* @Date:   2018-02-06 10:53:12
* @Last Modified by:   steven
* @Last Modified time: 2018-02-06 16:12:32
*/
!function (){
	getUserInfo(function(data){
		// full_name
		if (data !== "wrongmsg") {
			$(".head-username").text(data)
		}
	})
}()