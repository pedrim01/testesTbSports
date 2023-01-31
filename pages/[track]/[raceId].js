import styles from '../../styles/Uk.module.css'

import Link from 'next/link'

// funçoes criadas para chamadas api
import { formatDate } from '../../lib/endpoints'
import { getPistasRacingPost } from '../../lib/endpoints'

export async function getStaticPaths() {
  const data = await getPistasRacingPost()

  const paths = data.list.items.map((d) => (
    
    {
    params: { track: d.track,raceId: d.races[1].raceId},
    }
  ))
  
  console.log(paths)

  return { paths, fallback: "blocking" }

    /*  paths: [
      {
        params: {
          track: 'Oxford',
          raceId: '1956909',
        },
      },
      {
        params: {
          track: 'Kinsley',
          raceId: '1957318',
        },
      },
    ], */

}

export async function getStaticProps(context) {
  const url = `https://greyhoundbet.racingpost.com/card/blocks.sd?race_id=${
    context.params.raceId
  }&r_date=${formatDate()}&tab=form&blocks=card-header%2Ccard-pager%2Ccard-tabs%2Ccard-title%2Cform`
  const response = await fetch(`${url}`)

  const data = await response.json()

  const dogsName = data.form.dogs.map((dog) => dog.dogName)

  // Passed to the page component as props
  return {
    props: { dogsName },
    revalidate: 10,
  }
}

export default function Dogs({ dogsName }) {
  return (
    <>
      <Link href={`/`}>Voltar</Link>
      <h1>Dogs:</h1>
      <ul className={styles.Uklist}>
        {dogsName.map((dogName) => (
          <li key={dogName}>{dogName}</li>
        ))}
      </ul>
    </>
  )
}
