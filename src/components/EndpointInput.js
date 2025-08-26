import React from "react";

const EndpointInput = ({ endpoint, setEndpoint }) => {
	return (
		<div>
			<input
				type="text"
				placeholder="Enter API endpoint path"
				value={endpoint}
				onChange={(e) => setEndpoint(e.target.value)}
			/>
		</div>
	);
};

export default EndpointInput;
