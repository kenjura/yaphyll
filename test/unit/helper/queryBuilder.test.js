const assert = require('assert').strict;

const { buildQuery, getSelect, getFrom, getWhere, getOrderBy, getLimit, getOffset, parseFilter } = require('../../../src/api/helper/queryBuilder');


describe('queryBuilder', () => {
	describe('getSelect', () => {
		it('should handle default case', () => {
			const query = {};
			const expected = {
				sql: 'SELECT *',
				val: [],
			}
			const actual = getSelect({ query });
			assert.deepStrictEqual(actual, expected);
		})
		it('should handle fields=foo,bar', () => {
			const query = { fields:'foo,bar' };
			const expected = {
				sql: 'SELECT `foo`,`bar`',
				val: [ ],
			}
			const actual = getSelect({ query });
			assert.deepStrictEqual(actual, expected);
		})
		it(`should handle "fields=foo';DROP TABLE stuff;--,bar`, () => {
			const query = { fields:`foo';DROP TABLE stuff;--,bar` };
			const expected = {
				sql: 'SELECT `foo\'\';DROP TABLE stuff;--`,`bar`',
				val: [ ],
			}
			const actual = getSelect({ query });
			assert.deepStrictEqual(actual, expected);
		})
	})
	describe('getFrom', () => {
		const schema = { tableName:'stuff' };

		it('should handle default case', () => {
			const expected = {
				sql: 'FROM stuff',
				val: [],
			}
			const actual = getFrom({ schema });
			assert.deepStrictEqual(actual, expected);
		})
	})
	describe('getWhere', () => {
		it('should parse foo=1 correctly', () => {
			const query = { foo:'1' };
			const expected = {
				sql: 'WHERE foo = ?',
				val: ['1']
			}
			const actual = getWhere({query});
			assert.deepStrictEqual(actual, expected);
		})
		it('should parse foo=1,bar=1-2 correctly', () => {
			const query = { foo:'1', bar:'1-2' };
			const expected = {
				sql: 'WHERE foo = ? AND bar BETWEEN ? AND ?',
				val: ['1','1','2']
			}
			const actual = getWhere({query});
			assert.deepStrictEqual(actual, expected);
		})
		it("should parse 'foo=1','bar=1-2','baz=1,2,3' correctly", () => {
			const query = { foo:'1', bar:'1-2', baz:'1,2,3' };
			const expected = {
				sql: `WHERE foo = ? AND bar BETWEEN ? AND ? AND baz IN (?)`,
				val: ['1','1','2',"'1','2','3'"]
			}
			const actual = getWhere({query});
			assert.deepStrictEqual(actual, expected);
		})
	})
	describe('getOrderBy', () => {
		it('should handle the default case correctly', () => {
			const query = {};
			const expected = {
				sql: '',
				val: [],
			}
			const actual = getOrderBy({ query });
			assert.deepStrictEqual(actual, expected);
		})
		it('should parse sort=foo correctly', () => {
			const query = { sort:'foo' };
			const expected = {
				sql: 'ORDER BY ?',
				val: ['foo ASC']
			}
			const actual = getOrderBy({ query });
			assert.deepStrictEqual(actual, expected);
		})
		it('should parse sort=-foo,bar correctly', () => {
			const query = { sort:'-foo,bar' };
			const expected = {
				sql: 'ORDER BY ?',
				val: ['foo DESC, bar ASC']
			}
			const actual = getOrderBy({ query });
			assert.deepStrictEqual(actual, expected);
		})
	})
	describe('getLimit', () => {
		it('should handle default case', () => {
			const query = {};
			const expected = {
				sql: '',
				val: [],
			}
			const actual = getLimit({ query });
			assert.deepStrictEqual(actual, expected);
		})
		it('should handle limit=50', () => {
			const query = { limit:'50' };
			const expected = {
				sql: 'LIMIT ?',
				val: ['50'],
			}
			const actual = getLimit({ query });
			assert.deepStrictEqual(actual, expected);
		})
	})
	describe('getOffset', () => {
		it('should handle default case', () => {
			const query = {};
			const expected = {
				sql: '',
				val: [],
			}
			const actual = getOffset({ query });
			assert.deepStrictEqual(actual, expected);
		})
		it('should handle offset=50', () => {
			const query = { offset:'50' };
			const expected = {
				sql: 'OFFSET ?',
				val: ['50'],
			}
			const actual = getOffset({ query });
			assert.deepStrictEqual(actual, expected);
		})
	})
	describe('buildQuery', () => {
		const schema = { tableName:'stuff' };

		it('should parse foo=1,sort=foo correctly', () => {
			const query = { foo:'1', sort:'foo' };
			const expected = {
				sql: 'SELECT *\nFROM stuff\nWHERE foo = ?\nORDER BY ?',
				val: ['1', 'foo ASC']
			}
			const actual = buildQuery({ query, schema });
			assert.deepStrictEqual(actual, expected);
		})
		it('should parse foo=1,sort=-foo,limit=50,offset=100 correctly', () => {
			const query = { foo:'1', sort:'-foo', limit:'50', offset:'100' };
			const expected = {
				sql: 'SELECT *\nFROM stuff\nWHERE foo = ?\nORDER BY ?\nLIMIT ?\nOFFSET ?',
				val: ['1', 'foo DESC', '50', '100']
			}
			const actual = buildQuery({ query, schema });
			assert.deepStrictEqual(actual, expected);
		})
	})

	describe('parseFilter', () => {
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
})
