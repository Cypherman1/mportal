import appMutations from './mutations'
import appGetters from './getters'
import appActions from './actions'

export default {
  namespaced: true,
  state: () => ({
    matches: [],
    dayMatches: [],
    bets: [],
    rankings: [],
    users: [],
    userBets: [],
    teams: {
      ger: {
        name: 'Germany',
        logo: require('../../../assets/teams/ger.png')
      },
      sco: {
        name: 'Scotland',
        logo: require('../../../assets/teams/sco.png')
      },
      hun: {
        name: 'Hungary',
        logo: require('../../../assets/teams/hun.png')
      },
      swi: {
        name: 'Switzerland',
        logo: require('../../../assets/teams/swi.png')
      },
      alb: {
        name: 'Albania',
        logo: require('../../../assets/teams/alb.png')
      },
      spa: {
        name: 'Spain',
        logo: require('../../../assets/teams/spa.png')
      },
      ita: {
        name: 'Italy',
        logo: require('../../../assets/teams/ita.png')
      },
      cro: {
        name: 'Croatia',
        logo: require('../../../assets/teams/cro.png')
      },
      den: {
        name: 'Denmark',
        logo: require('../../../assets/teams/den.png')
      },
      eng: {
        name: 'England',
        logo: require('../../../assets/teams/eng.png')
      },
      ser: {
        name: 'Serbia',
        logo: require('../../../assets/teams/ser.png')
      },
      slo: {
        name: 'Slovenia',
        logo: require('../../../assets/teams/slo.png')
      },
      aus: {
        name: 'Austria',
        logo: require('../../../assets/teams/aus.png')
      },
      fra: {
        name: 'France',
        logo: require('../../../assets/teams/fra.png')
      },
      net: {
        name: 'Netherlands',
        logo: require('../../../assets/teams/net.png')
      },
      pol: {
        name: 'Poland',
        logo: require('../../../assets/teams/pol.png')
      },
      bel: {
        name: 'Belgium',
        logo: require('../../../assets/teams/bel.png')
      },
      rom: {
        name: 'Romania',
        logo: require('../../../assets/teams/rom.png')
      },
      slk: {
        name: 'Slovakia',
        logo: require('../../../assets/teams/slk.png')
      },
      ukr: {
        name: 'Ukraine',
        logo: require('../../../assets/teams/ukr.png')
      },
      cze: {
        name: 'Czechia',
        logo: require('../../../assets/teams/cze.png')
      },
      geo: {
        name: 'Georgia',
        logo: require('../../../assets/teams/geo.png')
      },
      por: {
        name: 'Portugal',
        logo: require('../../../assets/teams/por.png')
      },
      tur: {
        name: 'Turkiye',
        logo: require('../../../assets/teams/tur.png')
      }
    },
    loading: false,
    tab: 3,
    dialog: false,
    currentMatch: {
      home: 'ger',
      away: 'sco'
    },
    snack: {
      visible: false,
      color: 'red',
      message: ''
    },
    rate: {
      GRP: {
        scored: 0,
        win: 0,
        lose: 20
      },
      R16: {
        scored: 0,
        win: 0,
        lose: 40
      },
      QUA: {
        scored: 0,
        win: 0,
        lose: 80
      },
      SEM: {
        scored: 0,
        win: 0,
        lose: 160
      },
      THI: {
        scored: 0,
        win: 0,
        lose: 320
      },
      FIN: {
        scored: 0,
        win: 0,
        lose: 640
      }
    }
  }),
  mutations: appMutations,
  actions: appActions,
  getters: appGetters
}
