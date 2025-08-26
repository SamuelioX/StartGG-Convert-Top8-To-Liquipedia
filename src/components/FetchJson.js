import React, { useState } from "react";
import EndpointInput from "./EndpointInput";
import FetchDataButton from "./FetchDataButton";

const FetchJson = () => {
	const [endpoint, setEndpoint] = useState("");
	const [data, setData] = useState(null);

	return (
		<div>
			<h2>Fetch JSON Data</h2>
			<EndpointInput endpoint={endpoint} setEndpoint={setEndpoint} />
			<FetchDataButton endpoint={endpoint} onData={setData} />
			{data && (
				<pre style={{ textAlign: "left", background: "#f5f5f5", padding: "10px" }}>
					{JSON.stringify(data, null, 2)}
				</pre>
			)}
		</div>
	);
};

export default FetchJson;
