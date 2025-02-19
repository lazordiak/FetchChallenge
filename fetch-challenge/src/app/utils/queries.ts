export const formatAgesForFetch = (
  ages: string[]
): { min: number; max: number } => {
  const ageRanges: Record<string, { min: number; max: number }> = {
    Puppy: { min: 0, max: 2 },
    Young: { min: 3, max: 6 },
    Adult: { min: 7, max: 10 },
    Senior: { min: 11, max: 99 },
  };

  if (ages.length === 0) {
    return { min: 0, max: 99 };
  }

  const selectedMins = ages.map((age) => ageRanges[age]?.min ?? 0);
  const selectedMaxs = ages.map((age) => ageRanges[age]?.max ?? 99);

  return {
    min: Math.min(...selectedMins),
    max: Math.max(...selectedMaxs),
  };
};

export const BASE_URL = "https://frontend-take-home-service.fetch.com";
