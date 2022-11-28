const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'pink'
];

export function pickRandomColor(variant = '') {
    const color = colors[Math.floor(Math.random()*colors.length)];
    return color + variant;
}

export function swap<T>(arr: T[], i:number, j:number): T[] {
    const copy = [...arr];
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
    return copy;
}