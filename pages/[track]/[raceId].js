import styles from '../../styles/Uk.module.css'

import Link from 'next/link'

// funçoes criadas para chamadas api
import { formatDate } from '../../lib/endpoints'

export async function getStaticPaths() {
  return {
    paths: [
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
    ],
    fallback: true, // can also be true or 'blocking'
  }
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
