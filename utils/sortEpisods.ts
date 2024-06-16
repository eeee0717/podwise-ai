import type { Episode } from '~/types'

export default function sortEpisods(filterSelected: string, sortedEpisods: Episode[]) {
// 根据 filterselected 的值进行排序
  if (filterSelected === 'old') {
    sortedEpisods.sort((a: Episode, b: Episode) => (a.datePublished && b.datePublished) ? (new Date(a.datePublished).getTime() - new Date(b.datePublished).getTime()) : 0)
  }
  else if (filterSelected === 'new') {
    sortedEpisods.sort((a: Episode, b: Episode) => (a.datePublished && b.datePublished) ? (new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()) : 0)
  }
  else if (filterSelected === 'short') {
    sortedEpisods.sort((a: Episode, b: Episode) => (a.duration && b.duration) ? (a.duration - b.duration) : 0)
  }
  else if (filterSelected === 'long') {
    sortedEpisods.sort((a: Episode, b: Episode) => (a.duration && b.duration) ? (b.duration - a.duration) : 0)
  }
  return sortedEpisods
}
