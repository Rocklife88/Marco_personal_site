import type { Directive } from 'vue'

const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed')
              observer?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      )
    : null

const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    el.setAttribute('data-reveal', '')
    if (observer) {
      observer.observe(el)
    } else {
      el.classList.add('is-revealed')
    }
  }
}

export default vReveal
