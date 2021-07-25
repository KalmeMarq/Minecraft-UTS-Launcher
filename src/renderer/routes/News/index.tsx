import { RouteComponentProps } from "@reach/router";
import { FC } from "react";
import HeaderLogo from "./components/HeaderLogo/HeaderLogo";
import './index.scss';

const index: FC<RouteComponentProps> = () => {
  return (
    <div className='news-route'>
      <HeaderLogo />
      <div className='wrapper'>
        <div className='filter-container'></div>
      </div>
    </div>
  )
}

export default index
