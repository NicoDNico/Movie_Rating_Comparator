import {useState, useEffect} from 'react'

export default function Hands() {
    // this is the best code i have stolen on all of this project god bless fucking w3school.
    useEffect(()=>{
        // it takes an element as arg so i can re use it.
        dragElement(document.getElementById("handLeft"));
        dragElement(document.getElementById("handRight"));
        
        function dragElement(elmnt) {
            console.log(elmnt)
            var pos1 = 0, pos3 = 0, pos2 = 0;
            if (document.getElementById(elmnt.id + "header")) {
                // if present, the header is where you move the DIV from:
          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }
        
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = e.clientX - pos3;
            pos3 = e.clientX;
            if((elmnt.id === 'handLeft') && pos3 >= (window.innerWidth/100)*42.2){
                elmnt.style.left = ((window.innerWidth/100)*42.2) + "px"; // Abracadabra. Magic number 42.2 works most of the time to make both hands get close to eachother.
                // sadly i cant find a way to make it so no mater the width they are almos always touching but this works well enough.
                // tried changing the style from left to right and shit like that. still didnt work
            }
            if((elmnt.id === 'handRight') && pos3 <= (window.innerWidth/100)*49){
                elmnt.style.left = ((window.innerWidth/100)*49) + "px";
            }
            // set the element's new position:
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        }
        
        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
},[])
    
    return (
        <div  className="flex h-52 align-middle justify-center relative z-10 gap-100 ">
        <img src='handLeft.png' alt='Left Hand' id='handLeft' className=' hover:translate-x-[-20px] transition rotate-[2deg] fixed right-[50.5%]'></img>
        <img src='handRight.png' alt='Right Hand' id='handRight' className='hover:translate-x-[20px] transition rotate-[-2deg] fixed left-[49%] '></img>
    </div>
  );
}
