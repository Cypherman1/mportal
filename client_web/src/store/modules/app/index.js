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
      qat: {
        name: 'Qatar',
        logo: require('../../../assets/teams/qat.png')
      },
      ecu: {
        name: 'Ecuado',
        logo: require('../../../assets/teams/ecu.png')
      },
      wal: {
        name: 'Wales',
        logo: require('../../../assets/teams/wal.png')
      },
      swi: {
        name: 'Switzerland',
        logo: require('../../../assets/teams/swi.png')
      },
      den: {
        name: 'Denmark',
        logo: require('../../../assets/teams/den.png')
      },
      mor: {
        name: 'Morocco',
        logo: require('../../../assets/teams/mor.png')
      },
      bel: {
        name: 'Belgium',
        logo: require('../../../assets/teams/bel.png')
      },
      sen: {
        name: 'Senegal',
        logo: require('../../../assets/teams/sen.png')
      },
      eng: {
        name: 'England',
        logo: require('../../../assets/teams/eng.png')
      },
      cro: {
        name: 'Croatia',
        logo: require('../../../assets/teams/cro.png')
      },
      aus: {
        name: 'Austria',
        logo: require('../../../assets/teams/aus.png')
      },
      cam: {
        name: 'Cameroon',
        logo: require('../../../assets/teams/cam.png')
      },
      net: {
        name: 'Netherlands',
        logo: require('../../../assets/teams/net.png')
      },
      bra: {
        name: 'Brazil',
        logo: require('../../../assets/teams/bra.png')
      },
      can: {
        name: 'Canada',
        logo: require('../../../assets/teams/can.png')
      },
      cos: {
        name: 'Costa Rica',
        logo: require('../../../assets/teams/cos.png')
      },
      pol: {
        name: 'Poland',
        logo: require('../../../assets/teams/pol.png')
      },
      jap: {
        name: 'Japan',
        logo: require('../../../assets/teams/jap.png')
      },
      spa: {
        name: 'Spain',
        logo: require('../../../assets/teams/spa.png')
      },
      uru: {
        name: 'Uruguay',
        logo: require('../../../assets/teams/uru.png')
      },
      kor: {
        name: 'South Korea',
        logo: require('../../../assets/teams/kor.png')
      },
      por: {
        name: 'Portugal',
        logo: require('../../../assets/teams/por.png')
      },
      ger: {
        name: 'Germany',
        logo: require('../../../assets/teams/ger.png')
      },
      fra: {
        name: 'France',
        logo: require('../../../assets/teams/fra.png')
      },
      gha: {
        name: 'Ghana',
        logo: require('../../../assets/teams/gha.png')
      },
      ser: {
        name: 'Serbia',
        logo: require('../../../assets/teams/ser.png')
      },
      tun: {
        name: 'Tunisia',
        logo: require('../../../assets/teams/tun.png')
      },
      arg: {
        name: 'Argentina',
        logo: require('../../../assets/teams/arg.png')
      },
      mex: {
        name: 'Mexico',
        logo: require('../../../assets/teams/mex.png')
      },
      ira: {
        name: 'Iran',
        logo: require('../../../assets/teams/ira.png')
      },
      usa: {
        name: 'USA',
        logo: require('../../../assets/teams/usa.png')
      },
      sau: {
        name: 'Saudi Arabia',
        logo: require('../../../assets/teams/sau.png')
      }
    },
    loading: false,
    tab: 3,
    dialog: false,
    currentMatch: {
      home: 'qat',
      away: 'ecu'
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
