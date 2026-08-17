<script setup lang="ts"></script>

<template>
  <svg
    class="italy-map-bg"
    viewBox="0 0 300 460"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <filter id="pencil-sketch" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="6" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>

    <g
      filter="url(#pencil-sketch)"
      fill="none"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <!-- Mainland: a loose, evocative sketch of the boot, not a surveyed outline -->
      <path
        d="M70,42 C 66,55 68,72 74,88 C 79,108 82,128 86,148
           C 78,168 70,188 96,220 C 104,244 116,262 128,282
           C 118,300 108,318 118,336 C 128,356 140,372 152,388
           C 158,378 162,364 158,350 C 152,332 146,314 152,296
           C 168,300 186,296 200,282 C 208,266 200,252 214,236
           C 232,244 250,240 248,222 C 246,206 228,198 214,190
           C 222,166 224,142 220,118 C 218,96 210,76 194,60
           C 178,44 158,32 138,28 C 116,24 92,28 78,32 C 74,34 71,38 70,42 Z"
      />

      <!-- Sicilia -->
      <path d="M148,404 C 158,398 176,396 196,402 C 202,410 190,424 176,438 C 166,430 154,416 148,404 Z" />

      <!-- Sardegna -->
      <path d="M46,196 C 54,188 64,190 68,202 C 72,222 70,244 64,266 C 60,282 50,286 44,272 C 38,250 40,224 46,196 Z" />

      <!-- Dolomiti: jagged peaks -->
      <path d="M176,58 L182,44 L187,56 L193,40 L198,54 L204,42 L208,52" />

      <!-- Venezia: canal ripples -->
      <path d="M196,90 q4,-4 8,0 q4,4 8,0" />
      <path d="M198,96 q4,-4 8,0 q4,4 8,0" />

      <!-- Verona: little arena -->
      <ellipse cx="172" cy="84" rx="5" ry="3" />

      <!-- Bassano: bridge arch -->
      <path d="M180,74 q4,-7 8,0" />
      <path d="M180,74 v2 M188,74 v2" />

      <!-- Pisa: leaning tower -->
      <g transform="translate(82,146) rotate(-8)">
        <rect x="-2.5" y="-14" width="5" height="14" />
        <line x1="-3.5" y1="0" x2="3.5" y2="0" />
      </g>

      <!-- Lucca: the round walls -->
      <circle cx="88" cy="136" r="4.5" />

      <!-- A dashed route, wandering between the cities -->
      <path
        d="M88,136 C 100,120 130,110 160,96 C 176,90 190,86 200,94"
        stroke-dasharray="1 7"
        stroke-width="1"
      />
    </g>

    <g
      fill="currentColor"
      stroke="none"
      font-family="ui-sans-serif, system-ui, sans-serif"
      font-size="6"
      letter-spacing="0.5"
    >
      <text x="180" y="38">DOLOMITI</text>
      <text x="210" y="98">VENEZIA</text>
      <text x="160" y="80">VERONA</text>
      <text x="172" y="66">BASSANO</text>
      <text x="94" y="148">PISA</text>
      <text x="60" y="132">LUCCA</text>
    </g>
  </svg>
</template>

<style scoped>
.italy-map-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  color: var(--ink);
  opacity: 0.16;
  pointer-events: none;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) .italy-map-bg {
    opacity: 0.22;
  }
}

:root[data-theme='dark'] .italy-map-bg {
  opacity: 0.22;
}
</style>
