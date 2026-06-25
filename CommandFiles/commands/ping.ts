/**
 * @type {CassidySpectra.CommandMeta}
 */
export const meta = {
  name: "ping",
  version: "1.0.0",
  author: "Brayan",
  description: "Check bot latency",
  category: "Utilities",
  permissions: [0],
  noPrefix: false,
  waitingTime: 1,
  requirement: "3.0.0",
  icon: "🏓"
};

/**
 * @type {CassidySpectra.CommandStyle}
 */
export const style = {
  title: "🏓 Pong",
  titleFont: "bold",
  contentFont: "fancy"
};

/**
 * @param {CommandContext} ctx
 */
export async function entry({ output }) {
  const start = Date.now();

  const sent = await output.reply("🏓 Calcul du ping...");

  const ping = Date.now() - start;

  return output.replyStyled(
    `⚡ Latence : ${ping} ms\n🤖 Statut : En ligne\n🟢 Serveur : Stable`,
    style
  );
}
