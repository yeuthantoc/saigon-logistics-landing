interface Props {
  country: string;
  tips: string[];
}

export default function Tips({ country, tips }: Props) {
  return (
    <section className="reveal cv-auto mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="rounded-2xl border-2 border-ink bg-peach p-6 shadow-hard md:p-8">
        <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
          Lưu ý khi gửi hàng đi {country}
        </h2>
        <ul className="mt-5 flex flex-col gap-3">
          {tips.map((tip) => (
            <li key={tip} className="flex items-start gap-3 text-sm leading-relaxed text-ink/90">
              <span className="emoji mt-0.5 shrink-0 text-base" aria-hidden>
                ⚠️
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
