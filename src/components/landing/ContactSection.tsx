import React from "react";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import "../../styles/components/landing/ContactSection.scss";

const ContactSection: React.FC = () => {
  // Get Formspree form ID from environment variables
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_FORM_ID);
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-header__title">Get in Touch</h2>
          <p className="contact-header__description">
            Have questions about PocketCounselor? We're here to help!
          </p>
        </div>
        <div className="contact-main-grid">
          {/* Contact Information Card */}
          <div className="contact-card">
            <h3 className="contact-header__title">Contact Information</h3>
            <div className="contact-info-block">
              <Mail className="contact-info-icon" />
              <div>
                <div className="contact-info-title">Email</div>
                <div className="contact-info-desc">
                  support@pocketcounselor.org
                </div>
              </div>
            </div>
            <div className="contact-info-block">
              <Phone className="contact-info-icon" />
              <div>
                <div className="contact-info-title">Phone</div>
                <div className="contact-info-desc">+1 (916) 282-9145</div>
              </div>
            </div>
            
          </div>
          {/* Send a Message Card */}
          <div className="contact-card">
            <h3 className="contact-header__title">Send a Message</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <label className="contact-label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="contact-input"
                  type="text"
                  placeholder="Your name"
                  required
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                />
              </div>
              <div>
                <label className="contact-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="contact-input"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
              <div>
                <label className="contact-label" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="contact-textarea"
                  rows={4}
                  placeholder="Type your message..."
                  required
                ></textarea>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>
              <button
                type="submit"
                className="contact-submit-btn"
                disabled={state.submitting}
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>

              {/* Status Messages */}
              {state.succeeded && (
                <div className="contact-status contact-status--success">
                  <CheckCircle size={20} />
                  <span>
                    Message sent successfully! We'll get back to you soon.
                  </span>
                </div>
              )}

              {state.errors && (
                <div className="contact-status contact-status--error">
                  <AlertCircle size={20} />
                  <span>
                    Failed to send message. Please try again or email us
                    directly.
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
