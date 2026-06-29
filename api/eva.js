// Proxy serverless pour les appels d'EVA à l'API Anthropic.
// La clé API ne quitte JAMAIS le serveur — le navigateur du visiteur
// ne voit que cette fonction, jamais la clé elle-même.
//
// Active aussi le prompt caching sur le system prompt : comme EVA
// renvoie son system prompt à chaque message (souvent inchangé d'un
// message à l'autre), le marquer en cache_control:'ephemeral' fait
// payer ce bloc à 10% du prix normal dès la 2e fois qu'il est utilisé
// (cache de 5 minutes côté Anthropic).

export default async function handler(req, res) {
  // CORS basique (utile si jamais le front est appelé depuis un autre domaine)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée, utilise POST.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY manquante côté serveur (variable d\'environnement Vercel).' });
  }

  try {
    const { model, max_tokens, system, messages } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Le champ "messages" est requis et doit être un tableau.' });
    }

    // Transforme le system prompt (texte simple) en bloc avec cache_control,
    // pour activer le prompt caching côté Anthropic.
    let systemBlock;
    if (typeof system === 'string' && system.length > 0) {
      systemBlock = [
        { type: 'text', text: system, cache_control: { type: 'ephemeral' } }
      ];
    } else {
      systemBlock = system; // déjà au bon format, ou absent
    }

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model || 'claude-sonnet-4-20250514',
        max_tokens: max_tokens || 900,
        ...(systemBlock ? { system: systemBlock } : {}),
        messages
      })
    });

    const data = await anthropicRes.json();
    return res.status(anthropicRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Erreur proxy EVA : ' + err.message });
  }
}
