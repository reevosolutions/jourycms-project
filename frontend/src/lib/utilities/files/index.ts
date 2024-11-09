export async function fetchRemoteFileAsBlob(url: string): Promise<Blob> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch remote file: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Error fetching remote file:", error);
    throw error;
  }
}

export async function createFileObjectFromRemote(
  url: string,
  filename: string,
): Promise<File> {
  try {
    const blob = await fetchRemoteFileAsBlob(url);
    return new File([blob], filename);
  } catch (error) {
    console.error("Error creating File object:", error);
    throw error;
  }
}
