angular
	.module("imagePicker")
	.component("imagePicker", {
		templateUrl: "app/modules/image-picker/image-picker.html",
		bindings: {
			imageIdPaths: "=",
			selectedId: "="
		},
		controller: function() {
			var ctrl = this;		
			
			// private methods
			var select = function(selectId) {
				ctrl.selectedId = selectId;
				ctrl.selectedPath = ctrl.imageIdPaths[selectId];
			};

			// public methods
			ctrl.$onInit = function() {
				select(ctrl.selectedId);
			};			

			ctrl.exitSelectMode = function(selectId){
				select(selectId);
				ctrl.selectMode = false;
			};

			ctrl.enterSelectMode = function() {
				ctrl.selectMode = true;
			};			
		}
	});