interface Faq {
  q: string;
  a: string;
}

interface Props {
  faqs: Faq[];
}

export default function FaqSection({ faqs }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <section className="reveal cv-auto mx-auto max-w-6xl px-4 py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Câu hỏi thường gặp
      </h2>

      <div className="mt-8 flex flex-col gap-3">
        {faqs.map(({ q, a }) => (
          <details
            key={q}
            className="group rounded-2xl border-2 border-ink bg-white shadow-hard-sm"
          >
            <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 px-5 py-4 font-display text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
              <span>{q}</span>
              <span
                aria-hidden
                className="shrink-0 font-display text-xl font-extrabold text-coral transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="border-t-2 border-dashed border-ink/20 px-5 py-4 text-sm leading-relaxed text-ink/80">
              {a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
