import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import './Contact.css'

const Contact = () => {
  const formRef = useRef()
  const captchaRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCaptchaModal, setShowCaptchaModal] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [captchaWidgetId, setCaptchaWidgetId] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields')
      return
    }

    // Open captcha modal
    setShowCaptchaModal(true)
  }

  const submitForm = async (token) => {
    setIsSubmitting(true)

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          'cf-turnstile-response': token,
        },
        publicKey
      )

      alert('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
      setCaptchaToken(null)
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (showCaptchaModal && captchaRef.current) {
      const siteKey = import.meta.env.VITE_CLOUDFLARE_SITE_KEY
      
      if (!siteKey) {
        console.error('Cloudflare site key is missing')
        return
      }

      // Function to load and render Turnstile
      const loadTurnstile = () => {
        if (window.turnstile && captchaRef.current) {
          try {
            const widgetId = window.turnstile.render(captchaRef.current, {
              sitekey: siteKey,
              callback: (token) => {
                setCaptchaToken(token)
                setShowCaptchaModal(false)
                submitForm(token)
              },
              'error-callback': () => {
                console.error('Turnstile error')
              },
            })
            setCaptchaWidgetId(widgetId)
          } catch (error) {
            console.error('Error rendering Turnstile:', error)
          }
        }
      }

      // Check if Turnstile is already loaded
      if (window.turnstile) {
        loadTurnstile()
      } else {
        // Wait for Turnstile script to load
        const checkTurnstile = setInterval(() => {
          if (window.turnstile) {
            clearInterval(checkTurnstile)
            loadTurnstile()
          }
        }, 100)

        // Timeout after 5 seconds
        setTimeout(() => {
          clearInterval(checkTurnstile)
          if (!window.turnstile) {
            console.error('Cloudflare Turnstile failed to load')
          }
        }, 5000)

        // Cleanup interval on unmount
        return () => {
          clearInterval(checkTurnstile)
        }
      }

      // Cleanup function
      return () => {
        if (captchaWidgetId && window.turnstile) {
          try {
            window.turnstile.remove(captchaWidgetId)
          } catch (error) {
            console.error('Error removing Turnstile:', error)
          }
        }
      }
    } else if (!showCaptchaModal && captchaWidgetId && window.turnstile) {
      // Reset captcha when modal closes
      try {
        window.turnstile.remove(captchaWidgetId)
      } catch (error) {
        console.error('Error removing Turnstile:', error)
      }
      setCaptchaWidgetId(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCaptchaModal])

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

  return (
    <section id="contact" className="contact section">
      <motion.div
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Let's collaborate and bring your ideas to life
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div className="contact-info" variants={itemVariants}>
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="info-content">
                <h3>Email</h3>
                <p>info@flynuka.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="info-content">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="info-content">
                <h3>Location</h3>
                <p>Available Worldwide</p>
              </div>
            </div>

            <div className="social-links">
              <motion.a
                href="#"
                className="social-link"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-linkedin"></i>
              </motion.a>
              <motion.a
                href="#"
                className="social-link"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-github"></i>
              </motion.a>
              <motion.a
                href="#"
                className="social-link"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-twitter"></i>
              </motion.a>
            </div>
          </motion.div>

          <motion.form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            <div className="form-group">
              <label htmlFor="name">
                <i className="fas fa-user"></i>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <i className="fas fa-comment"></i>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>

      {/* Cloudflare Captcha Modal */}
      <AnimatePresence>
        {showCaptchaModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCaptchaModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Security Verification</h3>
                <button
                  className="modal-close"
                  onClick={() => setShowCaptchaModal(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <p>Please complete the security verification below:</p>
                <div className="captcha-container">
                  <div ref={captchaRef}></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Contact

