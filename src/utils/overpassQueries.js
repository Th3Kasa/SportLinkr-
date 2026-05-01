/**
 * Builds Overpass QL queries for each sport.
 *
 * For sports like pickleball and padel which may not be well-tagged,
 * we return { primary, supplementary } where supplementary queries
 * sports_centres and fitness_centres that should be flagged as unverified.
 *
 * For all other sports we return { primary, supplementary: null }.
 */

function aroundClause(radius, lat, lon) {
  return `around:${radius},${lat},${lon}`
}

function buildQuery(parts, radius, lat, lon) {
  const around = aroundClause(radius, lat, lon)
  const body = parts
    .map((part) => part.replace(/AROUND/g, around))
    .join('\n  ')
  return `[out:json][timeout:25];\n(\n  ${body}\n);\nout center tags;`
}

export function buildOverpassQuery(sportId, lat, lon, radiusMeters) {
  const R = radiusMeters
  const a = `around:${R},${lat},${lon}`

  switch (sportId) {
    case 'basketball': {
      const primary = buildQuery(
        [
          `node[sport=basketball](AROUND);`,
          `way[sport=basketball](AROUND);`,
          `relation[sport=basketball](AROUND);`,
          `node[leisure=pitch][sport=basketball](AROUND);`,
          `way[leisure=pitch][sport=basketball](AROUND);`,
          `relation[leisure=pitch][sport=basketball](AROUND);`,
        ],
        R, lat, lon
      )
      return { primary, supplementary: null }
    }

    case 'futsal': {
      const primary = buildQuery(
        [
          `node[sport=futsal](AROUND);`,
          `way[sport=futsal](AROUND);`,
          `relation[sport=futsal](AROUND);`,
          `node[leisure=pitch][sport=futsal](AROUND);`,
          `way[leisure=pitch][sport=futsal](AROUND);`,
          `relation[leisure=pitch][sport=futsal](AROUND);`,
          `node[leisure=pitch][sport=soccer][indoor=yes](AROUND);`,
          `way[leisure=pitch][sport=soccer][indoor=yes](AROUND);`,
          `relation[leisure=pitch][sport=soccer][indoor=yes](AROUND);`,
        ],
        R, lat, lon
      )
      return { primary, supplementary: null }
    }

    case 'netball': {
      const primary = buildQuery(
        [
          `node[sport=netball](AROUND);`,
          `way[sport=netball](AROUND);`,
          `relation[sport=netball](AROUND);`,
          `node[leisure=pitch][sport=netball](AROUND);`,
          `way[leisure=pitch][sport=netball](AROUND);`,
          `relation[leisure=pitch][sport=netball](AROUND);`,
        ],
        R, lat, lon
      )
      return { primary, supplementary: null }
    }

    case 'tennis': {
      const primary = buildQuery(
        [
          `node[sport=tennis](AROUND);`,
          `way[sport=tennis](AROUND);`,
          `relation[sport=tennis](AROUND);`,
          `node[leisure=pitch][sport=tennis](AROUND);`,
          `way[leisure=pitch][sport=tennis](AROUND);`,
          `relation[leisure=pitch][sport=tennis](AROUND);`,
        ],
        R, lat, lon
      )
      return { primary, supplementary: null }
    }

    case 'pickleball': {
      const primary = buildQuery(
        [
          `node[sport=pickleball](AROUND);`,
          `way[sport=pickleball](AROUND);`,
          `relation[sport=pickleball](AROUND);`,
          `node[leisure=pitch][sport=pickleball](AROUND);`,
          `way[leisure=pitch][sport=pickleball](AROUND);`,
          `relation[leisure=pitch][sport=pickleball](AROUND);`,
        ],
        R, lat, lon
      )
      const supplementary = buildQuery(
        [
          `node[leisure=sports_centre](AROUND);`,
          `way[leisure=sports_centre](AROUND);`,
          `relation[leisure=sports_centre](AROUND);`,
          `node[leisure=fitness_centre](AROUND);`,
          `way[leisure=fitness_centre](AROUND);`,
          `relation[leisure=fitness_centre](AROUND);`,
        ],
        R, lat, lon
      )
      return { primary, supplementary }
    }

    case 'padel': {
      const primary = buildQuery(
        [
          `node[sport=padel](AROUND);`,
          `way[sport=padel](AROUND);`,
          `relation[sport=padel](AROUND);`,
          `node[leisure=pitch][sport=padel](AROUND);`,
          `way[leisure=pitch][sport=padel](AROUND);`,
          `relation[leisure=pitch][sport=padel](AROUND);`,
        ],
        R, lat, lon
      )
      const supplementary = buildQuery(
        [
          `node[leisure=sports_centre](AROUND);`,
          `way[leisure=sports_centre](AROUND);`,
          `relation[leisure=sports_centre](AROUND);`,
          `node[leisure=fitness_centre](AROUND);`,
          `way[leisure=fitness_centre](AROUND);`,
          `relation[leisure=fitness_centre](AROUND);`,
        ],
        R, lat, lon
      )
      return { primary, supplementary }
    }

    case 'cricket': {
      const primary = buildQuery(
        [
          `node[sport=cricket][indoor=yes](AROUND);`,
          `way[sport=cricket][indoor=yes](AROUND);`,
          `relation[sport=cricket][indoor=yes](AROUND);`,
          `node[leisure=pitch][sport=cricket][indoor=yes](AROUND);`,
          `way[leisure=pitch][sport=cricket][indoor=yes](AROUND);`,
          `relation[leisure=pitch][sport=cricket][indoor=yes](AROUND);`,
        ],
        R, lat, lon
      )
      return { primary, supplementary: null }
    }

    case 'badminton': {
      const primary = buildQuery(
        [
          `node[sport=badminton](AROUND);`,
          `way[sport=badminton](AROUND);`,
          `relation[sport=badminton](AROUND);`,
          `node[leisure=pitch][sport=badminton](AROUND);`,
          `way[leisure=pitch][sport=badminton](AROUND);`,
          `relation[leisure=pitch][sport=badminton](AROUND);`,
        ],
        R, lat, lon
      )
      return { primary, supplementary: null }
    }

    case 'volleyball': {
      const primary = buildQuery(
        [
          `node[sport=volleyball](AROUND);`,
          `way[sport=volleyball](AROUND);`,
          `relation[sport=volleyball](AROUND);`,
          `node[leisure=pitch][sport=volleyball](AROUND);`,
          `way[leisure=pitch][sport=volleyball](AROUND);`,
          `relation[leisure=pitch][sport=volleyball](AROUND);`,
        ],
        R, lat, lon
      )
      return { primary, supplementary: null }
    }

    case 'squash': {
      const primary = buildQuery(
        [
          `node[sport=squash](AROUND);`,
          `way[sport=squash](AROUND);`,
          `relation[sport=squash](AROUND);`,
          `node[leisure=sports_centre][sport=squash](AROUND);`,
          `way[leisure=sports_centre][sport=squash](AROUND);`,
          `relation[leisure=sports_centre][sport=squash](AROUND);`,
        ],
        R, lat, lon
      )
      return { primary, supplementary: null }
    }

    default: {
      const primary = buildQuery(
        [
          `node[sport=${sportId}](AROUND);`,
          `way[sport=${sportId}](AROUND);`,
          `relation[sport=${sportId}](AROUND);`,
        ],
        R, lat, lon
      )
      return { primary, supplementary: null }
    }
  }
}
