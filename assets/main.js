jQuery(document).ready(function($) {
				Sortable.create(removeGr, {
				  group: {
				    name: 'shared',
				    put: true
				  }
				});

				Sortable.create(editGr, {
				  	group: 'shared',
				  	sort: true,
				  	onStart: function (/**Event*/evt) {
		        		evt.oldIndex;  // element index within parent
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
				        
				        var itemCount = $("li.list-group-item").length;
				        if(itemCount >= 9){
				        	var notCount = $("li.old-item").not(".hide").length;
				        	var listOld = $("li.old-item");
				        	$(listOld[notCount-1]).addClass("hide");
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
				        var notCount = $("ul#editGr li.hide").length;
			        	var listOld = $("ul#editGr li.hide");
			        	$(listOld[notCount-1]).removeClass("hide");
				    },
				});

			});