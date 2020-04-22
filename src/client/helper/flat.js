import { deepCopy } from './deepCopy.js';
import { arrayToMap } from './objectMap.js';

export { addDepth };

function addDepth({ 
	arr=[], 
	idField='id', 
	parentIdField='parentId',
	replace=false 
}={}) {
	let _arr = replace ? arr : deepCopy(arr);
	let isCurrentDepth;
	let parentIdsOfCurrentDepth = [];
	let map = arrayToMap(_arr, idField);
	const MAX_DEPTH = 10;
	for (let d = 0; d < MAX_DEPTH; d++) {
		if (d === 0) isCurrentDepth = el => !el[parentIdField];
		else isCurrentDepth = el => parentIdsOfCurrentDepth.includes(el[parentIdField]);
		for (let i = 0; i < _arr.length; i++) {
			if (isCurrentDepth(_arr[i])) {
				_arr[i].depth = d;
				let parent = map[_arr[i][parentIdField]] || {};
				// _arr[i].pidTree = (parent.pidTree || '') + ',' + _arr[i][idField];
				_arr[i].pidTree = parent.pidTree 
				? `${parent.pidTree},${_arr[i][idField]}`
				: `${_arr[i][idField]}`;
			}
		}		

		parentIdsOfCurrentDepth = _arr
			.filter(el => el.depth === d)
			.map(el => el[idField]);
	}
	return _arr;
}