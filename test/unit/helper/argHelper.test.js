const assert = require('assert').strict;

const { getArgs, parseFilter } = require('../../../src/api/helper/argHelper');

describe('argHelper > getArgs', () => {
	it('should parse sort=foo correctly', () => {
		const args = { sort:'foo' };
		const expected = {
			sql: 'ORDER BY ?',
			val: ['foo ASC']
		}
		const actual = getArgs(args);
		assert.deepStrictEqual(actual, expected);
	})
	it('should parse sort=-foo,bar correctly', () => {
		const args = { sort:'-foo,bar' };
		const expected = {
			sql: 'ORDER BY ?',
			val: ['foo DESC, bar ASC']
		}
		const actual = getArgs(args);
		assert.deepStrictEqual(actual, expected);
	})
	it('should parse foo=1 correctly', () => {
		const args = { foo:'1' };
		const expected = {
			sql: 'WHERE foo = ?',
			val: ['1']
		}
		const actual = getArgs(args);
		assert.deepStrictEqual(actual, expected);
	})
	it('should parse foo=1,bar=1-2 correctly', () => {
		const args = { foo:'1', bar:'1-2' };
		const expected = {
			sql: 'WHERE foo = ? AND bar BETWEEN ? AND ?',
			val: ['1','1','2']
		}
		const actual = getArgs(args);
		assert.deepStrictEqual(actual, expected);
	})
	it("should parse 'foo=1','bar=1-2','baz=1,2,3' correctly", () => {
		const args = { foo:'1', bar:'1-2', baz:'1,2,3' };
		const expected = {
			sql: `WHERE foo = ? AND bar BETWEEN ? AND ? AND baz IN (?)`,
			val: ['1','1','2',"'1','2','3'"]
		}
		const actual = getArgs(args);
		assert.deepStrictEqual(actual, expected);
	})
	it('should parse foo=1,sort=foo correctly', () => {
		const args = { foo:'1', sort:'foo' };
		const expected = {
			sql: 'WHERE foo = ?\nORDER BY ?',
			val: ['1', 'foo ASC']
		}
		const actual = getArgs(args);
		assert.deepStrictEqual(actual, expected);
	})
	it('should parse foo=1,sort=-foo,limit=50,offset=100 correctly', () => {
		const args = { foo:'1', sort:'-foo', limit:'50', offset:'100' };
		const expected = {
			sql: 'WHERE foo = ?\nORDER BY ?\nLIMIT ?\nOFFSET ?',
			val: ['1', 'foo DESC', '50', '100']
		}
		const actual = getArgs(args);
		assert.deepStrictEqual(actual, expected);
	})
});

describe('argHelper > parseFilter', () => {
	it('should parse [foo,\'1\'] correctly', () => {
		const key = 'foo';
		const val = '1';
		const expected = {
			sql: 'foo = ?',
			val: ['1'],
		}
		const actual = parseFilter(key, val);
		assert.deepStrictEqual(actual, expected);
	});
	it('should parse [foo,\'1-5\'] correctly', () => {
		const key = 'foo';
		const val = '1-5';
		const expected = {
			sql: 'foo BETWEEN ? AND ?',
			val: ['1','5'],
		}
		const actual = parseFilter(key, val);
		assert.deepStrictEqual(actual, expected);
	});
	it('should parse [foo,\'1,2,3\'] correctly', () => {
		const key = 'foo';
		const val = '1,2,3';
		const expected = {
			sql: 'foo IN (?)',
			val: [`'1','2','3'`],
		}
		const actual = parseFilter(key, val);
		assert.deepStrictEqual(actual, expected);
	});
})