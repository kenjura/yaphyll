const { buildQuery } = require('./queryBuilder');
const { getConnection } = require('./sqlConnection');

module.exports = { findMany };

async function findMany({ query, rawRows=false, schema }={}) {
	const connection = await getConnection();
	const { sql, val } = buildQuery({ query, schema });
	console.log({ sql, val });
	const [ rows, fields ] = await connection.execute(sql, val);
	return rawRows ? raw(rows) : rows;
}


function raw(rows) {
	return rows.map(row => JSON.parse(JSON.stringify(row)));
}