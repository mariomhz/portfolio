export const projects = [
  {
    id: 1,
    slug: "micultura",
    title: "MICULTURA",
    year: "2026",
    description: "Cultural events platform for Tenerife, built in a pair for our DAW final project. I owned the Spring Boot API: JWT auth with refresh-token rotation, filtering and pagination over PostgreSQL, and a natural-language event search that uses Gemini to pick from the real catalogue rather than generate answers. On the Next.js App Router frontend I built the event catalogue, the Leaflet map and the FullCalendar view. The catalogue falls back to a cached snapshot when the free backend is asleep, so the demo still works.",
    url: "https://micultura.vercel.app",
    github: "https://github.com/mariomhz/micultura-frontend",
    backend: "https://github.com/mariomhz/micultura-backend",
    image: "/portraits/gradient6.avif",
    screenshot: "/projects/micultura-screenshot.webp",
    screenshotWidth: 1353,
    screenshotHeight: 1122,
    tags: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "JWT Auth", "Gemini API", "Leaflet", "Tailwind CSS"],
    role: "Two person team. I owned the backend and built the catalogue, map and calendar on the frontend.",
    caseStudy: {
      intro:
        "Our final project for the DAW cycle: a platform for finding cultural events across Tenerife, with a map, a calendar and a filterable catalogue. Built in a pair. I wrote the Spring Boot API and the parts of the frontend that consume it.",
      sections: [
        {
          heading: "The idea",
          body: [
            "We could have built anything for the final project, and we chose to build something for the island we actually live on: one place to find the concerts, exhibitions, festivals and markets happening across Tenerife, instead of hunting through a different page for each one.",
            "It also meant the project had a real shape to it. Events have dates, prices, categories and locations, and every one of those turns into a decision about how you store it, how you filter it and how you show it. That was more interesting than inventing a problem to solve.",
          ],
        },
        {
          heading: "Search in plain Spanish, without letting the model invent events",
          body: [
            "You can ask the catalogue for things the way you would actually say them. Algo gratis este finde. Teatro barato en La Laguna. It reads the question, works out what you meant by the dates and the price and the mood, and comes back with real events and a line explaining why it picked them.",
            "It works in three steps. First the API pulls the events that are actually eligible, active and happening between today and 120 days out, so the model is never reasoning about a stale catalogue. Then it builds a prompt that lists those events one per line with their id, title, date, weekday, category, location and price, and states today's date and weekday in Spanish so that este finde resolves to the right weekend. Gemini is asked for strict JSON, up to four event ids in order of relevance plus one sentence of reasoning, with the response constrained to application/json and the temperature down at 0.3 so it stays literal.",
            "The decision I care about is what comes back. Gemini only returns ids and a sentence. It never returns event data. Those ids are then intersected with the candidate list and the events are read back out of the database, so what reaches the browser is always a real row with a real date and a real location. If the model invents an id, it simply does not match anything and quietly disappears. The model is allowed to choose. It is not allowed to author.",
            "It also fails in a way you can read. No API key configured returns a 503 saying so rather than a stack trace, a response that will not parse as JSON returns a 502 and gets logged with the offending text, and an empty catalogue never calls the API at all.",
          ],
        },
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
            "One of those is always applied and is not optional. noFinalizado restricts results to events happening today or later, because a cultural events site that shows you last month's concerts is not doing its job. That decision comes back later in a way I did not expect.",
          ],
        },
        {
          heading: "The demo broke, and the cause was two bugs stacked",
          body: [
            "Months after handing the project in, the live demo went empty. The page loaded, the filters rendered, and there were zero events.",
            "The first cause was easy: the free Postgres instance had expired and been deleted, so the backend could not start. I moved the database to a provider whose free tier does not expire, set the connection details, and the API came back.",
            "It still only returned eight events out of seventy seven. The second cause was hiding behind the first. The seeder anchored its dates to a hardcoded date in May, and combined with noFinalizado filtering out anything before today, almost every seeded event had quietly aged into the past. Restoring the database alone would never have fixed it. Seeding relative to today did.",
          ],
        },
        {
          heading: "Making the demo survive its own hosting",
          body: [
            "Fixing it once was not enough, because free hosting sleeps. The backend spins down after fifteen minutes of inactivity and takes the better part of a minute to wake, and nobody waits a minute at an empty page.",
            "So I did to the frontend what I had already done in SkyAbove: when the API cannot be reached, serve the last known good data instead of nothing. The seeded catalogue is snapshotted into the frontend, with dates stored as day offsets and resolved against today so the cached events never age out the way the original ones did. The offline path repeats the same filtering the backend does, so the cached catalogue behaves like the live one. Reads give up after eight seconds and fall back. Writes still fail loudly, because quietly pretending a save worked would be a much worse lie than showing slightly old data.",
            "The page says so when it is serving the snapshot. Showing cached data as though it were live would be the kind of small dishonesty I was trying to design out in the first place.",
          ],
        },
        {
          heading: "What’s next",
          body: [
            "Schema changes still run through Hibernate's ddl-auto, which is fine for coursework and wrong for anything real, so a proper migration tool is the first thing I would add. I would also like saved events to survive more than they currently do, and to keep building on the search rather than leaving it where the deadline left it.",
            "The bigger thing I want is real data. Right now the catalogue is seeded, and the version of this I would actually use pulls from the places these events are really announced.",
          ],
        },
      ],
    },
  },

  {
    id: 2,
    slug: "mosir",
    title: "MOSIR",
    year: "2026",
    description: "A globe you can turn to see the world the way I read it: the nine languages I speak or am learning, marked on the cities they actually come from. Natural Earth GeoJSON rasterised into textures as the page loads, country hover through a hidden colour map, and lighting that follows the real position of the sun.",
    url: "https://mariomhz.github.io/mosir/",
    github: "https://github.com/mariomhz/mosir",
    image: "/portraits/gradient1.avif",
    screenshot: "/projects/mosir-screenshot.webp",
    screenshotWidth: 1600,
    screenshotHeight: 1767,
    tags: ["Three.js", "JavaScript", "WebGL", "HTML"],
    role: "Solo project",
    caseStudy: {
      intro:
        "I did not want my languages to be a line at the bottom of a CV. A list tells you a number. It does not tell you that each of these languages is attached to a place, and that the places are the point. So I built a globe you can turn, with the world marked the way I actually see it.",
      sections: [
        {
          heading: "The idea",
          body: [
            "What I wanted to show with this project is how our planet feels to me: a world where certain places have a part of themselves within me. This is not a list of countries I have visited but rather a representation of the countries that reach me, and are a part of who I am because I speak the language they think in. This globe is my way of showing my love for coding and languages in a single project.",
          ],
        },
        {
          heading: "The markers are not random",
          body: [
            "The markers aren't at random locations, each one of them is the specific place that language actually entered my life. This globe is a portrait, not a dataset of random languages and places. I mention a little of my relationship with each language in each marker, which you can see by clicking on them.",
          ],
        },
        {
          heading: "How it works",
          body: [
            "The first version drew the continents as line segments on an empty sphere, which read as a wireframe ball more than a planet. The same Natural Earth GeoJSON now gets rasterised into an equirectangular texture while the page loads: ocean first, then filled land, then coastlines and borders stroked over the top. One pass produces three canvases, a colour map for the surface, a black and white land mask that raises the continents slightly, and a hidden map where every country is painted its own unique colour.",
            "GeoJSON gives you longitude and latitude in degrees, and Three.js wants x, y and z, so every coordinate goes through a spherical conversion before it becomes a point in the scene. The markers use that same conversion, which is what lets me place them by real lat and long instead of guessing.",
            "That hidden colour map is how hovering works. Instead of building a mesh for every country and testing all of them, I raycast the sphere once, turn the point I hit back into latitude and longitude, and read a single pixel out of the map. The colour decodes to a country index, which gives me the name. It costs the same whether there are ten countries or two hundred.",
          ],
        },
        {
          heading: "The bug that deleted three continents",
          body: [
            "Filling the shapes broke the map the first time I tried it. Any country crossing the antimeridian arrives with its longitude jumping from +179 to -179, and drawn as a straight line that smears all the way back across the world. My first fix was to skip the shapes that did it, which quietly deleted Africa, Europe and Asia, because they are one connected outline spanning more than half the planet.",
            "What actually works is carrying an offset along the outline so it never jumps, then drawing it three times, once shifted west and once east, so whatever runs off one edge comes back on the other. I only caught it because I rendered the flat texture out to a file and looked at it, which is now the first thing I do when something on the sphere looks wrong.",
          ],
        },
        {
          heading: "Lighting it with the real sun",
          body: [
            "There is no fixed light in the scene. The code works out the subsolar point, the one place on Earth where the sun is directly overhead at that exact moment, and points the light there. Open the globe at night and Europe is dark while the Pacific is in full daylight.",
            "It comes down to about twenty lines of astronomy: the sun's position along the ecliptic, converted into equatorial coordinates, then Greenwich sidereal time subtracted, which is the step that turns a position in the sky into a position over a rotating Earth. That subtraction is also what makes solar noon land at real solar noon instead of clock noon. I checked it against the solstices before I trusted it, and it gives 23.44 degrees north in June and 23.44 south in December, which is exactly the tilt of the Earth.",
            "The light hangs off the globe rather than the scene, so the lit half stays over the countries that are really in daylight however you turn it. The glow around the rim follows the same direction, fading on the night side and warming to orange where it crosses the terminator. That rim is the one piece of GLSL in the project, a fresnel term that rises to full strength where the surface turns away from the camera, which is exactly the edge you see.",
          ],
        },
        {
          heading: "What’s next",
          body: [
            "I plan on adding city lights for the areas that are in nighttime, so the dark half of the globe shows where people actually are instead of going flat black.",
          ],
        },
      ],
    },
  },
  {
    id: 3,
    slug: "skyabove",
    title: "SKYABOVE",
    year: "2026",
    description: "Flight dashboard with a Next.js API route proxying AviationStack so the API key never reaches the browser. Adds a 30-minute in-memory cache, per-IP rate limiting with 429 responses, and a stale-cache fallback that keeps serving data when the upstream API fails. Fully typed response contracts, GSAP stat transitions.",
    url: "https://skyabove-dashboard.vercel.app",
    github: "https://github.com/mariomhz/skyabove",
    image: "/portraits/gradient2.avif",
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
          heading: "The idea",
          body: [
            "I wanted to build something that ran on real data instead of numbers I made up, because a project stops being an exercise the moment something outside your control can break it. Anything with a live API behind it will have a bad day eventually, and that is the part I actually wanted to learn: not how to fetch data, which is easy, but what the page should do when fetching fails.",
          ],
        },
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
              body: "Flight aggregates do not change meaningfully minute to minute, so half an hour of staleness costs nothing and cuts upstream calls by orders of magnitude. I used a module level variable rather than Redis because the app runs as one instance, and adding infrastructure for a single cached object would have been ceremony, not engineering.",
            },
            {
              title: "Rate limit per IP",
              body: "Twenty requests a minute per IP, tracked in a Map, with old timestamps swept every five minutes so it does not grow forever. Over the limit gets a 429 with a Retry-After header rather than a silent failure, because a client that knows when to come back is better than one that keeps retrying.",
            },
            {
              title: "Serve stale data when upstream dies",
              body: "This is the part I am most pleased with. If AviationStack fails and I have anything cached, the endpoint returns that instead of an error, flagged with stale: true so the client knows. A slightly old dashboard is far more useful than an error page. Only when there is nothing cached at all does it return a 502.",
            },
          ],
        },
        {
          heading: "Types as a contract",
          body: [
            "The AviationStack response is fully typed, down to the nullable fields: delay can be null, the live block can be null, flight_status is a union of six specific strings. Writing those out was tedious and it is the reason the transform code has no defensive guesswork in it. The compiler knows which fields can go missing, so I do not have to remember.",
          ],
        },
        {
          heading: "What’s next",
          body: [
            "The cache lives in memory on a single instance, which is fine now and would fall apart the moment it ran on two, so moving it somewhere shared is the first thing I would do if this ever had real traffic. I also want to persist it, so a cold start does not begin with nothing and leave the first visitor with no fallback if the API happens to be having a bad day.",
            "Beyond that I want to do more with the data I am already fetching. There is enough in the response to show delays and routes properly, and right now I am only using a fraction of it.",
          ],
        },
      ],
    },
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug) ?? null;
}
