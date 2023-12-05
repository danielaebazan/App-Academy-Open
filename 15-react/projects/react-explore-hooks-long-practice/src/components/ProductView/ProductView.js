import React from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'
import {useState, useEffect} from 'react'

function ProductView({ products }) {

  // TODO: Replace with state variable
  const [sideOpen, setSideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('')
  useEffect(() => {
    console.log('opening, sideOpen = ',localStorage.getItem('sideOpen'));
    if (  localStorage.getItem('sideOpen') === 'true' ||localStorage.getItem('sideOpen') === null) setSideOpen(true)
  }, []);
 
  useEffect(() => {
    console.log(' opening side');
    if (selectedProduct) setSideOpen(true);
  }, [selectedProduct]);
  useEffect(() => {
    console.log('deselect prods');
    if (!sideOpen) setSelectedProduct('');

    // saving state
    localStorage.setItem('sideOpen', sideOpen ? 'true': 'false')
  }, [sideOpen]);
console.log('-----------')
  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              isSelected = {selectedProduct.id === item.id ? true : false }
              onClick={() => {
                  console.log('SELECT PRODUCT', item)
                  setSelectedProduct(item);                 
                }
              }
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
               onClick={() =>{ 
                setSideOpen(!sideOpen)
                console.log('TOGGLE SIDE PANEL');
                return}}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails visible={sideOpen} product={selectedProduct} />
      </div>
    </div>
  );
}

export default ProductView;