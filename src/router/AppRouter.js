import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import JsonInput from "../components/ConvertJson";
const AppRouter = () => {
	return (
		<BrowserRouter>
			<div>
				<Header />
				<div className="main-content">
					<Routes>
						<Route path="/convert" element={<JsonInput />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default AppRouter;
