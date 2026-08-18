import type { Directive } from 'vue'

function typeIn(el: HTMLElement) {
  const text = el.dataset.typewriterText ?? ''
  const speed = 26

  el.classList.add('is-typing')
  let i = 0

  const tick = () => {
    i += 1
    el.textContent = text.slice(0, i)
    if (i < text.length) {
      window.setTimeout(tick, speed)
    } else {
      el.classList.remove('is-typing')
      el.classList.add('is-typed')
    }
  }

  tick()
}

const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              typeIn(entry.target as HTMLElement)
              observer?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.4 }
      )
    : null

const vTypewriter: Directive<HTMLElement> = {
  mounted(el) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !observer) {
      return
    }

    el.dataset.typewriterText = el.textContent ?? ''
    el.textContent = ''
    el.classList.add('typewriter')
    observer.observe(el)
  }
}

export default vTypewriter
