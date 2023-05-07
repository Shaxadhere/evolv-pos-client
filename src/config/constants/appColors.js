const getColor = (color, colorMode) => {
    if (!colorMode) colorMode = "light"
    return colors[colorMode][color]
}

//will be removed
const appColors = {
    primary: "#40844e",
    primaryHover: "#40844eb8",

    secondary: "#e9e3ff",
    primaryText: "#333",
    secondaryText: "#575153",

    lightBackgroundFill: "#eaf5f2",
    lightGrayBackgroundFill: "#e1e1e1",

    primaryButtonFill: "#9e4f8f",
    primaryButtonFillHover: "#9e4f8fb0",

    headingText: "#383839",
    layoutHeaderBackground: "#fff",
    layoutBoxBackground: "#fff",

    tableBackground: "#fff",
    tableFilterBoxBackground: "#f0f0f0",
    tableFilterInputBackground: "#f0f0f0",
    tableFilterBackground: "#f0f0f0",
    tableFilterDropdownBackground: "#e1e1e1",
    tableRowHoverBackground: "#ebf5f2",

    paginationNavigationColor: "#9e4f8f",
    paginationNavigationHoverColor: "#9e4f8fb0",
    paginationNumberButton: "#9e4f8f",

    white: "#fbfbfb",
    dark: "#2a2a2a",
    smoke: "#AAAAAA",
    whiteSmoke: "#f5f5f5",
    gray: "#949494",
    lightGray: "#eaeaea",
    danger: "#ae0000",
    success: "green",
    warning: "yellow",

    avatarBg: "#084089"
}

const colorKeys = {
    primary: "primary",
    primaryHover: "primaryHover",
    secondary: "secondary",
    primaryText: "primaryText",
    secondaryText: "secondaryText",
    highlightedText:"highlightedText",
    lightBackgroundFill: "lightBackgroundFill",
    lightGrayBackgroundFill: "lightGrayBackgroundFill",
    activeNavButton:"activeNavButton",
    primaryButtonFill: "primaryButtonFill",
    primaryButtonFillHover: "primaryButtonFillHover",
    headingText: "headingText",
    layoutHeaderBackground: "layoutHeaderBackground",
    layoutBoxBackground: "layoutBoxBackground",
    subNavItemActive:"subNavItemActive",
    subNavItemActiveText:"subNavItemActiveText",
    tableBackground: "tableBackground",
    tableFilterBoxBackground: "tableFilterBoxBackground",
    tableFilterInputBackground: "tableFilterInputBackground",
    tableFilterBackground: "tableFilterBackground",
    tableFilterDropdownBackground: "tableFilterDropdownBackground",
    tableFilterBorder:"tableFilterBorder",
    tableRowHoverBackground: "tableRowHoverBackground",
    paginationNavigationColor: "paginationNavigationColor",
    paginationNavigationBgColor: "paginationNavigationBgColor",
    paginationNavigationHoverColor: "paginationNavigationHoverColor",
    paginationNumberButton: "paginationNumberButton",
    white: "white",
    dark: "dark",
    smoke: "smoke",
    whiteSmoke: "whiteSmoke",
    gray: "gray",
    lightGray: "lightGray",
    danger: "danger",
    success: "success",
    warning: "warning",
    avatarBg: "avatarBg"
}

const colors = {
    dark: {
        primary: "#40844e",
        primaryHover: "#40844eb8",
        secondary: "#e9e3ff",

        primaryText: "#fbfbfb",
        secondaryText: "#c4c4c4",
        highlightedText: "#fbfbfb",

        lightBackgroundFill: "#2e2e2e",
        lightGrayBackgroundFill: "#444c5b",
        activeNavButton:"#363636",

        primaryButtonFill: "#9e4f8f",
        primaryButtonFillHover: "#9e4f8fb0",

        headingText: "#383839",
        layoutHeaderBackground: "#2a2a2a",
        layoutBoxBackground: "#424242",
        subNavItemActive:"#d8e1de",
        subNavItemActiveText:"#393939",

        tableBackground: "#2e2e2e",
        tableFilterBoxBackground: "#f0f0f0",
        tableFilterInputBackground: "#f0f0f0",
        tableFilterBackground: "#f0f0f0",
        tableFilterDropdownBackground: "#e1e1e1",
        tableFilterBorder:"#606060",
        tableRowHoverBackground: "#424242",

        paginationNavigationColor: "#fff",
        paginationNavigationBgColor: "#2e2e2e",
        paginationNavigationHoverColor: "#2e2e2e",
        paginationNumberButton: "#fff",

        white: "#2d3748",
        dark: "#2a2a2a",
        smoke: "#AAAAAA",
        whiteSmoke: "#1d1d1d",
        gray: "#949494",
        lightGray: "#2d3748",
        danger: "#ae0000",
        success: "green",
        warning: "yellow",

        avatarBg: "#084089"
    },
    light: {
        primary: "#40844e",
        primaryHover: "#40844eb8",
        secondary: "#e9e3ff",
        
        primaryText: "#333",
        secondaryText: "#575153",
        highlightedText: "#9e4f8f",

        lightBackgroundFill: "#eaf5f2",
        lightGrayBackgroundFill: "#e1e1e1",
        activeNavButton:"#363636",

        primaryButtonFill: "#9e4f8f",
        primaryButtonFillHover: "#9e4f8fb0",

        headingText: "#383839",
        layoutHeaderBackground: "#40844e",
        layoutBoxBackground: "#fff",
        subNavItemActive:"#d8e1de",
        subNavItemActiveText:"#575153",

        tableBackground: "#fff",
        tableFilterBoxBackground: "#f0f0f0",
        tableFilterInputBackground: "#f0f0f0",
        tableFilterBackground: "#f0f0f0",
        tableFilterDropdownBackground: "#e1e1e1",
        tableFilterBorder:"#e2e8f0",
        tableRowHoverBackground: "#ebf5f2",

        paginationNavigationColor: "#000",
        paginationNavigationBgColor: "#edf2f7",
        paginationNavigationHoverBgColor: "#fbfbfb",
        paginationNumberButton: "#9e4f8f",

        white: "#fbfbfb",
        dark: "#2a2a2a",
        smoke: "#AAAAAA",
        whiteSmoke: "#f5f5f5",
        gray: "#949494",
        lightGray: "#eaeaea",
        danger: "#ae0000",
        success: "green",
        warning: "yellow",

        avatarBg: "#084089"
    }
}
export default appColors
export { getColor, colors, colorKeys }