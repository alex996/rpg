class Images {
  public cache: { [path: string]: HTMLImageElement } = {}

  public constructor (paths: [string]) {
    paths.forEach((path): void => {
      this.cache[path] = Images.download(path)
    })
  }

  public download (): Promise<void[]> {
    const promises = Object.values(this.cache).map(Images.promisify)
    return Promise.all(promises)
  }

  private static download (path: string): HTMLImageElement {
    const image = new Image()
    image.src = path
    return image
  }

  private static promisify (image: HTMLImageElement): Promise<void> {
    return new Promise((resolve, reject): void => {
      image.onload = (): void => resolve()
      image.onerror = (err): void => reject(err)
    })
  }
}

export default Images
