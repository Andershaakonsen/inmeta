import { useEffect, useState } from "react";
import { Button } from "./components";
import { ofetch } from "ofetch";

const App = () => {
  const [helloMessage, setHelloMessage] = useState("");

  useEffect(() => {
    ofetch("/api/HelloWorld").then((res) => setHelloMessage(res.message));
  }, []);

  return (
    <div>
      <Button>Im a button</Button>
      <br />
      <code>{helloMessage}</code>
    </div>
  );
};

export default App;
