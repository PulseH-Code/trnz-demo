import { useState, useMemo, useEffect } from "react";

/* ─── DATA ─────────────────────────────────────────── */
const EVENTS = [
  { id: 1, name: "South Island Ultra Marathon", date: "2026-05-09", island: "South Island", region: "West Coast", distances: ["100K", "54K", "24K", "6K"], format: "standard", location: "Greymouth to Hokitika", featured: true, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1754097291863-EFXF2TIEY7E1G7PQK6T2/south-island-ultra-marathon-v2.webp" },
  { id: 2, name: "Best Dam Backyard Ultra", date: "2026-05-09", island: "South Island", region: "Canterbury", distances: ["6.71K loop"], format: "backyard", location: "Otematata, Canterbury", featured: true, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1754100756257-R6NQ50J6ZUHOFTIA0RGU/best-dam-backyard-ultra-v2.webp" },
  { id: 3, name: "The Bay", date: "2026-05-23", island: "South Island", region: "Tasman", distances: ["50K", "34K", "25K", "11K"], format: "standard", location: "Nelson, Tasman", featured: true, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1754098796377-5FFF8547XUVRNT8D2A94/the-bay-trail-run-2026.webp" },
  { id: 4, name: "Kings Backyard Ultra", date: "2026-05-30", island: "North Island", region: "Northland", distances: ["6.71K loop"], format: "backyard", location: "Whangarei, Northland", featured: false, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1754099273622-U6KHXM0X31QPSRGWS34W/kings-backyard-ultra.webp" },
  { id: 5, name: "Bridge to Bridge Ultra", date: "2026-06-13", island: "South Island", region: "Canterbury", distances: ["60K", "30K", "15K", "5K"], format: "standard", location: "Waimakariri to Kaiapoi, Canterbury", featured: false, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1754099694927-JTMIGLQULETVDUM5ELUT/bridge-to-bridge-ultra.webp" },
  { id: 6, name: "Mount Difficulty Ascent", date: "2026-06-13", island: "South Island", region: "Central Otago", distances: ["44K", "25K"], format: "standard", location: "Mt Difficulty, Cromwell", featured: false, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1754099899703-WT7W5AXNQSIJ85I6C4AJ/mt-difficulty-ascent.webp" },
  { id: 7, name: "Rustic Run & Walk", date: "2026-06-13", island: "South Island", region: "Central Otago", distances: ["42.2K", "21.1K"], format: "standard", location: "Mt Difficulty, Cromwell", featured: false, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1754100158070-VHUYN1Y7OBOI5M51APZ0/rustic-run.webp" },
  { id: 8, name: "WUU2K", date: "2026-07-18", island: "North Island", region: "Wellington", distances: ["65K", "45K", "21K"], format: "standard", location: "Wellington", featured: false, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1754100908643-STIPUU3ONRCZV2DYEMNU/wuu-wellington-urban-ultra-v2.webp" },
  { id: 9, name: "Krayzie Midwinter Backyard Ultra", date: "2026-07-11", island: "South Island", region: "Canterbury", distances: ["6.71K loop"], format: "backyard", location: "Christchurch, Canterbury", featured: false, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1754100508753-HZNLOTFYJ4T8EUMQI9AZ/krayzie-midwinter-backyard-ultra-2026.webp" },
  { id: 10, name: "Northburn 100", date: "2026-03-21", island: "South Island", region: "Central Otago", distances: ["160K", "100K", "50K", "42.2K", "21K", "10K", "5K"], format: "standard", location: "Northburn Station, Central Otago", featured: false, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1753993714226-O3T488ZRBHJ6E60DOO3X/northburn-100-v2.webp" },
  { id: 11, name: "Motatapu", date: "2026-03-07", island: "South Island", region: "Otago", distances: ["52K", "42K", "15K", "4K"], format: "standard", location: "Wanaka to Arrowtown, Otago", featured: false, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1753959218122-VF8D5KULTODF5XYGDJYN/motatapu.webp" },
  { id: 12, name: "Tussock Traverse", date: "2026-03-28", island: "North Island", region: "Manawatū-Whanganui", distances: ["32K", "21K", "12K", "6K"], format: "standard", location: "Tongariro National Park", featured: false, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1754094565408-VZ01B47JCZXAZMBKUM9F/tussock-traverse-v4.webp" },
  { id: 13, name: "Faultline Ultra", date: "2026-04-25", island: "North Island", region: "Wellington", distances: ["161K", "100K", "53K", "25K", "11K", "6K"], format: "standard", location: "Wellington", featured: false, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1754096501350-WRFKXVQRR9Y0QEOXUSTL/faultline-ultra+%281%29.webp" },
  { id: 14, name: "Routeburn Classic", date: "2026-04-18", island: "South Island", region: "Otago/Southland", distances: ["32K"], format: "standard", location: "The Divide to Routeburn Shelter", featured: false, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1753995812732-8Z678OWBB3FR7YTXNQM9/routeburn-classic-v2.webp" },
  { id: 15, name: "Tarawera Ultra-Trail", date: "2026-02-14", island: "North Island", region: "Bay of Plenty", distances: ["160K", "102K", "50K", "21K", "14K"], format: "standard", location: "Rotorua, Bay of Plenty", featured: false, image: "https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/1753997947992-DNVFH2K4S3XW908CKAF8/tarawera-ultra-trail.webp" },
];

const DIRECTORY = [
  { id: 1, name: "Single Track Collective", category: "coach", region: "Wellington", description: "Wellington-based coach for weekend warriors to elite level runners.", website: "#", featured: true, tags: ["trail", "ultra", "elite"] },
  { id: 2, name: "Rep Endurance", category: "coach", region: "Nationwide", description: "Personalised coaching, structured training, and sustainable support for athletes of all levels.", website: "#", featured: false, tags: ["trail", "ultra", "personalised"] },
  { id: 3, name: "Running NZ", category: "coach", region: "Nationwide", description: "Holistic coaching from beginners to multi-day ultrarunners with personalised training.", website: "#", featured: false, tags: ["trail", "beginner", "ultra"] },
  { id: 4, name: "Speedplay Coaching", category: "coach", region: "Canterbury", description: "Led by a former NZ representative runner and physiotherapist.", website: "#", featured: false, tags: ["technique", "strength", "performance"] },
  { id: 5, name: "SQUADRUN", category: "coach", region: "Nationwide", description: "Supported over 5000 athletes with tailored training and community support.", website: "#", featured: false, tags: ["community", "trail", "group"] },
  { id: 6, name: "Athletic Peak", category: "coach", region: "Canterbury", description: "Led by Simon Cochrane, professional ultra-distance athlete with 15+ years experience.", website: "#", featured: false, tags: ["ultra", "elite", "strength"] },
  { id: 7, name: "Capital Trails Coaching", category: "coach", region: "Wellington", description: "Helping runners train smarter from 5K to ultramarathons.", website: "#", featured: false, tags: ["trail", "wellington", "ultra"] },
  { id: 8, name: "Bay Physio & Sports", category: "physio", region: "Bay of Plenty", description: "Specialist sports physio with trail running rehab expertise.", website: "#", featured: false, tags: ["physio", "rehab", "injury"] },
  { id: 9, name: "Trail Recovery NZ", category: "physio", region: "Auckland", description: "Osteo and massage therapy for trail and ultra runners.", website: "#", featured: false, tags: ["massage", "osteo", "recovery"] },
  { id: 10, name: "Fuel the Trail", category: "nutrition", region: "Nationwide", description: "Nutrition coaching for endurance athletes and ultramarathon runners.", website: "#", featured: false, tags: ["nutrition", "ultra", "fuelling"] },
  { id: 11, name: "Wellington Trail Runners", category: "run-group", region: "Wellington", description: "Weekly group runs on the Tararua and Rimutaka ranges.", website: "#", featured: false, tags: ["wellington", "group", "weekly"] },
  { id: 12, name: "Christchurch Trail Collective", category: "run-group", region: "Canterbury", description: "Community trail running group in and around Christchurch.", website: "#", featured: false, tags: ["christchurch", "group", "community"] },
  { id: 13, name: "Auckland Trail Sisters", category: "run-group", region: "Auckland", description: "Inclusive women's trail running group across greater Auckland.", website: "#", featured: false, tags: ["auckland", "women", "group"] },
];

const LISTING_TIERS = [
  { id: "basic", name: "Basic Listing", price: 0, description: "Get listed in the directory for free", features: ["Name & description", "Region & category", "Website link"], highlighted: false },
  { id: "standard", name: "Standard Listing", price: 79, description: "Stand out with an enhanced profile", features: ["Everything in Basic", "Photo / logo upload", "Tags & specialties", "Contact details"], highlighted: false },
  { id: "featured", name: "Featured Listing", price: 199, description: "Prime placement at the top of your category", features: ["Everything in Standard", "Featured badge", "Priority placement", "Social media links", "Monthly analytics report"], highlighted: true },
];

const EVENT_TIERS = [
  { id: "free", name: "Free Listing", price: 0, description: "Basic event entry in the calendar", features: ["Event name, date & location", "Distance info", "Island category"], highlighted: false },
  { id: "standard", name: "Standard Event", price: 49, description: "Full event profile with photo", features: ["Everything in Free", "Event photo / banner", "Description & links", "Google Calendar export"], highlighted: false },
  { id: "featured", name: "Featured Event", price: 149, description: "Maximum exposure for your event", features: ["Everything in Standard", "Homepage feature slot", "Bold calendar placement", "Social promotion post"], highlighted: true },
];

/* ─── HELPERS ──────────────────────────────────────── */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const fmtDate = (d) => { const dt = new Date(d); return `${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`; };
const getMonth = (d) => new Date(d).getMonth();
const isFuture = (d) => new Date(d) >= new Date("2026-05-01");

/* ─── COMPONENTS ───────────────────────────────────── */

function Logo({ onClick }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#2D5016"/>
        <path d="M8 22 L14 10 L20 18 L24 14" stroke="#A8C66C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="14" r="2.5" fill="#A8C66C"/>
      </svg>
      <span style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: 20, color: "#1a2e0a", letterSpacing: "-0.5px" }}>Trail Running NZ</span>
    </button>
  );
}

function Nav({ page, setPage }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "calendar", label: "Race Calendar" },
    { id: "directory", label: "Directory" },
    { id: "list", label: "Add Listing" },
  ];
  return (
    <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7d8", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 8px rgba(45,80,22,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo onClick={() => setPage("home")} />
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)} style={{
              background: page === l.id ? "#2D5016" : "none",
              color: page === l.id ? "#fff" : "#374151",
              border: "none", cursor: "pointer", padding: "7px 16px", borderRadius: 8,
              fontFamily: "'Georgia', serif", fontSize: 14, fontWeight: page === l.id ? 700 : 400, transition: "all 0.15s"
            }}>{l.label}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Badge({ children, color = "#e8f0d8", textColor = "#2D5016" }) {
  return <span style={{ background: color, color: textColor, fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, whiteSpace: "nowrap", letterSpacing: "0.4px", textTransform: "uppercase" }}>{children}</span>;
}

function EventCard({ event, onClick }) {
  const future = isFuture(event.date);
  return (
    <div onClick={() => onClick(event)} style={{
      background: "#fff", border: "1px solid #e5e7d8", borderRadius: 14, overflow: "hidden",
      cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s", display: "flex", flexDirection: "column"
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(45,80,22,0.13)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ position: "relative", height: 170, overflow: "hidden", background: "#d4e6b5" }}>
        {event.image && <img src={event.image} alt={event.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />}
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}>
          <Badge color={event.island === "North Island" ? "#dbeafe" : "#fef3c7"} textColor={event.island === "North Island" ? "#1e40af" : "#92400e"}>{event.island}</Badge>
          {event.format === "backyard" && <Badge color="#fce7f3" textColor="#9d174d">Backyard</Badge>}
          {event.featured && <Badge color="#2D5016" textColor="#fff">★ Featured</Badge>}
        </div>
        {!future && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>PAST EVENT</span></div>}
      </div>
      <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "'Georgia', serif", marginBottom: 4 }}>{fmtDate(event.date)}</div>
        <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, fontFamily: "'Georgia', serif", color: "#1a2e0a", lineHeight: 1.3 }}>{event.name}</h3>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>📍 {event.location}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: "auto" }}>
          {event.distances.map(d => <Badge key={d} color="#f0f4e8" textColor="#3d6b1a">{d}</Badge>)}
        </div>
      </div>
    </div>
  );
}

function DirectoryCard({ item }) {
  const catColors = { coach: ["#e0f2fe","#0369a1"], physio: ["#f0fdf4","#166534"], nutrition: ["#fff7ed","#9a3412"], "run-group": ["#f5f3ff","#5b21b6"] };
  const catLabels = { coach: "Coach", physio: "Physio / Rehab", nutrition: "Nutrition", "run-group": "Run Group" };
  const [bg, text] = catColors[item.category] || ["#f3f4f6","#374151"];
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7d8", borderRadius: 14, padding: "18px 20px",
      display: "flex", flexDirection: "column", gap: 10,
      borderLeft: item.featured ? "4px solid #2D5016" : "1px solid #e5e7d8"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3 style={{ margin: 0, fontFamily: "'Georgia', serif", fontSize: 17, color: "#1a2e0a", fontWeight: 700 }}>{item.name}</h3>
        {item.featured && <Badge color="#2D5016" textColor="#fff">★ Featured</Badge>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Badge color={bg} textColor={text}>{catLabels[item.category]}</Badge>
        <Badge color="#f3f4f6" textColor="#374151">{item.region}</Badge>
      </div>
      <p style={{ margin: 0, fontSize: 14, color: "#4b5563", lineHeight: 1.55 }}>{item.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {item.tags.map(t => <span key={t} style={{ fontSize: 11, color: "#6b7280", background: "#f9fafb", padding: "2px 8px", borderRadius: 20, border: "1px solid #e5e7d8" }}>#{t}</span>)}
      </div>
      <a href={item.website} style={{ marginTop: 4, fontSize: 13, color: "#2D5016", fontWeight: 600, textDecoration: "none" }}>View Profile →</a>
    </div>
  );
}

function PricingCard({ tier, onSelect, label }) {
  return (
    <div style={{
      background: tier.highlighted ? "#2D5016" : "#fff",
      border: tier.highlighted ? "none" : "1.5px solid #e5e7d8",
      borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14,
      position: "relative", transform: tier.highlighted ? "scale(1.03)" : "none",
      boxShadow: tier.highlighted ? "0 8px 32px rgba(45,80,22,0.25)" : "none"
    }}>
      {tier.highlighted && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#A8C66C", color: "#1a2e0a", fontWeight: 700, fontSize: 11, padding: "4px 14px", borderRadius: 20, letterSpacing: 1 }}>MOST POPULAR</div>}
      <div>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, fontFamily: "'Georgia', serif", color: tier.highlighted ? "#fff" : "#1a2e0a" }}>{tier.name}</h3>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: tier.highlighted ? "#a8c66c" : "#6b7280" }}>{tier.description}</p>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: 34, fontWeight: 700, fontFamily: "'Georgia', serif", color: tier.highlighted ? "#fff" : "#1a2e0a" }}>{tier.price === 0 ? "Free" : `$${tier.price}`}</span>
        {tier.price > 0 && <span style={{ fontSize: 13, color: tier.highlighted ? "#a8c66c" : "#6b7280" }}>NZD / year</span>}
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
        {tier.features.map(f => <li key={f} style={{ fontSize: 14, color: tier.highlighted ? "#e8f5d0" : "#374151" }}>{f}</li>)}
      </ul>
      <button onClick={() => onSelect(tier)} style={{
        marginTop: 8, padding: "11px 0", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer",
        background: tier.highlighted ? "#A8C66C" : "#2D5016",
        color: tier.highlighted ? "#1a2e0a" : "#fff",
        border: "none", transition: "opacity 0.15s"
      }} onMouseEnter={e => e.target.style.opacity = 0.85} onMouseLeave={e => e.target.style.opacity = 1}>
        {tier.price === 0 ? "Get Listed Free" : `Get ${label || tier.name}`} →
      </button>
    </div>
  );
}

/* ─── PAGES ────────────────────────────────────────── */

function HomePage({ setPage }) {
  const upcoming = EVENTS.filter(e => isFuture(e.date)).sort((a,b) => new Date(a.date)-new Date(b.date)).slice(0,3);
  const featured = EVENTS.filter(e => e.featured).slice(0,3);
  return (
    <div>
      {/* Hero */}
      <div style={{ position: "relative", height: 520, overflow: "hidden", background: "#1a2e0a" }}>
        <img src="https://images.squarespace-cdn.com/content/v1/681d35cf1759b31b012c6134/0e679975-6fd8-4687-b4f3-040349f7f9e3/girdlestone+%281%29.jpg"
          alt="Trail running NZ"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
          onError={e => e.target.style.display = "none"} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", textAlign: "center" }}>
          <p style={{ color: "#A8C66C", fontSize: 13, fontWeight: 700, letterSpacing: 3, margin: "0 0 16px", textTransform: "uppercase" }}>New Zealand's Trail Running Community</p>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, color: "#fff", margin: "0 0 20px", lineHeight: 1.1, maxWidth: 680 }}>
            Find your next adventure on the trails
          </h1>
          <p style={{ color: "#d1e8b0", fontSize: 17, maxWidth: 520, lineHeight: 1.6, margin: "0 0 36px" }}>
            The complete directory of NZ trail running events, coaches, physios, and run groups.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => setPage("calendar")} style={{ background: "#A8C66C", color: "#1a2e0a", border: "none", padding: "14px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'Georgia', serif" }}>Browse Events →</button>
            <button onClick={() => setPage("directory")} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", padding: "14px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'Georgia', serif" }}>Find a Coach →</button>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ background: "#2D5016", padding: "0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { icon: "📅", label: "Race Calendar", sub: "Events across NZ", pg: "calendar" },
            { icon: "🗂", label: "Directory", sub: "Coaches, physio & groups", pg: "directory" },
            { icon: "➕", label: "Add a Listing", sub: "Event or business", pg: "list" },
          ].map(item => (
            <button key={item.pg} onClick={() => setPage(item.pg)} style={{
              background: "none", border: "none", borderRight: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
              padding: "20px 24px", display: "flex", alignItems: "center", gap: 14, transition: "background 0.15s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "'Georgia', serif" }}>{item.label}</div>
                <div style={{ color: "#A8C66C", fontSize: 12 }}>{item.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 30, fontWeight: 700, color: "#1a2e0a", margin: 0 }}>Upcoming Events</h2>
            <p style={{ color: "#6b7280", fontSize: 14, margin: "4px 0 0" }}>Next races on the calendar</p>
          </div>
          <button onClick={() => setPage("calendar")} style={{ background: "none", border: "1.5px solid #2D5016", color: "#2D5016", padding: "9px 20px", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Georgia', serif" }}>View Full Calendar →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {upcoming.map(e => <EventCard key={e.id} event={e} onClick={() => setPage("calendar")} />)}
        </div>
      </div>

      {/* Directory Promo */}
      <div style={{ background: "#f5f7ee", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div>
              <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 30, fontWeight: 700, color: "#1a2e0a", margin: 0 }}>Support Directory</h2>
              <p style={{ color: "#6b7280", fontSize: 14, margin: "4px 0 0" }}>Coaches, physios, nutritionists & run groups</p>
            </div>
            <button onClick={() => setPage("directory")} style={{ background: "none", border: "1.5px solid #2D5016", color: "#2D5016", padding: "9px 20px", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Georgia', serif" }}>Browse All →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {DIRECTORY.filter(d => d.featured || d.id <= 4).slice(0,4).map(item => <DirectoryCard key={item.id} item={item} />)}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#1a2e0a", padding: "60px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 34, color: "#fff", margin: "0 0 12px" }}>Got an event or business to list?</h2>
        <p style={{ color: "#a8c66c", fontSize: 16, margin: "0 0 32px", maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>Add yourself to the NZ trail running community — no invoices, no phone calls, just instant online listing.</p>
        <button onClick={() => setPage("list")} style={{ background: "#A8C66C", color: "#1a2e0a", border: "none", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "'Georgia', serif" }}>Add Your Listing →</button>
      </div>
    </div>
  );
}

function CalendarPage() {
  const [island, setIsland] = useState("all");
  const [format, setFormat] = useState("all");
  const [month, setMonth] = useState("all");
  const [search, setSearch] = useState("");
  const [showPast, setShowPast] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return EVENTS.filter(e => {
      if (!showPast && !isFuture(e.date)) return false;
      if (island !== "all" && e.island !== island) return false;
      if (format !== "all" && e.format !== format) return false;
      if (month !== "all" && getMonth(e.date) !== parseInt(month)) return false;
      if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.location.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    }).sort((a,b) => new Date(a.date)-new Date(b.date));
  }, [island, format, month, search, showPast]);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 36, fontWeight: 700, color: "#1a2e0a", margin: "0 0 8px" }}>Race Calendar</h1>
        <p style={{ color: "#6b7280", fontSize: 15, margin: 0 }}>Trail running events across Aotearoa New Zealand</p>
      </div>

      {/* Filters */}
      <div style={{ background: "#f5f7ee", borderRadius: 14, padding: "20px 24px", marginBottom: 32, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events or locations…"
          style={{ flex: "1 1 200px", padding: "9px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, background: "#fff", outline: "none" }} />
        <select value={island} onChange={e => setIsland(e.target.value)} style={{ padding: "9px 12px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, background: "#fff", cursor: "pointer" }}>
          <option value="all">All Islands</option>
          <option value="North Island">North Island</option>
          <option value="South Island">South Island</option>
        </select>
        <select value={format} onChange={e => setFormat(e.target.value)} style={{ padding: "9px 12px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, background: "#fff", cursor: "pointer" }}>
          <option value="all">All Formats</option>
          <option value="standard">Standard</option>
          <option value="backyard">Backyard Ultra</option>
        </select>
        <select value={month} onChange={e => setMonth(e.target.value)} style={{ padding: "9px 12px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, background: "#fff", cursor: "pointer" }}>
          <option value="all">All Months</option>
          {MONTHS.map((m,i) => <option key={i} value={i}>{m}</option>)}
        </select>
        <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#4b5563", cursor: "pointer", whiteSpace: "nowrap" }}>
          <input type="checkbox" checked={showPast} onChange={e => setShowPast(e.target.checked)} />
          Show past events
        </label>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#6b7280", fontWeight: 600 }}>{filtered.length} event{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* List view */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>No events match your filters.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {filtered.map((event, i) => {
            const dt = new Date(event.date);
            const prevDt = i > 0 ? new Date(filtered[i-1].date) : null;
            const showMonthHeader = !prevDt || (prevDt.getMonth() !== dt.getMonth() || prevDt.getFullYear() !== dt.getFullYear());
            return (
              <div key={event.id}>
                {showMonthHeader && (
                  <div style={{ padding: "20px 0 10px", borderBottom: "2px solid #e5e7d8", marginBottom: 0 }}>
                    <span style={{ fontFamily: "'Georgia', serif", fontSize: 18, fontWeight: 700, color: "#2D5016" }}>{MONTHS[dt.getMonth()]} {dt.getFullYear()}</span>
                  </div>
                )}
                <div onClick={() => setSelected(event)} style={{
                  display: "grid", gridTemplateColumns: "80px 1fr auto",
                  alignItems: "center", gap: 20, padding: "18px 0",
                  borderBottom: "1px solid #f0f2e8", cursor: "pointer",
                  transition: "background 0.1s", borderRadius: 8
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#f9faf4"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}>
                  {/* Date block */}
                  <div style={{ textAlign: "center", background: isFuture(event.date) ? "#2D5016" : "#9ca3af", borderRadius: 10, padding: "8px 0", color: "#fff" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Georgia', serif", lineHeight: 1 }}>{dt.getDate()}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{MONTHS[dt.getMonth()]}</div>
                  </div>
                  {/* Info */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Georgia', serif", fontSize: 17, fontWeight: 700, color: "#1a2e0a" }}>{event.name}</span>
                      {event.featured && <Badge color="#2D5016" textColor="#fff">★ Featured</Badge>}
                      {event.format === "backyard" && <Badge color="#fce7f3" textColor="#9d174d">Backyard</Badge>}
                    </div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>📍 {event.location} &nbsp;·&nbsp; {event.island}</div>
                    <div style={{ display: "flex", gap: 5, marginTop: 7, flexWrap: "wrap" }}>
                      {event.distances.map(d => <Badge key={d} color="#f0f4e8" textColor="#3d6b1a">{d}</Badge>)}
                    </div>
                  </div>
                  <div style={{ fontSize: 20, color: "#9ca3af" }}>›</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Event Modal */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, maxWidth: 560, width: "100%", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }}>
            {selected.image && <img src={selected.image} alt={selected.name} style={{ width: "100%", height: 220, objectFit: "cover" }} onError={e => e.target.style.display = "none"} />}
            <div style={{ padding: 28 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <Badge color={selected.island === "North Island" ? "#dbeafe" : "#fef3c7"} textColor={selected.island === "North Island" ? "#1e40af" : "#92400e"}>{selected.island}</Badge>
                {selected.format === "backyard" && <Badge color="#fce7f3" textColor="#9d174d">Backyard Ultra</Badge>}
              </div>
              <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, color: "#1a2e0a", margin: "0 0 8px" }}>{selected.name}</h2>
              <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 16px" }}>📅 {fmtDate(selected.date)} &nbsp;&nbsp; 📍 {selected.location}</p>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Distances</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {selected.distances.map(d => <Badge key={d} color="#f0f4e8" textColor="#3d6b1a">{d}</Badge>)}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button style={{ flex: 1, background: "#2D5016", color: "#fff", border: "none", padding: "12px 0", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Register Now</button>
                <button onClick={() => setSelected(null)} style={{ padding: "12px 20px", background: "none", border: "1.5px solid #e5e7d8", borderRadius: 10, cursor: "pointer", fontSize: 14, color: "#374151" }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DirectoryPage() {
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("all");
  const [search, setSearch] = useState("");

  const regions = [...new Set(DIRECTORY.map(d => d.region))].sort();

  const filtered = DIRECTORY.filter(item => {
    if (category !== "all" && item.category !== category) return false;
    if (region !== "all" && item.region !== region) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase()) && !item.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

   const rest = filtered.filter(d => !d.featured);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 36, fontWeight: 700, color: "#1a2e0a", margin: "0 0 8px" }}>Support Directory</h1>
        <p style={{ color: "#6b7280", fontSize: 15, margin: 0 }}>Find coaches, physios, nutritionists and run groups across Aotearoa</p>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { id: "all", label: "All" },
          { id: "coach", label: "Coaches" },
          { id: "physio", label: "Physio & Rehab" },
          { id: "nutrition", label: "Nutrition" },
          { id: "run-group", label: "Run Groups" },
        ].map(cat => (
          <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
            padding: "8px 18px", borderRadius: 24, border: "1.5px solid", cursor: "pointer",
            borderColor: category === cat.id ? "#2D5016" : "#d1d9bc",
            background: category === cat.id ? "#2D5016" : "#fff",
            color: category === cat.id ? "#fff" : "#374151",
            fontWeight: 600, fontSize: 13, transition: "all 0.15s"
          }}>{cat.label}</button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: "#f5f7ee", borderRadius: 14, padding: "16px 20px", marginBottom: 32, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search directory…"
          style={{ flex: "1 1 200px", padding: "9px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, background: "#fff", outline: "none" }} />
        <select value={region} onChange={e => setRegion(e.target.value)} style={{ padding: "9px 12px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, background: "#fff", cursor: "pointer" }}>
          <option value="all">All Regions</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#6b7280", fontWeight: 600 }}>{filtered.length} listing{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700, color: "#1a2e0a", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ background: "#2D5016", color: "#fff", fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 700 }}>★ FEATURED</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {featured.map(item => <DirectoryCard key={item.id} item={item} />)}
          </div>
        </div>
      )}

      {/* Rest */}
      {rest.length > 0 && (
        <div>
          {featured.length > 0 && <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700, color: "#1a2e0a", margin: "0 0 16px" }}>All Listings</h2>}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {rest.map(item => <DirectoryCard key={item.id} item={item} />)}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>No listings match your search.</div>
      )}
    </div>
  );
}

function ListingPage() {
  const [type, setType] = useState("event");
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(1); // 1=choose tier, 2=form, 3=payment, 4=success

  const tiers = type === "event" ? EVENT_TIERS : LISTING_TIERS;

  const handleSelectTier = (tier) => { setSelected(tier); setStep(2); };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 36, fontWeight: 700, color: "#1a2e0a", margin: "0 0 8px" }}>Add a Listing</h1>
        <p style={{ color: "#6b7280", fontSize: 15, margin: 0 }}>Get your event or business in front of the NZ trail running community</p>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", gap: 0, marginBottom: 36, background: "#f5f7ee", borderRadius: 12, overflow: "hidden" }}>
        {["Choose Plan", "Your Details", "Payment", "Done"].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "12px 8px", textAlign: "center", background: step === i+1 ? "#2D5016" : "none",
            color: step === i+1 ? "#fff" : step > i+1 ? "#2D5016" : "#9ca3af",
            fontSize: 13, fontWeight: step === i+1 ? 700 : 400, borderRight: i < 3 ? "1px solid #e5e7d8" : "none"
          }}>
            <span style={{ display: "block", fontSize: 10, marginBottom: 2 }}>{i+1}</span>
            {s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          {/* Type toggle */}
          <div style={{ display: "flex", gap: 0, background: "#f5f7ee", borderRadius: 10, padding: 4, marginBottom: 32, width: "fit-content" }}>
            {[{ id: "event", label: "Race / Event" }, { id: "business", label: "Business / Service" }].map(t => (
              <button key={t.id} onClick={() => setType(t.id)} style={{
                padding: "9px 22px", border: "none", borderRadius: 8, cursor: "pointer",
                background: type === t.id ? "#fff" : "none",
                color: type === t.id ? "#1a2e0a" : "#6b7280",
                fontWeight: type === t.id ? 700 : 400, fontSize: 14,
                boxShadow: type === t.id ? "0 1px 4px rgba(0,0,0,0.1)" : "none"
              }}>{t.label}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {tiers.map(tier => <PricingCard key={tier.id} tier={tier} onSelect={handleSelectTier} label={type === "event" ? "Event Listing" : "Listing"} />)}
          </div>
        </div>
      )}

      {step === 2 && selected && (
        <div style={{ background: "#fff", border: "1px solid #e5e7d8", borderRadius: 16, padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 22, margin: 0, color: "#1a2e0a" }}>{type === "event" ? "Event" : "Business"} Details</h2>
            <Badge color="#2D5016" textColor="#fff">{selected.name}</Badge>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {type === "event" ? <>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Event Name *</label>
                <input placeholder="e.g. Tararua Mountain Race" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Date *</label>
                <input type="date" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Island *</label>
                <select style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, background: "#fff" }}>
                  <option>North Island</option>
                  <option>South Island</option>
                </select>
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Location *</label>
                <input placeholder="e.g. Kaitoke to Otaki Forks, Tararua Ranges" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, outline: "none" }} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Distances (comma separated)</label>
                <input placeholder="e.g. 100K, 50K, 21K, 10K" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, outline: "none" }} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Website / Registration Link</label>
                <input placeholder="https://…" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, outline: "none" }} />
              </div>
              {selected.id !== "free" && <div style={{ gridColumn: "1/-1" }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Event Description</label>
                <textarea rows={4} placeholder="Tell runners about your event…" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, outline: "none", resize: "vertical" }} />
              </div>}
            </> : <>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Business / Service Name *</label>
                <input placeholder="e.g. Single Track Collective" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Category *</label>
                <select style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, background: "#fff" }}>
                  <option>Coach</option>
                  <option>Physio / Rehab</option>
                  <option>Nutrition</option>
                  <option>Run Group</option>
                  <option>Gear / Retail</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Region *</label>
                <input placeholder="e.g. Wellington" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, outline: "none" }} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Description *</label>
                <textarea rows={3} placeholder="Brief description of your services…" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, outline: "none", resize: "vertical" }} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Website</label>
                <input placeholder="https://…" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, outline: "none" }} />
              </div>
            </>}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Contact Name *</label>
              <input placeholder="Your full name" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Email *</label>
              <input type="email" placeholder="you@example.com" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <button onClick={() => setStep(selected.price === 0 ? 4 : 3)} style={{ flex: 1, background: "#2D5016", color: "#fff", border: "none", padding: "13px 0", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              {selected.price === 0 ? "Submit Free Listing →" : `Continue to Payment →`}
            </button>
            <button onClick={() => setStep(1)} style={{ padding: "13px 20px", background: "none", border: "1.5px solid #e5e7d8", borderRadius: 10, cursor: "pointer", fontSize: 14, color: "#374151" }}>Back</button>
          </div>
        </div>
      )}

      {step === 3 && selected && (
        <div style={{ background: "#fff", border: "1px solid #e5e7d8", borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 22, margin: "0 0 8px", color: "#1a2e0a" }}>Payment</h2>
          <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 28px" }}>Secure payment powered by Stripe</p>

          <div style={{ background: "#f5f7ee", borderRadius: 12, padding: "16px 20px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#1a2e0a" }}>{selected.name}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{type === "event" ? "Event listing" : "Directory listing"} — annual</div>
            </div>
            <div style={{ fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: 700, color: "#2D5016" }}>${selected.price} NZD</div>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Card Number</label>
              <div style={{ padding: "11px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, color: "#9ca3af", background: "#fafaf8" }}>
                Stripe card element loads here
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Expiry</label>
                <div style={{ padding: "11px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, color: "#9ca3af", background: "#fafaf8" }}>MM / YY</div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>CVC</label>
                <div style={{ padding: "11px 14px", borderRadius: 9, border: "1.5px solid #d1d9bc", fontSize: 14, color: "#9ca3af", background: "#fafaf8" }}>CVC</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "20px 0 24px", fontSize: 13, color: "#6b7280" }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="#6b7280" strokeWidth="1.5" d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5z"/></svg>
            Payments are processed securely by Stripe. Your card details are never stored on our servers.
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setStep(4)} style={{ flex: 1, background: "#2D5016", color: "#fff", border: "none", padding: "14px 0", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              Pay ${selected.price} NZD →
            </button>
            <button onClick={() => setStep(2)} style={{ padding: "14px 20px", background: "none", border: "1.5px solid #e5e7d8", borderRadius: 10, cursor: "pointer", fontSize: 14, color: "#374151" }}>Back</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div style={{ background: "#fff", border: "1px solid #e5e7d8", borderRadius: 16, padding: 48, textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#e8f5d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 36 }}>✓</div>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, color: "#1a2e0a", margin: "0 0 10px" }}>
            {selected?.price === 0 ? "Listing Submitted!" : "Payment Successful!"}
          </h2>
          <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 400, margin: "0 auto 32px" }}>
            {selected?.price === 0
              ? "Your free listing has been submitted for review. We'll have it live within 24 hours."
              : "Your listing is now live on Trail Running NZ. You'll receive a confirmation email shortly."}
          </p>
          <button onClick={() => { setStep(1); setSelected(null); }} style={{ background: "#2D5016", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Submit Another Listing</button>
        </div>
      )}
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: "#1a2e0a", color: "#a8c66c", padding: "48px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#2D5016"/>
                <path d="M8 22 L14 10 L20 18 L24 14" stroke="#A8C66C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="24" cy="14" r="2.5" fill="#A8C66C"/>
              </svg>
              <span style={{ fontFamily: "'Georgia', serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>Trail Running NZ</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 260, color: "#6b8f5a" }}>New Zealand's home for trail running events, coaches, and community. No road races, no Colour Runs.</p>
          </div>
          {[
            { title: "Events", links: [{ label: "Race Calendar", pg: "calendar" }, { label: "Add an Event", pg: "list" }] },
            { title: "Directory", links: [{ label: "Coaches", pg: "directory" }, { label: "Physio & Rehab", pg: "directory" }, { label: "Run Groups", pg: "directory" }, { label: "Add a Listing", pg: "list" }] },
            { title: "About", links: [{ label: "Contact", pg: "home" }, { label: "Pricing", pg: "list" }] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>{col.title}</h4>
              {col.links.map(l => (
                <button key={l.label} onClick={() => setPage(l.pg)} style={{ display: "block", background: "none", border: "none", color: "#6b8f5a", fontSize: 13, cursor: "pointer", padding: "3px 0", textAlign: "left", transition: "color 0.1s" }}
                onMouseEnter={e => e.target.style.color = "#a8c66c"} onMouseLeave={e => e.target.style.color = "#6b8f5a"}>{l.label}</button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(168,198,108,0.2)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#4d6e3a" }}>
          <span>© 2026 Trail Running NZ. All rights reserved.</span>
          <span>Built for the trail community 🏔</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ──────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "system-ui, sans-serif", background: "#fff", color: "#1a2e0a" }}>
      <Nav page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "calendar" && <CalendarPage />}
      {page === "directory" && <DirectoryPage />}
      {page === "list" && <ListingPage />}
      <Footer setPage={setPage} />
    </div>
  );
}
