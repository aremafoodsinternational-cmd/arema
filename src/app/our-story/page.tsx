import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './OurStory.module.css';

export const metadata: Metadata = {
  title: 'Our Story — Arema Foods International',
  description:
    'Arema Foods International — a Palakkad-based exporter bringing GI-tagged Palakkadan Matta rice to the world. Sourced from the Bharathapuzha river banks, aged traditionally, processed to international standards.',
};

const BELIEFS = [
  {
    title: 'Authentic Origin, No Exceptions',
    body: 'Every grain is sourced exclusively from farms along the fertile banks of the Bharathapuzha river in Palakkad — the only region in India that produces genuine Palakkadan Matta. We do not source from outside. We never have.',
  },
  {
    title: 'Traditional Aging, Not Shortcuts',
    body: 'We honour time-tested aging methods that preserve the authentic taste your grandmother cooked with. Patience is not a delay in our supply chain — it is the process. The method has not changed, because it does not need to.',
  },
  {
    title: 'The GI Seal Is a Legal Promise',
    body: "The Government of India's Geographical Indication seal on every Arema pack is not a marketing label. It is a legal guarantee — backed by the state — that what's inside is real Palakkadan Matta. Nothing more, nothing less.",
  },
  {
    title: 'Full Traceability, From Farm to Pack',
    body: 'Every shipment carries documentation traceable back to its source farm. When a distributor or buyer asks us for proof, we provide it — not a brochure, not a story. Actual documentation of actual origin.',
  },
  {
    title: 'Export Standards. Zero Compromise.',
    body: 'Modern hygiene, FSSAI compliance, and export-grade processing ensure every shipment meets the strictest international food safety benchmarks. The grain is traditional. The handling is world-class. Both are non-negotiable.',
  },
  {
    title: 'We Serve Those Who Will Not Settle',
    body: "Our customers are Malayali families abroad who know what real Matta tastes like. Distributors who have been burned by imitations. Buyers who need certainty. We are the answer to one question: \"Is this real Palakkadan?\" Yes. Always.",
  },
];

const STATS = [
  { value: 'GI', label: 'Certified', desc: 'Government of India Geographical Indication seal on every pack.' },
  { value: '100%', label: 'Traceable', desc: 'Full farm-to-pack documentation on every shipment.' },
  { value: '0', label: 'Compromise', desc: 'Zero shortcuts on taste, origin, or food safety.' },
  { value: '∞', label: 'Trust', desc: 'The only currency we trade in.' },
];

const MARKETS = [
  { name: '🇮🇳  India — Kerala & National', status: 'Primary Market' },
  { name: '🇦🇪  UAE & Qatar', status: 'Active Export' },
  { name: '🇬🇧  United Kingdom', status: 'Active Export' },
  { name: '🇳🇱  Netherlands', status: 'Active Export' },
  { name: '🇺🇸  United States & Canada', status: 'Active Export' },
  { name: '🌍  Expanding', status: 'Gulf & SE Asia' },
];

export default function OurStoryPage() {
  return (
    <main>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <Image
          src="/images/hero.png"
          alt="Palakkad paddy fields at golden hour"
          fill
          className={styles.heroBg}
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroLabel}>
            <span className={styles.heroLabelLine} />
            <span className={styles.heroLabelText}>Arema Foods International — Our Story</span>
          </div>
          <h1 className={styles.heroHeadline}>
            Born in the<br />
            <em className={styles.heroHeadlineEm}>fields of Palakkad.</em>
          </h1>
          <div className={styles.heroBottom}>
            <p className={styles.heroDesc}>
              Not built in a boardroom. Not founded on a pitch deck.
              Arema grew from the paddy fields along the Bharathapuzha — where
              families have farmed the same Matta rice for generations. We exist
              to take that grain — unchanged, genuine, GI-certified — to the world.
            </p>
            <div className={styles.heroScroll}>
              <div className={styles.heroScrollCircle}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(216,201,174,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
              <span className={styles.heroScrollText}>Scroll</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          OPENING STATEMENT
      ══════════════════════════════════════════════ */}
      <section className={styles.statement}>
        <div className={styles.statementInner}>
          <div className={styles.statementSide}>
            <span className={styles.statementSideLabel}>About Us</span>
            <span className={styles.statementSideLine} />
          </div>
          <div className={styles.statementBody}>
            <h2 className={styles.statementLead}>
              Palakkad&apos;s finest, proven{' '}
              <em className={styles.statementLeadEm}>to the world.</em>
            </h2>
            <p className={styles.statementText}>
              Arema Foods International is a Palakkad-based exporter built to take GI-tagged
              Palakkadan Matta to the world. Every grain is sourced from Palakkadan farms,
              aged traditionally, and processed under international hygiene standards to
              preserve the authentic taste of Palakkad.
            </p>
            <p className={styles.statementText}>
              Each pack carries traceability back to the farm and the Government GI seal that
              legally guarantees it&apos;s the real Palakkadan Matta — not an imitation. From
              Malayali homes in Kerala to global retail shelves, Arema serves those who
              won&apos;t compromise on trust.{' '}
              <span className={styles.statementTextBold}>
                Our export-compliant packaging, transparent sourcing, and farm-to-table proof
              </span>{' '}
              have made us the preferred choice for distributors who need to answer one
              question:{' '}
              <span className={styles.statementTextBrown}>
                &ldquo;Is this real Palakkadan?&rdquo; We don&apos;t just say it. We prove it. In every pack.
              </span>
            </p>
            <div className={styles.certBadges}>
              {[
                { val: 'GI', label: 'Tag Certified' },
                { val: 'FSSAI', label: 'Registered' },
                { val: 'APEDA', label: 'Certified Exporter' },
                { val: '100%', label: 'Farm Traceable' },
              ].map(b => (
                <div key={b.val} className={styles.certBadge}>
                  <span className={styles.certBadgeVal}>{b.val}</span>
                  <span className={styles.certBadgeLabel}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOUNDER — The Man Behind Arema
      ══════════════════════════════════════════════ */}
      <section className={styles.founder}>
        <div className={styles.founderInner}>
          {/* Left — Photo */}
          <div className={styles.founderImageWrap}>
            <div className={styles.founderImageFrame}>
              <Image
                src="/images/founder.jpg"
                alt="Nibeesh J B — Founder, Arema Foods International"
                fill
                className={styles.founderImage}
                sizes="(max-width: 1024px) 90vw, 45vw"
                priority
              />
            </div>
            <div className={styles.founderBadge}>
              <span className={styles.founderBadgeLabel}>Founder &amp; Director</span>
              <span className={styles.founderBadgeName}>Nibeesh J B</span>
            </div>
          </div>

          {/* Right — Story */}
          <div className={styles.founderContent}>
            <span className={styles.founderEyebrow}>The Man Behind Arema</span>
            <h2 className={styles.founderHeading}>
              From the fields of{' '}
              <em className={styles.founderHeadingEm}>Palakkad,</em>{' '}
              to tables across the world.
            </h2>
            <div className={styles.founderBody}>
              <p>
                Nibeesh J B grew up understanding rice — not as a commodity, but as a way of life 
                rooted in the fertile soil of Palakkad. Having spent years observing international 
                trade, he saw a gap that no one was filling honestly: the world wanted authentic 
                Palakkadan Matta, but what it was getting was often imitation.
              </p>
              <p>
                In 2025, he founded Arema Foods International with a single conviction — 
                <strong> if we send it, it is real.</strong> No shortcuts. No substitutions. 
                Every shipment is traceable to its source farm, certified by the Government of India&apos;s 
                GI seal, and processed to international food safety standards.
              </p>
              <p>
                Today, Arema supplies to distributors and families across the UAE, UK, Europe, 
                and North America — not because of marketing, but because the grain speaks for itself.
              </p>
            </div>
            <div className={styles.founderQuote}>
              <span className={styles.founderQuoteMark}>&ldquo;</span>
              <p className={styles.founderQuoteText}>
                We do not just export rice. We export the story of a land, a people,
                and a standard of care that has no shortcuts.
              </p>
            </div>
            <div className={styles.founderCerts}>
              <div className={styles.founderCert}>
                <span className={styles.founderCertVal}>2025</span>
                <span className={styles.founderCertLabel}>Founded</span>
              </div>
              <div className={styles.founderCert}>
                <span className={styles.founderCertVal}>GI</span>
                <span className={styles.founderCertLabel}>Certified Exporter</span>
              </div>
              <div className={styles.founderCert}>
                <span className={styles.founderCertVal}>APEDA</span>
                <span className={styles.founderCertLabel}>RCMC Member</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3-PANEL IMAGE STRIP — field / rice bowl / harvest
      ══════════════════════════════════════════════ */}
      <div className={styles.imageStrip}>
        <div className={styles.imageStripGrid}>
          {[
            { src: '/images/tl-02.png', cap: 'Palakkad paddy — Bharathapuzha basin' },
            { src: '/images/tl-04.png', cap: 'Palakkadan Matta — the grain itself' },
            { src: '/images/tl-01.png', cap: 'Generational farming knowledge' },
          ].map((img) => (
            <div key={img.src} className={styles.imageStripItem}>
              <Image src={img.src} alt={img.cap} fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="34vw" />
              <div className={styles.imageStripOverlay} />
              <span className={styles.imageStripCaption}>{img.cap}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          VISION & MISSION — editorial split columns
      ══════════════════════════════════════════════ */}
      <section className={styles.vm}>
        <div className={styles.vmInner}>
          <div className={styles.vmHeader}>
            <h2 className={styles.vmHeaderTitle}>
              Vision &{' '}
              <em className={styles.vmHeaderTitleEm}>Mission</em>
            </h2>
            <p className={styles.vmHeaderNote}>
              What we believe<br />and why we exist
            </p>
          </div>
          <div className={styles.vmCols}>
            <div className={styles.vmCol}>
              <span className={styles.vmColTag}>Our Vision</span>
              <h3 className={styles.vmColHeading}>
                A trusted global exporter of authentic Kerala food.
              </h3>
              <p className={styles.vmColBody}>
                To become a trusted global exporter of authentic Kerala food products —
                bridging local agricultural excellence with international markets through
                an unwavering commitment to quality, integrity, and lasting partnerships.
              </p>
            </div>
            <div className={styles.vmDivider} />
            <div className={styles.vmCol}>
              <span className={styles.vmColTag}>Our Mission</span>
              <h3 className={styles.vmColHeading}>
                Palakkadan Matta — as your grandmother cooked it.
              </h3>
              <p className={styles.vmColBody}>
                To bring the authentic taste of Palakkadan Matta rice — grown along the
                fertile banks of the Bharathapuzha — to dinner tables around the world.
                We honour the rich culinary heritage of Palakkad through time-tested
                traditional aging methods, while upholding the highest standards of
                modern hygiene and food safety.
              </p>
              <p className={styles.vmColHighlight}>
                Zero compromise on taste. Unwavering quality. Trust in every grain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FULL BLEED QUOTE — father + son in field
      ══════════════════════════════════════════════ */}
      <section className={styles.fieldQuote}>
        <Image
          src="/images/tl-01.png"
          alt="Farmer and son in the Palakkad paddy fields"
          fill
          className={styles.fieldQuoteBg}
          sizes="100vw"
        />
        <div className={styles.fieldQuoteOverlay} />
        <div className={styles.fieldQuoteContent}>
          <div className={styles.fieldQuoteBlock}>
            <span className={styles.fieldQuoteMark}>&ldquo;</span>
            <p className={styles.fieldQuoteText}>
              Every grain we export carries proof of origin,
              pride of place, and a legacy you can taste.
            </p>
            <span className={styles.fieldQuoteAttr}>
              Our Promise — Arema Foods International
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT WE BELIEVE — numbered editorial list
      ══════════════════════════════════════════════ */}
      <section className={styles.beliefs}>
        <div className={styles.beliefsInner}>
          <div className={styles.beliefsHeader}>
            <span className={styles.beliefsHeaderLabel}>What We Believe</span>
            <h2 className={styles.beliefsHeaderTitle}>
              Six things we will{' '}
              <em className={styles.beliefsHeaderTitleEm}>never compromise on.</em>
            </h2>
          </div>
          <div className={styles.beliefsList}>
            {BELIEFS.map((b, i) => (
              <div key={i} className={styles.beliefItem}>
                <span className={styles.beliefNum}>0{i + 1}</span>
                <div className={styles.beliefContent}>
                  <h3 className={styles.beliefTitle}>{b.title}</h3>
                  <p className={styles.beliefBody}>{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════════════ */}
      <section className={styles.statsBand}>
        <div className={styles.statsBandInner}>
          {STATS.map((s) => (
            <div key={s.value} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
              <p className={styles.statDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GLOBAL REACH — EXPORT LEDGER (New Unique Idea)
      ══════════════════════════════════════════════════════ */}
      <section className={styles.reach}>
        <div className={styles.reachHeader}>
          <span className={styles.reachLabel}>Export Manifest</span>
          <h2 className={styles.reachTitle}>
            From Palakkad<br />
            <em className={styles.reachTitleEm}>to the world.</em>
          </h2>
          <p className={styles.reachBody}>
            We do not just export rice; we export a guarantee. Our shipments clear the 
            strictest customs in the world because our documentation is as flawless as 
            our grain. Active export routes, fully certified.
          </p>
        </div>

        {/* Infinite scrolling marquee of cities */}
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeContent}>
            {/* Repeated twice for seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className={styles.marqueeItem}>
                <span className={styles.marqueeText}>Dubai</span>
                <span className={styles.marqueeDot} />
                <span className={styles.marqueeText}>London</span>
                <span className={styles.marqueeDot} />
                <span className={styles.marqueeText}>Doha</span>
                <span className={styles.marqueeDot} />
                <span className={styles.marqueeText}>Amsterdam</span>
                <span className={styles.marqueeDot} />
                <span className={styles.marqueeText}>Toronto</span>
                <span className={styles.marqueeDot} />
                <span className={styles.marqueeText}>New York</span>
                <span className={styles.marqueeDot} />
              </div>
            ))}
          </div>
        </div>

        {/* Ledger Grid */}
        <div className={styles.ledgerContainer}>
          <div className={styles.ledgerGrid}>
            {[
              { code: 'ROUTE / 01', region: 'United Arab Emirates & Qatar', ports: 'Serving hypermarkets and premium distributors across the Gulf.', status: 'Active Export' },
              { code: 'ROUTE / 02', region: 'United Kingdom & Europe', ports: 'Compliant with strict EU/UK food safety and import standards.', status: 'Active Export' },
              { code: 'ROUTE / 03', region: 'North America', ports: 'Reaching the diaspora in major cities across the US and Canada.', status: 'Active Export' },
            ].map((route, idx) => (
              <div key={idx} className={styles.ledgerCard}>
                <span className={styles.ledgerCode}>{route.code}</span>
                <h3 className={styles.ledgerRegion}>{route.region}</h3>
                <p className={styles.ledgerPorts}>{route.ports}</p>
                <div className={styles.ledgerStatus}>
                  <span className={styles.ledgerStatusDot} />
                  {route.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CLOSING — cargo ship image + founder quote
      ══════════════════════════════════════════════ */}
      <section className={styles.closing}>
        <Image
          src="/images/tl-05.png"
          alt="Arema export — cargo ship at sunset"
          fill
          className={styles.closingBg}
          sizes="100vw"
        />
        <div className={styles.closingOverlay} />
        <div className={styles.closingInner}>
          <p className={styles.closingQuote}>
            &ldquo;We do not just export rice. We export the story of a land, a people,
            and a standard of care that has no shortcuts.&rdquo;
          </p>
          <div className={styles.closingRight}>
            <span className={styles.closingAttr}>— Founder, Arema Foods International</span>
            <Link href="/products" className={styles.closingCta}>
              View Our Products
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
