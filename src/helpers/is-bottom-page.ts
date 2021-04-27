/**
 * Check if current scroll is at bottom of the page.
 *
 * @param buffer Amount of pixels to add to checking bottom page as buffer
 */
export default function isBottomPage(buffer: number): boolean {
  return window.innerHeight + window.pageYOffset + buffer >= document.body.scrollHeight;
}
