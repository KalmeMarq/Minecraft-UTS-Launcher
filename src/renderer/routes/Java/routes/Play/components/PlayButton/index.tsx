import { T } from "@mojang/t-component"
import { FC } from "react"

const index: FC<{
  title: string,
  onPlay: () => void
}> = ({ onPlay, title }) => {
  return (
    <div className='buta' tabIndex={0} onClick={onPlay}>
      <div className='buta-inside'></div>
      <div className='buta-text'><T>{title}</T></div>
    </div>
  )
}

export default index
