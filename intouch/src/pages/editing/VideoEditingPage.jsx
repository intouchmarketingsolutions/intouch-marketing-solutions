import React from "react";
import {
  FaBoxOpen,
  FaBuilding,
  FaBullhorn,
  FaCalendarCheck,
  FaCloudUploadAlt,
  FaComments,
  FaCut,
  FaFilm,
  FaMagic,
  FaMusic,
  FaPalette,
  FaPhotoVideo,
  FaPlay,
  FaRocket,
  FaSearch,
  FaYoutube,
} from "react-icons/fa";
import SEO from "../../components/SEO/SEO";
import "./VideoEditingPage.css";
import VideoCoverflow from "./VideoCoverflow";

import video1 from "../../assets/editing/V1.mp4";
import video2 from "../../assets/editing/V2.mp4";
import video3 from "../../assets/editing/V3.mp4";
import video4 from "../../assets/editing/V4.mp4";
import video5 from "../../assets/editing/V5.mp4";

const heroFeatures = [
  { icon: FaCut, label: "Cinematic Editing" },
  { icon: FaPalette, label: "Color Grading" },
  { icon: FaMusic, label: "Audio Enhancement" },
  { icon: FaMagic, label: "Motion Graphics" },
];

const services = [
  {
    icon: FaFilm,
    title: "Reels & Shorts",
    text: "High-converting short-form videos optimized for engagement.",
  },
  {
    icon: FaYoutube,
    title: "YouTube Videos",
    text: "Professional long-form storytelling and editing.",
  },
  {
    icon: FaBoxOpen,
    title: "Product Videos",
    text: "Showcase products with premium visuals and storytelling.",
  },
  {
    icon: FaBullhorn,
    title: "Advertisement Videos",
    text: "Performance-focused creatives built for conversions.",
  },
  {
    icon: FaBuilding,
    title: "Corporate Videos",
    text: "Professional videos for brands and businesses.",
  },
  {
    icon: FaCalendarCheck,
    title: "Event Highlights",
    text: "Cinematic edits that capture every important moment.",
  },
];

const process = [
  {
    icon: FaSearch,
    title: "Requirement Analysis",
    text: "Understand goals and audience.",
  },
  {
    icon: FaPhotoVideo,
    title: "Editing & Storytelling",
    text: "Structure content with engaging pacing.",
  },
  {
    icon: FaPalette,
    title: "Color & Audio",
    text: "Professional enhancement and polishing.",
  },
  {
    icon: FaComments,
    title: "Review & Revisions",
    text: "Client feedback and revisions.",
  },
  {
    icon: FaCloudUploadAlt,
    title: "Final Delivery",
    text: "High-quality exports for all platforms.",
  },
];

const showcaseVideos = [
  {
    src: video1,
    title: "Jewelry Ad Video",
    category: "Luxury | Branding | Advertisement",
  },
  {
    src: video2,
    title: "Food Promo Video",
    category: "Restaurant | Promo | Social Media",
  },
  {
    src: video3,
    title: "Fashion Promo",
    category: "Lifestyle | Fashion | Promo",
  },
  {
    src: video4,
    title: "Sports Reel",
    category: "Action | Sports | Highlights",
  },
  {
    src: video5,
    title: "Brand Story Video",
    category: "Business | Campaign | Social Media",
  },
];

export default function VideoEditingPage() {
  return (
    <div className="videoPage">
      <SEO
        title="Video Editing Services | Intouch Marketing Solutions - Udupi, Karnataka"
        description="Professional video editing services for brands, social media and ad campaigns - reels, brand stories, promos and more from Intouch Marketing Solutions."
        path="/services/video-editing"
      />

      <section className="videoHero">

        <div className="videoHeroContent">

        

          <h1>
            Powerful <span>Edits.</span>
            <br />
            Stronger <span>Impact.</span>
          </h1>

          <p>
            Transforming raw footage into engaging videos that
            captivate audiences, increase engagement and drive
            business growth.
          </p>

          <div className="heroButtons">
            <a href="/start-project?service=11" className="primaryBtn">
              <FaRocket /> Start Your Project
            </a>
          </div>

          <div className="featureRow">
            {heroFeatures.map(({ icon: Icon, label }) => (
              <div className="featureItem" key={label}>
                <Icon />
                <span>{label}</span>
              </div>
            ))}
          </div>

        </div>

        <VideoCoverflow videos={showcaseVideos} />

      </section>

      <section className="servicesSection">

        <div className="sectionHeading">
          <h2>What We Edit</h2>
          <span />
        </div>

        <div className="serviceGrid">
          {services.map(({ icon: Icon, title, text }) => (
            <div className="serviceCard" key={title}>
              <div className="serviceIcon">
                <Icon />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      <section className="processSection">

        <div className="sectionHeading">
          <h2>Our Editing Process</h2>
          <span />
        </div>

        <div className="processGrid">
          {process.map(({ icon: Icon, title, text }, index) => (
            <div className="stepCard" key={title}>
              <span className="stepNumber">{String(index + 1).padStart(2, "0")}</span>
              <Icon className="stepIcon" />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
