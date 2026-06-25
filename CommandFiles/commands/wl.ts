// @ts-check

const whitelist = new Set();


/**
 * @type {CassidySpectra.CommandMeta}
 */
export const meta = {
  name: "wl",
  otherNames: ["whitelist"],
  version: "1.0.0",
  author: "Brayan",
  description: "Gestion whitelist utilisateurs",
  category: "Admin",
  requirement: "3.0.0",
  permissions: [2],
  icon: "📋",
};


/**
 * @type {CassidySpectra.CommandStyle}
 */
export const style = {
  title: "📋 WHITELIST",
  titleFont: "bold",
  contentFont: "fancy",
};



/**
 * @param {CommandContext} ctx
 */
export async function entry({
  event,
  output,
  args
}) {


  const action =
    args[0]?.toLowerCase();



  if (!action || action === "help") {

    return output.replyStyled(
`
📋 WHITELIST

👤 wl user add UID
👤 wl user remove UID
👤 wl user list

📊 wl status

⚙️ wl on
⚙️ wl off
`,
style
    );

  }



  if (action === "status") {

    return output.replyStyled(
`
📊 WHITELIST STATUS

👤 Users :
${whitelist.size}

🟢 Système :
Actif
`,
style
    );

  }



  if (action === "on") {

    return output.replyStyled(
"✅ Whitelist activée",
style
    );

  }



  if (action === "off") {

    return output.replyStyled(
"❌ Whitelist désactivée",
style
    );

  }



  if (args[0] === "user") {


    const type =
      args[1];


    const id =
      args[2] || event.senderID;



    if (type === "add") {

      whitelist.add(id);

      return output.replyStyled(
`
✅ Utilisateur ajouté

🆔 ${id}
`,
style
      );

    }



    if (type === "remove") {

      whitelist.delete(id);

      return output.replyStyled(
`
🗑️ Utilisateur retiré

🆔 ${id}
`,
style
      );

    }



    if (type === "list") {

      return output.replyStyled(
`
📋 LISTE WHITELIST

${[...whitelist].join("\n") || "Vide"}
`,
style
      );

    }

  }



  return output.replyStyled(
"❌ Commande inconnue. Utilise wl help",
style
  );

}
