export async function AboutHero() {
  return (
    <div
      className='
      relative flex h-[calc(100svh-var(--header-h))] overflow-clip
      bg-linear-to-b from-transparent to-background
    '
    >
      <div
        className='
          -z-10 absolute inset-0
          object-cover bg-center bg-fixed
        '
        style={{ backgroundImage: 'url(hero-water.jpg)' }}
      ></div>
      <div className='container mx-auto flex flex-col justify-center items-center gap-12'>
        <h2>Bathybiologica</h2>
        <p>
          Preserving the legacy of marine science while nurturing the next generation of ocean explorers in Norwegian
          waters
        </p>
      </div>
    </div>
  );
}
