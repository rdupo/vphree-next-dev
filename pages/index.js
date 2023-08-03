import React from 'react'
import Header from  '../components/Header'
import Footer from '../components/Footer'
import { Silkscreen, Montserrat } from 'next/font/google'

export default function Home() {
  return (
    <>
      <Header/>
      <div className="content home-bg">
        <div className="home-wrapper">
          <h2 className="home-title v3-txt">Welcome to vPhree</h2>
          <p className="home-body w-75">vPhree is a phee-phree marketplace to buy and sell v3 Phunks</p>
          <div>
            <a href="/collections/v3-phunks">
              <button className="cta v3-bg v3-b black-txt">v3 Marketplace</button>
            </a>
            <a href="/view-all/v3-phunks-alt">
              <button className="cta v3-b black-bg v3-txt">View All v3s</button>
            </a>
          </div>
        </div>
      </div>
      <Footer/>      
    </>
  )
}