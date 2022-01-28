import { Country } from '../types'
import { countryList } from '../const/countries'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(63, 63, 64, 0.8);
  color: white;
  margin: 5px auto;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 15rem;
  border-radius: 20px;
  transition: 1s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 2);
  }
`

const FlagImage = styled.img`
  object-fit: contain;
  background-color: white;
  height: 6rem;
  width: 95%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 5px;
`

const Title = styled.p`
  margin-top: 0;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
`

const Info = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  font-size: 12px;
`

const NumbersInfo = styled.span`
  padding-left: 5px;
  padding-right: 5px;
`

const TextInfo = styled.span`
  padding-left: 5px;
  padding-right: 5px;
`

type Props = {
  country: Country
}

const CountryCard: React.FC<Props> = ({ country }) => {
  return (
    <Wrapper key={country.CountryCode}>
      <FlagImage
        src={'https://flagcdn.com/' + country.CountryCode.toLocaleLowerCase() + '.svg'}
        alt={country.Country}
      />
      <Title>
        {countryList.find((c) => country.CountryCode === c.code)?.name} {country.CountryCode}
      </Title>
      <Info>
        <TextInfo>
          確認:
          <NumbersInfo>{country.TotalConfirmed}</NumbersInfo>
        </TextInfo>
        <TextInfo className={styles.textInfo}>
          死者:
          <NumbersInfo className={styles.numbersInfo}>{country.TotalDeaths}</NumbersInfo>
        </TextInfo>
        <TextInfo className={styles.textInfo}>
          回復:
          <NumbersInfo className={styles.numbersInfo}>{country.TotalRecovered}</NumbersInfo>
        </TextInfo>
      </Info>
    </Wrapper>
  )
}

export default CountryCard
