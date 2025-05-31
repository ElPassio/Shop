import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function products() {
     let productlist = [];
      const fetchApi = async () => {
          const response = await axios.get('http://localhost:3000/api/products')
          response.data.forEach(product => {
            productlist.push({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              stock: product.stock
            });
          })
        }
        useEffect(() => {
          fetchApi()
        })
        console.log(productlist);
  return (
    <div>products</div>
  )
}

export default products