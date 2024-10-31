import * as jose from "jose";

const secret = jose.base64url.decode(
  "zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI",
);

const jwt =
  "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..MB66qstZBPxAXKdsjet_lA.WHbtJTl4taHp7otOHLq3hBvv0yNPsPEKHYInmCPdDDeyV1kU-f-tGEiU4FxlSqkqAT2hVs8_wMNiQFAzPU1PUgIqWCPsBrPP3TtxYsrtwagpn4SvCsUsx0Mhw9ZhliAO8CLmCBQkqr_T9AcYsz5uZw.7nX9m7BGUu_u1p1qFHzyIg";

const { payload, protectedHeader } = await jose.jwtDecrypt(jwt, secret, {
  issuer: "urn:example:issuer",
  audience: "urn:example:audience",
});

console.log(protectedHeader);
console.log(payload);
