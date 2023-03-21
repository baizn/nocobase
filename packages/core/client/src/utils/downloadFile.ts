export const downloadRemoteFile = (url: string, filename: string) => {
  fetch(url).then((res) => {
    res.blob().then((blob) => {
      // blob用来创建URL的File对象
      const a = document.createElement('a');
      // createObjectURL将一个媒体元素的src属性关联到一个 MediaSource 对象
      const downloadUrl = window.URL.createObjectURL(blob);
      a.href = downloadUrl;
      a.download = decodeURIComponent(filename);
      a.click();
      // revokeObjectURL使这个潜在的对象保留在原来的地方，允许平台在合适的时机进行垃圾收集。
      window.URL.revokeObjectURL(url);
      return { success: true } as { success: boolean; message: string };
    });
  });
};
