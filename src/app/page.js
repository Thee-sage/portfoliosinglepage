"use client";
import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import { GoSmiley } from "react-icons/go";
import { motion,AnimatePresence  } from "framer-motion";
import { LinkPreview } from "./b/linkpreview";
import { MaskContainer } from './b/svg-mask-effect';
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { IoIosLink } from "react-icons/io";
import Link from "next/link";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { MdOutlinePhotoCamera } from "react-icons/md";

const ProjectCard = ({description, title, linky,techstackline1a,techstackline1b,techstackline1c,techstackline2a,techstackline2b}) => {
  return (

    <div className={styles.projectscontainer}>
      <div className={styles.projectscontent}>
        <div className={styles.extracontainer1}>
      <div className={styles.extracontainer2}>
          <div className={styles.projectsdescriptioncontainer}>
           <div> {description}</div>
            </div>
      
          
            <div className={styles.prline1}>
              
              <div className={styles.prline4}>
              <div className={styles.prline3}>{techstackline1a}</div>
              <div className={styles.prline3}>{techstackline1b}</div>
              </div>

              <div className={styles.prline5}>
              <div className={styles.prline3}>{techstackline2a}</div>
              <div className={styles.prline3}>{techstackline2b}</div>
              <div className={styles.prline3}>{techstackline1c}</div>
              </div>

            </div>
          </div>
          <div>
          <LinkPreview
          className={styles.projectlink}
            url={linky}
          >
            <div className={styles.projectname}>{title}</div>
            
          </LinkPreview>
          </div>
          </div>
        </div>
        </div>      
  
  );
};


const  AnimatedLines = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/mongo', { cache: 'no-store' });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchData(); // Initial fetch
  
    const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds
  
    return () => clearInterval(intervalId); // Cleanup
  }, []);
  

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 600);
    }

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const { age, biography, whatchaboydoing, photo, projects } = userData;

  const handlePrevious = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

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
         
          <div className={styles.top1}>
          <MaskContainer
      revealText={
        <motion.div
        className={styles.h1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3}} 
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
        transition={{ duration: 5}} 
      >
            <div className={styles.aboutme1}>About Me?</div>
        <div className={styles.headline}>I make designs real.</div>
      </motion.div>
    </MaskContainer>
          </div>
          
          
          <div className={styles.extracontainer0}>
          <div className={styles.extracontainer0a}>
         
           <AnimatePresence>
            <div className={styles.namecontainer}>
              <div className={styles.namecontainer1}>
                <div className={styles.GoSmiley}><GoSmiley className={styles.smile} /></div>
                <div className={styles.name}> Abhijeet Singh </div>
                <motion.div className={styles.line2}
                  initial={{ height: 0 }}
                  animate={{ height: '96px' }}
                  transition={{ duration: 1}}>

                <motion.div className={styles.linecontainer}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}>
        <motion.div
          className={styles.line}
          initial={{ width: 0 }}
          animate={{ width: '20px' }}
          transition={{ duration: 2 ,delay:2}}
        />
        FullstackDev

      </motion.div>

      <motion.div
        className={styles.proficiency}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4}} // Delay to start after first animation
      >
        <motion.div
          className={styles.line}
          initial={{ width: 0 }}
          animate={{ width: '20px' }}
          transition={{ duration: 2,delay:4 }}
        />
        Proficiency:Frontend
      </motion.div>


      <motion.div
        className={styles.age}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 6 }} // Delay to start after second animation
      >
        <motion.div
          className={styles.line}
          initial={{ width: 0 }}
          animate={{ width: '20px' }}
          transition={{ duration: 2,delay:6 }}
        />
        Age:{age}
      </motion.div>
    </motion.div> 
              </div>
            </div>
            </AnimatePresence>

            
          </div>
          </div>

          <div>
          <div className={styles.extracontainer3}>
            <div className={styles.imagecontainer}>
            <div className={styles.GoSmiley1}><MdOutlinePhotoCamera className={styles.smile1} /></div>
              <div className={styles.extracontainer4}>
                <div>
              <img className={styles.extracontainer5} src={photo}  />
              </div>
            </div>
            </div>
          </div>

          <div className={styles.extracontainer6}>
            <div className={styles.biocontainer}>
              <div>
              <div className={styles.bio}>
                {biography}
                </div>
              </div>
            </div>
          </div>
          </div>
         <div className={styles.extracontainer7}>
         <div className={styles.extracontainer8}>
          <div className={styles.techstackcontainer}>

            <div className={styles.techstack}>
              <div className={styles.techstackname}>Tech Stack</div>
              <div className={styles.whatidoitwith}>Navigating My Tech Landscape</div>
            <div className={styles.extracontainer9} >
            
            <div>
            <div className={styles.nextjs1}>
            <img src="./nextjs.svg" className={styles.nextjs} alt="nextjs" />
            <div className={styles.nextjs2}>Nextjs</div>
            </div>

            <div className={styles.nextjs1}>
              <img src="./react.svg" className={styles.nextjs} alt="React" />
            <div className={styles.nextjs2}>React</div>
            </div>

            <div className={styles.nextjs1}>
              <img src="./firebase.svg" className={styles.nextjs} alt="firebase" />
            <div className={styles.nextjs2}>Firebase</div>
            </div>

            <div className={styles.nextjs1}>
              <img src="./tailwind.svg" className={styles.nextjs} alt="tailwind" />
            <div className={styles.nextjs2}>Tailwind</div>
            </div>
            </div>

            <div  className={styles.extracontainer10}>
            <div className={styles.nextjs1}>
            <img src="./mongodb.svg" className={styles.nextjs} alt="mongodb" />
            <div className={styles.nextjs2}>MongoDB</div>
            </div>

            <div className={styles.nextjs1}>
              <img src="./figma.svg" className={styles.nextjs} alt="Figma" />
            <div className={styles.nextjs2}>Figma</div>
            </div>

            <div className={styles.nextjs1}>
              <img src="./node.svg" className={styles.nextjs} alt="node" />
            <div className={styles.nextjs2}>Node Js</div>
            </div>

            <div className={styles.nextjs1}>
              <img src="./solidity.svg" className={styles.nextjs} alt="tailwind" />
            <div className={styles.nextjs2}>Solidity</div>
            </div>
            </div>

            </div>
            
            </div>

              </div>
              </div>

              <div  className={styles.extracontainer11} >
                <div className={styles.experiencecontainer}>
                  <div className={styles.experiencedescriptioncontainer1}>
                  <div className={styles.extracontainer12}>
                  <div className={styles.GoSmiley}><PiSuitcaseSimpleLight /></div>
                  <div className={styles.extracontainer13}>&</div>
                  <div className={styles.GoSmiley}><IoIosLink /></div>
                  </div>
                  <div className={styles.certifications}>Current status & Links</div>
                  <div className={styles.extracontainer14}>
                  <div className={styles.currentstatus}>
                    {whatchaboydoing}
                  </div>
                  <div className={styles.sociallinks}>
                  <div className={styles.nextjs1}>
            <img src="./github.svg" className={styles.nextjs} alt="github" />
            <div className={styles.nextjs2}>
            <Link href="https://github.com/Thee-sage">Github</Link>
            </div>

            </div>
            <div className={styles.nextjs1}>
            <img src="./youtube.svg" className={styles.nextjs} alt="youtube" />
            <div className={styles.nextjs2}>
            <Link href="https://www.youtube.com/@kagaminiutsuru">Youtube</Link>
            </div>

            </div>
            <div className={styles.nextjs1}>
            <img src="./linkedin.svg" className={styles.nextjs} alt="linkedin" />
            <div className={styles.nextjs2}>
            <Link href="https://www.linkedin.com/in/abhijeet-singh-b0836b254/">LinkedIn</Link>
            </div>

            </div>
            <div className={styles.nextjs1}>
            <img src="./x.svg" className={styles.nextjs} alt="x" />
            <div className={styles.nextjs2}>
            <Link href="https://x.com/AbhijeetS_878">X</Link>
            </div>

            </div>
                  

            </div>
            </div>
                </div>
              </div>
              </div> 


            </div>


          <div className={styles.extracontainer15}>
            <div className={styles.extracontainer16}>
             <div className={styles.extracontainer12}>
            
                    <AnimatePresence>
                      {displayedProjects.map((project, index) => (
                        <motion.div key={index} className={styles.extracontainer13} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                          <ProjectCard {...project} />
                        </motion.div>
                      ))}
                    
                    </AnimatePresence>
           
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' ,flexDirection: 'row',position:"relative"}}>
              <div className={styles.extracontainer21}>
              <div onClick={handlePrevious} className={styles.button1}>
              <button  className={styles.navButton}><GrFormPrevious /></button>
              <div>Previous</div>
              </div>
              </div>
              <div className={styles.extracontainer20}>
              <div onClick={handleNext} className={styles.button2}>
              <button  className={styles.navButton}><GrFormNext /></button>
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
