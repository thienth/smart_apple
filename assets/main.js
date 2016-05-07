jQuery(document).ready(function($) {
	var resultArr = [1,2,3,4,5,6,7,8,9,10];
	Sortable.create(editGr, {
	  group: {
	    name: 'shared',
	    put: true,
	    sort: false
	  },
	  onRemove: function (/**Event*/evt) {
	        // same properties as onUpdate
	        var itemEl = evt.item;  // dragged HTMLElement
	        evt.from;  // previous list
	        // + indexes from onEnd
	        var currentOrder = $(itemEl).attr("order");
	        var currentIndex = -1;

	        var nextEl = $("li.tmp-item[order="+currentOrder+"]");
	        $(nextEl).removeClass("hide");
	        $(nextEl).attr("sort", 0);
	    },
	    onMove: function (/**Event*/evt) {
	        // Example: http://jsbin.com/tuyafe/1/edit?js,output
	        var itemEl = evt.dragged;
	        if($(itemEl).hasClass("tmp-item")){
	        	return false;
	        }
	    },
	    onAdd: function (/**Event*/evt) {	    	
	        var itemEl = evt.item;  // dragged HTMLElement
	        evt.from;  // previous list
	        // + indexes from onEnd
	        var currentOrder = $(itemEl).attr("order");
	        var nextEl = $(itemEl).next();
	        
	        if(!$(nextEl).hasClass("hide") && $(nextEl).hasClass("tmp-item")){
	        	$(nextEl).addClass("hide");
	        	$(nextEl).attr("order", currentOrder);
	        }else{
	        	
	        	var listTmp = $("ul#editGr").find("li.tmp-item");
				var lastTmp = [];
				listTmp.each(function(index, item){
					if(!$(item).hasClass("hide")){
						lastTmp.push(item);
					}
				});
				$(lastTmp[lastTmp.length-1]).addClass("hide");
				$(lastTmp[lastTmp.length-1]).attr("order", currentOrder);
	        }
	    },
	});

	Sortable.create(removeGr, {
	  	group: 'shared',
	  	sort: true,
	  	onStart: function (/**Event*/evt) {
    		evt.oldIndex;  // element index within parent
    	},
		onMove: function (/**Event*/evt) {
	        // Example: http://jsbin.com/tuyafe/1/edit?js,output
	        var itemEl = evt.dragged;
	        var currentOrder = $(itemEl).attr("order");
	        if(currentOrder == 0){
	        	return false;
	        }
	    },
	    // dragging ended
	    onEnd: function (/**Event*/evt) {
	        evt.oldIndex;  // element's old index within parent
	        evt.newIndex;  // element's new index within parent
	    },

	    // Element is dropped into the list from another list
	    onAdd: function (/**Event*/evt) {	    	
	        var itemEl = evt.item;  // dragged HTMLElement
	        evt.from;  // previous list
	        // + indexes from onEnd
	        var currentOrder = $(itemEl).attr("order");
	        var currentIndex = -1;
	        // find index of current element
	        var listLi = $("ul#removeGr").find("li");
	        for (var i = listLi.length - 1; i >= 0; i--) {
	        	var item = listLi[i];
	        	if($(item).attr("order") == currentOrder){
					currentIndex = i;
					break;
	        	}
	        }	        
	        // check next index element has class old-item and hide or not
	        var nextEl = listLi[currentIndex+1];
	        if(!$(nextEl).hasClass("hide") && $(nextEl).hasClass("old-item")){
	        	$(nextEl).addClass("hide");
	        	$(nextEl).attr("order", currentOrder);
	        }else{
	        	// find  list old item dont have hide class and have old-item class
	        	var fList = [];
	        	var oldList = $("li.old-item");
	        	oldList.each(function(index, item){
	        		if(!$(item).hasClass("hide")){
	        			fList.push(item);
	        		}
	        	})
	        	
        		$(fList[fList.length-1]).addClass("hide");
        		$('<li class="item-object old-item hide" order="'+currentOrder+'"><div class="circle" style="background-color: #fff;"></div></li>').insertAfter($(itemEl));
	        }

	        // check new-item = 10 then enable submit button
	        var newItem = $("ul#removeGr").find("li.new-item");
	        if(newItem.length == 10){
	        	$("button#submit-btn").prop("disabled", false);
	        }else{
	        	$("button#submit-btn").prop("disabled", true);
	        }
	    },

	    // Changed sorting within list
	    onUpdate: function (/**Event*/evt) {
	        var itemEl = evt.item;  // dragged HTMLElement
	        // + indexes from onEnd
	    },

	    // Called by any change to the list (add / update / remove)
	    onSort: function (/**Event*/evt) {
	        // same properties as onUpdate
	    },

	    // Element is removed from the list into another list
	    onRemove: function (/**Event*/evt) {
	        // same properties as onUpdate
	        var itemEl = evt.item;  // dragged HTMLElement
	        evt.from;  // previous list
	        // + indexes from onEnd
	        var currentOrder = $(itemEl).attr("order");
	        var currentIndex = -1;
	        // find index of current element
	        var listLi = $("ul#removeGr").find("li");
	        for (var i = listLi.length - 1; i >= 0; i--) {
	        	var item = listLi[i];
	        	if($(item).attr("order") == currentOrder){
					currentIndex = i;
					break;
	        	}
	        }
	        
	        $(listLi[currentIndex]).removeClass("hide");
	        $(listLi[currentIndex]).attr("order", 0);
	        // check new-item < 10 then enable submit button
	        var newItem = $("ul#removeGr").find("li.new-item");
	        if(newItem.length == 10){
	        	$("button#submit-btn").prop("disabled", false);
	        }else{
	        	$("button#submit-btn").prop("disabled", true);
	        }
	    },
	});
	$("button#submit-btn").on("click", function(e){
		e.preventDefault();
		var listNewItem = $("ul#removeGr").find("li.new-item");
		var submitScope = [];
		listNewItem.each(function(index, item){
			var orderValue = $(item).attr("order");
			submitScope.push(parseInt(orderValue));
		});
		
		var check = true;
		for (var i = resultArr.length - 1; i >= 0; i--) {
			if(resultArr[i] != submitScope[i]){
				check = false;
				break;
			}
		}
		if(!check){
			swal({
				title: "Ồ Sai Đáp Án", 
				text: "Bé kiểm tra lại đáp án của mình nhé!", 
				type: "error"
			});
		}else{
			swal({
				title: "Đáp Án Chính Xác", 
				text: "Bé thật là giỏi, đến với thử thách tiếp theo nhé.", 
				type: "success"
			}, function(confirm){
				if(confirm == true){
					$(".loading").removeClass("hide");
					$("#demo-img").attr("src", "./assets/images/demo-next.png");
					$(".play-video").attr("data-target", "#videoModal1");
					setInterval(function(){
						$(".loading").addClass("hide");
					}, 2000);
				}
			});
		}		
	});

	$("div.play-video").on("click", function(){
		var theModal = $(this).data("target"),
          videoSRC = $(this).attr("videoUrl"),
          videoSRCauto = videoSRC + "?autoplay=1";
          $(theModal + ' iframe').attr('src', videoSRCauto);
          $(theModal + ' button.close').click(function () {
              $(theModal + ' iframe').attr('src', videoSRC);
          });
	})
});