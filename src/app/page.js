"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { GoSmiley } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { LinkPreview } from "./b/linkpreview";
import { MaskContainer } from "./b/svg-mask-effect";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { IoIosLink } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { MdOutlinePhotoCamera } from "react-icons/md";

// ── Project card ─────────────────────────────────────────────────────────────
const ProjectCard = ({
  description,
  title,
  linky,
  techstackline1a,
  techstackline1b,
  techstackline1c,
  techstackline2a,
  techstackline2b,
}) => {
  return (
    <div className={styles.projectscontainer}>
      <div className={styles.projectscontent}>
        <div className={styles.extracontainer1}>
          <div className={styles.extracontainer2}>
            <div className={styles.projectsdescriptioncontainer}>
              <div>{description}</div>
            </div>

            <div className={styles.prline1}>
              <div className={styles.prline4}>
                <div className={styles.prline3a}>{techstackline1a}</div>
                <div className={styles.prline3b}>{techstackline1b}</div>
              </div>

              <div className={styles.prline5}>
                <div className={styles.prline3c}>{techstackline2a}</div>
                <div className={styles.prline3d}>{techstackline2b}</div>
                <div className={styles.prline3e}>{techstackline1c}</div>
              </div>
            </div>

            <div className={styles.linkname}>
              <LinkPreview className={styles.projectlink} url={linky}>
                <div className={styles.projectname}>{title}</div>
              </LinkPreview>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Skeleton loader ───────────────────────────────────────────────────────────
const Skeleton = ({ w, h, radius = 12 }) => (
  <div
    className={styles.skeleton}
    style={{ width: w, height: h, borderRadius: radius }}
  />
);

const LoadingSkeleton = () => (
  <div className={styles.actual}>
    <div className={styles.main}>
      <div className={styles.whitebox}>
        {/* Hero shimmer */}
        <div className={styles.top1}>
          <Skeleton w={320} h={28} />
          <div style={{ marginTop: 10 }}>
            <Skeleton w={240} h={20} />
          </div>
        </div>

        {/* Name card */}
        <div
          className={styles.extracontainer0}
          style={{ display: "flex", gap: 16 }}
        >
          <Skeleton w={400} h={240} radius={24} />
          <Skeleton w={600} h={520} radius={24} />
          <Skeleton w={400} h={240} radius={24} />
        </div>
      </div>
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const AnimatedLines = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/mongo");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 600);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <LoadingSkeleton />;

  if (error)
    return (
      <div className={styles.errorState}>
        <span>⚠️ Could not load data</span>
        <small>{error}</small>
      </div>
    );

  const { age, biography, whatchaboydoing, projects } = userData;

  const handlePrevious = () =>
    setCurrentProjectIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
  const handleNext = () =>
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);

  const displayedProjects = isSmallScreen
    ? [projects[currentProjectIndex]]
    : [
        projects[currentProjectIndex],
        projects[(currentProjectIndex + 1) % projects.length],
      ];

  return (
    <div className={styles.actual}>
      <div className={styles.main}>
        <div className={styles.whitebox}>
          {/* ── Hero / mask ── */}
          <div className={styles.top1}>
            <MaskContainer
              revealText={
                <motion.div
                  className={styles.h1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2 }}
                >
                  <div className={styles.aboutme}>Welcome,</div>
                  <div className={styles.headline1}>To my personal page.</div>
                </motion.div>
              }
            >
              <motion.div
                className={styles.h1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <div className={styles.aboutme1}>About Me?</div>
                <div className={styles.headline}>I make designs real.</div>
              </motion.div>
            </MaskContainer>
          </div>

          {/* ── Name card ── */}
          <div className={styles.extracontainer0}>
            <div className={styles.extracontainer0a}>
              <AnimatePresence>
                <div className={styles.namecontainer}>
                  <div className={styles.namecontainer1}>
                    <div className={styles.GoSmiley}>
                      <GoSmiley className={styles.smile} />
                    </div>
                    <div className={styles.name}> Abhijeet Singh </div>
                    <motion.div
                      className={styles.line2}
                      initial={{ height: 0 }}
                      animate={{ height: "96px" }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        className={styles.linecontainer}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <motion.div
                          className={styles.line}
                          initial={{ width: 0 }}
                          animate={{ width: "20px" }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        />
                        FullstackDev
                      </motion.div>

                      <motion.div
                        className={styles.proficiency}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                      >
                        <motion.div
                          className={styles.line}
                          initial={{ width: 0 }}
                          animate={{ width: "20px" }}
                          transition={{ duration: 0.5, delay: 1 }}
                        />
                        Proficiency:Frontend
                      </motion.div>

                      <motion.div
                        className={styles.age}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                      >
                        <motion.div
                          className={styles.line}
                          initial={{ width: 0 }}
                          animate={{ width: "20px" }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                        />
                        Age:{age}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Photo + Bio row ── */}
          <div>
            <div className={styles.extracontainer3}>
              <div className={styles.imagecontainer}>
                <div className={styles.GoSmiley1}>
                  <MdOutlinePhotoCamera className={styles.smile1} />
                </div>
                <div className={styles.extracontainer4}>
                  <div>
                    <Image
                      className={styles.extracontainer5}
                      src="/profilepic.jpg"
                      alt="Abhijeet Singh profile photo"
                      width={480}
                      height={480}
                      priority
                      sizes="(max-width:726px) 140px, 480px"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.extracontainer6}>
              <div className={styles.biocontainer}>
                <div>
                  <div className={styles.bio}>{biography}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Tech stack + Current status ── */}
          <div className={styles.extracontainer7}>
            <div className={styles.extracontainer8}>
              <div className={styles.techstackcontainer}>
                <div className={styles.techstack}>
                  <div className={styles.techstackname}>Tech Stack</div>
                  <div className={styles.whatidoitwith}>
                    Navigating My Tech Landscape
                  </div>
                  <div className={styles.extracontainer9}>
                    <div>
                      {[
                        { src: "./nextjs.svg", label: "Nextjs" },
                        { src: "./react.svg", label: "React" },
                        { src: "./firebase.svg", label: "Firebase" },
                        { src: "./tailwind.svg", label: "Tailwind" },
                      ].map(({ src, label }) => (
                        <div key={label} className={styles.nextjs1}>
                          <img
                            src={src}
                            className={styles.nextjs}
                            alt={label}
                            loading="lazy"
                          />
                          <div className={styles.nextjs2}>{label}</div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.extracontainer10}>
                      {[
                        { src: "./mongodb.svg", label: "MongoDB" },
                        { src: "./figma.svg", label: "Figma" },
                        { src: "./node.svg", label: "Node Js" },
                        { src: "./solidity.svg", label: "Solidity" },
                      ].map(({ src, label }) => (
                        <div key={label} className={styles.nextjs1}>
                          <img
                            src={src}
                            className={styles.nextjs}
                            alt={label}
                            loading="lazy"
                          />
                          <div className={styles.nextjs2}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.extracontainer11}>
              <div className={styles.experiencecontainer}>
                <div className={styles.experiencedescriptioncontainer1}>
                  <div className={styles.extracontainer12}>
                    <div className={styles.GoSmiley}>
                      <PiSuitcaseSimpleLight />
                    </div>
                    <div className={styles.extracontainer13}>&</div>
                    <div className={styles.GoSmiley}>
                      <IoIosLink />
                    </div>
                  </div>
                  <div className={styles.certifications}>
                    Current status &amp; Links
                  </div>
                  <div className={styles.extracontainer14}>
                    <div className={styles.currentstatus}>
                      {whatchaboydoing}
                    </div>
                    <div className={styles.sociallinks}>
                      {[
                        {
                          src: "./github.svg",
                          label: "Github",
                          href: "https://github.com/Thee-sage",
                        },
                        {
                          src: "./youtube.svg",
                          label: "Youtube",
                          href: "https://www.youtube.com/@kagaminiutsuru",
                        },
                        {
                          src: "./linkedin.svg",
                          label: "LinkedIn",
                          href: "https://www.linkedin.com/in/abhijeet-singh-b0836b254/",
                        },
                        {
                          src: "./x.svg",
                          label: "X",
                          href: "https://x.com/AbhijeetS_878",
                        },
                      ].map(({ src, label, href }) => (
                        <div key={label} className={styles.nextjs1}>
                          <img
                            src={src}
                            className={styles.nextjs}
                            alt={label}
                            loading="lazy"
                          />
                          <div className={styles.nextjs2}>
                            <Link href={href}>{label}</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Projects carousel ── */}
          <div className={styles.extracontainer15}>
            <div className={styles.extracontainer16}>
              <div className={styles.extracontainer12}>
                <AnimatePresence mode="wait">
                  {displayedProjects.map((project, index) => (
                    <motion.div
                      key={`${currentProjectIndex}-${index}`}
                      className={styles.extracontainer13}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectCard {...project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  position: "relative",
                }}
              >
                <div className={styles.extracontainer21}>
                  <div onClick={handlePrevious} className={styles.button1}>
                    <button className={styles.navButton}>
                      <GrFormPrevious />
                    </button>
                    <div>Previous</div>
                  </div>
                </div>
                <div className={styles.extracontainer20}>
                  <div onClick={handleNext} className={styles.button2}>
                    <button className={styles.navButton}>
                      <GrFormNext />
                    </button>
                    <div>Next</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLines;
