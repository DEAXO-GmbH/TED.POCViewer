export const concatClassnames = (...classnames: any[]) => {
    return classnames.filter(Boolean).join(' ');
};
