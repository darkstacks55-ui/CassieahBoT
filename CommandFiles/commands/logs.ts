// @ts-check

import fs from "fs";
import path from "path";


const filePath = path.join(
  process.cwd(),
  "logs.json"
);



function loadLogs() {

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  return JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

}



function saveLogs(data:any) {

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  );

}



/**
 * @type {CassidySpectra.CommandMeta}
 */
export const meta = {

  name: "logs",
  version: "2.2.0",
  author: "Brayan",
  description: "Gestion des logs du bot",
  category: "Admin",
  icon: "📜",
  permissions: [2]

};



export const style = {

  title: "📜 BOT LOGS",
  titleFont: "bold",
  contentFont: "fancy"

};



/**
 * @param {CommandContext} ctx
 */
export async function entry({

  event,
  output,
  args,
  api

}) {



const ADMINS = [
  "61590619952957",
  "61581624596565"
];



if (!ADMINS.includes(event.senderID)) {

return output.replyStyled(
"⛔ Seuls les administrateurs peuvent utiliser cette commande",
style
);

}



let logs = loadLogs();

const action =
args[0]?.toLowerCase();





if(action === "add") {



let name = "Utilisateur inconnu";



try {


const userInfo =
await api.getUserInfo(
event.senderID
);


name =
userInfo?.[event.senderID]?.name
|| event.senderID;


} catch(e) {


name = event.senderID;


}





logs.push({

user:name,

id:event.senderID,

message:
args.slice(1).join(" ")
|| "Aucun message",

date:
new Date().toLocaleString()

});



saveLogs(logs);



return output.replyStyled(

"✅ Log enregistré",

style

);

}





if(action === "clear") {


saveLogs([]);


return output.replyStyled(

"🗑️ Tous les logs supprimés",

style

);

}





if(!logs.length) {


return output.replyStyled(

"📜 Aucun log disponible",

style

);

}





let msg = `

📜 LOGS DU BOT

━━━━━━━━━━━━━━━

`;



logs.slice(-15).forEach((log:any,index:number)=>{


msg += `

${index+1} ┊ 👤 ${log.user}

🆔 ${log.id}

📝 ${log.message}

🕒 ${log.date}

━━━━━━━━━━━━━━━

`;

});



return output.replyStyled(
msg,
style
);


}
