import { Typography } from "antd";
import Chatbot from "./components/Chatbot/Chatbot";
import { CounterContextProvider } from "./Context/context";
const { Title } = Typography;
function App() {
  return (
    <CounterContextProvider>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Title level={2}>CHAT BOT APP&nbsp;</Title>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
         <Chatbot/>
        </div>
      </div>
    </CounterContextProvider>
  );
}

export default App;
