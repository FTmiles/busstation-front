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
          {/* <div role="button" className="d-inline-block swap-dep-dest rounded-3" aria-label="Swap departure and destination"><svg viewBox="0 0 200 200" width="1.25em" height="1.25em" xmlns="http://www.w3.org/2000/svg" class="c-P_--icon c-P_--mod-responsive" role="img"><path d="M71.465 101.465a4.998 4.998 0 0 1 7.07 0a4.998 4.998 0 0 1 0 7.07L57.071 130H155a5 5 0 1 1 0 10H57.071l21.464 21.465a4.998 4.998 0 0 1 0 7.07a4.998 4.998 0 0 1-7.07 0l-30-30a4.998 4.998 0 0 1 0-7.07l30-30zm87.071-32.929a5 5 0 0 0 0-7.071l-30-30a5.001 5.001 0 0 0-7.071 7.071L142.929 60H45a5 5 0 1 0 0 10h97.929l-21.464 21.464a5 5 0 1 0 7.071 7.071l30-29.999z"></path></svg></div> */}
          <div role="button" className="d-inline-block swap-dep-dest rounded-3 flip-animation" aria-label="Swap departure and destination"
          onClick={handleBusFlip}><div>🚍</div></div>
        <SelectComp className="d-inline-block select-station" defaultEnabled={false} hello={hello} />
      </div>
      <Navbar />
    </div>
  );
}

export default Header;
