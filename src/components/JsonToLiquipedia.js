import React, { useState, useRef, useEffect } from "react";

const JsonToLiquipedia = ({ jsonInput }) => {
	const [output, setOutput] = useState("");
	const [copied, setCopied] = useState(false);
	const outputRef = useRef(null);
	const cleanPlayerName = (name) => {
		// Remove team tags often separated by "|", "-", or "–"
		// Keep only the last part, which is usually the actual gamertag
		if (!name) return name;
		return name
			.split(/[\|\-–]/)
			.pop()
			.trim();
	};

	const convertToLiquipediaFormat = (json) => {
		try {
			const nodes = json.data.event.standings.nodes;

			// Limit to top 8 placements only
			const top8 = nodes.filter((n) => n.placement <= 8);

			// Group entrants by placement
			const grouped = {};
			top8.forEach(({ placement, entrant }) => {
				if (!grouped[placement]) grouped[placement] = [];
				grouped[placement].push(cleanPlayerName(entrant.name));
			});

			const placements = Object.keys(grouped)
				.map(Number)
				.sort((a, b) => a - b);

			let result = "==Prize Pool== \n{{prize pool start}}\n";

			placements.forEach((place) => {
				const entrants = grouped[place];
				if (entrants.length === 1) {
					result += `{{prize pool slot|place=${place}|usdprize=|pcnt=\n`;
					result += `|${entrants[0]}|flag1= |heads1= |team1=\n}}\n`;
				} else {
					// e.g., 5 -> two players -> 5-6
					const rangeEnd = place + entrants.length - 1;
					result += `{{prize pool slot|place=${place}-${rangeEnd}|usdprize=|pcnt=\n`;
					entrants.forEach((name, idx) => {
						result += `|${name}|flag${idx + 1}= |heads${idx + 1}= |team${idx + 1}=\n`;
					});
					result += "}}\n";
				}
			});

			result += "{{prize pool end}}";
			return result;
		} catch {
			return "Invalid JSON structure!";
		}
	};

	const handleConvert = () => {
		try {
			const parsed = JSON.parse(jsonInput);
			setOutput(convertToLiquipediaFormat(parsed));
		} catch (e) {
			setOutput("❌ Error: Please enter valid JSON");
		}
	};
	// Auto-resize the textarea height to fit content
	const autoResize = () => {
		const el = outputRef.current;
		if (!el) return;
		el.style.height = "auto"; // reset first
		el.style.height = `${el.scrollHeight}px`; // then fit content
	};

	useEffect(() => {
		autoResize();
	}, [output]);
	const copyToClipboard = async () => {
		try {
			// Prefer modern API
			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(output);
			} else {
				// Fallback
				const el = outputRef.current;
				el.select();
				document.execCommand("copy");
			}
			setCopied(true);
			setTimeout(() => setCopied(false), 1200);
		} catch {
			// noop or show error UI if desired
		}
	};
	return (
		<div className="converter mt-4">
			<button onClick={handleConvert} className="mt-2 px-4 py-2 bg-blue-600 text-black rounded-lg">
				Convert
			</button>
			<button
				onClick={copyToClipboard}
				disabled={!output}
				className="px-3 py-2 bg-gray-700 text-black rounded-lg disabled:opacity-50"
			>
				{copied ? "Copied!" : "Copy"}
			</button>
			<h3 className="mt-4 font-bold">Output:</h3>
			<textarea ref={outputRef} readOnly value={output} className="output-textarea" />
		</div>
	);
};

export default JsonToLiquipedia;
