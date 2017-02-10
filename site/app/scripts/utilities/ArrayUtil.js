function ArrayUtil () {}

ArrayUtil.tryRemove = function (array, item) {
	var succeeded = false;

	try {
		ArrayUtil.remove(array, item);
		succeeded = true;
	} catch(error) {
		console.log(error);
	};	

	return succeeded;
};

ArrayUtil.remove = function (array, item) {
	if(array.constructor !== Array) {
		throw "Object reference does not have an array constructor.";
	}

    var index = array.findIndex(i => i == item);

	if(0 <= index && index < array.length) {
		array.splice(index, 1);
	} else {
		throw "Couldn't remove item as it was not present in the array." + 
			" \nArray: " + array +
			" \nItem: " + item;
	}
};