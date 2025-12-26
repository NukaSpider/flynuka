import React from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="hero-icon float-animation"
          variants={itemVariants}
        >
          <i className="fas fa-rocket"></i>
        </motion.div>

        <motion.h1 className="hero-title" variants={itemVariants}>
          Welcome to <span className="gradient-text">FlyNuka</span>
        </motion.h1>

        <motion.p className="hero-subtitle" variants={itemVariants}>
          Personal & Business Excellence Combined
        </motion.p>

        <motion.p className="hero-description" variants={itemVariants}>
          Innovating solutions that bridge personal passion with business success.
          Let's build something extraordinary together.
        </motion.p>

        <motion.div
          className="hero-buttons"
          variants={itemVariants}
        >
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px var(--lime-green-glow)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <i className="fas fa-paper-plane"></i>
            Get Started
          </motion.button>

          <motion.button
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <i className="fas fa-info-circle"></i>
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          className="hero-scroll"
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <i className="fas fa-chevron-down"></i>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero

