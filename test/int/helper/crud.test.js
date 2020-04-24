const assert = require('assert').strict;

const { createTable, find, insert } = require('../../../src/api/helper/crud');

function stripWhitespace(str) {
	return str.replace(/\s{1,}/g, ' ');
}

describe('crud', async () => {
	// const connection = getMockConnection();
	const testData = getTestData();

	const schema = testData.schemas.forum;
	// const data = testData.data.forum;

	describe('createTable', async () => {
		it('should generate correct sql', async () => {
			const actual = await createTable({ dry:true, schema });
			const expected = `
				CREATE TABLE forums(
					forumId int not null auto_increment primary key,
					createdBy varchar(255) not null,
					title varchar(255) not null,
					displayOrder int,
					parentForumId int,
		    		createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
		    		FOREIGN KEY (createdBy)
		    			REFERENCES users (username)
				);
			`;
			assert.deepStrictEqual(stripWhitespace(actual), stripWhitespace(expected));
		})
	});

	describe('find', async () => {
		it('should work', async () => {
			const query = { forumId:'1', fields:'createdBy,forumId,parentForumId,displayOrder,title' };
			const actual = await find({ query, metadata:false, rawRows:true, schema });
			const expected = [
				{ forumId:1, createdBy:'superman', title:'Justice League public', displayOrder:1, parentForumId:null }
			];
			assert.deepStrictEqual(actual, expected);
		})	
	});

	describe('insert', async () => {
		it('should handle inserting 1 row', async () => {
			const rows = [
				{ createdBy:'system', title:'int test forum 1' },
			]
			const actual = await insert({ rows, schema });
			const expected = 1;
			assert.deepStrictEqual(actual, expected);
		});
		it('should handle inserting 2 rows', async () => {
			const rows = [
				{ createdBy:'system', title:'int test forum 2' },
				{ createdBy:'system', title:'int test forum 3' },
			]
			const actual = await insert({ rows, schema });
			const expected = 2;
			assert.deepStrictEqual(actual, expected);
		});
	});
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
					{ name:'createdBy', type:'varchar(255)', required:true, foreignKey:'createdBy', foreignKeyTable:'users', foreignKeyField:'username' },
					{ name:'title', type:'varchar(255)', required:true },
					{ name:'displayOrder', type:'int' },
					{ name:'parentForumId', type:'int' },
					{ name:'createdAt', type:'timestamp', default:'CURRENT_TIMESTAMP' },
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