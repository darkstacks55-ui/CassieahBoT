import axios from "axios";
import { StrictOutputForm } from "output-cassidy";


const cmd = easyCMD({

  name: "gpt",

  meta: {

    otherNames: [
      "ai",
      "ask",
      "bot"
    ],

    author: "CRIMSON 🖇️🩵🪽",

    description:
    "Cassidy AI Assistant",

    icon:"🤖",

    version:"3.1.0",

    noPrefix:"both"

  },


  category:"AI",


  title:{
    content:"CASSIDY AI 🤖",
    text_font:"bold",
    line_bottom:"default"
  },


  run(ctx){
    return main(ctx);
  }

});



async function main({

 output,

 args,

 input,

}:CommandContext){



 let ask =
 args.join(" ");



 if(!ask){

  return output.reply(
`
╭━━━━━━〔 🤖 CASSIDY AI 〕━━━━━━╮

❌ Message requis

╰━━━━━━━━━━━━━━━━━━━━╯
`
  );

 }



 try {



 const res = await axios.post(

 "https://shizuai.vercel.app/chat",

 {

  uid:
  input.sid,

  message:
  ask,

  image_url:
  null

 }

 );



 const data =
 res.data;



 const form:StrictOutputForm = {


 body:

`
╭━━━〔 🤖 CASSIDY AI 〕━━━╮

💬 ${data.reply || "Pas de réponse"}

━━━━━━━━━━━━━━━

🔁 Réponds à ce message
pour continuer

╰━━━━━━━━━━━━━━━━╯
`

 };



 const info =
 await output.reply(form);



 info.atReply((rep)=>{


  main({

   ...rep,

   args:
   rep.input.words

  });


 });



 }catch(e){


 return output.reply(

`
╭━━━〔 🤖 CASSIDY AI 〕━━━╮

❌ Erreur :

${e.message}

╰━━━━━━━━━━━━━━━━╯
`

 );


 }


}



export default cmd;
