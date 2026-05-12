import imgPlanear from "../../assets/images/imgPlanear.jpg"
import Container from "../layout/Container"
import Boton from "../ui/Boton"
import { Link } from "react-router-dom"

const Cita = () => {
  return (
    <section className=" space-y-4 py-[30px] md:py-[50px] lg:py-[80px] px-3">
      <Container>
        <div className="text-center mb-5 sm:mb-10 sm:mb-12 md:mb-16 w-full">
          <h2 className="title">
            Contáctanos
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="w-auto h-[218px] smd:w-[500px] smd:h-[240px] lg:w-[800px] lg:h-[380px] rounded-2xl lg:rounded-4xl overflow-hidden">
            <div className="h-[114px] smd:h-[120px] lg:h-[190px] w-full overflow-hidden">
              <img src={imgPlanear} alt="Persona Natural" className="h-full w-full object-cover object-top"/>
            </div>
            <div className="h-[114px] smd:h-[120px] lg:h-[190px] w-full bg-gradient-to-r from-[#7C0600] to-[#000000]">
              <div className="w-full h-full gap-2 lg:gap-6 flex flex-col text-center justify-center items-center">
                  <h3 className="mt-0 lg:mt-5 text-[17px] xl:text-[40px] lg:text-3xl text-white font-light">
                    Contáctanos
                  </h3>
                  <Boton border="none" textSize="text-[11px] lg:text-[18px]" textColor="text-rojo" fontWeight="font-normal" bg="bg-beige" px="px-4 lg:px-4" py="py-1" className=" relative overflow-hidden hover:bg-rojo hover:text-white hover:border-rojo ease-in-out m-0">
                    <Link to="/contacto">
                      <span className=" z-10 transition-colors duration-200">Contactar</span>
                    </Link>
                  </Boton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Cita

