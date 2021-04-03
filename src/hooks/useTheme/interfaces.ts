export interface IThemeTypography {
	color: Record<string, string>;
	fontSize: Record<string, number>;
}

export interface IThemePallet {
	background: Record<string, string>;
}

export interface ITheme {
	typography: IThemeTypography;
	pallet: IThemePallet;
}

export interface CreateThemeProps {
	typography?: Partial<IThemeTypography>;
	pallet?: Partial<IThemePallet>;
}
