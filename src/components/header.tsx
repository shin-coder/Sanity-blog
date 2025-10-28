export default function Header() {
  return (
    <>
      <header className="w-full h-20 flex items-center px-8 md:px-20">
        <hgroup className="">
          <h1 className="font-bold leading-none text-2xl tracking-tight">
            Rec.dex
          </h1>
          <span className="block w-3.5 h-0.5 bg-foreground leading-none mt-1"></span>
          <span className="text-[calc(11/16*1rem)] leading-none -mt-1">
            A blog where I write down my daily thoughts
          </span>
        </hgroup>
      </header>
    </>
  );
}
