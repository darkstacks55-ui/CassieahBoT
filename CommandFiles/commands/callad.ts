√system install callad.ts // @ts-check

/**
 * @type {CassidySpectra.CommandMeta}
 */
export const meta = {
  name: "callad",
  version: "2.0.0",
  author: "Brayan",
  description: "Envoyer un message aux admins",
  category: "Utilities",
  requirement: "3.0.0",
  noPrefix: false,
  icon: "📨",
};


/**
 * @type {CassidySpectra.CommandStyle}
 */
export const style = {
  title: "📨 CALL ADMIN",
  titleFont: "bold",
  contentFont: "fancy",
};


/**
 * @param {CommandContext} ctx
 */
export async function entry({
  event,
  output,
  api,
  args,
  input
}) {


  const config =
    global.GoatBot?.config;


  if (!args[0]) {
    return output.replyStyled(
      "❌ Écris un message à envoyer aux admins.",
      style
    );
  }


  if (!config?.adminBot?.length) {

    return output.replyStyled(
      "❌ Aucun admin configuré.",
      style
    );

  }



  const msg =
`
📨 CALL ADMIN

👤 User ID :
${event.senderID}

💬 Message :

${args.join(" ")}

━━━━━━━━━━━━
Répondre à ce message pour contacter l'utilisateur.
`;



  const sent = [];

  for (const admin of config.adminBot) {

    try {

      const send =
        await api.sendMessage(
          msg,
          admin
        );


      sent.push(admin);


      input.setReply(
        send.messageID,
        {
          type: "calladmin",
          author: event.senderID,
          messageID: event.messageID
        }
      );


    } catch(e){}

  }



  return output.replyStyled(
`
✅ Message envoyé aux admins

👑 Admins contactés :
${sent.length}
`,
style
  );

}



/**
 * Réponse des admins
 */
export async function onReply({
  event,
  output,
  api,
  Reply
}) {


  if (Reply.type !== "calladmin")
    return;


  await api.sendMessage(
`
👑 Réponse admin :

${event.body}
`,
Reply.author
);


  return output.replyStyled(
    "✅ Réponse envoyée à l'utilisateur.",
    style
  );

}
