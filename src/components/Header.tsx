
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContent } from '@/contexts/ContentContext';
import { Link } from 'react-router-dom';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    
    // Add scroll padding to the document for anchor links
    document.documentElement.style.scrollPadding = '80px 0 0 0';
    
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // About submenu items
  const aboutSubmenu = [
    { name: "Our Story", href: "/about#our-story" },
    { name: "Mission & Vision", href: "/about#mission-vision" },
    { name: "Team", href: "/about#team" },
    { name: "Careers", href: "/about#careers" }
  ];

  // Updated navigation structure with About dropdown
  const navStructure = [
    { 
      name: 'About',
      href: '/about',
      hasSubmenu: true,
      submenu: aboutSubmenu
    },
    { 
      name: 'Services',
      href: '/services',
      hasSubmenu: false
    },
    { 
      name: 'Solutions',
      href: '/solutions',
      hasSubmenu: false
    },
    { 
      name: 'Noesis AI Assistant',
      href: '#chatbot',
      hasSubmenu: false
    },
    { 
      name: 'Contact',
      href: '/contact',
      hasSubmenu: false
    }
  ];
  
  const HEADER_HEIGHT = '60px';
  
  const useHamburgerMenu = () => {
    return window.innerWidth < 640; // Changed from 1024 to 640 for mobile-only hamburger
  };
  
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(useHamburgerMenu());
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      )}
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link to="/" className="flex items-center gap-2 z-[60]">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 300.48 54.12" 
            className="h-4 sm:h-5 md:h-8 w-auto"
            fill="currentColor"
          >
            <path 
              d="M172.28,18.21a5.4,5.4,0,0,1,5.33,5.33,5.34,5.34,0,0,1-5.33,5.26A5.29,5.29,0,0,1,167,23.54,5.35,5.35,0,0,1,172.28,18.21Z"
              className="text-noesis-purple"
            />
            <path 
              d="M189.4,33h-2.35a1.31,1.31,0,0,1-1.25-1.32V27a1.26,1.26,0,0,1,1.25-1.32h2.35V18a1.37,1.37,0,0,1,1.32-1.32l5.68-.07A1.3,1.3,0,0,1,197.65,18v7.76h6.1A1.27,1.27,0,0,1,205.06,27v4.64A1.32,1.32,0,0,1,203.75,33h-6.1V44.08c0,1.94,1,2.21,2.15,2.21a11,11,0,0,0,3.39-.76,1.08,1.08,0,0,1,1.53.76l1.38,4.37a1.25,1.25,0,0,1-.76,1.66,26,26,0,0,1-8.24,1.8c-5.34,0-7.7-3.32-7.7-8.94Z"
              className="text-white"
            />
            <path 
              d="M223.91,25a12.7,12.7,0,0,1,13,12.89,17,17,0,0,1-.14,1.87A1.34,1.34,0,0,1,235.42,41H217.68a6.6,6.6,0,0,0,6.65,6,9.61,9.61,0,0,0,5.4-1.74c.7-.41,1.32-.55,1.81,0l2.84,3.26a1.14,1.14,0,0,1-.07,1.8A14.92,14.92,0,0,1,224,54.12c-8.31,0-14.2-6.58-14.2-14.55S215.67,25,223.91,25Zm4.85,11.09a5.17,5.17,0,0,0-5.06-4.72,5.46,5.46,0,0,0-5.4,4.72Z"
              className="text-white"
            />
            <path 
              d="M255.3,25a12.67,12.67,0,0,1,10.26,4.92,1.32,1.32,0,0,1-.35,1.94L262,34.93c-.62.55-1.24.21-1.73-.21a6.51,6.51,0,0,0-4.78-2.22,7,7,0,0,0-6.79,7.07,6.85,6.85,0,0,0,6.72,7.07c3,0,4.3-1.46,5.55-2.63a1.28,1.28,0,0,1,1.73-.21l3,2.56c.69.56,1,1.25.48,1.94a12.33,12.33,0,0,1-11,5.82,14.62,14.62,0,0,1-14.69-14.55A14.81,14.81,0,0,1,255.3,25Z"
              className="text-white"
            />
            <path 
              d="M272.21,6.24a1.36,1.36,0,0,1,1.32-1.32h5.89a1.36,1.36,0,0,1,1.31,1.32V27.3A12.8,12.8,0,0,1,288.08,25c8.8,0,12.4,6.79,12.4,13.79V52.12a1.36,1.36,0,0,1-1.31,1.31h-5.62a1.31,1.31,0,0,1-1.31-1.31V38.74c0-3.81-2.15-6.24-5.48-6.24a6.06,6.06,0,0,0-6,4.92v14.7c0,.76-.41,1.31-1.45,1.31h-5.75a1.36,1.36,0,0,1-1.32-1.31Z"
              className="text-white"
            />
            <path 
              d="M0,2A1.32,1.32,0,0,1,1.32.69H4a1.22,1.22,0,0,1,1.18.83l1,2.57A13.62,13.62,0,0,1,15.87,0C24.67,0,28.2,6.58,28.2,13.79V27.1a1.36,1.36,0,0,1-1.31,1.31H21.21a1.31,1.31,0,0,1-1.32-1.31V13.38c0-3.61-1.87-5.9-5.2-5.9a7,7,0,0,0-6.51,4.37V27.1c0,1-.42,1.31-1.74,1.31H1.32A1.36,1.36,0,0,1,0,27.1Z"
              className="text-white"
            />
            <path 
              d="M48,0a14.56,14.56,0,0,1,0,29.11,14.5,14.5,0,0,1-14.2-14.63A14.46,14.46,0,0,1,48,0Zm0,21.62a6.9,6.9,0,0,0,6.66-7.14,6.66,6.66,0,1,0-13.31,0A6.85,6.85,0,0,0,48,21.62Z"
              className="text-white"
            />
            <path 
              d="M80.45,0a12.71,12.71,0,0,1,13,12.89,16.63,16.63,0,0,1-.14,1.87A1.34,1.34,0,0,1,92,15.94H74.22a6.6,6.6,0,0,0,6.65,6,9.6,9.6,0,0,0,5.4-1.73c.7-.42,1.32-.56,1.81,0l2.84,3.25a1.16,1.16,0,0,1-.07,1.81,15,15,0,0,1-10.33,3.81c-8.31,0-14.2-6.59-14.2-14.56S72.21,0,80.45,0ZM85.3,11.09a5.16,5.16,0,0,0-5.06-4.71,5.46,5.46,0,0,0-5.4,4.71Z"
              className="text-white"
            />
            <path 
              d="M97.71,25.09l1.87-3.74a1,1,0,0,1,1.59-.49,15.48,15.48,0,0,0,6.31,1.66c1.38,0,2.35-.55,2.35-1.73s-1-2-4.64-3.46c-5.34-2.08-7.83-4.93-7.83-9.15S100.48,0,107.55,0a15.94,15.94,0,0,1,8.52,2.15A1.47,1.47,0,0,1,116.69,4L115,7.55A1.32,1.32,0,0,1,113.3,8a16.39,16.39,0,0,0-5.75-1.46c-1.67,0-2.36.7-2.36,1.6,0,1.25,1.25,1.66,3.81,2.7,5.34,2.08,9.36,4.37,9.36,9.77,0,4.58-4,8.46-11,8.46a15.71,15.71,0,0,1-9.22-2.57A1.18,1.18,0,0,1,97.71,25.09Z"
              className="text-white"
            />
            <path 
              d="M123.07,2A1.32,1.32,0,0,1,124.39.69h5.75A1.32,1.32,0,0,1,131.45,2V27.1a1.36,1.36,0,0,1-1.31,1.31h-5.75a1.36,1.36,0,0,1-1.32-1.31Z"
              className="text-white"
            />
            <path 
              d="M138.24,25.09l1.88-3.74a1,1,0,0,1,1.59-.49A15.48,15.48,0,0,0,148,22.52c1.38,0,2.35-.55,2.35-1.73s-1-2-4.64-3.46c-5.34-2.08-7.83-4.93-7.83-9.15S141,0,148.08,0a16,16,0,0,1,8.53,2.15A1.47,1.47,0,0,1,157.23,4L155.5,7.55a1.32,1.32,0,0,1-1.66.49,16.4,16.4,0,0,0-5.76-1.46c-1.66,0-2.36.7-2.36,1.6,0,1.25,1.25,1.66,3.81,2.7,5.34,2.08,9.36,4.37,9.36,9.77,0,4.58-4,8.46-11,8.46a15.68,15.68,0,0,1-9.22-2.57A1.19,1.19,0,0,1,138.24,25.09Z"
              className="text-white"
            />
          </svg>
        </Link>
        
        <nav className="hidden sm:flex items-center gap-2 md:gap-4 lg:gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navStructure.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.hasSubmenu ? (
                    <NavigationMenuTrigger className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-[16px] text-white/80 hover:text-white bg-transparent">
                      {item.name}
                    </NavigationMenuTrigger>
                  ) : item.href.startsWith('/') ? (
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href}
                        className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-[16px] text-white/80 hover:text-white transition-colors relative hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-noesis-purple after:transition-all whitespace-nowrap inline-flex h-10 w-max items-center justify-center px-4 py-2"
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  ) : (
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-[16px] text-white/80 hover:text-white transition-colors relative hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-noesis-purple after:transition-all whitespace-nowrap inline-flex h-10 w-max items-center justify-center px-4 py-2"
                      >
                        {item.name}
                      </a>
                    </NavigationMenuLink>
                  )}
                  
                  {/* Dropdown content for items with submenus */}
                  {item.hasSubmenu && (
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-1 p-2 bg-[#1A1F2C] border border-white/10 rounded-md">
                        {item.submenu?.map((subItem) => (
                          <li key={subItem.name}>
                            <Link 
                              to={subItem.href}
                              className="block select-none space-y-1 rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors text-[10px] sm:text-[10px] md:text-[10px] lg:text-[14px]"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          <Link to="/contact">
            <Button className="group text-[10px] sm:text-[10px] md:text-[10px] lg:text-[16px]" variant="noesis" size="sm">
              Get in Touch
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 h-2 w-2 md:h-4 md:w-4 lg:h-4 lg:w-4 ml-1" />
            </Button>
          </Link>
        </nav>
        
        <div className="sm:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="text-white z-[60]">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </SheetTrigger>
            <SheetContent 
              side="top" 
              className="bg-[#1A1F2C] border-b border-white/10 h-screen p-0 rounded-none"
              style={{ marginTop: HEADER_HEIGHT }}
            >
              <div className="flex flex-col items-center justify-center px-4 py-4 md:py-2 h-full mt-[-60px]">
                <div className="flex flex-col items-center justify-center w-full h-full max-w-md mx-auto space-y-4 md:space-y-2">
                  {navStructure.map((item, index) => (
                    <div key={item.name} className="w-full">
                      {item.hasSubmenu ? (
                        <div className="w-full">
                          <div className="text-white py-3 md:py-2 text-lg text-center w-full transition-colors animate-in fade-in duration-300 font-semibold">
                            {item.name}
                          </div>
                          <div className="pl-4 space-y-2 mb-2">
                            {item.submenu?.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="text-white/80 py-2 text-base text-center w-full transition-colors animate-in fade-in duration-300 block hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : item.href.startsWith('/') ? (
                        <Link 
                          to={item.href} 
                          className="text-white py-3 md:py-2 text-lg text-center w-full transition-colors animate-in fade-in duration-300 block"
                          style={{ animationDelay: `${index * 50}ms` }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <a 
                          href={item.href} 
                          className="text-white py-3 md:py-2 text-lg text-center w-full transition-colors animate-in fade-in duration-300 block"
                          style={{ animationDelay: `${index * 50}ms` }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      )}
                    </div>
                  ))}
                  <div className="mt-4 md:mt-2 w-full flex justify-center">
                    <Link 
                      to="/contact" 
                      className="inline-block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button 
                        className="animate-in fade-in duration-300 group"
                        style={{ animationDelay: `${navStructure.length * 50}ms` }}
                        variant="noesis"
                      >
                        Get in Touch
                        <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
