import React from 'react'
import { useParams } from 'react-router-dom'

const ProductDescription = () => {
    const {id} = useParams();
    
  return (
    <div>ProductDescription</div>
  )
}

export default ProductDescription