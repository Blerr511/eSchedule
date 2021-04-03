export type fontSizeNamings = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>;
};

export type IThemeColorScheme = Record<'primary' | 'secondary' | 'tertiary', string>;

export interface IThemeTypography {
	color: IThemeColorScheme;
	fontSize: Record<fontSizeNamings, number>;
}

export interface IThemePallet {
	background: IThemeColorScheme;
	border: IThemeColorScheme;
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

export type CreateThemeProps = DeepPartial<ITheme & IThemeSetter>;
