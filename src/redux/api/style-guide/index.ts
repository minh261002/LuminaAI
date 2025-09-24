export interface ColorSwatch {
  name: string;
  hexColor: string;
  description?: string;
}

export interface ColorSection {
  title:
    | "Primary Colors"
    | "Secondary & Accent Colors"
    | "UI Components Colors"
    | "Utility & Form Colors"
    | "Status & Feedback Colors";
  swatches: ColorSwatch[];
}

export interface TypographyStyle {
  name: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing?: number;
  description?: string;
}

export interface TypographySection {
  title: string;
  styles: TypographyStyle[];
}

export interface StyleGuide {
  theme: string;
  description: string;
  colorSection: [ColorSection];
  typographySection: [TypographySection];
}
