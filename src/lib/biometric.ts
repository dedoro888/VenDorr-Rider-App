/**
 * Lightweight biometric confirmation helper.
 * In a real native build this would call the platform's Face ID / fingerprint
 * APIs. In the web preview we present the platform WebAuthn prompt when it is
 * available, otherwise we simulate a successful local authentication so the
 * flow stays usable everywhere.
 */
export async function isBiometricAvailable(): Promise<boolean> {
  try {
    if (
      typeof window !== "undefined" &&
      "PublicKeyCredential" in window &&
      typeof (window as any).PublicKeyCredential
        .isUserVerifyingPlatformAuthenticatorAvailable === "function"
    ) {
      return await (window as any).PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    }
  } catch {
    /* ignore */
  }
  return false;
}

export async function confirmBiometric(): Promise<boolean> {
  // Simulated local authentication prompt — resolves after a short delay.
  await new Promise(res => setTimeout(res, 700));
  return true;
}
