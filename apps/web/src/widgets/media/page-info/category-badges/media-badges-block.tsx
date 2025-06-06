import { CategoryBadges } from "."
import { CategoryBadgesContainer } from "./category-badges-container"

export function MediaBadgesBlock() {
  const categories: CategoryBadges[] = [
      {
        title: 'Телесеть',
        badges: [
          {
            title: 'AT-X',
            img: {
              https: true,
              domain: 'media.themoviedb.org',
              path: '/t/p/h50_filter(negate,000,666)/fERjndErEpveJmQZccJbJDi93rj.png'
            }
          },
        ]
      },
      {
        title: 'Трекеры',
        badges: [
          {
            title: 'TMDB',
            img: {
              https: true,
              domain: 'www.themoviedb.org',
              path: '/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
            }
          }
        ]
      }
    ]

    return (
      <CategoryBadgesContainer categories={categories} />
    )
}