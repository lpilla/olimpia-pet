import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <h1 className="text-3xl font-bold underline">App</h1>
      <h1>Welcome, giorgio!</h1>
    </>
  );
}
export default App;
