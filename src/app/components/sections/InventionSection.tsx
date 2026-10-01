// File: src/app/components/sections/InventionSection.tsx
'use client'

import { useState } from 'react'
import { 
  ShieldCheck, 
  TrendingDown, 
  Zap, 
  Sparkles, 
  Lock, 
  Mail, 
  Copy, 
  Check, 
  Building2, 
  ArrowUpRight, 
  FileCheck2,
  Scale
} from 'lucide-react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { inventionData } from '@/app/data/portfolio'
import { cn } from '@/app/lib/utils'

export function InventionSection() {
  const { language, dir } = useLanguage()
  const [copiedId, setCopiedId] = useState(false)
  const isFa = language === 'fa'

  const copyUniqueId = () => {
    navigator.clipboard.writeText(inventionData.uniqueId)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2500)
  }

  const icons = [TrendingDown, Building2, Zap]

  return (
    <section
      id="invention"
      dir={dir}
      className="relative bg-[#f8f9fa] dark:bg-[#07090d] border-t border-neutral-200/70 dark:border-neutral-800/70 py-20 sm:py-28 overflow-hidden transition-colors duration-500"
    >
      {/* Background Subtle Tech Ambient Gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-500/5 via-cyan-500/5 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          
          {/* Official Patent Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-sm mb-6">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className={isFa ? 'font-sahel' : ''}>
              {isFa ? 'اختراع رسمی و ثبت‌شده در مالکیت معنوی' : 'OFFICIALLY REGISTERED & PATENTED INNOVATION'}
            </span>
          </div>

          <h2 className={cn(
            "text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white leading-tight mb-6 tracking-tight",
            isFa && 'font-sahel'
          )}>
            {isFa ? inventionData.titleFa : inventionData.title}
          </h2>

          <p className={cn(
            "text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium",
            isFa && 'font-sahel'
          )}>
            {isFa ? inventionData.subtitleFa : inventionData.subtitle}
          </p>
        </div>

        {/* Credentials & Verification Card */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="relative overflow-hidden rounded-2xl border-2 border-neutral-300/80 dark:border-neutral-700/80 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md p-6 sm:p-8 shadow-xl">
            {/* Top gold/cyan accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
              
              {/* Left/Right: Registration Code */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <FileCheck2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className={cn("text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400", isFa && 'font-sahel')}>
                    {isFa ? 'شماره ثبت رسمی اختراع' : 'Official Patent Registration'}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-amber-400 tracking-wider font-mono">
                    {inventionData.registrationNumber}
                  </div>
                </div>
              </div>

              {/* Middle separator */}
              <div className="hidden md:block w-px h-12 bg-neutral-200 dark:bg-neutral-800" />

              {/* Unique National ID with 1-click Copy */}
              <div className="flex items-center justify-between md:justify-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Scale className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <div className={cn("text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400", isFa && 'font-sahel')}>
                    {isFa ? 'شناسه یکتای استعلام رسمی' : 'Unique Verification ID'}
                  </div>
                  <div className="text-base sm:text-lg font-black text-neutral-900 dark:text-cyan-400 tracking-wider font-mono break-all">
                    {inventionData.uniqueId}
                  </div>
                </div>
              </div>

              {/* Copy button */}
              <button
                type="button"
                onClick={copyUniqueId}
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-300",
                  copiedId
                    ? "bg-green-600 text-white border-green-600 shadow-md"
                    : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700",
                  isFa && 'font-sahel'
                )}
                title="Copy Unique ID for verification"
              >
                {copiedId ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{isFa ? 'کپی شناسه یکتا' : 'Copy ID'}</span>
                  </>
                )}
              </button>

            </div>

            {/* General Overview statement */}
            <div className={cn(
              "mt-6 pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed",
              isFa && 'font-sahel text-right'
            )}>
              {isFa ? inventionData.descriptionFa : inventionData.description}
            </div>

          </div>
        </div>

        {/* 3 Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {inventionData.pillars.map((pillar, idx) => {
            const Icon = icons[idx]
            return (
              <div
                key={idx}
                className="group relative p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center mb-5 text-neutral-900 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className={cn(
                  "text-lg sm:text-xl font-black text-neutral-900 dark:text-white mb-3",
                  isFa && 'font-sahel'
                )}>
                  {isFa ? pillar.titleFa : pillar.title}
                </h3>

                <p className={cn(
                  "text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed",
                  isFa && 'font-sahel text-right'
                )}>
                  {isFa ? pillar.descFa : pillar.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Confidential Partnership & Investment Callout Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border-2 border-purple-500/40 bg-gradient-to-br from-purple-500/10 via-white/80 to-purple-500/5 dark:from-purple-950/40 dark:via-neutral-900/80 dark:to-neutral-950 p-8 sm:p-10 shadow-2xl">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-600 dark:text-purple-300 flex-shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={cn("text-xl sm:text-2xl font-black text-neutral-900 dark:text-white", isFa && 'font-sahel')}>
                    {isFa ? 'فرصت سرمایه‌گذاری و مشارکت استراتژیک' : 'Strategic Partnership & Capital Investment'}
                  </h4>
                  <p className={cn("text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-semibold", isFa && 'font-sahel')}>
                    {isFa ? 'مذاکرات محرمانه با سرمایه‌گذاران، کارخانجات و شرکت‌های بازرگانی' : 'Open for institutional investors, manufacturing syndicates & commercial leaders'}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-500/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isFa ? 'سطح محرمانگی: NDA' : 'Strict NDA Protocol'}</span>
              </div>
            </div>

            <p className={cn(
              "text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8",
              isFa && 'font-sahel text-right'
            )}>
              {isFa ? inventionData.securityNoteFa : inventionData.securityNote}
            </p>

            {/* CTAs */}
            <div className={cn(
              "flex flex-col sm:flex-row items-stretch sm:items-center gap-4",
              isFa && 'sm:flex-row-reverse'
            )}>
              <a
                href={`mailto:soroush.qary.eemit@gmail.com?subject=${encodeURIComponent(
                  isFa 
                    ? 'درخواست جلسه محرمانه و بررسی سرمایه‌گذاری - اختراع ثبت‌شده ۱۱۴۳۵۰'
                    : 'Confidential Inquiry & Investor Briefing - Patented Innovation #114350'
                )}&body=${encodeURIComponent(
                  isFa
                    ? 'با سلام،\n\nاینجانب تمایل دارم جهت دریافت پروپوزال، مدل اقتصادی و بررسی فرصت‌های سرمایه‌گذاری و همکاری تجاری در خصوص اختراع ثبت‌شده شماره ۱۱۴۳۵۰ هماهنگی لازم جهت برگزاری جلسه اختصاصی را انجام دهم.\n\nنام / سازمان:\nشماره تماس:'
                    : 'Hello Soroush,\n\nI am contacting you regarding your patent-registered e-commerce innovation (#114350). We are interested in reviewing executive documentation and discussing potential investment/partnership opportunities under mutual NDA.\n\nName / Organization:\nContact Phone:'
                )}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white",
                  "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500",
                  "shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02]",
                  isFa && 'font-sahel'
                )}
              >
                <Mail className="w-4 h-4" />
                <span>{isFa ? 'درخواست پروپوزال و جلسه سرمایه‌گذاری' : 'Request Investor Pitch & NDA Session'}</span>
                <ArrowUpRight className={cn("w-4 h-4", isFa && 'rotate-90')} />
              </a>

              <button
                type="button"
                onClick={() => {
                  const contactEl = document.getElementById('contact')
                  if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' })
                }}
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm",
                  "border-2 border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200",
                  "hover:border-purple-600 dark:hover:border-purple-400 transition-all duration-300",
                  isFa && 'font-sahel'
                )}
              >
                <span>{isFa ? 'تماس مستقیم با مخترع' : 'Contact Soroush Directly'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
