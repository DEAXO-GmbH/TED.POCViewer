export const concatClassnames = (...classnames: any[]) => {
    return classnames.filter(Boolean).join(' ');
};

export const downloadFile = (file: File) => {
    const fileURL = URL.createObjectURL(file);

    const downloadElement = document.createElement('a');
    downloadElement.href = fileURL;
    downloadElement.download = file.name;

    downloadElement.click();
    downloadElement.remove();
};
