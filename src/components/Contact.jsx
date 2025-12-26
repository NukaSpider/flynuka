import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaPhone, FaInstagram } from 'react-icons/fa'
import CloudflareTurnstile from './CloudflareTurnstile'
import { CLOUDFLARE_TURNSTILE_SITE_KEY } from '../config/cloudflare'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const contactInfo = [
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+1 (719) 666-1812',
      href: 'tel:+17196661812',
      color: 'text-brand-green',
    },
    {
      icon: FaInstagram,
      label: 'Instagram',
      value: '@flynuka',
      href: 'https://instagram.com/flynuka',
      color: 'text-brand-green',
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 md:py-32 px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Decorative Curved Shapes - matching card design */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[500px] bg-brand-green/8"
          style={{
            clipPath: 'ellipse(80% 70% at 85% 10%)',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[400px] h-[700px] bg-brand-green/5"
          style={{
            clipPath: 'ellipse(60% 90% at 90% 80%)',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get In <span className="text-brand-green">Touch</span>
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mt-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to elevate your project? Let's discuss how we can help.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {contactInfo.map((contact, index) => {
            const Icon = contact.icon
            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row items-center md:items-start md:space-x-6 space-y-4 md:space-y-0"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.6, delay: 0.5 + index * 0.15, ease: 'easeOut' }}
              >
                <div className="w-20 h-20 bg-brand-green/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-green/20 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                  <Icon className={`w-10 h-10 ${contact.color}`} />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-semibold">{contact.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {contact.value}
                  </p>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Cloudflare Turnstile Protection */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <CloudflareTurnstile
            siteKey={CLOUDFLARE_TURNSTILE_SITE_KEY}
            onVerify={(token) => {
              console.log('Turnstile verified:', token)
            }}
            onError={(error) => {
              console.error('Turnstile error:', error)
            }}
          />
        </motion.div>

        {/* Additional CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            Available for projects nationwide. Licensed and insured.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact


