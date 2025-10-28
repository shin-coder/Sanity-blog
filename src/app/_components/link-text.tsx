interface TextProps {
  text: string;
}

export default function LinkText({ text }: TextProps) {
  return (
    <>
      <div className="flex flex-col relative overflow-hidden">
        <p className="text-xs flex gap-1 leading-none group-hover:-translate-y-full transition-transform duration-300 md:pr-4">
          (<span>{text}</span>)
        </p>
        <p className="text-xs flex gap-1 leading-none absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300 md:pr-4">
          (<span>{text}</span>)
        </p>
      </div>
    </>
  );
}
