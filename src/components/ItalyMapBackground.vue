<script setup lang="ts"></script>

<template>
  <svg
    class="italy-map-bg"
    viewBox="0 0 386 460"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <g fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round">
      <!-- Real coastline (simplified), traced from open geographic boundary data -->
      <path d="M185.29,24.58 L229.85,35.41 L226.47,56.06 L233.93,73.91 L209.13,67.8 L183.8,82.68 L185.52,103.49 L181.71,115.43 L191.92,136.78 L221.14,157.89 L236.8,192.55 L271.47,226.33 L295.89,226.07 L303.48,235.34 L294.74,243.69 L322.64,258.85 L345.51,271.53 L372.23,293.39 L375.46,301.22 L369.63,316.23 L352.34,296.66 L325.28,289.76 L312.17,316.88 L334.68,332.42 L330.99,354.29 L317.97,356.78 L301.33,392.74 L288.34,395.97 L288.46,383.15 L294.82,360.66 L301.59,351.71 L289.42,327.41 L279.92,306.27 L266.98,301.05 L257.78,282.95 L237.76,275.33 L224.28,258.48 L201.23,255.77 L176.89,236.84 L148.39,209.55 L127.2,185.4 L117.49,143.96 L101.99,139.09 L76.64,125.25 L62.3,130.91 L44.3,150.37 L31.35,153.44 L34.91,135.24 L18.03,129.93 L10.0,97.49 L20.8,84.72 L11.63,68.98 L12.92,57.13 L26.32,66.11 L41.34,64.12 L58.81,49.9 L64.21,56.54 L79.05,55.21 L85.8,38.31 L108.85,43.56 L122.58,36.49 L125.05,19.3 L143.92,25.26 L147.55,17.29 L178.33,10.0 Z" />
      <path d="M283.24,382.45 L272.02,415.45 L276.68,428.44 L270.14,450.0 L246.32,434.21 L230.48,429.69 L186.99,408.37 L191.35,386.85 L227.81,390.68 L259.59,386.11 Z" />
      <path d="M86.64,257.57 L105.33,287.34 L100.96,342.79 L86.79,340.14 L74.09,354.14 L62.29,343.02 L61.04,292.44 L53.93,268.47 L71.06,270.57 Z" />

      <!-- A dashed itinerary between the six cities -->
      <path
        d="M126.83,147.31 C 130,120 145,95 165.15,66.4 C 172,74 178,78 183.85,80.24 C 165,82 148,82 142.1,80.24 C 155,60 168,44 177.93,34.12"
        stroke-dasharray="1 6"
        stroke-width="0.9"
      />
    </g>

    <g fill="currentColor" stroke="none">
      <circle cx="177.93" cy="34.12" r="2" />
      <circle cx="183.85" cy="80.24" r="2" />
      <circle cx="142.1" cy="80.24" r="2" />
      <circle cx="165.15" cy="66.4" r="2" />
      <circle cx="123.72" cy="152.35" r="2" />
      <circle cx="126.83" cy="147.31" r="2" />
    </g>

    <g
      fill="currentColor"
      stroke="none"
      font-family="ui-sans-serif, system-ui, sans-serif"
      font-size="7"
      letter-spacing="0.5"
    >
      <text x="182" y="30">DOLOMITI</text>
      <text x="188" y="78">VENEZIA</text>
      <text x="98" y="78">VERONA</text>
      <text x="140" y="62">BASSANO</text>
      <text x="128" y="156">PISA</text>
      <text x="98" y="143">LUCCA</text>
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
  opacity: 0.1;
  pointer-events: none;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) .italy-map-bg {
    opacity: 0.14;
  }
}

:root[data-theme='dark'] .italy-map-bg {
  opacity: 0.14;
}
</style>
