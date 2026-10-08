export const MAX_ATTACHMENT_COUNT = 5;
export const MAX_ATTACHMENT_BYTES = 4_000_000;
export const ATTACHMENT_ACCEPT = ".pdf,.jpg,.jpeg,.png";
export const MAX_CONTACT_REQUEST_BYTES = MAX_ATTACHMENT_BYTES + 100_000;

const attachmentTypes: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

export function attachmentContentType(name: string): string | undefined {
  const extension = name.split(".").pop()?.toLowerCase() ?? "";
  return Object.hasOwn(attachmentTypes, extension) ? attachmentTypes[extension] : undefined;
}

export function validateAttachments(
  files: readonly { name: string; size: number; type: string }[],
): string | null {
  if (files.length > MAX_ATTACHMENT_COUNT) {
    return "Voit lisätä enintään 5 liitettä.";
  }
  if (files.reduce((total, file) => total + file.size, 0) > MAX_ATTACHMENT_BYTES) {
    return "Liitteiden yhteiskoko saa olla enintään 4 Mt.";
  }
  for (const file of files) {
    const expectedType = attachmentContentType(file.name);
    if (
      !expectedType ||
      (file.type && file.type !== expectedType) ||
      /[\\/\x00-\x1f\x7f]/.test(file.name) ||
      file.name.length > 200
    ) {
      return "Sallitut liitteet ovat PDF-tiedostot ja JPG/PNG-kuvat.";
    }
    if (file.size === 0) {
      return "Tyhjää tiedostoa ei voi lähettää liitteenä.";
    }
  }
  return null;
}

export function matchesAttachmentSignature(
  bytes: Uint8Array,
  contentType: string,
): boolean {
  const signature =
    contentType === "application/pdf"
      ? [0x25, 0x50, 0x44, 0x46, 0x2d]
      : contentType === "image/jpeg"
        ? [0xff, 0xd8, 0xff]
        : contentType === "image/png"
          ? [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
          : null;
  return signature !== null && signature.every((byte, index) => bytes[index] === byte);
}
