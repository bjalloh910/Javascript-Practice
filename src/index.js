import odinImage from "./odin.png";
import "./styles.css";
import { greeting } from "./greeting.js";

console.log(greeting);

const image = document.createElement("img");
image.src = odinImage;
   
document.body.appendChild(image);


// index.js imports from and depends on greeting.js