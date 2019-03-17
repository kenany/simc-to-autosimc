/**
 * Equipment slots.
 */
interface Equipment {
  readonly back: Set<string>;
  readonly chest: Set<string>;
  readonly feet: Set<string>;
  readonly finger1: Set<string>;
  readonly finger2: Set<string>;
  readonly hands: Set<string>;
  readonly head: Set<string>;
  readonly legs: Set<string>;
  readonly main_hand: Set<string>;
  readonly neck: Set<string>;
  readonly off_hand: Set<string>;
  readonly shoulder: Set<string>;
  readonly trinket1: Set<string>;
  readonly trinket2: Set<string>;
  readonly waist: Set<string>;
  readonly wrist: Set<string>;
}

/**
 * Convert simc input to autosimc input.
 *
 * @param simc simc input.
 * @returns autosimc input.
 */
function convert(simc: string): string {
  const result: string[] = [];
  const equipment: Equipment = {
    back: new Set<string>(),
    chest: new Set<string>(),
    feet: new Set<string>(),
    finger1: new Set<string>(),
    finger2: new Set<string>(),
    hands: new Set<string>(),
    head: new Set<string>(),
    legs: new Set<string>(),
    main_hand: new Set<string>(),
    neck: new Set<string>(),
    off_hand: new Set<string>(),
    shoulder: new Set<string>(),
    trinket1: new Set<string>(),
    trinket2: new Set<string>(),
    waist: new Set<string>(),
    wrist: new Set<string>()
  };

  simc.split('\n').forEach((line) => {
    // Skip blank lines.
    if (line.trim().length === 0) {
      return;
    }

    // Skip comments.
    if (line.charAt(0) === '#') {
      return;
    }

    const eqIdx = line.indexOf('=');
    const left = line.substring(0, eqIdx) as keyof Equipment;

    // Append non-gear lines unchanged.
    if (typeof equipment[left] === 'undefined') {
      result.push(line);
      return;
    }

    const right = line.substring(eqIdx + 1);
    equipment[left].add(right);
  });

  (Object.keys(equipment) as (keyof Equipment)[]).forEach((slot) => {
    // Do not add empty gear slots.
    if (equipment[slot].size === 0) {
      return;
    }

    result.push(`${slot}=${[...equipment[slot]].join('|')}`);
  });

  return result.join('\n');
}

export default convert;
