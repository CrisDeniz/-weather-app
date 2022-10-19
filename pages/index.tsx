import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { weather } from '../types/weather'

const Home: NextPage = () => {

const [name, setName] = useState('Brasilia')
const [loading, setLoading] = useState<boolean>()
const [data, setData] = useState<weather>() 
const search = useRef<HTMLInputElement>(null)

const URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&lang=pt_br&units=metric&appid=4db3bb575a8392f175d568fecf2b13c5`

  async function fetchData() {
    try {
      setLoading(true)
      const response = await fetch(URL)
      const data  = await response.json()
      console.log(data);
      
      if(!data || !response ) {
        throw new Error("Erro na requisição")
      }
      setData(data)
      
    } catch(e) {
      
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [name])

 

  return (

    <div>

      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=false, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0;"/>
      </Head>

      <div className={styles.container} >
      <span>Tempo Agora</span>
      <div className={styles.search}>
      <input type="text" ref={search} 
      onKeyUp={(e) => {
        if (e.code === 'Enter') {
          setName(search.current!.value)
        }
      }}
      />
      <button onClick={() => setName(search.current!.value)}> <img src="/search-icon.svg" alt="icone de pesquisa" /> </button>
      </div>
      {data && data.weather &&
        <div className={styles.info}>
          <div>
          <p>{data.name} ({data.weather[0].description}) </p>
          <img className={styles.country} src={`https://countryflagsapi.com/png/${data.sys.country}`} alt="Bandeira do País" />
          </div>
            <img src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} alt="icone" />
          
          <div className={styles.tempBox}>
            <p className={styles.temp}>Atual : {Math.round(data.main.temp)}&deg; </p>
            <p className={styles.temp}>Max : {Math.round(data.main.temp_max)}&deg; </p>
            <p className={styles.temp}>Min : {Math.round(data.main.temp_min)}&deg; </p>
          </div>
          <div className={styles.umidade}>
            <img src="/water-drop.svg" alt="gota" />
            <p>{data.main.humidity}%</p>
          </div>
        </div>
      }

      {loading &&
        <p>Carregando...</p>
      }

      {!data?.weather && !loading &&
        <p>Não foi possivel encontrar o nome da cidade</p>
      }
     
    </div>
    </div>
  )
}

export default Home
