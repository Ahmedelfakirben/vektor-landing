/* ==========================================================================
   VEKTOR LABS - GSAP ANIMATION ENGINE
   Preloader (POS & Inventory Edition), Hero Choreography & ScrollTrigger
   ========================================================================== */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initGsapAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const preloader = document.getElementById('vektorPreloader');
  const counterEl = document.querySelector('.preloader-counter');
  const barEl = document.querySelector('.preloader-progress-bar');
  const stockEl = document.getElementById('preloaderStockCount');
  const statusText = document.querySelector('.preloader-status-text');
  const scannerWrap = document.querySelector('.preloader-scanner-wrap');

  if (prefersReducedMotion) {
    if (preloader) preloader.remove();
    return;
  }

  // Master timeline for entrance
  const masterTl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    onComplete: () => {
      if (preloader) {
        preloader.remove();
      }
      initScrollAnimations();
    }
  });

  // 1. POS & INVENTORY LOADER SEQUENCE
  if (preloader && counterEl && barEl) {
    const counterObj = { val: 0 };
    const stockObj = { val: 0 };

    // Percentage counter (0% -> 100%)
    masterTl.to(counterObj, {
      val: 100,
      duration: 1.25,
      ease: 'power2.inOut',
      onUpdate: () => {
        counterEl.textContent = `${Math.round(counterObj.val)}%`;
      }
    }, 0);

    // Progress bar fill
    masterTl.to(barEl, {
      width: '100%',
      duration: 1.25,
      ease: 'power2.inOut'
    }, 0);

    // Inventory items counter (0 -> 1,840)
    if (stockEl) {
      masterTl.to(stockObj, {
        val: 1840,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          stockEl.textContent = Math.round(stockObj.val).toLocaleString('es-ES');
        }
      }, 0);
    }

    // Barcode scanner intro pop
    if (scannerWrap) {
      masterTl.fromTo(scannerWrap,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
        0
      );
    }

    // POS status checkpoints
    masterTl.to(statusText, {
      opacity: 0,
      duration: 0.12,
      onComplete: () => {
        statusText.textContent = 'Sincronizando stock & catálogo...';
      }
    }, 0.45);
    masterTl.to(statusText, { opacity: 1, duration: 0.18 }, 0.58);

    masterTl.to(statusText, {
      opacity: 0,
      duration: 0.12,
      onComplete: () => {
        statusText.textContent = 'Terminal TPV & Caja 100% Listos ✓';
        statusText.style.color = '#7BE099';
      }
    }, 0.95);
    masterTl.to(statusText, { opacity: 1, duration: 0.18 }, 1.08);

    // Preloader exit
    masterTl.to('.preloader-content', {
      scale: 0.95,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in'
    }, '+=0.15');

    masterTl.to(preloader, {
      yPercent: -100,
      duration: 0.75,
      ease: 'power4.inOut'
    }, '-=0.1');
  } else {
    initScrollAnimations();
  }

  // 2. HERO CHOREOGRAPHY (Safe clearProps: only transform & opacity)
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl.from('.navbar', {
    y: -30,
    opacity: 0,
    duration: 0.8,
    clearProps: 'transform,opacity'
  }, '-=0.5');

  heroTl.from('.hero-title', {
    y: 35,
    opacity: 0,
    duration: 0.9,
    clearProps: 'transform,opacity'
  }, '-=0.6');

  heroTl.from('.hero-subtitle', {
    y: 25,
    opacity: 0,
    duration: 0.8,
    clearProps: 'transform,opacity'
  }, '-=0.6');

  heroTl.from('.hero-actions .btn-primary-glow', {
    scale: 0.9,
    opacity: 0,
    duration: 0.7,
    ease: 'back.out(1.4)',
    clearProps: 'transform,opacity'
  }, '-=0.5');

  heroTl.from('.hero-metrics .metric', {
    y: 25,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    clearProps: 'transform,opacity'
  }, '-=0.4');

  masterTl.add(heroTl, '-=0.6');
}

/**
 * ScrollTrigger reveals across page sections
 * Strictly uses clearProps: 'transform,opacity' to preserve CSS alignments
 */
function initScrollAnimations() {
  // Section headers reveal
  const sectionHeaders = document.querySelectorAll('.section-header, .section-header-centered');
  sectionHeaders.forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.75,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });
  });

  // Product Carousel / Cards
  const showcaseWrapper = document.querySelector('.catalog-carousel-wrapper');
  if (showcaseWrapper) {
    gsap.from(showcaseWrapper, {
      scrollTrigger: {
        trigger: showcaseWrapper,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });
  }

  // Comparison Cards
  const comparisonCards = document.querySelectorAll('.comparison-card');
  if (comparisonCards.length > 0) {
    gsap.from(comparisonCards, {
      scrollTrigger: {
        trigger: '.comparison-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 45,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });
  }

  // Bento Feature Cards
  const bentoCards = document.querySelectorAll('.bento-card');
  if (bentoCards.length > 0) {
    ScrollTrigger.batch(bentoCards, {
      start: 'top 85%',
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 35,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'transform,opacity'
        });
      },
      once: true
    });
  }

  // Pricing Cards
  const pricingCards = document.querySelectorAll('.pricing-card');
  if (pricingCards.length > 0) {
    gsap.from(pricingCards, {
      scrollTrigger: {
        trigger: '.pricing-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.2)',
      clearProps: 'transform,opacity'
    });
  }

  // FAQ Accordion items
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  if (faqItems.length > 0) {
    ScrollTrigger.batch(faqItems, {
      start: 'top 90%',
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform,opacity'
        });
      },
      once: true
    });
  }
}
