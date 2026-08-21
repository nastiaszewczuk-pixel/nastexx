import React, { useState, useRef } from 'react';
import { 
  Copy, 
  Check, 
  ArrowUpRight, 
  Sparkles, 
  Video, 
  Mail, 
  Phone, 
  ExternalLink, 
  Layers, 
  Flame, 
  Star, 
  Zap, 
  TrendingUp, 
  Globe,
  MapPin,
  MessageCircle,
  Calendar,
  Heart,
  Play,
  Volume2,
  Film,
  FolderOpen,
  Image as ImageIcon,
  FileText,
  Download,
  GraduationCap,
  Award,
  Briefcase,
  Sliders,
  Instagram,
  Plus,
  RefreshCw,
  X
} from 'lucide-react';
import { ShowreelModal } from './ShowreelModal';
import { ProjectAlbumModal } from './ProjectAlbumModal';
import { useProfilePhoto } from '../utils/useProfilePhoto';
import { useAboutVideo } from '../utils/useShowreel';
import { usePortfolioAlbums, DEFAULT_ALBUMS_DATA } from '../utils/usePortfolioAlbums';
import { WaterBackground } from './WaterBackground';
import { CreatorCollabSection } from './CreatorCollabSection';

type NavSection = 'About Me' | 'Creator & Collabs' | 'Portfolio' | 'Skills' | 'Resume' | 'Education' | 'Contact';

interface BrutalistPortfolioProps {}

export function BrutalistPortfolio({}: BrutalistPortfolioProps = {}) {
  const [activeNav, setActiveNav] = useState<NavSection>('About Me');
  const [copied, setCopied] = useState(false);
  const [resumeCopied, setResumeCopied] = useState(false);
  const [showShowreel, setShowShowreel] = useState(false);
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'VIRAL' | 'PRODUCTION' | 'GROWTH' | 'CREATIVE'>('ALL');
  
  const { photoUrl } = useProfilePhoto();
  const { 
    videoUrl: aboutVideoUrl, 
    videoName: aboutVideoName
  } = useAboutVideo();

  const { 
    albums, 
    projectLinks,
    addMediaToAlbum,
    addMediaItemByUrl,
    removeMediaFromAlbum,
    resetAlbumToDefault
  } = usePortfolioAlbums();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('neizydeizy@gmail.com').catch((e) => console.warn('Clipboard error:', e));
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCopyResume = () => {
    const resumeText = `Anastasiya Shauchuk
social media specialist
+34675151651 | neizydeizy@gmail.com | Barcelona, Spain | 29.04.2001 | @nastexx

LANGUAGES:
- English C1
- Polish C1
- Russian C2
- Spanish A2

SKILLS:
- content strategy
- social media management
- photo&video production
- Canva / CapCut / Photoshop
- creative search
- AI tools

WORK EXPERIENCE:
• content creation + smm — Fluently App (6/2025 - 6/2026)
  • social media strategy
  • photo&video production

• associate producer — Welltech App (6/2025 - 6/2025, NYC)
  • end-to-end video production management

• digital marketing specialist — Hair Expert (6/2024 - 11/2024, Minsk)
  • content strategy
  • photo&video production

• freelance & independent projects (2021 - Present, Global / Remote)
  • high volume of unlisted client projects across fashion, lifestyle, beauty & tech
  • end-to-end UGC scripting, filming, viral hook creation & organic growth consulting

• junior marketing specialist & intern foundations (2019 - 2021, Warsaw / Minsk)
  • 2 years of intensive foundational hands-on experience as a junior specialist and intern
  • social media management, content research, shoot assistance & creative production

EDUCATION:
• 7/2024 - 10/2024: digital marketing course, ESPAI
• 10/2019 - 6/2022: public relations, University of Warsaw
• 10/2018 - 06/2019: language course, UMCS Lublin, Poland`;

    navigator.clipboard.writeText(resumeText).catch((e) => console.warn('Clipboard error:', e));
    setResumeCopied(true);
    setTimeout(() => setResumeCopied(false), 2200);
  };

  // 6 Portfolio Works (each an interactive media album)
  const workItems = [
    {
      id: '01',
      tag: 'VIRAL',
      number: '01',
      title: 'Dior Paris FW Backstage',
      role: 'Content Creator',
      metric: '20M+ Views // 10M+ Accounts',
      desc: 'High-aesthetic storytelling and viral organic reach generating over 20 Million views and reaching 10 Million accounts.',
      accent: 'bg-[#FFBA08]'
    },
    {
      id: '02',
      tag: 'GROWTH',
      number: '02',
      title: 'Fluently English App',
      role: 'Content Creator & Growth Lead',
      metric: '10M+ Views // 100K+ Followers',
      desc: 'Built scalable organic acquisition from scratch: 10M+ views, 100K+ new followers in 6 months, and 3,000+ paid user conversions.',
      accent: 'bg-yellow-300'
    },
    {
      id: '03',
      tag: 'VIRAL',
      number: '03',
      title: 'Hair Expert',
      role: 'SMM Specialist & Producer',
      metric: '10M+ Views in 1 Month',
      desc: 'Transformed beauty expertise into viral short-form content with 10M+ views in 30 days and 5K+ new client followers.',
      accent: 'bg-pink-300'
    },
    {
      id: '04',
      tag: 'PRODUCTION',
      number: '04',
      title: 'Fashion Show Backstage',
      role: 'Photo & Video Production',
      metric: 'Outsiders Division & Dominnico',
      desc: 'High-tempo backstage photo and video coverage for fashion powerhouses Outsiders Division (126K) and Dominnico (150K).',
      accent: 'bg-orange-300'
    },
    {
      id: '05',
      tag: 'PRODUCTION',
      number: '05',
      title: 'UGC shootings // fitness app',
      role: 'Associate Producer & Directing',
      metric: 'Location Scouting & Talent Direction',
      desc: 'On-set production logistics in New York City: location scouting, scheduling, and model/crew coordination for a leading fitness app.',
      accent: 'bg-cyan-300'
    },
    {
      id: '06',
      tag: 'CREATIVE',
      number: '06',
      title: 'Visual Storytelling & Lifestyle Directing',
      role: 'Creative Director & Visual Storyteller',
      metric: 'Multichannel Ecosystems',
      desc: '',
      accent: 'bg-[#FFBA08]'
    }
  ];

  const filteredWork = activeFilter === 'ALL' 
    ? workItems 
    : workItems.filter(item => item.tag === activeFilter);

  const skillsList = [
    {
      category: 'CONTENT & PRODUCTION',
      items: [
        'Short-Form Video Strategy (TikTok, Reels, Shorts)',
        'Viral Hooks & High-Retention Scripting',
        'Video Editing (CapCut, Premiere Pro, After Effects)',
        'Photo & Video On-Set Directing & Shoot Coordination'
      ],
      badge: 'CORE CRAFT',
      accent: 'bg-[#FFBA08]'
    },
    {
      category: 'GROWTH & MANAGEMENT',
      items: [
        'Social Media Management (SMM) & Ecosystems',
        'Organic User Acquisition & Conversion Funnels',
        'Community Building & Engagement Pipelines',
        'Algorithm Trend Forecasting & Performance Analytics'
      ],
      badge: 'STRATEGY',
      accent: 'bg-pink-300'
    },
    {
      category: 'CREATIVE & LOGISTICS',
      items: [
        'Fashion & Brand Aesthetic Creative Direction',
        'Location Scouting & Venue Permitting (NYC & Europe)',
        'Model, Talent & On-Set Crew Management',
        'Rapid Multimedia Turnarounds & Deliverables'
      ],
      badge: 'ON-SET',
      accent: 'bg-yellow-300'
    }
  ];

  const navColumns: { label: NavSection; id: string }[] = [
    { label: 'About Me', id: 'section-about' },
    { label: 'Portfolio', id: 'section-portfolio' },
    { label: 'Skills', id: 'section-skills' },
    { label: 'Resume', id: 'section-resume' },
    { label: 'Creator & Collabs', id: 'section-creator' },
    { label: 'Education', id: 'section-education' },
    { label: 'Contact', id: 'section-contact' }
  ];

  const scrollToSection = (id: string, navName: NavSection) => {
    setActiveNav(navName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSetBgTheme = (themeName: 'water' | 'sunset' | 'pink_lemonade' | 'desert' | 'lipgloss') => {
    try {
      localStorage.setItem('anastasiya_bg_theme_v2', themeName);
      window.dispatchEvent(new CustomEvent('portfolio_bg_theme_change', { detail: themeName }));
    } catch (e) {
      console.warn('Failed to save background theme:', e);
    }
  };

  return (
    <WaterBackground>
      <div className="min-h-screen p-3 sm:p-4 md:p-8 font-sans text-black selection:bg-[#0022FF] selection:text-white relative">
        
        {/* Top Header Badge Bar with Theme Switcher & Background Media Controls */}
        <div className="max-w-6xl mx-auto mb-3 flex flex-wrap items-center justify-between text-xs font-black uppercase tracking-wider gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#FFE600] text-black border-2 border-black px-3 py-1 text-xs font-mono font-black tracking-tight shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
              welcome, friend // portfolio 2026
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Flowing Background Theme Switcher - White Block Background, No Emojis */}
            <div className="flex items-center gap-1.5 bg-white text-black p-1 px-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono text-[10px]">
              <span className="text-black font-bold hidden sm:inline-block">BG THEME:</span>
              <button
                onClick={() => handleSetBgTheme('water')}
                className="bg-[#0022FF] text-white hover:bg-blue-700 px-2 py-0.5 border border-black font-black uppercase transition-colors cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                title="Switch to water theme"
              >
                water
              </button>
              <button
                onClick={() => handleSetBgTheme('sunset')}
                className="bg-[#FFE600] text-black hover:bg-yellow-400 px-2 py-0.5 border border-black font-black uppercase transition-colors cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                title="Switch to sunset theme"
              >
                sunset
              </button>
              <button
                onClick={() => handleSetBgTheme('pink_lemonade')}
                className="bg-[#FF007F] text-white hover:bg-pink-600 px-2 py-0.5 border border-black font-black uppercase transition-colors cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                title="Switch to pink lemonade theme"
              >
                pink lemonade
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-white text-black border-2 border-black px-2.5 py-0.5 text-[11px] font-mono font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              barcelona, spain // worldwide
            </span>
          </div>
        </div>

      {/* Main Zine Container */}
      <div 
        id="brutalist-zine-container"
        className="max-w-6xl mx-auto border-3 border-black bg-white p-4 sm:p-6 md:p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative"
      >
        
        {/* Navigation Bar */}
        <nav 
          id="brutalist-nav"
          className="flex flex-wrap items-center justify-between border-b-2 border-black pb-4 mb-8 text-xs sm:text-sm font-bold uppercase tracking-tighter gap-2 sm:gap-4"
        >
          {navColumns.map((nav) => (
            <button
              key={nav.label}
              id={`nav-${nav.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => scrollToSection(nav.id, nav.label)}
              className={`transition-colors hover:text-[#0022FF] cursor-pointer ${
                activeNav === nav.label 
                  ? 'underline decoration-[#0022FF] decoration-4 font-black text-[#0022FF]' 
                  : 'text-black'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>

        {/* Big Bold Headline Header: ANASTASIYA on top, Hello statement & Baby Pink Polaroid Picture on same level */}
        <header className="mb-14 select-none relative">
          <div className="flex flex-wrap items-baseline justify-between mb-3">
            <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-zinc-600 uppercase">
              // SOCIAL MEDIA SPECIALIST &amp; CONTENT CREATOR
            </span>
            {/* Neon Green 6+ YRS EXP Badge */}
            <span className="bg-[#39FF14] text-black border-2 border-black font-mono text-[10px] font-black px-2.5 py-0.5 uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              6+ YRS EXP
            </span>
          </div>

          {/* Line 1: ANASTASIYA on top */}
          <div className="relative z-10 w-full overflow-hidden mb-2">
            <h1 className="text-[13.5vw] sm:text-[12.5vw] md:text-[11vw] font-black leading-[0.85] tracking-tighter text-black uppercase block">
              ANASTASIYA
            </h1>
          </div>

          {/* Action Buttons in Hero: Showreel + @nastexx 7.2k */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="hero-showreel-btn"
                onClick={() => setShowShowreel(true)}
                className="inline-flex items-center gap-2 bg-[#0022FF] hover:bg-black text-white hover:text-[#39FF14] px-4 py-2 border-2 border-black font-mono text-xs sm:text-sm font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
                title="Watch Official Showreel"
              >
                <Film className="w-4 h-4" />
                <span>SHOWREEL</span>
                <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
              </button>

              <a
                id="hero-instagram-btn"
                href="https://instagram.com/nastexx"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#FFE600] hover:bg-black text-black hover:text-[#39FF14] px-4 py-2 border-2 border-black font-mono text-xs sm:text-sm font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
                <span>@NASTEXX 7.2K</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hello statement and Picture starting and aligned on the SAME LEVEL */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch relative z-0 mb-6">
            
            {/* Left Column: Hello & Statement Card */}
            <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-between">
              <div className="border-3 border-black bg-zinc-50 p-5 sm:p-6 md:p-7 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-black uppercase tracking-widest text-[#0022FF]">
                      // HELLO &amp; STATEMENT
                    </span>
                    <a
                      href="https://instagram.com/nastexx"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 bg-[#FFE600] hover:bg-black text-black hover:text-[#39FF14] px-2 py-0.5 border border-black font-mono text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    >
                      <Instagram className="w-3 h-3" />
                      <span>@NASTEXX</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-base sm:text-lg md:text-[18px] lg:text-[19px] font-bold text-black leading-relaxed">
                    ⋆˚꩜｡ Hi, friend! I created this page to bring together my 6 years of experience in marketing and social media in one place. Over the years, I’ve taken on diverse roles and explored different perspectives across the field. This journey gave me a chance to explore the entire marketing and social media ecosystem inside out. Welcome to my world!
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-zinc-600">
                  <span>6+ YEARS MARKETING &amp; SMM</span>
                  <span className="bg-black text-[#39FF14] px-2 py-0.5">CONTENT &amp; DIRECTING</span>
                </div>
              </div>
            </div>

            {/* Right Column: Solar Yellow Polaroid Photo Frame */}
            <div className="md:col-span-5 lg:col-span-5 flex flex-col items-center md:items-end">
              <div 
                id="polaroid-wrapper"
                className="border-3 border-black p-3 bg-[#FFE600] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-[320px] sm:max-w-[360px] md:max-w-[340px] lg:max-w-[370px] transition-all flex flex-col justify-between hover:-rotate-1 relative group"
              >
                <div className="border-2 border-black bg-white p-2.5 pb-4">
                  <div className="relative aspect-square w-full bg-zinc-900 border-2 border-black overflow-hidden group/photo">
                    {/* Natural full color photo */}
                    {photoUrl ? (
                      <img 
                        id="profile-portrait-img"
                        src={photoUrl || '/image-1.jpg'} 
                        alt="Anastasiya Portrait" 
                        className="w-full h-full object-cover object-top transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-[#39FF14] font-mono text-xs font-bold p-4 text-center">
                        <Sparkles className="w-8 h-8 mb-2 text-[#FFE600]" />
                        <span>PORTRAIT READY</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between text-xs font-black font-mono">
                    <p className="tracking-tight uppercase text-[11px] text-zinc-800 font-bold">// SOCIAL MEDIA SPECIALIST &amp; CONTENT CREATOR</p>
                    <span className="bg-black text-[#39FF14] px-2.5 py-0.5 text-[11px] font-bold">ANASTASIYA</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Highlights: Label on top of the metric block */}
          <div className="pt-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-black text-xs sm:text-sm uppercase tracking-wider bg-black text-[#39FF14] px-2.5 py-0.5 border border-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Highlights:
              </span>
              <span className="text-[11px] font-mono font-bold text-zinc-600">// KEY METRICS &amp; CAMPAIGN WINS</span>
            </div>

            {/* 4 Numbers / Metric Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="border-2 border-black p-3.5 bg-[#FFE600] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold block uppercase text-black/80">Audience Scale</span>
                  <span className="text-lg sm:text-xl font-black block mt-0.5">100k+ followers in 6 Months</span>
                </div>
                <button
                  id="metric-btn-portfolio-02"
                  onClick={() => {
                    scrollToSection('section-portfolio', 'Portfolio');
                    setActiveAlbumId('02');
                  }}
                  className="mt-2.5 inline-flex items-center justify-between w-full bg-black hover:bg-[#0022FF] text-[#39FF14] hover:text-white px-2.5 py-1 border border-black font-mono text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer select-none"
                  title="View Portfolio 02 - Fluently English App"
                >
                  <span>CLICK</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="border-2 border-black p-3.5 bg-[#0022FF] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold block uppercase text-zinc-200">Dior Backstage</span>
                  <span className="text-lg sm:text-xl font-black block mt-0.5 text-white">20M+ Views</span>
                </div>
                <button
                  id="metric-btn-portfolio-01"
                  onClick={() => {
                    scrollToSection('section-portfolio', 'Portfolio');
                    setActiveAlbumId('01');
                  }}
                  className="mt-2.5 inline-flex items-center justify-between w-full bg-[#FFE600] hover:bg-white text-black px-2.5 py-1 border border-black font-mono text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer select-none"
                  title="View Portfolio 01 - Dior Backstage"
                >
                  <span>CLICK</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="border-2 border-black p-3.5 bg-[#FFE600] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold block uppercase text-black/80">Hair Expert SMM</span>
                  <span className="text-lg sm:text-xl font-black block mt-0.5">5K+ followers in 1 Month</span>
                </div>
                <button
                  id="metric-btn-portfolio-03"
                  onClick={() => {
                    scrollToSection('section-portfolio', 'Portfolio');
                    setActiveAlbumId('03');
                  }}
                  className="mt-2.5 inline-flex items-center justify-between w-full bg-black hover:bg-[#0022FF] text-[#39FF14] hover:text-white px-2.5 py-1 border border-black font-mono text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer select-none"
                  title="View Portfolio 03 - Hair Expert"
                >
                  <span>CLICK</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="border-2 border-black p-3.5 bg-black text-[#39FF14] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold block uppercase text-zinc-400">Total Impressions</span>
                  <span className="text-lg sm:text-xl font-black block mt-0.5 text-[#39FF14]">300M+ views generated</span>
                </div>
                <div className="mt-2.5 text-[10px] font-mono font-bold text-zinc-400 uppercase py-1">
                  // ALL PLATFORMS
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 1. ABOUT ME SECTION */}
        <section id="section-about" className="mb-16 border-b-2 border-black pb-14">
          <div className="border-b-2 border-black pb-3 mb-8 flex flex-wrap items-baseline justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#0022FF] block uppercase">// PERSONAL_MANIFESTO_&amp;VIDEO</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">About Me</h2>
            </div>
            <span className="font-mono text-xs font-bold text-zinc-600">// REEL, MINDSET &amp; BIO</span>
          </div>

          <div className="space-y-8">
            
            {/* 1. FEATURED REEL / MOOD VIDEO (Independent Video Player) */}
            <div 
              id="about-video-container"
              className="border-3 border-black bg-zinc-950 p-4 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-700">
                <div className="flex items-center gap-2">
                  <span className="bg-[#39FF14] text-black font-mono font-bold text-xs px-2.5 py-0.5 border border-black uppercase">
                    MOOD VIDEO
                  </span>
                  <span className="font-mono text-xs text-zinc-300 font-bold uppercase">
                    // ABOUT ME
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowShowreel(true)}
                    className="bg-[#FFE600] hover:bg-[#39FF14] text-black text-xs font-mono font-black uppercase px-3 py-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>OPEN FULL SHOWREEL</span>
                  </button>
                </div>
              </div>

              {/* Video Screen for About Me */}
              <div className="relative aspect-video w-full bg-black border-2 border-zinc-800 overflow-hidden flex items-center justify-center">
                <video
                  src={aboutVideoUrl || "/about-video.mp4"}
                  controls
                  playsInline
                  loop
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Mood Video Description */}
              <div className="mt-3 pt-3 border-t border-zinc-800">
                <p className="text-xs sm:text-sm text-zinc-300 font-sans font-normal leading-relaxed italic">
                  &ldquo;This video was taken in New York, during one of the hardest yet most incredible chapters of my life. It means the world to me, so I decided to keep it here. This city taught me that you shouldn't run from fear - you have to walk straight into it, maybe even chase it down. That’s the only way to come out on top.&rdquo;
                </p>
              </div>
            </div>

            {/* 2. CORE MINDSET & GUIDING PHILOSOPHY */}
            <div className="border-3 border-black bg-[#FFE600] p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-0.5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-black/75 block mb-2">
                // GUIDING PHILOSOPHY
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-tight leading-tight text-black">
                “If nothing is certain, anything is possible”
              </h3>
              <p className="mt-4 text-base sm:text-lg font-medium text-black leading-relaxed">
                I truly live by this mindset, proving it daily in both my work projects and personal life. I believe that any goal is achievable if you have a clear plan, the discipline to stick to it and the flexibility to adapt when the right circumstances arise.
              </p>
            </div>

            {/* Two Column Grid: Experience & Journey */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Card 1: 6+ Years Experience */}
              <div className="border-2 border-black p-6 bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-black text-[#39FF14] text-[10px] font-mono font-bold px-2 py-0.5">
                      6+ YEARS EXPERIENCE
                    </span>
                    <Sparkles className="w-5 h-5 text-[#0022FF]" />
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-3">
                    Mastering Content & Brand Scaling
                  </h4>
                  <p className="text-sm sm:text-base text-zinc-800 leading-relaxed font-normal">
                    With over six years of experience in Marketing and Social Media, I have intentionally navigated different niches and roles. My goal was to master the entire ecosystem of content creation and brand scaling. While I have a solid grasp of the technical side, my true passion lies in the visual storytelling.
                  </p>
                </div>
              </div>

              {/* Card 2: Global Journey & Inspiration */}
              <div className="border-2 border-black p-6 bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-black text-[#FFE600] text-[10px] font-mono font-bold px-2 py-0.5">
                      GLOBAL LIFE CHAPTERS
                    </span>
                    <Globe className="w-5 h-5 text-black" />
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-3">
                    Life chapters
                  </h4>
                  <p className="text-sm sm:text-base text-zinc-800 leading-relaxed font-normal">
                    I was born in Belarus, currently based in Barcelona, with life chapters spent in Warsaw, Miami and New York. I travel constantly to experience new cultures and connect with people. I love seeing the world through different eyes, drawing my deepest inspiration from human connections and nature.
                  </p>
                </div>

                {/* City Chain Badge */}
                <div className="mt-4 pt-3 border-t border-black/20 text-xs font-mono font-bold text-[#0022FF] flex flex-wrap gap-1.5 items-center">
                  <span className="bg-zinc-200 px-2 py-0.5 text-black">BELARUS</span>
                  <span>➔</span>
                  <span className="bg-zinc-200 px-2 py-0.5 text-black">WARSAW</span>
                  <span>➔</span>
                  <span className="bg-zinc-200 px-2 py-0.5 text-black">MIAMI</span>
                  <span>➔</span>
                  <span className="bg-zinc-200 px-2 py-0.5 text-black">NYC</span>
                  <span>➔</span>
                  <span className="bg-[#FFE600] text-black font-black px-2 py-0.5">BARCELONA</span>
                  <span>➔</span>
                  <span className="bg-black text-[#39FF14] font-black px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">?</span>
                </div>
              </div>

            </div>

            {/* Languages & Collaboration Banner */}
            <div className="border-2 border-black bg-black text-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(255,230,0,1)]">
              <div className="grid md:grid-cols-12 gap-6 items-center">
                
                {/* Languages on the left */}
                <div className="md:col-span-6 space-y-3">
                  <span className="text-[10px] font-mono font-bold text-[#39FF14] uppercase tracking-widest block">
                    // MULTILINGUAL BRIDGES
                  </span>
                  <h4 className="text-xl font-black uppercase tracking-tight text-white">
                    Languages & Fluency
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    To bridge these worlds, I speak English, Russian, and Polish fluently, and I am currently mastering Spanish.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="border border-[#39FF14] text-[#39FF14] text-xs font-mono font-bold px-2.5 py-1">
                      ENGLISH [FLUENT]
                    </span>
                    <span className="border border-[#39FF14] text-[#39FF14] text-xs font-mono font-bold px-2.5 py-1">
                      RUSSIAN [FLUENT]
                    </span>
                    <span className="border border-[#39FF14] text-[#39FF14] text-xs font-mono font-bold px-2.5 py-1">
                      POLISH [FLUENT]
                    </span>
                    <span className="border border-[#FFE600] text-[#FFE600] text-xs font-mono font-bold px-2.5 py-1">
                      SPANISH [MASTERING]
                    </span>
                  </div>
                </div>

                {/* Collaboration on the right */}
                <div className="md:col-span-6 border-t md:border-t-0 md:border-l border-zinc-700 pt-5 md:pt-0 md:pl-6 space-y-3">
                  <span className="text-[10px] font-mono font-bold text-[#39FF14] uppercase tracking-widest flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-[#39FF14]" />
                    LET'S CONNECT
                  </span>
                  <h4 className="text-xl font-black uppercase tracking-tight text-[#FFE600]">
                    Ready to Collaborate?
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    If you feel we’d be a great match, please reach out via email, phone or Instagram. I’d love to hop on a Google Meet call to discuss how we can collaborate and bring your projects to life. Looking forward to connecting with you! 🤍
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <a
                      href="mailto:neizydeizy@gmail.com"
                      className="bg-[#FFE600] hover:bg-yellow-300 text-black px-3.5 py-1.5 text-xs font-black font-mono uppercase tracking-wider transition-colors inline-block shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                    >
                      HOP ON A CALL / EMAIL
                    </a>
                    <a
                      href="https://wa.me/34675151651"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white hover:bg-zinc-200 text-black px-3.5 py-1.5 text-xs font-black font-mono uppercase tracking-wider transition-colors inline-block"
                    >
                      WHATSAPP ME
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 2. PORTFOLIO SECTION (6 Interactive Work Albums) */}
        <section id="section-portfolio" className="mb-16 border-b-2 border-black pb-14">
          <div className="flex flex-wrap items-end justify-between border-b-2 border-black pb-3 mb-6 gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#0022FF] block uppercase">// 6_INTERACTIVE_WORK_ALBUMS</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Portfolio & Albums</h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs font-mono font-bold">
              {(['ALL', 'VIRAL', 'GROWTH', 'PRODUCTION', 'CREATIVE'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`border-2 border-black px-3 py-1 uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${
                    activeFilter === filter 
                      ? 'bg-black text-[#39FF14]' 
                      : 'bg-white text-black hover:bg-[#FFE600]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* 6 Portfolio Albums Grid */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {filteredWork.map((item) => {
              const albumMedia = albums[item.id] || DEFAULT_ALBUMS_DATA[item.id]?.defaultItems || [];
              const mediaCount = albumMedia.length;
              const firstMedia = albumMedia[0];

              const itemLinks = projectLinks[item.id] || DEFAULT_ALBUMS_DATA[item.id]?.defaultLinks || [];

              return (
                <div 
                  key={item.id} 
                  onClick={() => setActiveAlbumId(item.id)}
                  className="bg-white hover:bg-zinc-50 border-3 border-black p-5 relative group shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col justify-between cursor-pointer select-none"
                >
                  <div>
                    {/* Number Badge with rotation and scale pop */}
                    <div className={`absolute -top-3.5 -left-3.5 ${item.accent} group-hover:bg-[#39FF14] group-hover:text-black border-2 border-black w-9 h-9 flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:-rotate-6 group-hover:scale-110 transition-all duration-200 z-10`}>
                      {item.number}
                    </div>

                    {/* Tag and Metric Header with High-Contrast Color Shifts */}
                    <div className="mt-3 mb-2.5 flex flex-wrap items-center justify-between gap-2 border-b-2 border-black/10 pb-2">
                      <span className="text-[10px] font-mono font-black bg-black text-[#39FF14] group-hover:bg-[#FFE600] group-hover:text-black px-2.5 py-0.5 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider flex-shrink-0 transition-colors duration-150">
                        {item.tag}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono font-black text-black bg-[#FFE600] group-hover:bg-[#39FF14] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-2 py-0.5 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] max-w-full text-right transition-all duration-150">
                        {item.metric}
                      </span>
                    </div>

                    {/* Album Thumbnail Preview Frame */}
                    <div className="relative aspect-video w-full bg-zinc-950 border-2 border-black my-3 overflow-hidden group-hover:border-black group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                      {firstMedia ? (
                        firstMedia.type === 'video' ? (
                          <div className="w-full h-full flex items-center justify-center bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
                            <Video className="w-10 h-10 text-[#39FF14] group-hover:scale-110 transition-transform duration-200" />
                          </div>
                        ) : (
                          <img 
                            src={firstMedia.url} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-110 group-hover:contrast-110 transition-all duration-300"
                            referrerPolicy="no-referrer"
                          />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-400">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}

                      <div className="absolute top-2 right-2 bg-black text-[#39FF14] group-hover:bg-[#FFE600] group-hover:text-black px-2 py-0.5 text-[10px] font-mono font-black border border-black transition-colors duration-150 z-10">
                        {mediaCount} {mediaCount === 1 ? 'FILE' : 'FILES'}
                      </div>

                      {/* Brutalist High-Contrast Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5 z-10">
                        <span className="bg-[#39FF14] text-black font-mono font-black text-xs px-3.5 py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform duration-200">
                          <FolderOpen className="w-4 h-4" />
                          <span>OPEN ALBUM</span>
                        </span>
                        <span className="text-[9px] font-mono font-black text-[#FFE600] bg-black px-2 py-0.5 border border-black uppercase tracking-wider">
                          // CLICK TO EXPLORE
                        </span>
                      </div>
                    </div>

                    <h3 className="font-black text-2xl uppercase mt-1 tracking-tight group-hover:text-[#0022FF] group-hover:translate-x-0.5 transition-all duration-150">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono font-bold text-zinc-500 group-hover:text-zinc-900 uppercase mt-0.5 transition-colors duration-150">
                      {item.role}
                    </p>
                    {item.desc && (
                      <p className="text-sm mt-2 text-zinc-700 leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>
                    )}

                    {/* Project Links */}
                    {itemLinks.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-dashed border-black/30">
                        <span className="text-[9px] font-mono font-black uppercase text-[#0022FF] tracking-wider block mb-1.5">
                          // {itemLinks.length} PROJECT {itemLinks.length === 1 ? 'LINK' : 'LINKS'}
                        </span>
                        <div className="flex flex-col gap-1.5">
                          {itemLinks.map((lnk, lIdx) => (
                            <a
                              key={lnk.id}
                              href={lnk.url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="bg-zinc-50 hover:bg-[#39FF14] text-black font-mono text-[10px] font-bold px-2 py-1.5 border border-black flex items-center justify-between shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 group/link"
                            >
                              <span className="truncate max-w-[190px]">{lnk.label}</span>
                              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover/link:text-black flex-shrink-0 ml-1" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-black/20 flex items-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveAlbumId(item.id);
                      }}
                      className="w-full bg-zinc-100 group-hover:bg-[#39FF14] text-black font-mono text-xs font-black uppercase py-2.5 px-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer"
                    >
                      <FolderOpen className="w-4 h-4" />
                      <span>VIEW ALBUM ({mediaCount})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Reel CTA Bar - Watch the showreel */}
          <div 
            id="open-showreel-modal-cta"
            onClick={() => setShowShowreel(true)}
            className="mt-10 border-2 border-black bg-white hover:bg-[#FFE600] p-4 sm:p-6 flex items-center justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="bg-[#39FF14] group-hover:bg-black group-hover:text-[#39FF14] text-black border-2 border-black p-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
              <div>
                <h4 className="font-black text-xl sm:text-2xl uppercase tracking-tight group-hover:text-[#0022FF] transition-colors flex items-center gap-2">
                  <span>Watch the showreel</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 font-mono">
                  Explore viral hooks, production stills, and campaign metrics
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SKILLS SECTION */}
        <section id="section-skills" className="mb-16 border-b-2 border-black pb-14">
          <div className="border-b-2 border-black pb-3 mb-8 flex flex-wrap items-baseline justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#0022FF] block uppercase">// CAPABILITIES_MATRIX</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Skills & Stack</h2>
            </div>
            <span className="font-mono text-xs font-bold text-zinc-600">// VIRAL & PRODUCTION EXPERTISE</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {skillsList.map((skillGroup, idx) => (
              <div 
                key={idx} 
                className="border-2 border-black p-5 bg-zinc-50 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border border-black ${skillGroup.accent}`}>
                      {skillGroup.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-400">STACK.0{idx + 1}</span>
                  </div>
                  <h3 className="font-black text-lg uppercase tracking-tight mb-4 border-b border-black/20 pb-2">
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-2.5">
                    {skillGroup.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs font-bold flex items-start gap-2 text-zinc-800">
                        <span className="text-[#0022FF] font-black mt-0.5">■</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. RESUME SECTION */}
        <section id="section-resume" className="mb-16 border-b-2 border-black pb-14">
          <div className="border-b-2 border-black pb-3 mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#0022FF] block uppercase">// OFFICIAL_CV_&_CAREER_TRACK</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Resume</h2>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyResume}
                className="bg-white hover:bg-[#FFE600] text-black text-xs font-mono font-black uppercase px-3.5 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {resumeCopied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{resumeCopied ? 'RESUME COPIED!' : 'COPY RESUME TEXT'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="bg-black hover:bg-[#0022FF] text-white text-xs font-mono font-black uppercase px-3.5 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#39FF14]" />
                <span>PRINT / SAVE PDF</span>
              </button>
            </div>
          </div>

          {/* Brutalist Digital Resume Sheet mirroring the uploaded Canva CV */}
          <div className="border-3 border-black bg-zinc-50 p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Profile, Contacts, Languages, Skills */}
              <div className="lg:col-span-4 lg:border-r-2 lg:border-black lg:pr-8 space-y-6">
                
                {/* Name & Photo */}
                <div className="text-center sm:text-left space-y-3">
                  <div className="relative inline-block">
                    {photoUrl ? (
                      <img 
                        src={photoUrl || '/image-1.jpg'} 
                        alt="Anastasiya Shauchuk" 
                        className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover object-top border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mx-auto sm:mx-0"
                      />
                    ) : (
                      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-zinc-900 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mx-auto sm:mx-0 flex items-center justify-center text-[#39FF14] font-mono text-xs font-bold">
                        <span>ANASTASIYA</span>
                      </div>
                    )}
                    <span className="absolute bottom-1 right-1 w-5 h-5 bg-[#39FF14] border-2 border-black rounded-full" title="Active"></span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black leading-tight">
                      Anastasiya<br/>Shauchuk
                    </h3>
                  </div>
                </div>

                <div className="border-t-2 border-black pt-4">
                  <h4 className="text-sm font-black uppercase tracking-tight mb-2 text-black">
                    social media specialist
                  </h4>
                  <div className="space-y-1 font-mono text-xs font-bold text-zinc-700">
                    <p className="flex items-center gap-1.5">
                      <span className="text-[#0022FF]">TEL:</span>
                      <a href="https://wa.me/34675151651" target="_blank" rel="noreferrer" className="text-black hover:underline">+34 675 151 651</a>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="text-[#0022FF]">MAIL:</span>
                      <a href="mailto:neizydeizy@gmail.com" className="text-black hover:underline">neizydeizy@gmail.com</a>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="text-[#0022FF]">LOC:</span>
                      <span className="text-black">Barcelona, Spain</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="text-[#0022FF]">DOB:</span>
                      <span className="text-black">29.04.2001</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="text-[#0022FF]">IG:</span>
                      <a href="https://instagram.com/nastexx" target="_blank" rel="noreferrer" className="text-black underline font-black">@nastexx</a>
                    </p>
                  </div>
                </div>

                {/* Languages */}
                <div className="border-t-2 border-black pt-4">
                  <h4 className="text-sm font-black uppercase tracking-tight mb-2 text-black">
                    languages
                  </h4>
                  <div className="space-y-1 text-xs font-mono font-bold text-zinc-800">
                    <div className="flex justify-between items-center bg-white border border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <span>English</span>
                      <span className="bg-black text-[#39FF14] text-[10px] px-1.5 py-0.2">C1</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <span>Polish</span>
                      <span className="bg-black text-[#39FF14] text-[10px] px-1.5 py-0.2">C1</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <span>Russian</span>
                      <span className="bg-black text-[#39FF14] text-[10px] px-1.5 py-0.2">C2</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <span>Spanish</span>
                      <span className="bg-[#FFBA08] text-black text-[10px] px-1.5 py-0.2 font-black border border-black">A2</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="border-t-2 border-black pt-4">
                  <h4 className="text-sm font-black uppercase tracking-tight mb-2 text-black">
                    skills
                  </h4>
                  <ul className="space-y-1 text-xs font-bold text-zinc-800 lowercase">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-600 rounded-none border border-black"></span>
                      <span>content strategy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#39FF14] rounded-none border border-black"></span>
                      <span>social media management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#FFBA08] rounded-none border border-black"></span>
                      <span>photo&video production</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-none border border-black"></span>
                      <span>Canva / CapCut / Photoshop</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-600 rounded-none border border-black"></span>
                      <span>creative search</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-none border border-black"></span>
                      <span>AI tools</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* RIGHT COLUMN: Work Experience & Education */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Work Experience */}
                <div>
                  <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-5">
                    <h4 className="text-xl font-black uppercase tracking-tight text-black">
                      work experience
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-black text-[#39FF14] px-2 py-0.5">
                      EXPERIENCE TIMELINE
                    </span>
                  </div>

                  <div className="space-y-5">
                    
                    {/* Job 1: Fluently App */}
                    <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                        <h5 className="font-black text-base uppercase text-black">
                          content creation + smm
                        </h5>
                        <span className="font-mono text-xs font-bold text-zinc-600 bg-zinc-100 border border-black px-2 py-0.5">
                          6/2025 – 6/2026
                        </span>
                      </div>
                      <p className="text-xs font-mono font-black text-pink-600 mb-2">
                        Fluently App
                      </p>
                      <ul className="text-xs text-zinc-800 space-y-1 font-medium pl-1">
                        <li className="flex items-center gap-2">
                          <span className="text-pink-600 font-bold">•</span>
                          <span>social media strategy</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-pink-600 font-bold">•</span>
                          <span>photo&video production</span>
                        </li>
                      </ul>
                    </div>

                    {/* Job 2: Welltech App */}
                    <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                        <h5 className="font-black text-base uppercase text-black">
                          associate producer
                        </h5>
                        <span className="font-mono text-xs font-bold text-zinc-600 bg-zinc-100 border border-black px-2 py-0.5">
                          6/2025 – 6/2025, NYC
                        </span>
                      </div>
                      <p className="text-xs font-mono font-black text-pink-600 mb-2">
                        Welltech App
                      </p>
                      <ul className="text-xs text-zinc-800 space-y-1 font-medium pl-1">
                        <li className="flex items-center gap-2">
                          <span className="text-pink-600 font-bold">•</span>
                          <span>end-to-end video production management</span>
                        </li>
                      </ul>
                    </div>

                    {/* Job 3: Paramatma Salon */}
                    <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                        <h5 className="font-black text-base uppercase text-black">
                          digital marketing specialist
                        </h5>
                        <span className="font-mono text-xs font-bold text-zinc-600 bg-zinc-100 border border-black px-2 py-0.5">
                          6/2024 – 11/2024, Minsk
                        </span>
                      </div>
                      <p className="text-xs font-mono font-black text-pink-600 mb-2">
                        Paramatma Salon
                      </p>
                      <ul className="text-xs text-zinc-800 space-y-1 font-medium pl-1">
                        <li className="flex items-center gap-2">
                          <span className="text-pink-600 font-bold">•</span>
                          <span>content strategy</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-pink-600 font-bold">•</span>
                          <span>photo&video production</span>
                        </li>
                      </ul>
                    </div>

                    {/* Job 4: Freelance & Independent Projects */}
                    <div className="border-2 border-black bg-yellow-50 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                        <h5 className="font-black text-base uppercase text-black">
                          freelance & independent projects
                        </h5>
                        <span className="font-mono text-xs font-bold text-zinc-700 bg-yellow-200 border border-black px-2 py-0.5">
                          2021 – Present, Global / Remote
                        </span>
                      </div>
                      <p className="text-xs font-mono font-black text-pink-600 mb-2">
                        Multiple High-Tempo Client Projects
                      </p>
                      <ul className="text-xs text-zinc-800 space-y-1.5 font-medium pl-1">
                        <li className="flex items-start gap-2">
                          <span className="text-pink-600 font-bold mt-0.5">•</span>
                          <span>Executed a substantial volume of freelance projects for fashion, tech, lifestyle brands, and creator platforms (unlisted on the condensed resume).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-600 font-bold mt-0.5">•</span>
                          <span>End-to-end UGC scripting, aesthetic filming, viral hook creation, and customized organic social media growth strategy.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Job 5: First 2 Years: Junior & Intern Foundations */}
                    <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                        <h5 className="font-black text-base uppercase text-black">
                          junior specialist & intern foundations
                        </h5>
                        <span className="font-mono text-xs font-bold text-zinc-600 bg-zinc-100 border border-black px-2 py-0.5">
                          2019 – 2021 (First 2 Years)
                        </span>
                      </div>
                      <p className="text-xs font-mono font-black text-pink-600 mb-2">
                        Marketing Agencies & Creative Studios // Warsaw & Minsk
                      </p>
                      <ul className="text-xs text-zinc-800 space-y-1.5 font-medium pl-1">
                        <li className="flex items-start gap-2">
                          <span className="text-pink-600 font-bold mt-0.5">•</span>
                          <span>Spent the first 2 years of professional career gaining extensive hands-on experience as a junior specialist and intern across creative agencies (Pocket Rocket, Cut It Studio, and creative workshops).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-600 font-bold mt-0.5">•</span>
                          <span>Mastered foundational skills in social media management, content research, campaign assistance, on-set logistics, and graphic asset design.</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Education section inside Resume sheet */}
                <div>
                  <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-4">
                    <h4 className="text-xl font-black uppercase tracking-tight text-black">
                      education
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-[#39FF14] text-black px-2 py-0.5 border border-black">
                      ACADEMIC & COURSES
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs text-zinc-800">
                    <div className="border-2 border-black p-3 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <strong className="text-black font-black uppercase text-xs">ESPAI</strong>
                        <span className="text-pink-600 font-bold">7/2024 – 10/2024</span>
                      </div>
                      <p className="text-zinc-600">digital marketing course</p>
                    </div>

                    <div className="border-2 border-black p-3 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <strong className="text-black font-black uppercase text-xs">University of Warsaw</strong>
                        <span className="text-pink-600 font-bold">10/2019 – 6/2022</span>
                      </div>
                      <p className="text-zinc-600">public relations</p>
                    </div>

                    <div className="border-2 border-black p-3 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <strong className="text-black font-black uppercase text-xs">UMCS Lublin, Poland</strong>
                        <span className="text-pink-600 font-bold">10/2018 – 06/2019</span>
                      </div>
                      <p className="text-zinc-600">language course</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 6. CREATOR & COLLABORATIONS SECTION */}
        <CreatorCollabSection />

        {/* 7. EDUCATION SECTION */}
        <section id="section-education" className="mb-16 border-b-2 border-black pb-14">
          <div className="border-b-2 border-black pb-3 mb-8 flex flex-wrap items-baseline justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-pink-600 block uppercase">// ACADEMIC_&_TRAINING</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Education</h2>
            </div>
            <span className="font-mono text-xs font-bold text-zinc-600">// DEGREES & CERTIFICATIONS</span>
          </div>

          <div className="space-y-6">
            
            {/* Primary Education Card: University of Warsaw */}
            <div className="border-3 border-black bg-zinc-950 text-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6 pb-5 border-b border-zinc-800">
                
                {/* University of Warsaw Crest Emblem */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border-2 border-black p-1.5 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
                    <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5,1.5" />
                    <text x="50" y="16" textAnchor="middle" fontSize="6.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">UNIWERSYTET</text>
                    <text x="50" y="93" textAnchor="middle" fontSize="6" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.5">WARSZAWSKI</text>
                    
                    <path d="M50 24 L52 28 L56 27 L53 31 L57 32 L53 35 L56 38 L52 37 L50 41 L48 37 L44 38 L47 35 L43 32 L47 31 L44 27 L48 28 Z" />
                    <path d="M34 44 C27 40, 22 48, 20 59 C26 56, 32 54, 38 52 C35 60, 28 66, 26 74 C34 70, 40 66, 44 60 Z" />
                    <path d="M66 44 C73 40, 78 48, 80 59 C74 56, 68 54, 62 52 C65 60, 72 66, 74 74 C66 70, 60 66, 56 60 Z" />
                    <path d="M44 42 C44 42, 50 39, 56 42 C54 52, 53 66, 50 75 C47 66, 46 52, 44 42 Z" />
                    <path d="M46 75 L50 82 L54 75 Z" />
                    <circle cx="50" cy="30" r="1.5" />
                    <circle cx="43" cy="33" r="1.2" />
                    <circle cx="57" cy="33" r="1.2" />
                    <circle cx="37" cy="37" r="1" />
                    <circle cx="63" cy="37" r="1" />
                    <path d="M30 75 C40 82, 60 82, 70 75" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#39FF14] text-black font-mono font-bold text-[10px] px-2 py-0.5 border border-black">
                      OFFICIAL DEGREE
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-400">WARSAW, POLAND</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    University of Warsaw
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-zinc-300 mt-0.5">
                    Public Relations // Bachelor of Business and Management
                  </p>
                  <p className="text-xs font-mono font-bold text-pink-400 mt-1">
                    10/2019 – 6/2022
                  </p>
                </div>
              </div>

              {/* Exact Bullets from the screen */}
              <div className="space-y-3 font-normal text-sm sm:text-base text-zinc-200">
                <div className="flex items-start gap-3">
                  <span className="text-[#39FF14] font-black text-lg leading-none mt-1">■</span>
                  <p className="leading-relaxed">
                    <strong className="text-white font-bold">Academic focus areas:</strong> Public Relations, Marketing and Consumer Behavior, Business Strategy and Organizational Management
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#39FF14] font-black text-lg leading-none mt-1">■</span>
                  <p className="leading-relaxed">
                    <strong className="text-white font-bold">Honors & awards:</strong> Social Entrepreneur 2021, BraveCamp Entrepreneurship Academy Award
                  </p>
                </div>
              </div>

              {/* Identity verification footer from the screen */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-2">
                <span className="text-white font-bold">Anastasiya Shauchuk | neizydeizy@gmail.com | +34 675 151 651</span>
                <span className="text-[#39FF14]">VERIFIED ACADEMIC CREDENTIALS</span>
              </div>
            </div>

            {/* Additional Education and Specialization Cards from Resume */}
            <div className="grid md:grid-cols-2 gap-5">
              
              <div className="border-2 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 border border-black bg-[#FFBA08]">
                      DIGITAL MARKETING
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-500">7/2024 – 10/2024</span>
                  </div>
                  <h4 className="font-black text-lg uppercase tracking-tight mt-1 mb-1">
                    ESPAI
                  </h4>
                  <p className="text-xs font-mono font-bold text-pink-600 mb-2">
                    Digital Marketing Course
                  </p>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    Intensive digital marketing specialization covering performance marketing, consumer acquisition channels, and content strategy.
                  </p>
                </div>
              </div>

              <div className="border-2 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 border border-black bg-cyan-200">
                      LANGUAGE SPECIALIZATION
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-500">10/2018 – 06/2019</span>
                  </div>
                  <h4 className="font-black text-lg uppercase tracking-tight mt-1 mb-1">
                    UMCS Lublin, Poland
                  </h4>
                  <p className="text-xs font-mono font-bold text-pink-600 mb-2">
                    Language Course
                  </p>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    Advanced language studies providing academic and professional language proficiency in Poland.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 6. CONTACT SECTION */}
        <footer id="section-contact" className="grid md:grid-cols-2 items-center gap-8 pt-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#0022FF] tracking-widest block uppercase">// READY_FOR_SCALE</span>
            <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter italic leading-none mt-1">
              Let's work<br/> together.
            </h2>
            
            {/* Interactive Email Badge */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a 
                id="brutalist-email-link"
                href="mailto:neizydeizy@gmail.com"
                className="font-black text-base sm:text-lg text-black hover:text-white border-2 border-black bg-[#FFE600] hover:bg-[#0022FF] px-3.5 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors inline-block font-mono"
              >
                neizydeizy@gmail.com
              </a>
              <button
                id="brutalist-copy-email-btn"
                onClick={handleCopyEmail}
                className="border-2 border-black bg-white hover:bg-[#39FF14] p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs font-bold font-mono transition-colors flex items-center gap-1 cursor-pointer"
                title="Copy Email Address"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'COPIED!' : 'COPY'}</span>
              </button>
            </div>

            <p className="mt-3 text-xs font-mono font-bold text-zinc-600">
              TEL: <a href="https://wa.me/34675151651" target="_blank" rel="noreferrer" className="text-black hover:underline hover:text-[#0022FF]">+34 675 151 651</a> (WhatsApp)
            </p>
          </div>

          {/* Interactive Badges / Stickers */}
          <div className="flex flex-wrap justify-start md:justify-end items-center gap-4">
            <a
              id="brutalist-instagram-sticker"
              href="https://instagram.com/nastexx"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-black p-4 bg-[#FFE600] rotate-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:rotate-6 hover:scale-105 transition-transform block select-none cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-black tracking-tight text-base">INSTAGRAM</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono block text-zinc-800">@NASTEXX</span>
            </a>

            <button
              id="brutalist-showreel-sticker"
              onClick={() => setShowShowreel(true)}
              className="border-2 border-black p-4 bg-[#0022FF] text-white -rotate-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-rotate-6 hover:scale-105 transition-transform block select-none text-left cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-black tracking-tight text-base text-white">SHOWREEL</span>
                <Video className="w-4 h-4 text-[#39FF14]" />
              </div>
              <span className="text-[10px] font-mono block text-zinc-200">WATCH 2026 REEL</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Showreel Interactive Modal */}
      <ShowreelModal 
        isOpen={showShowreel} 
        onClose={() => setShowShowreel(false)} 
      />

      {/* 6 Work Portfolio Album Modal */}
      <ProjectAlbumModal 
        projectId={activeAlbumId}
        isOpen={activeAlbumId !== null}
        onClose={() => setActiveAlbumId(null)}
        albumItems={activeAlbumId ? (albums[activeAlbumId] || DEFAULT_ALBUMS_DATA[activeAlbumId]?.defaultItems || []) : []}
        links={activeAlbumId ? (projectLinks[activeAlbumId] || DEFAULT_ALBUMS_DATA[activeAlbumId]?.defaultLinks || []) : []}
        onAddMediaFiles={(projId, files) => addMediaToAlbum(projId, files)}
        onAddMediaUrl={(projId, mediaData) => addMediaItemByUrl(projId, mediaData)}
        onRemoveMedia={(projId, mediaId) => removeMediaFromAlbum(projId, mediaId)}
        onResetAlbum={(projId) => resetAlbumToDefault(projId)}
      />

      <style dangerouslySetInnerHTML={{__html: `
        /* Neo-Brutalism Zine styling */
        body { font-family: 'Arial', system-ui, -apple-system, sans-serif; }
      `}} />
      </div>
    </WaterBackground>
  );
}
