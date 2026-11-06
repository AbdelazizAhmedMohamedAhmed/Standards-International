import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { companyContact, industries, SITE_URL } from "@/lib/site-content";
import { PageHero } from "@/components/site/SiteChrome";

type Journey = "buyer" | "partner";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { type?: Journey } =>
    s["type"] === "partner" ? { type: "partner" } : s["type"] === "buyer" ? { type: "buyer" } : {},
  head: () => ({
    meta: [
      { title: "Contact & Trade Inquiry — Standards" },
      {
        name: "description",
        content:
          "Request product sourcing as a buyer, or become a trade partner as a manufacturer or exporter.",
      },
      { property: "og:title", content: "Trade Inquiry — STANDARDS" },
      {
        property: "og:description",
        content: "Request product sourcing or become a trade partner.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: Contact,
});

const field =
  "mt-2 w-full border border-input bg-card px-4 py-3 text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30";
const labelCls = "text-sm font-semibold text-navy";

const MAX_FILE = 10 * 1024 * 1024;
const FILE_TYPES = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png";

function F({
  name,
  label,
  required,
  children,
  wide,
  errors,
}: {
  name: string;
  label: string;
  required?: boolean;
  children: ReactNode;
  wide?: boolean;
  errors: Record<string, string>;
}) {
  return (
    <label className={`block ${wide ? "md:col-span-2" : ""}`}>
      <span className={labelCls}>
        {label}{" "}
        {required ? (
          <span className="text-primary">*</span>
        ) : (
          <span className="font-normal text-muted-foreground">(optional)</span>
        )}
      </span>
      {children}
      {errors[name] && (
        <p id={`${name}-err`} className="mt-1 text-sm text-destructive">
          {errors[name]}
        </p>
      )}
    </label>
  );
}

function Contact() {
  const { type } = Route.useSearch();
  const journey: Journey = type ?? "buyer";
  const navigate = useNavigate({ from: "/contact" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");

  const required =
    journey === "buyer"
      ? ["name", "company", "email", "country", "category", "product", "quantity", "destination"]
      : ["name", "company", "email", "country", "categories", "capabilities", "targets"];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    if (String(d.get("website_hp") || "")) return; // spam trap
    const errs: Record<string, string> = {};
    for (const k of required)
      if (!String(d.get(k) || "").trim()) errs[k] = "This field is required.";
    if (d.get("email") && !/^\S+@\S+\.\S+$/.test(String(d.get("email")).trim()))
      errs["email"] = "Please enter a valid business email.";
    const file = d.get("file");
    if (file instanceof File && file.size > MAX_FILE)
      errs["file"] = "File must be 10 MB or smaller.";
    if (!d.get("consent")) errs["consent"] = "Please accept so we can use your details to reply.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      setNotice("");
      const firstField = e.currentTarget.elements.namedItem(Object.keys(errs)[0]!);
      if (firstField instanceof HTMLElement) firstField.focus();
      return;
    }
    setNotice(
      "Your details look complete, but online sending isn't switched on yet, so this inquiry was not sent.",
    );
  }

  const p = (name: string) => ({
    name,
    id: name,
    required: required.includes(name),
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-err` : undefined,
  });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a trade inquiry."
        intro="Choose your path. The more detail you share, the faster we can respond with relevant options."
      />
      <section className="container-x grid gap-16 py-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div
            role="group"
            aria-label="Inquiry type"
            className="grid grid-cols-2 border border-input"
          >
            {(
              [
                ["buyer", "Request Product Sourcing"],
                ["partner", "Become a Trade Partner"],
              ] as const
            ).map(([k, t]) => (
              <button
                key={k}
                type="button"
                aria-pressed={journey === k}
                onClick={() => {
                  setErrors({});
                  setNotice("");
                  navigate({ search: { type: k }, replace: true });
                }}
                className={`px-4 py-4 text-sm font-semibold transition ${journey === k ? "bg-primary text-primary-foreground" : "bg-card text-navy hover:bg-muted"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {journey === "buyer"
              ? "For buyers and importers looking for a product or supplier."
              : "For manufacturers and exporters looking for international buyers."}
          </p>

          <div className="mt-6 border-l-2 border-primary bg-card p-5 text-sm text-navy">
            <p className="font-semibold">Send your inquiry by email</p>
            <p className="mt-2">
              Online sending is not enabled yet. Email buyer requests and partnership inquiries to{" "}
              <a
                href={`mailto:${companyContact.salesEmail}`}
                className="font-semibold underline underline-offset-4"
              >
                {companyContact.salesEmail}
              </a>
              . You can use the checklist below to prepare your details; it does not send or upload
              anything. Attach specifications or company profiles directly to your email.
            </p>
          </div>

          <form key={journey} onSubmit={onSubmit} noValidate className="mt-8 space-y-8">
            {Object.keys(errors).length > 0 && (
              <p role="alert" className="text-sm font-semibold text-destructive">
                Please check the highlighted fields. Focus has moved to the first field that needs
                attention.
              </p>
            )}
            <input
              type="text"
              name="website_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div className="grid gap-6 md:grid-cols-2">
              <F
                name="name"
                label={journey === "buyer" ? "Name" : "Contact name"}
                required
                errors={errors}
              >
                <input {...p("name")} className={field} maxLength={100} autoComplete="name" />
              </F>
              <F name="company" label="Company name" required errors={errors}>
                <input
                  {...p("company")}
                  className={field}
                  maxLength={150}
                  autoComplete="organization"
                />
              </F>
              <F name="email" label="Business email" required errors={errors}>
                <input
                  {...p("email")}
                  type="email"
                  className={field}
                  maxLength={255}
                  autoComplete="email"
                />
              </F>
              <F name="country" label="Country" required errors={errors}>
                <input
                  {...p("country")}
                  className={field}
                  maxLength={100}
                  autoComplete="country-name"
                />
              </F>
              {journey === "buyer" ? (
                <>
                  <F name="category" label="Product category" required errors={errors}>
                    <select {...p("category")} className={field} defaultValue="">
                      <option value="" disabled>
                        Select a category
                      </option>
                      {industries.map((i) => (
                        <option key={i}>{i}</option>
                      ))}
                      <option>Other</option>
                    </select>
                  </F>
                  <F name="quantity" label="Estimated quantity & unit" required errors={errors}>
                    <input
                      {...p("quantity")}
                      className={field}
                      maxLength={100}
                      placeholder="e.g. 2 containers, 20 tons"
                    />
                  </F>
                  <F
                    name="product"
                    label="Product description & specifications"
                    required
                    wide
                    errors={errors}
                  >
                    <textarea {...p("product")} rows={4} className={field} maxLength={3000} />
                  </F>
                  <F name="destination" label="Destination country" required errors={errors}>
                    <input {...p("destination")} className={field} maxLength={100} />
                  </F>
                  <F name="timeline" label="Target delivery timeline" errors={errors}>
                    <input {...p("timeline")} className={field} maxLength={100} />
                  </F>
                  <F name="notes" label="Additional requirements" wide errors={errors}>
                    <textarea {...p("notes")} rows={3} className={field} maxLength={3000} />
                  </F>
                  <F
                    name="file"
                    label="Attachment (specs, drawings — PDF, Office or image, max 10 MB)"
                    wide
                    errors={errors}
                  >
                    <input
                      {...p("file")}
                      type="file"
                      accept={FILE_TYPES}
                      className={`${field} file:mr-4 file:border-0 file:bg-navy file:px-3 file:py-1 file:text-navy-foreground`}
                    />
                  </F>
                </>
              ) : (
                <>
                  <F name="categories" label="Product categories" required wide errors={errors}>
                    <input
                      {...p("categories")}
                      className={field}
                      maxLength={300}
                      placeholder="e.g. Packaging Materials, Chemicals"
                    />
                  </F>
                  <F
                    name="capabilities"
                    label="Manufacturing or trading capabilities"
                    required
                    wide
                    errors={errors}
                  >
                    <textarea {...p("capabilities")} rows={4} className={field} maxLength={3000} />
                  </F>
                  <F name="markets" label="Existing export markets" errors={errors}>
                    <input {...p("markets")} className={field} maxLength={300} />
                  </F>
                  <F name="targets" label="Target markets" required errors={errors}>
                    <input {...p("targets")} className={field} maxLength={300} />
                  </F>
                  <F name="site" label="Website" errors={errors}>
                    <input
                      {...p("site")}
                      type="url"
                      className={field}
                      maxLength={255}
                      placeholder="https://"
                    />
                  </F>
                  <F
                    name="file"
                    label="Company profile (PDF, Office or image, max 10 MB)"
                    errors={errors}
                  >
                    <input
                      {...p("file")}
                      type="file"
                      accept={FILE_TYPES}
                      className={`${field} file:mr-4 file:border-0 file:bg-navy file:px-3 file:py-1 file:text-navy-foreground`}
                    />
                  </F>
                </>
              )}
            </div>
            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="consent"
                id="consent"
                required
                className="mt-1 size-4 accent-primary"
                aria-invalid={!!errors["consent"]}
                aria-describedby={errors["consent"] ? "consent-err" : undefined}
              />
              <span>
                I agree that STANDARDS may use these details to respond to my inquiry.{" "}
                <span className="text-primary">*</span>
              </span>
            </label>
            {errors["consent"] && (
              <p id="consent-err" className="-mt-6 text-sm text-destructive">
                {errors["consent"]}
              </p>
            )}
            <button
              type="submit"
              className="bg-primary px-8 py-4 font-semibold text-primary-foreground transition hover:bg-navy"
            >
              Check inquiry details
            </button>
            {notice && (
              <p role="status" className="border-l-2 border-gold bg-card p-4 text-sm text-navy">
                {notice}
              </p>
            )}
          </form>
        </div>
        <aside className="space-y-8 lg:col-span-4">
          <div className="border-t-2 border-primary pt-5">
            <p className="eyebrow">Company</p>
            <p className="mt-3 font-display text-lg font-bold text-navy">
              STANDARDS for International Trade
            </p>
            <p className="mt-1 text-muted-foreground">{companyContact.location}</p>
          </div>
          <div className="border-t border-border pt-5 text-sm text-muted-foreground">
            <p className="font-semibold text-navy">General information</p>
            <a
              href={`mailto:${companyContact.generalEmail}`}
              className="mt-2 block break-words text-primary underline underline-offset-4"
            >
              {companyContact.generalEmail}
            </a>
            <p className="mt-6 font-semibold text-navy">Sales and partnerships</p>
            <a
              href={`mailto:${companyContact.salesEmail}`}
              className="mt-2 block break-words text-primary underline underline-offset-4"
            >
              {companyContact.salesEmail}
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
