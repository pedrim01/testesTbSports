import styles from '../../styles/Uk.module.css'

import Link from 'next/link'

// funçoes criadas para chamadas api
import { getPistasRacingPost } from '../../lib/endpoints'

import { useRouter } from 'next/router'

export async function getStaticPaths() {
  const data = await getPistasRacingPost()

  const paths = data.list.items.map((item) => ({
    params: {
      track: item.track,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const data = await getPistasRacingPost()

  const races = data.list.items.find((item) => {
    if (item.track == context.params.track) {
      return item.races
    }
  })

  return {
    props: races,
    revalidate: 10,
  }
}

export default function Track({ races }) {
  const router = useRouter()
  const track = router.query.track
  return (
    <>
      <Link href={`/`}>Voltar</Link>
      <h1>Races:</h1>
      <ul className={styles.Uklist}>
        {races.map((race) => (
          <li key={race.raceId}>
            <Link href={`/${track}/${race.raceId}`}>{race.raceId}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
