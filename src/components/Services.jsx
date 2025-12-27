import React from 'react'
import { motion } from 'framer-motion'
import './Services.css'

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  const services = [
    {
      icon: 'fa-laptop-code',
      title: 'Web Development',
      description: 'Custom web solutions tailored to your needs',
      features: ['Responsive Design', 'Modern Frameworks', 'Performance Optimized'],
    },
    {
      icon: 'fa-mobile-alt',
      title: 'Mobile Solutions',
      description: 'Native and cross-platform mobile applications',
      features: ['iOS & Android', 'Cross-platform', 'Native Performance'],
    },
    {
      icon: 'fa-chart-line',
      title: 'Business Strategy',
      description: 'Data-driven strategies for growth and success',
      features: ['Analytics', 'Planning', 'Execution'],
    },
    {
      icon: 'fa-palette',
      title: 'Creative Design',
      description: 'Beautiful, intuitive designs that engage users',
      features: ['UI/UX Design', 'Branding', 'Visual Identity'],
    },
  ]

  return (
    <section id="services" className="services section gradient-bg">
      <motion.div
        className="services-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <h2 className="section-title">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive solutions to elevate your business
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -10 }}
            >
              <div className="service-icon">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Services


