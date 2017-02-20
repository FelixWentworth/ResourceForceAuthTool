if(Array.tryRemove) {
	throw "Array.tryRemove is already defined somewhere else. This may lead to unexpected behaviour";
} else {
	Array.tryRemove = function (array, item) {
		var succeeded = false;

		try {
			Array.remove(array, item);
			succeeded = true;
		} catch(error) {
			console.log(error);
		};	

		return succeeded;
	};
}

if(Array.remove) {
	throw "Array.remove is already defined somewhere else. This may lead to unexpected behaviour";
} else {
	Array.remove = function (array, item) {
		Array.removeWhere(array, i => i == item);
	};
}

if(Array.removeWhere) {
	throw "Array.removeWhere is already defined somewhere else. This may lead to unexpected behaviour";
} else {
	Array.removeWhere = function(array, predicate) {
		if(array.constructor !== Array) {
			throw "Object reference does not have an array constructor.";
		}

		var index = array.findIndex(predicate);

		if(0 <= index && index < array.length) {
			array.splice(index, 1);
		} else {
			throw "Couldn't remove item as it was not present in the array." + 
				" \nArray: " + array +
				" \nItem: " + item;
		}	
	};
}

if(Array.contains) {
	throw "Array.contains is already defined somewhere else. This may lead to unexpected behaviour";
} else {
	Array.contains = function (array, item) {
		return Array.containsWhere(i => i == item);
	};
}

if(Array.containsWhere) {
	throw "Array.containsWhere is already defined somewhere else. This may lead to unexpected behaviour";
} else {
	Array.containsWhere = function (array, predicate) {
		if(array.constructor !== Array) {
			throw "Object reference does not have an array constructor.";
		}

	    var index = array.findIndex(predicate);

		if(0 <= index && index < array.length) {
			return true;
		} else {
			return false;
		}
	};
}

if(Array.single) {
	throw "Array.select is already defined somewhere else. This may lead to unexpected behaviour";
} else {
	Array.single = function (array, predicate) {
		if(array.constructor !== Array) {
			throw "Object reference does not have an array constructor.";
		}

	    var index = array.findIndex(predicate);

		if(0 <= index && index < array.length) {
			return array[index];
		} else {
			throw "Match not found in array. "
				" \nArray: " + array +
				" \nPredicate: " + predicate;
		}
	};
}