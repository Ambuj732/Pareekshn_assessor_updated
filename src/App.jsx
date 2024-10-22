import { Outlet } from "react-router";
import Login from "./components/Hackathon/Login";
import CompletedHackathon from "./components/Hackathon/CompletedHackathon";

function App() {
  return (
    <div className="font-custom">
      <Outlet />
      {/* <CompletedHackathon /> */}
    </div>
  );
}

export default App;
