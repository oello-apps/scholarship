import { ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer for ScholarSphere — please verify all scholarship details on the official provider page.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Legal</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Disclaimer
      </h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: 11 November 2026</p>

      <div className="mt-8 flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-5">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
        <p className="text-sm leading-relaxed text-amber-900">
          ScholarSphere is an information directory only. We do not offer
          scholarships, process applications, or guarantee admission or
          funding. Always verify deadlines, eligibility, and funding on the
          official scholarship page before you apply.
        </p>
      </div>

      <div className="mt-8 space-y-8 leading-relaxed text-slate-600 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-slate-900">
        <section>
          <h2>Information only</h2>
          <p className="mt-3">
            The information on this site is provided for general information.
            Scholarship programmes change their rules, deadlines, and funding
            frequently, and details may be outdated or incomplete at any
            given moment. We do not warrant that any listing is complete,
            current, or accurate.
          </p>
        </section>
        <section>
          <h2>No affiliation</h2>
          <p className="mt-3">
            Unless stated otherwise, ScholarSphere is not affiliated with,
            endorsed by, or acting on behalf of any government, university, or
            scholarship provider listed on this site. Trademarks and programme
            names belong to their respective owners.
          </p>
        </section>
        <section>
          <h2>Apply only on official sites</h2>
          <p className="mt-3">
            Applications must be made through the official channels of each
            scholarship provider. ScholarSphere never asks for application
            fees, documents, or payments, and no legitimate scholarship
            provider should ask you to pay a fee to apply. If someone contacts
            you claiming to represent ScholarSphere or a scholarship and asks
            for money, treat it as a scam and report it to the provider
            directly.
          </p>
        </section>
        <section>
          <h2>No guarantee of success</h2>
          <p className="mt-3">
            A listing on ScholarSphere does not mean you are eligible, and it
            does not guarantee that you will be selected. Selection is made
            entirely by the scholarship provider under its own criteria.
          </p>
        </section>
        <section>
          <h2>External links</h2>
          <p className="mt-3">
            Links to external websites are provided for convenience. We do not
            control those sites and are not responsible for their content,
            security, or privacy practices.
          </p>
        </section>
        <section>
          <h2>Contact us</h2>
          <p className="mt-3">
            If you spot an error in a listing, please{" "}
            <a href="/contact" className="font-semibold text-indigo-600 hover:underline">let us know</a>{" "}
            and we will review it. For questions about a specific scholarship,
            contact the provider directly.
          </p>
        </section>
      </div>
    </div>
  );
}
