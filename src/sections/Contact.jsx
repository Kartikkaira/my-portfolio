import { useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";


const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact(){
  const [formData , setFormData] = useState({
    name : "",
    email: "",
    service: "",
    idea: "",
  });

  const [errors , setErrors] = useState({});
  const [status , setStatus] = useState("");

  const handleChange = (e) =>{
    const{name , value } = e.target;
    setFormData((p) => ({...p , [name] : value}));
    if(errors[name]) setErrors((p) => ({...p , [name] : ""}));
  } 

  return(
    <section id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col
     md:flex-row items-center gap-10">
      <ParticlesBackground />
    </section>
  )
}
