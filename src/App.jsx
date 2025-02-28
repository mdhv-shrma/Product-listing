import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Products from './components/Products'
import ProductDescription from './components/ProductDescription';
import Home from './pages/Home';

function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Suspense fallback={<h2>Loading....</h2>}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:id" element={<ProductDescription/>}/>
        </Routes>
      </Suspense>
    </Router>
    </>
  )
}

export default App
