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

export default ShimmerLoader;
