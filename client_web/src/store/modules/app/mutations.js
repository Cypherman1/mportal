const CalPoint = ({ bet, isHopeStar, score, round, rate }) => {
  let point = 0
  if (bet.home === '-' || bet.away === '-') {
    point = rate[round].lose
  } else if (
    Number(bet.home) === Number(score.home) &&
    Number(bet.away) === Number(score.away)
  ) {
    point = rate[round].scored
  } else if (
    (Number(bet.home) > Number(bet.away) &&
      Number(score.home) > Number(score.away)) ||
    (Number(bet.home) < Number(bet.away) &&
      Number(score.home) < Number(score.away)) ||
    (Number(bet.home) === Number(bet.away) &&
      Number(score.home) === Number(score.away))
  ) {
    point = rate[round].win
  } else {
    point = rate[round].lose
  }
  return point
}

export default {
  SET_USER_BETS(state, payload) {
    state.userBets = payload
  },
  SET_MATCHES(state, payload) {
    state.matches = payload.matches
  },

  SET_LOADING(state, payload) {
    state.loading = payload
  },
  SET_DIALOG(state, payload) {
    state.dialog = payload.dialog
    state.currentMatch = payload.currentMatch
  },
  SET_SNACK(state, payload) {
    state.snack = payload
  },
  ADD_RANKING(state, payload) {
    const isNotExisted =
      state.rankings.findIndex((ranking) => ranking.id === payload.id) === -1
    if (isNotExisted) {
      state.rankings = [...state.rankings, { ...payload.data, id: payload.id }]
    }
  },
  UPDATE_RANKING(state, payload) {
    state.rankings = [
      ...state.rankings.filter((ranking) => ranking.id !== payload.id),
      { ...payload.data, id: payload.id }
    ]
  },
  DELETE_RANKING(state, payload) {
    state.bets = state.bets.filter((bet) => bet.id !== payload.id)
  },
  ADD_BET(state, payload) {
    const isNotExisted =
      state.bets.findIndex((bet) => bet.id === payload.id) === -1
    if (isNotExisted) {
      state.bets = [...state.bets, { ...payload.data, id: payload.id }]
    }
  },
  SET_USERS(state, payload) {
    state.users = payload.users
  },
  UPDATE_BET(state, payload) {
    state.bets = [
      ...state.bets.filter((bet) => bet.id !== payload.id),
      { ...payload.data, id: payload.id }
    ]
  },
  DELETE_BET(state, payload) {
    state.bets = state.bets.filter((bet) => bet.id !== payload.id)
  },
  ADD_MATCH(state, payload) {
    const isNotExisted =
      state.matches.findIndex((match) => match.id === payload.id) === -1
    if (isNotExisted) {
      state.matches = [...state.matches, { ...payload.data, id: payload.id }]
    }
  },
  UPDATE_MATCH(state, payload) {
    state.matches = [
      ...state.matches.filter((match) => match.id !== payload.id),
      { ...payload.data, id: payload.id }
    ]
  },
  DELETE_MATCH(state, payload) {
    state.matches = state.matches.filter((match) => match.id !== payload.id)
  },
  SET_DAY_MATCHES(state, payload) {
    state.dayMatches = state.matches.filter(
      (match) => match.date_offset === payload
    )
  },
  ADD_DAY_MATCH(state, payload) {
    if (state.dayMatches.findIndex((match) => match.id === payload.id) === -1) {
      if (payload.data.date_offset === state.tab) {
        state.dayMatches = [
          ...state.dayMatches,
          { ...payload.data, id: payload.id }
        ]
      }
    }
  },
  UPDATE_DAY_MATCH(state, payload) {
    if (payload.data.date_offset === state.tab) {
      state.dayMatches = [
        ...state.dayMatches.filter((match) => match.id !== payload.id),
        { ...payload.data, id: payload.id }
      ]
    }
  },
  DELETE_DAY_MATCH(state, payload) {
    if (payload.data.date_offset === state.tab) {
      state.dayMatches = state.dayMatches.filter(
        (match) => match.id !== payload.id
      )
    }
  },
  SET_TAB(state, payload) {
    state.tab = payload
  },
  UPDATE_SCORE_POINT(state, payload) {
    if (payload.data.score.home !== '-') {
      state.rankings = state.rankings.map((ranking) =>
        ranking.matchId !== payload.id
          ? ranking
          : {
              ...ranking,
              score: payload.data.score,
              point: CalPoint({
                bet: ranking.bet,
                isHopeStar: ranking.isHopeStar,
                score: payload.data.score,
                round: payload.data.round,
                rate: state.rate
              })
            }
      )
    }
  }
}
