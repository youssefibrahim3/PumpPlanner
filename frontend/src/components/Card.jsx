export default function Card({ content, onClick })
{
    return (
        <div onClick={onClick} className="block rounded-lg drop-shadow-red-900 bg-gray-300">
            {content}
        </div>
    )

}