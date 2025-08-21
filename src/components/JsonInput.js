import React, { useState } from "react";

const JsonInput = ({ jsonInput, setJsonInput }) => {
	return (
		<div>
			<h2>JSON Input</h2>
			<textarea
				value={jsonInput}
				onChange={(e) => setJsonInput(e.target.value)}
				rows={10}
				className="json-textarea"
				placeholder="Paste your JSON here..."
			/>
		</div>
	);
};

export default JsonInput;
