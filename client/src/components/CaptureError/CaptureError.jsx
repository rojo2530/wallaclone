import React from 'react';
import PropTypes from 'prop-types';

export default function CaptureError ({ message, error }) {
	return (
		<div className="notification is-danger" id="no-results">
			<p>{message}</p>
			<p>Detail Error: {error}</p>
		</div>
	)
}

CaptureError.propTypes = {
	message: PropTypes.string.isRequired,
	error: PropTypes.string
}