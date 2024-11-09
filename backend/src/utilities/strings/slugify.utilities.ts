export function slugify(title: string): string {
  // Normalize the text to remove diacritics and accents for Latin characters
  const normalizedTitle = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritical marks
  
  // Convert title to lowercase
  const lowercasedTitle = normalizedTitle.toLowerCase();
  
  // Replace spaces, underscores, or multiple dashes with a single dash
  let slug = lowercasedTitle
    .replace(/[^a-zA-Z0-9\u0600-\u06FF]+/g, "-")  // Keep Arabic and Latin chars
    .replace(/--+/g, "-")                          // Replace multiple dashes with a single dash
    .replace(/^-+|-+$/g, "");                      // Remove leading or trailing dashes
  
  return slug;
}