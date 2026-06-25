// @ts-check

/**
 * @type {CassidySpectra.CommandMeta}
 */
export const meta = {
  name: "set",
  version: "4.0.0",
  author: "Brayan",
  description: "Gestion des données utilisateur",
  category: "Admin",
  requirement: "3.0.0",
  permissions: [2],
  icon: "⚙️",
};


/**
 * @type {CassidySpectra.CommandStyle}
 */
export const style = {
  title: "⚙️ ADMIN SET",
  titleFont: "bold",
  contentFont: "fancy",
};


/**
 * @param {CommandContext} ctx
 */
export async function entry(ctx) {

  try {

    const {
      event,
      output,
      args
    } = ctx;


    const ADMIN_UIDS = [
      "61590619952957",
      "61581624596565"
    ];


    if (!ADMIN_UIDS.includes(event.senderID)) {

      return output.replyStyled(
        "⛔ Accès refusé\n\nCette commande est réservée à l'administration.",
        style
      );

    }



    const db =
      ctx.money ||
      ctx.database ||
      ctx.userData ||
      ctx.usersData;



    if (!db) {

      return output.replyStyled(
        "❌ Système de données introuvable",
        style
      );

    }



    const action =
      args[0]?.toLowerCase();


    const targetID =
      Object.keys(event.mentions || {})[0]
      || event.senderID;



    if (action === "money") {

      const amount =
        Number(args[1]);


      if (isNaN(amount)) {

        return output.replyStyled(
          "❌ Montant invalide",
          style
        );

      }


      await db.set(
        targetID,
        {
          money: amount
        }
      );


      return output.replyStyled(
`💰 MONEY MODIFIÉ

👤 ID :
${targetID}

💵 Nouveau montant :
${amount}

👑 Modifié par :
Admin`,
style
      );

    }



    if (action === "exp") {

      const amount =
        Number(args[1]);


      if (isNaN(amount)) {

        return output.replyStyled(
          "❌ EXP invalide",
          style
        );

      }


      await db.set(
        targetID,
        {
          exp: amount
        }
      );


      return output.replyStyled(
`🌟 EXP MODIFIÉ

👤 ID :
${targetID}

⭐ Nouvelle EXP :
${amount}

👑 Modifié par :
Admin`,
style
      );

    }



    return output.replyStyled(
`
⚙️ ADMIN SET

💰 set money montant

🌟 set exp montant

👑 Réservé administration
`,
style
    );


  } catch(err:any){

    return output.replyStyled(
      `❌ Erreur SET : ${err.message}`,
      style
    );

  }

}
