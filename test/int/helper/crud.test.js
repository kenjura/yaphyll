const assert = require('assert').strict;

const { findMany } = require('../../../src/api/helper/crud');

describe('crud', async () => {
	// const connection = getMockConnection();
	const testData = getTestData();

	const schema = testData.schemas.forum;
	// const data = testData.data.forum;

	describe('findMany', async () => {
		it('should work', async () => {
			const query = { forumId:'1', fields:'createdBy,forumId,parentForumId,displayOrder,title' };
			const actual = await findMany({ query, rawRows:true, schema });
			const expected = [
				{ forumId:1, createdBy:'superman', title:'Justice League public', displayOrder:1, parentForumId:null }
			];
			assert.deepStrictEqual(actual, expected);
		})	
	})
})



function getMockConnection() {
	return {
		execute(sql, values) {

		}
	}
}

function getTestData() {
	return {
		schemas: {
			forum: {
				tableName: 'forums',
				fields: [
					{ name:'forumId', type:'int', required:true, autoIncrement:true, primaryKey:true },
					{ name:'createdBy', type:'varchar(255)', required:true, foreignKeyTable:'users', foreignKeyField:'username' },
					{ name:'title', type:'varchar(255)', required:true },
					{ name:'displayOrder', type:'int' },
					{ name:'parentForumId', type:'int' },
				],
			},
		},
		data: {
			forum: [
				{ forumId:1, createdBy:'system', title:'forum 1', displayOrder:1, parentForumId:null },
				{ forumId:2, createdBy:'system', title:'forum 2', displayOrder:2, parentForumId:null },
				{ forumId:3, createdBy:'system', title:'forum 1a', displayOrder:1, parentForumId:1 },
				{ forumId:4, createdBy:'system', title:'forum 1b', displayOrder:2, parentForumId:1 },
				{ forumId:5, createdBy:'system', title:'forum 1a1', displayOrder:1, parentForumId:3 },
			]
		}
	}
}