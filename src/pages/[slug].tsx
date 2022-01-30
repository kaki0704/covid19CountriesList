import { GetServerSideProps, NextPage } from 'next'
import React, { useMemo } from 'react'
import LineChart from '../components/LineChart'
import { Country, Covid19ApiResponse, Case } from '../types'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Slug.module.css'
import dynamic from 'next/dynamic'
import { countryList } from '../const/countries'
import styled from 'styled-components'
import Image from 'next/image'

const ObjWrap = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: -1;
`

type Props = {
  country: Country
  countryMonth: Case[]
}

const Map = dynamic(() => import('../components/Map'), { ssr: false, loading: () => <p>地図を読み込んでいます</p> })

const Slug: NextPage<Props> = ({ country, countryMonth }) => {
  const countryName = useMemo(() => {
    return countryList.find((c) => country.CountryCode === c.code)?.name
  }, [country])
  return (
    <div className={styles.container}>
      <Head>
        <title>{countryName}</title>
        <link rel="icon" href={'https://flagcdn.com/' + country.CountryCode.toLocaleLowerCase() + '.svg'} />
      </Head>
      <ObjWrap>
        <Image layout="fill" src="/earth.jpeg" objectFit="cover" />
      </ObjWrap>
      <div className={styles.banner}>
        <img
          src={'https://flagcdn.com/' + country.CountryCode.toLocaleLowerCase() + '.svg'}
          alt={country.Country + ' Banner'}
        />
      </div>
      <div className={styles.contents}>
        <div className={styles.countryTitle}>
          <Link href="/">
            <a>
              <div className={styles.backButton}>
                <img src="./back.svg" alt="Back" />
              </div>
            </a>
          </Link>
          {countryName}
        </div>
        <div className={styles.twoContainers}>
          <div className={styles.leftContainer}>
            <Map countryMonth={countryMonth[0]} />
            <p className={styles.countryCode}>
              国名コード: <span>{country.CountryCode}</span>
            </p>
            <div className={styles.newTotal}>
              <div>
                <p>
                  新規感染者: <span>{country.NewConfirmed}</span>
                </p>
                <p>
                  死亡: <span>{country.NewDeaths}</span>
                </p>
                <p>
                  回復: <span>{country.NewRecovered}</span>
                </p>
              </div>
              <div>
                <p>
                  感染者合計: <span>{country.TotalConfirmed}</span>
                </p>
                <p>
                  死亡合計: <span>{country.TotalDeaths}</span>
                </p>
                <p>
                  回復者合計: <span>{country.TotalRecovered}</span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <LineChart countryMonth={countryMonth} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (params) => {
  const slug = params.query.slug as string
  const res = await fetch('https://api.covid19api.com/summary')
  const data: Covid19ApiResponse = await res.json()
  const country = data.Countries.find((country) => country.Slug === slug)
  let previousMonth = new Date(data.Date.split('T')[0])
  previousMonth.setMonth(previousMonth.getMonth() - 1)
  const lastMonth = JSON.stringify(previousMonth).split('T')[0].replace('"', '')
  const res1 = await fetch(
    `https://api.covid19api.com/country/${params.query.slug}/status/confirmed?from=${lastMonth}T00:00:00Z&to=${
      data.Date.split('T')[0]
    }`
  )
  const countryMonth = await res1.json()
  return {
    props: { country, countryMonth }
  }
}

export default Slug
