import errorImg from '../../cancel.png'

export default function ErrorView({message}) {
    return (
    <div>
        <img src={errorImg} width='30' alt='red cross' />
        <p>No such images</p>
    </div>)
}