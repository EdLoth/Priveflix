
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


interface VideoInfoProps {
    availableAt: Date;
}



export function VideoDate(props: VideoInfoProps) {
  const availableDateFormated = format(props.availableAt,  "LLLL' de 'YYY", {
    locale: ptBR,
  })


  return<h1 className='font-semibold capitalize'><span className="text-xl">Lançamento: </span>{availableDateFormated}</h1>
}