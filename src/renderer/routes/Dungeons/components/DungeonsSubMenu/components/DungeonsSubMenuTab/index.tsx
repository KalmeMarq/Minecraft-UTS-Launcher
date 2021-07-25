import { useTranslation } from "@mojang/t-component"
import { FC } from "react"
import './index.scss'

interface I {
  to: string,
  title: string,
  activeTab: string,
  onTabClick: (path: string) => void
}

const index: FC<I> = ({ to, title, activeTab, onTabClick }) => {
  const { t } = useTranslation()

  return (
    <li title={title} className={'tab' + (to.includes(activeTab) ? ' active' : '')} tabIndex={0} onClick={() => onTabClick(to)}>
      <span>{t(title)}</span>
    </li>
  )
}

export default index
