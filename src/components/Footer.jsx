import { motion } from 'framer-motion'
import { FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-brand-green mb-2">
              FlyNuka
            </h3>
            <p className="text-gray-400">Joseph Duguay - Remote Pilot</p>
          </motion.div>

          <motion.div
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="https://instagram.com/flynuka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-green transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>&copy; {currentYear} FlyNuka. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer


