// CareerPulse — vérification d'un SIRET dans l'annuaire officiel des entreprises (API Recherche d'entreprises).
// Fonction Vercel : sert de relais si le navigateur ne peut pas joindre l'API directement.
// Aucune donnée n'est enregistrée ici.
module.exports = async function (req, res) {
  const q = String((req.query && req.query.q) || '').replace(/\D/g, '');
  if (!/^\d{14}$/.test(q)) { res.status(400).json({ error: 'SIRET invalide' }); return; }
  try {
    const r = await fetch('https://recherche-entreprises.api.gouv.fr/search?q=' + q + '&page=1&per_page=1', { headers: { Accept: 'application/json' } });
    const j = await r.json();
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
    res.status(r.status).json(j);
  } catch (e) {
    res.status(502).json({ error: 'Annuaire indisponible' });
  }
};
