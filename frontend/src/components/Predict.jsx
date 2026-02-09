import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, X, ArrowLeft, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Predict() {
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [displayedInfo, setDisplayedInfo] = useState([])
  const fileInputRef = useRef(null)
  const API_URL = import.meta.env.VITE_API_BASE_URL

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
      setError(null)
      setResult(null)
      setDisplayedInfo([])
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
      setError(null)
      setResult(null)
      setDisplayedInfo([])
    }
  }

  const clearImage = () => {
    setImage(null)
    setPreview(null)
    setResult(null)
    setError(null)
    setDisplayedInfo([])
  }

  const handlePredict = async () => {
    if (!image) return

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("file", image)

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Prediction failed")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Typing effect for info
  useEffect(() => {
    if (result?.info && Array.isArray(result.info)) {
      setDisplayedInfo([])
      let currentIndex = 0
      
      const interval = setInterval(() => {
        if (currentIndex < result.info.length) {
          setDisplayedInfo(prev => [...prev, result.info[currentIndex]])
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, 300) // 300ms delay between each line

      return () => clearInterval(interval)
    }
  }, [result])

  return (
    <div className="min-h-screen bg-amber-50 px-4 py-8">
      {/* header */}
      <div className="max-w-3xl mx-auto mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#1a6b3c] hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Back to home</span>
        </button>
      </div>

      {/* main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-md p-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a2a1a] text-center mb-2">
          Identify your dog's breed
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Upload a clear photo of your dog for the most accurate results
        </p>

        {/* upload area */}
        {!preview ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-[#1a6b3c] hover:bg-amber-50/30 transition-all"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                <Upload size={28} className="text-[#1a6b3c]" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  Drop your image here or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports JPG, PNG, WEBP
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* preview */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-96 object-contain"
              />
              <button
                onClick={clearImage}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X size={18} className="text-gray-700" />
              </button>
            </div>

            {/* predict button */}
            {!result && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handlePredict}
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#1a6b3c] text-white text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Predict Breed"
                )}
              </motion.button>
            )}

            {/* error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4"
              >
                <h3 className="text-xl font-bold text-[#1a2a1a]">
                  Prediction Result
                </h3>
                {/* 🚫 Non-dog case */}
                {result.message && !result.predicted_breed ? (
                  <p className="text-red-600 text-center font-medium">
                    {result.message}
                  </p>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Breed:</span>
                        <span className="text-lg font-bold text-[#1a6b3c]">
                          {result.predicted_breed}
                        </span>
                      </div>
                      {result.confidence !== null && result.confidence !== undefined && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">Confidence:</span>
                          <span className="text-lg font-bold text-[#1a2a1a]">
                            {(result.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* info with typing effect - separate from the conditional above */}
                {displayedInfo.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-amber-300">
                    <p className="text-sm font-semibold text-gray-700 mb-2">About this breed:</p>
                    <div className="space-y-1.5">
                      {displayedInfo.map((line, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm text-gray-600"
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={clearImage}
                  className="w-full py-3 rounded-full border-2 border-[#1a6b3c] text-[#1a6b3c] font-semibold hover:bg-[#1a6b3c]/5 transition-colors"
                >
                  Try another image
                </button>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
