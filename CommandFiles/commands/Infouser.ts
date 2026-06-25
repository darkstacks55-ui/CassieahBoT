// @ts-check

/**
 * @type {CassidySpectra.CommandMeta}
 */
export const meta = {
  name: "infouser",
  otherNames: ["userinfo", "ui", "user"],
  version: "7.0.0",
  author: "Brayan",
  description: "Informations utilisateur avancées",
  category: "Information",
  requirement: "3.0.0",
  noPrefix: false,
  icon: "👤",
};


/**
 * @param {CommandContext} ctx
 */
export async function entry({
  event,
  output,
  api,
  args
}) {

  try {

    const start = Date.now();

    let uid = event.senderID;

    if (args[0]) {
      uid = args[0].replace(/\D/g, "");
    }


    const user = await api.getUserInfo(uid);

    const ping = Date.now() - start;


    if (!user) {
      return output.reply(
        "❌ Utilisateur introuvable"
      );
    }


    const date =
      new Date()
      .toLocaleString("fr-FR");


    return output.reply(
`╭━━━〔 👤 INFO USER 〕━━━╮

📛 Nom
➥ ${user.name || "N/A"}

🆔 ID
➥ ${uid}

🔗 Profil
➥ ${user.profileUrl || "N/A"}


📊 COMPTE
━━━━━━━━━━━━

🌐 Plateforme
➥ Facebook

📌 Type
➥ Compte utilisateur

🟢 Statut
➥ Actif

🔐 Accès
➥ Normal


🤖 BOT SYSTEM
━━━━━━━━━━━━

⚙️ Système
➥ CassidySpectra

📡 Connexion
➥ Stable

⚡ Réponse
➥ ${ping} ms

🛠️ Commande
➥ infouser


⏰ ANALYSE
━━━━━━━━━━━━

📅 Date
➥ ${date}

╰━━━━━━━━━━━━━━━━╯`
    );


  } catch (err:any) {

    return output.reply(
      `❌ Erreur Infouser : ${err.message}`
    );

  }

}
