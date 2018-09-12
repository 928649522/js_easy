/*expand for date object */

Date.prototype.format = function (date) {
	    return date.getFullYear()
	           +"-"+date.getMonth()
	           +"-"+date.getDate()
	           +" "+date.getHours()
	           +":"+date.getMinutes()
	           +":"+date.getSeconds();
}
Date.prototype.parseDate = function (date) {
	    try{
			if (dateString) { 
				var arr1 = dateString.split(" "); 
				var sdate = arr1[0].split('-');
				var tdate =arr1[1].split(':');
				var date = new Date(sdate[0], sdate[1]-1, sdate[2],tdate[0],tdate[1],tdate[2]); 
				return date;
				} 
		}catch(e){
			throw "date error";
		}
}





