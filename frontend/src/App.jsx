import React from "react"
import { Routes, Route } from "react-router-dom"
import "./assets/App.css"
import Landing from "./components/Landing"
import Predict from "./components/Predict"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/predict" element={<Predict />} />
    </Routes>
  )
}

export default App
