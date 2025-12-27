import React from 'react'
import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  const skills = [
    { icon: 'fa-code', title: 'Development', description: 'Full-stack expertise' },
    { icon: 'fa-paint-brush', title: 'Design', description: 'Creative solutions' },
    { icon: 'fa-lightbulb', title: 'Innovation', description: 'Cutting-edge ideas' },
    { icon: 'fa-handshake', title: 'Collaboration', description: 'Team-oriented approach' },
  ]

  return (
    <section id="about" className="about section">
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Passionate professional combining personal drive with business excellence
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div className="about-text" variants={itemVariants}>
            <p>
              Welcome to my world where innovation meets execution. I'm a dedicated
              professional who believes in the power of combining personal passion with
              business acumen to create exceptional results.
            </p>
            <p>
              With a commitment to excellence and a forward-thinking approach, I work
              to deliver solutions that not only meet but exceed expectations. Every
              project is an opportunity to push boundaries and create something remarkable.
            </p>
          </motion.div>

          <motion.div
            className="skills-grid"
            variants={containerVariants}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="skill-icon">
                  <i className={`fas ${skill.icon}`}></i>
                </div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default About


