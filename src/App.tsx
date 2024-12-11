import "./styles/base.scss";
import "./styles/sections.scss";
import MainSection from "./components/MainSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div>
			<MainSection />
			<ToastContainer
				toastStyle={{ backgroundColor: "#242320", color: "#fff" }}
				position="bottom-right"
				autoClose={3000}
			/>
		</div>
	);
}

export default App;
