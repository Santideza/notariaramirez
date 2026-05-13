import { useState, useEffect } from "react"
import LogoSvg from "../../assets/icons/Logo"

export default function Ventana() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("ventana-popup-seen")

    if (!hasSeenPopup) {
      setIsOpen(true)
      sessionStorage.setItem("ventana-popup-seen", "true")
    }
  }, [])

  const handleClose = () => setIsOpen(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-200 p-4">
      <div className="bg-white rounded-4xl shadow-2xl max-w-[1000px] w-full min-h-[580px]overflow-y-auto max-sm:min-h-[520px] max-xs:min-h-[480px] ">
        <div className="p-6 space-y-4 max-xs:p-3">
          <div className=" w-full h-[290px] rounded-t-4xl overflow-hidden relative max-sm:h-[240px] max-xs:h-[200px]">

            <div className="  w-[220px] h-[100px] bg-white rounded-b-4xl absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center max-sm:w-[160px] max-sm:h-[70px]max-xs:w-[130px] max-xs:h-[55px]">
              <LogoSvg color1="#7C0600" color2='#000' width="130" height="130" className="max-xs:w-[110px]"
              />
            </div>
            <button onClick={handleClose} className="w-[60px] h-[60px] bg-black/50 rounded-full absolute top-[20px] right-[20px] text-white text-2xl flex items-center justify-center max-sm:w-[45px] max-sm:h-[45px] max-sm:text-xl max-xs:w-[35px] max-xs:h-[35px] max-xs:text-lg max-xs:top-[10px] max-xs:right-[10px]">
              ✕
            </button>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.344522795298!2d-77.0382403241519!3d-12.088550342681767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c85e52b5fd5d%3A0x785d4b2405f696d8!2sAv.%20C%C3%A9sar%20Vallejo%20290%2C%20Lima%2015073!5e0!3m2!1ses-419!2spe!4v1764208831578!5m2!1ses-419!2spe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación en Google Maps" />
          </div>

          <div className="text-center lg:mx-10 sm:mx-4 xs:mx-2 ">
            <span className=" font-semibold font-[choplin] text-rojo text-[45px] sm:text-[55px] lg:text-[80px] md:text-[70px]  leading-10  ">
              ¡Nos mudamos!
            </span>

            <p className="text-[20px] md:text-[26px] my-[12px]">
              Nos trasladamos a <span className="font-bold"><br /> Av. César Vallejo 290 - Lince. </span>
              <br className="sm:hidden" />
               Ahora estamos en nueva oficina, nuevo espacio, mayor comodidad
              para nuestro equipo y un mejor servicio para nuestros clientes.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
