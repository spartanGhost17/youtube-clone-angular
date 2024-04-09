package com.project.youtube.provider;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.InvalidClaimException;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.project.youtube.Exception.APIException;
import com.project.youtube.dtomapper.UserDTOMapper;
import com.project.youtube.model.Role;
import com.project.youtube.model.UserPrincipal;
import com.project.youtube.service.UserService;
import com.project.youtube.utils.RSAKeyConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.*;
import java.util.stream.Collectors;

import static com.project.youtube.constants.ApplicationConstants.*;


@Component
@RequiredArgsConstructor
@Slf4j
public class TokenProvider {

    //@Value("${jwt.private_key}")//comes application File
    private String JWT_PRIVATE_KEY; //= System.getenv("JWT_PRIVATE_KEY");
    //@Value("${jwt.public_key}")
    private String JWT_PUBLIC_KEY; //= System.getenv("JWT_PUBLIC_KEY");
    //rsa pub/private key for 2048 encoding using open ssl
    private String SSL_RSA_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4hZvibM2IJC+T9lP42Wf\n" +
            "ALVj52vg/Sa21fZS2lKSFfJ/70IkSYuQ1MiSUWZ0QbqnA+19JhM3CMnVEglehjw9\n" +
            "cdIwCOV4NJds46kQIybeH3bvk/cwR6+cZ4b1fsISJ6XnD6PZLzhfXmR6/9JaOC6r\n" +
            "t8hhuWjUKCiuOwyV9fEGle10tgnqoadE3GdAjMZEWuScfo6ZV7Q4r1V3FIYJ+5hD\n" +
            "H+ZTwCljO1jZaZ5CU2k7pqbD4RpPmivTc82JV7K27F8coWE9n57+l79pMTLW6UM4\n" +
            "B6NFR+Dpxt/PoH83UEX6jGk+cvC3oWdHRYDg+ZD2ECfjC7SFIAhJeK8LNKI53G8O\n" +
            "JQIDAQAB";
    private String SSL_RSA_PRIVATE_KEY = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDiFm+JszYgkL5P\n" +
            "2U/jZZ8AtWPna+D9JrbV9lLaUpIV8n/vQiRJi5DUyJJRZnRBuqcD7X0mEzcIydUS\n" +
            "CV6GPD1x0jAI5Xg0l2zjqRAjJt4fdu+T9zBHr5xnhvV+whInpecPo9kvOF9eZHr/\n" +
            "0lo4Lqu3yGG5aNQoKK47DJX18QaV7XS2Ceqhp0TcZ0CMxkRa5Jx+jplXtDivVXcU\n" +
            "hgn7mEMf5lPAKWM7WNlpnkJTaTumpsPhGk+aK9NzzYlXsrbsXxyhYT2fnv6Xv2kx\n" +
            "MtbpQzgHo0VH4OnG38+gfzdQRfqMaT5y8LehZ0dFgOD5kPYQJ+MLtIUgCEl4rws0\n" +
            "ojncbw4lAgMBAAECggEAAWLgKd4lRFDZjIrJZccJ5mALre+9kD/MWjEpno4SuDtl\n" +
            "k8Ak5yXfFvboiBg9OT6dkeAYZtiHpgWlc/gGZ4NMtdBzRp1a6H5PMXF9baxqKz44\n" +
            "R4DPVSPbV8/Thy9Fxjl1r7pc9WBT8V5jWgMzq2mEgwV3ApiFHdPrXDr+W7ovxKaO\n" +
            "SipADUjZglbDGhm13ewKHDyks+w5cW/bxKCzyir61/c6X/Qx43UrJKZYYGRXa0Xi\n" +
            "ixXyOlFbLqGLjlvYBYjKTKQZhaEgWviCRedz9gV1/QQIz8q5b0E9VqkELXGa4UTn\n" +
            "RGxp2ciBKZaWMF23fGpMjH/YMe+NXxWnsjvCEZXcFwKBgQD4Zg9+/scziwBVox+w\n" +
            "jB0wD9GixSP2+UYsAeofn7mTQc+rZo8/hdYj0vvcUuKyyO15RFPwYc3UpO9lZUdb\n" +
            "Zc4pyhtEJsueFBGPaxmOGg6c+RIREBPN38/w2gzlfvSu64iDH/dHyeAEV5/WS/rJ\n" +
            "X9WSwm/qX/xvCX8yi9PG7A18zwKBgQDpAZeI63V8+HZ1I/T1g+AklcHHmUyZa1RJ\n" +
            "K5SJExItTQA/wMPBm5D6uJ6PJ6xZVKoDLAS2VPt12BEYAoQsdZdRtBX7xKZdzEla\n" +
            "8bNwAZWl5vKTJbpG6zK+dD/hnF25f6zkhqzQBZi1ppRqYFkAwJkNakByHfbYpfV7\n" +
            "FGVZxJMKywKBgDiQpT66LgqiwLS/rNu7THpBX++9DO+U3FHxLat95/iMqAnUFRLW\n" +
            "G2mVBh2qEk28S7etw5+d5g1icdGZOqKpkEUb7RGb9ApPb6BFN1CQxnsgjOitzJS5\n" +
            "PtUOEpnAS1/56uBRSzJh2k2i1pcqPjXVSQFenbW1nfp7IygTh2ppHrkpAoGAD2mS\n" +
            "i3T/tX993mu9dUv+1IyvX7ONNIy764cdcR+40RRJ0u2+RR00LtFtc4ytQs9t233a\n" +
            "5fCjHX1oTA1GjuZMVxQxbBDq7ENqCsD4HI2OR4YKP598Pdqq5Zws6ZB9RpriZc9e\n" +
            "uPfVzRYytQKggIM83H1Nu/6taFE59qU3uwNcspcCgYBHJSWPrLuIRA6VKbuLFl9Q\n" +
            "AYJurgJ7TWh12OM9HBqLApf7/v61Ig5L+8xjK5lzmcZDealnTpdlgGbphPmAwghm\n" +
            "7dWuc9GTW7ZIUxHK5cdREflKPIIgZP+MkLzxHLqyttLCxx5dLrK2+R18kWLdrCry\n" +
            "kyRavEWKhHMDjUbNRTDDNA==";


    private final RSAKeyConverter rsaKeyConverter = new RSAKeyConverter();
    private RSAPublicKey RSA_PUBLIC_KEY;
    private RSAPrivateKey RSA_PRIVATE_KEY;
    private final String ALGORITHM_TYPE = "RSA";
    private final UserService userServiceImpl;
    /**
     * assign public and private keys
     */
    private void generateRSAKeys() {
        try {
            this.RSA_PUBLIC_KEY = rsaKeyConverter.getRSAPublicKey(SSL_RSA_PUBLIC_KEY);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        try {
            this.RSA_PRIVATE_KEY = rsaKeyConverter.getRSAPrivateKey(SSL_RSA_PRIVATE_KEY);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



    /**
     * create a JWT access token using and sign using 2048 RSA public and private keys
     * @param userPrincipal userPrincipal
     * @return String JWT access token
     */
    public String createAccessToken(UserPrincipal userPrincipal) {
        //generateRSAKeys();
        Algorithm algorithm = getAlgorithm();
        try {
            return JWT.create().withIssuer(TOKEN_ISSUER)
                    .withAudience(USER_VIDEO_MANAGEMENT_SERVICE)
                    .withIssuedAt(new Date())
                    .withSubject(String.valueOf(userPrincipal.getUserDTO().getId()))
                    .withClaim(JWT_ROLE_KEY, userPrincipal.getUserDTO().getAuthorities().get(0).getName())
                    .withArrayClaim(JWT_AUTHORITIES_KEY, getClaimsFromUser(userPrincipal))
                    .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
                    .sign(algorithm);

        } catch (JWTCreationException exception){
            // Invalid Signing configuration / Couldn't convert Claims.
            throw new JWTCreationException("Invalid Signing configuration / Couldn't convert Claims for Access token.", exception);
        }
    }

    /**
     * create JWT refresh token
     * @param userPrincipal userPrincipal
     * @return String JWT refresh token
     */
    public String createRefreshToken(UserPrincipal userPrincipal) {
        //generateRSAKeys();
        Algorithm algorithm = getAlgorithm();
        try {
            return JWT.create().withIssuer(TOKEN_ISSUER)
                    .withAudience(USER_VIDEO_MANAGEMENT_SERVICE)
                    .withIssuedAt(new Date())
                    .withSubject(String.valueOf(userPrincipal.getUserDTO().getId()))
                    //.withSubject(userPrincipal.getUsername())
                    .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
                    .sign(algorithm);

        } catch (JWTCreationException exception){
            // Invalid Signing configuration / Couldn't convert Claims.
            throw new JWTCreationException("Invalid Signing configuration / Couldn't convert Claims for Refresh token.", exception);
        }
    }

    /**
     * Map token claims to simple granted Authorities
     * @param token JWT Token
     * @return List of granted authority
     */
    public List<GrantedAuthority> getAuthorities(String token) {
        String[] claims = getClaimsFromToken(token);
        return Arrays.stream(claims).map((claim) -> new SimpleGrantedAuthority(claim)).collect(Collectors.toList());
    }

    /**
     * create Authentication object
     * @param userId the user id
     * @param authorities the authorities
     * @param request the request
     * @return an authentication object
     */
    public Authentication getAuthentication(Long userId, List<GrantedAuthority> authorities, String role, HttpServletRequest request) {
        // Retrieve the Authentication object from SecurityContextHolder
        //Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(null, null, null);
        // Check if the Authentication object is an instance of UsernamePasswordAuthenticationToken
        //if (authentication instanceof UsernamePasswordAuthenticationToken) {
            // Cast the Authentication object to UsernamePasswordAuthenticationToken
        //    authenticationToken = (UsernamePasswordAuthenticationToken) authentication;

            // Now you have access to the UsernamePasswordAuthenticationToken
            // You can retrieve the username, password, and other details if needed
        //    String username1 = authenticationToken.getName();
        //    Object credentials = authenticationToken.getCredentials();
        //    List<GrantedAuthority> grantedAuthorities = (List<GrantedAuthority>) authenticationToken.getAuthorities();
            // You can also retrieve the authorities, details, etc. if needed
        //}
        Set<Role> roles = getRolesFromAuthorities(authorities, role); //TODO: figure out a way to pass role Set
        UserPrincipal userPrincipal = new UserPrincipal(UserDTOMapper.toUser(userServiceImpl.getUser(userId)), roles);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userPrincipal, null, authorities);
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        return authenticationToken;
    }

    /**
     * get subject from token userId
     * @param token JWT token
     * @param request servlet request
     * @return User Id
     */
    public Long getSubject(String token, HttpServletRequest request) {
        Algorithm algorithm = getAlgorithm();
        JWTVerifier verifier = getVerifier(algorithm);
        Date expiredAt;
        try {
            DecodedJWT decodedJWT = verifier.verify(token);
            return Long.parseLong(decodedJWT.getSubject());
        } catch (TokenExpiredException exception) {
            request.setAttribute("expiredMessage", exception.getMessage());
            throw new TokenExpiredException("token expired on "+exception.getExpiredOn().toString(), exception.getExpiredOn());
            //throw new APIException("Something went wrong, This token has expired");
        } catch (InvalidClaimException exception) {
            request.setAttribute("invalidClaims", exception.getMessage());
            throw new InvalidClaimException("Provided claims are not valid");
            //throw new APIException("Invalid claims provided for the token");
        } catch (Exception exception) {
            throw new APIException("something went wrong with the token");
        }
        //return token;
    }

    /**
     * Get role name from token
     * @param token the token
     * @return the role name
     */
    public String getRoleName(String token) {
        Algorithm algorithm = getAlgorithm();
        JWTVerifier verifier = getVerifier(algorithm);
        try {
            return verifier.verify(token).getClaim(JWT_ROLE_KEY).asString();
        } catch (TokenExpiredException exception) {
            throw new APIException("something went wrong with the token");
        } catch (Exception exception) {
            throw new APIException("something went wrong with the token");
        }
    }

    /**
     * Check if token is valid
     * @param userId the user id
     * @param token the JWT Token
     * @return true token is valid
     */
    public boolean isTokenValid(String userId, String token) {
        Algorithm algorithm = getAlgorithm();
        JWTVerifier verifier = getVerifier(algorithm);
        return StringUtils.isNotEmpty(userId) && !isTokenExpired(verifier, token);
    }

    /**
     * Check token does not expire after current time
     * @param verifier JWT Verifier
     * @param token provided token
     * @return true if token is expired
     */
    private boolean isTokenExpired(JWTVerifier verifier, String token) {
        Date tokenExpiration = verifier.verify(token).getExpiresAt();
        return tokenExpiration.before(new Date());
    }

    /**
     * create encryption algorithm
     * @return the algorithm
     */
    private Algorithm getAlgorithm() {
        generateRSAKeys();
        Algorithm algorithm = Algorithm.RSA256(RSA_PUBLIC_KEY, RSA_PRIVATE_KEY);
        return algorithm;
    }
    /**
     * get extract claims from token after validation
     * @param token User provided JWT token
     * @return String Array of claims
     */
    private String[] getClaimsFromToken(String token) {
        Algorithm algorithm = Algorithm.RSA256(RSA_PUBLIC_KEY, RSA_PRIVATE_KEY);
        JWTVerifier verifier = getVerifier(algorithm);
        return verifier.verify(token).getClaim(JWT_AUTHORITIES_KEY).asArray(String.class);//get authorities for key
    }

    /**
     * create a JWT verifier object to validate the token claims
     * @param algorithm algoritm used to sign JWT token
     * @return JWTVerifier
     */
    private JWTVerifier getVerifier(Algorithm algorithm) {
        try {
            return JWT.require(algorithm).withIssuer(TOKEN_ISSUER).build();
        } catch (JWTVerificationException jwtVerificationException) {
            throw new JWTVerificationException("The provided token cannot be verifier");
        }
    }

    /**
     * Map principal GrantedAuthorities to string array. (Get user claims i.e. user claimed permissions)
     * @param userPrincipal
     * @return String of claimed authorities
     */
    private String[] getClaimsFromUser(UserPrincipal userPrincipal) {
        return userPrincipal.getAuthorities().stream().map((authority) -> authority.getAuthority()).toArray(String[]::new);
    }

    private Set<Role> getRolesFromAuthorities(List<GrantedAuthority> authorities, String roleName) {
        String permissions = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(","));
        return new HashSet<>(Arrays.asList(new Role(null, roleName, permissions)));
    }


    /**
     * other approach draft
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
     *
     *         // Now you have RSAPublicKey and RSAPrivateKey instances
     *         // Use them with the Algorithm.RSA256() method
     */

}
