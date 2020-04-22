export { arrayToMap }

function arrayToMap(arr, keyField) {
	let map = {};
	for (let i = 0; i < arr.length; i++) {
		map[arr[i][keyField]] = arr[i];
	}
	return map;
}