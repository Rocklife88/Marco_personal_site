// The WordPress export tagged posts with an inconsistent mix of place slugs
// and generic labels (the same "blogdiviaggio" tag, for instance, was used
// for both a Val d'Orcia post and a Firenze post). A per-slug map is the
// only way to get every post in the right, specific bucket instead of a
// vague catch-all like "Nord".
const CATEGORY_BY_SLUG: Record<string, string> = {
  // Dolomiti
  'lalpe-di-siusi-un-paradiso-per-tutti': 'Dolomiti',
  'una-volta-e-per-sempre-il-respiro-profondo-delle-dolomiti': 'Dolomiti',
  'una-sera-destate-a-san-martino-di-castrozza': 'Dolomiti',
  'alla-scoperta-della-val-di-zoldo': 'Dolomiti',

  // Laghi
  'alla-scoperta-di-garda-bardolino-e-sirmione': 'Laghi',

  // Città
  'napoli-citta-dai-mille-volti': 'Città',
  'la-magia-di-firenze-una-citta-fuori-e-dentro-il-tempo': 'Città',
  'verona-il-soffio-delladige-e-i-chicchi-di-sole-sui-tetti-al-tramonto': 'Città',
  'venezia-sospesa-sul-bordo-di-un-liquido-sogno': 'Città',
  'torino-la-corona-delle-alpi': 'Città',
  'trento-bellezza-austera-e-regal': 'Città',
  'trieste-il-respiro-del-mare': 'Città',

  // Toscana
  'le-meraviglie-di-casa-mia-vi-presento-lucca': 'Toscana',
  'val-dorcia-toscana-emozionante': 'Toscana',
  'gli-affascinanti-borghi-della-toscana': 'Toscana',
  'a-spasso-in-valdinievole-una-meraviglia-celata-in-bella-vista': 'Toscana',
  'il-lungomare-di-livorno': 'Toscana',
  'passeggiare-nei-boschi-delle-alpi-apuane-in-autunno': 'Toscana',
  'tramonto-in-riva-al-mare-in-toscana': 'Toscana',
  'labbazia-di-san-galgano-tra-storia-e-leggenda': 'Toscana',
  'il-cammino-della-fiaba-trekking-tra-pescia-e-collodi-nel-cuore-della-toscana': 'Toscana',

  // Mare & Isole
  'la-poesia-del-mare-isola-delba-dautunno-tra-ricordi-ed-emozioni': 'Mare & Isole',

  // Montagna
  'le-ombre-silenziose-dellappennino-sbucciato-dallultimo-sole': 'Montagna',
  'due-passi-in-lessinia': 'Montagna',

  // Riflessioni: no single place, more a mood or a moment
  'viaggi-e-emozioni-in-italia': 'Riflessioni',
  'silenzio-ditalia': 'Riflessioni',
  'larte-di-viaggiare-leggeri': 'Riflessioni',
  'una-tappa-di-viaggio-impervia-una-salita-di-nome-2020': 'Riflessioni',
  'ultimo-tramonto-del-2020-un-raggio-di-luce-sulle-cicatrici': 'Riflessioni',
  'crocicchi-dautunno-un-viaggio-fantastico-in-giro-per-liitalia': 'Riflessioni'
}

function prettify(region: string) {
  return region
    ? region
        .replace(/[-_]/g, ' ')
        .replace(/(^|\s)\S/g, (t) => t.toUpperCase())
    : 'Altro'
}

export function getCategory(post: { slug: string; region: string }): string {
  return CATEGORY_BY_SLUG[post.slug] ?? prettify(post.region)
}

export function getUniqueCategories(posts: Array<{ slug: string; region: string }>) {
  const set = new Set<string>()
  posts.forEach((p) => set.add(getCategory(p)))
  return ['Tutte', ...Array.from(set)]
}

export default {
  getCategory,
  getUniqueCategories
}
