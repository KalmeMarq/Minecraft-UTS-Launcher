import { RouteComponentProps } from '@reach/router';
import { FC, useEffect, useState } from 'react';
import UrlKnown from '../../../../../common/UrlKnown';
import logoIcon from '../../../../assets/logos/dungeons/hiddendepths.png';
import './index.scss';

const index: FC<RouteComponentProps> = () => {
  const [news, setNews] = useState([] as any[])

  useEffect(() => {
    fetch(UrlKnown.news).then(res => res.json())
    .then(data => {
      setNews(data.entries.filter((v: any) => (v.newsType as any[]).includes('Dungeons')).slice(0, 10))
    })
  }, [])

  return (
    <div className='dplay-subroute'>
      <section>
        <img src={logoIcon} className='animlogo' alt="" />
      </section>
      <main className='cen'>
      </main>
    </div>
  )
}

export default index
