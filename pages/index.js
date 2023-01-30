import styles from '../styles/Uk.module.css'

import Link from 'next/link'

// funçoes criadas para chamadas api
import {getPistasRacingPost} from '../lib/endpoints'


export async function getStaticProps() {
  
  const data = await getPistasRacingPost()

  // add index aos races das pistas
  data.list.items.forEach((item, index) => {
    item.id = index + 1
  })

  
  return {
    props: {
      items: data.list.items,
    },
    revalidate: 10
  }
}

export default function Uk({ items }) {
  return (
    <>
      <h1>Pistas:</h1>
      <ul className={styles.Uklist}>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/${item.track}`}>
              {item.track}{' '}
              {new Date(item.firstRace).toLocaleTimeString('pt-Br', {
                timeZone: 'America/Mexico_City',
              })}{' '}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
