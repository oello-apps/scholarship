export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for ScholarSphere.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Legal</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: 11 November 2026</p>

      <div className="mt-8 space-y-8 leading-relaxed text-slate-600 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-slate-900">
        <section>
          <h2>1. What ScholarSphere is</h2>
          <p className="mt-3">
            ScholarSphere is an information directory. We publish summaries of
            scholarships offered by third-party governments, universities, and
            organisations, with links to their official websites. We do not
            offer scholarships ourselves, process applications, or decide who
            receives an award.
          </p>
        </section>
        <section>
          <h2>2. Using the site</h2>
          <p className="mt-3">
            You may browse the site freely. You agree not to misuse it — for
            example, by scraping it aggressively, attempting to disrupt it, or
            using it to mislead others. No account is required, and no part of
            the site should be taken as personal advice about which scholarship
            to apply for.
          </p>
        </section>
        <section>
          <h2>3. Accuracy</h2>
          <p className="mt-3">
            We work hard to keep listings accurate, but scholarship details —
            including deadlines, eligibility, and funding — can change at any
            time. The official provider page is always the authoritative
            source. Please verify all details there before applying or making
            plans based on a listing.
          </p>
        </section>
        <section>
          <h2>4. External links</h2>
          <p className="mt-3">
            The site links to external websites that we do not control. We are
            not responsible for their content, availability, or privacy
            practices. Following a link does not imply endorsement.
          </p>
        </section>
        <section>
          <h2>5. Contact messages</h2>
          <p className="mt-3">
            If you contact us, we use the details you provide only to respond
            to your enquiry. We do not sell personal information. Messages
            about a specific scholarship should be directed to the provider of
            that scholarship.
          </p>
        </section>
        <section>
          <h2>6. Intellectual property</h2>
          <p className="mt-3">
            The ScholarSphere name, design, and original text on this site are
            ours. Scholarship names, logos, and descriptions belong to their
            respective providers. You may share links to our pages freely.
          </p>
        </section>
        <section>
          <h2>7. Liability</h2>
          <p className="mt-3">
            The site is provided &ldquo;as is&rdquo;, without warranties of any
            kind. To the extent permitted by law, we are not liable for any
            loss arising from reliance on a listing, a missed deadline, or an
            unsuccessful application.
          </p>
        </section>
        <section>
          <h2>8. Changes to these terms</h2>
          <p className="mt-3">
            We may update these terms from time to time. The version published
            on this page is the current one. If you have questions, please{" "}
            <a href="/contact" className="font-semibold text-indigo-600 hover:underline">contact us</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
