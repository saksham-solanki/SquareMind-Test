# Phase 3: UX & Design Polish - Research

**Researched:** 2026-03-09
**Domain:** Frontend animations, micro-interactions, UX patterns (Framer Motion + CSS + Next.js App Router)
**Confidence:** HIGH

## Summary

Phase 3 layers animation and UX polish onto a fully functional Next.js 16 / React 19 / Tailwind CSS 4 site. The site already uses Framer Motion v12.35.0 (installed) with a `FadeUp` component for scroll-triggered entrance animations. The existing Navbar has scroll detection and a mobile hamburger menu using CSS `max-height` transitions. The homepage has static stat numbers and a static testimonial grid (3 cards side-by-side, not a carousel).

The core challenge is page transitions in Next.js App Router -- AnimatePresence does not work out-of-the-box because the router unmounts/remounts components during navigation, disrupting exit animations. The proven solution is the "FrozenRouter" pattern that preserves router context during animation exit. All other requirements (count-up, carousel, micro-interactions, skeleton screens, scroll progress, glassmorphism) are straightforward Framer Motion + CSS implementations.

**Primary recommendation:** Use Framer Motion for all JS-driven animations (page transitions, count-up, carousel, entrance animations), CSS/Tailwind for all hover micro-interactions (scale, glow, shadow lift), and the native Intersection Observer API (via Framer Motion's `whileInView`) for scroll-triggered effects. Do NOT add any additional animation libraries.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| UX-01 | Smooth page transitions between routes using Framer Motion layout animations | FrozenRouter + LayoutTransition pattern in (main)/layout.tsx; AnimatePresence with mode="wait" |
| UX-02 | Interactive testimonial carousel with autoplay, swipe, pause-on-hover | Framer Motion drag gestures + auto-advance timer; no external carousel library needed |
| UX-03 | Animated stats counters (count-up) triggered on scroll into view | Framer Motion useInView + useMotionValue + useTransform + animate() |
| UX-04 | Improved mobile nav: slide-in drawer, backdrop blur, close-on-route-change | Replace max-height CSS with Framer Motion AnimatePresence slide + backdrop-blur overlay; usePathname effect for auto-close |
| UX-05 | Micro-interactions on hover/focus + scroll-triggered reveals | CSS transitions for hover (scale, shadow, glow); existing FadeUp component handles scroll reveals |
| UX-06 | Loading states and skeleton screens | Tailwind animate-pulse skeleton components; React Suspense boundaries where applicable |
| UX-07 | Scroll progress indicator on blog posts | useScroll + useSpring from Framer Motion; fixed bar at top of page |
| UX-08 | Animated social proof / trust signals | Extend count-up pattern from UX-03; add animated ticker or rotating text |
| UX-09 | Visual hierarchy and spacing refinements | Tailwind spacing audit; consistent section padding; typography scale review |
| UX-10 | Modern UI patterns (glassmorphism navbar, parallax hero, gradient mesh) | CSS backdrop-blur (already on navbar); Framer Motion useScroll for parallax; CSS gradient backgrounds |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | 12.35.0 | All JS-driven animations (page transitions, scroll animations, drag gestures, layout animations) | Already installed; industry standard for React animation; handles AnimatePresence, drag, layout |
| Tailwind CSS | 4.x | Hover micro-interactions, skeleton screens, glassmorphism, spacing | Already installed; CSS transitions via utility classes are more performant than JS for simple hover states |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1 | Conditional class composition | Already installed; use for toggling animation classes |
| tailwind-merge | 3.5.0 | Merge conflicting Tailwind classes | Already installed; use when overriding base animation classes |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Framer Motion carousel | Embla Carousel / Swiper | Adds bundle size; Framer Motion drag handles the carousel use case without extra deps |
| Framer Motion count-up | react-countup | Adds a dependency for something achievable with 20 lines of Framer Motion code |
| CSS page transitions | View Transitions API | Browser support still incomplete; Framer Motion gives full control |

**Installation:**
```bash
# Nothing to install -- all dependencies already present
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── animations/
│   │   ├── LayoutTransition.tsx    # Page transition wrapper (FrozenRouter pattern)
│   │   ├── FadeUp.tsx              # EXISTING - scroll-triggered fade (keep as-is)
│   │   ├── CountUp.tsx             # Animated number counter
│   │   ├── ScrollProgress.tsx      # Blog post reading progress bar
│   │   └── StaggerChildren.tsx     # Stagger wrapper for lists (optional)
│   ├── TestimonialCarousel.tsx     # Carousel with drag, autoplay, dots
│   ├── Navbar.tsx                  # MODIFY - add glassmorphism, improved mobile drawer
│   ├── SkeletonCard.tsx            # Reusable skeleton loading component
│   └── ...existing components
├── app/
│   ├── (main)/
│   │   ├── layout.tsx              # MODIFY - wrap children in LayoutTransition
│   │   └── ...pages
│   └── ...
└── ...
```

### Pattern 1: Page Transitions with FrozenRouter
**What:** Wrap route content in AnimatePresence using a frozen router context to prevent premature unmounting during exit animations.
**When to use:** In the `(main)/layout.tsx` to animate transitions between all main pages.
**Example:**
```typescript
// src/components/animations/LayoutTransition.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef } from "react";

function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T>();
  useEffect(() => {
    prevValue.current = value;
    return () => { prevValue.current = undefined; };
  });
  return prevValue.current;
}

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;
  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);
  const changed = segment !== prevSegment && segment !== undefined && prevSegment !== undefined;
  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export function LayoutTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const segment = useSelectedLayoutSegment();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={segment}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
```
**Source:** https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router (verified working with Next.js 16)

### Pattern 2: Count-Up Animation with Intersection Observer
**What:** Animate numbers from 0 to target value when section scrolls into view.
**When to use:** Homepage stats bar, social proof counters.
**Example:**
```typescript
// src/components/animations/CountUp.tsx
"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform, motion, animate } from "framer-motion";

export function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration, ease: "easeOut" });
    }
  }, [isInView, count, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
```

### Pattern 3: Testimonial Carousel with Drag Gestures
**What:** Horizontal carousel with drag-to-swipe, auto-advance, and pause-on-hover.
**When to use:** Testimonials section on homepage.
**Example:**
```typescript
// Key pattern: use motion.div with drag="x" and dragConstraints
// Auto-advance via setInterval, cleared on hover (onHoverStart/onHoverEnd)
// Track active index in state, render dots for navigation
// Use AnimatePresence for slide transitions

const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

// Auto-advance
useEffect(() => {
  if (isPaused) return;
  const timer = setInterval(() => {
    setActiveIndex(([prev]) => [(prev + 1) % items.length, 1]);
  }, 5000);
  return () => clearInterval(timer);
}, [isPaused, items.length]);

// Swipe detection via drag end velocity
const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
  const swipe = Math.abs(offset.x) * velocity.x;
  if (swipe < -10000) nextSlide();
  else if (swipe > 10000) prevSlide();
};
```

### Pattern 4: Scroll Progress Bar
**What:** Fixed bar at top of page showing read progress on blog posts.
**When to use:** Blog post detail pages (`/insights/[slug]`).
**Example:**
```typescript
"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-sage origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}
```

### Pattern 5: Mobile Nav Slide-In Drawer
**What:** Replace current max-height CSS toggle with Framer Motion slide + backdrop blur overlay.
**When to use:** Navbar mobile menu.
**Example:**
```typescript
// AnimatePresence wrapping the mobile menu
// motion.div with initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
// Backdrop: motion.div with initial={{ opacity: 0 }} animate={{ opacity: 1 }} + backdrop-blur-sm
// Close on route change: useEffect watching usePathname()
useEffect(() => {
  setMobileOpen(false);
}, [pathname]);
```

### Anti-Patterns to Avoid
- **Animating layout properties (width, height, top, left):** Use `transform` and `opacity` only for 60fps. Framer Motion handles this automatically with `x`, `y`, `scale`, `opacity`.
- **Over-animating:** Not every element needs animation. Animate entrance of sections, not every paragraph.
- **Missing `will-change` cleanup:** Framer Motion adds `will-change: transform` automatically and cleans it up. Do not add it manually in CSS for Framer Motion elements.
- **Blocking page load with animations:** Use `initial={false}` on AnimatePresence for the first page load to skip entrance animations.
- **Importing all of framer-motion:** Use specific imports: `import { motion, AnimatePresence } from "framer-motion"` -- tree-shaking handles the rest.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animations | Custom IntersectionObserver hooks | Framer Motion `whileInView` / `useInView` | Handles thresholds, margins, cleanup automatically |
| Drag/swipe detection | Custom touch event handlers | Framer Motion `drag` prop + `onDragEnd` | Handles momentum, constraints, velocity calculations |
| Spring physics | Manual easing functions | Framer Motion `useSpring` | Physically accurate spring dynamics |
| Number formatting for counters | Manual toLocaleString in animation loop | Separate the animation value from display formatting | Keeps animation smooth, formatting clean |
| Reduced motion detection | Custom matchMedia listener | Framer Motion `useReducedMotion()` or `MotionConfig reducedMotion="user"` | Built-in, handles all edge cases |

**Key insight:** Framer Motion v12 already handles the hard animation problems (gesture recognition, spring physics, layout animations, accessibility). The implementation work is composing these primitives, not building from scratch.

## Common Pitfalls

### Pitfall 1: Page Transitions Breaking in App Router
**What goes wrong:** AnimatePresence exit animations don't play because Next.js App Router unmounts components immediately on navigation.
**Why it happens:** The router context updates before the exit animation completes, causing the old page to disappear instantly.
**How to avoid:** Use the FrozenRouter pattern (see Architecture Pattern 1). The `LayoutRouterContext` is imported from `next/dist/shared/lib/app-router-context.shared-runtime`.
**Warning signs:** Exit animations never play; pages swap instantly despite AnimatePresence being present.

### Pitfall 2: LayoutRouterContext Import Path Breaking on Next.js Updates
**What goes wrong:** The FrozenRouter pattern imports from an internal Next.js module (`next/dist/shared/lib/app-router-context.shared-runtime`) which is not part of the public API.
**Why it happens:** Next.js does not officially expose this context.
**How to avoid:** Pin the import path, add a comment noting it is internal, and test after any Next.js version bump. If it breaks, the alternative is using `template.tsx` (which re-renders on every navigation but loses exit animation capability).
**Warning signs:** TypeScript errors or runtime crashes after updating Next.js.

### Pitfall 3: Carousel Auto-Advance Not Pausing
**What goes wrong:** Carousel keeps advancing while user is interacting (hovering, dragging).
**Why it happens:** The auto-advance timer is not linked to interaction state.
**How to avoid:** Clear the interval on `onHoverStart` and `onDragStart`; restart on `onHoverEnd` and `onDragEnd`. Use a ref for the timer so it can be cleared from event handlers.
**Warning signs:** Slides change mid-drag or while user is reading a testimonial.

### Pitfall 4: Count-Up Triggering Multiple Times
**What goes wrong:** The count-up animation replays every time the section scrolls in/out of view.
**Why it happens:** `useInView` defaults to `once: false`.
**How to avoid:** Always set `{ once: true }` in the useInView options.
**Warning signs:** Numbers reset to 0 and re-animate when scrolling back up.

### Pitfall 5: Performance Issues with Many Animated Elements
**What goes wrong:** Page jank, especially on mobile, when too many elements animate simultaneously.
**Why it happens:** Each Framer Motion component creates a separate animation loop.
**How to avoid:** Use `viewport={{ once: true, margin: "-60px" }}` to trigger animations only once. Batch staggered animations. Limit simultaneous animations to 3-5 elements. Use CSS transitions for simple hover effects instead of Framer Motion.
**Warning signs:** Low FPS on mobile; layout shifts during scroll.

### Pitfall 6: Ignoring prefers-reduced-motion
**What goes wrong:** Users with motion sensitivity experience discomfort.
**Why it happens:** Developers forget accessibility.
**How to avoid:** Wrap the root layout in `<MotionConfig reducedMotion="user">`. This automatically disables transform/layout animations while preserving opacity for users who prefer reduced motion.
**Warning signs:** No reduced motion handling in the codebase.

### Pitfall 7: Homepage is a Server Component with metadata export
**What goes wrong:** Cannot use Framer Motion directly in the homepage because it exports `metadata` (server component).
**Why it happens:** Framer Motion requires "use client" but metadata export requires server component.
**How to avoid:** Keep the page as a server component; extract animated sections into separate client components (CountUpStats, TestimonialCarousel, etc.) and import them into the page.
**Warning signs:** "use client" error when trying to add animations to a page with metadata export.

## Code Examples

### Glassmorphism Navbar (CSS Enhancement)
```typescript
// Already partially implemented in Navbar.tsx (backdrop-blur-[24px], bg-chalk/95)
// Enhance with:
className={cn(
  "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
  scrolled
    ? "backdrop-blur-2xl bg-chalk/80 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
    : "backdrop-blur-xl bg-chalk/60"
)}
// The navbar ALREADY has glassmorphism. Refinement is adjusting opacity values.
```

### Skeleton Card Component
```typescript
// src/components/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <div className="bg-cream rounded-[20px] p-9 animate-pulse">
      <div className="h-3 w-20 bg-cream-dark rounded mb-4" />
      <div className="h-5 w-full bg-cream-dark rounded mb-2" />
      <div className="h-5 w-3/4 bg-cream-dark rounded mb-4" />
      <div className="h-3 w-24 bg-cream-dark rounded" />
    </div>
  );
}
```

### Hover Micro-Interactions (CSS-Only)
```css
/* Button glow on hover -- use Tailwind classes */
/* hover:shadow-[0_0_20px_rgba(42,111,90,0.3)] hover:scale-[1.03] transition-all duration-300 */

/* Card lift on hover -- already partially implemented */
/* hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-400 */

/* Focus ring for accessibility */
/* focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:outline-none */
```

### Parallax Hero Section
```typescript
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxHero({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
```

### MotionConfig for Reduced Motion (Root Level)
```typescript
// In (main)/layout.tsx, wrap everything:
import { MotionConfig } from "framer-motion";

<MotionConfig reducedMotion="user">
  <Navbar />
  <LayoutTransition>
    <main className="pt-20">{children}</main>
  </LayoutTransition>
  <Footer />
</MotionConfig>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router `_app.tsx` AnimatePresence | FrozenRouter pattern in App Router layout | Next.js 13+ (2023) | Must use FrozenRouter; AnimatePresence alone does not work |
| `framer-motion` package name | Both `framer-motion` and `motion` work (v12) | 2024 | Either import path works; project uses `framer-motion` -- keep it |
| Manual IntersectionObserver | Framer Motion `whileInView` / `useInView` | Framer Motion v7 (2022) | No need for custom hooks |
| jQuery carousels / Swiper | Framer Motion `drag` + AnimatePresence | 2023+ | Zero-dep carousel possible with Framer Motion |
| CSS `@keyframes` for complex animations | Framer Motion declarative animations | Established | CSS still preferred for simple hover transitions |

**Deprecated/outdated:**
- `framer-motion` v11 `layout` prop issues: Fixed in v12
- View Transitions API: Still experimental, not production-ready for cross-browser use

## Open Questions

1. **FrozenRouter internal import stability**
   - What we know: The pattern works with Next.js 16.1.6 and the import path is `next/dist/shared/lib/app-router-context.shared-runtime`
   - What's unclear: Whether this path will remain stable across Next.js patches
   - Recommendation: Use it (it is the community-standard solution), but add a comment and test after Next.js upgrades

2. **Stats data for count-up animation**
   - What we know: Homepage stats are hardcoded strings like "1,200+", "4.9 *"
   - What's unclear: Which stats should have count-up vs. static display (e.g., "4.9 *" and "Zero" don't count up well)
   - Recommendation: Count-up for numeric values (1200, 240), static for text-based values (4.9, Zero). Parse numeric targets from the stat data.

3. **Number of testimonials for carousel**
   - What we know: Currently 3 testimonials in a static grid
   - What's unclear: Whether more testimonials will be added (carousel with 3 items feels thin)
   - Recommendation: Build the carousel to work with 3+ items. With only 3, auto-advance + swipe is still valuable on mobile where only 1 shows at a time.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected -- no test framework installed |
| Config file | none -- see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| UX-01 | Page transitions animate between routes | manual-only | Visual verification in browser | N/A |
| UX-02 | Carousel auto-advances, swipes, pauses | manual-only | Visual verification + touch testing | N/A |
| UX-03 | Stats count up when scrolled into view | manual-only | Visual verification with scroll | N/A |
| UX-04 | Mobile nav slides in with blur, closes on route change | manual-only | Mobile viewport testing in browser | N/A |
| UX-05 | Hover/focus micro-interactions visible | manual-only | Visual verification on hover/focus | N/A |
| UX-06 | Skeleton screens shown during loading | manual-only | Throttle network in DevTools | N/A |
| UX-07 | Scroll progress bar on blog posts | manual-only | Scroll through a blog post | N/A |
| UX-08 | Animated social proof / trust signals | manual-only | Visual verification on homepage | N/A |
| UX-09 | Consistent spacing and typography | manual-only | Visual audit across all pages | N/A |
| UX-10 | Glassmorphism navbar, parallax, gradients | manual-only | Visual verification on scroll | N/A |

**Justification for manual-only:** All 10 requirements are visual/animation behaviors. Automated testing of CSS animations and Framer Motion transitions provides minimal value -- the only reliable validation is visual inspection in-browser. The build passing (`next build`) confirms no runtime errors.

### Sampling Rate
- **Per task commit:** `npm run build` (confirms no compile/type errors)
- **Per wave merge:** `npm run build` + manual visual check of all pages
- **Phase gate:** Full visual audit across desktop + mobile viewports before `/gsd:verify-work`

### Wave 0 Gaps
None -- UX/animation requirements are best validated visually. The build command is already available. No test infrastructure changes needed.

## Sources

### Primary (HIGH confidence)
- Framer Motion v12.35.0 -- already installed in project, API verified via existing FadeUp.tsx usage
- Next.js 16.1.6 -- already installed, App Router layout structure verified via codebase inspection
- Tailwind CSS 4 -- already installed, `@theme inline` config verified in globals.css

### Secondary (MEDIUM confidence)
- FrozenRouter pattern: https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router -- verified working approach, confirmed by multiple community sources and Next.js GitHub discussions
- Next.js App Router animation discussion: https://github.com/vercel/next.js/discussions/42658
- Framer Motion accessibility (reducedMotion): https://motion.dev/docs/react-accessibility

### Tertiary (LOW confidence)
- None -- all critical patterns verified through multiple sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries already installed and in use
- Architecture: HIGH - FrozenRouter pattern well-documented, all other patterns use standard Framer Motion APIs already present in the codebase (FadeUp.tsx proves the pattern works)
- Pitfalls: HIGH - page transition App Router issue is well-known; other pitfalls from direct API knowledge

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (stable -- Framer Motion v12 is mature, Next.js 16 is established)
