package com.project.youtube.utils;

import lombok.NoArgsConstructor;

import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
@NoArgsConstructor
public class RSAKeyConverter {
    private String ALGORITHM = "RSA";
    /**
     * Converts public key string to RSAPublicKey interface
     * @param publicKey public key string
     * @return RSAPublicKey
     * @throws Exception
     */
    public RSAPublicKey getRSAPublicKey(String publicKey) throws Exception {
        // Remove the first and last lines and any line breaks
        publicKey = publicKey
                .replaceAll("\\n", "")
                .replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "");
        try {
            byte[] keyBytes = Base64.getDecoder().decode(publicKey);
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance(ALGORITHM);
            return (RSAPublicKey) keyFactory.generatePublic(keySpec);

        } catch (InvalidKeySpecException e) {
            throw new InvalidKeySpecException("The provided keySpec is invalid");
        } catch (NoSuchAlgorithmException e) {
            throw new NoSuchAlgorithmException("The provided algorithm is {} invalid"+ ALGORITHM);
        }
    }

    /**
     * Converts private key string to RSAPrivateKey interface
     * @param privateKey
     * @return RSAPrivateKey
     * @throws Exception
     */
    public RSAPrivateKey getRSAPrivateKey(String privateKey) throws Exception {
        // Remove the first and last lines and any line breaks
        privateKey = privateKey
                .replaceAll("\\n", "")
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "");
        try {
            byte[] keyBytes = Base64.getDecoder().decode(privateKey);
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance(ALGORITHM);
            return (RSAPrivateKey) keyFactory.generatePrivate(keySpec);

        } catch (InvalidKeySpecException e) {
            throw new InvalidKeySpecException("The provided keySpec is invalid");
        } catch (NoSuchAlgorithmException e) {
            throw new NoSuchAlgorithmException("The provided algorithm is {} invalid"+ ALGORITHM);
        }
    }

    /**
     *         String publicKeyPEM = "your_public_key_pem_string_here";
     *         String privateKeyPEM = "your_private_key_pem_string_here";
     *
     *         // Parse public key
     *         PEMParser publicParser = new PEMParser(new StringReader(publicKeyPEM));
     *         PEMKeyPair publicKeyPair = (PEMKeyPair) publicParser.readObject();
     *         RSAPublicKey publicKey = (RSAPublicKey) new JcaPEMKeyConverter().getPublicKey(publicKeyPair.getPublicKeyInfo());
     *
     *         // Parse private key
     *         PEMParser privateParser = new PEMParser(new StringReader(privateKeyPEM));
     *         PEMKeyPair privateKeyPair = (PEMKeyPair) privateParser.readObject();
     *         RSAPrivateKey privateKey = (RSAPrivateKey) new JcaPEMKeyConverter().getPrivateKey(privateKeyPair.getPrivateKeyInfo());
     */
}
