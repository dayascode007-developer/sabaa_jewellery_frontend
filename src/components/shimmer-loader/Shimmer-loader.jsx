"use client";

export function ShimmerLoader({
  width = "w-full",
  height = "h-4 md:h-5",
  count = 1,
  className = "",
  gap = "space-y-2 md:space-y-3"
}) {
  const rows = Array.from({ length: count });

  return (
    <div className={`${gap} ${className}`}>
      {rows.map((_, i) => (
        <div
          key={i}
          className={`${width} ${height} bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse`}
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
          }}
        />
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export function YouTubeShimmer({ count = 4 }) {
  const cards = Array.from({ length: count });

  return (
    <>
      {cards.map((_, i) => (
        <div
          key={i}
          className="aspect-square w-full rounded-lg overflow-hidden bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
          }}
        />
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}

export function BlogCardShimmer({ count = 6 }) {
  const cards = Array.from({ length: count });

  return (
    <>
      {cards.map((_, i) => (
        <article
          key={i}
          className="relative overflow-hidden rounded-lg border border-[#EFDCD4] bg-white"
        >
          <div className="relative w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-t-lg"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />
          <div className="flex flex-col p-4 space-y-3">
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-5/6"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>
          </div>
        </article>
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}

export function BlogDetailShimmer() {
  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      {/* Header */}
      <header className="bg-[#FDF0F2] py-10">
        <div className="mx-auto w-full max-w-[820px] px-4 text-center sm:px-6">
          <div className="mt-4 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <div className="h-3 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="mx-auto w-full max-w-[900px] px-4 sm:px-6">
        <div className="relative -mt-2 w-full h-96 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
          }}
        />
      </div>

      {/* Body */}
      <div className="mx-auto w-full max-w-[760px] px-4 pt-8 pb-12 sm:px-6">
        {/* Excerpt */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-5/6"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />
        </div>

        {/* Divider */}
        <div className="mt-2 flex items-center gap-2">
          <span className="h-px w-14 bg-[#E0CDBA]" />
          <span className="h-px w-2 bg-[#E0CDBA]" />
          <span className="h-px flex-1 bg-[#E0CDBA]" />
        </div>

        {/* Content Sections */}
        <div className="space-y-12 mt-12">
          {[1, 2, 3].map((section) => (
            <div key={section} className="space-y-4">
              {/* Section Heading */}
              <div className="h-6 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />

              {/* Section Content - Text */}
              {section !== 3 && (
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
                    style={{
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s infinite",
                    }}
                  />
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
                    style={{
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s infinite",
                    }}
                  />
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4"
                    style={{
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s infinite",
                    }}
                  />
                </div>
              )}

              {/* Section Content - Image */}
              <div className="w-full h-64 sm:h-80 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export function BannerShimmer() {
  return (
    <section className="relative w-full overflow-hidden pb-5 sm:py-6">
      <div className="flex transition-transform duration-700 ease-out [--edge:0%] [--slide-w:100%] sm:[--edge:8%] sm:[--slide-w:84%]">
        <div className="w-full shrink-0 sm:w-[84%] sm:px-2">
          <div className="relative block aspect-square overflow-hidden bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 sm:aspect-[8/3] sm:rounded-lg"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />
        </div>
      </div>

      {/* Indicator dots */}
      <div className="mt-4 flex items-center justify-center gap-1 sm:mt-5">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            className="flex h-6 w-6 items-center justify-center"
          >
            <span
              className="block rotate-45 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
              style={{
                width: 6,
                height: 6,
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}

export function NavbarShimmer() {
  return (
    <div className="hidden lg:block relative w-full border-b border-neutral-200 bg-white">
      <ul className="mx-auto flex max-w-[1400px] items-center gap-5 overflow-x-auto px-4 py-2 sm:gap-8 sm:px-6 lg:justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="shrink-0">
            <div className="flex items-center gap-2">
              <div
                className="h-[35px] w-[35px] rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
              <div
                className="h-5 w-20 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export function ProductCardShimmer({ count = 8 }) {
  const cards = Array.from({ length: count });

  return (
    <>
      {cards.map((_, i) => (
        <article
          key={i}
          className="flex flex-col overflow-hidden rounded-xl border border-neutral-200/80 bg-white"
        >
          {/* Image area */}
          <div
            className="relative w-full pb-[100%] overflow-hidden bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-t-xl"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />

          {/* Content area */}
          <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4 space-y-2">
            {/* Category label shimmer */}
            <div
              className="h-3 w-16 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />

            {/* Title shimmer (2 lines) */}
            <div className="space-y-1.5">
              <div
                className="h-4 w-full rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
              <div
                className="h-4 w-3/4 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>

            {/* Price shimmer */}
            <div
              className="h-5 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 mt-2"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />

            {/* Button shimmer */}
            <div
              className="h-10 w-full rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 mt-auto"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />
          </div>
        </article>
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}

export function MobileDrawerShimmer() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto py-2">
      <ul>
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="border-b border-neutral-100">
            <div className="flex w-full items-center justify-between gap-3 px-4 py-3">
              <div
                className="h-4 w-32 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
              <div
                className="h-4 w-4 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export function ProductDetailShimmer() {
  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <main className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6">
        {/* Product section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery/Image */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div
              className="w-full aspect-square rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />

            {/* Thumbnail gallery */}
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                  style={{
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s infinite",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            {/* Product Code */}
            <div
              className="h-3 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />

            {/* Title */}
            <div className="space-y-2">
              <div
                className="h-8 w-full rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
              <div
                className="h-8 w-3/4 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>

            {/* Rating */}
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-5 w-5 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                  style={{
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s infinite",
                  }}
                />
              ))}
            </div>

            {/* Price */}
            <div className="flex gap-3 items-baseline">
              <div
                className="h-7 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
              <div
                className="h-5 w-20 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>

            {/* Color selector */}
            <div className="space-y-2">
              <div
                className="h-4 w-16 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                    style={{
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s infinite",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="space-y-2">
              <div
                className="h-4 w-12 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                    style={{
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s infinite",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <div
                className="h-4 w-20 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
              <div
                className="h-10 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>

            {/* Add to cart button */}
            <div
              className="h-12 w-full rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />
          </div>
        </div>

        {/* Description section */}
        <div className="mt-12 space-y-8">
          {/* Section title */}
          <div
            className="h-6 w-40 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />

          {/* Description text */}
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 ${
                  i === 3 ? "w-3/4" : "w-full"
                }`}
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export default ShimmerLoader;
