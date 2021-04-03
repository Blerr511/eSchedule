export interface IThemeTypography {
	color: Record<string, string>;
	fontSize: Record<string, number>;
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
	typography?: Partial<IThemeTypography>;
	pallet?: Partial<IThemePallet>;
	space?: number;
}
