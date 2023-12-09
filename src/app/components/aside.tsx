export function Aside() {
  return (
    <aside className="sticky top-20 h-full w-1/5 lg:flex hidden flex-col gap-2">
      <div className="w-3/4 bg-stone-900 rounded-md min-w-[250px] p-4 flex flex-col gap-2">
        <p className="text-sm">Projeto em beta</p>
        <p className="text-xs text-stone-300 whitespace-pre-wrap">
          Fiz esse site para mostrar minhas habilidades em programação, qualquer
          dica pode me chamar no linkedin.
        </p>
        <a
          href="https://www.linkedin.com/in/wendeson-gomes-70a9ab18b/"
          target="_blank"
          className="bg-stone-950 p-2 mt-2 rounded-md text-center"
        >
          message
        </a>
      </div>
    </aside>
  )
}
