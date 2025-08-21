import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
	<React.StrictMode>
		<AppRouter />
	</React.StrictMode>
);
