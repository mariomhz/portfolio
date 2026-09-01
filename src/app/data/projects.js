export const projects = [
  {
    id: 1,
    slug: "mosir",
    title: "MOSIR",
    year: "2026",
    description: "Interactive 3D globe built with Three.js, plotting language data onto a wireframe sphere from Natural Earth GeoJSON. Custom marker placement by lat/long, a generated starfield, and damped orbital controls over a responsive WebGL canvas.",
    url: "https://mariomhz.github.io/mosir/",
    github: "https://github.com/mariomhz/mosir",
    image: "/portraits/gradient1.webp",
    screenshot: "/projects/mosir-screenshot.webp",
    screenshotWidth: 1600,
    screenshotHeight: 1767,
    tags: ["Three.js", "JavaScript", "WebGL", "HTML"],
    role: "Solo project",
    caseStudy: {
      intro:
        "A globe you can spin to see where the languages I speak are spoken. I wanted something that was mine rather than another tutorial result, and I wanted to learn how 3D on the web actually works instead of copying a boilerplate.",
      sections: [
        {
          heading: "The problem",
          body: [
            "Listing eight languages on a page is boring and nobody reads it. Putting them on a globe makes the same information something you want to touch. The hard part is that a globe is not a picture, it is geography: every marker has to land on the right spot of a sphere, and the coastlines have to come from real data or the whole thing looks fake.",
          ],
        },
        {
          heading: "How it works",
          body: [
            "The land masses come from Natural Earth GeoJSON, parsed and drawn as line segments onto a sphere of radius 2. GeoJSON gives you longitude and latitude in degrees, and Three.js wants x, y and z, so every coordinate goes through a spherical conversion before it becomes a point in the scene.",
            "On top of that there is a wireframe sphere for the grid, a solid inner sphere so you cannot see through to the far side, a generated starfield of a thousand points for depth, and markers placed by lat/long for each language. Camera movement is OrbitControls with damping on and the zoom clamped between 3.5 and 5, so you cannot fly off into space or end up inside the planet.",
          ],
        },
        {
          heading: "What I would do differently",
          body: [
            "The whole thing uses standard Three.js materials. There are no custom shaders in it, and for a long time my portfolio claimed there were, which I only caught when I went back and read my own code. Writing an actual GLSL shader for the atmosphere glow is the obvious next step and the honest reason it is not there yet is that I have not learned it properly.",
            "The marker data is hardcoded in the source. If I extended this I would move it to a JSON file so adding a language does not mean touching the render logic.",
          ],
        },
      ],
    },
  },
  {
    id: 2,
    slug: "skyabove",
    title: "SKYABOVE",
    year: "2026",
    description: "Flight dashboard with a Next.js API route proxying AviationStack so the API key never reaches the browser. Adds a 30-minute in-memory cache, per-IP rate limiting with 429 responses, and a stale-cache fallback that keeps serving data when the upstream API fails. Fully typed response contracts, GSAP stat transitions.",
    url: "https://skyabove-dashboard.vercel.app",
    github: "https://github.com/mariomhz/skyabove",
    image: "/portraits/gradient2.webp",
    screenshot: "/projects/skyabove-screenshot.webp",
    screenshotWidth: 1600,
    screenshotHeight: 832,
    tags: ["Next.js", "TypeScript", "REST API", "Caching", "Rate Limiting", "GSAP"],
    role: "Solo project",
    caseStudy: {
      intro:
        "A dashboard of live air traffic, built on a third party API I do not control and cannot afford to hammer. Most of the interesting work is not the UI, it is everything that keeps the page useful when the API is slow, rate limited, or down.",
      sections: [
        {
          heading: "The problem",
          body: [
            "AviationStack needs an API key. The moment you call it from the browser, that key is in the network tab and anyone can spend your quota. So the request has to happen on the server.",
            "That solves the key but creates the real constraint: a free plan gives you a small number of calls, and every visitor refreshing the page burns them. One person with the dev console open can exhaust a month of quota in an afternoon. The dashboard had to work for visitors without letting visitors destroy it.",
          ],
        },
        {
          heading: "The decisions",
          decisions: [
            {
              title: "Proxy through a route handler",
              body: "app/api/flights/route.ts calls AviationStack server side and returns only the computed stats. The key lives in an environment variable and never reaches the client. The browser talks to my API, not theirs.",
            },
            {
              title: "Cache in memory for 30 minutes",
              body: "Flight aggregates do not change meaningfully minute to minute, so a half hour of staleness costs nothing and cuts upstream calls by orders of magnitude. I used a module level variable rather than Redis because the app runs as one instance and adding infrastructure for a single cached object would have been ceremony, not engineering.",
            },
            {
              title: "Rate limit per IP",
              body: "Twenty requests a minute per IP, tracked in a Map, with old timestamps swept every five minutes so it does not grow forever. Over the limit gets a 429 with a Retry-After header rather than a silent failure, because a client that knows when to come back is better than one that keeps retrying.",
            },
            {
              title: "Serve stale data when upstream dies",
              body: "This is the part I am most pleased with. If AviationStack fails and I have anything cached, the endpoint returns that instead of an error, flagged with stale: true so the client knows. A slightly old dashboard is far more useful than an error page. If there is nothing cached at all, only then does it return 502.",
            },
          ],
        },
        {
          heading: "Types as a contract",
          body: [
            "The AviationStack response is fully typed in lib/aviationstack.ts, down to the nullable fields: delay can be null, the live block can be null, flight_status is a union of six specific strings. Writing those types out was tedious and it is the reason the transform code has no defensive guesswork in it. The compiler knows which fields can be missing, so I do not have to remember.",
          ],
        },
        {
          heading: "What I would do differently",
          body: [
            "The cache is per instance. Right now that is fine because there is one instance, but the moment it scaled horizontally each instance would keep its own copy and the upstream call count would multiply. The honest fix is a shared cache, and I would reach for one only when there is a second instance to justify it.",
            "There is also no persistence. A cold start begins with an empty cache, so the first visitor after a quiet period pays the full upstream latency and gets no stale fallback if the API happens to be down at that moment.",
          ],
        },
      ],
    },
  },
  {
    id: 3,
    slug: "micultura",
    title: "MICULTURA",
    year: "2026",
    description: "Cultural events platform for Tenerife, built in a pair for our DAW final project. I owned the Spring Boot API: JWT auth with refresh-token rotation, filtering and pagination over PostgreSQL, and the seeding. On the Next.js App Router frontend I built the event catalogue, the Leaflet map and the FullCalendar view. The catalogue falls back to a cached snapshot when the free backend is asleep, so the demo still works.",
    url: "https://micultura.vercel.app",
    github: "https://github.com/mariomhz/micultura-frontend",
    backend: "https://github.com/mariomhz/micultura-backend",
    image: "/portraits/gradient6.webp",
    screenshot: "/projects/micultura-screenshot.webp",
    screenshotWidth: 1353,
    screenshotHeight: 1122,
    tags: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "JWT Auth", "Leaflet", "Tailwind CSS"],
    role: "Two person team. I owned the backend and built the catalogue, map and calendar on the frontend.",
    caseStudy: {
      intro:
        "Our final project for the DAW cycle: a platform for finding cultural events across Tenerife, with a map, a calendar and a filterable catalogue. Built in a pair. I wrote the Spring Boot API and the parts of the frontend that consume it.",
      sections: [
        {
          heading: "Auth was the part worth getting right",
          body: [
            "Most student projects put a JWT in localStorage and call it done. That token cannot be revoked, and anything that can read the page can read the token, so I wanted a design where losing one piece does not hand over the account.",
            "Access tokens are short lived, fifteen minutes. Refresh tokens last seven days, or thirty if you tick remember me. The refresh token is never stored as it was issued: the database keeps a SHA-256 hash of it, so someone reading the tokens table still cannot authenticate as anybody. Using a refresh token rotates it, meaning the old one is marked revoked in the same operation that issues its replacement. Logging out revokes it explicitly.",
          ],
        },
        {
          heading: "Filtering without a pile of if statements",
          body: [
            "The catalogue filters by category, free text, date range and price range, in any combination. Writing that as branching query methods gets ugly fast, so the API composes JPA Specifications instead: one small specification per filter, combined with and, and null ones simply skipped.",
            "One of those specifications is always applied and is not optional. noFinalizado restricts results to events whose date is today or later, because a cultural events site that shows you last month's concerts is not doing its job. That decision comes back later in a way I did not expect.",
          ],
        },
        {
          heading: "The demo broke, and the cause was two bugs stacked",
          body: [
            "Months after handing the project in, the live demo went empty. The page loaded, the filters rendered, and there were zero events.",
            "The first cause was easy: the free Postgres instance had expired and been deleted, so the backend could not start. I moved the database to a provider whose free tier does not expire, set the connection details, and the API came back.",
            "It still only returned eight events out of seventy seven. The second cause was hiding behind the first. The seeder anchored its dates to a hardcoded LocalDate.of(2026, 5, 15), and combined with noFinalizado filtering out anything before today, almost every seeded event had quietly aged into the past. Restoring the database alone would never have fixed it. Seeding from LocalDate.now() did.",
          ],
        },
        {
          heading: "Making the demo survive its own hosting",
          body: [
            "Fixing it once was not enough, because free hosting sleeps. The backend spins down after fifteen minutes of inactivity and takes the better part of a minute to wake, and nobody waits a minute at an empty page.",
            "So I did to the frontend what I had already done to SkyAbove: when the API cannot be reached, serve the last known good data instead of nothing. The seeded catalogue is snapshotted into the frontend as JSON, with dates stored as day offsets and resolved against today so the cached events never age out the way the original ones did. The offline path reimplements the same filtering the backend does, including noFinalizado, so the cached catalogue behaves like the live one. Reads time out after eight seconds and fall back. Writes still fail loudly, because silently pretending a save worked would be a much worse lie than showing slightly old data.",
            "The page says so when it is serving the snapshot. Showing cached data as though it were live would be the kind of small dishonesty I was trying to design out in the first place.",
          ],
        },
        {
          heading: "What I would do differently",
          body: [
            "The seeder used to wipe and reinsert every event on boot, which took saved events with it through the foreign key. On hosting that restarts whenever it wakes, a user's saved events disappeared within the hour. It now counts upcoming events first and only reseeds when none are left.",
            "Schema changes run through Hibernate's ddl-auto, which is fine for coursework and wrong for anything real. Flyway would be the first thing I added if this had to live.",
          ],
        },
      ],
    },
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug) ?? null;
}
