import { useState } from 'react'
import { useParams } from "react-router-dom";
import { service } from "../../data/Servicios.js";
import Cita from '../blocks/Cita.jsx';
import Hero from '../blocks/Hero.jsx';
import Container from './Container.jsx';

const ServicioDetalle = () => {
  const { slug } = useParams();
  const data = service.find(item => item.slug === slug);
  const [abierto, setAbierto] = useState(null);
  const tituloClassName = "font-[Choplin] font-medium text-[24px] smd:text-[40px] md:text-[60px] lg:text-[75px] leading-tight mb-3 sm:mb-5 md:mb-8 max-w-[1200px] px-4 text-center text-balance";
  const limpiarVineta = (texto) => texto.replace(/^\s*(?:•|â€¢|\*)\s*/, "");

  if (!data) return <h1 className="py-16 text-center text-2xl font-semibold">Servicio no encontrado</h1>;

  return (
    <>
      <Hero image={data.imagen}>
        <div className='flex flex-col items-center gap-4 smd:gap-7 md:gap-14'>
          <img src={data.icono} alt={data.titulo} className="w-[72px] h-[56px] md:w-[123px] md:h-[96px] object-contain"/>
          <h1 className={tituloClassName}>
            {data.titulo}
          </h1>
        </div>
      </Hero>
      <div className='w-full pt-10 md:pt-18'> 
        <Container>
          <h2 className='title text-center text-black leading-7 md:leading-12 mb-7 sm:mb-10 md:mb-13'>¿Cuáles son los requisitos?</h2>

        </Container>
      </div>
     
      {data.requisitos && (
        <div className='w-full pt-10 md:pt-10'> 
          <Container>
            
            <div className='flex flex-col gap-3 md:gap-6'>
              {data.requisitos.map((item, i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <span className="text-rojo text-[13px] md:text-xl leading-normal">•</span>

                  <p className="text-[13px] md:text-xl">
                    {limpiarVineta(item)}
                  </p>
                </li>
              ))}

            </div> 
          </Container>
        </div> 
      )}

      {data.secciones && (
        <div className='w-full pt-0 md:pt-10 pb-10'>  
          <Container>
            <div className="w-full flex flex-col gap-0 sm:gap-1">
              {data.secciones.map((item, i) => (
                <div key={i} className="mb-3">
                  <div onClick={() => setAbierto(abierto === i ? null : i)} className="bg-gris-muy-claro flex justify-between items-center gap-3 px-6 py-2 rounded-[20px] xl:rounded-full cursor-pointer font-bold text-sm md:text-xl">
                    <span className="min-w-0 leading-tight break-words">{item.titulo}</span>
                    <span className={`transition-transform duration-300 text-sm text-rojo ${ abierto === i ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 px-6 flex flex-col gap-3 md:gap-6  ${ abierto === i ? " opacity-100 my-4 md:my-7"  : "max-h-0 opacity-0" }`} >
                      {item.items.map((requisito, index) => (
                        <li key={index} className="flex items-baseline gap-2">
                          <span className="text-rojo text-[13px] md:text-xl leading-normal">•</span>
                          <p className="text-[13px] md:text-xl">
                            {limpiarVineta(requisito)}
                          </p>
                        </li>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div> 
      )}
      <Cita></Cita>
    </>
  )
}

export default ServicioDetalle



