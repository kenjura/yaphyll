import React from 'react';

export default function LoadingIndicator(props) {
	const { loading } = props;

	if (!loading) return '';

	return <div className="loading-indicator">loading...</div>;
}