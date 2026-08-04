// @ts-check

/**
 * @type {CassidySpectra.CommandMeta}
 */
export const meta = {
  name: "fetch",
  otherNames: ["read", "scrape", "link"],
  version: "1.2.0",
  author: "Brayan",
  description: "Analyse un lien, résume son contenu en français, détermine son objectif, son importance et sa fiabilité",
  category: "Outils",
  permissions: [0],
  icon: "🔗"
};

/**
 * @type {CassidySpectra.CommandStyle}
 */
export const style = {
  title: "🔗 ❲ ANALYSEUR DE LIEN INTELLIGENT ❳ 🔗",
  titleFont: "bold",
  contentFont: "fancy"
};

export async function entry({
  args,
  output
}) {
  let rawUrl = args[0];

  if (!rawUrl) {
    return output.replyStyled(`
❌ ❲ LIEN MANQUANT ❳
Tu dois fournir une URL à analyser.
Exemple : &fetch google.com
`, style);
  }

  let url = rawUrl;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  try {
    new URL(url);
  } catch (e) {
    return output.replyStyled("❌ URL invalide.", style);
  }

  try {
    let response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) CassidySpectraBot"
      }
    });

    if (!response.ok) {
      return output.replyStyled(`❌ Erreur HTTP : ${response.status} (${response.statusText})`, style);
    }

    let html = await response.text();

    let titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    let pageTitle = titleMatch ? titleMatch[1].trim() : "Sans titre";

    let cleanText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (cleanText.length > 600) {
      cleanText = cleanText.substring(0, 600) + "...";
    }

    if (!cleanText) {
      cleanText = "Aucun contenu textuel exploitable trouvé.";
    }

    // Évaluation automatique de la fiabilité basée sur le domaine et le protocole
    let parsedUrl = new URL(url);
    let isHttps = parsedUrl.protocol === "https:";
    let domain = parsedUrl.hostname;
    
    let reliability = "Élevée (Protocole sécurisé & source connue)";
    if (!isHttps) {
      reliability = "Faible (Site non sécurisé en HTTP)";
    } else if (domain.includes("temp") || domain.includes("free") || domain.includes("xyz") || domain.includes("tk")) {
      reliability = "Moyenne / Douteuse (Extension à risque potentiel)";
    }

    // Détermination de l'objectif et de l'importance
    let objective = "Fournir des informations ou du contenu multimédia aux visiteurs.";
    let importance = "Variable selon le besoin de l'utilisateur.";
    
    if (domain.includes("github") || domain.includes("stackoverflow") || domain.includes("docs")) {
      objective = "Partage de code, documentation technique ou entraide de développeurs.";
      importance = "Haute pour le développement et la technique.";
    } else if (domain.includes("news") || domain.includes("bbc") || domain.includes("lemonde")) {
      objective = "Diffusion d'actualités et d'information journalistique.";
      importance = "Moyenne à Haute selon l'actualité.";
    } else if (domain.includes("youtube") || domain.includes("twitch")) {
      objective = "Divertissement et streaming vidéo.";
      importance = "Divertissement / Loisir.";
    }

    return output.replyStyled(`
🌐 ❲ RAPPORT D'ANALYSE DU LIEN ❳
━━━━━━━━━━━━━━━
📌 **Titre :** ${pageTitle}
🔗 **Domaine :** ${domain}

🇫🇷 **Résumé (Français) :**
${cleanText}

🎯 **Objectif du lien :**
${objective}

⭐ **Importance :**
${importance}

🛡️ **Fiabilité :**
${reliability}
━━━━━━━━━━━━━━━
`, style);

  } catch (err) {
    return output.replyStyled(`❌ Échec de la récupération du lien : ${err.message}`, style);
  }
  }
