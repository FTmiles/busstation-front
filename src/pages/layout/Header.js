import Navbar from "./Navbar.js";
import SelectComp from "./SelectComp.js";
import { useState } from "react";

function Header() {
  const [hello, setHello] = useState("from there");

  const handleMe = () => setHello({value:1, label:"anyksciai or"});

function handleBusFlip(){
  const element = document.querySelector('.swap-dep-dest div');
  element.classList.toggle('flipped'); // Toggle the 'flipped' class
}


  return (
    <div className="" style={{ background: "lightsalmon" }}>
      <div>
        <SelectComp className="d-inline-block select-station" defaultEnabled={true} hello={hello} />
          <div role="button" className="d-inline-block swap-dep-dest rounded-3 flip-animation" aria-label="Swap departure and destination"
          onClick={handleBusFlip}><div>🚍</div></div>
        <SelectComp className="d-inline-block select-station" defaultEnabled={false} hello={hello} />
      </div>
      <Navbar />
    </div>
  );
}

export default Header;
