import JsonInput from "./JsonInput";
import JsonToLiquipedia from "./JsonToLiquipedia";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const ConvertJson = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [jsonInput, setJsonInput] = useState("");

	return (
		<div>
			<JsonInput jsonInput={jsonInput} setJsonInput={setJsonInput} />
			<JsonToLiquipedia jsonInput={jsonInput} />
		</div>
	);
};

export default ConvertJson;
