import loaderImg from '../../loading.png'
import s from './Loader.module.css'

export default function LoadingView() {
    return (
    <div>
        <img src={loaderImg} width='30' alt='loading' className={s.loader}/>
        <p>Loading</p>
    </div>)
}