export function calculateLuminance(R8bit, G8bit, B8bit) {
    // Convert R, G, B values to RsRGB, GsRGB, BsRGB
    const RsRGB = R8bit / 255;
    const GsRGB = G8bit / 255;
    const BsRGB = B8bit / 255;

    // Convert RsRGB, GsRGB, BsRGB to R, G, B using the given conditions
    const R =
        RsRGB <= 0.03928
            ? RsRGB / 12.92
            : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    const G =
        GsRGB <= 0.03928
            ? GsRGB / 12.92
            : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    const B =
        BsRGB <= 0.03928
            ? BsRGB / 12.92
            : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

    // Calculate luminance using the provided formula
    const L = 0.2126 * R + 0.7152 * G + 0.0722 * B;

    return L;
}

export function hexToRgb(hex) {
    // Remove the '#' character if present
    hex = hex.replace(/^#/, "");

    // Parse the hex string into three parts: R, G, and B
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Return an object with the RGB values
    return { r, g, b };
}

export function hslToRgb(h, s, l) {
    // Convert hue to a value in the range [0, 360)
    h = ((h % 360) + 360) % 360;
    // Convert saturation and lightness to values in the range [0, 1]
    s = Math.max(0, Math.min(1, s));
    l = Math.max(0, Math.min(1, l));

    // Helper function to convert hue to RGB
    function hueToRgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    let r, g, b;

    if (s === 0) {
        // If saturation is 0, the color is a shade of gray
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h / 360 + 1 / 3);
        g = hueToRgb(p, q, h / 360);
        b = hueToRgb(p, q, h / 360 - 1 / 3);
    }

    // Convert RGB values to integers in the range [0, 255] and return
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}
