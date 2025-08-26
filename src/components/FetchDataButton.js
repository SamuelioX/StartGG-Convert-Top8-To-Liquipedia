import React, { useState } from "react";

const FetchDataButton = ({ endpoint, onData }) => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleFetch = async () => {
		if (!endpoint) {
			setError("Please provide an endpoint.");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`/api/data?endpoint=${encodeURIComponent(endpoint)}`);
			if (!response.ok) {
				throw new Error(`Error ${response.status}: ${await response.text()}`);
			}
			const result = await response.json();
			onData(result);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<button onClick={handleFetch} disabled={loading}>
				{loading ? "Loading..." : "Fetch Data"}
			</button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
};

export default FetchDataButton;
