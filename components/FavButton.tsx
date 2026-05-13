'use client'

import { useState } from 'react'

export default function FavButton() {
  const [on, setOn] = useState(false)

  return (
    <button
      className={`card__fav${on ? ' is-on' : ''}`}
      aria-label="Save"
      onClick={() => setOn((v) => !v)}
    >
      <svg><use href="#i-heart" /></svg>
    </button>
  )
}
