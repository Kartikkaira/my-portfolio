import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import mobile1 from "../assets/mobile1.jpeg";
import laptop1 from "../assets/laptop1.webp";
import mobile2 from "../assets/mobile2.jpeg";
import laptop2 from "../assets/laptop2.webp";
import mobile3 from "../assets/mobile3.jpeg";
import laptop3 from "../assets/laptop3.webp";

const useMobile = (query = "(max-width : 630px)") =>{
  const [isMobile , setMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  )

  useEffect(() =>{
    if(typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setMobile(e.matches);

    mql.addEventListener("change" , handler);
    setMobile(mql.matches);
    return() => mql.removeEventListener("change" , handler);
  }, [query])
  return isMobile;

}


export default function Projects(){
  const isMobile = useMobile();
  const sceneRef = useRef(null);

  
const projects = useMemo(
    () => [
      {
        title: "Career Craft",
        link: "https://ai-career-saas-zeta.vercel.app/",
        bgColor: "#dc9317",
        image: isMobile ? mobile3 : laptop3,
      },
      {
        title: "Kafal Mart",
        link: "https://www.kafalmart.in/",
        bgColor: "#0B1120",
        image: isMobile ? mobile2 : laptop2,
      },
      
      {
        title: "Tracky",
        link: "https://seo-rank-tracker-kohl.vercel.app/",
        bgColor: "#0B1120",
        image: isMobile ? mobile1 : laptop1, // use mobile or desktop image
      },
    ],
    [isMobile] // re-run only when `isMobile` changes
  );

  const {scrollYProgress} = useScroll({
    target:sceneRef,
    offset: ["start start","end end"]
  });
  const thresholds = projects.map((_,i) => (i+1)/projects.length)
  const [activeIndex , setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress , "change" , (v)=>{
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length -1 : idx)
  });

  const activeProject = projects[activeIndex];
  
  return(
    <section id="projects" 
    ref={sceneRef}
    className="relative text-white"
    style={{
      height: `${100*projects.length}vh`,
      backgroundColor: activeProject.bgColor,
      transition: "background-color 400ms ease"
    }}
    >

    <div className="sticky top-0 h-screen flex flex-col items-center justify-center ">
      <h2 className={`text-3xl font-semibold z-10 text-center ${
         isMobile ? "mt-4" : "mt-8"
      }`}>
        My Work
      </h2>
      <div className={`relative w-full flex-1 flex items-center justify-center ${
        isMobile ? "-mt-4 " : ""
      }`}>
        {projects.map((project , idx)=>(
          <div key={project.title}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
          activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"
        }`}
        style={{
          width: isMobile ? "78%" : "72%" , 
          maxWidth: "1100px"}}
          >
            <AnimatePresence mode="wait">
              {activeIndex === idx && (

                <motion.h3 key={project.title}
                initial = {{opacity: 0 , y: -30}}
                animate = {{opacity: 1 , y: 0}}
                exit = {{opacity: 0 , y: 30}}
                transition= {{duration: 0.5 , ease: "easeOut"}}
                className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0
                  italic font-semibold ${
                    isMobile ? "-mt-24" : ""
                  }
                  `}
                  style={{
                    zIndex:5,
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                 {project.title} 
                </motion.h3>
              )}
            </AnimatePresence>

        <div
            className={`relative w-full flex items-center justify-center
            overflow-hidden
            bg-black/20
            shadow-[0_20px_60px_rgba(0,0,0,0.55)]
            border border-white/10
            ${
                isMobile
                ? "mb-6 rounded-2xl"
                : "mb-10 sm:mb-12 rounded-[28px]"
            }`}
            style={{
              zIndex: 10,
            }}
          >
          <img
          src={project.image} alt={project.title}
          className="w-full h-auto object-contain drop-shadow-xl md:drop-shadow-2xl"
          style={{
          position: "relative",
          zIndex: 10,
          filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
          }}
          loading="lazy"
          />

          <div className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 11,
            background: "linear-gradient(100deg , rgba(0,0,0,0.12) 0% , rgba(0,0,0,0) 40%"
          }}
          >

          </div>

        </div>

      </div>
        ))}
      </div>

      <div className={`absolute ${
       isMobile ? "bottom-10" : "bottom-5"
      }`} >
        <a href={activeProject?.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all shadow-md"
        aria-label={`View ${activeProject?.title}`}
        >View Project</a>
      </div>

    </div>
    
    </section>
  )
}
