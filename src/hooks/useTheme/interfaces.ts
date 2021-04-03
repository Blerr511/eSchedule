export type fontSizeNamings = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

type PartialRecord<K extends keyof any, T> = {
	[P in K]?: T;
};

export interface IThemeTypography {
	color: Record<string, string>;
	fontSize: Record<fontSizeNamings, number>;
}

export interface IThemePallet {
	background: Record<string, string>;
	border: Record<string, string>;
}

export interface ITheme {
	typography: IThemeTypography;
	pallet: IThemePallet;
}

export interface IThemeSetter {
	space: number;
}

export interface IThemeGetter {
	spacing: (space: number) => number;
}

export interface CreateThemeProps {
	typography?: Partial<IThemeTypography> & {fontSize?: PartialRecord<fontSizeNamings, number>};
	pallet?: Partial<IThemePallet>;
	space?: number;
}
