import { useTranslation } from "@mojang/t-component"
import { FC } from "react"

const index: FC<{
  title: string,
  description: string
}> = ({ title, description }) => {
  const { t } = useTranslation()
  
  return (
    <div className='nomatchings-warn'>
      <h2>{t(title)}</h2>
      <p>{t(description)}</p>
    </div>
  )
}

export default index
