export const ResponsiveIndicator = () => {
  if (process.env.NODE_ENV === "development") {
    return (
      <div className="fixed right-0 bottom-0 z-50 bg-red-500 p-2 text-xs text-white">
        <div className="text-muted-foreground text-xs">
          <span className="inline font-bold sm:hidden">Mobile</span>
          <span className="hidden font-bold sm:inline md:hidden">SM</span>
          <span className="hidden font-bold md:inline lg:hidden">MD</span>
          <span className="hidden font-bold lg:inline xl:hidden">LG</span>
          <span className="hidden font-bold xl:inline 2xl:hidden">XL</span>
          <span className="hidden font-bold 2xl:inline">2XL</span>
        </div>
      </div>
    )
  }
}
