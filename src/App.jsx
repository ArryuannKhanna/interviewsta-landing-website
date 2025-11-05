import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home.jsx'
import AboutUs from './Components/AboutUs.jsx'
// import Features from './Components/Features.jsx'
import VideoInterviewsPage from './Components/VideoInterviewsPage.jsx'
import Contact from './Components/ContactUs.jsx'
import TermsOfService from './Components/TermsofService.jsx'
import PrivacyPolicy from './Components/PrivacyPolicy.jsx'
import ResumeAnalysisPage from './Components/ResumeAnalysisPage.jsx'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Dashboard from './Components/Dashboard.jsx'

import ScrollToTop from './ScrollToTop/ScrollToTop.jsx'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { i } from 'framer-motion/client'

function App() {
  const [count, setCount] = useState(0);
  const Layout = () => {
    return (
      <>
        <ScrollToTop />
        <Header />
        <Outlet />
        <Footer />
      </>  
    )
  }
  const router = createBrowserRouter([
    { path: "/", element: <Layout /> , children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <AboutUs /> },
    // { path: "/features", element: <Features /> },
      { path: "/video-interviews", element: <VideoInterviewsPage /> },
      { path: "/resume-analysis", element: <ResumeAnalysisPage /> },
      { path: "/contact", element: <Contact /> },
      { path: "/terms-of-service", element: <TermsOfService /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/dashboard", element: <Dashboard /> }
    ]},
    
    // Add more routes here as needed
  ]);

  return (
      <RouterProvider router={router} />
  )
}

export default App
