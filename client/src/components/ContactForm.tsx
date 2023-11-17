import { useState } from 'react'
import { ContactInquiry } from '../types'

const ContactForm = () => {

  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [formData, setFormData] = useState<ContactInquiry>({
    email: '',
    title: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(formData => {
      return {
        ...formData,
        [id]: value
      }
    })
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()

    console.log(formData)
    setFormData({
      email: '',
      title: '',
      message: ''
    })
  }

  return (
    <form className="ContactForm" onSubmit={handleSubmit}>
      <h3 className="heading-1">Contact Us</h3>
      <p className="body">Do you have any questions or thoughts you would like to share with us? Let us know!</p>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="input-group">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} />
      </div>
      <div className="input-group">
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" value={formData.message} onChange={handleChange}></textarea>
      </div>
      <button className="btn btn-primary">Send</button>
      { showSuccess && <p className='success-message'>Your message has been successfully sent.</p>}
      { showError && <p className='error-message'>There was an error when sending your message.</p>}
    </form>
  )
}

export default ContactForm