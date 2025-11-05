import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Brain, Menu, User, Bell, LogOutIcon, UserIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, hover } from "framer-motion";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState(false);
  const [currentHoveredItem, setCurrentHoveredItem] = useState(null);
  const Navigate = useNavigate();
  const navMenuRef = useRef(null);
  const profileRef = useRef(null);
  const profileVisRef = useRef(null);
  const navMenuVisRef = useRef(null);
  const currentSection = useLocation();
  // const {state,dispatch} = useVideoInterview();
  // console.log(currentSection.pathname);
  // console.log("Header rendered");
  useEffect(() => {
    if (toggleMenu) {
      navMenuRef.current.classList.remove("hidden");
      navMenuVisRef.current.classList.add(
        "bg-blue-50",
        "text-blue-600",
        "shadow-sm"
      );
    } else {
      navMenuRef.current.classList.add("hidden");
      navMenuVisRef.current.classList.remove(
        "bg-blue-50",
        "text-blue-600",
        "shadow-sm"
      );
    }
  }, [toggleMenu]);

  // useEffect(() => {
  //   if (toggleProfile) {
  //     profileRef.current.classList.remove("hidden");
  //     profileVisRef.current.classList.add("text-blue-600");
  //   } else {
  //     profileRef.current.classList.add("hidden");
  //     profileVisRef.current.classList.remove("text-blue-600");
  //   }
  // }, [toggleProfile]);

  const handleSignOut = async () => {};

  const companyLinks = [{name:'About Us', link:'/about'}, {name:'Careers', link:'/about'}, {name:'Contact', link:'/contact'}];
  const productLinks = [{name:'Video Interviews', link:'/video-interviews'}, {name:'Resume Analysis', link:'/resume-analysis'}, {name:'Dashboard', link:'/video-interviews'}];
  const supportLinks = [{name:'Privacy Policy', link:'/privacy-policy'}, {name:'Terms of Service', link:'/terms-of-service'}];

  const productSubItems = [
    { id: "video-interviews", label: "Video Interviews", link: "/video-interviews" },
    { id: "resume-analysis", label: "Resume Analysis", link: "/resume-analysis" },
    { id: "dashboard", label: "Dashboard", link: "/dashboard" },
  ];
  const companySubItems = [
    { id: "about-us", label: "About Us", link: "/about" },
    { id: "contact", label: "Contact", link: "/contact" },
    // { id: "careers", label: "Careers", link: "/careers" },
    // { id: "blog", label: "Blog", link: "/blog" },
  ];

  const supportSubItems = [
    { id: "privacy-policy", label: "Privacy Policy", link: "/privacy-policy" },
    { id: "terms-of-service", label: "Terms of Service", link: "/terms-of-service" },
    // { id: "help-center", label: "Help Center", link: "/help-center" },
    // { id: "contact-support", label: "Contact Support", link: "/contact-support" },
  ];

  const navItems = [
    { id: 'home', label: 'Home', link:'/' },
    { id: "product", label: "Product", subItems: productSubItems },
    { id: "company", label: "Company", subItems: companySubItems },
    { id: "support", label: "Support", subItems: supportSubItems },
  ];
  useEffect(() => {
    if (hoveredNavItem === false) {
      setCurrentHoveredItem(null);
    }
  }, [hoveredNavItem]);

  const handleClickNavItem = (link) => {
    Navigate(link);
    setToggleMenu(false);
  };
  //   const currentSection =
  const handleClickNavVisibleItem = (item) => {
    if (item.link) {
      Navigate(item.link);
    } else {
      setHoveredNavItem((prev) => prev !== "clicked" ? "clicked" : false);
      setCurrentHoveredItem(item.id);
      console.log("Clcococo");
    }
  }

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Interviewsta.AI
                </h1>
                {/* <p className="text-xs text-gray-500">Smart Interview Prep</p> */}
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-1"
            // onTouchMoveCapture={() => console.log("peepe")}
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleClickNavVisibleItem(item);
                  }}
                  className={`px-4 py-2 rounded-lg relative text-sm font-medium transition-all duration-200 ${
                    currentSection.pathname === item.link
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  } cursor-pointer`}
                  onMouseEnter={() => {item.subItems && setCurrentHoveredItem(item.id); item.subItems && setHoveredNavItem((prev) => prev !== "clicked" ? true : "clicked")}}
                  onMouseLeave={() => {item.subItems && setHoveredNavItem((prev) => prev !== "clicked" ? false : "clicked")}}
                >
                  {item.label} {item.subItems ? (<ChevronDown className={`absolute -right-1 top-[30%] h-4 w-4 ${currentHoveredItem === item.id ? "rotate-180" : ""} transition-transform duration-200`} />) : null}
                  <AnimatePresence mode="wait"> 
                      {hoveredNavItem && currentHoveredItem === item.id && (
                        <motion.div className={`${hoveredNavItem ? "absolute" : "hidden"} top-full left-0 w-max overflow-hidden rounded-sm bg-white shadow-2xl shadow-gray-50`}
                          key="NavItemDropdown"
                          initial={{ height: 0 }}
                          animate={{ height: hoveredNavItem ? 'auto' : 0 }}
                          exit={{ height: 0}}
                        >
                          <ul className="flex flex-col p-4 space-y-2">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.id}>
                                <motion.button
                                  onClick={() => handleClickNavItem(subItem.link)}
                                  whileHover={{ x: 5 }}
                                  className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                    currentSection.pathname === subItem.link
                                      ? "bg-blue-50 text-blue-600"
                                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                  }`}
                                >
                                  {subItem.label}
                                </motion.button>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </button>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button> */}
              <button
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setToggleProfile((prev) => !prev)}
              >
                {/* <User className="h-5 w-5" ref={profileVisRef} /> */}
                <div
                  className="hidden absolute top-[calc(100%)] z-10 right-0 w-50 rounded-lg bg-white shadow-lg"
                  // ref={profileRef}
                >
                  <ul className="flex flex-col p-3 space-y-1.5">
                    <li className="inline-flex space-x-2.5 items-center">
                      <div className="size-9 rounded-full bg-amber-400 flex justify-center items-center">
                        <UserIcon className="text-gray-200" />
                      </div>
                      <p className="text-gray-800"></p>
                    </li>
                    <li
                      className="text-red-500 inline-flex space-x-2.5 rounded-lg justify-center items-center hover:text-red-600 hover:bg-gray-100 hover:cursor-pointer"
                      onClick={() => handleSignOut()}
                    >
                      <LogOutIcon className="w-4 h-4" />
                      <p>Log out</p>
                    </li>
                  </ul>
                </div>
              </button>
              <button
                className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => {
                  setToggleMenu((val) => !val);
                }}
                ref={navMenuVisRef}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div
          className="hidden absolute top-full left-0 min-h-[calc(100vh-2rem)] w-full bg-blue-50"
          ref={navMenuRef}
        >
          <nav className="!flex !flex-col pt-5 space-y-3 min-h-full w-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleClickNavItem(item.link);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 block ${
                  currentSection.pathname === item.link
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
