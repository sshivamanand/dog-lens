import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useRef } from "react"

export default function Landing() {
  const navigate = useNavigate()
  const howItWorksRef = useRef(null)

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="w-full">
      <section className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* logo */}
          <img
            src="/logo.png"
            alt="DogLens logo"
            className="max-w-xs w-full object-contain"
          />
          <span className="mb-12 text-lg font-semibold tracking-widest uppercase text-[#1a6b3c]">
            🐾 DogLens
          </span>

          {/* headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#1a2a1a]">
            <span className="block md:inline">What breed</span>{" "}
            <span className="block md:inline text-[#1a6b3c]">
              is your dog?
            </span>
          </h1>

          <p className="mt-6 max-w-md text-xl md:text-2xl text-gray-700">
            Upload a photo and let deep learning identify the dog breed in seconds.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/predict")}
              className="px-10 py-4 rounded-full bg-[#1a6b3c] text-white text-lg font-semibold shadow-sm"
            >
              Try it now
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToHowItWorks}
              className="px-10 py-4 rounded-full border-2 border-[#1a6b3c] text-[#1a6b3c] text-lg font-semibold bg-transparent transition hover:bg-[#1a6b3c]/5"
            >
              How it works
            </motion.button>
          </div>
        </motion.div>
      </section>

      <section
        ref={howItWorksRef}
        className="min-h-screen bg-amber-50 flex items-center justify-center px-6"
      >
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
          
          <img
            src="/landing.jpg"
            alt="Dog example"
            className="w-full rounded-2xl shadow-md object-cover"
          />

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a2a1a]">
              How DogLens works
            </h2>

            <p className="mt-6 text-xl text-gray-700 leading-relaxed">
              On the <span className="font-semibold">/predict</span> page, you upload
              a photo of a dog. Our deep learning model analyzes visual features like
              fur texture, face shape, and ear structure to predict the most likely breed.
            </p>

            <p className="mt-4 text-xl text-gray-700 leading-relaxed">
              You'll get a predicted breed along with confidence scores — fast,
              simple, and completely automated.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}