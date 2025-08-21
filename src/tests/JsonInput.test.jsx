/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JsonInput from "../components/JsonInput";
import "@testing-library/jest-dom";

describe("JsonInput", () => {
	let jsonInput = "";
	let setJsonInput;

	beforeEach(() => {
		setJsonInput = jest.fn((val) => (jsonInput = val));
	});

	it("renders heading and textarea", () => {
		render(<JsonInput jsonInput={jsonInput} setJsonInput={setJsonInput} />);
		expect(screen.getByText("JSON Input")).toBeInTheDocument();

		const textarea = screen.getByPlaceholderText("Paste your JSON here...");
		expect(textarea).toBeInTheDocument();
		expect(textarea.value).toBe("");
	});

	it("displays the value passed as prop", () => {
		jsonInput = '{"key": "value"}';
		render(<JsonInput jsonInput={jsonInput} setJsonInput={setJsonInput} />);
		const textarea = screen.getByPlaceholderText("Paste your JSON here...");
		expect(textarea.value).toBe('{"key": "value"}');
	});

	it("calls setJsonInput on change", () => {
		render(<JsonInput jsonInput={jsonInput} setJsonInput={setJsonInput} />);
		const textarea = screen.getByPlaceholderText("Paste your JSON here...");

		fireEvent.change(textarea, { target: { value: '{"name":"test"}' } });
		expect(setJsonInput).toHaveBeenCalledWith('{"name":"test"}');
	});

	it("has correct number of rows", () => {
		render(<JsonInput jsonInput={jsonInput} setJsonInput={setJsonInput} />);
		const textarea = screen.getByPlaceholderText("Paste your JSON here...");
		expect(textarea).toHaveAttribute("rows", "10");
	});
});
