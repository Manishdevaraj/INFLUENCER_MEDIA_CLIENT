//@ts-nocheck

import React from 'react'
import {Header }from "./header"
import {AboutSection} from "./about-section"
import {HeroSection} from "./hero-section"
import{ FeaturesSection} from "./features-section"
import {Footer} from "./footer"


const HomePage = () => {
  return (
      <>
            <Header />
            <main>
              <HeroSection  />
              <AboutSection  />
              <FeaturesSection />
              <FeaturesSection />
            </main>
            <Footer />
          </>
  )
}

export default HomePage
