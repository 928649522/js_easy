
if('undefined' == typeof $){ throw "jQuery not ref";}
var $hao = (function(win,doc,$){
	var methods={
		test1:test1,
		test2:test2
	}
	
	
	
	function fillFormData(formId){
		let fd = new FormData(doc.forms.namedItem("fileForm")); 
		 var form=document.getElementById("form1");
        var fd =new FormData(form);
        $.ajax({
             url: "server.php",
             type: "POST",
             data: fd,
             processData: false,  // 告诉jQuery不要去处理发送的数据
             contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
             success: function(response,status,xhr){
                console.log(xhr);
                var json=$.parseJSON(response);
                var result = '';
                $('#result').html(result);
             }
        });
        return false;
	}
	function test2(){
		alert(2);
	}
	return methods;
}(window,document,$));
 
  