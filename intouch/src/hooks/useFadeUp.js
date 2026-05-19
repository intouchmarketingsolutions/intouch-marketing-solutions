import { useEffect } from 'react'

export default function useFadeUp(dep) {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-up')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            obs.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    elements.forEach((el) => {
      // ✅ If already visible → show immediately
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('show')
      } else {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [dep])
}