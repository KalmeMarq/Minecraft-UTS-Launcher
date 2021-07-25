import { RouteComponentProps } from "@reach/router";
import { FC, useEffect, useState } from "react";
import UrlKnown from "../../../../../common/UrlKnown";
import logoIcon from '../../../../assets/logos/MinecraftJavaEdition.png';
import JavaNewsCard from "./components/JavaNewsCard";
import PlayButton from "./components/PlayButton";
import './index.scss';

interface IPlaySubRoute extends RouteComponentProps {
  isShowingButa: (is: boolean) => void
  onPlay: () => void
}

const index: FC<IPlaySubRoute> = ({ isShowingButa, onPlay }) => {
  const [showButa, setShowButa] = useState(true)
  const [news, setNews] = useState([] as any[])

  useEffect(() => {
    fetch(UrlKnown.news).then(res => res.json())
    .then(data => {
      setNews(data.entries.filter((v: any) => (v.newsType as any[]).includes('Java')))
    })
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    let a = (e.currentTarget.querySelector('.cen') as HTMLDivElement).getBoundingClientRect().top
      
    if(a <= 80) {
      setShowButa(false)
      isShowingButa(false)
    } else {
      setShowButa(true)
      isShowingButa(true)
    }
  }

  return (
    <div className='play-subroute' onScroll={handleScroll}>
      <section>
        <img src={logoIcon} className='animlogo' alt="" />
      </section>
      <main className='cen'>
        {showButa && <PlayButton title='Play' onPlay={onPlay}/>}
        <span className='userName'>Player</span>
      </main>
      <div className='java-news'>
        {news.slice(0, 10).map((b) => <JavaNewsCard data={b} key={b.id}/> )}
      </div>
    </div>
  ) 
}

export default index
