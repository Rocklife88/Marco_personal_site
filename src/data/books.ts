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
  hideVideoSection?: boolean
}

const books: Book[] = [
  {
    slug: '17-17',
    titolo: '17:17',
    anno: 2020,
    editore: 'Argento Vivo Edizioni',
    tipo: 'romanzo',
    esordio: true,
    copertina: '/images/covers/17-17.webp',
    sinossi:
      'Lorenzo e Giulia si incontrano sul traghetto di ritorno dall\'Elba e, da quel momento, il tempo sembra avere un orario preciso: 17:17. In una narrativa costruita come un conto alla rovescia, il romanzo segue due vite che si sono già rotte e che, senza saperlo, si stanno ancora cercando. È una storia di secondi, di scelte, di relazioni lasciate a metà e di possibilità che si ripresentano quando meno te lo aspetti.',
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
    copertina: '/images/covers/quello-che-resta.webp',
    sinossi:
      'A Montecarlo, tra vigne e oliveti, Gaia cresce tra le aspettative della famiglia e la volontà di fuggire da un destino già scritto. Quando la vita si spezza in modo imprevedibile, tutto si ribalta: i legami, i ricordi, le persone che davvero contano. Il romanzo racconta la forza di chi prova a ricostruire il proprio futuro senza scordare da dove viene, e la complessità di quel che resta dopo la perdita, quando le radici diventano una forma di resistenza.',
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
    copertina: '/images/covers/emozioni-ditalia.webp',
    sinossi:
      'Un viaggio vero, fatto di strade, pause, occhi puntati su paesaggi e persone. Da Livorno all\'Elba, da Firenze a Bologna, fino al Sud, il racconto attraversa l\'Italia come una mappa dell\'anima: non per raccontare una guida turistica, ma per restituire ciò che la nostra penisola riesce a provocare dentro. È un memoir in cui il luogo è sempre il pretesto, e l\'emozione diventa il vero protagonista.',
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
    copertina: 'http://www.argentovivoedizioni.it/images/libri/qualunque.jpg',
    sinossi:
      'C’è una stanchezza che non si misura in ore di sonno. È quella che ti entra nelle ossa quando ogni gesto, ogni parola, ogni sorriso imparato a memoria sembra appartenere a qualcun altro. Alfredo ha trent’anni, una laurea in beni culturali e un lavoro che non gli somiglia. Le sue giornate scorrono tra tangenziali affollate, voci che parlano di budget e obiettivi, colleghi che sembrano reggersi in piedi per abitudine più che per convinzione. E una voce dentro – sempre più insistente – che gli chiede se questa è davvero vita. In un giorno qualunque è il ritratto quieto e crudele di una resa che non fa rumore. Di sogni accantonati per stare al passo, di silenzi mascherati da scelte adulte. Ma anche del momento in cui ci si ferma, si alza la testa, e si capisce che si può ancora cambiare direzione. Basta trovare il coraggio di ascoltarsi davvero.',
    linkStore: {
      ibs: '',
      amazon: 'https://www.amazon.it/dp/B0GL5LKV4S',
      mondadori: '',
      feltrinelli: ''
    },
    hideVideoSection: true
  }
]

export default books
