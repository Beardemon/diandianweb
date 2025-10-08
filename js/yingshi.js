var screenShotJson = '[{"pic_name":"1","url":"image/1.jpg"},{"pic_name":"2","url":"image/2.jpg"},{"pic_name":"3","url":"image/3.jpg"},{"pic_name":"4","url":"image/4.jpg"},{"pic_name":"5","url":"image/5.jpg"},{"pic_name":"6","url":"image/6.jpg"},{"pic_name":"7","url":"image/7.jpg"}]';

function inflateScreenshots() {
	var list = $('#img-list');
	list.empty();
	var screenShots = jQuery.parseJSON(screenShotJson);
	for (var i = 0; i < screenShots.length; i++) {
		var screenShot = screenShots[i];
		list.append('<li class="img-item">'+
			'<figure class="img-figure img-divider">'+
			'<a href="' + screenShot.url + '" target="_blank" data-toggle="lightbox" data-gallery="screenShot-gallery" data-type="image">'+
			'<img src="image/' + screenShot.pic_name + '.jpg" class="img-fluid" alt="picture">'+
			'</a>'+
			'</figure>'+
			'</li>');
	}
}

function getQRCodeContent() {  
    return $('<div>'+
    	'<p><img src="image/qr_code.png" style="width: 230px;height: 230px;"></p>'+
    	'<hr style="margin:10px;">'+
    	'<p style="padding:0;margin:5px;"><button class="btn btn-outline-info btn-block" role="download-apk">手动下载</button></p>'+
    	'</div>'
    	);  
}  

function getQQGroupContent() {  
    return $('<div">'+
    '<img src="image/diandian_qq_1.jpg" class="img-qq-group img-fluid" style="margin-right:10px;">'+
  	'</div>');
}

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
	event.preventDefault();
	$(this).ekkoLightbox({
        alwaysShowClose: true,
        showArrows: true
	});
});

$(function() {

	inflateScreenshots();

	$('[data-toggle="tooltip"]').tooltip();

	//safari浏览器对bootstrap4的popover focus支持不好，在focus时不触发，所以在safari浏览器时popover改为click模式
	//其他浏览器还保持focus模式
	var issafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
	var triggerMode;
	if (issafariBrowser) {
		triggerMode = 'click';
	} else {
		triggerMode = 'focus';
	}

	$('#qr-popover').popover({  
	        html : true,    
	        title: '扫一扫，下载到手机',  
	        content: getQRCodeContent(),
	        placement: 'right',
	        trigger: triggerMode
	}); 

    $('#addQQ').popover({  
	        html : true,    
	        title: '扫一扫添加点点影视交流群',  
	        content: getQQGroupContent(),
	        placement: 'auto',
	        trigger: triggerMode,
    }); 
	

    $('#qr-popover').on('inserted.bs.popover', function () {
		$('[role="download-apk"]').click(function(event) {
	   		window.location.href = 'https://www.lanzous.com/ddys';
    	});
	});
    

});

$(window).resize(function() {


});

//preload images
//存放图片路径的数组
var imgSrcArr = [
	'image/qr_code.png',
    'image/diandian_qq_1.jpg',
];

var imgWrap = [];

function preloadImg(arr) {
    for(var i =0; i< arr.length ;i++) {
        imgWrap[i] = new Image();
        imgWrap[i].src = arr[i];
    }
}

preloadImg(imgSrcArr);

