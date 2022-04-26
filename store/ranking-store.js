import { HYEventStore } from 'hy-event-store'

import { getRankings } from '../api/api_music'

const rankingStore = new HYEventStore({
  state: {
    hotRanking: []
  },
  actions: {
    getRankingDataAction(ctx) {
      getRankings().then(res => {
        ctx.hotRanking = res.result
      })
    }
  }
})

export {
  rankingStore
}
