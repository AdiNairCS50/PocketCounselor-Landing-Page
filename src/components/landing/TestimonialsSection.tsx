import React, { useEffect, useRef, useState } from "react";
import { IonCard, IonCardContent } from "@ionic/react";
import "../../styles/components/landing/TestimonialSection.scss";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  rating: number;
  isVisible?: boolean;
  delay?: number;
}

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  name,
  role,
  rating,
  isVisible = false,
  delay = 0,
}) => {
  return (
    <IonCard
      className={`testimonial-card ${isVisible ? "animate-fade-in-up" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <IonCardContent>
        {/* Rating stars */}
        <div className="testimonial-rating">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`${i < rating ? "filled" : "empty"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <p className="testimonial-quote">"{quote}"</p>

        <div className="testimonial-author">
          <div className="testimonial-author__avatar">{name.charAt(0)}</div>
          <div>
            <div className="testimonial-author__name">{name}</div>
            <div className="testimonial-author__role">{role}</div>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

const TestimonialsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "John Doe",
      role: "High School Student",
      rating: 5,
    },
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Jane Smith",
      role: "Parent",
      rating: 5,
    },
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Alex Johnson",
      role: "Counselor",
      rating: 5,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      className="testimonials-section"
      id="testimonials"
      ref={sectionRef}
    >
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2
            className={`testimonials-header__title ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          >
            What Our Users Say
          </h2>
          <p
            className={`testimonials-header__description ${
              isVisible ? "animate-fade-in-up animation-delay-200" : ""
            }`}
          >
            PocketCounselor aims to helps thousands of students struggling to
            find the right resources to succeed in high school and beyond.
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              rating={testimonial.rating}
              isVisible={isVisible}
              delay={400 + index * 200} // Start at 400ms, then 200ms apart
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
