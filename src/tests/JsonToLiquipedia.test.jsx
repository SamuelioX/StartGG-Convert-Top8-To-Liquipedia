/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JsonToLiquipedia from "../components/JsonToLiquipedia";
import "@testing-library/jest-dom";

// Sample valid JSON with top 8 placements
const validJson = JSON.stringify({
	data: {
		event: {
			standings: {
				nodes: [
					{ placement: 1, entrant: { name: "Player1" } },
					{ placement: 2, entrant: { name: "Player2" } },
					{ placement: 3, entrant: { name: "Player3" } },
					{ placement: 4, entrant: { name: "Player4" } },
					{ placement: 5, entrant: { name: "Player5" } },
					{ placement: 5, entrant: { name: "Player6" } },
					{ placement: 7, entrant: { name: "Player7" } },
					{ placement: 7, entrant: { name: "Player8" } },
				],
			},
		},
	},
});

describe("JsonToLiquipedia", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders convert and copy buttons", () => {
		render(<JsonToLiquipedia jsonInput={validJson} />);
		expect(screen.getByText("Convert")).toBeInTheDocument();
		expect(screen.getByText("Copy")).toBeInTheDocument();
	});

	it("shows error when invalid JSON is provided", () => {
		render(<JsonToLiquipedia jsonInput="{ invalid json }" />);
		fireEvent.click(screen.getByText("Convert"));
		expect(screen.getByDisplayValue(/❌ Error/)).toBeInTheDocument();
	});

	it("converts valid JSON to Liquipedia format", () => {
		render(<JsonToLiquipedia jsonInput={validJson} />);
		fireEvent.click(screen.getByText("Convert"));
		const output = screen.getByRole("textbox");
		expect(output.value).toContain("==Prize Pool==");
		expect(output.value).toContain("Player1");
		expect(output.value).toContain("Player8");
	});

	it("only includes placements up to top 8", () => {
		const tooMany = JSON.stringify({
			data: {
				event: {
					standings: {
						nodes: [
							...JSON.parse(validJson).data.event.standings.nodes,
							{ placement: 9, entrant: { name: "Player9" } },
						],
					},
				},
			},
		});

		render(<JsonToLiquipedia jsonInput={tooMany} />);
		fireEvent.click(screen.getByText("Convert"));
		const output = screen.getByRole("textbox");
		expect(output.value).toContain("Player1");
		expect(output.value).not.toContain("Player9");
	});

	it("copies output to clipboard", async () => {
		const writeText = jest.fn();
		navigator.clipboard = { writeText };

		render(<JsonToLiquipedia jsonInput={validJson} />);
		fireEvent.click(screen.getByText("Convert"));
		fireEvent.click(screen.getByText("Copy"));

		await waitFor(() => {
			expect(writeText).toHaveBeenCalled();
			expect(screen.getByText("Copied!")).toBeInTheDocument();
		});
	});

	it("falls back to execCommand when clipboard API unavailable", () => {
		const selectMock = jest.fn();
		document.execCommand = jest.fn();
		navigator.clipboard = undefined;

		render(<JsonToLiquipedia jsonInput={validJson} />);
		fireEvent.click(screen.getByText("Convert"));

		const output = screen.getByRole("textbox");
		output.select = selectMock;

		fireEvent.click(screen.getByText("Copy"));

		expect(selectMock).toHaveBeenCalled();
		expect(document.execCommand).toHaveBeenCalledWith("copy");
	});
});
