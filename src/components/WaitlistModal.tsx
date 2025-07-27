import React, { useState } from "react";
import { X } from "lucide-react";
import "./WaitlistModal.css";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    // Reset form state when modal is closed
    setIsSubmitted(false);
    setEmail("");
    setName("");
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Prepare form data for Google Apps Script
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("userAgent", navigator.userAgent);
      formData.append("timestamp", new Date().toISOString());
      formData.append("screenResolution", `${screen.width}x${screen.height}`);
      formData.append(
        "timezone",
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );

      // Send to Google Apps Script
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxQmDCJRgnEEOlxdjCstgpXuSCY3JOJWWAEBTItWknjPTgaVx4EKIOJSt9T-hKFGco/exec", // Replace with your NEW URL after redeployment
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.text();

      setIsSubmitted(true);
      setIsSubmitting(false);

      // Don't auto-close - let user manually close the modal
    } catch (error) {
      setError("Failed to join waitlist. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="waitlist-modal-overlay" onClick={handleClose}>
      <div className="waitlist-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="waitlist-modal-close"
          onClick={handleClose}
          aria-label="Close modal"
          title="Close modal"
        >
          <X size={20} />
        </button>

        <div className="waitlist-modal-content">
          {!isSubmitted ? (
            <>
              <h2 className="waitlist-modal-title">Join the Waitlist</h2>
              <p className="waitlist-modal-description">
                Be the first to know when PocketCounselor launches. Get early
                access and exclusive updates!
              </p>

              {error && <div className="waitlist-error">{error}</div>}

              <form onSubmit={handleSubmit} className="waitlist-form">
                <div className="waitlist-form-group">
                  <label htmlFor="waitlist-name">Name</label>
                  <input
                    id="waitlist-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="waitlist-form-group">
                  <label htmlFor="waitlist-email">Email</label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="waitlist-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
            </>
          ) : (
            <div className="waitlist-success">
              <div className="waitlist-success-icon">📧</div>
              <h2 className="waitlist-success-title">Check Your Email!</h2>
              <p className="waitlist-success-description">
                We've sent a verification email to <strong>{email}</strong> from{" "}
                <strong>pocketcounselorco@gmail.com</strong>. Please click the
                verification link to secure your spot on the waitlist.
              </p>
              <p className="waitlist-success-note">
                Don't see it? Check your SPAM folder and ADD
                pocketcounselorco@gmail.com to your contacts for future updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;
