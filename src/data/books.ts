export interface LinkStore {
  ibs: string
  amazon: string
  mondadori: string
  feltrinelli: string
}

export interface Book {
  slug: string
  titolo: string
  anno: number
  editore: string
  tipo: 'romanzo' | 'memoir'
  esordio: boolean
  copertina: string
  sinossi: string
  linkStore: LinkStore
}

const books: Book[] = [
  {
    slug: '17-17',
    titolo: '17:17',
    anno: 2020,
    editore: 'Argento Vivo Edizioni',
    tipo: 'romanzo',
    esordio: true,
    copertina: '/assets/images/covers/17-17.webp',
    sinossi:
      'Lorenzo e Giulia si scontrano sul ponte di un traghetto in tempesta, di ritorno dall\'Elba. Senza saperlo, hanno qualcosa di importante in comune: stanno entrambi cercando di rimettere insieme i pezzi di una vita interrotta dalla fine di una relazione che li ha segnati. Da quell\'incontro folgorante nasce un romanzo a doppio punto di vista, scandito da un countdown che rincorre l\'orario del titolo, capitolo dopo capitolo, fino al finale circolare a Piazza dei Miracoli, alle 17:17 esatte.',
    linkStore: {
      ibs: 'https://www.ibs.it/1717-libro-marco-pellegrini/e/9788832106626',
      amazon: 'https://www.amazon.it/17-Marco-Pellegrini/dp/8832106620',
      mondadori: '',
      feltrinelli: ''
    }
  },
  {
    slug: 'quello-che-resta',
    titolo: 'Quello che resta',
    anno: 2021,
    editore: 'Porto Seguro Editore',
    tipo: 'romanzo',
    esordio: false,
    copertina: '/assets/images/covers/quello-che-resta.webp',
    sinossi:
      'Sulle colline di Montecarlo, vicino Lucca, Gaia cresce all\'ombra dell\'azienda vinicola e olearia di famiglia, mentre a poco più di vent\'anni sogna altro. L\'incontro con Giulio, un giovane arrivato da fuori, e una tragedia che le cambia per sempre la vita, la costringono a fare i conti con le proprie radici. Un romanzo su ciò che si perde e ciò che, nonostante tutto, resta — fino a un epilogo che salta una generazione, verso Flora e il futuro che i genitori le hanno lasciato in eredità.',
    linkStore: {
      ibs: '',
      amazon: 'https://www.amazon.it/Quello-che-resta-Marco-Pellegrini/dp/8855463233',
      mondadori: '',
      feltrinelli: ''
    }
  },
  {
    slug: 'emozioni-ditalia',
    titolo: 'Emozioni d\'Italia',
    anno: 2022,
    editore: 'Porto Seguro Editore',
    tipo: 'memoir',
    esordio: false,
    copertina: '/assets/images/covers/emozioni-ditalia.webp',
    sinossi:
      'Livorno, l\'Elba, Firenze, Bologna, Venezia, il Sud: un viaggio dell\'autore attraverso l\'Italia, regione dopo regione, raccontato mettendo da parte i campanilismi e scendendo nel dettaglio delle emozioni che ogni tappa suscita. Il memoir più apertamente autobiografico dopo gli esordi, nato dal vero trasferimento a Verona per lavoro: il disegno finale è quello di una cartina intima, una geografia dell\'anima più che dei luoghi.',
    linkStore: {
      ibs: 'https://www.ibs.it/emozioni-d-italia-libro-marco-pellegrini/e/9788855469791',
      amazon: 'https://www.amazon.it/Emozioni-dItalia-Marco-Pellegrini/dp/8855469797',
      mondadori: '',
      feltrinelli: ''
    }
  },
  {
    slug: 'in-un-giorno-qualunque',
    titolo: 'In un giorno qualunque',
    anno: 2025,
    editore: 'Argento Vivo Edizioni',
    tipo: 'romanzo',
    esordio: false,
    copertina: '/assets/images/covers/in-un-giorno-qualunque.webp',
    sinossi:
      'Alfredo, venditore software disilluso dalla propria vita aziendale, attraversa un\'esperienza di pre-morte che lo mette faccia a faccia con Johnny, la sua voce interiore più sincera e tagliente. Tra dialetto livornese autentico, satira del mondo del lavoro e un amore ritrovato con Marta, il romanzo più maturo dell\'autore: quello in cui l\'ironia, per la prima volta, convive con la resa dei conti.',
    linkStore: {
      ibs: '',
      amazon: '',
      mondadori: '',
      feltrinelli: ''
    }
  }
]

export default books
