import Navbar from "./Navbar.js";
import SelectComp from "./SelectComp.js";
import { useState } from "react";

function Header() {
  const [hello, setHello] = useState("from there");

  const handleMe = () => setHello({value:1, label:"anyksciai or"});

  return (
    <div className="" style={{ background: "lightsalmon" }}>
      <p className="display-1">🚍 Anyksciai Bus Station</p>

      <div>
        <SelectComp className="d-inline-block" defaultEnabled={true} hello={hello} />
        <button className="d-inline-block" onClick={handleMe}>Reverse</button>
        <SelectComp className="d-inline-block" defaultEnabled={false} hello={hello} />
      </div>
      <Navbar />
    </div>
  );
}

export default Header;
